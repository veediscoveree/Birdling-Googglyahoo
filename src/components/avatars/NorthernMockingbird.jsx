// Northern Mockingbird — "accurate first, cute second, in habitat" (see WoodDuck.jsx for conventions).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'northern_mockingbird', poses: ['perch', 'wing-flash'] }

// Field marks: slim gray bird, soft gray above / pale gray-white below; darker gray-black wings
// with two thin white wing bars and a WHITE PATCH at the base of the primaries (a small square
// on the folded wing, a big white flash when the wings open); LONG dark tail with WHITE OUTER
// TAIL FEATHERS (edge on the closed tail, whole outer feathers when fanned); thin dark line
// bill→eye; pale yellow eye; thin black bill with a slight droop; long dark legs.

const GRAY = '#959CA2'
const WING = '#474D54'
const TAIL = '#2C3036'

function Head({ open = false }) {
  return (
    <g>
      <circle cx="37" cy="46" r="12.5" fill="url(#mocHead)"/>
      {/* pale throat / cheek */}
      <path d="M 26.5 49 C 28 56 35 60.5 44 58.5 C 39.5 57 32.5 54 26.5 49 Z" fill="#E7E8E3"/>
      <path d="M 30 50.5 C 33 52 37 52.5 41 51.5" stroke="#B4B9BD" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* dark loral line bill→eye, faint line behind the eye */}
      <path d="M 25.5 46.6 C 27 45.6 28.6 45 30.2 44.8" stroke="#2E3236" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 36.5 45.2 C 38.5 45.6 40.5 46.4 42 47.4" stroke="#5E656B" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
      {/* pale yellow eye with catch-light */}
      <circle cx="33.2" cy="44.4" r="3.9" fill="#2A2A2A"/>
      <circle cx="33.2" cy="44.4" r="3.2" fill="#E8D47A"/>
      <circle cx="33.2" cy="44.4" r="1.9" fill="#121212"/>
      <circle cx="32" cy="43.2" r="1.1" fill="#FFF"/>
      {/* thin black bill, slight droop at tip */}
      {open ? (
        <g>
          <path d="M 25.6 44.2 C 20 43 15.5 42 11.5 41.6 C 15 43.6 20 45.6 25.6 46.6 Z" fill="#1A1A1A"/>
          <path d="M 25.6 47.2 C 21 48.6 17 50.4 13.6 52.4 C 17.5 52 21.5 50.6 25.8 49.4 Z" fill="#26282A"/>
          <path d="M 25.6 46.4 L 25.8 47.6 L 20 49 Z" fill="#C46A6A"/>
        </g>
      ) : (
        <path d="M 25.6 44.4 C 20.5 44.8 15.5 46.4 11.6 49 C 15.5 49.4 20.5 48.9 25.8 48.4 Z" fill="#1A1A1A"/>
      )}
    </g>
  )
}

function Body() {
  return <path d="M 33 60 C 34 51 44 48 55 51 C 67 54 76 63 79 73 C 81 82 74 90 62 91 C 49 92 38 85 35 75 C 34 70 33 65 33 60 Z" fill="url(#mocBody)"/>
}

function FoldedWing() {
  return (
    <g>
      <path d="M 47 60 C 57 54 71 57 79 66 C 85 74 90 83 94 90 C 86 89.5 76 85.5 67 80.5 C 56 75 48 69 47 60 Z" fill={WING}/>
      {/* scapulars blend into the gray back */}
      <path d="M 47 60 C 54 55.5 63 55 70 58 C 62 59 54 60.5 48 64 Z" fill="#7E858C"/>
      {/* two thin white wing bars */}
      <path d="M 52 64.5 C 57 62 63 62.3 68 65" stroke="#F4F4F2" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M 55 69.5 C 60.5 67.5 66.5 68.2 72 71" stroke="#F4F4F2" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* WHITE PRIMARY PATCH */}
      <path d="M 70 73.5 C 74 72.6 78 73.8 81 76.6 L 78.4 80.6 C 75.6 78.6 72.6 77.6 69.4 77.4 Z" fill="#FFF"/>
      {/* primary tips */}
      <path d="M 78 81 C 83 84 88 87 93 89.6 M 74 81.5 C 79 85 84 87.6 89 89.8" stroke="#2A2E33" strokeWidth="0.8" fill="none"/>
      {/* pale-edged tertials */}
      <path d="M 60 75 C 64 78.5 68 80.5 72 81.6" stroke="#9AA0A6" strokeWidth="0.9" fill="none"/>
    </g>
  )
}

function Tail({ tilt = 0 }) {
  return (
    <g transform={`rotate(${tilt} 70 80)`}>
      <path d="M 68 75 C 80 84 95 98 109 109 C 108.5 112.5 106 115 102.5 114.6 C 90 105 78 95 64 84 Z" fill={TAIL}/>
      {/* white outer tail feather along the edge */}
      <path d="M 66 85 C 79 95 91 104.5 102.5 114.6 C 104.5 115 106.4 114.2 107.2 112.6 C 96 103.6 83 93.6 70 82.6 Z" fill="#FFF"/>
      <path d="M 75 85 C 86 94 96 102 106 110" stroke="#454A50" strokeWidth="0.6" fill="none" opacity="0.8"/>
    </g>
  )
}

function Legs({ y = 98 }) {
  return (
    <g stroke="#2A2A2C" strokeWidth="1.9" strokeLinecap="round" fill="none">
      <path d={`M 53 88 L 51.5 ${y}`}/><path d={`M 60 88.5 L 60.5 ${y}`}/>
      <path d={`M 51.5 ${y} l -4.5 0.6 M 51.5 ${y} l 3.5 0.8 M 60.5 ${y} l -4.5 0.6 M 60.5 ${y} l 3.5 0.8`} strokeWidth="1.4"/>
    </g>
  )
}

// Open wing, drawn pointing right from the shoulder at (0,0); rotate into place.
function OpenWing({ far = false }) {
  // Primaries fan from the wrist: white at the base (the famous flash), dark at the tips.
  const prim = [[-4, 32], [3, 31], [10, 29], [17, 27], [24, 24.5], [31, 22]]
  const sec = [3, 7, 11, 15, 19]
  return (
    <g>
      {sec.map(x => <path key={x} transform={`translate(${x},2) rotate(${74 - x * 0.9})`} d="M 0 -3.4 C 6 -4 12 -3.6 15.5 -1.2 C 16.6 0 16.6 1.2 15.5 2.4 C 12 3.8 6 4 0 3.4 Z" fill={far ? '#30353A' : '#3E4349'} stroke="#7E858C" strokeWidth="0.4"/>)}
      {prim.slice().reverse().map(([a, len]) => (
        <path key={a} transform={`translate(22,0) rotate(${a})`} d={`M 0 -3.4 C ${len * 0.4} -4.6 ${len * 0.85} -4.2 ${len} -1.4 C ${len + 0.9} 0 ${len + 0.7} 1.4 ${len - 0.6} 2.4 C ${len * 0.8} 4 ${len * 0.4} 4.2 0 3.4 Z`} fill={far ? 'url(#mocPrimFar)' : 'url(#mocPrim)'} stroke="#3A3F45" strokeWidth="0.35"/>
      ))}
      {/* coverts with the two white wing bars */}
      <path d="M -2 -1 C 8 -4.5 19 -4.8 28 -2.4 C 27 2.8 21 7.6 12 9 C 5 9.4 0 7.4 -2 4 Z" fill={far ? '#454A50' : '#5A6168'}/>
      {!far && <path d="M 3 2.6 C 9 4.4 15 4.4 21 2.4 M 4 6.6 C 9 8.2 14 8.2 19 6.4" stroke="#F4F4F2" strokeWidth="1.2" fill="none" strokeLinecap="round"/>}
    </g>
  )
}

function FannedTail() {
  const feather = (a, fill, k) => (
    <path key={k} transform={`rotate(${a})`} d="M 0 -2.6 C 12 -4.4 28 -4.8 35 -3.2 C 38 -1.4 38 1.4 35 3.2 C 28 4.8 12 4.4 0 2.6 Z" fill={fill} stroke="#3A3F45" strokeWidth="0.35"/>
  )
  return (
    <g transform="translate(70,80)">
      {feather(4, '#FFF', 'o1')}{feather(56, '#FFF', 'o2')}
      {feather(12, '#F2F2EF', 'o3')}{feather(48, '#F2F2EF', 'o4')}
      {[20, 30, 40].map(a => feather(a, TAIL, a))}
    </g>
  )
}

function Post() {
  return (
    <g>
      <path d="M 70 103 L 120 101 L 120 108 L 70 110 Z" fill="#7B5B3E"/>
      <path d="M 70 117 L 120 115 L 120 121 L 70 123 Z" fill="#7B5B3E"/>
      <path d="M 43 99 L 69 99 L 70 130 L 42 130 Z" fill="#9A7650"/>
      <path d="M 41.5 96.5 C 49 94.6 62 94.6 70.5 96.5 L 70 100.5 L 42 100.5 Z" fill="#6E5034"/>
      <path d="M 49 104 L 48 128 M 58 103 C 57 112 59 118 58 128 M 64 106 L 64.5 116" stroke="#7A5A3C" strokeWidth="0.9" fill="none"/>
      <ellipse cx="54" cy="113" rx="2" ry="3" fill="#6E5034" opacity="0.7"/>
      <Lawn y={124}/>
    </g>
  )
}

function Lawn({ y = 112 }) {
  const blades = []
  for (let i = 0; i < 24; i++) { const x = 2 + i * 5 + (i % 3); blades.push(`M ${x} ${y + 1} l ${(i % 2 ? 1.5 : -1.5)} -${3 + (i % 4)}`) }
  return (
    <g>
      <path d={`M 0 ${y} C 30 ${y - 2} 80 ${y - 2} 120 ${y} L 120 130 L 0 130 Z`} fill="url(#mocLawn)"/>
      <path d={blades.join(' ')} stroke="#5E9A48" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function HollyBranch() {
  const leaf = (x, y, a, k) => (
    <path key={k} transform={`translate(${x},${y}) rotate(${a})`} d="M 0 0 L 3 -3 L 6 -2 L 8 -5 L 11 -3 L 14 -5 L 16 -1 L 14 1.5 L 11 3.5 L 8 2.5 L 5 4 L 3 2 Z" fill="#2E6A3A"/>
  )
  return (
    <g>
      <path d="M 18 104 C 40 98 70 96 116 90" stroke="#6A4A30" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M 82 94 C 88 102 92 108 96 116" stroke="#6A4A30" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {leaf(20, 104, 160, 'a')}{leaf(84, 96, 60, 'b')}{leaf(100, 92, -20, 'c')}{leaf(92, 112, 100, 'd')}{leaf(30, 101, 30, 'e')}
      {[[28, 108], [32, 109.5], [29.5, 111.5], [90, 100], [94, 101], [92, 104], [104, 95], [108, 94.5]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="2.3" fill="#D02A26"/><circle cx={x - 0.7} cy={y - 0.7} r="0.6" fill="#FFB0A0"/></g>
      ))}
    </g>
  )
}

export default function NorthernMockingbird({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.6, 0.4][frame] : 0
  const tilt = animated ? [0, 1.5, 3, 1.5, 0, -1, -2, -1][frame] : 0
  const note = animated ? frame : 2

  let bird, backdrop = null
  if (pose === 'wing-flash') {
    // On the lawn, both wings lifted high to flash the white patches; tail fanned.
    backdrop = scene ? <Lawn y={110}/> : <ellipse cx="58" cy="111" rx="30" ry="2.5" fill="#000" opacity="0.15"/>
    bird = (
      <g transform="translate(0,6)">
        <g transform="translate(60,58) rotate(-104) scale(0.92)"><OpenWing far/></g>
        <g transform={`rotate(${-12 - tilt} 70 80)`}><FannedTail/></g>
        <Legs y={104}/>
        <Body/>
        <path d="M 47 61 C 55 57 64 57 71 61 C 63 62 55 63 48 65 Z" fill="#7E858C"/>
        <g transform="translate(55,62) rotate(-58)"><OpenWing/></g>
        <g transform="translate(-2,1)"><Head/></g>
      </g>
    )
  } else if (pose === 'berry') {
    backdrop = scene ? <HollyBranch/> : null
    bird = (
      <g transform="translate(2,4)">
        <Tail tilt={tilt - 6}/><Legs y={95}/><Body/><FoldedWing/>
        <g transform="rotate(14 40 58)"><Head/>
          <circle cx="16.4" cy="48.6" r="2.7" fill="#D02A26"/><circle cx="15.6" cy="47.8" r="0.7" fill="#FFB0A0"/>
        </g>
      </g>
    )
  } else if (pose === 'sing') {
    backdrop = scene ? <Post/> : null
    bird = (
      <g>
        <Tail tilt={tilt}/><Legs/><Body/><FoldedWing/>
        <g transform="rotate(-30 42 58)"><Head open/></g>
      </g>
    )
  } else {
    backdrop = scene ? <Post/> : null
    bird = <g><Tail tilt={tilt}/><Legs/><Body/><FoldedWing/><Head/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Northern Mockingbird">
      <defs>
        <linearGradient id="mocHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A9198"/><stop offset="100%" stopColor={GRAY}/>
        </linearGradient>
        <linearGradient id="mocBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8E959B"/><stop offset="38%" stopColor="#A9AFB4"/><stop offset="62%" stopColor="#DCDEDD"/><stop offset="100%" stopColor="#F0F0EC"/>
        </linearGradient>
        <linearGradient id="mocPrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF"/><stop offset="56%" stopColor="#FFF"/><stop offset="64%" stopColor="#3A3F45"/><stop offset="100%" stopColor="#24282C"/>
        </linearGradient>
        <linearGradient id="mocPrimFar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E4E4"/><stop offset="56%" stopColor="#E2E4E4"/><stop offset="64%" stopColor="#2E3237"/><stop offset="100%" stopColor="#1E2226"/>
        </linearGradient>
        <linearGradient id="mocLawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FAA52"/><stop offset="100%" stopColor="#3F7A34"/>
        </linearGradient>
      </defs>
      {backdrop}
      <g transform={`translate(0,${bob})`}>{bird}</g>
      {pose === 'sing' && (
        <g fill="#F2E6A8" opacity="0.95">
          <g transform={`translate(${10 - note * 0.6},${26 - note * 0.8})`}><ellipse cx="0" cy="6" rx="2.4" ry="1.8"/><path d="M 2 6 L 2 -2 L 5 -1" stroke="#F2E6A8" strokeWidth="1" fill="none"/></g>
          <g transform={`translate(${22 - note * 0.4},${16 - note * 0.6})`}><ellipse cx="0" cy="5" rx="2" ry="1.5"/><path d="M 1.8 5 L 1.8 -1.5" stroke="#F2E6A8" strokeWidth="1"/></g>
        </g>
      )}
    </svg>
  )
}
