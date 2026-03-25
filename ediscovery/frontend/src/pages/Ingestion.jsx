/**
 * Data Ingestion Page
 *
 * Handles file upload with chain of custody logging from first touch.
 * Features:
 *  - Drag-and-drop upload (all file types)
 *  - Custodian assignment before upload
 *  - Per-file progress with hash display
 *  - Source-level collection metadata (collection date, tool, collector)
 *  - Real-time processing status
 */
import { useState, useRef, useEffect } from 'react';
import { api } from '../api/client.js';

export default function Ingestion({ matterId, navigate }) {
  const [custodians, setCustodians]   = useState([]);
  const [sources, setSources]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [step, setStep]               = useState('source'); // source | upload | status
  const [dragOver, setDragOver]       = useState(false);
  const [files, setFiles]             = useState([]);
  const [uploading, setUploading]     = useState(false);

  // Source creation form
  const [sourceForm, setSourceForm]   = useState({
    name: '', custodianId: '', sourceType: 'UPLOAD',
    collectedBy: '', collectionTool: '', collectionDate: '', collectionNotes: '',
    sourceMd5: '', sourceSha256: '',
  });
  const [currentSourceId, setCurrentSourceId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!matterId) return;
    Promise.all([
      api.get(`/matters/${matterId}/custodians`),
    ]).then(([c]) => {
      setCustodians(c);
    }).catch(console.error).finally(() => setLoading(false));
  }, [matterId]);

  const onDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    addFiles(dropped);
  };

  const addFiles = newFiles => {
    const items = newFiles.map(f => ({
      file: f,
      id:   crypto.randomUUID(),
      name: f.name,
      size: f.size,
      status: 'pending',
      progress: 0,
      hash: null,
      documentId: null,
      error: null,
    }));
    setFiles(prev => [...prev, ...items]);
  };

  async function createSource() {
    if (!sourceForm.name) { alert('Source name is required.'); return; }
    try {
      const source = await api.post(`/ingest/${matterId}/sources`, sourceForm);
      setCurrentSourceId(source.id);
      setSources(prev => [source, ...prev]);
      setStep('upload');
    } catch (err) {
      alert('Failed to create source: ' + err.message);
    }
  }

  async function startUpload() {
    if (!files.length) { alert('Add at least one file.'); return; }
    if (!currentSourceId) { alert('Create a data source first.'); return; }
    setUploading(true);

    for (const fileItem of files) {
      if (fileItem.status !== 'pending') continue;

      setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'uploading' } : f));

      try {
        const formData = new FormData();
        formData.append('file', fileItem.file);
        formData.append('matterId', matterId);
        formData.append('dataSourceId', currentSourceId);
        if (sourceForm.custodianId) formData.append('custodianId', sourceForm.custodianId);

        const result = await api.upload(`/ingest/${matterId}/files`, formData, {
          onProgress: pct => {
            setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, progress: pct } : f));
          },
        });

        setFiles(prev => prev.map(f => f.id === fileItem.id ? {
          ...f, status: 'complete', progress: 100,
          documentId: result.documentId,
          hash: result.hashes?.sha256,
        } : f));
      } catch (err) {
        setFiles(prev => prev.map(f => f.id === fileItem.id ? {
          ...f, status: 'error', error: err.message,
        } : f));
      }
    }

    setUploading(false);
    setStep('status');
  }

  function removeFile(id) {
    setFiles(prev => prev.filter(f => f.id !== id));
  }

  if (!matterId) return <div className="empty-state"><p>Select a matter first.</p></div>;
  if (loading) return <div className="loading-overlay"><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Ingest Data</h1>
          <p>Upload evidence files. Chain of custody logging begins at first touch.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={() => navigate('processing', { matterId })}>
            View Processing →
          </button>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginBottom: 'var(--space-4)' }}>
        ℹ Every file is hashed (MD5 + SHA-1 + SHA-256) during upload and verified after storage.
        All actions are recorded in the immutable audit log.
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'source', label: '1. Data Source' },
          { id: 'upload', label: '2. Upload Files' },
          { id: 'status', label: '3. Processing' },
        ].map(s => (
          <div key={s.id} style={{
            padding: '10px 20px',
            borderBottom: step === s.id ? '2px solid var(--accent)' : '2px solid transparent',
            color: step === s.id ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight: step === s.id ? 600 : 400,
            fontSize: '0.88rem',
          }}>{s.label}</div>
        ))}
      </div>

      {/* Step 1: Create data source */}
      {step === 'source' && (
        <div className="card" style={{ maxWidth: 700 }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Define Data Source</h2>
          <p style={{ marginBottom: 'var(--space-4)' }}>
            Document the provenance of this data set before uploading. This information is
            recorded in the chain of custody and cannot be changed after upload begins.
          </p>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label className="form-label">Source Name *</label>
              <input className="form-input" value={sourceForm.name}
                onChange={e => setSourceForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Jane Doe — Laptop (2024 Q4)" />
            </div>
            <div className="form-group">
              <label className="form-label">Source Type</label>
              <select className="form-select" value={sourceForm.sourceType}
                onChange={e => setSourceForm(f => ({ ...f, sourceType: e.target.value }))}>
                <option value="UPLOAD">Direct Upload</option>
                <option value="FORENSIC_IMAGE">Forensic Image (E01/DD)</option>
                <option value="PST">PST / OST</option>
                <option value="NSF">Lotus Notes NSF</option>
                <option value="MBOX">MBOX</option>
                <option value="SHAREPOINT">SharePoint</option>
                <option value="ONEDRIVE">OneDrive</option>
                <option value="GOOGLE_DRIVE">Google Drive</option>
                <option value="MOBILE">Mobile Device</option>
                <option value="SFTP">SFTP / FTP</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Custodian</label>
            <select className="form-select" value={sourceForm.custodianId}
              onChange={e => setSourceForm(f => ({ ...f, custodianId: e.target.value }))}>
              <option value="">— Select Custodian —</option>
              {custodians.map(c => <option key={c.id} value={c.id}>{c.name} {c.email ? `(${c.email})` : ''}</option>)}
            </select>
            <p className="form-hint">
              The person whose data this is.{' '}
              <button style={{ background:'none',border:'none',color:'var(--accent)',cursor:'pointer',fontSize:'0.75rem' }}
                onClick={async () => {
                  const name = prompt('Custodian name:');
                  if (!name) return;
                  const c = await api.post(`/matters/${matterId}/custodians`, { name });
                  setCustodians(prev => [...prev, c]);
                  setSourceForm(f => ({ ...f, custodianId: c.id }));
                }}>
                + Add new custodian
              </button>
            </p>
          </div>

          <hr className="divider" />
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Collection Metadata</h3>
          <p style={{ marginBottom: 'var(--space-4)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Document who collected the data, when, and how — required for defensibility.
          </p>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label className="form-label">Collected By</label>
              <input className="form-input" value={sourceForm.collectedBy}
                onChange={e => setSourceForm(f => ({ ...f, collectedBy: e.target.value }))}
                placeholder="John Smith, Digital Forensics Examiner" />
            </div>
            <div className="form-group">
              <label className="form-label">Collection Date</label>
              <input className="form-input" type="date" value={sourceForm.collectionDate}
                onChange={e => setSourceForm(f => ({ ...f, collectionDate: e.target.value }))} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Collection Tool / Method</label>
            <input className="form-input" value={sourceForm.collectionTool}
              onChange={e => setSourceForm(f => ({ ...f, collectionTool: e.target.value }))}
              placeholder="Magnet AXIOM v7.0, write-blocked, forensic copy" />
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label className="form-label">Source MD5 Hash (if known)</label>
              <input className="form-input mono" value={sourceForm.sourceMd5}
                onChange={e => setSourceForm(f => ({ ...f, sourceMd5: e.target.value }))}
                placeholder="Verify against collection receipt" />
            </div>
            <div className="form-group">
              <label className="form-label">Source SHA-256 Hash (if known)</label>
              <input className="form-input mono" value={sourceForm.sourceSha256}
                onChange={e => setSourceForm(f => ({ ...f, sourceSha256: e.target.value }))} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Collection Notes</label>
            <textarea className="form-textarea" value={sourceForm.collectionNotes}
              onChange={e => setSourceForm(f => ({ ...f, collectionNotes: e.target.value }))}
              placeholder="Any notes about the collection process, chain of custody at collection, special circumstances…" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <button className="btn btn-ghost" onClick={() => navigate('dashboard', { matterId })}>Cancel</button>
            <button className="btn btn-primary" onClick={createSource}>
              Continue to Upload →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload files */}
      {step === 'upload' && (
        <div>
          {/* Drop zone */}
          <div
            className={`drop-zone${dragOver ? ' drag-over' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            style={{ marginBottom: 'var(--space-4)' }}
          >
            <div className="drop-icon">↑</div>
            <h3>Drop files here or click to browse</h3>
            <p>All file types supported. Individual files up to 50 GB.</p>
            <p style={{ marginTop: 8 }}>
              Supports: Office, PDF, Email (EML/MSG/PST), Images, Video, Archives, Databases, and 500+ more types.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={e => addFiles(Array.from(e.target.files))}
            />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="card card-sm" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <h3>{files.length} file{files.length > 1 ? 's' : ''} selected</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Total: {fmt(files.reduce((s, f) => s + f.size, 0))}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
                {files.map(f => (
                  <div key={f.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 12px', background: 'var(--bg-overlay)', borderRadius: 'var(--radius)',
                  }}>
                    <div className={`file-icon ${getFileIconClass(f.name)}`}>
                      {getFileIconLabel(f.name)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fmt(f.size)}</div>
                    </div>
                    {f.status === 'uploading' && (
                      <div style={{ width: 100 }}>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${f.progress}%` }} />
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right' }}>{f.progress}%</div>
                      </div>
                    )}
                    {f.status === 'complete' && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                        <span className="badge badge-green">✓ Uploaded</span>
                        {f.hash && <span className="hash-value">{f.hash.substring(0,16)}…</span>}
                      </div>
                    )}
                    {f.status === 'error' && (
                      <span className="badge badge-red" title={f.error}>✕ Error</span>
                    )}
                    {f.status === 'pending' && !uploading && (
                      <button className="btn btn-ghost btn-xs" onClick={() => removeFile(f.id)}>✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            <button className="btn btn-ghost" onClick={() => setStep('source')} disabled={uploading}>← Back</button>
            <button className="btn btn-primary" onClick={startUpload} disabled={uploading || !files.length}>
              {uploading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Uploading…</> : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Processing status */}
      {step === 'status' && (
        <div>
          <div className="alert alert-success">
            ✓ {files.filter(f => f.status === 'complete').length} of {files.length} files uploaded and queued for processing.
          </div>
          {files.filter(f => f.status === 'error').length > 0 && (
            <div className="alert alert-error">
              {files.filter(f => f.status === 'error').length} file(s) failed to upload. See errors below.
            </div>
          )}

          <div className="card card-sm" style={{ marginBottom: 'var(--space-4)' }}>
            <table>
              <thead>
                <tr><th>File</th><th>Size</th><th>SHA-256</th><th>Status</th></tr>
              </thead>
              <tbody>
                {files.map(f => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{fmt(f.size)}</td>
                    <td>{f.hash ? <span className="hash-value">{f.hash.substring(0,32)}…</span> : '—'}</td>
                    <td>
                      {f.status === 'complete'
                        ? <span className="badge badge-green">✓ Uploaded &amp; Queued</span>
                        : <span className="badge badge-red" title={f.error}>✕ {f.error}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-ghost" onClick={() => { setFiles([]); setStep('upload'); }}>
              Upload More Files
            </button>
            <button className="btn btn-primary" onClick={() => navigate('processing', { matterId })}>
              Monitor Processing →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function fmt(n) {
  if (!n) return '0 B';
  if (n >= 1e9) return (n/1e9).toFixed(1) + ' GB';
  if (n >= 1e6) return (n/1e6).toFixed(1) + ' MB';
  if (n >= 1e3) return (n/1e3).toFixed(1) + ' KB';
  return n + ' B';
}

function getFileIconClass(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (['eml','msg','mbox'].includes(ext)) return 'email';
  if (ext === 'pdf') return 'pdf';
  if (['doc','docx','rtf','odt'].includes(ext)) return 'word';
  if (['xls','xlsx','csv','ods'].includes(ext)) return 'excel';
  if (['ppt','pptx','odp'].includes(ext)) return 'ppt';
  if (['jpg','jpeg','png','tif','tiff','bmp','gif','heic'].includes(ext)) return 'image';
  if (['zip','rar','7z','tar','gz','pst','nsf'].includes(ext)) return 'archive';
  return 'unknown';
}

function getFileIconLabel(name) {
  const ext = name.split('.').pop().toLowerCase();
  return ext.substring(0, 3);
}
