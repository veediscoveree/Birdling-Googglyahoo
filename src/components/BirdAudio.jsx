// Bird. Here. Now. — Audio Player
// Streams CC-licensed recordings from xeno-canto.org.
// Uses a rendered <audio> DOM element for reliable iOS/mobile playback.

import { useRef, useState } from 'react'
import { useXenoCantoAudio } from '../hooks/useXenoCantoAudio'

const QUALITY_COLOR = { A: '#3ddc7f', B: '#a8d878', C: '#f5a623', D: '#ff8a65', E: '#ff5555' }

export default function BirdAudio({ bird }) {
  const speciesName = bird.xenoCantoSpecies || bird.scientificName
  const { songs, calls, loading, apiError, noKey } = useXenoCantoAudio(speciesName)
  const [playing, setPlaying] = useState(null)
  const [failed, setFailed]   = useState({})      // recId → error text
  const audioRef   = useRef(null)
  const attemptRef = useRef(null)                 // { rec, idx } currently loading

  // Try each candidate URL for a recording in turn; surface the real error if all fail.
  const startAttempt = (rec, idx) => {
    const audio = audioRef.current
    const urls = rec.urls && rec.urls.length ? rec.urls : [rec.url]
    if (!audio) return
    if (idx >= urls.length) {
      const code = audio.error ? audio.error.code : '?'
      setPlaying(null)
      setFailed(f => ({ ...f, [rec.id]: `Couldn't play (media error ${code})` }))
      return
    }
    attemptRef.current = { rec, idx }
    audio.src = urls[idx]
    audio.load()                       // load() before play() is required on iOS
    const p = audio.play()
    if (p && p.catch) p.catch(err => {
      if (err && err.name === 'AbortError') return          // superseded by another tap
      if (attemptRef.current && attemptRef.current.rec.id === rec.id && attemptRef.current.idx === idx) {
        startAttempt(rec, idx + 1)
      }
    })
  }

  const play = (rec) => {
    const audio = audioRef.current
    if (!audio || !rec.url) return
    if (playing === rec.id) {          // tapping the active row stops playback
      audio.pause()
      attemptRef.current = null
      setPlaying(null)
      return
    }
    setFailed(f => { const n = { ...f }; delete n[rec.id]; return n })
    setPlaying(rec.id)
    startAttempt(rec, 0)
  }

  const handleAudioError = () => {
    const at = attemptRef.current
    if (at) startAttempt(at.rec, at.idx + 1)
  }

  if (loading) return (
    <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
      <div style={{ fontSize: 24, marginBottom: 8, animation: 'pulse 1.5s infinite' }}>🎵</div>
      Loading recordings…
    </div>
  )

  if (!songs.length && !calls.length) return (
    <div style={{ padding: '24px 16px', background: 'var(--bg-card)', borderRadius: 12, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
      {noKey
        ? <>Bird sounds need a free xeno-canto key.<br/>
            <span style={{ fontSize: 12, opacity: 0.85 }}>Add one in the DEV panel to enable audio.</span><br/>
            <a href={`https://xeno-canto.org/explore?query=${encodeURIComponent(speciesName)}`}
               target="_blank" rel="noopener noreferrer"
               style={{ color: 'var(--accent-sky)', marginTop: 6, display: 'inline-block' }}>
              Meanwhile, listen on xeno-canto.org ↗
            </a></>
        : apiError
        ? <>Audio unavailable — xeno-canto.org could not be reached.<br/>
            <a href={`https://xeno-canto.org/explore?query=${encodeURIComponent(speciesName)}`}
               target="_blank" rel="noopener noreferrer"
               style={{ color: 'var(--accent-sky)', marginTop: 6, display: 'inline-block' }}>
              Listen on xeno-canto.org ↗
            </a></>
        : 'No recordings found for this species.'}
    </div>
  )

  const RecordingRow = ({ rec }) => {
    const active = playing === rec.id
    return (
      <div
        onClick={() => play(rec)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px',
          background: active ? 'rgba(61,220,127,0.08)' : 'var(--bg-card)',
          border: `1px solid ${active ? 'rgba(61,220,127,0.3)' : 'rgba(255,255,255,0.05)'}`,
          borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 6,
        }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: active ? 'var(--accent-green)' : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: active ? '#051008' : 'var(--text-secondary)',
        }}>
          {active ? '■' : '▶'}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--accent-green)' : 'var(--text-primary)', textTransform: 'capitalize' }}>
            {rec.type || 'Recording'}
            {active && <span style={{ marginLeft: 8, fontSize: 11, animation: 'pulse 1s infinite' }}>♪ playing</span>}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {rec.recordist} · {rec.location || rec.country} · {rec.length}
          </div>
          {failed[rec.id] && (
            <div style={{ fontSize: 11, color: '#ff8a65', marginTop: 3 }}>{failed[rec.id]}</div>
          )}
        </div>

        <div style={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
          background: `${QUALITY_COLOR[rec.quality] || '#888'}22`,
          border: `1px solid ${QUALITY_COLOR[rec.quality] || '#888'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, color: QUALITY_COLOR[rec.quality] || '#888',
        }}>
          {rec.quality}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Rendered <audio> element — required for reliable iOS/mobile playback */}
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => setPlaying(null)}
        onError={handleAudioError}
        style={{ display: 'none' }}
      />

      {songs.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>SONGS ({songs.length})</div>
          {songs.map(rec => <RecordingRow key={rec.id} rec={rec} />)}
        </div>
      )}

      {calls.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>CALLS ({calls.length})</div>
          {calls.map(rec => <RecordingRow key={rec.id} rec={rec} />)}
        </div>
      )}

      <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5, marginTop: 4 }}>
        Recordings from{' '}
        <a href="https://xeno-canto.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-sky)' }}>xeno-canto.org</a>
        {' '}· Licensed CC BY or CC BY-NC-SA per recording.
      </div>
    </div>
  )
}
