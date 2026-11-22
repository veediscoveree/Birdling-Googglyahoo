// Bald Eagle (adult) — style guide v2, realism pass (Jared: "closer to real, structure accurate").
//
// Rendering approach: plumage is built from many overlapping individual feathers (deterministic
// pseudo-random placement), with gradient shading and pale feather edges, instead of flat colour
// blocks. Cartooning is limited to clarity: the eye keeps a tiny catch-light, nothing is enlarged.
//
// Shape checklist: small flat-crowned head with heavy brow shading a small pale-yellow eye; massive
// deep yellow bill, hooked tip overhanging the lower mandible, cere with slit nostril; white head,
// neck and tail; dark chocolate body with paler-tipped coverts; feathered "trousers"; short scaled
// yellow toes, black talons. Soar (seen from the ground, looking UP): body axis along the flight
// line, head forward, very long flat plank wings with 6–7 broad separated primaries ("fingers"),
// broad white tail; whole bird slightly banked.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'bald_eagle', poses: ['perch', 'soar'] }

const WHT = '#F3F0E8', WSH = '#CFC8BA', YEL = '#EDB12A', YDK = '#B67A12'

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

// One feather: rounded-tip teardrop from (x,y) pointing at angle a (deg), length l, width w.
function feather(key, x, y, a, l, w, fill, edge, ew = 0.5) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  const d = `M ${P(0, -w * 0.35)} C ${P(l * 0.4, -w * 0.6)} ${P(l * 0.85, -w * 0.55)} ${P(l, 0)} C ${P(l * 0.85, w * 0.55)} ${P(l * 0.4, w * 0.6)} ${P(0, w * 0.35)} Z`
  return <path key={key} d={d} fill={fill} stroke={edge} strokeWidth={ew}/>
}

// ── Perched eagle, three-quarter side view, facing left ──────────────────────
function Perched({ blink }) {
  const r = rng(11)
  const breast = [], coverts = [], primaries = []
  // breast & belly: rows of small dark feathers with faint warm edges
  for (let row = 0; row < 9; row++) for (let i = 0; i < 4; i++) {
    const x = 38.5 + i * 4.2 + (row % 2) * 2 + (r() - 0.5) * 1.2, y = 47 + row * 5.2 + (r() - 0.5)
    if (x > 34 + row * 0.9 && x < 60 - row * 0.2) breast.push(feather(`b${row}${i}`, x, y, 95 + (r() - 0.5) * 14, 6.5, 4.6, row < 4 ? '#3E2A1B' : '#362416', '#47321F', 0.35))
  }
  // wing coverts: overlapping rows, paler tips
  for (let row = 0; row < 6; row++) for (let i = 0; i < 4 - (row > 3 ? 1 : 0); i++) {
    const x = 52 + i * 4.4 + row * 1.3 + (r() - 0.5), y = 46 + row * 5.6 + i * 1.4
    coverts.push(feather(`c${row}${i}`, x, y, 70 + (r() - 0.5) * 10, 8.5, 5.4, row % 2 ? '#3A271A' : '#3F2C1D', '#5A412C', 0.45))
  }
  // long primaries / tertials down to the tail
  for (let i = 0; i < 5; i++) primaries.push(feather(`p${i}`, 60 + i * 2.2, 74 + i * 1.5, 78 + i * 2.5, 33 - i * 2, 4.4, i % 2 ? '#24170F' : '#2C1D12', '#5A4532', 0.5))

  return (
    <g>
      {/* white tail: separate rectrices, shaded underneath */}
      <path d="M 57 95 L 69 94 L 74.5 118 C 70 121 62.5 121.5 58.5 119 Z" fill="url(#baeTail)"/>
      <path d="M 60 97 L 61.2 119.5 M 63 96.6 L 64.6 120.4 M 66 96 L 68.2 120.2 M 69 95.4 L 71.6 119.2" stroke={WSH} strokeWidth="0.45" opacity="0.8"/>
      {/* body mass under the feathers */}
      <path d="M 41 40 C 33 49 32 66 37 80 C 41 90 46 95 51 98 L 62 98 C 68 92 72 82 72 69 C 72 55 66 44 57 39 Z" fill="url(#baeBody)"/>
      {breast}
      {/* feathered trousers */}
      {[0, 1, 2, 3].map(i => feather(`tr${i}`, 46 + i * 2.2, 86 + i * 1.2, 100, 10, 5.5, '#3A2618', '#47321F', 0.35))}
      {primaries}
      {coverts}
      {/* scaled yellow toes gripping, black talons */}
      <path d="M 49 98.5 L 48.4 102 M 55.5 99 L 55.6 102.5" stroke={YEL} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M 44.5 103.4 C 46 101.4 49 101.2 51.4 102.6 M 52 103.6 C 54 101.8 57.4 102 59.2 103.6" stroke={YEL} strokeWidth="2.1" fill="none" strokeLinecap="round"/>
      <path d="M 45 102.8 l 0.6 0.4 M 47 102 l 0.6 0.4 M 53.6 102.4 l 0.6 0.4 M 56 102.2 l 0.6 0.4" stroke={YDK} strokeWidth="0.5"/>
      <path d="M 44.5 103.4 q -1.4 0.6 -1.2 2.2 M 51.4 102.6 q 0.8 1 0.2 2.4 M 59.2 103.6 q 1.2 0.8 0.8 2.2" stroke="#141010" strokeWidth="1" fill="none" strokeLinecap="round"/>
      {/* white head & neck: shaded, with a ragged feathered border onto the brown */}
      <path d="M 31.5 29 C 31.5 21 38 16.2 46 16.4 C 53.5 16.8 58.5 22 58.5 30.5 L 59 41 C 56 44 52 45.5 47 45 C 41 44.5 35.5 41 33 36 C 32 33.8 31.5 31.5 31.5 29 Z" fill="url(#baeHead)"/>
      {Array.from({ length: 11 }, (_, i) => {
        const x = 37 + i * 2.1, y = 41.5 + Math.sin(i * 1.7) * 1.4
        return <path key={`n${i}`} d={`M ${x} ${y - 2} l ${0.6 + (i % 3) * 0.4} ${3.6 + (i % 2) * 1.6} l 1.2 -3.4`} fill={WHT} stroke={WSH} strokeWidth="0.25"/>
      })}
      {Array.from({ length: 7 }, (_, i) => <path key={`hs${i}`} d={`M ${44 + i * 2} ${22 + i * 2.6} q 2 2 1 4`} stroke={WSH} strokeWidth="0.45" fill="none" opacity="0.7"/>)}
      {/* brow ridge shading over the eye */}
      <path d="M 33 26.4 C 35.6 23.6 40 22.8 44 24.2 C 41 24.6 37.6 25.8 35.2 28 Z" fill="#B8AE9C"/>
      {blink
        ? <path d="M 35.8 27.4 q 2 1 4 0" stroke="#4A3A2A" strokeWidth="0.9" fill="none"/>
        : <g>
            <ellipse cx="37.9" cy="27.6" rx="2.05" ry="1.85" fill="#F1DB72"/>
            <circle cx="38" cy="27.7" r="0.95" fill="#120C08"/>
            <circle cx="37.5" cy="27.1" r="0.35" fill="#FFF" opacity="0.9"/>
            <path d="M 35.8 26.6 C 37 25.9 39 25.9 40.1 26.6" stroke="#8F846F" strokeWidth="0.7" fill="none"/>
          </g>}
      {/* bill: cere, deep upper mandible with overhanging hook, lower mandible, culmen highlight */}
      <path d="M 33.8 25.6 C 28.4 24.8 22.8 26.2 19.8 29.4 C 18 31.4 17.8 34.4 19 37.2 C 19.9 35.2 21.4 34.2 23.6 34 L 33.8 33.4 Z" fill="url(#baeBill)"/>
      <path d="M 23.6 34 L 33.8 33.4 L 33.4 36.2 C 29.6 37.2 26.4 36.9 24.2 35.5 Z" fill="#D49A1E"/>
      <path d="M 33.4 26 C 29 25.6 24.6 26.8 21.6 29.4" stroke="#F8D873" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M 23.6 34 L 33.8 33.4" stroke={YDK} strokeWidth="0.6"/>
      <path d="M 31 25.9 C 30.6 28.6 30.6 31 31 33.5" stroke={YDK} strokeWidth="0.5" fill="none"/>
      <path d="M 28.6 28.5 q 1.2 -0.6 1.8 0.2" stroke="#6B4A10" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    </g>
  )
}

// ── Soaring overhead: seen from the ground looking up ────────────────────────
function UnderWing({ s }) {
  const X = (x) => 60 + s * x
  const out = []
  // secondaries along the trailing edge (rounded tips, slightly greyer bases)
  for (let i = 0; i < 10; i++) {
    const x = 6 + i * 3.7, y = 58.5 + i * 0.15
    out.push(<path key={`s${i}`} d={`M ${X(x)} ${y - 8} L ${X(x)} ${y} Q ${X(x + 1.85)} ${y + 3} ${X(x + 3.7)} ${y} L ${X(x + 3.7)} ${y - 8} Z`} fill="url(#baeFlight)" stroke="#1C120B" strokeWidth="0.35"/>)
  }
  // fingered primaries at the wingtip (local x≈46 is the tip): broad, blunt, separated, fanned
  const lens = [9, 11, 12, 11.5, 10.5, 9, 7]
  for (let i = 0; i < 7; i++) {
    const rootY = 43.2 + i * 2.6, a = -12 + i * 6
    out.push(feather(`f${i}`, X(43), rootY, s > 0 ? a : 180 - a, lens[i] + 3, 3.9, '#20150D', '#120B06', 0.35))
  }
  // wing body (coverts) with leading-edge bulge at the wrist
  out.unshift(<path key="base" d={`M ${X(6)} 45 C ${X(14)} 42 ${X(26)} 41 ${X(34)} 41.6 C ${X(40)} 41.2 ${X(44)} 41 ${X(46.5)} 42 L ${X(46.5)} 60 L ${X(6)} 60 Z`} fill="url(#baeUnder)"/>)
  // covert rows: scalloped bands of feathers
  for (let row = 0; row < 3; row++) for (let i = 0; i < 10; i++) {
    const x = 9 + i * 3.8 + row * 1.2, y = 46.5 + row * 3.6
    out.push(<path key={`cv${row}${i}`} d={`M ${X(x)} ${y} q ${s * 1.9} 2.6 ${s * 3.8} 0`} stroke="#4A3424" strokeWidth="0.5" fill="none" opacity={0.7 - row * 0.15}/>)
  }
  return <g>{out}</g>
}

function Soaring() {
  return (
    <g transform="rotate(-9 60 58)">
      <UnderWing s={-1}/><UnderWing s={1}/>
      {/* broad white tail fan */}
      <path d="M 55 70 L 65 70 L 70.5 85 C 65 88.6 55 88.6 49.5 85 Z" fill="url(#baeTail)"/>
      <path d="M 57.5 71 L 54 86.5 M 60 71 L 60 88 M 62.5 71 L 66 86.5" stroke={WSH} strokeWidth="0.45" opacity="0.8"/>
      {/* body from below: dark, feathered, slightly tapered */}
      <path d="M 53.4 43 C 53.4 39.4 56.4 37.6 60 37.6 C 63.6 37.6 66.6 39.4 66.6 43 L 67 61 C 66.6 67.4 63.6 71.6 60 72 C 56.4 71.6 53.4 67.4 53 61 Z" fill="url(#baeBelly)"/>
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${55 + (i % 2) * 2} ${46 + i * 3.6} q 2.5 2 5 0 q 2.5 2 5 0`} stroke="#5E4532" strokeWidth="0.5" fill="none" opacity="0.7"/>)}
      {/* yellow feet tucked forward under the tail coverts */}
      <path d="M 57 67.5 q 0.4 2.6 -0.4 4.4 M 63 67.5 q -0.4 2.6 0.4 4.4" stroke={YEL} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* white head & neck pointing forward (up), seen from below, bill just visible */}
      <path d="M 54.2 43 C 53.8 35.4 56 30 60 29.2 C 64 30 66.2 35.4 65.8 43 C 63 41.6 57 41.6 54.2 43 Z" fill="url(#baeHead)"/>
      <path d="M 56.2 40 C 58.6 39.2 61.4 39.2 63.8 40" stroke={WSH} strokeWidth="0.5" fill="none"/>
      <path d="M 57.8 30.6 C 58.4 27.4 59.2 25.6 60 25.4 C 60.8 25.6 61.6 27.4 62.2 30.6 C 61 30.2 59 30.2 57.8 30.6 Z" fill="url(#baeBill)"/>
      <path d="M 58.6 30.4 C 59.4 31.2 60.6 31.2 61.4 30.4" stroke={YDK} strokeWidth="0.45" fill="none"/>
    </g>
  )
}

function Sky() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#baeSky)"/>
      <g filter="url(#baeSoft)" opacity="0.85">
        <ellipse cx="22" cy="104" rx="26" ry="9" fill="#FFFFFF"/>
        <ellipse cx="40" cy="112" rx="22" ry="8" fill="#F4F7FA"/>
        <ellipse cx="98" cy="20" rx="20" ry="6" fill="#FFFFFF"/>
        <ellipse cx="108" cy="114" rx="16" ry="6" fill="#EEF3F7"/>
      </g>
    </g>
  )
}

function River() {
  const r = rng(5)
  let d = 'M 0 82 L 0 78', x = 0
  while (x < 118) { const w = Math.min(2.5 + r() * 3, 120 - x), top = 78 - (3 + r() * 7); d += r() < 0.6 ? ` L ${x + w / 2} ${top} L ${x + w} 78` : ` Q ${x + w / 2} ${top - 1.5} ${x + w} 78`; x += w }
  d += ' L 120 82 Z'
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#baeSkyLow)"/>
      <g filter="url(#baeSoft)"><ellipse cx="28" cy="20" rx="18" ry="5" fill="#FFF" opacity="0.7"/><ellipse cx="90" cy="14" rx="14" ry="4" fill="#FFF" opacity="0.6"/></g>
      <path d="M 0 72 C 22 64 46 69 70 64 C 90 60 106 66 120 63 L 120 80 L 0 80 Z" fill="#9AACBA"/>
      <path d={d} fill="#4F5F4E"/>
      <path d="M 0 80 C 30 78.4 70 80.6 120 78.6 L 120 83 L 0 83 Z" fill="#9B6B3E" opacity="0.6"/>
      <rect x="0" y="82" width="120" height="48" fill="url(#baeWater)"/>
      <path d="M 6 92 h 14 M 34 96 h 22 M 78 91 h 18 M 12 106 h 26 M 66 110 h 30 M 26 121 h 18 M 88 124 h 20" stroke="#E4EEF4" strokeWidth="0.7" opacity="0.5" strokeLinecap="round"/>
    </g>
  )
}

export default function BaldEagle({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const drift = animated ? [0, -0.3, -0.6, -0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8, 0.6, 0.3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={{ overflow: 'hidden', ...style }} aria-label="Bald Eagle">
      <defs>
        <linearGradient id="baeSky" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#5C9BD0"/><stop offset="100%" stopColor="#A9CDE8"/></linearGradient>
        <linearGradient id="baeSkyLow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8DB9DC"/><stop offset="100%" stopColor="#DDE8EE"/></linearGradient>
        <linearGradient id="baeWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C99AC"/><stop offset="100%" stopColor="#3E6178"/></linearGradient>
        <linearGradient id="baeBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4C3422"/><stop offset="100%" stopColor="#24170E"/></linearGradient>
        <linearGradient id="baeBelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3E2A1B"/><stop offset="100%" stopColor="#2A1B11"/></linearGradient>
        <linearGradient id="baeUnder" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3F2B1C"/><stop offset="100%" stopColor="#2C1D12"/></linearGradient>
        <linearGradient id="baeFlight" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2E2018"/><stop offset="100%" stopColor="#3A2E26"/></linearGradient>
        <radialGradient id="baeHead" cx="0.4" cy="0.35" r="0.75"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor={WHT}/><stop offset="100%" stopColor="#D8D1C3"/></radialGradient>
        <linearGradient id="baeBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5C443"/><stop offset="100%" stopColor="#D99A1A"/></linearGradient>
        <linearGradient id="baeTail" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E9E4D9"/><stop offset="45%" stopColor={WHT}/><stop offset="100%" stopColor="#FFFFFF"/></linearGradient>
        <clipPath id="baeFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="baeSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
      </defs>
      <g clipPath="url(#baeFrame)">
      {pose === 'soar' ? (
        <>
          {scene && <Sky/>}
          <g transform={`translate(0,${drift}) rotate(${drift * 1.2} 60 58)`}><Soaring/></g>
        </>
      ) : (
        <>
          {scene && <River/>}
          {scene && <path d="M 99 130 L 97 66 C 96 54 98 42 101 30 L 104 30 C 102 44 101 56 102 66 L 105 130 Z" fill="#7B6C5C"/>}
          {scene && <path d="M 99.5 50 C 105 44 111 42 117 42.4" stroke="#7B6C5C" strokeWidth="2.2" fill="none" strokeLinecap="round"/>}
          {scene && <path d="M 100 34 l 1 30 M 102.6 40 l 0.6 28" stroke="#5F5244" strokeWidth="0.5"/>}
          <path d={scene ? 'M 10 107 C 40 103 70 101 98.5 94' : 'M 34 105 C 50 103 64 101 78 99'} stroke="#6B5A49" strokeWidth="4.4" fill="none" strokeLinecap="round"/>
          <path d={scene ? 'M 18 105.6 l 7 -0.7 M 50 102.6 l 9 -1 M 80 98.6 l 7 -1.2' : 'M 40 103.6 l 6 -0.6 M 60 101.4 l 8 -1'} stroke="#8D7C6A" strokeWidth="0.8"/>
          <Perched blink={blink}/>
        </>
      )}
      </g>
    </svg>
  )
}
