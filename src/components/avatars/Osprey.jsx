// Osprey (adult) — "accurate first, cute second, in habitat". Follows WoodDuck.jsx conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'osprey', poses: ['perch', 'fish'] }

// Field marks: dark chocolate-brown upperparts; clean white underparts; white head with a bold
// dark eye-stripe running through the yellow eye back to the nape and down the neck side;
// slightly shaggy nape crest; dark hooked bill with blue-gray cere; pale blue-gray feet.
// In flight: long, narrow wings with a distinct crook at the wrist ("gull-wing" M), white
// underwing coverts with dark carpal (wrist) patches, barred gray flight feathers with dark
// tips, banded tail. Fish carried head-first in the talons.

const BROWN = '#3A2A1C'
const DARK = '#2A1E14'
const FOOT = '#AFC0CC'

// Side-profile head (facing left), centred on (0,0). Bill tip near x=-21.
function Head({ blink = false }) {
  return (
    <g>
      {/* shaggy nape crest */}
      <path d="M 3 -9 L 15 -12 L 12 -7.5 L 19 -7 L 13.5 -3.5 L 19 -0.5 L 11 1 Z" fill="#F4F1EA"/>
      <path d="M 8 -9.5 L 15 -12 M 12 -5.6 L 19 -7 M 12.5 -1.6 L 19 -0.5" stroke="#7A6450" strokeWidth="0.8" strokeLinecap="round"/>
      <ellipse cx="0" cy="0" rx="12.5" ry="11.5" fill="url(#ospHead)"/>
      <path d="M -2 -10 l 2 3 M 3 -10 l 2 3 M 7 -8 l 2 2.5" stroke="#8A7460" strokeWidth="0.7" strokeLinecap="round" opacity="0.7"/>
      {/* bold dark eye-stripe: lores → eye → nape → down the neck side */}
      <path d="M -11.6 -2 C -6 -3.8 1 -3.4 7 -1 C 12 1 15.5 4.5 16.5 11 L 10 12.5 C 8.6 7.6 5.2 5 0 4.2 C -4.6 3.8 -8.8 2.8 -11.6 1.6 Z" fill={DARK}/>
      {blink
        ? <path d="M -7 -0.2 Q -3.3 1.8 0.4 -0.2" stroke="#F4F1EA" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="-3.3" cy="-0.3" r="4" fill="#F6CC1E"/>
            <circle cx="-3.3" cy="-0.3" r="2.1" fill="#120C06"/>
            <circle cx="-4.7" cy="-1.7" r="1.2" fill="#FFF"/>
          </g>}
      {/* hooked bill + blue-gray cere */}
      <path d="M -10.5 -3.8 C -15.6 -4.4 -19.8 -1.8 -20.8 2.6 C -21.2 4.9 -20 6.8 -18.5 6.5 C -18.7 4.4 -17.5 2.9 -15.3 2.8 L -10.5 3.4 Z" fill="#1F1E22"/>
      <path d="M -10.5 -3.8 C -12.6 -4 -14.2 -3.4 -15 -2.4 L -14.4 1.4 L -10.5 2.2 Z" fill="#7C8A98"/>
    </g>
  )
}

// Soaring planform from below, right half (mirror for left). Body centre x=60.
// Long narrow wing pushed forward to the wrist, hand swept back and down → the gull-wing M.
function HalfWingBelow({ flex = 0 }) {
  const w = 40 + flex, t = 58 + flex * 1.5 // wrist y, wingtip y
  const fingers = `L 117 ${t + 1} L 113 ${t + 2.5} L 115.5 ${t + 5} L 110.5 ${t + 5.5} L 112 ${t + 8.5} L 106.5 ${t + 7.5}`
  return (
    <g>
      <path d={`M 64 54 C 72 49 80 ${w + 3} 86 ${w} C 95 ${w + 3} 106 ${t - 5} 114 ${t - 2} ${fingers} C 101 ${t + 6} 95 ${w + 16} 89 ${w + 16} C 81 ${w + 16} 72 63 64 66 Z`} fill="#D9DBDD"/>
      {/* barring on the flight feathers */}
      {[[68, 61.4, 63.4], [74, 58.6, 61], [80, 55, 58], [86, 52, 55.4], [92, 51.6, 55.4], [98, 51, 58], [102.5, 51.4, 60.6]].map(([x, a, b], i) => {
        const d = flex * Math.min(1.5, (x - 64) / 22)
        return <path key={i} d={`M ${x} ${a + d} L ${x + 1} ${b + d}`} stroke="#9A9EA6" strokeWidth="1.1" opacity="0.9" strokeLinecap="round"/>
      })}
      {/* dark primary tips + trailing edge */}
      <path d={`M 105 ${t - 3} C 109 ${t - 2} 112 ${t - 2} 114 ${t - 2} ${fingers} C 105 ${t + 3} 104.5 ${t} 105 ${t - 3} Z`} fill="#2E2620"/>
      <path d={`M 106.5 ${t + 7.5} C 101 ${t + 6} 95 ${w + 16} 89 ${w + 16} C 81 ${w + 16} 72 63 64 66`} stroke="#3E332A" strokeWidth="1.6" fill="none"/>
      {/* white coverts, dark carpal patch, dusky greater-covert bar */}
      <path d={`M 64 54 C 72 49 80 ${w + 3} 86 ${w} C 92 ${w + 1.5} 98 ${w + 5} 103 ${w + 8} C 96 ${w + 9} 90 ${w + 9} 85 ${w + 10} C 78 ${w + 11} 70 59 64 60 Z`} fill="#FBFBF7"/>
      <path d={`M 66 60 C 72 59 78 ${w + 11} 86 ${w + 9.6}`} stroke="#6A5A4C" strokeWidth="1.4" fill="none" opacity="0.8" strokeLinecap="round"/>
      <ellipse cx="88.5" cy={w + 5} rx="6" ry="3.4" transform={`rotate(14 88.5 ${w + 5})`} fill="#2A1E14"/>
      <path d={`M 64 54 C 72 49 80 ${w + 3} 86 ${w} C 95 ${w + 3} 106 ${t - 5} 114 ${t - 2}`} stroke="#6A5848" strokeWidth="1" fill="none"/>
    </g>
  )
}

// Raised wing from the front, right half (mirror for left): white coverts + carpal patch on top
// of barred gray flight feathers, dark-tipped fingers.
function HalfWingRaised({ tilt = 0 }) {
  return (
    <g transform={`rotate(${tilt} 66 54) translate(66,54) scale(0.86) translate(-66,-54)`}>
      <path d="M 66 52 C 72 42 78 34 84 27 C 88 20 92 13 96 7 L 100 10 L 101 6 L 104 12 L 106.5 9 L 107 15.5 L 110 15 L 108 21 C 104 31 99 40 93 48 C 87 56 77 62 68 64 Z" fill="#D9DBDD"/>
      {[[80, 56], [88.5, 47], [94, 37.5], [97.5, 28], [99.5, 19.5]].map(([x, y], i) => <path key={i} d={`M ${x - 3.4} ${y - 2} L ${x + 3.4} ${y + 2}`} stroke="#8A8E96" strokeWidth="1.3" opacity="0.9" strokeLinecap="round"/>)}
      <path d="M 96 7 L 100 10 L 101 6 L 104 12 L 106.5 9 L 107 15.5 L 110 15 L 108 21 C 104 20 100 17 96 7 Z" fill="#2E2620"/>
      <path d="M 108 21 C 104 31 99 40 93 48 C 87 56 77 62 68 64" stroke="#3E332A" strokeWidth="1.6" fill="none"/>
      <path d="M 66 52 C 72 42 78 34 84 27 C 87 23 89 19 91 15 C 91 26 89 38 85 46 C 80 52 74 56 68 58 Z" fill="#FBFBF7"/>
      <ellipse cx="86" cy="27" rx="5.6" ry="3.4" transform="rotate(-58 86 27)" fill="#2A1E14"/>
      <path d="M 66 52 C 72 42 78 34 84 27 C 88 20 92 13 96 7" stroke="#6A5848" strokeWidth="1" fill="none"/>
    </g>
  )
}

function BodyFront({ y = 0 }) {
  return (
    <g transform={`translate(0,${y})`}>
      <path d="M 55 84 L 51 99 C 56 101.5 64 101.5 69 99 L 65 84 Z" fill="#E6E4DE"/>
      <path d="M 53.2 90 L 66.8 90 M 52.2 95 L 67.8 95" stroke="#7A6A5A" strokeWidth="1.3"/>
      <path d="M 51 99 C 56 101.5 64 101.5 69 99" stroke="#3E332A" strokeWidth="1.4" fill="none"/>
      <ellipse cx="60" cy="66" rx="9.5" ry="21" fill="url(#ospBelly)"/>
    </g>
  )
}

// Side-on body in flight (facing left). Chest ~ (0,0), tail toward +x.
function BodySide() {
  return (
    <g>
      <path d="M 26 -3 C 34 -3 43 -2 49 0 C 51.5 2.5 51.5 6.5 49 9 C 41 8.5 33 7 26 6 Z" fill="#5A4636"/>
      <path d="M 35 -2 L 34.4 7 M 42.5 -0.6 L 42 7.8" stroke={DARK} strokeWidth="1.4"/>
      <path d="M -13 -4 C -4 -11 16 -11 28 -5 L 28 6 C 16 12.5 -2 13.5 -13 6 Z" fill="url(#ospBelly)"/>
      <path d="M -13 -4 C -4 -11 16 -11 28 -5 L 28 -0.5 C 16 -3.5 0 -3.5 -13 -1 Z" fill="url(#ospBack)"/>
    </g>
  )
}

function FishSide() {
  return (
    <g>
      <path d="M -12 0 C -7 -4.6 8 -5.4 19 -1.2 L 27 -5.6 L 25 0.8 L 28 6.4 L 19 2.2 C 8 5.6 -7 4.6 -12 0 Z" fill="url(#ospFishSide)"/>
      <path d="M -11 0.6 C -6 2.2 2 2.6 12 1.8" stroke="#EEF6F6" strokeWidth="0.8" fill="none"/>
      <path d="M -5.6 -3 C -4.6 -1 -4.6 1 -5.6 3" stroke="#4E6A76" strokeWidth="0.7" fill="none"/>
      <circle cx="-8.6" cy="-0.9" r="1.1" fill="#141414"/><circle cx="-8.9" cy="-1.2" r="0.35" fill="#FFF"/>
      <path d="M 3 -4.4 L 7 -7.4 L 11 -3.8 Z" fill="#5E7A86"/>
    </g>
  )
}

function Snag({ full }) {
  return (
    <g>
      {full && <path d="M 99 130 C 99 112 97 98 95 86 L 103 84 C 105 98 107 114 109 130 Z" fill="#8C7E70"/>}
      <path d={full ? 'M 2 99 C 30 94 70 91 104 85 L 105 90 C 72 96 34 100 4 104 Z' : 'M 26 96.4 C 48 94 70 92 92 89 L 93 93.4 C 72 96 50 98 28 100.6 Z'} fill="url(#ospSnag)"/>
      <path d={full ? 'M 18 100.4 C 40 97 60 95 80 92 M 46 99 C 62 97 78 95 94 92' : 'M 36 98 C 52 96.4 68 94.8 84 92.6'} stroke="#6A5E52" strokeWidth="0.7" fill="none" opacity="0.8"/>
      {full && <path d="M 16 100 C 12 93 11 87 13 81 L 15.5 81.6 C 14 87 15 93 19 99 Z" fill="#9A8C7E"/>}
    </g>
  )
}

function Water({ y = 112, ripple = 0 }) {
  return (
    <g>
      <path d={`M 0 ${y} Q 15 ${y - 2} 30 ${y} T 60 ${y} T 90 ${y} T 120 ${y} L 120 130 L 0 130 Z`} fill="url(#ospWater)"/>
      <path d={`M ${14 + ripple} ${y + 5} q 8 -2 16 0 M ${62 - ripple} ${y + 9} q 10 -2 20 0 M ${88 + ripple} ${y + 4} q 6 -1.5 12 0`} stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
    </g>
  )
}

// Distant pine shoreline behind open water.
function Shore() {
  return <path d="M 0 113 L 0 104 L 4 104 L 7 97 L 10 104 L 14 104 L 18 94 L 22 104 L 26 103 L 29 99 L 32 104 L 120 107 L 120 113 Z" fill="#3E6A58" opacity="0.6"/>
}

export default function Osprey({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.6, -1, -0.6, 0, 0.5, 0.8, 0.5][frame] : 0
  const flap = animated ? [0, 1.5, 3, 4, 3, 1.5, 0, -1][frame] : 0
  const blink = animated && frame === 5
  const ripple = animated ? [0, 1, 2, 3, 2, 1, 0, -1][frame] : 0
  const openWater = scene && <g><Shore/><Water y={112} ripple={ripple}/></g>

  let bird, backdrop = null, fore = null
  if (pose === 'soar') {
    // Gliding overhead in the classic gull-winged M: crooked wrists, dark carpal patches.
    backdrop = openWater
    bird = (
      <g transform={`translate(0,${bob - 4})`}>
        <HalfWingBelow flex={bob * 0.8}/>
        <g transform="translate(120,0) scale(-1,1)"><HalfWingBelow flex={bob * 0.8}/></g>
        <BodyFront/>
        <path d="M 56 84 C 56 88 58 90 60 90 C 62 90 64 88 64 84" fill={FOOT}/>
        <g transform="translate(60,40) rotate(-6) scale(0.92)"><Head blink={blink}/></g>
      </g>
    )
  } else if (pose === 'hover') {
    // Kiting over the water before a plunge: wings raised high, head down, talons dangling.
    backdrop = scene && <Water y={114} ripple={ripple}/>
    bird = (
      <g transform={`translate(0,${bob})`}>
        <HalfWingRaised tilt={-flap}/>
        <g transform="translate(120,0) scale(-1,1)"><HalfWingRaised tilt={-flap}/></g>
        <BodyFront y={-2}/>
        <path d="M 56 76 L 54 92 M 64 76 L 66 92" stroke={FOOT} strokeWidth="3.2" strokeLinecap="round"/>
        <path d="M 54 92 l -3.4 2.4 M 54 92 l -0.4 4 M 54 92 l 2.8 2.8 M 66 92 l 3.4 2.4 M 66 92 l 0.4 4 M 66 92 l -2.8 2.8" stroke="#2A2A30" strokeWidth="1.3" strokeLinecap="round"/>
        <g transform="translate(59,43) rotate(26)"><Head blink={blink}/></g>
      </g>
    )
    fore = scene && <path d="M 40 114 q 10 -3 20 0 q 10 3 20 0" stroke="#D8F0FA" strokeWidth="1.2" fill="none" opacity="0.8"/>
  } else if (pose === 'fish') {
    // Flying off low over the water with a fish carried head-first, aerodynamically.
    backdrop = openWater
    bird = (
      <g transform={`translate(0,${bob})`}>
        {/* far wing: dark brown upperside */}
        <g transform={`translate(50,66) rotate(${-6 - flap}) scale(0.74)`}>
          <path d="M 0 0 C 4 -14 12 -26 24 -34 C 30 -40 36 -46 42 -52 L 45 -48 L 48 -50.5 L 48.4 -45 L 52.4 -46 L 50.4 -40.6 L 54.4 -39.6 L 50 -35.6 C 43 -29 37 -20 32 -10 C 28 -2 20 4 8 6 Z" fill="url(#ospBack)"/>
          <path d="M 40 -50 L 45 -48 L 48 -50.5 L 48.4 -45 L 52.4 -46 L 50.4 -40.6 L 54.4 -39.6 L 50 -35.6 C 46 -38 42 -42 40 -50 Z" fill="#1E140C"/>
        </g>
        <g transform="translate(44,72)"><BodySide/></g>
        {/* fish gripped head-first by both feet */}
        <g transform="translate(51,91)"><FishSide/></g>
        <path d="M 46 81 L 46 86 M 61 80 L 61 86" stroke={FOOT} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 43 88 C 44 85.6 48 85.4 49.4 87.6 M 58 87.6 C 59 85.4 63 85.4 64.4 87.6" stroke={FOOT} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        {/* near wing raised: white underwing with dark carpal patch */}
        <g transform={`translate(56,67) rotate(${10 - flap}) scale(0.76)`}>
          <path d="M 0 0 C 4 -14 12 -26 24 -34 C 30 -40 36 -46 42 -52 L 45 -48 L 48 -50.5 L 48.4 -45 L 52.4 -46 L 50.4 -40.6 L 54.4 -39.6 L 50 -35.6 C 43 -29 37 -20 32 -10 C 28 -2 20 4 8 6 Z" fill="#D9DBDD"/>
          {[[22, -8], [30, -18], [36, -28]].map(([x, y], i) => <path key={i} d={`M ${x - 4} ${y - 3} L ${x + 4} ${y + 3}`} stroke="#8A8E96" strokeWidth="1.5" opacity="0.9" strokeLinecap="round"/>)}
          <path d="M 40 -50 L 45 -48 L 48 -50.5 L 48.4 -45 L 52.4 -46 L 50.4 -40.6 L 54.4 -39.6 L 50 -35.6 C 46 -38 42 -42 40 -50 Z" fill="#2E2620"/>
          <path d="M 50 -35.6 C 43 -29 37 -20 32 -10 C 28 -2 20 4 8 6" stroke="#3E332A" strokeWidth="1.8" fill="none"/>
          <path d="M 0 0 C 4 -14 12 -26 24 -34 C 28 -37 31 -40 34 -43 C 31 -32 25 -22 19 -14 C 13 -7 6 -2 0 0 Z" fill="#FBFBF7"/>
          <ellipse cx="27" cy="-34" rx="6" ry="3.6" transform="rotate(-48 27 -34)" fill="#2A1E14"/>
          <path d="M 0 0 C 4 -14 12 -26 24 -34 C 30 -40 36 -46 42 -52" stroke="#6A5848" strokeWidth="1.2" fill="none"/>
        </g>
        <g transform="translate(31,66) rotate(-4) scale(1.08)"><Head blink={blink}/></g>
      </g>
    )
  } else {
    // Perched upright on a dead snag over the water.
    backdrop = scene ? <g><Water y={114} ripple={ripple}/><g transform="translate(0,5)"><Snag full/></g></g> : <g transform="translate(0,5)"><Snag/></g>
    bird = (
      <g transform={`translate(0,5) translate(52,94) scale(1.18) translate(-52,-94) translate(0,${bob * 0.5})`}>
        {/* banded tail below the perch */}
        <path d="M 61 84 C 63 92 65 100 67 107 L 74 105.4 C 72 98 69 90 67 82 Z" fill="#5A4636"/>
        <path d="M 63.4 93 L 69.8 91.4 M 65.2 100 L 71.8 98.4" stroke={DARK} strokeWidth="1.4"/>
        {/* white underparts */}
        <path d="M 39 46 C 33 58 35 78 47 90 C 53 95 62 94 66 88 C 68 72 62 54 52 44 Z" fill="url(#ospBelly)"/>
        {/* folded wing: dark brown, long primaries reaching the tail tip */}
        <path d="M 50 42 C 64 38 76 50 77 68 C 78 82 76 94 72 104 L 67 103 C 65 90 62 74 56 62 C 52 54 50 48 50 42 Z" fill="url(#ospBack)"/>
        <path d="M 58 52 C 66 56 70 64 72 74 M 60 62 C 66 66 69 74 70 84" stroke="#5A4636" strokeWidth="0.9" fill="none" opacity="0.8"/>
        <path d="M 68 78 C 71 86 72 94 72 104 M 71 76 C 74 84 75 92 74 100" stroke="#1A120A" strokeWidth="0.9" fill="none"/>
        {/* pale blue-gray feet, black talons */}
        <path d="M 47 86 L 46 92 M 55 88 L 55 93" stroke={FOOT} strokeWidth="3.2" strokeLinecap="round"/>
        <path d="M 43 93.4 C 44 91.8 49 91.6 51 93.2 M 52 94.2 C 53 92.6 57 92.6 59 93.8" stroke={FOOT} strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <path d="M 42.6 93.4 l -0.6 2 M 51 93.2 l 0.6 2 M 59 93.8 l 0.6 2" stroke="#222" strokeWidth="1" strokeLinecap="round"/>
        <g transform="translate(47,36) scale(1.12)"><Head blink={blink}/></g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Osprey">
      <defs>
        <radialGradient id="ospHead" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="75%" stopColor="#F2F0EA"/><stop offset="100%" stopColor="#D6D2C8"/>
        </radialGradient>
        <linearGradient id="ospBelly" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F4F2EC"/><stop offset="100%" stopColor="#D8D4CA"/>
        </linearGradient>
        <linearGradient id="ospBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5A4432"/><stop offset="60%" stopColor="#3A2A1C"/><stop offset="100%" stopColor="#241810"/>
        </linearGradient>
        <linearGradient id="ospSnag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8AC9E"/><stop offset="100%" stopColor="#7A6E62"/>
        </linearGradient>
        <linearGradient id="ospFishSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4E6E7C"/><stop offset="55%" stopColor="#C8D8DE"/><stop offset="100%" stopColor="#EEF4F4"/>
        </linearGradient>
        <linearGradient id="ospWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {backdrop}
      {bird}
      {fore}
    </svg>
  )
}
