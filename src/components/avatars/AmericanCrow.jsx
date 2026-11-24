// American Crow — naturalistic technique (see BaldEagle.jsx pass 3 / CommonRaven.jsx).
//
// No outlined feathers: the black plumage gets its form from silhouette + gradient light, a fine
// feTurbulence grain clipped to the plumage, and a blue-violet gloss painted where light falls.
// Field marks (and how it differs from the raven next door): smaller and slimmer; ROUNDED crown
// (not flat); STRAIGHTER, SLIMMER bill about as long as the head, culmen gently curved, no heavy
// hook; SMOOTH THROAT (no shaggy hackles); folded wingtips falling just short of a square-ended
// tail; long black legs, walks with a deliberate stride. In flight: blunt, broad "rowing" wings
// with five short fingers, small head barely ahead of the wings, FAN-SHAPED ROUNDED tail.
// Habitat: the everyday crow of NYC lawns, sidewalks and park treetops.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'american_crow', poses: ['walk', 'fly'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const f2 = (v) => v.toFixed(2)

// A flight feather / finger: broad at the base, tapering to a rounded tip.
function quill(key, x, y, a, l, w, fill, op = 1) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${f2(x + u * c - v * s)} ${f2(y + u * s + v * c)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} C ${P(l * 0.5, -w * 0.5)} ${P(l * 0.8, -w * 0.42)} ${P(l * 0.96, -w * 0.24)} Q ${P(l * 1.04, 0)} ${P(l * 0.96, w * 0.26)} C ${P(l * 0.8, w * 0.44)} ${P(l * 0.5, w * 0.5)} ${P(0, w * 0.5)} Z`} fill={fill} opacity={op}/>
}
// A tail feather with a broad, rounded end (crow tail feathers are blunt).
function rectrix(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${f2(x + u * c - v * s)} ${f2(y + u * s + v * c)}`
  return <path key={key} d={`M ${P(0, -w * 0.28)} L ${P(l * 0.84, -w * 0.5)} C ${P(l * 1.02, -w * 0.5)} ${P(l * 1.02, w * 0.5)} ${P(l * 0.84, w * 0.5)} L ${P(0, w * 0.28)} Z`} fill={fill}/>
}

// ── Walking on a lawn by the sidewalk, side view facing left ─────────────────
const BODY_D = 'M 34.6 40.6 C 35 34.6 39.4 30.6 45 30.4 C 50.4 30.4 54.4 33.6 56 38.4 C 58 43 63 46.4 70 49.6 C 79 53.6 87 57.4 93.6 61.4 L 94.4 66.4 C 88 69.4 80 72.6 72 75 C 64 77.4 54 77.4 48 73.6 C 42 69.6 38.6 63 38 57.6 C 37.6 52.4 36.6 48 35.2 45.4 C 34.6 44 34.4 42.4 34.6 40.6 Z'
const WING_D = 'M 49.6 45 C 58 41 70 43.6 80 49.6 C 89 55 97 61.4 103.6 67.4 L 101.4 69.4 C 93 68.6 83 67.8 75 67.4 C 62 66.6 52.4 59 49.6 45 Z'
const TAIL_D = 'M 86 57.4 L 112.4 66.6 C 113.8 67.8 113.8 71.6 112.4 72.8 L 89 69.6 Z'

function Walking({ blink, sheen, step }) {
  const r = rng(23)
  const tips = []
  for (let row = 0; row < 5; row++) for (let i = 0; i < 5; i++) {
    const x = 56 + i * 5 + row * 2.6 + (r() - 0.5) * 1.4, y = 49 + row * 3.6 + i * 2.1 + (r() - 0.5)
    tips.push(<path key={`t${row}${i}`} d={`M ${f2(x - 2.2)} ${f2(y)} q 2.4 2.6 4.6 0.6`} stroke="#7078A8" strokeWidth="0.45" fill="none" opacity={0.1 + r() * 0.08}/>)
  }
  // step: 0 = rear foot planted, 1 = rear heel lifting
  const rear = step ? { k: [72.6, 91], toes: 'M 72.6 91.2 L 67 92.8 M 72.6 91.2 L 69 93.6 M 72.6 91.2 L 75.8 92.2' }
    : { k: [71.8, 92], toes: 'M 71.8 92.2 L 66 93.4 M 71.8 92.2 L 68 94 M 71.8 92.2 L 75.2 93' }
  return (
    <g>
      <ellipse cx="61" cy="94" rx="19" ry="1.9" fill="#16180F" opacity="0.35" filter="url(#crwBlur)"/>
      {/* far (rear) leg, a touch darker; near leg striding forward */}
      <g stroke="#0B0C10" strokeLinecap="round" fill="none">
        <path d={`M 67.6 75.6 L ${rear.k[0]} ${rear.k[1]}`} strokeWidth="2.3" stroke="#08090C"/>
        <path d={rear.toes} strokeWidth="1.3" stroke="#08090C"/>
        <path d="M 57.6 76.4 L 52.4 92.2" strokeWidth="2.5"/>
        <path d="M 52.4 92.4 L 45.4 93 M 52.4 92.4 L 47.8 94.2 M 52.4 92.4 L 56.2 93.4" strokeWidth="1.4"/>
      </g>
      <path d="M 57.2 80 L 53 90.6" stroke="#3A3F52" strokeWidth="0.45" opacity="0.6"/>
      <g filter="url(#crwTex)">
        {/* square-ended tail, folded; faint feather separations */}
        <path d={TAIL_D} fill="url(#crwTail)"/>
        <path d="M 92 62 L 112 70.2 M 92 64.6 L 111.6 71.4" stroke="#2C3044" strokeWidth="0.4" opacity="0.5"/>
        <path d={BODY_D} fill="url(#crwBody)"/>
        <g clipPath="url(#crwBodyClip)" filter="url(#crwGlow)">
          {/* gloss along the rounded crown, nape and back (also the rim light on dark backgrounds) */}
          <path d="M 36 37 C 38 32.4 41.6 30.8 45.4 30.8 C 50.4 31 53.8 33.8 55.4 38.4 C 57.6 43.4 63 46.6 70 49.8 C 79 53.8 86 57.4 93 61.4" stroke="#8890C8" strokeWidth="2.4" fill="none" opacity={Math.min(1, sheen * 1.35)}/>
          {/* violet sheen on the smooth throat and breast, shadow under the belly */}
          <path d="M 38.6 46 C 38.8 54 40.6 62 45 68" stroke="#6E62B4" strokeWidth="2.2" fill="none" opacity={sheen * 0.5}/>
          <path d="M 52 82 C 62 84 74 80 84 74 L 92 80 L 46 86 Z" fill="#000" opacity="0.55"/>
        </g>
        <path d={WING_D} fill="url(#crwWing)"/>
        <g clipPath="url(#crwWingClip)">
          <g filter="url(#crwGlow)">
            <path d="M 51.6 45.4 C 60 42 71 44.4 80.6 50.6" stroke="#A09CE6" strokeWidth="1.7" fill="none" opacity={sheen * 0.9}/>
            <path d="M 56 51 C 66 49 77 52.6 89 60 C 78 58.4 67 57 58 57 Z" fill="#5468B6" opacity={sheen * 0.5}/>
          </g>
          {tips}
          <path d="M 79 67.4 L 102.4 68.8 M 81 64.4 L 102.6 67.4 M 84.6 61.4 L 102 65.6" stroke="#05060A" strokeWidth="0.55" opacity="0.55"/>
        </g>
        <path d="M 49.6 45.4 C 52 59 62 66.4 75 67.6" stroke="#000" strokeWidth="1.5" fill="none" opacity="0.4" filter="url(#crwBlur)"/>
        {/* thigh feathering over the near leg */}
        <path d="M 54.6 72 C 55.6 76 57.4 78.4 59.6 78.8 C 60.8 76.6 60.6 74 59.4 71.6 Z" fill="#0A0B10"/>
      </g>
      {/* small dark eye under a soft brow */}
      <path d="M 37.6 36.6 C 39.4 35.4 42.4 35.4 44.4 36.8 C 42.2 36.6 39.6 36.8 38.2 37.8 Z" fill="#05060A"/>
      {blink
        ? <path d="M 39.2 38.8 q 1.3 0.7 2.6 0" stroke="#3A3E56" strokeWidth="0.7" fill="none"/>
        : <g>
            <ellipse cx="40.6" cy="38.7" rx="1.25" ry="1.15" fill="#24180F"/>
            <circle cx="40.7" cy="38.8" r="0.68" fill="#020202"/>
            <circle cx="40.2" cy="38.3" r="0.28" fill="#E8ECF4"/>
          </g>}
      {/* slimmer, straighter bill: culmen curves gently to the tip, no heavy hook */}
      <path d="M 35.6 37.4 C 30.8 37.6 25.8 39.4 22.4 42.4 C 21.6 43.1 21.3 43.9 21.7 44.6 L 35.8 43.2 Z" fill="url(#crwBill)"/>
      <path d="M 21.9 44.6 L 35.8 43.2 L 35.6 45.8 C 30.4 46.4 25 46 21.9 44.6 Z" fill="#0D0E13"/>
      <path d="M 34.4 38 C 30 38.4 25.6 40 22.8 42.4" stroke="#7E86A8" strokeWidth="0.55" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M 22 44.6 L 35 43.3" stroke="#3A3E50" strokeWidth="0.4"/>
      {/* modest nasal bristles */}
      <path d="M 36.2 37 C 33.2 37.2 31.2 38 29.6 39.2 C 31.6 39.8 33.8 40.2 36.4 40.2 Z" fill="#14151D"/>
      <path d="M 35.6 37.8 l -4.4 1.2 M 35.8 39.2 l -5 0.4" stroke="#4A5070" strokeWidth="0.35" fill="none" strokeLinecap="round" opacity="0.7"/>
    </g>
  )
}

// ── Flying, seen from below: blunt rowing wings, fan-shaped tail ─────────────
function UnderWing({ s, beat }) {
  const X = (x) => 60 + s * x
  const dy = beat * 2.4 // hand dips on the downstroke
  const fingers = [8.4, 10.6, 11.4, 10.4, 8.4].map((L, i) => {
    const a = -6 + i * 7 + beat * 4
    return quill(`f${i}`, X(37.6 + i * 0.5), 46.4 + i * 2.2 + dy * (0.6 + i * 0.1), s > 0 ? a : 180 - a, L, 2.9, i % 2 ? '#1E2028' : '#23252E')
  })
  const R = `M ${X(4)} 44.6 C ${X(12)} 41.8 ${X(22)} 40.6 ${X(30)} 41.6 C ${X(35)} 42.2 ${X(38.6)} ${44 + dy * 0.5} ${X(40)} ${46 + dy * 0.6} L ${X(40.4)} ${57 + dy} C ${X(35)} ${59.4 + dy * 0.8} ${X(28)} 62 ${X(20)} 62.8 C ${X(13)} 63.4 ${X(8)} 62.6 ${X(4)} 61.4 Z`
  return (
    <g>
      {fingers}
      <path d={R} fill="url(#crwRemiges)"/>
      {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M ${X(6 + i * 3.4)} ${53.4 - i * 0.3} L ${X(6.4 + i * 3.4)} ${62.6 - Math.max(0, i - 5) * 0.9 + (i > 6 ? dy * 0.8 : 0)}`} stroke="#000" strokeWidth="0.35" opacity="0.28"/>)}
      {/* black underwing coverts */}
      <path d={`M ${X(4)} 44.6 C ${X(12)} 41.8 ${X(22)} 40.6 ${X(30)} 41.6 C ${X(34)} 42 ${X(37)} 43.2 ${X(38.6)} 44.6 C ${X(32)} 48.4 ${X(26)} 51 ${X(19)} 52.2 C ${X(13)} 53 ${X(8)} 53.2 ${X(4)} 53.2 Z`} fill="url(#crwCoverts)"/>
      <path d={`M ${X(5)} 44.2 C ${X(13)} 41.6 ${X(22)} 40.6 ${X(30)} 41.6`} stroke="#8088C0" strokeWidth="1" fill="none" opacity="0.5" filter="url(#crwBlur)"/>
    </g>
  )
}

function Flying({ sheen, beat }) {
  // tail: twelve blunt feathers spread into a rounded fan
  const tail = Array.from({ length: 12 }, (_, i) => {
    const a = 90 + (i - 5.5) * 6.4, L = 21.4 - Math.abs(i - 5.5) * 0.12
    return rectrix(`r${i}`, 60, 64, a, L, 6, i % 2 ? '#14161E' : '#1A1C26')
  })
  return (
    <g>
      <g filter="url(#crwTex)">{tail}</g>
      <path d="M 60 66 L 60 84.6 M 56.4 66 L 51.8 83 M 63.6 66 L 68.2 83 M 53 66 L 45.6 79.4 M 67 66 L 74.4 79.4" stroke="#3A3E56" strokeWidth="0.35" opacity="0.5"/>
      <g filter="url(#crwTex)">
        <UnderWing s={-1} beat={beat}/><UnderWing s={1} beat={beat}/>
        {/* body: slimmer than the raven, short neck, small head barely ahead of the wings */}
        <path d="M 55 45 C 55 41 57.2 39.4 60 39.4 C 62.8 39.4 65 41 65 45 L 65.4 58 C 65 63.4 63 66.6 60 67 C 57 66.6 55 63.4 54.6 58 Z" fill="url(#crwBelly)"/>
        <path d="M 56.8 44 C 56.2 51 56.6 58 57.8 63.4" stroke="#6E78C0" strokeWidth="1.8" fill="none" opacity={sheen * 0.6} filter="url(#crwGlow)"/>
        <path d="M 55.2 41.6 C 54.6 36 56.8 31.6 60 31 C 63.2 31.6 65.4 36 64.8 41.6 C 63.4 42.8 61.8 43.2 60 43.2 C 58.2 43.2 56.6 42.8 55.2 41.6 Z" fill="url(#crwHeadU)"/>
      </g>
      {/* bill: short and slim from below */}
      <path d="M 57.8 32.4 C 58.4 29 59.2 26.6 60 25.6 C 60.8 26.6 61.6 29 62.2 32.4 C 60.8 31.9 59.2 31.9 57.8 32.4 Z" fill="url(#crwBill)"/>
      <path d="M 60 26.2 L 60 31.6" stroke="#6E7694" strokeWidth="0.4" opacity="0.6"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
function Blades(x0, x1, y0, y1, n, seed, cols, h = 3.4, w = 0.5) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), hh = h * (0.6 + r() * 0.8) * (0.6 + (y - y0) / Math.max(1, y1 - y0) * 0.6), lean = (r() - 0.5) * 2.4
    return <path key={i} d={`M ${f2(x)} ${f2(y)} q ${f2(lean * 0.3)} ${f2(-hh * 0.5)} ${f2(lean)} ${f2(-hh)}`} stroke={cols[i % cols.length]} strokeWidth={w} fill="none" strokeLinecap="round" opacity={0.6 + r() * 0.4}/>
  })
}

// A bare deciduous crown: recursive branching, thinning to twigs.
function Tree(x, y, len, ang, depth, seed, col, w0) {
  const r = rng(seed), out = []
  const grow = (x, y, len, ang, d, w) => {
    const t = ang * Math.PI / 180, x2 = x + Math.cos(t) * len, y2 = y + Math.sin(t) * len
    const mx = (x + x2) / 2 + (r() - 0.5) * len * 0.2, my = (y + y2) / 2 + (r() - 0.5) * len * 0.2
    out.push(<path key={out.length} d={`M ${f2(x)} ${f2(y)} Q ${f2(mx)} ${f2(my)} ${f2(x2)} ${f2(y2)}`} stroke={col} strokeWidth={f2(w)} fill="none" strokeLinecap="round"/>)
    if (d === 0) return
    const n = 2 + (r() < 0.4 ? 1 : 0)
    for (let i = 0; i < n; i++) grow(x2, y2, len * (0.62 + r() * 0.16), ang + (i - (n - 1) / 2) * (24 + r() * 14) + (r() - 0.5) * 10, d - 1, w * 0.62)
  }
  grow(x, y, len, ang, depth, w0)
  return out
}

function Lawn() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#crwSkyWalk)"/>
      {/* far side of the street: soft, out-of-focus row houses and street trees */}
      <g filter="url(#crwSoftBg)">
        <path d="M 0 22 L 18 22 L 18 16 L 44 16 L 44 24 L 70 24 L 70 18 L 96 18 L 96 26 L 120 26 L 120 52 L 0 52 Z" fill="#B2A79A"/>
        <path d="M 18 16 L 44 16 L 44 52 L 18 52 Z" fill="#A08E80"/>
        <path d="M 70 18 L 96 18 L 96 52 L 70 52 Z" fill="#C2B8A8"/>
        {[[6, 30], [24, 26], [30, 36], [52, 31], [78, 28], [84, 38], [104, 33]].map(([x, y], i) => <rect key={i} x={x} y={y} width="5" height="7" fill="#5E6670" opacity="0.6"/>)}
      </g>
      <g filter="url(#crwLeafy)">
        <path d="M -4 52 C -2 34 8 26 18 30 C 26 22 40 26 42 38 C 50 34 58 40 56 52 Z" fill="#6E7A58"/>
        <path d="M 82 52 C 80 36 92 28 102 32 C 112 26 124 34 122 52 Z" fill="#7A845E"/>
      </g>
      {/* street, curb and the near lawn receding toward us */}
      <path d="M 0 50 L 120 50 L 120 56 L 0 56 Z" fill="#8A8A86" filter="url(#crwBlur)"/>
      <path d="M 0 55.4 L 120 55.4 L 120 57.6 L 0 57.6 Z" fill="#C4C0B6" opacity="0.9"/>
      <g filter="url(#crwGrass)">
        <path d="M 0 57.4 L 120 57.4 L 120 130 L 0 130 Z" fill="url(#crwLawn)"/>
      </g>
      <g opacity="0.75">{Blades(0, 120, 64, 96, 160, 5, ['#5E7A3A', '#76904A', '#4C6630'], 2.4, 0.4)}</g>
      {/* a fallen leaf or two on the grass */}
      <path d="M 92 94 c 2 -1.6 4.6 -1 5.4 0.4 c -1.8 1.4 -4 1.6 -5.4 -0.4 Z" fill="#B07A36" opacity="0.85"/>
      <path d="M 18 86 c 1.6 -1.4 3.8 -1 4.6 0.2 c -1.6 1.2 -3.4 1.4 -4.6 -0.2 Z" fill="#9A6A30" opacity="0.7"/>
      {/* foreground sidewalk: lit concrete slab with an expansion joint, grass spilling over its edge */}
      <g filter="url(#crwConcrete)">
        <path d="M 0 109 C 30 107.4 70 106.6 120 105.6 L 120 130 L 0 130 Z" fill="url(#crwWalkSlab)"/>
      </g>
      <path d="M 58 107 L 52 130" stroke="#7E7A72" strokeWidth="0.8" opacity="0.8"/>
      <path d="M 58.8 107 L 52.8 130" stroke="#E6E2DA" strokeWidth="0.4" opacity="0.6"/>
      <path d="M 0 109 C 30 107.4 70 106.6 120 105.6" stroke="#6E6A60" strokeWidth="0.6" fill="none" opacity="0.6"/>
      <g>{Blades(0, 120, 106.4, 110, 90, 9, ['#4E6A30', '#688440', '#3E5626'], 4, 0.55)}</g>
    </g>
  )
}

function ParkSky() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#crwSkyFly)"/>
      <g filter="url(#crwSoft)" opacity="0.8">
        <ellipse cx="22" cy="20" rx="20" ry="4.6" fill="#FFF"/>
        <ellipse cx="96" cy="12" rx="16" ry="3.4" fill="#F6F4EE"/>
      </g>
      {/* far treetops in haze, near crowns crisp and dark: winter park canopy below the bird */}
      <g filter="url(#crwBlur)" opacity="0.55">
        {Tree(16, 140, 26, -88, 5, 3, '#7A7E86', 2.6)}
        {Tree(66, 142, 28, -92, 5, 11, '#7A7E86', 2.8)}
        {Tree(108, 140, 24, -86, 5, 7, '#7A7E86', 2.4)}
      </g>
      <g filter="url(#crwHair)">
        {Tree(-4, 146, 30, -70, 6, 17, '#3A3530', 3.4)}
        {Tree(122, 146, 28, -112, 6, 29, '#3A3530', 3.2)}
      </g>
    </g>
  )
}

export default function AmericanCrow({ size = 120, animated = false, style = {}, pose = 'walk', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 380); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const sheen = animated ? [0.5, 0.58, 0.66, 0.72, 0.66, 0.58, 0.5, 0.42, 0.36, 0.32, 0.36, 0.42][frame] : 0.5
  const beat = animated ? [0, 0.4, 0.8, 1, 0.8, 0.4, 0, -0.3, -0.6, -0.8, -0.6, -0.3][frame] : 0.5
  const step = animated ? (frame % 6 < 3 ? 1 : 0) : 1
  const fly = pose === 'fly'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Crow">
      <defs>
        <linearGradient id="crwSkyWalk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8D2D6"/><stop offset="100%" stopColor="#DCDCD2"/></linearGradient>
        <linearGradient id="crwSkyFly" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#6E98C2"/><stop offset="70%" stopColor="#B6CADA"/><stop offset="100%" stopColor="#D2D8D8"/></linearGradient>
        <linearGradient id="crwLawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7E8E5A"/><stop offset="40%" stopColor="#6C8442"/><stop offset="100%" stopColor="#4E6A2E"/></linearGradient>
        <linearGradient id="crwWalkSlab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#CFCAC0"/><stop offset="100%" stopColor="#A6A196"/></linearGradient>
        <linearGradient id="crwBody" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stopColor="#20233A"/><stop offset="45%" stopColor="#0F1118"/><stop offset="100%" stopColor="#050609"/></linearGradient>
        <linearGradient id="crwWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#202438"/><stop offset="60%" stopColor="#0D0F16"/><stop offset="100%" stopColor="#07080B"/></linearGradient>
        <linearGradient id="crwTail" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#14161F"/><stop offset="100%" stopColor="#0A0B10"/></linearGradient>
        <linearGradient id="crwBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3E50"/><stop offset="100%" stopColor="#0C0D11"/></linearGradient>
        <linearGradient id="crwRemiges" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#17181F"/><stop offset="100%" stopColor="#2C2E37"/></linearGradient>
        <linearGradient id="crwCoverts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0C0D13"/><stop offset="100%" stopColor="#13141C"/></linearGradient>
        <linearGradient id="crwBelly" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#20243A"/><stop offset="100%" stopColor="#0A0B10"/></linearGradient>
        <linearGradient id="crwHeadU" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2A2E44"/><stop offset="100%" stopColor="#0C0D12"/></linearGradient>
        <clipPath id="crwFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="crwBodyClip"><path d={BODY_D}/></clipPath>
        <clipPath id="crwWingClip"><path d={WING_D}/></clipPath>
        <filter id="crwSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="crwSoftBg" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="crwHair" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.2"/></filter>
        <filter id="crwBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="crwGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter>
        <filter id="crwLeafy" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves="2" seed="6" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feGaussianBlur in="d" stdDeviation="1.3"/>
        </filter>
        {/* rim light for scene=false: a faint cool halo so the black bird never sinks into a dark ground */}
        <filter id="crwHalo" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="b"/>
          <feFlood floodColor="#A4B0D4" floodOpacity="0.32"/>
          <feComposite in2="b" operator="in" result="h"/>
          <feMerge><feMergeNode in="h"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="crwTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.5" numOctaves="2" seed="9" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0.02  1.3 0 0 0 -0.5" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="crwGrass" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.25" numOctaves="3" seed="2" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.22  0 0 0 0 0.08  1.4 0 0 0 -0.55" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="crwConcrete" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="21" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.29  0 0 0 0 0.27  1 0 0 0 -0.45" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#crwFrame)">
        {fly ? (
          <>
            {scene && <ParkSky/>}
            <g filter={scene ? undefined : 'url(#crwHalo)'}>
              <g transform="translate(58 56) rotate(-24) scale(0.92) translate(-60 -56)"><Flying sheen={sheen} beat={beat}/></g>
            </g>
          </>
        ) : (
          <>
            {scene && <Lawn/>}
            <g filter={scene ? undefined : 'url(#crwHalo)'}>
              <g transform="translate(-1 10)"><Walking blink={blink} sheen={sheen} step={step}/></g>
            </g>
          </>
        )}
      </g>
    </svg>
  )
}
