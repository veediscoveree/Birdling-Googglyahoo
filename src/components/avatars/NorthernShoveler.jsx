// Northern Shoveler (alternate-plumaged drake) — naturalistic pass (technique of BaldEagle.jsx).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to
// the plumage; feather detail only as soft, low-contrast tips. True shape: long, low dabbling-duck
// body riding high, flat back; big rounded green head on a short thick neck; the huge black
// spatulate bill — longer than the head, broadening toward the tip — held angled down toward the
// water; yellow eye; white breast, chestnut flanks, white patch before the black stern; long
// drooping black-and-white scapulars. In flight: powder-blue forewing, white bar, green speculum.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'northern_shoveler', poses: ['swim', 'fly'] }

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
      <path d={`M ${bar.map(p => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' L ')}`} stroke="#F4F4EE" strokeWidth="2.6" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d={covD} fill={far ? 'url(#nshBlueFar)' : 'url(#nshBlue)'}/>
    </g>
  )
}

// ── Head ────────────────────────────────────────────────────────────────────
const NECK = 'M 37.2 76 C 34.2 72.6 32 69 30.6 66 C 29.6 64.2 28.4 63.2 27 62.6 L 27.6 54.6 C 28.6 51 31.4 48.2 35.8 47.4 C 40.6 46.8 44.8 48.6 46.6 52 C 48 55 48 58.6 47.2 61.2 C 47.6 65 49.6 68.4 53 71 Z'
const HEADONLY = 'M 27 62.6 L 27.6 54.6 C 28.6 51 31.4 48.2 35.8 47.4 C 40.6 46.8 44.8 48.6 46.6 52 C 48 55 48 58.6 47.2 61.2 C 45.6 64.4 41 66 35 65.6 C 31.6 65.2 28.8 64 27 62.6 Z'

function Head({ blink, neck = true, sheen = 0 }) {
  const ticks = []
  for (let x = 3; x <= 20; x += 1.4) ticks.push(<path key={x} d={`M ${x} ${1.5 + x * 0.04} l 0.15 0.9`} stroke="#8A908C" strokeWidth="0.25" opacity="0.35"/>)
  return (
    <g>
      <g filter="url(#nshTex)">
        <path d={neck ? NECK : HEADONLY} fill="url(#nshHead)"/>
        <g clipPath={neck ? 'url(#nshNeckClip)' : 'url(#nshHeadClip)'}>
          <ellipse cx="38" cy="51" rx="7" ry="3.4" fill="#4FA874" opacity={0.35 + sheen} filter="url(#nshBlur2)"/>
          <ellipse cx="42" cy="56" rx="4" ry="5" fill="#5A3A7A" opacity="0.28" filter="url(#nshBlur2)"/>
          {neck && <path d="M 30 70 C 36 74 44 74 54 72 L 54 80 L 30 80 Z" fill="#E8E8E0" opacity="0.6" filter="url(#nshBlur)"/>}
        </g>
      </g>
      {blink
        ? <path d="M 35.8 55.4 q 1.5 0.8 3 0" stroke="#0A1A10" strokeWidth="0.7" fill="none"/>
        : <g>
            <ellipse cx="37.3" cy="55.3" rx="1.55" ry="1.45" fill="#F2C21A"/>
            <circle cx="37.35" cy="55.35" r="0.72" fill="#060606"/>
            <circle cx="36.9" cy="54.8" r="0.3" fill="#FFF"/>
            <path d="M 35.6 54.4 C 36.4 53.7 38.2 53.6 39 54.3" stroke="#0A2216" strokeWidth="0.45" fill="none"/>
          </g>}
      {/* the spoon: deep at the base, concave culmen, broadening to a rounded tip; lamellae along the edge */}
      <g transform="translate(28.4 58.6) rotate(-24) scale(-1 1)">
        <path d="M -0.6 -3.8 C 6 -2.7 11 -2.1 15 -2.3 C 19 -2.7 23 -3.6 25.4 -2.6 C 27 -1.6 27.3 1.2 26.1 2.7 C 25 3.5 23.4 3.5 22 3.1 C 18 2.3 10 1.8 -0.6 1.6 Z" fill="url(#nshBill)"/>
        <path d="M -0.6 1.6 C 10 1.8 18 2.3 22 3.1 C 18 4.1 10 4 -0.6 3.8 Z" fill="#141414"/>
        <path d="M 1 -3.4 C 7 -2.8 11 -2.4 15 -2.6 C 19 -3 23 -3.9 25.6 -2.8 C 25 -1.6 23 -1.1 20 -1.3 C 15 -1.6 8 -2.2 1 -2.8 Z" fill="#6C7472" opacity="0.4"/>
        <path d="M 22 3.1 C 23.4 3.5 25 3.5 26.1 2.7" stroke="#000" strokeWidth="0.3" fill="none" opacity="0.6"/>
        {ticks}
        <ellipse cx="4.6" cy="-1.4" rx="1" ry="0.38" fill="#000"/>
      </g>
    </g>
  )
}

// ── Swimming drake, waterline y = 90 ───────────────────────────────────────────
const BODY = 'M 32.6 90 C 30.8 84 32.4 78.6 37.4 75.2 C 42.4 72 49 70.8 57 70.6 C 70 70.4 84 70.6 94 72.4 C 98.6 73.2 102.6 74.4 107 75.6 C 105.4 78 102.8 79.6 99.6 80.4 C 99.4 84.4 97.6 87.6 94.8 90 Z'
const SCAP = 'M 50 72.4 C 62 68.6 82 69 96 72.6 C 100 73.6 103 74.6 105 75.8 C 98 78.6 88 79.4 76 78.6 C 66 78 57 76.4 50 72.4 Z'

function SwimBody() {
  const r = rng(19)
  const tips = []
  for (let row = 0; row < 4; row++) for (let i = 0; i < 9; i++) {
    const x = 52 + i * 5 + (row % 2) * 2.5 + (r() - 0.5) * 2, y = 78 + row * 3 + (r() - 0.5)
    tips.push(<path key={`${row}-${i}`} d={`M ${x - 1.8} ${y} q 1.8 1.5 3.6 0`} stroke="#E2A272" strokeWidth="0.4" fill="none" opacity={0.08 + r() * 0.1}/>)
  }
  return (
    <g>
      <g filter="url(#nshTexL)">
        <path d={BODY} fill="url(#nshWhite)"/>
      </g>
      <g filter="url(#nshTex)" clipPath="url(#nshBodyClip)">
        <path d="M 49 77 C 60 73.4 80 73.6 95 76.4 C 97 82 96.6 87 94 92 L 50 92 C 46.6 86 46.4 81 49 77 Z" fill="url(#nshChest)"/>
        {tips}
        <path d="M 99 76 C 101 82 100 88 96.6 92 L 110 92 L 110 74 Z" fill="url(#nshStern)"/>
        <path d="M 28 86 C 50 90 80 90 100 86 L 100 93 L 28 93 Z" fill="#1A0E08" opacity="0.4" filter="url(#nshBlur2)"/>
        <path d="M 36 84 C 38 88 40 90 44 91 L 30 92 Z" fill="#6A6A60" opacity="0.3" filter="url(#nshBlur2)"/>
      </g>
      <g filter="url(#nshTex)">
        {/* black tail coverts + whitish tail */}
        <path d="M 98 72.4 C 102 73.2 105 74.2 107.6 75.4 C 105.6 77.4 103 78.6 100 79 Z" fill="#E4E2DA"/>
        {/* back and long drooping scapulars: black with white and blue stripes */}
        <path d={SCAP} fill="url(#nshBack)"/>
        <path d="M 62 72.6 C 72 71.6 82 72.2 92 74.2 M 68 75.8 C 78 75.2 87 75.6 96 76.8" stroke="#ECECE4" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M 58 75.4 C 66 74.6 74 74.8 82 75.8" stroke="#8FB2D2" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M 54 71 C 66 68.8 84 69 98 72.4" stroke="#6E7A74" strokeWidth="0.8" fill="none" opacity="0.4" filter="url(#nshBlur)"/>
      </g>
    </g>
  )
}

function Swimmer({ blink, sheen }) { return <g><SwimBody/><Head blink={blink} sheen={sheen}/></g> }

// ── Fast direct flight, side view ───────────────────────────────────────────────
const FBODY = 'M -24 -1 C -23 -6.6 -16 -9.4 -6 -9.8 C 6 -10.2 18 -8.4 27 -4.6 L 35 -2.4 C 33 0.4 30 1.8 26 2.4 C 18 7 6 9.2 -6 9 C -17 8.6 -24 4.8 -24 -1 Z'

function Flyer({ beat, blink, sheen }) {
  return (
    <g>
      <g filter="url(#nshTex)">
        <Wing far S={[70, 58]} W={[85, 41 - beat * 3]} H={[92, 34 - beat * 3]} aO={-48} aI={-8} lO={29} lI={15} sO={0} sI={26} sl={[17, 14]} nS={14} seed={5}/>
      </g>
      <g transform="translate(68 63) rotate(-2)">
        <g filter="url(#nshTexL)"><path d={FBODY} fill="url(#nshWhite)"/></g>
        <g filter="url(#nshTex)" clipPath="url(#nshFClip)">
          <path d="M -10 -12 C -4 -2 -4 4 -12 12 L 22 12 L 22 -12 Z" fill="url(#nshChest)"/>
          <path d="M 25 -12 L 40 -12 L 40 12 L 27 12 C 29 4 28.6 -4 25 -12 Z" fill="#141414"/>
          <path d="M -30 -12 L 40 -12 L 40 -5.4 C 20 -4 0 -3.6 -20 -5 Z" fill="url(#nshBack)"/>
          <path d="M -26 5 C -10 11 10 10 30 3 L 30 12 L -26 12 Z" fill="#1A0E08" opacity="0.35" filter="url(#nshBlur2)"/>
        </g>
        <path d="M 28 -2.2 L 36.6 -1.6 C 35.6 0 33.6 1 31 1.4 Z" fill="#E4E2DA"/>
        <path d="M 16 7.6 l 4.6 1.4 l -0.6 1.4 Z" fill="#E07A32"/>
      </g>
      {/* neck stretched forward, head and heavy bill slightly drooped */}
      <g filter="url(#nshTex)"><path d="M 38.4 52.4 C 41 52 44 53 47.6 54.8 L 48 68.6 C 44.6 68 41 66.4 37.4 64.4 Z" fill="url(#nshHead)"/></g>
      <g transform="translate(-6 0) rotate(-13 37 56)"><Head neck={false} blink={blink} sheen={sheen}/></g>
      <g filter="url(#nshTex)">
        <Wing ventral S={[64, 62]} W={[61, 40 - beat * 3]} H={[64, 31 - beat * 3]} aO={-76} aI={-40} lO={30} lI={15} pw={4.4} sO={-36} sI={0} sl={[21, 17]} nS={13} cov={0.55} seed={8} bulge={-3}/>
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
        <g transform={`translate(9 ${2 + bob * 2}) scale(0.86)`}><Flyer beat={beat} blink={blink} sheen={sheen}/></g>
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
        <clipPath id="nshNeckClip"><path d={NECK}/></clipPath>
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
