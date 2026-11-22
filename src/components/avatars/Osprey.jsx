// Osprey (adult) — naturalistic technique (see BaldEagle.jsx pass 3).
//
// No outlined feathers: form comes from silhouette + gradient light + fine feTurbulence grain
// clipped to the plumage; feather detail only as soft, low-contrast pale tips.
// Field marks: white head with a bold dark eye-stripe running back to the nape and down the
// neck side; short shaggy nape; small black strongly hooked bill with blue-gray cere; yellow
// eye; clean white underparts with a faint streaky breast band; dark brown upperparts; long
// folded wings reaching past the tail; pale blue-gray feet.
// In flight (from below): long, narrow wings crooked at the wrist ("gull-wing M"), white
// underwing coverts, black carpal patches, dark covert bar, finely barred pale flight feathers
// with dusky tips; fish carried head-first, aligned with the body, gripped by both feet.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'osprey', poses: ['perch', 'fish'] }

const FOOT = '#B4BFC6'

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

function blade(key, x, y, a, l, w, fill) {
  const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t)
  const P = (u, v) => `${(x + u * c - v * s).toFixed(2)} ${(y + u * s + v * c).toFixed(2)}`
  return <path key={key} d={`M ${P(0, -w * 0.5)} L ${P(l * 0.78, -w * 0.5)} Q ${P(l * 1.02, -w * 0.25)} ${P(l, 0.15)} Q ${P(l * 0.96, w * 0.45)} ${P(l * 0.75, w * 0.5)} L ${P(0, w * 0.5)} Z`} fill={fill}/>
}

// ── Perched, side view facing left ───────────────────────────────────────────
function Perched({ blink }) {
  const r = rng(7)
  const tips = [], streaks = []
  for (let row = 0; row < 8; row++) for (let i = 0; i < 4; i++) {
    const x = 52 + i * 4.4 + row * 1.1 + (r() - 0.5) * 1.4, y = 45 + row * 5.2 + i * 1.7 + (r() - 0.5)
    tips.push(<path key={`t${row}${i}`} d={`M ${x - 2.2} ${y} q 2.3 3 4.6 0.5`} stroke="#9A8064" strokeWidth="0.5" fill="none" opacity={0.18 + r() * 0.12}/>)
  }
  for (let i = 0; i < 16; i++) {
    const x = 38 + (i % 8) * 2.4 + (r() - 0.5) * 1.2, y = 40.5 + Math.floor(i / 8) * 3.4 + (r() - 0.5) * 1.6
    streaks.push(<ellipse key={`s${i}`} cx={x} cy={y} rx="0.9" ry="1.5" fill="#8A6A4C" opacity={0.16 + r() * 0.14}/>)
  }
  return (
    <g>
      {/* short barred tail, under the long primaries */}
      <path d="M 62 94 L 71 96 L 74 116.4 C 71.4 118 67.4 118 64.6 116.6 Z" fill="url(#ospTail)"/>
      <path d="M 63 101 L 72 102.4 M 63.8 106.6 L 72.8 108 M 64.4 112 L 73.4 113.2" stroke="#3E3026" strokeWidth="1" opacity="0.4"/>
      <g filter="url(#ospTexW)">
        {/* white underparts, light from the upper left */}
        <path d="M 41 33 C 37.4 41 36 52 36.6 63 C 37.2 75 41 86 47.4 94 L 59 97 C 63 94 67 88 69 80 L 70 60 C 69 48 64 39 57 35 C 52 33 45 32 41 33 Z" fill="url(#ospBelly)"/>
        <g clipPath="url(#ospBreastClip)" filter="url(#ospBlur)">{streaks}</g>
        <path d="M 44 82 C 43.5 89 46 95 51 98.4 L 58.4 98.4 C 59.4 93 57.4 87 53.6 83 Z" fill="#E9E6DF"/>
        <path d="M 45.6 86 q 2 6 6 11 M 49.4 85.6 q 2 6 5 12" stroke="#B9B4AA" strokeWidth="0.5" fill="none" opacity="0.5"/>
      </g>
      <g filter="url(#ospTex)">
        {/* long folded wing, primaries crossing past the tail tip */}
        <path d="M 48 40 C 55 35 64 37 68.4 44 C 73.4 54 75.4 68 75.4 82 C 75.4 96 76.4 108 77.2 121 L 74.2 121.6 C 70 110 64.4 98 59.4 88 C 52.4 76 48 62 48 40 Z" fill="url(#ospWing)"/>
        <g clipPath="url(#ospWingClip)">{tips}</g>
        <path d="M 66 86 L 74.6 120 M 69 83 L 75.8 116 M 71.6 80 L 76.6 110 M 63 90 L 72.4 118" stroke="#120C07" strokeWidth="0.6" opacity="0.55"/>
        <path d="M 48 40 C 48 62 52.4 76 59.4 88" stroke="#0E0805" strokeWidth="1.6" fill="none" opacity="0.3" filter="url(#ospBlur)"/>
      </g>
      {/* pale blue-gray feet, black talons */}
      <path d="M 50.4 97.6 L 49.8 101.2 M 56 98 L 56.2 101.6" stroke={FOOT} strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M 46 102.4 C 47.6 100.4 50.4 100.2 52.6 101.6 M 52.8 102.8 C 54.8 101 57.8 101.2 59.6 102.8" stroke={FOOT} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 46 102.4 q -1.4 0.7 -1.1 2.3 M 52.6 101.6 q 0.8 1 0.2 2.4 M 59.6 102.8 q 1.2 0.8 0.8 2.2" stroke="#15100C" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <g transform="translate(52 40) scale(0.9) translate(-52 -40)">
      {/* head: small, flat-crowned, shaggy at the nape */}
      <path d="M 39.4 23.6 C 40.6 20 44 17.8 48.6 17.6 C 53 17.6 56.4 19.4 58 22.4 L 61.6 23.6 L 58.8 25.2 L 62.2 27.4 L 58.8 28.2 C 59.6 32 61.2 35.6 63.6 38.6 C 57 42 48 42.6 41.6 40 C 40.4 36.6 39.8 33 39.6 29.6 Z" fill="url(#ospHead)"/>
      <path d="M 45 19.6 l 1 2.2 M 48.4 19.2 l 1 2.4 M 51.6 19.8 l 1 2.2 M 54.4 21 l 1 2" stroke="#8A7460" strokeWidth="0.4" opacity="0.3" filter="url(#ospBlur)"/>
      {/* bold eye-stripe: lores → eye → nape → down the neck side */}
      <path d="M 39.4 26.2 C 42 25 45.4 25 48.4 25.8 C 52 26.4 55.6 26 58.8 26.8 C 59.8 31 61.4 35 63.6 38.6 L 60.8 39.6 C 58.4 36 56.6 32.6 54.8 30.6 C 51 30.2 47 29.8 44 29.6 C 42 29.4 40.4 28.8 39.4 28.2 Z" fill="url(#ospStripe)"/>
      <path d="M 39.4 23.8 C 41 22.6 44 22.4 46.4 23.8 C 44 23.6 41.6 24 40 25 Z" fill="#B9B3A6" opacity="0.8"/>
      {blink
        ? <path d="M 41.6 26.9 q 1.5 0.8 3 0" stroke="#D8D2C6" strokeWidth="0.8" fill="none"/>
        : <g>
            <ellipse cx="43.1" cy="26.8" rx="1.55" ry="1.4" fill="#EAC531"/>
            <circle cx="43.2" cy="26.9" r="0.75" fill="#0F0A06"/>
            <circle cx="42.8" cy="26.4" r="0.26" fill="#FFF"/>
          </g>}
      {/* bill: short, black, strongly hooked; blue-gray cere */}
      <path d="M 39.6 23.4 C 35.8 23.4 33 24.8 31.8 27.4 C 31 29.4 31.2 31.6 32.2 33 C 32.4 31.2 33.2 30 34.6 29.6 L 39.6 28.8 Z" fill="url(#ospBill)"/>
      <path d="M 34.6 29.6 L 39.6 28.8 L 39.4 30.8 C 37.2 31.4 35.6 31.1 34.6 29.6 Z" fill="#26262C"/>
      <path d="M 39.6 23.4 C 38.4 23.3 37.3 23.5 36.4 23.9 L 36.6 27.8 L 39.6 28.4 Z" fill="#8F9CA8"/>
      <path d="M 36.2 24.1 C 34.4 24.5 33 25.6 32.4 27.2" stroke="#7A808C" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      <ellipse cx="37.8" cy="25.6" rx="0.7" ry="0.4" fill="#3E4650"/>
      </g>
    </g>
  )
}

// ── Flying low with a fish, seen from below ──────────────────────────────────
// Long, narrow wing: arm pushed forward to a crooked wrist, hand swept back (the gull-wing M).
function UnderWing({ s }) {
  const X = (x) => 60 + s * x
  const fingers = [10.2, 11.4, 10.6, 9, 6.8].map((L, i) => {
    const a = 22 + i * 8.5
    return blade(`f${i}`, X(43.4), 45.6 + i * 2.25, s > 0 ? a : 180 - a, L, 2.15, i < 4 ? '#463F39' : '#6A635D')
  })
  const R = `M ${X(4)} 47 C ${X(12)} 43 ${X(20)} 38.4 ${X(28)} 37 C ${X(34)} 38.2 ${X(40)} 41.4 ${X(45)} 45 L ${X(45.6)} 56.4 C ${X(40)} 55.6 ${X(34)} 54.4 ${X(29.4)} 53.4 C ${X(20)} 56.2 ${X(12)} 58.6 ${X(4)} 60.6 Z`
  return (
    <g>
      {fingers}
      {/* pale, translucent flight feathers */}
      <path d={R} fill="url(#ospRemiges)"/>
      {/* fine barring across the flight feathers */}
      {[2.2, 4.4, 6.6].map((o, i) => <path key={`b${i}`} d={`M ${X(5)} ${60.4 - o} C ${X(12)} ${58.4 - o} ${X(20)} ${56 - o * 0.8} ${X(29.4)} ${53.2 - o * 0.6} C ${X(34)} ${54.2 - o * 0.7} ${X(40)} ${55.4 - o * 0.8} ${X(45)} ${56.2 - o * 0.9}`} stroke="#8D8B88" strokeWidth="0.4" fill="none" opacity="0.22" filter="url(#ospBlur)"/>)}
      {Array.from({ length: 9 }, (_, i) => <path key={`r${i}`} d={`M ${X(6 + i * 3.2)} ${53 - i * 0.7} L ${X(6.2 + i * 3.1)} ${60.2 - i * 0.8}`} stroke="#6E6A66" strokeWidth="0.3" opacity="0.18"/>)}
      {/* dusky trailing edge and primary tips */}
      <path d={`M ${X(4)} 60.6 C ${X(12)} 58.6 ${X(20)} 56.2 ${X(29.4)} 53.4 C ${X(34)} 54.4 ${X(40)} 55.6 ${X(45.6)} 56.4`} stroke="#5E5650" strokeWidth="1.5" fill="none" opacity="0.55" filter="url(#ospBlur)"/>
      <path d={`M ${X(34)} 38.6 C ${X(40)} 41.4 ${X(45)} 45 ${X(45)} 45 L ${X(45.6)} 56.4 C ${X(41)} 55.8 ${X(37)} 55 ${X(33.4)} 54.2 Z`} fill="#6E6862" opacity="0.32" filter="url(#ospBlur)"/>
      <path d={`M ${X(41)} 43.6 C ${X(43)} 46 ${X(45)} 52 ${X(45.6)} 56.4 L ${X(45.6)} 45.4 Z`} fill="#463F39" opacity="0.8"/>
      {/* white underwing coverts */}
      <path d={`M ${X(4)} 47 C ${X(12)} 43 ${X(20)} 38.4 ${X(28)} 37 C ${X(32)} 37.7 ${X(35)} 38.8 ${X(37.4)} 40.2 C ${X(34)} 44.4 ${X(31)} 46.8 ${X(28.4)} 48.4 C ${X(20)} 50.2 ${X(12)} 51.8 ${X(4)} 53.4 Z`} fill="url(#ospCoverts)"/>
      {Array.from({ length: 8 }, (_, i) => <path key={`c${i}`} d={`M ${X(6 + i * 3.4)} ${51.6 - i * 0.5} q ${s * 1.7} 1.5 ${s * 3.4} 0`} stroke="#A9A49A" strokeWidth="0.4" fill="none" opacity="0.45"/>)}
      {/* dark greater-covert bar running out to the black carpal patch */}
      <path d={`M ${X(5)} 53 C ${X(12)} 51.6 ${X(20)} 50 ${X(27.6)} 48.2`} stroke="#3A2C22" strokeWidth="1.5" fill="none" opacity="0.65" filter="url(#ospBlur)"/>
      <path d={`M ${X(26)} 41.2 C ${X(29)} 38.8 ${X(33)} 38.8 ${X(36.4)} 40.6 C ${X(34.6)} 43.4 ${X(31.4)} 46 ${X(27.4)} 47.6 C ${X(25.6)} 45.6 ${X(25.2)} 43 ${X(26)} 41.2 Z`} fill="#22180F"/>
    </g>
  )
}

function FishFlight() {
  return (
    <g transform="rotate(-14 60 58)">
      {/* short, barred tail */}
      <path d="M 56.2 66 L 63.8 66 L 66.4 82 C 62.6 83.6 57.4 83.6 53.6 82 Z" fill="url(#ospTailU)"/>
      <path d="M 55.6 71 L 64.4 71 M 55 75.4 L 65 75.4 M 54.2 79.6 L 65.8 79.6" stroke="#6E655C" strokeWidth="0.7" opacity="0.55"/>
      <g filter="url(#ospTexW)">
        <UnderWing s={-1}/><UnderWing s={1}/>
        <path d="M 55.4 44 C 55.4 40 57.4 38 60 38 C 62.6 38 64.6 40 64.6 44 L 65 58 C 64.6 64.6 62.6 68.4 60 68.8 C 57.4 68.4 55.4 64.6 55 58 Z" fill="url(#ospBellyU)"/>
        <path d="M 56.4 44.6 l 0.4 2 M 58.4 44 l 0.3 2.2 M 61.4 44 l -0.3 2.2 M 63.4 44.6 l -0.4 2" stroke="#8A6A4C" strokeWidth="0.7" opacity="0.35" strokeLinecap="round"/>
      </g>
      {/* fish, head-first, aligned with the body */}
      <g filter="url(#ospTexW)">
        <path d="M 60 48.4 C 62.6 50 64.2 54 64 60 C 63.8 68 62 74.6 60.8 79.4 L 64 86.4 C 62 85.8 60.8 84.6 60 83.4 C 59.2 84.6 58 85.8 56 86.4 L 59.2 79.4 C 58 74.6 56.2 68 56 60 C 55.8 54 57.4 50 60 48.4 Z" fill="url(#ospFish)"/>
      </g>
      <path d="M 57.4 54.6 C 58 56.4 58 58 57.2 59.6" stroke="#4E6460" strokeWidth="0.4" fill="none" opacity="0.6"/>
      <circle cx="57.9" cy="52.4" r="0.55" fill="#1A1C1C"/>
      <path d="M 58.2 60 C 59.4 66 59.6 72 59.6 78" stroke="#E8EEEB" strokeWidth="0.5" fill="none" opacity="0.6"/>
      {/* both feet clamped round it, one ahead of the other */}
      <path d="M 54.8 56.6 C 55.6 58.6 57 59.8 58.2 60.2 M 65.2 56.6 C 64.4 58.6 63 59.8 61.8 60.2 M 55.2 66.6 C 56 68.6 57.2 69.6 58.4 70 M 64.8 66.6 C 64 68.6 62.8 69.6 61.6 70" stroke={FOOT} strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <path d="M 58.2 60.2 l 1 -0.3 M 61.8 60.2 l -1 -0.3 M 58.4 70 l 1 -0.3 M 61.6 70 l -1 -0.3" stroke="#141110" strokeWidth="0.7" strokeLinecap="round"/>
      {/* head stretched forward: white, dark stripe on each side, small hooked bill */}
      <path d="M 55.6 41.6 C 55 37 56.6 32.8 60 32.2 C 63.4 32.8 65 37 64.4 41.6 C 61.6 40.6 58.4 40.6 55.6 41.6 Z" fill="url(#ospHead)"/>
      <path d="M 58.6 33.4 C 57.2 34.4 56.2 36.4 55.7 39 L 55.8 41.4 L 56.8 41.1 C 56.8 38.4 57.4 36 58.6 33.4 Z M 61.4 33.4 C 62.8 34.4 63.8 36.4 64.3 39 L 64.2 41.4 L 63.2 41.1 C 63.2 38.4 62.6 36 61.4 33.4 Z" fill="#2E2117"/>
      <path d="M 58.8 33 C 59.1 31 59.6 30 60 29.8 C 60.4 30 60.9 31 61.2 33 C 60.4 32.7 59.6 32.7 58.8 33 Z" fill="#26262C"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
function Treeline(seed, y, h) {
  const r = rng(seed)
  let d = `M 0 ${y + 4} L 0 ${y}`, x = 0
  while (x < 118) { const w = Math.min(2.2 + r() * 3, 120 - x), top = y - (h * 0.4 + r() * h); d += r() < 0.65 ? ` L ${x + w / 2} ${top} L ${x + w} ${y}` : ` Q ${x + w / 2} ${top - 1} ${x + w} ${y}`; x += w }
  return d + ` L 120 ${y + 4} Z`
}

function Estuary({ ripple }) {
  const r = rng(21)
  // salt-marsh grass: soft back row, then leaning tufts of curved blades in front
  const tuft = (key, x, base, h, cols, n) => {
    const out = []
    for (let k = 0; k < n; k++) {
      const lean = (r() - 0.5) * 7 + (k - n / 2) * 0.8, hh = h * (0.6 + r() * 0.5)
      out.push(<path key={`${key}${k}`} d={`M ${x + (r() - 0.5) * 2} ${base} q ${lean * 0.2} ${-hh * 0.6} ${lean} ${-hh}`} stroke={cols[k % cols.length]} strokeWidth={0.5 + r() * 0.4} fill="none" strokeLinecap="round"/>)
    }
    return out
  }
  const back = [], front = []
  for (let i = 0; i < 26; i++) back.push(...tuft(`b${i}`, i * 4.8 + r() * 2, 116, 7, ['#8E8A52', '#A49656'], 4))
  for (let i = 0; i < 18; i++) front.push(...tuft(`f${i}`, i * 7 + r() * 4, 131, 14 + r() * 6, ['#C2A660', '#9E8648', '#D4BC78', '#7E7040'], 7))
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#ospSky)"/>
      <g filter="url(#ospSoft)"><ellipse cx="30" cy="22" rx="20" ry="5" fill="#FFF" opacity="0.7"/><ellipse cx="92" cy="12" rx="14" ry="3.6" fill="#FFF" opacity="0.55"/></g>
      <path d="M 0 70 C 20 64 40 67 60 63 C 80 60 100 65 120 62 L 120 76 L 0 76 Z" fill="#A4B4BC"/>
      <g filter="url(#ospBlur)"><path d={Treeline(3, 75, 6)} fill="#5A6B5C"/></g>
      <rect x="0" y="76" width="120" height="54" fill="url(#ospWater)"/>
      <path d={`M ${6 + ripple} 82 h 16 M ${40 - ripple} 86 h 22 M ${80 + ripple} 81 h 18 M ${14 - ripple} 92 h 26 M ${62 + ripple} 96 h 24`} stroke="#E6EFF3" strokeWidth="0.6" opacity="0.5" strokeLinecap="round"/>
      {/* foreground salt-marsh grass */}
      <path d="M 0 130 L 0 114 C 20 111 40 113 60 111.4 C 80 110 100 112.6 120 111 L 120 130 Z" fill="url(#ospMarsh)"/>
      <g filter="url(#ospBlur)" opacity="0.85">{back}</g>
      <path d="M 0 130 L 0 120 C 30 118 60 120 120 118 L 120 130 Z" fill="#6E6434" opacity="0.6" filter="url(#ospSoft)"/>
      <g>{front}</g>
      {/* weathered snag rising from the marsh */}
      <g filter="url(#ospTexW)">
        <path d="M 96 130 C 97 110 96.4 90 95.6 72 C 95 58 96.4 44 98.6 30 L 100.2 26 L 101.4 31 L 103 28.6 C 102.4 44 102.4 58 103.4 72 C 104.2 90 105.4 110 107 130 Z" fill="url(#ospSnag)"/>
        <path d="M 102.6 50 C 108 45 113 43 119 43" stroke="#8D8479" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </g>
      <path d="M 98 40 C 97.6 60 98.4 80 99 100 M 100.6 46 C 100.4 66 101.4 90 102.6 122" stroke="#6E665C" strokeWidth="0.45" fill="none" opacity="0.6"/>
      <path d="M 103 34 C 102.6 56 103.4 80 105 112" stroke="#E2DCD2" strokeWidth="0.6" fill="none" opacity="0.5"/>
    </g>
  )
}

function SkyOverWater() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#ospSkyHi)"/>
      <g filter="url(#ospSoft)" opacity="0.85">
        <ellipse cx="96" cy="26" rx="22" ry="6" fill="#FFF"/>
        <ellipse cx="16" cy="88" rx="22" ry="6" fill="#F4F7FA"/>
      </g>
      <path d="M 0 112 C 30 110 60 112 120 109 L 120 118 L 0 118 Z" fill="#9FB0B7"/>
      <g filter="url(#ospBlur)"><path d={Treeline(9, 117, 5)} fill="#4F6152"/></g>
      <rect x="0" y="119" width="120" height="11" fill="url(#ospWater)"/>
      <path d="M 8 123 h 18 M 46 126 h 24 M 88 122.6 h 16" stroke="#E6EFF3" strokeWidth="0.5" opacity="0.5" strokeLinecap="round"/>
    </g>
  )
}

export default function Osprey({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const drift = animated ? [0, -0.3, -0.6, -0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8, 0.6, 0.3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Osprey">
      <defs>
        <linearGradient id="ospSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8FB6D4"/><stop offset="100%" stopColor="#E4EBEC"/></linearGradient>
        <linearGradient id="ospSkyHi" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#5E98C8"/><stop offset="100%" stopColor="#C4DCEA"/></linearGradient>
        <linearGradient id="ospWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#87A3B4"/><stop offset="100%" stopColor="#3F6479"/></linearGradient>
        <linearGradient id="ospMarsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A48E52"/><stop offset="100%" stopColor="#5E5A30"/></linearGradient>
        <linearGradient id="ospSnag" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#C9C1B5"/><stop offset="55%" stopColor="#9C9386"/><stop offset="100%" stopColor="#6C6459"/></linearGradient>
        <linearGradient id="ospBelly" x1="0" y1="0" x2="1" y2="0.4"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="55%" stopColor="#EFECE6"/><stop offset="100%" stopColor="#C6C0B5"/></linearGradient>
        <linearGradient id="ospBellyU" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#E2E4E3"/><stop offset="45%" stopColor="#F4F4F1"/><stop offset="100%" stopColor="#CDD0CF"/></linearGradient>
        <linearGradient id="ospWing" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#5A412C"/><stop offset="55%" stopColor="#36251A"/><stop offset="100%" stopColor="#1C130C"/></linearGradient>
        <linearGradient id="ospTail" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6A5848"/><stop offset="100%" stopColor="#8E7E6C"/></linearGradient>
        <linearGradient id="ospTailU" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#CFCFCB"/><stop offset="100%" stopColor="#E6E5E0"/></linearGradient>
        <linearGradient id="ospRemiges" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D9DBDA"/><stop offset="100%" stopColor="#B8BBBC"/></linearGradient>
        <linearGradient id="ospCoverts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F6F6F3"/><stop offset="100%" stopColor="#E0E2E0"/></linearGradient>
        <linearGradient id="ospStripe" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3A2A1C"/><stop offset="100%" stopColor="#24180F"/></linearGradient>
        <linearGradient id="ospBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3C3D44"/><stop offset="100%" stopColor="#141418"/></linearGradient>
        <linearGradient id="ospFish" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3E4E4C"/><stop offset="40%" stopColor="#7E9290"/><stop offset="70%" stopColor="#C9D4D0"/><stop offset="100%" stopColor="#EDF1EE"/></linearGradient>
        <radialGradient id="ospHead" cx="0.38" cy="0.4" r="0.85"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F3F0EA"/><stop offset="100%" stopColor="#DCD7CD"/></radialGradient>
        <clipPath id="ospFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="ospBreastClip"><path d="M 41 33 C 36.5 41 34.8 52 35.4 63 L 50 60 L 50 36 Z"/></clipPath>
        <clipPath id="ospWingClip"><path d="M 48 40 C 55 35 64 37 68.4 44 C 73.4 54 75.4 68 75.4 82 L 75 88 L 60 86 C 52.4 76 48 62 48 40 Z"/></clipPath>
        <filter id="ospSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="ospBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="ospTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.35" numOctaves="2" seed="6" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.5 0 0 0 -0.52" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        {/* lighter grain for white plumage so it reads as feathers, not dirt */}
        <filter id="ospTexW" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2 0.55" numOctaves="2" seed="2" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.4  0 0 0 0 0.38  0 0 0 0 0.35  0.6 0 0 0 -0.28" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#ospFrame)">
        {pose === 'fish' ? (
          <>
            {scene && <SkyOverWater/>}
            <g transform={`translate(0,${drift}) rotate(${drift * 1.2} 60 58)`}><FishFlight/></g>
          </>
        ) : (
          <>
            {scene && <Estuary ripple={drift * 2}/>}
            <path d={scene ? 'M 8 106 C 40 103 70 101 99 94' : 'M 34 105 C 50 103 64 101.6 78 99.8'} stroke="#8E8579" strokeWidth="4.4" fill="none" strokeLinecap="round"/>
            <path d={scene ? 'M 10 104.4 C 40 101.4 70 99.4 98 92.4' : 'M 36 103.4 C 50 101.6 64 100 77 98.4'} stroke="#CFC8BC" strokeWidth="0.8" fill="none" opacity="0.7"/>
            <Perched blink={blink}/>
          </>
        )}
      </g>
    </svg>
  )
}
