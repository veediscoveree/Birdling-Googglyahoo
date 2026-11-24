// Great Horned Owl — naturalistic technique (see BaldEagle.jsx pass 3).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped
// to the plumage; barring and mottling are soft, slightly blurred marks. True owl proportions:
// broad flat-topped head nearly as wide as the barrel-shaped body, no visible neck, short tail,
// eyes large but set deep under heavy brows (not round cartoon eyes).
// Field marks: wide-set EAR TUFTS ("horns"); RUSTY-ORANGE facial disc rimmed BLACK; big YELLOW
// eyes under dark brows with a pale V of bristles over the gray hooked bill; WHITE THROAT BIB;
// upper breast blotched dark, the rest DENSELY BARRED gray-brown on buff; mottled brown folded
// wings; heavily FEATHERED feet. In flight (from below): broad, rounded wings with buff coverts,
// barred flight feathers and a dark wrist patch; big head; short barred tail.
// Habitat: perched on a conifer branch at dusk, spruce spires against the afterglow.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'great_horned_owl', poses: ['perch'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

// A primary "finger": broad at the base, tapering to a rounded tip.
function quill(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} C ${P(l * 0.5, -w * 0.55)} ${P(l * 0.82, -w * 0.45)} ${P(l * 0.97, -w * 0.22)} Q ${P(l * 1.04, 0)} ${P(l * 0.96, w * 0.24)} C ${P(l * 0.8, w * 0.45)} ${P(l * 0.5, w * 0.55)} ${P(0, w * 0.5)} Z`} fill={fill}/>
}

// Dense, broken horizontal barring: many short wavy dashes with gaps (reads as fine texture).
function barring(r, x0, x1, y0, y1, step, color, w, op) {
  const out = []
  for (let y = y0, k = 0; y < y1; y += step * (0.85 + r() * 0.3), k++) {
    let x = x0 + r() * 2
    while (x < x1) {
      const L = 3 + r() * 5, sag = (r() - 0.45) * 1.3
      out.push(<path key={`${k}-${x.toFixed(1)}`} d={`M ${x.toFixed(2)} ${y.toFixed(2)} q ${(L / 2).toFixed(2)} ${sag.toFixed(2)} ${L.toFixed(2)} ${(r() - 0.5).toFixed(2) * 0.4}`} stroke={color} strokeWidth={w * (0.8 + r() * 0.5)} fill="none" strokeLinecap="round" opacity={op * (0.7 + r() * 0.5)}/>)
      x += L + 0.6 + r() * 1.6
    }
  }
  return out
}

// Soft mottling: small rotated blots.
function mottle(r, n, x0, x1, y0, y1, cols, rmin, rmax, op) {
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), a = rmin + r() * (rmax - rmin)
    return <ellipse key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} rx={a.toFixed(2)} ry={(a * (0.45 + r() * 0.3)).toFixed(2)} transform={`rotate(${(r() * 40 - 20).toFixed(1)} ${x.toFixed(2)} ${y.toFixed(2)})`} fill={cols[Math.floor(r() * cols.length)]} opacity={op * (0.6 + r() * 0.6)}/>
  })
}

const OWL_D = 'M 60 24.6 C 66 24 72 25 75.8 27.8 C 79.2 30.8 80.4 35.4 80 40.4 C 79.6 45 78.2 48.6 78.4 51.6 C 82 55.6 84.4 62.6 84.6 70.8 C 84.8 80 82 89 76.4 95.4 C 72 99.4 66 101.4 60 101.6 C 54 101.4 48 99.4 43.6 95.4 C 38 89 35.2 80 35.4 70.8 C 35.6 62.6 38 55.6 41.6 51.6 C 41.8 48.6 40.4 45 40 40.4 C 39.6 35.4 40.8 30.8 44.2 27.8 C 48 25 54 24 60 24.6 Z'
const WING_L = 'M 41.6 51.6 C 38 55.6 35.6 62.6 35.4 70.8 C 35.2 80 38 89 43.6 95.4 L 47.4 99.6 C 45.6 90 45 78 46 68 C 46.8 61 46.6 56 44.8 52.2 Z'
const WING_R = 'M 78.4 51.6 C 82 55.6 84.4 62.6 84.6 70.8 C 84.8 80 82 89 76.4 95.4 L 72.6 99.6 C 74.4 90 75 78 74 68 C 73.2 61 73.4 56 75.2 52.2 Z'
const DISC_D = 'M 60 31.6 C 56 28.8 49 28.2 44.8 30.8 C 41.6 33.6 41.2 39 42.2 43.6 C 43.6 48.4 47.8 51.4 53 52 C 56 52.2 58.4 51.6 60 50.6 C 61.6 51.6 64 52.2 67 52 C 72.2 51.4 76.4 48.4 77.8 43.6 C 78.8 39 78.4 33.6 75.2 30.8 C 71 28.2 64 28.8 60 31.6 Z'

const TUFT = [[51.8, 28.6, -100, 7.6, 3.2], [44.8, 30.6, -113, 10.6, 3.2], [50, 28.8, -104, 11.8, 3.4], [46.4, 29.8, -110, 14.2, 3.4], [48.2, 29.2, -107, 15.6, 3.6]]

function Eye({ cx, cy, s, blink }) {
  // s = -1 left eye, +1 right eye (viewer's). Brow slopes down toward the bill: the fierce look.
  const yl = cy - (s < 0 ? 2.4 : 1.1), yr = cy - (s < 0 ? 1.1 : 2.4)
  if (blink) return <path d={`M ${cx - 4} ${cy + 0.4} q 4 1.6 8 0`} stroke="#2A1A10" strokeWidth="1.1" fill="none"/>
  return (
    <g>
      <circle cx={cx} cy={cy} r="4.1" fill="#160D06"/>
      <circle cx={cx} cy={cy} r="3.55" fill="url(#ghoIris)"/>
      <circle cx={cx} cy={cy + 0.2} r="1.95" fill="#070302"/>
      {/* feathered upper lid riding over the eyeball, lower toward the bill: the fierce look */}
      <path d={`M ${cx - 4.3} ${yl} Q ${cx} ${Math.min(yl, yr) - 0.7} ${cx + 4.3} ${yr} A 4.35 4.35 0 0 0 ${cx - 4.3} ${yl} Z`} fill="#4A2E1A"/>
      <path d={`M ${cx - 4.1} ${yl} Q ${cx} ${Math.min(yl, yr) - 0.6} ${cx + 4.1} ${yr}`} stroke="#120904" strokeWidth="0.55" fill="none"/>
      <circle cx={cx - 1.2} cy={cy - 0.6} r="0.55" fill="#FFF8E8" opacity="0.95"/>
    </g>
  )
}

function Tail() {
  return (
    <g>
      {/* short barred tail hanging behind the branch */}
      <g filter="url(#ghoTex)">
        <path d="M 54 96 L 66 96 L 64.8 113 C 62 114 58 114 55.2 113 Z" fill="#6A5038"/>
      </g>
      <path d="M 55 102 q 5 1 10 0 M 55.2 106.6 q 4.8 1 9.6 0 M 55.4 111 q 4.6 0.8 9.2 0" stroke="#C2A880" strokeWidth="0.8" fill="none" opacity="0.45"/>

    </g>
  )
}

// ── Perched upright on a conifer branch, facing the viewer ───────────────────
function Perched({ blink, glow }) {
  const r = rng(29)
  return (
    <g>
      <g filter="url(#ghoTex)">
        {/* body + head in one silhouette: buff breast, darker sides */}
        <path d={OWL_D} fill="url(#ghoBody)"/>
        <g clipPath="url(#ghoOwlClip)">
          {/* crown and back of the head: mottled brown */}
          <path d="M 38 24 L 82 24 L 82 34 C 70 30 50 30 38 34 Z" fill="#5C4430" opacity="0.7"/>
          <g filter="url(#ghoSoftB)">
            {mottle(r, 40, 41, 79, 25, 33, ['#3A2818', '#8A6A48', '#2E2014'], 0.6, 1.4, 0.55)}
            {/* upper breast below the bib: heavier dark blotches forming a necklace */}
            {mottle(r, 46, 46, 74, 57, 67, ['#3A2A1C', '#4A3624', '#2A1E14'], 0.7, 1.7, 0.6)}
            {/* the rest: dense fine barring */}
          </g>
          <g filter="url(#ghoBar)">{barring(r, 42, 78, 64, 101, 2.1, '#463222', 0.6, 0.4)}</g>
          {/* side shade and warm afterglow rim from the right */}
          <path d="M 34 40 L 48 40 C 44 60 44 80 50 104 L 34 104 Z" fill="#1E140C" opacity="0.32" filter="url(#ghoGlow)"/>
          <path d="M 79.6 38 C 80 46 78.6 50 79 52 C 83 57 84.8 64 84.8 71 C 84.8 81 81.6 90 76 96" stroke="#F0A468" strokeWidth="2.2" fill="none" opacity={glow * 0.55} filter="url(#ghoGlow)"/>
        </g>

        {/* folded wings at the sides: mottled darker brown with pale spotting */}
        <path d={WING_L} fill="url(#ghoWingL)"/>
        <path d={WING_R} fill="url(#ghoWingR)"/>
        <g filter="url(#ghoSoftB)">
          <g clipPath="url(#ghoWingLClip)">
            {mottle(r, 34, 35, 47, 52, 99, ['#B09068', '#2A1C10', '#C8AA80'], 0.5, 1.3, 0.55)}
            {barring(r, 35, 47, 76, 99, 3.2, '#C4A678', 0.55, 0.4)}
            {mottle(r, 26, 36, 46, 54, 80, ['#DCC296', '#E8D2A6'], 0.35, 0.8, 0.75)}
          </g>
          <g clipPath="url(#ghoWingRClip)">
            {mottle(r, 34, 73, 85, 52, 99, ['#B09068', '#2A1C10', '#D0B086'], 0.5, 1.3, 0.55)}
            {barring(r, 73, 85, 76, 99, 3.2, '#C8AA7E', 0.55, 0.42)}
            {mottle(r, 26, 74, 84, 54, 80, ['#E0C69A', '#ECD6AA'], 0.35, 0.8, 0.8)}
          </g>
        </g>
        <path d="M 44.8 52.2 C 46.6 56 46.8 61 46 68 C 45 78 45.6 90 47.4 99.6" stroke="#1A100A" strokeWidth="1" fill="none" opacity="0.22" filter="url(#ghoBlur)"/>
        <path d="M 75.2 52.2 C 73.4 56 73.2 61 74 68 C 75 78 74.4 90 72.6 99.6" stroke="#1A100A" strokeWidth="1" fill="none" opacity="0.2" filter="url(#ghoBlur)"/>

        {/* ear tufts: a fan of dark, buff-edged feathers set wide on the crown, angled outward */}
        {TUFT.flatMap(([x, y, a, L, w], i) => [
          quill(`tlb${i}`, x + 0.5, y, a + 2, L * 0.88, w, '#6A5038'),
          quill(`tl${i}`, x, y, a, L, w * 0.9, ['#2A1C12', '#40301E', '#1C130C'][i % 3]),
          quill(`trb${i}`, 119.5 - x, y, 178 - a, L * 0.88, w, '#6A5038'),
          quill(`tr${i}`, 120 - x, y, 180 - a, L, w * 0.9, ['#2A1C12', '#40301E', '#1C130C'][i % 3]),
        ])}
        {/* facial disc: rusty-orange, paler toward the centre */}
        <path d={DISC_D} fill="url(#ghoDisc)" filter="url(#ghoBlur)"/>
        <g clipPath="url(#ghoDiscClip)" filter="url(#ghoSoftB)">
          {/* faint radiating bristle grain around the eyes */}
          {Array.from({ length: 40 }, (_, i) => {
            const a = (i / 40) * Math.PI * 2, cx = i % 2 ? 52.4 : 67.6
            return <path key={i} d={`M ${(cx + Math.cos(a) * 5.6).toFixed(2)} ${(39.6 + Math.sin(a) * 5.6).toFixed(2)} L ${(cx + Math.cos(a) * 10).toFixed(2)} ${(39.6 + Math.sin(a) * 10).toFixed(2)}`} stroke="#6E3E20" strokeWidth="0.4" opacity="0.35"/>
          })}
          {/* pale V of bristles between the eyes, over the bill */}
          <path d="M 60 32.6 C 58 35.6 56.8 39 57 43 C 57.6 46.6 58.8 49 60 50 C 61.2 49 62.4 46.6 63 43 C 63.2 39 62 35.6 60 32.6 Z" fill="#D8CCB4" opacity="0.7"/>
          <path d="M 60 32 C 56 33 52 33.4 47.6 33 C 51 31.4 55.6 31 60 32 Z M 60 32 C 64 33 68 33.4 72.4 33 C 69 31.4 64.4 31 60 32 Z" fill="#E4D6BC" opacity="0.45"/>
        </g>
        {/* black rim around the sides of the disc */}
        <path d="M 46 30.2 C 41.8 32.6 41 38.6 42.2 43.6 C 43.6 48.4 47.6 51.2 52.6 52" stroke="#140C06" strokeWidth="1.6" fill="none" opacity="0.85" filter="url(#ghoBlur)"/>
        <path d="M 74 30.2 C 78.2 32.6 79 38.6 77.8 43.6 C 76.4 48.4 72.4 51.2 67.4 52" stroke="#140C06" strokeWidth="1.6" fill="none" opacity="0.85" filter="url(#ghoBlur)"/>

        {/* white throat bib */}
        <path d="M 49.6 51.2 C 54 54 66 54 70.4 51.2 C 70.6 54.6 67 58.6 60 59 C 53 58.6 49.4 54.6 49.6 51.2 Z" fill="#F4F0E6" filter="url(#ghoSoftB)"/>
      </g>

      {/* eyes deep under the brows */}
      <Eye cx={52.4} cy={39.6} s={-1} blink={blink}/>
      <Eye cx={67.6} cy={39.6} s={1} blink={blink}/>
      {/* dark brow masses above the eyes, sloping in toward the bill */}
      <path d="M 46.4 34.6 C 49.4 33 54 33.2 57.6 35.6 C 54.4 35 50 35.2 47 36.6 Z M 73.6 34.6 C 70.6 33 66 33.2 62.4 35.6 C 65.6 35 70 35.2 73 36.6 Z" fill="#3A2414" opacity="0.55" filter="url(#ghoBlur)"/>

      {/* gray hooked bill, mostly buried in bristles */}
      <path d="M 58.3 42.6 C 58.9 41.5 61.1 41.5 61.7 42.6 C 62 44.6 61.2 46.6 60 47.8 C 58.8 46.6 58 44.6 58.3 42.6 Z" fill="url(#ghoBill)"/>
      <path d="M 59.4 42.4 C 59.4 44.4 59.6 46 60 47.4" stroke="#9AA0A8" strokeWidth="0.4" fill="none" opacity="0.7"/>
      <path d="M 57.4 42 C 58.6 43 61.4 43 62.6 42" stroke="#DCCDB2" strokeWidth="1" fill="none" opacity="0.85" filter="url(#ghoSoftB)"/>

      {/* feathered feet gripping the branch; dark talons over its front */}
      <g filter="url(#ghoTex)">
        <path d="M 48.6 101.6 C 48.4 98.8 50.6 97.4 53.4 97.6 C 56.4 97.8 58 99.6 57.6 102.4 C 55 103.4 51 103.2 48.6 101.6 Z" fill="#D6C2A0"/>
        <path d="M 62.4 102.4 C 62 99.6 63.6 97.8 66.6 97.6 C 69.4 97.4 71.6 98.8 71.4 101.6 C 69 103.2 65 103.4 62.4 102.4 Z" fill="#CDB896"/>
      </g>
      <path d="M 50 102.4 q -0.6 1.6 0.4 2.8 M 53 103 q -0.4 1.6 0.4 2.8 M 56 102.8 q 0 1.6 0.8 2.6 M 64 102.8 q 0 1.6 -0.8 2.6 M 67 103 q 0.4 1.6 -0.4 2.8 M 70 102.4 q 0.6 1.6 -0.4 2.8" stroke="#141010" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    </g>
  )
}

// ── Silent glide overhead, seen from below, face turned down to the viewer ───
// Owl wing: very broad chord, short rounded hand, soft scalloped trailing edge.
function UnderWing({ s }) {
  const X = (x) => 60 + s * x
  // rounded hand: six broad, overlapping primaries (only shallow slots), barred buff and brown
  const fingers = [[35.6, 42, -18, 12], [37.6, 43.8, -10, 13.4], [38.8, 46.2, -1, 14], [39.2, 48.8, 8, 13.4], [38.4, 51.4, 17, 12.2], [36.8, 54, 26, 10.6]].flatMap(([x, y, a0, L], i) => {
    const a = s > 0 ? a0 : 180 - a0, t = a * Math.PI / 180
    const at = (k) => [X(x) + Math.cos(t) * L * k, y + Math.sin(t) * L * k]
    return [quill(`f${i}`, X(x), y, a, L, 6.2, i % 2 ? '#C8B692' : '#D2C09C'),
      ...[0.5, 0.7, 0.9].map((k, j) => { const [px, py] = at(k); return quill(`b${i}${j}`, px, py, a, L * 0.1, 5.8, '#806448') })]
  })
  // trailing edge: soft scallops from the body out to the hand
  const te = [[6, 67.2], [11, 67.8], [16, 67.6], [21, 67], [26, 65.8], [31, 63.8], [35.6, 61.2], [39.6, 57.8]]
  let tr = `${X(6)} 67.2`
  for (let i = 1; i < te.length; i++) tr += ` Q ${X((te[i - 1][0] + te[i][0]) / 2)} ${((te[i - 1][1] + te[i][1]) / 2 + 1.1).toFixed(2)} ${X(te[i][0])} ${te[i][1]}`
  return (
    <g>
      {fingers}
      <path d={`M ${tr} L ${X(39.6)} 57.8 L ${X(41.6)} 54 L ${X(40.6)} 40.6 C ${X(38.6)} 39 ${X(35.4)} 38.2 ${X(31)} 38.2 C ${X(23)} 38.4 ${X(14)} 41 ${X(6)} 45 Z`} fill="url(#ghoRemiges)"/>
      {/* broad soft bars across the flight feathers, following the trailing edge */}
      {[2.4, 6, 9.6].map((o, i) => <path key={`b${i}`} d={`M ${X(7)} ${67 - o} C ${X(16)} ${67.6 - o} ${X(28)} ${65 - o} ${X(40.4)} ${57.6 - o * 0.75}`} stroke="#6A543C" strokeWidth="1.5" fill="none" opacity="0.42" filter="url(#ghoBlur)"/>)}
      {/* buff coverts with fine marks; dark comma at the wrist */}
      <path d={`M ${X(6)} 45 C ${X(14)} 41 ${X(23)} 38.4 ${X(31)} 38.2 C ${X(35.4)} 38.2 ${X(38.6)} 39 ${X(40.6)} 40.6 C ${X(35)} 47 ${X(27)} 51.4 ${X(19)} 53.2 C ${X(13)} 54.4 ${X(9)} 54.8 ${X(6)} 55 Z`} fill="url(#ghoCoverts)" filter="url(#ghoSoftB)"/>
      <path d={`M ${X(31.6)} 44.2 C ${X(34.4)} 42.4 ${X(37.4)} 41.8 ${X(39.6)} 42.2 C ${X(38.4)} 45 ${X(36)} 46.6 ${X(33.2)} 47 C ${X(31.8)} 46.4 ${X(31.2)} 45.2 ${X(31.6)} 44.2 Z`} fill="#3A2818" opacity="0.7" filter="url(#ghoBlur)"/>
      {[43.6, 46.8, 50].map((y, i) => <path key={`c${i}`} d={`M ${X(7)} ${y + 2} C ${X(14)} ${y + 0.4} ${X(22)} ${y - 1 + i * 0.6} ${X(30 - i * 5)} ${y - 1.8 + i * 1.6}`} stroke="#7A5E40" strokeWidth="0.55" strokeDasharray="1.2 1.3" fill="none" opacity="0.45" filter="url(#ghoSoftB)"/>)}
    </g>
  )
}

function Flying({ blink }) {
  const r = rng(41)
  return (
    <g transform="rotate(-5 60 60) translate(60 62) scale(1.02) translate(-60 -60)">
      {/* short, broad, barred tail */}
      <g filter="url(#ghoTex)"><path d="M 54.2 68 L 65.8 68 L 67.4 82 C 63 83.8 57 83.8 52.6 82 Z" fill="#B49A76"/></g>
      {[72.4, 76.4, 80.2].map((y, i) => <path key={i} d={`M ${54 - i * 0.5} ${y} Q 60 ${y + 1.2} ${66 + i * 0.5} ${y}`} stroke="#5A4430" strokeWidth="1.2" fill="none" opacity="0.55" filter="url(#ghoSoftB)"/>)}
      <g filter="url(#ghoTexL)"><UnderWing s={-1}/><UnderWing s={1}/></g>
      <g filter="url(#ghoTex)">
        {/* broad barrel body: buff, densely barred */}
        <path d="M 50.6 46 C 50.4 41 54 38.6 60 38.6 C 66 38.6 69.6 41 69.4 46 L 68.8 60 C 68.2 66.6 64.4 70.6 60 71 C 55.6 70.6 51.8 66.6 51.2 60 Z" fill="url(#ghoBodyU)"/>
        <g clipPath="url(#ghoBellyClip)" filter="url(#ghoBar)">{barring(r, 50, 70, 47, 71, 1.9, '#4A3826', 0.55, 0.55)}</g>
        {/* feathered feet tucked up under the tail base */}
        <path d="M 54.6 66.4 C 54.4 69.4 56.4 71.4 58.6 71.2 C 59.2 69.4 58.6 67.4 57 66 Z M 65.4 66.4 C 65.6 69.4 63.6 71.4 61.4 71.2 C 60.8 69.4 61.4 67.4 63 66 Z" fill="#DCCAA8"/>
      </g>
      <path d="M 56.2 70.6 q 0.4 0.8 1 1 M 63.8 70.6 q -0.4 0.8 -1 1" stroke="#141010" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
      <g filter="url(#ghoTex)">
        {/* big broad head, face turned down toward the viewer; tufts half-flattened */}
        <path d="M 46.6 33 C 46.2 25.4 52 21 60 21 C 68 21 73.8 25.4 73.4 33 C 73 39.8 67.6 45 60 45.8 C 52.4 45 47 39.8 46.6 33 Z" fill="url(#ghoHeadU)"/>
        {[[49.6, 26, -122, 4.6], [51.4, 24.8, -114, 5.4], [53.2, 24, -106, 4.2]].flatMap(([x, y, a, L], i) => [
          quill(`fl${i}`, x, y, a, L, 3, i % 2 ? '#2A1C12' : '#3E2C1C'),
          quill(`fr${i}`, 120 - x, y, 180 - a, L, 3, i % 2 ? '#2A1C12' : '#3E2C1C')])}
        <path d="M 48.6 30 C 49 26.6 54.2 25.4 60 27.8 C 65.8 25.4 71 26.6 71.4 30 C 72 36.2 68.6 41.6 63.6 42.8 C 62.2 42.8 60.8 42.2 60 41.6 C 59.2 42.2 57.8 42.8 56.4 42.8 C 51.4 41.6 48 36.2 48.6 30 Z" fill="url(#ghoDisc)" filter="url(#ghoBlur)"/>
        <path d="M 49.6 28 C 48 31 48.2 36.6 50.8 40 M 70.4 28 C 72 31 71.8 36.6 69.2 40" stroke="#140C06" strokeWidth="1.2" fill="none" opacity="0.8" filter="url(#ghoBlur)"/>
        <path d="M 60 28.6 C 58.8 31 58.4 34 58.8 37 C 59.2 38.6 59.6 39.6 60 40 C 60.4 39.6 60.8 38.6 61.2 37 C 61.6 34 61.2 31 60 28.6 Z" fill="#D8CCB4" opacity="0.75" filter="url(#ghoSoftB)"/>
        <path d="M 53 42.6 C 56 44.6 64 44.6 67 42.6 C 66.2 45.4 63.4 46.6 60 46.6 C 56.6 46.6 53.8 45.4 53 42.6 Z" fill="#F4F0E6" filter="url(#ghoSoftB)"/>
      </g>
      {blink
        ? <path d="M 51.6 33.4 q 2.8 1 5.6 0 M 62.8 33.4 q 2.8 1 5.6 0" stroke="#2A1A10" strokeWidth="0.9" fill="none"/>
        : [[54.4, -1], [65.6, 1]].map(([cx, s]) => {
          const yl = 33.4 - (s < 0 ? 1.8 : 0.8), yr = 33.4 - (s < 0 ? 0.8 : 1.8)
          return (
            <g key={cx}>
              <circle cx={cx} cy="33.4" r="3" fill="#160D06"/>
              <circle cx={cx} cy="33.4" r="2.6" fill="url(#ghoIris)"/>
              <circle cx={cx} cy="33.6" r="1.4" fill="#070302"/>
              <path d={`M ${cx - 3.1} ${yl} Q ${cx} ${Math.min(yl, yr) - 0.5} ${cx + 3.1} ${yr} A 3.15 3.15 0 0 0 ${cx - 3.1} ${yl} Z`} fill="#4A2E1A"/>
              <circle cx={cx - 0.8} cy="33.2" r="0.4" fill="#FFF8E8"/>
            </g>)
        })}
      <path d="M 59 36 C 59.4 35.2 60.6 35.2 61 36 C 61.2 37.4 60.6 38.6 60 39.4 C 59.4 38.6 58.8 37.4 59 36 Z" fill="url(#ghoBill)"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
// Spruce spire: tiers of drooping branches, ragged edges, narrowing to a fine leader.
function spire(x, base, h, w, seed) {
  const r = rng(seed), n = 11 + Math.floor(r() * 4), right = [], left = []
  for (let i = 0; i <= n; i++) {
    const t = i / n, y = base - h * t, hw = w * Math.pow(1 - t, 0.85) * (0.75 + r() * 0.5) + 0.3
    const droop = (h / n) * 0.35
    right.push(`${(x + hw).toFixed(2)} ${(y + droop).toFixed(2)}`, `${(x + hw * 0.35 + 0.3).toFixed(2)} ${(y - h / n * 0.35).toFixed(2)}`)
    const hl = w * Math.pow(1 - t, 0.85) * (0.75 + r() * 0.5) + 0.3
    left.unshift(`${(x - hl * 0.35 - 0.3).toFixed(2)} ${(y - h / n * 0.35).toFixed(2)}`, `${(x - hl).toFixed(2)} ${(y + droop).toFixed(2)}`)
  }
  return `M ${x} ${base + 2} L ${right.join(' L ')} L ${x} ${base - h - 2} L ${left.join(' L ')} Z`
}

// Spruce spray: a twig with short dense needles on both sides.
function spray(key, x, y, a, L, r, col, op = 1) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const out = [<path key={`${key}s`} d={`M ${x} ${y} l ${(c * L).toFixed(2)} ${(s * L).toFixed(2)}`} stroke={col} strokeWidth="0.6" opacity={op}/>]
  const n = Math.floor(L / 0.9)
  let d = ''
  for (let i = 1; i < n; i++) {
    const u = i * 0.9, px = x + c * u, py = y + s * u, nl = 1.6 + (1 - i / n) * 1.2 + r() * 0.5
    for (const side of [-1, 1]) {
      const na = t + side * (0.9 + r() * 0.3) + 0.25
      d += `M ${px.toFixed(2)} ${py.toFixed(2)} l ${(Math.cos(na) * nl).toFixed(2)} ${(Math.sin(na) * nl).toFixed(2)} `
    }
  }
  out.push(<path key={`${key}n`} d={d} stroke={col} strokeWidth="0.42" strokeLinecap="round" opacity={op}/>)
  return out
}

function DuskConifers({ glow }) {
  const r = rng(53)
  const far = [[6, 96, 30, 5], [16, 98, 38, 6], [27, 97, 26, 4.6], [38, 99, 34, 5.4], [86, 97, 30, 5], [97, 98, 40, 6.4], [109, 96, 28, 5], [118, 99, 34, 5.6], [62, 100, 22, 4]]
  const mid = [[-2, 112, 62, 10], [14, 114, 48, 8], [102, 113, 56, 9.4], [120, 116, 70, 11]]
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#ghoSky)"/>
      {/* thin streaks of lit cloud low in the afterglow */}
      <g filter="url(#ghoSoft)">
        <ellipse cx="34" cy="70" rx="26" ry="1.8" fill="#F6C49A" opacity={0.55 * glow}/>
        <ellipse cx="94" cy="76" rx="22" ry="1.5" fill="#F2B48C" opacity={0.5 * glow}/>
        <ellipse cx="70" cy="62" rx="16" ry="1.2" fill="#E4A894" opacity="0.35"/>
      </g>
      <circle cx="98" cy="20" r="0.6" fill="#FFF6E0" opacity="0.9"/>
      <circle cx="98" cy="20" r="1.8" fill="#FFF6E0" opacity="0.15" filter="url(#ghoBlur)"/>
      {/* far ridge of spruce spires, hazy in the twilight */}
      <path d="M 0 96 C 30 94 60 95 90 93.6 C 104 93 112 94 120 93.4 L 120 130 L 0 130 Z" fill="#4E4A62"/>
      <g fill="#4E4A62" filter="url(#ghoBlur)">{far.map(([x, b, h, w], i) => <path key={i} d={spire(x, b, h, w, i + 3)}/>)}</g>
      <rect x="0" y="84" width="120" height="24" fill="url(#ghoHaze)"/>
      {/* nearer spruces, darker and sharper */}
      <g fill="#262434" filter="url(#ghoHair)">{mid.map(([x, b, h, w], i) => <path key={i} d={spire(x, b, h, w, i + 20)}/>)}</g>
      <path d="M 0 118 L 120 116 L 120 130 L 0 130 Z" fill="#1E1C2A"/>
      <g fill="#1E1C2A" filter="url(#ghoHair)">{Array.from({ length: 15 }, (_, i) => <path key={i} d={spire(-4 + i * 9, 134, 28 + (i * 37 % 17), 6 + (i % 3), i + 70)}/>)}</g>
    </g>
  )
}

function ConiferBranch({ glow }) {
  const r = rng(57)
  const sprays = []
  for (let i = 0; i < 18; i++) {
    const x = 4 + i * 5.8 + (r() - 0.5) * 3, y = 104.8 - i * 0.28 + r() * 1.6
    sprays.push(...spray(`a${i}`, x, y, 70 + r() * 60, 7 + r() * 6, r, i % 3 ? '#1E2A22' : '#2E3C2C'))
  }
  for (let i = 0; i < 9; i++) {
    const x = 6 + i * 11 + r() * 5, y = 101.6 - i * 0.3
    sprays.push(...spray(`b${i}`, x, y, -150 + r() * 120, 5 + r() * 4, r, '#3E4A34', 0.9))
  }
  return (
    <g>
      {/* the conifer branch the owl sits on, with drooping sprays */}
      <g filter="url(#ghoTex)">
        <path d="M -2 106.2 C 30 104.6 66 102.6 122 99.4 L 122 103.4 C 70 105.6 34 107.6 -2 109.2 Z" fill="url(#ghoBranch)"/>
      </g>
      <path d="M -2 106.3 C 30 104.7 66 102.7 122 99.5" stroke="#B08868" strokeWidth="0.5" fill="none" opacity={0.6 * glow}/>
      <g filter="url(#ghoHair)">{sprays}</g>
    </g>
  )
}

function DuskSky({ glow }) {
  const r = rng(61)
  const sprays = []
  for (let i = 0; i < 14; i++) sprays.push(...spray(`c${i}`, 104 + r() * 18, -2 + i * 2.6, 150 + r() * 50, 8 + r() * 6, r, '#1A2018'))
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#ghoSkyF)"/>
      <g filter="url(#ghoSoft)">
        <ellipse cx="30" cy="102" rx="30" ry="2.2" fill="#F4BE96" opacity={0.6 * glow}/>
        <ellipse cx="92" cy="110" rx="26" ry="1.8" fill="#EFAE88" opacity={0.5 * glow}/>
      </g>
      <circle cx="22" cy="18" r="0.6" fill="#FFF6E0" opacity="0.9"/>
      <g fill="#24222E" filter="url(#ghoHair)">
        {[[-2, 136, 34, 6], [10, 134, 24, 5], [24, 136, 30, 5.4], [86, 135, 26, 5], [100, 137, 38, 6.6], [114, 134, 30, 5.4]].map(([x, b, h, w], i) => <path key={i} d={spire(x, b, h, w, i + 40)}/>)}
      </g>
      <g filter="url(#ghoBlur)">{sprays}</g>
    </g>
  )
}

export default function GreatHornedOwl({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const glow = animated ? [1, 0.97, 0.94, 0.9, 0.86, 0.84, 0.86, 0.9, 0.94, 0.97, 1, 1][frame] : 1
  const drift = animated ? [0, -0.3, -0.6, -0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8, 0.6, 0.3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Great Horned Owl">
      <defs>
        <linearGradient id="ghoSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A4670"/><stop offset="32%" stopColor="#6C6A90"/><stop offset="58%" stopColor="#B88A92"/><stop offset="76%" stopColor="#E8A882"/><stop offset="100%" stopColor="#F2C690"/></linearGradient>
        <linearGradient id="ghoSkyF" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stopColor="#2E3A62"/><stop offset="45%" stopColor="#5E6290"/><stop offset="80%" stopColor="#C49092"/><stop offset="100%" stopColor="#ECB088"/></linearGradient>
        <linearGradient id="ghoHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8949A" stopOpacity="0"/><stop offset="45%" stopColor="#C8949A" stopOpacity="0.45"/><stop offset="100%" stopColor="#4E4A62" stopOpacity="0"/></linearGradient>
        <linearGradient id="ghoBranch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6A5444"/><stop offset="100%" stopColor="#2A201A"/></linearGradient>
        <linearGradient id="ghoBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7A5E42"/><stop offset="30%" stopColor="#B8A07C"/><stop offset="60%" stopColor="#C4B194"/><stop offset="100%" stopColor="#A6947A"/></linearGradient>
        <linearGradient id="ghoBodyU" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A8946E"/><stop offset="50%" stopColor="#C6B28E"/><stop offset="100%" stopColor="#9C8664"/></linearGradient>
        <linearGradient id="ghoHeadU" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7A5C40"/><stop offset="100%" stopColor="#4A3422"/></linearGradient>
        <linearGradient id="ghoWingL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5A4230"/><stop offset="100%" stopColor="#3A2A1C"/></linearGradient>
        <linearGradient id="ghoWingR" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7A5A3C"/><stop offset="100%" stopColor="#4A3424"/></linearGradient>
        <linearGradient id="ghoTuft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1E140C"/><stop offset="100%" stopColor="#4E3826"/></linearGradient>
        <radialGradient id="ghoDisc" cx="0.5" cy="0.45" r="0.6"><stop offset="0%" stopColor="#CFA27A"/><stop offset="55%" stopColor="#B8774A"/><stop offset="100%" stopColor="#8E5632"/></radialGradient>
        <radialGradient id="ghoIris" cx="0.45" cy="0.55" r="0.6"><stop offset="0%" stopColor="#FFD24A"/><stop offset="70%" stopColor="#F0A818"/><stop offset="100%" stopColor="#B87808"/></radialGradient>
        <linearGradient id="ghoBill" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6A6E78"/><stop offset="100%" stopColor="#24262C"/></linearGradient>
        <linearGradient id="ghoRemiges" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D6C6A8"/><stop offset="100%" stopColor="#B8A688"/></linearGradient>
        <linearGradient id="ghoCoverts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E2D0AE"/><stop offset="100%" stopColor="#CDB894"/></linearGradient>
        <clipPath id="ghoFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="ghoOwlClip"><path d={OWL_D}/></clipPath>
        <clipPath id="ghoWingLClip"><path d={WING_L}/></clipPath>
        <clipPath id="ghoWingRClip"><path d={WING_R}/></clipPath>
        <clipPath id="ghoDiscClip"><path d={DISC_D}/></clipPath>
        <clipPath id="ghoBellyClip"><path d="M 50.6 46 C 50.4 41 54 38.6 60 38.6 C 66 38.6 69.6 41 69.4 46 L 68.8 60 C 68.2 66.6 64.4 70.6 60 71 C 55.6 70.6 51.8 66.6 51.2 60 Z"/></clipPath>
        <filter id="ghoSoft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="ghoHair" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.2"/></filter>
        <filter id="ghoBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="ghoGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.4"/></filter>
        <filter id="ghoBar" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.42"/></filter>
        <filter id="ghoSoftB" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.25"/></filter>
        <filter id="ghoTexL" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2 0.55" numOctaves="2" seed="3" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.24  0 0 0 0 0.18  0.45 0 0 0 -0.2" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="ghoTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="7" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.02  0 0 0 0 0  1.2 0 0 0 -0.45" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#ghoFrame)">
        {pose === 'fly' ? (
          <>
            {scene && <DuskSky glow={glow}/>}
            <g transform={`translate(0,${drift}) rotate(${drift * 1.2} 60 60)`}><Flying blink={blink}/></g>
          </>
        ) : (
          <>
            {scene && <DuskConifers glow={glow}/>}
            <Tail/>
            {scene ? <ConiferBranch glow={glow}/> : (
              <path d="M 30 104.4 C 48 103.4 72 102.2 90 101.4" stroke="#4A3A2E" strokeWidth="4.4" fill="none" strokeLinecap="round"/>
            )}
            <Perched blink={blink} glow={glow}/>
          </>
        )}
      </g>
    </svg>
  )
}
