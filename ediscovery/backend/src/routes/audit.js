import { Router } from 'express';
import { getAuditLog, verifyAuditChain } from '../services/chainOfCustody.js';

const router = Router();

// GET /api/audit?matterId=&documentId=&eventType=&limit=&offset=
router.get('/', async (req, res, next) => {
  try {
    const { matterId, documentId, eventType, userId, limit = 100, offset = 0 } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId is required' });
    const result = await getAuditLog({ matterId, documentId, eventType, userId, limit: parseInt(limit), offset: parseInt(offset) });
    res.json(result);
  } catch (err) { next(err); }
});

// GET /api/audit/verify?matterId= — verify chain integrity
router.get('/verify', async (req, res, next) => {
  try {
    const { matterId } = req.query;
    if (!matterId) return res.status(400).json({ error: 'matterId is required' });
    const result = await verifyAuditChain(matterId);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
