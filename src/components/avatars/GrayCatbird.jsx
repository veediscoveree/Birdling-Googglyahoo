// Gray Catbird — "accurate first, cute second, in habitat" (see WoodDuck.jsx for conventions).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'gray_catbird', poses: ['tail-cock', 'berry'] }

// Field marks: slate gray all over (a touch paler below); neat BLACK CAP from bill to nape;
// RUFOUS-CHESTNUT UNDERTAIL COVERTS (the patch under the tail — shown in every pose, biggest when
// the tail is cocked); long blackish rounded tail; darker gray wings with blackish primaries;
// dark eye; slim black bill; dark legs. Lives deep in thickets — scene is a fall tangle.

const SLATE = '#6C747D'

function Head({ open = false }) {
  return (
    <g>
      <circle cx="36" cy="48" r="12.6" fill="url(#gcaHead)"/>
      {/* black cap */}
      <path d="M 24.2 46 C 23.4 37 30.5 33.6 37.5 33.8 C 45 34 49.6 38.6 49.8 45.4 C 45.6 42.6 40.4 41.6 35.4 41.8 C 31 42 27.4 43.6 24.2 46 Z" fill="#141516"/>
      <path d="M 30 37 C 33 35.6 37 35.4 40 36" stroke="#3A3D42" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* big dark eye, soft gray eye-ring, catch-light */}
      <circle cx="31.6" cy="47.4" r="4.3" fill="#8E969E"/>
      <circle cx="31.6" cy="47.4" r="3.6" fill="#2B1C16"/>
      <circle cx="31.6" cy="47.4" r="2.2" fill="#0C0C0C"/>
      <circle cx="30.3" cy="46.1" r="1.2" fill="#FFF"/>
      <circle cx="33" cy="48.8" r="0.5" fill="#FFF" opacity="0.7"/>
      {/* slim black bill */}
      {open ? (
        <g>
          <path d="M 25 46.6 C 20 45.4 16 44.6 12.6 44.6 C 16 46.6 20.5 48 25 48.6 Z" fill="#161616"/>
          <path d="M 25 49.4 C 21 50.8 17.5 52.4 14.6 54.4 C 18.4 54 22 52.6 25.4 51.4 Z" fill="#1E1E20"/>
          <path d="M 25 48.4 L 25.3 49.6 L 19 50.6 Z" fill="#B85E64"/>
        </g>
      ) : (
        <path d="M 25 46.6 C 20.5 47 16.2 48.2 13 50.4 C 16.6 50.8 21 50.4 25.3 50.2 Z" fill="#161616"/>
      )}
    </g>
  )
}

function Body() {
  return (
    <g>
      <path d="M 32 61 C 33.5 52.5 44 50 56 52 C 68 54 78 60.5 82 69.5 C 84.5 78 78.5 86 66 88 C 52 90 40 85.5 35 76.5 C 33 71.5 31.8 66 32 61 Z" fill="url(#gcaBody)"/>
      <path d="M 38 74 C 42 80 50 84 60 84.6" stroke="#8C949C" strokeWidth="0.8" fill="none" opacity="0.7"/>
    </g>
  )
}

function Wing() {
  return (
    <g>
      <path d="M 46 61 C 55 55 69 57 77.5 65 C 83 71 87 78 90 84 C 82 84.6 72 82 63 78 C 54 74 47 68.5 46 61 Z" fill="#59616A"/>
      <path d="M 46 61 C 53 56.4 62 55.8 69 58.4 C 61 59.4 53 61 47 64.6 Z" fill="#646C75"/>
      {/* feather edges */}
      <path d="M 52 66 C 58 64 64 64.6 70 67.4 M 56 71.4 C 62 70 68 71 74 74" stroke="#7A828B" strokeWidth="0.8" fill="none"/>
      {/* blackish primaries */}
      <path d="M 72 75 C 78 76.4 85 80 90 84 C 83 84.4 76 82.6 69.6 80 Z" fill="#2E3338"/>
      <path d="M 75 78.6 C 80 80.6 84 82.4 88 84" stroke="#4E555C" strokeWidth="0.6" fill="none"/>
    </g>
  )
}

// Rufous undertail coverts — the catbird's "secret" field mark.
// Sits behind the legs, tucked under the base of the tail.
function Undertail({ big = false }) {
  if (big) return (
    <g>
      <path d="M 66 80 C 72 72 82 70 88 74 C 90 82 86 90 78 93 C 72 92 67.4 87 66 80 Z" fill="url(#gcaRufous)"/>
      <path d="M 70 82 C 74 85 78 86 83 85 M 71 87 C 75 89.4 79 90 83 89" stroke="#7A3216" strokeWidth="0.6" fill="none" opacity="0.8"/>
    </g>
  )
  return (
    <g>
      <path d="M 69 84.6 C 75 80.6 84 80 91 82.6 C 90 87.6 84.6 92 77.4 92.2 C 73.4 90.8 70.4 88.2 69 84.6 Z" fill="url(#gcaRufous)"/>
      <path d="M 73 87 C 76.5 88.6 80.5 89 84.5 88 M 75.5 90.4 C 78.5 91 81.5 90.8 84 90" stroke="#7A3216" strokeWidth="0.6" fill="none" opacity="0.8"/>
    </g>
  )
}

function Tail({ angle = 0 }) {
  // Drawn resting (angled down-back); rotated about the rump to cock it.
  return (
    <g transform={`rotate(${angle} 76 78)`}>
      <path d="M 72 73 C 84 80 98 90 110 99 C 112 102.5 111 106.5 107.6 107.6 C 95 101 82 93 69 86 Z" fill="url(#gcaTail)"/>
      <path d="M 76 82 C 87 89 97 96 108 103" stroke="#3C4248" strokeWidth="0.6" fill="none" opacity="0.9"/>
    </g>
  )
}

function Legs({ y = 97 }) {
  return (
    <g stroke="#1E2022" strokeWidth="1.9" strokeLinecap="round" fill="none">
      <path d={`M 52 86 L 50.5 ${y}`}/><path d={`M 59 87 L 59.5 ${y - 0.6}`}/>
      <path d={`M 50.5 ${y} l -4.2 0.4 M 50.5 ${y} l 3.4 1 M 59.5 ${y - 0.6} l -4.2 0.4 M 59.5 ${y - 0.6} l 3.4 1`} strokeWidth="1.4"/>
    </g>
  )
}

function Thicket({ berries = false }) {
  const leaf = (x, y, a, c, k, s = 1) => (
    <path key={k} transform={`translate(${x},${y}) rotate(${a}) scale(${s})`} d="M 0 0 C 3 -4 9 -5 14 -1 C 9 3 3 3.4 0 0 Z" fill={c}/>
  )
  return (
    <g>
      {/* soft background tangle */}
      <ellipse cx="96" cy="50" rx="30" ry="26" fill="#284A30" opacity="0.55"/>
      <ellipse cx="10" cy="74" rx="22" ry="20" fill="#284A30" opacity="0.45"/>
      <path d="M 120 30 C 100 46 92 64 96 96 M 0 52 C 14 60 22 74 26 98 M 104 128 C 100 112 104 100 114 90" stroke="#4A3524" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* main perch twig */}
      <path d="M 2 104 C 30 99 70 97 118 93" stroke="#5C4128" strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M 86 95.6 C 92 102 96 110 98 122 M 26 101 C 20 110 18 118 18 128" stroke="#5C4128" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {leaf(96, 110, 60, '#C9A03A', 'a')}{leaf(18, 116, 100, '#B4602E', 'b')}{leaf(104, 92, -30, '#7E9A3E', 'c')}
      {leaf(8, 103, 200, '#C9A03A', 'd', 0.9)}{leaf(112, 60, 150, '#7E9A3E', 'e', 0.9)}{leaf(98, 40, 210, '#B4602E', 'f', 0.8)}
      {leaf(14, 64, -40, '#7E9A3E', 'g', 0.8)}
      {berries && <g>
        {/* pokeweed: dark purple berries on a magenta stalk */}
        <path d="M 30 100.6 C 32 106 33 111 36 116 M 32.6 107 l 4 0.6 M 34 111 l -4 2" stroke="#C02A7A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {[[36, 116], [37, 107.6], [29.6, 113.2], [32.6, 118.4], [38.6, 119.6], [35, 121.8]].map(([x, y], i) => (
          <g key={i}><circle cx={x} cy={y} r="2.4" fill="#4E2066"/><circle cx={x - 0.7} cy={y - 0.7} r="0.7" fill="#C8A8DA"/></g>
        ))}
      </g>}
    </g>
  )
}

export default function GrayCatbird({ size = 120, animated = false, style = {}, pose = 'tail-cock', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.4, -0.8, -0.4, 0, 0.3, 0.5, 0.3][frame] : 0
  const flick = animated ? [0, 0, -4, -8, -4, 0, 0, 0][frame] : 0

  let bird
  if (pose === 'tail-cock') {
    // Leans forward and cocks the long tail high, flashing the rufous undertail.
    bird = (
      <g transform="rotate(8 55 96)">
        <Tail angle={-84 + flick}/><Legs/><Body/><Undertail big/><Wing/><Head/>
      </g>
    )
  } else if (pose === 'mew') {
    bird = (
      <g>
        <Tail angle={-10 + flick}/><Legs/><Body/><Undertail/><Wing/>
        <g transform="rotate(-10 42 60)"><Head open/></g>
      </g>
    )
  } else if (pose === 'berry') {
    bird = (
      <g>
        <Tail angle={-6 + flick}/><Legs/><Body/><Undertail/><Wing/>
        <g transform="rotate(10 42 60)"><Head/>
          <circle cx="15.6" cy="50" r="2.6" fill="#4E2066"/><circle cx="14.8" cy="49.2" r="0.7" fill="#C8A8DA"/>
        </g>
      </g>
    )
  } else {
    bird = <g><Tail angle={flick}/><Legs/><Body/><Undertail/><Wing/><Head/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Gray Catbird">
      <defs>
        <linearGradient id="gcaHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#636B74"/><stop offset="100%" stopColor="#737B84"/>
        </linearGradient>
        <linearGradient id="gcaBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#626A73"/><stop offset="100%" stopColor="#7F878F"/>
        </linearGradient>
        <linearGradient id="gcaTail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#30353B"/><stop offset="100%" stopColor="#1A1D20"/>
        </linearGradient>
        <radialGradient id="gcaRufous" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#C0602E"/><stop offset="100%" stopColor="#8E3E1C"/>
        </radialGradient>
      </defs>
      {scene && <Thicket berries={pose === 'berry'}/>}
      <g transform={`translate(0,${bob})`}>{bird}</g>
      {pose === 'mew' && (
        <g transform="translate(2,14)">
          <path d="M 2 4 C 2 0 5 -2 9 -2 L 25 -2 C 29 -2 31 0 31 4 L 31 11 C 31 15 29 17 25 17 L 14 17 L 10 22 L 10 17 L 9 17 C 5 17 2 15 2 11 Z" fill="#F4F1E6" opacity="0.95"/>
          <text x="16.5" y="12.6" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic" fill="#4A4F55">mew</text>
        </g>
      )}
    </svg>
  )
}
