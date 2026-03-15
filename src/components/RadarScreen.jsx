// Bird. Here. Now. — Radar Screen
// The "home" screen: shows the user's location on a stylized radar,
// ambient bird blips, recent sightings, and the Aviary shortcut.

import { useState, useEffect, useRef } from 'react'
import { BIRDS, getCurrentSeason } from '../data/birds'

const COMPASS = ['N','NE','E','SE','S','SW','W','NW']
const HABITATS = ['Park Trail','Open Field','Waterfront','Woodland Edge','Backyard','Meadow']

// Stable pseudo-random bird blip positions
const BLIPS = BIRDS.map((bird, i) => ({
  bird,
  x: 30 + (i * 47 + 13) % 60,   // % of radar width
  y: 25 + (i * 61 + 7)  % 55,   // % of radar height
  distance: Math.floor(60 + (i * 113) % 280),
  direction: COMPASS[i % COMPASS.length],
  habitat: HABITATS[i % HABITATS.length],
}))

export default function RadarScreen({ capturedBirds, score, userLocation, onViewAviary }) {
  const [sweepAngle, setSweepAngle]   = useState(0)
  const [pingBlips, setPingBlips]     = useState([])
  const [time, setTime]               = useState(() => new Date())
  const animRef = useRef(null)

  // Radar sweep animation
  useEffect(() => {
    let angle = 0
    let lastPing = 0
    const tick = (ts) => {
      angle = (angle + 1.2) % 360
      setSweepAngle(angle)

      // Every ~90° show a blip ping
      if (ts - lastPing > 1200) {
        const idx = Math.floor(Math.random() * BLIPS.length)
        const b = BLIPS[idx]
        setPingBlips(prev => [
          ...prev.slice(-4),
          { id: ts, x: b.x, y: b.y, ts },
        ])
        lastPing = ts
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const season = getCurrentSeason()
  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateStr = time.toLocaleDateString([], { month: 'short', day: 'numeric' })

  const radarSize = 260

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Top status bar ─────────────────────────────────────────────── */}
      <div style={{
        padding: '14px 20px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        {/* Logo + tagline */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--accent-green)',
            letterSpacing: '-0.5px',
          }}>
            Bird. Here. Now.
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>
            {dateStr} · {timeStr} · {season.charAt(0).toUpperCase() + season.slice(1)}
          </div>
        </div>

        {/* Score + Aviary button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'rgba(255,215,0,0.12)',
            border: '1px solid rgba(255,215,0,0.25)',
            borderRadius: 20,
            padding: '5px 12px',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--accent-gold)',
          }}>
            ★ {score}
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={onViewAviary}
            style={{ padding: '7px 14px', fontSize: 13, gap: 6 }}
          >
            🪶 Aviary ({capturedBirds.length})
          </button>
        </div>
      </div>

      {/* ── Radar display ────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        paddingBottom: 8,
      }}>
        <div style={{ position: 'relative', width: radarSize, height: radarSize }}>
          <svg
            width={radarSize}
            height={radarSize}
            viewBox={`0 0 ${radarSize} ${radarSize}`}
            style={{ position: 'absolute', inset: 0 }}
          >
            <defs>
              {/* Radar sweep gradient */}
              <linearGradient id="sweepGrad" gradientTransform={`rotate(${sweepAngle}, 130, 130)`}>
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
                <stop offset="70%" stopColor="#00ff88" stopOpacity="0" />
                <stop offset="88%" stopColor="#00ff88" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
              </radialGradient>
              <clipPath id="radarClip">
                <circle cx="130" cy="130" r="125" />
              </clipPath>
            </defs>

            {/* Outer ring */}
            <circle cx="130" cy="130" r="126" fill="none" stroke="#1a3a1e" strokeWidth="1.5"/>
            {/* Background fill */}
            <circle cx="130" cy="130" r="124" fill="#0a180c"/>

            {/* Range rings */}
            {[40, 80, 124].map(r => (
              <circle key={r} cx="130" cy="130" r={r}
                fill="none" stroke="#1a3a1e" strokeWidth="0.8"/>
            ))}

            {/* Cross hairs */}
            <line x1="6" y1="130" x2="254" y2="130" stroke="#1a3a1e" strokeWidth="0.8"/>
            <line x1="130" y1="6" x2="130" y2="254" stroke="#1a3a1e" strokeWidth="0.8"/>

            {/* Compass labels */}
            {[
              { label: 'N', x: 130, y: 18 },
              { label: 'S', x: 130, y: 248 },
              { label: 'E', x: 250, y: 135 },
              { label: 'W', x: 10,  y: 135 },
            ].map(({ label, x, y }) => (
              <text key={label} x={x} y={y} textAnchor="middle"
                fill="#2a5a2e" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
                {label}
              </text>
            ))}

            {/* Sweep sector */}
            <g clipPath="url(#radarClip)">
              <g transform={`rotate(${sweepAngle}, 130, 130)`}>
                {/* Sweep trail — two overlapping wedges */}
                <path
                  d={`M 130 130 L ${130 + 130 * Math.cos(-Math.PI/2)} ${130 + 130 * Math.sin(-Math.PI/2)} A 130 130 0 0 1 ${130 + 130 * Math.cos(-Math.PI/2 + 0.7)} ${130 + 130 * Math.sin(-Math.PI/2 + 0.7)} Z`}
                  fill="url(#sweepGrad)"
                />
              </g>
              {/* Center ambient glow */}
              <circle cx="130" cy="130" r="60" fill="url(#centerGlow)"/>
            </g>

            {/* Sweep line */}
            <g transform={`rotate(${sweepAngle}, 130, 130)`}>
              <line x1="130" y1="130" x2="130" y2="6"
                stroke="#00ff88" strokeWidth="1.5" opacity="0.8"/>
            </g>

            {/* Bird blips */}
            {BLIPS.map((blip, i) => {
              const cx = (blip.x / 100) * 250 + 5
              const cy = (blip.y / 100) * 250 + 5
              const captured = capturedBirds.includes(blip.bird.id)
              const color = captured ? '#ffd700' : blip.bird.rarityColor || '#00ff88'
              return (
                <g key={blip.bird.id}>
                  {/* Blip dot */}
                  <circle cx={cx} cy={cy} r={captured ? 4 : 3} fill={color} opacity={0.9}/>
                  {/* Rarity ring */}
                  {blip.bird.rarity !== 'common' && (
                    <circle cx={cx} cy={cy} r={6} fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
                  )}
                </g>
              )
            })}

            {/* Ping animations */}
            {pingBlips.map(p => {
              const cx = (p.x / 100) * 250 + 5
              const cy = (p.y / 100) * 250 + 5
              return (
                <circle key={p.id} cx={cx} cy={cy} r="3"
                  fill="none" stroke="#00ff88" strokeWidth="1.5"
                  style={{ animation: 'radarPing 1s ease-out forwards' }}
                />
              )
            })}

            {/* User position — center */}
            <circle cx="130" cy="130" r="7" fill="#3ddc7f" opacity="0.9"/>
            <circle cx="130" cy="130" r="4" fill="#0a1a0c"/>
            <circle cx="130" cy="130" r="2" fill="#3ddc7f"/>
            {/* User pulse ring */}
            <circle cx="130" cy="130" r="12" fill="none" stroke="#3ddc7f" strokeWidth="1"
              style={{ animation: 'radarPing 2s ease-out infinite' }}/>
          </svg>
        </div>

        {/* ── Status line ──────────────────────────────────────────────── */}
        <div style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--accent-green)',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.5px',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent-green)',
            animation: 'pulse 2s infinite',
          }}/>
          SCANNING FOR BIRDS · {BLIPS.length} SPECIES NEARBY
        </div>
      </div>

      {/* ── Nearby birds list ────────────────────────────────────────────── */}
      <div style={{
        padding: '0 16px 16px',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>
          NEARBY SIGHTINGS
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}
          className="scroll-y">
          {BLIPS.slice(0, 5).map(blip => {
            const captured = capturedBirds.includes(blip.bird.id)
            return (
              <div key={blip.bird.id} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${captured ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12,
                padding: '8px 12px',
                minWidth: 110,
                flexShrink: 0,
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: captured ? 'var(--accent-gold)' : 'var(--text-primary)',
                  marginBottom: 2,
                  whiteSpace: 'nowrap',
                }}>
                  {captured ? '★ ' : ''}{blip.bird.commonName}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                  ~{blip.distance}m {blip.direction}
                </div>
                <div style={{
                  marginTop: 4,
                  fontSize: 9,
                  padding: '2px 6px',
                  borderRadius: 8,
                  display: 'inline-block',
                  background: blip.bird.rarity === 'common'
                    ? 'rgba(76,175,80,0.15)' : 'rgba(33,150,243,0.15)',
                  color: blip.bird.rarity === 'common'
                    ? 'var(--rarity-common)' : 'var(--rarity-uncommon)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  {blip.bird.rarity}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Waiting for encounter hint */}
      <div style={{
        padding: '0 20px 20px',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: 12,
        animation: 'pulse 3s ease-in-out infinite',
        flexShrink: 0,
      }}>
        Go outside · A bird will find you soon…
      </div>
    </div>
  )
}
