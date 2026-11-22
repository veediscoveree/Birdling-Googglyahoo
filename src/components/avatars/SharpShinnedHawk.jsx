// Sharp-shinned Hawk (adult) — "accurate first, cute second, in habitat". Follows WoodDuck.jsx conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'sharp_shinned_hawk', poses: ['perch', 'glide'] }

// Field marks (each one is drawn): blue-gray back & wings; SMALL ROUND HEAD with a HOODED
// look — dark crown blends straight into the nape and back (no pale-nape contrast, unlike
// Cooper's cap); big red eye in a small face; small hooked dark bill with yellow cere;
// rusty-orange barred breast & trousers; white undertail coverts; short rounded wings with
// wrists pushed forward so the small head BARELY PROJECTS past them in flight; shorter
// SQUARE-tipped (slightly notched) tail with dark bands and only a THIN white tip;
// PENCIL-THIN yellow legs. Compare CoopersHawk.jsx: big capped head, long rounded
// broad-white-tipped tail, thick legs.

const C = {
  cap: '#232B37', back: '#5A6C8C', backDark: '#41506A', nape: '#B6BEC9', cheek: '#C8987F',
  white: '#FBF5EC', breast: '#FAE6D4', bar: '#CF6530', iris: '#E0381C', yellow: '#F4C232', bill: '#2A2D34',
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

// Side-view head, facing left: small and round, centered (45,29). The hood gradient runs the
// dark crown straight down into the back color — no pale nape.
function HeadSide({ blink }) {
  return (
    <g>
      <circle cx="45" cy="29" r="10.6" fill="url(#sshHood)"/>
      <path d="M 35 30.5 C 36 35.5 40 39.2 45.5 39.5 C 49 39.5 52 38 53.6 35.6 C 50 34.8 47 33.2 45 31 C 41.5 31.3 38 31.2 35 30.5 Z" fill={C.cheek}/>
      <path d="M 35.6 33 C 37.2 36.8 40.5 39.2 44.6 39.6 C 42 37.6 40.2 35.4 39.6 33 Z" fill={C.white}/>
      <Eye cx={40.4} cy={28.6} r={3.8} blink={blink}/>
      <path d="M 36.4 25.6 C 38.6 24.6 41.6 24.6 44 25.8" stroke={C.cap} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M 35.8 28.8 C 32.6 28.7 30.6 30.3 30.2 33 C 30.1 34.3 30.6 35.4 31.4 36 C 31.5 34.5 32.3 33.5 33.5 33.3 L 35.9 33 Z" fill={C.bill}/>
      <path d="M 36.9 28 C 35.2 28.1 34.2 29.3 34.2 30.8 C 34.3 32 35.1 32.9 36.9 33.1 Z" fill={C.yellow}/>
    </g>
  )
}

// Front-facing head (looking at the viewer): small, round, hooded; centered (44,28).
function HeadFront({ blink }) {
  return (
    <g>
      <circle cx="44" cy="28.5" r="10.6" fill="url(#sshHood)"/>
      <path d="M 35 29.5 C 35.5 34.5 39 38.8 44 38.8 C 49 38.8 52.5 34.5 53 29.5 C 50 31.5 47 32 44 32 C 41 32 38 31.5 35 29.5 Z" fill={C.cheek}/>
      <path d="M 40 34 C 41 37.4 42.5 38.6 44 38.6 C 45.5 38.6 47 37.4 48 34 C 46 34.8 42 34.8 40 34 Z" fill={C.white}/>
      <Eye cx={39.6} cy={28.2} r={3.4} blink={blink}/>
      <Eye cx={48.4} cy={28.2} r={3.4} blink={blink}/>
      <path d="M 35.8 25 C 38 23.6 41.4 23.8 43 25.4 M 52.2 25 C 50 23.6 46.6 23.8 45 25.4" stroke={C.cap} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M 42 30.6 C 42 29.4 43 28.8 44 28.8 C 45 28.8 46 29.4 46 30.6 Z" fill={C.yellow}/>
      <path d="M 42.2 30.5 L 45.8 30.5 C 45.8 33.2 45.1 35 44 36 C 42.9 35 42.2 33.2 42.2 30.5 Z" fill={C.bill}/>
    </g>
  )
}

// Perched body, side view facing left: tail, body, folded wing, thick legs.
function PerchBody({ sway }) {
  return (
    <g>
      <g transform={`rotate(${sway} 56 78)`}>
        <path d="M 50.5 76 L 55.8 114.6 L 61.3 112.8 L 67.1 113 L 62.4 75 Z" fill={C.tail}/>
        <g clipPath="url(#sshTailP)">
          {[85, 94.5, 104].map(y => <rect key={y} x="40" y={y} width="40" height="4.2" fill={C.band} transform={`rotate(-8 60 ${y})`}/>)}
          <rect x="40" y="111.8" width="40" height="12" fill="#FFF" transform="rotate(-8 60 111.8)"/>
        </g>
      </g>
      <path d="M 37 37 C 30 47 30 63 39 75 C 43 80 49 83 56 82 C 62 76 64.5 61 62.5 47 C 61 39 56 34 49 34 C 44 34 40 35 37 37 Z" fill={C.breast}/>
      <g clipPath="url(#sshBreastP)">
        <rect x="28" y="34" width="20" height="14" fill="#E8A47A" opacity="0.55"/>
        <Bars x0={28} x1={60} y0={40} y1={78}/>
      </g>
      <path d="M 49 34 C 56 34 61 39 62.5 47 C 64.5 61 62 76 56 82 L 52 70 C 50 55 49 45 49 34 Z" fill={C.back}/>
      <path d="M 49.5 77 C 52 83 58 86 63 81 L 59.5 74 Z" fill={C.white}/>
      {/* short, rounded folded wing */}
      <path d="M 48.5 38 C 57 36.5 64 44 65.6 55 C 67 67 65 82 61.6 97 C 58 88 53.5 77 50.4 66 C 48 57 46.4 45 48.5 38 Z" fill="url(#sshWing)"/>
      <path d="M 51 50 C 55 48 59 49 62 52 M 52 60 C 56 58 60 59 64 62 M 54 72 C 57 70 61 71 64.6 74 M 57 82 C 59 81 62 82 64 84" stroke="#33415A" strokeWidth="0.8" fill="none" opacity="0.8"/>
      {/* barred trousers + pencil-thin yellow legs (the 'sharp shins') */}
      <path d="M 40 72 C 41 78 45 82 50 81 C 51 77 50 73 47 71 Z" fill={C.white}/>
      <path d="M 41 74.5 q 4 1.5 8 0 M 41.6 77.5 q 4 1.5 8 0" stroke={C.bar} strokeWidth="1.3" fill="none"/>
      <path d="M 49.8 80 L 50.4 88.4" stroke="#D9A622" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 45 79.5 L 44.4 88.6" stroke={C.yellow} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 44.4 88.6 L 39 89.4 M 44.4 88.6 L 47.5 90.6 M 50.4 88.4 L 54.6 89" stroke={C.yellow} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M 39 89.4 l -1.3 1.8 M 47.5 90.6 l 0.4 1.8 M 54.6 89 l 0.8 1.8" stroke="#111" strokeWidth="0.9" strokeLinecap="round"/>
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

// Flying, seen from below: tiny head barely past the wrists, short rounded wings, square tail.
const G_WING = 'M 54 42 C 45 37 35 33.5 25 33.6 C 16 34 8.5 39 5 44.5 C 2.5 48 2.8 52.5 5.5 55.5 C 10 61 20 66.5 32 69 C 40 70.5 48 70.5 54 69 Z'
const G_TRAIL = (o) => `M ${5.5 + o * 0.4} ${55.5 - o} C ${10} ${61 - o} 20 ${66.5 - o} 32 ${69 - o} C 40 ${70.5 - o} 48 ${70.5 - o} 54 ${69 - o}`
const G_BODY = 'M 53 35 C 49.5 44 50 62 54 74 L 66 74 C 70 62 70.5 44 67 35 C 64 32 56 32 53 35 Z'

function Glide({ flex }) {
  // Underwing: rusty-barred coverts, whitish flight feathers with gray bars, dusky hand + trailing edge.
  const Wing = () => (
    <g transform={`translate(0 41) scale(1 ${flex}) translate(0 -41)`}>
      <path d={G_WING} fill={C.underwing}/>
      <g clipPath="url(#sshWingG)">
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
      <path d="M 54.8 70 L 52 105.5 L 60 104.2 L 68 105.5 L 65.2 70 Z" fill={C.tailUnder}/>
      <g clipPath="url(#sshTailG)">
        {[78.5, 87.5, 96.5].map(y => <rect key={y} x="48" y={y} width="24" height="3.4" fill={C.bandUnder}/>)}
        <path d="M 48 103.6 L 60 102.3 L 72 103.6 L 72 110 L 48 110 Z" fill="#FFF"/>
      </g>
      <Wing/>
      <g transform="translate(120 0) scale(-1 1)"><Wing/></g>
      <path d={G_BODY} fill={C.breast}/>
      <g clipPath="url(#sshBodyG)">
        <rect x="50" y="35" width="20" height="12" fill="#E8A47A" opacity="0.55"/>
        <Bars x0={50} x1={70} y0={40} y1={66} gap={3}/>
      </g>
      <ellipse cx="60" cy="73" rx="7" ry="4.4" fill="#FFF"/>
      {/* small head barely projecting past the forward-pushed wrists */}
      <g transform="translate(60 33) scale(0.84) translate(-44 -28)"><HeadFront/></g>
    </g>
  )
}

// Rushing at prey, side view: wings thrown up and back, thin legs and talons forward.
function Pounce({ blink, lift }) {
  return (
    <g transform="translate(2 10) rotate(-26 60 60)">
      <g transform={`rotate(${lift - 14} 54 56) translate(54 56) scale(0.84) translate(-54 -56)`}>
        <path d="M 54 55 C 58 41 66 29 78 21 C 82 19 86 19.5 87.5 22.5 C 85 30 79 40 70 51 Z" fill={C.backDark}/>
      </g>
      <path d="M 67 56.5 L 99.5 53.8 L 98.6 59.6 L 99.5 65.4 L 67 64 Z" fill={C.tail}/>
      <g clipPath="url(#sshTailS)">
        {[76.5, 84.5, 92.5].map(x => <rect key={x} x={x} y="48" width="3.4" height="22" fill={C.band}/>)}
        <path d="M 97.8 48 L 96.9 59.6 L 97.8 72 L 110 72 L 110 48 Z" fill="#FFF"/>
      </g>
      <path d="M 31 58 C 37 47.5 56 46.5 71 53 C 74.5 58 73.5 64 68 67.5 C 58 72.5 42 72.5 34 66.5 Z" fill={C.breast}/>
      <g clipPath="url(#sshBodyS)"><Bars x0={28} x1={76} y0={55} y1={73}/></g>
      <path d="M 36 52.5 C 45 47.5 58 47 71 53 L 70 57.5 C 58 55 47 55 37 58 Z" fill={C.back}/>
      <path d="M 60 64 C 64 67 68 67 70 64 L 66 61 Z" fill="#FFF"/>
      {/* thighs + legs thrust forward, talons open */}
      <path d="M 40 61 C 38 66 41 70 46 70 C 50 69 51 65 49 62 Z" fill={C.white}/>
      <path d="M 40 64.5 q 4 1.4 9 0 M 41 67.5 q 4 1.4 8 0" stroke={C.bar} strokeWidth="1.2" fill="none"/>
      <path d="M 43 68 L 29 73.5" stroke={C.yellow} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M 29 73.5 L 23 71 M 29 73.5 L 23 76 M 29 73.5 L 26.5 79 M 29 73.5 L 33 77.5" stroke={C.yellow} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 23 71 l -1.4 0.6 M 23 76 l -1.2 1 M 26.5 79 l -0.6 1.4 M 33 77.5 l 0.4 1.4" stroke="#111" strokeWidth="0.9" strokeLinecap="round"/>
      <g transform="translate(-12 27)"><HeadSide blink={blink}/></g>
      <g transform={`rotate(${lift} 48 54) translate(46 57) scale(0.84) translate(-46 -57)`}>
        <path d="M 43 57 C 43.5 44 52 31 66 23 C 72 19 80 15 88 14.6 C 92 15 93.4 18 91.2 21 C 88.4 24.8 84.4 28 80.4 30.8 C 82.4 33 82.2 36 79.4 38.4 C 74 44 66 52 57 58 Z" fill="url(#sshWing)"/>
        <path d="M 72 26 C 78 22 85 18 91 18.5 C 92.6 19.5 92 21 91.2 21 C 88.4 24.8 84.4 28 80.4 30.8 C 77 31 74 29 72 26 Z" fill={C.backDark}/>
        <path d="M 52 45 C 58 42 64 42 70 44 M 56 51 C 62 48 68 48 74 50" stroke="#33415A" strokeWidth="0.8" fill="none"/>
      </g>
    </g>
  )
}

export default function SharpShinnedHawk({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
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
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Sharp-shinned Hawk">
      <defs>
        <linearGradient id="sshCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E3746"/><stop offset="100%" stopColor="#1A2029"/>
        </linearGradient>
        <linearGradient id="sshHood" x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#252D3A"/><stop offset="45%" stopColor="#38465C"/><stop offset="100%" stopColor="#5A6C8C"/>
        </linearGradient>
        <linearGradient id="sshWing" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6E82A0"/><stop offset="100%" stopColor="#45546E"/>
        </linearGradient>
        <clipPath id="sshTailP"><path d="M 50.5 76 L 55.8 114.6 L 61.3 112.8 L 67.1 113 L 62.4 75 Z"/></clipPath>
        <clipPath id="sshBreastP"><path d="M 37 37 C 30 47 30 63 39 75 C 43 80 49 83 56 82 C 62 76 64.5 61 62.5 47 C 61 39 56 34 49 34 C 44 34 40 35 37 37 Z"/></clipPath>
        <clipPath id="sshTailG"><path d="M 54.8 70 L 52 105.5 L 60 104.2 L 68 105.5 L 65.2 70 Z"/></clipPath>
        <clipPath id="sshWingG"><path d={G_WING}/></clipPath>
        <clipPath id="sshBodyG"><path d={G_BODY}/></clipPath>
        <clipPath id="sshTailS"><path d="M 67 56.5 L 99.5 53.8 L 98.6 59.6 L 99.5 65.4 L 67 64 Z"/></clipPath>
        <clipPath id="sshBodyS"><path d="M 31 58 C 37 47.5 56 46.5 71 53 C 74.5 58 73.5 64 68 67.5 C 58 72.5 42 72.5 34 66.5 Z"/></clipPath>
      </defs>
      {scene && (perched ? <Foliage/> : <Treeline/>)}
      {perched ? <g><Branch leaves={scene}/>{bird}</g> : bird}
    </svg>
  )
}
