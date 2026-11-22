// Belted Kingfisher (adult FEMALE — she wears the extra rusty belly band) — naturalistic pass.
//
// Technique follows BaldEagle.jsx: no outlined feathers; form from silhouette + gradient light +
// fine feTurbulence grain clipped to the plumage; feather detail only as soft low-contrast tips.
// Proportions kept true: big blocky head with a ragged, double-pointed shaggy crest; long, heavy,
// straight dagger bill (about as long as the head); white collar right round the neck; slate-blue
// breast band; female's rusty belly band and flanks; short tail; tiny feet.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'belted_kingfisher', poses: ['perch', 'plunge'] }

const D = Math.PI / 180
function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const lerp = (a, b, t) => a + (b - a) * t

// A single feather blade from (x,y) pointing along angle a (degrees), length l, width w.
function featherPath(x, y, a, l, w, tip = 'point') {
  const c = Math.cos(a * D), s = Math.sin(a * D)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  if (tip === 'round') return `M ${P(0, -w / 2)} L ${P(l * 0.8, -w / 2)} C ${P(l * 0.97, -w / 2)} ${P(l * 1.02, -w * 0.2)} ${P(l, 0)} C ${P(l * 1.02, w * 0.2)} ${P(l * 0.97, w / 2)} ${P(l * 0.8, w / 2)} L ${P(0, w / 2)} Z`
  return `M ${P(0, -w * 0.42)} L ${P(l * 0.66, -w * 0.45)} C ${P(l * 0.88, -w * 0.42)} ${P(l * 0.98, -w * 0.18)} ${P(l, 0)} C ${P(l * 0.95, w * 0.32)} ${P(l * 0.82, w * 0.55)} ${P(l * 0.6, w * 0.55)} L ${P(0, w * 0.55)} Z`
}
const tone = (hex, k) => {
  const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v * k)))
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('')
}

// ── Perched, side view facing left, on a branch over the stream ───────────────
const HEAD = 'M 45.6 40.4 C 46.4 35.6 49.6 32.2 54.4 31 C 58 30.2 61.6 28.6 64 26.4 C 65.6 25 67 24 68.8 23.2 C 68.4 24.6 68 25.8 67.6 26.8 C 69 26.6 70.4 26.8 71.6 27.4 C 70.8 28.2 70.2 29 69.8 29.8 C 71.6 30.6 73.4 31.6 75.2 32.8 C 73.6 33.6 72 34.2 70.6 34.6 C 71.4 35.6 72.2 36.8 72.6 38 C 71.4 38.2 70.2 38.4 69 38.6 C 69.2 42 68.8 45.4 67.8 48 C 63.6 49.8 58 50.2 53 49.5 C 50 49.1 48 48.2 46.6 47 Z'
const BODY = 'M 47 48.6 C 44.4 54 43.6 61 45.3 68 C 47.3 76.4 52 84 58.4 89 L 63 91 L 71 90.4 C 74.6 84 77 74 76.6 64 C 76.2 57 73 51 68 47.6 C 62 50 53 50 47 48.6 Z'
const WING = 'M 64 51.6 C 69.6 49.4 75 52.4 77 59.4 C 79 67 79.2 78 77.8 88 C 77.3 92 76.6 95.4 75.6 98.6 C 73 94.6 70.2 88.6 67.8 82.4 C 65.2 75.6 63.4 67.4 63.4 59.4 C 63.4 55.6 63.6 53.4 64 51.6 Z'

function Perched({ blink, ruffle }) {
  const r = rng(17)
  const wingTips = [], bodyTips = [], spots = []
  for (let row = 0; row < 9; row++) for (let i = 0; i < 4; i++) {
    const x = 65 + i * 3.1 + row * 0.35 + (r() - 0.5), y = 56 + row * 3.6 + i * 0.7 + (r() - 0.5)
    wingTips.push(<path key={`w${row}${i}`} d={`M ${x - 1.4} ${y} q 1.4 1.6 2.8 0`} stroke="#9DB6CF" strokeWidth="0.5" fill="none" opacity={0.3 + r() * 0.15}/>)
    if (row > 1 && row < 8 && r() > 0.35) spots.push(<circle key={`s${row}${i}`} cx={x + 0.4} cy={y + 1.1} r={0.36 + r() * 0.18} fill="#E9F0F5" opacity={0.55 + r() * 0.25}/>)
  }
  for (let row = 0; row < 7; row++) for (let i = 0; i < 6; i++) {
    const x = 46 + i * 4.4 + (row % 2) * 2.2 + (r() - 0.5), y = 52 + row * 5.4 + (r() - 0.5)
    bodyTips.push(<path key={`b${row}${i}`} d={`M ${x - 1.6} ${y} q 1.6 1.8 3.2 0`} stroke="#8F9CA8" strokeWidth="0.45" fill="none" opacity={0.18 + r() * 0.1}/>)
  }
  const crestStrands = [[57, 31.4, 67.6, 24.4], [59.4, 32.6, 70.6, 27.8], [61.4, 34, 73.8, 32.6], [63, 35.8, 71.6, 37.4], [64.4, 38, 69.6, 41]]
  return (
    <g>
      {/* short tail with fine white barring, hanging below the perch */}
      <g filter="url(#bkiTex)">
        <path d="M 66.4 87.6 L 74.4 87.6 C 76.4 95 77.6 102 77.8 108.8 C 75.4 110.4 72.4 110.4 70.4 109.2 C 69.6 102 68.4 94.6 66.4 87.6 Z" fill="url(#bkiTail)"/>
      </g>
      {[95, 99, 103, 106.6].flatMap((y, k) => [0, 1, 2].map(j => <ellipse key={`${k}${j}`} cx={69.6 + k * 0.5 + j * 2.4} cy={y - j * 0.3} rx="0.7" ry="0.38" fill="#DCE6EE" opacity="0.4"/>))}
      <path d="M 72.6 89 L 74 108.6" stroke="#22344A" strokeWidth="0.35" opacity="0.6"/>

      <g filter="url(#bkiTex)">
        {/* white underparts with slate breast band, rusty belly band + flanks (female) */}
      </g>
      <g filter="url(#bkiTexL)">
        <path d={BODY} fill="url(#bkiWhite)"/>
        <g clipPath="url(#bkiBodyClip)">
          <path d="M 40 55.6 C 50 58.6 62 58 80 52.6 L 80 61.4 C 62 66.6 50 67 40 64.4 Z" fill="url(#bkiBand)"/>
          <path d="M 40 64 C 50 66.6 62 66.2 80 61 L 80 62.2 C 62 67.4 50 67.8 40 65.2 Z" fill="#E9EEF0" opacity="0.5"/>
          <path d="M 40 71 C 52 74.6 64 73.6 80 68.4 L 80 79 C 66 83.4 52 83.6 40 80 Z" fill="url(#bkiRust)"/>
          <path d="M 66 66 C 72 70 76 76 78 84 L 82 84 L 82 62 Z" fill="url(#bkiRust)"/>
          {bodyTips}
          {/* turn of the body: shade toward the back and under the belly */}
          <path d="M 62 52 C 70 60 72 76 66 90 L 82 92 L 82 48 Z" fill="#1A2632" opacity="0.18" filter="url(#bkiBlur2)"/>
          <path d="M 46 78 C 52 88 60 92 70 92 L 70 96 L 44 96 Z" fill="#4A5A66" opacity="0.25" filter="url(#bkiBlur2)"/>
        </g>
      </g>
      <g filter="url(#bkiTex)">
        {/* folded wing */}
        <path d={WING} fill="url(#bkiWing)"/>
        <g clipPath="url(#bkiWingClip)">
          {wingTips}{spots}
          <path d="M 70 80 L 75.6 98 M 72.4 78 L 76.6 95 M 74.6 76 L 77.4 91" stroke="#121C28" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 63.6 54 C 63.6 66 66 78 71.6 90" stroke="#0C141E" strokeWidth="1.6" fill="none" opacity="0.35" filter="url(#bkiBlur)"/>
        </g>
        {/* head with ragged double-pointed crest */}
        <g transform={`rotate(${ruffle} 66 34)`}>
          <path d={HEAD} fill="url(#bkiHead)"/>
          <g clipPath="url(#bkiHeadClip)">{crestStrands.map(([x1, y1, x2, y2], i) => <path key={i} d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 1.2} ${x2} ${y2}`} stroke={i % 2 ? '#7E9BBA' : '#22344A'} strokeWidth="0.45" fill="none" opacity="0.4"/>)}</g>
        </g>
      </g>
      {/* soft light on crown, shade under the cheek */}
      <path d="M 49 34.6 C 53 32 59 31.4 63 31.6" stroke="#A9C1D8" strokeWidth="1.6" fill="none" opacity="0.35" filter="url(#bkiBlur)" strokeLinecap="round"/>
      <path d="M 50 47.6 C 56 49 62 48.8 67 47.2" stroke="#1C2A3A" strokeWidth="1.4" fill="none" opacity="0.4" filter="url(#bkiBlur)"/>
      {/* white loral spot */}
      <ellipse cx="48.6" cy="38.6" rx="1.35" ry="0.95" fill="#F4F6F4" opacity="0.92" transform="rotate(-20 48.6 38.6)"/>
      {/* brow shade + small eye with catch-light */}
      <path d="M 49.6 38.4 C 51.4 37.2 54.2 37.3 55.6 38.6 C 53.6 38.2 51.4 38.4 49.8 39.2 Z" fill="#253850" opacity="0.8"/>
      {blink
        ? <path d="M 50.8 40.3 q 1.6 0.8 3.2 0" stroke="#152030" strokeWidth="0.7" fill="none"/>
        : <g>
            <ellipse cx="52.4" cy="40.4" rx="1.6" ry="1.5" fill="#1E140D"/>
            <circle cx="52.5" cy="40.5" r="0.85" fill="#060403"/>
            <circle cx="52" cy="39.85" r="0.32" fill="#FFF"/>
          </g>}
      {/* long heavy dagger bill, angled slightly down */}
      <path d="M 46 39.8 C 40 41.4 30 45.4 18.6 51.6 L 19.4 51.8 C 30 48.6 39 47 46.8 46.4 Z" fill="url(#bkiBillU)"/>
      <path d="M 46.8 46.4 C 39 47 30 48.6 19.4 51.8 C 28.6 51.6 38.6 50.6 47.6 49.2 Z" fill="url(#bkiBillL)"/>
      <path d="M 45.6 40.6 C 39.4 42.4 30.6 46 21.6 50.4" stroke="#7C848C" strokeWidth="0.45" fill="none" opacity="0.8" strokeLinecap="round"/>
      <path d="M 46.8 46.4 C 39 47 30 48.6 19.4 51.8" stroke="#0A0B0C" strokeWidth="0.4" fill="none"/>
      <ellipse cx="43.2" cy="42.6" rx="1" ry="0.35" fill="#0A0B0C" transform="rotate(-14 43.2 42.6)"/>
      {/* tiny dark feet gripping the branch */}
      <path d="M 61.4 90.6 c -1.4 0.3 -2.4 1 -2.8 2 M 63.2 90.8 c -0.8 0.6 -1.2 1.4 -1.2 2.4 M 67.8 90.2 c -1.2 0.3 -2 1 -2.4 2 M 69.4 90.2 c -0.6 0.6 -0.9 1.4 -0.9 2.3" stroke="#3B3F44" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
  )
}

// ── Plunge: bird drawn horizontal facing left (bill tip at 0,0, back toward -y), then pitched
// steeply nose-down. Wings swept back and half-folded with every flight feather separate.
function DiveWing({ S, W, H, far, aO = -10, aI = 8, lO = 26, lI = 16 }) {
  const r = rng(far ? 5 : 9)
  const prims = [], secs = []
  const nP = 9, nS = 7
  for (let i = 0; i < nP; i++) {
    const t = i / (nP - 1)
    const x = lerp(H[0], W[0], t), y = lerp(H[1], W[1], t)
    const a = lerp(aO, aI, t), l = lerp(lO, lI, Math.pow(t, 0.8)), k = 0.9 + r() * 0.2
    prims.push({ x, y, a, l, k })
  }
  for (let i = 0; i < nS; i++) {
    const t = (i + 0.6) / nS
    secs.push({ x: lerp(W[0], S[0], t), y: lerp(W[1], S[1], t), a: lerp(aI + 8, aI + 30, t), l: lerp(15, 10, t), k: 0.9 + r() * 0.2 })
  }
  const edge = [...prims, ...secs].map(f => [f.x + Math.cos(f.a * D) * f.l * 0.3, f.y + Math.sin(f.a * D) * f.l * 0.3])
  const cov = `M ${S[0]} ${S[1]} Q ${(S[0] + W[0]) / 2 - 3} ${(S[1] + W[1]) / 2 - 2} ${W[0]} ${W[1]} L ${H[0]} ${H[1]} ${edge.map(p => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')} Z`
  const dark = far ? '#1C2532' : '#2A3646'
  return (
    <g>
      {secs.slice().reverse().map((f, i) => <path key={`s${i}`} d={featherPath(f.x, f.y, f.a, f.l, 3.6, 'round')} fill={tone(far ? '#2D425A' : '#38526E', f.k)}/>)}
      {secs.map((f, i) => <path key={`sb${i}`} d={`M ${f.x + Math.cos(f.a * D) * f.l * 0.72} ${f.y + Math.sin(f.a * D) * f.l * 0.72} l ${Math.cos(f.a * D) * 1.2} ${Math.sin(f.a * D) * 1.2}`} stroke="#E4ECF2" strokeWidth="0.55" opacity="0.3" strokeLinecap="round"/>)}
      {prims.map((f, i) => <g key={`p${i}`}>
        <path d={featherPath(f.x, f.y, f.a, f.l, 4.2)} fill={tone(dark, 0.8 + (i % 2) * 0.35 + (f.k - 1))}/>
        <path d={`M ${f.x} ${f.y} l ${Math.cos(f.a * D) * f.l * 0.93} ${Math.sin(f.a * D) * f.l * 0.93}`} stroke="#8496AA" strokeWidth="0.3" opacity="0.35"/>
        {i > 1 && <path d={featherPath(f.x, f.y, f.a, f.l * 0.4, 3.6, 'round')} fill={far ? '#8E9AA4' : '#C3CDD5'} opacity="0.8"/>}
      </g>)}
      <path d={cov} fill={far ? 'url(#bkiWingFar)' : 'url(#bkiWing)'}/>
      {edge.filter((_, i) => i % 2 === 0).map(([x, y], i) => <circle key={`c${i}`} cx={x - 1.4} cy={y - 0.8} r="0.4" fill="#E9F0F5" opacity="0.5"/>)}
    </g>
  )
}

function Diver() {
  return (
    <g>
      <g filter="url(#bkiTex)">
        <DiveWing far S={[54, -6]} W={[62, -19]} H={[70, -25]} aO={-20} aI={2} lO={23} lI={14}/>
        {/* closed tail */}
        <path d="M 80 -3.4 L 95 -2.6 C 96 -0.8 96 0.6 95 1.8 L 80 3.4 Z" fill="url(#bkiTail)"/>
        {/* body: white underside, bands, blue back */}
        <path d="M 44 -7.6 C 54 -10 68 -9 80 -4.4 L 84 -1.2 L 84 2.8 C 72 8.6 58 10.4 46 8.4 C 42 4 42 -3 44 -7.6 Z" fill="url(#bkiWhiteDive)"/>
        <g clipPath="url(#bkiDiveClip)">
          <path d="M 49 -12 L 56.6 -12 L 55.6 12 L 48 12 Z" fill="url(#bkiBand)"/>
          <path d="M 60.4 -12 L 67.6 -12 L 66.6 12 L 59.4 12 Z" fill="url(#bkiRust)"/>
          <path d="M 66 4.6 C 71 3.6 76 2 82 0 L 84 4 L 66 8 Z" fill="url(#bkiRust)" opacity="0.75"/>
          <path d="M 44 -12 L 88 -12 L 88 -2.6 C 72 -1.6 58 -1.4 44 -2.4 Z" fill="url(#bkiWing)"/>
          <path d="M 44 6 C 58 8.6 72 6 86 1 L 86 12 L 44 12 Z" fill="#43505C" opacity="0.25" filter="url(#bkiBlur2)"/>
        </g>
        {/* white collar */}
        <path d="M 43 -8.6 C 45.6 -9.4 48.4 -9.4 49.6 -8.8 C 49 -3 49 3 49.6 8.4 C 47.6 9 45 8.8 43 8 Z" fill="url(#bkiWhiteDive)"/>
        {/* head, crest pressed flat by the airflow into ragged trailing points */}
        <path d="M 24.6 -4.4 C 26.6 -9 31.6 -11.4 37.6 -11.4 C 41 -11.4 43.6 -11.6 46.6 -12.4 L 50.8 -12 L 47.6 -10.4 L 53.6 -9.6 L 48.4 -8 L 52.4 -6 L 47.6 -5.6 C 47.6 -3 47 -0.8 45.8 1.4 C 40 2.6 32 2.6 26.4 2.2 Z" fill="url(#bkiHead)"/>
        <path d="M 27 3 C 31 6.6 38 7.4 44.4 6.2 C 46.6 4.6 47.6 2.4 47.6 0.6 C 41 2 33 2.4 27 2.2 Z" fill="url(#bkiWhiteDive)"/>
      </g>
      <path d="M 40 -10.6 L 50 -10.8 M 41 -8.8 L 51 -8.4 M 42 -6.8 L 50 -6" stroke="#7E9BBA" strokeWidth="0.4" opacity="0.45"/>
      <path d="M 28 -8 C 32 -10.4 38 -11 42 -10.6" stroke="#A9C1D8" strokeWidth="1.4" fill="none" opacity="0.35" filter="url(#bkiBlur)" strokeLinecap="round"/>
      <ellipse cx="28.6" cy="-5.2" rx="1.2" ry="0.85" fill="#F4F6F4" opacity="0.9"/>
      <ellipse cx="32.4" cy="-4.6" rx="1.5" ry="1.25" fill="#1E140D"/>
      <circle cx="32.3" cy="-4.6" r="0.75" fill="#060403"/>
      <circle cx="31.9" cy="-5.1" r="0.28" fill="#FFF"/>
      {/* bill leading, straight as the body */}
      <path d="M 0 0 C 8 -1.4 16 -3 25.4 -4.6 L 26 0.2 C 17 0.4 8 0.3 0 0 Z" fill="url(#bkiBillU)"/>
      <path d="M 0 0 C 8 0.6 17 1.6 26.4 3 L 26 0.2 Z" fill="url(#bkiBillL)"/>
      <path d="M 2.6 -0.5 C 10 -1.7 17 -3 24.6 -4.2" stroke="#7C848C" strokeWidth="0.4" fill="none" opacity="0.75"/>
      <g filter="url(#bkiTex)"><DiveWing S={[50, -3.6]} W={[57, -18]} H={[63.6, -25.6]} aO={-32} aI={-2} lO={24} lI={14}/></g>
    </g>
  )
}

// ── Habitat: wooded stream bank, slightly out of focus, with a moving stream ────────
function Bank({ horizon }) {
  const r = rng(31)
  const blobs = []
  for (let i = 0; i < 260; i++) {
    const t = r(), y = lerp(2, horizon + 1, Math.pow(t, 0.6)), x = r() * 132 - 6
    const g = ['#5B7550', '#4A6443', '#6C8A5C', '#3C5438', '#7F9A68', '#566E4A', '#6E7F4A'][Math.floor(r() * 7)]
    const rx = 1.6 + r() * 3.6
    blobs.push(<ellipse key={i} cx={x} cy={y} rx={rx} ry={rx * (0.6 + r() * 0.5)} transform={`rotate(${(r() - 0.5) * 60} ${x} ${y})`} fill={y < 26 && r() > 0.5 ? '#8EA77A' : g} opacity={0.6 + r() * 0.35}/>)
  }
  const trunks = [[14, 0.9], [37, 0.6], [92, 1.1], [108, 0.7]].map(([x, w], i) => <path key={i} d={`M ${x} ${horizon + 2} C ${x - 1} ${horizon - 20} ${x + 1.4} ${horizon - 40} ${x + 0.5} 0`} stroke="#5E5446" strokeWidth={w * 2.2} fill="none" opacity="0.6"/>)
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#bkiSky)"/>
      <g filter="url(#bkiDof)">{trunks}{blobs}</g>
      <g filter="url(#bkiBlur)">
        <path d={`M -2 ${horizon - 0.6} C 8 ${horizon - 3.4} 16 ${horizon + 0.4} 26 ${horizon - 1.2} C 34 ${horizon - 2.6} 40 ${horizon + 1} 52 ${horizon} C 62 ${horizon - 1} 70 ${horizon - 4} 80 ${horizon - 1.4} C 90 ${horizon + 0.6} 100 ${horizon - 2.6} 110 ${horizon - 0.4} C 114 ${horizon - 1.4} 118 ${horizon - 1} 122 ${horizon - 0.4} L 122 ${horizon + 2.2} L -2 ${horizon + 2.2} Z`} fill="#4A4536" opacity="0.85"/>
        <path d={`M -2 ${horizon + 1.6} C 30 ${horizon + 1} 70 ${horizon + 2.4} 122 ${horizon + 1.4}`} stroke="#8C8268" strokeWidth="0.8" fill="none" opacity="0.5"/>
      </g>
      {/* stream: reflects the bank, broken by flow */}
      <rect x="0" y={horizon + 1.8} width="120" height={130 - horizon} fill="url(#bkiWater)"/>
      <g clipPath="url(#bkiWaterClip)" opacity="0.45">
        <g transform={`translate(0 ${2 * horizon + 3.6}) scale(1 -1)`} filter="url(#bkiSmear)">{blobs.slice(60)}</g>
      </g>
      {Array.from({ length: 16 }, (_, i) => {
        const y = horizon + 4 + i * ((126 - horizon) / 16) + r() * 2, x = r() * 110, w = 6 + r() * 20 * (1 + i / 12)
        return <path key={i} d={`M ${x} ${y} q ${w / 2} ${-0.4 - r() * 0.4} ${w} 0`} stroke="#DCE9EC" strokeWidth={0.25 + i * 0.025} fill="none" opacity={0.14 + r() * 0.2} strokeLinecap="round"/>
      })}
    </g>
  )
}

function Branch() {
  return (
    <g>
      {/* alder branch crossing the frame; a side twig with a few leaves */}
      <path d="M 104 85 C 108 78 112 74 118 71" stroke="url(#bkiBark)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 112 76 C 114 73 117 72 119 72.4 C 117.6 74.4 115 75.8 112 76 Z" fill="#6C8C46"/>
      <path d="M 108 79.6 C 108.4 76 111 74.4 113.4 74.6 C 112.6 77 110.6 79 108 79.6 Z" fill="#5E7E3E"/>
      <path d="M 116 71.6 C 117 69 119.4 68 121 68.6 C 120.4 70.6 118.6 71.8 116 71.6 Z" fill="#7A984E"/>
      <path d="M -4 99.4 C 30 96.4 70 91.6 124 81.4 L 124 87.4 C 70 96.4 30 101 -4 103 Z" fill="url(#bkiBark)"/>
      <path d="M -4 99.6 C 30 96.6 70 91.8 124 81.6" stroke="#B6A58E" strokeWidth="0.6" fill="none" opacity="0.6"/>
      <path d="M 8 100.6 l 7 -0.6 M 26 99.6 l 5 -0.4 M 44 97 l 9 -1 M 82 92.4 l 7 -1.2 M 96 89.4 l 9 -1.6" stroke="#3E3226" strokeWidth="0.5" opacity="0.7"/>
      <ellipse cx="88" cy="90.6" rx="1.6" ry="1" fill="#4A3C2E"/>
    </g>
  )
}

export default function BeltedKingfisher({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 380); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 8
  const ruffle = animated ? [0, 0, -1, -2, -1, 0, 0, 0, 0, 1, 0, 0][frame] : 0
  const drop = animated ? (frame % 6) * 0.25 : 0

  let content
  if (pose === 'plunge') {
    const W = 113
    content = (
      <>
        {scene && <Bank horizon={62}/>}
        {/* faint reflection of the diving bird in the water directly beneath it */}
        {scene && (
          <g clipPath="url(#bkiBelow)" opacity="0.28">
            <g transform={`translate(0 ${2 * W}) scale(1 -1)`} filter="url(#bkiSmear)">
              <g transform={`translate(45 ${W - 1.2 - drop}) rotate(-72)`}><Diver/></g>
            </g>
          </g>
        )}
        {/* splash: the bill tip just breaking the surface */}
        <ellipse cx="45" cy={W + 0.6} rx="4.6" ry="1.1" fill="#1F3A44" opacity={scene ? 0.5 : 0.25}/>
        <ellipse cx="45" cy={W + 0.4} rx="7.4" ry="1.6" fill="none" stroke="#E6F2F4" strokeWidth="0.45" opacity="0.7"/>
        <ellipse cx="45" cy={W + 0.5} rx="12.5" ry="2.6" fill="none" stroke="#E6F2F4" strokeWidth="0.3" opacity="0.3"/>
        <g transform={`translate(45 ${W - 1.2 - drop}) rotate(-72)`}><Diver/></g>
        <path d={`M 40.6 ${W} C 39.6 ${W - 2.6} 38.4 ${W - 3.4} 37 ${W - 3} M 49.4 ${W} C 50.4 ${W - 2.4} 51.6 ${W - 3.2} 53 ${W - 2.6}`} stroke="#EEF6F8" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.85"/>
        {[[36.4, W - 4.4, 0.55], [38.8, W - 5.6, 0.45], [52.4, W - 4.6, 0.5], [54.6, W - 3.4, 0.4], [50.6, W - 6, 0.35]].map(([x, y, rr], i) => <circle key={i} cx={x} cy={y} r={rr} fill="#EEF6F8" opacity="0.85"/>)}
      </>
    )
  } else {
    content = (
      <>
        {scene ? <><Bank horizon={78}/><Branch/></>
               : <path d="M 42 97.4 C 56 95.6 72 93.2 90 89.8" stroke="url(#bkiBark)" strokeWidth="4" fill="none" strokeLinecap="round"/>}
        <Perched blink={blink} ruffle={ruffle}/>
      </>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Belted Kingfisher">
      <defs>
        <linearGradient id="bkiSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C4D6DE"/><stop offset="100%" stopColor="#E4E9DF"/></linearGradient>
        <linearGradient id="bkiWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6D8478"/><stop offset="35%" stopColor="#4F6B6C"/><stop offset="100%" stopColor="#2C4650"/></linearGradient>
        <linearGradient id="bkiHead" x1="0.1" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#7392B4"/><stop offset="55%" stopColor="#4B6A8C"/><stop offset="100%" stopColor="#2F4762"/></linearGradient>
        <linearGradient id="bkiWing" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stopColor="#5D7DA0"/><stop offset="55%" stopColor="#3F5A7A"/><stop offset="100%" stopColor="#24354A"/></linearGradient>
        <linearGradient id="bkiWingFar" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stopColor="#4A6684"/><stop offset="100%" stopColor="#23334A"/></linearGradient>
        <linearGradient id="bkiTail" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3F5A7A"/><stop offset="100%" stopColor="#22324A"/></linearGradient>
        <linearGradient id="bkiBand" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6684A6"/><stop offset="100%" stopColor="#3C5676"/></linearGradient>
        <linearGradient id="bkiRust" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C4703A"/><stop offset="100%" stopColor="#8E4520"/></linearGradient>
        <radialGradient id="bkiWhite" cx="0.3" cy="0.3" r="0.9"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#ECEFEE"/><stop offset="100%" stopColor="#C6CDD2"/></radialGradient>
        <linearGradient id="bkiWhiteDive" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#CBD2D6"/></linearGradient>
        <linearGradient id="bkiBillU" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3E42"/><stop offset="100%" stopColor="#121314"/></linearGradient>
        <linearGradient id="bkiBillL" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#8E969C"/><stop offset="45%" stopColor="#3A3E42"/><stop offset="100%" stopColor="#161718"/></linearGradient>
        <linearGradient id="bkiBark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8F8170"/><stop offset="50%" stopColor="#6A5B4A"/><stop offset="100%" stopColor="#43372A"/></linearGradient>
        <clipPath id="bkiHeadClip"><path d={HEAD}/></clipPath>
        <clipPath id="bkiBodyClip"><path d={BODY}/></clipPath>
        <clipPath id="bkiWingClip"><path d={WING}/></clipPath>
        <clipPath id="bkiDiveClip"><path d="M 44 -7.6 C 54 -10 68 -9 80 -4.4 L 84 -1.2 L 84 2.8 C 72 8.6 58 10.4 46 8.4 C 42 4 42 -3 44 -7.6 Z"/></clipPath>
        <clipPath id="bkiWaterClip"><rect x="0" y="60" width="120" height="70"/></clipPath>
        <clipPath id="bkiBelow"><rect x="0" y="113.6" width="120" height="20"/></clipPath>
        <clipPath id="bkiFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="bkiBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="bkiBlur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="bkiDof" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.7"/></filter>
        <filter id="bkiSmear" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.4 0.7"/></filter>
        <filter id="bkiTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.4" numOctaves="2" seed="7" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.3 0 0 0 -0.5" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="bkiTexL" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="3" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.35  0 0 0 0 0.4  0.9 0 0 0 -0.44" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#bkiFrame)">{content}</g>
    </svg>
  )
}
