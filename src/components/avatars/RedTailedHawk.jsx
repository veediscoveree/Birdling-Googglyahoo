// Red-tailed Hawk (Eastern adult) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'red_tailed_hawk', poses: ['perch', 'bank'] }

// Field marks: bulky buteo, broad rounded wings, short fan tail; dark-brown head with pale
// throat; dark-brown eye; hooked dark bill with yellow cere; brown upperparts with pale
// mottling and a pale scapular "V"; white-to-buff breast with a dark streaked BELLY BAND;
// BRICK-RED tail with thin dark subterminal band (bright from above, pale rufous-pink from
// below); yellow feet. Flying from below: pale underwing with DARK PATAGIAL BAR on the
// leading edge, dark carpal "comma", dark-tipped fingered primaries, thin dark trailing edge.

const BROWN = '#6B4423'
const DARK = '#3B2414'
const PALE = '#F7EEDD'

function Head({ open = false, blink = false }) {
  // Profile facing left; centre ≈ (50,32).
  return (
    <g>
      <path d="M 34 34 C 33 24 41 17 51 17 C 61 17 67 24 67 33 C 67 41 62 47 55 49 L 42 49 C 37 46 34 40 34 34 Z" fill="url(#rthHead)"/>
      {/* pale throat with brown malar edge */}
      <path d="M 36 37 C 37 44 43 49 52 49 C 52 45 49 42 45 40 C 42 39 39 38 36 37 Z" fill={PALE}/>
      <path d="M 45 40 C 49 42 52 45 52 49" stroke="#8A5A30" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* fine crown streaks */}
      <path d="M 53 21 l 3 2 M 58 22 l 3 2.4 M 55 27 l 3 2 M 61 28 l 3 2.2" stroke="#4A2E16" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
      {/* eye: dark brown iris, big catch-light, soft brow */}
      {blink
        ? <path d="M 40 30.5 C 42 32 46 32 48.5 30.5" stroke="#1A0E06" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="44.5" cy="30.5" r="4.9" fill="#E9D7BE"/>
            <circle cx="44.5" cy="30.5" r="4.2" fill="#6A3A18"/>
            <circle cx="44.3" cy="30.6" r="2.5" fill="#140A04"/>
            <circle cx="42.9" cy="29" r="1.4" fill="#FFF"/>
          </g>}
      <path d="M 39 25.5 C 42 24 47.5 24 51 26.5" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* hooked bill */}
      {open && <path d="M 37.4 36.8 L 32 37.8 C 31 40 30.6 42.6 31 44.6 L 38.6 39.6 Z" fill="#D46A6A"/>}
      <path d="M 36 29.6 C 31.5 29.8 28.4 32.6 28 36.8 C 27.8 39 28.4 40.8 29.6 41.6 C 29.8 39.6 30.8 38.2 32.4 37.6 L 37 37 Z" fill="#34343C"/>
      <path d={open ? 'M 38.6 39.6 L 31 44.6 C 31.8 45.9 33.6 45.9 34.8 45 L 39 41.4 Z' : 'M 32.4 37.6 C 33.6 38.9 35.4 39.3 37.6 38.9 L 37.2 36.9 Z'} fill="#5A5A62"/>
      <path d="M 38.4 29.2 C 36.2 29.1 34.6 30.4 34.6 32.4 L 34.6 35.8 C 35.9 36.3 37.3 36.3 38.6 35.8 Z" fill="#F2C232"/>
      <ellipse cx="36.3" cy="32.4" rx="0.8" ry="0.6" fill="#7A5A10"/>
    </g>
  )
}

function Feet({ y = 95 }) {
  return (
    <g>
      <path d="M 48 86 C 47 90 47 93 48 95 L 54 95 C 55 92 55 89 54 86 Z M 58 87 C 57 90 57 93 58 95.5 L 64 95.5 C 65 92 64 89 63 87 Z" fill="#EADCC4"/>
      <path d={`M 45 ${y} c 0 -3 3 -3.6 5 -3.6 l 4 0 c 2 0 3 1 3.6 ${3}`} fill="#F0C030" stroke="#B88A18" strokeWidth="0.6"/>
      <path d={`M 55 ${y} c 0 -3 3 -3.6 5 -3.6 l 4 0 c 2 0 3 1 3.6 ${3}`} fill="#F0C030" stroke="#B88A18" strokeWidth="0.6"/>
      <path d={`M 45.4 ${y} l -1 1.8 M 50 ${y + 0.2} l -0.6 2 M 55.4 ${y} l -1 1.8 M 60 ${y + 0.2} l -0.6 2 M 67.4 ${y - 0.4} l 0.6 2`} stroke="#222" strokeWidth="1.1" strokeLinecap="round"/>
    </g>
  )
}

function PerchedBody() {
  const streaks = []
  // Belly band: a loose row of dark brown drop-shaped streaks across the lower belly.
  ;[[37, 73], [41, 76], [45, 73.5], [49, 77], [53, 74], [40, 81], [44.5, 80], [49, 82], [53.5, 79.5], [57, 77]].forEach(([x, y], i) =>
    streaks.push(<path key={i} d={`M ${x} ${y} c 1.4 1.6 1.6 3.4 0 5 c -1.6 -1.6 -1.4 -3.4 0 -5 Z`} fill={DARK} opacity="0.85"/>))
  return (
    <g>
      {/* brick-red tail hanging below the wings */}
      <path d="M 64 86 C 68 96 72 106 75 117 C 80 119 87 118.6 92 115.6 C 89 104 84 94 77 83 Z" fill="url(#rthTail)"/>
      <path d="M 74.2 111.6 C 79.4 113.2 85.6 112.8 90.6 110.4" stroke="#2A140A" strokeWidth="1.4" fill="none"/>
      <path d="M 75 117 C 80 119 87 118.6 92 115.6" stroke="#F4E6D0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* pale breast & belly */}
      <path d="M 41 46 C 34 55 32 70 36 82 C 39 91 47 96 56 95 C 63 94 68 88 70 80 L 66 50 C 60 45 50 43 41 46 Z" fill="url(#rthBreast)"/>
      <path d="M 40 58 l 0.4 2 M 45.4 56 l 0.4 2 M 42 65 l 0.4 2 M 49 62 l 0.4 2" stroke="#B89A72" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M 35.4 74 C 42 70.6 54 70.4 62 72.6 L 64 84 C 56 87.6 44 87.6 37.6 85 C 36 81.6 35.4 77.8 35.4 74 Z" fill="#B08A60" opacity="0.22"/>
      {streaks}
      {/* folded wing: brown with pale mottling, pale scapular edge, dark primaries */}
      <path d="M 55 47 C 67 43 77 50 80 62 C 83 74 83 88 85 104 C 78 101 71 94 66 86 C 60 77 56 66 55 56 Z" fill="url(#rthWing)"/>
      <path d="M 56 50 C 63 46 71 48 75 54 C 69 53 62 54 57 57 Z" fill="#E9D7B8" opacity="0.85"/>
      <path d="M 75 80 C 78 89 81 96 85 104 C 79 101 74 95 70 88 Z" fill="#2E1C0E"/>
      <path d="M 62 66 C 68 72 73 80 76 90 M 66 62 C 72 68 77 76 79 86" stroke="#2E1C0E" strokeWidth="0.8" fill="none" opacity="0.6"/>
      {[[62, 60], [67, 61], [72, 63], [64, 66], [69, 68], [74, 70], [67, 73]].map(([x, y], i) =>
        <ellipse key={i} cx={x} cy={y} rx="1.6" ry="1" fill="#E4CFA8" opacity="0.8"/>)}
    </g>
  )
}

// Spread wing (left side, viewed from below or above), mirrored for the right side.
const WING = 'M 54 50 C 44 44.5 32 41 21 41 C 14 41 9 42.6 5.4 45.4 Q 1 47 1.2 49.4 Q 3.4 50.6 5.8 50.6 Q 1.4 52.6 1.8 54.6 Q 4.2 55.8 6.4 55.4 Q 2.6 58 3.2 60 Q 5.6 60.8 7.8 59.8 Q 5 63 6.2 64.8 Q 9 65.2 11.4 63.6 C 19 70 32 75 44 74.4 C 49 74 52 72.6 54 71.4 Z'

function UnderWing({ id }) {
  return (
    <g>
      <clipPath id={id}><path d={WING}/></clipPath>
      <path d={WING} fill="#F4ECDF"/>
      <g clipPath={`url(#${id})`}>
        {/* translucent grey flight feathers with faint barring */}
        <path d="M 10 60 C 22 63 36 64 54 63 L 54 80 L 0 80 Z" fill="#DDD6CC"/>
        {[16, 23, 30, 37, 44].map(x => <path key={x} d={`M ${x} 64.5 l -1 8`} stroke="#B8AFA2" strokeWidth="0.6"/>)}
        <path d="M 0 38 L 10.4 38 C 9.6 48 10.6 56 14 70 L 0 70 Z" fill="#2E2016"/>
        <path d="M 11.4 63.6 C 19 70 32 75 44 74.4 C 49 74 52 72.6 54 71.4" stroke="#4A3A2E" strokeWidth="1.6" fill="none"/>
      </g>
      {/* dark patagial bar along the leading edge + carpal comma at the wrist */}
      <path d="M 53 51.6 C 44 46.6 34 44.2 24 44" stroke={DARK} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M 23.4 42.6 C 19 43.8 17.8 48.4 19.8 52.6 C 21.6 50.6 22.8 48.2 25.4 46.4 Z" fill={DARK}/>
      <path d="M 40 51 c 1 1 1 2 0 3 M 33 50 c 1 1 1 2 0 3 M 46 53.4 c 1 1 1 2 0 3" stroke="#B89A72" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function UpperWing({ id }) {
  return (
    <g>
      <clipPath id={id}><path d={WING}/></clipPath>
      <path d={WING} fill="url(#rthWing)"/>
      <g clipPath={`url(#${id})`}>
        <path d="M 0 38 L 11 38 C 10.4 48 11.4 56 15 70 L 0 70 Z" fill="#2A1A0C"/>
        <path d="M 12 63 C 22 67 34 68 54 66.4 L 54 80 L 0 80 Z" fill="#4E3018"/>
        {[[44, 52], [38, 51], [32, 50], [26, 50], [41, 56], [35, 55], [29, 55], [47, 57]].map(([x, y], i) =>
          <ellipse key={i} cx={x} cy={y} rx="1.8" ry="1" fill="#D8BE94" opacity="0.75"/>)}
      </g>
    </g>
  )
}

function Soar() {
  // Seen from below: pale bird, dark patagial bars, belly band, pale rufous-pink tail.
  const band = [[53.6, 65], [57.4, 66.4], [61, 66.6], [64.6, 65.6], [55, 70], [58.8, 71.2], [62.6, 71], [66, 69.4]]
  return (
    <g>
      <path d="M 55 76 C 52 84 49.5 90 50 96 C 55 99 65 99 70 96 C 70.5 90 68 84 65 76 Z" fill="url(#rthTailUnder)"/>
      <path d="M 50.6 92.6 C 56 95 64 95 69.4 92.6" stroke="#8A3A1E" strokeWidth="1" fill="none" opacity="0.75"/>
      <UnderWing id="rthClipL"/>
      <g transform="translate(120,0) scale(-1,1)"><UnderWing id="rthClipR"/></g>
      <ellipse cx="60" cy="62" rx="9.5" ry="17" fill="url(#rthBreast)"/>
      {band.map(([x, y], i) => <path key={i} d={`M ${x} ${y} c 1.2 1.4 1.4 3 0 4.4 c -1.4 -1.4 -1.2 -3 0 -4.4 Z`} fill={DARK} opacity="0.85"/>)}
      <ellipse cx="56" cy="78" rx="2.4" ry="1.6" fill="#F0C030"/>
      <ellipse cx="64" cy="78" rx="2.4" ry="1.6" fill="#F0C030"/>
      <g transform="translate(61,46) scale(0.6) translate(-50,-36)"><Head/></g>
    </g>
  )
}

function Bank() {
  // Seen from above while banking: brown back, pale scapular V, BRICK-RED tail.
  return (
    <g transform="rotate(-14 60 62)">
      <path d="M 53 74 C 48 84 45 93 46 100 C 53 104 67 104 74 100 C 75 93 72 84 67 74 Z" fill="url(#rthTail)"/>
      <path d="M 47.2 96 C 54 99 66 99 72.8 96" stroke="#2A140A" strokeWidth="1.5" fill="none"/>
      <path d="M 46 100 C 53 104 67 104 74 100" stroke="#F4E6D0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <UpperWing id="rthClipUL"/>
      <g transform="translate(120,0) scale(-1,1)"><UpperWing id="rthClipUR"/></g>
      <ellipse cx="60" cy="61" rx="9" ry="16" fill="url(#rthWing)"/>
      {[[54.4, 53], [56.2, 57], [58, 61], [65.6, 53], [63.8, 57], [62, 61]].map(([x, y], i) =>
        <ellipse key={i} cx={x} cy={y} rx="2" ry="1.5" fill="#EBDCC0"/>)}
      <ellipse cx="60" cy="71" rx="5" ry="3" fill="#4E3018" opacity="0.6"/>
      <g transform="translate(60,45) scale(0.6) translate(-50,-34)"><Head/></g>
    </g>
  )
}

function Scene({ perch }) {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" rx="10" fill="url(#rthSky)"/>
      <path d="M 0 112 C 20 108 40 110 60 108 C 80 106 100 109 120 107 L 120 130 L 0 130 Z" fill="#9AAE6A"/>
      <path d="M 0 118 C 30 115 70 117 120 114 L 120 130 L 0 130 Z" fill="#7E9452"/>
      <path d="M 10 30 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.7"/>
      <path d="M 86 18 q 7 -5 14 0 q 5 -3 10 1 Z" fill="#FFF" opacity="0.6"/>
      {perch && (
        <g>
          <path d="M 49 95 L 63 95 L 64.5 130 L 47.5 130 Z" fill="#7A6248"/>
          <path d="M 53 100 l 0.4 26 M 58.6 99 l 0.6 28" stroke="#5E4A36" strokeWidth="0.8"/>
          <path d="M 48 95.4 C 52 93.6 60 93.6 64 95.4 L 64 97 L 48 97 Z" fill="#8E7658"/>
        </g>
      )}
    </g>
  )
}

export default function RedTailedHawk({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.6, -1.1, -0.6, 0, 0.5, 0.9, 0.5][frame] : 0
  const tilt = animated ? [0, -2, -3, -2, 0, 1.5, 2.5, 1.5][frame] : 0
  const blink = animated && frame === 5

  const perched = pose === 'perch' || pose === 'screech'
  let bird
  if (pose === 'soar') {
    bird = <g transform={`translate(0,${bob}) rotate(${tilt * 0.6} 60 62) translate(60,62) scale(0.94) translate(-60,-62)`}><Soar/></g>
  } else if (pose === 'bank') {
    bird = <g transform={`translate(0,${bob}) rotate(${tilt * 0.6} 60 62) translate(60,62) scale(0.95) translate(-60,-62)`}><Bank/></g>
  } else {
    const headRot = pose === 'screech' ? -20 : tilt
    bird = (
      <g>
        <PerchedBody/>
        <Feet/>
        <g transform={`rotate(${headRot} 52 46)`}><Head open={pose === 'screech'} blink={blink}/></g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Red-tailed Hawk">
      <defs>
        <linearGradient id="rthHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A5030"/><stop offset="100%" stopColor="#4A2E16"/>
        </linearGradient>
        <linearGradient id="rthWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A5C34"/><stop offset="100%" stopColor={BROWN}/>
        </linearGradient>
        <linearGradient id="rthBreast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8EC"/><stop offset="100%" stopColor="#F0DFC0"/>
        </linearGradient>
        <linearGradient id="rthTail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D2602A"/><stop offset="100%" stopColor="#B4421A"/>
        </linearGradient>
        <linearGradient id="rthTailUnder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0BC98"/><stop offset="100%" stopColor="#DC8458"/>
        </linearGradient>
        <linearGradient id="rthSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8EC3E6"/><stop offset="100%" stopColor="#DCEEF6"/>
        </linearGradient>
      </defs>
      {scene && <Scene perch={perched}/>}
      {!scene && perched && <path d="M 30 96 C 46 94 70 94 92 97" stroke="#6E5638" strokeWidth="4" fill="none" strokeLinecap="round"/>}
      {bird}
    </svg>
  )
}
