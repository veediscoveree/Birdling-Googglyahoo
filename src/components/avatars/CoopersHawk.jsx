// Cooper's Hawk (adult) — "accurate first, cute second, in habitat". Follows WoodDuck.jsx conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'coopers_hawk', poses: ['perch', 'alert', 'glide', 'pounce'] }

// Field marks (each one is drawn): blue-gray back & wings; dark slate CAP sharply darker than
// the back, with a PALER gray nape behind it ("capped" look); relatively LARGE, blocky head
// that projects well ahead of the wings in flight; orange-red eye; hooked dark bill with
// yellow cere; finely barred rusty-orange breast & barred "trousers"; white undertail coverts;
// short ROUNDED wings; LONG ROUNDED tail with broad dark bands and a broad WHITE TERMINAL
// BAND; THICK yellow legs. Compare SharpShinnedHawk.jsx: small hooded head, square thin-
// tipped tail, pencil legs.

const C = {
  cap: '#232B37', back: '#5F7290', backDark: '#41506A', nape: '#B6BEC9', cheek: '#C9AC9C',
  white: '#FBF5EC', breast: '#FAE6D4', bar: '#CF6530', iris: '#F0661C', yellow: '#F4C232', bill: '#2A2D34',
  tail: '#687A92', band: '#262E3A', tailUnder: '#D3D7DD', bandUnder: '#58616E', underwing: '#F3EBE0',
}

// Wavy horizontal barring, meant to sit inside a clipPath.
function Bars({ x0, x1, y0, y1, gap = 2.5, w = 1.05, color = C.bar, amp = 0.45 }) {
  const out = []
  for (let y = y0; y <= y1; y += gap) {
    let d = `M ${x0} ${y}`
    for (let x = x0; x < x1; x += 4) d += ` q 1 ${amp} 2 0 t 2 0`
    out.push(<path key={y} d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round"/>)
  }
  return out
}

function Eye({ cx, cy, r = 4, blink }) {
  if (blink) return <path d={`M ${cx - r} ${cy} Q ${cx} ${cy + r * 0.7} ${cx + r} ${cy}`} stroke={C.cap} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 0.6} fill="#1C1F26"/>
      <circle cx={cx} cy={cy} r={r} fill={C.iris}/>
      <circle cx={cx} cy={cy} r={r * 0.5} fill="#160A06"/>
      <circle cx={cx - r * 0.32} cy={cy - r * 0.34} r={r * 0.3} fill="#FFF"/>
    </g>
  )
}

// Side-view head, facing left, centered (44,28).
function HeadSide({ blink }) {
  return (
    <g>
      <circle cx="44" cy="28" r="13" fill={C.nape}/>
      <path d="M 32 30.5 C 33.5 37 39 41.3 45.5 41.5 C 50 41.3 53.2 39.6 54.6 37 C 50.5 36.6 47 34.6 44.6 31.6 C 40.5 31.9 36 31.6 32 30.5 Z" fill={C.cheek}/>
      <path d="M 32.5 33 C 34.5 38 39 41.3 44.5 41.7 C 41 39.5 38.5 36.5 37.5 33 Z" fill={C.white}/>
      {/* dark cap — stops at eye level; the paler nape shows behind it */}
      <path d="M 31 28.5 C 30.5 19.5 37 14.8 44.5 15 C 50.5 15.2 54.8 18 56.6 22.6 C 53 22.8 50 23.8 47.5 25 C 43.5 25.6 39.5 25.1 36 25.6 C 33.6 26 32 27 31 28.5 Z" fill="url(#cohCap)"/>
      <Eye cx={38.6} cy={28.4} r={4} blink={blink}/>
      <path d="M 33.5 24.8 C 36.5 23.6 40.5 23.6 43.5 25" stroke={C.cap} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* hooked bill + yellow cere */}
      <path d="M 32 28.6 C 28 28.4 25.4 30.4 24.8 34 C 24.7 35.6 25.4 37 26.4 37.8 C 26.5 35.8 27.4 34.6 29 34.3 L 32.2 33.8 Z" fill={C.bill}/>
      <path d="M 29.5 29.2 C 27.6 30.2 26.5 31.8 26.2 33.6" stroke="#6E7682" strokeWidth="0.7" fill="none"/>
      <path d="M 33.6 27.6 C 31.6 27.7 30.4 29.2 30.3 31.1 C 30.4 32.6 31.4 33.8 33.6 34 Z" fill={C.yellow}/>
    </g>
  )
}

// Front-facing head (looking at the viewer), centered (44,28).
function HeadFront({ blink }) {
  return (
    <g>
      <circle cx="44" cy="28" r="13" fill={C.cheek}/>
      <path d="M 31.2 27 C 31.5 31 33 33.5 35 35 L 34 25 Z M 56.8 27 C 56.5 31 55 33.5 53 35 L 54 25 Z" fill={C.nape}/>
      <path d="M 36 33.5 C 38 39.5 41 41 44 41 C 47 41 50 39.5 52 33.5 C 49 35.5 39 35.5 36 33.5 Z" fill={C.white}/>
      <path d="M 31.1 26.5 C 31 19 37 15 44 15 C 51 15 57 19 56.9 26.5 C 53.5 24.2 49 23.6 46 25 C 45 25.5 43 25.5 42 25 C 39 23.6 34.5 24.2 31.1 26.5 Z" fill="url(#cohCap)"/>
      <Eye cx={38.4} cy={28.6} r={3.7} blink={blink}/>
      <Eye cx={49.6} cy={28.6} r={3.7} blink={blink}/>
      <path d="M 41.2 31.2 C 41.2 29.6 42.5 28.8 44 28.8 C 45.5 28.8 46.8 29.6 46.8 31.2 Z" fill={C.yellow}/>
      <path d="M 41.4 31.1 L 46.6 31.1 C 46.6 34.6 45.6 37 44 38.4 C 42.4 37 41.4 34.6 41.4 31.1 Z" fill={C.bill}/>
    </g>
  )
}

// Perched body, side view facing left: tail, body, folded wing, thick legs.
function PerchBody({ sway }) {
  return (
    <g>
      <g transform={`rotate(${sway} 56 78)`}>
        <path d="M 50 76 L 56.4 118.5 C 58.4 125.5 66.6 125.5 68.6 118.5 L 62.4 75 Z" fill={C.tail}/>
        <g clipPath="url(#cohTailP)">
          {[86.5, 97, 107.5].map(y => <rect key={y} x="40" y={y} width="40" height="5.4" fill={C.band} transform={`rotate(-8 60 ${y})`}/>)}
          <rect x="40" y="116.3" width="40" height="12" fill="#FFF" transform="rotate(-8 60 116.3)"/>
        </g>
      </g>
      <path d="M 37 37 C 30 47 30 63 39 75 C 43 80 49 83 56 82 C 62 76 64.5 61 62.5 47 C 61 39 56 34 49 34 C 44 34 40 35 37 37 Z" fill={C.breast}/>
      <g clipPath="url(#cohBreastP)">
        <rect x="28" y="34" width="20" height="14" fill="#E8A47A" opacity="0.55"/>
        <Bars x0={28} x1={60} y0={40} y1={78}/>
      </g>
      <path d="M 49 34 C 56 34 61 39 62.5 47 C 64.5 61 62 76 56 82 L 52 70 C 50 55 49 45 49 34 Z" fill={C.back}/>
      <path d="M 49.5 77 C 52 83 58 86 63 81 L 59.5 74 Z" fill={C.white}/>
      {/* short, rounded folded wing — tip reaches only a quarter down the long tail */}
      <path d="M 48.5 38 C 57 36.5 64 44 65.6 55 C 67 67 65 82 61.6 97 C 58 88 53.5 77 50.4 66 C 48 57 46.4 45 48.5 38 Z" fill="url(#cohWing)"/>
      <path d="M 51 50 C 55 48 59 49 62 52 M 52 60 C 56 58 60 59 64 62 M 54 72 C 57 70 61 71 64.6 74 M 57 82 C 59 81 62 82 64 84" stroke="#33415A" strokeWidth="0.8" fill="none" opacity="0.8"/>
      {/* barred trousers + thick yellow legs gripping the perch */}
      <path d="M 40 72 C 41 78 45 82 50 81 C 51 77 50 73 47 71 Z" fill={C.white}/>
      <path d="M 41 74.5 q 4 1.5 8 0 M 41.6 77.5 q 4 1.5 8 0" stroke={C.bar} strokeWidth="1.3" fill="none"/>
      <path d="M 49.8 80 L 50.4 88.4" stroke="#D9A622" strokeWidth="3.3" strokeLinecap="round"/>
      <path d="M 45 79.5 L 44.4 88.6" stroke={C.yellow} strokeWidth="3.4" strokeLinecap="round"/>
      <path d="M 44.4 88.6 L 39 89.4 M 44.4 88.6 L 47.5 90.6 M 50.4 88.4 L 54.6 89" stroke={C.yellow} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 39 89.4 l -1.3 1.8 M 47.5 90.6 l 0.4 1.8 M 54.6 89 l 0.8 1.8" stroke="#111" strokeWidth="1.1" strokeLinecap="round"/>
    </g>
  )
}

function Branch({ leaves }) {
  return (
    <g>
      <path d="M -4 95.5 C 30 92 70 89.5 124 85 L 124 91 C 70 95.5 30 98 -4 101.5 Z" fill="#6A4B30"/>
      <path d="M -4 95.5 C 30 92 70 89.5 124 85" stroke="#93704C" strokeWidth="1.4" fill="none"/>
      <path d="M 92 88 C 98 82 104 79 112 77" stroke="#6A4B30" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      {leaves && (
        <g>
          <ellipse cx="111" cy="73" rx="6" ry="3" fill="#6F9C4A" transform="rotate(-35 111 73)"/>
          <ellipse cx="104" cy="76" rx="5" ry="2.6" fill="#8DB863" transform="rotate(-70 104 76)"/>
          <ellipse cx="13" cy="92" rx="5.5" ry="2.6" fill="#7FA957" transform="rotate(30 13 92)"/>
          <ellipse cx="6" cy="102" rx="5" ry="2.4" fill="#6F9C4A" transform="rotate(-20 6 102)"/>
        </g>
      )}
    </g>
  )
}

function Foliage() {
  // Soft forest-edge hint in the upper corners, kept clear of the bird.
  return (
    <g opacity="0.55">
      <ellipse cx="108" cy="16" rx="18" ry="12" fill="#5E8C48"/>
      <ellipse cx="95" cy="8" rx="12" ry="8" fill="#76A35A"/>
      <ellipse cx="4" cy="40" rx="10" ry="16" fill="#5E8C48"/>
      <ellipse cx="10" cy="26" rx="7" ry="8" fill="#76A35A"/>
    </g>
  )
}

function Treeline() {
  return (
    <g>
      <path d="M 0 116 C 6 106 14 108 18 112 C 22 103 32 104 35 111 C 40 105 48 106 50 113 C 56 107 64 109 66 114 C 72 104 82 105 86 112 C 90 106 100 106 103 112 C 108 104 117 106 120 111 L 120 130 L 0 130 Z" fill="#5C8A4A" opacity="0.5"/>
      <path d="M 0 122 C 8 115 16 117 22 121 C 30 114 40 116 44 121 C 52 115 62 116 66 122 C 74 116 84 117 90 122 C 98 116 110 117 120 121 L 120 130 L 0 130 Z" fill="#3E6B3A" opacity="0.6"/>
    </g>
  )
}

// Flying, seen from below: head well ahead of the wings, short rounded wings, long rounded tail.
const G_WING = 'M 54 42 C 44 39 33 36 23 36.5 C 15 37 8.5 40 5 44.5 C 2.5 48 2.8 52.5 5.5 55.5 C 10 61 20 66.5 32 69 C 40 70.5 48 70.5 54 69 Z'
const G_TRAIL = (o) => `M ${5.5 + o * 0.4} ${55.5 - o} C ${10} ${61 - o} 20 ${66.5 - o} 32 ${69 - o} C 40 ${70.5 - o} 48 ${70.5 - o} 54 ${69 - o}`
const G_BODY = 'M 53 35 C 49.5 44 50 62 54 74 L 66 74 C 70 62 70.5 44 67 35 C 64 32 56 32 53 35 Z'

function Glide({ flex }) {
  // Underwing: rusty-barred coverts, whitish flight feathers with gray bars, dusky hand + trailing edge.
  const Wing = () => (
    <g transform={`translate(0 41) scale(1 ${flex}) translate(0 -41)`}>
      <path d={G_WING} fill={C.underwing}/>
      <g clipPath="url(#cohWingG)">
        <path d="M 56 40 L 56 50.5 C 44 48.5 33 47 23 47.5 C 15 48 10 49.5 6 52 L 0 30 Z" fill="#F4DCC8"/>
        <Bars x0={4} x1={56} y0={39.5} y1={48} gap={2.4} w={0.85} amp={0.4}/>
        {[3.2, 6.4, 9.6, 12.8, 16].map(o => <path key={o} d={G_TRAIL(o)} stroke="#9EA5AF" strokeWidth="1.1" fill="none"/>)}
        <path d={G_TRAIL(0)} stroke="#6E7682" strokeWidth="3" fill="none"/>
        <path d="M 0 42 C 4 42.5 7 44.5 8.6 48 C 9 51.5 8.4 55 6.6 58 L 0 58 Z" fill="#6E7682" opacity="0.8"/>
      </g>
      <path d="M 2.6 48.4 L 6.6 48.8 M 2.6 51.8 L 6.8 51.8 M 3.8 55 L 7.6 54.4" stroke="#0F1D22" strokeWidth="0.8" opacity="0.6"/>
    </g>
  )
  return (
    <g>
      <path d="M 54.5 70 L 51.8 111 C 53.6 120.5 66.4 120.5 68.2 111 L 65.5 70 Z" fill={C.tailUnder}/>
      <g clipPath="url(#cohTailG)">
        {[80, 90.5, 101].map(y => <rect key={y} x="48" y={y} width="24" height="4.2" fill={C.bandUnder}/>)}
        <rect x="48" y="110" width="24" height="12" fill="#FFF"/>
      </g>
      <Wing/>
      <g transform="translate(120 0) scale(-1 1)"><Wing/></g>
      <path d={G_BODY} fill={C.breast}/>
      <g clipPath="url(#cohBodyG)">
        <rect x="50" y="35" width="20" height="12" fill="#E8A47A" opacity="0.55"/>
        <Bars x0={50} x1={70} y0={40} y1={66} gap={3}/>
      </g>
      <ellipse cx="60" cy="73" rx="7" ry="4.4" fill="#FFF"/>
      {/* big head projecting well past the wings, face turned to the viewer */}
      <g transform="translate(60 26) scale(0.84) translate(-44 -28)"><HeadFront/></g>
    </g>
  )
}

// Rushing at prey, side view: wings thrown up and back, thick legs and talons forward.
function Pounce({ blink, lift }) {
  return (
    <g transform="translate(2 10) rotate(-26 60 60)">
      <g transform={`rotate(${lift - 14} 54 56) translate(54 56) scale(0.84) translate(-54 -56)`}>
        <path d="M 54 55 C 58 41 66 29 78 21 C 82 19 86 19.5 87.5 22.5 C 85 30 79 40 70 51 Z" fill={C.backDark}/>
      </g>
      <path d="M 67 56.5 L 104.5 53.5 C 110 56 110 63 104.5 66 L 67 64 Z" fill={C.tail}/>
      <g clipPath="url(#cohTailS)">
        {[78, 88, 97.5].map(x => <rect key={x} x={x} y="48" width="4.2" height="22" fill={C.band}/>)}
        <rect x="102.5" y="48" width="12" height="22" fill="#FFF"/>
      </g>
      <path d="M 31 58 C 37 47.5 56 46.5 71 53 C 74.5 58 73.5 64 68 67.5 C 58 72.5 42 72.5 34 66.5 Z" fill={C.breast}/>
      <g clipPath="url(#cohBodyS)"><Bars x0={28} x1={76} y0={55} y1={73}/></g>
      <path d="M 36 52.5 C 45 47.5 58 47 71 53 L 70 57.5 C 58 55 47 55 37 58 Z" fill={C.back}/>
      <path d="M 60 64 C 64 67 68 67 70 64 L 66 61 Z" fill="#FFF"/>
      {/* thighs + legs thrust forward, talons open */}
      <path d="M 40 61 C 38 66 41 70 46 70 C 50 69 51 65 49 62 Z" fill={C.white}/>
      <path d="M 40 64.5 q 4 1.4 9 0 M 41 67.5 q 4 1.4 8 0" stroke={C.bar} strokeWidth="1.2" fill="none"/>
      <path d="M 43 68 L 29 73.5" stroke={C.yellow} strokeWidth="3.3" strokeLinecap="round"/>
      <path d="M 29 73.5 L 23 71 M 29 73.5 L 23 76 M 29 73.5 L 26.5 79 M 29 73.5 L 33 77.5" stroke={C.yellow} strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M 23 71 l -1.4 0.6 M 23 76 l -1.2 1 M 26.5 79 l -0.6 1.4 M 33 77.5 l 0.4 1.4" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
      <g transform="translate(-12 27) translate(44 28) scale(0.92) translate(-44 -28)"><HeadSide blink={blink}/></g>
      <g transform={`rotate(${lift} 48 54) translate(46 57) scale(0.84) translate(-46 -57)`}>
        <path d="M 43 57 C 43.5 44 52 31 66 23 C 72 19 80 15 88 14.6 C 92 15 93.4 18 91.2 21 C 88.4 24.8 84.4 28 80.4 30.8 C 82.4 33 82.2 36 79.4 38.4 C 74 44 66 52 57 58 Z" fill="url(#cohWing)"/>
        <path d="M 72 26 C 78 22 85 18 91 18.5 C 92.6 19.5 92 21 91.2 21 C 88.4 24.8 84.4 28 80.4 30.8 C 77 31 74 29 72 26 Z" fill={C.backDark}/>
        <path d="M 52 45 C 58 42 64 42 70 44 M 56 51 C 62 48 68 48 74 50" stroke="#33415A" strokeWidth="0.8" fill="none"/>
      </g>
    </g>
  )
}

export default function CoopersHawk({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const tilt = animated ? [0, 1.5, 3, 1.5, 0, -1.5, -3, -1.5][frame] : 0
  const sway = animated ? [0, 0.6, 1, 0.6, 0, -0.6, -1, -0.6][frame] : 0
  const flex = animated ? [1, 0.96, 0.9, 0.96, 1, 1, 1, 1][frame] : 1
  const blink = animated && frame === 5
  const perched = pose === 'perch' || pose === 'alert'

  let bird
  if (pose === 'glide') bird = <Glide flex={flex}/>
  else if (pose === 'pounce') bird = <Pounce blink={blink} lift={animated ? [0, -2, -4, -2, 0, 1, 2, 1][frame] : 0}/>
  else {
    const Head = pose === 'alert' ? HeadFront : HeadSide
    bird = <g><PerchBody sway={sway}/><g transform={`rotate(${tilt} 47 38)`}><Head blink={blink}/></g></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Cooper's Hawk">
      <defs>
        <linearGradient id="cohCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E3746"/><stop offset="100%" stopColor="#1A2029"/>
        </linearGradient>
        <linearGradient id="cohWing" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6E82A0"/><stop offset="100%" stopColor="#45546E"/>
        </linearGradient>
        <clipPath id="cohTailP"><path d="M 50 76 L 56.4 118.5 C 58.4 125.5 66.6 125.5 68.6 118.5 L 62.4 75 Z"/></clipPath>
        <clipPath id="cohBreastP"><path d="M 37 37 C 30 47 30 63 39 75 C 43 80 49 83 56 82 C 62 76 64.5 61 62.5 47 C 61 39 56 34 49 34 C 44 34 40 35 37 37 Z"/></clipPath>
        <clipPath id="cohTailG"><path d="M 54.5 70 L 51.8 111 C 53.6 120.5 66.4 120.5 68.2 111 L 65.5 70 Z"/></clipPath>
        <clipPath id="cohWingG"><path d={G_WING}/></clipPath>
        <clipPath id="cohBodyG"><path d={G_BODY}/></clipPath>
        <clipPath id="cohTailS"><path d="M 67 56.5 L 104.5 53.5 C 110 56 110 63 104.5 66 L 67 64 Z"/></clipPath>
        <clipPath id="cohBodyS"><path d="M 31 58 C 37 47.5 56 46.5 71 53 C 74.5 58 73.5 64 68 67.5 C 58 72.5 42 72.5 34 66.5 Z"/></clipPath>
      </defs>
      {scene && (perched ? <Foliage/> : <Treeline/>)}
      {perched ? <g><Branch leaves={scene}/>{bird}</g> : bird}
    </svg>
  )
}
