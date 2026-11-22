// Belted Kingfisher (adult FEMALE — she wears the extra rusty belly band) — "accurate first,
// cute second, in habitat". Follows the WoodDuck.jsx template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'belted_kingfisher', poses: ['perch', 'plunge'] }

// Field marks: slate-blue head, crest, back and wings; big SHAGGY ragged crest; oversized head;
// long heavy black DAGGER bill; small white spot in front of the eye; broad WHITE COLLAR all
// the way round the neck; white throat; one slate-BLUE BREAST BAND; female's second RUSTY
// BELLY BAND running down the flanks; white spots on dark wings and tail; tiny feet.
// Behaviour: perches over water, HOVERS, then PLUNGES headfirst.

// The bird in its perched posture, facing left. Head centre ≈ (52,42); feet ≈ (62,96).
// wings: 'folded' draws the closed wing; 'open' leaves it off (caller draws spread wings).
function Bird({ blink = false, wings = 'folded', crestLift = 0, headRot = 0, tail = 'closed' }) {
  return (
    <g>
      {/* short tail with white spots, hanging below the perch */}
      {tail === 'closed'
        ? <g>
            <path d="M 80 88 C 85 93 88 99 90 106 L 84 108 C 81 101 78 96 74 92 Z" fill="url(#bkiBlue)"/>
            {[[84, 99], [86, 103.5]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.3" ry="0.8" fill="#F4F8FA" transform={`rotate(60 ${x} ${y})`}/>)}
          </g>
        : <g>
            <path d="M 76 90 C 76 98 72 106 66 112 C 72 114 80 114 86 112 C 86 104 86 96 84 90 Z" fill="url(#bkiBlue)"/>
            <path d="M 70 110 L 77 94 M 79 113 L 80 94" stroke="#2E4660" strokeWidth="0.7"/>
            {[[71, 105], [76, 108], [81, 106]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#F4F8FA"/>)}
          </g>}

      {/* body: white underparts with BLUE breast band and RUSTY belly band (+ rusty flanks) */}
      <g clipPath="url(#bkiBodyClip)">
        <rect x="30" y="50" width="70" height="60" fill="#FAFBFB"/>
        <path d="M 30 62 L 100 58 L 100 71 C 80 74 56 74 30 72 Z" fill="url(#bkiBlue)"/>
        <path d="M 30 80 C 50 82 70 82 100 78 L 100 92 C 76 95 56 94 30 90 Z" fill="url(#bkiRust)"/>
        <path d="M 74 70 C 82 74 88 82 90 92 L 100 92 L 100 66 Z" fill="url(#bkiRust)"/>
        <path d="M 46 88 C 52 94 60 96 68 96" stroke="#D8DEE0" strokeWidth="1" fill="none"/>
      </g>

      {/* white collar ringing the neck, white throat */}
      <path d="M 37 48 C 39 57 49 62 61 62 C 67 62 72 60 75 56 L 73 48 C 66 53 58 54 50 54 C 44 53 40 51 37 48 Z" fill="#FAFBFB"/>
      <path d="M 40 56 C 46 61 56 63 66 61.5" stroke="#D8DEE0" strokeWidth="0.8" fill="none"/>

      {wings === 'folded' && (
        <g>
          <path d="M 62 60 C 74 55 87 62 91 75 C 93 84 93 92 93 99 C 88 96 82 92 77 88 C 69 80 63 71 62 60 Z" fill="url(#bkiBlue)"/>
          <path d="M 80 82 C 86 87 90 93 93 99 C 89 97 85 95 82 92 Z" fill="#26384E"/>
          {[[70, 66], [75, 68], [80, 71], [72, 73], [77, 76], [83, 78], [79, 83], [85, 86]].map(([x, y], i) =>
            <circle key={i} cx={x} cy={y} r="0.9" fill="#E8F0F4"/>)}
          <path d="M 64 62 C 74 60 84 64 89 74" stroke="#7896B8" strokeWidth="1" fill="none" opacity="0.8"/>
        </g>
      )}

      <g transform={`rotate(${headRot} 55 47)`}>
      {/* big shaggy crest swept up and back */}
      <g transform={`rotate(${crestLift} 58 32)`}>
        <path d="M 50 30 C 54 22 60 17 66 14 L 65 19.5 C 69 16 74 14.5 79 15 L 75 20 C 80 19.5 84 21 87 24 L 80 25.5 C 83 27.5 85 30.5 85 34 L 78 33 C 79 36 78.5 39 77 41 L 68 40 Z" fill="url(#bkiCrest)"/>
        <path d="M 62 22 L 70 28 M 70 20 L 76 27 M 76 24 L 80 30" stroke="#2E4660" strokeWidth="0.8" strokeLinecap="round"/>
      </g>
      {/* oversized head */}
      <path d="M 36 43 C 36 33 43 27 53 27 C 64 27 72 34 72 45 C 72 51 68 55 60 55 L 46 54.5 C 40 53 36 49 36 43 Z" fill="url(#bkiHead)"/>
      <path d="M 44 31 C 50 28.5 58 28.5 64 31.5" stroke="#7896B8" strokeWidth="1.2" fill="none" opacity="0.7" strokeLinecap="round"/>

      {/* heavy dagger bill */}
      <path d="M 39 46.5 C 30 46.6 20 46.8 9 46.4 C 18 48.6 29 50.4 39 50.6 Z" fill="#2A2C2E"/>
      <path d="M 39 39.5 C 29 41.5 18 44 9 46.4 C 20 46.8 30 46.6 39 46.5 Z" fill="#141516"/>
      <path d="M 39 47.6 C 34 48.6 30 49.2 26 49.4" stroke="#6E7478" strokeWidth="1.2" fill="none" opacity="0.8"/>
      <path d="M 38 41 C 32 42.4 24 44.2 16 45.6" stroke="#3E4246" strokeWidth="0.6" fill="none"/>

      {/* white spot in front of the eye */}
      <ellipse cx="42" cy="39" rx="2" ry="1.5" fill="#FAFBFB"/>
      {/* big bright eye with catch-light */}
      {blink
        ? <path d="M 45.5 41.5 q 3.5 2.2 7 0" stroke="#0A0C0C" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="49" cy="41" r="4" fill="#0E1012"/>
            <circle cx="49" cy="41" r="3.1" fill="#2A1C14"/>
            <circle cx="49" cy="41" r="1.7" fill="#050505"/>
            <circle cx="47.6" cy="39.6" r="1.25" fill="#FFF"/>
          </g>}
      </g>
    </g>
  )
}

// Spread wing seen from above-side; base along the shoulder at (62,60).
function SpreadWing() {
  return (
    <g>
      <path d="M 60 62 C 62 46 70 30 84 18 L 90 13 C 92 12 94 13.5 93 15.5 L 90 19 L 96 15 C 98 14 100 16 98.5 18 L 94 22.5 L 100 20 C 102 19.5 103 22 101 23 L 95 28 C 98 28 99 30.5 97 31.5 L 88 36 C 84 44 80 54 78 64 Z" fill="url(#bkiBlue)"/>
      <path d="M 84 18 L 90 13 L 96 15 L 100 20 L 101 23 L 97 31.5 L 88 36 C 88 30 87 24 84 18 Z" fill="#26384E"/>
      <path d="M 86 22 L 92 24 M 88 28 L 94 29" stroke="#E8F0F4" strokeWidth="1.6" strokeLinecap="round"/>
      {[[68, 46], [73, 41], [72, 52], [77, 47]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#E8F0F4"/>)}
    </g>
  )
}

function Stream({ y = 112 }) {
  return (
    <g>
      <path d={`M 0 ${y} Q 15 ${y - 2} 30 ${y} T 60 ${y} T 90 ${y} T 120 ${y} L 120 130 L 0 130 Z`} fill="url(#bkiWater)"/>
      <path d={`M 10 ${y + 6} q 8 -2 16 0 M 64 ${y + 10} q 10 -2 20 0 M 34 ${y + 14} q 6 -1.5 12 0`} stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
    </g>
  )
}

function Branch() {
  return (
    <g>
      <path d="M -2 101 C 30 98 70 95 122 90 L 122 95.5 C 70 100 30 103 -2 106 Z" fill="url(#bkiBark)"/>
      <path d="M 94 93 C 100 86 106 82 114 80" stroke="#6A4E34" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M 110 81 c 3 -3 7 -3 9 -1 c -3 2 -6 2.5 -9 1 Z M 104 85 c 2 -4 6 -5 9 -4 c -2 3 -5 4 -9 4 Z" fill="#7A9A44"/>
      <path d="M 10 101.5 l 6 -0.4 M 40 99 l 8 -0.6 M 76 96 l 6 -0.5" stroke="#4A3626" strokeWidth="0.7"/>
    </g>
  )
}

function Fish() {
  return (
    <g>
      <path d="M -8 0 C -5 -2.8 4 -3.2 7.5 0 C 4 3.2 -5 2.8 -8 0 Z" fill="url(#bkiFish)" stroke="#5E7684" strokeWidth="0.4"/>
      <path d="M 7.5 0 L 11.5 -2.8 L 10.5 0 L 11.5 2.8 Z" fill="#8FA8B4"/>
      <circle cx="-5.5" cy="-0.5" r="0.75" fill="#123"/>
    </g>
  )
}

export default function BeltedKingfisher({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  // Fast tick for the hover wing-whirr; the crest ruffle and blink run at a third of that.
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 24), 160); return () => clearInterval(id) }, [animated])
  const crestLift = animated ? [0, -2, -4, -2, 0, 1, 2, 1][Math.floor(frame / 3)] : 0
  const blink = animated && (frame === 15 || frame === 16)
  const beat = animated ? frame % 2 : 0

  let content
  if (pose === 'hover') {
    // Hovering on whirring wings over the water: body tilted, tail fanned, bill aimed down.
    const sy = beat ? 0.35 : 1
    content = (
      <g>
        {scene && <Stream y={114}/>}
        {scene && <path d="M 22 120 q 8 -2 16 0 M 14 125 q 12 -3 24 0" stroke="#D8F0FA" strokeWidth="1" fill="none" opacity="0.7"/>}
        <g transform="translate(62,62) rotate(28) translate(-62,-62) translate(-4,2)">
          <g opacity="0.5" transform={`translate(-6,4) translate(0,62) scale(1,${sy}) translate(0,-62)`}><SpreadWing/></g>
          <Bird blink={blink} wings="open" crestLift={crestLift} headRot={-80} tail="fan"/>
          <g transform={`translate(0,62) scale(1,${sy}) translate(0,-62)`}><SpreadWing/></g>
        </g>
        <path d="M 104 18 q 6 3 7 10 M 108 12 q 6 4 7 12" stroke="#E8F4FA" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
      </g>
    )
  } else if (pose === 'plunge') {
    // Headfirst dive: body straight down, wings swept up and back, bill about to hit the water.
    const ring = scene ? '#D8F0FA' : '#A8D8EC'
    content = (
      <g>
        {scene && <Stream y={112}/>}
        {/* drawn head-down along a vertical axis, then tilted into the dive */}
        <g transform="translate(60,70) rotate(18) scale(1.12,1.04) translate(-60,-72)">
          {/* tail and swept-back wingtips trailing above */}
          <path d="M 57 30 C 57 22 58 14 60 6 C 62 14 63 22 63 30 Z" fill="url(#bkiBlue)"/>
          <path d="M 66 54 C 70 40 72 26 74 12 C 76 24 76 40 71 58 Z" fill="#2E4660"/>
          <g clipPath="url(#bkiDiveClip)">
            <rect x="44" y="20" width="34" height="56" fill="#FAFBFB"/>
            <path d="M 40 36 L 62 34 L 62 44 L 40 46 Z" fill="url(#bkiRust)"/>
            <path d="M 40 54 L 62 52 L 62 61 L 40 62 Z" fill="url(#bkiBlue)"/>
            <path d="M 58 20 L 80 20 L 80 72 L 64 72 C 62 60 60 44 58 20 Z" fill="url(#bkiBlue)"/>
          </g>
          <path d="M 61 26 C 66 36 68 50 66 64 C 64 60 62 50 61 40 Z" fill="#3A5878"/>
          {[[64, 40], [65, 46], [65, 52], [63.5, 34]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#E8F0F4"/>)}
          {/* white collar */}
          <path d="M 47 62 C 52 66 68 66 73 62 L 73 68 C 68 71 52 71 47 68 Z" fill="#FAFBFB"/>
          {/* crest flattened back along the nape */}
          <path d="M 64 70 C 68 64 72 60 78 56 L 75 62 C 79 60 82 60 84 61 L 77 67 C 79 68 80 70 80 72 L 70 76 Z" fill="url(#bkiCrest)"/>
          {/* head */}
          <circle cx="60" cy="78" r="12" fill="url(#bkiHead)"/>
          {/* dagger bill pointing straight down */}
          <path d="M 54.5 86 L 60.4 112 L 61 86 Z" fill="#2A2C2E"/>
          <path d="M 61 86 L 60.4 112 L 66 85.5 Z" fill="#141516"/>
          <ellipse cx="58" cy="85" rx="1.4" ry="1.9" fill="#FAFBFB"/>
          <circle cx="56" cy="78.5" r="3.6" fill="#0E1012"/>
          <circle cx="56" cy="78.5" r="2.8" fill="#2A1C14"/>
          <circle cx="56" cy="78.5" r="1.5" fill="#050505"/>
          <circle cx="55" cy="77.3" r="1.1" fill="#FFF"/>
        </g>
        <path d="M 86 8 L 82 20 M 96 12 L 92 24 M 76 4 L 73 14" stroke="#E8F4FA" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        <path d="M 34 112 C 36 106 38 104 40 108 M 58 112 C 56 106 54 104 52 108 M 42 106 L 41 100 M 50 106 L 51 100" stroke={ring} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <ellipse cx="46" cy="112.5" rx="13" ry="2.4" fill="none" stroke={ring} strokeWidth="1.2" opacity="0.9"/>
      </g>
    )
  } else if (pose === 'fish') {
    // Back on the perch with a catch, ready to whack it on the branch.
    content = (
      <g>
        {scene && <Stream/>}
        {scene && <Branch/>}
        {!scene && <path d="M 40 99 C 60 97 80 95 104 92" stroke="#6A4E34" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>}
        <path d="M 57 94 l -2 4 M 59 94 l 0 4.5 M 66 93.6 l -2 4 M 68 93.6 l 0 4.5" stroke="#5A6A7A" strokeWidth="1.4" strokeLinecap="round"/>
        <g transform="translate(0,0)">
          <Bird blink={blink} crestLift={crestLift}/>
          <g transform="translate(17,47) rotate(78) scale(1.25)"><Fish/></g>
        </g>
      </g>
    )
  } else {
    content = (
      <g>
        {scene && <Stream/>}
        {scene && <Branch/>}
        {!scene && <path d="M 40 99 C 60 97 80 95 104 92" stroke="#6A4E34" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>}
        <path d="M 57 94 l -2 4 M 59 94 l 0 4.5 M 66 93.6 l -2 4 M 68 93.6 l 0 4.5" stroke="#5A6A7A" strokeWidth="1.4" strokeLinecap="round"/>
        <Bird blink={blink} crestLift={crestLift}/>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Belted Kingfisher">
      <defs>
        <clipPath id="bkiDiveClip">
          <path d="M 60 24 C 70 26 74 40 73 54 C 72 62 67 68 60 68 C 53 68 48 62 47 54 C 46 40 50 26 60 24 Z"/>
        </clipPath>
        <clipPath id="bkiBodyClip">
          <path d="M 48 60 C 43 70 45 85 55 93 C 63 99 76 98 84 92 C 90 86 89 70 81 61 C 73 54 54 53 48 60 Z"/>
        </clipPath>
        <linearGradient id="bkiHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A8EB6"/><stop offset="60%" stopColor="#4A6E96"/><stop offset="100%" stopColor="#3A5878"/>
        </linearGradient>
        <linearGradient id="bkiCrest" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#56789E"/><stop offset="100%" stopColor="#34506E"/>
        </linearGradient>
        <linearGradient id="bkiBlue" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#56789E"/><stop offset="100%" stopColor="#3A5878"/>
        </linearGradient>
        <linearGradient id="bkiRust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8682E"/><stop offset="100%" stopColor="#A4501E"/>
        </linearGradient>
        <linearGradient id="bkiBark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A6A48"/><stop offset="100%" stopColor="#5A4230"/>
        </linearGradient>
        <linearGradient id="bkiFish" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A98A6"/><stop offset="55%" stopColor="#D6E4EA"/><stop offset="100%" stopColor="#F4F8FA"/>
        </linearGradient>
        <linearGradient id="bkiWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {content}
    </svg>
  )
}
