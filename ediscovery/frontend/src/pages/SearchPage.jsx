import { useState, useCallback, useRef } from 'react';
import { api } from '../api/client.js';

export default function SearchPage({ matterId, navigate }) {
  const [query, setQuery]     = useState('');
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const debounceRef = useRef(null);

  const search = useCallback(async (q, f) => {
    if (!matterId) return;
    setLoading(true); setError('');
    try {
      const data = await api.post('/search', {
        matterId, query: q, filters: f, from: 0, size: 50,
      });
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }, [matterId]);

  const handleQueryChange = e => {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(q, filters), 400);
  };

  const handleSearch = e => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    search(query, filters);
  };

  if (!matterId) return <div className="empty-state"><p>Select a matter to search.</p></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Search</h1>
          <p>Full-text search across all processed documents, emails, and metadata.</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="search-bar" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="search-input-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            value={query}
            onChange={handleQueryChange}
            placeholder='Search all documents… e.g. "breach of contract" OR email from:jdoe@example.com'
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <div className="spinner" style={{width:14,height:14}} /> : 'Search'}
        </button>
      </form>

      {/* Filters */}
      <div style={{ display:'flex', gap:'var(--space-3)', marginBottom:'var(--space-4)', flexWrap:'wrap' }}>
        <select className="form-select" style={{width:160}} value={filters.fileCategory ?? ''}
          onChange={e => setFilters(f => ({ ...f, fileCategory: e.target.value || undefined }))}>
          <option value="">All Types</option>
          <option value="EMAIL">Email</option>
          <option value="OFFICE_WORD">Word</option>
          <option value="OFFICE_EXCEL">Excel</option>
          <option value="OFFICE_PPT">PowerPoint</option>
          <option value="PDF">PDF</option>
          <option value="IMAGE">Image</option>
          <option value="TEXT">Text</option>
        </select>
        <input className="form-input" style={{width:160}} placeholder="Date from" type="date"
          value={filters.dateFrom ?? ''}
          onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value || undefined }))} />
        <input className="form-input" style={{width:160}} placeholder="Date to" type="date"
          value={filters.dateTo ?? ''}
          onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value || undefined }))} />
        {Object.keys(filters).length > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setFilters({})}>Clear Filters</button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {results && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:'var(--space-4)' }}>
          {/* Results */}
          <div>
            <div style={{ marginBottom:'var(--space-3)', fontSize:'0.85rem', color:'var(--text-muted)' }}>
              {results.total.toLocaleString()} results{query ? ` for "${query}"` : ''}
            </div>
            {results.hits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">⌕</div>
                <h3>No results</h3>
                <p>Try different search terms or remove filters.</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-3)' }}>
                {results.hits.map(hit => (
                  <div
                    key={hit.documentId}
                    className="card card-sm"
                    style={{ cursor:'pointer' }}
                    onClick={() => navigate('review', { matterId, documentId: hit.documentId })}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', gap:'var(--space-3)' }}>
                      <div className={`file-icon ${catToIcon(hit.source.fileCategory)}`}>
                        {hit.source.fileCategory?.substring(0,3) ?? '?'}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:500, marginBottom:4 }}>
                          {hit.source.originalName}
                        </div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:6 }}>
                          <span className="badge badge-muted">{hit.source.fileCategory}</span>
                          {hit.source.custodianName && <span className="badge badge-muted">{hit.source.custodianName}</span>}
                          {hit.source.language && <span className="badge badge-muted">{hit.source.language}</span>}
                          {hit.source.dateModified && (
                            <span style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>
                              {new Date(hit.source.dateModified).toLocaleDateString()}
                            </span>
                          )}
                          {hit.score && (
                            <span style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginLeft:'auto' }}>
                              score: {hit.score.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Email fields */}
                        {hit.source.emailSubject && (
                          <div style={{ fontSize:'0.82rem', marginBottom:4 }}>
                            <span style={{ color:'var(--text-muted)' }}>Subject: </span>
                            {hit.source.emailSubject}
                          </div>
                        )}
                        {hit.source.emailFrom && (
                          <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginBottom:4 }}>
                            From: {hit.source.emailFrom}
                          </div>
                        )}

                        {/* Highlighted excerpts */}
                        {hit.highlight?.text?.map((excerpt, i) => (
                          <div key={i} style={{
                            fontSize:'0.82rem', color:'var(--text-secondary)',
                            background:'var(--bg-overlay)', borderRadius:4, padding:'6px 10px',
                            marginTop:6, lineHeight:1.6,
                          }}
                            dangerouslySetInnerHTML={{ __html: `…${excerpt}…` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aggregations sidebar */}
          {results.aggs && (
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-3)' }}>
              {results.aggs.by_category?.buckets?.length > 0 && (
                <div className="panel">
                  <div className="panel-header"><h3>File Type</h3></div>
                  <div className="panel-body" style={{ padding:'var(--space-2) var(--space-3)' }}>
                    {results.aggs.by_category.buckets.map(b => (
                      <div key={b.key} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', fontSize:'0.82rem' }}>
                        <button style={{ background:'none',border:'none',cursor:'pointer',color:'var(--accent)', textAlign:'left' }}
                          onClick={() => setFilters(f => ({ ...f, fileCategory: b.key }))}>
                          {b.key}
                        </button>
                        <span style={{ color:'var(--text-muted)' }}>{b.doc_count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.aggs.by_custodian?.buckets?.length > 0 && (
                <div className="panel">
                  <div className="panel-header"><h3>Custodian</h3></div>
                  <div className="panel-body" style={{ padding:'var(--space-2) var(--space-3)' }}>
                    {results.aggs.by_custodian.buckets.slice(0,10).map(b => (
                      <div key={b.key} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', fontSize:'0.82rem' }}>
                        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.key}</span>
                        <span style={{ color:'var(--text-muted)', flexShrink:0, marginLeft:8 }}>{b.doc_count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!results && !loading && (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h3>Enter a search query above</h3>
          <p>Search across full text, metadata, email fields, and more.</p>
          <div style={{ marginTop:'var(--space-4)', textAlign:'left', maxWidth:400, margin:'var(--space-4) auto 0' }}>
            <p style={{ fontSize:'0.82rem', marginBottom:'var(--space-2)' }}>Example queries:</p>
            {[
              '"breach of contract"',
              'email from:ceo@company.com',
              'financial projections 2023',
              'privileged AND confidential',
            ].map(q => (
              <button key={q} className="btn btn-ghost btn-sm" style={{ display:'block', marginBottom:6, textAlign:'left' }}
                onClick={() => { setQuery(q); search(q, filters); }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function catToIcon(cat) {
  const map = { EMAIL:'email', EMAIL_CONTAINER:'email', OFFICE_WORD:'word',
    OFFICE_EXCEL:'excel', OFFICE_PPT:'ppt', PDF:'pdf', IMAGE:'image',
    ARCHIVE:'archive', EMAIL_CONTAINER:'archive' };
  return map[cat] ?? 'unknown';
}
