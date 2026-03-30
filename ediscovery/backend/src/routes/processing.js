import { Router } from 'express';
import { Queue } from 'bullmq';
import { db } from '../db/index.js';

const router = Router();

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
const url = new URL(REDIS_URL);
const connection = { host: url.hostname, port: parseInt(url.port) || 6379, password: url.password || undefined };
const processingQueue = new Queue('processing', { connection });

// GET /api/processing/queue-stats — BullMQ queue statistics
router.get('/queue-stats', async (req, res, next) => {
  try {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      processingQueue.getWaitingCount(),
      processingQueue.getActiveCount(),
      processingQueue.getCompletedCount(),
      processingQueue.getFailedCount(),
      processingQueue.getDelayedCount(),
    ]);
    res.json({ waiting, active, completed, failed, delayed });
  } catch (err) { next(err); }
});

// POST /api/processing/reprocess — reprocess a specific document
router.post('/reprocess', async (req, res, next) => {
  try {
    const { documentId } = req.body;
    if (!documentId) return res.status(400).json({ error: 'documentId required' });

    const doc = await db.query(
      'SELECT id, matter_id, data_source_id, storage_key, original_name, sha256 FROM documents WHERE id = $1',
      [documentId]
    );
    if (!doc.rows.length) return res.status(404).json({ error: 'Document not found' });
    const d = doc.rows[0];

    // Reset processing stage
    await db.query(
      `UPDATE documents
       SET processing_stage = 'QUEUED', retry_count = retry_count + 1, updated_at = NOW()
       WHERE id = $1`,
      [documentId]
    );

    // Re-enqueue
    await processingQueue.add('process-document', {
      documentId:   d.id,
      matterId:     d.matter_id,
      dataSourceId: d.data_source_id,
      storageKey:   d.storage_key,
      originalName: d.original_name,
      sha256:       d.sha256,
    }, { priority: 1, attempts: 3 });

    res.json({ success: true, documentId });
  } catch (err) { next(err); }
});

export default router;
