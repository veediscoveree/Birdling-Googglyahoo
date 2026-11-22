// Bald Eagle (adult) — style guide v2: true shape first, warmth second, finer habitat.
//
// Shape checklist: big bulky raptor; head SMALL relative to body (eagles look "front-heavy" because
// of the bill, not the head); flat crown + heavy brow; MASSIVE deep yellow bill, hooked tip hanging
// below the lower mandible; small pale-yellow eye; dark chocolate body with paler-edged coverts;
// feathered brown "trousers"; short yellow tarsi + big talons; WHITE head, neck and wedge-ish tail.
// Flight: very long, broad, PLANK wings (leading & trailing edges nearly parallel), held flat, with
// 6–7 deeply separated "finger" primaries; head projects about half the tail length ahead of wings.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'bald_eagle', poses: ['perch', 'soar'] }

const BRN = '#4A3221', DRK = '#2B1C12', EDGE = '#6E5137'
const WHT = '#F6F3EC', SHD = '#D9D3C6', YEL = '#F2B827', YDK = '#C98A12'

// ── Habitat: river valley in fall, layered for depth ─────────────────────────
function treeLine(y0, color, seed, h) {
  // irregular conifer + broadleaf silhouette, deterministic
  let d = `M 0 ${y0 + 6} L 0 ${y0}`, x = 0, r = seed
  const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280 }
  while (x < 118) {
    const w = Math.min(3 + rnd() * 4, 120 - x), top = y0 - h * (0.4 + rnd() * 0.6)
    if (rnd() < 0.55) d += ` L ${x + w / 2} ${top} L ${x + w} ${y0 - 1}`          // spruce spire
    else d += ` Q ${x + w / 2} ${top - 2} ${x + w} ${y0 - 1}`                     // rounded crown
    x += w
  }
  return <path d={`${d} L 120 ${y0 + 6} Z`} fill={color}/>
}

function Valley({ water = true }) {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#baeSky)"/>
      <path d="M 14 18 q 6 -4 12 0 q 5 -3 9 1 q -10 2 -21 -1 Z M 78 12 q 5 -3 10 0 q 4 -2 7 1 q -9 2 -17 -1 Z" fill="#FFFFFF" opacity="0.55"/>
      <path d="M 0 74 C 20 66 40 70 60 66 C 80 62 100 68 120 64 L 120 82 L 0 82 Z" fill="#8FA4B4" opacity="0.7"/>
      {treeLine(80, '#5C6B5A', 7, 9)}
      <path d="M 0 79 C 30 77 60 80 120 77 L 120 84 L 0 84 Z" fill="#B0763E" opacity="0.55"/>
      {treeLine(86, '#3E4D3C', 21, 7)}
      {water && <>
        <rect x="0" y="86" width="120" height="44" fill="url(#baeWater)"/>
        <path d="M 6 94 h 18 M 40 99 h 26 M 82 93 h 20 M 14 108 h 30 M 70 112 h 34 M 30 122 h 22" stroke="#DCEAF2" strokeWidth="0.9" opacity="0.55" strokeLinecap="round"/>
      </>}
    </g>
  )
}

// ── Perched eagle (faces left) ───────────────────────────────────────────────
function Perched({ blink, look }) {
  return (
    <g>
      {/* white tail below the branch */}
      <path d="M 57 96 L 69 95 L 74 120 C 69 123 62 123 58 120 Z" fill={WHT}/>
      <path d="M 61 99 L 62 120 M 65 98 L 67 121 M 69 97 L 71 120" stroke={SHD} strokeWidth="0.6"/>
      {/* body */}
      <path d="M 41 41 C 33 50 32 66 37 79 C 41 89 46 94 51 97 L 61 97 C 67 92 71 82 71 69 C 71 55 65 44 57 39 Z" fill="url(#baeBody)"/>
      {/* breast feather texture */}
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M ${37 + i * 1.2} ${54 + i * 7} q 4 2 8 0`} stroke={EDGE} strokeWidth="0.7" fill="none" opacity="0.7"/>)}
      {/* folded wing with paler-edged coverts and long primaries */}
      <path d="M 52 43 C 64 45 73 58 73 76 C 73 90 71 101 69 110 L 63 105 C 60 92 56 74 52 59 Z" fill={DRK}/>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M ${56 + i * 3} ${52 + i * 6} q 5 1 9 4`} stroke={EDGE} strokeWidth="0.9" fill="none"/>)}
      {[0, 1, 2, 3].map(i => <path key={`p${i}`} d={`M ${63 + i * 1.6} ${86 + i * 2} L ${65 + i * 1.3} ${108 - i * 2}`} stroke="#1A100A" strokeWidth="0.8"/>)}
      {/* trousers, tarsi, talons gripping */}
      <path d="M 45 86 C 47 93 49 97 54 99 C 56 96 56 91 54 87 Z" fill={BRN}/>
      <path d="M 50 97 L 49 101 M 55 98 L 55 101.5" stroke={YEL} strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M 46 101.5 q 3 -1.5 6 0 M 52 102 q 3 -1.5 6 0" stroke={YEL} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 45.5 101.6 l -1 2 M 51.5 102 l -1 2 M 58 102 l 1 2" stroke="#111" strokeWidth="0.9" strokeLinecap="round"/>
      {/* white head + neck, ragged edge into brown */}
      <g transform={`rotate(${look} 46 34)`}>
        <path d="M 31 29 C 31 21 38 16 46 16.5 C 53 17 58 22 58 30 L 58 41 L 55 44 L 53 41 L 50 45 L 47 41.5 L 44 44.5 L 41.5 41 C 36 40 31 36 31 29 Z" fill={WHT}/>
        <path d="M 50 22 C 54 25 56 30 56 36" stroke={SHD} strokeWidth="1.2" fill="none" opacity="0.8"/>
        {/* heavy brow + small pale eye */}
        <path d="M 33.5 25 C 36 23.2 40 23 43 24.6" stroke="#BFB6A4" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {blink
          ? <path d="M 36 27.6 q 2 1 4 0" stroke="#3A2A1A" strokeWidth="1" fill="none"/>
          : <g><circle cx="38" cy="27.6" r="2.3" fill="#F5E27A"/><circle cx="38" cy="27.6" r="1.15" fill="#111"/><circle cx="37.4" cy="27" r="0.55" fill="#FFF"/></g>}
        {/* massive hooked bill */}
        <path d="M 33.5 26.5 C 28 25.5 22.5 26.8 19.6 30 C 18 32 18 35 19.3 37.5 C 20.2 35.4 21.8 34.3 24 34.1 L 33.5 33.6 Z" fill={YEL}/>
        <path d="M 24 34.1 L 33.5 33.6 L 33.2 36.4 C 29.5 37.4 26.4 37 24.4 35.6 Z" fill={YDK}/>
        <path d="M 33.5 26.5 C 28 25.5 22.5 26.8 19.6 30 C 18 32 18 35 19.3 37.5" stroke={YDK} strokeWidth="0.7" fill="none"/>
        <path d="M 31 27 L 31 33.8" stroke={YDK} strokeWidth="0.6"/>
        <ellipse cx="29.4" cy="29" rx="1" ry="0.6" fill="#7A5410"/>
      </g>
    </g>
  )
}

// ── Soaring eagle, seen from below: head forward (up), tail behind (down), flat plank wings ──
function Wing({ s }) {
  // s = -1 left wing, +1 right wing. Leading edge: shoulder → slight wrist bulge → tip.
  const X = (x) => 60 + s * x
  const fingers = Array.from({ length: 7 }, (_, i) => {
    const rootX = 45.5 - i * 0.4, rootY = 40.5 + i * 3.1           // along the wing tip
    const len = [7.5, 9.5, 10.5, 10, 9, 7.5, 5.5][i]
    const ang = (-12 + i * 6.5) * Math.PI / 180                     // fan, upper ones swept forward
    const tx = rootX + Math.cos(ang) * len, ty = rootY + Math.sin(ang) * len - 1.2
    const nx = -Math.sin(ang) * 2.1, ny = Math.cos(ang) * 2.1
    return <path key={i} d={`M ${X(rootX)} ${rootY - 1.2} Q ${X((rootX + tx) / 2 - nx * 0.6)} ${(rootY + ty) / 2 - 1.8} ${X(tx)} ${ty} Q ${X((rootX + tx) / 2 + nx)} ${(rootY + ty) / 2 + ny} ${X(rootX)} ${rootY + 1.3} Z`} fill="#24170E"/>
  })
  return (
    <g>
      <path d={`M ${X(6)} 46 C ${X(14)} 42 ${X(26)} 40.5 ${X(34)} 41 C ${X(40)} 40.6 ${X(44)} 40 ${X(46)} 40.5
                L ${X(46)} 61 C ${X(36)} 62.5 ${X(24)} 63.5 ${X(14)} 63 C ${X(10)} 62.6 ${X(7)} 61 ${X(6)} 58 Z`} fill="url(#baeWing)"/>
      {/* secondaries: scalloped trailing edge */}
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${X(8 + i * 4.2)} ${60 + i * 0.25} q ${s * 2.1} 2.6 ${s * 4.2} 0`} fill="#24170E"/>)}
      {/* covert bands + paler edge along the leading coverts */}
      <path d={`M ${X(8)} 50 C ${X(20)} 47 ${X(34)} 46.5 ${X(45)} 47`} stroke={EDGE} strokeWidth="0.9" fill="none" opacity="0.75"/>
      <path d={`M ${X(9)} 55.5 C ${X(22)} 54 ${X(34)} 54 ${X(45)} 54.5`} stroke={EDGE} strokeWidth="0.6" fill="none" opacity="0.55"/>
      {fingers}
    </g>
  )
}

function Soaring() {
  return (
    <g>
      <Wing s={-1}/><Wing s={1}/>
      {/* broad white tail behind, slightly wedge-shaped */}
      <path d="M 54.5 71 L 65.5 71 L 69 87 C 63.5 89.5 56.5 89.5 51 87 Z" fill={WHT}/>
      <path d="M 57 73 L 56 87.5 M 60 73 L 60 89 M 63 73 L 64 87.5" stroke={SHD} strokeWidth="0.6"/>
      {/* body, dark, slightly tapered */}
      <path d="M 53 44 C 53 40 56 38 60 38 C 64 38 67 40 67 44 L 67.5 62 C 67 68 64 72 60 72.5 C 56 72 53 68 52.5 62 Z" fill="url(#baeBody)"/>
      {/* yellow feet tucked against the tail base */}
      <path d="M 56.5 68 q 0.5 3 -0.5 5 M 63.5 68 q -0.5 3 0.5 5" stroke={YEL} strokeWidth="1.7" strokeLinecap="round" fill="none"/>
      {/* white head + neck projecting forward, head turned so the bill shows in profile */}
      <path d="M 54 44 C 53.5 36 55.5 29.5 60 28.5 C 64.5 29.5 66.5 36 66 44 C 63 42.5 57 42.5 54 44 Z" fill={WHT}/>
      <path d="M 55.8 34.6 C 57 33.6 59 33.4 60.4 34" stroke="#BFB6A4" strokeWidth="1.1" fill="none"/>
      <circle cx="58.2" cy="35.6" r="1.15" fill="#F5E27A"/><circle cx="58.2" cy="35.6" r="0.6" fill="#111"/>
      <path d="M 56 33.8 C 53 33.4 50.5 34.4 49.3 36.2 C 48.6 37.4 48.7 38.9 49.4 40 C 49.9 38.9 50.7 38.3 51.8 38.2 L 56.3 37.8 Z" fill={YEL}/>
      <path d="M 51.8 38.2 L 56.3 37.8 L 56.1 39.4 C 54.2 39.9 52.7 39.6 51.9 38.8 Z" fill={YDK}/>
    </g>
  )
}

export default function BaldEagle({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const look = animated ? [0, 0, -3, -3, -3, 0, 0, 0, 2, 2, 0, 0][frame] : 0
  const drift = animated ? [0, -0.4, -0.8, -1, -0.8, -0.4, 0, 0.4, 0.8, 1, 0.8, 0.4][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Bald Eagle">
      <defs>
        <linearGradient id="baeSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9CC6E4"/><stop offset="100%" stopColor="#DCE9F0"/></linearGradient>
        <linearGradient id="baeWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6F95AE"/><stop offset="100%" stopColor="#3D6680"/></linearGradient>
        <linearGradient id="baeBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5A3D27"/><stop offset="100%" stopColor="#2E1E13"/></linearGradient>
        <linearGradient id="baeWing" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A3221"/><stop offset="100%" stopColor="#2B1C12"/></linearGradient>
      </defs>
      {pose === 'soar' ? (
        <>
          {scene && <Valley water={false}/>}
          {scene && <rect x="0" y="86" width="120" height="44" fill="url(#baeWater)"/>}
          <g transform={`translate(0,${drift + 4}) rotate(${drift * 1.5} 60 55)`}><Soaring/></g>
        </>
      ) : (
        <>
          {scene && <Valley/>}
          {/* dead snag + perch branch (kept as a stub without the scene) */}
          {scene && <path d="M 98 130 L 96 60 C 95 50 97 40 100 30 L 103 30 C 101 42 100 52 101 62 L 104 130 Z" fill="#7A6A5A"/>}
          {scene && <path d="M 98 52 C 104 46 110 44 116 44" stroke="#7A6A5A" strokeWidth="2.4" fill="none" strokeLinecap="round"/>}
          <path d={scene ? 'M 10 106 C 40 102 70 99.5 98 92' : 'M 34 104 C 50 102 64 100 78 98'} stroke="#6B5A49" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          {scene && <path d="M 96 90 C 97 92 99 95 99.5 97" stroke="#6B5A49" strokeWidth="5" fill="none" strokeLinecap="round"/>}
          <path d={scene ? 'M 20 104.6 l 6 -0.6 M 56 101 l 8 -1 M 84 97.4 l 6 -0.8' : 'M 40 102.6 l 6 -0.6 M 60 100.4 l 8 -1'} stroke="#8D7C6A" strokeWidth="0.9"/>
          <Perched blink={blink} look={look}/>
        </>
      )}
    </svg>
  )
}
