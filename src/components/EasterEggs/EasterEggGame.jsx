// Bird. Here. Now. — Easter Egg Mini-Games
// Each egg has its own game. After win/lose the result screen is shown inline.

import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Result screen ──────────────────────────────────────────────────────────

function EggResult({ egg, won, onContinue }) {
  const [shown, setShown] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShown(true), 200); return () => clearTimeout(t) }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: `radial-gradient(ellipse at 50% 30%, ${egg.glowColor}33 0%, ${egg.bgColor} 60%)`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 28, zIndex: 200,
    }}>
      <div style={{
        fontSize: 64, marginBottom: 16,
        animation: shown ? 'starBurst 0.5s ease both' : 'none',
      }}>
        {won ? '🎉' : '😔'}
      </div>
      <div style={{
        fontSize: won ? 28 : 22, fontWeight: 900,
        color: won ? egg.theme : 'var(--text-secondary)',
        fontFamily: 'var(--font-display)',
        textAlign: 'center', marginBottom: 8,
      }}>
        {won ? 'You did it!' : 'Not this time...'}
      </div>
      <div style={{
        fontSize: 13, color: egg.textColor || 'var(--text-secondary)',
        lineHeight: 1.65, textAlign: 'center', maxWidth: 360,
        marginBottom: 12,
      }}>
        {won ? egg.winMessage : egg.loseMessage}
      </div>
      <div style={{
        fontSize: 13, fontWeight: 700,
        color: won ? egg.theme : 'var(--text-dim)',
        marginBottom: 28,
      }}>
        {won ? `+${egg.winPoints} pts` : `+${egg.losePoints} pts`}
      </div>
      <button onClick={onContinue} style={{
        background: egg.theme, color: '#fff', border: 'none',
        borderRadius: 8, padding: '14px 32px',
        fontSize: 15, fontWeight: 700,
        fontFamily: 'monospace', letterSpacing: 2,
        textTransform: 'uppercase', cursor: 'pointer',
        width: '100%', maxWidth: 320,
      }}>
        Continue →
      </button>
    </div>
  )
}

// ─── Game: Save the Last Flock (audubon) ────────────────────────────────────
// 8 parakeets appear. Tap them to shoo to safety. Save 5 of 8 before time runs out.

function AudubonGame({ egg, onResult }) {
  const TOTAL = 8, NEED = 5, TIME = 18
  const [parakeets, setParakeets] = useState(() =>
    Array.from({ length: TOTAL }, (_, i) => ({
      id: i, saved: false, shot: false,
      x: 8 + (i % 4) * 23 + Math.random() * 6,
      y: 15 + Math.floor(i / 4) * 35 + Math.random() * 8,
    }))
  )
  const [timeLeft, setTimeLeft] = useState(TIME)
  const [done, setDone] = useState(false)
  const savedCount = parakeets.filter(p => p.saved).length

  useEffect(() => {
    if (done) return
    if (timeLeft <= 0) { setDone(true); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, done])

  // At 0 time — shoot remaining free parakeets
  useEffect(() => {
    if (timeLeft <= 0 && !done) {
      setParakeets(prev => prev.map(p => (!p.saved ? { ...p, shot: true } : p)))
      setDone(true)
    }
  }, [timeLeft, done])

  const tap = (id) => {
    if (done) return
    setParakeets(prev => {
      const next = prev.map(p => p.id === id && !p.saved && !p.shot ? { ...p, saved: true } : p)
      const newSaved = next.filter(p => p.saved).length
      if (newSaved >= NEED) setDone(true)
      return next
    })
  }

  const won = savedCount >= NEED
  if (done) return <EggResult egg={egg} won={won} onContinue={() => onResult(won)} />

  return (
    <div style={{ position: 'fixed', inset: 0, background: egg.bgColor, display: 'flex', flexDirection: 'column', padding: 20 }}>
      <GameHeader egg={egg} title={egg.gameTitle} timeLeft={timeLeft} maxTime={TIME} />
      <div style={{ fontSize: 12, color: 'var(--text-dim)', textAlign: 'center', marginBottom: 4 }}>
        {egg.gameInstructions}
      </div>
      <div style={{ fontSize: 13, color: egg.theme, textAlign: 'center', marginBottom: 12, fontWeight: 700 }}>
        Saved: {savedCount} / {NEED} needed
      </div>
      <div style={{
        position: 'relative', flex: 1,
        background: 'rgba(255,255,255,0.03)', borderRadius: 16,
        border: `1px solid rgba(255,255,255,0.07)`,
        overflow: 'hidden',
      }}>
        {/* Audubon figure */}
        <div style={{
          position: 'absolute', bottom: 12, right: 16, fontSize: 44,
          opacity: 0.7,
        }}>🎨</div>
        {/* Parakeets */}
        {parakeets.map(p => (
          <button key={p.id} onClick={() => tap(p.id)} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            background: 'none', border: 'none', cursor: p.saved || p.shot ? 'default' : 'pointer',
            fontSize: 36, padding: 0,
            transition: 'transform 0.3s, opacity 0.3s',
            transform: p.saved ? 'translateY(-60px) scale(0.5)' : p.shot ? 'scale(0)' : 'none',
            opacity: p.saved || p.shot ? 0 : 1,
            filter: p.saved ? 'none' : 'none',
          }}>
            🦜
          </button>
        ))}
        {/* Saved indicator */}
        {parakeets.filter(p => p.saved).length > 0 && (
          <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 11, color: egg.theme }}>
            {parakeets.filter(p => p.saved).map(p => '🌿').join('')}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Game: Paint the Block (gitler) ─────────────────────────────────────────
// 6 mural sections. Pick a color, tap to fill. Complete all before time runs out.

const MURAL_COLORS = ['#e85a1e', '#60a5fa', '#4ade80', '#fbbf24', '#c084fc', '#f472b6']
const MURAL_SECTIONS = [
  { id: 0, label: 'Heron',   emoji: '🦢', x: 5,  y: 5,  w: 40, h: 42 },
  { id: 1, label: 'Warbler', emoji: '🐦', x: 55, y: 5,  w: 40, h: 42 },
  { id: 2, label: 'Hawk',    emoji: '🦅', x: 5,  y: 53, w: 25, h: 42 },
  { id: 3, label: 'Duck',    emoji: '🦆', x: 35, y: 53, w: 25, h: 42 },
  { id: 4, label: 'Owl',     emoji: '🦉', x: 65, y: 53, w: 15, h: 42 },
  { id: 5, label: 'Robin',   emoji: '🐦', x: 82, y: 53, w: 15, h: 42 },
]

function GitlerGame({ egg, onResult }) {
  const TIME = 25
  const [filled, setFilled] = useState({})
  const [activeColor, setActiveColor] = useState(MURAL_COLORS[0])
  const [timeLeft, setTimeLeft] = useState(TIME)
  const [done, setDone] = useState(false)
  const filledCount = Object.keys(filled).length

  useEffect(() => {
    if (done) return
    if (timeLeft <= 0) { setDone(true); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, done])

  const fill = (id) => {
    if (done || filled[id]) return
    setFilled(prev => {
      const next = { ...prev, [id]: activeColor }
      if (Object.keys(next).length >= MURAL_SECTIONS.length) setDone(true)
      return next
    })
  }

  const won = filledCount >= MURAL_SECTIONS.length
  if (done) return <EggResult egg={egg} won={won} onContinue={() => onResult(won)} />

  return (
    <div style={{ position: 'fixed', inset: 0, background: egg.bgColor, display: 'flex', flexDirection: 'column', padding: 20 }}>
      <GameHeader egg={egg} title={egg.gameTitle} timeLeft={timeLeft} maxTime={TIME} />
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center', marginBottom: 6 }}>
        {egg.gameInstructions}
      </div>
      {/* Color palette */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
        {MURAL_COLORS.map(c => (
          <button key={c} onClick={() => setActiveColor(c)} style={{
            width: 32, height: 32, borderRadius: '50%', background: c, border: 'none',
            cursor: 'pointer', outline: activeColor === c ? `3px solid #fff` : 'none',
            outlineOffset: 2, transform: activeColor === c ? 'scale(1.2)' : 'none',
            transition: 'all 0.15s',
          }}/>
        ))}
      </div>
      {/* Mural canvas */}
      <div style={{
        position: 'relative', flex: 1,
        background: '#1a1008', borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        {MURAL_SECTIONS.map(s => (
          <button key={s.id} onClick={() => fill(s.id)} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.w}%`, height: `${s.h}%`,
            background: filled[s.id] ? `${filled[s.id]}cc` : 'rgba(255,255,255,0.05)',
            border: filled[s.id] ? `2px solid ${filled[s.id]}` : '2px dashed rgba(255,255,255,0.15)',
            borderRadius: 12, cursor: filled[s.id] ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 2,
            fontSize: filled[s.id] ? 28 : 24,
            transition: 'background 0.2s, border 0.2s',
          }}>
            <span>{s.emoji}</span>
            {!filled[s.id] && (
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                {s.label}
              </span>
            )}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: egg.theme }}>
        {filledCount} / {MURAL_SECTIONS.length} painted
      </div>
    </div>
  )
}

// ─── Game: SHHHH the Bob! (birding_bob) ─────────────────────────────────────
// Tap speaker icons to lower volume. Tap Bob himself and it goes up. Silence to win.

function BirdingBobGame({ egg, onResult }) {
  const TIME = 20
  const [volume, setVolume] = useState(8)
  const [timeLeft, setTimeLeft] = useState(TIME)
  const [done, setDone] = useState(false)
  const [bobPop, setBobPop] = useState(false)
  const [showBird, setShowBird] = useState(false)

  useEffect(() => {
    if (done) return
    if (timeLeft <= 0) { setDone(true); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, done])

  const tapSpeaker = () => {
    if (done) return
    setVolume(prev => {
      const next = Math.max(0, prev - 1)
      if (next === 0) { setShowBird(true); setTimeout(() => setDone(true), 1200) }
      return next
    })
  }

  const tapBob = () => {
    if (done) return
    setBobPop(true)
    setTimeout(() => setBobPop(false), 300)
    setVolume(prev => Math.min(10, prev + 2))
  }

  const won = volume === 0
  if (done) return <EggResult egg={egg} won={won} onContinue={() => onResult(won)} />

  const bars = Array.from({ length: 10 }, (_, i) => i < volume)

  return (
    <div style={{ position: 'fixed', inset: 0, background: egg.bgColor, display: 'flex', flexDirection: 'column', padding: 20 }}>
      <GameHeader egg={egg} title={egg.gameTitle} timeLeft={timeLeft} maxTime={TIME} />
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center', marginBottom: 16 }}>
        {egg.gameInstructions}
      </div>

      {/* Volume meter */}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 20 }}>
        {bars.map((on, i) => (
          <div key={i} style={{
            width: 18, height: 36 + i * 3,
            borderRadius: 4, alignSelf: 'flex-end',
            background: on
              ? (i > 6 ? '#ef4444' : i > 3 ? '#f59e0b' : '#4ade80')
              : 'rgba(255,255,255,0.1)',
            transition: 'background 0.2s',
          }}/>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 900, color: volume > 6 ? '#ef4444' : volume > 3 ? '#f59e0b' : '#4ade80', marginBottom: 20 }}>
        Volume: {volume}/10
      </div>

      {/* Characters */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', flex: 1 }}>
        {/* Tap speaker button */}
        <button onClick={tapSpeaker} style={{
          background: 'rgba(74,222,128,0.1)',
          border: '2px solid rgba(74,222,128,0.3)',
          borderRadius: 16, padding: '20px 24px',
          cursor: 'pointer', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 52 }}>🔇</span>
          <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 700 }}>TAP TO SHUSH</span>
        </button>

        {/* Bob — tapping raises volume */}
        <button onClick={tapBob} style={{
          background: bobPop ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.06)',
          border: `2px solid ${bobPop ? 'rgba(239,68,68,0.6)' : 'rgba(239,68,68,0.2)'}`,
          borderRadius: 16, padding: '20px 24px',
          cursor: 'pointer', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8,
          transition: 'all 0.15s',
          transform: bobPop ? 'scale(1.1)' : 'none',
        }}>
          <span style={{ fontSize: 52 }}>📢</span>
          <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>DON'T TAP BOB</span>
        </button>
      </div>

      {/* Summer Tanager reveal */}
      {showBird && (
        <div className="animate-slideUp" style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)', borderRadius: 14, padding: '12px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, marginBottom: 4 }}>🔴🐦</div>
          <div style={{ fontSize: 14, color: '#4ade80', fontWeight: 700 }}>Summer Tanager spotted!</div>
        </div>
      )}
    </div>
  )
}

// ─── Game: The Yellow Chat Caper (mighty_birders) ────────────────────────────
// HL wanders. Tap him to redirect before the Chat disappears. Timer counts down.

function MightyBirdersGame({ egg, onResult }) {
  const TIME = 22
  const [hlPos, setHlPos]         = useState({ x: 50, y: 60 })
  const [chatVisible, setChatVisible] = useState(true)
  const [redirects, setRedirects] = useState(0)
  const [timeLeft, setTimeLeft]   = useState(TIME)
  const [done, setDone]           = useState(false)
  const [teamAlerted, setTeamAlerted] = useState(false)
  const hlRef = useRef(null)

  // HL wanders randomly every 1.2s
  useEffect(() => {
    if (done) return
    const wander = setInterval(() => {
      setHlPos({
        x: Math.max(5, Math.min(85, Math.random() * 90)),
        y: Math.max(40, Math.min(75, 40 + Math.random() * 35)),
      })
    }, 1200)
    return () => clearInterval(wander)
  }, [done])

  // Chat disappears after 14s if not all redirects done
  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setChatVisible(false), 14000)
    return () => clearTimeout(t)
  }, [done])

  // Timer
  useEffect(() => {
    if (done) return
    if (timeLeft <= 0) { setDone(true); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, done])

  const tapHL = () => {
    if (done) return
    const next = redirects + 1
    setRedirects(next)
    // Move HL toward the bird area
    setHlPos({ x: 40 + Math.random() * 20, y: 25 + Math.random() * 15 })
    if (next >= 3 && chatVisible) {
      setTeamAlerted(true)
      setTimeout(() => setDone(true), 1400)
    }
  }

  const won = redirects >= 3 && chatVisible
  if (done) return <EggResult egg={egg} won={won} onContinue={() => onResult(won)} />

  return (
    <div style={{ position: 'fixed', inset: 0, background: egg.bgColor, display: 'flex', flexDirection: 'column', padding: 20 }}>
      <GameHeader egg={egg} title={egg.gameTitle} timeLeft={timeLeft} maxTime={TIME} />
      <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center', marginBottom: 8 }}>
        {egg.gameInstructions}
      </div>
      <div style={{ fontSize: 13, color: egg.theme, textAlign: 'center', marginBottom: 4, fontWeight: 700 }}>
        HL redirected: {redirects} / 3 needed {!chatVisible && '· Chat gone! ❌'}
      </div>

      {/* Field area */}
      <div style={{
        position: 'relative', flex: 1,
        background: 'rgba(255,255,255,0.03)', borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        {/* Team members (static) */}
        {[
          { emoji: '🦅', label: 'GT', x: 10, y: 20 },
          { emoji: '🦢', label: 'Stilt', x: 25, y: 22 },
          { emoji: '🦤', label: 'Least', x: 55, y: 20 },
          { emoji: '🐦', label: 'CW', x: 70, y: 22 },
        ].map(m => (
          <div key={m.label} style={{
            position: 'absolute', left: `${m.x}%`, top: `${m.y}%`,
            fontSize: 28, textAlign: 'center', pointerEvents: 'none',
          }}>
            {m.emoji}
            <div style={{ fontSize: 8, color: 'var(--text-dim)', textAlign: 'center' }}>{m.label}</div>
          </div>
        ))}

        {/* Yellow Chat */}
        {chatVisible && (
          <div style={{
            position: 'absolute', left: '45%', top: '8%',
            fontSize: 32, pointerEvents: 'none',
            animation: 'birdFloat 2s ease-in-out infinite',
          }}>
            🟡🐦
            <div style={{ fontSize: 9, color: '#fbbf24', textAlign: 'center', fontWeight: 700 }}>CHAT!</div>
          </div>
        )}

        {/* HL — wandering, tappable */}
        <button ref={hlRef} onClick={tapHL} style={{
          position: 'absolute',
          left: `${hlPos.x}%`, top: `${hlPos.y}%`,
          background: 'rgba(96,165,250,0.15)',
          border: '2px solid rgba(96,165,250,0.4)',
          borderRadius: 12, padding: '6px 10px',
          cursor: 'pointer', fontSize: 28,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          transition: 'left 0.6s ease, top 0.6s ease',
          zIndex: 10,
        }}>
          🚶
          <span style={{ fontSize: 9, color: '#60a5fa', fontWeight: 700 }}>HL — TAP!</span>
        </button>

        {teamAlerted && (
          <div style={{
            position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#4ade80', fontWeight: 900,
            animation: 'starBurst 0.4s ease both',
            whiteSpace: 'nowrap',
          }}>
            All 5 on target! ✓
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Shared header ──────────────────────────────────────────────────────────

function GameHeader({ egg, title, timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100
  const barColor = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : egg.theme
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: egg.textColor || 'var(--text-primary)' }}>
          {title}
        </div>
        <div style={{
          fontSize: 16, fontWeight: 900,
          color: timeLeft <= 5 ? '#ef4444' : egg.theme,
          fontFamily: 'monospace',
          animation: timeLeft <= 5 ? 'pulse 0.5s ease-in-out infinite' : 'none',
        }}>
          {timeLeft}s
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: barColor, borderRadius: 2,
          transition: 'width 1s linear, background 0.3s',
        }}/>
      </div>
    </div>
  )
}

// ─── Router ──────────────────────────────────────────────────────────────────

const GAME_MAP = {
  audubon:        AudubonGame,
  gitler:         GitlerGame,
  birding_bob:    BirdingBobGame,
  mighty_birders: MightyBirdersGame,
}

export default function EasterEggGame({ egg, onComplete }) {
  const Game = GAME_MAP[egg.id]
  if (!Game) return null
  return <Game egg={egg} onResult={(won) => onComplete({ won, points: won ? egg.winPoints : egg.losePoints })} />
}
