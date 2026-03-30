/**
 * Archive Container Extractor
 *
 * Expands archive files (ZIP, TAR, RAR, 7-Zip, GZ, BZ2, XZ, …) into their
 * constituent files, recursively up to MAX_CONTAINER_DEPTH.
 *
 * Strategy:
 *   - Download archive from MinIO into a temp dir
 *   - Detect format (Tika told us already; fall back on extension)
 *   - Extract using the `unzipper` library for ZIP (most common) and
 *     spawn system `tar`/`7z` for other formats (all standard in the container)
 *   - Each extracted file is uploaded to MinIO under the parent's storage path
 *     with a child suffix, inserted as a new `documents` row (status QUEUED),
 *     and enqueued for the full processing pipeline
 *   - Parent document is marked EXPANDED once all children are ingested
 *
 * Chain of Custody:
 *   Every child file gets its own CoC entry with provenance linking back to
 *   the parent archive document ID, preserving the full extraction lineage.
 *
 * Supported formats (via unzipper / system tools):
 *   ZIP, JAR, WAR, EAR, DOCX, XLSX, PPTX (all are ZIP internally) — unzipper
 *   TAR, TGZ, TAR.GZ, TAR.BZ2, TAR.XZ                             — system tar
 *   GZ (single file)                                                — system gunzip
 *   7Z, RAR                                                         — system 7z (p7zip)
 */

import { mkdtemp, rm, readdir, stat } from 'fs/promises';
import { createWriteStream, createReadStream } from 'fs';
import { join, basename, extname } from 'path';
import { tmpdir } from 'os';
import { pipeline as streamPipeline } from 'stream/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { createHash } from 'crypto';
import { PassThrough } from 'stream';
import unzipper from 'unzipper';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../db.js';
import { storageClient, BUCKET } from '../storage.js';
import { logEvent } from '../chainOfCustody.js';
import { AUDIT_EVENT, LIMITS } from '../../../shared/src/constants.js';

const execFileAsync = promisify(execFile);

// Extensions that unzipper handles (ZIP-based)
const ZIP_EXTS = new Set(['.zip','.jar','.war','.ear','.apk','.docx','.xlsx','.pptx',
                           '.odt','.ods','.odp','.epub']);
const TAR_EXTS = new Set(['.tar','.tgz','.gz','.bz2','.xz','.tbz2','.txz']);

/**
 * Main entry point called by the pipeline.
 *
 * @param {object} params
 * @param {string} params.documentId     — parent document UUID
 * @param {string} params.matterId
 * @param {string} params.storageKey     — MinIO key of the archive
 * @param {string} params.mimeType
 * @param {string} params.originalName
 * @param {number} params.depth          — current nesting depth (0 = top-level)
 * @param {object} params.queue          — BullMQ queue for enqueuing children
 * @param {object} params.coc            — chain-of-custody logger
 * @returns {Promise<{childCount: number}>}
 */
export async function expandArchive({
  documentId,
  matterId,
  storageKey,
  mimeType,
  originalName,
  depth = 0,
  queue,
}) {
  if (depth >= LIMITS.MAX_CONTAINER_DEPTH) {
    await db.query(
      "UPDATE documents SET processing_status='ERROR', processing_notes=$2 WHERE id=$1",
      [documentId, `Max container nesting depth (${LIMITS.MAX_CONTAINER_DEPTH}) reached — expansion skipped`]
    );
    return { childCount: 0 };
  }

  const tmpDir = await mkdtemp(join(tmpdir(), 'arc-'));
  let childCount = 0;

  try {
    // ── Download archive to tmp ────────────────────────────────────────────
    const archivePath = join(tmpDir, 'archive' + (getExt(originalName) || '.bin'));
    const stream = await storageClient.getObject(BUCKET, storageKey);
    await streamPipeline(stream, createWriteStream(archivePath));

    // ── Extract ────────────────────────────────────────────────────────────
    const extractDir = join(tmpDir, 'extracted');
    await extractArchive(archivePath, extractDir, mimeType, originalName);

    // ── Recurse through extracted files ────────────────────────────────────
    const files = await collectFiles(extractDir);

    for (const filePath of files) {
      try {
        const info = await stat(filePath);
        if (!info.isFile() || info.size === 0) continue;

        const relPath = filePath.slice(extractDir.length + 1);
        const childName = basename(filePath);
        const childId   = uuidv4();
        const childKey  = `matters/${matterId}/documents/${childId}/${childName}`;

        // Compute hashes while uploading to MinIO
        const md5h    = createHash('md5');
        const sha1h   = createHash('sha1');
        const sha256h = createHash('sha256');
        const passThru = new PassThrough();
        const src      = createReadStream(filePath);

        src.on('data', chunk => {
          md5h.update(chunk);
          sha1h.update(chunk);
          sha256h.update(chunk);
          passThru.push(chunk);
        });
        src.on('end',   () => passThru.end());
        src.on('error', err => passThru.destroy(err));

        await storageClient.putObject(BUCKET, childKey, passThru, info.size);

        const md5    = md5h.digest('hex');
        const sha1   = sha1h.digest('hex');
        const sha256 = sha256h.digest('hex');

        // Insert child document row
        await db.query(
          `INSERT INTO documents (
             id, matter_id, original_name, file_path, storage_key,
             file_size, md5, sha1, sha256,
             parent_document_id, container_depth, relative_path,
             processing_status, ingestion_status,
             created_at, updated_at
           ) VALUES (
             $1,$2,$3,$4,$5,
             $6,$7,$8,$9,
             $10,$11,$12,
             'QUEUED','PENDING',
             NOW(), NOW()
           )`,
          [
            childId, matterId, childName, relPath, childKey,
            info.size, md5, sha1, sha256,
            documentId, depth + 1, relPath,
          ]
        );

        await logEvent({
          eventType:   AUDIT_EVENT.FILE_INGESTED,
          matterId,
          description: `Extracted from container: ${relPath} (parent: ${documentId})`,
          metadata:    { childId, parentId: documentId, sha256, depth: depth + 1 },
        });

        // Enqueue for full processing pipeline
        if (queue) {
          await queue.add('process', {
            documentId:   childId,
            matterId,
            storageKey:   childKey,
            originalName: childName,
            fileSize:     info.size,
            sha256,
            depth:        depth + 1,
          }, { priority: 10 });
        }

        childCount++;
      } catch (fileErr) {
        console.error(`[archive] Failed to process child ${filePath}:`, fileErr.message);
      }
    }

    // Mark parent as expanded
    await db.query(
      "UPDATE documents SET processing_status='EXPANDED', child_count=$2, updated_at=NOW() WHERE id=$1",
      [documentId, childCount]
    );

    await logEvent({
      eventType:   AUDIT_EVENT.FILE_INGESTED,
      matterId,
      description: `Archive expanded: ${originalName} → ${childCount} child documents`,
      metadata:    { documentId, childCount, depth },
    });

    return { childCount };
  } finally {
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ─── Format detection + extraction ───────────────────────────────────────────

async function extractArchive(archivePath, extractDir, mimeType, originalName) {
  const ext = getExt(originalName).toLowerCase();

  // ZIP-family: use unzipper (pure JS, no system dependency)
  const isZip = ZIP_EXTS.has(ext)
    || mimeType === 'application/zip'
    || mimeType === 'application/java-archive'
    || mimeType?.startsWith('application/vnd.openxmlformats');

  if (isZip) {
    await extractZip(archivePath, extractDir);
    return;
  }

  // TAR-family
  const isTar = TAR_EXTS.has(ext)
    || mimeType === 'application/x-tar'
    || mimeType === 'application/gzip'
    || mimeType === 'application/x-bzip2'
    || mimeType === 'application/x-xz';

  if (isTar) {
    await extractTar(archivePath, extractDir);
    return;
  }

  // 7-Zip + RAR (requires p7zip-full in Docker image)
  const is7z = ext === '.7z'  || mimeType === 'application/x-7z-compressed';
  const isRar = ext === '.rar' || mimeType === 'application/x-rar-compressed'
                               || mimeType === 'application/vnd.rar';

  if (is7z || isRar) {
    await extract7z(archivePath, extractDir);
    return;
  }

  // Single-file GZIP (extract the inner file)
  if (ext === '.gz' || mimeType === 'application/gzip') {
    await extractGzip(archivePath, extractDir, originalName);
    return;
  }

  throw new Error(`Unsupported archive format: ${mimeType} (${ext})`);
}

async function extractZip(archivePath, extractDir) {
  const { mkdir } = await import('fs/promises');
  await mkdir(extractDir, { recursive: true });
  await createReadStream(archivePath)
    .pipe(unzipper.Extract({ path: extractDir }))
    .promise();
}

async function extractTar(archivePath, extractDir) {
  const { mkdir } = await import('fs/promises');
  await mkdir(extractDir, { recursive: true });
  // --no-same-owner avoids permission issues inside Docker
  await execFileAsync('tar', ['xf', archivePath, '-C', extractDir, '--no-same-owner'], {
    timeout: 300_000,   // 5 min
  });
}

async function extract7z(archivePath, extractDir) {
  const { mkdir } = await import('fs/promises');
  await mkdir(extractDir, { recursive: true });
  // 7z x: extract with full paths; -o: output dir; -y: yes to all prompts
  await execFileAsync('7z', ['x', archivePath, `-o${extractDir}`, '-y'], {
    timeout: 300_000,
  });
}

async function extractGzip(archivePath, extractDir, originalName) {
  const { mkdir } = await import('fs/promises');
  await mkdir(extractDir, { recursive: true });
  // Strip .gz suffix for the inner filename
  const innerName = basename(originalName, '.gz') || 'extracted';
  await execFileAsync('gunzip', ['--keep', '--force', archivePath], { timeout: 300_000 });
  // gunzip in-place creates file without .gz extension
  const innerPath = archivePath.replace(/\.gz$/, '');
  await execFileAsync('mv', [innerPath, join(extractDir, innerName)]);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Recursively collect all file paths under a directory */
async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function getExt(name) {
  if (!name) return '';
  const lower = name.toLowerCase();
  // Handle double extensions like .tar.gz
  if (lower.endsWith('.tar.gz'))  return '.tgz';
  if (lower.endsWith('.tar.bz2')) return '.tbz2';
  if (lower.endsWith('.tar.xz'))  return '.txz';
  return extname(lower);
}
