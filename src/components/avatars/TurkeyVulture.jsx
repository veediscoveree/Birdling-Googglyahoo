// Turkey Vulture (adult) — "accurate first, cute second, in habitat". Follows WoodDuck.jsx
// conventions. Endearingly homely: big soft eye, tidy little bald head, never gory.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'turkey_vulture', poses: ['soar', 'sun'] }

// Field marks: blackish-brown body and upperparts (brownish feather edging on the coverts);
// small, bare, wrinkled RED head with a dark feathered ruff at the neck; ivory hooked bill with
// a big see-through nostril; dark eye. Long, broad wings. From below: TWO-TONED underwing —
// black coverts against silvery-gray flight feathers — with long splayed "fingers". Soars with
// wings raised in a shallow V (dihedral), rocking/teetering. Pale pinkish legs. Perches hunched;
// suns itself with wings spread wide (horaltic pose).

const BLACK = '#1E1612'
const LEG = '#E6D2C8'

// Profile head facing left, centred (0,0); bill tip near x=-15.
function Head({ blink = false }) {
  return (
    <g>
      {/* dark feathered ruff where the bare skin starts */}
      <path d="M 5 -6 C 11 -8 16 -2 15.5 6 C 15 10 11 12 6 11 C 3 9 2 5 3 1 Z" fill="#2A1E18"/>
      <path d="M -7 -4 C -2 -8.5 6 -8.5 9 -3 C 11 1 9.5 6 4 7.4 C -1 8.4 -6 6.4 -8 3 Z" fill="url(#tuvHead)"/>
      {/* gentle wrinkles + warty texture */}
      <path d="M 4.5 -5 q 1.6 2.2 0.2 4.4 M 7.2 -3.6 q 1.4 2.4 0 5 M 1.4 4.6 q 2.2 1 4.4 -0.2" stroke="#8E2018" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.8"/>
      <circle cx="-5.4" cy="-3.4" r="0.6" fill="#F07A64"/><circle cx="-3.6" cy="-5" r="0.55" fill="#F07A64"/><circle cx="-6.6" cy="-1.4" r="0.5" fill="#F07A64"/>
      {/* big soft dark eye */}
      {blink
        ? <path d="M -3.8 -1.4 Q -1.2 0.4 1.4 -1.4" stroke="#6E1A12" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="-1.2" cy="-1.6" r="2.9" fill="#F4E6DA"/>
            <circle cx="-1.3" cy="-1.6" r="2.3" fill="#4A2A1A"/>
            <circle cx="-1.3" cy="-1.6" r="1.3" fill="#0E0806"/>
            <circle cx="-2.2" cy="-2.5" r="0.85" fill="#FFF"/>
          </g>}
      {/* ivory hooked bill with the see-through nostril */}
      <path d="M -6.6 -3.4 C -10.8 -3.8 -14 -1.8 -15 1.6 C -15.4 3.6 -14.4 5 -13.2 4.8 C -13.2 3.4 -12.4 2.4 -10.8 2.4 L -6.6 2.8 Z" fill="url(#tuvBill)"/>
      <ellipse cx="-8.8" cy="-0.6" rx="1.7" ry="0.9" fill="#3A1A14"/>
    </g>
  )
}

// Underside of a spread wing, right half (mirror for left). Shoulder at the body (x≈64).
// lift raises the tip (dihedral). Black coverts in front, silvery flight feathers behind.
function HalfWingUnder({ lift = 0 }) {
  const ty = 40 - lift
  const tip = `L 112 ${ty - 4} L 111.4 ${ty - 0.6} L 116.6 ${ty - 1.6} L 114.2 ${ty + 2.4} L 118 ${ty + 3.4} L 113.6 ${ty + 6.4} L 116.4 ${ty + 9} L 110.6 ${ty + 9.6} L 111.6 ${ty + 12.8} L 105.6 ${ty + 11.6}`
  return (
    <g>
      <path d={`M 64 56 C 76 52 92 ${ty + 6} 106 ${ty - 1} ${tip} C 98 ${ty + 21} 88 ${ty + 28} 80 69 C 74 72 68 74 64 75 Z`} fill="url(#tuvSilver)"/>
      {[[70, 63.5, 70.5], [76, 61.5, 69], [82, 59, 66.4], [88, 54, 61.6], [94, 49, 56], [100, 44, 50.4]].map(([x, y0, y1], i) => {
        const d = (ty - 32) * (x - 64) / 52
        return <path key={i} d={`M ${x} ${y0 + d} L ${x + 1.6} ${y1 + d}`} stroke="#8E949C" strokeWidth="0.8" opacity="0.9"/>
      })}
      <path d={`M 64 56 C 76 52 92 ${ty + 6} 106 ${ty - 1} L 108 ${ty + 3} C 98 ${ty + 9} 88 ${ty + 14} 80 59 C 74 61 68 63 64 64 Z`} fill={BLACK}/>
    </g>
  )
}

function SoarBird({ blink, lift = 7 }) {
  return (
    <g>
      <HalfWingUnder lift={lift}/>
      <g transform="translate(120,0) scale(-1,1)"><HalfWingUnder lift={lift}/></g>
      {/* longish rounded tail, silvery-dark below */}
      <path d="M 54 76 C 52 86 52 94 55 99 C 58 101 62 101 65 99 C 68 94 68 86 66 76 Z" fill="#5A5450"/>
      <path d="M 57 80 L 56.4 97 M 60 80 L 60 99 M 63 80 L 63.6 97" stroke="#7A7470" strokeWidth="0.7"/>
      <ellipse cx="60" cy="64" rx="8" ry="15" fill="url(#tuvBody)"/>
      <g transform="translate(59,48) scale(0.88)"><Head blink={blink}/></g>
    </g>
  )
}

// Open country: soft rolling fields.
function Fields() {
  return (
    <g>
      <path d="M 0 112 C 20 104 44 104 66 110 C 84 104 104 104 120 108 L 120 130 L 0 130 Z" fill="#7FA060" opacity="0.75"/>
      <path d="M 0 120 C 30 113 64 114 120 119 L 120 130 L 0 130 Z" fill="#5E8448"/>
      <path d="M 14 117 l 0 6 M 28 115.6 l 0 6 M 42 115 l 0 6 M 14 119 L 42 117" stroke="#8A6E50" strokeWidth="1.2" opacity="0.8"/>
    </g>
  )
}

function Post({ scene }) {
  return (
    <g>
      <path d={`M 52 92 L 68 92 L 67 ${scene ? 130 : 108} L 53 ${scene ? 130 : 108} Z`} fill="url(#tuvPost)"/>
      <path d="M 52 92 L 68 92 L 67.6 95 L 52.4 95 Z" fill="#9A8C7A"/>
      <path d={`M 57 97 L 56.6 ${scene ? 124 : 106} M 63 99 L 63.2 ${scene ? 118 : 106}`} stroke="#5E5244" strokeWidth="0.8" opacity="0.8"/>
      {scene && <path d="M 0 104 L 52 101 M 68 101 L 120 98 M 0 112 L 52 110 M 68 110 L 120 108" stroke="#8C8478" strokeWidth="0.8" opacity="0.8"/>}
    </g>
  )
}

function Snag({ full }) {
  return (
    <g>
      {full && <path d="M 90 130 C 92 114 92 104 90 94 L 98 93 C 100 104 100 116 100 130 Z" fill="#7E7264"/>}
      <path d={full ? 'M 8 99 C 36 95 66 94 98 92 L 98 97.4 C 66 99.6 36 101 10 104 Z' : 'M 34 95.6 C 54 94.4 72 93.8 90 93.2 L 90 97.8 C 72 98.6 54 99.6 36 100.6 Z'} fill="url(#tuvPost)"/>
      {full && <path d="M 20 99 C 16 92 16 86 19 80 L 21.4 81 C 19 86 19.6 92 23.4 98 Z" fill="#8C8070"/>}
      <path d={full ? 'M 24 100.4 C 44 98 64 97 88 96' : 'M 42 97.6 C 56 96.8 70 96.4 84 96'} stroke="#5E5244" strokeWidth="0.7" fill="none" opacity="0.8"/>
    </g>
  )
}

export default function TurkeyVulture({ size = 120, animated = false, style = {}, pose = 'soar', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 450); return () => clearInterval(id) }, [animated])
  const rock = animated ? [0, 1.5, 2.6, 1.5, 0, -1.5, -2.6, -1.5][frame] : 0
  const bob = animated ? [0, -0.5, -0.8, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 6

  let bird, backdrop = null
  if (pose === 'teeter') {
    // Tipsy banking glide: the whole V tilts and rocks.
    backdrop = scene && <Fields/>
    bird = <g transform={`rotate(${-17 + rock * 1.4} 60 60) translate(0,-2)`}><SoarBird blink={blink} lift={9}/></g>
  } else if (pose === 'sun') {
    // Horaltic pose: wings spread wide on a fence post, warming up in the morning sun.
    backdrop = scene ? <g><Fields/><Post scene/></g> : <Post/>
    bird = (
      <g transform={`translate(0,${bob})`}>
        {[1, -1].map(s => (
          <g key={s} transform={s < 0 ? 'translate(120,0) scale(-1,1)' : undefined}>
            <g transform={`rotate(${-rock * 0.6} 66 60)`}>
              <path d="M 66 58 C 78 50 96 46 110 50 L 114 56 L 116.6 62 L 113 64 L 116 70 L 111.4 71 L 113.4 77 L 108.4 77 L 109 83 L 103.6 81.6 C 96 84 86 84 76 80 C 72 78 68 75 66 72 Z" fill="url(#tuvSilver)"/>
              {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M ${74 + i * 6} ${70 - i * 0.6} L ${75 + i * 6.4} ${80.6 - i * 0.2}`} stroke="#8E949C" strokeWidth="0.8" opacity="0.9"/>)}
              <path d="M 66 58 C 78 50 96 46 110 50 L 112 55 C 100 56 88 60 78 66 C 74 68 70 69 66 69 Z" fill={BLACK}/>
            </g>
          </g>
        ))}
        <path d="M 52 76 C 52 66 55 56 60 56 C 65 56 68 66 68 76 C 68 86 65 92 60 92 C 55 92 52 86 52 76 Z" fill="url(#tuvBody)"/>
        <path d="M 55 90 L 54.6 94 M 65 90 L 65.4 94" stroke={LEG} strokeWidth="2.6" strokeLinecap="round"/>
        <path d="M 51.6 94 L 57 94 M 63 94 L 68.4 94" stroke={LEG} strokeWidth="1.8" strokeLinecap="round"/>
        <g transform="translate(59,50) scale(1.05)"><Head blink={blink}/></g>
      </g>
    )
  } else if (pose === 'perch') {
    // Hunched on a dead snag: shoulders up, little red head low and forward.
    backdrop = scene ? <g><Fields/><Snag full/></g> : <Snag/>
    bird = (
      <g transform={`translate(0,${bob})`}>
        <path d="M 82 86 L 100 106 L 92 110 L 76 90 Z" fill="#2A201A"/>
        <path d="M 46 66 C 44 52 58 42 72 44 C 88 46 96 60 95 74 C 94 86 85 94 72 94 C 58 94 48 82 46 66 Z" fill="url(#tuvBody)"/>
        <path d="M 54 52 C 68 42 88 48 93 62 C 97 74 101 90 105 103 L 98.6 105.6 C 90 95 78 88 66 82 C 58 76 52 64 54 52 Z" fill="url(#tuvWing)"/>
        {[[62, 56], [70, 54], [78, 56], [66, 63], [74, 62], [82, 64], [72, 70], [80, 71]].map(([x, y], i) => <path key={i} d={`M ${x - 3.4} ${y} q 3.4 3 6.8 0`} stroke="#7A5E46" strokeWidth="0.9" fill="none" opacity="0.85"/>)}
        <path d="M 84 76 C 90 86 96 96 101 104 M 80 80 C 86 89 92 97 97 104" stroke="#0E0A08" strokeWidth="0.9" fill="none"/>
        <path d="M 62 90 L 61 96 M 70 91 L 70 96.4" stroke={LEG} strokeWidth="3" strokeLinecap="round"/>
        <path d="M 57.4 96.6 C 58.6 95 63 95 64.4 96.4 M 66.4 96.8 C 67.6 95.4 72 95.4 73.4 96.8" stroke={LEG} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <g transform="translate(42,63) scale(1.15)"><Head blink={blink}/></g>
      </g>
    )
  } else {
    // Soaring on a thermal, wings held in a shallow V, gently rocking.
    backdrop = scene && <Fields/>
    bird = <g transform={`rotate(${rock} 60 62) translate(0,${bob - 4})`}><SoarBird blink={blink} lift={8}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Turkey Vulture">
      <defs>
        <radialGradient id="tuvHead" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#E85A44"/><stop offset="70%" stopColor="#CC3A2A"/><stop offset="100%" stopColor="#A42820"/>
        </radialGradient>
        <linearGradient id="tuvBill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8E8"/><stop offset="100%" stopColor="#E2D2B2"/>
        </linearGradient>
        <linearGradient id="tuvSilver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8CCD2"/><stop offset="100%" stopColor="#9EA4AC"/>
        </linearGradient>
        <linearGradient id="tuvBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A2C22"/><stop offset="100%" stopColor="#16100C"/>
        </linearGradient>
        <linearGradient id="tuvWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A382A"/><stop offset="100%" stopColor="#1A120E"/>
        </linearGradient>
        <linearGradient id="tuvPost" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C8070"/><stop offset="100%" stopColor="#6A5E50"/>
        </linearGradient>
      </defs>
      {backdrop}
      {bird}
    </svg>
  )
}
