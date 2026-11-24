// Canada Goose (adult) — naturalistic pass (technique of BaldEagle.jsx / AmericanBlackDuck.jsx).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to
// the plumage; feather detail only as soft, low-contrast pale fringes (the goose's barred back).
// True goose shape: long heavy body, long slender black neck, small flat-crowned head, wedge-shaped
// black bill with nail, white chinstrap from throat to behind the eye, pale buff breast meeting the
// black neck in a clean line, brown barred upperparts, black tail with white undertail and the white
// "U" of the uppertail coverts; black legs. Flight: long straight neck, broad wings, blackish
// primaries and secondaries, brown coverts with pale fringes.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'canada_goose', poses: ['graze'] }

const D = Math.PI / 180
function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const lerp = (a, b, t) => a + (b - a) * t
const tone = (hex, k) => {
  const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v * k)))
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('')
}
function featherPath(x, y, a, l, w, tip = 'point') {
  const c = Math.cos(a * D), s = Math.sin(a * D)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  if (tip === 'round') return `M ${P(0, -w / 2)} L ${P(l * 0.8, -w / 2)} C ${P(l * 0.97, -w / 2)} ${P(l * 1.02, -w * 0.2)} ${P(l, 0)} C ${P(l * 1.02, w * 0.2)} ${P(l * 0.97, w / 2)} ${P(l * 0.8, w / 2)} L ${P(0, w / 2)} Z`
  return `M ${P(0, -w * 0.42)} L ${P(l * 0.66, -w * 0.45)} C ${P(l * 0.88, -w * 0.42)} ${P(l * 0.98, -w * 0.18)} ${P(l, 0)} C ${P(l * 0.95, w * 0.32)} ${P(l * 0.82, w * 0.55)} ${P(l * 0.6, w * 0.55)} L ${P(0, w * 0.55)} Z`
}

// Spread wing, upper surface: primaries fan from the hand (H outermost … W innermost), secondaries
// line the arm (W → S); brown coverts cover the bases and carry rows of soft pale fringes.
function Wing({ id, S, W, H, nP = 10, aO, aI, lO, lI, pw = 4.6, nS = 12, sO, sI, sl = [16, 14], sw = 4, cov = 0.45, seed = 3, bulge = 3, covFill }) {
  const r = rng(seed)
  const P = [], Sx = []
  for (let i = 0; i < nP; i++) { const t = i / (nP - 1); P.push({ x: lerp(H[0], W[0], t), y: lerp(H[1], W[1], t), a: lerp(aO, aI, t), l: lerp(lO, lI, Math.pow(t, 0.75)), k: 0.86 + r() * 0.26, i }) }
  for (let i = 0; i < nS; i++) { const t = (i + 0.5) / nS; Sx.push({ x: lerp(W[0], S[0], t), y: lerp(W[1], S[1], t), a: lerp(sO, sI, t), l: lerp(sl[0], sl[1], t), k: 0.86 + r() * 0.26, i }) }
  const all = [...P, ...Sx]
  const edge = all.map(f => [f.x + Math.cos(f.a * D) * f.l * cov, f.y + Math.sin(f.a * D) * f.l * cov])
  const mx = (S[0] + W[0]) / 2, my = (S[1] + W[1]) / 2, dx = W[0] - S[0], dy = W[1] - S[1], dl = Math.hypot(dx, dy)
  const c = [mx + (dy / dl) * bulge, my - (dx / dl) * bulge]
  const covD = `M ${S[0]} ${S[1]} Q ${c[0].toFixed(2)} ${c[1].toFixed(2)} ${W[0]} ${W[1]} L ${H[0]} ${H[1]} ${edge.map(p => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')} Z`
  // pale fringes: rows of covert tips (greater, median, lesser) lined up with the flight feathers
  const fr = []
  Sx.concat(P.slice(5)).forEach((f, j) => {
    for (let row = 0; row < 3; row++) {
      const d = f.l * cov * (0.96 - row * 0.3), x = f.x + Math.cos(f.a * D) * d, y = f.y + Math.sin(f.a * D) * d
      const nx = -Math.sin(f.a * D), ny = Math.cos(f.a * D), w = 1.7 - row * 0.25
      fr.push(<path key={`${j}-${row}`} d={`M ${(x - nx * w).toFixed(2)} ${(y - ny * w).toFixed(2)} Q ${(x + Math.cos(f.a * D) * 1.1).toFixed(2)} ${(y + Math.sin(f.a * D) * 1.1).toFixed(2)} ${(x + nx * w).toFixed(2)} ${(y + ny * w).toFixed(2)}`} stroke="#CDBE9E" strokeWidth={0.6 - row * 0.1} fill="none" opacity={0.42 - row * 0.08}/>)
    }
  })
  return (
    <g>
      <clipPath id={id}><path d={covD}/></clipPath>
      {Sx.map(f => <path key={`s${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, sw, 'round')} fill={tone('#2C241C', f.k)}/>)}
      {P.map(f => <path key={`p${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, pw)} fill={tone('#1E1914', f.k)}/>)}
      {P.map(f => <path key={`r${f.i}`} d={`M ${f.x} ${f.y} l ${(Math.cos(f.a * D) * f.l * 0.9).toFixed(2)} ${(Math.sin(f.a * D) * f.l * 0.9).toFixed(2)}`} stroke="#B8AE9C" strokeWidth="0.25" opacity="0.25"/>)}
      <path d={covD} fill={covFill}/>
      <g clipPath={`url(#${id})`}>{fr}</g>
    </g>
  )
}

// ── Head, local frame: facing left, origin where the neck joins (nape ≈ (2,-3.5), throat ≈ (3,2.5)) ──
function Head({ blink, eye = true }) {
  return (
    <g>
      <path d="M 2.6 -3.6 C 0 -5.6 -4 -6.4 -8 -5.9 C -10.6 -5.5 -12.2 -4.2 -12.8 -2.6 L -13 0.8 C -11 2.8 -7 4.1 -3 4.1 C 0 4.1 2.2 3.4 3.4 2.6 Z" fill="url(#cgoHead)"/>
      {/* chinstrap: white from the throat sweeping up the cheek to behind the eye */}
      <path d="M -11.6 2.6 C -10 1.2 -8 -0.6 -6 -1.9 C -4.2 -3 -2.2 -3.2 -1.3 -2 C -0.6 -0.8 -1 1.4 -2.4 2.9 C -4 4.2 -7 4.4 -9.4 3.8 C -10.4 3.5 -11.1 3.1 -11.6 2.6 Z" fill="url(#cgoChin)"/>
      <path d="M -8 -5.4 C -5 -5.9 -1.6 -5 0.8 -3.6" stroke="#4A4642" strokeWidth="0.7" fill="none" opacity="0.6" strokeLinecap="round"/>
      {eye && (blink
        ? <path d="M -9.6 -2.4 q 0.9 0.5 1.8 0" stroke="#3A3632" strokeWidth="0.45" fill="none"/>
        : <g>
            <circle cx="-8.7" cy="-2.6" r="0.82" fill="#2A221C"/>
            <circle cx="-8.7" cy="-2.6" r="0.5" fill="#050404"/>
            <circle cx="-9" cy="-2.9" r="0.2" fill="#FFF"/>
          </g>)}
      {/* bill: black, wedge-shaped, straight culmen, nail at the tip */}
      <path d="M -12.6 -2.8 C -15 -2.2 -18 -1 -20.6 -0.1 C -21.6 0.3 -21.9 1.3 -21.2 1.9 C -18.4 2.4 -15.2 2.4 -12.8 2 Z" fill="url(#cgoBill)"/>
      <path d="M -12.8 -2.4 C -15.6 -1.6 -18.2 -0.6 -20.2 0.1" stroke="#77716A" strokeWidth="0.35" fill="none" opacity="0.8" strokeLinecap="round"/>
      <path d="M -20.8 1.85 C -18 1.4 -15.2 1.2 -12.8 1.2" stroke="#000" strokeWidth="0.3" fill="none" opacity="0.8"/>
      <ellipse cx="-17.4" cy="-0.5" rx="0.6" ry="0.24" fill="#555" transform="rotate(-18 -17.4 -0.5)"/>
    </g>
  )
}

// ── Grazing: standing on grass, side view facing left; neck lowered, head down cropping ─────────
const GBODY = 'M 38.4 78.6 C 37.6 70.6 42.4 64 52 60.8 C 64 57.4 80 58 92 61.8 C 98 63.8 103 66.6 107 69.6 L 112.6 71.8 C 109 74.2 105 75.6 101.4 76 C 99 82.4 93 87.4 84.4 89.2 C 74 91.2 58 91 48.6 88.2 C 41.6 86 38.6 83 38.4 78.6 Z'
const GWING = 'M 50.4 64.6 C 58 60.6 72 59.4 84 61 C 94 62.6 102 66 110 70.8 C 104 73.8 96 75.6 86 75.8 C 74 75.8 60 73 50.4 64.6 Z'
const GNECK = 'M 56 61 C 42 57 30 59.6 24.6 67.6 C 22.4 71 21.8 75.2 22.7 78.7 L 28.5 80.4 C 29.2 76.4 31 73.6 34.2 72.4 C 37 71.4 40 72.4 42.6 77 L 50 70 Z'

function Grazer({ blink, nod }) {
  const r = rng(17)
  const bars = [], fr = []
  // flank barring: broad, soft, pale-edged feathers in near-vertical rows
  for (let col = 0; col < 13; col++) for (let row = 0; row < 4; row++) {
    const x = 44 + col * 4.4 + (row % 2) * 2 + (r() - 0.5) * 1.2, y = 74 + row * 3.6 + (r() - 0.5) * 1
    bars.push(<path key={`b${col}${row}`} d={`M ${x - 2} ${y} q 2 1.7 4 0.2`} stroke="#E4D8C0" strokeWidth="0.55" fill="none" opacity={0.2 + r() * 0.14}/>)
  }
  // back & folded wing: rows of pale fringes that follow the wing's taper
  for (let row = 0; row < 5; row++) for (let i = 0; i < 11 - row; i++) {
    const x = 54 + i * 5.2 + row * 3.2 + (r() - 0.5) * 1.2, y = 62.6 + row * 2.6 + i * 0.5 + (r() - 0.5) * 0.6
    { const w = 1.8 + r() * 1.1; fr.push(<path key={`f${row}${i}`} d={`M ${x - w} ${y - 0.4} q ${w * 0.95} ${w * 0.8} ${w * 2} ${(r() - 0.4) * 0.8}`} stroke="#C8B696" strokeWidth={0.4 + r() * 0.3} fill="none" opacity={0.12 + r() * 0.16}/>) }
  }
  return (
    <g>
      {/* far leg + foot (behind the body) */}
      <path d="M 75 86 L 76.6 100.6" stroke="#141210" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M 77 100.2 L 69.6 102 C 71.6 102.8 74.6 102.9 78.2 102.4 Z" fill="#141210"/>
      <g filter="url(#cgoTexN)"><path d={GNECK} fill="url(#cgoNeck)"/></g>
      <g transform={`translate(25 82) rotate(${-65 + nod} )`}><Head blink={blink}/></g>
      <g filter="url(#cgoTex)">
        <path d={GBODY} fill="url(#cgoFlank)"/>
        <g clipPath="url(#cgoGBodyClip)">
          {bars}
          {/* pale breast, whiter belly toward the legs, shadowed underside */}
          <path d="M 36 70 C 44 66 52 70 54 78 C 55 84 52 90 46 92 L 34 92 Z" fill="#DCD0B8" opacity="0.55" filter="url(#cgoBlur2)"/>
          <path d="M 70 84 C 80 86 90 84 98 78 L 104 90 L 66 92 Z" fill="#F0ECE2" opacity="0.8" filter="url(#cgoBlur2)"/>
          <path d="M 40 86 C 56 92 76 92 96 86 L 96 94 L 40 94 Z" fill="#3A2E22" opacity="0.35" filter="url(#cgoBlur2)"/>
        </g>
        {/* white undertail coverts */}
        <path d="M 91 81.6 C 98 80.6 104 77.6 108.4 73.8 C 108.4 76.6 105.6 80.2 100.6 82.6 C 97.4 84 94 84 91 82.6 Z" fill="url(#cgoVent)"/>
        {/* black tail, then the white uppertail band at its base */}
        <path d="M 103 69.4 C 108 69.6 112.4 70.6 115.4 72.2 C 113.6 74 108.6 74.8 103.4 74.2 Z" fill="#17130F"/>
        <path d="M 99.8 67.4 C 102.8 67.2 105 68 106.2 69.6 L 103.8 70.4 C 102.6 69.2 101.2 68.6 99.8 68.4 Z" fill="#EDE8DE"/>
        {/* folded wing + scapulars */}
        <path d={GWING} fill="url(#cgoWingF)"/>
        <g clipPath="url(#cgoGWingClip)">
          {fr}
          <path d="M 93 67.6 C 100 68.4 106 69.6 110.6 71 C 106 72.8 100 73.2 93 72 Z" fill="#1C1712" opacity="0.7" filter="url(#cgoBlur)"/>
        </g>
        <path d="M 50.4 64.6 C 60 73 74 75.8 86 75.8 C 96 75.6 104 73.8 110 70.8" stroke="#2A2018" strokeWidth="1.2" fill="none" opacity="0.4" filter="url(#cgoBlur)"/>
        {/* soft light along the back */}
        <path d="M 52 61.6 C 64 58.6 80 59 92 62.6" stroke="#B8A486" strokeWidth="1.3" fill="none" opacity="0.4" filter="url(#cgoBlur)"/>
      </g>
      {/* black neck meets the pale breast in a clean line */}
      <path d="M 50.6 63 C 45 64.8 41 69.4 39.2 74.6" stroke="#0E0C0A" strokeWidth="0.8" fill="none" opacity="0.5" filter="url(#cgoBlur)"/>
      {/* near leg: short feathered thigh, black tarsus, webbed foot */}
      <path d="M 67.2 88.6 L 65.8 101" stroke="#1C1916" strokeWidth="2.3" strokeLinecap="round"/>
      <path d="M 66.4 100.4 L 57.4 102.6 C 59.6 103.6 63 103.7 67.4 103 Z" fill="#1C1916"/>
      <path d="M 66 100.8 L 58.6 102.6 M 66 101.2 L 60.6 103.2" stroke="#3A3530" strokeWidth="0.3" opacity="0.7"/>
    </g>
  )
}

function Lawn({ ground }) {
  const r = rng(23)
  const trees = [], blades = [], fore = []
  for (let i = 0; i < 80; i++) { const x = r() * 128 - 4, y = ground - 50 - r() * 22, rx = 2.4 + r() * 5.6; trees.push(<ellipse key={i} cx={x} cy={y} rx={rx} ry={rx * 0.85} fill={['#5C6A4C', '#6E7A56', '#4C5A44', '#8A8458', '#7A6A44'][Math.floor(r() * 5)]}/>) }
  for (let i = 0; i < 420; i++) {
    const y = ground - 44 + Math.pow(r(), 0.7) * 72, x = r() * 124 - 2, h = 0.6 + (y - ground + 44) * 0.045 + r()
    blades.push(<path key={i} d={`M ${x} ${y} q ${(r() - 0.5) * 0.8} ${-h / 2} ${(r() - 0.4) * 1.4} ${-h}`} stroke={['#7C8E4A', '#64783C', '#92A05A', '#566A34'][Math.floor(r() * 4)]} strokeWidth={0.18 + (y - ground + 44) * 0.004} fill="none" opacity="0.55"/>)
  }
  // foreground tufts: clusters of fine blades, darker at the base
  for (let t = 0; t < 26; t++) {
    const cx = r() * 124 - 2, cy = ground + 5 + r() * 22
    for (let j = 0; j < 6; j++) {
      const x = cx + (r() - 0.5) * 3, h = 2 + r() * 3.6
      fore.push(<path key={`${t}-${j}`} d={`M ${x} ${cy} q ${(r() - 0.5) * 1.2} ${-h / 2} ${(r() - 0.4) * 2} ${-h}`} stroke={['#7E9048', '#62763A', '#98A85E', '#4E6430'][Math.floor(r() * 4)]} strokeWidth={0.3 + r() * 0.25} fill="none" opacity="0.8"/>)
    }
  }
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#cgoSky)"/>
      <g filter="url(#cgoDof)">{trees}<rect x="-2" y={ground - 50} width="124" height="6" fill="#6C7450"/></g>
      <rect x="-2" y={ground - 46} width="124" height="4" fill="#A9B8B4" opacity="0.8" filter="url(#cgoBlur)"/>
      <rect x="0" y={ground - 43} width="120" height={130 - ground + 43} fill="url(#cgoGrass)"/>
      {blades}
      <ellipse cx="68" cy={ground + 1} rx="34" ry="3.4" fill="#2A3418" opacity="0.4" filter="url(#cgoBlur2)"/>
      {fore}
    </g>
  )
}

// ── Flight: side / three-quarter view from slightly above, flying left, mid-downstroke ──────────
const FBODY = 'M -24 -0.8 C -23 -7.6 -15 -11 -3 -11.2 C 10 -11.4 22 -9.4 30 -5.6 L 39 -3.8 C 37.6 -0.4 34 1.6 30 2.4 C 20 8 6 10.4 -6 10 C -17.6 9.4 -24 5.4 -24 -0.8 Z'
const FNECK = 'M -15 -9.6 C -26 -10.6 -38 -9.2 -48.2 -8 L -47.2 -2 C -38 -1.2 -30 0.8 -20 4.6 Z'

function Flyer({ blink, up }) {
  const r = rng(61)
  const fr = []
  for (let row = 0; row < 4; row++) for (let i = 0; i < 9; i++) {
    const x = -14 + i * 5.2 + (row % 2) * 2.6 + (r() - 0.5), y = -9.4 + row * 2.6 + (r() - 0.5) * 0.6
    fr.push(<path key={`${row}${i}`} d={`M ${x - 2} ${y} q 2 1.8 4 0`} stroke="#CDBE9E" strokeWidth="0.55" fill="none" opacity={0.3 + r() * 0.12}/>)
  }
  return (
    <g>
      {/* far wing, raised, upper surface */}
      <g filter="url(#cgoTex)">
        <Wing id="cgoFarW" S={[2, -9]} W={[9, -31 - up]} H={[14, -37 - up]} aO={-76} aI={-34} lO={31} lI={19} pw={5} nS={12} sO={-26} sI={12} sl={[22, 19]} sw={4.8} cov={0.46} seed={5} bulge={-3} covFill="url(#cgoCovF)"/>
      </g>
      <g filter="url(#cgoTexN)"><path d={FNECK} fill="url(#cgoNeckF)"/></g>
      <g transform="translate(-50 -4.6) rotate(5)"><Head blink={blink}/></g>
      <g filter="url(#cgoTex)">
        <path d={FBODY} fill="url(#cgoFBody)"/>
        <g clipPath="url(#cgoFClip)">
          {fr}
          <path d="M -26 0 C -18 -2 -10 2 -8 10 L -28 12 Z" fill="#DCD0B8" opacity="0.6" filter="url(#cgoBlur2)"/>
          <path d="M 4 7 C 14 6 24 3 32 0 L 34 8 L 4 12 Z" fill="#F2EEE6" opacity="0.9" filter="url(#cgoBlur)"/>
        </g>
        {/* white uppertail band across the rump, black tail beyond */}
        <path d="M 24.6 -8.2 C 27.4 -7.6 29.6 -6.6 31 -5.2 L 31.6 -1.6 C 29.6 -2.6 27.2 -3.2 25 -3.4 Z" fill="#EFEBE2"/>
        <path d="M 30.6 -5.4 C 35 -5 39.6 -4.2 42.4 -2.8 C 41 -0.6 36 0.6 31 0.4 Z" fill="#15110E"/>
      </g>
      <path d="M -15.4 -9.4 C -19.6 -6 -21.6 -1 -20.6 4.4" stroke="#0E0C0A" strokeWidth="0.7" fill="none" opacity="0.45" filter="url(#cgoBlur)"/>
      {/* near wing, lowered on the downstroke, upper surface toward us */}
      <g filter="url(#cgoTex)">
        <Wing id="cgoNearW" S={[5, 1]} W={[-4, 26 + up * 0.6]} H={[-3, 32 + up * 0.6]} aO={94} aI={50} lO={35} lI={21} pw={5.8} nS={12} sO={46} sI={12} sl={[25, 21]} sw={5.4} cov={0.48} seed={9} bulge={-4} covFill="url(#cgoCovN)"/>
      </g>
    </g>
  )
}

function Sky() {
  const r = rng(31)
  // a distant skein in a V: leader plus two trailing arms
  const flock = [[8, 24], [13.6, 20.6], [19.2, 17.4], [24.6, 14.4], [13.8, 27.6], [19.6, 31], [25.4, 34.2]].map(([x, y], i) => {
    const s = 0.75 + r() * 0.15, w = (i % 2 ? 1 : -1) * 0.5
    return <path key={i} d={`M ${x - 3 * s} ${y - 1 * s + w} Q ${x - 1.2 * s} ${y - 0.2 * s} ${x} ${y} Q ${x + 1.4 * s} ${y - 0.3 * s} ${x + 3 * s} ${y - 1.2 * s - w} M ${x - 0.4 * s} ${y + 0.1} l ${-2.2 * s} ${0.4 * s}`} stroke="#3E4248" strokeWidth={0.55} fill="none" strokeLinecap="round" opacity="0.75"/>
  })
  const trees = []
  for (let i = 0; i < 60; i++) { const x = r() * 128 - 4, y = 122 - r() * 6, rx = 2.4 + r() * 4; trees.push(<ellipse key={i} cx={x} cy={y} rx={rx} ry={rx * 0.8} fill={['#8A6E46', '#A07E4A', '#6C6448', '#7E5E3C'][Math.floor(r() * 4)]}/>) }
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#cgoSkyF)"/>
      <ellipse cx="88" cy="30" rx="40" ry="9" fill="#F2F0EA" opacity="0.35" filter="url(#cgoCloud)"/>
      <ellipse cx="30" cy="96" rx="44" ry="8" fill="#F2F0EA" opacity="0.3" filter="url(#cgoCloud)"/>
      <g filter="url(#cgoBlur)">{flock}</g>
      <g filter="url(#cgoDof)">{trees}<rect x="-2" y="122" width="124" height="10" fill="#6E6246"/></g>
    </g>
  )
}

export default function CanadaGoose({ size = 120, animated = false, style = {}, pose = 'graze', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 420); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 5
  const beat = animated ? [0, 0.5, 1, 0.5, 0, 0.5, 1, 0.5][frame] : 0
  const nod = animated ? [0, 2, 4, 2, 0, 0, 0, 0][frame] : 0

  let content
  if (pose === 'fly') {
    content = (
      <>
        {scene && <Sky/>}
        <g transform={`translate(70 ${64 + beat * 1.2}) scale(0.74)`}><Flyer blink={blink} up={beat * 5}/></g>
      </>
    )
  } else {
    content = (
      <>
        {scene && <Lawn ground={112}/>}
        {!scene && <ellipse cx="68" cy="113" rx="32" ry="2.6" fill="#000" opacity="0.25"/>}
        <g transform="translate(0 9)"><Grazer blink={blink} nod={nod}/></g>
        {/* grass blades in front of the bill: cropping */}
        <path d="M 14 113.4 q 0.6 -3 0.2 -6 M 16.4 113.6 q -0.4 -3.4 0.6 -6.6 M 19 113.4 q 0.4 -2.6 1.6 -5 M 21.6 113.6 q -0.2 -2 -1.2 -4.2 M 12 113.4 q -0.4 -2.2 -1.4 -3.8" stroke="#7E9248" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity={scene ? 0.95 : 0.8}/>
      </>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Canada Goose">
      <defs>
        <linearGradient id="cgoSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C6D2D8"/><stop offset="100%" stopColor="#E6E6DA"/></linearGradient>
        <linearGradient id="cgoSkyF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FB2C2"/><stop offset="70%" stopColor="#C9D2D6"/><stop offset="100%" stopColor="#DEDDD2"/></linearGradient>
        <linearGradient id="cgoGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8E9C66"/><stop offset="40%" stopColor="#748A46"/><stop offset="100%" stopColor="#4E6A2C"/></linearGradient>
        <linearGradient id="cgoHead" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3734"/><stop offset="45%" stopColor="#181614"/><stop offset="100%" stopColor="#0C0B0A"/></linearGradient>
        <linearGradient id="cgoChin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#DAD6CE"/></linearGradient>
        <linearGradient id="cgoBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3836"/><stop offset="100%" stopColor="#0A0A0A"/></linearGradient>
        <linearGradient id="cgoNeck" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#34312E"/><stop offset="35%" stopColor="#1A1816"/><stop offset="100%" stopColor="#0C0B0A"/></linearGradient>
        <linearGradient id="cgoNeckF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3734"/><stop offset="40%" stopColor="#191715"/><stop offset="100%" stopColor="#0C0B0A"/></linearGradient>
        <linearGradient id="cgoFlank" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#D2C5AC"/><stop offset="30%" stopColor="#B4A386"/><stop offset="100%" stopColor="#8E7C62"/></linearGradient>
        <linearGradient id="cgoWingF" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stopColor="#7E6A50"/><stop offset="60%" stopColor="#5C4A36"/><stop offset="100%" stopColor="#3E3022"/></linearGradient>
        <linearGradient id="cgoVent" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#E2DDD2"/><stop offset="60%" stopColor="#FAF8F4"/><stop offset="100%" stopColor="#E8E4DC"/></linearGradient>
        <linearGradient id="cgoFBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7A664C"/><stop offset="45%" stopColor="#8E7C62"/><stop offset="75%" stopColor="#BFB094"/><stop offset="100%" stopColor="#D8CEBA"/></linearGradient>
        <linearGradient id="cgoCovF" x1="0" y1="1" x2="0.3" y2="0"><stop offset="0%" stopColor="#6E5C44"/><stop offset="100%" stopColor="#544432"/></linearGradient>
        <linearGradient id="cgoCovN" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#8A765A"/><stop offset="100%" stopColor="#5E4C38"/></linearGradient>
        <clipPath id="cgoGBodyClip"><path d={GBODY}/></clipPath>
        <clipPath id="cgoGWingClip"><path d={GWING}/></clipPath>
        <clipPath id="cgoFClip"><path d={FBODY}/></clipPath>
        <clipPath id="cgoFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="cgoBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="cgoBlur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="cgoDof" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter>
        <filter id="cgoCloud" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="cgoTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.4" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.05  0.9 0 0 0 -0.42" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="cgoTexN" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="2" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.33  0 0 0 0 0.3  0.35 0 0 0 -0.24" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#cgoFrame)">{content}</g>
    </svg>
  )
}
