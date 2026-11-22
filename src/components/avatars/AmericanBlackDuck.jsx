// American Black Duck (adult drake) — naturalistic pass (technique of BaldEagle.jsx).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to
// the plumage; feather detail only as soft, low-contrast buff tips. True dabbling-duck shape: long,
// low, flat-backed body riding high on the water; Mallard-like head with sloping forehead and a
// long flat olive-yellow bill (dark nail); pale buffy-grey face and neck much paler than the sooty
// body; dark crown and eye-line; violet-blue speculum bordered black; brilliant white underwing.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'american_black_duck', poses: ['swim', 'takeoff'] }

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

// Generic spread wing: primaries fan from the hand (H = outermost … W = innermost), secondaries
// line the arm (W → S); coverts cover the bases. Every flight feather is its own shape.
function Wing({ S, W, H, nP = 10, aO, aI, lO, lI, pw = 4.2, nS = 10, sO, sI, sl = [15, 12], sw = 3.8, cov = 0.42, dorsal = true, prim, sec, covFill, secOverlay, seed = 3, bulge = 3 }) {
  const r = rng(seed)
  const P = [], Sx = []
  for (let i = 0; i < nP; i++) { const t = i / (nP - 1); P.push({ x: lerp(H[0], W[0], t), y: lerp(H[1], W[1], t), a: lerp(aO, aI, t), l: lerp(lO, lI, Math.pow(t, 0.75)), k: 0.88 + r() * 0.24, i }) }
  for (let i = 0; i < nS; i++) { const t = (i + 0.5) / nS; Sx.push({ x: lerp(W[0], S[0], t), y: lerp(W[1], S[1], t), a: lerp(sO, sI, t), l: lerp(sl[0], sl[1], t), k: 0.88 + r() * 0.24, i }) }
  const edge = [...P, ...Sx].map(f => [f.x + Math.cos(f.a * D) * f.l * cov, f.y + Math.sin(f.a * D) * f.l * cov])
  const mx = (S[0] + W[0]) / 2, my = (S[1] + W[1]) / 2, dx = W[0] - S[0], dy = W[1] - S[1], dl = Math.hypot(dx, dy)
  const sgn = dorsal ? 1 : 1
  const c = [mx + (dy / dl) * bulge * sgn, my - (dx / dl) * bulge * sgn]
  const covD = `M ${S[0]} ${S[1]} Q ${c[0].toFixed(2)} ${c[1].toFixed(2)} ${W[0]} ${W[1]} L ${H[0]} ${H[1]} ${edge.map(p => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')} Z`
  const prims = P.map(f => <path key={`p${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, pw)} fill={prim(f)}/>)
  const secs = [...Sx.map(f => <path key={`s${f.i}`} d={featherPath(f.x, f.y, f.a, f.l, sw, 'round')} fill={sec(f)}/>),
    ...(secOverlay ? Sx.map(f => <g key={`o${f.i}`}>{secOverlay(f)}</g>) : [])]
  const shafts = P.map(f => <path key={`r${f.i}`} d={`M ${f.x} ${f.y} l ${(Math.cos(f.a * D) * f.l * 0.9).toFixed(2)} ${(Math.sin(f.a * D) * f.l * 0.9).toFixed(2)}`} stroke="#E8E2D6" strokeWidth="0.25" opacity="0.22"/>)
  return (
    <g>
      {dorsal ? <>{secs}{prims}</> : <>{prims.slice().reverse()}{secs.slice().reverse()}</>}
      {shafts}
      <path d={covD} fill={covFill}/>
    </g>
  )
}

// ── Swimming drake, side view facing left; waterline y = 90 ───────────────────
const BODY = 'M 33.5 90 C 31.6 84 33.2 78.4 38 74.8 C 43 71.2 50 69.8 58 69.6 C 70 69.4 84 69.6 94 71.6 C 98.4 72.5 102.4 73.4 106.6 74.2 C 105 76.8 102.4 78.8 99 79.8 C 99 83.6 97.4 87.4 94.6 90 Z'
const NECK = 'M 37.6 75.6 C 34.4 72 32.2 68.4 31 64.8 C 30 62.6 28.2 61.4 25.8 61 L 25.2 55 C 26.8 52 30 49.6 34.4 48.9 C 38.6 48.4 42.4 49.6 44.4 52.4 C 46 54.8 46.2 57.6 45.6 60.2 C 45.8 64 47.8 67.6 51.2 70.4 Z'
const TERT = 'M 52 71.4 C 64 68 82 68.4 96 71.8 C 100 72.8 103 73.8 104.8 75 C 98 78.6 88 80 76 79.6 C 66 79.2 58 76.6 52 71.4 Z'

function Head({ blink }) {
  const r = rng(41)
  const streaks = []
  for (let i = 0; i < 26; i++) {
    const x = 27 + r() * 16, y = 54 + r() * 14
    streaks.push(<path key={i} d={`M ${x} ${y} l ${0.5 + r() * 0.5} ${1.2 + r()}`} stroke="#6E5E4A" strokeWidth="0.35" opacity={0.25 + r() * 0.2}/>)
  }
  return (
    <g>
      <g filter="url(#abdTexL)">
        <path d={NECK} fill="url(#abdNeck)"/>
        <g clipPath="url(#abdHeadClip)">
          {streaks}
          <g transform="translate(0 2.2)">
          <path d="M 22 50.4 C 26 44 34 43 40 44.6 C 44 46 46.4 50 46.4 54 C 40 50.4 32 49.6 24 51.8 Z" fill="#33261B" opacity="0.88" filter="url(#abdBlur)"/>
          <path d="M 25.6 53.8 C 29 53 31 52.8 33 53 C 37 53.4 40.6 54 44.6 55.4" stroke="#3E3024" strokeWidth="1.2" fill="none" opacity="0.8" filter="url(#abdBlur)"/>
          <path d="M 30 47.6 C 34 46.4 38 46.8 41 48.4" stroke="#8A7A64" strokeWidth="1" fill="none" opacity="0.3" filter="url(#abdBlur)"/>
          </g>
          <path d="M 36 66 C 40 70 44 72 50 72 L 50 80 L 34 80 Z" fill="#2A1C12" opacity="0.5" filter="url(#abdBlur2)"/>
        </g>
      </g>
      <g transform="translate(0 2.2)">
      {blink
        ? <path d="M 31 52.6 q 1.4 0.8 2.8 0" stroke="#2A1C12" strokeWidth="0.7" fill="none"/>
        : <g>
            <ellipse cx="32.4" cy="52.5" rx="1.4" ry="1.3" fill="#2E1D11"/>
            <circle cx="32.5" cy="52.6" r="0.75" fill="#070403"/>
            <circle cx="32" cy="52" r="0.3" fill="#FFF"/>
          </g>}
      {/* long, flat, olive-yellow bill with dark nail */}
      <path d="M 25.2 52.8 C 21 53.6 15.6 55 11.2 56.4 C 9 57.1 7.6 57.9 7.4 59 C 7.4 59.9 8.4 60.3 9.6 60.2 C 15 59.8 20.6 59.4 25.8 58.8 Z" fill="url(#abdBill)"/>
      <path d="M 9.6 60.2 C 15 59.8 20.6 59.4 25.8 58.8 L 26 59.8 C 20.4 61 14.6 61.4 10.4 61 Z" fill="#7E7A30"/>
      <path d="M 10.2 56.2 C 8.6 56.9 7.5 57.8 7.4 59 C 7.4 59.9 8.4 60.3 9.6 60.2 C 9 59 9.2 57.6 10.2 56.2 Z" fill="#2A2618"/>
      <path d="M 24.6 53.6 C 20 54.6 15 55.8 11.6 57" stroke="#DCD57A" strokeWidth="0.5" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M 9.6 60.2 C 15 59.8 20.6 59.4 25.8 58.8" stroke="#4E4A1C" strokeWidth="0.35" fill="none"/>
      <ellipse cx="20.6" cy="55.4" rx="0.9" ry="0.35" fill="#4E4A1C" transform="rotate(-14 20.6 55.4)"/>
      </g>
    </g>
  )
}

function SwimBody() {
  const r = rng(13)
  const tips = [], tert = []
  for (let row = 0; row < 6; row++) for (let i = 0; i < 12; i++) {
    const x = 38 + i * 5.2 + (row % 2) * 2.6 + (r() - 0.5) * 2.4, y = 74.6 + row * 2.9 + (r() - 0.5) * 1.4, w = 1.6 + r() * 0.9
    tips.push(<path key={`${row}-${i}`} d={`M ${x - w} ${y} q ${w} ${w * 0.8} ${w * 2} ${(r() - 0.5) * 0.6}`} stroke="#A28A6A" strokeWidth="0.45" fill="none" opacity={0.1 + r() * 0.12}/>)
  }
  for (let i = 0; i < 5; i++) tert.push(<path key={i} d={`M ${56 + i * 8} ${72.2 + i * 0.6} C ${66 + i * 7} ${70.8 + i * 0.5} ${78 + i * 5} ${71.4 + i * 0.6} ${88 + i * 3.4} ${73.4 + i * 0.7}`} stroke="#8A7458" strokeWidth="0.45" fill="none" opacity="0.3"/>)
  return (
    <g filter="url(#abdTex)">
      <path d={BODY} fill="url(#abdBody)"/>
      <g clipPath="url(#abdBodyClip)">
        {tips}
        <path d="M 30 86 C 50 90 80 90 100 86 L 100 92 L 30 92 Z" fill="#120C08" opacity="0.5" filter="url(#abdBlur2)"/>
      </g>
      <path d={TERT} fill="url(#abdTert)"/>
      {tert}
      <path d="M 82 78.9 C 87 79 92 78.4 96.4 77.4 L 96.8 78.6 C 92 79.8 87 80.4 82 80.2 Z" fill="url(#abdSpec)" opacity="0.75"/>
      <path d="M 80 80.4 C 86 80.6 92 80 97 78.8" stroke="#0E0A10" strokeWidth="0.5" fill="none"/>
      <path d="M 54 70.6 C 66 68.4 84 68.6 98 71.6" stroke="#8C7660" strokeWidth="1" fill="none" opacity="0.4" filter="url(#abdBlur)"/>
    </g>
  )
}

function Swimmer({ blink }) {
  return <g><SwimBody/><Head blink={blink}/></g>
}

// ── Marsh habitat ───────────────────────────────────────────────────────────
function Marsh({ shore }) {
  const r = rng(29)
  const reeds = [], trees = []
  for (let i = 0; i < 90; i++) { const x = r() * 124 - 2, h = 4 + r() * 9; reeds.push(<path key={i} d={`M ${x} ${shore} q ${(r() - 0.5) * 2} ${-h / 2} ${(r() - 0.3) * 2.4} ${-h}`} stroke={['#B59C6C', '#9C8558', '#C8B183', '#857048'][Math.floor(r() * 4)]} strokeWidth={0.5 + r() * 0.5} fill="none" opacity="0.85"/>) }
  for (let i = 0; i < 70; i++) { const x = r() * 126 - 3, y = shore - 9 - r() * 9, rx = 2 + r() * 4; trees.push(<ellipse key={i} cx={x} cy={y} rx={rx} ry={rx * 0.8} fill={['#5E6E5A', '#6E7C64', '#4E5E4E', '#7C8870'][Math.floor(r() * 4)]}/>) }
  const glints = Array.from({ length: 14 }, (_, i) => {
    const y = shore + 3 + i * ((128 - shore) / 14) + r() * 1.5, x = r() * 108, w = 5 + r() * 16 * (1 + i / 10)
    return <path key={i} d={`M ${x} ${y} h ${w}`} stroke="#E8EEEE" strokeWidth={0.25 + i * 0.025} opacity={0.12 + r() * 0.18} strokeLinecap="round"/>
  })
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#abdSky)"/>
      <g filter="url(#abdDof)">{trees}<rect x="-2" y={shore - 8} width="124" height="8" fill="#8E8460"/>{reeds}</g>
      <rect x="0" y={shore} width="120" height={130 - shore} fill="url(#abdWater)"/>
      <g opacity="0.4" filter="url(#abdSmear)"><g transform={`translate(0 ${2 * shore}) scale(1 -1)`}>{reeds.slice(0, 60)}</g></g>
      {glints}
    </g>
  )
}

// ── Take-off: springs straight up off the water ─────────────────────────────────
const FBODY = 'M -24 -1 C -23 -7 -16 -10 -6 -10.4 C 6 -10.8 18 -8.6 27 -4.6 L 35 -2.6 C 33 0.4 30 2 26 2.6 C 18 7.6 6 10 -6 9.6 C -17 9 -24 5 -24 -1 Z'

function TakeOff({ blink, beat }) {
  const r = rng(77)
  const tips = []
  for (let row = 0; row < 4; row++) for (let i = 0; i < 9; i++) { const x = -18 + i * 5.4 + (row % 2) * 2.7, y = -6 + row * 3.6; tips.push(<path key={`${row}${i}`} d={`M ${x - 1.8} ${y} q 1.8 1.6 3.6 0`} stroke="#A28A6A" strokeWidth="0.5" fill="none" opacity={0.18 + r() * 0.14}/>) }
  const up = beat * 3
  return (
    <g>
      {/* far wing, upper surface: dark coverts, violet-blue speculum bordered black */}
      <g filter="url(#abdTex)">
        <Wing S={[64, 62]} W={[73, 37 - up]} H={[79, 27 - up]} aO={-66} aI={-22} lO={30} lI={15} nS={14} sO={-14} sI={22} sl={[15, 13]} sw={3.4} cov={0.42} seed={5}
          prim={f => tone('#3A2E24', f.k)} sec={() => '#0C090D'} covFill="url(#abdCovUp)"
          secOverlay={f => <path d={featherPath(f.x, f.y, f.a, f.l * 0.9, 3.4, 'round')} fill={tone('#43369C', 0.9 + (f.i % 2) * 0.14)}/>}/>
      </g>
      <g transform="translate(1 -7.6) rotate(4 35 55)"><Head blink={blink}/></g>
      <g filter="url(#abdTexL)"><path d="M 34.6 62 C 35 67 38.6 70.8 43.6 70.6 L 48 61 C 42 59.4 37 59.6 34.6 62 Z" fill="url(#abdBreastF)"/></g>
      <g transform="translate(64 77) rotate(28)">
        <g filter="url(#abdTex)">
          <path d={FBODY} fill="url(#abdBody)"/>
          <g clipPath="url(#abdFClip)">{tips}<path d="M -24 6 C -10 12 12 10 30 2 L 30 14 L -24 14 Z" fill="#120C08" opacity="0.45" filter="url(#abdBlur2)"/></g>
        </g>
      </g>
      {/* orange legs dangling, toes spread, dripping */}
      <path d="M 63 85.4 C 65 90 68 94 72 97.6 M 67.6 84 C 70 88.4 73.4 91.4 77.4 94" stroke="#D9762E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 72 97.6 c -0.6 1.8 -0.2 3.6 1 4.6 c 0.6 -1 1.6 -1.4 2.8 -1.2 c -0.4 -1.6 -1.8 -2.8 -3.8 -3.4 Z M 77.4 94 c -0.2 1.8 0.4 3.4 1.8 4.2 c 0.4 -1 1.4 -1.6 2.6 -1.6 c -0.6 -1.4 -2.2 -2.4 -4.4 -2.6 Z" fill="#E8843A"/>
      {/* near wing raised, seen from below: brilliant white linings, smoky flight feathers */}
      <g filter="url(#abdTex)">
        <Wing S={[59, 65]} W={[52, 39 - up]} H={[53.6, 29 - up]} aO={-96} aI={-56} lO={30} lI={16} pw={4.6} nS={13} sO={-50} sI={-8} sl={[20, 17]} sw={3.6} cov={0.58} dorsal={false} seed={9} bulge={-3}
          prim={f => tone('#8A847C', f.k)} sec={f => tone('#9A948C', f.k)} covFill="url(#abdLining)"/>
      </g>
    </g>
  )
}

function Spray({ y, t }) {
  const r = rng(55)
  const drops = []
  const arcs = []
  // falling drops shed from feet, belly and tail
  for (let i = 0; i < 34; i++) {
    const x = 58 + r() * 34, yy = y - 1 - Math.pow(r(), 1.4) * 20 + t, s = 0.25 + r() * 0.5
    drops.push(<ellipse key={i} cx={x} cy={yy} rx={s * 0.65} ry={s * 1.25} fill="#F2F6F6" opacity={0.45 + r() * 0.45}/>)
  }
  // splash crown: thin sheets thrown up and outward from the kick-off point
  for (let i = 0; i < 11; i++) {
    const x0 = 60 + r() * 26, side = x0 < 73 ? -1 : 1, h = 2 + r() * 5, dx = side * (0.6 + r() * 1.6)
    arcs.push(<path key={i} d={`M ${x0} ${y + 0.4} q ${dx * 0.5} ${-h * 0.7} ${dx} ${-h}`} stroke="#EEF4F4" strokeWidth={0.25 + r() * 0.3} fill="none" opacity={0.25 + r() * 0.3} strokeLinecap="round"/>)
  }
  return (
    <g>
      <ellipse cx="73" cy={y + 0.6} rx="15" ry="2.2" fill="#E6EEEE" opacity="0.18"/>
      <ellipse cx="73" cy={y + 0.8} rx="21" ry="3" fill="none" stroke="#E6EEEE" strokeWidth="0.4" opacity="0.45" strokeDasharray="6 1.5 9 2"/>
      <ellipse cx="73" cy={y + 1.2} rx="31" ry="4.4" fill="none" stroke="#E6EEEE" strokeWidth="0.28" opacity="0.25" strokeDasharray="10 3 6 2"/>
      {arcs}
      <path d={`M 73.4 102.6 q 0.2 2 0 ${y - 103} M 79.6 98.6 q 0.3 3 0.1 ${y - 99}`} stroke="#E8F0F0" strokeWidth="0.35" opacity="0.5" strokeLinecap="round" strokeDasharray="1.4 1"/>
      {drops}
    </g>
  )
}

export default function AmericanBlackDuck({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 420); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.3, -0.5, -0.3, 0, 0.3, 0.5, 0.3][frame] : 0
  const blink = animated && frame === 5
  const beat = animated ? [0, 0.5, 1, 0.5, 0, 0.5, 1, 0.5][frame] : 0

  let content
  if (pose === 'takeoff') {
    const WY = 104
    content = (
      <>
        {scene && <Marsh shore={66}/>}
        {scene && (
          <g clipPath="url(#abdBelowT)" opacity="0.3">
            <g transform={`translate(0 ${2 * WY}) scale(1 -1)`} filter="url(#abdSmear)"><TakeOff beat={beat}/></g>
          </g>
        )}
        <g transform={`translate(0 ${-beat})`}><TakeOff blink={blink} beat={beat}/></g>
        <Spray y={WY} t={beat * 1.5}/>
      </>
    )
  } else {
    content = (
      <>
        {scene && <Marsh shore={60}/>}
        {/* reflection: flipped about the waterline, broken by ripples */}
        <g clipPath="url(#abdBelow)" opacity={scene ? 0.42 : 0.16}>
          <g transform="translate(0 180) scale(1 -1)" filter="url(#abdSmear)"><Swimmer/></g>
        </g>
        <g transform={`translate(0 ${bob})`}><Swimmer blink={blink}/></g>
        <path d="M 33.6 90.3 C 50 91.2 80 91.2 94.6 90.3" stroke="#0E1410" strokeWidth="0.8" opacity="0.5" fill="none"/>
        <path d="M 29 91 C 26 91.5 23 91.9 19 92.1 M 99 90.9 C 104 91.3 108 91.5 113 91.5 M 24 94.2 C 34 95 44 95.4 52 95.5 M 62 95.6 C 76 95.6 92 95.2 106 94.2 M 16 98.4 C 26 99.4 36 99.9 44 100.1 M 70 100.3 C 86 100.2 100 99.6 114 98.4" stroke="#DCE6E6" strokeWidth="0.3" fill="none" opacity={scene ? 0.4 : 0.25} strokeLinecap="round"/>
      </>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Black Duck">
      <defs>
        <linearGradient id="abdSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#BFCCD4"/><stop offset="100%" stopColor="#E6E6DC"/></linearGradient>
        <linearGradient id="abdWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9AA8A4"/><stop offset="30%" stopColor="#6E827E"/><stop offset="100%" stopColor="#36484A"/></linearGradient>
        <linearGradient id="abdBody" x1="0" y1="0" x2="0.15" y2="1"><stop offset="0%" stopColor="#4C3A2A"/><stop offset="55%" stopColor="#33241A"/><stop offset="100%" stopColor="#1C130D"/></linearGradient>
        <linearGradient id="abdTert" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A2A1E"/><stop offset="100%" stopColor="#1A120C"/></linearGradient>
        <linearGradient id="abdCovUp" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4A3828"/><stop offset="100%" stopColor="#2A1E15"/></linearGradient>
        <linearGradient id="abdLining" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F2F0EA"/><stop offset="100%" stopColor="#CFCBC2"/></linearGradient>
        <linearGradient id="abdNeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C9BA9C"/><stop offset="55%" stopColor="#AE9C7E"/><stop offset="100%" stopColor="#5A4836"/></linearGradient>
        <linearGradient id="abdBreastF" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#7A6650"/><stop offset="55%" stopColor="#4A3828"/><stop offset="100%" stopColor="#33241A"/></linearGradient>
        <linearGradient id="abdBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C6BE52"/><stop offset="100%" stopColor="#968E36"/></linearGradient>
        <linearGradient id="abdSpec" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3A2E96"/><stop offset="60%" stopColor="#5A48C0"/><stop offset="100%" stopColor="#30288A"/></linearGradient>
        <clipPath id="abdHeadClip"><path d={NECK}/></clipPath>
        <clipPath id="abdBodyClip"><path d={BODY}/></clipPath>
        <clipPath id="abdFClip"><path d={FBODY}/></clipPath>
        <clipPath id="abdBelow"><rect x="0" y="90.2" width="120" height="40"/></clipPath>
        <clipPath id="abdBelowT"><rect x="0" y="104.6" width="120" height="30"/></clipPath>
        <clipPath id="abdFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="abdBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="abdBlur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="abdDof" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter>
        <filter id="abdSmear" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6 0.5"/></filter>
        <filter id="abdTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.4" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.52" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="abdTexL" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="2" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.12  1 0 0 0 -0.48" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#abdFrame)">{content}</g>
    </svg>
  )
}
