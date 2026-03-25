-- Migration 002 — Production builder columns
-- Adds tracking columns needed by the async production build process.
-- Safe to run on an existing database (uses IF NOT EXISTS / DO NOTHING patterns).

ALTER TABLE productions
  ADD COLUMN IF NOT EXISTS started_at    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS completed_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS error_message TEXT,
  ADD COLUMN IF NOT EXISTS zip_key       TEXT,   -- alias for output_key (MinIO path to ZIP)
  ADD COLUMN IF NOT EXISTS doc_count     INTEGER;

-- Widen the status check to include PENDING and FAILED states used during build
ALTER TABLE productions DROP CONSTRAINT IF EXISTS productions_status_check;
ALTER TABLE productions
  ADD CONSTRAINT productions_status_check
  CHECK (status IN (
    'PENDING','DRAFT','BUILDING','QUALITY_CHECK','COMPLETE','EXPORTED','FAILED','ERROR'
  ));
