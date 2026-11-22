// Northern Flicker, "Yellow-shafted" (adult male) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'northern_flicker', poses: ['probe', 'alert', 'flight', 'cling'] }

// Field marks: big ground-feeding woodpecker; GRAY CROWN & NAPE with a RED NAPE CRESCENT;
// warm TAN FACE and throat; BLACK MUSTACHE (male); slender, slightly DOWN-CURVED dark bill;
// bold BLACK CRESCENT BIB on the upper breast; creamy-buff underparts with round BLACK
// SPOTS; BROWN BACK & WINGS BARRED BLACK; long pointed black tail; YELLOW UNDERWING and
// YELLOW TAIL SHAFTS / undertail ("yellow-shafted"); WHITE RUMP flashing in flight.
// Habitat: probing lawns for ants (anthill in the scene); also clings to trunks.

const BLK = '#1C1714'
const GOLD = '#F2BE2A'
const BROWN = '#9A7350'

function Tail({ bend = 0, spread = false }) {
  return (
    <g transform={`rotate(${bend} 90 62)`}>
      {spread && <path d="M 90 60 C 102 58 112 56 119 56 C 116 60 116 63 118 66 C 108 66 98 66 90 64 Z" fill="#2A221C"/>}
      <path d="M 90 58 C 100 60 110 62.5 118.5 66.5 C 110 68.6 100 68.6 91 66 Z" fill={BLK}/>
      <path d="M 91 66 C 100 68.6 110 68.6 118.5 66.5 C 112 70.6 101 71.4 92.4 68.6 Z" fill={GOLD}/>
      <path d="M 92 61.8 L 116.5 66.2 M 93 64.4 L 113 67.6" stroke={GOLD} strokeWidth="0.75" opacity="0.9"/>
    </g>
  )
}

function Body() {
  const spots = []
  const rows = [[46, 69.5, 7, 6.2], [43, 74.5, 8, 6], [49, 79, 6, 6]]
  rows.forEach(([x0, y, n, dx], r) => { for (let i = 0; i < n; i++) spots.push(<circle key={`${r}-${i}`} cx={x0 + i * dx + (r % 2) * 2} cy={y + Math.sin(i) * 0.6} r={r === 0 ? 1.5 : 1.7} fill={BLK}/>) })
  return (
    <g>
      <path d="M 36 50 C 50 44 74 46 90 55 L 93 64 C 84 76 64 82 48 80 C 37 78 29 71 28 63 Z" fill="url(#nflBelly)"/>
      <g clipPath="url(#nflBodyClip)">{spots}</g>
      {/* barred brown back */}
      <path d="M 38 49 C 52 44 74 45.5 91 55 L 92 59 C 76 55.6 58 55 42 57.6 Z" fill={BROWN}/>
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M ${46 + i * 9} ${47.6 - (i < 2 ? i * 0.6 : -0.6 * (i - 2))} q -1.6 3 -0.6 6`} stroke={BLK} strokeWidth="1.4" fill="none" strokeLinecap="round"/>)}
    </g>
  )
}

function Rump({ big = false }) {
  return big
    ? <path d="M 78 50.5 C 86 50 93 53 97 58.6 L 89 61 C 86 57 82.6 55 78.4 54.4 Z" fill="#FFF"/>
    : <path d="M 83 52 C 88 52.6 92 55 94.6 58.4 L 90.6 59.2 C 88.4 57 86 55.6 83 55 Z" fill="#FFF"/>
}

function FoldedWing() {
  return (
    <g>
      <path d="M 46 55 C 60 50 80 52 99 61.5 C 90 65.5 72 68.5 55 66.5 C 49 65 45.5 60 46 55 Z" fill="url(#nflWing)"/>
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M ${53 + i * 7.6} ${53 + i * 0.7} q -2.4 6 -1.4 ${12 - i * 0.6}`} stroke={BLK} strokeWidth="1.6" fill="none" strokeLinecap="round"/>)}
      <path d="M 84 61 L 98 61.8 M 82 63.6 L 94 63.4" stroke={GOLD} strokeWidth="0.7" opacity="0.85"/>
      <path d="M 88 58.6 q -1.6 3 -1 6.4 M 94 60 q -1.2 2 -0.8 3.6" stroke={BLK} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function Head({ blink = false }) {
  // Profile facing left; centre (32,56).
  return (
    <g>
      <circle cx="32" cy="56" r="14" fill="url(#nflFace)"/>
      {/* gray crown & nape */}
      <path d="M 18.4 54 C 18.4 45 25 41.6 33 42 C 41 42.4 46.4 48 46 56.4 C 44 53 40 50.6 34 50 C 27 49.6 22 51 18.4 54 Z" fill="url(#nflCap)"/>
      {/* red nape crescent */}
      <path d="M 41.4 46.4 C 45.6 48.4 47.6 52.6 46.8 57.8 C 45.6 55 43.6 52.4 40.2 50.4 Z" fill="#D7232B"/>
      {/* black mustache (male) */}
      <path d="M 19.4 60.6 C 24 62.8 29 64.2 35.4 63.8 C 32.6 66.6 26.6 67 21 64.4 Z" fill={BLK}/>
      {blink
        ? <path d="M 23.4 55.6 Q 27 58 30.6 55.6" stroke="#120E0C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="27" cy="55.6" r="3.8" fill="#2A1C14"/>
            <circle cx="27" cy="55.6" r="2.5" fill="#0E0A08"/>
            <circle cx="25.6" cy="54.2" r="1.35" fill="#FFF"/>
            <circle cx="28.2" cy="57" r="0.55" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* slender, slightly decurved bill */}
      <path d="M 19.6 55.2 C 13 55.6 7 57.8 3.4 61.6 C 8 61.2 14 61 19.6 60.8 Z" fill="#33302E"/>
      <path d="M 19.6 58 C 14 58.6 8 60 4.6 61.2" stroke="#55504C" strokeWidth="0.5" fill="none"/>
    </g>
  )
}

function Bib() {
  // Black crescent across the upper breast, below the tan throat.
  return <path d="M 25.4 68.4 C 29 73.4 35.4 75.6 43 75 C 45 74.8 46.8 74.2 48.4 73.4 C 47.2 76.8 43.6 79 38 79.2 C 31 79.2 26.6 75 25.4 68.4 Z" fill={BLK}/>
}

function Standing({ blink, tailBend = 0, rumpBig = false }) {
  return (
    <g>
      <Tail bend={tailBend}/>
      <Body/>
      <Rump big={rumpBig}/>
      <FoldedWing/>
      <Head blink={blink}/>
      <Bib/>
    </g>
  )
}

function RaisedWing() {
  // Near wing raised on the upstroke, showing its underside: golden-yellow linings and
  // flight feathers with yellow shafts, darker gray-brown tips.
  const shafts = [[59, 30, 70, 6], [60, 32, 78, 6], [61, 34, 85, 10], [62, 37, 89, 18], [63, 40, 90, 27], [64, 44, 87, 37], [65, 48, 81, 47]]
  return (
    <g>
      <path d="M 48 56 C 48 44 52 32 58 22 C 62 14 66 8 70 4 C 77 3 83 5 87 9 C 91 14 92 21 91 28 C 90 36 85 44 79 50 C 76 53 73 55 70 57 Z" fill="url(#nflUnder)"/>
      <path d="M 70 4 C 77 3 83 5 87 9 C 91 14 92 21 91 28 C 90 36 85 44 79 50 C 78 51 77 52 76 52.6 C 81 44 84 36 84 27 C 84 18 79 9 70 4 Z" fill="#7A6448" opacity="0.75"/>
      {shafts.map(([x1, y1, x2, y2], i) => <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="#FFD84A" strokeWidth="0.9"/>)}
      <path d="M 48.4 56 C 48.4 46 52 36 57 28" stroke="#E8D49A" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {[[53, 46], [55, 40], [57.5, 34], [56, 52], [59, 45]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.1" fill={BLK}/>)}
    </g>
  )
}

function Flying({ up }) {
  return (
    <g>
      {up
        ? <path d="M 60 54 C 70 36 84 26 102 20 C 102 32 94 44 82 54 Z" fill="url(#nflWing)"/>
        : <path d="M 58 62 C 70 74 82 86 96 92 C 94 82 86 70 76 62 Z" fill="url(#nflWing)" opacity="0.9"/>}
      <Tail spread/>
      <Body/>
      <Rump big/>
      <Head/>
      <Bib/>
      {up
        ? <RaisedWing/>
        : <g transform="translate(0,118) scale(1,-0.62) translate(0,-6)"><RaisedWing/></g>}
    </g>
  )
}

function Lawn({ full, probe }) {
  if (!full) return <path d="M 26 104 C 50 101 80 101 106 104" stroke="#6E8F3E" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round"/>
  return (
    <g>
      <path d="M -2 100 C 30 96 70 98 122 95 L 122 132 L -2 132 Z" fill="url(#nflLawn)"/>
      <path d="M 6 104 l 1 -5 l 1 5 M 40 103 l 1.4 -5 l 0.8 5 M 72 104 l 1 -6 l 1 6 M 98 101 l 1 -5 l 1 5 M 112 106 l 1 -4 l 1 4 M 54 116 l 1 -5 l 1 5 M 20 120 l 1 -5 l 1 5 M 88 120 l 1 -5 l 1 5" stroke="#3E6A2A" strokeWidth="1" fill="none"/>
      <path d="M 66 112 C 62 108 64 104 70 104 C 72 108 70 111 66 112 Z" fill="#D9862E"/>
      <path d="M 100 118 C 98 113 102 110 107 111 C 107 116 104 118 100 118 Z" fill="#E7B23A"/>
      {/* anthill */}
      <path d={probe ? 'M 0 104 C 4 94 10 90 16 90 C 22 90 27 95 30 104 Z' : 'M 2 106 C 6 99 10 96 15 96 C 20 96 24 100 27 106 Z'} fill="#A9865E"/>
      <path d={probe ? 'M 4 99 q 3 -1 6 0 M 20 98 q 3 -1 5 1' : 'M 8 103 q 3 -1 5 0 M 17 101 q 3 -1 5 1'} stroke="#8A6A46" strokeWidth="0.8" fill="none"/>
      {(probe ? [[8, 95], [24, 97], [28, 101], [5, 101], [36, 105]] : [[11, 99], [21, 102], [30, 106]]).map(([x, y], i) => (
        <g key={i}><ellipse cx={x} cy={y} rx="0.9" ry="0.6" fill="#1A1210"/><ellipse cx={x + 1.3} cy={y + 0.2} rx="0.7" ry="0.5" fill="#1A1210"/></g>
      ))}
    </g>
  )
}

function Trunk({ full }) {
  if (!full) return <path d="M 36 56 C 38 80 39 104 38 128 L 44 128 C 45 104 44 80 42 56 Z" fill="#6E5A48" opacity="0.55"/>
  return (
    <g>
      <path d="M -2 -2 L 40 -2 C 43 40 44 90 42 132 L -2 132 Z" fill="url(#nflBark)"/>
      <path d="M 8 4 C 10 30 9 56 11 80 C 12 98 10 114 12 132 M 22 -2 C 24 22 22 44 25 66 C 27 86 24 108 26 132" stroke="#4A3A2E" strokeWidth="1.4" fill="none" opacity="0.75"/>
      <path d="M 15 20 q 3 6 0 12 M 30 46 q 3 5 0 10 M 16 92 q 3 6 0 12" stroke="#3A2C22" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M 38 -2 C 41 40 42 90 40 132" stroke="#9C8670" strokeWidth="1.6" fill="none" opacity="0.7"/>
      <ellipse cx="18" cy="70" rx="4" ry="2.6" fill="#9FB49A" opacity="0.8"/>
      <path d="M 42 112 C 60 112 82 116 104 122 L 122 124" stroke="#5C4838" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      <path d="M 90 119 C 88 112 91 106 97 104 C 99 110 96 116 90 119 Z" fill="#D9862E"/>
      <path d="M 104 122 C 108 116 114 114 118 116 C 116 121 110 124 104 122 Z" fill="#E7B23A"/>
    </g>
  )
}

export default function NorthernFlicker({ size = 120, animated = false, style = {}, pose = 'probe', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'flight' ? 200 : 420); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 6
  const legs = 'M 0 0 L -1 9 M -1 9 l -4 1.4 M -1 9 l 3 1.6'

  let bird
  if (pose === 'flight') {
    // Bounding flight: raised wing flashes yellow beneath, the white rump shows on top.
    bird = <g transform={`translate(0,${2 + bob}) translate(60,80) scale(0.9) translate(-60,-80)`}><Flying up={!animated || frame < 4}/></g>
  } else if (pose === 'alert') {
    bird = (
      <g>
        <g stroke="#6A6E76" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d={legs} transform="translate(56,92)"/><path d={legs} transform="translate(63,91)"/>
        </g>
        <g transform={`translate(2,${8 + bob * 0.5}) translate(60,80) rotate(26) scale(0.9) translate(-60,-80)`}><Standing blink={blink} tailBend={6}/></g>
      </g>
    )
  } else if (pose === 'cling') {
    bird = (
      <g>
        <g stroke="#6A6E76" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M 50 70 L 43 69 l -2 -4 M 43 69 l -2 3"/><path d="M 51 78 L 44 79 l -2 -3.6 M 44 79 l -2 3"/>
        </g>
        <g transform={`translate(-17,${-16 + bob * 0.5}) translate(60,80) rotate(80) scale(0.9) translate(-60,-80)`}><Standing blink={blink} tailBend={22}/></g>
      </g>
    )
  } else {
    // Probing the anthill: bill down, tail level, a few ants scattering.
    const dip = animated ? [0, 1, 2, 1, 0, 0, 0, 0][frame] : 0
    bird = (
      <g>
        <g stroke="#6A6E76" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d={legs} transform="translate(66,90)"/><path d={legs} transform="translate(73,90)"/>
        </g>
        <g transform={`translate(12,8) translate(60,80) rotate(${-24 - dip}) scale(0.94) translate(-60,-80)`}><Standing blink={blink}/></g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Northern Flicker">
      <defs>
        <clipPath id="nflBodyClip"><path d="M 36 50 C 50 44 74 46 90 55 L 93 64 C 84 76 64 82 48 80 C 37 78 29 71 28 63 Z"/></clipPath>
        <linearGradient id="nflBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFDDBE"/><stop offset="100%" stopColor="#FAF1E0"/>
        </linearGradient>
        <linearGradient id="nflWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A88260"/><stop offset="100%" stopColor="#7E5E40"/>
        </linearGradient>
        <radialGradient id="nflFace" cx="0.35" cy="0.6" r="0.7">
          <stop offset="0%" stopColor="#E8C69C"/><stop offset="100%" stopColor="#D2A676"/>
        </radialGradient>
        <linearGradient id="nflCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9EA2AA"/><stop offset="100%" stopColor="#7C8088"/>
        </linearGradient>
        <linearGradient id="nflUnder" x1="0" y1="1" x2="0.6" y2="0">
          <stop offset="0%" stopColor="#F6CE3C"/><stop offset="100%" stopColor="#E9AE22"/>
        </linearGradient>
        <linearGradient id="nflLawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FA64A"/><stop offset="100%" stopColor="#557E34"/>
        </linearGradient>
        <linearGradient id="nflBark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5A4636"/><stop offset="70%" stopColor="#7A6450"/><stop offset="100%" stopColor="#8C7660"/>
        </linearGradient>
      </defs>
      {pose === 'cling' ? <Trunk full={scene}/> : pose === 'flight' ? (scene && <Lawn full probe={false}/>) : <Lawn full={scene} probe={pose === 'probe'}/>}
      {bird}
    </svg>
  )
}
