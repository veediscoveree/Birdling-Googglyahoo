// Tufted Titmouse — "accurate first, cute second, in habitat" (see WoodDuck.jsx for conventions).
// A year-round feeder regular in NYC / northern NJ yards and parks.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'tufted_titmouse', poses: ['perch', 'seed', 'hammer', 'flit'] }

// Field marks: soft gray upperparts; pointed gray CREST; small BLACK FOREHEAD patch just above
// the bill; big dark eye on a plain gray face (no cap, no bib — unlike a chickadee); whitish
// underparts with PEACH-RUST FLANKS; short stubby dark bill; blue-gray legs. Habit: takes a
// sunflower seed from the feeder, flies to a branch, holds it under its feet and hammers it open.

function Head({ crest = 0, blink = false, open = false }) {
  return (
    <g>
      {/* pointed crest (behind the head so it merges smoothly) */}
      <g transform={`rotate(${crest} 56 42)`}>
        <path d="M 33 41 C 37 33 45 27 56 22 C 55.5 28 57.5 35 60 44 Z" fill="url(#ttiCrown)"/>
        <path d="M 45 31 C 49 27.5 52.5 24.5 56 22.5" stroke="#B2B8C2" strokeWidth="0.7" fill="none" opacity="0.8"/>
      </g>
      <circle cx="45" cy="50" r="16" fill="url(#ttiHead)"/>
      {/* pale throat / lower cheek */}
      <path d="M 31 55 C 33 63 40 67 48 66.5 C 53 66 57 64 60 60 C 54 62 46 62 40 60 C 36 58.5 33 57 31 55 Z" fill="#F2F0EC"/>
      {/* black forehead patch above the bill */}
      <path d="M 29.4 50.4 C 29.2 47.4 31 45 34 44 C 34.6 46.4 33.8 48.8 32.2 50.6 Z" fill="#17181C"/>
      {/* stubby dark bill */}
      <path d="M 30.4 49.6 C 27.4 50.2 24.6 51.4 22.6 52.8 C 24.6 54.2 27.4 54.8 30.4 55 Z" fill="#2C2E35"/>
      {open && <path d="M 30 52.6 L 23.5 53 L 29.6 55.6 Z" fill="#B8505A"/>}
      {/* big dark eye on a plain gray face */}
      <circle cx="40.5" cy="48.6" r="5.2" fill="#C3C8D0" opacity="0.6"/>
      {blink ? <path d="M 36.4 48.8 Q 40.5 51 44.6 48.8" stroke="#2A2C32" strokeWidth="1.2" fill="none" strokeLinecap="round"/> : (
        <g>
          <circle cx="40.5" cy="48.6" r="4.3" fill="#0E0E12"/>
          <circle cx="39" cy="46.9" r="1.5" fill="#FFF"/>
          <circle cx="42" cy="50.4" r="0.6" fill="#FFF" opacity="0.7"/>
        </g>
      )}
    </g>
  )
}

function Body() {
  return (
    <g>
      <path d="M 86 84 C 95 90 103 98 109 106 C 108 108 106.5 109.5 105 110 C 98 103 90 96 82 90 Z" fill="#6F7684"/>
      <path d="M 90 89 C 96 94 102 100 107 107" stroke="#5B6270" strokeWidth="0.6" fill="none"/>
      <path d="M 40 72 C 42 60 54 56 66 58 C 80 60 90 70 92 82 C 90 94 78 101 64 100 C 50 99 40 88 40 72 Z" fill="url(#ttiBack)"/>
      {/* whitish underparts */}
      <path d="M 40.5 66 C 39 82 47 97 62 100 C 72 101 80 97 85 91 C 73 92 61 88 53 80 C 47 75 43 71 40.5 66 Z" fill="#F4F1EC"/>
      {/* peach-rust flanks */}
      <path d="M 53 83 C 61 90 72 93 85 91 C 81 97 72 100.5 64 100 C 58.5 96 55 90 53 83 Z" fill="#E59E70" filter="url(#ttiSoft)"/>
    </g>
  )
}

function Wing() {
  return (
    <g>
      <path d="M 58 64 C 68 60 82 64 90 74 C 94 80 96 86 96.5 91 C 88 90.5 78 86.5 70 82 C 62 77.5 58 72 58 64 Z" fill="url(#ttiWing)"/>
      <path d="M 70 75 C 78 80 86 85 95 89 M 74 71 C 82 76 89 81 95 86 M 64 70 C 68 73 72 75 77 77" stroke="#5E6573" strokeWidth="0.7" fill="none"/>
      <path d="M 61 64 C 67 61.5 75 62 82 66" stroke="#B9BFC9" strokeWidth="0.9" fill="none" opacity="0.8" strokeLinecap="round"/>
    </g>
  )
}

function Feet({ y = 101 }) {
  return (
    <g stroke="#6A7485" strokeLinecap="round" fill="none">
      <path d={`M 59 97 L 57 ${y} M 67 98 L 67 ${y}`} strokeWidth="2"/>
      <path d={`M 57 ${y} l -4 0.4 M 57 ${y} l -2.6 2.6 M 57 ${y} l 3 1.6 M 67 ${y} l -4 0.4 M 67 ${y} l -2.6 2.6 M 67 ${y} l 3 1.6`} strokeWidth="1.4"/>
    </g>
  )
}

function Seed({ x, y, r = 0 }) {
  // striped black-oil / gray-striped sunflower seed
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M -4.4 0 C -3 -2 2 -2.2 4.4 0 C 2 2.2 -3 2 -4.4 0 Z" fill="#26272C"/>
      <path d="M -3 -0.9 L 3.2 -0.9 M -3 0.9 L 3.2 0.9" stroke="#E8E4DA" strokeWidth="0.6"/>
    </g>
  )
}

function FlitWing() {
  // Open wing lifted for a hop-flight between branches
  return (
    <g>
      <path d="M 60 66 C 60 52 64 38 74 26 C 80 22 86 20 92 21 C 92 24 90 26 88 27 C 92 28 94 30 94 33 C 91 33 88 34 86 35 C 89 37 90 40 89 43 C 86 43 84 44 82 45 C 82 52 80 60 76 70 Z" fill="url(#ttiWing)"/>
      <path d="M 74 26 C 80 22 86 20 92 21 C 92 24 90 26 88 27 C 92 28 94 30 94 33 C 91 33 88 34 86 35 C 89 37 90 40 89 43 C 86 43 84 44 82 45 C 80 38 78 32 74 26 Z" fill="#5E6573"/>
      <path d="M 66 62 C 68 52 72 42 78 34" stroke="#5E6573" strokeWidth="0.7" fill="none"/>
      {/* shoulder coverts blend the wing root into the back */}
      <path d="M 56 66 C 60 58 70 56 80 60 C 80 66 76 71 70 73 C 64 73 59 70 56 66 Z" fill="url(#ttiBack)"/>
      <path d="M 60 66 C 64 63 70 62 76 64" stroke="#7E8593" strokeWidth="0.6" fill="none"/>
    </g>
  )
}

function Branch() {
  return (
    <g>
      <path d="M 0 108 C 30 104 70 101.5 120 97" stroke="#5E4230" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M 0 106.4 C 30 102.4 70 100 120 95.4" stroke="#7E5C44" strokeWidth="1.4" fill="none" opacity="0.8"/>
      <path d="M 20 107 l 4 -0.6 M 44 104.6 l 5 -0.5 M 88 100.6 l 4 -0.4" stroke="#43301F" strokeWidth="0.8"/>
      {/* side twig with autumn oak leaves and an acorn */}
      <path d="M 96 99 C 100 106 104 112 109 119" stroke="#5E4230" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M 104 112 C 98 112 94 116 94 122 C 96 120 98 121 99 119 C 100 121 102 120 103 118 C 105 118 106 116 104 112 Z" fill="#C8642A"/>
      <path d="M 109 119 C 109 114 112 111 116 110 C 116 112 117 113 118 113 C 117 116 116 118 117 120 C 114 120 112 121 109 119 Z" fill="#D9932E"/>
      <ellipse cx="16" cy="114" rx="3.2" ry="4" fill="#9A6A2E"/>
      <path d="M 12.6 111.6 C 13.4 108.6 18.6 108.6 19.4 111.6 Z" fill="#6E4A24"/>
      <path d="M 16 108.8 L 15 104" stroke="#5E4230" strokeWidth="1.2"/>
    </g>
  )
}

export default function TuftedTitmouse({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 380); return () => clearInterval(id) }, [animated])
  const crest = animated ? [0, -2, -4, -4, -2, 0, 1, 0][frame] : 0
  const blink = animated && frame === 6
  const peck = animated ? [0, 2, 5, 2, 0, 0, 0, 0][frame] : 0
  const bob = animated ? [0, -0.6, -1, -0.6, 0, 0.4, 0.6, 0.4][frame] : 0

  let bird, shadowY = 102
  if (pose === 'seed') {
    // Just grabbed a sunflower seed — head up, seed crosswise in the bill.
    bird = (
      <g>
        <Body/><Wing/><Feet/>
        <g transform={`rotate(${-6 + bob} 46 60)`}><Head crest={crest} blink={blink}/><g transform="translate(22.6 53.6) scale(1.3)"><Seed x={0} y={0} r={-12}/></g></g>
      </g>
    )
  } else if (pose === 'hammer') {
    // Seed pinned under a foot against the branch; bowing to hammer it open.
    bird = (
      <g>
        <g transform="rotate(14 64 102)"><Body/><Wing/></g>
        <Feet/>
        <Seed x={37} y={99.4} r={-6}/>
        <g transform={`translate(-1,${21 + peck}) rotate(-38 46 50)`}><Head crest={crest * 0.5}/></g>
        <path d="M 33 94 l -3 -2 M 33 98 l -4 0 M 44 94 l 2 -2.5" stroke="#F4E3A2" strokeWidth="1" strokeLinecap="round" opacity={animated ? (peck > 3 ? 0.9 : 0) : 0.8}/>
      </g>
    )
  } else if (pose === 'flit') {
    // Hopping up off the branch: wing open, feet tucked, crest swept back.
    shadowY = 106
    bird = (
      <g transform={`translate(0,${-6 + bob}) rotate(-12 64 80)`}>
        <Body/><FlitWing/>
        <path d="M 60 98 l -2 3.5 M 66 99 l -1 3.5" stroke="#6A7485" strokeWidth="1.8" strokeLinecap="round"/>
        <Head crest={6 + crest}/>
      </g>
    )
  } else {
    bird = (
      <g>
        <Body/><Wing/><Feet/>
        <g transform={`translate(0,${bob})`}><Head crest={crest} blink={blink}/></g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Tufted Titmouse">
      <defs>
        <linearGradient id="ttiCrown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B929F"/><stop offset="100%" stopColor="#9DA4B0"/>
        </linearGradient>
        <linearGradient id="ttiHead" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#959CA8"/><stop offset="70%" stopColor="#ADB3BD"/><stop offset="100%" stopColor="#D6D9DE"/>
        </linearGradient>
        <linearGradient id="ttiBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#959CA8"/><stop offset="100%" stopColor="#8A919E"/>
        </linearGradient>
        <linearGradient id="ttiWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8C93A0"/><stop offset="100%" stopColor="#6C7381"/>
        </linearGradient>
        <filter id="ttiSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter>
      </defs>
      {scene ? <Branch/> : <ellipse cx="64" cy={shadowY + 1} rx="20" ry="2.4" fill="#000" opacity="0.2"/>}
      {bird}
    </svg>
  )
}
