// Avatar review sheet: every species × every pose, scene on/off. Open with ?gallery=1
// (or from the DEV panel). Optional ?ids=a,b,c to show just some birds.
import { BIRDS } from '../data/birds'
import { BirdAvatar, AVATAR_POSES, hasNewAvatar } from './BirdAvatars'

export default function AvatarGallery({ onClose }) {
  const params = new URLSearchParams(window.location.search)
  const ids = params.get('ids')?.split(',')
  const list = ids ? BIRDS.filter(b => ids.includes(b.id)) : BIRDS
  const tile = +(params.get('size') || 124)        // ?size=260 for close review
  const both = params.has('both')                   // ?both=1 also shows scene=false
  const legacy = params.has('legacy')   // ?legacy=1 shows the old drawings for before/after
  const showPoses = !legacy && (params.has('poses') || !!ids)
  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', background: '#0b1618', zIndex: 20000, padding: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#cde', fontFamily: 'monospace', fontSize: 12, marginBottom: 8 }}>
        <span>AVATAR GALLERY · {list.length} birds · ★ = new style</span>
        {onClose && <button onClick={onClose} style={{ background: '#233', color: '#cde', border: '1px solid #456', borderRadius: 6, padding: '4px 10px' }}>Close</button>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {list.flatMap(b => (showPoses ? AVATAR_POSES(b.id) : [undefined]).flatMap(pose => (both ? [true, false] : [true]).map(sc => (
          <div key={b.id + pose + sc} data-bird={b.id} style={{ width: tile + 8, background: '#12242a', borderRadius: 8, padding: 4, textAlign: 'center' }}>
            <BirdAvatar birdId={b.id} size={tile} pose={pose ?? 0} legacy={legacy} scene={sc} />
            <div style={{ color: hasNewAvatar(b.id) ? '#7fe0a8' : '#9ab', fontSize: 10, fontFamily: 'monospace', lineHeight: 1.2 }}>
              {hasNewAvatar(b.id) ? '★ ' : ''}{b.commonName}{pose ? ` · ${pose}` : ''}{sc ? '' : ' · no scene'}
            </div>
          </div>
        ))))}
      </div>
    </div>
  )
}
