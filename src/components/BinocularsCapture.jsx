// Bird. Here. Now. — Binoculars Capture Mechanic
//
// Core gameplay: the user raises their phone, binoculars appear, and they
// must track the moving bird in the lens until focus is held for 2 seconds.
//
// Controls:
//   Mobile  — DeviceOrientationEvent (tilt phone to aim binoculars)
//   Desktop — Mouse move (relative to screen center)
//
// Bird movement is species-specific: ground birds hop, raptors soar slowly,
// herons stalk, mallards swim side-to-side, etc.

import { useState, useEffect, useRef, useCallback } from 'react'
import { BirdAvatar } from './BirdAvatars'

// ── Constants ──────────────────────────────────────────────────────────────
const CAPTURE_TIME_MS  = 2000   // hold focus this long to capture
const ENCOUNTER_TIME_MS = 30000 // total time before bird flees
const FOCUS_RADIUS     = 0.18   // fraction of lens radius to count as "in focus"
const MAX_FLEES        = 2      // bird flees this many times before leaving

// ── Species movement patterns ──────────────────────────────────────────────
const PATTERNS = {
  hopping: {
    // Ground birds (robin, cardinal): quick hops with pauses
    update: (pos, vel, frame) => {
      const isHop = frame % 40 < 5
      const dx = isHop ? (Math.random() - 0.5) * 0.25 : (Math.random() - 0.5) * 0.008
      const dy = isHop ? (Math.random() - 0.5) * 0.20 : (Math.random() - 0.5) * 0.006
      return {
        x: clamp(pos.x + dx, -0.7, 0.7),
        y: clamp(pos.y + dy, -0.6, 0.6),
      }
    },
  },
  darting: {
    // Small birds (chickadee, goldfinch): constant quick motion
    update: (pos, vel, frame) => ({
      x: clamp(pos.x + vel.x + (Math.random() - 0.5) * 0.04, -0.7, 0.7),
      y: clamp(pos.y + vel.y + (Math.random() - 0.5) * 0.04, -0.6, 0.6),
    }),
    initVel: () => ({ x: (Math.random() - 0.5) * 0.03, y: (Math.random() - 0.5) * 0.02 }),
    velDecay: 0.92,
  },
  soaring: {
    // Hawks: slow circular motion
    update: (pos, vel, frame) => {
      const angle = frame * 0.018
      const r = 0.45
      return {
        x: Math.sin(angle) * r + (Math.random() - 0.5) * 0.01,
        y: Math.cos(angle) * r * 0.5 + (Math.random() - 0.5) * 0.01,
      }
    },
  },
  swimming: {
    // Mallard: slow side-to-side sway
    update: (pos, vel, frame) => ({
      x: Math.sin(frame * 0.025) * 0.55 + (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.06 + pos.y * 0.98,
    }),
  },
  stalking: {
    // Heron: almost still, very slow creep
    update: (pos, vel, frame) => ({
      x: clamp(pos.x + (Math.random() - 0.5) * 0.004, -0.5, 0.5),
      y: clamp(pos.y + (Math.random() - 0.5) * 0.003, -0.4, 0.4),
    }),
  },
  perching: {
    // Blue Jay: mostly still, occasional dart
    update: (pos, vel, frame) => {
      const dart = frame % 80 === 0
      return {
        x: dart ? clamp(pos.x + (Math.random() - 0.5) * 0.4, -0.7, 0.7) : clamp(pos.x + (Math.random() - 0.5) * 0.005, -0.7, 0.7),
        y: dart ? clamp(pos.y + (Math.random() - 0.5) * 0.3, -0.6, 0.6) : clamp(pos.y + (Math.random() - 0.5) * 0.005, -0.6, 0.6),
      }
    },
  },
}

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)) }

function getPattern(bird) {
  return PATTERNS[bird.captureStats.movementPattern] || PATTERNS.perching
}

// ── Component ──────────────────────────────────────────────────────────────
export default function BinocularsCapture({ bird, onSuccess, onMiss }) {
  // Bird world position (−1 to 1 on each axis)
  const birdPos   = useRef({ x: 0.3, y: 0.1 })
  const birdVel   = useRef({ x: 0.01, y: 0.005 })
  const frameRef  = useRef(0)
  const animRef   = useRef(null)

  // User view offset (where binoculars are pointed)
  const viewOffset    = useRef({ x: 0, y: 0 })
  const prevViewOffset = useRef({ x: 0, y: 0 })
  const orientRef     = useRef({ beta: 0, gamma: 0 })

  // Game state refs (to avoid stale closures in rAF)
  const focusTimerRef   = useRef(0)
  const fleeCountRef    = useRef(0)
  const gameTimeRef     = useRef(ENCOUNTER_TIME_MS)
  const gameActiveRef   = useRef(true)

  // React state (rendered)
  const [focusPct, setFocusPct]         = useState(0)   // 0–100 progress
  const [inFocus, setInFocus]           = useState(false)
  const [timeLeft, setTimeLeft]         = useState(ENCOUNTER_TIME_MS / 1000)
  const [fleeCount, setFleeCount]       = useState(0)
  const [birdFled, setBirdFled]         = useState(false)
  const [captureFlash, setCaptureFlash] = useState(false)
  const [viewPos, setViewPos]           = useState({ x: 0, y: 0 }) // rendered bird in-lens pos
  const [started, setStarted]           = useState(false)
  const [speedWarning, setSpeedWarning] = useState(false)

  // Lens container for mouse tracking
  const lensRef = useRef(null)

  // ── Device orientation (mobile) ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (!gameActiveRef.current) return
      // beta: forward/back tilt (−180 to 180), gamma: left/right (−90 to 90)
      orientRef.current = { beta: e.beta || 0, gamma: e.gamma || 0 }
    }
    window.addEventListener('deviceorientation', handler)
    return () => window.removeEventListener('deviceorientation', handler)
  }, [])

  // ── Mouse control (desktop) ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (!gameActiveRef.current || !lensRef.current) return
      const rect = lensRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      viewOffset.current = {
        x: clamp((e.clientX - cx) / (rect.width * 0.4), -1, 1),
        y: clamp((e.clientY - cy) / (rect.height * 0.4), -1, 1),
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // Touch drag control
  useEffect(() => {
    let startTouch = null
    const onStart = (e) => { startTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY, ox: viewOffset.current.x, oy: viewOffset.current.y } }
    const onMove  = (e) => {
      if (!startTouch || !gameActiveRef.current) return
      const dx = (e.touches[0].clientX - startTouch.x) / 120
      const dy = (e.touches[0].clientY - startTouch.y) / 120
      viewOffset.current = { x: clamp(startTouch.ox + dx, -1, 1), y: clamp(startTouch.oy + dy, -1, 1) }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove',  onMove,  { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  // ── Main game loop ────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    if (started) return
    setStarted(true)
    gameActiveRef.current = true

    const pattern = getPattern(bird)
    const speedThreshold = 0.06 + (10 - bird.captureStats.flightiness) * 0.01

    let lastTime = performance.now()

    const loop = (now) => {
      if (!gameActiveRef.current) return

      const dt = Math.min(now - lastTime, 50) // cap at 50ms
      lastTime = now
      const frame = ++frameRef.current

      // ── Update view from orientation (mobile) ──────────────────────────
      const { beta, gamma } = orientRef.current
      if (Math.abs(beta) > 1 || Math.abs(gamma) > 1) {
        // Map gamma (tilt left/right, −90..90) and beta − 45 (forward tilt offset)
        viewOffset.current = {
          x: clamp(gamma / 40, -1, 1),
          y: clamp((beta - 45) / 30, -1, 1),
        }
      }

      // ── Check for fast movement (spook bird) ──────────────────────────
      const vx = Math.abs(viewOffset.current.x - prevViewOffset.current.x)
      const vy = Math.abs(viewOffset.current.y - prevViewOffset.current.y)
      const viewSpeed = Math.sqrt(vx * vx + vy * vy)
      prevViewOffset.current = { ...viewOffset.current }

      if (viewSpeed > speedThreshold && fleeCountRef.current < MAX_FLEES) {
        setSpeedWarning(true)
        setTimeout(() => setSpeedWarning(false), 600)
      }

      // ── Update bird position ───────────────────────────────────────────
      const newPos = pattern.update(birdPos.current, birdVel.current, frame)
      birdPos.current = newPos

      if (pattern.initVel && birdVel.current.x === 0.01) {
        birdVel.current = pattern.initVel()
      }
      if (pattern.velDecay) {
        birdVel.current.x *= pattern.velDecay
        birdVel.current.y *= pattern.velDecay
        if (Math.abs(birdVel.current.x) < 0.001) birdVel.current = pattern.initVel()
      }

      // ── Compute in-lens position (bird relative to view center) ───────
      const inViewX = birdPos.current.x - viewOffset.current.x
      const inViewY = birdPos.current.y - viewOffset.current.y
      const dist = Math.sqrt(inViewX * inViewX + inViewY * inViewY)

      // Update rendered position (clamped for display)
      setViewPos({ x: clamp(inViewX, -1.2, 1.2), y: clamp(inViewY, -1.2, 1.2) })

      // ── Focus logic ────────────────────────────────────────────────────
      const focused = dist < FOCUS_RADIUS
      setInFocus(focused)

      if (focused) {
        focusTimerRef.current = Math.min(focusTimerRef.current + dt, CAPTURE_TIME_MS)
      } else {
        focusTimerRef.current = Math.max(focusTimerRef.current - dt * 0.4, 0)
      }
      setFocusPct(Math.round((focusTimerRef.current / CAPTURE_TIME_MS) * 100))

      // ── Capture! ────────────────────────────────────────────────────────
      if (focusTimerRef.current >= CAPTURE_TIME_MS) {
        gameActiveRef.current = false
        setCaptureFlash(true)
        setTimeout(onSuccess, 600)
        return
      }

      // ── Countdown timer ────────────────────────────────────────────────
      gameTimeRef.current -= dt
      setTimeLeft(Math.ceil(gameTimeRef.current / 1000))

      if (gameTimeRef.current <= 0) {
        gameActiveRef.current = false
        setBirdFled(true)
        setTimeout(onMiss, 1800)
        return
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
  }, [bird, started, onSuccess, onMiss])

  useEffect(() => {
    return () => {
      gameActiveRef.current = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // ── Lens rendering helpers ────────────────────────────────────────────────
  const LENS_R = 110        // CSS pixel radius of each lens
  const birdX = viewPos.x * LENS_R * 0.7
  const birdY = viewPos.y * LENS_R * 0.7
  const focusBlur = inFocus ? 0 : Math.min(3, (Math.sqrt(viewPos.x ** 2 + viewPos.y ** 2) - FOCUS_RADIUS) * 5)
  const focusColor = inFocus ? '#3ddc7f' : '#ffffff40'

  const lensContent = (parallaxX = 0) => (
    <div style={{
      width: LENS_R * 2,
      height: LENS_R * 2,
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'radial-gradient(circle, #0a180c 0%, #050f06 100%)',
      position: 'relative',
      border: `3px solid #2a3a2a`,
    }}>
      {/* Ambient texture */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.04) 0%, transparent 60%)',
      }}/>

      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0 }} width={LENS_R * 2} height={LENS_R * 2}>
        <clipPath id="lensClip"><circle cx={LENS_R} cy={LENS_R} r={LENS_R - 3}/></clipPath>
        <g clipPath="url(#lensClip)" opacity="0.12">
          <line x1={LENS_R} y1="0" x2={LENS_R} y2={LENS_R * 2} stroke="#00ff88" strokeWidth="0.8"/>
          <line x1="0" y1={LENS_R} x2={LENS_R * 2} y2={LENS_R} stroke="#00ff88" strokeWidth="0.8"/>
        </g>
        {/* Focus ring */}
        <circle
          cx={LENS_R + birdX + parallaxX}
          cy={LENS_R + birdY}
          r={inFocus ? 32 : 48}
          fill="none"
          stroke={focusColor}
          strokeWidth={inFocus ? 2.5 : 1.5}
          style={{ transition: 'r 0.15s, stroke 0.15s', animation: inFocus ? 'pulse 0.8s infinite' : 'none' }}
        />
        {/* Corner brackets when in focus */}
        {inFocus && (
          <g stroke="#3ddc7f" strokeWidth="2.5" fill="none">
            <path d={`M ${LENS_R + birdX + parallaxX - 28} ${LENS_R + birdY - 28} l 0 -12 l 12 0`}/>
            <path d={`M ${LENS_R + birdX + parallaxX + 28} ${LENS_R + birdY - 28} l 0 -12 l -12 0`}/>
            <path d={`M ${LENS_R + birdX + parallaxX - 28} ${LENS_R + birdY + 28} l 0 12 l 12 0`}/>
            <path d={`M ${LENS_R + birdX + parallaxX + 28} ${LENS_R + birdY + 28} l 0 12 l -12 0`}/>
          </g>
        )}
      </svg>

      {/* Bird avatar */}
      <div style={{
        position: 'absolute',
        left: LENS_R + birdX + parallaxX - 40,
        top:  LENS_R + birdY - 45,
        filter: `blur(${focusBlur}px)`,
        transition: 'filter 0.1s',
      }}>
        <BirdAvatar birdId={bird.id} size={80} animated={started}/>
      </div>

      {/* Lens edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, transparent 55%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
      }}/>
    </div>
  )

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="screen" style={{
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 0 24px',
      userSelect: 'none',
    }}>

      {/* Capture flash overlay */}
      {captureFlash && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'white',
          zIndex: 100,
          animation: 'captureFlash 0.6s ease forwards',
          pointerEvents: 'none',
        }}/>
      )}

      {/* Bird fled overlay */}
      {birdFled && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          <div style={{ fontSize: 52 }}>🐦</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>
            It flew away…
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>
            Move more slowly next time.
          </div>
        </div>
      )}

      {/* ── Top HUD ──────────────────────────────────────────────────────── */}
      <div style={{
        width: '100%', padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1 }}>CAPTURING</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)' }}>
            {bird.commonName}
          </div>
        </div>
        {/* Countdown */}
        <div style={{
          background: timeLeft <= 10 ? 'rgba(255,85,85,0.15)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${timeLeft <= 10 ? '#ff5555' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 20,
          padding: '5px 14px',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          color: timeLeft <= 10 ? '#ff5555' : 'var(--text-primary)',
          transition: 'all 0.3s',
        }}>
          {timeLeft}s
        </div>
      </div>

      {/* ── Speed warning ──────────────────────────────────────────────── */}
      {speedWarning && (
        <div style={{
          position: 'absolute',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,165,0,0.15)',
          border: '1px solid rgba(255,165,0,0.4)',
          borderRadius: 20,
          padding: '5px 14px',
          fontSize: 12,
          color: 'orange',
          fontWeight: 600,
          zIndex: 20,
          animation: 'fadeIn 0.2s ease',
          whiteSpace: 'nowrap',
        }}>
          ⚠ Slow down — you'll spook it!
        </div>
      )}

      {/* ── Binoculars view ───────────────────────────────────────────── */}
      {!started ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}>
          <div style={{ fontSize: 64, animation: 'birdFloat 2s ease-in-out infinite' }}>🔭</div>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 15 }}>
            Raise your phone and look<br/>through the binoculars
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', maxWidth: 280 }}>
            On mobile: tilt the phone to track the bird.<br/>
            Move slowly — sudden movements will spook it!
          </div>
          <button className="btn btn-primary btn-lg" onClick={startGame} style={{ marginTop: 8, width: 220 }}>
            🔭 Start Tracking
          </button>
        </div>
      ) : (
        <div
          ref={lensRef}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* Binoculars body (figure-8 shape) */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Left lens */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {lensContent(-3)}
            </div>

            {/* Bridge */}
            <div style={{
              width: 24,
              height: 40,
              background: '#1a2a1c',
              zIndex: 1,
              border: '2px solid #2a3a2a',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)',
            }}/>

            {/* Right lens (slight parallax) */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {lensContent(3)}
            </div>
          </div>
        </div>
      )}

      {/* ── Focus progress bar ────────────────────────────────────────── */}
      {started && (
        <div style={{ width: '100%', padding: '8px 20px 0' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 11, color: inFocus ? 'var(--accent-green)' : 'var(--text-dim)',
            marginBottom: 5, transition: 'color 0.2s',
          }}>
            <span>{inFocus ? '● IN FOCUS' : '○ Searching…'}</span>
            <span>{focusPct}%</span>
          </div>
          <div style={{
            height: 6,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${focusPct}%`,
              background: inFocus
                ? 'linear-gradient(90deg, #2abc65, #3ddc7f)'
                : 'linear-gradient(90deg, #2a4a2e, #3a5a3e)',
              borderRadius: 3,
              transition: 'width 0.15s, background 0.2s',
              boxShadow: inFocus ? '0 0 8px rgba(61,220,127,0.5)' : 'none',
            }}/>
          </div>
          <div style={{
            marginTop: 8,
            fontSize: 12,
            color: 'var(--text-dim)',
            textAlign: 'center',
          }}>
            {inFocus
              ? 'Hold steady…'
              : `Track the ${bird.commonName} into the center`}
          </div>
        </div>
      )}
    </div>
  )
}
