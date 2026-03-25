import { Queue } from 'bullmq';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
const url = new URL(REDIS_URL);
const connection = {
  host:     url.hostname,
  port:     parseInt(url.port) || 6379,
  password: url.password || undefined,
};

export const queue = new Queue('processing', {
  connection,
  defaultJobOptions: {
    attempts:  3,
    backoff:   { type: 'exponential', delay: 5000 },
    removeOnComplete: { count: 1000 },
    removeOnFail:     { count: 5000 },
  },
});
