// Ring-billed Gull (adult, fall/winter plumage) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'ring_billed_gull', poses: ['stand', 'call', 'fry', 'fly'] }

// Field marks (what separates it from Herring & Laughing Gulls): MEDIUM-sized, round-headed
// gull with a fairly SHORT, slim YELLOW BILL crossed by a complete BLACK RING near the tip;
// YELLOW LEGS; pale eye with a red orbital ring; PALE silver-gray back and wings (a shade
// paler than Herring); black wingtips with white "pearl" spots at rest and white mirrors in
// flight; white head finely freckled brown on the nape in fall/winter; white body and tail.

const GRAY = '#B9C5CF'
const GRAY_D = '#97A4B0'
const INK = '#16171A'
const LEG = '#E8C53A'
const LEG_D = '#B08D22'
const BILL = '#EECB43'

function Bill({ open = 0, fry = false }) {
  // Base at x≈27, tip at x≈10. Upper mandible rotates up, lower down, when calling.
  const up = 'M 28 42.4 C 21 42.4 14.5 43.2 10.2 45 C 8.2 45.9 8 47.6 9.4 48 L 28 48 Z'
  const lo = 'M 28 48 L 10 48 C 11.4 49 12.8 50 14.2 50.8 C 19 50.6 23.5 50.6 28 51.2 Z'
  return (
    <g>
      <clipPath id="rbgClipU"><path d={up}/></clipPath>
      <clipPath id="rbgClipL"><path d={lo}/></clipPath>
      {open > 0 && <path d="M 28.5 47 L 14 45.6 L 14.5 50.2 L 28.5 49.8 Z" fill="#C2413A"/>}
      <g transform={`rotate(${open} 28 48)`}>
        <path d={up} fill={BILL}/>
        <rect x="13.6" y="39" width="3.8" height="10" fill={INK} clipPath="url(#rbgClipU)"/>
        <path d="M 23.5 44.6 l -3.6 0.4" stroke="#8A7020" strokeWidth="0.7" strokeLinecap="round"/>
      </g>
      <g transform={`rotate(${-open * 0.8} 28 48)`}>
        <path d={lo} fill="#E2BC38"/>
        <rect x="13.6" y="46" width="3.8" height="7" fill={INK} clipPath="url(#rbgClipL)"/>
        {fry && (
          <g transform="rotate(50 12 48)">
            <rect x="9" y="46.4" width="18" height="3.6" rx="0.9" fill="#F2C462" stroke="#C98A2A" strokeWidth="0.6"/>
            <path d="M 15 47.6 h 5 M 22 47.8 h 3" stroke="#FFE6A8" strokeWidth="0.8" strokeLinecap="round"/>
          </g>
        )}
      </g>
    </g>
  )
}

function Head({ open = 0, blink = false, fry = false }) {
  // Profile facing left; round crown, centre ≈ (39,43).
  return (
    <g transform="translate(40,50) scale(1.12) translate(-40,-50)">
      <path d="M 26 47 C 25 36 32 29.5 40.5 29.5 C 49 29.5 53.5 37 52.5 45.5 C 52 52 49 57 47 62 L 34 62 C 29 58 26.2 53 26 47 Z" fill="url(#rbgWhite)"/>
      {/* fall/winter: fine brown freckles on the rear crown and nape */}
      {[[44, 35], [47.5, 37.5], [49.5, 41.5], [45.5, 40], [48.5, 46], [50.5, 50], [46, 44], [43, 38.5], [47.5, 52.5], [41, 34]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} l 1.6 0.9`} stroke="#8E7C68" strokeWidth="0.95" strokeLinecap="round" opacity="0.6"/>
      ))}
      {/* eye: pale yellow iris, red orbital ring, big catch-light */}
      {blink
        ? <path d="M 31 41.2 C 33 42.8 36 42.8 38 41.2" stroke="#5A5048" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="34.5" cy="41" r="3.7" fill="#F3EBB8" stroke="#D23A2E" strokeWidth="1.2"/>
            <circle cx="34.6" cy="41.1" r="1.75" fill="#141414"/>
            <circle cx="33.4" cy="39.8" r="1.05" fill="#FFF"/>
          </g>}
      <Bill open={open} fry={fry}/>
    </g>
  )
}

function Legs() {
  return (
    <g strokeLinecap="round">
      <path d="M 63 92 L 64 107.5" stroke={LEG_D} strokeWidth="2.6"/>
      <path d="M 64 107.5 l 6 2.6 q -3 1.2 -6 0 q -2.6 1.2 -5 -0.2 Z" fill={LEG_D}/>
      <path d="M 54 92 L 53 108" stroke={LEG} strokeWidth="2.8"/>
      <path d="M 53 108 l -7.5 2.8 q 3.6 1.4 7.4 -0.2 q 3.2 1.4 6.2 0 Z" fill={LEG} stroke={LEG_D} strokeWidth="0.5"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      {/* white tail tucked under the wingtips */}
      <path d="M 84 82 L 106 79.5 L 104 86 L 86 89 Z" fill="#F4F6F8" stroke="#D5DCE2" strokeWidth="0.5"/>
      <path d="M 38 56 C 27 64 26.5 84 38 93 C 50 101 72 100 88 90 L 103 81.5 C 96 74 80 64 60 57 C 52 54 44 53 38 56 Z" fill="url(#rbgWhite)"/>
      {/* folded wing + back: pale silver-gray */}
      <path d="M 41 60 C 49 53 66 54 82 63 C 92 68 99 73 104 78.5 L 100 80.5 C 88 85 72 87 58 86 C 50 85 44 81 41.5 75 C 39.5 70 39 64 41 60 Z" fill="url(#rbgMantle)"/>
      <path d="M 50 70 C 58 72 68 76 78 82 M 56 64 C 64 66 72 70 80 75" stroke={GRAY_D} strokeWidth="0.7" fill="none" opacity="0.7"/>
      {/* white tertial crescent and white trailing edge of the secondaries */}
      <path d="M 67 61 C 75 63.5 83 67.5 89 72" stroke="#FFF" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 47 82.5 C 60 86.2 76 86.4 92 82" stroke="#FFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* black primaries with a string of white "pearls" at the tips */}
      <path d="M 85 81 C 93 83 99 85.2 104 87.6 C 98 88.4 92 87.6 86 85.6 Z" fill={INK}/>
      <path d="M 86 78 C 95 80 103 83 110 86.6 C 104 87.4 96 86.4 88 83.4 Z" fill="#202226"/>
      <path d="M 86 74 C 96 76 108 80.5 116 85.2 C 110 85.8 100 84.4 88 80 Z" fill={INK}/>
      <circle cx="114.6" cy="85" r="1.3" fill="#FFF"/>
      <circle cx="109" cy="86.5" r="1.3" fill="#FFF"/>
      <circle cx="103.2" cy="87.6" r="1.25" fill="#FFF"/>
    </g>
  )
}

function FlyBird({ flex = 0, head }) {
  // Side view, wings raised in a "V": near wing large, far wing peeking behind.
  return (
    <g>
      {/* far wing */}
      <g transform={`rotate(${-flex} 60 58)`}>
        <path d="M 52 57 C 55 45 61 33 68 23 L 81 5 C 81 14 79 24 77 34 C 75 42 74 50 73 57 Z" fill={GRAY_D}/>
        <path d="M 72.6 17 L 81 5 C 81 10.5 80.2 16.5 79 22 C 76.6 21 74.4 19.4 72.6 17 Z" fill={INK}/>
        <circle cx="79.4" cy="9.4" r="1.25" fill="#FFF"/>
      </g>
      {/* tail and tucked yellow feet */}
      <path d="M 92 60 L 108 57 C 110 60 110 64 108 67 L 92 66 Z" fill="#F4F6F8" stroke="#D5DCE2" strokeWidth="0.5"/>
      <path d="M 90 66 l 9 2.5 l -1 2 Z" fill={LEG}/>
      {head}
      {/* body */}
      <path d="M 25 59 C 34 49 60 50 78 53 C 88 55 96 58 100 61 C 96 66 86 70 72 71 C 56 72 36 71 27 65 Z" fill="url(#rbgWhite)"/>
      {/* near wing: silver-gray arm, black hand with white mirrors, white trailing edge */}
      <g transform={`rotate(${flex} 64 58)`}>
        <path d="M 46 59 C 52 47 61 38 72 32 L 106 8 C 101 17 94 26 88 33 C 84 42 82 50 82 60 Z" fill="url(#rbgMantle)"/>
        <path d="M 89 21 L 106 8 C 102 15 97 22 92 28 C 90.5 26 89.5 23.5 89 21 Z" fill={INK}/>
        <path d="M 84 24 L 89 21 C 89.5 23.5 90.5 26 92 28 L 88 31 C 86 29 84.6 26.6 84 24 Z" fill="#2A2C30"/>
        <ellipse cx="100.5" cy="13.6" rx="2" ry="1.4" fill="#FFF" transform="rotate(-36 100.5 13.6)"/>
        <ellipse cx="95" cy="19.5" rx="1.6" ry="1.1" fill="#FFF" transform="rotate(-36 95 19.5)"/>
        <path d="M 82 60 C 82 50 84 42 88 33 C 89.5 31 90.8 29.3 92 28" stroke="#FFF" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M 60 52 C 66 46 72 40 80 34" stroke={GRAY_D} strokeWidth="0.7" fill="none"/>
      </g>
    </g>
  )
}

function Scene({ fly }) {
  // City parking lot — the Ring-billed Gull's favourite "beach".
  return (
    <g>
      <rect x="0" y="105" width="120" height="25" fill="url(#rbgLot)"/>
      <path d="M 0 105 L 120 105" stroke="#8C949C" strokeWidth="1.2" opacity="0.7"/>
      <path d="M 82 130 L 93 105 L 98.5 105 L 88 130 Z" fill="#E6C24A" opacity="0.85"/>
      {[[12, 114], [30, 122], [46, 116], [70, 125], [108, 113], [104, 124], [20, 127], [60, 119]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#9AA0A8" opacity="0.6"/>
      ))}
      <ellipse cx="26" cy="118" rx="12" ry="2.6" fill="#7FA6C4" opacity="0.45"/>
      {fly
        ? <ellipse cx="64" cy="117" rx="20" ry="2.4" fill="#000" opacity="0.18"/>
        : <g transform="rotate(14 100 115)"><rect x="96" y="114" width="11" height="2.6" rx="0.7" fill="#F2C462" stroke="#C98A2A" strokeWidth="0.5"/></g>}
    </g>
  )
}

export default function RingBilledGull({ size = 120, animated = false, style = {}, pose = 'stand', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.3, 0.5, 0.3][frame] : 0
  const blink = animated && frame === 5
  const flex = animated ? [0, 2, 4, 2, 0, -2, -4, -2][frame] : 0

  let bird
  if (pose === 'fly') {
    bird = <g transform={`translate(0,${4 + bob * 2})`}><FlyBird flex={flex} head={<g transform="translate(-6,8) scale(0.92) translate(5,0)"><Head blink={blink}/></g>}/></g>
  } else if (pose === 'call') {
    // Neck stretched, head tilted up, bill open: the squealing "kyow" call.
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><g transform="rotate(-18 46 60) translate(0,-2)"><Head open={14} blink={blink}/></g></g></g>
  } else if (pose === 'fry') {
    // A stolen french fry — the classic parking-lot Ring-bill.
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><g transform="rotate(6 46 60)"><Head open={5} fry blink={blink}/></g></g></g>
  } else {
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><Head blink={blink}/></g></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Ring-billed Gull">
      <defs>
        <linearGradient id="rbgWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F6F8FA"/><stop offset="100%" stopColor="#DCE3EA"/>
        </linearGradient>
        <linearGradient id="rbgMantle" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#CBD4DC"/><stop offset="100%" stopColor={GRAY}/>
        </linearGradient>
        <linearGradient id="rbgLot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A6068"/><stop offset="100%" stopColor="#3C4046"/>
        </linearGradient>
      </defs>
      {scene && <Scene fly={pose === 'fly'}/>}
      {!scene && pose !== 'fly' && <ellipse cx="57" cy="110" rx="17" ry="2.4" fill="#000" opacity="0.2"/>}
      {/* Medium-sized: standing birds are scaled about the feet so the three gulls read as different sizes. */}
      {(pose !== 'fly') ? <g transform="translate(58,110) scale(0.95) translate(-58,-110)">{bird}</g> : bird}
    </svg>
  )
}
