/**
 * VDiscovery Shared Constants
 * Single source of truth for all platform-wide enumerations and limits.
 * Shared between backend, processor, and frontend.
 */

// ─── Processing Pipeline Stages ──────────────────────────────────────────────
export const PROCESSING_STAGE = Object.freeze({
  QUEUED:               'QUEUED',
  HASHING:              'HASHING',
  DEDUPLICATION:        'DEDUPLICATION',
  TYPE_DETECTION:       'TYPE_DETECTION',
  CONTAINER_EXPANSION:  'CONTAINER_EXPANSION',   // ZIP, PST, NSF, etc.
  METADATA_EXTRACTION:  'METADATA_EXTRACTION',
  TEXT_EXTRACTION:      'TEXT_EXTRACTION',
  OCR:                  'OCR',
  LANGUAGE_DETECTION:   'LANGUAGE_DETECTION',
  DENISTING:            'DENISTING',              // remove system/OS files
  NEAR_DEDUP:           'NEAR_DEDUP',
  EMAIL_THREADING:      'EMAIL_THREADING',
  INDEXING:             'INDEXING',
  COMPLETE:             'COMPLETE',
  ERROR:                'ERROR',
  NEEDS_REMEDIATION:    'NEEDS_REMEDIATION',      // password-protected, corrupt
  EXCLUDED:             'EXCLUDED',               // NIST-matched, de-NISTed
});

// ─── Processing Error Types ───────────────────────────────────────────────────
export const ERROR_TYPE = Object.freeze({
  PASSWORD_PROTECTED:   'PASSWORD_PROTECTED',
  CORRUPT_FILE:         'CORRUPT_FILE',
  UNSUPPORTED_FORMAT:   'UNSUPPORTED_FORMAT',
  EMPTY_FILE:           'EMPTY_FILE',
  TIKA_FAILURE:         'TIKA_FAILURE',
  OCR_FAILURE:          'OCR_FAILURE',
  METADATA_FAILURE:     'METADATA_FAILURE',
  ARCHIVE_EXPANSION:    'ARCHIVE_EXPANSION',
  INDEXING_FAILURE:     'INDEXING_FAILURE',
  STORAGE_FAILURE:      'STORAGE_FAILURE',
  HASH_MISMATCH:        'HASH_MISMATCH',          // integrity violation — critical
  DEDUP_FAILURE:        'DEDUP_FAILURE',
  THREAD_FAILURE:       'EMAIL_THREAD_FAILURE',
  TIMEOUT:              'PROCESSING_TIMEOUT',
  UNKNOWN:              'UNKNOWN',
});

export const ERROR_SEVERITY = Object.freeze({
  CRITICAL: 'CRITICAL',   // integrity/CoC violation — must stop and alert
  HIGH:     'HIGH',       // document lost/unprocessable — must report
  MEDIUM:   'MEDIUM',     // partial processing, degraded output
  LOW:      'LOW',        // informational, non-blocking
});

// ─── Document Tags (Coding) ───────────────────────────────────────────────────
export const SYSTEM_TAG = Object.freeze({
  RESPONSIVE:         'RESPONSIVE',
  NON_RESPONSIVE:     'NON_RESPONSIVE',
  PRIVILEGED:         'PRIVILEGED',
  PRIVILEGED_AC:      'PRIVILEGED_AC',        // Attorney-Client
  PRIVILEGED_WP:      'PRIVILEGED_WP',        // Work Product
  PRIVILEGED_LPP:     'PRIVILEGED_LPP',       // Legal Professional Privilege
  CONFIDENTIAL:       'CONFIDENTIAL',
  HIGHLY_CONFIDENTIAL:'HIGHLY_CONFIDENTIAL',
  HOT_DOC:            'HOT_DOC',
  KEY_DOCUMENT:       'KEY_DOCUMENT',
  FOR_PRODUCTION:     'FOR_PRODUCTION',
  WITHHELD:           'WITHHELD',
  REDACTED:           'REDACTED',
  DUPLICATE:          'DUPLICATE',
  NEAR_DUPLICATE:     'NEAR_DUPLICATE',
  NEEDS_REVIEW:       'NEEDS_REVIEW',
  REVIEWED:           'REVIEWED',
  QC_HOLD:            'QC_HOLD',
});

// ─── Supported File Type Categories ──────────────────────────────────────────
export const FILE_CATEGORY = Object.freeze({
  EMAIL:        'EMAIL',          // EML, MSG, MBOX
  EMAIL_CONTAINER: 'EMAIL_CONTAINER', // PST, NSF, OST
  OFFICE_WORD:  'OFFICE_WORD',    // DOC, DOCX, RTF, ODT
  OFFICE_EXCEL: 'OFFICE_EXCEL',   // XLS, XLSX, CSV, ODS
  OFFICE_PPT:   'OFFICE_PPT',     // PPT, PPTX, ODP
  PDF:          'PDF',
  IMAGE:        'IMAGE',          // JPEG, PNG, TIFF, BMP, GIF, HEIC
  VIDEO:        'VIDEO',          // MP4, MOV, AVI, MKV
  AUDIO:        'AUDIO',          // MP3, WAV, M4A, FLAC
  ARCHIVE:      'ARCHIVE',        // ZIP, RAR, 7Z, TAR, GZ, CAB
  DATABASE:     'DATABASE',       // MDB, ACCDB, SQLite, DBF
  TEXT:         'TEXT',           // TXT, LOG, MD, XML, JSON, CSV
  CODE:         'CODE',           // JS, PY, JAVA, CPP, etc.
  FORENSIC:     'FORENSIC',       // E01, DD, AFF, VMDK
  CHAT:         'CHAT',           // Teams, Slack, WhatsApp exports
  SOCIAL:       'SOCIAL',         // Facebook, LinkedIn exports
  CALENDAR:     'CALENDAR',       // ICS, vCalendar
  CONTACT:      'CONTACT',        // VCF
  EBOOK:        'EBOOK',          // EPUB, MOBI
  FONT:         'FONT',
  EXECUTABLE:   'EXECUTABLE',
  UNKNOWN:      'UNKNOWN',
});

// ─── Production Export Formats ────────────────────────────────────────────────
export const PRODUCTION_FORMAT = Object.freeze({
  NATIVE:    'NATIVE',            // Original files
  PDF:       'PDF',               // PDF images
  TIFF:      'TIFF',              // TIFF images (Bates stamped)
  TEXT:      'TEXT',              // Extracted text only
});

export const LOAD_FILE_FORMAT = Object.freeze({
  DAT:       'DAT',               // Concordance/Relativity DAT
  OPT:       'OPT',               // Opticon cross-reference
  DII:       'DII',               // Summation DII
  EDRM_XML:  'EDRM_XML',          // EDRM XML v2
  CSV:       'CSV',               // Generic CSV
  JSON:      'JSON',              // JSON metadata export
});

// ─── Audit Event Types ────────────────────────────────────────────────────────
export const AUDIT_EVENT = Object.freeze({
  // Matter events
  MATTER_CREATED:         'MATTER_CREATED',
  MATTER_UPDATED:         'MATTER_UPDATED',
  MATTER_CLOSED:          'MATTER_CLOSED',

  // Custodian events
  CUSTODIAN_ADDED:        'CUSTODIAN_ADDED',
  CUSTODIAN_UPDATED:      'CUSTODIAN_UPDATED',

  // Ingestion events
  INGEST_STARTED:         'INGEST_STARTED',
  FILE_RECEIVED:          'FILE_RECEIVED',
  FILE_HASHED:            'FILE_HASHED',
  FILE_STORED:            'FILE_STORED',
  HASH_VERIFIED:          'HASH_VERIFIED',
  HASH_MISMATCH_DETECTED: 'HASH_MISMATCH_DETECTED',

  // Processing events
  PROCESSING_QUEUED:      'PROCESSING_QUEUED',
  PROCESSING_STARTED:     'PROCESSING_STARTED',
  PROCESSING_STAGE_DONE:  'PROCESSING_STAGE_DONE',
  PROCESSING_COMPLETE:    'PROCESSING_COMPLETE',
  PROCESSING_ERROR:       'PROCESSING_ERROR',
  PROCESSING_RETRY:       'PROCESSING_RETRY',
  REPROCESSING_REQUESTED: 'REPROCESSING_REQUESTED',

  // Document events
  DOCUMENT_VIEWED:        'DOCUMENT_VIEWED',
  DOCUMENT_DOWNLOADED:    'DOCUMENT_DOWNLOADED',
  DOCUMENT_TAGGED:        'DOCUMENT_TAGGED',
  DOCUMENT_UNTAGGED:      'DOCUMENT_UNTAGGED',
  DOCUMENT_REDACTED:      'DOCUMENT_REDACTED',
  DOCUMENT_NOTE_ADDED:    'DOCUMENT_NOTE_ADDED',
  DOCUMENT_EXCLUDED:      'DOCUMENT_EXCLUDED',

  // Search events
  SEARCH_EXECUTED:        'SEARCH_EXECUTED',
  SAVED_SEARCH_CREATED:   'SAVED_SEARCH_CREATED',

  // Production events
  PRODUCTION_CREATED:     'PRODUCTION_CREATED',
  PRODUCTION_STARTED:     'PRODUCTION_STARTED',
  PRODUCTION_COMPLETE:    'PRODUCTION_COMPLETE',
  PRODUCTION_EXPORTED:    'PRODUCTION_EXPORTED',
  PRODUCTION_DOWNLOADED:  'PRODUCTION_DOWNLOADED',

  // Error remediation
  ERROR_REMEDIATED:       'ERROR_REMEDIATED',
  ERROR_DISMISSED:        'ERROR_DISMISSED',
  PASSWORD_PROVIDED:      'PASSWORD_PROVIDED',

  // User/auth events
  USER_LOGIN:             'USER_LOGIN',
  USER_LOGOUT:            'USER_LOGOUT',
  USER_CREATED:           'USER_CREATED',
  ROLE_CHANGED:           'ROLE_CHANGED',
  PERMISSION_CHANGED:     'PERMISSION_CHANGED',
});

// ─── Privilege Types ──────────────────────────────────────────────────────────
export const PRIVILEGE_TYPE = Object.freeze({
  ATTORNEY_CLIENT:  'ATTORNEY_CLIENT',
  WORK_PRODUCT:     'WORK_PRODUCT',
  JOINT_DEFENSE:    'JOINT_DEFENSE',
  COMMON_INTEREST:  'COMMON_INTEREST',
  SELF_INCRIMINATION: 'SELF_INCRIMINATION',
  TRADE_SECRET:     'TRADE_SECRET',
  OTHER:            'OTHER',
});

// ─── Processing Limits ────────────────────────────────────────────────────────
export const LIMITS = Object.freeze({
  MAX_FILE_SIZE_BYTES:        50 * 1024 * 1024 * 1024, // 50 GB per file
  MAX_CONTAINER_DEPTH:        10,                        // nested archive depth
  MAX_OCR_PAGES:              10000,                     // pages before truncation
  NEAR_DEDUP_THRESHOLD:       0.85,                      // 85% similarity = near-dup
  NEAR_DEDUP_SHINGLE_SIZE:    5,
  NEAR_DEDUP_NUM_HASHES:      128,
  MAX_PROCESSING_RETRIES:     3,
  PROCESSING_TIMEOUT_MS:      30 * 60 * 1000,           // 30 minutes per file
  BATES_DEFAULT_PADDING:      7,                         // 0000001
  MAX_BATES_PREFIX_LENGTH:    20,
  MAX_TAG_LENGTH:             100,
  MAX_NOTE_LENGTH:            10000,
});

// ─── Metadata Field Names (EDRM-aligned) ─────────────────────────────────────
export const METADATA_FIELD = Object.freeze({
  // Identity
  DOC_ID:                 'DocID',
  BEGBATES:               'BegBates',
  ENDBATES:               'EndBates',
  BEG_ATTACH:             'BegAttach',
  END_ATTACH:             'EndAttach',

  // File system
  FILE_NAME:              'FileName',
  FILE_EXT:               'FileExt',
  FILE_SIZE:              'FileSize',
  FILE_PATH:              'FilePath',
  CUSTODIAN:              'Custodian',
  SOURCE:                 'Source',
  VOLUME:                 'Volume',

  // Dates
  DATE_CREATED:           'DateCreated',
  DATE_MODIFIED:          'DateModified',
  DATE_ACCESSED:          'DateAccessed',
  DATE_SENT:              'DateSent',
  DATE_RECEIVED:          'DateReceived',
  DATE_PROCESSED:         'DateProcessed',

  // Hash / integrity
  MD5:                    'MD5Hash',
  SHA1:                   'SHA1Hash',
  SHA256:                 'SHA256Hash',

  // Email
  FROM:                   'From',
  TO:                     'To',
  CC:                     'CC',
  BCC:                    'BCC',
  SUBJECT:                'Subject',
  INTERNET_MESSAGE_ID:    'InternetMessageID',
  CONVERSATION_ID:        'ConversationID',
  CONVERSATION_TOPIC:     'ConversationTopic',
  IN_REPLY_TO:            'InReplyTo',
  REFERENCES:             'EmailReferences',
  ATTACHMENT_COUNT:       'AttachCount',
  HAS_ATTACHMENTS:        'HasAttachments',

  // Document metadata
  AUTHOR:                 'Author',
  LAST_AUTHOR:            'LastAuthor',
  COMPANY:                'Company',
  TITLE:                  'Title',
  SUBJECT_DOC:            'SubjectDoc',
  KEYWORDS:               'Keywords',
  COMMENTS:               'Comments',
  REVISION:               'Revision',
  PAGE_COUNT:             'PageCount',
  WORD_COUNT:             'WordCount',
  CHAR_COUNT:             'CharCount',
  CREATING_APP:           'CreatingApplication',
  CREATING_APP_VERSION:   'CreatingAppVersion',

  // Processing results
  FILE_TYPE:              'FileType',
  FILE_CATEGORY:          'FileCategory',
  MIME_TYPE:              'MimeType',
  DETECTED_MIME:          'DetectedMimeType',
  LANGUAGE:               'Language',
  IS_DUPLICATE:           'IsDuplicate',
  DUPLICATE_OF:           'DuplicateOf',
  IS_NEAR_DUPLICATE:      'IsNearDuplicate',
  NEAR_DUP_GROUP:         'NearDupGroup',
  NEAR_DUP_SIMILARITY:    'NearDupSimilarity',
  HAS_OCR:                'HasOCR',
  OCR_CONFIDENCE:         'OCRConfidence',
  IS_ENCRYPTED:           'IsEncrypted',
  IS_EMBEDDED:            'IsEmbedded',
  PARENT_DOC_ID:          'ParentDocID',
  CONTAINER_PATH:         'ContainerPath',
  THREAD_ID:              'ThreadID',
  THREAD_POSITION:        'ThreadPosition',
  IS_NIST:                'IsNIST',
  NIST_PRODUCT:           'NISTProduct',

  // Privilege
  IS_PRIVILEGED:          'IsPrivileged',
  PRIVILEGE_TYPE:         'PrivilegeType',
  PRIVILEGE_BASIS:        'PrivilegeBasis',

  // Review
  IS_RESPONSIVE:          'IsResponsive',
  REVIEW_STATUS:          'ReviewStatus',
  REVIEWER:               'Reviewer',
  REVIEW_DATE:            'ReviewDate',
  NOTES:                  'Notes',
});
