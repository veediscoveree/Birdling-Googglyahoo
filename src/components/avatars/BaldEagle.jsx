// Bald Eagle (adult) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'bald_eagle', poses: ['perch', 'soar', 'fish', 'call'] }

// Field marks: big, bulky raptor; SNOW-WHITE HEAD with a slightly shaggy nape and a heavy
// brow over a PALE YELLOW EYE; MASSIVE YELLOW HOOKED BILL with yellow cere; DARK CHOCOLATE-
// BROWN body and wings (coverts tipped paler); feathered brown "trousers"; bright YELLOW FEET
// with black talons; WHITE TAIL (wedge-shaped, broad). In flight: long, broad, FLAT PLANK-LIKE
// wings held level, with deeply slotted "fingered" primaries; white head and tail at both ends.

const BRN = '#4A3020'
const DRK = '#2A1A10'
const YEL = '#F2C230'
const BLK = '#161210'

function Head({ blink = false, open = false }) {
  // Profile facing left; centre ≈ (46,36).
  return (
    <g>
      {/* white head with shaggy nape */}
      <path d="M 30 37 C 29.6 26.4 37 19.6 46.4 19.6 C 55.6 19.6 62 25.6 62.6 33.6 C 63 38.4 62.2 42.4 64.2 47 L 61 46.4 L 62.4 51 L 58.6 49.4 L 58.4 53.6 L 55 51.2 C 50.4 54.6 43.4 55.2 38.6 52 C 33.4 48.6 30.2 43.4 30 37 Z" fill="url(#baeHead)"/>
      <path d="M 52 44 C 55 47 58 48 61 48.4 M 49 47.6 C 52 50 55 51 57.4 51.2" stroke="#C9CDD4" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* eye under a heavy brow */}
      {blink
        ? <path d="M 36 34.6 C 38.4 36.6 42.4 36.6 44.4 34.6" stroke="#3A3A3A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="40.4" cy="34.6" r="4.9" fill="#F6DC5A"/>
            <circle cx="40.4" cy="34.6" r="3.9" fill="#F2CF3A"/>
            <circle cx="40.2" cy="34.8" r="2.3" fill="#120C06"/>
            <circle cx="38.9" cy="33.3" r="1.3" fill="#FFF"/>
          </g>}
      <path d="M 34 31.4 C 37.6 28.4 43 28.4 46.6 31 C 43 30.2 38 30.6 34.4 32.6 Z" fill="#B8BEC8"/>
      {/* massive hooked yellow bill: cere, upper mandible with hook, lower mandible */}
      {open
        ? <path d="M 22.6 43.4 L 33.6 42.2 C 32 47 28 50.6 23.4 51.6 C 22.6 49 22.2 46 22.6 43.4 Z" fill="#D49A18"/>
        : <path d="M 22.6 43 L 33.6 42.2 C 32.4 45.4 28.4 46.8 24 46.4 Z" fill="#D49A18"/>}
      {open && <path d="M 23.6 44 L 32.4 43 C 30.6 46.6 27.6 48.8 24.4 49.6 Z" fill="#B8403A"/>}
      <path d="M 34.4 32.4 C 27 31.4 20.4 33.6 17.4 38.6 C 15.8 41.6 16.2 45.2 18.2 47.4 C 18.6 44.8 20.2 43.2 22.8 42.8 L 34.4 42 Z" fill="url(#baeBill)"/>
      <path d="M 18.2 47.4 C 18.6 44.8 20.2 43.2 22.8 42.8 L 26 42.6" stroke="#B8840E" strokeWidth="0.8" fill="none"/>
      <path d="M 35.4 32 C 32.6 32.2 30.8 34 30.8 36.4 L 30.8 41.8 L 35.6 41.6 Z" fill="#F7D44A"/>
      <ellipse cx="32.6" cy="36.2" rx="1" ry="0.7" fill="#7A5410"/>
    </g>
  )
}

function PerchedBody() {
  return (
    <g>
      {/* white tail hanging below the perch */}
      <path d="M 61 92 C 64 102 67 110 68 119 C 74 122.6 84 122.4 90 118 C 86 108 80 98 73 89 Z" fill="url(#baeTail)"/>
      <path d="M 69 100 L 74 119.6 M 75 98 L 82 119" stroke="#D2D6DC" strokeWidth="0.7"/>
      {/* dark chocolate torso */}
      <path d="M 37 50 C 30 60 31 78 39 90 C 45 98.6 57 101 66 96 C 72.6 90 72.6 76 68.6 62 C 65 54 58 49.6 50 49.6 Z" fill="url(#baeBody)"/>
      {[[40, 62], [45, 67], [39, 73], [46, 75], [42, 81], [49, 83], [52, 70]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} q 2.4 2 4.8 0`} stroke="#7A5638" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.8"/>
      ))}
      {/* folded wing: coverts tipped paler, darker primaries crossing over the tail */}
      <path d="M 53 53 C 64 51 72.4 58 75.4 70 C 78.4 84 80.6 98 84.4 112 C 77 108 70.4 98 66.4 88 C 60.4 76 55.4 64 53 53 Z" fill="url(#baeWing)"/>
      {[[60, 60], [65, 63], [62, 67], [68, 68], [65, 73], [71, 74], [68, 79]].map(([x, y], i) => (
        <path key={i} d={`M ${x - 2.4} ${y} q 2.4 2.4 4.8 0`} stroke="#9A7650" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      ))}
      <path d="M 69 84 C 74 94 78 103 84.4 112 C 79 109.4 74 103 70.6 96 Z" fill={DRK}/>
      <path d="M 71 88 l 8 17" stroke="#5A4030" strokeWidth="0.6"/>
      {/* feathered trousers */}
      <path d="M 44 86 C 42 92 44 98 49 100 L 62 100 C 65 96 64 90 60 86 Z" fill="#3A2416"/>
      <path d="M 46 94 q 2 3 4 0 q 2 3 4 0 q 2 3 4 0" stroke="#5A3C26" strokeWidth="0.8" fill="none"/>
    </g>
  )
}

function Feet({ y = 101 }) {
  return (
    <g>
      <path d={`M 45 ${y} c 0 -3 2.6 -4 5 -4 l 3 0 c 2 0 3 1.2 3.4 3.2`} fill={YEL} stroke="#B07E10" strokeWidth="0.6"/>
      <path d={`M 54 ${y + 0.4} c 0 -3 2.6 -4 5 -4 l 3 0 c 2 0 3 1.2 3.4 3.2`} fill={YEL} stroke="#B07E10" strokeWidth="0.6"/>
      <path d={`M 45.4 ${y} l -1 2 M 54.4 ${y + 0.4} l -1 2 M 56.4 ${y - 0.6} l 0.5 2.2 M 65.4 ${y - 0.2} l 0.5 2.2`} stroke={BLK} strokeWidth="1.2" strokeLinecap="round"/>
    </g>
  )
}

function Perched({ blink, call, tilt }) {
  return (
    <g>
      <PerchedBody/>
      {/* white neck feathers spilling onto the brown */}
      <path d="M 38 49 L 39.6 56 L 42 51.6 L 45.6 57.6 L 48.6 52.4 L 52.4 57 L 54.6 51.6 L 57.4 54.6 L 57 48 Z" fill="#F4F5F7"/>
      <Feet/>
      <g transform={call ? 'rotate(34 50 52)' : `rotate(${tilt} 48 50)`}>
        <Head blink={blink} open={call}/>
      </g>
    </g>
  )
}

function Fingers({ x, y, n = 5, len = 12, spread = 7, dir = -1 }) {
  // Slotted primaries: n separate "fingers" fanning from the wingtip.
  return Array.from({ length: n }, (_, i) => {
    const yy = y + i * 3.4
    const a = (i - (n - 1) / 2) * spread * Math.PI / 180
    const x2 = x + dir * len * Math.cos(a) * (1 - Math.abs(i - 2) * 0.06)
    const y2 = yy + len * Math.sin(a) * 0.9 - 1
    return <path key={i} d={`M ${x} ${yy} L ${x2.toFixed(1)} ${y2.toFixed(1)}`} stroke={DRK} strokeWidth="3.4" strokeLinecap="round"/>
  })
}

function SoarWing() {
  // Left wing seen from below: long flat plank, darker coverts, paler flight feathers.
  return (
    <g>
      <Fingers x={18} y={48} dir={-1} len={12} spread={9}/>
      <path d="M 55 49 C 43 46 29 45.4 17.4 46.6 L 16.6 63.6 C 28 64.6 42 66 55 67 Z" fill="#5C4632"/>
      <path d="M 55 49 C 43 46 29 45.4 17.4 46.6 L 17.2 53.4 C 29 52.8 43 54.4 55 57.4 Z" fill={DRK}/>
      {[24, 31, 38, 45].map(x => <path key={x} d={`M ${x} 56 L ${x - 1} 64.6`} stroke="#3A2818" strokeWidth="0.7"/>)}
    </g>
  )
}

function Soar() {
  return (
    <g>
      <SoarWing/>
      <g transform="translate(120,0) scale(-1,1)"><SoarWing/></g>
      {/* white tail fan */}
      <path d="M 54 73 L 66 73 C 70 80 72.4 86 72.4 92 C 64.4 95.6 55.6 95.6 47.6 92 C 47.6 86 50 80 54 73 Z" fill="url(#baeTail)"/>
      <path d="M 57 76 L 55 93 M 63 76 L 65 93 M 60 76 L 60 94" stroke="#D2D6DC" strokeWidth="0.6"/>
      {/* body */}
      <ellipse cx="60" cy="60" rx="9.6" ry="15" fill="url(#baeBody)"/>
      <path d="M 54.4 72 c 0 3 2 4.4 3.6 4.4 M 65.6 72 c 0 3 -2 4.4 -3.6 4.4" stroke={YEL} strokeWidth="2.6" strokeLinecap="round" fill="none"/>
      <path d="M 52.6 44 L 55 49.6 L 57.4 46 L 60 50.6 L 62.6 46 L 65 49.6 L 67.4 44 Z" fill="#F4F5F7"/>
      <g transform="translate(60,40) scale(0.62) translate(-46,-38)"><Head/></g>
    </g>
  )
}

function Fish() {
  return (
    <g>
      <path d="M 40 84 C 46 78.6 62 78 74 82 L 82 77.6 L 80.6 84.6 L 83 91.4 L 74 87 C 62 91 46 90 40 84 Z" fill="#9FB4AE"/>
      <path d="M 41 83 C 48 79 62 78.6 74 82 C 64 82 52 82.4 41 83 Z" fill="#4E6E64"/>
      <path d="M 58 79.6 l 4 -3.4 l 3 3.6 Z" fill="#5E7E74"/>
      <circle cx="44.6" cy="83.2" r="1.2" fill="#14181A"/>
      <path d="M 48 81.6 C 49 83.6 49 85.6 48 87.6" stroke="#6A8480" strokeWidth="0.7" fill="none"/>
    </g>
  )
}

function RaisedWing({ base, tips, body, fill }) {
  // Wing on the upstroke: a broad plank ending in separate slotted "finger" primaries.
  return (
    <g>
      {tips.map(([x, y], i) => <path key={i} d={`M ${base[i][0]} ${base[i][1]} L ${x} ${y}`} stroke={DRK} strokeWidth="3.6" strokeLinecap="round"/>)}
      <path d={body} fill={fill}/>
    </g>
  )
}

function CarryFish({ flap }) {
  // Flying left on a big upstroke, a fish clutched head-first in the talons.
  return (
    <g>
      <g transform={`rotate(${flap * 0.7} 52 54)`}>
        <RaisedWing fill="#3A2616" body="M 45 56 C 47 44 51 33 57 23 L 70 29 C 68 39 64 47 60 56 Z"
          base={[[58, 24], [61, 25.6], [64, 27], [67, 28.4]]} tips={[[58, 11], [63, 12], [68, 14], [73, 18]]}/>
      </g>
      <path d="M 84 55.6 L 104 53 C 108 57.6 108 62.4 104 67 L 84 64.4 Z" fill="url(#baeTail)"/>
      <path d="M 88 58 L 104 56.6 M 88 62 L 104 63.6" stroke="#D2D6DC" strokeWidth="0.6"/>
      <path d="M 36 56 C 42 50 56 49 70 52 C 80 54 86 58 88 62 C 82 66 70 68 56 67 C 44 66 37 62 36 56 Z" fill="url(#baeBody)"/>
      <path d="M 52 64 C 50 70 52 74 56 75 L 64 75 C 66 72 66 68 64 65 Z" fill="#3A2416"/>
      <path d="M 55 74 L 52 81 M 62 74 L 64 81" stroke={YEL} strokeWidth="3" strokeLinecap="round"/>
      <Fish/>
      <path d="M 49 80.4 q 3 1.6 6 0.6 M 61 80.6 q 3 1.6 6 0.4" stroke={YEL} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M 49.4 80.6 l -0.8 2 M 66.6 81 l 0.6 2" stroke={BLK} strokeWidth="1" strokeLinecap="round"/>
      <g transform={`rotate(${flap} 58 56)`}>
        <RaisedWing fill="url(#baeWing)" body="M 54 58 C 58 45 64 32 72 20 L 90 31 C 87 42 81 52 74 60 Z"
          base={[[73, 21], [77, 23.4], [81, 25.8], [85, 28.2], [89, 30.6]]} tips={[[75, 6], [80, 7.4], [86, 10.4], [92, 15], [97, 21.4]]}/>
        <path d="M 70 26 C 66 36 62 46 60 56" stroke="#2E1E12" strokeWidth="0.8" fill="none" opacity="0.6"/>
        {[[66, 46], [70, 40], [74, 34], [70, 52], [76, 46]].map(([x, y], i) => (
          <path key={i} d={`M ${x - 2} ${y} q 2 2 4 0`} stroke="#9A7650" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        ))}
      </g>
      <path d="M 33 47 L 36 55 L 39 50.6 L 42 56.4 L 44 49 Z" fill="#F4F5F7"/>
      <g transform="translate(34,48) rotate(4) scale(0.72) translate(-46,-38)"><Head/></g>
    </g>
  )
}

function Scene({ snag }) {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" rx="10" fill="url(#baeSky)"/>
      <path d="M 14 20 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.7"/>
      <path d="M 82 28 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.55"/>
      {/* far Palisades-style bank in fall color */}
      <path d="M 0 96 C 12 90 22 92 34 89 C 48 86 60 90 74 88 C 90 86 104 90 120 88 L 120 102 L 0 102 Z" fill="#6E7E6A"/>
      {[[8, 93, '#C8742E'], [20, 91, '#D8A040'], [32, 90, '#A8562A'], [46, 89, '#C8742E'], [60, 90, '#D8A040'], [76, 89, '#B06030'], [92, 90, '#D8A040'], [108, 90, '#C8742E']].map(([x, y, c], i) => (
        <ellipse key={i} cx={x} cy={y + 2} rx="6" ry="3.6" fill={c} opacity="0.8"/>
      ))}
      {/* river */}
      <path d="M 0 100 L 120 100 L 120 120 C 120 125.5 115.5 130 110 130 L 10 130 C 4.5 130 0 125.5 0 120 Z" fill="url(#baeWater)"/>
      <path d="M 10 106 q 8 -2 16 0 M 50 110 q 10 -2 20 0 M 22 118 q 6 -1.5 12 0 M 92 114 q 7 -2 14 0" stroke="#CDE6F2" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
      {snag && (
        <g>
          {/* weathered dead snag leaning out over the water */}
          <path d="M 95 130 C 97 110 98 84 100 52 L 108 50 C 107 82 107 110 110 130 Z" fill="#7E7064" stroke="#5E5248" strokeWidth="0.8"/>
          <path d="M 100 52 L 98 44 L 103 49 L 105 40 L 108 50 Z" fill="#7E7064"/>
          <path d="M 101 120 C 101 100 102 80 103 60" stroke="#6E645A" strokeWidth="0.8" fill="none"/>
          <path d="M 101 96 C 80 97.6 50 100 24 101.4 L 12 99.6 L 20 104.4 L 16 108 C 40 107.4 74 106 101 104.6 Z" fill="#7E7064" stroke="#5E5248" strokeWidth="0.8"/>
          <path d="M 28 104.4 C 54 103.4 80 102.2 99 101.4 M 44 101.8 C 60 101 76 100.4 90 99.8" stroke="#5E5248" strokeWidth="0.7" fill="none"/>
          <path d="M 70 100 C 74 94 78 92 82 90 L 83 92 C 79 94 76 96 74 100 Z" fill="#7E7064"/>
        </g>
      )}
    </g>
  )
}

export default function BaldEagle({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'fish' ? 260 : 480); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.6, -1.1, -0.6, 0, 0.5, 0.9, 0.5][frame] : 0
  const blink = animated && frame === 6
  const tilt = animated ? [0, 0, -3, -3, -3, 0, 0, 0][frame] : 0
  const perched = pose === 'perch' || pose === 'call'

  let bird
  if (pose === 'soar') {
    bird = <g transform={`translate(0,${bob * 1.6}) rotate(${bob} 60 60)`}><Soar/></g>
  } else if (pose === 'fish') {
    bird = <g transform={`translate(0,${-bob * 1.4})`}><CarryFish flap={animated ? [0, 6, 14, 22, 26, 22, 14, 6][frame] : 0}/></g>
  } else {
    bird = <g transform={`translate(0,${bob * 0.4})`}><Perched blink={blink} call={pose === 'call'} tilt={tilt}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Bald Eagle">
      <defs>
        <linearGradient id="baeHead" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F2F3F6"/><stop offset="100%" stopColor="#DADDE3"/>
        </linearGradient>
        <linearGradient id="baeBill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD84A"/><stop offset="100%" stopColor="#E8AC1E"/>
        </linearGradient>
        <linearGradient id="baeBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5E3E28"/><stop offset="100%" stopColor="#382416"/>
        </linearGradient>
        <linearGradient id="baeWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A4A30"/><stop offset="100%" stopColor="#3A2616"/>
        </linearGradient>
        <linearGradient id="baeTail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6F7F9"/><stop offset="100%" stopColor="#E2E5EA"/>
        </linearGradient>
        <linearGradient id="baeSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86B8DE"/><stop offset="100%" stopColor="#DCEAF2"/>
        </linearGradient>
        <linearGradient id="baeWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A8EAE"/><stop offset="100%" stopColor="#2E5A78"/>
        </linearGradient>
      </defs>
      {scene && <Scene snag={perched}/>}
      {!scene && perched && <path d="M 22 104 C 50 102.6 80 101.4 104 100.6" stroke="#7E7064" strokeWidth="6" fill="none" strokeLinecap="round"/>}
      {bird}
    </svg>
  )
}
