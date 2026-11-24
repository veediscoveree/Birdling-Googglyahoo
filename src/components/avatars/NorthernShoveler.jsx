// Northern Shoveler (alternate-plumaged drake) — naturalistic pass (technique of BaldEagle.jsx).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to
// the plumage; feather detail only as soft, low-contrast tips. True shape: long, low dabbling-duck
// body riding high, flat back; big rounded green head on a short thick neck; the huge black
// spatulate bill — longer than the head, broadening toward the tip — held angled down toward the
// water; yellow eye; white breast, chestnut flanks, white patch before the black stern; long
// drooping black-and-white scapulars. In flight: powder-blue forewing, white bar, green speculum.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'northern_shoveler', poses: ['swim'] }

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
// line the arm (W → S), a white greater-covert bar, then the powder-blue coverts over the bases.
function Wing({ S, W, H, nP = 10, aO, aI, lO, lI, pw = 4.2, nS = 13, sO, sI, sl = [15, 13], sw = 3.4, cov = 0.42, seed = 3, bulge = 3, far = false, ventral = false }) {
  const r = rng(seed)
  const P = [], Sx = []
  for (let i = 0; i < nP; i++) { const t = i / (nP - 1); P.push({ x: lerp(H[0], W[0], t), y: lerp(H[1], W[1], t), a: lerp(aO, aI, t), l: lerp(lO, lI, Math.pow(t, 0.75)), k: 0.86 + r() * 0.28, i }) }
  for (let i = 0; i < nS; i++) { const t = (i + 0.5) / nS; Sx.push({ x: lerp(W[0], S[0], t), y: lerp(W[1], S[1], t), a: lerp(sO, sI, t), l: lerp(sl[0], sl[1], t), k: 0.9 + r() * 0.2, i }) }
  const at = (f, q) => [f.x + Math.cos(f.a * D) * f.l * q, f.y + Math.sin(f.a * D) * f.l * q]
  const edge = [...P.map(f => at(f, cov)), ...Sx.map(f => at(f, cov))]
  const bar = Sx.map(f => at(f, cov + 0.1))
  const mx = (S[0] + W[0]) / 2, my = (S[1] + W[1]) / 2, dx = W[0] - S[0], dy = W[1] - S[1], dl = Math.hypot(dx, dy)
  const c = [mx + (dy / dl) * bulge, my - (dx / dl) * bulge]
  const covD = `M ${S[0]} ${S[1]} Q ${c[0].toFixed(2)} ${c[1].toFixed(2)} ${W[0]} ${W[1]} L ${H[0]} ${H[1]} ${edge.map(p => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')} Z`
  const pc = far ? '#34312C' : '#46423B'
  if (ventral) return (
    <g>
      {P.slice().reverse().map(f => <path key={`p${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, pw)} fill={tone('#8E8A82', f.k)}/>)}
      {Sx.slice().reverse().map(f => <path key={`s${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, sw, 'round')} fill={tone('#A29E96', f.k)}/>)}
      {P.map(f => <path key={`r${f.i}`} d={`M ${f.x} ${f.y} l ${(Math.cos(f.a * D) * f.l * 0.9).toFixed(2)} ${(Math.sin(f.a * D) * f.l * 0.9).toFixed(2)}`} stroke="#E8E4DA" strokeWidth="0.25" opacity="0.3"/>)}
      <path d={covD} fill="url(#nshLining)"/>
    </g>
  )
  return (
    <g>
      {Sx.map(f => <path key={`s${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, sw, 'round')} fill="#F2F2EC"/>)}
      {Sx.map(f => <path key={`g${f.i}`} d={featherPath(f.x, f.y, f.a, f.l * 0.9, sw, 'round')} fill={tone(far ? '#1C5A3A' : '#23784A', 0.88 + (f.i % 2) * 0.16)}/>)}
      {P.map(f => <path key={`p${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, pw)} fill={tone(pc, f.k)}/>)}
      {P.map(f => <path key={`r${f.i}`} d={`M ${f.x} ${f.y} l ${(Math.cos(f.a * D) * f.l * 0.9).toFixed(2)} ${(Math.sin(f.a * D) * f.l * 0.9).toFixed(2)}`} stroke="#D8D4CA" strokeWidth="0.25" opacity="0.22"/>)}
      <path d={`M ${bar.map(p => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' L ')}`} stroke="#EEEEE6" strokeWidth="1.9" opacity="0.9" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d={covD} fill={far ? 'url(#nshBlueFar)' : 'url(#nshBlue)'}/>
      {/* primary coverts over the hand are grey-brown, not blue */}
      <path d={`M ${H[0]} ${H[1]} ${P.map(f => at(f, cov + 0.04)).map(p => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')} L ${W[0]} ${W[1]} Z`} fill={far ? '#3C3A35' : '#55524B'}/>
    </g>
  )
}

// ── Head ────────────────────────────────────────────────────────────────────
// Small head carried low on a short thick neck; forehead slopes straight into the culmen.
const NECKHEAD = 'M 24.4 71.2 C 26 69.2 28 67.8 31 67.4 C 34.6 67 37.4 68 39 70.2 C 40.2 72 40.4 74 40 75.6 C 41.4 76.6 43.2 77.2 45.4 77.2 C 44.2 79.6 41.4 81.4 37.4 82.2 C 33.4 82.4 29.8 81.6 27.4 79.4 C 26.4 78.6 25.6 78.2 25 78 Z'
const HEADONLY = 'M 24.4 71.2 C 26 69.2 28 67.8 31 67.4 C 34.6 67 37.4 68 39 70.2 C 40.2 72 40.6 74.4 40 76.6 C 38 78.8 34 79.8 30 79.4 C 27.6 79.2 26 78.6 25 78 Z'

function Head({ blink, neck = true, sheen = 0 }) {
  const ticks = []
  for (let x = 10; x <= 22; x += 1.2) {
    const y = x < 15.6 ? lerp(81.6, 79.6, (x - 8.8) / 6.8) : lerp(79.6, 78.2, (x - 15.6) / 9.8)
    ticks.push(<path key={x} d={`M ${x.toFixed(2)} ${(y - 0.15).toFixed(2)} l 0.1 -0.7`} stroke="#7E8684" strokeWidth="0.22" opacity="0.3"/>)
  }
  return (
    <g>
      <g filter="url(#nshTex)">
        <path d={neck ? NECKHEAD : HEADONLY} fill="url(#nshHead)"/>
        <g clipPath={neck ? 'url(#nshNeckClip)' : 'url(#nshHeadClip)'}>
          <ellipse cx="31.5" cy="69" rx="5.4" ry="2.2" fill="#4FA874" opacity={0.4 + sheen} filter="url(#nshBlur2)"/>
          <ellipse cx="37" cy="74.4" rx="3" ry="3.6" fill="#5A3A7A" opacity="0.3" filter="url(#nshBlur2)"/>
          <path d="M 26 78 C 30 80.4 34 81.4 38 81 L 40 86 L 24 86 Z" fill="#06140C" opacity="0.4" filter="url(#nshBlur)"/>
        </g>
      </g>
      {blink
        ? <path d="M 31 71.9 q 1.2 0.7 2.4 0" stroke="#0A1A10" strokeWidth="0.6" fill="none"/>
        : <g>
            <ellipse cx="32.2" cy="71.8" rx="1.3" ry="1.22" fill="#EDBE1C"/>
            <circle cx="32.25" cy="71.85" r="0.6" fill="#060606"/>
            <circle cx="31.85" cy="71.4" r="0.25" fill="#FFF"/>
            <path d="M 30.8 71 C 31.6 70.4 33 70.4 33.7 71" stroke="#06180E" strokeWidth="0.4" fill="none"/>
          </g>}
      {/* the spoon: deep base joined to the forehead, slight waist, deeper rounded tip */}
      <path d="M 24.6 71 C 20 72.2 16 73.6 13 74 C 10.4 74.3 7.8 73.8 5.9 74.5 C 4 75.3 3.4 77.6 4 79.4 C 4.6 81.1 6.5 81.9 8.8 81.7 C 11.2 81.5 13.2 80.4 15.6 79.6 C 18.8 78.8 22 78.4 25.6 78.2 Z" fill="url(#nshBill)"/>
      <path d="M 25.4 76.6 C 20 77.1 14 77.9 9.2 78.7 C 7.2 79 5.4 79 4.2 78.6 L 4.2 79.6 C 4.8 81.1 6.5 81.9 8.8 81.7 C 11.2 81.5 13.2 80.4 15.6 79.6 C 18.8 78.8 22 78.4 25.6 78.2 Z" fill="#0E0F0F" opacity="0.55"/>
      <path d="M 25.4 76.6 C 20 77.1 14 77.9 9.2 78.7 C 7.2 79 5.4 79 4.2 78.6" stroke="#050505" strokeWidth="0.35" fill="none"/>
      <path d="M 23.4 71.8 C 19 73 15.4 74.2 12.6 74.6 C 10 75 7.4 74.8 5.6 75.6 C 7 76.2 9.6 76 12 75.8 C 15.6 75.4 19.4 74.2 23.4 72.8 Z" fill="#9AA4A6" opacity="0.38" filter="url(#nshBlur)"/>
      {ticks}
      <ellipse cx="21.6" cy="73.4" rx="0.9" ry="0.32" fill="#000" opacity="0.85" transform="rotate(-14 21.6 73.4)"/>
    </g>
  )
}

// ── Swimming drake, waterline y = 90: front-low, back rising gently to a raised stern ───────
const BODY = 'M 38 90 C 35.4 87.4 35.4 83.4 37.4 80.8 C 40.6 77.4 45.6 75.4 52 74.4 C 62 72.8 76 72.4 88 72.6 C 95 72.6 101 72.4 107.6 71.8 C 106.4 74 104.4 75.6 101.8 76.4 C 101.6 81.4 99.8 86.4 96.8 90 Z'
const SCAP = 'M 47 76.6 C 58 73.6 76 72.2 92 72.4 C 99 72.6 104 72.4 107.4 72 C 103 75.4 96 77.4 86 78.4 C 74 79.4 60 79.4 47 77.4 Z'

function SwimBody() {
  const r = rng(19)
  const tips = []
  for (let row = 0; row < 3; row++) for (let i = 0; i < 8; i++) {
    const x = 56 + i * 5 + (row % 2) * 2.5 + (r() - 0.5) * 2, y = 81 + row * 3 + (r() - 0.5)
    tips.push(<path key={`${row}-${i}`} d={`M ${x - 1.7} ${y} q 1.7 1.4 3.4 0`} stroke="#E0A070" strokeWidth="0.4" fill="none" opacity={0.08 + r() * 0.1}/>)
  }
  return (
    <g>
      <g filter="url(#nshTexL)"><path d={BODY} fill="url(#nshWhite)"/></g>
      <g filter="url(#nshTex)" clipPath="url(#nshBodyClip)">
        <path d="M 58 77.6 C 68 76.4 82 75.8 92.6 75.8 C 96 79 96.6 83 95.6 86.4 C 94.6 89 93 91 92 92 L 47 92 C 46 87 49 81.4 58 77.6 Z" fill="url(#nshChest)"/>
        <ellipse cx="96.6" cy="83.4" rx="2.4" ry="6.4" fill="#F4F4EE" opacity="0.95" filter="url(#nshBlur)"/>
        {tips}
        <path d="M 93.6 75 C 96.4 81 96 87 93.6 92 L 112 92 L 112 70 Z" fill="url(#nshStern)"/>
        <path d="M 30 86.4 C 50 90.4 80 90.4 102 86 L 102 93 L 30 93 Z" fill="#1A0E08" opacity="0.4" filter="url(#nshBlur2)"/>
        <path d="M 37 83 C 38 87 40 89.4 44 90.6 L 32 92 Z" fill="#6A6A60" opacity="0.35" filter="url(#nshBlur2)"/>
      </g>
      <g filter="url(#nshTex)">
        <path d="M 100 72.4 C 104 71.8 107.6 71.2 110.6 71 C 109.2 72.8 106.8 74 103.8 74.6 Z" fill="#DEDCD2"/>
        <path d="M 102 72.8 C 105 72.2 107.6 71.8 109.6 71.6" stroke="#4A4A44" strokeWidth="0.5" fill="none" opacity="0.7"/>
        {/* long drooping scapulars lying along the back: black with white and pale-blue stripes */}
        <path d={SCAP} fill="url(#nshBack)"/>
        <path d="M 60 76.4 C 72 75.2 84 75 97 75.6 M 66 78.4 C 76 78 86 77.6 95 77" stroke="#ECECE4" strokeWidth="0.55" fill="none" strokeLinecap="round" opacity="0.75"/>
        <path d="M 53 77.6 C 61 76.8 70 76.8 79 77.6" stroke="#93B6D6" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.75"/>
        <path d="M 52 76.4 C 64 74.4 82 73.4 102 72.8" stroke="#7E8A84" strokeWidth="0.8" fill="none" opacity="0.4" filter="url(#nshBlur)"/>
      </g>
    </g>
  )
}

function Swimmer({ blink, sheen }) {
  // hull deepened slightly and shortened so it rides like a duck, not a canoe
  return <g><g transform="translate(38 90) scale(0.95 1.2) translate(-38 -90)"><SwimBody/></g><g transform="translate(0 -1.2)"><Head blink={blink} sheen={sheen}/></g></g>
}

// ── Fast direct flight, three-quarter side view, level; wings mid-downstroke ──────────
const FBODY = 'M -24 -1 C -23 -6.6 -16 -9.4 -6 -9.8 C 6 -10.2 18 -8.4 27 -4.6 L 35 -2.4 C 33 0.4 30 1.8 26 2.4 C 18 7 6 9.2 -6 9 C -17 8.6 -24 4.8 -24 -1 Z'

function Flyer({ beat, blink, sheen }) {
  const b = beat * 2
  return (
    <g>
      {/* far wing: spread outward and back, partly hidden behind the body */}
      <g filter="url(#nshTex)">
        <Wing far S={[66, 55]} W={[77, 38 + b]} H={[82, 31 + b]} aO={-58} aI={-16} lO={28} lI={14} sO={24} sI={40} sl={[15, 16]} nS={12} seed={5}/>
      </g>
      <g transform="translate(64 60)">
        <g filter="url(#nshTexL)"><path d={FBODY} fill="url(#nshWhite)"/></g>
        <g filter="url(#nshTex)" clipPath="url(#nshFClip)">
          <path d="M -10 -12 C -5 -2 -5 4 -12 12 L 23 12 L 23 -12 Z" fill="url(#nshChest)"/>
          <path d="M 23 -12 L 26.4 -12 C 28 -4 28 4 26 12 L 22 12 C 24 4 24.4 -4 23 -12 Z" fill="#F4F4EE"/>
          <path d="M 26.4 -12 L 40 -12 L 40 12 L 26 12 C 28 4 28 -4 26.4 -12 Z" fill="#141414"/>
          <path d="M -30 -12 L 40 -12 L 40 -5 C 20 -4 0 -3.6 -20 -5.2 Z" fill="url(#nshBack)"/>
          <path d="M -26 5 C -10 11 10 10 30 3 L 30 12 L -26 12 Z" fill="#1A0E08" opacity="0.35" filter="url(#nshBlur2)"/>
        </g>
        <path d="M 28 -2.4 L 36.4 -1.8 C 35.6 -0.2 33.6 0.8 31 1.2 Z" fill="#E4E2DA"/>
        <path d="M 22 6.4 c 2.4 0.4 4.4 1 6 2 c -2 0.4 -4 0.2 -5.6 -0.6 Z" fill="#E07A32"/>
      </g>
      {/* neck extended forward and slightly down; heavy bill leading */}
      <g filter="url(#nshTex)"><path d="M 30.4 58.6 C 35 56.8 40 55 45 54.2 L 45 65.4 C 40 65.8 35.4 66.4 31.6 67.6 Z" fill="url(#nshHead)"/></g>
      <g transform="translate(-3 -12.4) rotate(4 27 74)"><Head neck={false} blink={blink} sheen={sheen}/></g>
      {/* near wing angled down and back, upper surface toward us */}
      <g filter="url(#nshTex)">
        <Wing S={[58, 61]} W={[70, 79 - b]} H={[75, 86 - b]} aO={64} aI={16} lO={28} lI={15} pw={4.4} sO={-26} sI={-18} sl={[17, 19]} nS={13} cov={0.44} seed={8} bulge={-3}/>
      </g>
    </g>
  )
}

// ── Marsh habitat ───────────────────────────────────────────────────────────
function Marsh({ shore }) {
  const r = rng(37)
  const reeds = [], trees = []
  for (let i = 0; i < 90; i++) { const x = r() * 124 - 2, h = 4 + r() * 9; reeds.push(<path key={i} d={`M ${x} ${shore} q ${(r() - 0.5) * 2} ${-h / 2} ${(r() - 0.3) * 2.4} ${-h}`} stroke={['#B59C6C', '#9C8558', '#C8B183', '#857048'][Math.floor(r() * 4)]} strokeWidth={0.5 + r() * 0.5} fill="none" opacity="0.85"/>) }
  for (let i = 0; i < 70; i++) { const x = r() * 126 - 3, y = shore - 9 - r() * 9, rx = 2 + r() * 4; trees.push(<ellipse key={i} cx={x} cy={y} rx={rx} ry={rx * 0.8} fill={['#5E6E5A', '#6E7C64', '#4E5E4E', '#7C8870'][Math.floor(r() * 4)]}/>) }
  const glints = Array.from({ length: 14 }, (_, i) => {
    const y = shore + 3 + i * ((128 - shore) / 14) + r() * 1.5, x = r() * 108, w = 5 + r() * 16 * (1 + i / 10)
    return <path key={i} d={`M ${x} ${y} h ${w}`} stroke="#E8EEEE" strokeWidth={0.25 + i * 0.025} opacity={0.12 + r() * 0.18} strokeLinecap="round"/>
  })
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#nshSky)"/>
      <g filter="url(#nshSoft)" opacity="0.7"><ellipse cx="26" cy="22" rx="20" ry="5" fill="#FFF"/><ellipse cx="94" cy="34" rx="16" ry="4" fill="#FFF"/></g>
      <g filter="url(#nshDof)">{trees}<rect x="-2" y={shore - 8} width="124" height="8" fill="#8E8460"/>{reeds}</g>
      <rect x="0" y={shore} width="120" height={130 - shore} fill="url(#nshWater)"/>
      <g opacity="0.4" filter="url(#nshSmear)"><g transform={`translate(0 ${2 * shore}) scale(1 -1)`}>{reeds.slice(0, 60)}</g></g>
      {glints}
    </g>
  )
}

export default function NorthernShoveler({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 360); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.3, -0.5, -0.3, 0, 0.3, 0.5, 0.3][frame] : 0
  const blink = animated && frame === 5
  const sheen = animated ? [0, 0.1, 0.2, 0.1, 0, -0.1, -0.15, -0.1][frame] : 0
  const beat = animated ? [0, 0.5, 1, 0.5, 0, 0.5, 1, 0.5][frame] : 0

  let content
  if (pose === 'fly') {
    content = (
      <>
        {scene && <Marsh shore={108}/>}
        <g transform={`translate(10 ${6 + bob * 2}) scale(0.86)`}><Flyer beat={beat} blink={blink} sheen={sheen}/></g>
      </>
    )
  } else {
    content = (
      <>
        {scene && <Marsh shore={60}/>}
        <g clipPath="url(#nshBelow)" opacity={scene ? 0.42 : 0.16}>
          <g transform="translate(0 180) scale(1 -1)" filter="url(#nshSmear)"><Swimmer sheen={sheen}/></g>
        </g>
        <g transform={`translate(0 ${bob})`}><Swimmer blink={blink} sheen={sheen}/></g>
        <path d="M 32.8 90.3 C 50 91.2 80 91.2 94.8 90.3" stroke="#0E1410" strokeWidth="0.8" opacity="0.45" fill="none"/>
        <path d="M 28 91 C 25 91.5 22 91.9 18 92.1 M 99 90.9 C 104 91.3 108 91.5 113 91.5 M 24 94.2 C 34 95 44 95.4 52 95.5 M 62 95.6 C 76 95.6 92 95.2 106 94.2 M 16 98.4 C 26 99.4 36 99.9 44 100.1 M 70 100.3 C 86 100.2 100 99.6 114 98.4" stroke="#DCE6E6" strokeWidth="0.3" fill="none" opacity={scene ? 0.4 : 0.25} strokeLinecap="round"/>
      </>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Northern Shoveler">
      <defs>
        <linearGradient id="nshSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A9C2D6"/><stop offset="100%" stopColor="#E2E6DE"/></linearGradient>
        <linearGradient id="nshWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#98AAA8"/><stop offset="30%" stopColor="#6C8282"/><stop offset="100%" stopColor="#34484C"/></linearGradient>
        <linearGradient id="nshHead" x1="0.2" y1="0" x2="0.7" y2="1"><stop offset="0%" stopColor="#1E5A3C"/><stop offset="50%" stopColor="#123E2A"/><stop offset="100%" stopColor="#0A2418"/></linearGradient>
        <linearGradient id="nshWhite" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFC"/><stop offset="70%" stopColor="#ECECE4"/><stop offset="100%" stopColor="#C4C4BA"/></linearGradient>
        <linearGradient id="nshChest" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8602E"/><stop offset="55%" stopColor="#9C4620"/><stop offset="100%" stopColor="#6E2E14"/></linearGradient>
        <linearGradient id="nshStern" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F4F4EE"/><stop offset="22%" stopColor="#F4F4EE"/><stop offset="26%" stopColor="#161616"/><stop offset="100%" stopColor="#0C0C0C"/></linearGradient>
        <linearGradient id="nshBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2E3430"/><stop offset="100%" stopColor="#141816"/></linearGradient>
        <linearGradient id="nshBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B2CCE2"/><stop offset="100%" stopColor="#86A8C6"/></linearGradient>
        <linearGradient id="nshBlueFar" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#94AEC4"/><stop offset="100%" stopColor="#6E8CA8"/></linearGradient>
        <linearGradient id="nshLining" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#EEEEE8"/><stop offset="100%" stopColor="#C8C6BE"/></linearGradient>
        <linearGradient id="nshBill"x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3E3C"/><stop offset="100%" stopColor="#101010"/></linearGradient>
        <clipPath id="nshNeckClip"><path d={NECKHEAD}/></clipPath>
        <clipPath id="nshHeadClip"><path d={HEADONLY}/></clipPath>
        <clipPath id="nshBodyClip"><path d={BODY}/></clipPath>
        <clipPath id="nshFClip"><path d={FBODY}/></clipPath>
        <clipPath id="nshBelow"><rect x="0" y="90.2" width="120" height="40"/></clipPath>
        <clipPath id="nshFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="nshBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="nshBlur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="nshSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
        <filter id="nshDof" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter>
        <filter id="nshSmear" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6 0.5"/></filter>
        <filter id="nshTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.4" numOctaves="2" seed="6" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.3 0 0 0 -0.52" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="nshTexL" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="2" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0 0.28  0.9 0 0 0 -0.46" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#nshFrame)">{content}</g>
    </svg>
  )
}
