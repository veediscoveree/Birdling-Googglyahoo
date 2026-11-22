// Northern Shoveler (alternate-plumaged drake) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template conventions (meta, props, viewBox 0 0 120 130, "nsh" ids).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'northern_shoveler', poses: ['swim', 'skim', 'fly', 'doze'] }

// Field marks: HUGE black spatulate (spoon) bill, longer than the head, with comb-like
// lamellae along the edge; glossy dark-green head; bright YELLOW eye; clean WHITE breast;
// rich CHESTNUT flanks and belly; white patch before the black stern; dark back with long
// white-striped scapulars; POWDER-BLUE forewing, white bar and green speculum in flight;
// orange legs. Feeds with the bill skimming flat along the surface.

function Head({ sheen = 0.4, sleep = false }) {
  const ticks = []
  for (let x = 3.6; x <= 11; x += 1.8) ticks.push(<path key={x} d={`M ${x} ${62.3 - (x - 3.6) * 0.06 + (x < 6 ? -0.4 : 0)} l 0.2 0.9`} stroke="#8A8E8E" strokeWidth="0.45" opacity="0.7"/>)
  return (
    <g transform="translate(42 56) scale(1.12) translate(-42 -56)">
      {/* glossy green head */}
      <path d="M 27 58 C 26 47 34 40.5 43 41 C 52 41.5 57.5 48.5 57 57 C 56.5 63.5 52 68 45 69 C 36 70 27.5 66 27 58 Z" fill="url(#nshHead)"/>
      <ellipse cx="46" cy="50" rx="7" ry="4.5" fill="#6A3E8A" opacity={sheen * 0.7}/>
      <ellipse cx="40" cy="47" rx="5" ry="2.4" fill="#7ACB8E" opacity={sheen * 0.6} transform="rotate(-15 40 47)"/>
      {/* bright yellow eye (or a sleepy closed lid) */}
      {sleep ? (
        <path d="M 34 55 q 3.4 2.6 6.8 0" stroke="#0A1A10" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      ) : (
        <g>
          <circle cx="37.4" cy="54.6" r="3.9" fill="#FFD21E" stroke="#0C2414" strokeWidth="0.6"/>
          <circle cx="37.4" cy="54.6" r="1.8" fill="#0A0A0A"/>
          <circle cx="36.1" cy="53.3" r="1.15" fill="#FFF"/>
          <circle cx="38.6" cy="56" r="0.45" fill="#FFF" opacity="0.8"/>
        </g>
      )}
      {/* the giant spoon: long black bill, slimmer mid-way, flaring into a broad rounded tip */}
      <path d="M 29 52.2 C 24 53.4 19 54.8 15 55 C 10.5 55 6.4 52 3 53 C -0.8 54.2 -1 61.2 0.9 64 C 3 66.8 8 66.2 11.4 63.6 C 14.4 61.6 18.4 60.6 22.4 60.8 C 25 60.9 27.2 61.2 29.2 61.4 Z" fill="#161616"/>
      <path d="M 28 53.6 C 23 54.8 18.4 55.8 14 56 C 9.4 56 5.4 53.8 2.6 54.8 C 0.9 55.6 0.9 57.9 2.6 58.8 C 8.4 59.2 15 57.8 28.2 56.4 Z" fill="#4A4E4C"/>
      <path d="M 29 59.8 C 22.4 59.8 16.4 60.8 11.4 62 C 7.6 63.2 3.8 63.2 1.2 61.8" stroke="#5A5E5E" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      {ticks}
      <ellipse cx="21.5" cy="55.2" rx="1.5" ry="0.6" fill="#000" transform="rotate(-4 21.5 55.2)"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      {/* tail: dark center, whitish outer feathers */}
      <path d="M 97 75.5 C 105 73 112 73.5 117 76.5 C 112 81 104 83 96 82.5 Z" fill="#E8E6DE"/>
      <path d="M 99 77 C 105 75.6 110 75.8 114 77.2 C 110 79.6 104 80.8 99 80.6 Z" fill="#3A3A36"/>
      {/* white breast = base body */}
      <path d="M 36 85 C 36 74 48 68.5 64 68 C 81 67.5 96 71 104 78 C 104 88 96 97 82 100.5 L 50 100.5 C 41 98.5 36 92.5 36 85 Z" fill="url(#nshWhite)"/>
      {/* chestnut flanks and belly */}
      <path d="M 54.5 75 C 66 72.5 82 73.5 95 77.5 C 96.5 86 93 94 84.5 100.5 L 55 100.5 C 51 93 50.5 83 54.5 75 Z" fill="url(#nshChest)"/>
      {/* white patch, then black stern */}
      <path d="M 94.5 77.4 C 97.5 85 95.5 94 88 100 L 92 99 C 99 93 102 86 100 78.6 Z" fill="#FAFAF6"/>
      <path d="M 99.6 77.8 C 102 85 99.6 93 92 99 C 100 96 104.5 88 104.2 78.5 Z" fill="#141414"/>
      {/* dark back with long, drooping white-striped scapulars and a peek of powder blue */}
      <path d="M 49 71.5 C 62 66.5 86 67 104.4 77.5 C 96 79.6 84 78.6 72 77.6 C 61 76.8 54 75 49 71.5 Z" fill="#1A2420"/>
      <path d="M 58.5 76.4 C 64 74.4 71 74.4 77 75.6 C 72 77.6 64.5 78.2 58.5 77.8 Z" fill="#9CC0E0"/>
      <path d="M 66 73.2 C 76 71.6 88 72.8 99 76.6 M 74 76.4 C 83 75.6 92 76.6 100 78.2" stroke="#F4F4EE" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
    </g>
  )
}

// Upper surface of a raised wing (fly pose): powder-blue forewing, white bar, green speculum,
// dusky pointed primaries. Shoulder near (57,76), tip up and slightly back.
function Wing({ far = false }) {
  return (
    <g opacity={far ? 0.85 : 1}>
      <path d="M 56 76 C 55 64 58 52 64 44 C 68 34 74 22 84 10 C 86 12 87.5 14 88 17 C 91 17 93 19 93.5 22 C 96 22.5 97.5 25 97 28 C 93 34 90 40 88 46 C 86 56 84 66 82 76 Z" fill={far ? '#2C302C' : '#3E423E'}/>
      <path d="M 88 17 L 76 34 M 93.5 22 L 79 40 M 97 28 L 83 44" stroke="#22241F" strokeWidth="0.8" fill="none"/>
      <path d="M 56 76 C 55 64 58 52 64 44 C 70 46 76 47 80.5 47 C 76 56 72.5 66 70.5 76 Z" fill={far ? '#7E9CB6' : '#A8CAE8'}/>
      <path d="M 80.5 47 C 76 56 72.5 66 70.5 76 L 73.6 76 C 75.6 66 79.4 56 83.6 46.8 Z" fill="#FAFAF6"/>
      <path d="M 83.6 46.8 C 79.4 56 75.6 66 73.6 76 L 82 76 C 84 66 86 56 88 46 Z" fill="url(#nshSpec)"/>
    </g>
  )
}

function Water({ bob = 0 }) {
  return (
    <g>
      <path d={`M 0 ${99 + bob * 0.3} Q 15 ${97 + bob * 0.3} 30 99 T 60 99 T 90 99 T 120 99 L 120 130 L 0 130 Z`} fill="url(#nshWater)"/>
      <path d="M 30 103 q 8 -2 16 0 M 66 106 q 10 -2 20 0 M 12 110 q 6 -1.5 12 0 M 90 113 q 7 -2 14 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
      {/* a little duckweed / floating seeds — shoveler food */}
      {[[18, 104], [24, 106], [46, 112], [100, 105], [106, 108], [80, 118]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.4" ry="0.6" fill="#9CC86A" opacity="0.75"/>)}
    </g>
  )
}

export default function NorthernShoveler({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.8, -1.4, -0.8, 0, 0.6, 1, 0.6][frame] : 0
  const sheen = animated ? [0.35, 0.5, 0.65, 0.5, 0.35, 0.25, 0.2, 0.25][frame] : 0.4
  const sweep = animated ? [0, 1.5, 3, 1.5, 0, -1.5, -3, -1.5][frame] : 0
  const flap = animated ? [0, -2, -4, -2, 0, 2, 3, 2][frame] : 0
  const waterline = scene ? <Water bob={bob}/> : <path d="M 26 101 C 50 104 90 104 108 100" stroke="#A8D8EC" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>

  let bird, front = null, showWake = true
  if (pose === 'skim') {
    // Classic shoveler feeding: neck stretched forward, the spoon bill held flat on the water,
    // sweeping side to side to strain food.
    bird = (
      <g transform="translate(12,10) scale(0.9)" clipPath="url(#nshSurface)">
        <Body/>
        <path d="M 50 74.5 C 44 74.5 38 77 34 82 L 30 95 C 40 94 48 88 56 81 Z" fill="url(#nshHead)"/>
        <g transform={`translate(-12,28) rotate(${-6 + sweep * 0.5} 42 55)`}><Head sheen={sheen}/></g>
      </g>
    )
    front = (
      <g>
        <path d={`M ${0 + sweep} 100.5 q 5 -2.6 10 0 q 4 2 8 0 M ${4 + sweep} 103.5 q 7 -2 14 0`} stroke="#E4F6FC" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.9"/>
      </g>
    )
  } else if (pose === 'fly') {
    // Fast, direct flight over the marsh, showing the powder-blue forewing and green speculum.
    showWake = false
    bird = (
      <g transform="translate(9,-3) scale(0.86) rotate(-4 60 80)">
        <g transform={`translate(-2,-2) rotate(${-14 + flap} 57 76)`}><Wing far/></g>
        <path d="M 46 96 C 56 106 80 107 92 97 Z" fill="url(#nshChest)"/>
        <path d="M 40 92 C 42 100 48 103 54 103 L 52 96 Z" fill="#E8E8E0"/>
        <Body/>
        <path d="M 33 63 C 37 69 39 75 40 81 L 55.5 76.5 C 52.5 72.5 51.5 67 52.5 61.5 Z" fill="url(#nshHead)"/>
        <g transform="translate(-4,6) rotate(4 42 55)"><Head sheen={sheen}/></g>
        <g transform={`rotate(${26 + flap} 57 76)`}><Wing/></g>
      </g>
    )
  } else if (pose === 'doze') {
    // Napping on the water: head turned back, giant bill laid along the back.
    bird = (
      <g>
        <Body/>
        <path d="M 46 72 C 50 66 58 62 66 63 L 64 76 L 44 79 Z" fill="url(#nshHead)"/>
        <g transform="translate(60,61) scale(-0.92,0.92) translate(-42,-55)"><Head sheen={sheen} sleep/></g>
        <path d="M 88 70.5 C 92 70 96 71.4 99 73.4 C 95 74.4 91 74.2 88 73.6 Z" fill="#1A2420"/>
        <path d="M 86 72.2 C 91 71.6 96 72.6 100 74.8" stroke="#F4F4EE" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    )
    front = animated && frame >= 4 && <text x="66" y={38 - (frame - 4) * 2} fontSize="7" fill="#DDEFF6" opacity="0.85" fontFamily="sans-serif">z</text>
  } else {
    bird = (
      <g>
        <Body/>
        <path d="M 33 63 C 37 69 39 75 40 81 L 55.5 76.5 C 52.5 72.5 51.5 67 52.5 61.5 Z" fill="url(#nshHead)"/>
        <Head sheen={sheen}/>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Northern Shoveler">
      <defs>
        <clipPath id="nshSurface"><rect x="-40" y="-40" width="200" height="140.5"/></clipPath>
        <linearGradient id="nshHead" x1="0" y1="0" x2="1" y2="0.7">
          <stop offset="0%" stopColor="#2E8A56"/><stop offset="50%" stopColor="#15553A"/><stop offset="100%" stopColor="#0C3424"/>
        </linearGradient>
        <linearGradient id="nshWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFC"/><stop offset="100%" stopColor="#E2E2DA"/>
        </linearGradient>
        <linearGradient id="nshChest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BC5A26"/><stop offset="100%" stopColor="#8A3616"/>
        </linearGradient>
        <linearGradient id="nshSpec" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E7A48"/><stop offset="100%" stopColor="#36A866"/>
        </linearGradient>
        <linearGradient id="nshWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <g transform={`translate(0,${pose === 'fly' ? bob * 1.5 : bob}) translate(70 100) scale(0.93) translate(-70 -100)`}>{bird}</g>
      {(scene || showWake) && waterline}
      {front}
    </svg>
  )
}
