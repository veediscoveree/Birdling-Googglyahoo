-- ══════════════════════════════════════════════════════════════════════════════
-- VDiscovery eDiscovery Platform — PostgreSQL Schema
-- Version: 1.0.0
-- IMPORTANT: This schema is the foundation of defensibility.
--   - audit_log is INSERT-ONLY via trigger enforcement
--   - hash values are stored as-is (never modified after ingestion)
--   - All timestamps are stored as TIMESTAMPTZ (UTC)
-- ══════════════════════════════════════════════════════════════════════════════

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";          -- trigram search
CREATE EXTENSION IF NOT EXISTS "pgcrypto";          -- gen_random_uuid

-- ─────────────────────────────────────────────────────────────────────────────
-- Users & Authentication
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  password_hash   TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'reviewer'
                    CHECK (role IN ('admin','case_manager','attorney','reviewer','read_only')),
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Matters (cases)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE matters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number          TEXT NOT NULL UNIQUE,             -- e.g. "2024-ACME-001"
  name            TEXT NOT NULL,
  description     TEXT,
  client          TEXT,
  opposing_party  TEXT,
  status          TEXT NOT NULL DEFAULT 'ACTIVE'
                    CHECK (status IN ('ACTIVE','CLOSED','ARCHIVED','ON_HOLD')),
  date_opened     DATE,
  date_closed     DATE,
  bates_prefix    TEXT,                              -- e.g. "ACME"
  bates_start     INTEGER NOT NULL DEFAULT 1,
  bates_next      INTEGER NOT NULL DEFAULT 1,        -- next available Bates #
  bates_padding   INTEGER NOT NULL DEFAULT 7,
  default_tags    TEXT[] DEFAULT '{}',
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Custodians (data owners)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE custodians (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  email           TEXT,
  title           TEXT,
  department      TEXT,
  organization    TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (matter_id, name)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Data Sources (ingestion batches)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE data_sources (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  custodian_id    UUID REFERENCES custodians(id),
  name            TEXT NOT NULL,                    -- "Jane Doe Laptop Q4 2023"
  description     TEXT,
  source_type     TEXT NOT NULL DEFAULT 'UPLOAD'
                    CHECK (source_type IN (
                      'UPLOAD','FORENSIC_IMAGE','PST','NSF','MBOX',
                      'SHAREPOINT','ONEDRIVE','GOOGLE_DRIVE','ICLOUD',
                      'MOBILE','S3','SFTP','OTHER'
                    )),
  status          TEXT NOT NULL DEFAULT 'PENDING'
                    CHECK (status IN (
                      'PENDING','INGESTING','PROCESSING','COMPLETE','ERROR','PARTIAL'
                    )),
  -- Collection metadata (chain of custody starts here)
  collected_by    TEXT,                             -- examiner name
  collection_tool TEXT,                             -- FTK, Magnet AXIOM, etc.
  collection_date DATE,
  collection_notes TEXT,
  -- Verification hashes (of the source as received)
  source_md5      TEXT,
  source_sha256   TEXT,
  -- Stats (updated as processing runs)
  total_files     INTEGER NOT NULL DEFAULT 0,
  processed_files INTEGER NOT NULL DEFAULT 0,
  error_files     INTEGER NOT NULL DEFAULT 0,
  excluded_files  INTEGER NOT NULL DEFAULT 0,
  total_bytes     BIGINT NOT NULL DEFAULT 0,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Documents (every file, including children extracted from containers)
-- This is the central table — all processing information flows through here.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  data_source_id  UUID NOT NULL REFERENCES data_sources(id),

  -- ── Identity ──────────────────────────────────────────────────────────────
  doc_number      TEXT,                             -- sequential within matter
  bates_begin     TEXT,                             -- assigned at production
  bates_end       TEXT,
  beg_attach      TEXT,                             -- first doc in attachment family
  end_attach      TEXT,                             -- last doc in attachment family

  -- ── Provenance ────────────────────────────────────────────────────────────
  original_name   TEXT NOT NULL,
  original_path   TEXT,                             -- path as found in source
  custodian_id    UUID REFERENCES custodians(id),
  custodian_name  TEXT,                             -- denormalized for speed
  parent_id       UUID REFERENCES documents(id),   -- for attachments/children
  container_path  TEXT,                             -- path within container

  -- ── Storage ───────────────────────────────────────────────────────────────
  storage_key     TEXT,                             -- MinIO object key
  storage_bucket  TEXT,
  file_size       BIGINT,

  -- ── Cryptographic Integrity (set at ingestion, never changed) ─────────────
  md5             TEXT,
  sha1            TEXT,
  sha256          TEXT NOT NULL,                    -- primary dedup key
  hash_verified   BOOLEAN NOT NULL DEFAULT FALSE,   -- re-verified after storage
  hash_verified_at TIMESTAMPTZ,

  -- ── File Type Detection ───────────────────────────────────────────────────
  detected_mime   TEXT,                             -- from magic bytes via Tika
  declared_mime   TEXT,                             -- from extension
  file_category   TEXT,
  file_ext        TEXT,
  is_container    BOOLEAN NOT NULL DEFAULT FALSE,

  -- ── Deduplication ─────────────────────────────────────────────────────────
  is_duplicate    BOOLEAN NOT NULL DEFAULT FALSE,
  duplicate_of_id UUID REFERENCES documents(id),
  is_near_dup     BOOLEAN NOT NULL DEFAULT FALSE,
  near_dup_group  UUID,                             -- group ID for near-dups
  near_dup_score  NUMERIC(5,4),                     -- Jaccard similarity
  minhash_sig     TEXT,                             -- serialized MinHash signature

  -- ── NIST de-NISTing ───────────────────────────────────────────────────────
  is_nist         BOOLEAN NOT NULL DEFAULT FALSE,
  nist_product    TEXT,

  -- ── Email-specific ────────────────────────────────────────────────────────
  email_message_id TEXT,                            -- Internet-Message-ID
  email_from      TEXT,
  email_to        TEXT[],
  email_cc        TEXT[],
  email_bcc       TEXT[],
  email_subject   TEXT,
  email_date      TIMESTAMPTZ,
  email_thread_id UUID,
  email_thread_pos INTEGER,
  attachment_count INTEGER,
  conversation_id  TEXT,
  conversation_topic TEXT,
  in_reply_to     TEXT,
  email_references TEXT[],

  -- ── Document Metadata ─────────────────────────────────────────────────────
  author          TEXT,
  last_author     TEXT,
  title           TEXT,
  subject         TEXT,
  keywords        TEXT[],
  creating_app    TEXT,
  creating_app_ver TEXT,
  revision        INTEGER,
  page_count      INTEGER,
  word_count      INTEGER,
  char_count      INTEGER,
  slide_count     INTEGER,                          -- PPT
  sheet_count     INTEGER,                          -- Excel
  row_count       INTEGER,                          -- Excel/CSV
  has_macros      BOOLEAN,
  has_track_changes BOOLEAN,
  has_comments    BOOLEAN,
  has_hidden_content BOOLEAN,
  is_encrypted    BOOLEAN NOT NULL DEFAULT FALSE,
  encryption_type TEXT,

  -- ── Timestamps ────────────────────────────────────────────────────────────
  date_created    TIMESTAMPTZ,
  date_modified   TIMESTAMPTZ,
  date_accessed   TIMESTAMPTZ,
  date_processed  TIMESTAMPTZ,

  -- ── OCR ───────────────────────────────────────────────────────────────────
  has_ocr         BOOLEAN NOT NULL DEFAULT FALSE,
  ocr_confidence  NUMERIC(5,4),                     -- 0.0 – 1.0
  ocr_engine      TEXT,                             -- tesseract, azure, etc.
  ocr_pages       INTEGER,

  -- ── Language ──────────────────────────────────────────────────────────────
  language        TEXT,
  language_confidence NUMERIC(5,4),

  -- ── Extracted text (stored in object storage for large docs) ──────────────
  text_extracted  BOOLEAN NOT NULL DEFAULT FALSE,
  text_key        TEXT,                             -- MinIO key for text file
  text_length     INTEGER,

  -- ── Processing State ──────────────────────────────────────────────────────
  processing_stage TEXT NOT NULL DEFAULT 'QUEUED',
  processing_error_count INTEGER NOT NULL DEFAULT 0,
  last_error_at   TIMESTAMPTZ,
  retry_count     INTEGER NOT NULL DEFAULT 0,

  -- ── Review ────────────────────────────────────────────────────────────────
  review_status   TEXT DEFAULT 'UNREVIEWED'
                    CHECK (review_status IN (
                      'UNREVIEWED','REVIEWED','NEEDS_QC','EXCLUDED'
                    )),
  is_responsive   BOOLEAN,
  is_privileged   BOOLEAN NOT NULL DEFAULT FALSE,
  privilege_type  TEXT,
  privilege_basis TEXT,
  is_withheld     BOOLEAN NOT NULL DEFAULT FALSE,
  is_redacted     BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_id     UUID REFERENCES users(id),
  reviewed_at     TIMESTAMPTZ,
  notes           TEXT,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Processing Jobs
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE processing_jobs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  matter_id       UUID NOT NULL REFERENCES matters(id),
  queue_name      TEXT NOT NULL DEFAULT 'processing',
  bull_job_id     TEXT,                             -- BullMQ job ID
  stage           TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'WAITING'
                    CHECK (status IN (
                      'WAITING','ACTIVE','COMPLETED','FAILED','DELAYED','PAUSED'
                    )),
  priority        INTEGER NOT NULL DEFAULT 5,       -- 1 = highest
  attempt         INTEGER NOT NULL DEFAULT 0,
  max_attempts    INTEGER NOT NULL DEFAULT 3,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  duration_ms     INTEGER,
  worker_id       TEXT,
  progress        INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  result          JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Processing Errors — comprehensive exception log
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE processing_errors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID REFERENCES documents(id) ON DELETE CASCADE,
  matter_id       UUID NOT NULL REFERENCES matters(id),
  data_source_id  UUID REFERENCES data_sources(id),
  job_id          UUID REFERENCES processing_jobs(id),

  error_type      TEXT NOT NULL,
  severity        TEXT NOT NULL DEFAULT 'HIGH'
                    CHECK (severity IN ('CRITICAL','HIGH','MEDIUM','LOW')),
  stage           TEXT,                             -- which stage failed
  message         TEXT NOT NULL,
  details         TEXT,                             -- full error message
  stack_trace     TEXT,

  -- File context at time of error
  file_name       TEXT,
  file_path       TEXT,
  file_size       BIGINT,
  md5             TEXT,
  sha256          TEXT,
  detected_mime   TEXT,

  -- Remediation
  is_remediated   BOOLEAN NOT NULL DEFAULT FALSE,
  remediation_notes TEXT,
  remediated_by   UUID REFERENCES users(id),
  remediated_at   TIMESTAMPTZ,
  is_dismissed    BOOLEAN NOT NULL DEFAULT FALSE,
  dismissed_by    UUID REFERENCES users(id),
  dismissed_at    TIMESTAMPTZ,

  occurred_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Audit Log — IMMUTABLE chain of custody record
-- Rows are INSERT-only; UPDATE and DELETE are blocked by trigger.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE audit_log (
  id              BIGSERIAL PRIMARY KEY,
  entry_hash      TEXT NOT NULL,                    -- SHA-256 of this entry + prev hash
  prev_hash       TEXT NOT NULL DEFAULT '',         -- links entries into a chain

  event_type      TEXT NOT NULL,
  matter_id       UUID REFERENCES matters(id),
  document_id     UUID REFERENCES documents(id),
  data_source_id  UUID REFERENCES data_sources(id),
  user_id         UUID REFERENCES users(id),
  user_name       TEXT,                             -- denormalized (user may be deleted)
  user_role       TEXT,
  ip_address      INET,
  user_agent      TEXT,
  session_id      TEXT,

  -- What happened
  description     TEXT NOT NULL,
  before_state    JSONB,                            -- snapshot before change
  after_state     JSONB,                            -- snapshot after change
  metadata        JSONB,                            -- additional context

  -- When
  occurred_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Block UPDATE and DELETE on audit_log to preserve chain of custody
CREATE OR REPLACE FUNCTION audit_log_protect()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'audit_log is immutable — UPDATE and DELETE are not permitted. (CoC violation attempt blocked.)';
END;
$$;

CREATE TRIGGER audit_log_no_update
  BEFORE UPDATE ON audit_log
  FOR EACH ROW EXECUTE FUNCTION audit_log_protect();

CREATE TRIGGER audit_log_no_delete
  BEFORE DELETE ON audit_log
  FOR EACH ROW EXECUTE FUNCTION audit_log_protect();

-- ─────────────────────────────────────────────────────────────────────────────
-- Tags (coding values)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE tags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  label           TEXT NOT NULL,
  color           TEXT NOT NULL DEFAULT '#6B7280',  -- hex color
  is_system       BOOLEAN NOT NULL DEFAULT FALSE,   -- system-defined vs custom
  is_exclusive    BOOLEAN NOT NULL DEFAULT FALSE,   -- only one value in group allowed
  group_name      TEXT,                             -- e.g. "Responsiveness"
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (matter_id, name)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Document Tags (coding decisions)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE document_tags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  tag_id          UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  matter_id       UUID NOT NULL REFERENCES matters(id),
  applied_by      UUID REFERENCES users(id),
  applied_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes           TEXT,
  UNIQUE (document_id, tag_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Email Threads
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE email_threads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  conversation_id TEXT,
  subject         TEXT,
  participant_count INTEGER NOT NULL DEFAULT 0,
  message_count   INTEGER NOT NULL DEFAULT 0,
  date_first      TIMESTAMPTZ,
  date_last       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Saved Searches
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE saved_searches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  query           JSONB NOT NULL,
  result_count    INTEGER,
  last_run_at     TIMESTAMPTZ,
  created_by      UUID REFERENCES users(id),
  is_shared       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Productions
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE productions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,                    -- "Production Vol. 001"
  description     TEXT,
  status          TEXT NOT NULL DEFAULT 'PENDING'
                    CHECK (status IN (
                      'PENDING','DRAFT','BUILDING','QUALITY_CHECK','COMPLETE','EXPORTED','FAILED','ERROR'
                    )),
  -- Bates
  bates_prefix    TEXT,
  bates_start     INTEGER,
  bates_end       INTEGER,
  bates_suffix    TEXT,
  -- Format options
  include_native  BOOLEAN NOT NULL DEFAULT FALSE,
  include_pdf     BOOLEAN NOT NULL DEFAULT TRUE,
  include_tiff    BOOLEAN NOT NULL DEFAULT FALSE,
  include_text    BOOLEAN NOT NULL DEFAULT TRUE,
  load_file_format TEXT NOT NULL DEFAULT 'DAT',
  -- Output
  output_key      TEXT,                             -- MinIO key for production zip (legacy)
  zip_key         TEXT,                             -- MinIO key for production zip
  document_count  INTEGER NOT NULL DEFAULT 0,
  doc_count       INTEGER,                          -- populated after build
  page_count      INTEGER NOT NULL DEFAULT 0,
  output_size     BIGINT NOT NULL DEFAULT 0,
  -- Build tracking
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  error_message   TEXT,
  -- Delivery
  produced_to     TEXT,
  produced_at     TIMESTAMPTZ,
  produced_by     UUID REFERENCES users(id),
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Production Documents
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE production_documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id   UUID NOT NULL REFERENCES productions(id) ON DELETE CASCADE,
  document_id     UUID NOT NULL REFERENCES documents(id),
  matter_id       UUID NOT NULL REFERENCES matters(id),
  bates_begin     TEXT,
  bates_end       TEXT,
  page_count      INTEGER,
  is_redacted     BOOLEAN NOT NULL DEFAULT FALSE,
  is_withheld     BOOLEAN NOT NULL DEFAULT FALSE,
  privilege_type  TEXT,
  sort_order      INTEGER,
  UNIQUE (production_id, document_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Redactions
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE redactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  matter_id       UUID NOT NULL REFERENCES matters(id),
  page_number     INTEGER NOT NULL,
  -- Bounding box as percentage of page (0.0–1.0)
  x               NUMERIC(6,4) NOT NULL,
  y               NUMERIC(6,4) NOT NULL,
  width           NUMERIC(6,4) NOT NULL,
  height          NUMERIC(6,4) NOT NULL,
  reason          TEXT,
  is_applied      BOOLEAN NOT NULL DEFAULT FALSE,
  applied_by      UUID REFERENCES users(id),
  applied_at      TIMESTAMPTZ,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Privilege Log entries
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE privilege_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id       UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  document_id     UUID REFERENCES documents(id),
  production_id   UUID REFERENCES productions(id),
  entry_number    INTEGER,
  -- Required fields (FRCP 26(b)(5))
  document_date   DATE,
  author          TEXT,
  recipients      TEXT[],
  doc_type        TEXT,
  privilege_type  TEXT NOT NULL,
  description     TEXT NOT NULL,
  -- Optional enrichment
  custodian       TEXT,
  bates_begin     TEXT,
  legal_source    TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- NIST Reference (de-NISTing lookup cache)
-- Populated from NIST NSRL database
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE nist_reference (
  sha1            TEXT PRIMARY KEY,
  md5             TEXT,
  file_name       TEXT,
  product_name    TEXT,
  product_version TEXT,
  os_code         TEXT
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Indexes — performance critical for large datasets
-- ─────────────────────────────────────────────────────────────────────────────

-- Documents
CREATE INDEX idx_documents_matter           ON documents(matter_id);
CREATE INDEX idx_documents_source           ON documents(data_source_id);
CREATE INDEX idx_documents_custodian        ON documents(custodian_id);
CREATE INDEX idx_documents_sha256           ON documents(sha256);
CREATE INDEX idx_documents_md5              ON documents(md5);
CREATE INDEX idx_documents_stage            ON documents(processing_stage);
CREATE INDEX idx_documents_parent           ON documents(parent_id);
CREATE INDEX idx_documents_thread           ON documents(email_thread_id);
CREATE INDEX idx_documents_near_dup_group   ON documents(near_dup_group);
CREATE INDEX idx_documents_review_status    ON documents(matter_id, review_status);
CREATE INDEX idx_documents_is_privileged    ON documents(matter_id, is_privileged);
CREATE INDEX idx_documents_email_message_id ON documents(email_message_id);
CREATE INDEX idx_documents_email_date       ON documents(email_date);
CREATE INDEX idx_documents_date_modified    ON documents(date_modified);

-- Trigram indexes for name search
CREATE INDEX idx_documents_original_name_trgm ON documents USING GIN (original_name gin_trgm_ops);

-- Audit log — time-series queries
CREATE INDEX idx_audit_matter      ON audit_log(matter_id, occurred_at DESC);
CREATE INDEX idx_audit_document    ON audit_log(document_id, occurred_at DESC);
CREATE INDEX idx_audit_user        ON audit_log(user_id, occurred_at DESC);
CREATE INDEX idx_audit_event_type  ON audit_log(event_type, occurred_at DESC);

-- Processing errors
CREATE INDEX idx_errors_matter     ON processing_errors(matter_id, occurred_at DESC);
CREATE INDEX idx_errors_document   ON processing_errors(document_id);
CREATE INDEX idx_errors_type       ON processing_errors(matter_id, error_type);
CREATE INDEX idx_errors_severity   ON processing_errors(matter_id, severity);
CREATE INDEX idx_errors_remediated ON processing_errors(is_remediated, matter_id);

-- Jobs
CREATE INDEX idx_jobs_document     ON processing_jobs(document_id);
CREATE INDEX idx_jobs_status       ON processing_jobs(status, created_at DESC);

-- Tags
CREATE INDEX idx_doc_tags_document ON document_tags(document_id);
CREATE INDEX idx_doc_tags_tag      ON document_tags(tag_id);
CREATE INDEX idx_doc_tags_matter   ON document_tags(matter_id);

-- NIST
CREATE INDEX idx_nist_md5          ON nist_reference(md5);

-- ─────────────────────────────────────────────────────────────────────────────
-- Updated_at auto-update trigger
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_matters_updated_at
  BEFORE UPDATE ON matters FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_custodians_updated_at
  BEFORE UPDATE ON custodians FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_data_sources_updated_at
  BEFORE UPDATE ON data_sources FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_documents_updated_at
  BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_productions_updated_at
  BEFORE UPDATE ON productions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
