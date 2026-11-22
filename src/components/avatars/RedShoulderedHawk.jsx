// Red-shouldered Hawk (adult, eastern) — naturalistic technique (see BaldEagle.jsx pass 3).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped
// to the plumage; barring and checkering are soft, slightly blurred marks rather than drawn
// shapes. Field marks: RUSTY-ORANGE breast and belly finely barred pale; rufous "SHOULDER" on the
// folded wing; flight feathers boldly CHECKERED black-and-white; long BLACK TAIL with narrow WHITE
// BANDS and a white tip; yellow cere and legs; dark adult eye; brown head with rufous cheek.
// In flight (from below): broad buteo wings with five fingers, rusty barred coverts, barred pale
// flight feathers with a dark trailing edge, black tips and a translucent pale CRESCENT at the
// base of the primaries; slimmer and longer-tailed than a Red-tailed Hawk.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'red_shouldered_hawk', poses: ['perch', 'glide'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

function blade(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} L ${P(l * 0.8, -w * 0.5)} Q ${P(l * 1.02, -w * 0.3)} ${P(l, 0.1)} Q ${P(l * 0.98, w * 0.45)} ${P(l * 0.8, w * 0.5)} L ${P(0, w * 0.5)} Z`} fill={fill}/>
}

// A primary "finger": broad at the base, tapering to a rounded tip.
function quill(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} C ${P(l * 0.5, -w * 0.5)} ${P(l * 0.8, -w * 0.36)} ${P(l * 0.97, -w * 0.18)} Q ${P(l * 1.03, 0)} ${P(l * 0.95, w * 0.2)} C ${P(l * 0.8, w * 0.38)} ${P(l * 0.5, w * 0.5)} ${P(0, w * 0.5)} Z`} fill={fill}/>
}

// Trailing edge of the secondaries as a row of soft feather tips (inner x=4 → outer x=38.4).
function teY(x) { return x >= 20 ? 65 - 4.2 * ((x - 20) / 18.4) ** 2 : 65 - (20 - x) / 16 }
function trailing(X, s) {
  let d = `${X(38.4)} 60.8`
  const n = 11
  for (let i = 1; i <= n; i++) {
    const x0 = 38.4 - (i - 1) * (34.4 / n), x1 = 38.4 - i * (34.4 / n), xm = (x0 + x1) / 2
    d += ` Q ${X(xm)} ${(teY(xm) + 1.3).toFixed(2)} ${X(x1)} ${teY(x1).toFixed(2)}`
  }
  return d
}

const BODY_D = 'M 41 39 C 36.6 46 35.4 56 36.2 66 C 37.2 77 41.6 87 48 94 L 60 97 C 64 94 67.4 88 69 80 L 70.4 62 C 70 50 65 42 58 38.6 C 52 36.6 45 36.6 41 39 Z'
const WING_D = 'M 48 41 C 55 36 64 38 68 45 C 73 54 75 66 75 80 C 75 92 74.4 101 73 109 C 68.6 102 63.6 93 59.4 85 C 53 74 49 60 48 41 Z'

// ── Perched, side view facing left ───────────────────────────────────────────
function Perched({ blink }) {
  const r = rng(13)
  const bars = [], spots = [], tips = []
  for (let i = 0; i < 17; i++) {
    const y = 45.5 + i * 3.1 + (r() - 0.5) * 0.6
    bars.push(<path key={`b${i}`} d={`M 33 ${y} C 42 ${y + 1.8} 54 ${y + 1.6} 72 ${y - 0.8}`} stroke="#F3DEC4" strokeWidth={0.75 + r() * 0.3} fill="none" opacity={0.5 + r() * 0.15}/>)
  }
  // white bars on each black flight feather, lining up into the checkerboard
  for (let row = 0; row < 10; row++) for (let c = 0; c < 5; c++) {
    const x = 53.6 + c * 3.6 + row * 0.9 + (r() - 0.5) * 0.6, y = 58 + row * 4.4 + c * 1.5 + (r() - 0.5) * 0.6
    spots.push(<ellipse key={`s${row}${c}`} cx={x} cy={y} rx="1.5" ry="0.55" transform={`rotate(18 ${x} ${y})`} fill="#ECE4D6" opacity={0.55 + r() * 0.2}/>)
  }
  for (let row = 0; row < 3; row++) for (let i = 0; i < 4; i++) {
    const x = 52 + i * 4.4 + row * 1.4, y = 44 + row * 4 + i * 1.4
    tips.push(<path key={`t${row}${i}`} d={`M ${x - 2} ${y} q 2 2.8 4.2 0.4`} stroke="#E2A070" strokeWidth="0.5" fill="none" opacity="0.35"/>)
  }
  return (
    <g>
      {/* long black tail with narrow white bands, extending well past the wingtips */}
      <g filter="url(#rshTex)">
        <path d="M 61 95 L 71.4 96.6 L 75.6 124 C 72 125.6 66.6 125.6 63 124.4 Z" fill="url(#rshTail)"/>
      </g>
      {[103.4, 110.6, 117.6].map((y, i) => <path key={i} d={`M ${61.6 + i * 0.6} ${y} Q 68 ${y + 1} ${73.4 + i * 0.6} ${y + 0.2}`} stroke="#ECE6DA" strokeWidth="1.2" fill="none" opacity="0.85"/>)}
      <path d="M 63 124.4 C 66.6 125.6 72 125.6 75.6 124" stroke="#ECE6DA" strokeWidth="1.1" fill="none" opacity="0.9"/>
      <g filter="url(#rshTex)">
        {/* rusty breast and belly, finely barred pale */}
        <path d={BODY_D} fill="url(#rshBreast)"/>
        <g clipPath="url(#rshBodyClip)" filter="url(#rshSoftB)">
          {bars}
          {[[40, 42], [44, 41.4], [48, 42.4], [42, 46], [46.4, 45.6], [50, 46.4]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 0.5 2.6`} stroke="#5E2E18" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>)}
          <path d="M 60 40 C 66 46 69 58 70 72 L 62 74 C 60 60 58 48 56 40 Z" fill="#5A2810" opacity="0.35"/>
        </g>
        {/* barred leg feathers */}
        <path d="M 44 82 C 43.4 89 46 95 51 98.6 L 58.6 98.6 C 59.4 93 57.4 87 53.6 83 Z" fill="#B0582A"/>
        <path d="M 45 87 q 4 1 8.6 0 M 46 91 q 4 1 10 0 M 47.6 95 q 4 1 10 0" stroke="#F0DCC4" strokeWidth="0.7" fill="none" opacity="0.55" filter="url(#rshSoftB)"/>
        {/* folded wing: rufous shoulder over checkered black-and-white flight feathers */}
        <path d={WING_D} fill="url(#rshWing)"/>
        <g clipPath="url(#rshWingClip)">
          <g filter="url(#rshSoftB)">{spots}
            {[92, 97, 102, 106].map((y, i) => <path key={i} d={`M 60 ${y} L 76 ${y + 3}`} stroke="#E4DCCE" strokeWidth="0.7" opacity="0.55"/>)}
          </g>
          <path d="M 48 41 C 55 36 64 38 68 45 C 70.4 49.6 71.4 54 71.8 58 C 64 57.2 56 54.4 50 51.4 C 48.6 48 48 44.6 48 41 Z" fill="url(#rshShoulder)"/>
          <g>{tips}</g>
          <path d="M 50 51.4 C 56 54.4 64 57.2 71.8 58" stroke="#2A1A10" strokeWidth="1.2" fill="none" opacity="0.4" filter="url(#rshBlur)"/>
        </g>
        <path d="M 48 41 C 49 60 53 74 59.4 85" stroke="#1A0E06" strokeWidth="1.6" fill="none" opacity="0.3" filter="url(#rshBlur)"/>
      </g>
      {/* yellow legs and feet */}
      <path d="M 50.6 98 L 50.2 102.4 M 56.2 98.4 L 56.4 102.8" stroke="#E8B830" strokeWidth="2.3" strokeLinecap="round"/>
      <path d="M 46.4 104 C 48 102.2 50.6 102 52.6 103.2 M 53 104.2 C 55 102.6 57.8 102.8 59.6 104.2" stroke="#ECBE38" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M 46.4 104 q -1.3 0.7 -1 2.1 M 52.6 103.2 q 0.8 1 0.2 2.2 M 59.6 104.2 q 1.1 0.8 0.7 2" stroke="#15100C" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      {/* head: brown, rufous cheek, pale streaked throat */}
      <g filter="url(#rshTex)">
        <path d="M 38 25 C 39.4 21 43.4 18.6 48 18.6 C 53 18.8 56.6 22 57.4 26.8 C 58 31 59.6 35 62 38.4 C 56 42.4 48 43.2 41.6 40.6 C 40 37.4 39.2 33.6 39 30 Z" fill="url(#rshHead)"/>
        <path d="M 41 31 C 45 30 50 31 54.4 34 C 52.4 38.6 47 40.6 42 39.6 C 40.6 37 40.4 33.6 41 31 Z" fill="#B8683A" opacity="0.7" filter="url(#rshBlur)"/>
        <path d="M 39.4 31 C 40 35 41 38.4 42.4 40.6 C 44 39.6 44 36 42.4 32.4 Z" fill="#E0CCAE" opacity="0.8" filter="url(#rshBlur)"/>
      </g>
      <path d="M 44 21.4 l 1.4 1 M 47.6 20.6 l 1.4 1 M 51 21.4 l 1.4 1 M 53.4 24 l 1.2 1 M 49.4 24.4 l 1.4 1 M 55 28.6 l 1.2 1.2" stroke="#3E2818" strokeWidth="0.7" strokeLinecap="round" opacity="0.45"/>
      {/* brow ridge + small dark adult eye */}
      <path d="M 38.6 25.6 C 40.6 24.2 44.4 24.2 47 26 C 44.4 25.6 41.4 26 39.4 27.2 Z" fill="#3E2A1C"/>
      {blink
        ? <path d="M 40.9 27.8 q 1.5 0.8 3 0" stroke="#3E2A1C" strokeWidth="0.8" fill="none"/>
        : <g>
            <ellipse cx="42.4" cy="27.8" rx="1.55" ry="1.4" fill="#4A2A16"/>
            <circle cx="42.4" cy="27.8" r="0.8" fill="#0D0704"/>
            <circle cx="42" cy="27.3" r="0.27" fill="#FFF"/>
          </g>}
      {/* yellow cere + dark hooked bill */}
      <path d="M 36.6 25.8 C 34.6 26 33 27.2 32.3 29.2 C 31.8 31 32 32.8 32.9 34 C 33.1 32.4 33.8 31.3 35 31 L 39.2 30.4 L 39.2 29.8 L 36.6 29.6 Z" fill="url(#rshBill)"/>
      <path d="M 35 31 L 39.2 30.4 L 39 32.2 C 37.2 32.6 35.8 32.4 35 31 Z" fill="#2E2E34"/>
      <path d="M 39.4 25.2 C 38 25 37.1 25.3 36.4 25.9 L 36.6 29.8 L 39.4 30.2 Z" fill="#E6B630"/>
      <path d="M 36.2 26.1 C 34.6 26.5 33.4 27.4 32.8 28.8" stroke="#6C6E78" strokeWidth="0.55" fill="none" strokeLinecap="round"/>
      <path d="M 39.2 30.6 L 41 30.4" stroke="#D9A82A" strokeWidth="0.6"/>
    </g>
  )
}

// ── Gliding overhead, seen from below ────────────────────────────────────────
function UnderWing({ s }) {
  const X = (x) => 60 + s * x
  // broad, rounded buteo hand: five fingers fanning from an arc, the outermost shortest
  // fingers: pale, dark-barred primaries with black tips
  const fingers = [[39.6, 45.2, -16, 9.6], [40.4, 48.4, -5, 12.6], [40.2, 51.8, 6, 13.2], [39.4, 55.2, 17, 11.8], [37.8, 58.4, 28, 9.4]].flatMap(([x, y, a0, L], i) => {
    const a = s > 0 ? a0 : 180 - a0, t = a * Math.PI / 180, k = 0.45
    return [quill(`f${i}`, X(x), y, a, L, 3.4, '#CFC6B8'),
      quill(`g${i}`, X(x) + Math.cos(t) * L * 0.18, y + Math.sin(t) * L * 0.18, a, L * 0.14, 3.3, '#5A5048'),
      quill(`h${i}`, X(x) + Math.cos(t) * L * k, y + Math.sin(t) * L * k, a, L * (1 - k), 3.1, '#221C17')]
  })

  const te = trailing(X, s)
  const R = `M ${X(4)} 44.8 C ${X(12)} 41.6 ${X(20)} 39.6 ${X(28)} 39.6 C ${X(34)} 39.8 ${X(38)} 41.6 ${X(40)} 44.2 C ${X(41)} 48 ${X(40.8)} 53 ${X(39.8)} 56 C ${X(39.2)} 58 ${X(38.8)} 59.6 ${te} Z`
  return (
    <g>
      {fingers}
      <path d={R} fill="url(#rshRemiges)"/>
      {/* barring on the flight feathers */}
      {[3, 5.6, 8.2, 10.8].map((o, i) => <path key={`b${i}`} d={`M ${X(5)} ${64 - o} C ${X(14)} ${65 - o} ${X(26)} ${64.6 - o} ${X(39)} ${60.6 - o * 0.9}`} stroke="#5E564E" strokeWidth="0.7" strokeDasharray="2.6 0.7" fill="none" opacity="0.38" filter="url(#rshSoftB)"/>)}
      {/* dark trailing edge; primaries darkening toward black tips */}
      <path d={`M ${te}`} stroke="#2E2620" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinejoin="round"/>


      {/* translucent pale crescent ("window") at the base of the primaries */}
      <path d={`M ${X(32.4)} 41.2 C ${X(35.6)} 46 ${X(36.4)} 53 ${X(34.4)} 61.4 C ${X(33.8)} 54 ${X(33.2)} 47 ${X(30.6)} 41 Z`} fill="#FBF4E4" opacity="0.7" filter="url(#rshBlur)"/>
      {/* rusty, finely barred underwing coverts */}
      <path d={`M ${X(4)} 44.8 C ${X(12)} 41.6 ${X(20)} 39.6 ${X(28)} 39.6 C ${X(31)} 39.7 ${X(33.4)} 40.2 ${X(35)} 40.8 C ${X(31.4)} 45.4 ${X(27)} 48.6 ${X(21)} 50.4 C ${X(15)} 52 ${X(9)} 52.6 ${X(4)} 53 Z`} fill="url(#rshCoverts)"/>
      {[44, 46.6, 49.2].map((y, i) => <path key={`cb${i}`} d={`M ${X(5)} ${y + 0.6} C ${X(14)} ${y - 1.2} ${X(22)} ${y - 1.6 + i * 0.6} ${X(31 - i * 4)} ${y - 1.4 + i * 1.2}`} stroke="#F2DCC2" strokeWidth="0.6" strokeDasharray="1.4 1.1" fill="none" opacity="0.5" filter="url(#rshSoftB)"/>)}
    </g>
  )
}

function Gliding() {
  const bars = Array.from({ length: 8 }, (_, i) => <path key={i} d={`M 54 ${45.6 + i * 3} q 6 1.6 12 0`} stroke="#F2DCC2" strokeWidth="0.7" fill="none" opacity="0.55"/>)
  return (
    <g transform="rotate(11 60 60) translate(60 60) scale(0.9) translate(-60 -60)">
      {/* long tail, slightly fanned: black with narrow white bands, white tip */}
      <g filter="url(#rshTex)"><path d="M 55.6 67 L 64.4 67 L 69 91.6 C 63 94.2 57 94.2 51 91.6 Z" fill="#2A2522"/></g>
      {[74.6, 81.4, 87.6].map((y, i) => <path key={i} d={`M ${54.6 - i * 1.4} ${y} Q 60 ${y + 1.4} ${65.4 + i * 1.4} ${y}`} stroke="#ECE6DA" strokeWidth="1.25" fill="none" opacity="0.9"/>)}
      <path d="M 51 91.6 C 57 94.2 63 94.2 69 91.6" stroke="#ECE6DA" strokeWidth="1.1" fill="none"/>
      <g filter="url(#rshTexL)"><UnderWing s={-1}/><UnderWing s={1}/></g>
      <g filter="url(#rshTex)">
        <path d="M 55.2 46 C 55.2 41.6 57.4 39.6 60 39.6 C 62.6 39.6 64.8 41.6 64.8 46 L 65.2 60 C 64.8 66 62.6 69.6 60 70 C 57.4 69.6 55.2 66 54.8 60 Z" fill="url(#rshBreastU)"/>
        <g clipPath="url(#rshBellyClip)" filter="url(#rshSoftB)">{bars}</g>
      </g>
      <path d="M 57.6 68 l -0.4 2.6 M 62.4 68 l 0.4 2.6" stroke="#E8B830" strokeWidth="1.6" strokeLinecap="round"/>
      {/* head: brown, pale throat; tiny bill and yellow cere foreshortened */}
      <path d="M 55.6 42.6 C 55 38 57 34.2 60 33.8 C 63 34.2 65 38 64.4 42.6 C 61.6 41.6 58.4 41.6 55.6 42.6 Z" fill="url(#rshHead)"/>
      <ellipse cx="60" cy="38.6" rx="2.2" ry="2.6" fill="#D8C2A2" opacity="0.6" filter="url(#rshBlur)"/>
      <path d="M 58.8 34.6 L 61.2 34.6 L 61 33.6 L 59 33.6 Z" fill="#E6B630"/>
      <path d="M 59.1 33.8 C 59.3 32.2 59.7 31.4 60 31.2 C 60.3 31.4 60.7 32.2 60.9 33.8 Z" fill="#2E2E34"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
function Trunk({ x, w, top = -5, bottom = 130, lean = 0, fill, blur }) {
  return <path d={`M ${x} ${bottom} C ${x + lean * 0.3} ${bottom - 40} ${x + lean * 0.7} ${top + 40} ${x + lean} ${top} L ${x + lean + w * 0.8} ${top} C ${x + w * 0.9 + lean * 0.7} ${top + 40} ${x + w + lean * 0.3} ${bottom - 40} ${x + w * 1.1} ${bottom} Z`} fill={fill} filter={blur}/>
}

function SwampWoods() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#rshMist)"/>
      {/* receding trunks: farthest palest and softest */}
      <g opacity="0.55">
        {[[8, 3], [30, 2.4], [52, 2.6], [76, 2.2], [112, 3]].map(([x, w], i) => <Trunk key={i} x={x} w={w} lean={(i % 2 ? 1 : -1) * 1.2} fill="#9DAAA2" blur="url(#rshFar)"/>)}
      </g>
      <g opacity="0.8">
        {[[20, 4.4], [64, 4], [90, 3.6]].map(([x, w], i) => <Trunk key={i} x={x} w={w} lean={(i % 2 ? -1 : 1) * 2} fill="#6E7B6E" blur="url(#rshMid)"/>)}
        <g filter="url(#rshMid)" stroke="#6E7B6E" fill="none" strokeLinecap="round">
          <path d="M 23 44 C 30 38 36 36 44 35 M 33 39 C 36 34 38 30 38 26" strokeWidth="1.4"/>
          <path d="M 64 62 C 58 56 52 54 46 54" strokeWidth="1.2"/>
          <path d="M 92 30 C 84 24 78 22 72 22 M 82 25 C 80 20 80 16 82 12" strokeWidth="1.1"/>
        </g>
      </g>
      {/* dark swamp water with trunk reflections */}
      <rect x="0" y="110" width="120" height="20" fill="url(#rshPool)"/>
      <g filter="url(#rshMid)" opacity="0.5">
        <path d="M 20 111 h 4.6 v 14 h -4.6 Z M 64 111 h 4 v 12 h -4 Z M 90 111 h 3.6 v 13 h -3.6 Z" fill="#4E5C52"/>
      </g>
      <path d="M 6 116 h 12 M 30 120 h 18 M 70 117 h 14 M 86 124 h 20 M 10 126 h 14" stroke="#A9C2BE" strokeWidth="0.5" opacity="0.5" strokeLinecap="round"/>
      <path d="M 34 123.4 c 2 -1.6 4.6 -1.4 6 0.4 c -2 1.4 -4 1.4 -6 -0.4 Z" fill="#B66A2C" opacity="0.85"/>
      <path d="M 80 119.4 c 1.6 -1.3 3.8 -1.2 5 0.3 c -1.6 1.2 -3.4 1.2 -5 -0.3 Z" fill="#9C4A22" opacity="0.8"/>
      {/* near trunk the branch grows from */}
      <g filter="url(#rshTex)">
        <Trunk x={100} w={10} top={-6} lean={1.5} fill="url(#rshBark)"/>
      </g>
      <path d="M 103 10 C 102.6 40 102.4 80 103 120 M 106.4 0 C 106.4 40 106 90 107.4 128" stroke="#2C2620" strokeWidth="0.5" fill="none" opacity="0.5"/>
    </g>
  )
}

function Canopy() {
  // Out-of-focus autumn twigs framing the sky, as seen looking up through the woods.
  const r = rng(31)
  const cols = ['#B0602A', '#C98A34', '#8E3E1E', '#7E8A3A', '#D4A040']
  const leaves = []
  const along = (key, x0, y0, x1, y1, n) => {
    for (let i = 0; i < n; i++) {
      const t = i / n, x = x0 + (x1 - x0) * t + (r() - 0.5) * 6, y = y0 + (y1 - y0) * t + (r() - 0.5) * 6
      const a = r() * 360, L = 4 + r() * 3
      leaves.push(<path key={`${key}${i}`} d={`M 0 0 C ${L * 0.3} ${-L * 0.32} ${L * 0.75} ${-L * 0.3} ${L} 0 C ${L * 0.75} ${L * 0.3} ${L * 0.3} ${L * 0.32} 0 0 Z`} transform={`translate(${x} ${y}) rotate(${a})`} fill={cols[Math.floor(r() * cols.length)]}/>)
    }
  }
  along('a', -2, 104, 30, 128, 16)
  along('b', 96, -2, 122, 22, 14)
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#rshSky)"/>
      <g filter="url(#rshSoftL)" opacity="0.8">
        <ellipse cx="30" cy="30" rx="22" ry="6" fill="#FFF"/>
        <ellipse cx="92" cy="96" rx="20" ry="5" fill="#F6F8FA"/>
      </g>
      <g filter="url(#rshMid)">
        <path d="M -4 116 C 8 112 18 114 32 126 M 6 113 C 10 118 12 124 12 132" stroke="#3E3026" strokeWidth="1.6" fill="none"/>
        <path d="M 124 6 C 112 8 104 4 96 -4 M 112 7 C 110 12 112 18 116 22" stroke="#3E3026" strokeWidth="1.4" fill="none"/>
        {leaves}
      </g>
    </g>
  )
}

export default function RedShoulderedHawk({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const drift = animated ? [0, -0.3, -0.6, -0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8, 0.6, 0.3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Red-shouldered Hawk">
      <defs>
        <linearGradient id="rshSky" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#6BA0CC"/><stop offset="100%" stopColor="#C6DCE8"/></linearGradient>
        <linearGradient id="rshMist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B4C2BC"/><stop offset="80%" stopColor="#D6DCD0"/><stop offset="100%" stopColor="#C2C8BA"/></linearGradient>
        <linearGradient id="rshPool" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5E7068"/><stop offset="100%" stopColor="#24342F"/></linearGradient>
        <linearGradient id="rshBark" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6A5A48"/><stop offset="50%" stopColor="#4A3E32"/><stop offset="100%" stopColor="#2A231C"/></linearGradient>
        <linearGradient id="rshHead" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#8E6646"/><stop offset="100%" stopColor="#5A3E2A"/></linearGradient>
        <linearGradient id="rshBreast" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0%" stopColor="#D58447"/><stop offset="55%" stopColor="#B85E2E"/><stop offset="100%" stopColor="#7A3A1C"/></linearGradient>
        <linearGradient id="rshBreastU" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A8542A"/><stop offset="50%" stopColor="#C46A36"/><stop offset="100%" stopColor="#9A4C26"/></linearGradient>
        <linearGradient id="rshWing" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#3E3024"/><stop offset="60%" stopColor="#241B14"/><stop offset="100%" stopColor="#14100C"/></linearGradient>
        <linearGradient id="rshShoulder" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C8693A"/><stop offset="100%" stopColor="#8E4220"/></linearGradient>
        <linearGradient id="rshTail" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2E2824"/><stop offset="100%" stopColor="#141110"/></linearGradient>
        <linearGradient id="rshBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A4C56"/><stop offset="100%" stopColor="#18181C"/></linearGradient>
        <linearGradient id="rshRemiges" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#DDD5C8"/><stop offset="100%" stopColor="#B4AA9E"/></linearGradient>
        <linearGradient id="rshCoverts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C4693A"/><stop offset="100%" stopColor="#A2522A"/></linearGradient>
        <linearGradient id="rshHandR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#262019" stopOpacity="0"/><stop offset="40%" stopColor="#262019" stopOpacity="0.35"/><stop offset="100%" stopColor="#262019" stopOpacity="0.85"/></linearGradient>
        <linearGradient id="rshHandL" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#262019" stopOpacity="0"/><stop offset="40%" stopColor="#262019" stopOpacity="0.35"/><stop offset="100%" stopColor="#262019" stopOpacity="0.85"/></linearGradient>
        <clipPath id="rshFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="rshBodyClip"><path d={BODY_D}/></clipPath>
        <clipPath id="rshWingClip"><path d={WING_D}/></clipPath>
        <clipPath id="rshBellyClip"><path d="M 55.2 46 C 55.2 41.6 57.4 39.6 60 39.6 C 62.6 39.6 64.8 41.6 64.8 46 L 65.2 60 C 64.8 66 62.6 69.6 60 70 C 57.4 69.6 55.2 66 54.8 60 Z"/></clipPath>
        <filter id="rshSoftL" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="rshFar" x="-50%" y="-5%" width="200%" height="110%"><feGaussianBlur stdDeviation="1.4"/></filter>
        <filter id="rshMid" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur stdDeviation="0.8"/></filter>
        <filter id="rshBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="rshSoftB" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.3"/></filter>
        <filter id="rshTexL" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2 0.55" numOctaves="2" seed="3" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.26  0 0 0 0 0.22  0.4 0 0 0 -0.2" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="rshTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.4" numOctaves="2" seed="9" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.2 0 0 0 -0.45" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#rshFrame)">
        {pose === 'glide' ? (
          <>
            {scene && <Canopy/>}
            <g transform={`translate(0,${drift}) rotate(${drift * 1.2} 60 60)`}><Gliding/></g>
          </>
        ) : (
          <>
            {scene && <SwampWoods/>}
            <path d={scene ? 'M 4 107.6 C 40 105.6 70 103.6 104 99' : 'M 32 106 C 48 104.6 64 103.4 80 102'} stroke="#54443A" strokeWidth="4.6" fill="none" strokeLinecap="round"/>
            <path d={scene ? 'M 6 105.8 C 40 103.8 70 101.8 102 97.4' : 'M 34 104.2 C 48 102.8 64 101.6 78 100.2'} stroke="#7C8F45" strokeWidth="1.3" fill="none" opacity="0.8" strokeLinecap="round"/>
            {scene && <path d="M 14 106.4 q 0.6 3 -0.4 5.6 M 26 105.6 q 0.4 2.4 -0.2 4.2 M 84 101 q 0.6 3 -0.2 5" stroke="#7C8F45" strokeWidth="0.8" fill="none" opacity="0.7" strokeLinecap="round"/>}
            <Perched blink={blink}/>
          </>
        )}
      </g>
    </svg>
  )
}
