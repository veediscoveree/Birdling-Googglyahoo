// Bird. Here. Now. — Aviary Screen
// Personal field guide / collection. Captured birds show full detail;
// undiscovered show mystery silhouettes numbered like a field guide.
// "Collect 'em all" Pokédex feel: numbered species, progress milestones.

import { BirdAvatar, BirdSilhouette } from './BirdAvatars'
import { BIRDS, getRarityLabel } from '../data/birds'

// ── Rank ladder ───────────────────────────────────────────────────────────────
const RANKS = [
  { min: 0,   label: 'First Steps',        color: '#5a7a5e' },
  { min: 1,   label: 'Beginner Birder',     color: '#4caf50' },
  { min: 5,   label: 'Patch Birder',        color: '#2196f3' },
  { min: 10,  label: 'Field Birder',        color: '#00bcd4' },
  { min: 20,  label: 'Avid Birder',         color: '#9c27b0' },
  { min: 30,  label: 'Serious Lister',      color: '#ff9800' },
  { min: 41,  label: '★ Master Birder ★',   color: '#ffd700' },
]

function getRank(n) {
  return [...RANKS].reverse().find(r => n >= r.min) || RANKS[0]
}

// ── Milestone messages ────────────────────────────────────────────────────────
const MILESTONES = {
  1:  '🐣 First capture! Every lifer starts here.',
  5:  '🔭 5 species — you\'re hooked now.',
  10: '📒 10 species — your field notes are filling up.',
  20: '🦅 20 species — a solid patch list.',
  30: '🗺️ 30 species — you\'re covering real ground.',
  41: '🏆 All 41 species! The aviary is complete.',
}

// ── Species sequence number (padded, like a field guide) ─────────────────────
function speciesNum(index) {
  return String(index + 1).padStart(3, '0')
}

export default function Aviary({ capturedBirds, score, allBirds, onSelectBird, onBack }) {
  const birds   = allBirds || BIRDS
  const n       = capturedBirds.length
  const total   = birds.length
  const pct     = Math.round((n / total) * 100)
  const rank    = getRank(n)
  const milestone = MILESTONES[n]

  // Spark bird = first ever captured (position 0 in capturedBirds array)
  const sparkId = capturedBirds[0] || null

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Radar</button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>
          My Aviary
        </div>
        <div className="points-badge">★ {score}</div>
      </div>

      {/* ── Collection summary ───────────────────────────────────────────── */}
      <div style={{
        padding: '12px 20px', background: 'var(--bg-card)',
        borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0,
      }}>
        {/* Count + rank */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {n}
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-dim)', marginLeft: 4 }}>
              / {total} species
            </span>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: rank.color,
            padding: '3px 10px', borderRadius: 20,
            background: `${rank.color}20`, border: `1px solid ${rank.color}55`,
          }}>
            {rank.label}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: n === total
              ? 'linear-gradient(90deg, #ffd700, #ffaa00)'
              : 'linear-gradient(90deg, var(--accent-green2), var(--accent-green))',
            borderRadius: 3, transition: 'width 0.6s ease',
            boxShadow: n > 0 ? `0 0 8px ${rank.color}66` : 'none',
          }}/>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-dim)' }}>
          <span>{pct}% complete</span>
          <span>{total - n} remaining</span>
        </div>

        {/* Milestone pop */}
        {milestone && (
          <div style={{
            marginTop: 8, padding: '6px 10px', borderRadius: 8,
            background: 'rgba(61,220,127,0.08)', border: '1px solid rgba(61,220,127,0.2)',
            fontSize: 12, color: 'var(--accent-green)', lineHeight: 1.4,
          }}>
            {milestone}
          </div>
        )}
      </div>

      {/* ── Bird grid ────────────────────────────────────────────────────── */}
      <div className="scroll-y" style={{ flex: 1, padding: '16px' }}>

        {/* Captured */}
        {n > 0 && (
          <>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 10 }}>
              CAPTURED ({n})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {birds.filter(b => capturedBirds.includes(b.id)).map((bird, _i) => {
                const idx     = birds.indexOf(bird)
                const isSpark = bird.id === sparkId
                return (
                  <button
                    key={bird.id}
                    onClick={() => onSelectBird(bird.id)}
                    style={{
                      background: 'var(--bg-card)',
                      border: `1px solid ${isSpark ? 'rgba(255,215,0,0.4)' : `${bird.appearance.uiColor}33`}`,
                      borderRadius: 16, padding: '16px 12px 12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: 8, cursor: 'pointer', position: 'relative',
                      boxShadow: isSpark ? '0 0 16px rgba(255,215,0,0.15)' : `0 0 20px ${bird.appearance.uiColor}11`,
                      transition: 'transform 0.12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {/* Species number */}
                    <div style={{
                      position: 'absolute', top: 7, left: 9,
                      fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)',
                      letterSpacing: 0.5,
                    }}>
                      #{speciesNum(idx)}
                    </div>
                    {/* Spark bird marker */}
                    {isSpark && (
                      <div style={{
                        position: 'absolute', top: 6, right: 8,
                        fontSize: 10, color: 'var(--accent-gold)',
                        title: 'Your spark bird',
                      }}>✦</div>
                    )}
                    <BirdAvatar birdId={bird.id} size={90} animated={false}/>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {bird.commonName}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-dim)', fontStyle: 'italic', marginTop: 2 }}>
                        {bird.scientificName}
                      </div>
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 6, flexWrap: 'wrap' }}>
                        <span className={`rarity-badge rarity-${bird.rarity}`}
                          style={{ fontSize: 9, padding: '2px 7px' }}>
                          {getRarityLabel(bird.rarity)}
                        </span>
                        <span className="points-badge" style={{ fontSize: 10, padding: '2px 7px' }}>
                          {bird.points > 0 ? `+${bird.points}` : bird.points}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Undiscovered — numbered mystery silhouettes */}
        {total - n > 0 && (
          <>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 10 }}>
              NOT YET FOUND ({total - n})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {birds.filter(b => !capturedBirds.includes(b.id)).map((bird) => {
                const idx = birds.indexOf(bird)
                return (
                  <div key={bird.id} style={{
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 14, padding: '14px 8px 10px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 5, opacity: 0.5,
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', top: 5, left: 7,
                      fontSize: 8, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)',
                    }}>
                      #{speciesNum(idx)}
                    </div>
                    <BirdSilhouette birdId={bird.id} size={58}/>
                    <div style={{
                      fontSize: 10, color: 'var(--text-dim)',
                      textAlign: 'center', fontWeight: 600,
                    }}>???</div>
                    <div style={{
                      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      color: bird.rarity === 'common'    ? 'var(--rarity-common)'
                           : bird.rarity === 'uncommon'  ? 'var(--rarity-uncommon)'
                           : bird.rarity === 'rare'      ? '#ce93d8'
                           : '#ff8a65',
                    }}>
                      {bird.rarity}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {n === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '60px 20px',
            textAlign: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 52, opacity: 0.4 }}>🪶</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-secondary)' }}>
              Your aviary is empty
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              {total} species are out there waiting.<br/>
              Go find your first one.
            </div>
            <button className="btn btn-primary" onClick={onBack} style={{ marginTop: 8 }}>
              Back to Radar
            </button>
          </div>
        )}

        {/* Complete! */}
        {n === total && total > 0 && (
          <div style={{
            margin: '24px 0 8px', padding: '16px',
            background: 'rgba(255,215,0,0.07)', border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: 16, textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🏆</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--accent-gold)', fontWeight: 700 }}>
              Field Guide Complete
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>
              All {total} species captured. You are a Master Birder.
            </div>
          </div>
        )}

        <div style={{ height: 24 }}/>
      </div>
    </div>
  )
}
