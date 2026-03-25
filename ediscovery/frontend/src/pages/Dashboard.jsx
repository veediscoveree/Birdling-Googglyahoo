import { useState, useEffect } from 'react';
import { api } from '../api/client.js';

function fmt(n) {
  if (n === undefined || n === null) return '—';
  if (n >= 1e12) return (n / 1e12).toFixed(1) + ' TB';
  if (n >= 1e9)  return (n / 1e9).toFixed(1) + ' GB';
  if (n >= 1e6)  return (n / 1e6).toFixed(1) + ' MB';
  if (n >= 1e3)  return (n / 1e3).toFixed(1) + ' KB';
  return n + ' B';
}
function fmtNum(n) {
  if (n === undefined || n === null) return '—';
  return parseInt(n).toLocaleString();
}
const STAGE_LABELS = {
  QUEUED: 'Queued', HASHING: 'Hashing', DEDUPLICATION: 'Dedup',
  TYPE_DETECTION: 'Type', CONTAINER_EXPANSION: 'Container',
  METADATA_EXTRACTION: 'Metadata', TEXT_EXTRACTION: 'Text',
  OCR: 'OCR', LANGUAGE_DETECTION: 'Lang', NEAR_DEDUP: 'Near-Dedup',
  EMAIL_THREADING: 'Threading', INDEXING: 'Indexing',
  COMPLETE: 'Complete', ERROR: 'Error', NEEDS_REMEDIATION: 'Remediation',
  EXCLUDED: 'Excluded (NIST)',
};
const STAGE_CLASS = {
  COMPLETE: 'green', ERROR: 'red', NEEDS_REMEDIATION: 'yellow',
  EXCLUDED: 'muted',
};

export default function Dashboard({ matterId, navigate }) {
  const [matter, setMatter]   = useState(null);
  const [stats, setStats]     = useState(null);
  const [errors, setErrors]   = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matterId) return;
    setLoading(true);
    Promise.all([
      api.get(`/matters/${matterId}`),
      api.get(`/matters/${matterId}/stats`),
      api.get(`/errors/summary?matterId=${matterId}`),
    ]).then(([m, s, e]) => {
      setMatter(m);
      setStats(s);
      setErrors(e);
      setSources(s.sources ?? []);
    }).catch(console.error).finally(() => setLoading(false));
  }, [matterId]);

  if (!matterId) return (
    <div className="empty-state">
      <div className="empty-icon">⚖</div>
      <h3>No matter selected</h3>
      <p>Select or create a matter to get started.</p>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('matters')}>
        View Matters
      </button>
    </div>
  );

  if (loading) return <div className="loading-overlay"><div className="spinner" /> Loading dashboard…</div>;
  if (!matter) return <div className="alert alert-error">Matter not found.</div>;

  const byStage   = stats?.byStage ?? [];
  const total     = byStage.reduce((s, r) => s + parseInt(r.count), 0);
  const complete  = parseInt(byStage.find(r => r.stage === 'COMPLETE')?.count ?? 0);
  const errorDocs = parseInt(byStage.find(r => r.stage === 'ERROR')?.count ?? 0);
  const remDocs   = parseInt(byStage.find(r => r.stage === 'NEEDS_REMEDIATION')?.count ?? 0);
  const queued    = total - complete - errorDocs - remDocs;
  const totalBytes = byStage.reduce((s, r) => s + parseInt(r.bytes ?? 0), 0);
  const pct       = total > 0 ? Math.round((complete / total) * 100) : 0;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{matter.name}</h1>
          <p>{matter.number} · {matter.client ?? 'No client'} · <span className={`badge badge-${matter.status === 'ACTIVE' ? 'green' : 'muted'}`}>{matter.status}</span></p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={() => navigate('audit', { matterId })}>Audit Log</button>
          <button className="btn btn-primary" onClick={() => navigate('ingest', { matterId })}>+ Ingest Data</button>
        </div>
      </div>

      {/* Critical error alert */}
      {errors?.critical_count > 0 && (
        <div className="alert alert-critical" style={{ cursor: 'pointer' }} onClick={() => navigate('errors', { matterId })}>
          ⚠ <strong>{errors.critical_count} CRITICAL error{errors.critical_count > 1 ? 's' : ''}</strong> — possible integrity violations. Immediate review required.
        </div>
      )}
      {errors?.hash_mismatch_count > 0 && (
        <div className="alert alert-critical" onClick={() => navigate('errors', { matterId })}>
          ⚠ <strong>{errors.hash_mismatch_count} hash mismatch{errors.hash_mismatch_count > 1 ? 'es' : ''}</strong> detected — chain of custody may be compromised.
        </div>
      )}

      {/* Key stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Files</div>
          <div className="stat-value">{fmtNum(total)}</div>
          <div className="stat-sub">{fmt(totalBytes)} total size</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Processed</div>
          <div className="stat-value" style={{ color: 'var(--green-text)' }}>{fmtNum(complete)}</div>
          <div className="stat-sub">{pct}% complete</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Progress</div>
          <div className="stat-value" style={{ color: 'var(--blue-text)' }}>{fmtNum(queued)}</div>
          <div className="stat-sub">queued / active</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Errors</div>
          <div className="stat-value" style={{ color: errorDocs > 0 ? 'var(--red-text)' : 'var(--text-muted)' }}>
            {fmtNum(errorDocs + remDocs)}
          </div>
          <div className="stat-sub">{fmtNum(remDocs)} need remediation</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Open Errors</div>
          <div className="stat-value" style={{ color: 'var(--yellow-text)' }}>
            {fmtNum(parseInt(errors?.open_count ?? 0))}
          </div>
          <div className="stat-sub">
            {fmtNum(parseInt(errors?.remediated_count ?? 0))} remediated
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Data Sources</div>
          <div className="stat-value">{fmtNum(sources.length)}</div>
          <div className="stat-sub">custodian data sets</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="card-header">
          <h2>Processing Progress</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pct}%</span>
        </div>
        <div className="progress-bar" style={{ height: 12, marginBottom: 'var(--space-4)' }}>
          <div className="progress-fill green" style={{ width: `${pct}%` }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {byStage.map(r => (
            <div
              key={r.stage}
              className={`pipeline-stage ${STAGE_CLASS[r.stage] ?? 'done'}`}
              title={`${r.stage}: ${r.count} files`}
            >
              {STAGE_LABELS[r.stage] ?? r.stage}: {fmtNum(r.count)}
            </div>
          ))}
        </div>
      </div>

      {/* Error breakdown + Data sources */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        {/* Error breakdown */}
        <div className="card">
          <div className="card-header">
            <h2>Processing Errors</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('errors', { matterId })}>
              View All →
            </button>
          </div>
          {errors?.total_count > 0 ? (
            <table>
              <thead>
                <tr><th>Type</th><th>Count</th><th>Status</th></tr>
              </thead>
              <tbody>
                {errors.byType?.map(e => (
                  <tr key={e.error_type} onClick={() => navigate('errors', { matterId })}>
                    <td><code style={{ fontSize: '0.75rem' }}>{e.error_type}</code></td>
                    <td>{fmtNum(e.count)}</td>
                    <td>
                      <span className="badge badge-yellow">open</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--green-text)' }}>
              ✓ No processing errors
            </div>
          )}
        </div>

        {/* Data sources */}
        <div className="card">
          <div className="card-header">
            <h2>Data Sources</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('ingest', { matterId })}>
              + Add →
            </button>
          </div>
          {sources.length > 0 ? (
            <table>
              <thead>
                <tr><th>Name</th><th>Files</th><th>Errors</th><th>Status</th></tr>
              </thead>
              <tbody>
                {sources.map(s => (
                  <tr key={s.id}>
                    <td title={s.name}>{s.name}</td>
                    <td>{fmtNum(s.total_files)}</td>
                    <td style={{ color: s.error_files > 0 ? 'var(--red-text)' : 'inherit' }}>
                      {fmtNum(s.error_files)}
                    </td>
                    <td>
                      <span className={`badge badge-${s.status === 'COMPLETE' ? 'green' : s.status === 'ERROR' ? 'red' : 'blue'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
              <p>No data sources yet.</p>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }}
                onClick={() => navigate('ingest', { matterId })}>
                Ingest Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
