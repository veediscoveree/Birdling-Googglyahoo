/**
 * Documents API — including render and download endpoints
 *
 * GET /api/documents/:id/render
 *   → Streams a viewable representation to the browser:
 *     PDF/images → served directly from MinIO
 *     Office     → converted via LibreOffice to PDF, served
 *     Email      → parsed, rendered to safe HTML, served
 *     Text/Code  → served as text/plain
 *
 *   This is what the iframe in Review.jsx points to.
 *   NO proprietary licenses needed:
 *     - LibreOffice (MPL 2.0) handles Office → PDF conversion
 *     - PDF is served as-is; browser's built-in PDF viewer renders it
 *     - Email is parsed and sanitized HTML
 *
 * GET /api/documents/:id/download
 *   → Serves the original native file from MinIO.
 *
 * GET /api/documents/:id/text
 *   → Serves the extracted text file from MinIO.
 */

import { Router } from 'express';
import { db } from '../db/index.js';
import { storageClient, BUCKET } from '../services/storage.js';
import { renderDocument } from '../services/renderer.js';
import { logDocumentViewed, logDocumentTagged, logEvent } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();

// ─── List documents ───────────────────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const {
      matterId, dataSourceId, custodianId,
      stage, reviewStatus, isPrivileged, isResponsive, isDuplicate, isNist,
      tag, hasOcr, fileCategory,
      dateFrom, dateTo, q,
      sortBy = 'created_at', sortDir = 'DESC',
      limit = 50, offset = 0,
    } = req.query;

    if (!matterId) return res.status(400).json({ error: 'matterId is required' });

    const conditions = ['d.matter_id = $1'];
    const params = [matterId];
    const add = v => { params.push(v); return `$${params.length}`; };

    if (dataSourceId)   conditions.push(`d.data_source_id = ${add(dataSourceId)}`);
    if (custodianId)    conditions.push(`d.custodian_id = ${add(custodianId)}`);
    if (stage)          conditions.push(`d.processing_stage = ${add(stage)}`);
    if (reviewStatus)   conditions.push(`d.review_status = ${add(reviewStatus)}`);
    if (isPrivileged !== undefined) conditions.push(`d.is_privileged = ${add(isPrivileged === 'true')}`);
    if (isResponsive !== undefined) conditions.push(`d.is_responsive = ${add(isResponsive === 'true')}`);
    if (isDuplicate !== undefined)  conditions.push(`d.is_duplicate = ${add(isDuplicate === 'true')}`);
    if (isNist !== undefined)       conditions.push(`d.is_nist = ${add(isNist === 'true')}`);
    if (fileCategory)   conditions.push(`d.file_category = ${add(fileCategory)}`);
    if (hasOcr !== undefined)       conditions.push(`d.has_ocr = ${add(hasOcr === 'true')}`);
    if (dateFrom)       conditions.push(`d.date_modified >= ${add(dateFrom)}`);
    if (dateTo)         conditions.push(`d.date_modified <= ${add(dateTo)}`);
    if (q)              conditions.push(`d.original_name ILIKE ${add(`%${q}%`)}`);
    if (tag) {
      conditions.push(`EXISTS (
        SELECT 1 FROM document_tags dt JOIN tags t ON t.id=dt.tag_id
        WHERE dt.document_id=d.id AND t.name=${add(tag)}
      )`);
    }

    const where = conditions.join(' AND ');
    const validSort = ['created_at','original_name','file_size','date_modified','email_date','processing_stage'].includes(sortBy) ? sortBy : 'created_at';
    const dir = sortDir === 'ASC' ? 'ASC' : 'DESC';
    params.push(parseInt(limit), parseInt(offset));

    const [rowsResult, countResult] = await Promise.all([
      db.query(
        `SELECT
           d.id, d.original_name, d.file_size, d.file_category, d.detected_mime, d.file_ext,
           d.processing_stage, d.processing_error_count,
           d.md5, d.sha256, d.is_duplicate, d.is_near_dup, d.is_nist, d.is_privileged,
           d.is_responsive, d.review_status, d.has_ocr, d.ocr_confidence,
           d.email_from, d.email_to, d.email_subject, d.email_date,
           d.author, d.date_created, d.date_modified,
           d.custodian_name, d.language, d.page_count, d.word_count, d.text_length,
           d.created_at, d.updated_at,
           ARRAY(
             SELECT t.name FROM document_tags dt JOIN tags t ON t.id=dt.tag_id WHERE dt.document_id=d.id
           ) AS tags
         FROM documents d
         WHERE ${where}
         ORDER BY d.${validSort} ${dir}
         LIMIT $${params.length - 1} OFFSET $${params.length}`,
        params
      ),
      db.query(`SELECT COUNT(*) FROM documents d WHERE ${where}`, params.slice(0, -2)),
    ]);

    res.json({ documents: rowsResult.rows, total: parseInt(countResult.rows[0].count), limit: parseInt(limit), offset: parseInt(offset) });
  } catch (err) { next(err); }
});

// ─── Get single document ──────────────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT d.*,
        ARRAY(
          SELECT json_build_object(
            'id',t.id,'name',t.name,'label',t.label,'color',t.color,
            'group_name',t.group_name,'is_exclusive',t.is_exclusive,
            'applied_at',dt.applied_at
          )
          FROM document_tags dt JOIN tags t ON t.id=dt.tag_id WHERE dt.document_id=d.id
        ) AS tags
      FROM documents d WHERE d.id = $1
    `, [req.params.id]);

    if (!result.rows.length) return res.status(404).json({ error: 'Document not found' });

    await logDocumentViewed({
      matterId:   result.rows[0].matter_id,
      documentId: req.params.id,
      userId:     req.user?.id,
      userName:   req.user?.name,
      ipAddress:  req.ip,
    }).catch(() => {});

    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

// ─── Render — viewable version in browser ────────────────────────────────────
router.get('/:id/render', async (req, res, next) => {
  try {
    const doc = await db.query(
      'SELECT id, storage_key, original_name, file_category, detected_mime, email_from, email_subject FROM documents WHERE id = $1',
      [req.params.id]
    );
    if (!doc.rows.length) return res.status(404).json({ error: 'Not found' });
    const d = doc.rows[0];

    if (!d.storage_key) {
      return res.status(404).send('File not yet stored');
    }

    const fileStream = await storageClient.getObject(BUCKET, d.storage_key);
    const rendered   = await renderDocument(d, fileStream);

    res.setHeader('Content-Type', rendered.contentType);
    res.setHeader('Cache-Control', 'private, max-age=3600');
    // Security: prevent embedded content from accessing parent frame
    res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline'; img-src *; object-src 'none'");

    rendered.stream.pipe(res);
  } catch (err) { next(err); }
});

// ─── Download — original native file ─────────────────────────────────────────
router.get('/:id/download', async (req, res, next) => {
  try {
    const doc = await db.query(
      'SELECT storage_key, original_name, file_size FROM documents WHERE id = $1',
      [req.params.id]
    );
    if (!doc.rows.length) return res.status(404).json({ error: 'Not found' });
    const { storage_key, original_name, file_size } = doc.rows[0];

    if (!storage_key) return res.status(404).send('File not in storage');

    const stream = await storageClient.getObject(BUCKET, storage_key);
    const safeName = encodeURIComponent(original_name).replace(/'/g, '%27');

    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"; filename*=UTF-8''${safeName}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    if (file_size) res.setHeader('Content-Length', file_size);

    // Log download in CoC
    await logEvent({
      eventType:   AUDIT_EVENT.DOCUMENT_DOWNLOADED,
      documentId:  req.params.id,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Native file downloaded: "${original_name}"`,
    }).catch(() => {});

    stream.pipe(res);
  } catch (err) { next(err); }
});

// ─── Text — extracted text ────────────────────────────────────────────────────
router.get('/:id/text', async (req, res, next) => {
  try {
    const doc = await db.query(
      'SELECT text_key, original_name FROM documents WHERE id = $1',
      [req.params.id]
    );
    if (!doc.rows.length) return res.status(404).json({ error: 'Not found' });
    if (!doc.rows[0].text_key) return res.status(404).send('No extracted text available');

    const stream = await storageClient.getObject(BUCKET, doc.rows[0].text_key);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    stream.pipe(res);
  } catch (err) { next(err); }
});

// ─── Chain of custody for a document ─────────────────────────────────────────
router.get('/:id/chain-of-custody', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id,entry_hash,prev_hash,event_type,user_name,user_role,ip_address,description,metadata,occurred_at
       FROM audit_log WHERE document_id=$1 ORDER BY id ASC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// ─── Errors for a document ────────────────────────────────────────────────────
router.get('/:id/errors', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM processing_errors WHERE document_id=$1 ORDER BY occurred_at DESC',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// ─── Document family (parent + siblings) ──────────────────────────────────────
router.get('/:id/family', async (req, res, next) => {
  try {
    const doc = await db.query('SELECT parent_id,matter_id FROM documents WHERE id=$1', [req.params.id]);
    if (!doc.rows.length) return res.status(404).json({ error: 'Not found' });
    const { parent_id, matter_id } = doc.rows[0];
    const rootId = parent_id ?? req.params.id;
    const result = await db.query(
      `SELECT id,original_name,file_category,file_size,processing_stage,parent_id,created_at
       FROM documents WHERE matter_id=$1 AND (id=$2 OR parent_id=$2) ORDER BY parent_id NULLS FIRST, created_at`,
      [matter_id, rootId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

// ─── Apply tag ────────────────────────────────────────────────────────────────
router.post('/:id/tags', async (req, res, next) => {
  try {
    const { tagId, notes } = req.body;
    if (!tagId) return res.status(400).json({ error: 'tagId is required' });

    const doc = await db.query('SELECT matter_id,original_name FROM documents WHERE id=$1', [req.params.id]);
    if (!doc.rows.length) return res.status(404).json({ error: 'Document not found' });
    const tag = await db.query('SELECT * FROM tags WHERE id=$1', [tagId]);
    if (!tag.rows.length) return res.status(404).json({ error: 'Tag not found' });

    if (tag.rows[0].is_exclusive && tag.rows[0].group_name) {
      await db.query(
        `DELETE FROM document_tags WHERE document_id=$1 AND tag_id IN (
           SELECT id FROM tags WHERE group_name=$2 AND matter_id=$3
         )`,
        [req.params.id, tag.rows[0].group_name, doc.rows[0].matter_id]
      );
    }

    await db.query(
      `INSERT INTO document_tags (document_id,tag_id,matter_id,applied_by,notes)
       VALUES ($1,$2,$3,$4,$5) ON CONFLICT (document_id,tag_id) DO UPDATE SET notes=EXCLUDED.notes`,
      [req.params.id, tagId, doc.rows[0].matter_id, req.user?.id, notes]
    );

    await logDocumentTagged({
      matterId: doc.rows[0].matter_id, documentId: req.params.id,
      userId: req.user?.id, userName: req.user?.name,
      tagName: tag.rows[0].name, notes,
    }).catch(() => {});

    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── Remove tag ───────────────────────────────────────────────────────────────
router.delete('/:id/tags/:tagId', async (req, res, next) => {
  try {
    const doc = await db.query('SELECT matter_id FROM documents WHERE id=$1', [req.params.id]);
    if (!doc.rows.length) return res.status(404).json({ error: 'Not found' });
    const tag = await db.query('SELECT name FROM tags WHERE id=$1', [req.params.tagId]);

    await db.query('DELETE FROM document_tags WHERE document_id=$1 AND tag_id=$2', [req.params.id, req.params.tagId]);

    await logEvent({
      eventType: AUDIT_EVENT.DOCUMENT_UNTAGGED,
      matterId: doc.rows[0].matter_id, documentId: req.params.id,
      userId: req.user?.id, userName: req.user?.name,
      description: `Tag "${tag.rows[0]?.name}" removed`,
    }).catch(() => {});

    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── Update review coding ─────────────────────────────────────────────────────
router.patch('/:id', async (req, res, next) => {
  try {
    const { reviewStatus, isResponsive, isPrivileged, privilegeType, privilegeBasis, isWithheld, notes } = req.body;
    const result = await db.query(
      `UPDATE documents SET
         review_status   = COALESCE($2, review_status),
         is_responsive   = COALESCE($3, is_responsive),
         is_privileged   = COALESCE($4, is_privileged),
         privilege_type  = COALESCE($5, privilege_type),
         privilege_basis = COALESCE($6, privilege_basis),
         is_withheld     = COALESCE($7, is_withheld),
         notes           = COALESCE($8, notes),
         reviewer_id     = $9,
         reviewed_at     = NOW()
       WHERE id=$1 RETURNING *`,
      [req.params.id, reviewStatus, isResponsive, isPrivileged, privilegeType, privilegeBasis, isWithheld, notes, req.user?.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

export default router;
