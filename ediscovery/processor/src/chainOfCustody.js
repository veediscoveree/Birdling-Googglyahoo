/**
 * Thin wrapper — processor imports CoC from its own context.
 * Delegates to same logic as the backend CoC service.
 */
import crypto from 'crypto';
import { db } from './db.js';

let _lastHash = null;

export async function initChainOfCustody() {
  const result = await db.query('SELECT entry_hash FROM audit_log ORDER BY id DESC LIMIT 1');
  _lastHash = result.rows[0]?.entry_hash ?? '';
}

export async function logEvent(entry) {
  const { eventType, matterId=null, documentId=null, dataSourceId=null,
    userId=null, userName=null, description, metadata=null } = entry;

  const prevHash = _lastHash ?? '';
  const payload  = JSON.stringify({ prevHash, eventType, matterId, documentId, description, ts: new Date().toISOString() });
  const entryHash = crypto.createHash('sha256').update(payload).digest('hex');

  try {
    const result = await db.query(
      `INSERT INTO audit_log (entry_hash, prev_hash, event_type, matter_id, document_id, data_source_id,
         user_id, user_name, description, metadata)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [entryHash, prevHash, eventType, matterId, documentId, dataSourceId,
       userId, userName ?? 'processor', description,
       metadata ? JSON.stringify(metadata) : null]
    );
    _lastHash = entryHash;
    return { id: result.rows[0].id, entryHash };
  } catch (err) {
    console.error('[coc] Failed to write audit entry:', err.message);
  }
}
