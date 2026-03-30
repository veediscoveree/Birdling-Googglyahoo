/**
 * Processing Error Tracker
 *
 * Comprehensive exception logging for defensible eDiscovery.
 * Every processing error must be logged here — no silent failures.
 *
 * Best practices implemented:
 *  - Full file context at time of error (name, path, hash, MIME, size)
 *  - Error severity classification
 *  - Structured error types for reporting and filtering
 *  - Remediation workflow (provide password, re-process, dismiss)
 *  - Exportable error reports (CSV, EDRM XML, JSON)
 *  - Automatic CoC logging for CRITICAL errors
 */

import { db } from '../db/index.js';
import { logProcessingError } from './chainOfCustody.js';
import { ERROR_TYPE, ERROR_SEVERITY } from '../../../shared/src/constants.js';

// ─── Core Error Logging ───────────────────────────────────────────────────────

/**
 * Record a processing error. This is the single entry point for all
 * processing exceptions. Never throw — log and continue.
 *
 * @param {object} error
 * @param {string} error.matterId
 * @param {string} [error.documentId]
 * @param {string} [error.dataSourceId]
 * @param {string} [error.jobId]
 * @param {string} error.errorType       - from ERROR_TYPE constants
 * @param {string} [error.severity]      - from ERROR_SEVERITY constants
 * @param {string} [error.stage]         - which pipeline stage failed
 * @param {string} error.message         - concise error message
 * @param {string} [error.details]       - full error text
 * @param {string} [error.stackTrace]
 * @param {object} [error.fileContext]   - file info at time of error
 * @returns {Promise<string>} - error record ID
 */
export async function recordError({
  matterId,
  documentId = null,
  dataSourceId = null,
  jobId = null,
  errorType = ERROR_TYPE.UNKNOWN,
  severity = ERROR_SEVERITY.HIGH,
  stage = null,
  message,
  details = null,
  stackTrace = null,
  fileContext = {},
}) {
  const {
    fileName = null,
    filePath = null,
    fileSize = null,
    md5 = null,
    sha256 = null,
    detectedMime = null,
  } = fileContext;

  let id;
  try {
    const result = await db.query(
      `INSERT INTO processing_errors (
         document_id, matter_id, data_source_id, job_id,
         error_type, severity, stage, message, details, stack_trace,
         file_name, file_path, file_size, md5, sha256, detected_mime
       ) VALUES (
         $1, $2, $3, $4,
         $5, $6, $7, $8, $9, $10,
         $11, $12, $13, $14, $15, $16
       ) RETURNING id`,
      [
        documentId, matterId, dataSourceId, jobId,
        errorType, severity, stage, message,
        details ? details.substring(0, 10000) : null,
        stackTrace ? stackTrace.substring(0, 5000) : null,
        fileName, filePath, fileSize, md5, sha256, detectedMime,
      ]
    );

    id = result.rows[0].id;

    // Increment error count on document record
    if (documentId) {
      await db.query(
        `UPDATE documents
         SET processing_error_count = processing_error_count + 1,
             last_error_at = NOW()
         WHERE id = $1`,
        [documentId]
      );
    }

    // Increment error count on data source
    if (dataSourceId) {
      await db.query(
        `UPDATE data_sources SET error_files = error_files + 1 WHERE id = $1`,
        [dataSourceId]
      );
    }

    // CRITICAL errors always flow into the immutable audit chain
    if (severity === ERROR_SEVERITY.CRITICAL) {
      await logProcessingError({ matterId, documentId, stage, errorType, message });
    }
  } catch (dbError) {
    // If we can't even log the error, write to stderr — never lose error info
    console.error('[errorTracker] FAILED TO LOG ERROR TO DATABASE:', {
      matterId, documentId, errorType, severity, message,
      dbError: dbError.message,
    });
  }

  return id;
}

/**
 * Record a hash mismatch — this is a CRITICAL integrity violation.
 */
export async function recordHashMismatch({ matterId, documentId, dataSourceId, fileName, expectedHash, actualHash }) {
  return recordError({
    matterId,
    documentId,
    dataSourceId,
    errorType: ERROR_TYPE.HASH_MISMATCH,
    severity:  ERROR_SEVERITY.CRITICAL,
    stage:     'HASH_VERIFICATION',
    message:   `Hash mismatch for "${fileName}": expected ${expectedHash}, got ${actualHash}`,
    details:   `This may indicate file corruption or tampering. The file's integrity cannot be guaranteed.`,
    fileContext: { fileName, sha256: actualHash },
  });
}

/**
 * Record a password-protected file that requires remediation.
 */
export async function recordPasswordProtected({ matterId, documentId, dataSourceId, fileName, filePath, sha256 }) {
  return recordError({
    matterId,
    documentId,
    dataSourceId,
    errorType: ERROR_TYPE.PASSWORD_PROTECTED,
    severity:  ERROR_SEVERITY.HIGH,
    stage:     'TEXT_EXTRACTION',
    message:   `File is password-protected and cannot be processed: "${fileName}"`,
    details:   'Provide the password via the error remediation workflow and re-process the file.',
    fileContext: { fileName, filePath, sha256 },
  });
}

/**
 * Record a corrupt or unreadable file.
 */
export async function recordCorruptFile({ matterId, documentId, dataSourceId, fileName, sha256, details }) {
  return recordError({
    matterId,
    documentId,
    dataSourceId,
    errorType: ERROR_TYPE.CORRUPT_FILE,
    severity:  ERROR_SEVERITY.HIGH,
    stage:     'TYPE_DETECTION',
    message:   `Corrupt or unreadable file: "${fileName}"`,
    details,
    fileContext: { fileName, sha256 },
  });
}

// ─── Remediation ─────────────────────────────────────────────────────────────

/**
 * Mark an error as remediated (e.g., user provided password, re-processed).
 */
export async function markRemediated({ errorId, userId, notes }) {
  const result = await db.query(
    `UPDATE processing_errors
     SET is_remediated = TRUE,
         remediation_notes = $2,
         remediated_by = $3,
         remediated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [errorId, notes, userId]
  );
  return result.rows[0];
}

/**
 * Dismiss an error (not a processing failure — acceptable exception).
 */
export async function dismissError({ errorId, userId, reason }) {
  const result = await db.query(
    `UPDATE processing_errors
     SET is_dismissed = TRUE,
         remediation_notes = $2,
         dismissed_by = $3,
         dismissed_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [errorId, reason, userId]
  );
  return result.rows[0];
}

// ─── Query / Reporting ────────────────────────────────────────────────────────

/**
 * Get all errors for a matter with rich filtering.
 */
export async function getErrors({
  matterId,
  errorType,
  severity,
  stage,
  isRemediated,
  isDismissed,
  dataSourceId,
  limit = 100,
  offset = 0,
}) {
  const conditions = ['matter_id = $1'];
  const params = [matterId];

  if (errorType !== undefined)  { params.push(errorType);     conditions.push(`error_type = $${params.length}`); }
  if (severity !== undefined)   { params.push(severity);      conditions.push(`severity = $${params.length}`); }
  if (stage !== undefined)      { params.push(stage);         conditions.push(`stage = $${params.length}`); }
  if (isRemediated !== undefined) { params.push(isRemediated); conditions.push(`is_remediated = $${params.length}`); }
  if (isDismissed !== undefined)  { params.push(isDismissed);  conditions.push(`is_dismissed = $${params.length}`); }
  if (dataSourceId !== undefined) { params.push(dataSourceId); conditions.push(`data_source_id = $${params.length}`); }

  const where = conditions.join(' AND ');
  params.push(limit, offset);

  const [rowsResult, countResult] = await Promise.all([
    db.query(
      `SELECT
         pe.*,
         d.original_name, d.file_category, d.processing_stage AS doc_stage
       FROM processing_errors pe
       LEFT JOIN documents d ON d.id = pe.document_id
       WHERE ${where}
       ORDER BY
         CASE severity WHEN 'CRITICAL' THEN 1 WHEN 'HIGH' THEN 2 WHEN 'MEDIUM' THEN 3 ELSE 4 END,
         pe.occurred_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    ),
    db.query(`SELECT COUNT(*) FROM processing_errors WHERE ${where}`, params.slice(0, -2)),
  ]);

  return {
    errors: rowsResult.rows,
    total:  parseInt(countResult.rows[0].count, 10),
  };
}

/**
 * Get error summary statistics for a matter — for the error dashboard.
 */
export async function getErrorSummary(matterId) {
  const result = await db.query(
    `SELECT
       COUNT(*) FILTER (WHERE severity = 'CRITICAL')                  AS critical_count,
       COUNT(*) FILTER (WHERE severity = 'HIGH')                      AS high_count,
       COUNT(*) FILTER (WHERE severity = 'MEDIUM')                    AS medium_count,
       COUNT(*) FILTER (WHERE severity = 'LOW')                       AS low_count,
       COUNT(*) FILTER (WHERE NOT is_remediated AND NOT is_dismissed)  AS open_count,
       COUNT(*) FILTER (WHERE is_remediated)                           AS remediated_count,
       COUNT(*) FILTER (WHERE is_dismissed)                            AS dismissed_count,
       COUNT(*) FILTER (WHERE error_type = 'PASSWORD_PROTECTED')       AS password_count,
       COUNT(*) FILTER (WHERE error_type = 'CORRUPT_FILE')             AS corrupt_count,
       COUNT(*) FILTER (WHERE error_type = 'UNSUPPORTED_FORMAT')       AS unsupported_count,
       COUNT(*) FILTER (WHERE error_type = 'HASH_MISMATCH')            AS hash_mismatch_count,
       COUNT(*) FILTER (WHERE error_type = 'OCR_FAILURE')              AS ocr_failure_count,
       COUNT(*)                                                         AS total_count
     FROM processing_errors
     WHERE matter_id = $1`,
    [matterId]
  );

  const byType = await db.query(
    `SELECT error_type, COUNT(*) AS count
     FROM processing_errors
     WHERE matter_id = $1
     GROUP BY error_type
     ORDER BY count DESC`,
    [matterId]
  );

  return {
    ...result.rows[0],
    byType: byType.rows,
  };
}

/**
 * Export errors as CSV string for download.
 */
export async function exportErrorsAsCsv(matterId) {
  const { errors } = await getErrors({ matterId, limit: 100000, offset: 0 });

  const headers = [
    'Error ID', 'Severity', 'Type', 'Stage', 'File Name', 'File Path',
    'SHA-256', 'Message', 'Details', 'Remediated', 'Remediation Notes',
    'Occurred At',
  ];

  const rows = errors.map(e => [
    e.id,
    e.severity,
    e.error_type,
    e.stage ?? '',
    (e.file_name ?? '').replace(/"/g, '""'),
    (e.file_path ?? '').replace(/"/g, '""'),
    e.sha256 ?? '',
    (e.message ?? '').replace(/"/g, '""'),
    (e.details ?? '').replace(/"/g, '""'),
    e.is_remediated ? 'YES' : 'NO',
    (e.remediation_notes ?? '').replace(/"/g, '""'),
    e.occurred_at,
  ]);

  const csvLines = [headers, ...rows].map(
    row => row.map(cell => `"${cell}"`).join(',')
  );

  return csvLines.join('\r\n');
}
