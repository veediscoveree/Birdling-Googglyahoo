/**
 * Document Review Panel
 *
 * Layout: three-pane (document list | document viewer | coding panel)
 *
 * Document viewer renders:
 *   PDF               → PDF.js (<iframe> to /api/documents/:id/render?format=pdf)
 *   Office docs       → LibreOffice → PDF → same iframe
 *   Images            → <img> tag (native, no license needed)
 *   Email (EML/MSG)   → parsed HTML rendered in sandboxed iframe
 *   Text / Code       → <pre> with syntax highlighting
 *   Other             → extracted text fallback + download link
 *
 * No proprietary viewers needed. All rendering via:
 *   - LibreOffice headless (server-side Office→PDF conversion, MPL 2.0)
 *   - PDF.js via browser's built-in PDF viewer
 *   - Native browser image/HTML rendering
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../api/client.js';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const FILE_CAT_ICON = {
  EMAIL:'✉', EMAIL_CONTAINER:'✉', OFFICE_WORD:'W', OFFICE_EXCEL:'X',
  OFFICE_PPT:'P', PDF:'⊞', IMAGE:'⊟', VIDEO:'▶', AUDIO:'♪',
  ARCHIVE:'⊕', DATABASE:'⊗', TEXT:'T', CODE:'<>', UNKNOWN:'?',
};

const TAG_COLORS = {
  RESPONSIVE:       '#16a34a', NON_RESPONSIVE:     '#dc2626',
  NEEDS_REVIEW:     '#d97706', PRIVILEGED_AC:       '#7c3aed',
  PRIVILEGED_WP:    '#6d28d9', PRIVILEGED_OTHER:   '#5b21b6',
  CONFIDENTIAL:     '#0369a1', HIGHLY_CONFIDENTIAL:'#1e3a5f',
  HOT_DOC:          '#ef4444', KEY_DOCUMENT:        '#f59e0b',
  QC_HOLD:          '#78716c', FOR_PRODUCTION:      '#0891b2',
  WITHHELD:         '#64748b',
};

// ─── Main Review Page ─────────────────────────────────────────────────────────
export default function Review({ matterId, documentId: initialDocId, navigate }) {
  const [docs, setDocs]             = useState([]);
  const [total, setTotal]           = useState(0);
  const [docOffset, setDocOffset]   = useState(0);
  const [selectedId, setSelectedId] = useState(initialDocId ?? null);
  const [doc, setDoc]               = useState(null);
  const [tags, setTags]             = useState([]);
  const [allTags, setAllTags]       = useState([]);
  const [cocEntries, setCocEntries] = useState([]);
  const [errors, setErrors]         = useState([]);
  const [activeTab, setActiveTab]   = useState('metadata'); // metadata | coc | errors | family
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStage, setFilterStage] = useState('COMPLETE');
  const [saving, setSaving]         = useState(false);
  const [coding, setCoding]         = useState({ isResponsive: null, isPrivileged: false, privilegeType: '', privilegeBasis: '', notes: '' });
  const DOC_LIMIT = 50;

  // Load document list
  const loadDocs = useCallback(async () => {
    if (!matterId) return;
    try {
      const params = new URLSearchParams({
        matterId, limit: DOC_LIMIT, offset: docOffset,
        ...(filterStage ? { stage: filterStage } : {}),
        ...(filterQuery ? { q: filterQuery } : {}),
        sortBy: 'created_at', sortDir: 'DESC',
      });
      const data = await api.get(`/documents?${params}`);
      setDocs(data.documents);
      setTotal(data.total);
    } catch (err) { console.error(err); }
  }, [matterId, docOffset, filterQuery, filterStage]);

  useEffect(() => { loadDocs(); }, [loadDocs]);

  // Load matter tags
  useEffect(() => {
    if (!matterId) return;
    api.get(`/matters/${matterId}/tags`).then(setAllTags).catch(() => {});
  }, [matterId]);

  // Load selected document
  useEffect(() => {
    if (!selectedId) return;
    Promise.all([
      api.get(`/documents/${selectedId}`),
      api.get(`/documents/${selectedId}/chain-of-custody`),
      api.get(`/documents/${selectedId}/errors`),
    ]).then(([d, coc, errs]) => {
      setDoc(d);
      setTags(d.tags ?? []);
      setCocEntries(coc);
      setErrors(errs);
      setCoding({
        isResponsive:   d.is_responsive,
        isPrivileged:   d.is_privileged ?? false,
        privilegeType:  d.privilege_type ?? '',
        privilegeBasis: d.privilege_basis ?? '',
        notes:          d.notes ?? '',
      });
    }).catch(console.error);
  }, [selectedId]);

  // Apply a tag
  const applyTag = async (tagId, tagName) => {
    try {
      await api.post(`/documents/${selectedId}/tags`, { tagId });
      setTags(prev => {
        const tag = allTags.find(t => t.id === tagId);
        if (!tag) return prev;
        // Remove exclusive siblings
        const filtered = tag.is_exclusive
          ? prev.filter(t => t.group_name !== tag.group_name)
          : prev.filter(t => t.id !== tagId);
        return [...filtered, { id: tagId, name: tag.name, label: tag.label, color: tag.color, group_name: tag.group_name }];
      });
    } catch (err) { alert(err.message); }
  };

  const removeTag = async (tagId) => {
    try {
      await api.delete(`/documents/${selectedId}/tags/${tagId}`);
      setTags(prev => prev.filter(t => t.id !== tagId));
    } catch (err) { alert(err.message); }
  };

  // Save coding decision
  const saveCoding = async () => {
    setSaving(true);
    try {
      const updated = await api.patch(`/documents/${selectedId}`, {
        reviewStatus:   'REVIEWED',
        isResponsive:   coding.isResponsive,
        isPrivileged:   coding.isPrivileged,
        privilegeType:  coding.privilegeType || null,
        privilegeBasis: coding.privilegeBasis || null,
        notes:          coding.notes || null,
      });
      setDoc(updated);
      // Advance to next document
      const idx = docs.findIndex(d => d.id === selectedId);
      if (idx < docs.length - 1) setSelectedId(docs[idx + 1].id);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'r' && !e.ctrlKey) { setCoding(c => ({ ...c, isResponsive: true })); }
      if (e.key === 'n' && !e.ctrlKey) { setCoding(c => ({ ...c, isResponsive: false })); }
      if (e.key === 'p' && !e.ctrlKey) { setCoding(c => ({ ...c, isPrivileged: !c.isPrivileged })); }
      if (e.key === 'Enter' && e.ctrlKey) { saveCoding(); }
      if (e.key === 'ArrowDown') {
        const idx = docs.findIndex(d => d.id === selectedId);
        if (idx < docs.length - 1) setSelectedId(docs[idx + 1].id);
        e.preventDefault();
      }
      if (e.key === 'ArrowUp') {
        const idx = docs.findIndex(d => d.id === selectedId);
        if (idx > 0) setSelectedId(docs[idx - 1].id);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [docs, selectedId, coding]);

  // Tag groups
  const tagsByGroup = allTags.reduce((acc, t) => {
    const g = t.group_name ?? 'Other';
    acc[g] = acc[g] ?? [];
    acc[g].push(t);
    return acc;
  }, {});

  const appliedTagIds = new Set(tags.map(t => t.id));

  if (!matterId) return <div className="empty-state"><p>Select a matter.</p></div>;

  return (
    <div style={{ display:'grid', gridTemplateColumns:'280px 1fr 300px', gap:0, height:'calc(100vh - 56px)', overflow:'hidden' }}>

      {/* ── LEFT PANE: Document List ── */}
      <div style={{
        borderRight:'1px solid var(--border)',
        display:'flex', flexDirection:'column',
        background:'var(--bg-surface)', overflow:'hidden',
      }}>
        {/* List header */}
        <div style={{ padding:'var(--space-3)', borderBottom:'1px solid var(--border)' }}>
          <input
            className="form-input"
            placeholder="Filter by name…"
            value={filterQuery}
            onChange={e => { setFilterQuery(e.target.value); setDocOffset(0); }}
            style={{ marginBottom: 8 }}
          />
          <select className="form-select" value={filterStage}
            onChange={e => { setFilterStage(e.target.value); setDocOffset(0); }}>
            <option value="">All Stages</option>
            <option value="COMPLETE">Complete</option>
            <option value="NEEDS_REMEDIATION">Needs Remediation</option>
            <option value="ERROR">Error</option>
          </select>
          <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginTop:6 }}>
            {total.toLocaleString()} documents
          </div>
        </div>

        {/* Document list */}
        <div style={{ flex:1, overflowY:'auto' }}>
          {docs.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              style={{
                display:'flex', flexDirection:'column', alignItems:'flex-start',
                gap:2, width:'100%', padding:'8px 12px', border:'none',
                borderBottom:'1px solid var(--border-muted)',
                background: selectedId === d.id ? 'var(--accent-muted)' : 'transparent',
                cursor:'pointer', textAlign:'left',
              }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:6, width:'100%' }}>
                <span style={{ fontSize:'0.72rem', opacity:0.6, flexShrink:0 }}>
                  {FILE_CAT_ICON[d.file_category] ?? '?'}
                </span>
                <span style={{
                  fontSize:'0.8rem', fontWeight:500,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1,
                  color: selectedId === d.id ? 'var(--accent)' : 'var(--text-primary)',
                }}>
                  {d.original_name}
                </span>
                {d.review_status === 'REVIEWED' && (
                  <span style={{ fontSize:'0.6rem', color:'var(--green-text)', flexShrink:0 }}>✓</span>
                )}
              </div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                {d.tags?.map(tag => (
                  <span key={tag} style={{
                    fontSize:'0.62rem', padding:'1px 5px', borderRadius:3,
                    background: TAG_COLORS[tag] ? TAG_COLORS[tag] + '30' : 'var(--bg-overlay)',
                    color: TAG_COLORS[tag] ?? 'var(--text-muted)',
                  }}>{tag}</span>
                ))}
                {d.processing_error_count > 0 && (
                  <span style={{ fontSize:'0.62rem', padding:'1px 5px', borderRadius:3, background:'var(--red-bg)', color:'var(--red-text)' }}>
                    {d.processing_error_count} err
                  </span>
                )}
              </div>
              <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>
                {fmt(d.file_size)} · {d.custodian_name ?? '—'}
              </div>
            </button>
          ))}

          {/* Pagination */}
          {total > DOC_LIMIT && (
            <div style={{ display:'flex', justifyContent:'center', gap:8, padding:8 }}>
              <button className="btn btn-ghost btn-xs" disabled={docOffset===0}
                onClick={() => setDocOffset(Math.max(0, docOffset - DOC_LIMIT))}>←</button>
              <span style={{ fontSize:'0.72rem', color:'var(--text-muted)', alignSelf:'center' }}>
                {Math.floor(docOffset/DOC_LIMIT)+1} / {Math.ceil(total/DOC_LIMIT)}
              </span>
              <button className="btn btn-ghost btn-xs" disabled={docOffset+DOC_LIMIT >= total}
                onClick={() => setDocOffset(docOffset + DOC_LIMIT)}>→</button>
            </div>
          )}
        </div>
      </div>

      {/* ── CENTER PANE: Document Viewer ── */}
      <div style={{ display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--bg-base)' }}>
        {doc ? (
          <>
            {/* Viewer toolbar */}
            <div style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'8px 12px', borderBottom:'1px solid var(--border)',
              background:'var(--bg-surface)', flexShrink:0,
            }}>
              <span style={{ fontSize:'0.85rem', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
                {doc.original_name}
              </span>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <a
                  href={`${BASE}/api/documents/${doc.id}/download`}
                  target="_blank" rel="noreferrer"
                  className="btn btn-ghost btn-xs"
                >
                  ↓ Download Native
                </a>
                {canRender(doc) && (
                  <a
                    href={`${BASE}/api/documents/${doc.id}/render`}
                    target="_blank" rel="noreferrer"
                    className="btn btn-ghost btn-xs"
                  >
                    ⊞ Open PDF
                  </a>
                )}
              </div>
            </div>

            {/* The actual viewer */}
            <div style={{ flex:1, overflow:'hidden' }}>
              <DocumentViewer doc={doc} baseUrl={BASE} />
            </div>
          </>
        ) : (
          <div className="empty-state" style={{ margin:'auto' }}>
            <div className="empty-icon">⊞</div>
            <h3>Select a document</h3>
            <p>Choose a document from the list to review it.</p>
            <div style={{ marginTop:'var(--space-4)', fontSize:'0.8rem', color:'var(--text-muted)' }}>
              Keyboard shortcuts: R=Responsive · N=Non-Responsive · P=Privilege · ↑↓=Navigate · Ctrl+Enter=Save
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT PANE: Coding Panel ── */}
      <div style={{
        borderLeft:'1px solid var(--border)',
        display:'flex', flexDirection:'column',
        background:'var(--bg-surface)', overflow:'hidden',
      }}>
        {doc ? (
          <>
            {/* Coding */}
            <div style={{ padding:'var(--space-3)', borderBottom:'1px solid var(--border)', overflowY:'auto', flex:'0 0 auto' }}>
              <h3 style={{ fontSize:'0.8rem', marginBottom:'var(--space-3)' }}>Coding</h3>

              {/* Responsiveness */}
              <div style={{ marginBottom:'var(--space-3)' }}>
                <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>
                  Responsiveness
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  {[
                    { val: true,  label: 'Responsive',     key: 'R', color: 'var(--green-text)' },
                    { val: false, label: 'Non-Responsive',  key: 'N', color: 'var(--red-text)' },
                    { val: null,  label: 'Unreviewed',      key: '—', color: 'var(--text-muted)' },
                  ].map(opt => (
                    <button
                      key={String(opt.val)}
                      onClick={() => setCoding(c => ({ ...c, isResponsive: opt.val }))}
                      style={{
                        flex:1, padding:'6px 4px', border:'1px solid',
                        borderColor: coding.isResponsive === opt.val ? opt.color : 'var(--border)',
                        borderRadius:'var(--radius)',
                        background: coding.isResponsive === opt.val ? opt.color + '20' : 'transparent',
                        color: coding.isResponsive === opt.val ? opt.color : 'var(--text-muted)',
                        fontSize:'0.75rem', fontWeight:500, cursor:'pointer',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privilege */}
              <div style={{ marginBottom:'var(--space-3)' }}>
                <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>
                  Privilege
                </div>
                <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', marginBottom:8 }}>
                  <input type="checkbox" checked={coding.isPrivileged}
                    onChange={e => setCoding(c => ({ ...c, isPrivileged: e.target.checked }))} />
                  <span style={{ fontSize:'0.82rem' }}>Mark as Privileged</span>
                </label>
                {coding.isPrivileged && (
                  <>
                    <select className="form-select" value={coding.privilegeType}
                      onChange={e => setCoding(c => ({ ...c, privilegeType: e.target.value }))}
                      style={{ marginBottom:6, fontSize:'0.8rem' }}>
                      <option value="">— Privilege Type —</option>
                      <option value="ATTORNEY_CLIENT">Attorney-Client</option>
                      <option value="WORK_PRODUCT">Work Product</option>
                      <option value="JOINT_DEFENSE">Joint Defense</option>
                      <option value="COMMON_INTEREST">Common Interest</option>
                      <option value="TRADE_SECRET">Trade Secret</option>
                      <option value="OTHER">Other</option>
                    </select>
                    <textarea
                      className="form-textarea"
                      placeholder="Privilege basis (for privilege log)…"
                      value={coding.privilegeBasis}
                      onChange={e => setCoding(c => ({ ...c, privilegeBasis: e.target.value }))}
                      style={{ minHeight:60, fontSize:'0.8rem' }}
                    />
                  </>
                )}
              </div>

              {/* Notes */}
              <div style={{ marginBottom:'var(--space-3)' }}>
                <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>
                  Notes
                </div>
                <textarea
                  className="form-textarea"
                  placeholder="Reviewer notes…"
                  value={coding.notes}
                  onChange={e => setCoding(c => ({ ...c, notes: e.target.value }))}
                  style={{ minHeight:60, fontSize:'0.8rem' }}
                />
              </div>

              <button className="btn btn-primary" style={{ width:'100%' }} onClick={saveCoding} disabled={saving}>
                {saving ? <><div className="spinner" style={{width:12,height:12}} /> Saving…</> : 'Save & Next (Ctrl+Enter)'}
              </button>
            </div>

            {/* Tags */}
            <div style={{ padding:'var(--space-3)', borderBottom:'1px solid var(--border)', overflowY:'auto', flex:'0 0 auto' }}>
              <h3 style={{ fontSize:'0.8rem', marginBottom:'var(--space-3)' }}>Tags</h3>

              {/* Applied tags */}
              {tags.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:'var(--space-3)' }}>
                  {tags.map(t => (
                    <span key={t.id} style={{
                      display:'inline-flex', alignItems:'center', gap:4,
                      padding:'2px 8px', borderRadius:100,
                      background: (t.color ?? '#666') + '30',
                      color: t.color ?? 'var(--text-secondary)',
                      fontSize:'0.72rem', fontWeight:600,
                    }}>
                      {t.label ?? t.name}
                      <button onClick={() => removeTag(t.id)} style={{
                        background:'none', border:'none', cursor:'pointer',
                        color:'inherit', opacity:0.7, padding:0, fontSize:10,
                      }}>✕</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Tag palette */}
              {Object.entries(tagsByGroup).map(([group, groupTags]) => (
                <div key={group} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>
                    {group}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                    {groupTags.map(t => {
                      const applied = appliedTagIds.has(t.id);
                      return (
                        <button key={t.id} onClick={() => applied ? removeTag(t.id) : applyTag(t.id, t.name)}
                          style={{
                            padding:'2px 8px', borderRadius:100, fontSize:'0.72rem', fontWeight:500,
                            cursor:'pointer', border:'1px solid',
                            borderColor: applied ? (t.color ?? 'var(--accent)') : 'var(--border)',
                            background: applied ? (t.color ?? 'var(--accent)') + '30' : 'transparent',
                            color: applied ? (t.color ?? 'var(--accent)') : 'var(--text-muted)',
                          }}>
                          {applied ? '✓ ' : ''}{t.label ?? t.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Metadata / CoC / Errors tabs */}
            <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
              <div className="tabs" style={{ margin:0, padding:'0 var(--space-3)', flexShrink:0 }}>
                {[
                  ['metadata', 'Metadata'],
                  ['coc',      `CoC (${cocEntries.length})`],
                  ['errors',   `Errors${errors.length > 0 ? ` (${errors.length})` : ''}`],
                ].map(([id, label]) => (
                  <button key={id} className={`tab${activeTab===id?' active':''}`} onClick={() => setActiveTab(id)}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ flex:1, overflowY:'auto', padding:'var(--space-3)' }}>
                {activeTab === 'metadata' && <MetadataPanel doc={doc} />}
                {activeTab === 'coc'      && <CoCPanel entries={cocEntries} />}
                {activeTab === 'errors'   && <ErrorsPanel errors={errors} />}
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding:'var(--space-4)', color:'var(--text-muted)', fontSize:'0.85rem' }}>
            Select a document to begin reviewing.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Document Viewer ──────────────────────────────────────────────────────────
function DocumentViewer({ doc, baseUrl }) {
  const cat = doc.file_category;

  // Images — native browser rendering, no license needed
  if (cat === 'IMAGE') {
    return (
      <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#111', overflow:'auto' }}>
        <img
          src={`${baseUrl}/api/documents/${doc.id}/download`}
          alt={doc.original_name}
          style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }}
        />
      </div>
    );
  }

  // PDF — browser built-in PDF viewer or PDF.js
  // Office docs — server converts to PDF via LibreOffice, then serves
  // Email — server renders to HTML, served as HTML
  if (canRender(doc)) {
    return (
      <iframe
        key={doc.id}
        src={`${baseUrl}/api/documents/${doc.id}/render`}
        title={doc.original_name}
        style={{ width:'100%', height:'100%', border:'none', background:'white' }}
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  // Text / Code — show extracted text
  if (doc.text_extracted) {
    return <ExtractedTextViewer docId={doc.id} baseUrl={baseUrl} />;
  }

  // Fallback: metadata + download
  return (
    <div style={{ padding:'var(--space-8)', maxWidth:600, margin:'0 auto' }}>
      <div className="alert alert-info" style={{ marginBottom:'var(--space-4)' }}>
        ℹ This file type ({doc.detected_mime ?? doc.file_category}) cannot be rendered in the browser.
        {doc.has_ocr && ` OCR text is available below (confidence: ${Math.round((doc.ocr_confidence ?? 0)*100)}%).`}
      </div>
      <a href={`${baseUrl}/api/documents/${doc.id}/download`} target="_blank" rel="noreferrer"
        className="btn btn-primary" style={{ marginBottom:'var(--space-4)', display:'inline-flex' }}>
        ↓ Download Native File
      </a>
      {doc.text_extracted && <ExtractedTextViewer docId={doc.id} baseUrl={baseUrl} />}
    </div>
  );
}

function ExtractedTextViewer({ docId, baseUrl }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${baseUrl}/api/documents/${docId}/text`)
      .then(r => r.text())
      .then(t => { setText(t); setLoading(false); })
      .catch(() => setLoading(false));
  }, [docId]);

  if (loading) return <div className="loading-overlay"><div className="spinner" /></div>;
  return (
    <pre style={{
      padding:'var(--space-6)', fontSize:'0.82rem', lineHeight:1.7,
      color:'var(--text-secondary)', whiteSpace:'pre-wrap', wordBreak:'break-word',
      fontFamily:'var(--font-sans)', height:'100%', overflowY:'auto',
      background:'var(--bg-surface)',
    }}>
      {text || '(No extracted text available)'}
    </pre>
  );
}

// ─── Sidebar Panels ───────────────────────────────────────────────────────────
function MetadataPanel({ doc }) {
  const fields = [
    ['SHA-256',    doc.sha256,           'mono'],
    ['MD5',        doc.md5,              'mono'],
    ['File Size',  fmt(doc.file_size),   null],
    ['MIME Type',  doc.detected_mime,    null],
    ['Category',   doc.file_category,    null],
    ['Custodian',  doc.custodian_name,   null],
    ['Language',   doc.language,         null],
    ['Pages',      doc.page_count,       null],
    ['Words',      doc.word_count?.toLocaleString(), null],
    ['Created',    fmtDate(doc.date_created),    null],
    ['Modified',   fmtDate(doc.date_modified),   null],
    ['Author',     doc.author,           null],
    ['Last Author',doc.last_author,      null],
    ['Creating App', doc.creating_app,   null],
    // Email fields
    ...(doc.email_from ? [
      ['From',     doc.email_from,       null],
      ['To',       doc.email_to?.join(', '), null],
      ['CC',       doc.email_cc?.join(', '), null],
      ['Subject',  doc.email_subject,    null],
      ['Sent',     fmtDate(doc.email_date), null],
      ['Message-ID', doc.email_message_id, 'mono'],
    ] : []),
    // Flags
    ['Duplicate?',  doc.is_duplicate  ? 'Yes' : 'No', null],
    ['Near-Dup?',   doc.is_near_dup   ? 'Yes' : 'No', null],
    ['OCR?',        doc.has_ocr       ? `Yes (${Math.round((doc.ocr_confidence??0)*100)}%)` : 'No', null],
    ['Has Macros?', doc.has_macros    ? 'Yes' : 'No', null],
    ['Encrypted?',  doc.is_encrypted  ? 'Yes' : 'No', null],
    ['NIST?',       doc.is_nist       ? `Yes — ${doc.nist_product}` : 'No', null],
  ].filter(([,v]) => v !== null && v !== undefined);

  return (
    <div>
      {fields.map(([label, value, cls]) => (
        <div key={label} style={{ marginBottom:8, borderBottom:'1px solid var(--border-muted)', paddingBottom:6 }}>
          <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{label}</div>
          <div className={cls ?? ''} style={{ fontSize:'0.78rem', wordBreak:'break-all', color:'var(--text-secondary)' }}>{String(value)}</div>
        </div>
      ))}
    </div>
  );
}

function CoCPanel({ entries }) {
  if (!entries.length) return <p style={{ fontSize:'0.82rem', color:'var(--text-muted)' }}>No CoC entries for this document.</p>;
  return (
    <div>
      {entries.map(e => (
        <div key={e.id} style={{ marginBottom:12, paddingBottom:10, borderBottom:'1px solid var(--border-muted)' }}>
          <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>
            {e.event_type.replace(/_/g,' ')}
          </div>
          <div style={{ fontSize:'0.8rem', margin:'2px 0', color: e.event_type.includes('MISMATCH') ? 'var(--critical)' : 'var(--text-primary)' }}>
            {e.description}
          </div>
          <div style={{ fontSize:'0.68rem', color:'var(--text-muted)' }}>
            {new Date(e.occurred_at).toLocaleString()}
          </div>
          <div className="hash-value" style={{ marginTop:4, fontSize:'0.62rem' }}>
            {e.entry_hash?.substring(0,32)}…
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorsPanel({ errors }) {
  if (!errors.length) return <p style={{ fontSize:'0.82rem', color:'var(--green-text)' }}>✓ No processing errors.</p>;
  return (
    <div>
      {errors.map(e => (
        <div key={e.id} style={{ marginBottom:12, padding:10, background:'var(--red-bg)', borderRadius:'var(--radius)', border:'1px solid var(--red)' }}>
          <div style={{ display:'flex', gap:6, marginBottom:4 }}>
            <span className="badge sev-high" style={{ fontSize:'0.62rem' }}>{e.severity}</span>
            <span style={{ fontSize:'0.7rem', color:'var(--red-text)' }}>{e.error_type}</span>
          </div>
          <div style={{ fontSize:'0.8rem', marginBottom:4 }}>{e.message}</div>
          <div style={{ fontSize:'0.68rem', color:'var(--text-muted)' }}>{new Date(e.occurred_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function canRender(doc) {
  const cat = doc.file_category;
  const renderable = ['PDF','OFFICE_WORD','OFFICE_EXCEL','OFFICE_PPT','EMAIL','TEXT','CODE'];
  return renderable.includes(cat);
}

function fmt(n) {
  if (!n) return '—';
  if (n >= 1e9) return (n/1e9).toFixed(1)+' GB';
  if (n >= 1e6) return (n/1e6).toFixed(1)+' MB';
  if (n >= 1e3) return (n/1e3).toFixed(1)+' KB';
  return n+' B';
}

function fmtDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleString();
}
