-- ──────────────────────────────────────────────────────────────────────────────
-- VDiscovery Seed Data — Demo matter + default system tags
-- ──────────────────────────────────────────────────────────────────────────────

-- Default admin user (password: 'changeme' — MUST be changed in production)
INSERT INTO users (id, email, name, password_hash, role) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'admin@vdiscovery.local',
   'System Administrator',
   '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGX5.x0kRpXyD5sThTm.KGrKpBm',  -- 'changeme'
   'admin');

-- Default system tags (added to every new matter)
-- These are global templates; per-matter tags are created on matter creation.

-- Demo matter
INSERT INTO matters (id, number, name, description, client, status, bates_prefix, created_by)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'DEMO-2024-001',
  'Demo Matter — ACME Corp. v. Example Inc.',
  'Demonstration matter with sample data for onboarding and testing.',
  'ACME Corporation',
  'ACTIVE',
  'ACME',
  '00000000-0000-0000-0000-000000000001'
);

-- System tag templates for the demo matter
INSERT INTO tags (matter_id, name, label, color, is_system, is_exclusive, group_name, sort_order) VALUES
  -- Responsiveness group (exclusive: only one per doc)
  ('10000000-0000-0000-0000-000000000001', 'RESPONSIVE',      'Responsive',      '#16a34a', TRUE, TRUE,  'Responsiveness', 10),
  ('10000000-0000-0000-0000-000000000001', 'NON_RESPONSIVE',  'Non-Responsive',  '#dc2626', TRUE, TRUE,  'Responsiveness', 20),
  ('10000000-0000-0000-0000-000000000001', 'NEEDS_REVIEW',    'Needs Review',    '#d97706', TRUE, FALSE, 'Responsiveness', 30),
  -- Privilege group (exclusive)
  ('10000000-0000-0000-0000-000000000001', 'PRIVILEGED_AC',   'Priv — Atty/Client', '#7c3aed', TRUE, TRUE, 'Privilege', 10),
  ('10000000-0000-0000-0000-000000000001', 'PRIVILEGED_WP',   'Priv — Work Product','#6d28d9', TRUE, TRUE, 'Privilege', 20),
  ('10000000-0000-0000-0000-000000000001', 'PRIVILEGED_OTHER','Priv — Other',    '#5b21b6', TRUE, FALSE, 'Privilege', 30),
  -- Confidentiality (exclusive)
  ('10000000-0000-0000-0000-000000000001', 'CONFIDENTIAL',        'Confidential',         '#0369a1', TRUE, TRUE, 'Confidentiality', 10),
  ('10000000-0000-0000-0000-000000000001', 'HIGHLY_CONFIDENTIAL', 'Highly Confidential',  '#1e3a5f', TRUE, TRUE, 'Confidentiality', 20),
  -- Status flags (non-exclusive)
  ('10000000-0000-0000-0000-000000000001', 'HOT_DOC',    'Hot Doc',      '#ef4444', TRUE, FALSE, 'Status', 10),
  ('10000000-0000-0000-0000-000000000001', 'KEY_DOCUMENT','Key Document', '#f59e0b', TRUE, FALSE, 'Status', 20),
  ('10000000-0000-0000-0000-000000000001', 'QC_HOLD',    'QC Hold',      '#78716c', TRUE, FALSE, 'Status', 30),
  -- Production
  ('10000000-0000-0000-0000-000000000001', 'FOR_PRODUCTION','For Production', '#0891b2', TRUE, FALSE, 'Production', 10),
  ('10000000-0000-0000-0000-000000000001', 'WITHHELD',      'Withheld',       '#64748b', TRUE, FALSE, 'Production', 20);
