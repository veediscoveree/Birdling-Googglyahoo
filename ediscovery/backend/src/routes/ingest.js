import { Router } from 'express';
import multer from 'multer';
import { db } from '../db/index.js';
import { ingestFile } from '../services/ingestion.js';
import { logEvent } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 * 1024 } });

// POST /api/ingest/:matterId/sources — create a data source
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
      eventType:   AUDIT_EVENT.INGEST_STARTED,
      matterId:    req.params.matterId,
      dataSourceId: source.id,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Data source created: "${name}" (type: ${sourceType})${collectedBy ? ` collected by ${collectedBy}` : ''}`,
      afterState:  source,
    });

    res.status(201).json(source);
  } catch (err) { next(err); }
});

// POST /api/ingest/:matterId/files — upload and ingest a file
router.post('/:matterId/files', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });

    const { matterId } = req.params;
    const { dataSourceId, custodianId, originalPath } = req.body;

    if (!dataSourceId) return res.status(400).json({ error: 'dataSourceId is required' });

    const result = await ingestFile({
      matterId,
      dataSourceId,
      custodianId:  custodianId || null,
      fileStream:   req.file.buffer,
      originalName: req.file.originalname,
      originalPath: originalPath || null,
      fileSize:     req.file.size,
      requestContext: {
        userId:   req.user?.id,
        userName: req.user?.name,
        ipAddress: req.ip,
      },
    });

    res.json(result);
  } catch (err) { next(err); }
});

// GET /api/ingest/:matterId/sources — list sources
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

export default router;
