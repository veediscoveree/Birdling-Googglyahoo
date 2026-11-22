// American Herring Gull (adult, fall/winter plumage) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'american_herring_gull', poses: ['stand', 'call', 'swim', 'fly', 'clam'] }

// Field marks (what separates it from Ring-billed & Laughing Gulls): BIG, bulky gull with a
// flatter crown and a LONG, HEAVY YELLOW BILL with a bulging angle (gonys) on the lower edge
// and a RED SPOT there — no black ring; PINK LEGS; pale yellow eye with a yellow-orange
// orbital ring; pale silver-gray back (a shade darker than Ring-billed); black wingtips with
// big white tips and white "mirrors" near the very tip in flight; in fall/winter the head and
// neck are heavily SMUDGED and STREAKED brown; white body and tail.

const GRAY = '#AEBAC5'
const GRAY_D = '#8C99A6'
const INK = '#16171A'
const LEG = '#EDB0A8'
const LEG_D = '#C2847E'
const BILL = '#F1D04C'

function Bill({ open = 0, clam = false }) {
  // Base at x≈28, tip at x≈7: long, deep, with a hooked tip and a gonys angle (x≈13).
  const up = 'M 28 41.4 C 20 41.4 13 42.2 8.6 44.2 C 6.4 45.2 6 47.6 7.6 48.2 L 28 48.2 Z'
  const lo = 'M 28 48.2 L 8 48.2 C 9.4 49.4 11 50.8 13 52 C 18 51.6 23 51.6 28 52.6 Z'
  return (
    <g>
      <clipPath id="ahgClipL"><path d={lo}/></clipPath>
      {open > 0 && <path d="M 28.5 47.2 L 13 45.8 L 13.5 50.6 L 28.5 50 Z" fill="#C8463C"/>}
      <g transform={`rotate(${open} 28 48.2)`}>
        <path d={up} fill={BILL}/>
        <path d="M 24 44.2 l -4.4 0.5" stroke="#9A7E24" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M 10 44.6 C 8 45.6 7.2 46.8 7.6 48" stroke="#E8BC30" strokeWidth="0.8" fill="none"/>
      </g>
      <g transform={`rotate(${-open * 0.8} 28 48.2)`}>
        <path d={lo} fill="#E8C43E"/>
        {/* the red gonys spot chicks peck at to ask for food */}
        <ellipse cx="13.4" cy="50" rx="2.6" ry="1.8" fill="#D8352A" clipPath="url(#ahgClipL)"/>
        {clam && (
          <g>
            <path d="M 4.5 49 C 4 45 8 43 11.5 44.5 C 14 46 14 50 11 52 C 8.5 53.4 5 52.4 4.5 49 Z" fill="#3E4A5C"/>
            <path d="M 6 48.4 C 7.5 46.6 10 46.4 12 47.6 M 6.2 50.4 C 8 49.2 10.5 49.2 12.2 50" stroke="#8E9CB0" strokeWidth="0.6" fill="none"/>
          </g>
        )}
      </g>
    </g>
  )
}

// Fall/winter streaking: heavy on the hindneck and around the eye, lighter on the crown.
const STREAKS = []
for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
  const x = 33 + c * 4.2 + (r % 2) * 2 + ((r * 7 + c * 3) % 5) * 0.4
  const y = 33 + r * 4.4 + ((c * 5 + r) % 3) * 0.9
  const dx = x - 42, dy = y - 42
  if (dx * dx / 160 + dy * dy / 340 > 1.05) continue   // stay inside the head/neck
  if (x < 37 && y > 44) continue                      // keep the throat paler
  if (y < 36 && x < 42) continue                      // and the forehead
  STREAKS.push([x, y])
}

const HEAD = 'M 25 47.5 C 24.5 38.5 30 31.5 39.5 31 C 47.5 30.5 53.5 34.5 54.5 42 C 55.5 50 52 57 50 64 L 33 64 C 28.5 59 25.2 53.5 25 47.5 Z'

function Head({ open = 0, blink = false, clam = false }) {
  // Profile facing left; larger, flatter-crowned head than a Ring-bill. Centre ≈ (40,44).
  return (
    <g transform="translate(40,50) scale(1.12) translate(-40,-50)">
      <clipPath id="ahgHeadClip"><path d={HEAD}/></clipPath>
      <path d={HEAD} fill="#FFF"/>
      <g clipPath="url(#ahgHeadClip)">
        <ellipse cx="49" cy="52" rx="8" ry="13" fill="#9C8468" opacity="0.22"/>
        <ellipse cx="40" cy="42" rx="5" ry="3" fill="#9C8468" opacity="0.12"/>
        {STREAKS.map(([x, y], i) => (
          <path key={i} d={`M ${x} ${y} l ${1.2 + (i % 3) * 0.5} ${0.5 + (i % 2) * 0.5}`} stroke="#86705A" strokeWidth="1" strokeLinecap="round" opacity={0.35 + (i % 4) * 0.08}/>
        ))}
      </g>
      <path d="M 27 52.5 C 30 57.5 35 60 41 60" stroke="#E2E8EE" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* eye: pale yellow iris with a yellow-orange orbital ring — a fierce look */}
      {blink
        ? <path d="M 31 41.6 C 33 43.2 36 43.2 38 41.6" stroke="#5A5048" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="34.5" cy="41.2" r="3.7" fill="#F2E9B8" stroke="#E59A2C" strokeWidth="1.2"/>
            <circle cx="34.6" cy="41.3" r="1.7" fill="#141414"/>
            <circle cx="33.4" cy="40" r="1.05" fill="#FFF"/>
          </g>}
      <path d="M 30.5 37.6 C 33 36.4 36.5 36.4 39 37.8" stroke="#7E6A56" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5"/>
      <Bill open={open} clam={clam}/>
    </g>
  )
}

function Legs() {
  return (
    <g strokeLinecap="round">
      <path d="M 64 92 L 65 107.5" stroke={LEG_D} strokeWidth="3"/>
      <path d="M 65 107.5 l 6.5 2.6 q -3 1.3 -6.5 0 q -2.8 1.3 -5.4 -0.2 Z" fill={LEG_D}/>
      <path d="M 54 92 L 53 108" stroke={LEG} strokeWidth="3.2"/>
      <path d="M 53 108 l -8 2.8 q 3.8 1.5 7.9 -0.2 q 3.4 1.5 6.6 0 Z" fill={LEG} stroke={LEG_D} strokeWidth="0.5"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      <path d="M 84 82 L 106 79.5 L 104 86.5 L 86 89.5 Z" fill="#F4F6F8" stroke="#D5DCE2" strokeWidth="0.5"/>
      <path d="M 37 55 C 25 63 24.5 85 37 94 C 50 102 73 101 89 90.5 L 104 81.5 C 96 73 80 63 60 56 C 51 53 43 52 37 55 Z" fill="url(#ahgWhite)"/>
      <path d="M 40 59 C 48 52 66 53 82 62 C 92 67.5 99.5 73 104.5 78.5 L 100.5 81 C 88 85.6 72 87.6 57 86.6 C 49 85.6 43 81.4 40.5 75.4 C 38.5 70 38 63.6 40 59 Z" fill="url(#ahgMantle)"/>
      <path d="M 49 70 C 57 72 67 76 77 82 M 55 64 C 63 66 71 70 79 75" stroke={GRAY_D} strokeWidth="0.7" fill="none" opacity="0.7"/>
      <path d="M 66 60.5 C 74.5 63 82.5 67 89 71.6" stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M 46 82.6 C 59 86.6 76 86.8 92 82.4" stroke="#FFF" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* black primaries with big white tips */}
      <path d="M 85 81 C 93 83 99 85.2 104 87.8 C 98 88.6 92 87.8 86 85.8 Z" fill={INK}/>
      <path d="M 86 78 C 95 80 103 83 110 86.8 C 104 87.6 96 86.6 88 83.6 Z" fill="#202226"/>
      <path d="M 86 74 C 96 76 108 80.5 116 85.4 C 110 86 100 84.6 88 80.2 Z" fill={INK}/>
      <ellipse cx="114" cy="85" rx="2.2" ry="1.5" fill="#FFF" transform="rotate(18 114 85)"/>
      <ellipse cx="108.4" cy="86.6" rx="2" ry="1.4" fill="#FFF" transform="rotate(14 108.4 86.6)"/>
      <ellipse cx="102.6" cy="87.7" rx="1.9" ry="1.3" fill="#FFF" transform="rotate(10 102.6 87.7)"/>
    </g>
  )
}

function FlyBird({ flex = 0, head }) {
  return (
    <g>
      <g transform={`rotate(${-flex} 60 58)`}>
        <path d="M 52 57 C 55 45 61 33 68 23 L 81 5 C 81 14 79 24 77 34 C 75 42 74 50 73 57 Z" fill={GRAY_D}/>
        <path d="M 72.6 17 L 81 5 C 81 10.5 80.2 16.5 79 22 C 76.6 21 74.4 19.4 72.6 17 Z" fill={INK}/>
        <circle cx="79.4" cy="9.4" r="1.25" fill="#FFF"/>
      </g>
      <path d="M 92 60 L 109 57 C 111 60 111 64 109 67.5 L 92 66.5 Z" fill="#F4F6F8" stroke="#D5DCE2" strokeWidth="0.5"/>
      <path d="M 90 66 l 9 2.6 l -1.2 2.1 Z" fill={LEG}/>
      {head}
      <path d="M 24 59 C 33 48.5 60 49.5 78 52.5 C 88 54.5 96 57.5 101 61 C 97 66.5 87 70.5 72 71.5 C 56 72.5 35 71.5 26 65.5 Z" fill="url(#ahgWhite)"/>
      <g transform={`rotate(${flex} 64 58)`}>
        <path d="M 45 59 C 51 47 60 37.5 71.5 31.5 L 107 6.5 C 102 16 95 25 89 32.5 C 85 41.5 83 50 83 60 Z" fill="url(#ahgMantle)"/>
        <path d="M 89 20.5 L 107 6.5 C 103 14 98 21.5 92.6 27.8 C 90.8 25.6 89.6 23 89 20.5 Z" fill={INK}/>
        <path d="M 84 23.8 L 89 20.5 C 89.6 23 90.8 25.6 92.6 27.8 L 88.6 31 C 86.4 29 84.8 26.6 84 23.8 Z" fill="#2A2C30"/>
        {/* big white mirrors near the wingtip */}
        <ellipse cx="101" cy="12.6" rx="2.8" ry="1.9" fill="#FFF" transform="rotate(-38 101 12.6)"/>
        <ellipse cx="95.2" cy="18.8" rx="2.1" ry="1.4" fill="#FFF" transform="rotate(-38 95.2 18.8)"/>
        <path d="M 83 60 C 83 50 85 41.5 89 32.5 C 90.5 30.5 91.6 29 92.6 27.8" stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M 60 51 C 66 45 72 39.5 80 33.5" stroke={GRAY_D} strokeWidth="0.7" fill="none"/>
      </g>
    </g>
  )
}

function Rocks() {
  // Granite jetty boulders with a fringe of rockweed and a few blue mussels.
  return (
    <g>
      <path d="M 0 96 Q 30 93 60 96 T 120 96 L 120 130 L 0 130 Z" fill="url(#ahgSea)"/>
      <path d="M 8 101 q 6 -1.6 12 0 M 86 100 q 8 -1.6 16 0" stroke="#A8D2E6" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M 18 130 C 16 116 26 108 44 107 C 60 106 76 106 90 109 C 104 112 110 120 108 130 Z" fill="url(#ahgRock)"/>
      <path d="M -2 130 C -2 120 4 114 14 114 C 22 114 26 120 26 130 Z" fill="#5C646C"/>
      <path d="M 96 130 C 96 121 104 116 112 117 C 120 118 124 124 124 130 Z" fill="#646C74"/>
      <path d="M 30 110 C 44 107.5 62 107.4 80 109" stroke="#A4ACB4" strokeWidth="1.2" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M 20 124 c 2 -3 4 -3 6 0 c 2 -3 4 -3 6 0 M 92 121 c 2 -3 4 -3 6 0 c 2 -3 4 -3 6 0 M 6 120 c 2 -2.6 3.6 -2.6 5.4 0" stroke="#7A7A2E" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 82 112 c 2 -2 5 -1.6 6 0.6 c -1.4 1.6 -4.6 1.6 -6 -0.6 Z M 88 113.5 c 2 -2 5 -1.6 6 0.6 c -1.4 1.6 -4.6 1.6 -6 -0.6 Z" fill="#2E3A52"/>
    </g>
  )
}

function Sea({ bob = 0 }) {
  return (
    <g>
      <path d={`M 0 ${91 + bob * 0.3} Q 15 ${89 + bob * 0.3} 30 91 T 60 91 T 90 91 T 120 91 L 120 130 L 0 130 Z`} fill="url(#ahgSea)"/>
      <path d="M 14 100 q 8 -2 16 0 M 70 104 q 10 -2 20 0 M 30 114 q 7 -1.6 14 0 M 92 116 q 7 -2 14 0" stroke="#A8D2E6" strokeWidth="1" fill="none" opacity="0.65" strokeLinecap="round"/>
    </g>
  )
}

export default function AmericanHerringGull({ size = 120, animated = false, style = {}, pose = 'stand', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.3, 0.5, 0.3][frame] : 0
  const blink = animated && frame === 5
  const flex = animated ? [0, 2, 4, 2, 0, -2, -4, -2][frame] : 0
  const flying = pose === 'fly' || pose === 'clam'

  let bird
  if (pose === 'fly') {
    bird = <g transform={`translate(0,${6 + bob * 2})`}><FlyBird flex={flex} head={<g transform="translate(-7,8) scale(0.92) translate(5,0)"><Head blink={blink}/></g>}/></g>
  } else if (pose === 'clam') {
    // Carries a clam up high to drop it on the rocks and crack it open.
    bird = (
      <g>
        <g transform={`translate(2,${2 + bob * 2}) rotate(-8 60 60)`}><FlyBird flex={flex} head={<g transform="translate(-7,8) scale(0.92) translate(5,0)"><Head blink={blink} open={3}/></g>}/></g>
        <g transform="translate(22,88) rotate(30)">
          <path d="M -4 0 C -4.4 -4 0 -6 3.4 -4.4 C 6 -3 6 1 3 3 C 0.4 4.4 -3.6 3.4 -4 0 Z" fill="#3E4A5C"/>
          <path d="M -2.6 -0.6 C -1 -2.4 1.6 -2.6 3.6 -1.4" stroke="#8E9CB0" strokeWidth="0.6" fill="none"/>
        </g>
        <path d="M 19 76 l 0 6 M 24 75 l 0 5 M 14 78 l 0 4" stroke="#DDE6EE" strokeWidth="0.9" strokeLinecap="round" opacity="0.8"/>
      </g>
    )
  } else if (pose === 'call') {
    // Head thrown back, bill wide open: the ringing "ha-ha-ha" long call of the seaside.
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><g transform="rotate(-26 46 60) translate(0,-2)"><Head open={16} blink={blink}/></g></g></g>
  } else if (pose === 'swim') {
    bird = (
      <g transform={`translate(0,${bob})`}>
        <clipPath id="ahgSwimClip"><rect x="0" y="0" width="120" height="93"/></clipPath>
        <g clipPath="url(#ahgSwimClip)"><g transform="translate(0,8)"><Body/><Head blink={blink}/></g></g>
      </g>
    )
  } else {
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><Head blink={blink}/></g></g>
  }

  let backdrop = null
  if (scene) backdrop = pose === 'swim' ? <Sea bob={bob}/> : <Rocks/>
  else if (pose === 'swim') backdrop = <path d="M 22 93 C 46 96 90 96 110 92" stroke="#A8D2E6" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round"/>
  else if (!flying) backdrop = <ellipse cx="58" cy="110" rx="18" ry="2.4" fill="#000" opacity="0.2"/>

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Herring Gull">
      <defs>
        <linearGradient id="ahgWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F6F8FA"/><stop offset="100%" stopColor="#DCE3EA"/>
        </linearGradient>
        <linearGradient id="ahgMantle" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#C0CAD3"/><stop offset="100%" stopColor={GRAY}/>
        </linearGradient>
        <linearGradient id="ahgSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A8AAA" stopOpacity="0.9"/><stop offset="100%" stopColor="#1E4A66" stopOpacity="0.95"/>
        </linearGradient>
        <linearGradient id="ahgRock" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#8A9198"/><stop offset="100%" stopColor="#555C63"/>
        </linearGradient>
      </defs>
      {backdrop}
      {/* Biggest of the three: standing birds are scaled about the feet so the three gulls read as different sizes. */}
      {(!flying && pose !== 'swim') ? <g transform="translate(58,110) scale(1.05) translate(-58,-110)">{bird}</g> : bird}
      {scene && pose === 'swim' && <path d="M 30 93.5 q 12 -3 24 0 q 12 3 24 0 q 10 -2.4 20 0" stroke="#D8F0FA" strokeWidth="1.3" fill="none" opacity="0.9"/>}
    </svg>
  )
}
