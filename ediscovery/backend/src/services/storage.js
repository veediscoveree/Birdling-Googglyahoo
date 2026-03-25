import { Client } from 'minio';

export const BUCKET = process.env.MINIO_BUCKET ?? 'vdiscovery-files';

export const storageClient = new Client({
  endPoint:        process.env.MINIO_ENDPOINT ?? 'localhost',
  port:            parseInt(process.env.MINIO_PORT ?? '9000'),
  useSSL:          process.env.MINIO_USE_SSL === 'true',
  accessKey:       process.env.MINIO_ACCESS_KEY ?? 'vdiscovery',
  secretKey:       process.env.MINIO_SECRET_KEY ?? 'changeme123',
});

export async function ensureBucket() {
  const exists = await storageClient.bucketExists(BUCKET);
  if (!exists) {
    await storageClient.makeBucket(BUCKET, 'us-east-1');
    console.log(`[storage] Created bucket: ${BUCKET}`);
  }
}
