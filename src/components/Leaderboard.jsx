// Bird. Here. Now. — Leaderboard Screen
// Shows the global top-25 (or mock data until Supabase is wired).
// Player can set a handle and submit/update their score.

import { useState, useEffect } from 'react'
import { fetchLeaderboard, submitScore, isLiveLeaderboard } from '../lib/leaderboard'

const HANDLE_KEY = 'bhn_handle'

function medal(rank) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return null
}

export default function Leaderboard({ capturedBirds, score, onBack }) {
  const [board,    setBoard]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [handle,   setHandle]   = useState(() => localStorage.getItem(HANDLE_KEY) || '')
  const [editing,  setEditing]  = useState(false)
  const [draft,    setDraft]    = useState('')
  const [submitted,setSubmitted]= useState(false)
  const [submitting,setSubmitting]=useState(false)

  const species = capturedBirds.length

  // Load board
  useEffect(() => {
    setLoading(true)
    fetchLeaderboard(25)
      .then(data => { setBoard(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Find player position in board
  const playerRow = board.find(r => r.handle === handle)
  const playerRank = playerRow ? board.indexOf(playerRow) + 1 : null

  const handleSubmit = async () => {
    if (!handle.trim()) return
    setSubmitting(true)
    try {
      await submitScore({ handle, score, species })
      setSubmitted(true)
      // Refresh board
      const updated = await fetchLeaderboard(25)
      setBoard(updated)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSaveHandle = () => {
    const trimmed = draft.trim().slice(0, 20).replace(/[^a-zA-Z0-9_\-\.]/g, '')
    if (!trimmed) return
    setHandle(trimmed)
    localStorage.setItem(HANDLE_KEY, trimmed)
    setEditing(false)
    setSubmitted(false)
  }

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Radar</button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>
          Leaderboard
        </div>
        <div/>
      </div>

      {/* ── Backend status banner ────────────────────────────────────────── */}
      {!isLiveLeaderboard && (
        <div style={{
          padding: '8px 20px', background: 'rgba(245,166,35,0.08)',
          borderBottom: '1px solid rgba(245,166,35,0.2)',
          fontSize: 11, color: 'var(--accent-amber)', textAlign: 'center',
          flexShrink: 0,
        }}>
          Demo mode · Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY to .env to enable global scores
        </div>
      )}

      <div className="scroll-y" style={{ flex: 1, padding: '16px 20px' }}>

        {/* ── Player card ──────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 16, padding: '16px',
          border: '1px solid rgba(61,220,127,0.15)', marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>
            YOUR SCORE
          </div>

          {editing ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveHandle()}
                placeholder="birder_handle"
                maxLength={20}
                autoFocus
                style={{
                  flex: 1, background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8,
                  padding: '8px 12px', color: 'var(--text-primary)', fontSize: 14,
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <button className="btn btn-primary btn-sm" onClick={handleSaveHandle}>
                Save
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(false)}>
                ✕
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {handle ? (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700,
                      color: 'var(--accent-green)',
                    }}>
                      @{handle}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: 13, fontStyle: 'italic' }}>
                      No handle set
                    </span>
                  )}
                  {playerRank && (
                    <span style={{
                      fontSize: 11, color: 'var(--accent-gold)', fontWeight: 700,
                      background: 'rgba(255,215,0,0.1)', padding: '2px 8px', borderRadius: 10,
                    }}>
                      #{playerRank}
                    </span>
                  )}
                </div>
                <div style={{ marginTop: 4, display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    ★ {score}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-dim)', alignSelf: 'flex-end', marginBottom: 2 }}>
                    {species} species
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <button className="btn btn-outline btn-sm"
                  onClick={() => { setDraft(handle); setEditing(true) }}
                  style={{ fontSize: 11 }}>
                  {handle ? 'Edit handle' : 'Set handle'}
                </button>
                {handle && (
                  <button className="btn btn-primary btn-sm"
                    onClick={handleSubmit}
                    disabled={submitting || submitted}
                    style={{ fontSize: 11 }}>
                    {submitting ? 'Posting…' : submitted ? '✓ Posted' : 'Post score'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Board ────────────────────────────────────────────────────── */}
        <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 10 }}>
          TOP BIRDERS {isLiveLeaderboard ? '· GLOBAL' : '· DEMO'}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '40px 0', fontSize: 13 }}>
            <div style={{ animation: 'pulse 1.5s infinite' }}>Loading…</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {board.map((row, i) => {
              const rank    = i + 1
              const isMe    = row.handle === handle
              const m       = medal(rank)
              return (
                <div key={row.handle} style={{
                  background: isMe ? 'rgba(61,220,127,0.07)' : 'var(--bg-card)',
                  border: isMe
                    ? '1px solid rgba(61,220,127,0.25)'
                    : i < 3
                      ? '1px solid rgba(255,215,0,0.12)'
                      : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  {/* Rank */}
                  <div style={{
                    width: 28, textAlign: 'center', flexShrink: 0,
                    fontSize: m ? 18 : 13,
                    color: i < 3 ? 'var(--accent-gold)' : 'var(--text-dim)',
                    fontWeight: 700, fontFamily: 'var(--font-mono)',
                  }}>
                    {m || `#${rank}`}
                  </div>

                  {/* Handle */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: isMe ? 700 : 500,
                      color: isMe ? 'var(--accent-green)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {isMe ? '→ ' : ''}{row.handle}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 1 }}>
                      {row.species} species
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{
                    fontSize: 15, fontWeight: 700,
                    color: i < 3 ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)', flexShrink: 0,
                  }}>
                    ★ {row.score.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Supabase setup hint */}
        {!isLiveLeaderboard && (
          <div style={{
            marginTop: 20, padding: '12px 14px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6,
          }}>
            <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Activate global leaderboard
            </div>
            1. Create a free project at supabase.com<br/>
            2. Run the SQL in <code>src/lib/leaderboard.js</code><br/>
            3. Add <code>VITE_SUPABASE_URL</code> + <code>VITE_SUPABASE_ANON_KEY</code> to .env
          </div>
        )}

        <div style={{ height: 24 }}/>
      </div>
    </div>
  )
}
