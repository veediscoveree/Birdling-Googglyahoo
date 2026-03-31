// Bird. Here. Now. — Easter Egg Encounter Screen
// Shown when a special historical/cultural personage is detected.
// Intro reveals the character, shows their description, and leads into the mini-game.

import { useState, useEffect } from 'react'

const BADGE_STYLES = {
  sepia:  { bg: 'rgba(200,164,23,0.15)', border: 'rgba(200,164,23,0.4)', color: '#c8a417' },
  mural:  { bg: 'rgba(232,90,30,0.15)',  border: 'rgba(232,90,30,0.4)',  color: '#e85a1e' },
  field:  { bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.4)', color: '#4ade80' },
  team:   { bg: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.4)', color: '#60a5fa' },
}

export default function EasterEggEncounter({ egg, onPlayGame, onDismiss }) {
  const [phase, setPhase] = useState('notify')   // notify → reveal → ready

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 900)
    const t2 = setTimeout(() => setPhase('ready'),  2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const badge = BADGE_STYLES[egg.badgeStyle] ?? BADGE_STYLES.field

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: `radial-gradient(ellipse at 50% 20%, ${egg.glowColor}22 0%, ${egg.bgColor} 55%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 0 32px', overflow: 'hidden',
    }}>
      {/* Top notification banner */}
      <div style={{
        width: '100%',
        background: `rgba(${hexToRgb(egg.theme)}, 0.08)`,
        borderBottom: `1px solid rgba(${hexToRgb(egg.theme)}, 0.18)`,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        animation: 'notifSlide 0.4s ease',
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: egg.theme, flexShrink: 0,
          animation: 'pulse 1.2s ease-in-out infinite',
        }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: egg.theme }}>
            Rare Encounter — Special Event
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>
            A legendary figure has appeared nearby
          </div>
        </div>
        <button onClick={onDismiss} style={{
          background: 'none', border: 'none', color: 'var(--text-dim)',
          fontSize: 20, cursor: 'pointer', padding: '0 4px',
        }}>×</button>
      </div>

      {/* Central figure reveal */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 0, padding: '0 24px', width: '100%',
      }}>
        {/* Glow orb */}
        <div style={{
          position: 'relative', width: 180, height: 180,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 4,
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `radial-gradient(circle, ${egg.glowColor}44 0%, transparent 70%)`,
            animation: 'glowPulse 2s ease-in-out infinite',
            transition: 'opacity 0.8s ease',
            opacity: phase === 'notify' ? 0.3 : 1,
          }}/>
          {/* Big emoji/icon representing the egg */}
          <div style={{
            fontSize: 72,
            filter: phase === 'notify' ? 'brightness(0) blur(4px)' :
                    phase === 'reveal' ? 'brightness(0.5) saturate(0.3)' : 'none',
            opacity: phase === 'notify' ? 0.3 : 1,
            transition: 'filter 0.8s ease, opacity 0.8s ease',
            animation: phase === 'ready' ? 'birdFloat 3s ease-in-out infinite' : 'none',
          }}>
            {EGG_ICONS[egg.id] ?? '✨'}
          </div>
          {phase === 'notify' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 64, color: 'var(--text-dim)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}>?</div>
          )}
        </div>

        {/* Identity */}
        <div style={{
          textAlign: 'center',
          opacity: phase === 'ready' ? 1 : 0,
          transform: phase === 'ready' ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          marginBottom: 16,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block', marginBottom: 8,
            background: badge.bg, border: `1px solid ${badge.border}`,
            borderRadius: 99, padding: '3px 12px',
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            color: badge.color, textTransform: 'uppercase',
          }}>
            {egg.badge}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 900,
            color: egg.textColor || 'var(--text-primary)', letterSpacing: '-0.3px',
            marginBottom: 2,
          }}>
            {egg.name}
          </div>
          <div style={{ fontSize: 13, color: egg.accentColor || 'var(--text-dim)', marginBottom: 2 }}>
            {egg.subtitle}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'monospace', letterSpacing: 1 }}>
            {egg.tagline}
          </div>
        </div>

        {/* Description card */}
        {phase === 'ready' && (
          <div className="animate-slideUp" style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(${hexToRgb(egg.theme)}, 0.15)`,
            borderRadius: 14, padding: '14px 16px', width: '100%',
          }}>
            <div style={{ fontSize: 10, color: egg.theme, letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>
              WHO IS THIS?
            </div>
            <div style={{
              fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6,
              maxHeight: 110, overflow: 'hidden',
              WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            }}>
              {egg.description}
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          disabled={phase !== 'ready'}
          onClick={onPlayGame}
          style={{
            background: phase === 'ready' ? egg.theme : 'rgba(255,255,255,0.1)',
            color: phase === 'ready' ? '#fff' : 'var(--text-dim)',
            border: 'none', borderRadius: 8,
            padding: '14px 24px', fontSize: 15,
            fontWeight: 700, fontFamily: 'monospace',
            letterSpacing: 2, textTransform: 'uppercase',
            cursor: phase === 'ready' ? 'pointer' : 'default',
            opacity: phase === 'ready' ? 1 : 0.4,
            transition: 'all 0.3s',
          }}
        >
          🎮 Play: {egg.gameTitle}
        </button>
        <button onClick={onDismiss} style={{
          background: 'transparent', color: 'var(--text-dim)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '10px 24px',
          fontSize: 13, fontFamily: 'monospace',
          letterSpacing: 1, cursor: 'pointer',
        }}>
          Pass — return to radar
        </button>
      </div>
    </div>
  )
}

const EGG_ICONS = {
  audubon:       '🎨',
  gitler:        '🖌️',
  birding_bob:   '📢',
  mighty_birders: '🦅',
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return `${r},${g},${b}`
}
