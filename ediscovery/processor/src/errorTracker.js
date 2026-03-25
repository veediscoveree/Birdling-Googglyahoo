/**
 * Thin error tracker for processor context — delegates to same DB.
 */
import { db } from './db.js';
import { logEvent } from './chainOfCustody.js';
import { ERROR_TYPE, ERROR_SEVERITY, AUDIT_EVENT } from '../../shared/src/constants.js';

export async function recordError({ matterId, documentId=null, dataSourceId=null, jobId=null,
  errorType=ERROR_TYPE.UNKNOWN, severity=ERROR_SEVERITY.HIGH, stage=null,
  message, details=null, stackTrace=null, fileContext={} }) {

  const { fileName=null, filePath=null, fileSize=null, md5=null, sha256=null, detectedMime=null } = fileContext;

  try {
    const result = await db.query(
      `INSERT INTO processing_errors (document_id, matter_id, data_source_id, job_id,
         error_type, severity, stage, message, details, stack_trace,
         file_name, file_path, file_size, md5, sha256, detected_mime)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING id`,
      [documentId, matterId, dataSourceId, jobId,
       errorType, severity, stage, message,
       details?.substring(0, 10000), stackTrace?.substring(0, 5000),
       fileName, filePath, fileSize, md5, sha256, detectedMime]
    );

    if (documentId) {
      await db.query(
        'UPDATE documents SET processing_error_count = processing_error_count + 1, last_error_at = NOW() WHERE id = $1',
        [documentId]
      );
    }

    if (severity === ERROR_SEVERITY.CRITICAL) {
      await logEvent({
        eventType: AUDIT_EVENT.PROCESSING_ERROR, matterId, documentId,
        description: `CRITICAL ERROR [${stage}/${errorType}]: ${message.substring(0, 200)}`,
        metadata: { errorType, stage, severity },
      });
    }

    return result.rows[0].id;
  } catch (err) {
    console.error('[errorTracker] Failed to log error:', err.message, '| Original error:', message);
  }
}

export async function recordPasswordProtected({ matterId, documentId, dataSourceId, fileName, sha256 }) {
  return recordError({
    matterId, documentId, dataSourceId,
    errorType: ERROR_TYPE.PASSWORD_PROTECTED, severity: ERROR_SEVERITY.HIGH,
    stage: 'TEXT_EXTRACTION',
    message: `File is password-protected and cannot be processed: "${fileName}"`,
    details: 'Provide the password via the error remediation workflow and re-process the file.',
    fileContext: { fileName, sha256 },
  });
}

export async function recordCorruptFile({ matterId, documentId, dataSourceId, fileName, sha256, details }) {
  return recordError({
    matterId, documentId, dataSourceId,
    errorType: ERROR_TYPE.CORRUPT_FILE, severity: ERROR_SEVERITY.HIGH,
    stage: 'TYPE_DETECTION',
    message: `Corrupt or unreadable file: "${fileName}"`,
    details,
    fileContext: { fileName, sha256 },
  });
}
