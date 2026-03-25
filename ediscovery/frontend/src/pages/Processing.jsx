import { useState, useEffect, useRef } from 'react';
import { api } from '../api/client.js';

const STAGES = [
  'QUEUED','HASHING','TYPE_DETECTION','DENISTING','DEDUPLICATION',
  'CONTAINER_EXPANSION','METADATA_EXTRACTION','TEXT_EXTRACTION','OCR',
  'LANGUAGE_DETECTION','NEAR_DEDUP','EMAIL_THREADING','INDEXING',
  'COMPLETE','ERROR','NEEDS_REMEDIATION','EXCLUDED',
];
const STAGE_LABEL = {
  QUEUED:'Queued', HASHING:'Hashing', TYPE_DETECTION:'Type Detection',
  DENISTING:'De-NISTing', DEDUPLICATION:'Dedup',
  CONTAINER_EXPANSION:'Container Expansion', METADATA_EXTRACTION:'Metadata',
  TEXT_EXTRACTION:'Text Extraction', OCR:'OCR',
  LANGUAGE_DETECTION:'Language', NEAR_DEDUP:'Near-Dedup',
  EMAIL_THREADING:'Email Threading', INDEXING:'Indexing',
  COMPLETE:'Complete', ERROR:'Error', NEEDS_REMEDIATION:'Needs Remediation',
  EXCLUDED:'Excluded (NIST)',
};

export default function Processing({ matterId, navigate }) {
  const [stats, setStats]   = useState(null);
  const [docs, setDocs]     = useState([]);
  const [total, setTotal]   = useState(0);
  const [filter, setFilter] = useState({ stage: '', errorOnly: false });
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const LIMIT = 50;

  async function load() {
    if (!matterId) return;
    try {
      const params = new URLSearchParams({
        matterId, limit: LIMIT, offset,
        ...(filter.stage ? { stage: filter.stage } : {}),
        sortBy: 'created_at', sortDir: 'DESC',
      });
      const [s, d] = await Promise.all([
        api.get(`/matters/${matterId}/stats`),
        api.get(`/documents?${params}`),
      ]);
      setStats(s);
      setDocs(d.documents);
      setTotal(d.total);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    load();
    // Auto-refresh every 5s while processing is active
    intervalRef.current = setInterval(load, 5000);
    return () => clearInterval(intervalRef.current);
  }, [matterId, filter, offset]);

  const byStage = stats?.byStage ?? [];
  const totalFiles = byStage.reduce((s, r) => s + parseInt(r.count), 0);
  const complete   = parseInt(byStage.find(r => r.stage === 'COMPLETE')?.count ?? 0);
  const pct        = totalFiles > 0 ? Math.round((complete / totalFiles) * 100) : 0;
  const inProgress = totalFiles - complete -
    parseInt(byStage.find(r => r.stage === 'ERROR')?.count ?? 0) -
    parseInt(byStage.find(r => r.stage === 'NEEDS_REMEDIATION')?.count ?? 0);

  const stageColor = s => ({
    COMPLETE: 'green', ERROR: 'red', NEEDS_REMEDIATION: 'yellow',
    EXCLUDED: 'muted',
  }[s] ?? 'blue');

  if (!matterId) return <div className="empty-state"><p>Select a matter.</p></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Processing Queue</h1>
          <p>Real-time status of all document processing. Auto-refreshes every 5 seconds.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={() => navigate('errors', { matterId })}>
            Error Report →
          </button>
        </div>
      </div>

      {/* Stage breakdown */}
      <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="card-header">
          <h2>Pipeline Overview</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {pct}% complete · {inProgress.toLocaleString()} in progress
          </span>
        </div>
        <div className="progress-bar" style={{ height: 10, marginBottom: 'var(--space-4)' }}>
          <div className="progress-fill green" style={{ width: `${pct}%` }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
          {byStage.map(r => (
            <button
              key={r.stage}
              style={{
                background: filter.stage === r.stage ? 'var(--accent-muted)' : 'var(--bg-overlay)',
                border: `1px solid ${filter.stage === r.stage ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                padding: '10px 12px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onClick={() => { setFilter(f => ({ ...f, stage: f.stage === r.stage ? '' : r.stage })); setOffset(0); }}
            >
              <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 4 }}>
                {STAGE_LABEL[r.stage] ?? r.stage}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: r.stage === 'ERROR' ? 'var(--red-text)' : r.stage === 'NEEDS_REMEDIATION' ? 'var(--yellow-text)' : r.stage === 'COMPLETE' ? 'var(--green-text)' : 'var(--text-primary)' }}>
                {parseInt(r.count).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filters + doc list */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', alignItems: 'center' }}>
        <select className="form-select" style={{ width: 200 }} value={filter.stage}
          onChange={e => { setFilter(f => ({ ...f, stage: e.target.value })); setOffset(0); }}>
          <option value="">All Stages</option>
          {STAGES.map(s => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
        </select>
        {filter.stage && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setFilter({ stage:'', errorOnly:false }); setOffset(0); }}>
            Clear
          </button>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {total.toLocaleString()} documents
        </span>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading && !docs.length ? (
          <div className="loading-overlay"><div className="spinner" /></div>
        ) : docs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚙</div>
            <h3>No documents</h3>
            <p>Documents will appear here once ingestion begins.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Custodian</th>
                  <th>Stage</th>
                  <th>Errors</th>
                  <th>SHA-256</th>
                  <th>Ingested</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(doc => (
                  <tr key={doc.id}
                    onClick={() => navigate('review', { matterId, documentId: doc.id })}>
                    <td title={doc.original_name}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className={`file-icon ${fileIconClass(doc.file_ext)}`}>
                          {(doc.file_ext ?? '?').replace('.','').substring(0,3)}
                        </div>
                        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth: 200 }}>
                          {doc.original_name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-muted" style={{ fontSize: '0.68rem' }}>
                        {doc.file_category ?? '—'}
                      </span>
                    </td>
                    <td>{fmt(doc.file_size)}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{doc.custodian_name ?? '—'}</td>
                    <td>
                      <span className={`badge badge-${stageColor(doc.processing_stage)}`}>
                        {STAGE_LABEL[doc.processing_stage] ?? doc.processing_stage}
                      </span>
                      {doc.processing_stage !== 'COMPLETE' && doc.processing_stage !== 'ERROR'
                        && doc.processing_stage !== 'NEEDS_REMEDIATION' && doc.processing_stage !== 'EXCLUDED'
                        && doc.processing_stage !== 'QUEUED' && (
                        <div className="spinner" style={{ width: 10, height: 10, marginLeft: 6, display: 'inline-block' }} />
                      )}
                    </td>
                    <td>
                      {doc.processing_error_count > 0
                        ? <span className="badge badge-red">{doc.processing_error_count}</span>
                        : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>
                      {doc.sha256
                        ? <span className="hash-value">{doc.sha256.substring(0,12)}…</span>
                        : '—'}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(doc.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > LIMIT && (
        <div style={{ display:'flex', justifyContent:'center', gap:'var(--space-3)', marginTop:'var(--space-4)' }}>
          <button className="btn btn-ghost btn-sm" disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - LIMIT))}>← Prev</button>
          <span style={{ color:'var(--text-muted)', fontSize:'0.85rem', alignSelf:'center' }}>
            {offset+1}–{Math.min(offset+LIMIT,total)} of {total.toLocaleString()}
          </span>
          <button className="btn btn-ghost btn-sm" disabled={offset+LIMIT >= total}
            onClick={() => setOffset(offset+LIMIT)}>Next →</button>
        </div>
      )}
    </div>
  );
}

function fmt(n) {
  if (!n) return '—';
  if (n >= 1e9) return (n/1e9).toFixed(1)+' GB';
  if (n >= 1e6) return (n/1e6).toFixed(1)+' MB';
  if (n >= 1e3) return (n/1e3).toFixed(1)+' KB';
  return n+' B';
}

function fileIconClass(ext) {
  ext = (ext ?? '').replace('.','').toLowerCase();
  if (['eml','msg','mbox'].includes(ext)) return 'email';
  if (ext === 'pdf') return 'pdf';
  if (['doc','docx','rtf','odt'].includes(ext)) return 'word';
  if (['xls','xlsx','csv','ods'].includes(ext)) return 'excel';
  if (['ppt','pptx','odp'].includes(ext)) return 'ppt';
  if (['jpg','jpeg','png','tif','tiff','bmp','gif'].includes(ext)) return 'image';
  if (['zip','rar','7z','tar','gz','pst','nsf'].includes(ext)) return 'archive';
  return 'unknown';
}
