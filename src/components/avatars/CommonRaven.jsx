// Common Raven — naturalistic technique (see BaldEagle.jsx pass 3).
//
// No outlined feathers: the black plumage gets its form from silhouette + gradient light, a fine
// pale feTurbulence grain clipped to the plumage, and soft blue-violet gloss painted where light
// falls (crown, nape, mantle, wing coverts) — never drawn as lines.
// Field marks: entirely glossy black with blue-violet sheen; MASSIVE deep bill with a strongly
// curved culmen and bristles over its base; flat crown and thick neck; SHAGGY THROAT HACKLES;
// long wings reaching near the tail tip; long, WEDGE-shaped tail; black legs; dark eye.
// In flight (from below): long wings with deeply slotted "fingers", head and heavy bill
// protruding well ahead of the wings, wedge-shaped tail.
// Habitat: in NYC / northern NJ ravens nest on cliffs like the Palisades (columnar basalt).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'common_raven', poses: ['perch', 'soar'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

// A primary "finger": broad at the base, tapering to a rounded tip.
function quill(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} C ${P(l * 0.5, -w * 0.5)} ${P(l * 0.8, -w * 0.38)} ${P(l * 0.97, -w * 0.2)} Q ${P(l * 1.03, 0)} ${P(l * 0.95, w * 0.22)} C ${P(l * 0.8, w * 0.4)} ${P(l * 0.5, w * 0.5)} ${P(0, w * 0.5)} Z`} fill={fill}/>
}

const BODY_D = 'M 37.6 30.6 C 39 26.2 43.4 23.4 48.8 23.2 C 55 23.2 59.4 26 61.2 30.6 C 62.6 34.4 65.4 37.8 69.6 40.6 C 79 46 91 55 102.6 68.6 L 116.4 91.6 L 112.6 94.8 C 104 87 96 82.4 87 81.4 C 77 82.4 66 82.8 57 79.4 C 49.6 75.6 45 68 43.6 59.6 C 42.8 52 42.4 46.6 42.6 42.6 C 40.4 39 38.4 35.6 37.6 30.6 Z'
const WING_D = 'M 52 46 C 62 41 76 44 88 53 C 99 61 106 73 111 88 L 108.6 91 C 98 85 86 80 76 76 C 63 71 54 62 52 46 Z'

// ── Perched on a cliff ledge, side view facing left ─────────────────────────
function Perched({ blink, sheen }) {
  const r = rng(17)
  const tips = []
  for (let row = 0; row < 6; row++) for (let i = 0; i < 5; i++) {
    const x = 58 + i * 5 + row * 2.4 + (r() - 0.5) * 1.4, y = 49 + row * 4.4 + i * 2.2 + (r() - 0.5)
    tips.push(<path key={`t${row}${i}`} d={`M ${x - 2.4} ${y} q 2.6 3 5 0.6`} stroke="#6A72A0" strokeWidth="0.45" fill="none" opacity={0.1 + r() * 0.08}/>)
  }
  return (
    <g>
      {/* soft contact shadow on the rock */}
      <ellipse cx="66" cy="96.4" rx="22" ry="2.2" fill="#1E1B18" opacity="0.35" filter="url(#rvnBlur)"/>
      {/* strong black legs and long toes */}
      <g stroke="#0C0D12" strokeLinecap="round" fill="none">
        <path d="M 60 80 L 58.6 94.6" strokeWidth="2.8"/>
        <path d="M 69 81 L 68.8 95" strokeWidth="2.8"/>
        <path d="M 58.6 94.8 L 52.6 95.8 M 58.6 94.8 L 55.2 96.6 M 58.6 94.8 L 61.6 95.6 M 68.8 95.2 L 62.8 96.2 M 68.8 95.2 L 65.4 96.8 M 68.8 95.2 L 72 95.8" strokeWidth="1.5"/>
      </g>
      <g filter="url(#rvnTex)">
        {[[41, 37.8, 118, 6.4], [42, 40, 114, 7.4], [42.6, 42.6, 110, 8], [43.2, 45.2, 106, 8.4], [43.8, 47.8, 102, 8.2], [44.6, 50.2, 98, 7.6], [45.8, 52.4, 94, 6.8], [47.4, 54, 90, 5.6], [41.6, 39.2, 124, 6], [42.6, 44, 116, 7.6], [43.4, 49, 108, 7.6]].map(([x, y, a, L], i) =>
          quill(`h${i}`, x - 0.2, y, a + 6, L, 2.6, i % 2 ? '#0E1016' : '#161925'))}
        <path d="M 41.4 42 L 39.6 46.6 M 42.6 45.4 L 41.2 51 M 44 49 L 43.6 55" stroke="#6A70A8" strokeWidth="0.4" opacity={sheen * 0.8} fill="none" strokeLinecap="round"/>
        <path d={BODY_D} fill="url(#rvnBody)"/>
        {/* light: blue-violet gloss on crown, nape and mantle; dim violet on the breast */}
        <g clipPath="url(#rvnBodyClip)" filter="url(#rvnGlow)">
          {/* rim light along the upper contours, where the sky catches the gloss */}
          <path d="M 39.4 28 C 42 24.6 46 23.6 50 23.8 C 55 24.2 58.6 26.6 60.4 30.6 C 62 34.4 65 37.8 69.4 40.8 C 79 46.4 90 55 101 68" stroke="#7C84BC" strokeWidth="2.6" fill="none" opacity={Math.min(1, sheen * 1.3)}/>
          <path d="M 44.4 46 C 43.6 54 44.6 62 47.6 68" stroke="#6A66B4" strokeWidth="2" fill="none" opacity={sheen * 0.45}/>
          <path d="M 56 84 C 66 86 78 84 88 82 L 96 90 L 50 90 Z" fill="#000" opacity="0.5"/>
        </g>
        {/* folded wing: coverts catch the light, primaries reach near the tail tip */}
        <path d={WING_D} fill="url(#rvnWing)"/>
        <g clipPath="url(#rvnWingClip)">
          <g filter="url(#rvnGlow)">
            <path d="M 54 46.4 C 64 42.6 76 45.4 87 52.6" stroke="#9A94E0" strokeWidth="1.8" fill="none" opacity={sheen * 0.9}/>
            <path d="M 58 52 C 68 50 80 54 92 62 C 82 60 70 58 60 58 Z" fill="#5C66B0" opacity={sheen * 0.45}/>
          </g>
          {tips}
          <path d="M 80 74 L 108 89.6 M 84 71 L 109 87.4 M 88 68 L 109.6 84.4 M 76 76 L 104 88.6" stroke="#05060A" strokeWidth="0.6" opacity="0.6"/>
        </g>
        <path d="M 52 46 C 54 62 63 71 76 76" stroke="#000" strokeWidth="1.6" fill="none" opacity="0.4" filter="url(#rvnBlur)"/>
        {/* shaggy throat hackles */}

      </g>
      {/* brow + small dark eye */}
      <path d="M 40.6 29.4 C 42.6 28.2 45.6 28.4 47.6 29.8 C 45.4 29.6 42.8 29.8 41.2 30.8 Z" fill="#05060A"/>
      {blink
        ? <path d="M 42.2 31.6 q 1.4 0.7 2.8 0" stroke="#3A3E56" strokeWidth="0.7" fill="none"/>
        : <g>
            <ellipse cx="43.7" cy="31.5" rx="1.3" ry="1.2" fill="#2A1C14"/>
            <circle cx="43.8" cy="31.6" r="0.7" fill="#020202"/>
            <circle cx="43.3" cy="31.1" r="0.28" fill="#E8ECF4"/>
          </g>}
      {/* massive bill: deep base, culmen curving down to the tip */}
      <path d="M 38.4 29.6 C 31 29.8 24.6 31.6 20 35 C 18.6 36 18 37.4 18.6 38.6 C 19.4 37.8 20.4 37.4 21.6 37.4 L 38.6 36.6 Z" fill="url(#rvnBill)"/>
      <path d="M 21.6 37.4 L 38.6 36.6 L 38.4 39.6 C 31 40.4 25 39.6 21.6 37.4 Z" fill="#0E0F14"/>
      <path d="M 37 30.4 C 30 30.8 24.4 32.6 20.6 35.4" stroke="#7880A0" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M 21.8 37.5 L 37.8 36.7" stroke="#3A3E50" strokeWidth="0.4"/>
      {/* bristles over the bill base */}
      <path d="M 39 29 C 34 29 30.6 30.2 27.6 31.8 C 31 32.8 35 33.4 39.2 33.6 Z" fill="#14151D"/>
      <path d="M 38 30 l -6 1.4 M 38.2 31.4 l -8 1 M 38 32.8 l -5.4 0.2" stroke="#4A5070" strokeWidth="0.4" fill="none" strokeLinecap="round" opacity="0.8"/>
    </g>
  )
}

// ── Soaring overhead, seen from below ────────────────────────────────────────
function UnderWing({ s }) {
  const X = (x) => 60 + s * x
  // long hand narrowing to six deeply slotted fingers
  const fingers = [11, 14, 15.4, 14.6, 12.6, 9.6].map((L, i) => {
    const a = -8 + i * 5.6
    return quill(`f${i}`, X(45), 45.2 + i * 1.75, s > 0 ? a : 180 - a, L, 2.8, '#2A2C34')
  })
  const R = `M ${X(5)} 45 C ${X(14)} 42 ${X(24)} 40.6 ${X(32)} 41 C ${X(38)} 41.4 ${X(42.6)} 43 ${X(46)} 45 L ${X(46)} 54.6 C ${X(40)} 57 ${X(34)} 60.4 ${X(26)} 62.6 C ${X(18)} 64 ${X(10)} 64 ${X(5)} 63 Z`
  return (
    <g>
      {fingers}
      {/* flight feathers: dark grey, faintly translucent toward the trailing edge */}
      <path d={R} fill="url(#rvnRemiges)"/>
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${X(7 + i * 3.3)} ${52.6 - i * 0.45} L ${X(7.3 + i * 3.25)} ${63.6 - Math.max(0, i - 5) * 1.3}`} stroke="#000" strokeWidth="0.35" opacity="0.3"/>)}
      {/* black underwing coverts */}
      <path d={`M ${X(5)} 45 C ${X(14)} 42 ${X(24)} 40.6 ${X(32)} 41 C ${X(36)} 41.3 ${X(39.4)} 42.2 ${X(42)} 43.4 C ${X(36)} 47.4 ${X(30)} 50 ${X(24)} 51.4 C ${X(16)} 52.8 ${X(10)} 53.2 ${X(5)} 53.4 Z`} fill="url(#rvnCoverts)"/>
      {Array.from({ length: 9 }, (_, i) => <path key={`c${i}`} d={`M ${X(7 + i * 3.6)} ${52.4 - i * 0.5} q ${s * 1.8} 1.6 ${s * 3.6} 0`} stroke="#5A6080" strokeWidth="0.4" fill="none" opacity="0.3"/>)}
    </g>
  )
}

function Soaring({ sheen }) {
  return (
    <g transform="rotate(-7 60 60) translate(60 60) scale(0.88) translate(-60 -60)">
      {/* long wedge-shaped tail: central feathers longest */}
      <g filter="url(#rvnTex)">
        <path d="M 55.6 67 L 64.4 67 C 67 72 69 77 70.4 82 C 67.4 86 64 90 60 94.4 C 56 90 52.6 86 49.6 82 C 51 77 53 72 55.6 67 Z" fill="url(#rvnTail)"/>
      </g>
      <path d="M 60 70 L 60 93 M 57.6 70 L 53.4 86 M 62.4 70 L 66.6 86 M 56 70 L 51 82.6 M 64 70 L 69 82.6" stroke="#3E4258" strokeWidth="0.4" opacity="0.55"/>
      <g filter="url(#rvnTex)">
        <UnderWing s={-1}/><UnderWing s={1}/>
        <path d="M 54.6 46 C 54.6 41 57 39 60 39 C 63 39 65.4 41 65.4 46 L 65.8 60 C 65.4 66 63 69.6 60 70 C 57 69.6 54.6 66 54.2 60 Z" fill="url(#rvnBelly)"/>
        <path d="M 56.6 44 C 56 52 56.4 60 57.6 66" stroke="#6670B8" strokeWidth="2" fill="none" opacity={sheen * 0.6} filter="url(#rvnGlow)"/>
        {/* thick neck and big head pushed well forward, shaggy throat */}
        <path d="M 53.4 42.4 C 52.6 35 55.4 28.8 60 28 C 64.6 28.8 67.4 35 66.6 42.4 L 65 41.2 L 64.2 44 L 62.4 41.8 L 60 44.8 L 57.6 41.8 L 55.8 44 L 55 41.2 Z" fill="url(#rvnHeadU)"/>
      </g>
      {/* heavy bill, foreshortened but clearly protruding */}
      <path d="M 56.6 30 C 57.2 25 58.4 21 60 19 C 61.6 21 62.8 25 63.4 30 C 61.4 29.2 58.6 29.2 56.6 30 Z" fill="url(#rvnBill)"/>
      <path d="M 60 19.6 L 60 28.6" stroke="#6E7694" strokeWidth="0.45" opacity="0.7"/>
      <path d="M 57.4 29.6 C 58 27.6 59 26.6 60 26.4 C 61 26.6 62 27.6 62.6 29.6 Z" fill="#14151D"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
// Columnar basalt: irregular columns, each with a lit facet and a shadowed joint.
function Columns(x0, x1, y0, y1, n, seed) {
  const r = rng(seed), out = []
  let x = x0
  for (let i = 0; x < x1; i++) {
    const w = (x1 - x0) / n * (0.6 + r() * 0.8), top = y0 + r() * 2.4, lean = (r() - 0.5) * 2
    out.push(<path key={`f${i}`} d={`M ${x} ${top} L ${x + w * 0.45} ${top - 0.6} L ${x + w * 0.45 + lean} ${y1} L ${x + lean} ${y1} Z`} fill="#E8E0D2" opacity={0.06 + r() * 0.08}/>)
    out.push(<path key={`d${i}`} d={`M ${x + w} ${top} C ${x + w + lean * 0.3} ${(top + y1) / 2} ${x + w + lean * 0.7} ${y1 - 4} ${x + w + lean} ${y1}`} stroke="#15120F" strokeWidth={0.5 + r() * 0.7} fill="none" opacity={0.35 + r() * 0.25}/>)
    x += w
  }
  return out
}

// Scraggly cliff-top cedar scrub: many small irregular tufts.
function Shrub(cx, cy, seed) {
  const r = rng(seed)
  return Array.from({ length: 26 }, (_, i) => {
    const x = cx + (r() - 0.5) * 16, y = cy - r() * 9 * (1 - Math.abs(x - cx) / 10), w = 1.6 + r() * 2
    return <ellipse key={i} cx={x} cy={y} rx={w} ry={w * 0.7} transform={`rotate(${r() * 180} ${x} ${y})`} fill={r() < 0.5 ? '#3A4636' : '#4E5A44'}/>
  })
}

function Palisades() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#rvnSky)"/>
      <g filter="url(#rvnSoft)" opacity="0.7">
        <ellipse cx="88" cy="18" rx="22" ry="5" fill="#FFF"/>
        <ellipse cx="22" cy="12" rx="14" ry="3.4" fill="#F6F4EE"/>
      </g>
      {/* far shore across the river, hazy */}
      <path d="M 0 66 C 20 62 40 64 60 61 C 80 58 100 62 120 60 L 120 74 L 0 74 Z" fill="#A2ACB4"/>
      <path d="M 0 72 C 30 70 70 71.4 120 70 L 120 75 L 0 75 Z" fill="#7E8C88" opacity="0.8" filter="url(#rvnBlur)"/>
      <rect x="0" y="74.6" width="120" height="14" fill="url(#rvnRiver)"/>
      <path d="M 30 78 h 18 M 66 81 h 24 M 8 84 h 14 M 96 77 h 14" stroke="#EEF2F2" strokeWidth="0.5" opacity="0.55" strokeLinecap="round"/>
      {/* mid-ground cliff face falling away to the river */}
      <g filter="url(#rvnRockTex)">
        <path d="M 0 30 L 6 29 L 9 31.4 L 14 31 C 17 38 18.6 50 20.4 62 L 23 66 C 24.4 78 28 90 34 100 L 0 104 Z" fill="url(#rvnCliffMid)"/>
      </g>
      <g opacity="0.8" filter="url(#rvnBlur)" clipPath="url(#rvnMidClip)">{Columns(0, 24, 28, 104, 4, 3)}</g>
      {/* foreground ledge: lit top, shadowed columnar front */}
      <g filter="url(#rvnRockTex)">
        <path d="M 0 102 C 20 99.4 40 98.8 60 99.6 C 80 100.4 100 98.6 120 99.8 L 120 106 C 100 105 80 107 60 106.4 C 40 106 20 107 0 108 Z" fill="url(#rvnLedgeTop)"/>
        <path d="M 0 108 C 20 107 40 106 60 106.4 C 80 107 100 105 120 106 L 120 130 L 0 130 Z" fill="url(#rvnLedgeFace)"/>
      </g>
      <g filter="url(#rvnHair)">{Columns(0, 120, 107, 130, 9, 8)}</g>
      <path d="M 0 108 C 20 107 40 106 60 106.4 C 80 107 100 105 120 106" stroke="#D2CABC" strokeWidth="0.7" fill="none" opacity="0.5"/>
      <g filter="url(#rvnBlur)">
        <ellipse cx="22" cy="103.4" rx="3" ry="0.9" fill="#B9C28C" opacity="0.7"/>
        <ellipse cx="92" cy="102.6" rx="2.4" ry="0.8" fill="#D6A456" opacity="0.6"/>
        <ellipse cx="40" cy="114" rx="2.2" ry="1.4" fill="#A9B47E" opacity="0.45"/>
      </g>
      <path d="M 104 100 q -1 -4 -3 -6 M 105 100 q 0 -5 1 -7 M 106 100 q 1 -4 4 -5 M 10 102.6 q 0 -4 -2 -6 M 11 102.6 q 1 -4 3 -5" stroke="#8A8A52" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function SkyCliff() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#rvnSkyHi)"/>
      <g filter="url(#rvnSoft)" opacity="0.85">
        <ellipse cx="96" cy="104" rx="24" ry="7" fill="#FFF"/>
        <ellipse cx="110" cy="96" rx="12" ry="5" fill="#F4F6F8"/>
        <ellipse cx="20" cy="16" rx="18" ry="4.4" fill="#FFF" opacity="0.8"/>
      </g>
      {/* the cliff top the raven has just left, seen from below */}
      <g filter="url(#rvnRockTex)">
        <path d="M 0 130 L 0 98 C 4 96 9 96.4 13 98.6 C 17 101 20 104 22 108 C 25 114 27 122 29 130 Z" fill="url(#rvnCliffMid)"/>
      </g>
      <g filter="url(#rvnHair)" clipPath="url(#rvnTopClip)">{Columns(0, 28, 96, 130, 4, 5)}</g>
      <g filter="url(#rvnBlur)">{Shrub(8, 98, 21)}</g>
    </g>
  )
}

export default function CommonRaven({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const sheen = animated ? [0.5, 0.58, 0.66, 0.72, 0.66, 0.58, 0.5, 0.42, 0.36, 0.32, 0.36, 0.42][frame] : 0.48
  const drift = animated ? [0, -0.3, -0.6, -0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8, 0.6, 0.3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Common Raven">
      <defs>
        <linearGradient id="rvnSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9DB4CA"/><stop offset="55%" stopColor="#D8DED8"/><stop offset="100%" stopColor="#C9CCC4"/></linearGradient>
        <linearGradient id="rvnSkyHi" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#5A8CBE"/><stop offset="100%" stopColor="#BCD2E2"/></linearGradient>
        <linearGradient id="rvnRiver" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B4C2C8"/><stop offset="100%" stopColor="#8EA2AA"/></linearGradient>
        <linearGradient id="rvnCliffMid" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8C857C"/><stop offset="100%" stopColor="#6A645E"/></linearGradient>
        <linearGradient id="rvnLedgeTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ACA496"/><stop offset="100%" stopColor="#867E72"/></linearGradient>
        <linearGradient id="rvnLedgeFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5E5852"/><stop offset="100%" stopColor="#2E2A27"/></linearGradient>
        <linearGradient id="rvnBody" x1="0" y1="0" x2="0.7" y2="1"><stop offset="0%" stopColor="#1D202C"/><stop offset="45%" stopColor="#0F1117"/><stop offset="100%" stopColor="#050608"/></linearGradient>
        <linearGradient id="rvnWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1E2130"/><stop offset="60%" stopColor="#0D0F15"/><stop offset="100%" stopColor="#07080B"/></linearGradient>
        <linearGradient id="rvnBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#363A4A"/><stop offset="100%" stopColor="#0C0D11"/></linearGradient>
        <linearGradient id="rvnRemiges" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#202229"/><stop offset="100%" stopColor="#44474F"/></linearGradient>
        <linearGradient id="rvnCoverts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0E0F15"/><stop offset="100%" stopColor="#16171F"/></linearGradient>
        <linearGradient id="rvnBelly" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1E2130"/><stop offset="100%" stopColor="#0A0B10"/></linearGradient>
        <linearGradient id="rvnHeadU" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#262A3A"/><stop offset="100%" stopColor="#0C0D12"/></linearGradient>
        <linearGradient id="rvnTail" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#101118"/><stop offset="100%" stopColor="#262833"/></linearGradient>
        <clipPath id="rvnMidClip"><path d="M 0 30 L 6 29 L 9 31.4 L 14 31 C 17 38 18.6 50 20.4 62 L 23 66 C 24.4 78 28 90 34 100 L 0 104 Z"/></clipPath>
        <clipPath id="rvnTopClip"><path d="M 0 130 L 0 98 C 4 96 9 96.4 13 98.6 C 17 101 20 104 22 108 C 25 114 27 122 29 130 Z"/></clipPath>
        <clipPath id="rvnFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="rvnBodyClip"><path d={BODY_D}/></clipPath>
        <clipPath id="rvnWingClip"><path d={WING_D}/></clipPath>
        <filter id="rvnSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="rvnHair" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.25"/></filter>
        <filter id="rvnBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="rvnGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.3"/></filter>
        {/* fine dark feather-grain over the (dark slate) plumage, as on the eagle */}
        <filter id="rvnTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.5" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0.02  1.3 0 0 0 -0.5" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="rvnRockTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.35 0.6" numOctaves="3" seed="12" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.09  0 0 0 0 0.08  1.1 0 0 0 -0.45" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#rvnFrame)">
        {pose === 'soar' ? (
          <>
            {scene && <SkyCliff/>}
            <g transform={`translate(0,${drift}) rotate(${drift * 1.2} 60 60)`}><Soaring sheen={sheen}/></g>
          </>
        ) : (
          <>
            {scene && <Palisades/>}
            <g transform="translate(0 4)"><Perched blink={blink} sheen={sheen}/></g>
          </>
        )}
      </g>
    </svg>
  )
}
