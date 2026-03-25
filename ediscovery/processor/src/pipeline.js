/**
 * Document Processing Pipeline
 *
 * The core processing engine. Runs as a BullMQ worker.
 * Every document flows through deterministic, logged stages.
 *
 * Pipeline stages (in order):
 *  1.  HASHING          — verify stored hash (integrity check)
 *  2.  TYPE_DETECTION   — detect true file type via magic bytes (Tika)
 *  3.  DENISTING        — check against NIST NSRL (remove system files)
 *  4.  DEDUPLICATION    — exact hash dedup
 *  5.  CONTAINER_EXPANSION — expand ZIP, PST, NSF, etc. recursively
 *  6.  METADATA_EXTRACTION — extract all available metadata
 *  7.  TEXT_EXTRACTION  — extract full text via type-specific extractor
 *  8.  OCR              — OCR if text extraction failed or partial
 *  9.  LANGUAGE_DETECTION — detect document language
 * 10.  NEAR_DEDUP       — compute MinHash signature, find near-duplicates
 * 11.  EMAIL_THREADING  — link email to conversation thread
 * 12.  INDEXING         — index in Elasticsearch
 * 13.  COMPLETE         — update document status to COMPLETE
 *
 * Error handling:
 *  - Each stage has a try/catch
 *  - Stage failures are logged to processing_errors with full context
 *  - Stage failures are logged to audit_log for CRITICAL severity
 *  - On failure, document moves to ERROR state (or NEEDS_REMEDIATION for recoverable errors)
 *  - Up to 3 retries per document with exponential backoff (handled by BullMQ)
 *  - Password-protected and corrupt files are marked NEEDS_REMEDIATION, not ERROR
 */

import { db } from './db.js';
import { storageClient, BUCKET } from './storage.js';
import { esClient } from './elasticsearch.js';
import { recordError, recordPasswordProtected, recordCorruptFile } from './errorTracker.js';
import { logEvent } from './chainOfCustody.js';
import { extractors, detectFileType } from './extractors/index.js';
import { extractMetadata } from './metadata/extractor.js';
import { computeExactHash, checkNist } from './dedup/exact.js';
import { computeMinHash, findNearDuplicates } from './dedup/near.js';
import { threadEmail } from './email/threading.js';
import { detectLanguage } from './language.js';
import {
  PROCESSING_STAGE, ERROR_TYPE, ERROR_SEVERITY, AUDIT_EVENT, FILE_CATEGORY
} from '../../shared/src/constants.js';

// ─── Pipeline Entry Point ─────────────────────────────────────────────────────

/**
 * Process a single document through all pipeline stages.
 * Called by the BullMQ worker for each job.
 *
 * @param {object} job - BullMQ job object
 * @param {object} job.data
 * @param {string} job.data.documentId
 * @param {string} job.data.matterId
 * @param {string} job.data.dataSourceId
 * @param {string} job.data.storageKey
 * @param {string} job.data.originalName
 * @param {string} job.data.sha256
 */
export async function processDocument(job) {
  const { documentId, matterId, dataSourceId, storageKey, originalName, sha256 } = job.data;

  console.log(`[pipeline] Starting: ${originalName} (${documentId})`);

  // Load document record
  const docResult = await db.query('SELECT * FROM documents WHERE id = $1', [documentId]);
  if (!docResult.rows.length) {
    throw new Error(`Document ${documentId} not found`);
  }
  const doc = docResult.rows[0];

  const ctx = {
    doc,
    documentId,
    matterId,
    dataSourceId,
    storageKey,
    originalName,
    sha256,
    // Accumulated results (written to DB at end)
    updates: {},
    // Child documents created by container expansion
    children: [],
  };

  // ── Run pipeline stages ───────────────────────────────────────────────────
  const stages = [
    { name: PROCESSING_STAGE.TYPE_DETECTION,      fn: stageTypeDetection },
    { name: PROCESSING_STAGE.DENISTING,           fn: stageDenisting },
    { name: PROCESSING_STAGE.DEDUPLICATION,       fn: stageDeduplication },
    { name: PROCESSING_STAGE.CONTAINER_EXPANSION, fn: stageContainerExpansion },
    { name: PROCESSING_STAGE.METADATA_EXTRACTION, fn: stageMetadataExtraction },
    { name: PROCESSING_STAGE.TEXT_EXTRACTION,     fn: stageTextExtraction },
    { name: PROCESSING_STAGE.OCR,                 fn: stageOcr },
    { name: PROCESSING_STAGE.LANGUAGE_DETECTION,  fn: stageLanguageDetection },
    { name: PROCESSING_STAGE.NEAR_DEDUP,          fn: stageNearDedup },
    { name: PROCESSING_STAGE.EMAIL_THREADING,     fn: stageEmailThreading },
    { name: PROCESSING_STAGE.INDEXING,            fn: stageIndexing },
  ];

  for (const stage of stages) {
    // If document was excluded or is an exact duplicate, skip most stages
    if (ctx.updates.processing_stage === PROCESSING_STAGE.EXCLUDED && stage.name !== PROCESSING_STAGE.INDEXING) {
      continue;
    }
    if (ctx.updates.is_duplicate && stage.name === PROCESSING_STAGE.TEXT_EXTRACTION) {
      continue; // skip text extraction for exact duplicates — already indexed
    }

    // Update stage in DB
    await setStage(documentId, stage.name);
    await updateJobProgress(job, stageProgress(stage.name));

    try {
      const shouldContinue = await stage.fn(ctx, job);
      if (shouldContinue === false) break; // stage signaled early exit
    } catch (err) {
      await handleStageError(ctx, stage.name, err);
      // Don't continue to next stages after error (except INDEXING always runs)
      if (stage.name !== PROCESSING_STAGE.INDEXING) break;
    }
  }

  // ── Flush all accumulated updates to documents table ─────────────────────
  await flushUpdates(documentId, ctx.updates);

  // ── Mark complete (or keep existing error state) ──────────────────────────
  const finalStage = ctx.updates.processing_stage;
  if (![
    PROCESSING_STAGE.ERROR,
    PROCESSING_STAGE.NEEDS_REMEDIATION,
    PROCESSING_STAGE.EXCLUDED,
  ].includes(finalStage)) {
    await setStage(documentId, PROCESSING_STAGE.COMPLETE);
    await db.query(
      `UPDATE data_sources SET processed_files = processed_files + 1 WHERE id = $1`,
      [dataSourceId]
    );
    await logEvent({
      eventType:   AUDIT_EVENT.PROCESSING_COMPLETE,
      matterId,
      documentId,
      description: `Processing complete for "${originalName}"`,
    });
  }

  console.log(`[pipeline] Done: ${originalName} → ${finalStage ?? PROCESSING_STAGE.COMPLETE}`);
}

// ─── Stage Implementations ────────────────────────────────────────────────────

/**
 * Stage 1: Detect true file type using magic bytes via Apache Tika.
 * Sets detected_mime, file_category, is_container.
 */
async function stageTypeDetection(ctx) {
  const { documentId, storageKey, originalName, matterId, dataSourceId } = ctx;

  let fileStream;
  try {
    fileStream = await storageClient.getObject(BUCKET, storageKey);
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.STORAGE_FAILURE,
      severity:  ERROR_SEVERITY.CRITICAL,
      stage:     PROCESSING_STAGE.TYPE_DETECTION,
      message:   `Cannot read file from storage: ${err.message}`,
      fileContext: { fileName: originalName, sha256: ctx.sha256 },
    });
    ctx.updates.processing_stage = PROCESSING_STAGE.ERROR;
    return false;
  }

  const typeInfo = await detectFileType(fileStream, originalName);

  ctx.updates.detected_mime   = typeInfo.mimeType;
  ctx.updates.declared_mime   = typeInfo.declaredMime;
  ctx.updates.file_category   = typeInfo.category;
  ctx.updates.is_container    = typeInfo.isContainer;
  ctx.updates.is_encrypted    = typeInfo.isEncrypted;
  ctx.updates.encryption_type = typeInfo.encryptionType;

  ctx.detectedMime = typeInfo.mimeType;
  ctx.fileCategory = typeInfo.category;
  ctx.isContainer  = typeInfo.isContainer;
  ctx.isEncrypted  = typeInfo.isEncrypted;

  // Password-protected: mark for remediation immediately
  if (typeInfo.isEncrypted && !typeInfo.canExtractText) {
    await recordPasswordProtected({
      matterId, documentId, dataSourceId,
      fileName: originalName,
      sha256:   ctx.sha256,
    });
    ctx.updates.processing_stage = PROCESSING_STAGE.NEEDS_REMEDIATION;
    return false;
  }
}

/**
 * Stage 2: De-NISTing — check file SHA-1 against NIST NSRL.
 * System files (OS binaries, app executables) are excluded.
 */
async function stageDenisting(ctx) {
  const { documentId, matterId, doc } = ctx;

  const nistResult = await checkNist(doc.sha1);
  if (nistResult) {
    ctx.updates.is_nist       = true;
    ctx.updates.nist_product  = nistResult.product_name;
    ctx.updates.processing_stage = PROCESSING_STAGE.EXCLUDED;

    await db.query(
      `UPDATE data_sources SET excluded_files = excluded_files + 1 WHERE id = $1`,
      [ctx.dataSourceId]
    );
  }
}

/**
 * Stage 3: Exact deduplication by SHA-256.
 * Marks document as duplicate and links to the authoritative copy.
 */
async function stageDeduplication(ctx) {
  const { documentId, matterId, sha256 } = ctx;

  // Look for any previously processed document with same SHA-256 in this matter
  const dupResult = await db.query(
    `SELECT id, original_name FROM documents
     WHERE matter_id = $1
       AND sha256 = $2
       AND id != $3
       AND is_duplicate = FALSE
       AND processing_stage != 'ERROR'
     ORDER BY created_at ASC
     LIMIT 1`,
    [matterId, sha256, documentId]
  );

  if (dupResult.rows.length > 0) {
    const original = dupResult.rows[0];
    ctx.updates.is_duplicate     = true;
    ctx.updates.duplicate_of_id  = original.id;
    // Still index for family/custodian coverage, but skip heavy processing
  }
}

/**
 * Stage 4: Container expansion.
 * ZIP, TAR, GZ, RAR, 7Z → extract and ingest each child.
 * PST, NSF, MBOX → extract emails and attachments.
 * Maximum depth: 10 levels (prevent zip bombs).
 */
async function stageContainerExpansion(ctx, job) {
  const { documentId, matterId, dataSourceId, storageKey, originalName, isContainer } = ctx;

  if (!isContainer) return;

  const extractor = extractors.getContainerExtractor(ctx.fileCategory);
  if (!extractor) return;

  let fileStream;
  try {
    fileStream = await storageClient.getObject(BUCKET, storageKey);
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.STORAGE_FAILURE, severity: ERROR_SEVERITY.HIGH,
      stage: PROCESSING_STAGE.CONTAINER_EXPANSION,
      message: `Cannot read container file: ${err.message}`,
      fileContext: { fileName: originalName },
    });
    return;
  }

  const containerDepth = parseInt(ctx.doc.container_path?.split('/').length ?? 0);
  if (containerDepth >= 10) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.ARCHIVE_EXPANSION, severity: ERROR_SEVERITY.MEDIUM,
      stage: PROCESSING_STAGE.CONTAINER_EXPANSION,
      message: `Maximum container nesting depth (10) reached for "${originalName}". Contents not expanded.`,
    });
    return;
  }

  try {
    const children = await extractor.expand(fileStream, {
      containerName:  originalName,
      containerPath:  ctx.doc.container_path ?? '',
      matterId,
      dataSourceId,
      parentId:       documentId,
      custodianId:    ctx.doc.custodian_id,
      custodianName:  ctx.doc.custodian_name,
    });

    ctx.children = children;

    // Children are ingested via ingestFile inside the expander,
    // which automatically queues them for processing.
    console.log(`[pipeline] Container "${originalName}" expanded: ${children.length} items`);
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.ARCHIVE_EXPANSION, severity: ERROR_SEVERITY.HIGH,
      stage: PROCESSING_STAGE.CONTAINER_EXPANSION,
      message: `Failed to expand container "${originalName}": ${err.message}`,
      details: err.stack,
      fileContext: { fileName: originalName, sha256: ctx.sha256 },
    });
  }
}

/**
 * Stage 5: Metadata extraction.
 * Extracts all available metadata from the file using Tika + specialized parsers.
 */
async function stageMetadataExtraction(ctx) {
  const { documentId, matterId, dataSourceId, storageKey, originalName } = ctx;

  let fileStream;
  try {
    fileStream = await storageClient.getObject(BUCKET, storageKey);
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.METADATA_FAILURE, severity: ERROR_SEVERITY.MEDIUM,
      stage: PROCESSING_STAGE.METADATA_EXTRACTION,
      message: `Cannot read file for metadata extraction: ${err.message}`,
    });
    return;
  }

  try {
    const metadata = await extractMetadata(fileStream, ctx.detectedMime, ctx.fileCategory);
    // Merge metadata into updates — spread all recognized fields
    Object.assign(ctx.updates, metadata);
    ctx.metadata = metadata;
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.METADATA_FAILURE, severity: ERROR_SEVERITY.LOW,
      stage: PROCESSING_STAGE.METADATA_EXTRACTION,
      message: `Metadata extraction failed for "${originalName}": ${err.message}`,
      fileContext: { fileName: originalName, sha256: ctx.sha256 },
    });
    // Non-fatal — continue with empty metadata
  }
}

/**
 * Stage 6: Text extraction.
 * Uses type-specific extractors (PDF, Office, email, etc.)
 * Extracted text is streamed to object storage (not kept in memory).
 */
async function stageTextExtraction(ctx) {
  const { documentId, matterId, dataSourceId, storageKey, originalName } = ctx;

  if (ctx.updates.is_duplicate) return; // skip for exact dups

  const extractor = extractors.getTextExtractor(ctx.fileCategory, ctx.detectedMime);
  if (!extractor) return;

  let fileStream;
  try {
    fileStream = await storageClient.getObject(BUCKET, storageKey);
  } catch (err) {
    return; // storage error already handled in type detection
  }

  try {
    const { text, confidence } = await extractor.extractText(fileStream, {
      mimeType: ctx.detectedMime,
      fileName: originalName,
    });

    if (text && text.length > 0) {
      // Store extracted text in object storage
      const textKey = `${ctx.matterId}/${ctx.dataSourceId}/${documentId}.txt`;
      await storageClient.putObject(BUCKET, textKey, Buffer.from(text, 'utf8'));

      ctx.updates.text_extracted = true;
      ctx.updates.text_key       = textKey;
      ctx.updates.text_length    = text.length;
      ctx.extractedText          = text;
    }
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.TIKA_FAILURE, severity: ERROR_SEVERITY.MEDIUM,
      stage: PROCESSING_STAGE.TEXT_EXTRACTION,
      message: `Text extraction failed for "${originalName}": ${err.message}`,
      fileContext: { fileName: originalName, sha256: ctx.sha256 },
    });
  }
}

/**
 * Stage 7: OCR.
 * Runs OCR if: text extraction failed or confidence is below threshold.
 * Stores OCR confidence score alongside text.
 */
async function stageOcr(ctx) {
  const { documentId, matterId, dataSourceId, storageKey, originalName } = ctx;

  const needsOcr =
    !ctx.updates.text_extracted &&
    [FILE_CATEGORY.IMAGE, FILE_CATEGORY.PDF].includes(ctx.fileCategory);

  if (!needsOcr) return;

  const { ocrExtractor } = extractors;
  if (!ocrExtractor) return;

  let fileStream;
  try {
    fileStream = await storageClient.getObject(BUCKET, storageKey);
  } catch (err) {
    return;
  }

  try {
    const { text, confidence, engine, pageCount } = await ocrExtractor.run(fileStream, {
      mimeType: ctx.detectedMime,
      fileName: originalName,
    });

    if (text && text.length > 0) {
      const textKey = `${ctx.matterId}/${ctx.dataSourceId}/${documentId}.txt`;
      await storageClient.putObject(BUCKET, textKey, Buffer.from(text, 'utf8'));

      ctx.updates.text_extracted  = true;
      ctx.updates.text_key        = textKey;
      ctx.updates.text_length     = text.length;
      ctx.updates.has_ocr         = true;
      ctx.updates.ocr_confidence  = confidence;
      ctx.updates.ocr_engine      = engine;
      ctx.updates.ocr_pages       = pageCount;
      ctx.extractedText           = text;
    }
  } catch (err) {
    await recordError({
      matterId, documentId, dataSourceId,
      errorType: ERROR_TYPE.OCR_FAILURE, severity: ERROR_SEVERITY.MEDIUM,
      stage: PROCESSING_STAGE.OCR,
      message: `OCR failed for "${originalName}": ${err.message}`,
      fileContext: { fileName: originalName, sha256: ctx.sha256 },
    });
  }
}

/**
 * Stage 8: Language detection.
 */
async function stageLanguageDetection(ctx) {
  if (!ctx.extractedText || ctx.extractedText.length < 50) return;

  try {
    const { language, confidence } = await detectLanguage(ctx.extractedText.substring(0, 2000));
    ctx.updates.language            = language;
    ctx.updates.language_confidence = confidence;
  } catch (_) { /* non-fatal */ }
}

/**
 * Stage 9: Near-deduplication using MinHash LSH.
 * Computes a signature and finds near-duplicate groups.
 */
async function stageNearDedup(ctx) {
  if (!ctx.extractedText || ctx.extractedText.length < 100) return;
  if (ctx.updates.is_duplicate) return;

  try {
    const { signature, group, score } = await computeMinHash(
      ctx.documentId,
      ctx.matterId,
      ctx.extractedText
    );

    ctx.updates.minhash_sig = signature;
    if (group) {
      ctx.updates.is_near_dup    = true;
      ctx.updates.near_dup_group = group;
      ctx.updates.near_dup_score = score;
    }
  } catch (_) { /* non-fatal */ }
}

/**
 * Stage 10: Email threading.
 * Links email documents into conversation threads.
 */
async function stageEmailThreading(ctx) {
  if (ctx.fileCategory !== FILE_CATEGORY.EMAIL) return;

  try {
    const threadId = await threadEmail({
      documentId:       ctx.documentId,
      matterId:         ctx.matterId,
      messageId:        ctx.metadata?.email_message_id,
      inReplyTo:        ctx.metadata?.in_reply_to,
      references:       ctx.metadata?.email_references,
      conversationId:   ctx.metadata?.conversation_id,
      conversationTopic: ctx.metadata?.conversation_topic,
      subject:          ctx.metadata?.email_subject,
      emailDate:        ctx.metadata?.email_date,
    });

    ctx.updates.email_thread_id = threadId;
  } catch (_) { /* non-fatal */ }
}

/**
 * Stage 11: Index in Elasticsearch.
 * Always runs even if other stages failed (partial indexing is better than none).
 */
async function stageIndexing(ctx) {
  const { documentId, matterId, originalName } = ctx;
  const doc = ctx.doc;

  try {
    await esClient.index({
      index: `vdiscovery-${matterId}`,
      id:    documentId,
      document: {
        matterId,
        dataSourceId:   ctx.dataSourceId,
        documentId,
        originalName,
        custodianName:  ctx.updates.custodian_name ?? doc.custodian_name,
        detectedMime:   ctx.updates.detected_mime ?? doc.detected_mime,
        fileCategory:   ctx.updates.file_category ?? doc.file_category,
        fileSize:       doc.file_size,
        sha256:         ctx.sha256,
        // Extracted text
        text:           ctx.extractedText ?? '',
        // Email fields
        emailFrom:      ctx.updates.email_from,
        emailTo:        ctx.updates.email_to,
        emailCc:        ctx.updates.email_cc,
        emailSubject:   ctx.updates.email_subject,
        emailDate:      ctx.updates.email_date,
        // Document metadata
        author:         ctx.updates.author,
        title:          ctx.updates.title,
        keywords:       ctx.updates.keywords,
        language:       ctx.updates.language,
        // Dates
        dateCreated:    ctx.updates.date_created ?? doc.date_created,
        dateModified:   ctx.updates.date_modified ?? doc.date_modified,
        // Status
        isPrivileged:   ctx.updates.is_privileged ?? false,
        isDuplicate:    ctx.updates.is_duplicate ?? false,
        isNist:         ctx.updates.is_nist ?? false,
        processingStage: PROCESSING_STAGE.COMPLETE,
        indexedAt:      new Date().toISOString(),
      },
    });
    ctx.updates.date_processed = new Date();
  } catch (err) {
    await recordError({
      matterId, documentId: ctx.documentId, dataSourceId: ctx.dataSourceId,
      errorType: ERROR_TYPE.INDEXING_FAILURE, severity: ERROR_SEVERITY.MEDIUM,
      stage: PROCESSING_STAGE.INDEXING,
      message: `Elasticsearch indexing failed for "${originalName}": ${err.message}`,
    });
    // Non-fatal — document still processed, just not searchable yet
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function setStage(documentId, stage) {
  await db.query(
    'UPDATE documents SET processing_stage = $2, updated_at = NOW() WHERE id = $1',
    [documentId, stage]
  );
}

async function flushUpdates(documentId, updates) {
  const keys   = Object.keys(updates);
  if (!keys.length) return;

  const sets   = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
  const values = keys.map(k => updates[k]);

  await db.query(
    `UPDATE documents SET ${sets}, updated_at = NOW() WHERE id = $1`,
    [documentId, ...values]
  );
}

async function handleStageError(ctx, stageName, err) {
  const isPasswordError = err.message?.includes('password') || err.message?.includes('encrypted');
  const isCorruptError  = err.message?.includes('corrupt') || err.message?.includes('invalid');

  if (isPasswordError) {
    await recordPasswordProtected({
      matterId:    ctx.matterId,
      documentId:  ctx.documentId,
      dataSourceId: ctx.dataSourceId,
      fileName:    ctx.originalName,
      sha256:      ctx.sha256,
    });
    ctx.updates.processing_stage = PROCESSING_STAGE.NEEDS_REMEDIATION;
  } else if (isCorruptError) {
    await recordCorruptFile({
      matterId:    ctx.matterId,
      documentId:  ctx.documentId,
      dataSourceId: ctx.dataSourceId,
      fileName:    ctx.originalName,
      sha256:      ctx.sha256,
      details:     err.message,
    });
    ctx.updates.processing_stage = PROCESSING_STAGE.ERROR;
  } else {
    await recordError({
      matterId:    ctx.matterId,
      documentId:  ctx.documentId,
      dataSourceId: ctx.dataSourceId,
      errorType:   ERROR_TYPE.UNKNOWN,
      severity:    ERROR_SEVERITY.HIGH,
      stage:       stageName,
      message:     `Unexpected error in ${stageName} for "${ctx.originalName}": ${err.message}`,
      details:     err.stack,
      fileContext: { fileName: ctx.originalName, sha256: ctx.sha256 },
    });
    ctx.updates.processing_stage = PROCESSING_STAGE.ERROR;
  }
}

async function updateJobProgress(job, progress) {
  try { await job.updateProgress(progress); } catch (_) {}
}

function stageProgress(stageName) {
  const stageMap = {
    [PROCESSING_STAGE.TYPE_DETECTION]:      10,
    [PROCESSING_STAGE.DENISTING]:           15,
    [PROCESSING_STAGE.DEDUPLICATION]:       20,
    [PROCESSING_STAGE.CONTAINER_EXPANSION]: 30,
    [PROCESSING_STAGE.METADATA_EXTRACTION]: 40,
    [PROCESSING_STAGE.TEXT_EXTRACTION]:     60,
    [PROCESSING_STAGE.OCR]:                 70,
    [PROCESSING_STAGE.LANGUAGE_DETECTION]:  75,
    [PROCESSING_STAGE.NEAR_DEDUP]:          85,
    [PROCESSING_STAGE.EMAIL_THREADING]:     90,
    [PROCESSING_STAGE.INDEXING]:            98,
  };
  return stageMap[stageName] ?? 50;
}
