// Bird. Here. Now. — Capture Success Screen

import { useEffect, useState, useRef } from 'react'
import { BirdAvatar } from './BirdAvatars'
import { getRarityLabel } from '../data/birds'
import { useXenoCantoAudio, pickBestSong } from '../hooks/useXenoCantoAudio'

export default function CaptureSuccess({ bird, isNew, score, funFact, onViewAviary, onContinue }) {
  const [showContent, setShowContent] = useState(false)
  const [stars, setStars]             = useState([])
  const [songPlaying, setSongPlaying] = useState(false)
  const loopAudioRef = useRef(null)

  // Fetch recordings (uses localStorage cache — fast on repeat visits)
  const { songs, loading: audioLoading } = useXenoCantoAudio(bird.xenoCantoSpecies)

  // ── Auto-play best song on loop once recordings are ready ────────────────
  useEffect(() => {
    if (audioLoading || !songs.length) return
    const best = pickBestSong(songs, 10)
    if (!best?.url) return

    const audio = new Audio(best.url)
    audio.loop  = true
    loopAudioRef.current = audio
    audio.play()
      .then(() => setSongPlaying(true))
      .catch(() => {/* autoplay blocked — user can tap to play manually */})

    return () => { audio.pause(); audio.src = '' }
  }, [audioLoading, songs])

  // ── Stop song when user navigates away ──────────────────────────────────
  const handleNav = (fn) => () => {
    if (loopAudioRef.current) { loopAudioRef.current.pause(); loopAudioRef.current = null }
    fn()
  }

  // ── Tap-to-play if autoplay was blocked ─────────────────────────────────
  const handleTapPlay = () => {
    if (loopAudioRef.current && !songPlaying) {
      loopAudioRef.current.play().then(() => setSongPlaying(true)).catch(() => {})
    } else if (loopAudioRef.current && songPlaying) {
      loopAudioRef.current.pause()
      setSongPlaying(false)
    }
  }

  useEffect(() => {
    setStars(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 60,
      size: 10 + Math.random() * 18,
      delay: Math.random() * 0.4,
      color: ['#ffd700','#3ddc7f','#f5a623','#5bc4e8','#ff8a65'][i % 5],
    })))
    const t = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(t)
  }, [])

  const bestSong = songs.length ? pickBestSong(songs, 10) : null

  return (
    <div className="screen" style={{
      background: isNew
        ? 'radial-gradient(ellipse at 50% 30%, #1a3a1c 0%, #0a1a0c 60%)'
        : 'radial-gradient(ellipse at 50% 30%, #1a2a1c 0%, #0a1a0c 60%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 24px 36px',
      overflow: 'hidden',
    }}>

      {/* ── Star burst particles ───────────────────────────────────────── */}
      {isNew && stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          fontSize: s.size,
          color: s.color,
          animation: `starBurst 0.6s ${s.delay}s ease both`,
          pointerEvents: 'none',
          zIndex: 0,
        }}>★</div>
      ))}

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', zIndex: 1, animation: 'slideDown 0.4s ease' }}>
        <div style={{
          fontSize: 13, letterSpacing: 2, fontWeight: 700,
          color: isNew ? 'var(--accent-green)' : 'var(--accent-amber)',
          textTransform: 'uppercase', marginBottom: 4,
        }}>
          {isNew ? '★ New Species!' : 'Resighting'}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
          {isNew ? 'Captured!' : 'Seen Again'}
        </div>
      </div>

      {/* ── Bird display ──────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', zIndex: 1, gap: 16,
      }}>
        {/* Glow halo */}
        <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `radial-gradient(circle, ${bird.appearance.uiColor}30 0%, transparent 70%)`,
            animation: 'glowPulse 1.5s ease-in-out infinite',
          }}/>
          <div style={{ animation: showContent ? 'starBurst 0.5s ease both' : 'none' }}>
            <BirdAvatar birdId={bird.id} size={150} animated={true}/>
          </div>
        </div>

        {/* Bird info */}
        {showContent && (
          <div className="animate-slideUp" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
              {bird.commonName}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic', marginTop: 2 }}>
              {bird.scientificName}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <span className={`rarity-badge rarity-${bird.rarity}`}>
                {getRarityLabel(bird.rarity)}
              </span>
              <span className="points-badge">
                +{isNew ? bird.points : Math.floor(bird.points * 0.1)} pts
              </span>
              {/* Song indicator — tap to toggle */}
              {bestSong && (
                <button
                  onClick={handleTapPlay}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: songPlaying ? 'rgba(61,220,127,0.15)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${songPlaying ? 'rgba(61,220,127,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 99, padding: '4px 10px',
                    fontSize: 12, fontWeight: 600,
                    color: songPlaying ? 'var(--accent-green)' : 'var(--text-dim)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ animation: songPlaying ? 'pulse 1.2s infinite' : 'none' }}>♪</span>
                  {songPlaying ? 'Song playing' : 'Tap to play song'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Teaser description ────────────────────────────────────────── */}
      {showContent && (
        <div className="animate-slideUp" style={{
          background: 'var(--bg-card)', borderRadius: 16, padding: '14px 16px',
          width: '100%', border: '1px solid rgba(255,255,255,0.07)', zIndex: 1,
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 6 }}>
            FIELD GUIDE — UNLOCKED
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            {funFact || bird.funFact}
          </div>
        </div>
      )}

      {/* ── Action buttons ─────────────────────────────────────────────── */}
      {showContent && (
        <div className="animate-slideUp" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', zIndex: 1 }}>
          <button className="btn btn-primary btn-lg" onClick={handleNav(onViewAviary)}>
            🪶 View in Aviary
          </button>
          <button className="btn btn-outline" onClick={handleNav(onContinue)}>
            Keep Exploring
          </button>
        </div>
      )}
    </div>
  )
}
