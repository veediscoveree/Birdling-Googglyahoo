// Bird. Here. Now. — Photo Gallery
// Pulls CC-licensed photos from Wikimedia Commons.

import { useState } from 'react'
import { useWikimediaPhotos } from '../hooks/useWikimediaPhotos'

export default function BirdPhotos({ bird }) {
  const { photos, loading, error } = useWikimediaPhotos(bird.wikimediaSearchTerms)
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (loading) return (
    <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
      <div style={{ fontSize: 24, marginBottom: 8, animation: 'pulse 1.5s infinite' }}>📷</div>
      Loading photos…
    </div>
  )

  if (error || photos.length === 0) return (
    <div style={{
      padding: '24px 16px',
      background: 'var(--bg-card)',
      borderRadius: 12,
      textAlign: 'center',
      color: 'var(--text-dim)',
      fontSize: 13,
    }}>
      Photos unavailable offline.<br/>
      <a href={`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(bird.commonName)}&ns6=1`}
        target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--accent-green)', marginTop: 6, display: 'inline-block' }}>
        Search Wikimedia Commons ↗
      </a>
    </div>
  )

  const photo = photos[selected]

  return (
    <div>
      {/* ── Main photo ─────────────────────────────────────────────────── */}
      <div
        onClick={() => setLightbox(true)}
        style={{
          borderRadius: 14,
          overflow: 'hidden',
          background: '#111',
          cursor: 'zoom-in',
          position: 'relative',
          marginBottom: 10,
        }}
      >
        <img
          src={photo.thumbUrl}
          alt={photo.description || bird.commonName}
          style={{
            width: '100%',
            display: 'block',
            maxHeight: 260,
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        {/* Caption overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '24px 12px 8px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          fontSize: 11,
          color: 'rgba(255,255,255,0.8)',
        }}>
          {photo.credit && `📷 ${photo.credit.slice(0, 60)}`}
          {photo.license && (
            <span style={{ marginLeft: 6, opacity: 0.7 }}>{photo.license}</span>
          )}
        </div>
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 6, padding: '3px 7px',
          fontSize: 11, color: 'rgba(255,255,255,0.8)',
        }}>
          {selected + 1} / {photos.length}
        </div>
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {photos.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            style={{
              width: 60, height: 60, flexShrink: 0,
              borderRadius: 8, overflow: 'hidden',
              border: `2px solid ${i === selected ? 'var(--accent-green)' : 'transparent'}`,
              cursor: 'pointer', background: '#111',
            }}
          >
            <img src={p.thumbUrl} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* ── Attribution note ─────────────────────────────────────────────── */}
      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5 }}>
        Photos from{' '}
        <a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--accent-sky)' }}>Wikimedia Commons</a>
        {' '}under Creative Commons licenses.
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
        >
          <img
            src={photo.fullUrl}
            alt={photo.description || bird.commonName}
            style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: 8, objectFit: 'contain' }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute', bottom: 24, left: 16, right: 16,
            fontSize: 12, color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
          }}>
            {photo.credit} · {photo.license} · Tap to close
          </div>
        </div>
      )}
    </div>
  )
}
