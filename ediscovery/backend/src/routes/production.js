/**
 * Production Routes
 *
 * A production is an export of a set of documents with:
 *  - Bates numbering
 *  - Native, PDF, or TIFF images
 *  - Load files (DAT, OPT, EDRM XML)
 *  - Full audit trail
 */
import { Router } from 'express';
import { db } from '../db/index.js';
import { logProductionCreated, logEvent } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();

// GET /api/production?matterId=
router.get('/', async (req, res, next) => {
  try {
    const { matterId } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId required' });
    const result = await db.query(
      'SELECT * FROM productions WHERE matter_id = $1 ORDER BY created_at DESC',
      [matterId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// POST /api/production — create a production
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
      documentIds = [],   // specific documents, or empty for all tagged FOR_PRODUCTION
    } = req.body;

    if (!matterId || !name) return res.status(400).json({ error: 'matterId and name are required' });

    // Look up matter for Bates prefix
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
         load_file_format, produced_to, created_by
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        matterId, name, description,
        prefix, startNo,
        includeNative, includePdf, includeTiff, includeText,
        loadFileFormat, producedTo, req.user?.id,
      ]
    );

    const production = result.rows[0];

    await logProductionCreated({
      matterId,
      productionId: production.id,
      userId:       req.user?.id,
      userName:     req.user?.name,
      production,
    });

    // TODO: Enqueue production build job (Bates numbering, image generation, load file)

    res.status(201).json(production);
  } catch (err) { next(err); }
});

// GET /api/production/:id/privilege-log — export privilege log
router.get('/:id/privilege-log', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT pl.*, d.original_name, d.bates_begin
       FROM privilege_log pl
       LEFT JOIN documents d ON d.id = pl.document_id
       WHERE pl.production_id = $1 OR pl.matter_id = (
         SELECT matter_id FROM productions WHERE id = $1
       )
       ORDER BY pl.entry_number, pl.created_at`,
      [req.params.id]
    );

    // Generate DAT-style privilege log
    const headers = [
      'Entry #', 'Bates Begin', 'Document Date', 'Author', 'Recipients',
      'Document Type', 'Privilege Type', 'Description', 'Custodian',
    ];
    const rows = result.rows.map((r, i) => [
      r.entry_number ?? i + 1,
      r.bates_begin ?? '',
      r.document_date ?? '',
      r.author ?? '',
      (r.recipients ?? []).join('; '),
      r.doc_type ?? '',
      r.privilege_type,
      r.description,
      r.custodian ?? '',
    ]);

    const csv = [headers, ...rows].map(row =>
      row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')
    ).join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="privilege-log-${req.params.id}.csv"`);
    res.send(csv);
  } catch (err) { next(err); }
});

export default router;
