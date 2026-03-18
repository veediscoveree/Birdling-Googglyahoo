// Bird. Here. Now. — Radar Screen
// Home screen: radar sweep, ambient blips, and real eBird-sourced recent
// sightings with location + time attribution when a key is configured.

import { useState, useEffect, useRef } from 'react'
import { BIRDS, getCurrentSeason } from '../data/birds'

const COMPASS = ['N','NE','E','SE','S','SW','W','NW']
const HABITATS = ['Park Trail','Open Field','Waterfront','Woodland Edge','Backyard','Meadow']

// Stable pseudo-random radar positions for each bird
const BLIP_POS = BIRDS.map((_, i) => ({
  x: 30 + (i * 47 + 13) % 60,
  y: 25 + (i * 61 +  7) % 55,
}))

// ── Time-ago helper ───────────────────────────────────────────────────────────
function timeAgo(obsDt) {
  if (!obsDt) return ''
  // obsDt format: "2026-03-18 07:15" or "2026-03-18"
  const d = new Date(obsDt.replace(' ', 'T'))
  if (isNaN(d)) return ''
  const mins = Math.round((Date.now() - d) / 60000)
  if (mins < 2)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs  < 24)  return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  return `${days}d ago`
}

// ── Sighting cards data ───────────────────────────────────────────────────────
// Uses real eBird obs when available, falls back to ambient blips
function buildSightingCards(eBirdObs, eBirdActive) {
  if (eBirdActive && eBirdObs.length > 0) {
    // Sort by most recent first, take top 6
    return [...eBirdObs]
      .sort((a, b) => (b.obsDt > a.obsDt ? 1 : -1))
      .slice(0, 6)
      .map(o => ({
        bird:      o.bird,
        label:     o.locName,
        sublabel:  timeAgo(o.obsDt),
        howMany:   o.howMany,
        real:      true,
      }))
  }
  // Fallback: synthetic ambient cards
  return BIRDS.slice(0, 5).map((bird, i) => ({
    bird,
    label:    HABITATS[i % HABITATS.length],
    sublabel: `~${Math.floor(60 + i * 80)}m ${COMPASS[i % COMPASS.length]}`,
    howMany:  1,
    real:     false,
  }))
}

export default function RadarScreen({ capturedBirds, score, userLocation, eBirdActive, nearbyBirds, eBirdObs = [], onViewAviary }) {
  const [sweepAngle, setSweepAngle] = useState(0)
  const [pingBlips,  setPingBlips]  = useState([])
  const [time,       setTime]       = useState(() => new Date())
  const animRef = useRef(null)

  // Use real nearby birds for blip positions when available, else full list
  const blipBirds = (eBirdActive && nearbyBirds.length > 0) ? nearbyBirds : BIRDS

  // Radar sweep
  useEffect(() => {
    let angle = 0, lastPing = 0
    const tick = (ts) => {
      angle = (angle + 1.2) % 360
      setSweepAngle(angle)
      if (ts - lastPing > 1200) {
        const i = Math.floor(Math.random() * blipBirds.length)
        const pos = BLIP_POS[i % BLIP_POS.length]
        setPingBlips(prev => [...prev.slice(-4), { id: ts, x: pos.x, y: pos.y }])
        lastPing = ts
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [blipBirds.length])

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const season   = getCurrentSeason()
  const timeStr  = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateStr  = time.toLocaleDateString([], { month: 'short', day: 'numeric' })
  const cards    = buildSightingCards(eBirdObs, eBirdActive)
  const radarSize = 260

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: '14px 20px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
            color: 'var(--accent-green)', letterSpacing: '-0.5px',
          }}>
            Bird. Here. Now.
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>
            {dateStr} · {timeStr} · {season.charAt(0).toUpperCase() + season.slice(1)}
            {eBirdActive && (
              <span style={{ color: 'var(--accent-amber)', marginLeft: 6, fontWeight: 600 }}>
                · eBird live
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.25)',
            borderRadius: 20, padding: '5px 12px', fontSize: 13,
            fontWeight: 700, color: 'var(--accent-gold)',
          }}>
            ★ {score}
          </div>
          <button className="btn btn-outline btn-sm" onClick={onViewAviary}
            style={{ padding: '7px 14px', fontSize: 13, gap: 6 }}>
            🪶 Aviary ({capturedBirds.length})
          </button>
        </div>
      </div>

      {/* ── Radar ────────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 8,
      }}>
        <div style={{ position: 'relative', width: radarSize, height: radarSize }}>
          <svg width={radarSize} height={radarSize}
            viewBox={`0 0 ${radarSize} ${radarSize}`}
            style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <linearGradient id="sweepGrad" gradientTransform={`rotate(${sweepAngle}, 130, 130)`}>
                <stop offset="0%"   stopColor="#00ff88" stopOpacity="0"/>
                <stop offset="70%"  stopColor="#00ff88" stopOpacity="0"/>
                <stop offset="88%"  stopColor="#00ff88" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0.5"/>
              </linearGradient>
              <radialGradient id="centerGlow">
                <stop offset="0%"   stopColor="#00ff88" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
              </radialGradient>
              <clipPath id="radarClip">
                <circle cx="130" cy="130" r="125"/>
              </clipPath>
            </defs>

            <circle cx="130" cy="130" r="126" fill="none" stroke="#1a3a1e" strokeWidth="1.5"/>
            <circle cx="130" cy="130" r="124" fill="#0a180c"/>
            {[40, 80, 124].map(r => (
              <circle key={r} cx="130" cy="130" r={r} fill="none" stroke="#1a3a1e" strokeWidth="0.8"/>
            ))}
            <line x1="6" y1="130" x2="254" y2="130" stroke="#1a3a1e" strokeWidth="0.8"/>
            <line x1="130" y1="6" x2="130" y2="254" stroke="#1a3a1e" strokeWidth="0.8"/>
            {[{ label:'N',x:130,y:18 },{ label:'S',x:130,y:248 },{ label:'E',x:250,y:135 },{ label:'W',x:10,y:135 }].map(({ label, x, y }) => (
              <text key={label} x={x} y={y} textAnchor="middle"
                fill="#2a5a2e" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">{label}</text>
            ))}

            <g clipPath="url(#radarClip)">
              <g transform={`rotate(${sweepAngle}, 130, 130)`}>
                <path d={`M 130 130 L ${130 + 130 * Math.cos(-Math.PI/2)} ${130 + 130 * Math.sin(-Math.PI/2)} A 130 130 0 0 1 ${130 + 130 * Math.cos(-Math.PI/2 + 0.7)} ${130 + 130 * Math.sin(-Math.PI/2 + 0.7)} Z`}
                  fill="url(#sweepGrad)"/>
              </g>
              <circle cx="130" cy="130" r="60" fill="url(#centerGlow)"/>
            </g>
            <g transform={`rotate(${sweepAngle}, 130, 130)`}>
              <line x1="130" y1="130" x2="130" y2="6" stroke="#00ff88" strokeWidth="1.5" opacity="0.8"/>
            </g>

            {/* Bird blips — real nearby or fallback */}
            {blipBirds.map((bird, i) => {
              const pos = BLIP_POS[i % BLIP_POS.length]
              const cx = (pos.x / 100) * 250 + 5
              const cy = (pos.y / 100) * 250 + 5
              const captured = capturedBirds.includes(bird.id)
              const color = captured ? '#ffd700' : (bird.appearance?.uiColor || '#00ff88')
              return (
                <g key={bird.id}>
                  <circle cx={cx} cy={cy} r={captured ? 4 : 3} fill={color} opacity={0.9}/>
                  {bird.rarity !== 'common' && (
                    <circle cx={cx} cy={cy} r={6} fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
                  )}
                </g>
              )
            })}

            {pingBlips.map(p => {
              const cx = (p.x / 100) * 250 + 5
              const cy = (p.y / 100) * 250 + 5
              return (
                <circle key={p.id} cx={cx} cy={cy} r="3"
                  fill="none" stroke="#00ff88" strokeWidth="1.5"
                  style={{ animation: 'radarPing 1s ease-out forwards' }}/>
              )
            })}

            <circle cx="130" cy="130" r="7" fill="#3ddc7f" opacity="0.9"/>
            <circle cx="130" cy="130" r="4" fill="#0a1a0c"/>
            <circle cx="130" cy="130" r="2" fill="#3ddc7f"/>
            <circle cx="130" cy="130" r="12" fill="none" stroke="#3ddc7f" strokeWidth="1"
              style={{ animation: 'radarPing 2s ease-out infinite' }}/>
          </svg>
        </div>

        {/* Status line */}
        <div style={{
          marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
          color: 'var(--accent-green)', fontSize: 12,
          fontFamily: 'var(--font-mono)', letterSpacing: '0.5px',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: eBirdActive ? 'var(--accent-amber)' : 'var(--accent-green)',
            animation: 'pulse 2s infinite',
          }}/>
          {eBirdActive
            ? `LIVE EBIRD · ${nearbyBirds.length} SPECIES DETECTED`
            : `SCANNING · ${BIRDS.length} SPECIES IN DATABASE`}
        </div>
      </div>

      {/* ── Recent sightings ─────────────────────────────────────────────── */}
      <div style={{ padding: '0 16px 12px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 8,
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1 }}>
            {eBirdActive ? 'RECENT EBIRD SIGHTINGS' : 'NEARBY SIGHTINGS'}
          </div>
          {eBirdActive && (
            <div style={{ fontSize: 10, color: 'var(--accent-amber)', fontWeight: 600 }}>
              eBird verified
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}
          className="scroll-y">
          {cards.map((card, i) => {
            const captured = capturedBirds.includes(card.bird.id)
            return (
              <div key={`${card.bird.id}-${i}`} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${captured ? 'rgba(255,215,0,0.25)' : card.real ? 'rgba(245,166,35,0.15)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12,
                padding: '8px 12px',
                minWidth: 130,
                flexShrink: 0,
              }}>
                {/* Species name */}
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: captured ? 'var(--accent-gold)' : 'var(--text-primary)',
                  marginBottom: 2, whiteSpace: 'nowrap',
                }}>
                  {captured ? '★ ' : ''}{card.bird.commonName}
                  {card.howMany > 1 && (
                    <span style={{ color: 'var(--text-dim)', marginLeft: 4 }}>×{card.howMany}</span>
                  )}
                </div>
                {/* Location */}
                <div style={{
                  fontSize: 10, color: card.real ? 'var(--accent-amber)' : 'var(--text-dim)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  maxWidth: 116,
                }}>
                  {card.label}
                </div>
                {/* Time ago / direction */}
                <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 2 }}>
                  {card.sublabel}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Waiting hint */}
      <div style={{
        padding: '0 20px 20px', textAlign: 'center',
        color: 'var(--text-dim)', fontSize: 12,
        animation: 'pulse 3s ease-in-out infinite', flexShrink: 0,
      }}>
        Go outside · A bird will find you soon…
      </div>
    </div>
  )
}
