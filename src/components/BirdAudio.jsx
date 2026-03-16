// Bird. Here. Now. — Audio Player
// Streams CC-licensed recordings from xeno-canto.org.

import { useXenoCantoAudio } from '../hooks/useXenoCantoAudio'

const QUALITY_COLOR = { A: '#3ddc7f', B: '#a8d878', C: '#f5a623', D: '#ff8a65', E: '#ff5555' }

function RecordingRow({ rec, isPlaying, onPlay }) {
  return (
    <div
      onClick={() => onPlay(rec)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px',
        background: isPlaying ? 'rgba(61,220,127,0.08)' : 'var(--bg-card)',
        border: `1px solid ${isPlaying ? 'rgba(61,220,127,0.3)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'all 0.15s',
        marginBottom: 6,
      }}
    >
      {/* Play/stop button */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        background: isPlaying ? 'var(--accent-green)' : 'rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, color: isPlaying ? '#051008' : 'var(--text-secondary)',
        transition: 'all 0.15s',
      }}>
        {isPlaying ? '■' : '▶'}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 600,
          color: isPlaying ? 'var(--accent-green)' : 'var(--text-primary)',
          textTransform: 'capitalize',
        }}>
          {rec.type || 'Recording'}
          {isPlaying && (
            <span style={{ marginLeft: 8, fontSize: 11, animation: 'pulse 1s infinite' }}>
              ♪ playing
            </span>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {rec.recordist} · {rec.location || rec.country} · {rec.length}
        </div>
      </div>

      {/* Quality badge */}
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        background: `${QUALITY_COLOR[rec.quality] || '#888'}22`,
        border: `1px solid ${QUALITY_COLOR[rec.quality] || '#888'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 700,
        color: QUALITY_COLOR[rec.quality] || '#888',
      }}>
        {rec.quality}
      </div>
    </div>
  )
}

export default function BirdAudio({ bird }) {
  const speciesName = bird.xenoCantoSpecies || bird.scientificName
  const { songs, calls, loading, playing, play } = useXenoCantoAudio(speciesName)

  if (loading) return (
    <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
      <div style={{ fontSize: 24, marginBottom: 8, animation: 'pulse 1.5s infinite' }}>🎵</div>
      Loading recordings…
    </div>
  )

  const hasContent = songs.length > 0 || calls.length > 0

  if (!hasContent) return (
    <div style={{
      padding: '24px 16px', background: 'var(--bg-card)',
      borderRadius: 12, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13,
    }}>
      Audio unavailable offline.<br/>
      <a href={`https://xeno-canto.org/explore?query=${encodeURIComponent(speciesName)}`}
        target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--accent-green)', marginTop: 6, display: 'inline-block' }}>
        Find recordings on xeno-canto ↗
      </a>
    </div>
  )

  return (
    <div>
      {songs.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>
            SONGS ({songs.length})
          </div>
          {songs.map(rec => (
            <RecordingRow key={rec.id} rec={rec} isPlaying={playing === rec.id} onPlay={play}/>
          ))}
        </div>
      )}

      {calls.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>
            CALLS ({calls.length})
          </div>
          {calls.map(rec => (
            <RecordingRow key={rec.id} rec={rec} isPlaying={playing === rec.id} onPlay={play}/>
          ))}
        </div>
      )}

      <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5, marginTop: 4 }}>
        Recordings from{' '}
        <a href="https://xeno-canto.org" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--accent-sky)' }}>xeno-canto.org</a>
        {' '}· Licensed CC BY or CC BY-NC-SA per recording.
      </div>
    </div>
  )
}
