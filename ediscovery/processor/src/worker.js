/**
 * BullMQ Processing Worker
 * Consumes jobs from the 'processing' queue and runs the document pipeline.
 */

import { Worker } from 'bullmq';
import { processDocument } from './pipeline.js';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
const CONCURRENCY = parseInt(process.env.CONCURRENCY ?? '4');

const url = new URL(REDIS_URL);
const connection = {
  host:     url.hostname,
  port:     parseInt(url.port) || 6379,
  password: url.password || undefined,
};

const worker = new Worker('processing', processDocument, {
  connection,
  concurrency: CONCURRENCY,
  limiter: { max: CONCURRENCY, duration: 1000 },
});

worker.on('completed', job => {
  console.log(`[worker] Job ${job.id} completed: ${job.data.originalName}`);
});

worker.on('failed', (job, err) => {
  console.error(`[worker] Job ${job?.id} failed: ${job?.data?.originalName} — ${err.message}`);
});

worker.on('error', err => {
  console.error('[worker] Worker error:', err.message);
});

console.log(`[worker] Started — concurrency: ${CONCURRENCY}`);
