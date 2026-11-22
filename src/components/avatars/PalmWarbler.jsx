// Palm Warbler (eastern "Yellow" Palm, S. p. hypochrysea) — "accurate first, cute second, in
// habitat". Follows the WoodDuck.jsx template: meta + poses, viewBox 0 0 120 130, unique ids
// ("plw"), scene=true adds a fall lawn / weedy edge, scene=false still reads alone.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'palm_warbler', poses: ['forage', 'peck', 'perch', 'flit'] }

// Field marks: RUFOUS cap; YELLOW eyebrow over a dark eye-line; brownish-olive cheek and back;
// YELLOW throat and underparts with RUSTY streaks on breast and flanks; BRIGHT YELLOW undertail
// coverts; olive-yellow rump; brown wings with faint buffy bars; dark tail with white spots in
// the outer corners (shown when fanned); thin dark bill; dark legs. Lives low — lawns and weedy
// edges — and constantly BOBS its tail (idle animation pumps the tail).

function Head({ blink = false }) {
  return (
    <g>
      <circle cx="38" cy="50" r="13.5" fill="url(#plwHead)"/>
      <clipPath id="plwHeadClip"><circle cx="38" cy="50" r="13.5"/></clipPath>
      <g clipPath="url(#plwHeadClip)">
        {/* yellow throat + sub-moustache, faint dark malar */}
        <path d="M 22 54 C 28 56 36 58 44 60 C 44 66 34 68 22 66 Z" fill="#F6D63A"/>
        <path d="M 26 57.6 C 31 59.6 36 60.4 41 60.6" stroke="#8A6A40" strokeWidth="0.9" fill="none" opacity="0.55"/>
        {/* rufous cap */}
        <ellipse cx="39" cy="38.6" rx="13" ry="7.6" fill="#B4482A"/>
        <ellipse cx="38" cy="38" rx="9" ry="4" fill="#C85A34" opacity="0.7"/>
        {/* yellow eyebrow, dark eye-line */}
        <path d="M 25.4 46.4 Q 33 42.6 46 45.4" stroke="#F4D63A" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        <path d="M 24.5 51 Q 34 49.6 49 53.4" stroke="#4A3A26" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      </g>
      {blink
        ? <path d="M 29.8 50.6 Q 32.8 52.2 35.8 50.6" stroke="#2A1E12" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="32.8" cy="50.4" r="3.2" fill="#140C06"/>
            <circle cx="31.7" cy="49.3" r="1.1" fill="#FFF"/>
            <path d="M 30 53.8 Q 32.8 55 35.6 53.8" stroke="#F4E8B0" strokeWidth="0.8" fill="none" opacity="0.8"/>
          </g>}
      {/* thin pointed warbler bill */}
      <path d="M 25.4 49 L 16.6 51.4 L 25.4 53 Z" fill="#3A3430"/>
      <path d="M 25.4 51.2 L 17.4 51.4" stroke="#1A1612" strokeWidth="0.4"/>
    </g>
  )
}

function Tail({ angle = 0, fan = false }) {
  // Pivots at the tail base so it can bob. Underside of outer feathers show white corner spots.
  return (
    <g transform={`rotate(${angle} 80 86)`}>
      {fan && <path d="M 80 84 L 111 92 L 110 102 L 106 107 Z" fill="#4A3E2C"/>}
      <path d="M 78 81 C 88 85 98 89 108 92 L 109 94.6 L 106.6 99.8 C 96 98 87 95 77 91 Z" fill="#54462E"/>
      <path d="M 79 86 C 89 89.4 98 92.6 107.6 95.6" stroke="#7A6A48" strokeWidth="0.7" fill="none"/>
      <path d="M 101.4 97.4 L 106.8 99 L 106.2 100.4 L 101 98.8 Z" fill="#F2F0E6" opacity="0.9"/>
      {fan && <path d="M 101 102 L 106 104.6 L 105 107 L 100.4 104.4 Z" fill="#F2F0E6"/>}
      {/* bright yellow undertail coverts */}
      <path d="M 70 88 C 76 89 82 90 88 92.6 C 84 95.6 78 96 72 94.4 Z" fill="#FFE02A"/>
      {/* olive-yellow rump above the tail base */}
      <path d="M 74 76 C 79 78 83 81 85 84.6 C 81 84 77 82.4 73 80 Z" fill="#A9A548"/>
    </g>
  )
}

function Body() {
  const streaks = [[39, 66.5], [44.5, 65], [42, 72], [48.5, 70.5], [47, 78], [53.5, 76.5], [54, 84], [61, 83.5], [66, 87.6]]
  return (
    <g>
      <ellipse cx="60" cy="74" rx="25" ry="16" transform="rotate(28 60 74)" fill="url(#plwBelly)"/>
      {/* brownish-olive mantle */}
      <path d="M 44 58 C 54 54 68 58 80 70 C 84 75 86 80 86 84 C 74 78 60 70 46 66 Z" fill="#7C6E46"/>
      {streaks.map(([x, y], i) => <path key={i} d={`M ${x} ${y} q 1.6 2.4 1.2 4.6`} stroke="#B4552C" strokeWidth="1.25" fill="none" strokeLinecap="round" opacity="0.85"/>)}
    </g>
  )
}

function Wing({ lift = 0 }) {
  return (
    <g transform={`rotate(${-lift} 52 64)`}>
      <path d="M 50 62 C 60 58 74 62 84 72 C 88 77 90 82 89 86 C 80 85 66 80 57 76 C 51 72 49 66 50 62 Z" fill="url(#plwWing)"/>
      <path d="M 56 63.6 C 58.6 66.6 60 70 60.4 73.4 M 63.6 63.4 C 66.4 67 67.6 71 67.8 76" stroke="#D8C89A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8"/>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M ${73 + i * 1.6} ${68 + i * 3} C ${80 + i} ${72 + i * 2.6} ${86} ${78 + i * 2} ${88.6 - i * 0.6} ${85.6 - i * 0.2}`} stroke="#A8966A" strokeWidth="0.7" fill="none"/>)}
      <path d="M 58 76 C 64 78.6 70 80.6 76 81.6" stroke="#C8B48A" strokeWidth="0.8" fill="none" opacity="0.8"/>
    </g>
  )
}

function Legs({ perch = false }) {
  return (
    <g stroke="#3E3226" strokeWidth="1.5" strokeLinecap="round" fill="none">
      {perch
        ? <g><path d="M 55 87 L 57 96"/><path d="M 62 89 L 61.4 97"/><path d="M 57 96 l -3.4 0.4 M 57 96 l 3 1 M 61.4 97 l -3 0.4 M 61.4 97 l 3 0.9" strokeWidth="1.2"/></g>
        : <g><path d="M 54 87 L 52 98 L 50.4 105.6"/><path d="M 61 89 L 61.6 99 L 63 105.6"/>
            <path d="M 50.4 105.6 l -4.4 0.4 M 50.4 105.6 l 3.6 0.6 M 63 105.6 l -4 0.4 M 63 105.6 l 4 0.4" strokeWidth="1.2"/></g>}
    </g>
  )
}

function Lawn({ stalk = false }) {
  const blades = []
  for (let i = 0; i < 34; i++) {
    const x = 2 + i * 3.5 + (i % 3) * 0.8, h = 5 + ((i * 7) % 6), lean = ((i * 5) % 7) - 3
    blades.push(<path key={i} d={`M ${x} 110 q ${lean * 0.4} ${-h * 0.6} ${lean} ${-h}`} stroke={i % 2 ? '#6E9A44' : '#5A8436'} strokeWidth="1.2" fill="none" strokeLinecap="round"/>)
  }
  return (
    <g>
      {/* weedy edge behind: seed-headed stems, a fading goldenrod */}
      <path d="M 100 108 C 101 90 103 74 104 58 M 112 108 C 111 94 113 82 116 70 M 8 108 C 9 94 7 84 6 74" stroke="#8C7A4E" strokeWidth="1.2" fill="none" opacity="0.8"/>
      {[[104, 58], [116, 70], [6, 74]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.8" ry="4" fill="#B89A5E" opacity="0.85"/>)}
      <path d="M 104 66 C 99 62 97 58 96 54 M 104 66 C 108 62 110 58 110 54" stroke="#8C7A4E" strokeWidth="0.9" fill="none" opacity="0.8"/>
      {[[96, 54], [97.5, 57.5], [110, 54], [108.8, 57.5], [99, 60.5]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#E0B830"/>)}
      {stalk && <g>
        <path d="M 26 112 C 40 102 52 96.4 62 95.2 C 76 93 84 74 86 54" stroke="#B49C68" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M 38 104.6 C 34 98 34 94 36 90 M 46 99.6 C 44 94 46 90 49 87.4" stroke="#8A9448" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 86 54 C 90 50 92 46 92 42 M 86 54 C 90 54 95 52 98 48 M 82 57 C 84 52 84 48 82 44" stroke="#9A8656" strokeWidth="1.1" fill="none"/>
        {[[92, 42], [93, 45.4], [98, 48], [95, 50.6], [82, 44], [83.6, 47.6], [88.6, 51.6], [90.4, 47.2], [85.6, 50.4], [96.6, 45]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.9" fill={i % 3 ? '#E8BE2C' : '#D6A426'}/>)}
      </g>}
      <path d="M 0 108 C 30 105 80 105 120 108 L 120 130 L 0 130 Z" fill="url(#plwGround)"/>
      {blades}
      {/* fallen leaves */}
      <path d="M 18 116 c 4 -3 9 -2 11 1 c -4 3 -8 3 -11 -1 Z" fill="#D2702C"/>
      <path d="M 84 120 c 3 -4 8 -4 11 -1 c -3 4 -8 4 -11 1 Z" fill="#E0A030"/>
      <path d="M 40 124 c 3 -2 7 -2 9 0.6 c -3 2.4 -7 2.4 -9 -0.6 Z" fill="#B84A22"/>
    </g>
  )
}

export default function PalmWarbler({ size = 120, animated = false, style = {}, pose = 'forage', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 300); return () => clearInterval(id) }, [animated])
  // The famous tail-bob: a quick pump up-and-down, nearly nonstop.
  const tailBob = animated ? [0, -12, -18, -8, 0, -12, -18, -6][frame] : -12
  const nod = animated ? [0, 0.4, 0.8, 0.4, 0, 0.4, 0.8, 0.2][frame] : 0
  const blink = animated && frame === 3

  let bird
  if (pose === 'peck') {
    // Tipped forward to pick a seed from the grass, tail cocked high.
    bird = (
      <g transform="translate(9,0) rotate(-24 57 105)">
        <Tail angle={tailBob - 14}/><Body/><Wing/><Head blink={blink}/>
        <g transform="rotate(24 57 105)"><Legs/></g>
      </g>
    )
  } else if (pose === 'perch') {
    // Clinging to a goldenrod stalk at the weedy edge, more upright.
    bird = <g transform="translate(2,-2) rotate(-10 59 96)"><Tail angle={tailBob + 6}/><Body/><Wing/><Legs perch/><Head blink={blink}/></g>
  } else if (pose === 'flit') {
    // Springing up off the lawn: wings raised, tail fanned to flash white corners + yellow vent.
    const wu = animated ? frame % 2 === 0 : true
    bird = (
      <g transform="translate(-5,4) scale(0.92) rotate(-12 60 74)">
        <g transform="rotate(-8 80 86)"><Tail angle={-6} fan/></g>
        <path d={wu ? 'M 52 64 C 50 48 54 32 64 20 C 70 22 76 26 80 32 C 82 42 78 54 66 66 Z' : 'M 52 66 C 62 76 74 86 90 92 C 88 84 82 76 70 66 Z'} fill="#5E5034" opacity="0.6"/>
        <Body/>
        <path d="M 54 88 l -3 6 l -2.6 1 M 61 89 l -1 6 l -2.6 1" stroke="#3E3226" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        <Head blink={blink}/>
        <g transform={wu ? 'rotate(0)' : 'translate(0,30) scale(1,-0.6) translate(0,-30)'}>
          <path d="M 50 62 C 52 46 60 32 74 20 L 78 22 L 80 19 L 84 23 L 87 21 L 89 26 L 92 25.4 C 90 36 84 48 74 58 C 68 64 60 66 54 66 Z" fill="url(#plwWing)"/>
          <path d="M 56 56 C 60 48 64 42 70 36 M 61 58 C 66 50 71 44 77 38" stroke="#D8C89A" strokeWidth="1.1" fill="none" opacity="0.8"/>
          <path d="M 72 42 C 78 36 84 30 88 26 M 74 46 C 80 40 86 34 90 30" stroke="#A8966A" strokeWidth="0.7" fill="none"/>
        </g>
      </g>
    )
  } else {
    bird = <g><Tail angle={tailBob}/><Body/><Wing/><Legs/><Head blink={blink}/></g>
  }

  const alone = pose === 'perch'
    ? <path d="M 32 108 C 44 100 52 96.4 62 95.2 C 70 94 76 88 80 80" stroke="#B49C68" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    : <path d="M 26 107 C 50 105 80 105 104 107" stroke="#6E9A44" strokeWidth="1.6" fill="none" opacity="0.7" strokeLinecap="round"/>

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Palm Warbler">
      <defs>
        <linearGradient id="plwHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A7448"/><stop offset="70%" stopColor="#8E7A50"/><stop offset="100%" stopColor="#C8B060"/>
        </linearGradient>
        <linearGradient id="plwBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8CC34"/><stop offset="100%" stopColor="#F6DA3C"/>
        </linearGradient>
        <linearGradient id="plwWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A6A46"/><stop offset="100%" stopColor="#4E412A"/>
        </linearGradient>
        <linearGradient id="plwGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A9440"/><stop offset="100%" stopColor="#3E6626"/>
        </linearGradient>
      </defs>
      {scene ? <Lawn stalk={pose === 'perch'}/> : alone}
      <g transform={`translate(0,${pose === 'flit' ? 0 : nod}) translate(57,106) scale(1.12) translate(-57,-106)`}>{bird}</g>
    </svg>
  )
}
