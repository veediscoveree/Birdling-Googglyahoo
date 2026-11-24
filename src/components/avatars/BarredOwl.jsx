// Barred Owl — naturalistic technique (see BaldEagle.jsx pass 3).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped
// to the plumage; bars, streaks and spots are soft, slightly blurred marks. True proportions: a
// big ROUND head (no tufts) about as wide as the body, compact body, folded wing reaching most of
// the way down the tail, tail projecting beyond the perch.
// Field marks: NO EAR TUFTS; pale gray-brown facial disc with CONCENTRIC dark rings and a thin
// dark rim; DARK BROWN eyes (the only large eastern owl without yellow eyes) — gentle, not fierce;
// pale "X" of feathering between the eyes; YELLOW bill; head and nape finely barred brown/white;
// upper breast BARRED crosswise, belly white with long brown vertical STREAKS; brown upperparts
// spotted and barred white; feathered pale feet.
// Pose: perched in a wet woodland at dusk, body angled left, head turned toward the viewer.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'barred_owl', poses: ['perch'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

const HEAD_D = 'M 54.6 21.4 C 64.4 21.2 72 27.8 72.4 37.4 C 72.8 45 69.4 51 63 54.6 C 58 57 50.4 57 45.6 54.4 C 39.4 51 36.4 44.6 36.8 37.2 C 37.4 28 45 21.6 54.6 21.4 Z'
const DISC_D = 'M 53.4 28.4 C 50.4 26.6 45.6 26.8 42.8 29.8 C 40 33 39.6 38 41 42.2 C 42.6 46.8 47 50 52 50.2 C 52.6 50.2 53 50 53.4 49.8 C 53.8 50 54.2 50.2 54.8 50.2 C 59.8 50 64 46.8 65.6 42.2 C 67 38 66.6 33 63.8 29.8 C 61 26.8 56.4 26.6 53.4 28.4 Z'
const BODY_D = 'M 40.4 48 C 36.4 54 35.2 62 35.8 70.6 C 36.4 82 40.6 92 48 98.8 C 53 102.2 60.6 102.6 66.6 101 L 75 97.6 C 79 89.6 80.6 79.6 80 69.6 C 79.4 59.6 77 51.6 71.6 46.6 C 62 43 50 43 40.4 48 Z'
const WING_D = 'M 63.4 50 C 71 47.6 77 53.4 79 62.6 C 80.8 72 80.8 84 79.6 94 C 79.6 100 80.6 105 82.6 110 C 77.6 106.6 73 101.6 69.8 95.4 C 65.6 87 62.8 76 62.2 64 C 62 58 62.4 53.6 63.4 50 Z'

// ── Perched, body angled left, face turned toward the viewer ─────────────────
function Perched({ blink }) {
  const r = rng(19)
  // belly: long, soft, drop-ended vertical streaks
  const streaks = []
  for (let i = 0; i < 22; i++) {
    const x = 38.4 + (i % 11) * 2.5 + (r() - 0.5) * 2.2, y = 64 + Math.floor(i / 11) * 13 + r() * 8, L = 5 + r() * 8
    streaks.push(<path key={`s${i}`} d={`M ${x.toFixed(2)} ${y.toFixed(2)} C ${(x - 0.6).toFixed(2)} ${(y + L * 0.5).toFixed(2)} ${(x - 0.2).toFixed(2)} ${(y + L * 0.85).toFixed(2)} ${(x + 0.1).toFixed(2)} ${(y + L).toFixed(2)}`} stroke="#6A4A30" strokeWidth={1 + r() * 0.5} strokeLinecap="round" fill="none" opacity={0.6 + r() * 0.2}/>)
  }
  // upper breast: horizontal brown bars across a pale ruff
  const bars = Array.from({ length: 7 }, (_, i) => {
    const y = 54 + i * 1.9
    return <path key={`b${i}`} d={`M ${38 + i * 0.4} ${y + 1.2} C ${46} ${y + 2.6} ${56} ${y + 2.4} ${68 - i} ${y}`} stroke="#6E4E34" strokeWidth={1 - i * 0.06} strokeDasharray={`${4 + r() * 3} ${0.8 + r()}`} fill="none" opacity={0.7 - i * 0.04}/>
  })
  // wing: rows of white spots on the coverts, pale bars across the flight feathers
  const spots = []
  for (let row = 0; row < 5; row++) for (let c = 0; c < 4; c++) {
    const x = 65.4 + c * 3.4 + row * 0.5 + (r() - 0.5) * 1.8, y = 54 + row * 4.2 + c * 1.2 + (r() - 0.5) * 1.6
    spots.push(<ellipse key={`p${row}${c}`} cx={x.toFixed(2)} cy={y.toFixed(2)} rx={(0.6 + r() * 0.7).toFixed(2)} ry={(0.4 + r() * 0.35).toFixed(2)} fill="#EEE6D8" opacity={0.7 + r() * 0.2}/>)
  }
  const wbars = [76, 81, 86, 91, 96, 101].map((y, i) => <path key={`w${i}`} d={`M ${64 + i * 1.4} ${y - 4} C ${70} ${y - 2} ${75} ${y} ${81} ${y + 1.4}`} stroke="#E4D8C2" strokeWidth={0.7 + (i % 3) * 0.2} strokeDasharray={`${2.2 + i * 0.4} ${0.9 + (i % 2) * 0.8}`} fill="none" opacity="0.42"/>)
  // crown and nape: fine white barring
  const crown = Array.from({ length: 9 }, (_, i) => {
    const y = 25 + i * 2.6, w = 15.6 * Math.sqrt(Math.max(0, 1 - ((y - 38) / 15.6) ** 2))
    return <path key={`c${i}`} d={`M ${54.6 - w} ${y + 0.6} Q ${54.6} ${y - 0.8} ${54.6 + w} ${y + 0.6}`} stroke="#E8DECC" strokeWidth="0.7" strokeDasharray={`${2 + (i % 3)} 1.2`} fill="none" opacity="0.6"/>
  })
  // concentric rings in the facial disc
  const rings = [5.2, 7.4, 9.6].flatMap((rad, i) => [[47.8, 38.6], [59, 38.6]].map(([cx, cy], j) =>
    <circle key={`r${i}${j}`} cx={cx} cy={cy} r={rad} stroke="#7A5E46" strokeWidth="0.8" fill="none" opacity={0.62 - i * 0.08}/>))

  return (
    <g>
      {/* tail: brown with pale bars, projecting beyond the perch */}
      <g filter="url(#bdoTex)">
        <path d="M 68.6 95 L 79.4 93.4 L 87 114.6 C 84 117 79.4 117.6 76.4 116.4 Z" fill="url(#bdoTail)"/>
      </g>
      {[100, 105, 110].map((y, i) => <path key={i} d={`M ${71.6 + i * 1.4} ${y} L ${81.6 + i * 1.6} ${y - 2}`} stroke="#E0D4BE" strokeWidth="0.9" opacity="0.55"/>)}

      <g filter="url(#bdoTex)">
        {/* body: pale breast, buff-gray in shade */}
        <path d={BODY_D} fill="url(#bdoBody)"/>
        <g clipPath="url(#bdoBodyClip)">
          <g filter="url(#bdoSoftB)">{bars}{streaks}</g>
          <path d="M 70 46 C 76 52 80 62 80 72 L 80 104 L 60 104 C 66 90 68 70 66 50 Z" fill="#5A4636" opacity="0.4" filter="url(#bdoGlow)"/>
          <path d="M 42 50 C 38 58 36.6 68 37.4 78" stroke="#F4EEE2" strokeWidth="2" fill="none" opacity="0.4" filter="url(#bdoGlow)"/>
        </g>
        {/* folded wing */}
        <path d={WING_D} fill="url(#bdoWing)"/>
        <g clipPath="url(#bdoWingClip)" filter="url(#bdoSoftB)">{spots}{wbars}
          <path d="M 63.4 50 C 62.4 53.6 62 58 62.2 64 C 62.8 76 65.6 87 69.8 95.4" stroke="#2A1C12" strokeWidth="1.4" fill="none" opacity="0.4"/>
        </g>

        <path d="M 60 52 C 64.6 60 65.2 74 63.6 86 C 66 76 66.6 62 63.8 51 Z" fill="#D2C4AE" opacity="0.8" filter="url(#bdoBlur)"/>
        {/* big round head: barred brown crown, pale disc */}
        <path d={HEAD_D} fill="url(#bdoHead)"/>
        <g clipPath="url(#bdoHeadClip)" filter="url(#bdoSoftB)">{crown}
          <path d="M 36 46 C 42 52 48 55 55 55.4 C 62 55 68 52 74 46 L 74 60 L 36 60 Z" fill="#CDBFA8" opacity="0.8" filter="url(#bdoBlur)"/>
          {[49.6, 52, 54.2].map((y, i) => <path key={i} d={`M ${40 + i * 2} ${y - 3} Q 55 ${y + 3} ${70 - i * 2} ${y - 3}`} stroke="#7A5A40" strokeWidth="0.8" strokeDasharray="3 1" fill="none" opacity="0.55"/>)}
        </g>
        <path d={DISC_D} fill="url(#bdoDisc)" filter="url(#bdoBlur)"/>
        <g clipPath="url(#bdoDiscClip)" filter="url(#bdoSoftB)">
          {rings}
          {/* pale X between the eyes: brows sweeping up from the bill */}
          <path d="M 53.4 46 C 52.2 41 50.4 36 46 31.6 C 49.6 32.6 52 34.6 53.4 37.4 C 54.8 34.6 57.2 32.6 60.8 31.6 C 56.4 36 54.6 41 53.4 46 Z" fill="#F2ECE0" opacity="0.85"/>
          <path d="M 51.6 41.4 C 52.4 44.6 53 47.4 53.4 49 C 53.8 47.4 54.4 44.6 55.2 41.4 Z" fill="#E8E0D0" opacity="0.7"/>
        </g>
        {/* thin dark rim of the disc */}
        <path d={DISC_D} stroke="#3E2A1A" strokeWidth="1.2" fill="none" opacity="0.75" filter="url(#bdoBlur)"/>
      </g>

      {/* dark brown eyes, soft lids: a gentle expression */}
      {[[47.8, 38.8], [59, 38.8]].map(([cx, cy]) => blink
        ? <path key={cx} d={`M ${cx - 3} ${cy} q 3 1.2 6 0`} stroke="#5A4234" strokeWidth="0.9" fill="none"/>
        : <g key={cx}>
            <circle cx={cx} cy={cy} r="3.35" fill="#140B06"/>
            <circle cx={cx} cy={cy} r="2.9" fill="url(#bdoIris)"/>
            <circle cx={cx} cy={cy + 0.1} r="1.5" fill="#050302"/>
            <path d={`M ${cx - 3.5} ${cy - 1.2} Q ${cx} ${cy - 2.5} ${cx + 3.5} ${cy - 1.2} A 3.6 3.6 0 0 0 ${cx - 3.5} ${cy - 1.2} Z`} fill="#8A7464" opacity="0.9"/>
            <path d={`M ${cx - 3.3} ${cy - 1.2} Q ${cx} ${cy - 2.3} ${cx + 3.3} ${cy - 1.2}`} stroke="#2A1C14" strokeWidth="0.45" fill="none"/>
            <circle cx={cx - 0.9} cy={cy - 0.5} r="0.5" fill="#F8F4EA" opacity="0.95"/>
          </g>)}

      {/* yellow bill, hooked, half hidden in bristles */}
      <path d="M 52.2 42.6 C 52.8 41.6 54 41.6 54.6 42.6 C 54.8 44.4 54.2 46 53.4 47 C 52.6 46 52 44.4 52.2 42.6 Z" fill="url(#bdoBill)"/>
      <path d="M 51.2 42.2 C 52.4 43 54.4 43 55.6 42.2" stroke="#EEE6D6" strokeWidth="1" fill="none" opacity="0.85" filter="url(#bdoSoftB)"/>

      {/* feathered feet on the branch, dark talons */}
      <g filter="url(#bdoTex)">
        <path d="M 46 101.6 C 45.8 99 47.8 97.6 50.4 97.8 C 53 98 54.4 99.8 54 102.2 C 51.6 103 48.2 102.8 46 101.6 Z" fill="#DCD0BC"/>
        <path d="M 56 102 C 55.8 99.6 57.6 98.2 60 98.4 C 62.4 98.6 63.8 100.2 63.4 102.4 C 61.2 103.2 58 103 56 102 Z" fill="#CFC2AC"/>
      </g>
      <path d="M 47.2 102.2 q -0.4 1.4 0.4 2.4 M 50 102.8 q -0.2 1.4 0.4 2.4 M 53 102.6 q 0.2 1.4 0.8 2.2 M 57.4 102.6 q -0.2 1.4 0.4 2.4 M 60.4 103 q 0 1.4 0.6 2.2 M 62.8 102.6 q 0.4 1.2 1 2" stroke="#1A1412" strokeWidth="0.75" fill="none" strokeLinecap="round"/>
    </g>
  )
}

// ── Habitat: wooded swamp at dusk ───────────────────────────────────────────
// A swamp trunk with a flared, buttressed base.
function Trunk({ x, w, top = -5, base = 104, flare = 1.6, lean = 0, fill, filter }) {
  return <path d={`M ${x - w * flare * 0.5} ${base} C ${x - w * 0.6} ${base - 6} ${x - w * 0.5 + lean * 0.4} ${base - 14} ${x - w * 0.5 + lean * 0.6} ${base - 26} L ${x - w * 0.5 + lean} ${top} L ${x + w * 0.5 + lean} ${top} L ${x + w * 0.5 + lean * 0.6} ${base - 26} C ${x + w * 0.5 + lean * 0.4} ${base - 14} ${x + w * 0.6} ${base - 6} ${x + w * flare * 0.5} ${base} Z`} fill={fill} filter={filter}/>
}

function Swamp() {
  const r = rng(77)
  const sedges = []
  for (let k = 0; k < 4; k++) {
    const cx = [10, 34, 92, 112][k], cy = [114, 120, 117, 123][k]
    for (let i = 0; i < 14; i++) {
      const a = -90 + (r() - 0.5) * 70, L = 4 + r() * 6, t = a * Math.PI / 180
      sedges.push(<path key={`g${k}${i}`} d={`M ${cx + (r() - 0.5) * 5} ${cy} q ${Math.cos(t) * L * 0.4} ${Math.sin(t) * L * 0.6} ${Math.cos(t) * L} ${Math.sin(t) * L}`} stroke={r() < 0.5 ? '#3E4A34' : '#56603E'} strokeWidth="0.5" fill="none"/>)
    }
  }
  // old-man's-beard lichen hanging from the near branches
  const lichen = []
  for (let i = 0; i < 16; i++) {
    const x = 8 + r() * 30, y = 102 + r() * 2, L = 3 + r() * 5
    lichen.push(<path key={`l${i}`} d={`M ${x} ${y} q ${(r() - 0.5) * 1.6} ${L * 0.5} ${(r() - 0.5) * 1.2} ${L}`} stroke="#8C9A82" strokeWidth="0.35" fill="none" opacity="0.7"/>)
  }
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#bdoSky)"/>
      {/* far trunks dissolving in mist */}
      <g opacity="0.55">{[[4, 2.4], [16, 2], [27, 2.8], [41, 1.8], [52, 2.2], [88, 2.4], [100, 2], [113, 2.8]].map(([x, w], i) => <Trunk key={i} x={x} w={w} base={98} lean={(i % 2 ? 1 : -1) * 0.8} fill="#8A9496" filter="url(#bdoFar)"/>)}</g>
      <rect x="0" y="78" width="120" height="24" fill="url(#bdoMistBand)"/>
      {/* mid trunks, darker, a few bare limbs */}
      <g opacity="0.85">
        {[[22, 4.2, -1.4], [70, 3.6, 1], [96, 4.8, -0.8]].map(([x, w, l], i) => <Trunk key={i} x={x} w={w} base={102} lean={l} fill="#4E5752" filter="url(#bdoMid)"/>)}
        <g filter="url(#bdoMid)" stroke="#4E5752" fill="none" strokeLinecap="round">
          <path d="M 23 40 C 30 34 34 32 40 31 M 70.6 30 C 78 24 84 22 90 22 M 96 58 C 104 52 110 50 118 50" strokeWidth="1.2"/>
        </g>
      </g>
      {/* still black water with the evening light and trunk reflections */}
      <rect x="0" y="100" width="120" height="30" fill="url(#bdoWater)"/>
      <g filter="url(#bdoMid)" opacity="0.55">
        {[[22, 4.2], [70, 3.6], [96, 4.8]].map(([x, w], i) => <path key={i} d={`M ${x - w * 0.8} 102 L ${x + w * 0.8} 102 L ${x + w * 0.5} 124 L ${x - w * 0.5} 124 Z`} fill="#2A322E"/>)}
      </g>
      <path d="M 44 106 h 22 M 52 110 h 10 M 84 112 h 14" stroke="#D8CCB0" strokeWidth="0.6" opacity="0.35" strokeLinecap="round" filter="url(#bdoBlur)"/>
      <g filter="url(#bdoHair)">{sedges}</g>
      {/* near trunk at left from which the dead limb grows */}
      <g filter="url(#bdoTex)"><Trunk x={4} w={11} base={132} flare={1.3} lean={1} fill="url(#bdoBark)"/></g>
      <path d="M 1 0 C 1.4 40 1 90 0 130 M 6 0 C 6.4 50 6.2 100 7 130" stroke="#1E1C18" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <g filter="url(#bdoHair)">{lichen}</g>
    </g>
  )
}

export default function BarredOwl({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  // the head swivels a touch, as a listening owl does
  const turn = animated ? [0, 0, 0.3, 0.6, 0.6, 0.6, 0.3, 0, 0, -0.2, -0.2, 0][frame] : 0
  void pose

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Barred Owl">
      <defs>
        <linearGradient id="bdoSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A5666"/><stop offset="45%" stopColor="#7E8A90"/><stop offset="72%" stopColor="#C2B096"/><stop offset="100%" stopColor="#8C8C80"/></linearGradient>
        <linearGradient id="bdoMistBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D2C8B4" stopOpacity="0"/><stop offset="50%" stopColor="#D2C8B4" stopOpacity="0.55"/><stop offset="100%" stopColor="#B4B2A4" stopOpacity="0"/></linearGradient>
        <linearGradient id="bdoWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6E726A"/><stop offset="30%" stopColor="#3A4240"/><stop offset="100%" stopColor="#181E1E"/></linearGradient>
        <linearGradient id="bdoBark" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2A2620"/><stop offset="60%" stopColor="#4A443A"/><stop offset="100%" stopColor="#2E2A24"/></linearGradient>
        <linearGradient id="bdoBranch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7A7262"/><stop offset="100%" stopColor="#3A342C"/></linearGradient>
        <linearGradient id="bdoBody" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#EEE6D8"/><stop offset="55%" stopColor="#D8CCB8"/><stop offset="100%" stopColor="#A89880"/></linearGradient>
        <linearGradient id="bdoWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8A6A4C"/><stop offset="60%" stopColor="#6A4E36"/><stop offset="100%" stopColor="#4A3626"/></linearGradient>
        <linearGradient id="bdoTail" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7A5C42"/><stop offset="100%" stopColor="#4E3A28"/></linearGradient>
        <linearGradient id="bdoHead" x1="0" y1="0" x2="0.15" y2="1"><stop offset="0%" stopColor="#8E6E50"/><stop offset="66%" stopColor="#6E5038"/><stop offset="84%" stopColor="#B8A68A"/><stop offset="100%" stopColor="#D6CAB4"/></linearGradient>
        <radialGradient id="bdoDisc" cx="0.5" cy="0.5" r="0.6"><stop offset="0%" stopColor="#D8CCBA"/><stop offset="70%" stopColor="#BCAE98"/><stop offset="100%" stopColor="#9C8A72"/></radialGradient>
        <radialGradient id="bdoIris" cx="0.45" cy="0.4" r="0.6"><stop offset="0%" stopColor="#5A3A24"/><stop offset="100%" stopColor="#24140A"/></radialGradient>
        <linearGradient id="bdoBill" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#F2DC88"/><stop offset="100%" stopColor="#C8A440"/></linearGradient>
        <clipPath id="bdoFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="bdoBodyClip"><path d={BODY_D}/></clipPath>
        <clipPath id="bdoWingClip"><path d={WING_D}/></clipPath>
        <clipPath id="bdoHeadClip"><path d={HEAD_D}/></clipPath>
        <clipPath id="bdoDiscClip"><path d={DISC_D}/></clipPath>
        <filter id="bdoFar" x="-80%" y="-5%" width="260%" height="110%"><feGaussianBlur stdDeviation="1.3"/></filter>
        <filter id="bdoMid" x="-40%" y="-10%" width="180%" height="120%"><feGaussianBlur stdDeviation="0.6"/></filter>
        <filter id="bdoHair" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.2"/></filter>
        <filter id="bdoBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="bdoGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.4"/></filter>
        <filter id="bdoSoftB" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.3"/></filter>
        <filter id="bdoTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2" seed="5" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0 0.01  1.1 0 0 0 -0.45" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#bdoFrame)">
        {scene && <Swamp/>}
        {/* the dead, mossy limb */}
        <g filter="url(#bdoTex)">
          <path d={scene ? 'M 4 101.4 C 36 100.6 70 100 112 97.6 L 112 100.6 C 70 103 36 104.4 4 105.6 Z' : 'M 32 101.6 C 48 101 70 100.6 92 99.6 L 92 102.6 C 70 103.6 48 104.2 32 105 Z'} fill="url(#bdoBranch)"/>
        </g>
        <path d={scene ? 'M 6 101.4 C 36 100.6 70 100 110 97.8' : 'M 34 101.6 C 48 101 70 100.6 90 99.8'} stroke="#7C8C4E" strokeWidth="1.1" strokeDasharray="6 3 2 4 9 2" fill="none" opacity="0.7" strokeLinecap="round" filter="url(#bdoHair)"/>
        <g transform={`rotate(${turn} 54 100)`}><Perched blink={blink}/></g>
      </g>
    </svg>
  )
}
