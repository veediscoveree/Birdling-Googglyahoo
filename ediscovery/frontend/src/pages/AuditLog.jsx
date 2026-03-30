/**
 * Audit Log Page — Chain of Custody Viewer
 *
 * Displays the immutable audit trail with chain integrity verification.
 * The audit log is the legal record of everything that happened to evidence.
 */
import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client.js';

const EVENT_ICONS = {
  FILE_RECEIVED:          '↑',
  FILE_HASHED:            '#',
  HASH_VERIFIED:          '✓',
  HASH_MISMATCH_DETECTED: '⚠',
  PROCESSING_COMPLETE:    '●',
  PROCESSING_ERROR:       '✕',
  DOCUMENT_VIEWED:        '👁',
  DOCUMENT_TAGGED:        '⋮',
  DOCUMENT_UNTAGGED:      '⋮',
  PRODUCTION_CREATED:     '□',
  MATTER_CREATED:         '⚖',
  ERROR_REMEDIATED:       '✓',
  SEARCH_EXECUTED:        '⌕',
  USER_LOGIN:             '→',
};

const EVENT_COLORS = {
  HASH_MISMATCH_DETECTED: 'critical',
  PROCESSING_ERROR:       'error',
  ERROR_REMEDIATED:       'success',
  PROCESSING_COMPLETE:    'success',
};

export default function AuditLog({ matterId, documentId }) {
  const [entries, setEntries]         = useState([]);
  const [total, setTotal]             = useState(0);
  const [loading, setLoading]         = useState(true);
  const [verifying, setVerifying]     = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [filter, setFilter]           = useState({ eventType: '', userId: '' });
  const [offset, setOffset]           = useState(0);
  const [expanded, setExpanded]       = useState(null);
  const LIMIT = 100;

  const load = useCallback(async () => {
    if (!matterId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ matterId, limit: LIMIT, offset });
      if (filter.eventType) params.set('eventType', filter.eventType);
      if (documentId)       params.set('documentId', documentId);
      const data = await api.get(`/audit?${params}`);
      setEntries(data.entries);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [matterId, filter, offset, documentId]);

  useEffect(() => { load(); }, [load]);

  async function verifyChain() {
    setVerifying(true);
    try {
      const result = await api.get(`/audit/verify?matterId=${matterId}`);
      setVerifyResult(result);
    } catch (err) {
      setVerifyResult({ verified: false, error: err.message });
    } finally {
      setVerifying(false);
    }
  }

  if (!matterId) return <div className="empty-state"><p>Select a matter.</p></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Audit Log</h1>
          <p>Immutable chain of custody record. All entries are cryptographically chained.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={verifyChain} disabled={verifying}>
            {verifying ? <><div className="spinner" style={{width:14,height:14}} /> Verifying…</> : '⊕ Verify Chain Integrity'}
          </button>
        </div>
      </div>

      {/* Chain verification result */}
      {verifyResult && (
        <div className={`alert ${verifyResult.verified ? 'alert-success' : 'alert-critical'}`}>
          {verifyResult.verified
            ? <>✓ Chain integrity verified — {verifyResult.entryCount} entries checked, no tampering detected.</>
            : <>⚠ CHAIN INTEGRITY VIOLATION — {verifyResult.issues?.length ?? 1} issue(s) found:
                {verifyResult.issues?.map((issue, i) => (
                  <div key={i} style={{ marginTop: 4, fontSize: '0.85rem' }}>
                    Entry #{issue.id}: {issue.issue} — {issue.detail}
                  </div>
                ))}
              </>
          }
          {verifyResult.verifiedAt && (
            <div style={{ fontSize: '0.75rem', marginTop: 4, opacity: 0.8 }}>
              Verified at: {new Date(verifyResult.verifiedAt).toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="card card-sm" style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <select className="form-select" style={{ width: 240 }} value={filter.eventType}
            onChange={e => { setFilter(f => ({ ...f, eventType: e.target.value })); setOffset(0); }}>
            <option value="">All Event Types</option>
            <optgroup label="Ingestion">
              <option value="FILE_RECEIVED">File Received</option>
              <option value="FILE_HASHED">File Hashed</option>
              <option value="HASH_VERIFIED">Hash Verified</option>
              <option value="HASH_MISMATCH_DETECTED">Hash Mismatch (Critical)</option>
            </optgroup>
            <optgroup label="Processing">
              <option value="PROCESSING_COMPLETE">Processing Complete</option>
              <option value="PROCESSING_ERROR">Processing Error</option>
              <option value="ERROR_REMEDIATED">Error Remediated</option>
            </optgroup>
            <optgroup label="Review">
              <option value="DOCUMENT_VIEWED">Document Viewed</option>
              <option value="DOCUMENT_TAGGED">Document Tagged</option>
            </optgroup>
            <optgroup label="Production">
              <option value="PRODUCTION_CREATED">Production Created</option>
              <option value="PRODUCTION_EXPORTED">Production Exported</option>
            </optgroup>
          </select>
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {total.toLocaleString()} entries
          </span>
        </div>
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="loading-overlay"><div className="spinner" /> Loading audit log…</div>
      ) : entries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⋮</div>
          <h3>No audit entries</h3>
          <p>Audit entries will appear here as actions are taken.</p>
        </div>
      ) : (
        <div className="card card-sm">
          <div className="coc-timeline">
            {entries.map(entry => {
              const color = EVENT_COLORS[entry.event_type];
              const isExpanded = expanded === entry.id;
              return (
                <div key={entry.id} className="coc-entry">
                  <div className={`coc-dot${color === 'critical' ? ' critical' : color === 'success' ? ' normal' : ''}`}>
                    <span>{EVENT_ICONS[entry.event_type] ?? '·'}</span>
                  </div>
                  <div className="coc-body">
                    <div className="coc-event-type">{entry.event_type.replace(/_/g, ' ')}</div>
                    <div className="coc-description"
                      style={{ color: color === 'critical' ? 'var(--critical)' : undefined }}>
                      {entry.description}
                    </div>
                    <div className="coc-meta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>{new Date(entry.occurred_at).toLocaleString()}</span>
                      {entry.user_name && <span>by {entry.user_name}</span>}
                      {entry.ip_address && <span>from {entry.ip_address}</span>}
                      <button
                        style={{ background:'none',border:'none',color:'var(--accent)',cursor:'pointer',fontSize:'0.72rem',padding:0 }}
                        onClick={() => setExpanded(isExpanded ? null : entry.id)}
                      >
                        {isExpanded ? 'Hide details' : 'Show details'}
                      </button>
                    </div>
                    {isExpanded && (
                      <div style={{ marginTop: 8, background: 'var(--bg-overlay)', borderRadius: 4, padding: 12 }}>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Entry Hash (SHA-256):</span>
                          <div className="hash-value">{entry.entry_hash}</div>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Previous Hash:</span>
                          <div className="hash-value">{entry.prev_hash || '(genesis)'}</div>
                        </div>
                        {entry.metadata && (
                          <div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Metadata:</span>
                            <pre style={{
                              fontSize: '0.72rem', color: 'var(--text-secondary)',
                              whiteSpace: 'pre-wrap', marginTop: 4,
                            }}>
                              {JSON.stringify(JSON.parse(entry.metadata), null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {total > LIMIT && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-4)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-4)' }}>
              <button className="btn btn-ghost btn-sm" disabled={offset === 0}
                onClick={() => setOffset(Math.max(0, offset - LIMIT))}>
                ← Newer
              </button>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>
                {offset + 1}–{Math.min(offset + LIMIT, total)} of {total.toLocaleString()}
              </span>
              <button className="btn btn-ghost btn-sm" disabled={offset + LIMIT >= total}
                onClick={() => setOffset(offset + LIMIT)}>
                Older →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
