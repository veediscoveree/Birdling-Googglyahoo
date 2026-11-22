// Bald Eagle (adult) — naturalistic pass 3 (Jared: "too cartoonish").
//
// Technique: NO outlined feathers. Form comes from silhouette + gradient light + a fine noise
// texture (feTurbulence) multiplied over the plumage; feather detail is only hinted with soft,
// low-contrast pale tips. Proportions kept true: small flat-crowned head, angular deep bill with a
// straight culmen and sharp hook, brow shading a small eye, broad-shouldered upright body.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'bald_eagle', poses: ['perch', 'soar'] }

const WSH = '#C9C2B4'

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

function blade(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} L ${P(l * 0.8, -w * 0.5)} Q ${P(l * 1.02, -w * 0.3)} ${P(l, 0.1)} Q ${P(l * 0.98, w * 0.45)} ${P(l * 0.8, w * 0.5)} L ${P(0, w * 0.5)} Z`} fill={fill}/>
}

// ── Perched, side view facing left ───────────────────────────────────────────
function Perched({ blink }) {
  const r = rng(11)
  const tips = [], coverts = []
  for (let row = 0; row < 11; row++) for (let i = 0; i < 6; i++) {
    const x = 35 + i * 4.3 + (row % 2) * 2.1 + (r() - 0.5) * 1.8, y = 49 + row * 4.5 + (r() - 0.5) * 1.4
    tips.push(<path key={`t${row}${i}`} d={`M ${x - 1.8} ${y} q 1.8 2.2 3.6 0`} stroke="#8A6C50" strokeWidth="0.55" fill="none" opacity={0.28 + r() * 0.14}/>)
  }
  for (let row = 0; row < 6; row++) for (let i = 0; i < 5; i++) {
    const x = 50 + i * 4.6 + row * 1.5 + (r() - 0.5) * 1.2, y = 47 + row * 6 + i * 1.6 + (r() - 0.5)
    coverts.push(<path key={`c${row}${i}`} d={`M ${x - 2.3} ${y} q 2.6 3.4 5 0.6`} stroke="#9A7B5C" strokeWidth="0.6" fill="none" opacity={0.3 + r() * 0.15}/>)
  }
  return (
    <g>
      {/* tail */}
      <path d="M 60 97 L 70 99 L 73.5 119 C 69 121.6 63 121.6 59.5 119 Z" fill="url(#baeTail)"/>
      <path d="M 62.6 99 L 62.8 120 M 65.4 99.4 L 66.4 120.6 M 68 99.6 L 70 120" stroke={WSH} strokeWidth="0.4" opacity="0.7"/>
      <g filter="url(#baeTex)">
        {/* body */}
        <path d="M 40 43 C 35 49 33.4 58 35 68 C 36.5 78 41 88 47 96 L 60 99 C 64 99 68 96 70 90 L 73 74 C 74 60 70 48 62 41 C 55 38 46 39 40 43 Z" fill="url(#baeBody)"/>
        <g clipPath="url(#baeBodyClip)">{tips}</g>
        {/* trousers */}
        <path d="M 43.5 83 C 43.5 91 46.5 97 51.5 99.6 L 58.5 99.6 C 59.5 94 57.5 88 54 84 Z" fill="#33210F"/>
        <path d="M 46 88 q 2 6 6 10 M 50 87 q 2 6 5 11" stroke="#7A5E44" strokeWidth="0.5" fill="none" opacity="0.35"/>
        {/* folded wing */}
        <path d="M 46 49 C 50 42 58 39 63 42 C 70 48 74 60 74 74 C 74 86 72.5 97 71 107 C 67 103 62 96 58 88 C 52 78 47 64 46 49 Z" fill="url(#baeWingF)"/>
        <g clipPath="url(#baeWingClip)">{coverts}</g>
        <path d="M 62 78 L 69.6 104 M 65 76 L 70.6 100 M 68 73 L 71.6 95 M 59.4 82 L 67.4 102" stroke="#120B06" strokeWidth="0.6" opacity="0.55"/>
        {/* shadow where wing meets breast */}
        <path d="M 46 49 C 47 64 52 78 58 88" stroke="#0E0805" strokeWidth="1.6" fill="none" opacity="0.35" filter="url(#baeBlur)"/>
      </g>
      {/* feet */}
      <path d="M 49.4 99 L 48.8 102.2 M 55.6 99.4 L 55.8 102.6" stroke="#E0A422" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M 45 103.6 C 46.6 101.6 49.4 101.4 51.6 102.8 M 52.4 103.8 C 54.4 102 57.4 102.2 59.2 103.8" stroke="#E6AC28" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 45 103.6 q -1.4 0.7 -1.1 2.3 M 51.6 102.8 q 0.8 1 0.2 2.4 M 59.2 103.8 q 1.2 0.8 0.8 2.2" stroke="#15100C" strokeWidth="1" fill="none" strokeLinecap="round"/>
      {/* head + neck */}
      <path d="M 37.5 22.5 C 39 18.5 44 16.8 49 17.2 C 54.5 17.8 58 21.5 58.8 27 C 59.6 33 61.5 38.5 64 43 C 58 47.5 49 48.5 41.5 46 C 39.6 42.5 38.8 38.5 38.6 34.5 L 38 31 Z" fill="url(#baeHead)"/>
      {/* lanceolate neck feathers breaking onto the brown */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = 41.5 + i * 1.95, y = 44.6 + Math.sin(i * 1.3) * 1.2 - (i > 8 ? (i - 8) * 0.9 : 0)
        return <path key={i} d={`M ${x - 0.9} ${y - 2.5} L ${x + 0.2} ${y + 2.6 + (i % 3) * 0.9} L ${x + 1.1} ${y - 2.5} Z`} fill={i % 2 ? '#EFEBE2' : '#E2DCD0'}/>
      })}
      {/* soft shading: under chin, behind cheek, nape */}
      <path d="M 38.6 33 C 40 38 41 42 42 45.6 C 45 44 46 38 44 32 Z" fill="#A9A294" opacity="0.35" filter="url(#baeBlur)"/>
      <path d="M 50 24 C 54 28 56 34 58 41" stroke="#B5AE9F" strokeWidth="2.2" fill="none" opacity="0.4" filter="url(#baeBlur)"/>
      <path d="M 46 30 l 1.2 3 M 49 33 l 1.4 3.2 M 52 30 l 1.4 3.4 M 54.6 35 l 1.4 3.2 M 47.4 37.6 l 1.2 3" stroke="#BDB6A8" strokeWidth="0.4" opacity="0.7"/>
      {/* brow ridge + eye */}
      <path d="M 37.6 23.5 C 39.6 22.3 43.2 22.4 45.6 24.2 C 43 23.8 40.2 24.2 38.4 25.4 Z" fill="#8F8674"/>
      {blink
        ? <path d="M 39.6 25.8 q 1.5 0.8 3 0" stroke="#4A3A2A" strokeWidth="0.8" fill="none"/>
        : <g>
            <ellipse cx="41.1" cy="25.8" rx="1.55" ry="1.35" fill="#E6CF62"/>
            <circle cx="41.2" cy="25.9" r="0.72" fill="#0F0A06"/>
            <circle cx="40.8" cy="25.4" r="0.26" fill="#FFF"/>
            <path d="M 39.5 25 C 40.4 24.5 42 24.5 42.8 25" stroke="#3E3426" strokeWidth="0.5" fill="none"/>
          </g>}
      {/* bill: straight culmen, sharp hook, slim lower mandible */}
      <path d="M 37.8 22.8 C 34 22.3 30 23 27.3 25 C 25 26.8 24.2 29.8 24.6 33.2 C 25.6 31.6 26.8 30.9 28.4 30.7 L 38 30.6 Z" fill="url(#baeBill)"/>
      <path d="M 28.6 30.9 L 38 30.8 L 37.6 33 C 34 33.9 30.8 33.6 29.2 32.5 Z" fill="#B98518"/>
      <path d="M 37.4 23.4 C 33.6 23.1 30.2 23.8 27.8 25.6" stroke="#F7DD8A" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.9"/>
      <path d="M 26 27.4 C 25.2 29.4 25 31.2 25.2 32.4" stroke="#A8780F" strokeWidth="0.7" fill="none" opacity="0.7"/>
      <path d="M 35.4 23 C 35 25.6 35.1 28.2 35.5 30.6" stroke="#C99A22" strokeWidth="0.45" fill="none"/>
      <ellipse cx="33.6" cy="25.7" rx="0.95" ry="0.5" fill="#6E4D12" transform="rotate(-18 33.6 25.7)"/>
      <path d="M 38 30.8 L 41.2 30.4" stroke="#A39A88" strokeWidth="0.5"/>
    </g>
  )
}

// ── Soaring overhead, seen from the ground ───────────────────────────────────
function UnderWing({ s }) {
  const X = (x) => 60 + s * x
  const fingers = [9.5, 11.5, 12.5, 12, 11, 9.5, 7.5].map((L, i) => {
    const a = -13 + i * 6.2
    return blade(`f${i}`, X(45), 44 + i * 2.35, s > 0 ? a : 180 - a, L + 6.5, 2.7, '#1C130D')
  })
  return (
    <g>
      {fingers}
      {/* flight feathers (greyer), then darker coverts over the front half */}
      <path d={`M ${X(5)} 45 C ${X(15)} 42.6 ${X(28)} 41.4 ${X(38)} 41.8 C ${X(43)} 41.6 ${X(47)} 42 ${X(49.5)} 43 L ${X(49.5)} 60.4 C ${X(38)} 61.6 ${X(20)} 62.4 ${X(5)} 61 Z`} fill="url(#baeRemiges)"/>
      <path d={`M ${X(5)} 45 C ${X(15)} 42.6 ${X(28)} 41.4 ${X(38)} 41.8 C ${X(43)} 41.6 ${X(47)} 42 ${X(49.5)} 43 L ${X(49)} 50.5 C ${X(36)} 52.6 ${X(20)} 53.4 ${X(5)} 53 Z`} fill="url(#baeCoverts)"/>
      {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M ${X(8.5 + i * 3.8)} 53.6 L ${X(8.3 + i * 3.8)} 61.2`} stroke="#0F0905" strokeWidth="0.4" opacity="0.4"/>)}
      {Array.from({ length: 12 }, (_, i) => <path key={`c${i}`} d={`M ${X(6 + i * 3.6)} ${52.8 - i * 0.12} q ${s * 1.8} 1.8 ${s * 3.6} 0`} stroke="#8A6C50" strokeWidth="0.45" fill="none" opacity="0.3"/>)}
    </g>
  )
}

function Soaring() {
  return (
    <g transform="rotate(-9 60 58) translate(60 58) scale(0.86) translate(-60 -58)">
      <path d="M 55 70 L 65 70 L 71 86 C 65 89.6 55 89.6 49 86 Z" fill="url(#baeTail)"/>
      <path d="M 57.6 72 L 54 87.4 M 60 72 L 60 88.8 M 62.4 72 L 66 87.4" stroke={WSH} strokeWidth="0.4" opacity="0.7"/>
      <UnderWing s={-1}/><UnderWing s={1}/>
      <g filter="url(#baeTex)">
        <path d="M 53.6 44 C 53.6 40 56.4 38 60 38 C 63.6 38 66.4 40 66.4 44 L 67 61 C 66.6 67.6 63.6 71.8 60 72.2 C 56.4 71.8 53.4 67.6 53 61 Z" fill="url(#baeBelly)"/>
      </g>
      <path d="M 57.2 68 q 0.4 2.4 -0.3 4.2 M 62.8 68 q -0.4 2.4 0.3 4.2" stroke="#E0A422" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
      {/* head and neck stretched forward; bill foreshortened from below */}
      <path d="M 54.4 44 C 54 36 56.2 30.4 60 29.6 C 63.8 30.4 66 36 65.6 44 C 62.6 42.4 57.4 42.4 54.4 44 Z" fill="url(#baeHead)"/>
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${55.2 + i * 1.9} 41.4 l 0.9 3.4 l 0.9 -3.4 Z`} fill="#E8E3D8"/>)}
      <path d="M 58.2 31 C 58.7 28.2 59.3 26.6 60 26.4 C 60.7 26.6 61.3 28.2 61.8 31 C 60.6 30.6 59.4 30.6 58.2 31 Z" fill="url(#baeBill)"/>
    </g>
  )
}

function Sky() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#baeSky)"/>
      <g filter="url(#baeSoft)" opacity="0.85">
        <ellipse cx="22" cy="104" rx="26" ry="9" fill="#FFFFFF"/>
        <ellipse cx="40" cy="112" rx="22" ry="8" fill="#F4F7FA"/>
        <ellipse cx="98" cy="20" rx="20" ry="6" fill="#FFFFFF"/>
        <ellipse cx="108" cy="114" rx="16" ry="6" fill="#EEF3F7"/>
      </g>
    </g>
  )
}

function River() {
  const r = rng(5)
  let d = 'M 0 82 L 0 78', x = 0
  while (x < 118) { const w = Math.min(2.5 + r() * 3, 120 - x), top = 78 - (3 + r() * 7); d += r() < 0.6 ? ` L ${x + w / 2} ${top} L ${x + w} 78` : ` Q ${x + w / 2} ${top - 1.5} ${x + w} 78`; x += w }
  d += ' L 120 82 Z'
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#baeSkyLow)"/>
      <g filter="url(#baeSoft)"><ellipse cx="28" cy="20" rx="18" ry="5" fill="#FFF" opacity="0.7"/><ellipse cx="90" cy="14" rx="14" ry="4" fill="#FFF" opacity="0.6"/></g>
      <path d="M 0 72 C 22 64 46 69 70 64 C 90 60 106 66 120 63 L 120 80 L 0 80 Z" fill="#9AACBA"/>
      <g filter="url(#baeBlur)"><path d={d} fill="#4F5F4E"/></g>
      <path d="M 0 80 C 30 78.4 70 80.6 120 78.6 L 120 83 L 0 83 Z" fill="#9B6B3E" opacity="0.6"/>
      <rect x="0" y="82" width="120" height="48" fill="url(#baeWater)"/>
      <path d="M 6 92 h 14 M 34 96 h 22 M 78 91 h 18 M 12 106 h 26 M 66 110 h 30 M 26 121 h 18 M 88 124 h 20" stroke="#E4EEF4" strokeWidth="0.7" opacity="0.45" strokeLinecap="round"/>
    </g>
  )
}

export default function BaldEagle({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const drift = animated ? [0, -0.3, -0.6, -0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8, 0.6, 0.3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Bald Eagle">
      <defs>
        <linearGradient id="baeSky" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#5C9BD0"/><stop offset="100%" stopColor="#A9CDE8"/></linearGradient>
        <linearGradient id="baeSkyLow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8DB9DC"/><stop offset="100%" stopColor="#DDE8EE"/></linearGradient>
        <linearGradient id="baeWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C99AC"/><stop offset="100%" stopColor="#3E6178"/></linearGradient>
        <linearGradient id="baeBody" x1="0" y1="0" x2="1" y2="0.9"><stop offset="0%" stopColor="#5E432D"/><stop offset="45%" stopColor="#3B2717"/><stop offset="100%" stopColor="#1E130B"/></linearGradient>
        <linearGradient id="baeWingF" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#4A3220"/><stop offset="60%" stopColor="#2C1C10"/><stop offset="100%" stopColor="#170E08"/></linearGradient>
        <linearGradient id="baeBelly" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4A3321"/><stop offset="100%" stopColor="#24170D"/></linearGradient>
        <linearGradient id="baeCoverts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A3321"/><stop offset="100%" stopColor="#2E1E12"/></linearGradient>
        <linearGradient id="baeRemiges" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2A1E16"/><stop offset="100%" stopColor="#3A302A"/></linearGradient>
        <radialGradient id="baeHead" cx="0.38" cy="0.3" r="0.8"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="60%" stopColor="#F1EDE4"/><stop offset="100%" stopColor="#CFC8BA"/></radialGradient>
        <linearGradient id="baeBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F2C84C"/><stop offset="100%" stopColor="#D2971C"/></linearGradient>
        <linearGradient id="baeTail" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#DDD7CB"/><stop offset="50%" stopColor="#F3F0E8"/><stop offset="100%" stopColor="#FFFFFF"/></linearGradient>
        <clipPath id="baeFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="baeBodyClip"><path d="M 40 43 C 35 49 33.4 58 35 68 C 36.5 78 41 88 47 96 L 60 99 L 58 88 C 52 78 47 64 46 49 Z"/></clipPath>
        <clipPath id="baeWingClip"><path d="M 46 49 C 50 42 58 39 63 42 C 70 48 74 60 74 74 C 74 80 73.5 84 73 88 L 60 84 C 52 76 47 64 46 49 Z"/></clipPath>
        <filter id="baeSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="baeBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        {/* fine feather-grain: dark noise multiplied over the plumage, clipped to it */}
        <filter id="baeTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.35" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.5 0 0 0 -0.52" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#baeFrame)">
        {pose === 'soar' ? (
          <>
            {scene && <Sky/>}
            <g transform={`translate(0,${drift}) rotate(${drift * 1.2} 60 58)`}><Soaring/></g>
          </>
        ) : (
          <>
            {scene && <River/>}
            {scene && <path d="M 99 130 L 97 66 C 96 54 98 42 101 30 L 104 30 C 102 44 101 56 102 66 L 105 130 Z" fill="#7B6C5C"/>}
            {scene && <path d="M 99.5 50 C 105 44 111 42 117 42.4" stroke="#7B6C5C" strokeWidth="2.2" fill="none" strokeLinecap="round"/>}
            {scene && <path d="M 100 34 l 1 30 M 102.6 40 l 0.6 28" stroke="#5F5244" strokeWidth="0.5"/>}
            <path d={scene ? 'M 10 107 C 40 104 70 102 98.5 95' : 'M 34 106 C 50 104 64 102.4 78 100.6'} stroke="#6B5A49" strokeWidth="4.4" fill="none" strokeLinecap="round"/>
            <path d={scene ? 'M 18 105.8 l 7 -0.6 M 76 100.4 l 8 -1.4' : 'M 40 104.6 l 6 -0.6 M 64 101.8 l 8 -1'} stroke="#8D7C6A" strokeWidth="0.8"/>
            <Perched blink={blink}/>
          </>
        )}
      </g>
    </svg>
  )
}
