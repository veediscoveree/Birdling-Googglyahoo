/**
 * VDiscovery eDiscovery Platform — Express API Server
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { initDb } from './db/index.js';
import { initChainOfCustody } from './services/chainOfCustody.js';

import mattersRouter      from './routes/matters.js';
import documentsRouter    from './routes/documents.js';
import processingRouter   from './routes/processing.js';
import searchRouter       from './routes/search.js';
import productionRouter   from './routes/production.js';
import auditRouter        from './routes/audit.js';
import errorsRouter       from './routes/errors.js';
import ingestRouter       from './routes/ingest.js';

const app  = express();
const PORT = process.env.PORT ?? 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*', credentials: true }));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/matters',     mattersRouter);
app.use('/api/documents',   documentsRouter);
app.use('/api/processing',  processingRouter);
app.use('/api/search',      searchRouter);
app.use('/api/production',  productionRouter);
app.use('/api/audit',       auditRouter);
app.use('/api/errors',      errorsRouter);
app.use('/api/ingest',      ingestRouter);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const status = err.status ?? err.statusCode ?? 500;
  console.error(`[server] ${err.status ?? 500} ${req.method} ${req.path}:`, err.message);
  res.status(status).json({
    error:   err.message ?? 'Internal server error',
    status,
    path:    req.path,
  });
});

// ─── Startup ──────────────────────────────────────────────────────────────────
async function start() {
  await initDb();
  await initChainOfCustody();
  app.listen(PORT, () => console.log(`[server] Listening on :${PORT}`));
}

start().catch(err => {
  console.error('[server] Fatal startup error:', err);
  process.exit(1);
});
