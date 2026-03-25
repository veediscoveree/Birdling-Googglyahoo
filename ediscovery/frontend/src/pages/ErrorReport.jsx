/**
 * Error Report Page
 *
 * The most critical page for defensibility. Every processing exception
 * is shown here with full context, severity classification, and
 * a remediation workflow.
 *
 * Features:
 *  - Severity breakdown at top (CRITICAL → HIGH → MEDIUM → LOW)
 *  - Full error list with file context, stack trace access
 *  - Remediation workflow (provide password, dismiss, note)
 *  - CSV export for court submission / expert review
 *  - Hash mismatch alert (chain of custody violation)
 */
import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client.js';

const SEV_ORDER = ['CRITICAL','HIGH','MEDIUM','LOW'];
const SEV_CLASS  = { CRITICAL:'critical', HIGH:'high', MEDIUM:'medium', LOW:'low' };
const TYPE_LABELS = {
  PASSWORD_PROTECTED: 'Password Protected',
  CORRUPT_FILE:       'Corrupt File',
  UNSUPPORTED_FORMAT: 'Unsupported Format',
  EMPTY_FILE:         'Empty File',
  TIKA_FAILURE:       'Text Extraction Failure',
  OCR_FAILURE:        'OCR Failure',
  METADATA_FAILURE:   'Metadata Failure',
  ARCHIVE_EXPANSION:  'Archive Expansion',
  INDEXING_FAILURE:   'Indexing Failure',
  STORAGE_FAILURE:    'Storage Failure',
  HASH_MISMATCH:      '⚠ Hash Mismatch (Integrity Violation)',
  DEDUP_FAILURE:      'Dedup Failure',
  EMAIL_THREAD_FAILURE:'Email Threading Failure',
  PROCESSING_TIMEOUT: 'Processing Timeout',
  UNKNOWN:            'Unknown Error',
};

export default function ErrorReport({ matterId, navigate }) {
  const [summary, setSummary]       = useState(null);
  const [errors, setErrors]         = useState([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState({
    severity: '', errorType: '', isRemediated: '', isDismissed: 'false',
  });
  const [offset, setOffset]         = useState(0);
  const [selected, setSelected]     = useState(null);
  const [remNote, setRemNote]       = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const LIMIT = 50;

  const load = useCallback(async () => {
    if (!matterId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ matterId, limit: LIMIT, offset });
      if (filter.severity)      params.set('severity', filter.severity);
      if (filter.errorType)     params.set('errorType', filter.errorType);
      if (filter.isRemediated)  params.set('isRemediated', filter.isRemediated);
      if (filter.isDismissed)   params.set('isDismissed', filter.isDismissed);

      const [sumData, errData] = await Promise.all([
        api.get(`/errors/summary?matterId=${matterId}`),
        api.get(`/errors?${params}`),
      ]);
      setSummary(sumData);
      setErrors(errData.errors);
      setTotal(errData.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [matterId, filter, offset]);

  useEffect(() => { load(); }, [load]);

  async function remediate(errorId) {
    setActionLoading(true);
    try {
      await api.post(`/errors/${errorId}/remediate`, { notes: remNote });
      setSelected(null);
      setRemNote('');
      load();
    } catch (e) { alert(e.message); }
    finally { setActionLoading(false); }
  }

  async function dismiss(errorId) {
    if (!window.confirm('Dismiss this error? (It will be hidden from open errors but remains in the record.)')) return;
    setActionLoading(true);
    try {
      await api.post(`/errors/${errorId}/dismiss`, { reason: remNote || 'Reviewed and dismissed' });
      setSelected(null);
      setRemNote('');
      load();
    } catch (e) { alert(e.message); }
    finally { setActionLoading(false); }
  }

  const exportCsv = () => {
    window.location.href = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/errors/export.csv?matterId=${matterId}`;
  };

  if (!matterId) return <div className="empty-state"><p>Select a matter.</p></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Error Report</h1>
          <p>All processing exceptions — classified by severity with full file context.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={exportCsv}>↓ Export CSV</button>
          <button className="btn btn-ghost" onClick={() => navigate('audit', { matterId })}>Audit Log</button>
        </div>
      </div>

      {/* Hash mismatch critical alert */}
      {summary?.hash_mismatch_count > 0 && (
        <div className="alert alert-critical">
          ⚠ <strong>CRITICAL: {summary.hash_mismatch_count} hash mismatch(es) detected.</strong>{' '}
          These files may be corrupt or tampered with. Chain of custody may be compromised.
          These errors require immediate review before any production.
        </div>
      )}

      {/* Severity summary */}
      {summary && (
        <div className="stat-grid" style={{ marginBottom: 'var(--space-4)' }}>
          {SEV_ORDER.map(sev => {
            const key = sev.toLowerCase() + '_count';
            const cnt = parseInt(summary[key] ?? 0);
            return (
              <div
                className="stat-card"
                key={sev}
                style={{ cursor: 'pointer', borderColor: cnt > 0 ? `var(--${SEV_CLASS[sev] === 'critical' ? 'critical' : SEV_CLASS[sev] + '-color'})` : undefined }}
                onClick={() => { setFilter(f => ({ ...f, severity: sev })); setOffset(0); }}
              >
                <div className="stat-label">{sev}</div>
                <div className="stat-value" style={{ color: cnt > 0 ? `var(--${SEV_CLASS[sev] === 'critical' ? 'critical' : SEV_CLASS[sev] + '-color'})` : 'var(--text-muted)' }}>
                  {cnt.toLocaleString()}
                </div>
                <div className="stat-sub">
                  {sev === 'CRITICAL' ? 'integrity violations' :
                   sev === 'HIGH'     ? 'unprocessable files' :
                   sev === 'MEDIUM'   ? 'partial processing'  : 'informational'}
                </div>
              </div>
            );
          })}
          <div className="stat-card">
            <div className="stat-label">Open</div>
            <div className="stat-value" style={{ color: parseInt(summary.open_count) > 0 ? 'var(--yellow-text)' : 'var(--green-text)' }}>
              {parseInt(summary.open_count).toLocaleString()}
            </div>
            <div className="stat-sub">{parseInt(summary.remediated_count).toLocaleString()} remediated</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card card-sm" style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          <select className="form-select" style={{ width: 160 }} value={filter.severity}
            onChange={e => { setFilter(f => ({ ...f, severity: e.target.value })); setOffset(0); }}>
            <option value="">All Severities</option>
            {SEV_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="form-select" style={{ width: 200 }} value={filter.errorType}
            onChange={e => { setFilter(f => ({ ...f, errorType: e.target.value })); setOffset(0); }}>
            <option value="">All Error Types</option>
            {Object.entries(TYPE_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select className="form-select" style={{ width: 160 }} value={filter.isRemediated}
            onChange={e => { setFilter(f => ({ ...f, isRemediated: e.target.value })); setOffset(0); }}>
            <option value="">All Status</option>
            <option value="false">Open</option>
            <option value="true">Remediated</option>
          </select>
          <select className="form-select" style={{ width: 140 }} value={filter.isDismissed}
            onChange={e => { setFilter(f => ({ ...f, isDismissed: e.target.value })); setOffset(0); }}>
            <option value="false">Not Dismissed</option>
            <option value="">Include Dismissed</option>
            <option value="true">Dismissed Only</option>
          </select>
          {(filter.severity || filter.errorType) && (
            <button className="btn btn-ghost btn-sm" onClick={() => {
              setFilter({ severity:'', errorType:'', isRemediated:'', isDismissed:'false' });
              setOffset(0);
            }}>Clear Filters</button>
          )}
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {total.toLocaleString()} errors
          </span>
        </div>
      </div>

      {/* Error list */}
      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div className="loading-overlay"><div className="spinner" /> Loading errors…</div>
        ) : errors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon" style={{ color: 'var(--green-text)' }}>✓</div>
            <h3>No errors</h3>
            <p>{filter.severity || filter.errorType ? 'No errors match the current filters.' : 'All files processed successfully.'}</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Type</th>
                  <th>File</th>
                  <th>SHA-256</th>
                  <th>Stage</th>
                  <th>Message</th>
                  <th>Occurred</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {errors.map(err => (
                  <tr key={err.id} onClick={() => setSelected(selected?.id === err.id ? null : err)}>
                    <td>
                      <span className={`badge sev-${SEV_CLASS[err.severity] ?? 'muted'}`}>
                        {err.severity}
                      </span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.72rem' }}>
                        {TYPE_LABELS[err.error_type] ?? err.error_type}
                      </code>
                    </td>
                    <td title={err.file_path ?? err.file_name}>
                      {err.file_name ?? err.original_name ?? '—'}
                    </td>
                    <td>
                      {err.sha256
                        ? <span className="hash-value">{err.sha256.substring(0, 16)}…</span>
                        : '—'}
                    </td>
                    <td><code style={{ fontSize: '0.72rem' }}>{err.stage ?? '—'}</code></td>
                    <td title={err.message} style={{ maxWidth: 200 }}>{err.message}</td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(err.occurred_at).toLocaleString()}
                    </td>
                    <td>
                      {err.is_remediated
                        ? <span className="badge badge-green">Remediated</span>
                        : err.is_dismissed
                          ? <span className="badge badge-muted">Dismissed</span>
                          : <span className="badge badge-yellow">Open</span>}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      {!err.is_remediated && !err.is_dismissed && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-success btn-xs" onClick={() => setSelected(err)}>
                            Remediate
                          </button>
                          <button className="btn btn-ghost btn-xs" onClick={() => { setSelected(err); }}>
                            Dismiss
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > LIMIT && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <button className="btn btn-ghost btn-sm" disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - LIMIT))}>
            ← Prev
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>
            {offset + 1}–{Math.min(offset + LIMIT, total)} of {total.toLocaleString()}
          </span>
          <button className="btn btn-ghost btn-sm" disabled={offset + LIMIT >= total}
            onClick={() => setOffset(offset + LIMIT)}>
            Next →
          </button>
        </div>
      )}

      {/* Remediation panel */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }} onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card" style={{ width: 560, maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="card-header">
              <h2>Error Detail &amp; Remediation</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div>
                <h4>Severity &amp; Type</h4>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span className={`badge sev-${SEV_CLASS[selected.severity] ?? 'muted'}`}>{selected.severity}</span>
                  <span className="badge badge-muted">{selected.error_type}</span>
                  <span className="badge badge-muted">{selected.stage}</span>
                </div>
              </div>
              <div>
                <h4>File</h4>
                <p style={{ fontSize: '0.85rem', marginTop: 4 }}>{selected.file_name ?? '—'}</p>
                {selected.file_path && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selected.file_path}</p>}
                {selected.file_size && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selected.file_size.toLocaleString()} bytes</p>}
              </div>
              {selected.sha256 && (
                <div>
                  <h4>SHA-256 Hash</h4>
                  <div className="hash-value" style={{ marginTop: 4 }}>{selected.sha256}</div>
                </div>
              )}
              <div>
                <h4>Error Message</h4>
                <p style={{ fontSize: '0.85rem', marginTop: 4 }}>{selected.message}</p>
              </div>
              {selected.details && (
                <div>
                  <h4>Details</h4>
                  <pre style={{
                    fontSize: '0.72rem', background: 'var(--bg-overlay)',
                    padding: 8, borderRadius: 4, overflowX: 'auto',
                    color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
                    maxHeight: 200, overflowY: 'auto',
                  }}>{selected.details}</pre>
                </div>
              )}
              <div>
                <h4>Occurred</h4>
                <p style={{ fontSize: '0.85rem', marginTop: 4 }}>
                  {new Date(selected.occurred_at).toLocaleString()}
                </p>
              </div>
            </div>

            {!selected.is_remediated && !selected.is_dismissed && (
              <div>
                <hr className="divider" />
                <div className="form-group">
                  <label className="form-label">Remediation Notes (required for audit trail)</label>
                  <textarea
                    className="form-textarea"
                    value={remNote}
                    onChange={e => setRemNote(e.target.value)}
                    placeholder={
                      selected.error_type === 'PASSWORD_PROTECTED'
                        ? 'e.g., Password provided by custodian. File decrypted and re-uploaded for reprocessing.'
                        : selected.error_type === 'CORRUPT_FILE'
                          ? 'e.g., File confirmed corrupt at source. No recoverable data. Documented for privilege log.'
                          : 'Describe the remediation action taken…'
                    }
                  />
                  <p className="form-hint">
                    This note will be permanently recorded in the audit log for defensibility.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <button
                    className="btn btn-success"
                    disabled={!remNote.trim() || actionLoading}
                    onClick={() => remediate(selected.id)}
                  >
                    {actionLoading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Saving…</> : '✓ Mark Remediated'}
                  </button>
                  <button
                    className="btn btn-ghost"
                    disabled={actionLoading}
                    onClick={() => dismiss(selected.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {selected.is_remediated && (
              <div className="alert alert-success">
                ✓ Remediated: {selected.remediation_notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
