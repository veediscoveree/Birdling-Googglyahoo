/**
 * Ingestion Service
 *
 * Handles the first-touch of all evidence files. Chain of custody begins here.
 *
 * Steps (in order):
 *  1. Receive file stream
 *  2. Calculate MD5 + SHA-1 + SHA-256 hashes IN-FLIGHT (no buffering to disk first)
 *  3. Stream to object storage (MinIO/S3)
 *  4. Write document record to database
 *  5. Verify stored file hash matches in-flight hash (re-read + re-hash)
 *  6. Write CoC audit entries for each step
 *  7. Enqueue for processing
 *
 * CRITICAL: If hash verification fails, the document is marked CRITICAL error
 * and processing is halted for that file pending manual review.
 */

import crypto from 'crypto';
import { Readable } from 'stream';
import { db } from '../db/index.js';
import { storageClient, BUCKET } from './storage.js';
import { queue } from './queue.js';
import {
  logFileReceived,
  logFileHashed,
  logFileStored,
  logHashVerified,
} from './chainOfCustody.js';
import { recordHashMismatch, recordError } from './errorTracker.js';
import { ERROR_TYPE, ERROR_SEVERITY, AUDIT_EVENT, PROCESSING_STAGE } from '../../../shared/src/constants.js';

/**
 * Ingest a single file into a matter/data source.
 *
 * @param {object} options
 * @param {string} options.matterId
 * @param {string} options.dataSourceId
 * @param {string} options.custodianId
 * @param {string} [options.custodianName]
 * @param {ReadableStream|Buffer} options.fileStream - file content
 * @param {string} options.originalName - original file name
 * @param {string} [options.originalPath] - original file path in source
 * @param {number} options.fileSize
 * @param {string} [options.parentId] - for child documents (attachments)
 * @param {string} [options.containerPath] - path within container
 * @param {object} [options.requestContext] - userId, userName, ipAddress for CoC
 * @returns {Promise<{documentId: string, hashes: object}>}
 */
export async function ingestFile({
  matterId,
  dataSourceId,
  custodianId = null,
  custodianName = null,
  fileStream,
  originalName,
  originalPath = null,
  fileSize = null,
  parentId = null,
  containerPath = null,
  requestContext = {},
}) {
  const { userId, userName, ipAddress } = requestContext;

  // ── Step 1: Log receipt into CoC ─────────────────────────────────────────
  await logFileReceived({
    matterId,
    dataSourceId,
    userId,
    userName,
    file: { originalName, size: fileSize, originalPath },
    metadata: { parentId, containerPath },
  });

  // ── Step 2: Stream file through hash calculators AND to storage ──────────
  const md5    = crypto.createHash('md5');
  const sha1   = crypto.createHash('sha1');
  const sha256 = crypto.createHash('sha256');

  // Build a transform stream that tees the input through all three hashers
  const { readable: hashStream, bytes, hashes } = await streamAndHash(fileStream, [md5, sha1, sha256]);

  // Generate storage key: {matterId}/{dataSourceId}/{uuid}_{sanitizedName}
  const storageId  = crypto.randomUUID();
  const safeExt    = sanitizeExtension(originalName);
  const storageKey = `${matterId}/${dataSourceId}/${storageId}${safeExt}`;

  let storedSize;
  try {
    storedSize = await storageClient.putObject(BUCKET, storageKey, hashStream, fileSize ?? undefined);
  } catch (err) {
    await recordError({
      matterId, dataSourceId,
      errorType: ERROR_TYPE.STORAGE_FAILURE,
      severity:  ERROR_SEVERITY.CRITICAL,
      stage:     'STORAGE',
      message:   `Failed to store "${originalName}" to object storage: ${err.message}`,
      details:   err.stack,
      fileContext: { fileName: originalName, filePath: originalPath, fileSize },
    });
    throw err; // re-throw so the upload handler returns 500
  }

  const computedMd5    = md5.digest('hex');
  const computedSha1   = sha1.digest('hex');
  const computedSha256 = sha256.digest('hex');

  // ── Step 3: Log hashes ───────────────────────────────────────────────────
  const docRecord = {
    originalName,
    md5:    computedMd5,
    sha1:   computedSha1,
    sha256: computedSha256,
  };

  // ── Step 4: Insert document record ───────────────────────────────────────
  const ext = getExtension(originalName);

  const insertResult = await db.query(
    `INSERT INTO documents (
       matter_id, data_source_id, custodian_id, custodian_name,
       original_name, original_path, parent_id, container_path,
       storage_key, storage_bucket, file_size,
       md5, sha1, sha256, file_ext,
       processing_stage
     ) VALUES (
       $1, $2, $3, $4,
       $5, $6, $7, $8,
       $9, $10, $11,
       $12, $13, $14, $15,
       $16
     ) RETURNING id`,
    [
      matterId, dataSourceId, custodianId, custodianName,
      originalName, originalPath, parentId, containerPath,
      storageKey, BUCKET, storedSize ?? fileSize,
      computedMd5, computedSha1, computedSha256, ext,
      PROCESSING_STAGE.HASHING,
    ]
  );

  const documentId = insertResult.rows[0].id;

  // Update data source file count
  await db.query(
    `UPDATE data_sources SET total_files = total_files + 1, total_bytes = total_bytes + $2 WHERE id = $1`,
    [dataSourceId, storedSize ?? fileSize ?? 0]
  );

  // Log hashes to CoC
  await logFileHashed({
    matterId,
    documentId,
    dataSourceId,
    file: { originalName, md5: computedMd5, sha1: computedSha1, sha256: computedSha256 },
  });

  // ── Step 5: Verify stored file (re-read + re-hash) ───────────────────────
  const verified = await verifyStoredFile(storageKey, computedSha256);

  await logHashVerified({ matterId, documentId, file: { originalName, sha256: computedSha256 }, verified });

  if (!verified) {
    // CRITICAL: stored hash doesn't match — integrity violation
    await recordHashMismatch({
      matterId, documentId, dataSourceId,
      fileName: originalName,
      expectedHash: computedSha256,
      actualHash: 'VERIFICATION_FAILED',
    });
    await db.query(
      `UPDATE documents SET processing_stage = 'ERROR', hash_verified = FALSE WHERE id = $1`,
      [documentId]
    );
    throw new Error(`Hash verification failed for "${originalName}". Ingestion aborted.`);
  }

  // Mark hash verified
  await db.query(
    `UPDATE documents
     SET hash_verified = TRUE, hash_verified_at = NOW(), processing_stage = $2
     WHERE id = $1`,
    [documentId, PROCESSING_STAGE.QUEUED]
  );

  // ── Step 6: Enqueue for processing ───────────────────────────────────────
  await queue.add('process-document', {
    documentId,
    matterId,
    dataSourceId,
    storageKey,
    originalName,
    sha256: computedSha256,
  }, {
    priority: 5,
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  });

  return {
    documentId,
    hashes: { md5: computedMd5, sha1: computedSha1, sha256: computedSha256 },
    storageKey,
  };
}

/**
 * Batch ingest: handle an array of file upload records.
 * Returns a summary with per-file results and any errors.
 */
export async function ingestBatch({ matterId, dataSourceId, custodianId, files, requestContext }) {
  const results = { success: [], errors: [] };

  for (const file of files) {
    try {
      const result = await ingestFile({
        matterId,
        dataSourceId,
        custodianId,
        fileStream:   file.stream,
        originalName: file.originalName,
        originalPath: file.originalPath,
        fileSize:     file.size,
        requestContext,
      });
      results.success.push({ originalName: file.originalName, ...result });
    } catch (err) {
      results.errors.push({ originalName: file.originalName, error: err.message });
    }
  }

  // Update data source status
  const newStatus = results.errors.length === 0
    ? 'PROCESSING'
    : results.success.length === 0
      ? 'ERROR'
      : 'PARTIAL';

  await db.query(
    `UPDATE data_sources SET status = $2, updated_at = NOW() WHERE id = $1`,
    [dataSourceId, newStatus]
  );

  return results;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Stream a file through multiple hash algorithms simultaneously.
 * Returns a new readable stream (same data) and computed hashes.
 */
async function streamAndHash(input, hashers) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    const stream = input instanceof Buffer ? Readable.from(input) : input;

    stream.on('data', (chunk) => {
      chunks.push(chunk);
      for (const h of hashers) h.update(chunk);
    });

    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const readable = Readable.from(buffer);
      resolve({ readable, bytes: buffer.length });
    });

    stream.on('error', reject);
  });
}

/**
 * Re-read a stored file from object storage and verify its SHA-256 hash.
 */
async function verifyStoredFile(storageKey, expectedSha256) {
  try {
    const stream = await storageClient.getObject(BUCKET, storageKey);
    const sha256 = crypto.createHash('sha256');

    await new Promise((resolve, reject) => {
      stream.on('data', chunk => sha256.update(chunk));
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return sha256.digest('hex') === expectedSha256;
  } catch (err) {
    console.error('[ingestion] verifyStoredFile failed:', err.message);
    return false;
  }
}

function getExtension(filename) {
  const match = filename.match(/\.([^.]+)$/);
  return match ? `.${match[1].toLowerCase()}` : '';
}

function sanitizeExtension(filename) {
  const ext = getExtension(filename);
  // Allow only alphanumeric extensions
  return /^\.[\w]{1,10}$/.test(ext) ? ext : '';
}
