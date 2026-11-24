// Mourning Dove — naturalistic technique of BaldEagle.jsx / Merlin.jsx (style guide v2).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to the
// plumage; feather detail only as soft low-contrast edges; flight feathers drawn as separate feathers.
// Field marks: SMALL ROUND HEAD on a PLUMP body; thin short dark bill; dark eye in a PALE BLUE
// EYE-RING; small BLACK SPOT BELOW AND BEHIND THE EYE; bluish-gray crown; PINKISH-BUFF breast fading
// to buff belly; faint pink-green iridescence on the side of the neck; warm gray-brown upperparts with
// BLACK SPOTS on the wing coverts / tertials; dark primaries; LONG, POINTED, graduated tail whose
// outer feathers have a black subterminal mark and WHITE TIPS; short reddish legs.
// Poses: 'perch' — sitting plump on a utility wire at dawn, tail hanging long; 'fly' — fast, direct
// flight seen three-quarter from above: pointed, swept wings and the long pointed tail slightly
// spread to show its white-tipped outer feathers.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'mourning_dove', poses: ['perch', 'fly'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const f2 = (v) => v.toFixed(2)
const lerp = (a, b, t) => a + (b - a) * t
const along = (B, T, s) => [lerp(B[0], T[0], s), lerp(B[1], T[1], s)]

// One feather from base B to tip T, width w; round = 0 gives a pointed tip, 1 a rounded one.
function featherD(B, T, w, asym = 0.42, round = 0.5) {
  const dx = T[0] - B[0], dy = T[1] - B[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len
  const at = (s, t) => `${f2(B[0] + ux * len * s - uy * t)} ${f2(B[1] + uy * len * s + ux * t)}`
  const a = w * asym, b = w * (1 - asym), k = 1 - 0.22 * round
  return `M ${at(0, -a)} L ${at(k, -a * 0.96)} C ${at(1 - 0.06 * round, -a * 0.9)} ${at(1, -a * 0.45 * round)} ${at(1, 0)} C ${at(1, b * 0.5 * round)} ${at(1 - 0.08 * round, b)} ${at(k - 0.04, b)} L ${at(0, b)} Z`
}

// ── Perched on a wire, side view facing left ─────────────────────────────────
const BODY_D = 'M 30.4 45 C 30.6 40.6 33.6 38.6 37 38.8 C 40.6 39 43 41.4 43.4 45 C 44 48.6 46 51 50 52.4 C 58 55 66 60 72 66 L 74.4 72 C 70 77 64 81 56 82.6 C 48 83.6 40 80.6 35.6 74 C 32.2 68.6 31.6 61 33 55.4 C 33.6 52.6 32.4 50 31.2 48.6 C 30.4 47.6 30.2 46.4 30.4 45 Z'
const WING_D = 'M 45 52.4 C 53 50 62 54 68 60 C 74 66 79 73 83.4 81.4 L 80.8 82.8 C 74 79.4 66 76.4 60 74.4 C 51 71 46 63.4 45 52.4 Z'
const TAIL_D = 'M 69.4 64.4 C 80 74 92 88 106.4 103.8 C 107 104.8 106.2 105.6 105.2 105.2 C 92 94.4 80 84.6 67.6 75.4 Z'

function Perched({ blink }) {
  const r = rng(31)
  const edges = []
  for (let row = 0; row < 5; row++) for (let i = 0; i < 4; i++) {
    const x = 50 + i * 5 + row * 3 + (r() - 0.5) * 1.2, y = 54 + row * 4.4 + i * 2.2 + (r() - 0.5)
    edges.push(<path key={`e${row}${i}`} d={`M ${f2(x - 2.2)} ${f2(y)} q 2.4 2.4 4.6 0.4`} stroke="#D8C6A8" strokeWidth="0.45" fill="none" opacity={0.25 + r() * 0.15}/>)
  }
  return (
    <g>
      {/* long pointed tail hanging past the wire; graduated outer feathers show black marks + white tips */}
      <g filter="url(#mdvTex)">
        {/* graduated outer feathers peeking below the central pair: gray, black mark, white tip */}
        {[0.34, 0.5, 0.66, 0.8].map((s, i) => {
          const m = s - 0.22, B = [68.5 + 37.5 * m, 70 + 34.5 * m], T = [67.6 + 37.6 * s - 0.62 * 1.3, 75.4 + 29.8 * s + 0.78 * 1.3]
          return <g key={i}>
            <path d={featherD(B, T, 3, 0.5, 0.7)} fill="#86807A"/>
            <path d={featherD(along(B, T, 0.62), T, 3, 0.5, 0.7)} fill="#2A2422"/>
            <path d={featherD(along(B, T, 0.8), T, 2.9, 0.5, 0.7)} fill="#F2EFE8"/>
          </g>
        })}
        <path d={TAIL_D} fill="url(#mdvTail)"/>
        <g clipPath="url(#mdvTailClip)">
          <path d="M 70 70 C 82 80 94 92 106 104" stroke="#5E5244" strokeWidth="0.45" fill="none" opacity="0.5"/>
        </g>
      </g>
      {/* short reddish legs gripping the wire */}
      <g stroke="#B0585A" strokeLinecap="round" fill="none">
        <path d="M 49 80.6 L 48.6 84.2 M 55 81 L 55.2 84.6" strokeWidth="1.5"/>
        <path d="M 48.6 84.2 C 47 84.2 46 85 46.4 86 M 48.6 84.2 C 50.4 84.6 51 85.6 50.4 86.4 M 55.2 84.6 C 53.6 84.6 52.6 85.4 53 86.4 M 55.2 84.6 C 57 85 57.6 86 57 86.8" strokeWidth="0.9"/>
      </g>
      <g filter="url(#mdvTex)">
        <path d={BODY_D} fill="url(#mdvBody)"/>
        <g clipPath="url(#mdvBodyClip)">
          {/* pinkish-buff breast, buff belly, bluish-gray crown and nape */}
          <path d="M 28 52 C 34 50 40 54 44 60 C 46 68 44 76 40 84 L 26 84 Z" fill="#D4A69A" opacity="0.75" filter="url(#mdvGlow)"/>
          <path d="M 40 78 C 48 82 58 82 68 76 L 70 90 L 36 90 Z" fill="#E6D4B8" opacity="0.7" filter="url(#mdvGlow)"/>
          <path d="M 31 44 C 32 39.4 36 38 39.4 38.6 C 42.6 39.4 44 42.4 44.4 46 C 46 49.6 48 51 51 52.6 L 44 54 C 40 48 36 44 31 44 Z" fill="#A4A6AE" opacity="0.8" filter="url(#mdvGlow)"/>
          {/* iridescent pink-green patch on the side of the neck: light, not a line */}
          <ellipse cx="42.4" cy="52.6" rx="3.4" ry="2.4" fill="#C88AA8" opacity="0.55" filter="url(#mdvGlow)"/>
          <ellipse cx="44.4" cy="51" rx="2.2" ry="1.6" fill="#8AB0A0" opacity="0.4" filter="url(#mdvGlow)"/>
          {/* light from the upper left; shade under the belly */}
          <path d="M 34 44 C 34 41 37 39.4 40 40" stroke="#E6E2DA" strokeWidth="1.4" fill="none" opacity="0.5" filter="url(#mdvGlow)"/>
          <path d="M 40 84 C 52 86 64 82 74 74 L 78 90 L 36 92 Z" fill="#3A2A20" opacity="0.35" filter="url(#mdvGlowL)"/>
        </g>
        {/* folded wing: gray-brown with black spots, dark primaries toward the tip */}
        <path d={WING_D} fill="url(#mdvWing)"/>
        <g clipPath="url(#mdvWingClip)">
          {edges}
          <path d="M 66 72 C 72 72 78 76 84 82 L 86 76 C 80 70 72 66 64 66 Z" fill="#5E564E" opacity="0.85" filter="url(#mdvBlur)"/>
          <path d="M 68 74.4 L 82 81.4 M 70 72.4 L 83 79.4" stroke="#3C362F" strokeWidth="0.45" opacity="0.7"/>
          {[[57, 61.4, 1.15], [63.4, 65, 1.2], [54.6, 66.4, 0.9], [60.4, 69.8, 1.25], [67.6, 69.4, 1], [65, 73.4, 0.8]].map(([x, y, s], i) =>
            <ellipse key={i} cx={x} cy={y} rx={s * 1.9} ry={s * 0.75} transform={`rotate(36 ${x} ${y})`} fill="#241A15" opacity="0.82" filter="url(#mdvSoft)"/>)}
        </g>
        <path d="M 45 53 C 46.4 63 51 70 60 74.4" stroke="#5A4634" strokeWidth="1.3" fill="none" opacity="0.35" filter="url(#mdvBlur)"/>
      </g>
      {/* face: dark eye in a pale blue eye-ring; black spot below and behind it */}
      <ellipse cx="38.6" cy="49.6" rx="1.3" ry="0.9" fill="#1E1816" opacity="0.9" filter="url(#mdvSoft)"/>
      <path d="M 33 43 C 34.4 42.4 36.4 42.4 37.6 43.2" stroke="#7C7A7E" strokeWidth="0.6" fill="none" opacity="0.6"/>
      {blink
        ? <path d="M 33.6 45 q 1.3 0.8 2.6 0" stroke="#6A6070" strokeWidth="0.7" fill="none"/>
        : <g>
            <circle cx="34.9" cy="45" r="1.9" fill="#9CCAE0"/>
            <circle cx="34.9" cy="45" r="1.25" fill="#1A1210"/>
            <circle cx="34.5" cy="44.6" r="0.32" fill="#FFF"/>
          </g>}
      {/* short, thin dark bill with a slight droop and pale cere at the base */}
      <path d="M 31 44.6 C 29.4 44.8 27.4 45.4 25.4 46.6 C 25 46.9 25.1 47.2 25.5 47.2 L 31.2 46.8 Z" fill="#2E2A2C"/>
      <path d="M 25.6 47.2 L 31.2 46.8 L 31 47.8 C 29 48 27 47.8 25.6 47.2 Z" fill="#1C1A1C"/>
      <path d="M 31.2 44.6 C 30.2 44.8 29.6 45.2 29.2 45.6" stroke="#8A8494" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.7"/>
    </g>
  )
}

// ── Fast direct flight, three-quarter view from above, heading left ──────────
// Local wing frame: x = shoulder → tip, y = leading → trailing edge. Pointed, swept hand.
function wingPlan({ L, wx, chord, cb, nP, nS, tipBack }) {
  const sec = Array.from({ length: nS }, (_, i) => {
    const x = 1.5 + (wx - 1.5) * i / (nS - 1)
    return { B: [x, cb * 0.4], T: [x + 0.6 + i * 0.12, chord + Math.sin(i / (nS - 1) * Math.PI) * 0.6], w: (wx / (nS - 1)) * 1.7 }
  })
  const prim = Array.from({ length: nP }, (_, j) => {
    const t = j / (nP - 1)
    const B = [wx + (L - wx) * 0.32 * t, cb * 0.4 * (1 - t) + 0.6 * t]
    const T = [lerp(wx + 2.4, L, Math.pow(t, 0.85)), lerp(chord + 0.6, tipBack, Math.pow(t, 1.4)) + Math.sin(t * Math.PI) * 1.4]
    return { B, T: j === nP - 1 ? along(B, T, 0.97) : T, w: 4.6 * (1 - 0.35 * t) }
  })
  const hx = wx + (L - wx) * 0.42
  const covert = `M 0 -0.6 C ${wx * 0.35} -2.4 ${wx * 0.8} -2.6 ${wx} -1.4 C ${wx + (hx - wx) * 0.5} -0.2 ${hx - 2} ${tipBack * 0.3} ${hx} ${tipBack * 0.45} C ${wx + (hx - wx) * 0.6} ${cb * 0.95} ${wx + (hx - wx) * 0.2} ${cb * 1.05} ${wx} ${cb} C ${wx * 0.7} ${cb * 1.08} ${wx * 0.3} ${cb * 1.04} 0 ${cb * 0.95} Z`
  return { sec, prim, covert, wx, cb, hx }
}
const DPLAN = wingPlan({ L: 50, wx: 17, chord: 15, cb: 8.4, nP: 10, nS: 9, tipBack: 17 })

function Wing({ m }) {
  const p = DPLAN, r = rng(7)
  const spots = [[5, 5.6], [9, 6.6], [12.6, 5], [7.4, 3.4], [14.6, 7]].map(([x, y], i) =>
    <ellipse key={i} cx={x} cy={y} rx={1.4} ry={0.8} transform={`rotate(70 ${x} ${y})`} fill="#1E1714" opacity="0.85"/>)
  return (
    <g transform={`matrix(${m.join(' ')})`}>
      <g filter="url(#mdvTex)">
        {[...p.prim].reverse().map((f, i) => <g key={`p${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.4, 0.25)} fill={i % 2 ? '#4E4842' : '#544E47'}/>
          <path d={featherD(along(f.B, f.T, 0.2), f.T, f.w * 0.3, 0.1, 0.25)} fill="#8A8278" opacity="0.25"/>
        </g>)}
        {[...p.sec].reverse().map((f, i) => <g key={`s${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.45, 0.8)} fill={i % 2 ? '#8E8780' : '#948C84'}/>
          <path d={featherD(along(f.B, f.T, 0.84), f.T, f.w * 0.96, 0.45, 0.8)} fill="#5C5A5A" opacity="0.45"/>
        </g>)}
        <path d={p.covert} fill="url(#mdvCovert)"/>
        {spots}
        {Array.from({ length: 8 }, (_, i) => { const x = 1.5 + i * 2.2 + (r() - 0.5) * 0.6, y = p.cb * 0.86 + (r() - 0.5) * 0.5; return <path key={`e${i}`} d={`M ${f2(x - 1.3)} ${f2(y - 0.3)} q 1.3 1 2.6 0`} stroke="#D6C4A6" strokeWidth="0.4" fill="none" opacity="0.35"/> })}
        <path d={`M 0.5 -0.4 C ${p.wx * 0.35} -2.1 ${p.wx * 0.8} -2.3 ${p.wx} -1.1`} stroke="#D8CAB0" strokeWidth="0.7" fill="none" opacity="0.55" strokeLinecap="round"/>
      </g>
    </g>
  )
}

function Tail() {
  // twelve graduated rectrices, slightly spread: outer ones gray with a black mark and white tip
  const P = [64, 62], out = []
  for (let i = 4; i >= 0; i--) {
    for (const sgn of [-1, 1]) {
      const a = sgn * (0.6 + i * 1.2) * Math.PI / 180, L = 37 - i * 4
      const B = [P[0], P[1] + sgn * i * 0.45], T = [P[0] + Math.cos(a) * L, P[1] + Math.sin(a) * L + sgn * i * 0.45]
      const w = 4.2
      out.push(<g key={`${i}${sgn}`}>
        <path d={featherD(B, T, w, 0.5, 0.75)} fill={i === 0 ? 'url(#mdvTailTop)' : (i % 2 ? '#8E8780' : '#948C84')}/>
        {i > 0 && <>
          <path d={featherD(along(B, T, 0.76), T, w, 0.5, 0.75)} fill="#2E2826" opacity="0.9"/>
          <path d={featherD(along(B, T, 0.86), T, w * 0.98, 0.5, 0.75)} fill="#EAE6DE"/>
        </>}
      </g>)
    }
  }
  return <g filter="url(#mdvTex)">{out}</g>
}

const FLIGHT_WINGS = {
  // [x-axis image, y-axis image, shoulder] — far wing foreshortened, near wing full
  down: { far: [0.2, -0.84, 0.97, 0.24, 45, 57.6], near: [0.24, 0.97, 0.97, -0.24, 45, 66.4] },
  up: { far: [0.26, -0.9, 0.96, 0.28, 45, 57.6], near: [0.28, 0.86, 0.96, -0.3, 45, 66.4] },
}

function Flight({ up }) {
  const w = up ? FLIGHT_WINGS.up : FLIGHT_WINGS.down
  const body = 'M 26 62 C 26 58.6 28.6 56.6 31.6 56.6 C 34 56.6 35.6 57.4 37 57.6 C 44 55.4 54 55.6 61 58 C 65 59.4 66.6 60.8 66.6 62 C 66.6 63.2 65 64.6 61 66 C 54 68.4 44 68.6 37 66.4 C 35.6 66.6 34 67.4 31.6 67.4 C 28.6 67.4 26 65.4 26 62 Z'
  return (
    <g>
      <Wing m={w.far}/>
      <Tail/>
      <g filter="url(#mdvTex)">
        <path d={body} fill="url(#mdvBack)"/>
        <clipPath id="mdvFlClip"><path d={body}/></clipPath>
        <g clipPath="url(#mdvFlClip)">
          {/* bluish-gray crown and nape, buff face and pinkish neck side toward us */}
          <path d="M 26 60 C 28 56 34 55.6 40 57.6 L 40 61 C 34 60 30 60 26 61 Z" fill="#A4A6AE" opacity="0.8" filter="url(#mdvGlow)"/>
          <path d="M 26 63.4 C 30 65.6 36 66.6 42 66.4 L 42 70 L 24 70 Z" fill="#D6B49C" opacity="0.8" filter="url(#mdvGlow)"/>
          <ellipse cx="39" cy="64.6" rx="3" ry="1.8" fill="#C88AA8" opacity="0.5" filter="url(#mdvGlow)"/>
          <path d="M 34 58.6 C 44 56.6 54 57 62 59.6" stroke="#E2D6C0" strokeWidth="1.4" fill="none" opacity="0.45" filter="url(#mdvGlow)"/>
        </g>
      </g>
      <Wing m={w.near}/>
      {/* face toward the viewer: eye in its pale blue ring, black spot below it */}
      <ellipse cx="32.8" cy="64.8" rx="1.1" ry="0.7" fill="#1E1816" opacity="0.85" filter="url(#mdvSoft)"/>
      <circle cx="30.4" cy="62.6" r="1.6" fill="#9CCAE0"/>
      <circle cx="30.4" cy="62.6" r="1.05" fill="#1A1210"/>
      <circle cx="30.1" cy="62.3" r="0.28" fill="#FFF"/>
      <path d="M 26.4 61.4 C 24.6 61.6 22.8 62 21 62.8 C 22.8 63.4 24.6 63.6 26.4 63.4 Z" fill="#2E2A2C"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
function Trees(x0, x1, yb, n, seed, cols, hmin, hmax) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + r() * (x1 - x0), h = hmin + r() * (hmax - hmin), w = h * (0.5 + r() * 0.4)
    return <path key={i} d={`M ${f2(x - w)} ${yb} C ${f2(x - w)} ${f2(yb - h * 0.7)} ${f2(x - w * 0.4)} ${f2(yb - h)} ${f2(x)} ${f2(yb - h)} C ${f2(x + w * 0.5)} ${f2(yb - h)} ${f2(x + w)} ${f2(yb - h * 0.6)} ${f2(x + w)} ${yb} Z`} fill={cols[i % cols.length]}/>
  })
}

function WireDawn() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#mdvSkyDawn)"/>
      <g filter="url(#mdvSoftBig)" opacity="0.6">
        <ellipse cx="30" cy="26" rx="26" ry="4" fill="#F8E2CE"/>
        <ellipse cx="96" cy="16" rx="18" ry="3" fill="#FFF2E6"/>
      </g>
      {/* far: soft suburban tree line and rooftops, out of focus */}
      <g filter="url(#mdvLeafy)">{Trees(-10, 130, 112, 9, 5, ['#8A9478', '#7C8A6C', '#96A084'], 22, 38)}</g>
      <g filter="url(#mdvBgBlur)">
        <path d="M 8 112 L 8 98 L 22 90 L 36 98 L 36 112 Z" fill="#9C8A82"/>
        <path d="M 80 112 L 80 100 L 96 92 L 112 100 L 112 112 Z" fill="#A89A90"/>
        <rect x="14" y="101" width="4" height="5" fill="#E8D8A8" opacity="0.7"/>
        <rect x="92" y="102" width="4" height="5" fill="#E8D8A8" opacity="0.6"/>
      </g>
      <g filter="url(#mdvLeafy)">{Trees(-10, 130, 134, 7, 13, ['#5E6E4C', '#6A7A54', '#52623E'], 16, 26)}</g>
      {/* mid: a utility pole with its crossarm, slightly soft */}
      <g filter="url(#mdvBlurL)">
        <rect x="104" y="20" width="4.4" height="114" fill="url(#mdvPole)"/>
        <rect x="88" y="28" width="32" height="2.6" fill="#5A4A3C"/>
        <path d="M 94 28 v -2.4 M 114 28 v -2.4" stroke="#C8CCD0" strokeWidth="1.4"/>
      </g>
      {/* the wires: one crisp foreground wire (the perch), one above, sagging slightly */}
      <path d="M -2 26 C 40 32 80 33 122 30" stroke="#2C2A2A" strokeWidth="0.6" fill="none" opacity="0.6"/>
      <path d="M -2 80.4 C 30 85 70 86.4 122 84" stroke="#1E1C1C" strokeWidth="1.1" fill="none"/>
      <path d="M -2 80 C 30 84.6 70 86 122 83.6" stroke="#8E8A86" strokeWidth="0.3" fill="none" opacity="0.6"/>
    </g>
  )
}

function FieldsBelow() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#mdvSkyDay)"/>
      {/* looking down and across open country: hazy horizon, field strips, hedgerows */}
      <path d="M 0 22 C 20 18 40 20 60 17 C 80 15 100 19 120 17 L 120 30 L 0 30 Z" fill="#A6B2BA" filter="url(#mdvBgBlur)"/>
      <g filter="url(#mdvField)">
        <path d="M 0 28 L 120 26 L 120 130 L 0 130 Z" fill="url(#mdvFields)"/>
      </g>
      <g filter="url(#mdvBgBlur)" opacity="0.9">
        <path d="M 0 34 C 30 32 70 33 120 31 L 120 36 C 70 37 30 36 0 38 Z" fill="#6E7A58"/>
        <path d="M 0 48 C 30 45 80 46 120 44 L 120 50 C 80 51 30 50 0 53 Z" fill="#62704C"/>
        <path d="M 0 74 C 40 70 80 72 120 68 L 120 76 C 80 79 40 78 0 82 Z" fill="#56643E"/>
        <path d="M 0 39 C 40 38 80 38 120 37 L 120 43 C 80 44 40 44 0 46 Z" fill="#C4B47E" opacity="0.6"/>
        <path d="M 0 84 C 40 80 80 82 120 78 L 120 98 C 80 102 40 100 0 106 Z" fill="#B8A468" opacity="0.55"/>
      </g>
      {/* near field, out of focus: stubble rows */}
      <g filter="url(#mdvBlurL)" opacity="0.5">
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M 0 ${108 + i * 3} C 40 ${105 + i * 3} 80 ${106 + i * 3.2} 120 ${103 + i * 3}`} stroke="#8A7646" strokeWidth="0.9" fill="none"/>)}
      </g>
    </g>
  )
}

export default function MourningDove({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), pose === 'fly' ? 160 : 400); return () => clearInterval(id) }, [animated, pose])
  const blink = animated && frame === 7
  const fly = pose === 'fly'
  const up = animated && frame % 2 === 1
  const bob = animated ? [0, 0.2, 0.4, 0.5, 0.4, 0.2, 0, -0.2, -0.4, -0.5, -0.4, -0.2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Mourning Dove">
      <defs>
        <linearGradient id="mdvSkyDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9EB4CC"/><stop offset="55%" stopColor="#E2CCBE"/><stop offset="100%" stopColor="#EED6B8"/></linearGradient>
        <linearGradient id="mdvSkyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8EB0CE"/><stop offset="100%" stopColor="#C8D6DE"/></linearGradient>
        <linearGradient id="mdvFields" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A4A486"/><stop offset="45%" stopColor="#9A9A66"/><stop offset="100%" stopColor="#A08A56"/></linearGradient>
        <linearGradient id="mdvPole" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7A6450"/><stop offset="100%" stopColor="#4A3A2E"/></linearGradient>
        <linearGradient id="mdvBody" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stopColor="#B4A086"/><stop offset="50%" stopColor="#C8AE92"/><stop offset="100%" stopColor="#D8C2A4"/></linearGradient>
        <linearGradient id="mdvWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B09878"/><stop offset="60%" stopColor="#9C8466"/><stop offset="100%" stopColor="#6E6050"/></linearGradient>
        <linearGradient id="mdvTail" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#9A8668"/><stop offset="100%" stopColor="#6E604E"/></linearGradient>
        <linearGradient id="mdvTailTop" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9C8A6E"/><stop offset="100%" stopColor="#7A6C58"/></linearGradient>
        <linearGradient id="mdvBack" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A8987E"/><stop offset="100%" stopColor="#94806A"/></linearGradient>
        <linearGradient id="mdvCovert" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B49C7C"/><stop offset="100%" stopColor="#9A8468"/></linearGradient>
        <clipPath id="mdvFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="mdvBodyClip"><path d={BODY_D}/></clipPath>
        <clipPath id="mdvWingClip"><path d={WING_D}/></clipPath>
        <clipPath id="mdvTailClip"><path d={TAIL_D}/></clipPath>
        <filter id="mdvSoftBig" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
        <filter id="mdvBgBlur" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="1.4"/></filter>
        <filter id="mdvBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="mdvBlurL" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.8"/></filter>
        <filter id="mdvSoft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.3"/></filter>
        <filter id="mdvGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.2"/></filter>
        <filter id="mdvGlowL" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="mdvLeafy" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.16" numOctaves="2" seed="8" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="8" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feGaussianBlur in="d" stdDeviation="1.5"/>
        </filter>
        {/* fine pale-and-dark feather grain clipped to the plumage */}
        <filter id="mdvTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.55" numOctaves="2" seed="11" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.12  1.2 0 0 0 -0.55" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="mdvField" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.4" numOctaves="3" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.32  0 0 0 0 0.18  1 0 0 0 -0.4" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#mdvFrame)">
        {fly ? (
          <>
            {scene && <FieldsBelow/>}
            <g transform={`translate(4 ${bob}) rotate(-8 60 62)`}><Flight up={up}/></g>
          </>
        ) : (
          <>
            {scene && <WireDawn/>}
            <g transform="translate(0 0)"><Perched blink={blink}/></g>
          </>
        )}
      </g>
    </svg>
  )
}
