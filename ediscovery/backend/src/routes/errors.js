import { Router } from 'express';
import { getErrors, getErrorSummary, markRemediated, dismissError, exportErrorsAsCsv } from '../services/errorTracker.js';
import { logEvent } from '../services/chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const router = Router();

// GET /api/errors?matterId=&severity=&errorType=&isRemediated=&limit=&offset=
router.get('/', async (req, res, next) => {
  try {
    const { matterId, errorType, severity, stage, isRemediated, isDismissed, dataSourceId, limit = 50, offset = 0 } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId is required' });

    const result = await getErrors({
      matterId,
      errorType,
      severity,
      stage,
      isRemediated: isRemediated !== undefined ? isRemediated === 'true' : undefined,
      isDismissed:  isDismissed  !== undefined ? isDismissed  === 'true' : undefined,
      dataSourceId,
      limit:  parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(result);
  } catch (err) { next(err); }
});

// GET /api/errors/summary?matterId=
router.get('/summary', async (req, res, next) => {
  try {
    const { matterId } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId is required' });
    res.json(await getErrorSummary(matterId));
  } catch (err) { next(err); }
});

// GET /api/errors/export.csv?matterId=
router.get('/export.csv', async (req, res, next) => {
  try {
    const { matterId } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId is required' });
    const csv = await exportErrorsAsCsv(matterId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="error-report-${matterId}.csv"`);
    res.send(csv);
  } catch (err) { next(err); }
});

// POST /api/errors/:id/remediate
router.post('/:id/remediate', async (req, res, next) => {
  try {
    const { notes } = req.body;
    const error = await markRemediated({ errorId: req.params.id, userId: req.user?.id, notes });
    await logEvent({
      eventType:   AUDIT_EVENT.ERROR_REMEDIATED,
      matterId:    error.matter_id,
      documentId:  error.document_id,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Processing error remediated: ${error.error_type} — ${notes ?? ''}`,
      metadata:    { errorId: req.params.id },
    });
    res.json(error);
  } catch (err) { next(err); }
});

// POST /api/errors/:id/dismiss
router.post('/:id/dismiss', async (req, res, next) => {
  try {
    const { reason } = req.body;
    const error = await dismissError({ errorId: req.params.id, userId: req.user?.id, reason });
    await logEvent({
      eventType:   AUDIT_EVENT.ERROR_DISMISSED,
      matterId:    error.matter_id,
      userId:      req.user?.id,
      userName:    req.user?.name,
      description: `Processing error dismissed: ${error.error_type} — ${reason ?? ''}`,
    });
    res.json(error);
  } catch (err) { next(err); }
});

export default router;
