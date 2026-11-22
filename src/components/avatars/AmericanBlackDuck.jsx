// American Black Duck (adult drake) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template conventions (meta, props, viewBox 0 0 120 130, "abd" ids).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'american_black_duck', poses: ['swim', 'takeoff'] }

// Field marks: sooty blackish-brown body (with faint buff scallops) MUCH darker than the pale
// buffy-gray head and neck; dark crown and thin dark eye-line; olive-yellow bill with dark
// nail (drake); VIOLET-BLUE speculum bordered black with little/no white; bright orange legs
// and feet; brilliant WHITE underwing linings flashing in flight; dark tail (no white tail
// sides, no curled feathers — unlike the Mallard). Sexes alike, no eclipse change.

const BODY = 'url(#abdBody)'
const WING_DARK = '#21160F'

function Head({ blink, lift = 0 }) {
  const streaks = [[28, 61, 31, 64], [32, 62.5, 35, 66], [37, 61, 40, 65.5], [42, 60, 45, 64.5], [46, 59, 48.5, 63], [35, 58.5, 37.5, 61], [41, 57.5, 43.5, 60.5], [47, 56.5, 49, 59.5]]
  return (
    <g>
      {/* neck: pale buffy-gray fading into the sooty breast (lift stretches it for 'alert') */}
      <path d={`M 29 ${63 - lift} C 33 ${69 - lift * 0.5} 37 76 38 84 L 58 80 C 54 76 51.5 ${71 - lift * 0.5} 51.5 ${62 - lift} Z`} fill="url(#abdNeck)"/>
      <g transform={`translate(0,${-lift}) translate(39 56) scale(1.1) translate(-39 -56)`}>
        <path d="M 23 58 C 22 47 30 41 39 41.5 C 48 42 54 49 53.5 57 C 53 63.5 48.5 68.5 41 69.5 C 33 70.2 23.5 66 23 58 Z" fill="url(#abdHead)"/>
        {streaks.map(([x1, y1, x2, y2], i) => <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="#7A6A55" strokeWidth="0.5" opacity="0.35" strokeLinecap="round"/>)}
        {/* dark crown cap and thin eye-line */}
        <path d="M 24.6 52 C 27 45 33 41.5 39 41.5 C 47 42 53 47.5 53.7 55.5 C 47 50.5 37 49.6 24.6 52 Z" fill="#3B2C22"/>
        <path d="M 24.2 56.4 C 31 55 42 55.2 52 58.2" stroke="#3B2C22" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* big dark eye with catch-light */}
        <circle cx="33.5" cy="55.4" r="3.6" fill="#4A2E1A"/>
        <circle cx="33.5" cy="55.4" r="2.6" fill="#140A05"/>
        <circle cx="32.2" cy="54.1" r="1.2" fill="#FFF"/>
        <circle cx="34.6" cy="56.6" r="0.5" fill="#FFF" opacity="0.8"/>
        {blink && <path d="M 29.7 55.4 C 30.5 51.5 36.5 51.5 37.3 55.4 C 36 57 31 57 29.7 55.4 Z" fill="#3B2C22"/>}
        {/* olive-yellow Mallard-type bill with dark nail */}
        <path d="M 24.4 53.2 C 18.5 53.6 12 55.2 7 57.9 C 5.3 59.2 5.8 61.4 8.2 61.9 C 13.5 62.6 19 62.2 24.6 61.3 Z" fill="url(#abdBill)"/>
        <path d="M 9.2 56.6 C 7.2 57.5 5.7 58.6 5.9 60.3 C 6.2 61.5 7.5 61.9 9 61.9 C 8.2 60.2 8.3 58.3 9.2 56.6 Z" fill="#2A2618"/>
        <path d="M 24.3 59.6 C 19 60.2 13.5 60.7 8.3 60.5" stroke="#6E6A24" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <ellipse cx="18.6" cy="56.5" rx="1.3" ry="0.6" fill="#55521C" transform="rotate(-12 18.6 56.5)"/>
      </g>
    </g>
  )
}

function Scallops({ x0 = 48, x1 = 98, y0 = 82, y1 = 97 }) {
  const out = []
  for (let r = 0, y = y0; y <= y1; r++, y += 4.6) for (let x = x0 + (r % 2) * 3.2; x <= x1 - r * 3; x += 6.4) {
    out.push(<path key={`${r}-${x}`} d={`M ${x} ${y} q 2.4 2.2 4.8 0`} stroke="#9C8466" strokeWidth="0.75" fill="none" opacity="0.55" strokeLinecap="round"/>)
  }
  return <g>{out}</g>
}

function Body() {
  return (
    <g>
      {/* short, dark, pointed tail — no white edges */}
      <path d="M 97 76 C 105 73.5 112 74 117 77 C 112 81.5 104 83.5 96 83 Z" fill="#241911"/>
      <path d="M 36 85 C 36 74 48 68.5 64 68 C 81 67.5 96 71 104 78 C 104 88 96 97 82 100.5 L 50 100.5 C 41 98.5 36 92.5 36 85 Z" fill={BODY}/>
      <Scallops x0={44}/>
      {/* folded wing / tertials, even darker */}
      <path d="M 57 73 C 70 66.5 88 67.5 104.5 77 C 97 81 85 82.4 71 81.6 C 64 81 59.5 77.6 57 73 Z" fill={WING_DARK}/>
      <path d="M 66 74 C 76 71.5 88 72.4 99 77 M 72 78.6 C 81 77.4 90 77.8 98 79.4" stroke="#5A4634" strokeWidth="0.7" fill="none" opacity="0.8"/>
      {/* violet-blue speculum peeking out: black-bordered, essentially no white */}
      <path d="M 86.5 80 L 98.5 80.8 L 97.2 83.6 L 85.2 82.8 Z" fill="url(#abdSpec)"/>
      <path d="M 86.5 80 L 98.5 80.8 M 85.2 82.8 L 97.2 83.6" stroke="#0C0810" strokeWidth="0.8"/>
    </g>
  )
}

// Raised near wing seen from below (take-off): brilliant white linings along the leading
// half, smoky gray-brown flight feathers with darker tips.
function UnderWing() {
  return (
    <g>
      <path d="M 57 77 C 52 66 50 54 53 44 C 54 32 56 20 59 8 C 62 10 64 12 65 15 C 68 15 70 17 71 20.5 C 74 21 76 23 77 26.5 C 80 27.5 82 30 82.5 33.5 C 82 38 81 42 80 46 C 79 58 77 68 73 77 Z" fill="#978C80"/>
      <path d="M 59 8 C 62 10 64 12 65 15 C 68 15 70 17 71 20.5 C 74 21 76 23 77 26.5 C 80 27.5 82 30 82.5 33.5" stroke="#5E554C" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M 65 15 L 62 32 M 71 20.5 L 66 36 M 77 26.5 L 70 40 M 82.5 33.5 L 75 44 M 80 54 L 74 54 M 79 64 L 73 64" stroke="#756A5E" strokeWidth="0.7" fill="none"/>
      <path d="M 57 77 C 52 66 50 54 53 44 C 55 37.5 57.5 32.5 60.5 28 C 64 36 71 42 80 46 C 79 58 76.5 68 73 77 Z" fill="#FCFCFA"/>
      <path d="M 60.5 28 C 64 36 71 42 80 46" stroke="#D8D2C8" strokeWidth="0.9" fill="none"/>
      <path d="M 57 77 C 52 66 50 54 53 44 C 55 37.5 57.5 32.5 60.5 28" stroke="#5E554C" strokeWidth="0.9" fill="none" opacity="0.6"/>
    </g>
  )
}

// Far wing seen from above, behind the body: dark upperwing, violet-blue speculum framed black.
function UpperWing() {
  return (
    <g>
      <path d="M 63 75 C 66 60 74 44 90 26 C 93 25.5 95 27.5 96 30 C 99 29.5 101 31.5 101.5 34.5 C 103.5 35.5 104.5 37.5 104 40 C 97 50 90 62 84 75 Z" fill={WING_DARK}/>
      <path d="M 90 26 C 93 25.5 95 27.5 96 30 M 96 30 C 99 29.5 101 31.5 101.5 34.5" stroke="#4A3828" strokeWidth="0.8" fill="none"/>
      <path d="M 75 69 C 79 61 85 53 93 46 L 97.5 49.5 C 91 56 85 64 81 72 Z" fill="url(#abdSpec)"/>
      <path d="M 75 69 C 79 61 85 53 93 46 M 97.5 49.5 C 91 56 85 64 81 72" stroke="#0C0810" strokeWidth="1" fill="none"/>
    </g>
  )
}

function Water({ bob = 0 }) {
  return (
    <g>
      <path d={`M 0 ${99 + bob * 0.3} Q 15 ${97 + bob * 0.3} 30 99 T 60 99 T 90 99 T 120 99 L 120 130 L 0 130 Z`} fill="url(#abdWater)"/>
      {/* a few salt-marsh grass blades on the far bank */}
      <path d="M 104 99 C 104 92 106 88 108 85 M 108 99 C 108 93 110 90 113 88 M 112 99 C 112 94 114 92 117 91" stroke="#8C9A54" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M 30 103 q 8 -2 16 0 M 66 106 q 10 -2 20 0 M 12 110 q 6 -1.5 12 0 M 90 113 q 7 -2 14 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
    </g>
  )
}

// Orange feet paddling beneath the surface (only drawn with the water scene).
function SubFeet({ kick = 0 }) {
  return (
    <g opacity="0.5">
      <path d={`M 64 101 L ${62 - kick} 108`} stroke="#E8782A" strokeWidth="1.6" strokeLinecap="round"/>
      <path d={`M ${62 - kick} 108 l -4 1.5 l 2 -3.5 Z`} fill="#E8782A" stroke="#E8782A" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d={`M 72 101 L ${74 + kick} 107`} stroke="#E8782A" strokeWidth="1.6" strokeLinecap="round"/>
      <path d={`M ${74 + kick} 107 l -4 1.5 l 2 -3.5 Z`} fill="#E8782A" stroke="#E8782A" strokeWidth="1.2" strokeLinejoin="round"/>
    </g>
  )
}

export default function AmericanBlackDuck({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.8, -1.4, -0.8, 0, 0.6, 1, 0.6][frame] : 0
  const blink = animated && frame === 5
  const kick = animated ? [0, 1, 2, 1, 0, -1, -2, -1][frame] : 0
  const waterline = scene ? <Water bob={bob}/> : <path d="M 26 101 C 50 104 90 104 108 100" stroke="#A8D8EC" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>

  let bird, front = null
  if (pose === 'alert') {
    // Wary: neck stretched tall, head up, ready to spring off the water.
    bird = <g><Body/><g transform="rotate(-3 45 80)"><Head blink={blink} lift={11}/></g></g>
  } else if (pose === 'takeoff') {
    // Springing straight up off the water: near wing flashes the white underwing, far wing
    // shows the violet-blue speculum, orange legs trailing.
    bird = (
      <g transform="translate(-4,-3) rotate(14 70 92)">
        <UpperWing/>
        <path d="M 66 97 L 64 109 M 76 97 L 76 110" stroke="#E8782A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 64 109 l -4 3.6 l 3 0 l 1 3 l 3 -5 Z M 76 110 l -4 3.6 l 3 0 l 1 3 l 3 -5 Z" fill="#F08A32" stroke="#D86A1E" strokeWidth="0.6" strokeLinejoin="round"/>
        <Body/>
        <Head blink={blink}/>
        <UnderWing/>
      </g>
    )
    front = scene && <path d="M 58 103 q -5 -5 -4 -10 M 70 103 q 0 -6 3 -9 M 84 103 q 4 -5 9 -6 M 50 99 l -3 -2 M 92 99 l 3 -2" stroke="#D8F0FA" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.9"/>
  } else if (pose === 'dabble') {
    // Tipped up to feed: dark stern and paddling orange feet in the air.
    bird = (
      <g clipPath={scene ? undefined : 'url(#abdSurface)'}><g transform="translate(60,102) scale(1.2) rotate(-60) translate(-80,-86)">
        <path d="M 58 76 C 70 70 92 72 104 80 C 104 92 90 100 66 102 C 58 96 55 84 58 76 Z" fill={BODY}/>
        <Scallops x0={64} x1={100} y0={84} y1={96}/>
        <path d="M 62 73 C 74 68 92 69 106 78 C 98 81 86 80 74 79 C 68 78 64 77 62 76 Z" fill={WING_DARK}/>
        <path d="M 84 79.6 L 99 80.6 L 97.4 83.6 L 82.4 82.6 Z" fill="url(#abdSpec)"/>
        <path d="M 102 77 C 110 75 118 79 122 86 C 115 88 106 86 100 85 Z" fill="#241911"/>
        <path d={`M 94 92 l ${9 + kick} 4 l -3 4 Z M 89 96 l ${8 - kick} 5 l -4 3 Z`} fill="#F08A32" stroke="#D86A1E" strokeWidth="0.6" strokeLinejoin="round"/>
      </g></g>
    )
  } else {
    bird = <g><Body/><Head blink={blink}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Black Duck">
      <defs>
        <clipPath id="abdSurface"><rect x="0" y="0" width="120" height="101"/></clipPath>
        <linearGradient id="abdHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6CAB0"/><stop offset="100%" stopColor="#B4A68A"/>
        </linearGradient>
        <linearGradient id="abdNeck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B4A68A"/><stop offset="45%" stopColor="#9A8A70"/><stop offset="100%" stopColor="#3C2C20"/>
        </linearGradient>
        <linearGradient id="abdBody" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#47362A"/><stop offset="100%" stopColor="#2A1D15"/>
        </linearGradient>
        <linearGradient id="abdBill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D2CC52"/><stop offset="100%" stopColor="#A8A23A"/>
        </linearGradient>
        <linearGradient id="abdSpec" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3E2E9A"/><stop offset="55%" stopColor="#6A4ED0"/><stop offset="100%" stopColor="#3A3AA8"/>
        </linearGradient>
        <linearGradient id="abdWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <g transform={`translate(0,${bob})`}>{bird}</g>
      {waterline}
      {scene && (pose === 'swim' || pose === 'alert') && <SubFeet kick={kick}/>}
      {front}
      {pose === 'dabble' && <path d="M 38 101 q 10 -4 20 0 q 10 4 20 0" stroke="#D8F0FA" strokeWidth="1.4" fill="none" opacity="0.9"/>}
    </svg>
  )
}
