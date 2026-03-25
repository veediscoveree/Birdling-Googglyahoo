import { Router } from 'express';
import { db } from '../db/index.js';
import { logEvent } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();

// GET /api/matters — list all matters (with stats)
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT
        m.*,
        COUNT(DISTINCT ds.id)   AS source_count,
        COUNT(DISTINCT d.id)    AS document_count,
        COUNT(DISTINCT d.id) FILTER (WHERE d.processing_stage = 'COMPLETE') AS processed_count,
        COUNT(DISTINCT d.id) FILTER (WHERE d.processing_stage = 'ERROR')    AS error_count,
        COUNT(DISTINCT d.id) FILTER (WHERE d.processing_stage = 'NEEDS_REMEDIATION') AS remediation_count,
        SUM(d.file_size)        AS total_bytes
      FROM matters m
      LEFT JOIN data_sources ds ON ds.matter_id = m.id
      LEFT JOIN documents d     ON d.matter_id = m.id
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) { next(err); }
});

// GET /api/matters/:id
router.get('/:id', async (req, res, next) => {
  try {
    const matter = await db.query('SELECT * FROM matters WHERE id = $1', [req.params.id]);
    if (!matter.rows.length) return res.status(404).json({ error: 'Matter not found' });
    res.json(matter.rows[0]);
  } catch (err) { next(err); }
});

// POST /api/matters — create matter
router.post('/', async (req, res, next) => {
  try {
    const {
      number, name, description, client, opposingParty,
      dateOpened, batesPrefix, batesStart = 1, batesPadding = 7
    } = req.body;

    if (!number || !name) return res.status(400).json({ error: 'number and name are required' });

    const result = await db.query(
      `INSERT INTO matters (number, name, description, client, opposing_party, date_opened, bates_prefix, bates_start, bates_next, bates_padding, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$8,$9,$10)
       RETURNING *`,
      [number, name, description, client, opposingParty, dateOpened, batesPrefix, batesStart, batesPadding, req.user?.id]
    );

    const matter = result.rows[0];

    // Create default system tags for the matter
    await db.query(`
      INSERT INTO tags (matter_id, name, label, color, is_system, is_exclusive, group_name, sort_order)
      VALUES
        ($1,'RESPONSIVE','Responsive','#16a34a',true,true,'Responsiveness',10),
        ($1,'NON_RESPONSIVE','Non-Responsive','#dc2626',true,true,'Responsiveness',20),
        ($1,'NEEDS_REVIEW','Needs Review','#d97706',true,false,'Responsiveness',30),
        ($1,'PRIVILEGED_AC','Priv — Atty/Client','#7c3aed',true,true,'Privilege',10),
        ($1,'PRIVILEGED_WP','Priv — Work Product','#6d28d9',true,true,'Privilege',20),
        ($1,'PRIVILEGED_OTHER','Priv — Other','#5b21b6',true,false,'Privilege',30),
        ($1,'CONFIDENTIAL','Confidential','#0369a1',true,true,'Confidentiality',10),
        ($1,'HIGHLY_CONFIDENTIAL','Highly Confidential','#1e3a5f',true,true,'Confidentiality',20),
        ($1,'HOT_DOC','Hot Doc','#ef4444',true,false,'Status',10),
        ($1,'KEY_DOCUMENT','Key Document','#f59e0b',true,false,'Status',20),
        ($1,'QC_HOLD','QC Hold','#78716c',true,false,'Status',30),
        ($1,'FOR_PRODUCTION','For Production','#0891b2',true,false,'Production',10),
        ($1,'WITHHELD','Withheld','#64748b',true,false,'Production',20)
    `, [matter.id]);

    await logEvent({
      eventType:   AUDIT_EVENT.MATTER_CREATED,
      matterId:    matter.id,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Matter created: ${matter.number} — ${matter.name}`,
      afterState:  matter,
    });

    res.status(201).json(matter);
  } catch (err) { next(err); }
});

// PATCH /api/matters/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, client, opposingParty, status, batesPrefix } = req.body;
    const before = await db.query('SELECT * FROM matters WHERE id = $1', [req.params.id]);
    if (!before.rows.length) return res.status(404).json({ error: 'Matter not found' });

    const result = await db.query(
      `UPDATE matters SET
         name = COALESCE($2, name),
         description = COALESCE($3, description),
         client = COALESCE($4, client),
         opposing_party = COALESCE($5, opposing_party),
         status = COALESCE($6, status),
         bates_prefix = COALESCE($7, bates_prefix)
       WHERE id = $1 RETURNING *`,
      [req.params.id, name, description, client, opposingParty, status, batesPrefix]
    );

    await logEvent({
      eventType:   AUDIT_EVENT.MATTER_UPDATED,
      matterId:    req.params.id,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Matter updated: ${result.rows[0].number}`,
      beforeState: before.rows[0],
      afterState:  result.rows[0],
    });

    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

// GET /api/matters/:id/stats — processing statistics
router.get('/:id/stats', async (req, res, next) => {
  try {
    const id = req.params.id;
    const [docs, errors, sources] = await Promise.all([
      db.query(`
        SELECT
          processing_stage, COUNT(*) AS count,
          SUM(file_size) AS bytes
        FROM documents WHERE matter_id = $1
        GROUP BY processing_stage`, [id]),
      db.query(`
        SELECT severity, COUNT(*) AS count,
               COUNT(*) FILTER (WHERE is_remediated) AS remediated
        FROM processing_errors WHERE matter_id = $1
        GROUP BY severity`, [id]),
      db.query(`SELECT * FROM data_sources WHERE matter_id = $1`, [id]),
    ]);

    res.json({
      byStage:  docs.rows,
      errors:   errors.rows,
      sources:  sources.rows,
    });
  } catch (err) { next(err); }
});

// GET /api/matters/:id/custodians
router.get('/:id/custodians', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM custodians WHERE matter_id = $1 ORDER BY name',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// POST /api/matters/:id/custodians
router.post('/:id/custodians', async (req, res, next) => {
  try {
    const { name, email, title, department, organization, notes } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const result = await db.query(
      `INSERT INTO custodians (matter_id, name, email, title, department, organization, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [req.params.id, name, email, title, department, organization, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

// GET /api/matters/:id/tags
router.get('/:id/tags', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM tags WHERE matter_id = $1 ORDER BY group_name, sort_order',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

export default router;
