// American Kestrel (adult male) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'american_kestrel', poses: ['perch', 'hover', 'bob', 'stoop'] }

// Field marks: tiny falcon with a big round head; blue-gray crown with a RUFOUS crown spot;
// white cheeks & throat with TWO vertical black facial stripes (mustache below the eye +
// "sideburn" behind the cheek); black "false eye" spot on the nape; dark eye with yellow
// orbital ring; small hooked blue-gray bill with yellow cere; RUFOUS BACK barred black;
// BLUE-GRAY WINGS spotted black with dark primaries; peachy-buff breast fading to cream,
// spotted black on the flanks; long RUFOUS TAIL with a broad BLACK SUBTERMINAL BAND and
// WHITE TIP; yellow-orange feet. Pointed falcon wings in flight.

const RUF = '#CE6328'
const BLK = '#1C1A1E'
const BLUE = '#8299BE'

function Head({ blink = false }) {
  // Profile facing left; centre ≈ (47,36).
  return (
    <g>
      {/* nape (buff-rufous) + white face */}
      <path d="M 32 38 C 31 27 38 21 47 21 C 56 21 63 27 63 36 C 63 43 60 48 55 51 C 50 53.4 43 53 38 49.6 C 34.6 46.6 32 42.6 32 38 Z" fill="#FBF6EE"/>
      <path d="M 54 30 C 59 30 63 33 63 37 C 63 43 60 48 55 51 L 54 30 Z" fill="#E9B67E"/>
      {/* blue-gray cap with rufous crown spot */}
      <path d="M 32.6 34 C 33.4 25.6 39.6 21 47 21 C 55 21 61.4 25.6 62.6 33.2 C 58 30.6 52.6 29.6 47 30 C 41.6 30.4 36.6 32 32.6 34 Z" fill="url(#amkCap)"/>
      <ellipse cx="51" cy="24.8" rx="5" ry="2.6" fill={RUF}/>
      {/* false eye on the nape */}
      <ellipse cx="60.4" cy="40.4" rx="1.9" ry="2.8" fill={BLK}/>
      {/* sideburn (rear stripe) and mustache (below the eye) */}
      <path d="M 51.6 32.6 C 50.4 38 50.8 44 52.6 49.6 L 55.6 49 C 54.4 43.8 54.4 38 55.2 33.4 Z" fill={BLK}/>
      <path d="M 39.6 37.6 C 38.6 41.6 38.8 46 40.4 50 L 43.8 49.8 C 42.8 46 43 42 44.4 38.4 Z" fill={BLK}/>
      {/* eye with yellow orbital ring */}
      {blink
        ? <path d="M 37.8 34.4 C 40 36 44.4 36 46.4 34.4" stroke={BLK} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="42" cy="34" r="5.4" fill="#F2C232"/>
            <circle cx="42" cy="34" r="4.3" fill="#3A1E0E"/>
            <circle cx="42" cy="34.1" r="2.5" fill="#0C0604"/>
            <circle cx="40.5" cy="32.5" r="1.4" fill="#FFF"/>
          </g>}
      {/* small hooked bill + cere */}
      <path d="M 34 34.2 C 30.6 34.2 28.6 36.2 28.3 39 C 28.2 40.4 28.8 41.5 29.6 41.9 C 29.8 40.5 30.6 39.5 32 39.1 L 34.6 38.7 Z" fill="#5C6A82"/>
      <path d="M 29.8 37.4 C 28.8 38.6 28.4 40.4 29.6 41.9 C 29.8 40.5 30.4 39.6 31 39.2 Z" fill={BLK}/>
      <path d="M 35.8 33.6 C 34.2 33.6 33.2 34.6 33.2 36 L 33.2 38.2 C 34.2 38.6 35.4 38.6 36.4 38.2 Z" fill="#F2C232"/>
    </g>
  )
}

function Spots({ pts, r = 0.9 }) {
  return pts.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 1.25} fill={BLK} opacity="0.85"/>)
}

function Tail({ d, band, tip }) {
  return (
    <g>
      <path d={d} fill="url(#amkTail)"/>
      <path d={band} stroke={BLK} strokeWidth="4" fill="none"/>
      <path d={tip} stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function PerchedBody({ tailUp = 0 }) {
  return (
    <g>
      <g transform={`rotate(${-tailUp} 64 84)`}>
        <Tail d="M 60 82 C 63 96 66 108 68 121 C 71.6 123 77 123 80.6 121 C 79 107 74 94 69 80 Z"
          band="M 67.4 114.4 C 71.6 116 76.6 116 80 114.4" tip="M 68 121 C 71.6 123 77 123 80.6 121"/>
      </g>
      {/* peachy breast fading to cream, black spots */}
      <path d="M 39 48 C 33 57 32 72 37 83 C 41 90 49 93 56 91 C 62 89 66 82 66 74 L 64 54 C 58 48 49 46 39 48 Z" fill="url(#amkBreast)"/>
      <Spots pts={[[38, 70], [41.6, 75], [37.4, 78], [44, 81], [40.4, 84], [47.4, 85.6], [44.2, 71.4], [48, 77]]}/>
      {/* rufous back barred black, above the wing */}
      <path d="M 52 47 C 60 45 67 49 69 57 L 66 66 C 62 60 58 55 53 53 Z" fill={RUF}/>
      <path d="M 58 48.6 l 3 2 M 63 50.6 l 3 2.4 M 64.6 56 l 3 2" stroke={BLK} strokeWidth="1.2" strokeLinecap="round"/>
      {/* blue-gray folded wing with black spots, dark primaries */}
      <path d="M 54 53 C 63 50 70 57 71 67 C 72 78 72 88 73 99 C 68 95 63 87 60 79 C 56.6 70 54.6 62 54 53 Z" fill="url(#amkWing)"/>
      <Spots pts={[[60, 60], [65, 62], [62, 66.6], [67, 68], [63.6, 72.4], [68, 74.6]]} r={1}/>
      <path d="M 65 80 C 68 88 70.6 94 73 99 C 68.6 96 64.6 90 62.4 84 Z" fill="#2A2C36"/>
      <path d="M 66 82 l 4 12" stroke="#5A6070" strokeWidth="0.6"/>
    </g>
  )
}

function Feet({ y = 92 }) {
  return (
    <g>
      <path d={`M 45 ${y} c 0 -2.6 2.4 -3.4 4.4 -3.4 l 2.6 0 c 1.6 0 2.6 1 3 2.8`} fill="#F2A81E" stroke="#B87A10" strokeWidth="0.6"/>
      <path d={`M 53 ${y + 0.4} c 0 -2.6 2.4 -3.4 4.4 -3.4 l 2.6 0 c 1.6 0 2.6 1 3 2.8`} fill="#F2A81E" stroke="#B87A10" strokeWidth="0.6"/>
      <path d={`M 45.4 ${y} l -0.8 1.6 M 53.4 ${y + 0.4} l -0.8 1.6 M 55 ${y - 0.6} l 0.4 1.8 M 63 ${y - 0.2} l 0.4 1.8`} stroke={BLK} strokeWidth="1" strokeLinecap="round"/>
    </g>
  )
}

function Perched({ tailUp, blink, lean = 0 }) {
  return (
    <g transform={`rotate(${lean} 54 92)`}>
      <PerchedBody tailUp={tailUp}/>
      <Feet/>
      <Head blink={blink}/>
    </g>
  )
}

function Hover({ up }) {
  // Hanging in the wind: body tilted up, tail fanned, pointed wings fluttering, head held level.
  const near = up
    ? 'M 58 56 C 62 44 68 34 76 26 C 81 20 86 14 92 7 C 93 15 91 23 87 30 C 82 38 76 46 68 58 Z'
    : 'M 58 56 C 68 52 80 50 92 50 C 99 50 106 51 112 53 C 105 56 98 58 90 60 C 82 62 74 62 66 62 Z'
  const far = up
    ? 'M 52 52 C 54 40 58 28 64 18 C 66 13 68 9 71 5 C 73 13 71 23 67 31 C 63 39 59 46 57 53 Z'
    : 'M 52 50 C 60 44 70 41 82 40 C 88 40 94 41 99 42 C 92 45 84 47 76 49 C 68 51 60 52 54 53 Z'
  const dark = up ? 'M 0 0 L 120 0 L 120 28 L 74 34 Z' : 'M 88 0 L 120 0 L 120 80 L 86 80 Z'
  return (
    <g>
      <clipPath id="amkClipF"><path d={far}/></clipPath>
      <clipPath id="amkClipN"><path d={near}/></clipPath>
      <path d={far} fill="#6E84AA"/>
      <path d={dark} fill="#2A2C36" clipPath="url(#amkClipF)"/>
      <Tail d="M 64 80 L 58 104 C 66 111 82 112 93 102 L 74 77 Z"
        band="M 59.4 98.6 C 67 104.6 80 105.4 89.6 98" tip="M 58 104 C 66 111 82 112 93 102"/>
      <path d="M 44 52 C 52 45 65 50 71 61 C 77 71 77 81 71 85 C 63 88 51 80 45 70 C 41 62 40 56 44 52 Z" fill="url(#amkBreast)"/>
      <path d="M 54 47 C 62 47 70 54 74 64 C 70 60 64 56 58 54 Z" fill={RUF}/>
      <Spots pts={[[50, 70], [54.4, 75], [59, 79.4], [55, 69], [60, 74], [64.6, 80]]}/>
      <path d={near} fill="url(#amkWing)"/>
      <path d={dark} fill="#2A2C36" clipPath="url(#amkClipN)"/>
      <Spots pts={up ? [[66, 46], [70, 40], [64, 52], [72, 47]] : [[70, 56], [76, 55], [82, 55], [74, 59]]} r={1}/>
      <g transform="translate(46,44) rotate(14) scale(0.9) translate(-47,-38)"><Head/></g>
    </g>
  )
}

function Stoop() {
  // Diving head-first with wings swept back into an arrow — seen from the side.
  return (
    <g transform="rotate(-38 60 62)">
      <path d="M 56 58 C 70 52 86 48 102 45 C 92 52 80 58 70 62 Z" fill="#6E84AA"/>
      <path d="M 88 49 C 93 47.4 98 46 102 45 C 97 49 92 52 87 55 Z" fill="#2A2C36"/>
      <Tail d="M 82 59.6 L 108 58.4 C 110 61 110 64 108 66.6 L 82 66.4 Z"
        band="M 101.6 58.6 C 102.6 61.6 102.6 64.4 101.6 66.8" tip="M 108.2 58.6 C 110 61 110 64 108.2 66.4"/>
      <path d="M 40 62 C 44 54 58 52 72 55 C 80 57 86 60 88 63 C 84 67 76 70 66 71 C 54 72 44 70 40 62 Z" fill={RUF}/>
      <path d="M 42 65 C 50 70.6 62 72 76 69 C 68 73.4 52 74.4 44 70 Z" fill="url(#amkBreast)"/>
      <path d="M 60 55.4 l 1.2 3 M 66 56 l 1.2 3 M 72 57.4 l 1.2 3 M 78 59.4 l 1 2.6" stroke={BLK} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 54 63 C 66 65 84 69 106 77 C 94 78.4 80 77 68 74 C 62 72 57 68 54 63 Z" fill="url(#amkWing)"/>
      <path d="M 86 70.4 C 93 72.6 100 74.6 106 77 C 100 77.6 93 77.4 86 76.4 Z" fill="#2A2C36"/>
      <Spots pts={[[62, 67], [68, 68.6], [74, 70.4], [66, 71.4], [72, 73]]} r={1}/>
      <g transform="translate(41,60) rotate(-6) scale(0.82) translate(-47,-38)"><Head/></g>
    </g>
  )
}

function Scene({ wire }) {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" rx="10" fill="url(#amkSky)"/>
      <path d="M 0 114 C 24 110 50 112 72 110 C 92 108 108 111 120 110 L 120 130 L 0 130 Z" fill="#C9B46A"/>
      <path d="M 0 120 C 34 117 70 119 120 116 L 120 130 L 0 130 Z" fill="#A89448"/>
      <path d="M 14 22 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.7"/>
      <path d="M 88 30 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.55"/>
      {wire && (
        <g>
          <path d="M 104 70 L 107 130 L 113 130 L 110 70 Z" fill="#7A6248"/>
          <path d="M 98 74 L 118 74" stroke="#6A5440" strokeWidth="2.4"/>
          <path d="M -2 88 Q 50 94 106 92" stroke="#2C2C30" strokeWidth="1.3" fill="none"/>
          <path d="M -2 100 Q 50 105 106 103" stroke="#2C2C30" strokeWidth="1.1" fill="none" opacity="0.8"/>
        </g>
      )}
    </g>
  )
}

export default function AmericanKestrel({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'hover' ? 160 : 420); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 6
  const perched = pose === 'perch' || pose === 'bob'

  let bird
  if (pose === 'hover') {
    bird = <Hover up={!animated || frame % 2 === 0}/>
  } else if (pose === 'stoop') {
    bird = <g transform={`translate(0,${bob})`}><Stoop/></g>
  } else if (pose === 'bob') {
    // Tail-pump: tail flicks up while the body tips forward.
    const pump = animated ? [14, 8, 2, 0, 0, 2, 8, 14][frame] : 14
    bird = <Perched tailUp={pump} lean={-pump * 0.25} blink={blink}/>
  } else {
    bird = <g transform={`translate(0,${bob * 0.5})`}><Perched tailUp={0} blink={blink}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Kestrel">
      <defs>
        <linearGradient id="amkCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9AAFD0"/><stop offset="100%" stopColor="#6E84AA"/>
        </linearGradient>
        <linearGradient id="amkWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9DB0D0"/><stop offset="100%" stopColor={BLUE}/>
        </linearGradient>
        <linearGradient id="amkBreast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2C996"/><stop offset="100%" stopColor="#FBF1E2"/>
        </linearGradient>
        <linearGradient id="amkTail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D86E30"/><stop offset="100%" stopColor="#C25A22"/>
        </linearGradient>
        <linearGradient id="amkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FC4E8"/><stop offset="100%" stopColor="#E2F0F6"/>
        </linearGradient>
      </defs>
      {scene && <Scene wire={perched}/>}
      {!scene && perched && <path d="M 18 91 Q 52 94 92 91" stroke="#2C2C30" strokeWidth="1.4" fill="none"/>}
      {bird}
      {pose === 'stoop' && <path d="M 92 22 l 10 -10 M 100 30 l 12 -12 M 84 16 l 8 -8" stroke="#FFF" strokeWidth="1.2" opacity="0.6" strokeLinecap="round"/>}
    </svg>
  )
}
