// Brown Creeper — "accurate first, cute second, in habitat" (see WoodDuck.jsx for conventions).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'brown_creeper', poses: ['cling', 'hitch', 'probe', 'spiral-peek', 'flutter'] }

// Field marks: STREAKY BROWN BACK spotted buff-white like bark; CLEAN WHITE UNDERPARTS
// (throat to belly); THIN DECURVED BILL; buff-white eyebrow; LONG STIFF TAIL with spiky
// pointed tips PROPPED ON THE BARK; rusty rump; buff band across the wing (wide when the
// wings open in 'flutter'); pale legs with long curved claws. Always climbs UP, head-up,
// body pressed to the trunk.

const BROWN = '#7A5636'

function Head({ open = false }) {
  const dots = [[53, 28.4], [56.6, 30], [50, 27.4], [55, 26.4], [58.4, 33.4], [52.6, 30.8]]
  return (
    <g>
      <circle cx="50" cy="36" r="10.4" fill="url(#bcrHead)"/>
      {dots.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="0.9" ry="0.6" fill="#EADBB8" opacity="0.9"/>)}
      {/* white throat and face */}
      <path d="M 40.3 38.4 C 41 44.6 46 48.4 52 48.2 C 55 48 57.6 46.8 59.4 45 C 58 42.6 55 41.4 51 41.4 C 47 41.4 43.6 40.4 40.3 38.4 Z" fill="#F7F4EE"/>
      {/* dark eye-line + pale eyebrow */}
      <path d="M 49.6 37.6 C 53 38.4 56.4 39 59.6 38.6" stroke="#4E3522" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 41.2 33.4 C 45 30.8 51.4 30.6 59.2 33.2" stroke="#F1E6CE" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      {/* big dark eye with catch-light */}
      <circle cx="46.2" cy="36.4" r="3.3" fill="#1A120C"/>
      <circle cx="46.2" cy="36.4" r="2.5" fill="#2E1E14"/>
      <circle cx="46.2" cy="36.4" r="1.5" fill="#0A0A0A"/>
      <circle cx="45" cy="35.2" r="1.05" fill="#FFF"/>
      {/* thin decurved bill: dark above, paler below */}
      <path d="M 41 35.4 C 36 33 30.6 32.6 26.6 35.8 C 30.8 34.8 36 36.2 41 38.8 Z" fill="#3A2A1E"/>
      <path d="M 41 37.6 C 36 35.8 31 35.2 27.6 35.6 C 31 36 36 37.4 41 39 Z" fill="#B89A80"/>
      {open && <circle cx="24" cy="36.6" r="1.3" fill="#3A3226"/>}
    </g>
  )
}

function Body() {
  // back streaks: short buff-white teardrops on brown
  const streaks = [[55, 50], [58.6, 52], [56, 55.6], [59.6, 57.2], [57, 61], [54.2, 58.6], [60.4, 62.6], [56.6, 66], [53.4, 63.4]]
  return (
    <g>
      <path d="M 42 50 C 39 62 41 76 48 86 C 52 91 60 92 63 86 C 67 74 66.4 58 61 48 C 57 42 46 43 42 50 Z" fill="url(#bcrBack)"/>
      {streaks.map(([x, y], i) => <path key={i} d={`M ${x} ${y} c 0.9 0.6 1.1 2.4 0 3.4 c -1.1 -1 -0.9 -2.8 0 -3.4 Z`} fill="#EBDDBE"/>)}
      {/* clean white underparts */}
      <path d="M 42 50 C 39 62 41 76 48 86 C 50 88.6 53 89.6 55 89 C 50 80 47.4 66 48.6 53 C 49.2 48.6 50.6 46.4 52.4 45.2 C 47.4 45 43.6 47 42 50 Z" fill="url(#bcrBelly)"/>
    </g>
  )
}

function Wing({ lift = 0 }) {
  return (
    <g transform={`rotate(${lift} 56 52)`}>
      <path d="M 53 51 C 60 49.6 65 57 66.2 67 C 67.2 77 65.4 86 61.4 93 C 57.4 88 54.4 78 53.4 68 C 52.6 62 52.2 56 53 51 Z" fill="#5E422A"/>
      {[[56, 55], [59.6, 56.6], [57.6, 59.6], [61.6, 61.2], [59, 64]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#F0E2C4"/>)}
      {/* buff wing band + dark bars */}
      <path d="M 53.6 69.4 C 57.2 67.6 62.2 67 66.4 68.2 L 66.2 72.2 C 62 71 57.4 71.4 54 73.4 Z" fill="#D9B272"/>
      <path d="M 55 77 C 58.6 75.6 62 75.4 65.6 76.2 M 56.6 82.6 C 59.4 81.6 62 81.6 64.6 82.2" stroke="#3E2A1A" strokeWidth="0.8" fill="none"/>
      <path d="M 58 86 C 59.6 88 60.6 90.4 61.4 93" stroke="#8A6A4A" strokeWidth="0.6" fill="none"/>
    </g>
  )
}

function Tail({ angle = 0 }) {
  // Stiff, spiky-tipped tail — the prop the creeper leans on.
  return (
    <g transform={`rotate(${angle} 58 88)`}>
      <path d="M 52.6 87 C 54.4 98 56.4 110 57.6 122.6 L 60.2 116.4 L 62.2 124.6 L 64 116.4 L 67 121.6 C 65.4 108 64.4 96 63.4 86 Z" fill="url(#bcrTail)"/>
      <path d="M 58.4 92 L 61.6 120 M 61.4 91 L 63.2 117" stroke="#4A3220" strokeWidth="0.6" fill="none"/>
      <path d="M 56 88.6 C 58.6 89.8 61.4 89.6 63.6 88 L 63.2 85 C 60.6 86.6 58 86.8 55.6 85.8 Z" fill="#A8683A"/>
    </g>
  )
}

function Feet({ tucked = false }) {
  const claw = (x, y, k) => (
    <path key={k} d={`M ${x} ${y} c -2.4 -1.6 -4.2 -1.4 -5.6 -0.2 M ${x} ${y} c -2.8 0 -4.6 1 -5.4 2.6 M ${x} ${y} c -1.6 1.4 -2.2 3 -1.8 4.8`} stroke="#A88A6E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  )
  return tucked
    ? <g>{claw(46.6, 74, 'a')}</g>
    : <g>{claw(45.8, 74.6, 'a')}{claw(48.6, 83.4, 'b')}</g>
}

function Bird({ headTurn = 0, tailAngle = 0, wingLift = 0, tucked = false, crack = false }) {
  return (
    <g transform="translate(54,112) scale(1.1) translate(-54,-112)">
      {crack && <g>
        <path d="M 24.4 38 C 21.6 44 21.4 54 23.8 64 C 26.4 56 27 46 25.6 38 Z" fill="#1E1611"/>
        <path d="M 26.2 40 C 27.4 48 27 56 24.6 63" stroke="#8C7C6C" strokeWidth="0.7" fill="none" opacity="0.7"/>
      </g>}
      <Tail angle={tailAngle}/>
      <Body/>
      <Wing lift={wingLift}/>
      <Feet tucked={tucked}/>
      <g transform={`rotate(${headTurn} 50 46)`}><Head/></g>
    </g>
  )
}

// Horizontal flying bird (head left), wings raised; used by 'flutter'.
function Flier({ flap = 0 }) {
  const streaks = [[52, 54], [57, 53], [62, 54], [55, 57.6], [66, 56.4], [60, 57.4]]
  return (
    <g>
      <g transform={`translate(54,54) rotate(${-118 + flap}) scale(1.1, 0.95)`}><FlightWing far/></g>
      <path d="M 73 57 C 84 58 96 60 108 61.4 L 102.6 63.4 L 110 65.6 L 102 66.4 L 106 69.4 C 94 68 82 66 72 64 Z" fill="url(#bcrTail)"/>
      <path d="M 70 57 C 73 58 76 60 76 63 L 71 64 Z" fill="#A8683A"/>
      <path d="M 40 58 C 46 51 62 50 72 55 C 78 58 78 63 72 66 C 62 70 48 69 41 64 Z" fill="url(#bcrBack)"/>
      {streaks.map(([x, y], i) => <path key={i} d={`M ${x} ${y} c 0.6 -0.9 2.4 -1.1 3.4 0 c -1 1.1 -2.8 0.9 -3.4 0 Z`} fill="#EBDDBE"/>)}
      <path d="M 41 62 C 48 67.6 60 69.4 70 66.6 C 73 65.8 75.4 64.6 76.4 62.8 C 64 64.6 52 64.4 41 60 Z" fill="url(#bcrBelly)"/>
      <path d="M 48 66.6 c -2 2 -3 4 -2.4 6 M 52 67.6 c -1.6 2 -2.2 4 -1.6 5.8" stroke="#A88A6E" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <g transform="translate(-12,18)"><Head/></g>
      <g transform={`translate(57,56) rotate(${-46 + flap}) scale(1.25, 1.05)`}><FlightWing/></g>
    </g>
  )
}

function Bark({ crack = false }) {
  return (
    <g>
      <path d="M 14 0 L 108 0 L 110 130 L 10 130 Z" fill="url(#bcrBark)"/>
      <path d="M 24 0 C 22 30 27 60 23 130 M 38 0 C 41 26 35 70 39 130 M 74 0 C 77 34 71 72 76 130 M 90 0 C 87 40 93 80 89 130 M 102 0 C 104 40 99 90 103 130"
        stroke="#3A2E26" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M 30 10 C 31 30 29 44 31 60 M 84 52 C 82 70 85 90 83 112 M 66 96 C 67 108 65 118 66 130" stroke="#8C7C6C" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <ellipse cx="88" cy="22" rx="6" ry="4" fill="#9DB088" opacity="0.7"/>
      <ellipse cx="92" cy="25" rx="3" ry="2.4" fill="#B6C6A0" opacity="0.7"/>
      <ellipse cx="26" cy="104" rx="5" ry="3.4" fill="#9DB088" opacity="0.6"/>
      {crack && <path d="M 22 48 C 24 52 22 56 25 61" stroke="#2A201A" strokeWidth="2" fill="none" strokeLinecap="round"/>}
    </g>
  )
}

// Foreground trunk the bird peeks around (always drawn for this pose — the pose needs it).
function PeekTrunk() {
  return (
    <g>
      <path d="M 60 0 C 54 30 54 96 60 130 L 120 130 L 120 0 Z" fill="url(#bcrTrunk)"/>
      <path d="M 70 0 C 66 40 67 90 71 130 M 86 0 C 84 44 88 88 85 130 M 102 0 C 104 40 100 90 103 130" stroke="#3A2E26" strokeWidth="2" fill="none" opacity="0.7"/>
      <ellipse cx="94" cy="96" rx="5" ry="3.4" fill="#9DB088" opacity="0.6"/>
    </g>
  )
}

// Open wing for the flutter pose, pointing right from (0,0), trailing edge toward +y.
function FlightWing({ far = false }) {
  return (
    <g>
      <path d="M 0 0 C 10 -4 22 -5 32 -2 C 31 2 29 5 27 8 C 25 8 23.6 9.6 22.6 11.4 C 20.4 11 18.8 12.4 18 14.2 C 15.6 13.8 13.6 15 12.6 16.6 C 8 16 3.6 14.4 0 12 Z" fill={far ? '#4A3420' : '#5E422A'}/>
      <path d="M 9 -2.6 C 12 4 13.6 10 13.8 15.6 L 17.4 14.2 C 17 8.4 15.4 2.8 13 -3.4 Z" fill="#D9B272"/>
      <path d="M 20 -3.8 L 22 11 M 25 -3.4 L 26.6 8.4 M 4 2 L 4.6 12" stroke="#3E2A1A" strokeWidth="0.7" fill="none"/>
      {[[4, -1], [8, 2], [3, 5]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.8" fill="#F0E2C4"/>)}
    </g>
  )
}

export default function BrownCreeper({ size = 120, animated = false, style = {}, pose = 'cling', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const nod = animated ? [0, 2, 4, 2, 0, -1, -2, -1][frame] : 0
  const hitchY = animated ? [0, -0.6, -1.2, -0.6, 0, 0, 0, 0][frame] : 0

  let bird, backdrop = null, front = null
  if (pose === 'hitch') {
    // Mid-hop up the trunk: feet tucked, tail lifted off the bark, wings slightly loose.
    backdrop = scene ? <Bark/> : null
    bird = (
      <g>
        <g transform="translate(0,-5) rotate(-5 56 80)"><Bird headTurn={-6 + nod} tailAngle={-6} wingLift={-4} tucked/></g>
        <path d="M 49 108 l -1 6 M 55 112 l -0.6 7 M 70 104 l 1 6" stroke="#F1E6CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.75"/>
      </g>
    )
  } else if (pose === 'probe') {
    // Head tipped down, bill slipped into a bark crevice after a hidden insect.
    backdrop = scene ? <Bark/> : null
    bird = <Bird headTurn={-34 + nod} crack={scene}/>
  } else if (pose === 'spiral-peek') {
    // Spiraling round the trunk: just the white front, eyebrow and curved bill peek out.
    backdrop = scene ? <g><rect x="0" y="0" width="120" height="130" fill="#2C3A2E" opacity="0.35"/><path d="M 8 0 L 22 0 L 20 130 L 6 130 Z M 34 0 L 40 0 L 41 130 L 34 130 Z" fill="#4A3E34" opacity="0.6"/></g> : null
    bird = <g transform="translate(-2,2) rotate(6 52 60)"><Bird headTurn={-8 + nod}/></g>
    front = <PeekTrunk/>
  } else if (pose === 'flutter') {
    // Done with one tree: flutters down to the base of the next, buff wing band showing.
    backdrop = scene ? <g><Bark/><rect x="0" y="0" width="120" height="130" fill="#203028" opacity="0.4"/></g> : null
    bird = <g transform="translate(0,6) rotate(14 60 60)"><Flier flap={nod * 2}/></g>
  } else {
    backdrop = scene ? <Bark/> : null
    bird = <Bird headTurn={nod * 0.5}/>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Brown Creeper">
      <defs>
        <linearGradient id="bcrHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A6440"/><stop offset="100%" stopColor="#6A4A2E"/>
        </linearGradient>
        <linearGradient id="bcrBack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E6A44"/><stop offset="100%" stopColor={BROWN}/>
        </linearGradient>
        <linearGradient id="bcrBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF9F4"/><stop offset="80%" stopColor="#F2ECE0"/><stop offset="100%" stopColor="#E6D8BE"/>
        </linearGradient>
        <linearGradient id="bcrTail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A6440"/><stop offset="100%" stopColor="#6A4A2E"/>
        </linearGradient>
        <linearGradient id="bcrBark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A322C"/><stop offset="30%" stopColor="#5E554C"/><stop offset="70%" stopColor="#5A5148"/><stop offset="100%" stopColor="#36302A"/>
        </linearGradient>
        <linearGradient id="bcrTrunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2E2722"/><stop offset="25%" stopColor="#5E554C"/><stop offset="100%" stopColor="#4A423A"/>
        </linearGradient>
      </defs>
      {backdrop}
      <g transform={`translate(0,${hitchY})`}>{bird}</g>
      {front}
    </svg>
  )
}
