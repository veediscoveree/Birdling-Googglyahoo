// Bird. Here. Now. — Bird Encounter Screen
// Notification-style pop-up: a bird has been detected nearby.
// Shows a silhouette teaser, location info, and leads into the
// binoculars capture mechanic.

import { useState, useEffect } from 'react'
import { BirdAvatar } from './BirdAvatars'
import { getRarityLabel, getSizeLabel } from '../data/birds'

export default function BirdEncounter({ bird, info, onStartCapture, onDismiss }) {
  const [phase, setPhase]   = useState('notify')   // notify → reveal → ready
  const [showHint, setShowHint] = useState(false)

  // Sequence: notification → partial reveal → full encounter
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1200)
    const t2 = setTimeout(() => { setPhase('ready'); setShowHint(true) }, 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const rarityClass = `rarity-${bird.rarity}`

  return (
    <div className="screen animate-fadeIn" style={{
      background: 'linear-gradient(180deg, #040e05 0%, #0a1a0c 40%, #061208 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 32px',
    }}>

      {/* ── Top notification banner ─────────────────────────────────── */}
      <div style={{
        width: '100%',
        background: 'rgba(61,220,127,0.08)',
        borderBottom: '1px solid rgba(61,220,127,0.15)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        animation: 'notifSlide 0.4s ease',
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--accent-green)',
          flexShrink: 0,
          animation: 'pulse 1.2s ease-in-out infinite',
        }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-green)' }}>
            Bird detected nearby
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>
            {info?.distance}m away · {info?.habitat}
            {info?.isEBirdVerified && (
              <span style={{ marginLeft: 6, color: 'var(--accent-amber)', fontWeight: 600 }}>
                · eBird verified
              </span>
            )}
          </div>
        </div>
        <button onClick={onDismiss} style={{
          background: 'none', border: 'none', color: 'var(--text-dim)',
          fontSize: 20, cursor: 'pointer', padding: '0 4px',
        }}>×</button>
      </div>

      {/* ── Bird display area ──────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        padding: '0 24px',
        width: '100%',
      }}>

        {/* Atmosphere glow ring */}
        <div style={{
          position: 'relative',
          width: 220,
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Outer glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${bird.appearance.uiColor}22 0%, transparent 70%)`,
            animation: 'glowPulse 2s ease-in-out infinite',
          }}/>
          {/* Inner ring */}
          <div style={{
            position: 'absolute',
            inset: 20,
            borderRadius: '50%',
            border: `1.5px solid ${bird.appearance.uiColor}30`,
          }}/>

          {/* Bird avatar — revealed progressively */}
          <div style={{
            position: 'relative',
            transition: 'filter 0.8s ease, opacity 0.8s ease',
            filter: phase === 'notify' ? 'brightness(0)' :
                    phase === 'reveal' ? 'brightness(0.4) saturate(0.2)' : 'none',
            opacity: phase === 'notify' ? 0.3 : 1,
            animation: phase === 'ready' ? 'birdFloat 3s ease-in-out infinite' : 'none',
          }}>
            <BirdAvatar
              birdId={bird.id}
              size={150}
              animated={phase === 'ready'}
            />
          </div>

          {/* Question mark overlay before full reveal */}
          {phase === 'notify' && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              color: 'var(--text-dim)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}>
              ?
            </div>
          )}
        </div>

        {/* ── Bird identification ─────────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          opacity: phase === 'ready' ? 1 : 0,
          transform: phase === 'ready' ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          marginTop: 8,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
          }}>
            {bird.commonName}
          </div>
          <div style={{
            fontSize: 13,
            color: 'var(--text-dim)',
            fontStyle: 'italic',
            marginTop: 2,
          }}>
            {bird.scientificName}
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
            <span className={`rarity-badge ${rarityClass}`}>
              {getRarityLabel(bird.rarity)}
            </span>
            <span className="points-badge">
              +{bird.points} pts
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}>
              {getSizeLabel(bird.sizeCategory)}
            </span>
          </div>
        </div>

        {/* ── Quick clue ─────────────────────────────────────────────────── */}
        {showHint && (
          <div className="animate-slideUp" style={{
            marginTop: 18,
            background: 'var(--bg-card)',
            borderRadius: 14,
            padding: '12px 16px',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 6 }}>
              FIELD CLUE
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              "{bird.sound.callDescription}"
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-dim)' }}>
              🏃 Movement: <span style={{ color: 'var(--text-secondary)' }}>
                {bird.captureStats.movementPattern.charAt(0).toUpperCase()
                  + bird.captureStats.movementPattern.slice(1)}
              </span>
              {'  ·  '}
              ⚡ Capture difficulty:{' '}
              <span style={{ color: bird.captureStats.difficulty > 6 ? '#ff8a65' : 'var(--text-secondary)' }}>
                {bird.captureStats.difficulty}/10
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Action buttons ────────────────────────────────────────────────── */}
      <div style={{ width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          className="btn btn-amber btn-lg"
          onClick={onStartCapture}
          disabled={phase !== 'ready'}
          style={{
            opacity: phase === 'ready' ? 1 : 0.4,
            transition: 'opacity 0.3s',
          }}
        >
          🔭 Raise Your Binoculars
        </button>
        <button className="btn btn-ghost" onClick={onDismiss} style={{ fontSize: 13 }}>
          Not now — let it go
        </button>
      </div>
    </div>
  )
}
