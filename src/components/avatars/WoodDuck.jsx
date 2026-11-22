// Wood Duck (drake) — reference avatar for the "accurate first, cute second, in habitat" style.
//
// TEMPLATE CONVENTIONS (copy these for every new species file):
//  • export const meta = { birdId, poses: [...] } — 3–5 lively, species-typical poses.
//  • default export ({ size, animated, style, pose, scene }) renders viewBox 0 0 120 130.
//  • scene=true draws a small habitat backdrop (water/branch/ground); scene=false must still
//    read well floating over the binoculars background, so the bird never depends on it.
//  • Unique gradient ids per file (prefix with species code, e.g. "wdu") to avoid clashes.
//  • Field marks are the acceptance test: list them in a comment and make each one visible.
//  • Cute = slightly large head + big bright eye with a catch-light, soft rounded body.
//  • animated: gentle idle (bob / blink / sheen), never position jumps.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'wood_duck', poses: ['swim', 'dabble'] }

// Field marks: glossy green helmet crest swept back and down; two thin white crest lines;
// white throat with chin-strap + cheek spurs; red eye & eye-ring; candy-corn bill (red base,
// white patch, black tip/culmen, yellow base line); chestnut breast speckled white; white-then-
// black shoulder bars; buff vermiculated flanks edged white/black above; dark iridescent back;
// long dark tail.

function Head({ sheen }) {
  return (
    <g>
      <path d="M 20 58 C 19 46 29 39 40 41 C 51 42 59 50 67 64 C 61 66 55 66 51 69 C 47 73 41 76 33 75 C 25 73 20 67 20 58 Z" fill="url(#wduHead)"/>
      <ellipse cx="37" cy="60" rx="9" ry="6" fill="#5A2E7A" opacity={sheen}/>
      <path d="M 50 50 C 56 54 62 59 66 64 C 60 63 55 60 51 56 Z" fill="#5A2E7A" opacity={sheen}/>
      <path d="M 23 50.5 C 30 45 41 44 49 49 C 56 54 62 59 66.5 64" stroke="#FFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 39 58 C 47 58.5 55 62 62.5 66" stroke="#FFF" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M 21 63 C 23 70 30 75.5 40 75 C 44 74.6 47 72.5 49 70 C 44 71 39 71 34 69.5 C 28 68 24 66 21 63 Z" fill="#FFF"/>
      <path d="M 28 67.5 C 30 64 32 61.5 34.5 60.5 C 34 63.5 33 66.5 31.5 68.5 Z" fill="#FFF"/>
      <path d="M 40 71 C 43 68 46.5 66.5 50 66.5 C 48 69 45.5 71 42 72 Z" fill="#FFF"/>
      <circle cx="31" cy="53.5" r="5" fill="#E0442A"/>
      <circle cx="31" cy="53.5" r="3.6" fill="#C81810"/>
      <circle cx="31" cy="53.5" r="1.9" fill="#1A0606"/>
      <circle cx="29.7" cy="52.3" r="1.1" fill="#FFF"/>
      <path d="M 21 53.5 C 15.5 53.8 10 56 6.5 59 C 9 61.3 14.5 62.2 21 62 Z" fill="#E0381E"/>
      <ellipse cx="14.2" cy="58.2" rx="2.6" ry="1.7" fill="#FFF6EC"/>
      <path d="M 10.5 56.7 C 8.6 57.6 7.4 58.4 6.5 59 C 7.6 60.3 9.3 61 11.3 61.2 Z" fill="#141414"/>
      <path d="M 20.5 53.8 C 16 54.3 11.5 55.8 8.5 57.8" stroke="#141414" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M 21.2 53.6 L 21.2 62" stroke="#F0C428" strokeWidth="1.5"/>
    </g>
  )
}

function Body() {
  const flecks = []
  for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) {
    const x = 39 + c * 4 + (r % 2) * 2, y = 79 + r * 4
    if (x < 50) flecks.push(<path key={`${r}${c}`} d={`M ${x} ${y} l 1.3 -1.6 l 1.3 1.6 Z`} fill="#F4E8D8" opacity="0.85"/>)
  }
  return (
    <g>
      <path d="M 94 78 C 103 77 112 81 116 88 C 109 89 100 87 92 85 Z" fill="#121820"/>
      <path d="M 48 74 C 60 65 84 65 100 77 C 94 80 84 79 74 77 C 64 76 55 77 48 76 Z" fill="url(#wduBack)"/>
      <path d="M 70 70 C 78 68 88 70 94 75 C 86 74 78 73 70 72 Z" fill="#3A5FA8" opacity="0.7"/>
      <path d="M 57 77 C 70 75 86 77 97 82 C 95 93 80 100 57 101 C 54 93 54 84 57 77 Z" fill="#D9B97A"/>
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M ${61 + i * 7} ${80 + (i % 2)} q 2 3 0 6 q -2 3 0 6`} stroke="#B8975A" strokeWidth="0.6" fill="none" opacity="0.8"/>)}
      <path d="M 57 77 C 70 75 86 77 97 82" stroke="#F6F2E8" strokeWidth="1.4" fill="none"/>
      <path d="M 57 75.4 C 70 73.4 86 75.4 97 80.4" stroke="#0E0E10" strokeWidth="1.2" fill="none"/>
      <path d="M 42 72 C 33 79 33 95 43 101 L 52 101 C 50 92 50 82 52 74 Z" fill="#7A2414"/>
      {flecks}
      <path d="M 52 74 C 50 82 50 92 52 101 L 54.8 101 C 52.8 92 52.8 82 54.8 75 Z" fill="#FAF7F0"/>
      <path d="M 54.8 75 C 52.8 82 52.8 92 54.8 101 L 57.4 101 C 55.4 92 55.4 82 57.4 76 Z" fill="#0E0E10"/>
    </g>
  )
}

function Wing() {
  // Raised wing seen from the side: dark coverts, long primaries fanning back, blue speculum
  // bordered white along the trailing edge.
  return (
    <g>
      <path d="M 58 74 C 60 56 70 38 92 24 C 96 26 98 28 99 31 C 104 31 108 34 109 38 C 106 39 103 40 100 41 C 103 43 105 46 105 49 C 100 49 96 48 93 48 C 94 54 92 62 86 72 Z" fill="url(#wduBack)"/>
      <path d="M 92 24 C 96 26 98 28 99 31 M 99 31 C 104 31 108 34 109 38 M 100 41 C 103 43 105 46 105 49" stroke="#3A4566" strokeWidth="0.8" fill="none"/>
      <path d="M 68 66 C 72 56 80 48 90 44 C 91 50 89 58 84 66 Z" fill="#2F6FD0"/>
      <path d="M 84 66 C 89 58 91 50 90 44 L 93 45 C 94 52 92 60 87 68 Z" fill="#FFF"/>
      <path d="M 64 70 C 66 58 74 46 86 36" stroke="#4A5578" strokeWidth="0.8" fill="none" opacity="0.8"/>
    </g>
  )
}

function Water({ bob = 0 }) {
  return (
    <g>
      <path d={`M 0 ${99 + bob * 0.3} Q 15 ${97 + bob * 0.3} 30 99 T 60 99 T 90 99 T 120 99 L 120 130 L 0 130 Z`} fill="url(#wduWater)"/>
      <path d="M 30 103 q 8 -2 16 0 M 66 106 q 10 -2 20 0 M 12 110 q 6 -1.5 12 0 M 90 113 q 7 -2 14 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
    </g>
  )
}

export default function WoodDuck({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.8, -1.4, -0.8, 0, 0.6, 1, 0.6][frame] : 0
  const sheen = animated ? [0.35, 0.5, 0.65, 0.5, 0.35, 0.25, 0.2, 0.25][frame] : 0.4
  // Without a scene, a soft wake line keeps the floating bird grounded.
  const waterline = scene ? <Water bob={bob}/> : <path d="M 26 101 C 50 104 90 104 108 100" stroke="#A8D8EC" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>

  let bird
  if (pose === 'preen') {
    // Head swung back over the shoulder, bill tucked into the back feathers.
    bird = <g><Body/><path d="M 46 74 C 52 66 62 62 72 64 L 70 74 Z" fill="#14502E"/><g transform="translate(72,62) scale(-0.9,0.9) rotate(8) translate(-40,-58)"><Head sheen={sheen}/></g></g>
  } else if (pose === 'wingflap') {
    // Rises on the water, chest up, one wing raised showing the blue speculum.
    bird = <g transform="rotate(-10 62 96)"><Wing/><Body/><g transform="translate(0,-4)"><Head sheen={sheen}/></g></g>
  } else if (pose === 'dabble') {
    // Bottoms-up feeding: only the tail end and feet show above the water.
    bird = (
      <g transform="translate(60,102) scale(1.25) rotate(-62) translate(-80,-86)">
        <path d="M 60 74 C 72 70 92 72 104 80 C 104 92 90 100 66 102 C 58 96 56 82 60 74 Z" fill="#D9B97A"/>
        <path d="M 60 74 C 72 70 92 72 104 80" stroke="#F6F2E8" strokeWidth="1.4" fill="none"/>
        <path d="M 62 72 C 74 66 92 68 106 78 C 98 80 86 77 74 76 C 68 75 64 76 62 76 Z" fill="url(#wduBack)"/>
        <path d="M 102 78 C 110 76 118 80 122 87 C 115 89 106 87 100 86 Z" fill="#121820"/>
        <path d="M 96 90 l 8 3 l -2 4 Z M 92 94 l 7 4 l -3 3 Z" fill="#E8A030"/>
      </g>
    )
  } else {
    bird = <g><Body/><Head sheen={sheen}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Wood Duck">
      <defs>
        <linearGradient id="wduHead" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#2E7A4A"/><stop offset="55%" stopColor="#14502E"/><stop offset="100%" stopColor="#0E3420"/>
        </linearGradient>
        <linearGradient id="wduBack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A3350"/><stop offset="100%" stopColor="#141A28"/>
        </linearGradient>
        <linearGradient id="wduWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <g transform={`translate(0,${bob})`}>{bird}</g>
      {waterline}
      {pose === 'dabble' && <path d="M 38 101 q 10 -4 20 0 q 10 4 20 0" stroke="#D8F0FA" strokeWidth="1.4" fill="none" opacity="0.9"/>}
    </svg>
  )
}
