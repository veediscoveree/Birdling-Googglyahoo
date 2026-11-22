// Merlin (adult male, eastern "Taiga" Merlin) — naturalistic technique of BaldEagle.jsx
// (style guide v2). Its own proportions, not the kestrel's: small, compact and broad-chested, a
// moderately sized head with a plain face, heavy streaking below, wingtips falling well short of a
// banded tail. Flight: fast, direct, level, three-quarter view from above on a deep downstroke —
// broad-based pointed wings built from separate primaries and secondaries. Habitat: bare treetop
// snag over a fall marsh. Females/juveniles are brown above, not blue.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'merlin', poses: ['perch', 'flight'] }

// Field marks: SLATE BLUE-GRAY crown, back and wings with fine black shaft streaks; plain face with
// only a FAINT, THIN MUSTACHE; faint pale eyebrow; buffy streaked cheek, white throat; dark eye;
// small blue-gray hooked bill with YELLOW CERE; BUFF-ORANGE underparts with HEAVY DARK STREAKS;
// BLACKISH TAIL with NARROW PALE GRAY BANDS and a white tip; yellow-orange feet.

const SLATE = '#56688A'
const YEL = '#EEB52A'

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const f2 = (v) => v.toFixed(2)
const lerp = (a, b, t) => a + (b - a) * t
const along = (B, T, s) => [lerp(B[0], T[0], s), lerp(B[1], T[1], s)]

function featherD(B, T, w, asym = 0.42, round = 0.5) {
  const dx = T[0] - B[0], dy = T[1] - B[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len
  const at = (s, t) => `${f2(B[0] + ux * len * s - uy * t)} ${f2(B[1] + uy * len * s + ux * t)}`
  const a = w * asym, b = w * (1 - asym), k = 1 - 0.22 * round
  return `M ${at(0, -a)} L ${at(k, -a * 0.96)} C ${at(1 - 0.06 * round, -a * 0.9)} ${at(1, -a * 0.45 * round)} ${at(1, 0)} C ${at(1, b * 0.5 * round)} ${at(1 - 0.08 * round, b)} ${at(k - 0.04, b)} L ${at(0, b)} Z`
}

// Broad-based, pointed wing in a local frame: x = shoulder → tip, y = leading → trailing edge.
function wingPlan({ L, wx, chord, cb, nP, nS, hand, tipBack }) {
  const sec = Array.from({ length: nS }, (_, i) => {
    const x = 1.5 + (wx - 1.5) * i / (nS - 1)
    return { B: [x, cb * 0.4], T: [x + 0.5 + i * 0.1, chord - (i === 0 ? 2.4 : 0) + Math.sin(i / (nS - 1) * Math.PI) * 0.9], w: (wx / (nS - 1)) * 1.7 }
  })
  const prim = Array.from({ length: nP }, (_, j) => {
    const t = j / (nP - 1), s = Math.pow(t, 0.9)
    const B = [wx + (L - wx) * hand * t, cb * 0.4 * (1 - t) + 0.4 * t]
    const c = [wx + (L - wx) * 0.62, chord * 1.04]
    let T = [(1 - s) ** 2 * (wx + 2.5) + 2 * (1 - s) * s * c[0] + s * s * L, (1 - s) ** 2 * chord + 2 * (1 - s) * s * c[1] + s * s * chord * tipBack]
    if (j === nP - 1) T = along(B, T, 0.92)
    return { B, T, w: 5.6 * (1 - 0.38 * t) }
  })
  const hx = wx + (L - wx) * 0.48
  const covert = `M 0 -0.6 C ${wx * 0.35} -2.8 ${wx * 0.8} -3 ${wx} -1.6 C ${wx + (hx - wx) * 0.4} -1 ${wx + (hx - wx) * 0.8} 0 ${hx} 1.4 C ${wx + (hx - wx) * 0.7} ${cb * 0.5} ${wx + (hx - wx) * 0.3} ${cb * 0.85} ${wx} ${cb} C ${wx * 0.7} ${cb * 1.1} ${wx * 0.3} ${cb * 1.05} 0 ${cb * 0.95} Z`
  return { sec, prim, covert, wx, cb, hx }
}
const MPLAN = wingPlan({ L: 58, wx: 21, chord: 21, cb: 9.5, nP: 10, nS: 10, hand: 0.42, tipBack: 0.4 })

function Wing({ m }) {
  // Upper surface: slate coverts with black shaft streaks, dusky secondaries, blackish primaries.
  const p = MPLAN, r = rng(13)
  const tips = [], shafts = []
  for (let row = 0; row < 3; row++) for (let i = 0; i < 7 - row; i++) {
    const x = 2 + i * (p.hx - 3) / (6 - row) + row * 1.5 + (r() - 0.5), y = p.cb * (0.88 - row * 0.28) + (r() - 0.5) * 0.6
    tips.push(<path key={`t${row}${i}`} d={`M ${f2(x - 1.7)} ${f2(y - 0.5)} q 1.7 1.4 3.4 0`} stroke="#9FB0CC" strokeWidth="0.5" fill="none" opacity={0.3 + r() * 0.2}/>)
    shafts.push(<path key={`s${row}${i}`} d={`M ${f2(x + 0.4)} ${f2(y - 2.4)} l 0.2 1.8`} stroke="#14161C" strokeWidth="0.55" opacity="0.6" strokeLinecap="round"/>)
  }
  return (
    <g transform={`matrix(${m.join(' ')})`}>
      <g filter="url(#merTex)">
        {[...p.sec].reverse().map((f, i) => <g key={`s${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.45, 0.9)} fill={i % 2 ? '#4A5670' : '#4E5B76'} stroke="#1E222C" strokeWidth="0.3" strokeOpacity="0.6"/>
          <path d={featherD(along(f.B, f.T, 0.82), f.T, f.w * 0.98, 0.45, 0.9)} fill="#262A34" opacity="0.6"/>
        </g>)}
        {[...p.prim].reverse().map((f, i) => <g key={`p${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.4, 0.6)} fill={i % 2 ? '#23262E' : '#272A33'} stroke="#0E1014" strokeWidth="0.3" strokeOpacity="0.7"/>
          {[0.45, 0.62].map(s => { const c = along(f.B, f.T, s); return <path key={s} d={`M ${f2(c[0] - 0.9)} ${f2(c[1])} l 1.8 0.3`} stroke="#6E7686" strokeWidth="0.6" opacity="0.5"/> })}
        </g>)}
        <path d={p.covert} fill="url(#merWing)"/>
        {tips}{shafts}
        <path d={`M 0.5 -0.4 C ${p.wx * 0.35} -2.5 ${p.wx * 0.8} -2.7 ${p.wx} -1.3`} stroke="#93A6C6" strokeWidth="0.8" fill="none" opacity="0.6" strokeLinecap="round"/>
      </g>
    </g>
  )
}

function Head({ blink }) {
  // Plain-faced, moderately sized, flat-crowned; facing left.
  return (
    <g>
      <g filter="url(#merTex)">
        <path d="M 33.4 34 C 33.4 26 39 21.4 45.6 21.4 C 52.6 21.4 57.4 26 57.8 32.6 C 58.2 38.6 56.6 43 54 46 C 49 48.6 42 48.4 37.6 45.2 C 34.8 42.4 33.4 38.4 33.4 34 Z" fill="url(#merFace)"/>
        <path d="M 35 39 C 36.4 43 39.4 46 43.6 47.4 C 40 47.6 36.6 45.4 35.4 42.4 Z" fill="#FBF6EC"/>
        <path d="M 53.6 38 C 55.6 40.6 56.4 43 56 45.6 L 54 46.2 C 54.6 43.6 54.4 41 53.2 39 Z" fill="#D9A267"/>
        {/* slate cap down onto the nape */}
        <path d="M 33.8 30.8 C 34.6 25.2 39.6 21.4 45.6 21.4 C 52.6 21.4 57.4 26 57.8 32.6 C 58.1 37.4 57.4 41.2 56.2 44.6 C 54.6 40.6 53 36.8 50.2 33.4 C 47.4 30.4 43.4 29 39.4 29.2 C 37.2 29.4 35.4 30 33.8 30.8 Z" fill="url(#merCap)"/>
        {[[41, 24], [45, 23.2], [49, 24], [53, 26], [44, 26.4], [48.4, 27], [52, 29.4], [55.6, 31], [56, 36]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 0.7 1.8`} stroke="#14161C" strokeWidth="0.6" opacity="0.55" strokeLinecap="round"/>)}
        {/* faint pale brow, streaked cheek, and the faint thin mustache */}
        <path d="M 35.6 29.8 C 39.6 28.4 44.6 28.6 48.6 30.6" stroke="#E6D4BA" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7"/>
        {[[46, 36], [49, 37.6], [46.6, 40], [50.4, 41], [52.4, 37.4], [48.4, 43.4], [44.6, 42.6]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 0.4 1.6`} stroke="#6A4E3C" strokeWidth="0.6" strokeLinecap="round" opacity="0.6"/>)}
        <path d="M 39.8 35 C 39.6 38.4 40.2 41.6 41.6 44.4" stroke="#4E4040" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      </g>
      {blink
        ? <path d="M 38.2 31.6 q 2.4 1.1 4.8 0" stroke="#5A4A44" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        : <g>
            <ellipse cx="40.6" cy="31.8" rx="3" ry="2.85" fill="#C9C38A"/>
            <circle cx="40.6" cy="31.9" r="2.45" fill="#1E1008"/>
            <circle cx="39.9" cy="31.2" r="0.5" fill="#FFF"/>
            <path d="M 37.4 30 C 39 28.8 42 28.8 43.8 30" stroke="#2A2E3A" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </g>}
      {/* small hooked bill + yellow cere */}
      <path d="M 36.8 29.8 C 35.6 29.8 34.8 30.6 34.6 31.8 L 34.6 33.6 C 35.4 34 36.4 34 37.2 33.6 Z" fill={YEL}/>
      <path d="M 35 30.2 C 33 30.2 31.4 31.2 30.8 32.8 C 30.3 34.2 30.5 35.4 31.2 36.2 C 31.4 35.2 32 34.6 32.8 34.4 L 35.2 34 Z" fill="url(#merBill)"/>
      <path d="M 31.4 33.4 C 30.7 34.2 30.6 35.4 31.2 36.2 C 31.4 35.2 31.8 34.7 32.4 34.5 Z" fill="#1E2026"/>
      <path d="M 32.8 34.6 L 35.2 34.3 L 35 35.6 C 34.2 35.9 33.4 35.7 33 35.3 Z" fill="#7E8AA0"/>
    </g>
  )
}

function Streaks({ clip, x0, x1, y0, y1, seed, scale = 1 }) {
  // Heavy dark teardrop streaks, larger lower down, jittered so they never form a grid.
  const r = rng(seed), out = []
  for (let y = y0, row = 0; y < y1; y += 3.6 * scale, row++) {
    for (let x = x0 + (row % 2) * 2.2 * scale; x < x1; x += 4.4 * scale) {
      const t = (y - y0) / (y1 - y0), len = (2.4 + t * 2.4) * scale, w = (0.9 + t * 0.8) * scale
      const cx = x + (r() - 0.5) * 1.4 * scale, cy = y + (r() - 0.5) * scale
      out.push(<path key={`${row}-${x}`} d={`M ${f2(cx)} ${f2(cy)} c ${f2(-w * 0.7)} ${f2(len * 0.45)} ${f2(-w * 0.5)} ${f2(len)} 0 ${f2(len)} c ${f2(w * 0.5)} 0 ${f2(w * 0.7)} ${f2(-len * 0.55)} 0 ${f2(-len)} Z`} fill="#3A2416" opacity={0.7 + r() * 0.2}/>)
    }
  }
  return <g clipPath={`url(#${clip})`}>{out}</g>
}

// ── Perched on a bare snag, facing left ──────────────────────────────────────
const BODY = 'M 37 45 C 31 52 28.4 62 29.2 72 C 30 82 35 90.6 42.6 94.6 C 47.4 97 53.4 97 57.2 94.6 L 61.6 86 C 64.8 74 64.6 60 61.4 51 C 59 45.4 55 42.4 50 42 Z'
const WING = 'M 50 44 C 57.6 41.6 63.6 46 65 55 C 66.2 66 66.6 80 68.4 93 L 69.6 102.6 C 65.4 98 61.6 90 58.8 82 C 54.6 70 51 58 50 44 Z'

function Perched({ blink }) {
  const r = rng(29)
  const tips = []
  for (let row = 0; row < 6; row++) for (let i = 0; i < 3; i++) {
    const x = 53.4 + i * 3.4 + row * 0.8 + (r() - 0.5), y = 51 + row * 5 + i * 1.6 + (r() - 0.5)
    tips.push(<path key={`t${row}${i}`} d={`M ${f2(x - 1.8)} ${f2(y)} q 1.8 1.8 3.6 0.4`} stroke="#9AACCB" strokeWidth="0.5" fill="none" opacity={0.3 + r() * 0.15}/>)
    tips.push(<path key={`s${row}${i}`} d={`M ${f2(x)} ${f2(y - 3)} l 0.4 2.2`} stroke="#14161C" strokeWidth="0.6" opacity="0.55" strokeLinecap="round"/>)
  }
  return (
    <g>
      {/* blackish tail with narrow pale bands, white tip; wingtips stop well short of it */}
      <g filter="url(#merTex)">
        <path d="M 53.6 91 L 63.4 89 L 74.2 115.6 C 71.4 117.8 67 118.4 63.8 117.2 Z" fill="#24262C"/>
        <clipPath id="merTailClip"><path d="M 53.6 91 L 63.4 89 L 74.2 115.6 C 71.4 117.8 67 118.4 63.8 117.2 Z"/></clipPath>
        <g clipPath="url(#merTailClip)">
          {[98.6, 104.6, 110.4].map(y => <path key={y} d={`M 52 ${y} L 78 ${y - 3}`} stroke="#8E9CB4" strokeWidth="1.1" opacity="0.8"/>)}
          <path d="M 62 118.4 L 78 114.6" stroke="#F2EEE6" strokeWidth="2.2"/>
        </g>
      </g>
      <g filter="url(#merTex)">
        <path d={BODY} fill="url(#merBreast)"/>
        <clipPath id="merBodyClip"><path d={BODY}/></clipPath>
        <Streaks clip="merBodyClip" x0={30} x1={62} y0={50} y1={96} seed={4}/>
        <g clipPath="url(#merBodyClip)">
          <path d="M 55 50 C 61 60 62 78 57 94" stroke="#7A5434" strokeWidth="6" fill="none" opacity="0.3" filter="url(#merBlurL)"/>
          <path d="M 33 86 C 39 94 47 97 55 95" stroke="#8A6040" strokeWidth="3" fill="none" opacity="0.3" filter="url(#merBlur)"/>
        </g>
        {/* streaked rufous-buff trousers */}
        <path d="M 41 84 C 40 90 42 95 46 97.4 L 55 97.6 C 56.8 93 56.4 88 53 84.6 Z" fill="#D99A60"/>
        <path d="M 44 88 l 0.4 2.4 M 48 87.4 l 0.4 2.6 M 52 88 l 0.3 2.4 M 46 92.4 l 0.3 2.2 M 50.4 92 l 0.3 2.4" stroke="#3A2416" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        {/* slate mantle and folded wing */}
        <path d="M 49 40 C 55 38.6 60.4 41.6 62.6 47 L 61.6 54 C 58 50 54 47 49.6 45.6 Z" fill="#4A5A78"/>
        <path d={WING} fill="url(#merWing)"/>
        <clipPath id="merWingClip"><path d={WING}/></clipPath>
        <g clipPath="url(#merWingClip)">
          {tips}
          <path d="M 58 80 C 61 88 64 96 70 104 L 74 102 L 66 76 Z" fill="#23262E"/>
          <path d="M 61.6 82.6 L 68.6 100 M 64 81 L 70 97" stroke="#46506A" strokeWidth="0.45" opacity="0.8"/>
          <path d="M 50 45 C 51.4 60 55 72 59 82" stroke="#1A1E28" strokeWidth="1.8" fill="none" opacity="0.35" filter="url(#merBlur)"/>
        </g>
      </g>
      {/* yellow-orange feet on the broken top of the snag */}
      <path d="M 46 96 L 45.6 98.6 M 52.4 96.4 L 52.6 98.8" stroke={YEL} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 42 99.6 C 43.4 98 46 97.8 48 98.8 M 49.4 99.8 C 51 98.2 53.8 98.4 55.4 99.8" stroke={YEL} strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <path d="M 42 99.6 l -0.8 0.8 M 48 98.8 l 0.5 1.1 M 55.4 99.8 l 0.8 0.7" stroke="#15161A" strokeWidth="0.8" strokeLinecap="round"/>
      <Head blink={blink}/>
    </g>
  )
}

// ── Flight: fast and direct to the left, three-quarter view from above ────────
// Wing matrices [x-axis image, y-axis image, shoulder]. Down = deep downstroke (near wing driven
// down and forward, far wing foreshortened beyond the back); up = recovery stroke.
const FLIGHT_WINGS = {
  down: { far: [-0.16, 0.5, 0.84, 0.1, 68, 59], near: [-0.52, 0.7, 0.92, 0.14, 58, 61] },
  up: { far: [-0.12, -0.72, 0.82, 0.12, 62, 55], near: [-0.36, -0.74, 0.9, -0.08, 58, 58] },
}

function Flight({ up }) {
  const w = up ? FLIGHT_WINGS.up : FLIGHT_WINGS.down
  const body = 'M 36 58 C 38 52.4 45 50 54 50 C 66 50 78 52.4 88 55.6 C 92 57.2 92 61 88 62.6 C 78 66 66 68 54 68 C 45 68 38 64.6 36 58 Z'
  return (
    <g>
      <Wing m={w.far}/>
      <g filter="url(#merTex)">
        <path d="M 86 55.8 L 108.6 54.6 C 110.4 57.2 110.4 61.6 108.6 64.2 L 86 62.8 Z" fill="#24262C"/>
        {[93, 99.2].map(x => <path key={x} d={`M ${x} 55.4 C ${x + 0.8} 58 ${x + 0.8} 61 ${x} 63.4`} stroke="#8E9CB4" strokeWidth="1" fill="none" opacity="0.8"/>)}
        <path d="M 108.4 54.8 C 110.4 57.2 110.4 61.6 108.4 64" stroke="#F2EEE6" strokeWidth="1.6" fill="none"/>
        <path d={body} fill="url(#merBreast)"/>
        <clipPath id="merFlClip"><path d={body}/></clipPath>
        <Streaks clip="merFlClip" x0={40} x1={88} y0={58.6} y1={68} seed={9} scale={0.8}/>
        {/* slate back seen from above */}
        <path d="M 40 53.6 C 50 50.4 66 50.6 80 53 C 85 54 88 55.4 90 57.6 C 78 58 62 59.4 44 59.6 Z" fill="url(#merWing)"/>
        <path d="M 52 54 l 0.4 1.6 M 60 53.4 l 0.4 1.6 M 68 54 l 0.4 1.6 M 76 54.8 l 0.4 1.6" stroke="#14161C" strokeWidth="0.6" opacity="0.5"/>
      </g>
      <g transform="translate(37,54) rotate(4) scale(0.68) translate(-45,-36)"><Head/></g>
      <Wing m={w.near}/>
    </g>
  )
}

// ── Habitat: autumn marsh below a treetop snag ──────────────────────────────
function treeline(seed, y0, amp, step) {
  const r = rng(seed)
  let d = `M -2 ${y0 + 8} L -2 ${y0}`, x = -2
  while (x < 122) { const w = step * (0.6 + r() * 0.8), top = y0 - amp * (0.3 + r() * 0.7); d += ` Q ${f2(x + w * 0.2)} ${f2(top)} ${f2(x + w * 0.5)} ${f2(top + r() * 1.2)} Q ${f2(x + w * 0.8)} ${f2(top)} ${f2(x + w)} ${f2(y0 - amp * 0.2 * r())}`; x += w }
  return d + ` L 122 ${y0 + 8} Z`
}
function spruces(seed, y0, n, h, color) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = r() * 120, hh = h * (0.6 + r() * 0.6)
    let d = `M ${f2(x)} ${f2(y0 - hh)}`
    for (let k = 1; k <= 5; k++) d += ` L ${f2(x + hh * 0.07 * k + 0.3)} ${f2(y0 - hh + hh * k / 5)} L ${f2(x + hh * 0.03 * k)} ${f2(y0 - hh + hh * k / 5 - 0.6)}`
    for (let k = 5; k >= 1; k--) d += ` L ${f2(x - hh * 0.03 * k)} ${f2(y0 - hh + hh * k / 5 - 0.6)} L ${f2(x - hh * 0.07 * k - 0.3)} ${f2(y0 - hh + hh * k / 5)}`
    return <path key={i} d={d + ' Z'} fill={color}/>
  })
}

function Scene({ snag, dy = 0 }) {
  const r = rng(41)
  const reeds = Array.from({ length: 60 }, (_, i) => {
    const x = (i * 2.07 + r() * 2) % 122, h = 4 + r() * 8, lean = (r() - 0.5) * 3
    return <path key={i} d={`M ${f2(x)} 131 q ${f2(lean * 0.3)} ${f2(-h * 0.6)} ${f2(lean)} ${f2(-h)}`} stroke={['#9C7A3E', '#B8924C', '#7E5E30', '#C9A462'][i % 4]} strokeWidth="0.6" fill="none" opacity="0.85"/>
  })
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#merSky)"/>
      <g filter="url(#merSoft)" opacity="0.75">
        <ellipse cx="88" cy="22" rx="22" ry="4.6" fill="#FFF"/>
        <ellipse cx="20" cy="36" rx="16" ry="3.4" fill="#FFF8EC"/>
      </g>
      <g transform={`translate(0 ${dy})`}>
        <path d="M -2 74 C 18 66 36 70 54 66 C 74 62 96 69 122 64 L 122 82 L -2 82 Z" fill="#A9B2BC" filter="url(#merBlur)"/>
        <path d={treeline(5, 78, 5, 5)} fill="#B98C62" opacity="0.85" filter="url(#merBlur)"/>
        <g filter="url(#merLeaf)">
          <path d={treeline(8, 82, 6, 4)} fill="#A8562E"/>
          <path d={treeline(14, 83, 4, 3.4)} fill="#C98A36" opacity="0.75"/>
        </g>
        {spruces(3, 84, 7, 12, '#3E4A36')}
        <g filter="url(#merLeaf)">
          <path d="M -2 84 C 30 83 80 85.6 122 83.6 L 122 131 L -2 131 Z" fill="url(#merMarsh)"/>
        </g>
        {/* a winding channel of open water catching the sky */}
        <path d="M -2 96 C 20 93 34 97.6 56 95 C 76 92.6 96 94 122 91.4 L 122 94.4 C 98 97 78 95.8 58 98.4 C 36 101 20 96.6 -2 99.4 Z" fill="url(#merWater)"/>
        <path d="M 10 96.4 h 8 M 44 96.8 h 10 M 86 94.2 h 9" stroke="#F4F6F2" strokeWidth="0.4" opacity="0.6"/>
      </g>
      {reeds}
      {[[8, 112], [14, 116], [100, 110], [108, 115], [113, 112]].map(([x, y], i) => <g key={i}>
        <path d={`M ${x} 131 L ${x + 0.4} ${y}`} stroke="#7E6A3A" strokeWidth="0.5"/>
        <rect x={x - 0.4} y={y - 4} width="1.6" height="4.6" rx="0.8" fill="#6A4424"/>
      </g>)}
      {snag && (
        <g filter="url(#merBark)">
          {/* weathered, bark-stripped snag rising out of frame, broken off at the top */}
          <path d="M 46 131 C 47.4 120 48.6 110 49.6 100 L 49 97.2 L 51.4 98.6 L 53 96.6 L 55.2 98.2 L 57 97 L 58.2 99 C 59.4 110 61 120 63.4 131 Z" fill="url(#merSnag)"/>
          <path d="M 51.4 104 C 51.6 112 52.2 121 52.6 130 M 55 102 C 55.4 112 56.4 122 57.4 130 M 57.6 108 C 58.4 116 59.4 124 60.4 130" stroke="#6C645C" strokeWidth="0.5" fill="none" opacity="0.7"/>
          <path d="M 58.6 112 C 64 108.6 70 106.6 77 105.6 L 77.4 106.8 C 71 108 65 110.4 59.2 114.6 Z" fill="#8A8178"/>
          <path d="M 69 107.4 l 3.4 -3.6" stroke="#8A8178" strokeWidth="0.7" strokeLinecap="round"/>
          <path d="M 48.4 117 l -4.6 -2.4 l 0.4 -1 l 4.6 2" fill="#8A8178"/>
        </g>
      )}
    </g>
  )
}

export default function Merlin({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'flight' ? 120 : 430); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 5
  const flight = pose === 'flight'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Merlin">
      <defs>
        <linearGradient id="merCap" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6E82A2"/><stop offset="100%" stopColor="#46587A"/></linearGradient>
        <linearGradient id="merWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6C80A2"/><stop offset="55%" stopColor={SLATE}/><stop offset="100%" stopColor="#425272"/></linearGradient>
        <linearGradient id="merBreast" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stopColor="#F4DFC4"/><stop offset="40%" stopColor="#E8B47C"/><stop offset="100%" stopColor="#D99A5E"/></linearGradient>
        <radialGradient id="merFace" cx="0.35" cy="0.6" r="0.75"><stop offset="0%" stopColor="#F2E2CA"/><stop offset="100%" stopColor="#DDC0A0"/></radialGradient>
        <linearGradient id="merBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8E9AB0"/><stop offset="100%" stopColor="#5C6880"/></linearGradient>
        <linearGradient id="merSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#86AED2"/><stop offset="60%" stopColor="#CFD9DE"/><stop offset="100%" stopColor="#EAD8BC"/></linearGradient>
        <linearGradient id="merMarsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B89A5C"/><stop offset="40%" stopColor="#C49A52"/><stop offset="100%" stopColor="#8E6A36"/></linearGradient>
        <linearGradient id="merWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C4D2DC"/><stop offset="100%" stopColor="#8EA4B4"/></linearGradient>
        <linearGradient id="merSnag" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#B4ACA2"/><stop offset="55%" stopColor="#8E857C"/><stop offset="100%" stopColor="#625A52"/></linearGradient>
        <clipPath id="merFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="merSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="merBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="merBlurL" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2"/></filter>
        <filter id="merTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.55" numOctaves="2" seed="8" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.04  0 0 0 0 0.04  1 0 0 0 -0.42" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="merLeaf" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.25 1.4" numOctaves="2" seed="12" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.12  0 0 0 0 0.04  0.9 0 0 0 -0.4" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="merBark" x="-10%" y="0" width="120%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.4 1.6" numOctaves="2" seed="3" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 0 0.12  1.4 0 0 0 -0.55" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#merFrame)">
        {scene && <Scene snag={!flight} dy={flight ? 16 : 0}/>}
        {!scene && !flight && <path d="M 47 103 L 49 97.4 L 58.2 98.6 L 59.6 106" fill="#8E857C"/>}
        {flight
          ? <g transform={`translate(0,${bob - 8})`}><Flight up={animated && frame % 2 === 1}/></g>
          : <g transform={`translate(0,${bob * 0.4})`}><Perched blink={blink}/></g>}
      </g>
    </svg>
  )
}
