// Bird. Here. Now. — Audio Player
// Streams CC-licensed recordings from xeno-canto.org.
// Uses a rendered <audio> DOM element for reliable iOS/mobile playback.

import { useRef, useState } from 'react'
import { useXenoCantoAudio } from '../hooks/useXenoCantoAudio'

const QUALITY_COLOR = { A: '#3ddc7f', B: '#a8d878', C: '#f5a623', D: '#ff8a65', E: '#ff5555' }

export default function BirdAudio({ bird }) {
  const speciesName = bird.xenoCantoSpecies || bird.scientificName
  const { songs, calls, loading, apiError } = useXenoCantoAudio(speciesName)
  const [playing, setPlaying] = useState(null)
  const audioRef = useRef(null)

  const play = (rec) => {
    const audio = audioRef.current
    if (!audio || !rec.url) return

    // Tapping the active row stops playback
    if (playing === rec.id) {
      audio.pause()
      setPlaying(null)
      return
    }

    // Switch source and play — load() is required before play() on iOS
    audio.src = rec.url
    audio.load()
    audio.play()
      .then(() => setPlaying(rec.id))
      .catch(() => setPlaying(null))
  }

  if (loading) return (
    <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
      <div style={{ fontSize: 24, marginBottom: 8, animation: 'pulse 1.5s infinite' }}>🎵</div>
      Loading recordings…
    </div>
  )

  if (!songs.length && !calls.length) return (
    <div style={{ padding: '24px 16px', background: 'var(--bg-card)', borderRadius: 12, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
      {apiError
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
        onError={() => setPlaying(null)}
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
