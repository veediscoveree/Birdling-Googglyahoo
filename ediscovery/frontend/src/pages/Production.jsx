/**
 * Production Page
 *
 * Three sections:
 *   1. Productions list — past + in-progress productions with status badges
 *   2. Create production form — Bates numbering, format options, document scope
 *   3. Per-production detail drawer — download ZIP, export privilege log
 *
 * Formats supported (all open standard, no per-seat licenses):
 *   DAT  — Concordance / Relativity  (most common, universally accepted by courts)
 *   OPT  — Opticon image cross-reference  (paired with DAT)
 *   DII  — Summation
 *   EDRM — EDRM XML 2.0
 */

import { useState, useEffect, useCallback } from 'react';

const API = import.meta.env.VITE_API_URL ?? '';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusColor = s => ({
  PENDING:       'badge-info',
  BUILDING:      'badge-warning',
  COMPLETE:      'badge-success',
  FAILED:        'badge-danger',
  ERROR:         'badge-danger',
  EXPORTED:      'badge-success',
  QUALITY_CHECK: 'badge-warning',
  DRAFT:         'badge-default',
}[s] ?? 'badge-default');

const fmtBytes = n => {
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
};

const fmtDate = d => d ? new Date(d).toLocaleString() : '—';

// ─── Productions List ─────────────────────────────────────────────────────────

function ProductionList({ productions, onSelect, selected }) {
  if (!productions.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📦</div>
        <div className="empty-state-title">No productions yet</div>
        <div className="empty-state-sub">
          Use the form below to create your first production set.
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Bates Range</th>
            <th>Documents</th>
            <th>Format</th>
            <th>Produced To</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productions.map(p => (
            <tr
              key={p.id}
              className={selected?.id === p.id ? 'selected-row' : ''}
              onClick={() => onSelect(p)}
              style={{ cursor: 'pointer' }}
            >
              <td className="font-mono">{p.name}</td>
              <td>
                <span className={`badge ${statusColor(p.status)}`}>
                  {p.status}
                  {p.status === 'BUILDING' && <span className="spinner-sm" />}
                </span>
              </td>
              <td className="font-mono text-sm">
                {p.bates_prefix && p.bates_start
                  ? `${p.bates_prefix}${String(p.bates_start).padStart(7, '0')}${p.bates_end ? ` – ${p.bates_prefix}${String(p.bates_end).padStart(7, '0')}` : ''}`
                  : '—'}
              </td>
              <td>{p.doc_count ?? p.document_count ?? '—'}</td>
              <td>{p.load_file_format}</td>
              <td>{p.produced_to || '—'}</td>
              <td>{fmtDate(p.created_at)}</td>
              <td onClick={e => e.stopPropagation()}>
                {p.status === 'COMPLETE' && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={`${API}/api/production/${p.id}/download`}
                      className="btn btn-primary btn-sm"
                    >
                      ⬇ ZIP
                    </a>
                    <a
                      href={`${API}/api/production/${p.id}/privilege-log`}
                      className="btn btn-ghost btn-sm"
                    >
                      ⬇ Priv. Log
                    </a>
                  </div>
                )}
                {p.status === 'FAILED' && (
                  <span className="text-danger text-sm" title={p.error_message}>
                    ⚠ {p.error_message?.slice(0, 40)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Create Production Form ───────────────────────────────────────────────────

const FORMATS = [
  { value: 'DAT',  label: 'DAT / OPT  (Concordance / Relativity — recommended)' },
  { value: 'EDRM', label: 'EDRM XML 2.0' },
  { value: 'DII',  label: 'DII  (Summation)' },
];

function CreateProductionForm({ matterId, matterPrefix, onCreated }) {
  const [form, setForm] = useState({
    name:            '',
    description:     '',
    batesPrefix:     matterPrefix ?? '',
    batesStart:      '',
    includeNative:   false,
    includePdf:      true,
    includeText:     true,
    loadFileFormat:  'DAT',
    producedTo:      '',
    scope:           'tagged',   // 'tagged' | 'all_responsive'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Production name is required'); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/production`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matterId,
          name:           form.name,
          description:    form.description,
          batesPrefix:    form.batesPrefix,
          batesStart:     form.batesStart ? parseInt(form.batesStart, 10) : undefined,
          includeNative:  form.includeNative,
          includePdf:     form.includePdf,
          includeText:    form.includeText,
          loadFileFormat: form.loadFileFormat,
          producedTo:     form.producedTo,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const prod = await res.json();
      onCreated(prod);
      // reset name/description
      setForm(f => ({ ...f, name: '', description: '', producedTo: '' }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const previewBates = () => {
    const p  = form.batesPrefix || '';
    const n  = parseInt(form.batesStart || '1', 10);
    return `${p}${String(n).padStart(7, '0')} … ${p}${String(n + 999).padStart(7, '0')}`;
  };

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <h2 className="card-title">Create New Production</h2>
        <p className="card-subtitle">
          Builds a ZIP containing Bates-numbered PDFs, load files, and privilege log.
          Uses LibreOffice for Office → PDF conversion — no per-seat licence required.
        </p>
      </div>

      {error && <div className="alert alert-danger" style={{ margin: '1rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
        <div className="form-grid-2">

          {/* Left column */}
          <div>
            <h3 className="section-label">Identification</h3>

            <div className="form-group">
              <label className="form-label">Production Name *</label>
              <input
                className="form-control"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Production Vol. 001"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={2}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="First production — documents re: Q1 financials"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Produced To</label>
              <input
                className="form-control"
                value={form.producedTo}
                onChange={e => set('producedTo', e.target.value)}
                placeholder="Opposing counsel / Requesting party"
              />
            </div>

            <h3 className="section-label" style={{ marginTop: '1.5rem' }}>Bates Numbering</h3>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Prefix</label>
                <input
                  className="form-control font-mono"
                  value={form.batesPrefix}
                  onChange={e => set('batesPrefix', e.target.value.toUpperCase())}
                  placeholder="ACME"
                  maxLength={10}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Number</label>
                <input
                  className="form-control font-mono"
                  type="number"
                  min="1"
                  value={form.batesStart}
                  onChange={e => set('batesStart', e.target.value)}
                  placeholder="1 (or auto)"
                />
              </div>
            </div>

            <div className="form-hint font-mono">
              Preview: {previewBates()}
            </div>
            <div className="form-hint" style={{ marginTop: '0.25rem' }}>
              Always 7-digit zero-padded. Numbers advance from the matter's last assignment.
            </div>
          </div>

          {/* Right column */}
          <div>
            <h3 className="section-label">Document Scope</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="tagged"
                  checked={form.scope === 'tagged'}
                  onChange={() => set('scope', 'tagged')}
                />
                Documents tagged <strong>For Production</strong> and not privileged
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="all_responsive"
                  checked={form.scope === 'all_responsive'}
                  onChange={() => set('scope', 'all_responsive')}
                />
                All <strong>Responsive</strong> documents (not privileged)
              </label>
            </div>
            <div className="form-hint">
              NIST system files, privileged documents, and non-responsive documents are
              always excluded.
            </div>

            <h3 className="section-label" style={{ marginTop: '1.5rem' }}>Load File Format</h3>
            <div className="form-group">
              <select
                className="form-control"
                value={form.loadFileFormat}
                onChange={e => set('loadFileFormat', e.target.value)}
              >
                {FORMATS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              <div className="form-hint">
                DAT + OPT are always included regardless of choice.
              </div>
            </div>

            <h3 className="section-label" style={{ marginTop: '1.5rem' }}>Output Components</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.includePdf}
                  onChange={e => set('includePdf', e.target.checked)}
                />
                Rendered PDFs <span className="badge badge-success">Recommended</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.includeText}
                  onChange={e => set('includeText', e.target.checked)}
                />
                Extracted text files (.txt)
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.includeNative}
                  onChange={e => set('includeNative', e.target.checked)}
                />
                Native files (original formats)
              </label>
            </div>

            <div className="info-box" style={{ marginTop: '1rem' }}>
              <strong>No licence fees.</strong> PDFs are rendered by LibreOffice (MPL 2.0)
              running on your own server — the same conversion Relativity outsourced to
              Inside Out Technology. Produced documents are TIFF-less by default: modern
              platforms (Relativity, Everlaw, DISCO) all accept searchable PDF.
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Queuing build…' : '⚡ Create & Build Production'}
          </button>
          <span className="form-hint">
            Build runs in the background. Refresh to see progress.
          </span>
        </div>
      </form>
    </div>
  );
}

// ─── Production Detail Panel ──────────────────────────────────────────────────

function ProductionDetail({ production, onClose, onRefresh }) {
  if (!production) return null;

  return (
    <div className="detail-panel">
      <div className="detail-panel-header">
        <h3>{production.name}</h3>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
      </div>

      <div className="detail-panel-body">
        <dl className="meta-list">
          <dt>Status</dt>
          <dd><span className={`badge ${statusColor(production.status)}`}>{production.status}</span></dd>
          <dt>Bates Range</dt>
          <dd className="font-mono">
            {production.bates_prefix}{String(production.bates_start ?? 1).padStart(7, '0')}
            {production.bates_end ? ` – ${production.bates_prefix}${String(production.bates_end).padStart(7, '0')}` : ' (pending)'}
          </dd>
          <dt>Documents</dt>
          <dd>{production.doc_count ?? production.document_count ?? '—'}</dd>
          <dt>Produced To</dt>
          <dd>{production.produced_to || '—'}</dd>
          <dt>Load File Format</dt>
          <dd>{production.load_file_format}</dd>
          <dt>Includes</dt>
          <dd>
            {[
              production.include_pdf     && 'PDF images',
              production.include_native  && 'Natives',
              production.include_text    && 'Text files',
            ].filter(Boolean).join(', ') || 'None'}
          </dd>
          <dt>Created</dt>
          <dd>{fmtDate(production.created_at)}</dd>
          <dt>Build Started</dt>
          <dd>{fmtDate(production.started_at)}</dd>
          <dt>Completed</dt>
          <dd>{fmtDate(production.completed_at)}</dd>
        </dl>

        {production.error_message && (
          <div className="alert alert-danger" style={{ marginTop: '1rem' }}>
            <strong>Build error:</strong> {production.error_message}
          </div>
        )}

        {production.status === 'BUILDING' && (
          <div className="alert alert-info" style={{ marginTop: '1rem' }}>
            <span className="spinner-sm" /> Build in progress — this page will update when complete.
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {production.status === 'COMPLETE' && (
            <>
              <a
                href={`${API}/api/production/${production.id}/download`}
                className="btn btn-primary"
              >
                ⬇ Download Production ZIP
              </a>
              <a
                href={`${API}/api/production/${production.id}/privilege-log`}
                className="btn btn-ghost"
              >
                ⬇ Privilege Log CSV
              </a>
            </>
          )}
          <button className="btn btn-ghost" onClick={onRefresh}>
            ↺ Refresh Status
          </button>
        </div>

        {production.status === 'COMPLETE' && (
          <div className="info-box" style={{ marginTop: '1.5rem' }}>
            <strong>What's in the ZIP?</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li><code>LOAD_FILES/{production.name}.dat</code> — Concordance DAT (Relativity-compatible)</li>
              <li><code>LOAD_FILES/{production.name}.opt</code> — Opticon OPT image cross-reference</li>
              {production.load_file_format === 'EDRM' && (
                <li><code>LOAD_FILES/{production.name}.xml</code> — EDRM XML 2.0</li>
              )}
              {production.load_file_format === 'DII' && (
                <li><code>LOAD_FILES/{production.name}.dii</code> — Summation DII</li>
              )}
              {production.include_pdf  && <li><code>IMAGES/*.pdf</code> — Bates-named rendered PDFs</li>}
              {production.include_native && <li><code>NATIVES/*</code> — Original native files</li>}
              {production.include_text  && <li><code>TEXT/*.txt</code> — Extracted text</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({ productions }) {
  const total     = productions.length;
  const building  = productions.filter(p => p.status === 'BUILDING').length;
  const complete  = productions.filter(p => p.status === 'COMPLETE').length;
  const failed    = productions.filter(p => ['FAILED','ERROR'].includes(p.status)).length;
  const docTotal  = productions.reduce((s, p) => s + (p.doc_count ?? p.document_count ?? 0), 0);

  return (
    <div className="stat-cards">
      <div className="stat-card">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Total Productions</div>
      </div>
      <div className={`stat-card ${building ? 'stat-card-warn' : ''}`}>
        <div className="stat-number">{building}</div>
        <div className="stat-label">Building</div>
      </div>
      <div className="stat-card stat-card-success">
        <div className="stat-number">{complete}</div>
        <div className="stat-label">Complete</div>
      </div>
      {failed > 0 && (
        <div className="stat-card stat-card-danger">
          <div className="stat-number">{failed}</div>
          <div className="stat-label">Failed</div>
        </div>
      )}
      <div className="stat-card">
        <div className="stat-number">{docTotal.toLocaleString()}</div>
        <div className="stat-label">Documents Produced</div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductionPage({ matterId, navigate }) {

  const [productions, setProductions] = useState([]);
  const [matter,      setMatter]      = useState(null);
  const [selected,    setSelected]    = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  const load = useCallback(async () => {
    if (!matterId) return;
    try {
      const [prodsRes, matterRes] = await Promise.all([
        fetch(`${API}/api/production?matterId=${matterId}`),
        fetch(`${API}/api/matters/${matterId}`),
      ]);
      if (prodsRes.ok)  setProductions(await prodsRes.json());
      if (matterRes.ok) setMatter(await matterRes.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [matterId]);

  useEffect(() => { load(); }, [load]);

  // Auto-refresh while any production is BUILDING
  useEffect(() => {
    const hasBuilding = productions.some(p => p.status === 'BUILDING' || p.status === 'PENDING');
    if (!hasBuilding) return;
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, [productions, load]);

  const handleCreated = prod => {
    setProductions(prev => [prod, ...prev]);
    setSelected(prod);
  };

  const handleRefresh = async () => {
    if (!selected) return;
    try {
      const res = await fetch(`${API}/api/production/${selected.id}`);
      if (res.ok) {
        const updated = await res.json();
        setSelected(updated);
        setProductions(prev => prev.map(p => p.id === updated.id ? updated : p));
      }
    } catch { /* non-fatal */ }
  };

  if (!matterId) {
    return (
      <div className="page-container">
        <div className="alert alert-danger">No matter selected. Return to the matter list.</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Production</h1>
          {matter && (
            <p className="page-subtitle">
              {matter.number} — {matter.name}
            </p>
          )}
        </div>
        <div className="page-actions">
          <div className="info-pill">
            Bates prefix: <strong className="font-mono">{matter?.bates_prefix || '(not set)'}</strong>
          </div>
          <div className="info-pill">
            Next #: <strong className="font-mono">{String(matter?.bates_next ?? 1).padStart(7, '0')}</strong>
          </div>
        </div>
      </div>

      {/* Defensibility notice */}
      <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
        <strong>Litigation-grade production.</strong> Every Bates assignment is recorded in
        the immutable audit chain. Privilege log entries comply with FRCP Rule 26(b)(5).
        Productions are reproducible: the same document set, same prefix, and same settings
        will always produce the same output (deterministic hashes).
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading-state">Loading productions…</div>
      ) : (
        <>
          <StatsBar productions={productions} />

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ProductionList
                productions={productions}
                onSelect={setSelected}
                selected={selected}
              />

              <CreateProductionForm
                matterId={matterId}
                matterPrefix={matter?.bates_prefix ?? ''}
                onCreated={handleCreated}
              />
            </div>

            {selected && (
              <div style={{ width: '380px', flexShrink: 0 }}>
                <ProductionDetail
                  production={selected}
                  onClose={() => setSelected(null)}
                  onRefresh={handleRefresh}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
