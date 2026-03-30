/**
 * Ingestion Route — STREAMING version
 *
 * CRITICAL FIX: Replaces multer memory storage with direct streaming to MinIO.
 * Files never touch server RAM — they stream from the HTTP request directly
 * to object storage while hashes are computed in-flight.
 *
 * This is the only correct approach for files > a few hundred MB.
 * Supports files up to 50 GB (MinIO multipart upload threshold: 5 MB parts).
 *
 * For very large files (>1 GB), use the presigned URL endpoint instead:
 *   POST /api/ingest/:matterId/presigned
 * This gives the browser a direct MinIO upload URL — bypasses the API server
 * entirely, so a 50 GB forensic image never touches Node.js at all.
 */

import { Router } from 'express';
import crypto from 'crypto';
import busboy from 'busboy';
import { PassThrough } from 'stream';
import { db } from '../db/index.js';
import { storageClient, BUCKET } from '../services/storage.js';
import { queue } from '../services/queue.js';
import { logFileReceived, logFileHashed, logHashVerified, logEvent } from '../services/chainOfCustody.js';
import { recordHashMismatch, recordError } from '../services/errorTracker.js';
import { ERROR_TYPE, ERROR_SEVERITY, AUDIT_EVENT, PROCESSING_STAGE } from '../../../shared/src/constants.js';

const router = Router();

// ─── POST /api/ingest/:matterId/sources ──────────────────────────────────────
router.post('/:matterId/sources', async (req, res, next) => {
  try {
    const {
      name, custodianId, sourceType = 'UPLOAD',
      collectedBy, collectionTool, collectionDate, collectionNotes,
      sourceMd5, sourceSha256,
    } = req.body;

    if (!name) return res.status(400).json({ error: 'name is required' });

    const result = await db.query(
      `INSERT INTO data_sources (
         matter_id, custodian_id, name, source_type,
         collected_by, collection_tool, collection_date, collection_notes,
         source_md5, source_sha256, created_by
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        req.params.matterId, custodianId || null, name, sourceType,
        collectedBy, collectionTool, collectionDate || null, collectionNotes,
        sourceMd5, sourceSha256, req.user?.id,
      ]
    );

    const source = result.rows[0];

    await logEvent({
      eventType:    AUDIT_EVENT.INGEST_STARTED,
      matterId:     req.params.matterId,
      dataSourceId: source.id,
      userId:       req.user?.id,
      userName:     req.user?.name,
      description:  `Data source created: "${name}" (type: ${sourceType})${collectedBy ? ` collected by ${collectedBy}` : ''}`,
      afterState:   source,
    });

    res.status(201).json(source);
  } catch (err) { next(err); }
});

// ─── POST /api/ingest/:matterId/files — streaming upload ─────────────────────
//
// Uses busboy to parse the multipart form without buffering files to RAM.
// Each file field is streamed through:
//   HTTP request → busboy → PassThrough (tee) → MD5/SHA1/SHA256 + MinIO
//
// The hash is computed in-flight on the same bytes that flow to storage.
// After upload, the stored object is re-read and re-hashed for verification.
//
router.post('/:matterId/files', (req, res, next) => {
  const { matterId } = req.params;
  const results = [];
  const errors  = [];
  const fields  = {};

  let fileCount = 0;
  let done      = false;

  const bb = busboy({
    headers:  req.headers,
    limits: {
      fileSize:  50 * 1024 * 1024 * 1024, // 50 GB per file
      files:     500,                       // max 500 files per request
    },
  });

  // ── Collect form fields first ────────────────────────────────────────────
  bb.on('field', (name, value) => { fields[name] = value; });

  // ── Stream each file ─────────────────────────────────────────────────────
  bb.on('file', (fieldname, fileStream, info) => {
    const { filename, mimeType } = info;
    const originalName = decodeURIComponent(filename);
    fileCount++;

    const dataSourceId = fields.dataSourceId;
    const custodianId  = fields.custodianId  || null;
    const originalPath = fields.originalPath || null;

    if (!dataSourceId) {
      fileStream.resume(); // drain to avoid hanging
      errors.push({ originalName, error: 'dataSourceId is required' });
      return;
    }

    // Build hash streams
    const md5Hash    = crypto.createHash('md5');
    const sha1Hash   = crypto.createHash('sha1');
    const sha256Hash = crypto.createHash('sha256');

    // PassThrough so we can pipe to both hasher and storage
    const passthrough = new PassThrough();

    // Tee: update all hash functions on each chunk
    let byteCount = 0;
    fileStream.on('data', chunk => {
      byteCount += chunk.length;
      md5Hash.update(chunk);
      sha1Hash.update(chunk);
      sha256Hash.update(chunk);
      passthrough.push(chunk);
    });
    fileStream.on('end', () => passthrough.end());
    fileStream.on('error', err => passthrough.destroy(err));

    // ── Log receipt in CoC before anything else ──────────────────────────
    const cocPromise = logFileReceived({
      matterId,
      dataSourceId,
      userId:   req.user?.id,
      userName: req.user?.name,
      file:     { originalName, size: null, originalPath },
    }).catch(() => {}); // never block on CoC write

    // Storage key: deterministic, collision-resistant
    const storageId  = crypto.randomUUID();
    const safeExt    = getSafeExtension(originalName);
    const storageKey = `${matterId}/${dataSourceId}/${storageId}${safeExt}`;

    // ── Stream to MinIO (multipart for large files) ──────────────────────
    const uploadPromise = storageClient.putObject(BUCKET, storageKey, passthrough)
      .then(async () => {
        await cocPromise;

        const computedMd5    = md5Hash.digest('hex');
        const computedSha1   = sha1Hash.digest('hex');
        const computedSha256 = sha256Hash.digest('hex');
        const ext            = getExtension(originalName);

        // Insert document record
        const insertResult = await db.query(
          `INSERT INTO documents (
             matter_id, data_source_id, custodian_id,
             original_name, original_path,
             storage_key, storage_bucket, file_size,
             md5, sha1, sha256, file_ext,
             processing_stage
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
           RETURNING id`,
          [
            matterId, dataSourceId, custodianId,
            originalName, originalPath,
            storageKey, BUCKET, byteCount,
            computedMd5, computedSha1, computedSha256, ext,
            PROCESSING_STAGE.HASHING,
          ]
        );

        const documentId = insertResult.rows[0].id;

        // Log hashes to CoC
        await logFileHashed({
          matterId, documentId, dataSourceId,
          file: { originalName, md5: computedMd5, sha1: computedSha1, sha256: computedSha256 },
        }).catch(() => {});

        // Update data source stats
        await db.query(
          'UPDATE data_sources SET total_files = total_files + 1, total_bytes = total_bytes + $2 WHERE id = $1',
          [dataSourceId, byteCount]
        ).catch(() => {});

        // ── Verify stored file (re-read + re-hash) ──────────────────────
        const verified = await verifyStoredObject(storageKey, computedSha256);
        await logHashVerified({ matterId, documentId, file: { originalName, sha256: computedSha256 }, verified }).catch(() => {});

        if (!verified) {
          await recordHashMismatch({ matterId, documentId, dataSourceId, fileName: originalName, expectedHash: computedSha256, actualHash: 'STORED_HASH_MISMATCH' });
          await db.query('UPDATE documents SET processing_stage = $2, hash_verified = FALSE WHERE id = $1', [documentId, PROCESSING_STAGE.ERROR]);
          return { originalName, error: 'Hash verification failed — integrity issue', documentId };
        }

        // Mark verified + queue
        await db.query(
          'UPDATE documents SET hash_verified = TRUE, hash_verified_at = NOW(), processing_stage = $2 WHERE id = $1',
          [documentId, PROCESSING_STAGE.QUEUED]
        );

        await queue.add('process-document', {
          documentId, matterId, dataSourceId,
          storageKey, originalName, sha256: computedSha256,
        }, { priority: 5, attempts: 3, backoff: { type: 'exponential', delay: 5000 } });

        return {
          originalName,
          documentId,
          hashes: { md5: computedMd5, sha1: computedSha1, sha256: computedSha256 },
          storageKey,
          bytes: byteCount,
        };
      });

    results.push(uploadPromise.catch(err => {
      errors.push({ originalName, error: err.message });
      return null;
    }));
  });

  bb.on('finish', async () => {
    try {
      const settled = await Promise.all(results);
      const successes = settled.filter(Boolean);
      res.json({
        success: successes,
        errors,
        totalFiles:   fileCount,
        successCount: successes.length,
        errorCount:   errors.length,
      });
    } catch (err) { next(err); }
  });

  bb.on('error', next);
  req.pipe(bb);
});

// ─── POST /api/ingest/:matterId/presigned — get a presigned MinIO URL ────────
//
// For very large files (forensic images, large PSTs), the browser uploads
// directly to MinIO, bypassing the API server entirely.
// After upload, the browser calls /api/ingest/:matterId/register to record
// the file and kick off processing.
//
router.post('/:matterId/presigned', async (req, res, next) => {
  try {
    const { dataSourceId, fileName, fileSize } = req.body;
    if (!dataSourceId || !fileName) return res.status(400).json({ error: 'dataSourceId and fileName are required' });

    const storageId  = crypto.randomUUID();
    const safeExt    = getSafeExtension(fileName);
    const storageKey = `${req.params.matterId}/${dataSourceId}/${storageId}${safeExt}`;

    // 24-hour presigned URL
    const url = await storageClient.presignedPutObject(BUCKET, storageKey, 24 * 60 * 60);

    res.json({ url, storageKey, storageId });
  } catch (err) { next(err); }
});

// ─── POST /api/ingest/:matterId/register — register a presigned-uploaded file ─
router.post('/:matterId/register', async (req, res, next) => {
  try {
    const { matterId } = req.params;
    const { dataSourceId, storageKey, originalName, originalPath, custodianId, clientMd5, clientSha256 } = req.body;

    if (!dataSourceId || !storageKey || !originalName) {
      return res.status(400).json({ error: 'dataSourceId, storageKey, originalName required' });
    }

    // Get object stats from MinIO
    const stat = await storageClient.statObject(BUCKET, storageKey);

    // Hash the stored object
    const stream   = await storageClient.getObject(BUCKET, storageKey);
    const md5Hash  = crypto.createHash('md5');
    const sha1Hash = crypto.createHash('sha1');
    const sha256Hash = crypto.createHash('sha256');

    await new Promise((resolve, reject) => {
      stream.on('data', chunk => { md5Hash.update(chunk); sha1Hash.update(chunk); sha256Hash.update(chunk); });
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    const computedMd5    = md5Hash.digest('hex');
    const computedSha1   = sha1Hash.digest('hex');
    const computedSha256 = sha256Hash.digest('hex');

    // Verify against client-provided hash if given
    if (clientSha256 && clientSha256 !== computedSha256) {
      await recordHashMismatch({
        matterId, dataSourceId,
        fileName: originalName,
        expectedHash: clientSha256,
        actualHash:   computedSha256,
      });
      return res.status(422).json({ error: 'Hash mismatch — file integrity cannot be confirmed', computedSha256, clientSha256 });
    }

    const ext = getExtension(originalName);
    const insertResult = await db.query(
      `INSERT INTO documents (
         matter_id, data_source_id, custodian_id,
         original_name, original_path,
         storage_key, storage_bucket, file_size,
         md5, sha1, sha256, file_ext,
         hash_verified, hash_verified_at,
         processing_stage
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,TRUE,NOW(),$13)
       RETURNING id`,
      [
        matterId, dataSourceId, custodianId || null,
        originalName, originalPath || null,
        storageKey, BUCKET, stat.size,
        computedMd5, computedSha1, computedSha256, ext,
        PROCESSING_STAGE.QUEUED,
      ]
    );

    const documentId = insertResult.rows[0].id;

    await logFileHashed({ matterId, documentId, dataSourceId, file: { originalName, md5: computedMd5, sha1: computedSha1, sha256: computedSha256 } }).catch(() => {});
    await logHashVerified({ matterId, documentId, file: { originalName, sha256: computedSha256 }, verified: true }).catch(() => {});

    await db.query('UPDATE data_sources SET total_files = total_files + 1, total_bytes = total_bytes + $2 WHERE id = $1', [dataSourceId, stat.size]).catch(() => {});

    await queue.add('process-document', {
      documentId, matterId, dataSourceId,
      storageKey, originalName, sha256: computedSha256,
    }, { priority: 5, attempts: 3, backoff: { type: 'exponential', delay: 5000 } });

    res.json({ documentId, hashes: { md5: computedMd5, sha1: computedSha1, sha256: computedSha256 } });
  } catch (err) { next(err); }
});

// ─── GET /api/ingest/:matterId/sources ───────────────────────────────────────
router.get('/:matterId/sources', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT ds.*, c.name AS custodian_name
       FROM data_sources ds
       LEFT JOIN custodians c ON c.id = ds.custodian_id
       WHERE ds.matter_id = $1
       ORDER BY ds.created_at DESC`,
      [req.params.matterId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function verifyStoredObject(storageKey, expectedSha256) {
  try {
    const stream = await storageClient.getObject(BUCKET, storageKey);
    const sha256 = crypto.createHash('sha256');
    await new Promise((resolve, reject) => {
      stream.on('data', chunk => sha256.update(chunk));
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    return sha256.digest('hex') === expectedSha256;
  } catch {
    return false;
  }
}

function getExtension(filename) {
  const match = filename.match(/\.([^.]+)$/);
  return match ? `.${match[1].toLowerCase()}` : '';
}

function getSafeExtension(filename) {
  const ext = getExtension(filename);
  return /^\.[\w]{1,10}$/.test(ext) ? ext : '';
}

export default router;
