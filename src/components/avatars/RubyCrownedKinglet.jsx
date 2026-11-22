// Ruby-crowned Kinglet (adult male) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'ruby_crowned_kinglet', poses: ['perch', 'flick', 'excited', 'hover'] }

// Field marks: TINY round olive-green bird with a big head and short notched tail; bold
// BROKEN WHITE EYE-RING (gaps at top and bottom) around a big dark eye; tiny thin dark
// bill; one bold WHITE WING BAR with a BLACK BAR right behind it (plus a fainter upper bar);
// flight feathers edged yellow-green, tertials edged whitish; pale olive-buff underparts;
// dark legs with yellowish toes. Male's RUBY CROWN PATCH is usually hidden (a hint of red
// in the crown) and is raised into a scarlet tuft when excited. Constant WING-FLICKING.

const OLIVE = '#7A8A3E'
const DARK = '#2A2E1A'

function Tail({ fan = 0 }) {
  return (
    <g transform={`rotate(${fan} 82 80)`}>
      <path d="M 80 78 C 88 82 96 88 103 96 L 99.5 97.5 L 98 101 C 91 95 84 90 77 86 Z" fill="#4B5228"/>
      <path d="M 82 81 C 89 86 95 91 100 97" stroke="#9AA45A" strokeWidth="0.7" fill="none" opacity="0.8"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      <ellipse cx="62" cy="73" rx="24" ry="18.5" fill="url(#rckBody)"/>
      <ellipse cx="56" cy="81" rx="15" ry="8.5" fill="#E6E2BC" opacity="0.75"/>
    </g>
  )
}

function Wing({ lift = 0 }) {
  // Folded wing seen from the side; `lift` swings it up from the shoulder (wing-flick).
  return (
    <g transform={`rotate(${-lift} 60 64)`}>
      <path d="M 56 65 C 62 60 72 60 80 66 C 88 72 93 80 94 89 C 86 89 76 85 68 80 C 61 76 57 71 56 65 Z" fill="#454C26"/>
      {/* coverts (olive) with faint upper wing bar */}
      <path d="M 56 65 C 61 60.5 69 60 73 62.5 L 65.5 77.5 C 60.5 75 57 70.5 56 65 Z" fill={OLIVE}/>
      <path d="M 62 61.6 C 64.5 63 66 65.5 66 68" stroke="#D8DBB4" strokeWidth="1.2" fill="none" opacity="0.7" strokeLinecap="round"/>
      {/* bold white bar, then the black bar behind it */}
      <path d="M 72.6 62.4 C 68.8 67 66.2 72 65.2 77.6 L 69.4 80 C 70.4 74.4 73 68.6 77 64.4 Z" fill="#FAF8EC"/>
      <path d="M 77 64.4 C 73 68.6 70.4 74.4 69.4 80 L 74.2 82.4 C 75.4 76.6 78 71.4 81.6 67.8 Z" fill={DARK}/>
      {/* flight-feather edges (yellow-green) */}
      <path d="M 82 69 C 86 74 89 80 91 87 M 79 73 C 83 78 85.5 82 87 87.5 M 76.5 77.5 C 80 81 82 84 83 87" stroke="#B9C462" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      {/* tertial pale edges */}
      <path d="M 80 66.4 C 84 69 86.5 72 88 75.5" stroke="#E6E8C8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.85"/>
    </g>
  )
}

function Head({ blink = false, crown = 0, open = false }) {
  // Profile facing left; centre (45,53). crown: 0 = patch hidden (hint), 1 = raised tuft.
  return (
    <g>
      {crown > 0 && (
        <g>
          <path d="M 35.5 43 L 36 34 L 39.4 37.6 L 40.6 27.5 L 44 34.5 L 46.4 24 L 49 33.4 L 52.6 26.4 L 53.2 34.6 L 57.4 31 L 57 43 Z" fill="#D8152B"/>
          <path d="M 40.6 30 L 42.4 41 M 46.4 27 L 46.8 41 M 52.4 29 L 51.2 41" stroke="#FF5A5A" strokeWidth="0.8" fill="none" opacity="0.8"/>
        </g>
      )}
      <circle cx="45" cy="53" r="17" fill="url(#rckHead)"/>
      {crown > 0 && <path d="M 33 44 C 37 38.5 42 37 46 37.4 C 51 37.4 55 39.5 58 43.5 C 54 41.5 50 41 46 41 C 41 41 37 42 33 44 Z" fill="#5E6C2E"/>}
      {crown === 0 && <path d="M 41 37.3 C 44.5 36.4 48.5 36.6 51.5 37.8" stroke="#C8182C" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85"/>}
      {/* paler chin / throat */}
      <path d="M 30 59 C 33 65 39 69.5 46 70 C 41 66 37 62.5 34.5 58 Z" fill="#CFCDA2" opacity="0.85"/>
      {/* eye + broken white eye-ring */}
      {blink
        ? <path d="M 35.6 53 Q 40 55.4 44.4 53" stroke="#1A1410" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="40" cy="53" r="4.4" fill="#16110C"/>
            <circle cx="40.8" cy="53.6" r="2.6" fill="#2E2218"/>
            <circle cx="38.4" cy="51.4" r="1.5" fill="#FFF"/>
            <circle cx="41.6" cy="55.2" r="0.6" fill="#FFF" opacity="0.7"/>
          </g>}
      <path d="M 37.2 47.1 A 6.6 6.6 0 0 0 37.2 58.9" stroke="#FFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 42.8 47.1 A 6.6 6.6 0 0 1 42.8 58.9" stroke="#FFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* tiny thin bill */}
      {open
        ? <g><path d="M 29.4 53 L 21.5 51.6 L 29.2 55 Z" fill="#26221E"/><path d="M 29.4 56 L 22.5 57.8 L 29.6 57.6 Z" fill="#3A3430"/><path d="M 29.4 55 L 24 55.6 L 29.4 56.2 Z" fill="#E8A090"/></g>
        : <path d="M 29.6 52.6 L 21.6 54.6 L 29.6 56.8 Z" fill="#26221E"/>}
    </g>
  )
}

function Legs() {
  return (
    <g stroke="#2B2620" strokeWidth="1.5" strokeLinecap="round" fill="none">
      <path d="M 58 89 L 56 98"/>
      <path d="M 66 89 L 66.5 98"/>
      <path d="M 53 98.4 L 58 98.4 M 63.5 98.4 L 69 98.4" stroke="#B8A548" strokeWidth="1.2"/>
    </g>
  )
}

function Twig({ full }) {
  if (!full) return <path d="M 40 100 C 56 99 72 99 88 100" stroke="#6B4E36" strokeWidth="3" fill="none" strokeLinecap="round"/>
  return (
    <g>
      <path d="M -2 104 C 24 100 50 99.4 74 99.6 C 92 99.8 106 97 122 92" stroke="url(#rckTwig)" strokeWidth="4.4" fill="none" strokeLinecap="round"/>
      <path d="M 92 99 C 98 105 104 110 108 118" stroke="#6B4E36" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      <path d="M 16 102 C 12 94 10 88 12 80" stroke="#6B4E36" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* autumn leaves */}
      <path d="M 12 80 C 4 76 2 68 6 60 C 14 64 16 72 12 80 Z" fill="#E7B23A"/>
      <path d="M 12 80 C 8 72 6.5 66 6 60" stroke="#B98420" strokeWidth="0.7" fill="none"/>
      <path d="M 108 118 C 116 116 120 108 118 100 C 110 102 106 110 108 118 Z" fill="#D9702E"/>
      <path d="M 108 118 C 112 110 115 105 118 100" stroke="#A84E1E" strokeWidth="0.7" fill="none"/>
      <path d="M 30 101 C 26 108 28 114 34 118 C 37 112 36 106 30 101 Z" fill="#C9A23A"/>
    </g>
  )
}

function Perched({ lift = 0, blink, crown = 0, open = false, lean = 0, fan = 0 }) {
  return (
    <g transform={`rotate(${lean} 62 96)`}>
      <Tail fan={fan}/>
      {lift > 0 && <path d="M 64 62 C 72 50 84 46 94 46 C 90 52 84 58 76 62 Z" fill="#3A4020"/>}
      <Body/>
      <Wing lift={lift}/>
      <Head blink={blink} crown={crown} open={open}/>
    </g>
  )
}

function Hover({ up }) {
  // Hover-gleaning under a dangling leaf: body tilted up, wings a blur, tail fanned, toes tucked.
  const W = up
    ? <g>
        <path d="M 4 0 C 12 -16 24 -30 42 -38 C 42 -24 32 -10 16 2 Z" fill="#454C26" opacity="0.45"/>
        <path d="M -2 0 C 0 -18 10 -36 26 -48 C 31 -34 26 -16 12 2 Z" fill="#4B5228" opacity="0.85"/>
        <path d="M 1.5 -5 C 4 -14 8 -22 13 -29" stroke="#FAF8EC" strokeWidth="2.6" fill="none"/>
        <path d="M 5.5 -3.5 C 8 -12.5 12 -20.5 17 -27.5" stroke={DARK} strokeWidth="2.8" fill="none"/>
        <path d="M 12 -4 C 16 -16 20 -30 25 -44 M 15 -2 C 20 -14 24 -24 28 -36" stroke="#B9C462" strokeWidth="0.8" fill="none" opacity="0.9"/>
        <path d="M 30 -52 q 8 4 10 12 M 46 -40 q 4 6 2 12" stroke="#E8F0D0" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round"/>
      </g>
    : <g>
        <path d="M 2 4 C 16 8 30 16 40 30 C 26 30 12 22 4 12 Z" fill="#454C26" opacity="0.45"/>
        <path d="M -2 2 C 12 2 28 8 38 20 C 24 24 8 18 0 10 Z" fill="#4B5228" opacity="0.85"/>
        <path d="M 6 3.4 C 12 5 18 8 22 11" stroke="#FAF8EC" strokeWidth="2.4" fill="none"/>
        <path d="M 42 22 q 4 6 2 12 M 44 32 q 2 5 -1 9" stroke="#E8F0D0" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round"/>
      </g>
  return (
    <g>
      <g transform="translate(-12,4) rotate(26 62 74)">
        <Tail fan={-8}/>
        <Tail fan={4}/>
        <Body/>
        <path d="M 58 90 L 60 93.5 M 66 90 L 66 94" stroke="#2B2620" strokeWidth="1.4" strokeLinecap="round"/>
        <g transform="rotate(16 47 62)"><Head/></g>
      </g>
      <g transform="translate(55,67)">{W}</g>
    </g>
  )
}

export default function RubyCrownedKinglet({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'hover' ? 120 : 380); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 5

  let bird
  if (pose === 'hover') {
    bird = <g transform={`translate(0,${bob})`}><Hover up={!animated || frame % 2 === 0}/></g>
  } else if (pose === 'flick') {
    // The kinglet's signature nervous wing-flick: wings snap up and out, tail fans.
    const lift = animated ? [26, 14, 4, 0, 0, 4, 14, 26][frame] : 26
    bird = <Perched lift={lift} fan={-lift * 0.2} blink={blink}/>
  } else if (pose === 'excited') {
    // Agitated scold: ruby crown raised, bill open, leaning forward, wings half-flicked.
    bird = <g transform={`translate(0,${bob * 0.4})`}><Perched crown={1} open lift={animated ? (frame % 4 < 2 ? 12 : 4) : 10} lean={-6} fan={-3}/></g>
  } else {
    bird = <g transform={`translate(0,${bob * 0.5})`}><Perched blink={blink}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Ruby-crowned Kinglet">
      <defs>
        <linearGradient id="rckBody" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#7C8C3E"/><stop offset="55%" stopColor="#A9AE6A"/><stop offset="100%" stopColor="#DAD6AA"/>
        </linearGradient>
        <radialGradient id="rckHead" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#8E9C58"/><stop offset="100%" stopColor="#6C7A36"/>
        </radialGradient>
        <linearGradient id="rckTwig" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5E4430"/><stop offset="100%" stopColor="#7A5A40"/>
        </linearGradient>
      </defs>
      {pose === 'hover'
        ? <g>
            {scene && <path d="M -2 13 C 20 10 40 14 70 8" stroke="url(#rckTwig)" strokeWidth="3.4" fill="none" strokeLinecap="round"/>}
            <path d="M 22 11.6 L 24 22" stroke="#6B4E36" strokeWidth="1.2"/>
            <g transform="translate(3,4)">
            <path d="M 21 18 C 13 21 11 30 14 37 C 22 34 25 26 21 18 Z" fill="#E7B23A"/>
            <path d="M 21 18 C 18 25 16 31 14 37" stroke="#B98420" strokeWidth="0.7" fill="none"/>
            <ellipse cx="17.5" cy="33.5" rx="1.8" ry="1" fill="#5A8A2A"/>
            </g>
            {scene && <g><path d="M 58 9 L 60 16" stroke="#6B4E36" strokeWidth="1.2"/><path d="M 60 16 C 54 20 54 28 58 34 C 64 30 65 22 60 16 Z" fill="#D9702E"/></g>}
          </g>
        : <Twig full={scene}/>}
      {bird}
      {pose !== 'hover' && <Legs/>}
    </svg>
  )
}
