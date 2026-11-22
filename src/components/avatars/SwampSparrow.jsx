// Swamp Sparrow (adult) — new-style avatar, in its cattail marsh.
// Follows the WoodDuck.jsx template: meta export, viewBox 0 0 120 130, unique "sws" ids,
// scene backdrop optional, gentle idle (blink + breathing bob), field marks listed below.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'swamp_sparrow', poses: ['cattail', 'wade'] }

// Field marks (the acceptance test — each must be visible):
//  • bright RUSTY WINGS (the reddest wings of any NE sparrow; no bold wing bars)
//  • RUSTY CAP with fine dark streaks (breeding; duller/streakier in fall)
//  • GRAY FACE and eyebrow, with a dark line BEHIND the eye only and a thin dark whisker
//  • crisp WHITE THROAT
//  • dusky-GRAY, essentially UNSTREAKED breast (vs Song Sparrow's heavy streaks + spot)
//  • warm buffy-brown flanks; brown back streaked black; rounded rusty-brown tail
//  • habitat: cattails and reeds over shallow water

const C = {
  cap: '#93401C', capHi: '#B1552A', capStreak: '#3A1C10', face: '#A2A6A5', brow: '#B9BDBB',
  post: '#4A3222', throat: '#F4F3EE', breast: '#8F9593', flank: '#C29368', belly: '#E7E5DE',
  back: '#7A5434', backDk: '#24180F', rust: '#9A4120', rustHi: '#B4582C', wingDk: '#2E1E14',
  tail: '#6E3A20', bill: '#3A3432', leg: '#C79478',
}

function Tail() {
  // medium-length, rounded, rusty-brown
  return (
    <g>
      <path d="M 79 80 C 89 86 99 92 108 100 C 109 103 107 106 103 106 C 94 100 85 94 76 89 Z" fill={C.tail}/>
      <path d="M 81 83 C 90 89 98 95 105 102" stroke="#9A5634" strokeWidth="0.8" fill="none"/>
    </g>
  )
}

function Body({ breath = 0 }) {
  return (
    <g>
      {/* underparts: dusky gray breast (unstreaked), whitish belly */}
      <path d={`M 31 63 C 35 56 46 55 56 57 C 72 60 86 68 88 78 C 89 88 78 ${95 + breath} 63 ${95 + breath} C 47 ${95 + breath} 34 88 31 77 C 30 72 29 67 31 63 Z`} fill="url(#swsBelly)"/>
      {/* warm buffy-brown flanks */}
      <path d={`M 50 86 C 58 84 70 82 84 82 C 82 90 74 ${94 + breath} 63 ${95 + breath} C 57 ${95 + breath} 52 92 50 86 Z`} fill={C.flank} opacity="0.6"/>
      <path d="M 58 87 q 6 -1 12 -1 M 62 91 q 5 -1 10 -2" stroke="#A8784E" strokeWidth="0.8" fill="none" opacity="0.7"/>
      {/* mantle: brown streaked black */}
      <path d="M 44 58 C 56 52 74 55 86 67 C 88 70 88 73 87 75 C 76 66 62 61 50 62 Z" fill={C.back}/>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M ${54 + i * 7} ${57.5 + i * 1.6} q 4 2 6 5`} stroke={C.backDk} strokeWidth="1.5" fill="none" strokeLinecap="round"/>)}
      <Wing/>
    </g>
  )
}

function Wing() {
  // folded wing: bright rusty coverts and feather edges, black-centred tertials
  return (
    <g>
      <path d="M 50 63 C 60 59 74 62 84 70 C 91 76 95 82 98 89 C 88 91 74 89 63 84 C 54 80 49 72 50 63 Z" fill="url(#swsWing)"/>
      <path d="M 53 65 C 60 63 67 65 72 68 M 55 70 C 62 69 68 71 73 74" stroke={C.rustHi} strokeWidth="1.1" fill="none" opacity="0.8"/>
      <path d="M 65 72 C 73 74 81 79 87 86 C 79 87 71 85 65 82 Z" fill={C.wingDk}/>
      <path d="M 65 72 C 73 74 81 79 87 86" stroke={C.rustHi} strokeWidth="1.4" fill="none"/>
      <path d="M 69 77 C 76 79 82 83 89 88" stroke={C.rustHi} strokeWidth="1.1" fill="none"/>
      <path d="M 84 80 C 89 83 94 86 98 89 C 93 90 88 89 84 87 Z" fill={C.wingDk}/>
      <path d="M 85 82 C 89 84 93 87 97 89" stroke={C.rust} strokeWidth="0.8" fill="none"/>
    </g>
  )
}

function Head({ blink = false, open = false }) {
  return (
    <g>
      {/* gray face */}
      <path d="M 24 50 C 23 38 33 32 42 33 C 52 34 58 42 57 52 C 56 60 49 65 41 65 C 31 65 25 58 24 50 Z" fill={C.face}/>
      {/* WHITE THROAT, edged by a thin dark whisker (malar) */}
      <path d="M 25.5 54.5 C 28 60 34 65 42 65 C 45 65 47.5 64.4 49 63.4 C 43 62 37 59.5 32.5 56.2 C 30 55.4 27.6 54.8 25.5 54.5 Z" fill={C.throat}/>
      <path d="M 27.5 55.2 C 32 57 37 59.6 42 61.4" stroke="#5A4436" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      {/* RUSTY CAP with fine dark streaks */}
      <path d="M 25 45 C 26 36 34 31.5 42 32 C 51 32.5 57 39 58 46.5 C 51 42 43 40.5 36 41.2 C 31 41.8 27.5 43.4 25 45 Z" fill="url(#swsCap)"/>
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M ${31 + i * 5} ${38 - (i === 2 ? 2.5 : i === 1 || i === 3 ? 1.8 : 0)} l 2.2 1.2`} stroke={C.capStreak} strokeWidth="0.9" strokeLinecap="round" opacity="0.75"/>)}
      {/* gray eyebrow (no white, no yellow) */}
      <path d="M 25 46.4 C 31 42.8 41 41.6 48 42.8 C 52.5 43.6 56 45.2 58.2 47 L 57.6 49.6 C 52 47 44 45.8 37 46 C 32 46.2 28 47.4 25.2 48.8 Z" fill={C.brow}/>
      {/* dark line BEHIND the eye only (lores stay gray) */}
      <path d="M 39 50 C 45 49.8 51.5 50.8 57 53 L 56.3 55 C 50.5 53.2 45 52.4 39 52.4 Z" fill={C.post}/>
      {blink
        ? <path d="M 33 50 Q 36.5 52 40 50" stroke="#151110" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="36.5" cy="50" r="3.8" fill="#120E0C"/>
            <circle cx="35.2" cy="48.7" r="1.35" fill="#FFF"/>
            <circle cx="37.6" cy="51.4" r="0.55" fill="#FFF" opacity="0.7"/>
          </g>}
      {open
        ? <g>
            <path d="M 26 46.6 C 23 46.8 20 47.2 17.4 47.8 L 26 50.6 Z" fill={C.bill}/>
            <path d="M 26 51.6 L 19 55.4 C 21.5 55.4 24 55 26.2 54.4 Z" fill="#7C7470"/>
            <path d="M 26 50.4 L 19.5 50.6 L 26 51.8 Z" fill="#E7A6A0"/>
          </g>
        : <g>
            <path d="M 26 46.6 C 22.5 47.4 19.4 49 17.4 51 C 20 52.8 23 53.9 26.2 54.4 Z" fill={C.bill}/>
            <path d="M 26 51.1 L 18 51.2 C 20.5 52.9 23 53.9 26.2 54.4 Z" fill="#7C7470"/>
          </g>}
    </g>
  )
}

function Legs({ y = 101 }) {
  return (
    <g stroke={C.leg} strokeWidth="1.8" strokeLinecap="round" fill="none">
      <path d={`M 54 91 L 52 ${y}`}/><path d={`M 62 92 L 62 ${y}`}/>
      <path d={`M 52 ${y} l -5 1.5 M 52 ${y} l 1 2.6 M 52 ${y} l 4 1.2 M 62 ${y} l -5 1.5 M 62 ${y} l 1 2.6 M 62 ${y} l 4 1.2`} strokeWidth="1.3"/>
    </g>
  )
}

function FlyWings({ up }) {
  if (up) return (
    <g>
      <path d="M 50 66 C 50 52 54 40 61 30 C 66 22 72 14 80 8 C 82 10 84 12 85 14 C 87 15 89 18 90 21 C 92 23 93 26 93 30 C 94 33 94 36 92 39 C 90 44 88 48 86 52 C 84 56 82 60 78 64 C 74 67 70 69 66 70 Z" fill={C.wingDk}/>
      <path d="M 66 36 L 82 11 M 70 39 L 88 18 M 74 42 L 92 28 M 78 45 L 92 38 M 80 50 L 87 51 M 77 57 L 82 60" stroke={C.rust} strokeWidth="1.1" fill="none"/>
      <path d="M 50 66 C 50 54 54 44 60 35 C 66 36 74 40 80 46 C 78 54 74 62 66 70 Z" fill="url(#swsWing)"/>
      <path d="M 54 60 C 56 53 59 47 63 41 M 60 64 C 63 57 67 51 72 45" stroke={C.rustHi} strokeWidth="1" fill="none" opacity="0.8"/>
    </g>
  )
  return (
    <g>
      <path d="M 52 66 C 58 70 66 74 76 76 C 82 80 86 86 88 94 C 85 96 82 96 80 95 C 79 98 76 100 73 100 C 72 102 69 103 66 102 C 62 94 58 84 52 74 Z" fill={C.wingDk}/>
      <path d="M 70 84 L 84 94 M 68 88 L 78 98 M 65 90 L 70 100" stroke={C.rust} strokeWidth="1.1"/>
      <path d="M 52 66 C 58 70 66 74 74 76 C 72 82 68 86 62 88 C 58 82 54 76 52 70 Z" fill="url(#swsWing)"/>
    </g>
  )
}

function Cattail({ x, top, h = 14, lean = 0, dark = false }) {
  const col = dark ? '#5A3A22' : '#6E4528'
  return (
    <g>
      <path d={`M ${x} 130 C ${x} ${top + 30} ${x + lean * 0.6} ${top + 16} ${x + lean} ${top + h}`} stroke="#6E8A44" strokeWidth="1.6" fill="none"/>
      <rect x={x + lean - 2.6} y={top} width="5.2" height={h} rx="2.6" fill={col}/>
      <path d={`M ${x + lean} ${top} l 0 -6`} stroke="#8A7A50" strokeWidth="0.9"/>
    </g>
  )
}

function Scene({ pose }) {
  const water = (
    <g>
      <path d="M 0 112 Q 20 110 40 112 T 80 112 T 120 112 L 120 130 L 0 130 Z" fill="url(#swsWater)"/>
      <path d="M 12 118 q 6 -1.5 12 0 M 70 121 q 8 -2 16 0 M 96 116 q 6 -1.5 12 0" stroke="#A8D0DA" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round"/>
    </g>
  )
  const blades = (
    <g fill="none" strokeLinecap="round">
      <path d="M 6 130 C 8 110 6 92 2 76 M 14 130 C 15 112 18 98 24 86 M 104 130 C 104 112 108 96 116 84 M 112 130 C 112 116 112 104 110 92" stroke="#5E8A3E" strokeWidth="2"/>
      <path d="M 94 130 C 96 118 98 110 102 102" stroke="#7FA250" strokeWidth="1.6"/>
    </g>
  )
  if (pose === 'wade') {
    return (
      <g>
        <Cattail x={10} top={40} dark/><Cattail x={108} top={34} lean={2}/><Cattail x={98} top={52} h={12} dark/>
        {blades}
        <path d="M 0 104 C 30 101 80 101 120 104 L 120 108 L 0 108 Z" fill="#6A5A40"/>
        <path d="M 0 106 Q 20 104 40 106 T 80 106 T 120 106 L 120 130 L 0 130 Z" fill="url(#swsWater)"/>
        <path d="M 46 108 q 6 -1.5 12 0 q 6 1.5 12 0 M 40 112 q 10 -2 20 0 q 10 2 22 0" stroke="#CDEAF2" strokeWidth="0.9" fill="none" opacity="0.7" strokeLinecap="round"/>
      </g>
    )
  }
  if (pose === 'fly') {
    return <g opacity="0.95">{water}<Cattail x={12} top={78} dark/><Cattail x={104} top={86} lean={-2}/>{blades}</g>
  }
  // cattail & sing: perched on a bent cattail stalk over water
  return (
    <g>
      {water}
      <Cattail x={10} top={50} dark/><Cattail x={110} top={44} lean={-2}/>
      {blades}
      <path d="M 26 130 C 32 116 40 106 54 102 C 70 98 88 96 104 90" stroke="#7E9A4E" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {pose === 'sing' && <Cattail x={92} top={60} h={13}/>}
    </g>
  )
}

export default function SwampSparrow({ size = 120, animated = false, style = {}, pose = 'cattail', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 10), 400); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.6, 0.4, 0, 0][frame] : 0
  const blink = animated && frame === 6
  const flapUp = !animated || frame % 2 === 0

  let bird
  if (pose === 'sing') {
    // throws its head back for a slow, sweet "weet-weet-weet" trill
    bird = (
      <g>
        <Tail/><Body breath={bob}/><Legs/>
        <g transform="rotate(-30 46 60)"><Head blink={blink} open/></g>
        {[0, 1, 2].map(i => <path key={i} d={`M ${18 - i * 3} ${30 - i * 5} q 3 -2 6 0`} stroke="#F4F0E6" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity={animated ? (frame + i) % 3 === 0 ? 0.95 : 0.4 : 0.75}/>)}
      </g>
    )
  } else if (pose === 'wade') {
    // feeds at the water's edge, often wading in and dipping its bill for aquatic insects
    const dip = animated && frame % 5 === 2 ? 3 : 0
    bird = (
      <g>
        <g transform="translate(0,7) rotate(-14 62 95)"><Tail/><Body breath={bob}/></g>
        <g stroke={C.leg} strokeWidth="1.8" strokeLinecap="round" fill="none"><path d="M 56 98 L 55 107 M 64 98 L 65 107"/></g>
        <g transform={`translate(4,${21 + dip}) rotate(${-38 - dip * 2} 46 64)`}><Head blink={blink}/></g>
      </g>
    )
  } else if (pose === 'fly') {
    // short, low, fluttering flight over the reeds with tail pumping
    bird = (
      <g transform="rotate(-4 60 70) translate(0,-8)">
        <g transform="translate(-9,4) rotate(-10 52 66)"><path d="M 50 66 C 50 52 54 40 61 30 C 66 22 72 14 80 8 C 86 14 92 24 93 32 C 92 44 86 56 78 64 Z" fill="#2A1A10"/></g>
        <Tail/><Body breath={0}/>
        <path d="M 54 92 L 60 96 M 60 93 L 66 96" stroke={C.leg} strokeWidth="1.6" strokeLinecap="round"/>
        <Head blink={blink}/>
        <FlyWings up={flapUp}/>
      </g>
    )
  } else {
    bird = <g transform="rotate(-6 58 100)"><Tail/><Body breath={bob}/><Legs/><Head blink={blink}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Swamp Sparrow">
      <defs>
        <linearGradient id="swsCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.capHi}/><stop offset="100%" stopColor={C.cap}/>
        </linearGradient>
        <linearGradient id="swsWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.rustHi}/><stop offset="100%" stopColor={C.rust}/>
        </linearGradient>
        <linearGradient id="swsBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.breast}/><stop offset="50%" stopColor="#A7ACAA"/><stop offset="90%" stopColor={C.belly}/>
        </linearGradient>
        <linearGradient id="swsWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A7E8C" stopOpacity="0.85"/><stop offset="100%" stopColor="#25505E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {scene && <Scene pose={pose}/>}
      {!scene && pose !== 'fly' && <ellipse cx="58" cy={pose === 'wade' ? 107 : 103} rx="22" ry="2.4" fill="#000" opacity="0.18"/>}
      <g transform={`translate(0,${pose === 'fly' ? bob * 2 : 0})`}>{bird}</g>
    </svg>
  )
}
