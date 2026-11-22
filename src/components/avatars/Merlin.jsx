// Merlin (adult male, eastern "Taiga" Merlin) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions. Females/juveniles are brown above, not blue.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'merlin', poses: ['perch', 'flight', 'snack', 'scan'] }

// Field marks: SMALL, STOCKY, DARK falcon with a big round head; SLATE BLUE-GRAY crown, back
// and wings with fine black shaft streaks; plain face with only a FAINT, THIN MUSTACHE (no bold
// helmet like a Peregrine, no double stripes like a Kestrel); faint pale eyebrow; buffy cheek,
// white throat; dark eye; small blue-gray hooked bill with YELLOW CERE; BUFF-ORANGE underparts
// with HEAVY DARK STREAKS; DARK TAIL with a few NARROW PALE BANDS and a white tip; wingtips fall
// well short of the tail tip when perched; yellow-orange feet. In flight: pointed wings, fast
// and direct — never hovers.

const BLK = '#1E1C1E'
const SLATE = '#56688A'
const YEL = '#F0B828'

function Head({ blink = false }) {
  // Profile facing left; centre ≈ (47,36).
  return (
    <g>
      {/* buffy face and white throat */}
      <path d="M 31.6 38 C 31 27 38 21 47 21 C 56.4 21 63.4 27 63.4 36.4 C 63.4 43.6 60 48.6 55 51.4 C 50 53.8 43 53.4 38 50 C 34.4 47 31.6 42.6 31.6 38 Z" fill="#EED8B8"/>
      <path d="M 33.6 42 C 35 47 39 50.6 44 52 C 40 52 36 49.6 34.4 46.4 Z" fill="#FFF"/>
      {/* slate crown & nape */}
      <path d="M 32.2 35 C 33 26 39.6 21 47 21 C 56 21 63.4 27 63.4 36.4 C 63.4 41 62 45 59.6 48 C 58.6 43 57.6 38 54 34.4 C 49 31.6 40 31.6 32.2 35 Z" fill="url(#merCap)"/>
      {[[42, 25], [47, 24], [52, 25.4], [56, 28], [45, 28.4], [50, 28.6], [58, 33], [60, 38.6]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} l 1.2 2.4`} stroke={BLK} strokeWidth="0.9" strokeLinecap="round" opacity="0.75"/>
      ))}
      {/* faint pale eyebrow, buff nape collar */}
      <path d="M 35 31.4 C 40 29.6 46 29.6 51.6 31.6" stroke="#E8D8C0" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M 57 40 C 58.6 43 59 46 58.4 49 L 60.6 47 C 61 44 60.4 41.6 59.2 39.6 Z" fill="#E3A868"/>
      {/* cheek streaks and the FAINT thin mustache */}
      <path d="M 41.4 39.6 C 41 43 41.6 46.4 43.2 49.4" stroke="#5A4A44" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      {[[48, 41], [51, 43], [48.6, 45.6], [52.6, 47], [54.6, 42], [45.6, 47.6], [50.4, 49.4]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 0.6 1.8`} stroke="#6A5040" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>)}
      {/* eye: dark, with a narrow yellowish ring */}
      {blink
        ? <path d="M 37.6 35 C 40 36.8 44.2 36.8 46.4 35" stroke="#5A4A44" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="42" cy="34.6" r="5.5" fill="#E8D070"/>
            <circle cx="42" cy="34.6" r="4.7" fill="#2C1808"/>
            <circle cx="42" cy="34.7" r="2.7" fill="#0A0604"/>
            <circle cx="40.4" cy="33" r="1.5" fill="#FFF"/>
            <circle cx="43.8" cy="36.4" r="0.6" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* small hooked bill + yellow cere */}
      <path d="M 34 34.4 C 30.6 34.4 28.6 36.4 28.3 39.2 C 28.2 40.6 28.8 41.7 29.6 42.1 C 29.8 40.7 30.6 39.7 32 39.3 L 34.6 38.9 Z" fill="#62708A"/>
      <path d="M 29.8 37.6 C 28.8 38.8 28.4 40.6 29.6 42.1 C 29.8 40.7 30.4 39.8 31 39.4 Z" fill={BLK}/>
      <path d="M 35.8 33.8 C 34.2 33.8 33.2 34.8 33.2 36.2 L 33.2 38.4 C 34.2 38.8 35.4 38.8 36.4 38.4 Z" fill={YEL}/>
    </g>
  )
}

function Streaks({ pts, w = 1.9, len = 4.2 }) {
  // Heavy teardrop streaks on the underparts.
  return pts.map(([x, y], i) => (
    <path key={i} d={`M ${x} ${y} c -${w * 0.7} ${len * 0.4} -${w * 0.5} ${len} 0 ${len} c ${w * 0.5} 0 ${w * 0.7} -${len * 0.6} 0 -${len} Z`} fill="#3E2414" opacity="0.92"/>
  ))
}

function Tail({ d, bands, tip }) {
  return (
    <g>
      <path d={d} fill="#26282E"/>
      {bands.map((b, i) => <path key={i} d={b} stroke="#8A9AB4" strokeWidth="1.3" fill="none"/>)}
      <path d={tip} stroke="#F4F0E8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </g>
  )
}

const BREAST_STREAKS = [[38, 58], [43, 56.6], [36.4, 65], [41.4, 63], [46.4, 62], [39, 71], [44, 69.6], [49, 68], [37.6, 77.6], [42.6, 76], [47.6, 75], [52.4, 73], [41, 83], [46, 82], [51, 80.4], [55.6, 78]]

function PerchedBody() {
  return (
    <g>
      <Tail d="M 58 84 C 60.6 96 62.4 106 63.4 116 C 67 118.6 73.4 118.6 77 116 C 76 104 72.6 92 68 82 Z"
        bands={['M 61.4 97 C 65 99 70 99 74 97', 'M 62.6 104 C 66.4 106 71.4 106 75.4 104', 'M 63.4 110.6 C 67 112.6 72.4 112.6 76.4 110.6']}
        tip="M 63.4 116 C 67 118.6 73.4 118.6 77 116"/>
      {/* stocky buff-orange underparts, heavily streaked */}
      <path d="M 35 47 C 27 57 27 75 34 86 C 39 93 50 95 57 92 C 63 89 67 82 67 73 L 65 54 C 59 48 47 44 35 47 Z" fill="url(#merBreast)"/>
      <Streaks pts={BREAST_STREAKS}/>
      <path d="M 42 85 C 41 90 43 93 47 94 L 57 93.4 C 59.6 90 59 86 56 83 Z" fill="#E8B07C"/>
      <Streaks pts={[[46, 87], [50, 88], [54, 87]]} w={1.1} len={2.6}/>
      {/* slate back and folded wing — wingtips fall well short of the tail tip */}
      <path d="M 51 47 C 59 45 66 49 68 57 L 65 66 C 61 60 57 55 52 53 Z" fill="#4A5C7C"/>
      <path d="M 52 52 C 62 49 69 56 71 66 C 72.4 76 72.6 88 73 99 C 67.6 94 63 86 60 78 C 56.4 70 53.6 61 52 52 Z" fill="url(#merWing)"/>
      {[[59, 58], [63.4, 61], [60.4, 65], [65.6, 66.4], [62.6, 71], [67, 72.4]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} l 1.6 3`} stroke={BLK} strokeWidth="1" strokeLinecap="round" opacity="0.8"/>
      ))}
      <path d="M 64 79 C 67.4 86 70 92.6 73 99 C 68 95.6 64.4 90 62 84 Z" fill="#22242A"/>
      <path d="M 65.4 83 l 5 12" stroke="#4A5262" strokeWidth="0.6"/>
    </g>
  )
}

function Feet({ y = 94, lift = false }) {
  return (
    <g>
      {!lift && <path d={`M 45 ${y} c 0 -2.8 2.4 -3.6 4.6 -3.6 l 2.6 0 c 1.6 0 2.6 1 3 3`} fill={YEL} stroke="#B07A10" strokeWidth="0.6"/>}
      <path d={`M 53 ${y + 0.2} c 0 -2.8 2.4 -3.6 4.6 -3.6 l 2.6 0 c 1.6 0 2.6 1 3 3`} fill={YEL} stroke="#B07A10" strokeWidth="0.6"/>
      <path d={`${lift ? '' : `M 45.4 ${y} l -0.8 1.8 M 55.2 ${y - 0.6} l 0.4 2 `}M 53.4 ${y + 0.2} l -0.8 1.8 M 63.2 ${y - 0.4} l 0.4 2`} stroke={BLK} strokeWidth="1.1" strokeLinecap="round"/>
    </g>
  )
}

function Dragonfly({ x, y, r = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`}>
      <ellipse cx="-3" cy="-3" rx="6" ry="1.8" fill="#DDF0F8" opacity="0.85" transform="rotate(-30)"/>
      <ellipse cx="3" cy="-3" rx="6" ry="1.8" fill="#DDF0F8" opacity="0.85" transform="rotate(30)"/>
      <path d="M 0 -2 L 0 12" stroke="#2E7A9A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="0" cy="-2.6" r="1.8" fill="#3A9A6A"/>
    </g>
  )
}

function Perched({ blink, tilt, pose }) {
  if (pose === 'scan') {
    // Looking back over the shoulder: head flipped to face right, showing the slate crown.
    return (
      <g>
        <PerchedBody/>
        <Feet/>
        <g transform={`translate(52,34) rotate(${tilt}) scale(-0.98,0.98) translate(-46,-36)`}><Head blink={blink}/></g>
      </g>
    )
  }
  if (pose === 'snack') {
    // One foot raised to the bill holding a dragonfly — a classic migration snack.
    return (
      <g>
        <PerchedBody/>
        <Feet lift/>
        <path d="M 42 86 C 37 81 35.4 76 37 71.4 L 42.4 72 C 42.4 77 44.4 81 48 84.6 Z" fill="#E8B07C"/>
        <Streaks pts={[[39, 74], [41.6, 79]]} w={1.2} len={2.6}/>
        <path d="M 38.4 72 L 36 67.6" stroke={YEL} strokeWidth="2.6" strokeLinecap="round"/>
        <Dragonfly x={31.6} y={60} r={-24}/>
        <path d="M 32.4 66.4 q 2 -2.8 5 -1.4 M 34 68.6 q 2 -2.4 4.6 -1" stroke={YEL} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <g transform="rotate(16 48 50)"><Head blink={blink}/></g>
      </g>
    )
  }
  return (
    <g>
      <PerchedBody/>
      <Feet/>
      <g transform={`rotate(${tilt} 48 50)`}><Head blink={blink}/></g>
    </g>
  )
}

function Flight({ up }) {
  // Fast, direct flight to the left on pointed wings (side view, full upstroke / downstroke).
  const near = up
    ? 'M 56 56 C 60 44 66 34 74 26 C 79 20 84 14 90 8 C 91 16 89 24 85 31 C 80 39 74 47 67 58 Z'
    : 'M 56 60 C 64 66 72 74 80 84 C 84 90 88 96 92 102 C 85 100 78 95 72 88 C 66 80 61 72 60 64 Z'
  const far = up
    ? 'M 50 54 C 52 42 56 30 62 20 C 64 15 66 11 69 7 C 71 15 69 25 65 33 C 61 41 57 48 55 55 Z'
    : 'M 50 58 C 54 64 58 72 62 80 C 64 85 66 90 67 95 C 62 91 58 84 55 76 C 52 70 50 64 49 60 Z'
  return (
    <g>
      <path d={far} fill="#3E4E6A"/>
      <Tail d="M 82 56 L 106 54.6 C 108.4 57.6 108.4 62.4 106 65.4 L 82 64 Z"
        bands={['M 92 55.6 C 93 58.4 93 61.6 92 64.6', 'M 99 55 C 100 58 100 62 99 65']}
        tip="M 106.2 54.8 C 108.4 57.6 108.4 62.4 106.2 65.2"/>
      <path d="M 36 58 C 40 50 54 49 68 52 C 78 54 84 57 86 60 C 82 65 72 68 60 68 C 48 68 39 65 36 58 Z" fill="url(#merBreast)"/>
      <Streaks pts={[[48, 61], [53, 62], [58, 62.6], [63, 62.6], [68, 62], [73, 61], [52, 65.2], [58, 66], [64, 65.6]]} w={1.3} len={2.8}/>
      <path d="M 44 53 C 54 49 68 49 80 53 C 84 54.6 86 57 86 60 C 76 57.6 60 56 46 56.4 Z" fill="#4A5C7C"/>
      <path d={near} fill="url(#merWing)"/>
      <path d={up ? 'M 76 24 C 80 18 85 13 90 8 C 91 16 89 24 85 31 C 82 28 79 26 76 24 Z' : 'M 74 80 C 80 86 86 94 92 102 C 85 100 79 96 74 90 Z'} fill="#22242A"/>
      <g transform="translate(36,52) rotate(4) scale(0.8) translate(-47,-38)"><Head/></g>
    </g>
  )
}

function Scene({ snag }) {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" rx="10" fill="url(#merSky)"/>
      <path d="M 14 24 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.7"/>
      <path d="M 86 16 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.55"/>
      {/* autumn treetops below */}
      <path d="M 0 112 C 6 102 16 100 24 106 C 30 98 42 98 48 106 C 56 100 66 100 72 108 C 78 100 90 98 98 104 C 104 98 114 100 120 106 L 120 120 C 120 125.5 115.5 130 110 130 L 10 130 C 4.5 130 0 125.5 0 120 Z" fill="#B85A2A"/>
      {[[10, 112, '#D88A2E'], [32, 110, '#E0B040'], [58, 112, '#C8442A'], [84, 110, '#D88A2E'], [108, 112, '#7A8A3A'], [20, 122, '#C8682A'], [46, 122, '#E0A038'], [72, 124, '#B8482A'], [98, 122, '#D89A34']].map(([x, y, c], i) => (
        <ellipse key={i} cx={x} cy={y} rx="11" ry="7" fill={c}/>
      ))}
      {snag && (
        <g>
          {/* bare dead snag poking above the canopy — a classic Merlin lookout */}
          <path d="M 50 130 C 51 118 52 106 52.6 95 L 61.4 95 C 62 106 63 118 65 130 Z" fill="#8A7E72" stroke="#6A6056" strokeWidth="0.8"/>
          <path d="M 52.6 95 L 51.6 92.6 L 55 94 L 57 91.6 L 59.4 94 L 62 92.6 L 61.4 95 Z" fill="#9A8E80"/>
          <path d="M 56 100 C 56.4 110 56.6 120 57 128" stroke="#6A6056" strokeWidth="0.7" fill="none"/>
          <path d="M 62 108 C 68 104 72 100 76 98 L 77 99.6 C 73 102 69 106 63 110 Z" fill="#8A7E72"/>
        </g>
      )}
    </g>
  )
}

export default function Merlin({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'flight' ? 120 : 430); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 5
  const tilt = animated ? [0, 0, 3, 3, 3, 0, 0, 0][frame] : 0
  const perched = pose !== 'flight'

  const bird = pose === 'flight'
    ? <g transform={`translate(0,${bob})`}><Flight up={!animated || frame % 2 === 0}/></g>
    : <g transform={`translate(0,${bob * 0.4})`}><Perched blink={blink} tilt={tilt} pose={pose}/></g>

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Merlin">
      <defs>
        <linearGradient id="merCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A7E9E"/><stop offset="100%" stopColor="#4A5C7C"/>
        </linearGradient>
        <linearGradient id="merWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A7E9E"/><stop offset="100%" stopColor={SLATE}/>
        </linearGradient>
        <linearGradient id="merBreast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6DEC0"/><stop offset="45%" stopColor="#EDB77E"/><stop offset="100%" stopColor="#E6A868"/>
        </linearGradient>
        <linearGradient id="merSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FB4DE"/><stop offset="100%" stopColor="#E4EEF2"/>
        </linearGradient>
      </defs>
      {scene && <Scene snag={perched}/>}
      {!scene && perched && <path d="M 50 97 L 64 97" stroke="#8A7E72" strokeWidth="5" strokeLinecap="round"/>}
      {bird}
      {pose === 'flight' && <path d="M 100 76 l 14 0 M 104 82 l 10 0 M 98 88 l 12 0" stroke="#FFF" strokeWidth="1.2" opacity="0.6" strokeLinecap="round"/>}
    </svg>
  )
}
