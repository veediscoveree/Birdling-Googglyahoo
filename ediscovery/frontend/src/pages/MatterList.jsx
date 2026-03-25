import { useState, useEffect } from 'react';
import { api } from '../api/client.js';

export default function MatterList({ navigate }) {
  const [matters, setMatters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm]       = useState({ number:'', name:'', client:'', batesPrefix:'', batesStart: 1, batesPadding: 7 });
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    api.get('/matters').then(setMatters).catch(console.error).finally(() => setLoading(false));
  }, []);

  async function createMatter(e) {
    e.preventDefault();
    if (!form.number || !form.name) { setError('Matter number and name are required.'); return; }
    setSaving(true); setError('');
    try {
      const m = await api.post('/matters', form);
      setMatters(prev => [m, ...prev]);
      setShowNew(false);
      navigate('dashboard', { matterId: m.id });
    } catch (err) {
      setError(err.message);
    } finally { setSaving(false); }
  }

  function statusColor(status) {
    return { ACTIVE: 'green', CLOSED: 'muted', ARCHIVED: 'muted', ON_HOLD: 'yellow' }[status] ?? 'muted';
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Matters</h1>
          <p>All legal matters managed by VDiscovery.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ New Matter</button>
      </div>

      {loading ? (
        <div className="loading-overlay"><div className="spinner" /> Loading matters…</div>
      ) : matters.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚖</div>
          <h3>No matters yet</h3>
          <p>Create your first matter to get started.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setShowNew(true)}>
            + Create Matter
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Documents</th>
                  <th>Processed</th>
                  <th>Errors</th>
                  <th>Size</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {matters.map(m => (
                  <tr key={m.id} onClick={() => navigate('dashboard', { matterId: m.id })}>
                    <td><code style={{ fontSize: '0.8rem' }}>{m.number}</code></td>
                    <td style={{ fontWeight: 500 }}>{m.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{m.client ?? '—'}</td>
                    <td><span className={`badge badge-${statusColor(m.status)}`}>{m.status}</span></td>
                    <td>{parseInt(m.document_count ?? 0).toLocaleString()}</td>
                    <td style={{ color: 'var(--green-text)' }}>
                      {parseInt(m.processed_count ?? 0).toLocaleString()}
                    </td>
                    <td style={{ color: parseInt(m.error_count) > 0 ? 'var(--red-text)' : 'inherit' }}>
                      {parseInt(m.error_count ?? 0).toLocaleString()}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {fmt(parseInt(m.total_bytes ?? 0))}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(m.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New matter modal */}
      {showNew && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }} onClick={e => e.target === e.currentTarget && setShowNew(false)}>
          <div className="card" style={{ width: 520 }}>
            <div className="card-header">
              <h2>New Matter</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowNew(false)}>✕</button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={createMatter}>
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label">Matter Number *</label>
                  <input className="form-input" value={form.number}
                    onChange={e => setForm(f => ({ ...f, number: e.target.value }))}
                    placeholder="2024-ACME-001" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Client / Party</label>
                  <input className="form-input" value={form.client}
                    onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                    placeholder="ACME Corporation" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Matter Name *</label>
                <input className="form-input" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="ACME Corp. v. Example Inc." required />
              </div>
              <div className="form-row form-row-3">
                <div className="form-group">
                  <label className="form-label">Bates Prefix</label>
                  <input className="form-input" value={form.batesPrefix}
                    onChange={e => setForm(f => ({ ...f, batesPrefix: e.target.value.toUpperCase() }))}
                    placeholder="ACME" maxLength={20} />
                </div>
                <div className="form-group">
                  <label className="form-label">Bates Start #</label>
                  <input className="form-input" type="number" min={1} value={form.batesStart}
                    onChange={e => setForm(f => ({ ...f, batesStart: parseInt(e.target.value) }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Padding Digits</label>
                  <select className="form-select" value={form.batesPadding}
                    onChange={e => setForm(f => ({ ...f, batesPadding: parseInt(e.target.value) }))}>
                    {[5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} ({Array(n).fill('0').join('')}1)</option>)}
                  </select>
                </div>
              </div>
              <p className="form-hint" style={{ marginBottom: 'var(--space-4)' }}>
                Preview: {form.batesPrefix}{String(form.batesStart).padStart(form.batesPadding, '0')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowNew(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Creating…</> : 'Create Matter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function fmt(n) {
  if (!n) return '0 B';
  if (n >= 1e12) return (n / 1e12).toFixed(1) + ' TB';
  if (n >= 1e9)  return (n / 1e9).toFixed(1) + ' GB';
  if (n >= 1e6)  return (n / 1e6).toFixed(1) + ' MB';
  if (n >= 1e3)  return (n / 1e3).toFixed(1) + ' KB';
  return n + ' B';
}
