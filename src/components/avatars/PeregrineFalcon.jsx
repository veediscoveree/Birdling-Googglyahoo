// Peregrine Falcon (adult) — naturalistic technique of BaldEagle.jsx (style guide v2).
// Drawn from its own proportions, not the kestrel's: crow-sized, deep heavy chest and broad
// shoulders, relatively small head under a dark "helmet", long wings reaching almost to the tip of
// a short tail. Stoop: side view, wings partly folded against a teardrop body with primaries and
// secondaries still separately visible, diving steeply head-first. Habitat: a city cornice.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'peregrine_falcon', poses: ['perch', 'stoop'] }

// Field marks: BLACKISH HOOD over crown and nape with a THICK BLACK MALAR ("helmet") dropping
// below the eye; WHITE CHEEK PATCH behind the malar and WHITE THROAT; dark eye with a YELLOW
// EYE-RING; short, deep, hooked blue-gray bill (dark tip, tomial tooth) with YELLOW CERE; SLATE
// BLUE-GRAY back and wings, barred darker; pale upper breast, lower breast/belly/flanks FINELY
// BARRED; barred trousers; heavy YELLOW FEET; short gray tail barred dark with a pale tip.

const HOOD = '#22252B'
const YEL = '#F0C232'

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const f2 = (v) => v.toFixed(2)
const lerp = (a, b, t) => a + (b - a) * t
const along = (B, T, s) => [lerp(B[0], T[0], s), lerp(B[1], T[1], s)]

// One feather from base B to tip T (no outline; separation comes from overlap and a faint edge).
function featherD(B, T, w, asym = 0.42, round = 0.5) {
  const dx = T[0] - B[0], dy = T[1] - B[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len
  const at = (s, t) => `${f2(B[0] + ux * len * s - uy * t)} ${f2(B[1] + uy * len * s + ux * t)}`
  const a = w * asym, b = w * (1 - asym), k = 1 - 0.22 * round
  return `M ${at(0, -a)} L ${at(k, -a * 0.96)} C ${at(1 - 0.06 * round, -a * 0.9)} ${at(1, -a * 0.45 * round)} ${at(1, 0)} C ${at(1, b * 0.5 * round)} ${at(1 - 0.08 * round, b)} ${at(k - 0.04, b)} L ${at(0, b)} Z`
}

// Fine dashed barring, drawn inside a clip.
function Bars({ x0, x1, y0, y1, step, color = '#3E4452', w = 0.42, curve = 1.2, op = 0.6 }) {
  const r = rng(Math.round(y0 * 7 + x0)), rows = []
  for (let y = y0, i = 0; y <= y1; y += step, i++) {
    rows.push(<path key={i} d={`M ${x0} ${f2(y)} Q ${f2((x0 + x1) / 2)} ${f2(y + curve)} ${x1} ${f2(y)}`} stroke={color} strokeWidth={w} fill="none"
      strokeDasharray={`${f2(1.0 + r() * 0.6)} ${f2(0.7 + r() * 0.5)}`} strokeDashoffset={f2(r() * 3)} strokeLinecap="round" opacity={op}/>)
  }
  return rows
}

// ── Perched on a cornice, facing left ────────────────────────────────────────
const BODY = 'M 38 38 C 32.6 44 29.4 54 29.8 64 C 30.2 76 34.6 87 42.6 94 C 46.6 97.4 53 98.2 57.4 96 L 62.4 88 C 66 76 66.2 60 63.2 50 C 61.4 44 58.4 39.4 55.4 36.4 Z'

function Perched({ blink }) {
  const r = rng(17)
  const tips = []
  for (let row = 0; row < 7; row++) for (let i = 0; i < 4; i++) {
    const x = 53 + i * 3.4 + row * 0.9 + (r() - 0.5), y = 50 + row * 5.2 + i * 1.5 + (r() - 0.5)
    tips.push(<path key={`t${row}${i}`} d={`M ${f2(x - 2)} ${f2(y)} q 2 2.2 4 0.4`} stroke="#A9B6C8" strokeWidth="0.55" fill="none" opacity={0.3 + r() * 0.15}/>)
  }
  return (
    <g>
      {/* short tail, barred, pale tip — only just beyond the wingtips */}
      <g filter="url(#pefTex)">
        <path d="M 55.6 92 L 66.4 90 L 77.4 116.4 C 74.6 118.6 70 119.2 66.6 118 Z" fill="url(#pefTail)"/>
        <clipPath id="pefTailClip"><path d="M 55.6 92 L 66.4 90 L 77.4 116.4 C 74.6 118.6 70 119.2 66.6 118 Z"/></clipPath>
        <g clipPath="url(#pefTailClip)">
          {[97, 102, 107, 112].map(y => <path key={y} d={`M 55 ${y} L 80 ${y - 3}`} stroke="#2C323C" strokeWidth="1.5" opacity="0.7"/>)}
          <path d="M 64 119 L 80 115" stroke="#E9E4DA" strokeWidth="2.2"/>
        </g>
      </g>
      <g filter="url(#pefTex)">
        {/* deep chest: white/cream upper breast, fine dense barring below */}
        <path d={BODY} fill="url(#pefBreast)"/>
        <clipPath id="pefBodyClip"><path d={BODY}/></clipPath>
        <g clipPath="url(#pefBodyClip)">
          <Bars x0={28} x1={66} y0={63} y1={98} step={1.9}/>
          <Bars x0={28} x1={66} y0={57} y1={62} step={2.5} op={0.35}/>
          {[[36, 53], [40, 55.4], [34.6, 58], [44, 57], [38.6, 60]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="0.5" ry="0.85" fill="#3E4452" opacity="0.45"/>)}
          {/* form shading: the far side of the chest turns away from the light */}
          <path d="M 56 50 C 62 60 63 78 58 94" stroke="#6E7688" strokeWidth="6" fill="none" opacity="0.35" filter="url(#pefBlurL)"/>
          <path d="M 34 86 C 40 94 48 98 56 96" stroke="#8A90A0" strokeWidth="3" fill="none" opacity="0.35" filter="url(#pefBlur)"/>
        </g>
        {/* barred trousers */}
        <path d="M 41.6 84 C 40.6 90 42.6 95.6 46.6 98.4 L 55.6 98.6 C 57.4 94 57 88 53.6 84.6 Z" fill="#E4DED4"/>
        <clipPath id="pefTrClip"><path d="M 41.6 84 C 40.6 90 42.6 95.6 46.6 98.4 L 55.6 98.6 C 57.4 94 57 88 53.6 84.6 Z"/></clipPath>
        <g clipPath="url(#pefTrClip)"><Bars x0={40} x1={58} y0={86} y1={99} step={1.9} curve={0.6}/></g>
        {/* slate mantle and the long folded wing (tip almost reaches the tail tip) */}
        <path d="M 50 40 C 56 38.6 62 42 64.4 48 L 63 56 C 59 51 55 47.6 50.6 46 Z" fill="#4C586A"/>
        <path d="M 51 45 C 58.6 42.4 65.6 46.6 67 56 C 68.6 70 69.4 88 72.4 104 L 74.6 114 C 69.6 108.6 64.4 100 61 91 C 56 78 52.4 62 51 45 Z" fill="url(#pefWing)"/>
        <clipPath id="pefWingClip"><path d="M 51 45 C 58.6 42.4 65.6 46.6 67 56 C 68.6 70 69.4 88 72.4 104 L 74.6 114 C 69.6 108.6 64.4 100 61 91 C 56 78 52.4 62 51 45 Z"/></clipPath>
        <g clipPath="url(#pefWingClip)">
          {tips}
          {/* dark slate barring on coverts/tertials, then the blackish primaries */}
          {[[56, 56], [60, 60], [57, 65], [62, 68], [59, 74], [64, 77]].map(([x, y], i) => <path key={i} d={`M ${x - 2.4} ${y} q 2.4 1.2 4.8 0`} stroke="#2E3646" strokeWidth="0.6" fill="none" opacity="0.22"/>)}
          <path d="M 60 84 C 64 92 68 102 75 116 L 80 116 L 72 80 Z" fill="#2A2F38"/>
          <path d="M 63.6 86 L 72.6 112 M 66.4 84.6 L 74 110 M 61.4 88.4 L 70.4 111" stroke="#495266" strokeWidth="0.45" opacity="0.8"/>
          <path d="M 51 46 C 52.6 62 56 78 61 91" stroke="#1C2028" strokeWidth="1.8" fill="none" opacity="0.35" filter="url(#pefBlur)"/>
        </g>
      </g>
      {/* heavy yellow feet gripping the stone */}
      <path d="M 46.4 97 L 45.8 100.2 M 53.2 97.4 L 53.4 100.4" stroke={YEL} strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M 41.8 101.4 C 43.4 99.6 46.4 99.4 48.6 100.6 M 49.8 101.6 C 51.8 99.8 55 100 56.8 101.6" stroke={YEL} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 41.8 101.4 l -0.9 0.9 M 48.6 100.6 l 0.6 1.2 M 56.8 101.6 l 0.9 0.8" stroke="#15161A" strokeWidth="0.9" strokeLinecap="round"/>
      <Head blink={blink}/>
    </g>
  )
}

function Head({ blink }) {
  // Smallish, rounded-flat head under a black helmet; facing left.
  return (
    <g>
      <g filter="url(#pefTex)">
        {/* white base: throat, cheek */}
        <path d="M 34.4 33 C 34.6 25 40 20.6 46.4 20.6 C 53 20.6 57.4 25 57.8 31 C 58.4 38 57.6 43 55.4 47 C 50 49.6 43 49.4 38.6 46 C 35.8 42 34.4 37.6 34.4 33 Z" fill="url(#pefCheek)"/>
        {/* hood: crown, nape and the broad malar wedge below the eye */}
        <path d="M 34.4 32.6 C 34.6 25 40 20.6 46.4 20.6 C 53 20.6 57.4 25 57.8 31 C 58.2 36.6 58 41 59 45.6 C 57.4 46.6 56 47 54.6 46.8 C 55.4 43.6 55.4 40 54.4 37.4 C 51.6 35.4 47.8 35.2 45.4 37 C 45 40.4 45.4 44 46.6 47.6 C 44.4 48 42.2 47.8 40.4 47 C 39 43.6 38.2 40 37.6 36.6 L 35.2 35.8 Z" fill="url(#pefHood)"/>
        <path d="M 46 22.6 C 50.6 22.6 54 25 55.4 28.6" stroke="#5A6272" strokeWidth="1.6" fill="none" opacity="0.35" filter="url(#pefBlur)"/>
      </g>
      {/* eye: dark, with the bare yellow orbital ring; brow shading above */}
      {blink
        ? <path d="M 38.6 31.6 q 2.4 1.2 4.8 0" stroke={YEL} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        : <g>
            <ellipse cx="41" cy="31.6" rx="3.3" ry="3.1" fill={YEL}/>
            <circle cx="41" cy="31.7" r="2.3" fill="#1A0F08"/>
            <circle cx="40.3" cy="31" r="0.5" fill="#FFF"/>
            <path d="M 37.4 29.6 C 39.4 28.2 42.6 28.2 44.6 29.6" stroke="#0E0F12" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          </g>}
      {/* cere */}
      <path d="M 37.2 29.2 C 35.8 29.2 34.8 30.2 34.6 31.6 L 34.6 33.8 C 35.6 34.3 36.8 34.3 37.8 33.8 Z" fill={YEL}/>
      {/* short deep bill: straight-then-hooked culmen, tomial tooth, dark tip */}
      <path d="M 35 29.6 C 32.6 29.6 30.6 30.8 29.6 32.8 C 28.8 34.4 28.9 36.2 29.8 37.4 C 30 36 30.8 35.1 31.8 34.9 L 32.4 35.5 L 33 34.6 L 35.2 34.2 Z" fill="url(#pefBill)"/>
      <path d="M 30.6 33.6 C 29.6 34.6 29.3 36.2 29.8 37.4 C 30 36 30.6 35.3 31.4 35 Z" fill="#1E2026"/>
      <path d="M 34.4 30.2 C 32.6 30.4 31 31.4 30.2 32.8" stroke="#A8B4C6" strokeWidth="0.45" fill="none"/>
      <path d="M 32.6 35.4 L 35.2 34.9 L 35 36.4 C 34 36.8 33.2 36.6 32.8 36.2 Z" fill="#7E8AA0"/>
    </g>
  )
}

// ── Stoop: side view, drawn level (travel = -x) then pitched steeply down ───────
function Stoop() {
  const body = 'M 27 62 C 27 56 33 52 41 51.4 C 55 50.6 71 54.4 87 59 C 91 60.2 91 63.8 87 65 C 71 69.4 55 72.6 41 72.6 C 33 72.6 27 68 27 62 Z'
  // near wing, partly folded: wrist pushed forward at the chest, hand swept back along the flank
  const prim = [
    { B: [44, 67], T: [98, 66.4], w: 3.6 },     // p6
    { B: [44.6, 68.2], T: [103, 67.8], w: 3.6 },  // p7
    { B: [45, 69.4], T: [107.6, 69.4], w: 3.4 },  // p8
    { B: [45.4, 70.6], T: [110, 71.2], w: 3.1 },  // p9 — longest
    { B: [45.6, 71.6], T: [105.6, 72.8], w: 2.7 }, // p10
  ]
  const inner = [[62, 63.8], [70, 64.4], [78, 64.8], [86, 65.4], [93, 65.8]].map(([tx, ty], i) => ({ B: [46 + i * 2.4, 64.4], T: [tx, ty], w: 3.2 }))
  const r = rng(5), tips = []
  for (let row = 0; row < 3; row++) for (let i = 0; i < 6 - row; i++) {
    const x = 48 + i * 4.2 + row * 2.2 + (r() - 0.5), y = 59.6 + row * 2 + i * 0.25
    tips.push(<path key={`c${row}${i}`} d={`M ${f2(x - 1.8)} ${f2(y)} q 1.8 1.6 3.6 0.2`} stroke="#AEBBCE" strokeWidth="0.5" fill="none" opacity={0.3 + r() * 0.15}/>)
  }
  return (
    <g>
      {/* far wing: its folded primaries show as a dark edge above the back */}
      {[[60, 53.4, 101, 56.2, 3.2], [62, 54.2, 105, 57.2, 3], [63, 55, 102, 58.2, 2.6]].map(([bx, by, tx, ty, w], i) => (
        <path key={i} d={featherD([bx, by], [tx, ty], w, 0.5, 0.6)} fill={['#2E333C', '#2A2F38', '#323843'][i]} stroke="#14171C" strokeWidth="0.3" strokeOpacity="0.7"/>
      ))}
      <path d="M 50 52.4 C 54 49.6 60 49.8 66 52 C 72 53.6 76 55 78 56.4 C 70 56.6 60 56.6 52 57 Z" fill="url(#pefWing)" filter="url(#pefTex)"/>
      {/* short tail, closed */}
      <g filter="url(#pefTex)">
        <path d="M 84 59.6 L 103 60.4 C 104.4 62 104.4 63.6 103 65.2 L 84 65.2 Z" fill="url(#pefTail)"/>
        {[88.6, 93.6, 98.4].map(x => <path key={x} d={`M ${x} 60 L ${x + 0.6} 65.2`} stroke="#2C323C" strokeWidth="1.3" opacity="0.7"/>)}
        <path d="M 102.6 60.4 C 104.2 62 104.2 63.6 102.6 65.2" stroke="#E9E4DA" strokeWidth="1.4" fill="none"/>
      </g>
      <g filter="url(#pefTex)">
        <path d={body} fill="url(#pefBreast)"/>
        <clipPath id="pefStoopClip"><path d={body}/></clipPath>
        <g clipPath="url(#pefStoopClip)">
          {/* fine barring on the belly/flank, read along the body */}
          {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M ${44 + i * 2.2} 64 Q ${43 + i * 2.2} 69 ${44.4 + i * 2.2} 74`} stroke="#3E4452" strokeWidth="0.55" fill="none" strokeDasharray="1.6 1" opacity="0.65"/>)}
          {/* slate back */}
          <path d="M 26 50 L 100 50 L 100 67 C 88 66.4 72 63.4 46 58.4 L 26 58 Z" fill="url(#pefWing)"/>
          <path d="M 30 70 C 44 75 66 72 88 65" stroke="#7E8698" strokeWidth="3" fill="none" opacity="0.35" filter="url(#pefBlur)"/>
        </g>
        {/* near wing: secondaries (short, compressed) then the long primaries, coverts over the base */}
        {inner.map((f, i) => <path key={`s${i}`} d={featherD(f.B, f.T, f.w, 0.5, 0.9)} fill={i % 2 ? '#56647A' : '#5C6A80'} stroke="#2A3240" strokeWidth="0.3" strokeOpacity="0.6"/>)}
        {prim.map((f, i) => <g key={`p${i}`}>
          <path d={featherD(f.B, f.T, f.w, 0.45, 0.55)} fill={['#323843', '#2D333D', '#2A2F38', '#262A32', '#2C313A'][i]} stroke="#14171C" strokeWidth="0.3" strokeOpacity="0.7"/>
          <path d={`M ${f2(along(f.B, f.T, 0.35)[0])} ${f2(along(f.B, f.T, 0.35)[1])} L ${f2(along(f.B, f.T, 0.92)[0])} ${f2(along(f.B, f.T, 0.92)[1])}`} stroke="#4E586A" strokeWidth="0.3" opacity="0.7"/>
        </g>)}
        <path d="M 52 55.4 C 45 56.4 40 61.6 39.6 67.6 C 39.8 70.6 42.4 71.6 46.4 70.6 C 56 68.4 70 66 80 63.6 C 70 61.2 60 58.4 52 55.4 Z" fill="url(#pefWing)"/>
        {tips}
        <path d="M 51 56 C 45 57.4 41 62 40.2 67" stroke="#B9C4D4" strokeWidth="0.7" fill="none" opacity="0.5"/>
      </g>
      {/* head: helmet, white cheek and throat, bill leading the dive */}
      <g filter="url(#pefTex)">
        <path d="M 26.6 62 C 26.6 56.6 30.6 52.6 36 52 C 40 51.6 43 52.4 46 54 L 44 60 C 41 62 40 66 41 70 C 37 71.6 32 71 29.4 68.6 C 27.6 66.6 26.6 64.4 26.6 62 Z" fill="url(#pefCheek)"/>
        <path d="M 26.8 60.6 C 27.6 55.8 31.4 52.4 36 52 C 40 51.6 44 52.4 48 54.4 L 50 58 C 46 58.4 43.6 59.6 42.4 61.6 C 42 64.4 42.4 67.4 43.4 70.4 C 41.6 71 39.6 71.2 37.6 71 C 36.6 68.4 36 66 35.8 63.4 L 28 62.6 Z" fill="url(#pefHood)"/>
      </g>
      <ellipse cx="32.4" cy="58.6" rx="2.3" ry="2.2" fill={YEL}/>
      <circle cx="32.3" cy="58.7" r="1.6" fill="#1A0F08"/>
      <circle cx="31.8" cy="58.2" r="0.36" fill="#FFF"/>
      <path d="M 30 57 C 31.6 56 33.6 56 35 57" stroke="#0E0F12" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M 28.6 58.6 C 27.6 58.8 27 59.6 27 60.6 L 27 62.2 C 27.8 62.6 28.6 62.6 29.4 62.2 Z" fill={YEL}/>
      <path d="M 27.4 58.8 C 25.6 59 24.2 60 23.6 61.6 C 23.2 62.8 23.4 64 24 64.8 C 24.2 63.8 24.8 63.2 25.6 63 L 27.6 62.4 Z" fill="url(#pefBill)"/>
      <path d="M 24.2 62 C 23.5 62.8 23.4 64 24 64.8 C 24.2 63.8 24.6 63.3 25.2 63.1 Z" fill="#1E2026"/>
    </g>
  )
}

// ── Habitat: city skyline (bridge, towers) and a stone cornice ───────────────
function skyline(seed, base, minH, maxH, minW, maxW) {
  const r = rng(seed), out = []
  let x = -4
  while (x < 124) {
    const w = minW + r() * (maxW - minW), h = minH + r() * (maxH - minH)
    out.push({ x, w, h, top: base - h, spire: r() < 0.18, step: r() < 0.35 })
    x += w + (r() < 0.3 ? r() * 2 : 0)
  }
  return out
}

function Buildings({ seed, base, minH, maxH, minW, maxW, fill, win, winOp = 0.35 }) {
  const bs = skyline(seed, base, minH, maxH, minW, maxW)
  return (
    <g>
      {bs.map((b, i) => <g key={i}>
        <path d={`M ${f2(b.x)} ${base} L ${f2(b.x)} ${f2(b.top)} ${b.step ? `L ${f2(b.x + b.w * 0.2)} ${f2(b.top)} L ${f2(b.x + b.w * 0.2)} ${f2(b.top - 2)} L ${f2(b.x + b.w * 0.8)} ${f2(b.top - 2)} L ${f2(b.x + b.w * 0.8)} ${f2(b.top)}` : ''} L ${f2(b.x + b.w)} ${f2(b.top)} L ${f2(b.x + b.w)} ${base} Z`} fill={fill}/>
        {b.spire && <path d={`M ${f2(b.x + b.w / 2 - 0.3)} ${f2(b.top - (b.step ? 2 : 0))} l 0.3 -5 l 0.3 5 Z`} fill={fill}/>}
        {win && Array.from({ length: Math.floor(b.h / 2.6) }, (_, k) => (
          <path key={k} d={`M ${f2(b.x + 0.8)} ${f2(b.top + 1.6 + k * 2.6)} L ${f2(b.x + b.w - 0.8)} ${f2(b.top + 1.6 + k * 2.6)}`} stroke={win} strokeWidth="0.7" strokeDasharray="0.9 0.7" opacity={winOp}/>
        ))}
      </g>)}
    </g>
  )
}

function City({ base, scale = 1 }) {
  // Atmospheric depth: far towers pale and soft, nearer ones darker and crisper.
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#pefSky)"/>
      <g filter="url(#pefSoft)" opacity="0.75">
        <ellipse cx="28" cy="22" rx="22" ry="4.5" fill="#FFF"/>
        <ellipse cx="94" cy="14" rx="16" ry="3.6" fill="#FFF8EE"/>
      </g>
      <g transform={`translate(0 ${base}) scale(1 ${scale}) translate(0 ${-base})`}>
        <g filter="url(#pefHaze)"><Buildings seed={3} base={base} minH={10} maxH={34} minW={4} maxW={9} fill="#B7C2CF"/></g>
        {/* suspension bridge in the haze */}
        <g opacity="0.85">
          <path d={`M 76 ${base - 2} L 76.4 ${base - 30} L 78.4 ${base - 30} L 78.8 ${base - 2} Z M 100 ${base - 2} L 100.4 ${base - 30} L 102.4 ${base - 30} L 102.8 ${base - 2} Z`} fill="#98A6B6"/>
          <path d={`M 76 ${base - 24} L 79 ${base - 24} M 100 ${base - 24} L 103 ${base - 24}`} stroke="#98A6B6" strokeWidth="1"/>
          <path d={`M 52 ${base - 5} Q 64 ${base - 6} 77.4 ${base - 29} Q 89.6 ${base - 5} 101.4 ${base - 29} Q 112 ${base - 8} 124 ${base - 5}`} stroke="#8E9CAE" strokeWidth="0.5" fill="none"/>
          <path d={`M 50 ${base - 4.6} L 124 ${base - 4.6}`} stroke="#8E9CAE" strokeWidth="1.2"/>
          {Array.from({ length: 22 }, (_, i) => { const x = 79 + i * 1.04; const t = (x - 77.4) / 24; const y = base - 29 + 24 * (1 - (2 * t - 1) ** 2); return <path key={i} d={`M ${f2(x)} ${f2(y)} L ${f2(x)} ${base - 4.6}`} stroke="#9AA8B8" strokeWidth="0.2"/> })}
        </g>
        <Buildings seed={11} base={base} minH={6} maxH={26} minW={5} maxW={11} fill="#8C9AAD" win="#D8DEE6" winOp={0.25}/>
        <rect x="0" y={base} width="120" height="40" fill="url(#pefWater)"/>
        <path d={`M 6 ${base + 3} h 16 M 40 ${base + 5} h 22 M 84 ${base + 4} h 18`} stroke="#E8EEF2" strokeWidth="0.5" opacity="0.5"/>
      </g>
    </g>
  )
}

function Cornice() {
  return (
    <g>
      {/* facade below the ledge, with tall windows reflecting the sky */}
      <rect x="0" y="106" width="120" height="24" fill="url(#pefFacade)" filter="url(#pefStone)"/>
      {[6, 34, 62, 90].map(x => <g key={x}>
        <rect x={x} y="111" width="22" height="22" fill="url(#pefGlass)"/>
        <path d={`M ${x + 3} 129 L ${x + 14} 112 M ${x + 9} 130 L ${x + 20} 113`} stroke="#B4C6D6" strokeWidth="1.4" opacity="0.18"/>
        <path d={`M ${x + 11} 111 L ${x + 11} 130 M ${x} 120 L ${x + 22} 120`} stroke="#9C9282" strokeWidth="1"/>
        <path d={`M ${x} 111.6 L ${x + 22} 111.6`} stroke="#3C3A36" strokeWidth="1.2" opacity="0.5"/>
      </g>)}
      <g filter="url(#pefStone)">
        {/* cornice: lit top surface, overhanging molding, dentils in shadow */}
        <path d="M 0 97.6 L 120 96.4 L 120 101 L 0 102.4 Z" fill="url(#pefLedgeTop)"/>
        <path d="M 0 102.4 L 120 101 L 120 104.6 L 0 106 Z" fill="#B3A794"/>
        <path d="M 0 106 L 120 104.6 L 120 107.4 L 0 108.8 Z" fill="#6E6556"/>
        {Array.from({ length: 30 }, (_, i) => <rect key={i} x={i * 4.1 + 0.6} y={106.2 - i * 0.047} width="2.2" height="2.2" fill="#9A8F7C"/>)}
        <path d="M 0 102.4 L 120 101" stroke="#E8DFCE" strokeWidth="0.6"/>
        <path d="M 0 108.8 L 120 107.4" stroke="#4A4238" strokeWidth="1.2" opacity="0.6" filter="url(#pefBlur)"/>
      </g>
      {/* weathering stains and a seam on the ledge */}
      <path d="M 22 98 l 0 3.6 M 88 97 l 0 3.8" stroke="#A89C88" strokeWidth="0.5"/>
      <path d="M 12 102.6 q 1 2 0.4 3 M 70 101.8 q 1 2 0.2 3.4" stroke="#8E8270" strokeWidth="0.8" opacity="0.4"/>
    </g>
  )
}

export default function PeregrineFalcon({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 440); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 6
  const stoop = pose === 'stoop'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Peregrine Falcon">
      <defs>
        <linearGradient id="pefHood" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3A404C"/><stop offset="100%" stopColor={HOOD}/></linearGradient>
        <radialGradient id="pefCheek" cx="0.4" cy="0.65" r="0.7"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#E6E2DA"/></radialGradient>
        <linearGradient id="pefWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7484A0"/><stop offset="55%" stopColor="#5A6880"/><stop offset="100%" stopColor="#424E62"/></linearGradient>
        <linearGradient id="pefTail" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6E7A8E"/><stop offset="100%" stopColor="#525C6E"/></linearGradient>
        <linearGradient id="pefBreast" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="40%" stopColor="#F6EEE4"/><stop offset="100%" stopColor="#E4DACC"/></linearGradient>
        <linearGradient id="pefBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8E9AB0"/><stop offset="100%" stopColor="#5C6880"/></linearGradient>
        <linearGradient id="pefSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7FAAD2"/><stop offset="70%" stopColor="#C9D6E0"/><stop offset="100%" stopColor="#E8DED0"/></linearGradient>
        <linearGradient id="pefWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8FA2B4"/><stop offset="100%" stopColor="#5E7488"/></linearGradient>
        <linearGradient id="pefFacade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B6AA96"/><stop offset="100%" stopColor="#A49884"/></linearGradient>
        <linearGradient id="pefGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7E94AA"/><stop offset="50%" stopColor="#5E7088"/><stop offset="100%" stopColor="#465468"/></linearGradient>
        <linearGradient id="pefLedgeTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E2D8C6"/><stop offset="100%" stopColor="#CFC3AE"/></linearGradient>
        <clipPath id="pefFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="pefSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="pefHaze" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.35"/></filter>
        <filter id="pefBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="pefBlurL" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2"/></filter>
        <filter id="pefTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1 0.55" numOctaves="2" seed="6" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.04  0 0 0 0 0.06  1 0 0 0 -0.42" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="pefStone" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="2" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.22  0 0 0 0 0.18  1.3 0 0 0 -0.5" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#pefFrame)">
        {scene && <City base={stoop ? 116 : 92} scale={stoop ? 0.7 : 1}/>}
        {stoop
          ? <g transform={`translate(${bob * 0.6},${-bob}) translate(62 62) rotate(-56) translate(-66 -62)`}><Stoop/></g>
          : <>
              {scene ? <Cornice/> : <path d="M 26 101 L 82 100" stroke="#CFC3AE" strokeWidth="3.4" strokeLinecap="round"/>}
              <g transform={`translate(0,${bob * 0.4})`}><Perched blink={blink}/></g>
            </>}
      </g>
    </svg>
  )
}
