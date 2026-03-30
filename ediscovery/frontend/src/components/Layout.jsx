import { useState, useEffect } from 'react';
import { api } from '../api/client.js';

const NAV_ITEMS = [
  {
    section: 'Platform',
    items: [
      { id: 'matters',    label: 'All Matters',    icon: '⚖' },
    ],
  },
  {
    section: 'Matter',
    matterRequired: true,
    items: [
      { id: 'dashboard',  label: 'Dashboard',      icon: '◈' },
      { id: 'ingest',     label: 'Ingest Data',    icon: '↑' },
      { id: 'processing', label: 'Processing',      icon: '⚙', errorKey: 'error_count' },
      { id: 'review',     label: 'Review',          icon: '☑' },
      { id: 'search',     label: 'Search',          icon: '⌕' },
      { id: 'production', label: 'Production',      icon: '□' },
    ],
  },
  {
    section: 'Compliance',
    matterRequired: true,
    items: [
      { id: 'audit',      label: 'Audit Log',      icon: '⋮' },
      { id: 'errors',     label: 'Error Report',   icon: '⚠', errorKey: 'error_count', badgeClass: 'red' },
    ],
  },
];

export default function Layout({ children, navigate, currentPage, matterId }) {
  const [matterInfo, setMatterInfo] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!matterId) { setMatterInfo(null); setStats(null); return; }
    api.get(`/matters/${matterId}`).then(setMatterInfo).catch(() => {});
    api.get(`/matters/${matterId}/stats`).then(setStats).catch(() => {});
  }, [matterId]);

  const errorCount = stats?.errors?.reduce((sum, e) => sum + parseInt(e.count, 10), 0) ?? 0;
  const openErrors = stats?.errors?.reduce((sum, e) => sum + (parseInt(e.count, 10) - parseInt(e.remediated, 10)), 0) ?? 0;

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <header className="app-header">
        <button
          className="logo"
          onClick={() => navigate('matters')}
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <span className="v">V</span>Discovery
        </button>

        {matterInfo && (
          <div className="matter-crumb">
            <span style={{ color: 'var(--border)' }}>›</span>
            <span style={{ color: 'var(--text-secondary)' }}>{matterInfo.number}</span>
            <span style={{ color: 'var(--border)' }}>›</span>
            <span>{matterInfo.name}</span>
          </div>
        )}

        <div className="header-right">
          {openErrors > 0 && matterId && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => navigate('errors', { matterId })}
            >
              ⚠ {openErrors} open {openErrors === 1 ? 'error' : 'errors'}
            </button>
          )}
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            System Admin
          </span>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <nav className="sidebar">
        {NAV_ITEMS.map(section => {
          if (section.matterRequired && !matterId) return null;
          return (
            <div className="sidebar-section" key={section.section}>
              <div className="sidebar-section-title">{section.section}</div>
              {section.items.map(item => {
                const isActive = currentPage === item.id;
                const badge = item.errorKey === 'error_count' ? openErrors : null;

                return (
                  <button
                    key={item.id}
                    className={`sidebar-item${isActive ? ' active' : ''}`}
                    onClick={() => navigate(item.id, matterId ? { matterId } : {})}
                  >
                    <span className="icon">{item.icon}</span>
                    {item.label}
                    {badge > 0 && (
                      <span className={`badge${item.badgeClass ? ` badge-${item.badgeClass}` : ''}`}>
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* Processing status bar */}
        {stats && matterId && (() => {
          const total    = stats.byStage?.reduce((s, r) => s + parseInt(r.count), 0) ?? 0;
          const complete = stats.byStage?.find(r => r.stage === 'COMPLETE')?.count ?? 0;
          const pct      = total > 0 ? Math.round((complete / total) * 100) : 0;
          if (total === 0) return null;
          return (
            <div style={{ padding: '0 var(--space-4)', marginTop: 'auto' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                Processing: {complete}/{total} ({pct}%)
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill${pct === 100 ? ' green' : ''}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })()}
      </nav>

      {/* ── Main Content ── */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
