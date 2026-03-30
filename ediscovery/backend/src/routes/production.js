/**
 * Production Routes
 *
 * A production is an export of a set of documents with:
 *  - Bates numbering (PREFIX0000001 … PREFIXnnnnnnn)
 *  - Rendered PDFs (Office → LibreOffice → PDF, cached in MinIO)
 *  - Optional native files and extracted text
 *  - Load files: DAT (Concordance/Relativity), OPT (Opticon), DII (Summation), EDRM XML
 *  - Privilege log CSV (FRCP Rule 26(b)(5))
 *  - Full audit trail in the immutable chain
 *
 * Lifecycle:
 *   PENDING → BUILDING → COMPLETE | FAILED
 *
 * Endpoints:
 *   GET    /api/production?matterId=    — list productions
 *   POST   /api/production              — create + start build
 *   GET    /api/production/:id          — get single production (shows status/progress)
 *   GET    /api/production/:id/download — download the ZIP (only when COMPLETE)
 *   GET    /api/production/:id/privilege-log — CSV privilege log (FRCP 26(b)(5))
 */

import { Router } from 'express';
import { db } from '../db/index.js';
import { storageClient, BUCKET } from '../services/storage.js';
import { buildProduction } from '../services/productionBuilder.js';
import { logProductionCreated } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();

// ─── List productions ─────────────────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const { matterId } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId required' });
    const result = await db.query(
      `SELECT id, name, description, status, bates_prefix, bates_start, bates_end,
              include_native, include_pdf, include_tiff, include_text,
              load_file_format, produced_to, doc_count,
              created_by, created_at, started_at, completed_at, error_message
       FROM productions WHERE matter_id = $1 ORDER BY created_at DESC`,
      [matterId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// ─── Get single production ────────────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT p.*,
              (SELECT COUNT(*) FROM production_documents WHERE production_id = p.id) AS doc_count
       FROM productions p WHERE p.id = $1`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

// ─── Create production + kick off build ───────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const {
      matterId, name, description,
      batesPrefix, batesStart,
      includeNative = false,
      includePdf    = true,
      includeTiff   = false,
      includeText   = true,
      loadFileFormat = 'DAT',
      producedTo,
      documentIds = [],
    } = req.body;

    if (!matterId || !name) return res.status(400).json({ error: 'matterId and name are required' });

    const matter = await db.query('SELECT * FROM matters WHERE id = $1', [matterId]);
    if (!matter.rows.length) return res.status(404).json({ error: 'Matter not found' });
    const m = matter.rows[0];

    const prefix  = batesPrefix ?? m.bates_prefix ?? '';
    const startNo = batesStart  ?? m.bates_next   ?? 1;

    const result = await db.query(
      `INSERT INTO productions (
         matter_id, name, description,
         bates_prefix, bates_start,
         include_native, include_pdf, include_tiff, include_text,
         load_file_format, produced_to, created_by, status
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'PENDING')
       RETURNING *`,
      [
        matterId, name, description ?? '',
        prefix, startNo,
        includeNative, includePdf, includeTiff, includeText,
        loadFileFormat, producedTo ?? '', req.user?.id,
      ]
    );

    const production = result.rows[0];

    await logProductionCreated({
      matterId,
      productionId: production.id,
      userId:   req.user?.id,
      userName: req.user?.name,
      production,
    });

    // Kick off async build — does not block the HTTP response
    buildProduction(production.id, documentIds).catch(err =>
      console.error(`[production] build error for ${production.id}:`, err.message)
    );

    res.status(201).json(production);
  } catch (err) { next(err); }
});

// ─── Download production ZIP ──────────────────────────────────────────────────
router.get('/:id/download', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT name, status, zip_key FROM productions WHERE id = $1',
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    const { name, status, zip_key } = result.rows[0];

    if (status !== 'COMPLETE') {
      return res.status(409).json({ error: `Production is ${status} — download available when COMPLETE` });
    }
    if (!zip_key) {
      return res.status(404).json({ error: 'Production ZIP not found' });
    }

    const stream = await storageClient.getObject(BUCKET, zip_key);
    const safeName = encodeURIComponent(`${name}.zip`);
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"; filename*=UTF-8''${safeName}`);
    res.setHeader('Content-Type', 'application/zip');
    stream.pipe(res);
  } catch (err) { next(err); }
});

// ─── Privilege log CSV (FRCP Rule 26(b)(5)) ───────────────────────────────────
router.get('/:id/privilege-log', async (req, res, next) => {
  try {
    // Works for both a specific production ID and a matter-wide privilege log
    const prod = await db.query('SELECT matter_id, name FROM productions WHERE id = $1', [req.params.id]);
    if (!prod.rows.length) return res.status(404).json({ error: 'Not found' });
    const matterId = prod.rows[0].matter_id;

    const result = await db.query(
      `SELECT
         pl.entry_number,
         d.bates_begin,
         pl.document_date,
         pl.author,
         pl.recipients,
         pl.doc_type,
         pl.privilege_type,
         pl.description,
         pl.custodian,
         d.original_name AS file_name
       FROM privilege_log pl
       LEFT JOIN documents d ON d.id = pl.document_id
       WHERE pl.matter_id = $1
       ORDER BY pl.entry_number NULLS LAST, pl.created_at`,
      [matterId]
    );

    const headers = [
      'Entry #', 'Bates Begin', 'Document Date', 'Author', 'Recipients',
      'Document Type', 'Privilege Type', 'Description', 'Custodian', 'File Name',
    ];

    const rows = result.rows.map((r, i) => [
      r.entry_number ?? i + 1,
      r.bates_begin  ?? '',
      r.document_date ? new Date(r.document_date).toISOString().slice(0, 10) : '',
      r.author       ?? '',
      Array.isArray(r.recipients) ? r.recipients.join('; ') : (r.recipients ?? ''),
      r.doc_type     ?? '',
      r.privilege_type ?? '',
      r.description  ?? '',
      r.custodian    ?? '',
      r.file_name    ?? '',
    ]);

    const csv = [headers, ...rows].map(row =>
      row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
    ).join('\r\n');

    const safeName = encodeURIComponent(`privilege-log-${prod.rows[0].name}.csv`);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"; filename*=UTF-8''${safeName}`);
    res.send(csv);
  } catch (err) { next(err); }
});

export default router;
