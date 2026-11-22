// Rock Pigeon — "accurate first, cute second, in habitat" (see WoodDuck.jsx for conventions).
// Introduced species; the classic city-sidewalk bird of NYC / northern NJ.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'rock_pigeon', poses: ['strut', 'takeoff'] }

// Field marks: blue-gray body with a darker slate head; iridescent green-and-purple neck;
// TWO BLACK WING BARS across the pale gray folded wing; darker gray primaries; WHITE RUMP
// (best seen in flight); gray tail with a broad black terminal band; red-orange eye; short dark
// bill with a white cere at its base; short pink-red legs; head-bobbing walk; whitish underwings.

function Head({ sheen }) {
  return (
    <g>
      {/* Neck + upper breast with green/purple iridescence */}
      <path d="M 29 50 C 30 58 33 66 39 73 C 44 79 52 82 59 80 C 61 72 59 63 53 55 C 50 49 46 43 42 40 Z" fill="url(#rpiNeck)"/>
      <path d="M 33 56 C 39 55 47 57 53 62 C 55 66 55 69 54 71 C 47 69 40 66 35 61 Z" fill="#46C08A" opacity={sheen} filter="url(#rpiSoft)"/>
      <path d="M 38 67 C 44 70 50 72 56 72 C 57 76 56 79 54 80 C 48 79 42 75 38 67 Z" fill="#B061C8" opacity={sheen * 0.9} filter="url(#rpiSoft)"/>
      {/* Head (drawn ~8% large for cuteness) */}
      <g transform="translate(39 42) scale(1.08) translate(-39 -42)">
      <path d="M 27 44 C 27 35 33 30 40 30 C 47 30 51 36 51 43 C 51 50 46 54 39 54 C 33 54 27 50 27 44 Z" fill="url(#rpiHead)"/>
      {/* Bill with white cere */}
      <path d="M 28.5 42.5 C 24.5 43 20.5 44.5 17.5 46.5 C 20.5 47.8 24.5 48 28.5 47.2 Z" fill="#2C2E36"/>
      <ellipse cx="27.2" cy="43" rx="2.4" ry="1.4" fill="#ECE7DD"/>
      {/* Red-orange eye with gray orbital ring */}
      <circle cx="35" cy="40.5" r="4.4" fill="#8E93A0"/>
      <circle cx="35" cy="40.5" r="3.6" fill="#F0702A"/>
      <circle cx="35" cy="40.5" r="3.6" fill="none" stroke="#B83A18" strokeWidth="0.7"/>
      <circle cx="35" cy="40.5" r="1.7" fill="#120606"/>
      <circle cx="33.8" cy="39.2" r="1.1" fill="#FFF"/>
      </g>
    </g>
  )
}

function Tail({ spread = false }) {
  return spread ? (
    <g>
      <path d="M 92 76 C 102 72 112 72 118 76 C 117 82 115 88 112 92 C 104 90 96 86 90 84 Z" fill="#7F8798"/>
      <path d="M 109 73.5 C 112 73.8 116 74.8 118 76 C 117 82 115 88 112 92 C 110 91.5 108 91 106 90.3 C 108.5 85 109.5 79 109 73.5 Z" fill="#1C1E24"/>
    </g>
  ) : (
    <g>
      <path d="M 92 77 C 100 79 108 82 115 86 C 114 89 112 91.5 109.5 92.5 C 102 90.5 95 88 89 85 Z" fill="#7F8798"/>
      <path d="M 107 82.6 C 110 83.6 113 84.8 115 86 C 114 89 112 91.5 109.5 92.5 C 107.5 92 105.5 91.3 103.5 90.6 C 105.5 88 106.8 85.4 107 82.6 Z" fill="#1C1E24"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      <path d="M 40 70 C 44 60 58 56 72 59 C 85 62 95 69 98 78 C 96 86 86 94 71 97 C 57 99 44 93 41 82 Z" fill="url(#rpiBody)"/>
      {/* undertail coverts */}
      <path d="M 80 92 C 86 90 92 88 96 85 C 94 89 90 92 84 94 Z" fill="#6A7184"/>
    </g>
  )
}

function Wing() {
  // Folded wing: pale blue-gray coverts, two black bars, darker primaries; hint of white rump above.
  return (
    <g>
      <path d="M 86 66 C 91 66 96 69 99 73 C 95 73.5 91 72 87 69.5 Z" fill="#F4F4F2"/>
      <path d="M 50 65 C 60 58 76 60 88 66 C 96 70 102 76 107 83 C 98 86 84 86 70 84 C 58 83 50 77 50 65 Z" fill="url(#rpiWing)"/>
      <path d="M 87 67.5 C 95 71 101 76 107 83 C 99 85.5 92 86 85 85.2 C 89 80 89.5 73 87 67.5 Z" fill="#646B7D"/>
      <path d="M 92 76 C 96 79 100 81.5 104 83.4 M 90 80 C 94 82.5 98 84 101 84.8" stroke="#4E5466" strokeWidth="0.7" fill="none"/>
      <path d="M 69 61 C 70.5 67 71.8 75 73.4 84" stroke="#15171C" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path d="M 78 63 C 79.6 69 80.8 77 82.2 85" stroke="#15171C" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path d="M 53 66 C 58 62 64 61 69 61.5" stroke="#C3C9D6" strokeWidth="1" fill="none" opacity="0.8" strokeLinecap="round"/>
    </g>
  )
}

function Foot({ x, y, lift = 0 }) {
  // short pink-red leg + three forward toes and a hind toe
  return (
    <g stroke="#D9686A" strokeWidth="2.1" strokeLinecap="round" fill="none">
      <path d={`M ${x + 3} ${y - 8} L ${x} ${y - lift}`}/>
      <path d={`M ${x} ${y - lift} l -5.5 ${0.8 - lift * 0.3} M ${x} ${y - lift} l -4.5 ${-1.2 - lift * 0.3} M ${x} ${y - lift} l 3 ${0.6}`} strokeWidth="1.5"/>
    </g>
  )
}

function RaisedWing() {
  // Near wing lifted on take-off: upper side shows the two black bars running along the arm
  // and the dark-tipped primaries; whitish underwing of the far wing peeks out below.
  return (
    <g>
      <path d="M 56 66 C 56 50 58 34 66 18 C 72 10 80 6 88 6 C 94 8 98 12 100 18 C 96 20 92 22 90 24 C 94 26 96 30 96 34 C 92 34 88 35 86 37 C 88 42 88 48 86 52 C 84 58 84 64 86 70 Z" fill="url(#rpiWing)"/>
      <path d="M 66 18 C 72 10 80 6 88 6 C 94 8 98 12 100 18 C 96 20 92 22 90 24 C 94 26 96 30 96 34 C 92 34 88 35 86 37 C 84 30 78 24 66 18 Z" fill="#5E6577"/>
      <path d="M 88 6 C 94 8 98 12 100 18 M 90 24 C 94 26 96 30 96 34 M 80 9 C 86 14 89 18 90 24" stroke="#454B5C" strokeWidth="0.8" fill="none"/>
      <path d="M 66 64 C 68 56 72 48 78 41" stroke="#15171C" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path d="M 73 66 C 75 58 79 51 84 45" stroke="#15171C" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function Sidewalk() {
  return (
    <g>
      <rect x="0" y="104" width="120" height="26" fill="url(#rpiWalk)"/>
      <path d="M 0 104 L 120 104" stroke="#C9C4BA" strokeWidth="1.2"/>
      <path d="M 18 104 L 8 130 M 84 104 L 98 130" stroke="#6E6A64" strokeWidth="1"/>
      <path d="M 40 114 l 5 3 l 4 -1 l 6 4" stroke="#7C7871" strokeWidth="0.6" fill="none"/>
      <path d="M 104 108 q 4 -1 7 1" stroke="#E2DCCF" strokeWidth="0.6" fill="none" opacity="0.7"/>
      {/* bread crumbs */}
      <ellipse cx="22" cy="107" rx="1.8" ry="1.1" fill="#E3C48C"/>
      <ellipse cx="13" cy="110" rx="1.3" ry="0.9" fill="#D9B676"/>
      <ellipse cx="29" cy="111" rx="1.1" ry="0.8" fill="#E3C48C"/>
    </g>
  )
}

function Ledge() {
  // Stone window ledge on a brick building
  const bricks = []
  for (let r = 0; r < 4; r++) for (let c = -1; c < 9; c++) {
    bricks.push(<rect key={`${r}_${c}`} x={c * 15 + (r % 2) * 7.5} y={109 + r * 6} width="14" height="5.2" rx="0.6" fill={(r + c) % 3 ? '#7A4134' : '#6B382D'}/>)
  }
  return (
    <g>
      <rect x="0" y="108" width="120" height="22" fill="#4E2C25"/>
      {bricks}
      <rect x="0" y="99" width="120" height="7" fill="#BDB6A8"/>
      <rect x="0" y="105.5" width="120" height="2.5" fill="#8F887C"/>
      <path d="M 0 99 L 120 99" stroke="#DAD4C8" strokeWidth="1"/>
    </g>
  )
}

export default function RockPigeon({ size = 120, animated = false, style = {}, pose = 'strut', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 260); return () => clearInterval(id) }, [animated])
  // The famous head-bob: head thrusts forward, holds, then the body catches up.
  const nod = animated ? [0, -1.6, -3, -3, -3, -2, -1, 0][frame] : 0
  const sheen = animated ? [0.55, 0.7, 0.85, 0.7, 0.55, 0.4, 0.35, 0.45][frame] : 0.6
  const breathe = animated ? [0, 0.3, 0.6, 0.8, 0.6, 0.3, 0, -0.2][frame] : 0

  let bird
  let ground = <Sidewalk/>
  let shadowY = 104
  if (pose === 'peck') {
    // Tipped forward, neck stretched down to snatch a crumb from the pavement.
    bird = (
      <g>
        <g transform="rotate(14 70 102)"><Tail/><Body/><Wing/></g>
        <path d="M 56 64 C 47 67 40 72 33 78 L 35 93 C 42 93 49 90 55 85 Z" fill="url(#rpiNeck)"/>
        <path d="M 38 76 C 44 73 50 72 55 72 C 55 77 53 81 50 84 C 45 84 41 83 38 81 Z" fill="#46C08A" opacity={sheen} filter="url(#rpiSoft)"/>
        <g transform="translate(33,83) rotate(-55) translate(-39,-42)"><Head sheen={0}/></g>
        <Foot x={64} y={104}/><Foot x={75} y={104}/>
      </g>
    )
  } else if (pose === 'loaf') {
    // Puffed up and resting on a building ledge, feet tucked, neck shortened.
    ground = <Ledge/>; shadowY = 99
    bird = (
      <g transform={`translate(0,${4 - breathe * 0.5})`}>
        <Tail/>
        <g transform={`translate(60 80) scale(${1.04 + breathe * 0.01},${1.06 + breathe * 0.012}) translate(-60 -80)`}><Body/></g>
        <Wing/>
        <g transform="translate(5,8)"><Head sheen={sheen}/></g>
      </g>
    )
  } else if (pose === 'takeoff') {
    // Wing-clap take-off: near wing raised, white rump flashing, tail fanned with black band.
    shadowY = 112
    bird = (
      <g transform={`translate(0,${-1 + breathe}) rotate(-6 66 90)`}>
        <path d="M 80 66 C 86 52 96 38 110 26 C 113 32 112 40 108 47 C 103 55 97 62 90 70 Z" fill="#E4E8EE"/>
        <path d="M 110 26 C 113 32 112 40 108 47 C 106 44 104 41 103 37 C 105 33 108 29 110 26 Z" fill="#8A91A2"/>
        <Tail spread/>
        <Body/>
        <path d="M 80 68 C 86 64 94 66 99 72 C 97 77 92 79 86 79 C 83 76 81 72 80 68 Z" fill="url(#rpiRump)"/>
        <RaisedWing/>
        <Head sheen={sheen}/>
        <path d="M 60 96 l -4 6 M 68 97 l -2 6" stroke="#D9686A" strokeWidth="2" strokeLinecap="round"/>
      </g>
    )
  } else if (pose === 'coo') {
    // Courting male: neck puffed into a glossy ruff, bowing, tail fanned and dragging.
    bird = (
      <g>
        <g transform="rotate(7 70 100)"><Tail spread/><Body/><Wing/></g>
        <path d="M 26 56 C 24 66 28 78 38 84 C 46 88 56 86 60 80 C 62 70 58 60 50 52 C 44 48 34 48 26 56 Z" fill="url(#rpiNeck)"/>
        <path d="M 28 62 C 34 58 44 58 52 62 C 56 66 57 70 56 72 C 46 72 36 70 29 68 Z" fill="#46C08A" opacity={sheen} filter="url(#rpiSoft)"/>
        <path d="M 30 72 C 38 76 48 78 57 76 C 56 80 54 83 51 85 C 43 85 35 80 30 72 Z" fill="#B061C8" opacity={sheen * 0.9} filter="url(#rpiSoft)"/>
        <g transform={`translate(-4,${8 + nod * -0.6}) rotate(10 39 42)`}><Head sheen={0}/></g>
        <Foot x={62} y={104}/><Foot x={74} y={104}/>
      </g>
    )
  } else {
    // Walking: one foot lifted mid-step, head pumping forward.
    bird = (
      <g>
        <Tail/><Body/><Wing/>
        <g transform={`translate(${nod},0)`}><Head sheen={sheen}/></g>
        <Foot x={59} y={104}/><Foot x={74} y={104} lift={4}/>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Rock Pigeon">
      <defs>
        <linearGradient id="rpiHead" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#6E7589"/><stop offset="100%" stopColor="#555C70"/>
        </linearGradient>
        <linearGradient id="rpiNeck" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#5A6175"/><stop offset="40%" stopColor="#3E7E6A"/><stop offset="75%" stopColor="#6A4A86"/><stop offset="100%" stopColor="#6C7386"/>
        </linearGradient>
        <linearGradient id="rpiBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A3AABA"/><stop offset="100%" stopColor="#7C8394"/>
        </linearGradient>
        <linearGradient id="rpiWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B9C0CE"/><stop offset="100%" stopColor="#99A1B2"/>
        </linearGradient>
        <radialGradient id="rpiRump" cx="0.55" cy="0.5" r="0.6">
          <stop offset="55%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#C9CED8"/>
        </radialGradient>
        <filter id="rpiSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter>
        <linearGradient id="rpiWalk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8A399"/><stop offset="100%" stopColor="#7E7A73"/>
        </linearGradient>
      </defs>
      {scene ? ground : <ellipse cx="68" cy={shadowY + 1} rx="24" ry="2.6" fill="#000" opacity="0.22"/>}
      {bird}
    </svg>
  )
}
