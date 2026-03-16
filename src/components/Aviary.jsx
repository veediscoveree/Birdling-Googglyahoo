// Bird. Here. Now. — Aviary Screen
// The user's personal collection of captured birds.
// Locked silhouettes show species not yet captured.

import { BirdAvatar, BirdSilhouette } from './BirdAvatars'
import { BIRDS, getRarityLabel } from '../data/birds'

const PROGRESS_LABELS = {
  0:    ['Begin', 'rgba(100,100,100,0.3)'],
  25:   ['Fledgling', 'rgba(76,175,80,0.7)'],
  50:   ['Birder', 'rgba(33,150,243,0.7)'],
  75:   ['Field Ornithologist', 'rgba(156,39,176,0.7)'],
  100:  ['Master Birder', 'rgba(255,215,0,0.9)'],
}

function getProgressLabel(pct) {
  const thresholds = Object.keys(PROGRESS_LABELS).map(Number).sort((a,b) => b - a)
  for (const t of thresholds) {
    if (pct >= t) return PROGRESS_LABELS[t]
  }
  return PROGRESS_LABELS[0]
}

export default function Aviary({ capturedBirds, score, allBirds, onSelectBird, onBack }) {
  const birds = allBirds || BIRDS
  const pct = Math.round((capturedBirds.length / birds.length) * 100)
  const [label, labelColor] = getProgressLabel(pct)

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>
          ← Radar
        </button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>
          My Aviary
        </div>
        <div className="points-badge">★ {score}</div>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div style={{
        padding: '12px 20px',
        background: 'var(--bg-card)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
            {capturedBirds.length} / {birds.length} species
          </span>
          <span style={{
            fontSize: 12, fontWeight: 700, color: labelColor, padding: '2px 10px',
            borderRadius: 20, background: `${labelColor}22`, border: `1px solid ${labelColor}`,
          }}>
            {label}
          </span>
        </div>
        <div style={{ height: 5, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--accent-green2), var(--accent-green))',
            borderRadius: 3,
            transition: 'width 0.6s ease',
            boxShadow: pct > 0 ? '0 0 8px rgba(61,220,127,0.4)' : 'none',
          }}/>
        </div>
      </div>

      {/* ── Bird grid ────────────────────────────────────────────────────── */}
      <div className="scroll-y" style={{ flex: 1, padding: '16px' }}>

        {/* Captured section */}
        {capturedBirds.length > 0 && (
          <>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 10 }}>
              CAPTURED ({capturedBirds.length})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {birds.filter(b => capturedBirds.includes(b.id)).map(bird => (
                <button
                  key={bird.id}
                  onClick={() => onSelectBird(bird.id)}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${bird.appearance.uiColor}33`,
                    borderRadius: 16,
                    padding: '16px 12px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, transform 0.12s',
                    boxShadow: `0 0 20px ${bird.appearance.uiColor}11`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <BirdAvatar birdId={bird.id} size={90} animated={false}/>
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {bird.commonName}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', fontStyle: 'italic', marginTop: 2 }}>
                      {bird.scientificName}
                    </div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 6 }}>
                      <span className={`rarity-badge rarity-${bird.rarity}`} style={{ fontSize: 9, padding: '2px 7px' }}>
                        {getRarityLabel(bird.rarity)}
                      </span>
                      <span className="points-badge" style={{ fontSize: 10, padding: '2px 7px' }}>
                        {bird.points}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Undiscovered section */}
        {birds.filter(b => !capturedBirds.includes(b.id)).length > 0 && (
          <>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 10 }}>
              NOT YET FOUND ({BIRDS.length - capturedBirds.length})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {birds.filter(b => !capturedBirds.includes(b.id)).map(bird => (
                <div key={bird.id} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 14,
                  padding: '14px 8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  opacity: 0.5,
                }}>
                  <BirdSilhouette birdId={bird.id} size={60}/>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'center', fontWeight: 600 }}>
                    ???
                  </div>
                  <div style={{
                    fontSize: 9, color: bird.rarityColor, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: 0.5,
                  }}>
                    {bird.rarity}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {capturedBirds.length === 0 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            textAlign: 'center',
            gap: 12,
          }}>
            <div style={{ fontSize: 52, opacity: 0.4 }}>🪶</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-secondary)' }}>
              Your aviary is empty
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Go outside and find your first bird.<br/>It's waiting.
            </div>
            <button className="btn btn-primary" onClick={onBack} style={{ marginTop: 8 }}>
              Back to Radar
            </button>
          </div>
        )}

        <div style={{ height: 24 }}/>
      </div>
    </div>
  )
}
