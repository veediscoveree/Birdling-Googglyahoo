// Red-shouldered Hawk (adult, eastern) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template: meta + poses, viewBox 0 0 120 130, unique ids ("rsh"),
// scene=true adds a wet-woodland backdrop, scene=false still reads alone.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'red_shouldered_hawk', poses: ['perch', 'glide'] }

// Field marks: RUSTY-ORANGE breast and belly finely barred white; rufous "SHOULDER" patch on
// the folded wing; wings boldly CHECKERED black-and-white; long BLACK TAIL with narrow WHITE
// BANDS and white tip; yellow cere and legs; dark adult eye; brown head with rufous streaks.
// In flight: rusty barred underwing coverts, barred pale flight feathers with a dark trailing
// edge, black wingtips and a translucent pale CRESCENT ("window") at the base of the primaries
// ('soar' from below, 'glide' from above). Slimmer and longer-tailed than a Red-tailed Hawk.

function Head({ blink = false, open = false }) {
  return (
    <g>
      <path d="M 31 30 C 32 22 40 18 48 19 C 56 20 61 26 60 34 C 59 42 52 46 44 46 C 37 46 31 40 31 30 Z" fill="url(#rshHead)"/>
      {/* rufous-streaked crown and cheek */}
      {[[42, 22.5], [48, 22], [53, 24.5], [45, 26], [51, 28], [56, 30]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 2.4 1.2`} stroke="#4E3422" strokeWidth="1" strokeLinecap="round"/>)}
      <path d="M 40 38 C 44 36 50 36 56 38 C 54 43 48 45.5 43 45 C 40 43 39.5 40.5 40 38 Z" fill="#B8602E" opacity="0.8"/>
      {/* pale streaked throat */}
      <path d="M 33 38 C 35 43 39 46 44 46.4 C 41 43 40 40 40.6 37.6 Z" fill="#EADCC4"/>
      <path d="M 36 40.4 l 1.2 2 M 38.4 41.6 l 0.8 2" stroke="#8A6044" strokeWidth="0.7"/>
      {/* brow shelf + big dark eye */}
      <path d="M 34 27.4 C 37 25.2 42 25 45.6 26.6" stroke="#5A3E2A" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {blink
        ? <path d="M 35.4 31 Q 39.4 33 43.4 31" stroke="#2A1A10" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="39.4" cy="31" r="4.3" fill="#4A2A16"/>
            <circle cx="39.4" cy="31" r="2.7" fill="#120804"/>
            <circle cx="37.9" cy="29.5" r="1.4" fill="#FFF"/>
            <circle cx="40.9" cy="32.6" r="0.5" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* yellow cere + dark hooked bill */}
      <path d="M 32.4 28.6 C 30.4 28.6 29.4 30 29.4 31.6 L 29.6 35 L 33 34.6 Z" fill="#F2C230"/>
      <path d="M 30 29.4 C 26 29.6 23 32.4 23 36.4 C 23 38.6 24 40.4 25.6 41.6 C 25.4 39.4 26.4 37.6 28.4 37.2 L 31.6 36.6 L 31 34.6 Z" fill="#3A3A42"/>
      <path d="M 29 30.4 C 27 31.2 25.6 33 25.4 35" stroke="#6A6A74" strokeWidth="0.8" fill="none"/>
      {open
        ? <g><path d="M 33 37 L 26 42.6 C 25 43.6 24 44 23.4 43.4 L 31 36.4 Z" fill="#3A3A42"/><path d="M 31.4 36.8 L 26.6 37.6 L 25 41.4 L 32.6 37.4 Z" fill="#C04848"/></g>
        : <path d="M 28.4 37.2 L 33.6 36.8" stroke="#2A2A30" strokeWidth="0.8"/>}
    </g>
  )
}

function Tail() {
  // Long black tail with narrow white bands and a white tip, hanging below the branch.
  return (
    <g>
      <path d="M 63 88 L 79 88 L 82.4 121 C 78 123 72 123.4 67.4 122.4 Z" fill="#1E1A18"/>
      {[97, 104.6, 112.2].map((y, i) => <path key={i} d={`M ${64.2 + i * 1.2} ${y} L ${80 + i * 0.9} ${y - 0.4}`} stroke="#F4F0E6" strokeWidth="1.7"/>)}
      <path d="M 67.4 122.4 C 72 123.4 78 123 82.4 121" stroke="#F4F0E6" strokeWidth="1.5" fill="none"/>
    </g>
  )
}

function Body() {
  const bars = []
  for (let r = 0; r < 14; r++) {
    const y = 53 + r * 3.3
    bars.push(<path key={r} d={`M 30 ${y} q 4 -1.2 8 0 t 8 0 t 8 0 t 8 0 t 8 0 t 8 0`} stroke="#F6E6D2" strokeWidth={r < 2 ? 0.6 : 0.95} fill="none" opacity="0.85"/>)
  }
  return (
    <g>
      <clipPath id="rshBodyClip"><path d="M 34 46 C 29 58 31 80 41 92 C 49 101 63 101 71 92 C 77 80 77 58 69 46 C 61 39 42 39 34 46 Z"/></clipPath>
      <path d="M 34 46 C 29 58 31 80 41 92 C 49 101 63 101 71 92 C 77 80 77 58 69 46 C 61 39 42 39 34 46 Z" fill="url(#rshBreast)"/>
      <g clipPath="url(#rshBodyClip)">
        {bars}
        {/* dark streaks at the upper breast */}
        {[[38, 47], [44, 46], [50, 47.5], [41, 51], [47, 51]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 0.6 3`} stroke="#5A3020" strokeWidth="1.2" strokeLinecap="round"/>)}
      </g>
    </g>
  )
}

function Wing() {
  // Folded wing: rufous shoulder, black coverts/secondaries checkered with white, black
  // primaries narrowly barred white reaching down over the tail.
  const spots = []
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
    const x = 60 + c * 5 + r * 0.9, y = 62 + r * 7 + c * 1.6
    spots.push(<rect key={`${r}${c}`} x={x} y={y} width="2.8" height="2" rx="0.6" fill="#F4F0E6"/>)
  }
  return (
    <g>
      <clipPath id="rshWingClip"><path d="M 54 46 C 66 42 79 52 81 68 C 83 84 81 98 77 112 C 72 105 66 93 62 81 C 58 69 54 57 54 46 Z"/></clipPath>
      <path d="M 54 46 C 66 42 79 52 81 68 C 83 84 81 98 77 112 C 72 105 66 93 62 81 C 58 69 54 57 54 46 Z" fill="#26201C"/>
      <g clipPath="url(#rshWingClip)">
        {spots}
        {[92, 98, 104].map((y, i) => <path key={i} d={`M 60 ${y} L 84 ${y + 3}`} stroke="#E8E2D6" strokeWidth="0.9"/>)}
        <path d="M 54 46 C 64 43 75 49 79 60 C 72 61.4 63 59.6 56 57 Z" fill="#B4502A"/>
        {[[60, 50], [66, 50.4], [71, 53], [64, 54.6], [70, 57]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 2.4 1`} stroke="#6A2A14" strokeWidth="1" strokeLinecap="round"/>)}
      </g>
      <path d="M 54 46 C 66 42 79 52 81 68 C 83 84 81 98 77 112" stroke="#4A3A30" strokeWidth="0.8" fill="none"/>
    </g>
  )
}

function LegsPerched() {
  return (
    <g>
      {/* rusty barred leg feathers ("flags") */}
      <path d="M 45 88 C 44 95 47 100 52 101 L 58 101 C 58 96 56 91 52 88 Z" fill="#B85A2C"/>
      <path d="M 46 92 q 4 -1 9 0 M 46.5 96 q 4 -1 10 0" stroke="#F0E4D2" strokeWidth="0.8" fill="none"/>
      <path d="M 52 100 L 51 106 M 60 100 L 61 106" stroke="#F0C030" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 51 106 l -4.6 1.4 M 51 106 l 0.4 3.6 M 51 106 l 4 1.2 M 61 106 l -4 1.4 M 61 106 l 0.6 3.6 M 61 106 l 4.4 1" stroke="#F0C030" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 46.4 107.4 l -1 1.6 M 51.4 109.6 l -0.4 1.6 M 65.4 107 l 0.8 1.6 M 61.6 109.6 l -0.4 1.6" stroke="#1A1A1A" strokeWidth="1.1" strokeLinecap="round"/>
    </g>
  )
}

// Flight wing (left side; the right is mirrored). underside=true: rusty barred coverts,
// barred pale flight feathers, dark trailing edge, black tips, pale crescent window.
// underside=false: rufous shoulder, checkered black-and-white, pale crescent near the tip.
const WING_D = 'M 55 53 C 44 48 28 45.4 15 47 L 8 47.4 L 3 51.6 L 8.4 53.4 L 2.4 57 L 8.4 59.2 L 3.6 62.8 L 9.8 64.4 L 8.6 68 L 11 70.4 C 24 74 40 76 55 75.6 Z'
function FlightWing({ underside }) {
  const id = underside ? 'rshWU' : 'rshWO'
  const marks = []
  if (underside) {
    for (let i = 0; i < 12; i++) { const x = 16 + i * 3.3; marks.push(<path key={i} d={`M ${x} ${55 + i * 0.1} L ${x + 0.6} ${71.4 + i * 0.4}`} stroke="#6A6058" strokeWidth="0.6" opacity="0.8"/>) }
  } else {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) {
      const x = 22 + c * 3.8 + r * 0.6, y = 57 + r * 4 + c * 0.3
      marks.push(<rect key={`${r}${c}`} x={x} y={y} width="2.2" height="1.6" rx="0.5" fill="#F4F0E6"/>)
    }
  }
  return (
    <g>
      <clipPath id={id}><path d={WING_D}/></clipPath>
      <path d={WING_D} fill={underside ? '#ECE4D6' : '#262019'}/>
      <g clipPath={`url(#${id})`}>
        {marks}
        {underside
          ? <g>
              <path d="M 56 53 C 44 49 30 47 16 48 L 17 54.4 C 30 54 44 55.6 56 60.4 Z" fill="#C0612E"/>
              {[[22, 51.2], [28, 51], [34, 51.8], [40, 52.6], [46, 54], [51, 55.6]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 3 0.4`} stroke="#F4ECE0" strokeWidth="0.9"/>)}
              <path d="M 0 44 L 15 44 L 13.6 72 L 0 72 Z" fill="#1E1A18"/>
              <path d="M 11 70.4 C 24 74 40 76 55 75.6" stroke="#3A3028" strokeWidth="2.6" fill="none"/>
            </g>
          : <g>
              <path d="M 56 52 C 48 49 40 47.6 33 47.4 L 35 55 C 43 55 50 56 56 58.4 Z" fill="#B4502A"/>
              <path d="M 0 44 L 15 44 L 13.6 72 L 0 72 Z" fill="#14110F"/>
              {[[5, 55], [5, 60], [7, 64.6]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 5 0.6`} stroke="#E8E2D6" strokeWidth="0.8"/>)}
            </g>}
        {/* translucent pale crescent at the base of the primaries */}
        <path d="M 21 49 C 16.2 55 16.2 62.4 19.6 69.6" stroke={underside ? '#FFFBEF' : '#E6DCC6'} strokeWidth="3.2" fill="none" strokeLinecap="round" opacity={underside ? 0.95 : 0.85}/>
      </g>
    </g>
  )
}

function MiniHead({ blink }) {
  // Small profile head for the flight poses (looking down-left), same marks as the big one.
  return <g transform="translate(60,47) scale(0.5) translate(-44,-32)"><Head blink={blink}/></g>
}

function FlightTail({ underside }) {
  return (
    <g>
      <path d="M 54 74 L 66 74 L 73 97 C 66 100.6 54 100.6 47 97 Z" fill="#1E1A18"/>
      {[81, 87.4, 93.6].map((y, i) => <path key={i} d={`M ${53.2 - i * 1.9} ${y} Q 60 ${y + 1.6} ${66.8 + i * 1.9} ${y}`} stroke="#F4F0E6" strokeWidth="1.4" fill="none"/>)}
      <path d="M 47 97 C 54 100.6 66 100.6 73 97" stroke="#F4F0E6" strokeWidth="1.3" fill="none"/>
      {!underside && <path d="M 54 74 L 66 74 L 65 77 L 55 77 Z" fill="#2E2620"/>}
    </g>
  )
}

function FlyingBird({ underside, blink }) {
  const bars = []
  for (let r = 0; r < 6; r++) bars.push(<path key={r} d={`M 52 ${55 + r * 3.4} q 4 -1 8 0 t 8 0`} stroke="#F6EEE0" strokeWidth="0.9" fill="none"/>)
  return (
    <g>
      <FlightTail underside={underside}/>
      <FlightWing underside={underside}/>
      <g transform="translate(120,0) scale(-1,1)"><FlightWing underside={underside}/></g>
      <clipPath id={underside ? 'rshFBU' : 'rshFBO'}><ellipse cx="60" cy="62" rx="8" ry="15"/></clipPath>
      <ellipse cx="60" cy="62" rx="8" ry="15" fill={underside ? 'url(#rshBreast)' : '#5A4030'}/>
      {underside
        ? <g clipPath="url(#rshFBU)">{bars}</g>
        : <g><path d="M 54 54 C 56 50 64 50 66 54 C 64 58 56 58 54 54 Z" fill="#B4502A" opacity="0.8"/>
            {[[56, 62], [62, 64], [58, 68], [62, 70]].map(([x, y], i) => <rect key={i} x={x} y={y} width="2" height="1.4" fill="#E8E0D0" opacity="0.7"/>)}</g>}
      {underside && <path d="M 56.5 75 l -1 3 M 63.5 75 l 1 3" stroke="#F0C030" strokeWidth="2.2" strokeLinecap="round"/>}
      <MiniHead blink={blink}/>
    </g>
  )
}

function WetWoods({ flight }) {
  // Misty wet woodland: soft trunks, a dark pool with reflections, fallen leaves; a mossy
  // branch for perched poses, a ragged autumn canopy edge for flight poses.
  if (flight) {
    return (
      <g>
        <path d="M 0 0 H 120 V 130 H 0 Z" fill="url(#rshSky)"/>
        <path d="M 0 130 L 0 112 C 4 104 14 102 20 108 C 24 98 38 98 42 106 C 48 100 58 100 62 108 C 68 100 80 100 84 106 C 90 98 102 98 106 106 C 110 102 118 102 120 106 L 120 130 Z" fill="#5C6A3A"/>
        {[[12, 112, '#C8782C'], [34, 110, '#B04A22'], [56, 114, '#D8A030'], [78, 110, '#8A9A3E'], [100, 112, '#C8642A']].map(([x, y, c], i) => <ellipse key={i} cx={x} cy={y} rx="9" ry="6" fill={c} opacity="0.85"/>)}
        <path d="M 0 124 H 120 V 130 H 0 Z" fill="#3E4A2A"/>
      </g>
    )
  }
  return (
    <g>
      <path d="M 14 0 C 12 40 13 80 15 118 L 22 118 C 21 80 21 40 22 0 Z M 96 0 C 95 40 96 80 98 118 L 103 118 C 102 80 102 40 103 0 Z" fill="#3A4A3E" opacity="0.55"/>
      <path d="M 0 116 C 30 113 90 113 120 116 L 120 130 L 0 130 Z" fill="url(#rshPool)"/>
      <path d="M 10 121 q 8 -1.6 16 0 M 84 124 q 10 -1.6 20 0 M 40 127 q 6 -1 12 0" stroke="#8AB0B0" strokeWidth="0.9" fill="none" opacity="0.6"/>
      <path d="M 30 120 c 3 -2.4 7 -2 9 0.6 c -3 2 -6 2 -9 -0.6 Z" fill="#C8782C"/>
      <path d="M 92 118.6 c 2.6 -2 6 -1.8 8 0.4 c -2.6 2 -5.6 2 -8 -0.4 Z" fill="#A84A20"/>
      {/* mossy branch */}
      <path d="M 0 112 C 30 108 70 107 120 104 L 120 110 C 70 112.6 30 114 0 117 Z" fill="#5A4434"/>
      <path d="M 0 112 C 30 108 70 107 120 104" stroke="#6E8A3A" strokeWidth="2.2" fill="none" opacity="0.9"/>
      <path d="M 92 105.8 C 100 100 106 98 114 98" stroke="#5A4434" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    </g>
  )
}

export default function RedShoulderedHawk({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.4, -0.7, -0.4, 0, 0.3, 0.5, 0.3][frame] : 0
  const bank = animated ? [0, 1.5, 3, 1.5, 0, -1.5, -3, -1.5][frame] : 0
  const blink = animated && frame === 5
  const flight = pose === 'soar' || pose === 'glide'

  let bird
  if (pose === 'soar') {
    // Overhead, seen from below: the classic hawk-watch view.
    bird = <g transform={`translate(60,60) scale(0.9) rotate(${bank - 4}) translate(-60,-62)`}><FlyingBird underside blink={blink}/></g>
  } else if (pose === 'glide') {
    // Banking below the viewer over the treetops, seen from above.
    bird = <g transform={`translate(60,64) scale(0.88) rotate(${bank + 8}) translate(-60,-62)`}><FlyingBird blink={blink}/></g>
  } else if (pose === 'call') {
    // "Kee-ah!": head thrown up, bill open.
    bird = (
      <g>
        <Tail/><Body/><Wing/><LegsPerched/>
        <g transform="rotate(16 52 44) translate(50,44) scale(1.1) translate(-50,-44)"><Head blink={false} open/></g>
        <path d="M 17 16 q -3.4 3.4 0 7 M 12.6 12.6 q -5 6 0 13" stroke="#F4F0E6" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8"/>
      </g>
    )
  } else {
    bird = <g><Tail/><Body/><Wing/><LegsPerched/><g transform="translate(50,44) scale(1.1) translate(-50,-44)"><Head blink={blink}/></g></g>
  }

  const alone = flight ? null
    : <path d="M 30 109.6 C 55 108 80 107 100 106" stroke="#5A4434" strokeWidth="4" fill="none" strokeLinecap="round"/>

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Red-shouldered Hawk">
      <defs>
        <linearGradient id="rshHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A4A34"/><stop offset="100%" stopColor="#8A5A3A"/>
        </linearGradient>
        <linearGradient id="rshBreast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8703C"/><stop offset="60%" stopColor="#C0612E"/><stop offset="100%" stopColor="#D08850"/>
        </linearGradient>
        <linearGradient id="rshPool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E4A4C"/><stop offset="100%" stopColor="#1A2E30"/>
        </linearGradient>
        <linearGradient id="rshSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9EC4DE"/><stop offset="100%" stopColor="#D8E6EE"/>
        </linearGradient>
      </defs>
      {scene && <WetWoods flight={flight}/>}
      {!scene && alone}
      <g transform={`translate(0,${flight ? 0 : bob - 2})`}>{bird}</g>
    </svg>
  )
}
