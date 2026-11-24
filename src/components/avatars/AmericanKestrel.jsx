// American Kestrel (adult male) — perch kept from the approved design, now with the naturalistic
// technique of BaldEagle.jsx (grain clipped to plumage, gradient light, soft pale tips, no outlines).
// Hover redrawn (style guide v2): body pitched ~40° nose-up, tail fanned and pushed down, head held
// level and looking down, wings raised and beating forward — each wing built from separate
// primaries and secondaries on a long, pointed falcon planform.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'american_kestrel', poses: ['perch', 'hover'] }

// Field marks: tiny falcon with a big round head; blue-gray crown with a RUFOUS crown spot;
// white cheeks & throat with TWO vertical black facial stripes (mustache below the eye +
// "sideburn" behind the cheek); black "false eye" spot on the nape; dark eye with yellow
// orbital ring; small hooked blue-gray bill with yellow cere; RUFOUS BACK barred black;
// BLUE-GRAY WINGS spotted black with dark primaries; peachy-buff breast fading to cream,
// spotted black on the flanks; long RUFOUS TAIL with a broad BLACK SUBTERMINAL BAND and
// WHITE TIP; yellow-orange feet. Pointed falcon wings; pale, finely barred underwing.

const RUF = '#CE6328'
const BLK = '#1C1A1E'

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const f2 = (v) => v.toFixed(2)

// One feather from base B to tip T: straight vanes, rounded-pointed tip, asymmetric vanes.
function featherD(B, T, w, asym = 0.42, round = 0.5) {
  const dx = T[0] - B[0], dy = T[1] - B[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len
  const at = (s, t) => `${f2(B[0] + ux * len * s - uy * t)} ${f2(B[1] + uy * len * s + ux * t)}`
  const a = w * asym, b = w * (1 - asym)
  const k = 1 - 0.22 * round
  return `M ${at(0, -a)} L ${at(k, -a * 0.96)} C ${at(1 - 0.06 * round, -a * 0.9)} ${at(1, -a * 0.45 * round)} ${at(1, 0)} C ${at(1, b * 0.5 * round)} ${at(1 - 0.08 * round, b)} ${at(k - 0.04, b)} L ${at(0, b)} Z`
}
const lerp = (a, b, t) => a + (b - a) * t
const along = (B, T, s) => [lerp(B[0], T[0], s), lerp(B[1], T[1], s)]

// Falcon wing in a local frame: x = shoulder → tip, y = leading edge → trailing edge.
function wingPlan({ L, wx, chord, cb, nP = 9, nS = 9, hand = 0.38, tipBack = 0.45 }) {
  const sec = Array.from({ length: nS }, (_, i) => {
    const x = 1.5 + (wx - 1.5) * i / (nS - 1)
    return { B: [x, cb * 0.4], T: [x + 0.6 + i * 0.12, chord - (i === 0 ? 2.2 : 0) + Math.sin(i / (nS - 1) * Math.PI) * 0.8], w: (wx / (nS - 1)) * 1.7 }
  })
  const prim = Array.from({ length: nP }, (_, j) => {
    const t = j / (nP - 1), s = Math.pow(t, 0.85)
    const B = [wx + (L - wx) * hand * t, cb * 0.4 * (1 - t) + 0.4 * t]
    const c = [wx + (L - wx) * 0.72, chord * 1.02]
    let T = [(1 - s) ** 2 * (wx + 2.5) + 2 * (1 - s) * s * c[0] + s * s * L, (1 - s) ** 2 * chord + 2 * (1 - s) * s * c[1] + s * s * chord * tipBack]
    if (j === nP - 1) T = along(B, T, 0.93)
    return { B, T, w: 5 * (1 - 0.38 * t) }
  })
  const hx = wx + (L - wx) * 0.5
  const covert = `M 0 -0.6 C ${wx * 0.35} -2.6 ${wx * 0.8} -2.8 ${wx} -1.5 C ${wx + (hx - wx) * 0.4} -0.9 ${wx + (hx - wx) * 0.8} 0 ${hx} 1.4 C ${wx + (hx - wx) * 0.7} ${cb * 0.5} ${wx + (hx - wx) * 0.3} ${cb * 0.85} ${wx} ${cb} C ${wx * 0.7} ${cb * 1.1} ${wx * 0.3} ${cb * 1.05} 0 ${cb * 0.95} Z`
  return { sec, prim, covert, wx, cb, hx }
}

const KPLAN = wingPlan({ L: 70, wx: 22, chord: 19, cb: 8.5, nP: 10, nS: 10, hand: 0.42, tipBack: 0.42 })

// look: upper surface (blue-gray coverts, blackish primaries) or under surface (pale, barred).
function Wing({ m, upper }) {
  const p = KPLAN, r = rng(upper ? 3 : 8)
  const order = (arr) => upper ? [...arr].reverse() : arr
  const featherFill = upper
    ? { sec: '#7488AA', secTip: '#3A4052', prim: '#2B2C33', edge: '#141418', rach: '#0E0E12' }
    : { sec: '#E4E2DC', secTip: '#B9B6AF', prim: '#D8D5CE', edge: '#9C978E', rach: '#F6F4EF' }
  const marks = []
  ;[...p.sec, ...p.prim].forEach((f, k) => {
    const isP = k >= p.sec.length
    for (let s = 0.3 + (k % 3) * 0.04; s < 0.8; s += isP ? 0.13 : 0.16) {
      const len = Math.hypot(f.T[0] - f.B[0], f.T[1] - f.B[1]), ux = (f.T[0] - f.B[0]) / len, uy = (f.T[1] - f.B[1]) / len
      const c = along(f.B, f.T, s)
      if (upper) {
        // small pale spots on the inner web of the dark primaries
        if (isP && k % 2 === 0 && s < 0.7) marks.push(<ellipse key={`m${k}${s}`} cx={c[0] + uy * f.w * 0.25} cy={c[1] - ux * f.w * 0.25} rx="0.8" ry="0.5" fill="#B9BCC6" opacity="0.35"/>)
      } else {
        const h = f.w * 0.3
        marks.push(<path key={`m${k}${s}`} d={`M ${f2(c[0] + uy * h)} ${f2(c[1] - ux * h)} L ${f2(c[0] - uy * h)} ${f2(c[1] + ux * h)}`} stroke="#6A625C" strokeWidth={isP ? 0.8 : 0.65} opacity="0.4"/>)
      }
    }
  })
  const tips = []
  for (let row = 0; row < 3; row++) for (let i = 0; i < 7 - row; i++) {
    const x = 2 + i * (p.hx - 3) / (6 - row) + row * 1.5 + (r() - 0.5), y = p.cb * (0.88 - row * 0.28) + (r() - 0.5) * 0.6
    tips.push(<path key={`t${row}${i}`} d={`M ${f2(x - 1.6)} ${f2(y - 0.5)} q 1.6 1.4 3.2 0`} stroke={upper ? '#B8C6DE' : '#FFFFFF'} strokeWidth="0.5" fill="none" opacity={0.35 + r() * 0.2}/>)
  }
  const spots = upper
    ? [[5, 3.4], [9, 2.6], [13, 3.6], [7, 5.6], [11.5, 5.8], [16, 5], [20, 2.4], [24, 2.8]]
    : [[4, 2], [8, 1.6], [12, 2.4], [6, 4.4], [10.5, 4.6], [15, 3.6], [19, 1.4], [23, 1.8], [27, 1.2]]
  return (
    <g transform={`matrix(${m.join(' ')})`}>
      <g filter="url(#amkTex)">
        {order(p.sec).map((f, i) => <g key={`s${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.45, 0.9)} fill={featherFill.sec} stroke={featherFill.edge} strokeWidth="0.3" strokeOpacity="0.55"/>
          <path d={featherD(along(f.B, f.T, 0.8), f.T, f.w * 0.98, 0.45, 0.9)} fill={featherFill.secTip} opacity={upper ? 0.55 : 0.4}/>
        </g>)}
        {order(p.prim).map((f, i) => <g key={`p${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.4, 0.6)} fill={featherFill.prim} stroke={featherFill.edge} strokeWidth="0.3" strokeOpacity="0.6"/>
          {!upper && <path d={featherD(along(f.B, f.T, 0.82), f.T, f.w * 0.98, 0.4, 0.6)} fill="#8E8880" opacity="0.45"/>}
          <path d={`M ${f2(f.B[0])} ${f2(f.B[1])} L ${f2(along(f.B, f.T, 0.85)[0])} ${f2(along(f.B, f.T, 0.85)[1])}`} stroke={featherFill.rach} strokeWidth="0.3" opacity="0.5"/>
        </g>)}
        {marks}
        <path d={p.covert} fill={upper ? 'url(#amkWing)' : 'url(#amkUnder)'}/>
        {spots.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={upper ? 0.9 : 0.55} ry={upper ? 0.7 : 0.45} fill={BLK} opacity={upper ? 0.8 : 0.6}/>)}
        {tips}
        <path d={`M 0.5 -0.4 C ${p.wx * 0.35} -2.3 ${p.wx * 0.8} -2.5 ${p.wx} -1.2`} stroke={upper ? '#AFC0DC' : '#FFFFFF'} strokeWidth="0.8" fill="none" opacity="0.6" strokeLinecap="round"/>
      </g>
    </g>
  )
}

function Head({ blink = false }) {
  // Profile facing left; centre ≈ (47,36).
  return (
    <g>
      {/* nape (buff-rufous) + white face */}
      <path d="M 32 38 C 31 27 38 21 47 21 C 56 21 63 27 63 36 C 63 43 60 48 55 51 C 50 53.4 43 53 38 49.6 C 34.6 46.6 32 42.6 32 38 Z" fill="url(#amkFace)"/>
      <path d="M 54 30 C 59 30 63 33 63 37 C 63 43 60 48 55 51 L 54 30 Z" fill="#E9B67E"/>
      {/* blue-gray cap with rufous crown spot */}
      <g filter="url(#amkTex)">
        <path d="M 32.6 34 C 33.4 25.6 39.6 21 47 21 C 55 21 61.4 25.6 62.6 33.2 C 58 30.6 52.6 29.6 47 30 C 41.6 30.4 36.6 32 32.6 34 Z" fill="url(#amkCap)"/>
        <ellipse cx="51" cy="24.8" rx="5" ry="2.6" fill={RUF}/>
      </g>
      {/* false eye on the nape */}
      <ellipse cx="60.4" cy="40.4" rx="1.9" ry="2.8" fill={BLK}/>
      {/* sideburn (rear stripe) and mustache (below the eye) */}
      <path d="M 51.6 32.6 C 50.4 38 50.8 44 52.6 49.6 L 55.6 49 C 54.4 43.8 54.4 38 55.2 33.4 Z" fill={BLK}/>
      <path d="M 39.6 37.6 C 38.6 41.6 38.8 46 40.4 50 L 43.8 49.8 C 42.8 46 43 42 44.4 38.4 Z" fill={BLK}/>
      {/* soft shading under the jaw */}
      <path d="M 37 46 C 41 51 49 53 55 50" stroke="#C9B8A4" strokeWidth="2" fill="none" opacity="0.45" filter="url(#amkBlur)"/>
      {/* eye with yellow orbital ring */}
      {blink
        ? <path d="M 37.8 34.4 C 40 36 44.4 36 46.4 34.4" stroke={BLK} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="42" cy="34" r="5.4" fill="#F2C232"/>
            <circle cx="42" cy="34" r="4.3" fill="#3A1E0E"/>
            <circle cx="42" cy="34.1" r="2.5" fill="#0C0604"/>
            <circle cx="40.5" cy="32.5" r="1.4" fill="#FFF"/>
          </g>}
      {/* small hooked bill + cere */}
      <path d="M 34 34.2 C 30.6 34.2 28.6 36.2 28.3 39 C 28.2 40.4 28.8 41.5 29.6 41.9 C 29.8 40.5 30.6 39.5 32 39.1 L 34.6 38.7 Z" fill="#5C6A82"/>
      <path d="M 29.8 37.4 C 28.8 38.6 28.4 40.4 29.6 41.9 C 29.8 40.5 30.4 39.6 31 39.2 Z" fill={BLK}/>
      <path d="M 33.6 34.6 C 31.4 34.8 29.8 36 29.2 37.6" stroke="#8C9AB2" strokeWidth="0.5" fill="none" opacity="0.8"/>
      <path d="M 35.8 33.6 C 34.2 33.6 33.2 34.6 33.2 36 L 33.2 38.2 C 34.2 38.6 35.4 38.6 36.4 38.2 Z" fill="#F2C232"/>
    </g>
  )
}

function Spots({ pts, r = 0.9 }) {
  return pts.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 1.25} fill={BLK} opacity="0.78"/>)
}

function Tail({ d, band, tip }) {
  return (
    <g>
      <path d={d} fill="url(#amkTail)"/>
      <path d={band} stroke={BLK} strokeWidth="4" fill="none"/>
      <path d={tip} stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function PerchedBody() {
  return (
    <g>
      <g filter="url(#amkTex)">
        <Tail d="M 60 82 C 63 96 66 108 68 121 C 71.6 123 77 123 80.6 121 C 79 107 74 94 69 80 Z"
          band="M 67.4 114.4 C 71.6 116 76.6 116 80 114.4" tip="M 68 121 C 71.6 123 77 123 80.6 121"/>
        <path d="M 66 86 C 69 98 71 108 72.6 114" stroke="#A84A1A" strokeWidth="0.5" fill="none" opacity="0.6"/>
        {/* peachy breast fading to cream */}
        <path d="M 39 48 C 33 57 32 72 37 83 C 41 90 49 93 56 91 C 62 89 66 82 66 74 L 64 54 C 58 48 49 46 39 48 Z" fill="url(#amkBreast)"/>
        {/* soft form shading toward the belly and back */}
        <path d="M 37 80 C 42 89 50 92 57 90 C 61 88 64 84 65 78" stroke="#C9A886" strokeWidth="3" fill="none" opacity="0.35" filter="url(#amkBlur)"/>
      </g>
      <Spots pts={[[38, 70], [41.6, 75], [37.4, 78], [44, 81], [40.4, 84], [47.4, 85.6], [44.2, 71.4], [48, 77]]}/>
      <g filter="url(#amkTex)">
        {/* rufous back barred black, above the wing */}
        <path d="M 52 47 C 60 45 67 49 69 57 L 66 66 C 62 60 58 55 53 53 Z" fill={RUF}/>
        <path d="M 58 48.6 l 3 2 M 63 50.6 l 3 2.4 M 64.6 56 l 3 2" stroke={BLK} strokeWidth="1.2" strokeLinecap="round"/>
        {/* blue-gray folded wing with black spots, dark primaries */}
        <path d="M 54 53 C 63 50 70 57 71 67 C 72 78 72 88 73 99 C 68 95 63 87 60 79 C 56.6 70 54.6 62 54 53 Z" fill="url(#amkWing)"/>
        <path d="M 58 62 q 2 1.6 4 0.4 M 63 64 q 2 1.6 4 0.4 M 60 70 q 2 1.6 4 0.4 M 65 71 q 2 1.4 4 0.2 M 62 77 q 2 1.4 4 0.4" stroke="#C3D0E6" strokeWidth="0.55" fill="none" opacity="0.5"/>
        <path d="M 65 80 C 68 88 70.6 94 73 99 C 68.6 96 64.6 90 62.4 84 Z" fill="#2A2C36"/>
        <path d="M 66 82 l 4 12 M 64 84 l 4.6 10" stroke="#5A6070" strokeWidth="0.5"/>
        {/* shadow where the wing meets the breast */}
        <path d="M 54 54 C 55 64 57 72 61 80" stroke="#3A3028" strokeWidth="1.6" fill="none" opacity="0.3" filter="url(#amkBlur)"/>
      </g>
      <Spots pts={[[60, 60], [65, 62], [62, 66.6], [67, 68], [63.6, 72.4], [68, 74.6]]} r={1}/>
    </g>
  )
}

function Feet({ y = 92 }) {
  return (
    <g>
      <path d={`M 45 ${y} c 0 -2.6 2.4 -3.4 4.4 -3.4 l 2.6 0 c 1.6 0 2.6 1 3 2.8`} fill="#F2A81E" stroke="#B87A10" strokeWidth="0.6"/>
      <path d={`M 53 ${y + 0.4} c 0 -2.6 2.4 -3.4 4.4 -3.4 l 2.6 0 c 1.6 0 2.6 1 3 2.8`} fill="#F2A81E" stroke="#B87A10" strokeWidth="0.6"/>
      <path d={`M 45.4 ${y} l -0.8 1.6 M 53.4 ${y + 0.4} l -0.8 1.6 M 55 ${y - 0.6} l 0.4 1.8 M 63 ${y - 0.2} l 0.4 1.8`} stroke={BLK} strokeWidth="1" strokeLinecap="round"/>
    </g>
  )
}

function Perched({ blink }) {
  return (
    <g>
      <PerchedBody/>
      <Feet/>
      {/* head scaled down about the neck so it sits in true falcon proportion */}
      <g transform="translate(48,50) scale(0.8) translate(-48,-50)"><Head blink={blink}/></g>
    </g>
  )
}

// ── Hover ────────────────────────────────────────────────────────────────────
// Wing matrices: [x-axis image, y-axis image, shoulder]. Raised = top of the stroke, wings up in a
// V over the back (near wing shows its pale barred underside, far wing its blue-gray upperside).
// Down = wings swept forward and down (near wing now shows the upperside).
const HOVER_WINGS = {
  up: { far: [0.28, -0.86, 0.78, 0.22, 66, 58], near: [-0.45, -0.89, 0.9, -0.3, 62, 61], nearUpper: false },
  down: { far: [-0.62, -0.64, 0.6, -0.5, 66, 58], near: [-0.9, 0.36, 0.3, 0.86, 60, 62], nearUpper: true },
}

function HoverTail() {
  // Fanned and pushed down well below the body line; base at the vent.
  const base = [72, 80], feathers = []
  const n = 9
  for (let k = 0; k < n; k++) {
    const i = k < n / 2 ? k : n - 1 - (k - Math.floor(n / 2)) // outer pairs first, centre last
    const a = (72 + (i - (n - 1) / 2) * 6.2) * Math.PI / 180
    const len = 29 - Math.abs(i - (n - 1) / 2) * 0.9
    const T = [base[0] + Math.cos(a) * len, base[1] + Math.sin(a) * len]
    const outer = Math.abs(i - (n - 1) / 2) >= 3.5
    feathers.push(<g key={k}>
      <path d={featherD(base, T, 5.2, 0.5)} fill={outer ? '#E8D2BC' : 'url(#amkTail)'} stroke="#8A4018" strokeWidth="0.3" strokeOpacity="0.5"/>
      {outer && [0.35, 0.55].map(s => { const c = along(base, T, s); return <ellipse key={s} cx={c[0]} cy={c[1]} rx="1.6" ry="0.7" transform={`rotate(${a * 180 / Math.PI + 90} ${c[0]} ${c[1]})`} fill={BLK} opacity="0.7"/> })}
      <path d={featherD(along(base, T, 0.78), along(base, T, 0.92), 5.4, 0.5)} fill={BLK}/>
      <path d={featherD(along(base, T, 0.9), T, 5.1, 0.5)} fill="#F8F4EE"/>
    </g>)
  }
  return <g filter="url(#amkTex)">{feathers}</g>
}

function HoverBody() {
  // Drawn level, then pitched 40° nose-up about the body centre.
  const outline = 'M 42 66 C 44 60 52 58 60 59 C 68 60 76 63 81 68 C 81 73 77 77 71 79 C 62 82 52 82 46 79 C 42 76 40 71 42 66 Z'
  return (
    <g transform="rotate(40 60 70)">
      <g filter="url(#amkTex)">
        <path d={outline} fill="url(#amkBreast)"/>
        <path d="M 44 64.5 C 50 59.6 60 58.4 68 60.2 C 74 61.8 78 64 81 68 C 72 67.4 58 66.6 45 67.6 Z" fill={RUF}/>
        <path d="M 52 61 l 2 2.4 M 58 60 l 2 2.6 M 64 61 l 2 2.4 M 70 62.6 l 1.8 2.4" stroke={BLK} strokeWidth="1" strokeLinecap="round" opacity="0.85"/>
        <path d="M 70 78.6 C 74 77.6 78 75 81 71 L 82 74 C 79 77.4 75 79.4 71 80 Z" fill="#F7EFE4"/>
        <path d="M 44 76 C 52 81 62 81.6 71 79" stroke="#C9A886" strokeWidth="2.6" fill="none" opacity="0.4" filter="url(#amkBlur)"/>
      </g>
      <Spots pts={[[50, 72], [55, 74.6], [60, 72.6], [64, 76], [69, 74], [57, 78]]} r={0.8}/>
    </g>
  )
}

function Hover({ down }) {
  const w = down ? HOVER_WINGS.down : HOVER_WINGS.up
  return (
    <g transform="translate(58,70) scale(0.84) translate(-60,-66)">
      <Wing m={w.far} upper/>
      <HoverTail/>
      <HoverBody/>
      {/* head held level and still, bill angled down at the grass */}
      <g transform="translate(41,50) rotate(-24) scale(0.66) translate(-47,-37)"><Head/></g>
      <Wing m={w.near} upper={w.nearUpper}/>
    </g>
  )
}

// ── Habitat: open farmland ───────────────────────────────────────────────────
function treeline(seed, y0, amp, step) {
  const r = rng(seed)
  let d = `M -2 ${y0 + 6} L -2 ${y0}`, x = -2
  while (x < 122) { const w = step * (0.6 + r() * 0.8), top = y0 - amp * (0.3 + r() * 0.7); d += ` Q ${f2(x + w * 0.2)} ${f2(top)} ${f2(x + w * 0.5)} ${f2(top + r() * 1.2)} Q ${f2(x + w * 0.8)} ${f2(top)} ${f2(x + w)} ${f2(y0 - amp * 0.2 * r())}`; x += w }
  return d + ` L 122 ${y0 + 6} Z`
}

function Scene({ horizon, pole }) {
  const r = rng(21)
  const grass = Array.from({ length: 70 }, (_, i) => {
    const x = (i * 1.73 + r() * 2) % 122, h = 3 + r() * 7, lean = (r() - 0.5) * 4
    return <path key={i} d={`M ${f2(x)} 131 q ${f2(lean * 0.3)} ${f2(-h * 0.6)} ${f2(lean)} ${f2(-h)}`} stroke={['#9C8443', '#B9A05A', '#7E6E3A', '#CDB77A'][i % 4]} strokeWidth="0.6" fill="none" opacity="0.8"/>
  })
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#amkSky)"/>
      <g filter="url(#amkSoft)" opacity="0.85">
        <ellipse cx="22" cy="20" rx="20" ry="5" fill="#FFF"/>
        <ellipse cx="34" cy="24" rx="14" ry="4" fill="#F4F7FA"/>
        <ellipse cx="96" cy="34" rx="18" ry="4.5" fill="#FFF" opacity="0.8"/>
      </g>
      <path d={treeline(7, horizon - 4, 5, 6)} fill="#9DAAA6" opacity="0.8" filter="url(#amkBlur)"/>
      <path d={treeline(3, horizon, 4, 4)} fill="#5E6D4C" filter="url(#amkBlur)"/>
      <g filter="url(#amkGrain)">
        <path d={`M 0 ${horizon} C 40 ${horizon - 1} 80 ${horizon + 1} 120 ${horizon - 0.5} L 120 130 L 0 130 Z`} fill="url(#amkField)"/>
        {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M -4 ${horizon + 3 + i * i * 1.4} C 40 ${horizon + 2 + i * i * 1.3} 80 ${horizon + 4 + i * i * 1.4} 124 ${horizon + 2.5 + i * i * 1.4}`} stroke="#A68E4E" strokeWidth={0.4 + i * 0.2} fill="none" opacity="0.5"/>)}
      </g>
      {grass}
      {pole && (
        <g>
          <path d="M 104.8 76 L 106.6 130 L 112.6 130 L 110.6 76 Z" fill="url(#amkPole)"/>
          <path d="M 106.6 84 l 0.6 44 M 108.8 80 l 0.4 48" stroke="#4E3E2E" strokeWidth="0.4" opacity="0.6"/>
          <path d="M 96 88.6 L 120 87.8 L 120 90.8 L 96 91.6 Z" fill="#6E5842"/>
          <path d="M 96 91.6 L 120 90.8" stroke="#3E3226" strokeWidth="0.5" opacity="0.7"/>
          <path d="M 99 85.4 h 2.2 v 3 h -2.2 Z M 115.4 84.8 h 2.2 v 3 h -2.2 Z" fill="#8FB4AE" opacity="0.9"/>
          <path d="M -2 86 Q 50 96.4 100 85.6" stroke="#2C2C30" strokeWidth="1.1" fill="none"/>
          <path d="M -2 99 Q 58 108 116.5 85" stroke="#2C2C30" strokeWidth="0.9" fill="none" opacity="0.75"/>
        </g>
      )}
    </g>
  )
}

export default function AmericanKestrel({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'hover' ? 160 : 420); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 6
  const hover = pose === 'hover'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Kestrel">
      <defs>
        <linearGradient id="amkCap" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#9AAFD0"/><stop offset="100%" stopColor="#6E84AA"/></linearGradient>
        <linearGradient id="amkWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#A2B4D2"/><stop offset="60%" stopColor="#8299BE"/><stop offset="100%" stopColor="#6A80A6"/></linearGradient>
        <linearGradient id="amkUnder" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FBF3E8"/><stop offset="100%" stopColor="#EEE0CC"/></linearGradient>
        <linearGradient id="amkBreast" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F2C996"/><stop offset="100%" stopColor="#FBF1E2"/></linearGradient>
        <radialGradient id="amkFace" cx="0.35" cy="0.45" r="0.8"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F8F2E8"/><stop offset="100%" stopColor="#E6DCCD"/></radialGradient>
        <linearGradient id="amkTail" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D86E30"/><stop offset="100%" stopColor="#BE5620"/></linearGradient>
        <linearGradient id="amkSky" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stopColor="#6FA8D6"/><stop offset="100%" stopColor="#D9E8EF"/></linearGradient>
        <linearGradient id="amkField" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#CDB879"/><stop offset="100%" stopColor="#A88E4C"/></linearGradient>
        <linearGradient id="amkPole" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8A735A"/><stop offset="100%" stopColor="#5E4C3A"/></linearGradient>
        <clipPath id="amkFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="amkSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="amkBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="amkTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.55" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.04  0 0 0 0 0.03  0.9 0 0 0 -0.4" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="amkGrain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.25 1.2" numOctaves="2" seed="9" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.05  1.4 0 0 0 -0.55" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#amkFrame)">
        {scene && <Scene horizon={hover ? 116 : 108} pole={!hover}/>}
        {!scene && !hover && <path d="M 18 91 Q 52 94 92 91" stroke="#2C2C30" strokeWidth="1.4" fill="none"/>}
        {hover
          ? <g transform={`translate(0,${bob * 0.4})`}><Hover down={animated && frame % 2 === 1}/></g>
          : <g transform={`translate(0,${bob * 0.5})`}><Perched blink={blink}/></g>}
      </g>
    </svg>
  )
}
