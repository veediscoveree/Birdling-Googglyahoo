// Barn Swallow (adult male) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template conventions (meta, props, viewBox 0 0 120 130, "bas" ids).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'barn_swallow', poses: ['perch', 'chatter', 'swoop', 'bank', 'feed'] }

// Field marks: glossy steely-blue upperparts (crown, back, wings, tail); rich rust-orange
// forehead and throat; thin dark-blue breast-band edge below the throat; cinnamon-buff
// underparts; DEEPLY forked tail with long outer streamers and a row of white tail spots;
// long, pointed, swept-back wings reaching past the tail base at rest; tiny black bill with a
// wide gape; short legs.

const BLUE = 'url(#basBlue)'
const DARK = '#14204A'
const RUST = '#C4501E'
const BUFF = 'url(#basBuff)'

// Perched bird, facing left. Head group is separate so 'chatter' can tilt it.
function PerchedBody() {
  return (
    <g>
      {/* forked tail with streamers — behind everything */}
      <path d="M 70 78 L 82 83 C 93 91 105 103 117 118 C 105 110 96 103 88 99 C 92 106 96 114 99 125 C 89 114 81 104 76 94 C 73 89 71 84 70 78 Z" fill={DARK}/>
      {[[80, 89], [84.5, 92.5], [79, 94]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.5" ry="0.9" fill="#F4F4F0" transform={`rotate(40 ${x} ${y})`}/>)}
      {/* short legs gripping the wire */}
      <path d="M 52 80 L 53 87.5 M 58 81 L 58.5 88" stroke="#2A1E1A" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M 50.5 88.2 q 2.5 -1.6 4.8 0 M 56.4 88.6 q 2.4 -1.5 4.6 0" stroke="#2A1E1A" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* body: buff underparts, blue back */}
      <ellipse cx="55" cy="69" rx="25" ry="14" transform="rotate(30 55 69)" fill={BUFF}/>
      <path d="M 34 52 C 44 46 58 48 68 58 C 74 64 78 72 80 80 C 70 74 58 66 46 62 C 40 60 36 57 34 52 Z" fill={BLUE}/>
      {/* long pointed wing, tip past the tail base */}
      <path d="M 44 58 C 56 53 70 60 82 72 C 91 81 99 91 105 101 C 95 95 84 88 74 83 C 62 77 52 70 44 63 Z" fill="url(#basWing)"/>
      <path d="M 60 66 C 72 72 86 84 100 97 M 66 72 C 77 78 88 87 97 95 M 52 60 C 60 61 68 64 74 70" stroke="#3C5AA8" strokeWidth="0.7" fill="none" opacity="0.8"/>
    </g>
  )
}

function Head({ open = 0, blink = false }) {
  // centred on (38,49); bill points left
  return (
    <g>
      <circle cx="38" cy="49" r="12.5" fill={BLUE}/>
      <path d="M 31 40 C 37 36.5 45 37 49 41" stroke="#6E8AD8" strokeWidth="1.2" fill="none" opacity="0.55" strokeLinecap="round"/>
      {/* rust throat + chin, then the thin dark breast-band edge */}
      <path d="M 27.5 52.2 C 26.5 58 29 63.5 35.5 65.5 C 40.5 67 45 65 47 62 C 43 61.5 39 59.5 36.5 56.5 C 33 55.8 30 54.5 27.5 52.2 Z" fill={RUST}/>
      <path d="M 30.5 63.5 C 35 67.5 42 67.8 47.5 62.5" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* rust forehead */}
      <path d="M 26 48.5 C 26 44 28.5 41 32.5 40.5 C 32 43.5 30.5 46.5 28.5 49.5 Z" fill={RUST}/>
      {/* tiny bill; when open shows the pale-yellow gape */}
      <g transform={`rotate(${-open} 27 50.5)`}><path d="M 27.5 48.4 L 20 50.6 L 27.5 51.2 Z" fill="#111"/></g>
      {open > 0 && <path d={`M 28 50.4 L ${27 - open * 0.45} ${50.4 - open * 0.12} L ${27 - open * 0.42} ${52.6 + open * 0.1} Z`} fill="#F4C24A"/>}
      <g transform={`rotate(${open * 0.8} 27 51.5)`}><path d="M 27.5 51 L 21 51.6 L 27.5 53.2 Z" fill="#1A1A1A"/></g>
      {/* big bright eye */}
      {blink
        ? <path d="M 33.5 47.5 q 3.2 1.6 6.4 0" stroke="#0A0A14" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="36.6" cy="47.2" r="3.7" fill="#0A0A14" stroke="#5A6EA8" strokeWidth="0.6"/>
            <circle cx="35.4" cy="46" r="1.25" fill="#FFF"/>
            <circle cx="37.7" cy="48.4" r="0.5" fill="#FFF" opacity="0.7"/>
          </g>}
    </g>
  )
}

// Flying bird seen side-on, facing left, wings swept back.
function FlyingSide({ flex = 0, open = 0, blink }) {
  return (
    <g>
      {/* far wing, swept down-back */}
      <path d={`M 50 73 C 60 80 76 85 ${100 + flex} ${88 - flex * 0.5} C 86 82 74 78 64 73 Z`} fill="#101A3C"/>
      {/* spread forked tail with the white spot row */}
      <path d="M 68 68 L 80 66 C 92 62 104 58 117 55 C 106 61 98 66 92 72 C 99 77 108 83 116 90 C 103 86 92 82 80 78 L 68 76 Z" fill={DARK}/>
      {[[81, 69], [84, 72], [81, 75]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.6" ry="0.9" fill="#F4F4F0"/>)}
      {/* body */}
      <path d="M 28 70 C 32 60 50 59 64 63 C 72 65 78 68 82 72 C 74 77 62 81 50 81 C 38 81 30 78 28 70 Z" fill={BUFF}/>
      <path d="M 30 64 C 44 57 64 59 82 72 C 70 69.5 58 69 48 69.5 C 40 70 34 68 30 64 Z" fill={BLUE}/>
      {/* near wing, long sickle swept up and back */}
      <path d={`M 44 68 C 54 58 70 44 ${98 + flex} ${34 + flex} C 90 42 80 52 70 62 C 64 68 56 72 48 72 Z`} fill="url(#basWing)"/>
      <path d={`M 56 64 C 66 56 78 46 ${92 + flex} ${39 + flex}`} stroke="#3C5AA8" strokeWidth="0.8" fill="none" opacity="0.8"/>
      <g transform="translate(-6,19)"><Head open={open} blink={blink}/></g>
    </g>
  )
}

// Seen from below while banking: shows the full fork, white tail-spot band and buff belly.
function Banking({ flex = 0 }) {
  return (
    <g transform="rotate(-14 60 64)">
      {/* tail: deep fork, long streamers, white spots in a band */}
      <path d="M 54 80 L 66 80 C 70 92 76 106 84 124 C 77 114 70 104 64 98 L 60 98 C 54 104 47 114 40 124 C 46 106 50 92 54 80 Z" fill={DARK}/>
      {[[55.5, 88], [60, 89], [64.5, 88]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.5" ry="1.1" fill="#F6F6F2"/>)}
      {/* wings: long sickles, buffy coverts, dusky flight feathers */}
      <path d={`M 52 54 C 40 52 22 56 ${4 - flex} ${72 + flex} C 22 66 38 64 54 64 Z`} fill="#26346A"/>
      <path d={`M 68 54 C 80 50 98 50 ${116 + flex} ${58 - flex} C 98 62 82 64 66 64 Z`} fill="#26346A"/>
      <path d="M 52 55.5 C 44 55 36 57 30 60 C 38 60 46 61 54 62 Z M 68 55.5 C 76 54 84 54 90 55.5 C 84 57.5 76 60 66 62 Z" fill="#D8B898" opacity="0.85"/>
      {/* body from below */}
      <path d="M 50 58 C 48 66 52 78 56 82 L 64 82 C 68 78 72 66 70 58 Z" fill={BUFF}/>
      <path d="M 50 54 C 52 46 68 46 70 54 C 68 60 52 60 50 54 Z" fill={RUST}/>
      <path d="M 50.5 56 C 54 61 66 61 69.5 56" stroke={DARK} strokeWidth="2" fill="none"/>
      {/* head from below: rust chin/throat facing us, eyes at the sides, bill pointing ahead */}
      <circle cx="60" cy="44" r="10.5" fill={BLUE}/>
      <path d="M 52 46 C 51 39 55 35.5 60 35.5 C 65 35.5 69 39 68 46 C 67 52 63 55 60 55 C 57 55 53 52 52 46 Z" fill={RUST}/>
      <path d="M 57.6 36 L 60 30 L 62.4 36 Z" fill="#111"/>
      <circle cx="50.8" cy="40.5" r="2.7" fill="#0A0A14" stroke="#5A6EA8" strokeWidth="0.5"/>
      <circle cx="69.2" cy="40.5" r="2.7" fill="#0A0A14" stroke="#5A6EA8" strokeWidth="0.5"/>
      <circle cx="50.2" cy="39.6" r="0.9" fill="#FFF"/><circle cx="68.6" cy="39.6" r="0.9" fill="#FFF"/>
    </g>
  )
}

function Wire() {
  return (
    <g>
      <path d="M -2 84 Q 60 93 122 84" stroke="#2C2824" strokeWidth="1.6" fill="none"/>
      <path d="M -2 84 Q 60 93 122 84" stroke="#8A8278" strokeWidth="0.5" fill="none" opacity="0.6" transform="translate(0,-0.6)"/>
    </g>
  )
}

function Field() {
  return (
    <g>
      <path d="M 0 112 Q 30 108 60 111 T 120 110 L 120 130 L 0 130 Z" fill="url(#basField)"/>
      {[6, 14, 25, 38, 52, 70, 84, 97, 108, 116].map((x, i) => <path key={i} d={`M ${x} 113 q ${i % 2 ? 1.5 : -1.5} -4 ${i % 2 ? 0.5 : 2} -${6 + (i % 3) * 2}`} stroke="#8FB860" strokeWidth="1" fill="none" strokeLinecap="round"/>)}
    </g>
  )
}

function Pond() {
  return (
    <g>
      <path d="M 0 112 Q 15 110 30 112 T 60 112 T 90 112 T 120 112 L 120 130 L 0 130 Z" fill="url(#basWater)"/>
      <path d="M 14 118 q 7 -2 14 0 M 60 121 q 9 -2 18 0 M 96 117 q 6 -1.5 12 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
    </g>
  )
}

export default function BarnSwallow({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 380); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.4, -0.7, -0.4, 0, 0.3, 0.5, 0.3][frame] : 0
  const flex = animated ? [0, 1.2, 2.2, 1.2, 0, -1, -1.8, -1][frame] : 0
  const blink = animated && frame === 5
  const talk = animated ? [14, 6, 14, 4, 12, 4, 14, 8][frame] : 14

  let bird, ground = null
  if (pose === 'chatter') {
    bird = <g><PerchedBody/><g transform="rotate(-16 44 60)"><Head open={talk} blink={blink}/></g>
      <path d="M 14 34 q -3 3 0 6 M 10 31 q -5 6 0 12" stroke="#E8E2C8" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.8"/></g>
    ground = scene ? <Wire/> : <path d="M 40 87.6 Q 56 89.4 72 87.6" stroke="#2C2824" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  } else if (pose === 'swoop') {
    bird = <g transform="translate(0,20) rotate(5 60 70)"><FlyingSide flex={flex} blink={blink}/></g>
    ground = scene ? <g><Pond/><path d="M 16 113 q 5 -2.5 10 0 q 5 2.5 10 0" stroke="#E0F4FC" strokeWidth="1.2" fill="none"/></g>
      : <path d="M 100 92 L 118 90 M 104 98 L 118 97" stroke="#CFE4EE" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
  } else if (pose === 'bank') {
    bird = <Banking flex={flex}/>
    ground = scene ? <Field/> : null
  } else if (pose === 'feed') {
    bird = <g transform="translate(4,-4) rotate(-12 60 70)"><FlyingSide flex={flex} open={talk + 8} blink={false}/></g>
    ground = <g>{scene && <Field/>}<g transform={`translate(${animated ? flex * 0.6 : 0},0)`}><ellipse cx="7.4" cy="62.5" rx="2.2" ry="1.4" fill="#ECF6FA" opacity="0.6" transform="rotate(-30 7.4 62.5)"/><ellipse cx="11" cy="62.5" rx="2.2" ry="1.4" fill="#ECF6FA" opacity="0.6" transform="rotate(30 11 62.5)"/><ellipse cx="9.2" cy="64.4" rx="1.9" ry="1.3" fill="#1E1E18"/></g></g>
  } else {
    bird = <g><PerchedBody/><Head blink={blink}/></g>
    ground = scene ? <Wire/> : <path d="M 40 87.6 Q 56 89.4 72 87.6" stroke="#2C2824" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Barn Swallow">
      <defs>
        <linearGradient id="basBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3459B8"/><stop offset="60%" stopColor="#1F3478"/><stop offset="100%" stopColor="#152452"/>
        </linearGradient>
        <linearGradient id="basWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A4598"/><stop offset="100%" stopColor="#101A40"/>
        </linearGradient>
        <linearGradient id="basBuff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E09A5E"/><stop offset="100%" stopColor="#EFC896"/>
        </linearGradient>
        <linearGradient id="basField" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E9A48"/><stop offset="100%" stopColor="#3E6430"/>
        </linearGradient>
        <linearGradient id="basWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {ground}
      <g transform={`translate(0,${bob})`}>{bird}</g>
    </svg>
  )
}
