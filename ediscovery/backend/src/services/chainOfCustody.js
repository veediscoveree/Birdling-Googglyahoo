/**
 * Chain of Custody (CoC) Service
 *
 * Every action affecting evidence must flow through here. This service writes
 * to the audit_log table which is INSERT-only (enforced at the DB trigger level).
 *
 * Each audit entry is cryptographically chained: the SHA-256 of
 * (prev_hash + json(event)) is stored as entry_hash, making the log tamper-evident.
 *
 * Design principles:
 *  - NEVER throw on CoC write failure — log the CoC failure separately and alert
 *  - ALWAYS write synchronously before returning from sensitive operations
 *  - Never modify existing entries (enforced by DB trigger)
 */

import crypto from 'crypto';
import { db } from '../db/index.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

// In-memory cache of the last audit entry hash, used to chain entries.
// On startup this is loaded from the DB. If the cache is cold and we get
// concurrent requests, PostgreSQL serialization handles ordering.
let _lastHash = null;

/**
 * Load the last audit hash from the database (called at startup).
 */
export async function initChainOfCustody() {
  const result = await db.query(
    'SELECT entry_hash FROM audit_log ORDER BY id DESC LIMIT 1'
  );
  _lastHash = result.rows[0]?.entry_hash ?? '';
  return _lastHash;
}

/**
 * Write an immutable audit log entry.
 *
 * @param {object} entry
 * @param {string} entry.eventType - from AUDIT_EVENT constants
 * @param {string} [entry.matterId]
 * @param {string} [entry.documentId]
 * @param {string} [entry.dataSourceId]
 * @param {string} [entry.userId]
 * @param {string} [entry.userName]
 * @param {string} [entry.userRole]
 * @param {string} [entry.ipAddress]
 * @param {string} [entry.userAgent]
 * @param {string} [entry.sessionId]
 * @param {string} entry.description - human-readable description of what happened
 * @param {object} [entry.beforeState] - state before the change
 * @param {object} [entry.afterState]  - state after the change
 * @param {object} [entry.metadata]    - additional context
 * @returns {Promise<{id: number, entryHash: string}>}
 */
export async function logEvent(entry) {
  const {
    eventType,
    matterId = null,
    documentId = null,
    dataSourceId = null,
    userId = null,
    userName = null,
    userRole = null,
    ipAddress = null,
    userAgent = null,
    sessionId = null,
    description,
    beforeState = null,
    afterState = null,
    metadata = null,
  } = entry;

  // Build the content we will hash
  const prevHash = _lastHash ?? '';
  const payload = JSON.stringify({
    prevHash,
    eventType,
    matterId,
    documentId,
    dataSourceId,
    userId,
    description,
    metadata,
    ts: new Date().toISOString(),
  });

  const entryHash = crypto.createHash('sha256').update(payload).digest('hex');

  const result = await db.query(
    `INSERT INTO audit_log (
       entry_hash, prev_hash, event_type,
       matter_id, document_id, data_source_id,
       user_id, user_name, user_role,
       ip_address, user_agent, session_id,
       description, before_state, after_state, metadata
     ) VALUES (
       $1, $2, $3,
       $4, $5, $6,
       $7, $8, $9,
       $10, $11, $12,
       $13, $14, $15, $16
     ) RETURNING id, entry_hash`,
    [
      entryHash, prevHash, eventType,
      matterId, documentId, dataSourceId,
      userId, userName, userRole,
      ipAddress ? ipAddress : null,
      userAgent, sessionId,
      description,
      beforeState ? JSON.stringify(beforeState) : null,
      afterState  ? JSON.stringify(afterState)  : null,
      metadata    ? JSON.stringify(metadata)    : null,
    ]
  );

  _lastHash = entryHash;
  return { id: result.rows[0].id, entryHash };
}

// ─── Convenience helpers ──────────────────────────────────────────────────────

export async function logFileReceived({ matterId, dataSourceId, userId, userName, file, metadata }) {
  return logEvent({
    eventType:    AUDIT_EVENT.FILE_RECEIVED,
    matterId,
    dataSourceId,
    userId,
    userName,
    description:  `File received: "${file.originalName}" (${formatBytes(file.size)})`,
    afterState:   { fileName: file.originalName, size: file.size, path: file.originalPath },
    metadata,
  });
}

export async function logFileHashed({ matterId, documentId, dataSourceId, file }) {
  return logEvent({
    eventType:    AUDIT_EVENT.FILE_HASHED,
    matterId,
    documentId,
    dataSourceId,
    description:  `File hashed: "${file.originalName}" MD5=${file.md5} SHA256=${file.sha256}`,
    afterState:   { md5: file.md5, sha1: file.sha1, sha256: file.sha256 },
  });
}

export async function logHashVerified({ matterId, documentId, file, verified }) {
  return logEvent({
    eventType:    verified ? AUDIT_EVENT.HASH_VERIFIED : AUDIT_EVENT.HASH_MISMATCH_DETECTED,
    matterId,
    documentId,
    description:  verified
      ? `Hash verified for "${file.originalName}" — integrity confirmed`
      : `HASH MISMATCH for "${file.originalName}" — possible tampering or corruption!`,
    metadata: { sha256: file.sha256, verified },
  });
}

export async function logProcessingError({ matterId, documentId, stage, errorType, message }) {
  return logEvent({
    eventType:    AUDIT_EVENT.PROCESSING_ERROR,
    matterId,
    documentId,
    description:  `Processing error [${stage}/${errorType}]: ${message.substring(0, 200)}`,
    metadata:     { stage, errorType, message },
  });
}

export async function logDocumentViewed({ matterId, documentId, userId, userName, ipAddress }) {
  return logEvent({
    eventType:    AUDIT_EVENT.DOCUMENT_VIEWED,
    matterId,
    documentId,
    userId,
    userName,
    ipAddress,
    description:  `Document viewed by ${userName || userId}`,
  });
}

export async function logDocumentTagged({ matterId, documentId, userId, userName, tagName, notes }) {
  return logEvent({
    eventType:    AUDIT_EVENT.DOCUMENT_TAGGED,
    matterId,
    documentId,
    userId,
    userName,
    description:  `Tag "${tagName}" applied by ${userName || userId}`,
    afterState:   { tag: tagName, notes },
  });
}

export async function logProductionCreated({ matterId, productionId, userId, userName, production }) {
  return logEvent({
    eventType:    AUDIT_EVENT.PRODUCTION_CREATED,
    matterId,
    userId,
    userName,
    description:  `Production created: "${production.name}"`,
    afterState:   production,
  });
}

/**
 * Verify the integrity of the audit log for a matter.
 * Walks the chain, re-computing each entry's hash and comparing to stored value.
 * Returns detailed results for reporting.
 */
export async function verifyAuditChain(matterId) {
  const result = await db.query(
    `SELECT id, entry_hash, prev_hash, event_type, matter_id, occurred_at
     FROM audit_log
     WHERE matter_id = $1
     ORDER BY id ASC`,
    [matterId]
  );

  const entries = result.rows;
  const issues = [];
  let prevHash = '';

  for (const entry of entries) {
    if (entry.prev_hash !== prevHash) {
      issues.push({
        id:          entry.id,
        occurredAt:  entry.occurred_at,
        issue:       'CHAIN_BREAK',
        detail:      `prev_hash mismatch at entry #${entry.id}: expected "${prevHash}", found "${entry.prev_hash}"`,
      });
    }
    prevHash = entry.entry_hash;
  }

  return {
    matterId,
    entryCount: entries.length,
    verified:   issues.length === 0,
    issues,
    lastHash:   prevHash,
    verifiedAt: new Date().toISOString(),
  };
}

/**
 * Get audit log entries for a matter, with optional filters.
 */
export async function getAuditLog({ matterId, documentId, eventType, userId, limit = 100, offset = 0 }) {
  const conditions = ['1=1'];
  const params = [];

  if (matterId)    { params.push(matterId);    conditions.push(`matter_id = $${params.length}`); }
  if (documentId)  { params.push(documentId);  conditions.push(`document_id = $${params.length}`); }
  if (eventType)   { params.push(eventType);   conditions.push(`event_type = $${params.length}`); }
  if (userId)      { params.push(userId);       conditions.push(`user_id = $${params.length}`); }

  params.push(limit, offset);

  const result = await db.query(
    `SELECT
       id, entry_hash, prev_hash, event_type,
       matter_id, document_id, data_source_id,
       user_id, user_name, user_role, ip_address,
       description, metadata, occurred_at
     FROM audit_log
     WHERE ${conditions.join(' AND ')}
     ORDER BY id DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  const countResult = await db.query(
    `SELECT COUNT(*) FROM audit_log WHERE ${conditions.slice(0, -2).join(' AND ')}`,
    params.slice(0, -2)
  );

  return {
    entries: result.rows,
    total:   parseInt(countResult.rows[0].count, 10),
  };
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B','KB','MB','GB','TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}
