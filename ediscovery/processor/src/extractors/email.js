/**
 * Email Container Extractor
 *
 * Expands email container formats — PST, OST, MBOX, EML, MSG — into their
 * constituent messages and attachments.
 *
 * Strategy:
 *   PST/OST  — libpff / readpst (open-source, MIT-ish)
 *              Converts to MBOX, then processes each message
 *   MBOX     — Parsed sequentially using a streaming state machine
 *   EML      — Single RFC 5322 message; expand MIME attachments
 *   MSG      — Outlook binary; converted to EML via Tika, then attachment expansion
 *
 * Each extracted message or attachment:
 *   - Is uploaded to MinIO as its own document
 *   - Gets its own CoC entry with provenance back to the container
 *   - Is enqueued for the full 13-stage processing pipeline
 *
 * Email metadata extracted at container-expand time (before full pipeline):
 *   From, To, CC, BCC, Subject, Message-ID, Date, In-Reply-To, References
 *   These populate the documents row directly, enabling threading immediately.
 *
 * Attachment handling:
 *   Each MIME attachment becomes a sibling document (not a child of the email)
 *   with `parent_document_id` pointing to the EML document.
 *   This mirrors Relativity's family-group model.
 */

import { mkdtemp, rm, readdir, writeFile, stat } from 'fs/promises';
import { createWriteStream, createReadStream } from 'fs';
import { join, basename } from 'path';
import { tmpdir } from 'os';
import { pipeline as streamPipeline } from 'stream/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { createHash } from 'crypto';
import { PassThrough } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { simpleParser } from 'mailparser';

import { db } from '../db.js';
import { storageClient, BUCKET } from '../storage.js';
import { logEvent } from '../chainOfCustody.js';
import { AUDIT_EVENT, LIMITS } from '../../../shared/src/constants.js';

const execFileAsync = promisify(execFile);
const TIKA_URL = process.env.TIKA_URL ?? 'http://tika:9998';

/**
 * Expand an email container into individual messages + attachments.
 *
 * @param {object} params
 * @param {string} params.documentId     — parent container document UUID
 * @param {string} params.matterId
 * @param {string} params.storageKey     — MinIO key of the container file
 * @param {string} params.mimeType       — detected MIME type
 * @param {string} params.originalName
 * @param {number} params.depth
 * @param {object} params.queue          — BullMQ Queue for child processing
 * @returns {Promise<{childCount: number}>}
 */
export async function expandEmailContainer({
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
      [documentId, `Max container nesting depth (${LIMITS.MAX_CONTAINER_DEPTH}) reached`]
    );
    return { childCount: 0 };
  }

  const tmpDir = await mkdtemp(join(tmpdir(), 'email-'));
  let childCount = 0;

  try {
    // ── Download container to tmp ──────────────────────────────────────────
    const ext = getExt(originalName, mimeType);
    const containerPath = join(tmpDir, `container${ext}`);
    const dlStream = await storageClient.getObject(BUCKET, storageKey);
    await streamPipeline(dlStream, createWriteStream(containerPath));

    // ── Dispatch by format ─────────────────────────────────────────────────
    let emlFiles = [];

    if (isPst(mimeType, ext)) {
      emlFiles = await expandPst(containerPath, tmpDir);
    } else if (isMbox(mimeType, ext)) {
      emlFiles = await expandMbox(containerPath, tmpDir);
    } else if (isMsg(mimeType, ext)) {
      emlFiles = await convertMsgToEml(containerPath, tmpDir);
    } else if (isEml(mimeType, ext)) {
      // Single EML — just expand its attachments
      emlFiles = [containerPath];
    } else {
      throw new Error(`Unsupported email container type: ${mimeType}`);
    }

    // ── Process each EML ──────────────────────────────────────────────────
    for (const emlPath of emlFiles) {
      try {
        childCount += await processEml({
          emlPath,
          matterId,
          parentDocumentId: documentId,
          depth: depth + 1,
          queue,
        });
      } catch (emlErr) {
        console.error(`[email] Failed to process EML ${emlPath}:`, emlErr.message);
      }
    }

    // ── Mark parent expanded ───────────────────────────────────────────────
    await db.query(
      "UPDATE documents SET processing_status='EXPANDED', child_count=$2, updated_at=NOW() WHERE id=$1",
      [documentId, childCount]
    );

    await logEvent({
      eventType:   AUDIT_EVENT.FILE_INGESTED,
      matterId,
      description: `Email container expanded: ${originalName} → ${childCount} items`,
      metadata:    { documentId, childCount, depth },
    });

    return { childCount };
  } finally {
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ─── PST/OST expansion ────────────────────────────────────────────────────────

async function expandPst(pstPath, tmpDir) {
  // readpst (from libpff / libpst package) outputs to a directory
  const outDir = join(tmpDir, 'pst_out');
  try {
    // -D: include deleted items  -r: recurse folders  -S: separate files  -e: EML format
    await execFileAsync('readpst', ['-D', '-r', '-S', '-e', '-o', outDir, pstPath], {
      timeout: 600_000,   // 10 min for large PSTs
    });
  } catch (err) {
    // readpst may not be installed; fall back to Tika multi-part extraction
    console.warn('[email] readpst not available, falling back to Tika:', err.message);
    return extractViaTimka(pstPath, tmpDir);
  }
  return collectEmlFiles(outDir);
}

async function extractViaTimka(containerPath, tmpDir) {
  // Tika can partially unpack PST; returns MBOX-ish content
  const src = createReadStream(containerPath);
  const res = await fetch(`${TIKA_URL}/unpack/all`, {
    method: 'PUT',
    headers: { 'Accept': 'application/zip' },
    body: src,
    duplex: 'half',
  });
  if (!res.ok) throw new Error(`Tika unpack failed: ${res.status}`);
  // Write zip and extract
  const zipPath = join(tmpDir, 'tika_unpack.zip');
  await streamPipeline(res.body, createWriteStream(zipPath));
  const { default: unzipper } = await import('unzipper');
  const { mkdir } = await import('fs/promises');
  const unpackDir = join(tmpDir, 'tika_unpacked');
  await mkdir(unpackDir, { recursive: true });
  await createReadStream(zipPath).pipe(unzipper.Extract({ path: unpackDir })).promise();
  return collectEmlFiles(unpackDir);
}

// ─── MBOX expansion ───────────────────────────────────────────────────────────

async function expandMbox(mboxPath, tmpDir) {
  // Split MBOX into individual EML files using a simple state machine
  const { createReadStream: crs } = await import('fs');
  const { createInterface } = await import('readline');
  const outDir = join(tmpDir, 'mbox_out');
  const { mkdir } = await import('fs/promises');
  await mkdir(outDir, { recursive: true });

  return new Promise((resolve, reject) => {
    const rl = createInterface({ input: crs(mboxPath), crlfDelay: Infinity });
    let current = [];
    let msgIdx  = 0;
    const paths = [];

    const flush = async () => {
      if (current.length === 0) return;
      const emlPath = join(outDir, `message_${String(msgIdx).padStart(6, '0')}.eml`);
      await writeFile(emlPath, current.join('\n'));
      paths.push(emlPath);
      msgIdx++;
      current = [];
    };

    rl.on('line', async line => {
      // MBOX message separator: "From " at start of line
      if (/^From /.test(line) && current.length > 0) {
        await flush();
      }
      current.push(line);
    });

    rl.on('close', async () => {
      await flush();
      resolve(paths);
    });

    rl.on('error', reject);
  });
}

// ─── MSG → EML via Tika ───────────────────────────────────────────────────────

async function convertMsgToEml(msgPath, tmpDir) {
  // Tika extracts MSG metadata + body; we reconstruct a minimal EML
  const [metaRes, bodyRes] = await Promise.all([
    fetch(`${TIKA_URL}/meta`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/vnd.ms-outlook' },
      body: createReadStream(msgPath),
      duplex: 'half',
    }),
    fetch(`${TIKA_URL}/tika`, {
      method: 'PUT',
      headers: { 'Accept': 'text/plain', 'Content-Type': 'application/vnd.ms-outlook' },
      body: createReadStream(msgPath),
      duplex: 'half',
    }),
  ]);

  const meta = metaRes.ok ? await metaRes.json() : {};
  const body = bodyRes.ok ? await bodyRes.text() : '';

  // Build a minimal RFC 5322 EML
  const eml = [
    `From: ${meta['Message-From'] ?? meta['Author'] ?? ''}`,
    `To: ${meta['Message-To'] ?? ''}`,
    `CC: ${meta['Message-CC'] ?? ''}`,
    `Subject: ${meta['dc:subject'] ?? meta['Subject'] ?? ''}`,
    `Date: ${meta['Date'] ?? meta['Creation-Date'] ?? ''}`,
    `Message-ID: ${meta['Message-ID'] ?? ''}`,
    `Content-Type: text/plain; charset=utf-8`,
    '',
    body,
  ].join('\r\n');

  const emlPath = join(tmpDir, 'converted.eml');
  await writeFile(emlPath, eml, 'utf8');
  return [emlPath];
}

// ─── EML processing (parse + upload message + attachments) ───────────────────

/**
 * Parse a single EML file, upload it as a document, then upload each attachment
 * as a sibling document. Returns the total number of documents created.
 */
async function processEml({ emlPath, matterId, parentDocumentId, depth, queue }) {
  const emlData = createReadStream(emlPath);
  const parsed  = await simpleParser(emlData);

  const {
    from, to, cc, bcc, subject, messageId,
    inReplyTo, references, date, text, html,
  } = parsed;

  const emlId  = uuidv4();
  const emlKey = `matters/${matterId}/documents/${emlId}/message.eml`;

  // Upload the raw EML to MinIO
  const { size: emlSize } = await stat(emlPath);
  const emlSrc = createReadStream(emlPath);
  await storageClient.putObject(BUCKET, emlKey, emlSrc, emlSize);

  // Compute SHA-256 of raw EML
  const sha256 = await hashFile(emlPath);

  const fromAddr = extractAddr(from);
  const toAddr   = extractAddrList(to);
  const ccAddr   = extractAddrList(cc);
  const bccAddr  = extractAddrList(bcc);

  // Insert the email document
  await db.query(
    `INSERT INTO documents (
       id, matter_id, original_name, storage_key,
       sha256, file_size, detected_mime, file_category,
       parent_document_id, container_depth,
       email_from, email_to, email_cc, email_bcc,
       email_subject, email_date, email_message_id,
       email_in_reply_to, email_references,
       processing_status, ingestion_status,
       created_at, updated_at
     ) VALUES (
       $1,$2,$3,$4,
       $5,$6,'message/rfc822','EMAIL',
       $7,$8,
       $9,$10,$11,$12,
       $13,$14,$15,
       $16,$17,
       'QUEUED','PENDING',
       NOW(),NOW()
     )`,
    [
      emlId, matterId,
      subject ? `${subject.slice(0, 100)}.eml` : 'message.eml',
      emlKey,
      sha256, emlSize,
      parentDocumentId, depth,
      fromAddr, toAddr, ccAddr, bccAddr,
      subject ?? '',
      date ? date.toISOString() : null,
      messageId ?? '',
      inReplyTo  ?? '',
      Array.isArray(references) ? references.join(' ') : (references ?? ''),
    ]
  );

  await logEvent({
    eventType:   AUDIT_EVENT.FILE_INGESTED,
    matterId,
    description: `Email extracted: "${subject ?? '(no subject)'}" from ${fromAddr}`,
    metadata:    { emlId, parentDocumentId, sha256, messageId },
  });

  if (queue) {
    await queue.add('process', {
      documentId: emlId, matterId, storageKey: emlKey,
      originalName: `${(subject ?? 'message').slice(0, 80)}.eml`,
      fileSize: emlSize, sha256, depth,
    }, { priority: 10 });
  }

  let count = 1;

  // ── Attachments ────────────────────────────────────────────────────────
  for (const att of (parsed.attachments ?? [])) {
    try {
      if (!att.content || att.content.length === 0) continue;

      const attId   = uuidv4();
      const attName = att.filename ?? att.contentId ?? `attachment-${attId}`;
      const attKey  = `matters/${matterId}/documents/${attId}/${attName}`;
      const attSha  = createHash('sha256').update(att.content).digest('hex');

      await storageClient.putObject(BUCKET, attKey, att.content, att.content.length);

      await db.query(
        `INSERT INTO documents (
           id, matter_id, original_name, storage_key,
           sha256, file_size, detected_mime,
           parent_document_id, container_depth,
           processing_status, ingestion_status,
           created_at, updated_at
         ) VALUES (
           $1,$2,$3,$4,
           $5,$6,$7,
           $8,$9,
           'QUEUED','PENDING',
           NOW(),NOW()
         )`,
        [
          attId, matterId, attName, attKey,
          attSha, att.content.length, att.contentType ?? 'application/octet-stream',
          emlId, depth + 1,
        ]
      );

      await logEvent({
        eventType:   AUDIT_EVENT.FILE_INGESTED,
        matterId,
        description: `Email attachment extracted: ${attName} (${att.content.length} bytes)`,
        metadata:    { attId, parentEmlId: emlId, sha256: attSha },
      });

      if (queue) {
        await queue.add('process', {
          documentId: attId, matterId, storageKey: attKey,
          originalName: attName, fileSize: att.content.length, sha256: attSha,
          depth: depth + 1,
        }, { priority: 10 });
      }

      count++;
    } catch (attErr) {
      console.error(`[email] Attachment error:`, attErr.message);
    }
  }

  return count;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function collectEmlFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        files.push(...await collectEmlFiles(full));
      } else if (e.isFile() && /\.(eml|msg)$/i.test(e.name)) {
        files.push(full);
      }
    }
    return files;
  } catch {
    return [];
  }
}

async function hashFile(filePath) {
  const h = createHash('sha256');
  const s = createReadStream(filePath);
  for await (const chunk of s) h.update(chunk);
  return h.digest('hex');
}

function extractAddr(addr) {
  if (!addr) return '';
  if (addr.text) return addr.text;
  if (Array.isArray(addr.value)) return addr.value.map(a => a.address ?? '').join(', ');
  return String(addr);
}

function extractAddrList(addr) {
  if (!addr) return '';
  if (addr.text) return addr.text;
  if (Array.isArray(addr.value)) return addr.value.map(a => a.address ?? '').join(', ');
  return String(addr);
}

function getExt(name, mime) {
  if (!name) return guessExtFromMime(mime);
  const m = name.match(/(\.[^.]+)$/i);
  return m ? m[1].toLowerCase() : guessExtFromMime(mime);
}

function guessExtFromMime(mime) {
  const map = {
    'application/vnd.ms-outlook':       '.msg',
    'application/mbox':                  '.mbox',
    'message/rfc822':                    '.eml',
    'application/vnd.ms-exchange-pst':   '.pst',
    'application/x-pst':                 '.pst',
  };
  return map[mime] ?? '';
}

function isPst(mime, ext) {
  return ['.pst','.ost'].includes(ext)
    || mime === 'application/vnd.ms-exchange-pst'
    || mime === 'application/x-pst';
}

function isMbox(mime, ext) {
  return ext === '.mbox' || mime === 'application/mbox';
}

function isMsg(mime, ext) {
  return ext === '.msg' || mime === 'application/vnd.ms-outlook';
}

function isEml(mime, ext) {
  return ['.eml','.email'].includes(ext) || mime === 'message/rfc822';
}
