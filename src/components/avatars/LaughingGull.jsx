// Laughing Gull (adult, fall/non-breeding plumage) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'laughing_gull', poses: ['stand', 'fly'] }

// Field marks (what separates it from Ring-billed & Herring Gulls): smaller, SLIM gull with
// LONG wings reaching far past the tail; DARK SLATE-GRAY back and wings (much darker than
// either), blending into BLACK wingtips with only tiny white tips and NO big white mirrors;
// broad WHITE TRAILING EDGE on the wing in flight; long, slightly DROOPING DARK bill; DARK
// legs; DARK eye with white crescents above and below. Fall: the summer black hood is gone,
// leaving a smudgy gray "half-hood" on the back of the head; white body and tail.

const SLATE = '#59626C'
const SLATE_D = '#444C56'
const INK = '#141416'
const LEG = '#2E2A2C'
const BILL = '#2B2427'

function Bill({ open = 0 }) {
  // Base at x≈28, tip at x≈6: long and gently drooping at the tip.
  const up = 'M 28 43 C 22 43 16 43.4 11.6 44.6 C 8.6 45.4 6.6 47 6.2 48.8 C 7.4 48.5 8.8 48.3 10.2 48.2 L 28 48 Z'
  const lo = 'M 28 48 L 10.2 48.2 C 11.6 48.9 13.2 49.3 15 49.5 C 19.5 49.5 24 49.7 28 50.4 Z'
  return (
    <g>
      {open > 0 && <path d="M 28.5 46.6 L 12 45.8 L 13 50 L 28.5 49.6 Z" fill="#C2413A"/>}
      <g transform={`rotate(${open} 28 48)`}>
        <path d={up} fill={BILL}/>
        <path d="M 26 44.2 C 21 44 15.6 44.4 11.6 45.4" stroke="#5A4E52" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
        <path d="M 23.5 45.3 l -3.4 0.3" stroke="#0E0C0D" strokeWidth="0.7" strokeLinecap="round"/>
      </g>
      <g transform={`rotate(${-open * 0.8} 28 48)`}>
        <path d={lo} fill="#241E21"/>
      </g>
    </g>
  )
}

const HEAD = 'M 26.5 47 C 26 38 31.5 31.5 39.5 31.5 C 47.5 31.5 52 37.5 51.6 45 C 51.4 51.5 49.2 57 47.4 64 L 33 64 C 29 59 26.7 53 26.5 47 Z'

function Head({ open = 0, blink = false }) {
  // Profile facing left; sloping forehead, centre ≈ (39,44).
  return (
    <g transform="translate(40,50) scale(1.08) translate(-40,-50)">
      <clipPath id="lagHeadClip"><path d={HEAD}/></clipPath>
      <path d={HEAD} fill="#FFF"/>
      {/* fall "half-hood": a smudgy gray wash on the rear crown and behind the eye */}
      <g clipPath="url(#lagHeadClip)">
        <ellipse cx="46.5" cy="41" rx="8.5" ry="9" fill="#6A7078" opacity="0.42"/>
        <ellipse cx="38.5" cy="41.5" rx="7" ry="6" fill="#5A6068" opacity="0.4"/>
        <ellipse cx="49" cy="50" rx="5" ry="6" fill="#8A9098" opacity="0.2"/>
      </g>
      <path d="M 27.6 52 C 30 57 35 59.5 41 59.5" stroke="#E2E8EE" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* dark eye with white crescents above and below */}
      {blink
        ? <path d="M 31.2 41.6 C 33.2 43.2 36.2 43.2 38.2 41.6" stroke="#2A2224" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="34.7" cy="41.3" r="3.5" fill="#2A1C18" stroke="#3A3034" strokeWidth="0.6"/>
            <circle cx="35" cy="41.5" r="1.6" fill="#0A0808"/>
            <circle cx="33.5" cy="40" r="1.15" fill="#FFF"/>
          </g>}
      <path d="M 31.4 37 C 33.4 35.6 36.4 35.6 38.4 37" stroke="#FFF" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M 31.6 45.6 C 33.6 47 36.4 47 38.4 45.6" stroke="#FFF" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <Bill open={open}/>
    </g>
  )
}

function Legs() {
  // Fairly long, dark legs.
  return (
    <g strokeLinecap="round">
      <path d="M 64 89 L 65.5 107.5" stroke="#1C1A1B" strokeWidth="2.3"/>
      <path d="M 65.5 107.5 l 6 2.5 q -3 1.2 -6 0 q -2.6 1.2 -5 -0.2 Z" fill="#1C1A1B"/>
      <path d="M 55 89 L 54 108" stroke={LEG} strokeWidth="2.5"/>
      <path d="M 54 108 l -7.4 2.8 q 3.6 1.4 7.3 -0.2 q 3.2 1.4 6.2 0 Z" fill={LEG}/>
    </g>
  )
}

function Body() {
  // Slimmer body than the bigger gulls, with long wings projecting well past the tail.
  return (
    <g>
      <path d="M 84 80 L 100 78.5 L 99 84 L 86 86.5 Z" fill="#F4F6F8" stroke="#D5DCE2" strokeWidth="0.5"/>
      <path d="M 39 57 C 29 64 29 82 40 90 C 52 97 72 95.5 87 86.5 L 101 79.5 C 94 72.5 80 63.5 60 57.5 C 52 55 45 54.5 39 57 Z" fill="url(#lagWhite)"/>
      <path d="M 41.5 60 C 49 53.5 66 54.5 82 62.5 C 91 67 98 71.6 103 76.6 L 99 78.8 C 87 83 72 85 58 84.4 C 50 84 44.5 80.4 42 74.6 C 40 69.6 39.6 64 41.5 60 Z" fill="url(#lagMantle)"/>
      <path d="M 50 69 C 58 71 68 75 78 80.5 M 56 63.5 C 64 65.5 72 69 80 74" stroke={SLATE_D} strokeWidth="0.7" fill="none" opacity="0.8"/>
      <path d="M 67 60.4 C 75 63 83 67 89 71.2" stroke="#FFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* broad white trailing edge of the secondaries */}
      <path d="M 47 80.8 C 60 84.8 76 85 92 80.6" stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* long black primaries, tiny white tips */}
      <path d="M 86 79 C 95 81 103 83.6 109 86.6 C 102 87.2 94 86.2 87 83.8 Z" fill={INK}/>
      <path d="M 87 75.6 C 97 77.8 107 81.4 114 85 C 107 85.8 98 84.6 89 81.4 Z" fill="#1E1F23"/>
      <path d="M 87 72 C 98 74 110 78.6 118 83.4 C 111 84 101 82.6 89 78.2 Z" fill={INK}/>
      <circle cx="117" cy="83.3" r="0.8" fill="#FFF"/>
      <circle cx="113" cy="84.9" r="0.75" fill="#FFF"/>
      <circle cx="108.2" cy="86.5" r="0.7" fill="#FFF"/>
    </g>
  )
}

function FlyBird({ flex = 0, head }) {
  return (
    <g>
      <g transform={`rotate(${-flex} 60 58)`}>
        <path d="M 52 57 C 55 45 61 33 68 23 L 81 5 C 81 14 79 24 77 34 C 75 42 74 50 73 57 Z" fill={SLATE_D}/>
        <path d="M 72.6 17 L 81 5 C 81 10.5 80.2 16.5 79 22 C 76.6 21 74.4 19.4 72.6 17 Z" fill={INK}/>
      </g>
      <path d="M 92 60 L 106 58 C 108 60.6 108 63.6 106 66 L 92 65.5 Z" fill="#F4F6F8" stroke="#D5DCE2" strokeWidth="0.5"/>
      <path d="M 90 65 l 9 2.4 l -1.2 2 Z" fill={LEG}/>
      {head}
      <path d="M 26 59 C 35 50 60 51 78 53.5 C 88 55.5 95 58 99 61 C 95 65.5 86 69 72 70 C 56 71 37 70 28 65 Z" fill="url(#lagWhite)"/>
      <g transform={`rotate(${flex} 64 58)`}>
        {/* long, pointed dark slate wing; black outer hand with no mirrors; broad white trailing edge */}
        <path d="M 46 59 C 52 47 61 37.5 72.5 31 L 112 4 C 106 14 98 24 91 32 C 86.5 41 84 50 84 60 Z" fill="url(#lagMantle)"/>
        <path d="M 86 22.4 L 112 4 C 106.5 13 100 21.4 93.6 28.6 C 90.4 27 87.6 25 86 22.4 Z" fill={INK}/>
        <path d="M 81 25.8 L 86 22.4 C 87.6 25 90.4 27 93.6 28.6 L 90.6 31.6 C 87.6 30.4 83.4 28.4 81 25.8 Z" fill="#26282C"/>
        <circle cx="111" cy="5.4" r="0.8" fill="#FFF"/>
        <path d="M 84 60 C 84 50 86.5 41 91 32 C 92.4 30.4 93.2 29.4 94.2 28.4" stroke="#FFF" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M 60 51 C 66 45 73 39 81 33" stroke={SLATE_D} strokeWidth="0.8" fill="none"/>
      </g>
    </g>
  )
}

function Beach() {
  // Sandy bay beach with a lacy wave edge and a couple of shells.
  return (
    <g>
      <path d="M 0 95 Q 30 93 60 95 T 120 95 L 120 106 L 0 106 Z" fill="url(#lagSea)"/>
      <path d="M 0 104 C 14 100 24 103 36 101.5 C 50 100 62 103.5 78 101.5 C 92 100 106 103 120 101 L 120 130 L 0 130 Z" fill="url(#lagSand)"/>
      <path d="M 0 104 C 14 100 24 103 36 101.5 C 50 100 62 103.5 78 101.5 C 92 100 106 103 120 101" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity="0.85"/>
      <path d="M 10 99 q 6 -1.4 12 0 M 84 98 q 8 -1.4 16 0" stroke="#B4DCEE" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M 92 118 c 1 -4 7 -4 8 0 Z" fill="#F2E6D6" stroke="#C8AE90" strokeWidth="0.5"/>
      <path d="M 94 118 l 1 -3 M 96 118 l 0 -3.4 M 98 118 l -1 -3" stroke="#C8AE90" strokeWidth="0.4"/>
      <ellipse cx="22" cy="122" rx="2.6" ry="1.4" fill="#C49A7A" opacity="0.8"/>
      <path d="M 30 116 l -2 -1.6 M 30 116 l 0 -2.4 M 30 116 l 2 -1.6 M 40 120 l -2 -1.6 M 40 120 l 0 -2.4 M 40 120 l 2 -1.6" stroke="#B89C74" strokeWidth="0.7" strokeLinecap="round" opacity="0.7"/>
    </g>
  )
}

function Sea({ bob = 0 }) {
  return (
    <g>
      <path d={`M 0 ${91 + bob * 0.3} Q 15 ${89 + bob * 0.3} 30 91 T 60 91 T 90 91 T 120 91 L 120 130 L 0 130 Z`} fill="url(#lagSea)"/>
      <path d="M 14 100 q 8 -2 16 0 M 70 104 q 10 -2 20 0 M 30 114 q 7 -1.6 14 0 M 92 116 q 7 -2 14 0" stroke="#B4DCEE" strokeWidth="1" fill="none" opacity="0.65" strokeLinecap="round"/>
    </g>
  )
}

export default function LaughingGull({ size = 120, animated = false, style = {}, pose = 'stand', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.3, 0.5, 0.3][frame] : 0
  const blink = animated && frame === 5
  const flex = animated ? [0, 2, 4, 2, 0, -2, -4, -2][frame] : 0

  let bird
  if (pose === 'fly') {
    bird = <g transform={`translate(0,${6 + bob * 2})`}><FlyBird flex={flex} head={<g transform="translate(-6,8) scale(0.9) translate(5,0)"><Head blink={blink}/></g>}/></g>
  } else if (pose === 'laugh') {
    // Head tipped up, bill wide: the "ha-ha-ha-haa" laugh that names the bird.
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><g transform="rotate(-34 46 60) translate(1,-3)"><Head open={15} blink={blink}/></g></g></g>
  } else if (pose === 'swim') {
    bird = (
      <g transform={`translate(0,${bob})`}>
        <clipPath id="lagSwimClip"><rect x="0" y="0" width="120" height="93"/></clipPath>
        <g clipPath="url(#lagSwimClip)"><g transform="translate(0,10)"><Body/><Head blink={blink}/></g></g>
      </g>
    )
  } else {
    bird = <g><Legs/><g transform={`translate(0,${bob})`}><Body/><Head blink={blink}/></g></g>
  }

  let backdrop = null
  if (scene) backdrop = pose === 'swim' ? <Sea bob={bob}/> : <Beach/>
  else if (pose === 'swim') backdrop = <path d="M 22 93 C 46 96 90 96 110 92" stroke="#B4DCEE" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round"/>
  else if (pose !== 'fly') backdrop = <ellipse cx="59" cy="110" rx="16" ry="2.2" fill="#000" opacity="0.2"/>

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Laughing Gull">
      <defs>
        <linearGradient id="lagWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F6F8FA"/><stop offset="100%" stopColor="#DCE3EA"/>
        </linearGradient>
        <linearGradient id="lagMantle" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6A737D"/><stop offset="100%" stopColor={SLATE}/>
        </linearGradient>
        <linearGradient id="lagSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4E96B4" stopOpacity="0.9"/><stop offset="100%" stopColor="#225270" stopOpacity="0.95"/>
        </linearGradient>
        <linearGradient id="lagSand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D4AA"/><stop offset="100%" stopColor="#CDB284"/>
        </linearGradient>
      </defs>
      {backdrop}
      {/* Smallest of the three: standing birds are scaled about the feet so the three gulls read as different sizes. */}
      {(pose !== 'fly' && pose !== 'swim') ? <g transform="translate(58,110) scale(0.93) translate(-58,-110)">{bird}</g> : bird}
      {scene && pose === 'swim' && <path d="M 30 93.5 q 12 -3 24 0 q 12 3 24 0 q 10 -2.4 20 0" stroke="#D8F0FA" strokeWidth="1.3" fill="none" opacity="0.9"/>}
    </svg>
  )
}
