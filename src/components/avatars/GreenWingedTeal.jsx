// Green-winged Teal (alternate-plumaged drake, American race) — "accurate first, cute second,
// in habitat". Follows the WoodDuck.jsx template conventions (meta, props, viewBox 0 0 120 130,
// "gwt" ids). Drawn a touch smaller than the other ducks: it is the tiniest dabbler.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'green_winged_teal', poses: ['swim', 'mudflat'] }

// Field marks: tiny, compact duck with a round, large-looking head; rich CHESTNUT head with a
// glossy GREEN eye-patch swooping back to the nape, outlined by a thin BUFF line; short dark
// bill; pinkish-buff breast with round black spots; bold VERTICAL WHITE SHOULDER BAR (the
// American-race mark); finely vermiculated GRAY flanks; thin black scapular line; creamy
// BUFFY-YELLOW UNDERTAIL TRIANGLE edged black; bright GREEN speculum with a cinnamon-buff
// front bar and white trailing edge; gray legs.

const SMALL = 'translate(68 100) scale(0.88) translate(-68 -100)'

function Head({ sheen = 0.4, blink = false }) {
  return (
    <g transform="translate(40 55) scale(1.12) translate(-40 -55)">
      {/* short chestnut neck tying the head into the breast and back */}
      <path d="M 33.5 64 C 36.5 68.5 40 71.6 45 72.6 C 50 73.4 55 72.4 59 70.4 C 58.6 66 58 62 57 58 Z" fill="url(#gwtHead)"/>
      {/* round chestnut head with a little nape tuft */}
      <path d="M 25 57 C 24 46 32 40 41 40.5 C 50 41 55.5 46.5 56.5 53 C 58.5 55 59.5 58 58.6 61 C 56 62 54.6 63 53.6 64.5 C 51 67.6 47 69 43 69 C 34 69.5 25.5 65 25 57 Z" fill="url(#gwtHead)"/>
      {/* green swoosh from the eye to the nape, outlined in thin buff */}
      <path d="M 31.6 52.6 C 37 49.8 46 49.6 52.4 51.8 C 55.6 53 57.8 55.6 58.6 59.2 C 54.6 60.6 49.6 61 45 60 C 40 59 35.6 57.6 32 56.6 C 30.8 55.4 30.8 53.6 31.6 52.6 Z" fill="url(#gwtGreen)"/>
      <path d="M 37 52 C 42 50.6 48 50.8 52 52.4" stroke="#7ADDA0" strokeWidth="1.2" fill="none" opacity={sheen} strokeLinecap="round"/>
      <path d="M 27 58.6 C 33 59.2 39.5 60.6 45.5 61.6 C 50.5 62.3 55 61.6 58.6 59.6" stroke="#EAD69C" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M 31 52.2 C 37 49 46 48.6 52.6 50.8" stroke="#EAD69C" strokeWidth="0.6" fill="none" opacity="0.7" strokeLinecap="round"/>
      {/* big bright eye sitting in the green */}
      <circle cx="35.6" cy="54.6" r="3.5" fill="#3A1E10"/>
      <circle cx="35.6" cy="54.6" r="2.5" fill="#0C0604"/>
      <circle cx="34.3" cy="53.3" r="1.15" fill="#FFF"/>
      <circle cx="36.7" cy="55.8" r="0.45" fill="#FFF" opacity="0.8"/>
      {blink && <path d="M 32 54.6 C 32.8 51 38.4 51 39.2 54.6 C 38 56.2 33.2 56.2 32 54.6 Z" fill="#1E6A40"/>}
      {/* short, neat dark bill */}
      <path d="M 25.6 53.2 C 21 53.6 16.6 55 13 57.2 C 11.6 58.3 12 60.1 14 60.4 C 18 60.9 22 60.5 26 60 Z" fill="#26282A"/>
      <path d="M 25.6 58.4 C 21.6 58.9 17.4 59.3 13.4 59.2" stroke="#4A4C50" strokeWidth="0.6" fill="none"/>
      <ellipse cx="20.6" cy="55.6" rx="1" ry="0.5" fill="#0A0A0A"/>
    </g>
  )
}

function Vermiculation({ x0, x1, y0, y1 }) {
  const out = []
  for (let y = y0; y <= y1; y += 1.7) out.push(<path key={y} d={`M ${x0} ${y} q 1.5 -0.6 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0 t 3 0`} stroke="#6E6E6A" strokeWidth="0.35" fill="none" opacity="0.55"/>)
  return <g clipPath="url(#gwtFlankClip)">{out}</g>
}

function Body({ belly = false }) {
  const spots = [[42, 80], [45.5, 76.5], [44, 85], [47.5, 81], [41, 90], [45, 90], [48, 86.5], [43.5, 95], [47.5, 95]]
  return (
    <g>
      {/* short dark-gray tail */}
      <path d="M 96 76 C 103 73.6 109 74 113.5 76.8 C 109.5 80.6 103 82 96 81.6 Z" fill="#4A4A48"/>
      {belly && <path d="M 44 96 C 54 105 80 105 92 96 Z" fill="#EEE6D6"/>}
      {/* gray vermiculated flanks = base body */}
      <path d="M 38 84 C 38 74 48 69.5 62 69 C 78 68.5 92 72 100 78 C 100 88 93 97 80 100.5 L 52 100.5 C 43 98.5 38 92 38 84 Z" fill="url(#gwtFlank)"/>
      <Vermiculation x0={52} x1={98} y0={78} y1={100}/>
      {/* black-bordered buffy-yellow undertail triangle */}
      <path d="M 84.5 100 C 94 95.4 99.6 87.6 100.4 78.6 L 104.2 79.2 C 103.6 89 96.6 97 86.6 100.6 Z" fill="#141414"/>
      <path d="M 81 98.6 L 99.4 82.4 C 98.6 89.4 93.6 95.6 85.6 99.4 Z" fill="#F2D878" stroke="#141414" strokeWidth="0.9" strokeLinejoin="round"/>
      {/* speckled pinkish-buff breast */}
      <path d="M 38 84 C 38 76 44 71.6 52.6 70.6 C 50.4 78 50.4 90 54 100.5 L 50 100.5 C 42 98.5 38 92 38 84 Z" fill="url(#gwtBreast)"/>
      {spots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.75" fill="#2A1E18" opacity="0.85"/>)}
      {/* THE field mark: bold vertical white shoulder bar */}
      <path d="M 52.6 70.6 C 50.4 78 50.4 90 54 100.4 L 58.4 100.4 C 55 90 55 78 57.2 71.4 Z" fill="#FFF"/>
      <path d="M 57.2 71.4 C 55 78 55 90 58.4 100.4" stroke="#1A1A1A" strokeWidth="0.9" fill="none"/>
      <path d="M 52.6 70.6 C 50.4 78 50.4 90 54 100.4" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.6"/>
      {/* gray back, black scapular line, a peek of green speculum */}
      <path d="M 50 72 C 62 67 82 68 100.4 77.6 C 92 80 80 79.6 68 78.6 C 60 78 54 76 50 72 Z" fill="url(#gwtBack)"/>
      <path d="M 60 77.4 C 72 76.8 85 77.6 97.4 79.8" stroke="#1A1A1A" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M 85 79.8 L 96.6 80.8 L 95.6 83.4 L 84 82.4 Z" fill="url(#gwtSpec)"/>
      <path d="M 85 79.8 L 84 82.4" stroke="#D8A060" strokeWidth="1"/>
    </g>
  )
}

// Upper surface of a raised wing: gray-brown coverts, cinnamon-buff bar, emerald speculum with
// a white trailing edge, dusky primaries. Shoulder near (58,76).
function Wing({ far = false }) {
  return (
    <g opacity={far ? 0.85 : 1}>
      <path d="M 56 76 C 55 64 58 52 64 44 C 68 34 74 22 84 10 C 86 12 87.5 14 88 17 C 91 17 93 19 93.5 22 C 96 22.5 97.5 25 97 28 C 93 34 90 40 88 46 C 86 56 84 66 82 76 Z" fill={far ? '#4A4844' : '#5E5A54'}/>
      <path d="M 88 17 L 76 34 M 93.5 22 L 79 40 M 97 28 L 83 44" stroke="#3A3834" strokeWidth="0.8" fill="none"/>
      <path d="M 56 76 C 55 64 58 52 64 44 C 70 46 75 47 79.5 47 C 75 56 71.5 66 69.5 76 Z" fill={far ? '#6E6A62' : '#8A847A'}/>
      <path d="M 79.5 47 C 75 56 71.5 66 69.5 76 L 72.8 76 C 74.8 66 78.4 56 82.8 46.8 Z" fill="#D8A060"/>
      <path d="M 82.8 46.8 C 78.4 56 74.8 66 72.8 76 L 80 76 C 82 66 84.4 56 86.6 46.4 Z" fill="url(#gwtSpec)"/>
      <path d="M 86.6 46.4 C 84.4 56 82 66 80 76 L 82 76 C 84 66 86 56 88 46 Z" fill="#FFF"/>
    </g>
  )
}

function Water({ bob = 0 }) {
  return (
    <g>
      <path d={`M 0 ${99 + bob * 0.3} Q 15 ${97 + bob * 0.3} 30 99 T 60 99 T 90 99 T 120 99 L 120 130 L 0 130 Z`} fill="url(#gwtWater)"/>
      <path d="M 106 99 C 106 93 107 89 109 86 M 110 99 C 110 94 112 91 115 89 M 114 99 C 114 95 116 93 119 92" stroke="#A8A060" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M 30 103 q 8 -2 16 0 M 66 106 q 10 -2 20 0 M 12 110 q 6 -1.5 12 0 M 90 113 q 7 -2 14 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
    </g>
  )
}

// Shallow water lapping a muddy bank — the teal's favorite feeding spot.
function Mudflat() {
  return (
    <g>
      <path d="M 0 100 Q 20 98 40 100 L 40 130 L 0 130 Z" fill="url(#gwtWater)"/>
      <path d="M 18 104 C 30 104 44 106 62 105 C 82 104 102 103 120 104 L 120 130 L 0 130 L 0 108 C 6 106 12 104 18 104 Z" fill="url(#gwtMud)"/>
      <path d="M 26 110 q 8 -1.5 16 0 M 70 114 q 10 -1.5 20 0 M 96 108 q 6 -1 12 0" stroke="#C8B08C" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M 6 102 q 6 -1.5 12 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M 104 104 C 104 97 105 93 107 90 M 108 104 C 108 98 110 95 113 93 M 112 104 C 112 99 114 97 117 96" stroke="#A8A060" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.85"/>
    </g>
  )
}

function Legs({ dangle = false }) {
  if (dangle) {
    return (
      <g stroke="#6E747A" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M 66 98 L 63 108 M 74 98 L 73 109"/>
        <path d="M 63 108 l -3.6 2.6 M 63 108 l -1 3.6 M 73 109 l -3.6 2.6 M 73 109 l -1 3.6" strokeWidth="1.2"/>
      </g>
    )
  }
  return (
    <g stroke="#6E747A" strokeLinecap="round" fill="none">
      <path d="M 64 99 L 63 112 M 74 99 L 75 112" strokeWidth="1.9"/>
      <path d="M 63 112 l -5 0.8 M 63 112 l -2.4 2 M 63 112 l 2.6 0.6 M 75 112 l -5 0.8 M 75 112 l -2.4 2 M 75 112 l 2.6 0.6" strokeWidth="1.4"/>
    </g>
  )
}

export default function GreenWingedTeal({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 420); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.7, -1.2, -0.7, 0, 0.5, 0.9, 0.5][frame] : 0
  const sheen = animated ? [0.35, 0.5, 0.7, 0.5, 0.35, 0.25, 0.2, 0.25][frame] : 0.45
  const blink = animated && frame === 6
  const flap = animated ? [0, -2, -4, -2, 0, 2, 3, 2][frame] : 0

  let bird, ground, front = null
  const wake = <path d="M 30 101 C 52 104 88 104 104 100" stroke="#A8D8EC" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
  if (pose === 'mudflat') {
    // Standing on a mudbank, ready to pick seeds off the mud: gray legs and pale belly show.
    bird = <g transform="translate(0,-6)"><Legs/><Body belly/><Head sheen={sheen} blink={blink}/></g>
    ground = scene ? <Mudflat/> : <ellipse cx="66" cy="106.5" rx="20" ry="2.2" fill="#4A3C2C" opacity="0.4"/>
  } else if (pose === 'stretch') {
    // Wing-stretch on the water, flashing the emerald speculum it is named for.
    bird = (
      <g>
        <g transform={`rotate(${4 + flap * 0.5} 58 76)`}><Wing/></g>
        <Body/>
        <g transform="rotate(6 40 66)"><Head sheen={sheen} blink={blink}/></g>
      </g>
    )
    ground = scene ? <Water bob={bob}/> : wake
  } else if (pose === 'springup') {
    // Teal leap almost straight up off the water — both wings high, feet dangling.
    bird = (
      <g transform="translate(2,-10) rotate(15 72 92)">
        <g transform={`translate(9,-3) rotate(${-14 + flap} 58 76)`}><Wing far/></g>
        <Legs dangle/>
        <Body belly/>
        <Head sheen={sheen} blink={blink}/>
        <g transform={`rotate(${2 + flap} 58 76)`}><Wing/></g>
      </g>
    )
    ground = scene ? <Water bob={bob}/> : null
    front = scene && <path d="M 56 101 q -3 -5 -1 -9 M 66 101 q 1 -5 4 -8 M 78 101 q 4 -4 8 -5 M 48 99 l -3 -2 M 86 99 l 3 -2" stroke="#D8F0FA" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.9"/>
  } else {
    bird = <g><Body/><Head sheen={sheen} blink={blink}/></g>
    ground = scene ? <Water bob={bob}/> : wake
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Green-winged Teal">
      <defs>
        <clipPath id="gwtFlankClip"><path d="M 54 72 C 66 69 86 70 100 78 C 100 88 93 97 80 100.5 L 54 100.5 Z"/></clipPath>
        <linearGradient id="gwtHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A4502A"/><stop offset="60%" stopColor="#8A3A1E"/><stop offset="100%" stopColor="#6A2A14"/>
        </linearGradient>
        <linearGradient id="gwtGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E8A52"/><stop offset="100%" stopColor="#0E5434"/>
        </linearGradient>
        <linearGradient id="gwtFlank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B4B4B0"/><stop offset="100%" stopColor="#929290"/>
        </linearGradient>
        <linearGradient id="gwtBack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E8E8A"/><stop offset="100%" stopColor="#6A6A66"/>
        </linearGradient>
        <linearGradient id="gwtBreast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0DCC0"/><stop offset="100%" stopColor="#E2C8A8"/>
        </linearGradient>
        <linearGradient id="gwtSpec" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14904E"/><stop offset="60%" stopColor="#2AB86A"/><stop offset="100%" stopColor="#0E6A3A"/>
        </linearGradient>
        <linearGradient id="gwtWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
        <linearGradient id="gwtMud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A6E4E"/><stop offset="100%" stopColor="#5A4430"/>
        </linearGradient>
      </defs>
      {pose === 'mudflat' && ground}
      <g transform={`translate(0,${pose === 'mudflat' ? 0 : bob}) ${SMALL}`}>{bird}</g>
      {pose !== 'mudflat' && ground}
      {front}
    </svg>
  )
}
