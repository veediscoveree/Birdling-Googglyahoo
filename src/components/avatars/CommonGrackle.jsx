// Common Grackle (adult male, "Bronzed" form of the Northeast) — naturalistic technique of
// BaldEagle.jsx / CommonRaven.jsx, with slightly cleaner shapes for a smaller bird.
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to the
// plumage; iridescence is painted as light (soft blurred sheen), never as lines.
// Field marks: IRIDESCENT BLUE-PURPLE HOOD sharply contrasting with a BRASSY-BRONZE body; staring
// PALE YELLOW EYE; LONG, POINTED, slightly decurved black bill about as long as the head; slim
// body; wings short (tips reach only the tail base); LONG, graduated, KEEL-SHAPED tail held in a V;
// long black legs.
// Poses: 'strut' — walking a park lawn, chest out, tail keeled; 'perch' — the "bill-up" display on a
// cattail: neck stretched, bill pointed at the sky, sleek plumage, keeled tail hanging below.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'common_grackle', poses: ['strut', 'perch'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }
const f2 = (v) => v.toFixed(2)

// ── Strutting on a lawn, side view facing left ───────────────────────────────
const S_BODY = 'M 33.4 42 C 34 37.4 38 34.6 42.6 34.6 C 47 34.6 50 37 51.2 41 C 52.6 46 56 50 62 53 C 68 56 73 59.6 77.4 63 L 78.4 67.6 C 72 72 65 76 58 77.6 C 51 78.6 45 76 42 71 C 39.2 66.4 38.2 60 37.6 55 C 37 51 35.6 49 34 47.6 C 33 46 33 44 33.4 42 Z'
const S_HOOD = 'M 31 30 L 54 30 C 52 40 50 46 50.6 50 C 46 56 42.6 62 42 72 L 30 72 Z'
const S_WING = 'M 50 47 C 57 44.6 66 47.6 72 52.6 C 77 57 81 61.4 84.6 66.4 L 82.4 68.4 C 76 67.6 70 67 65 66 C 57 64 52 57 50 47 Z'
const S_TNEAR = 'M 75 62.6 C 85 63.2 95 63.6 105 63.4 C 108 65 110.6 68 111.2 71 C 110.6 72.8 109 73.6 107 73.4 C 97 72 87 70 78.4 68.6 Z'
const S_TFAR = 'M 75 61.6 C 85 59.8 95 58.8 103.6 59.6 C 105 60.4 105.4 62 105 63.4 C 95 63.6 85 63.2 75 62.6 Z'

function Strut({ blink, sheen, step }) {
  const rear = step ? 'M 62.4 76.4 L 67.4 88 M 67.4 88.2 L 61.8 89.8 M 67.4 88.2 L 63.6 90.6 M 67.4 88.2 L 70.6 89.2'
    : 'M 62.4 76.4 L 66.4 88.8 M 66.4 89 L 60.8 90.2 M 66.4 89 L 62.8 90.8 M 66.4 89 L 69.8 90'
  return (
    <g>
      <ellipse cx="58" cy="90.4" rx="17" ry="1.7" fill="#1A2010" opacity="0.35" filter="url(#grkBlur)"/>
      {/* long black legs, mid-stride */}
      <g stroke="#0A0A0C" strokeLinecap="round" fill="none">
        <path d={rear} strokeWidth="1.5" stroke="#060607"/>
        <path d="M 55 76.8 L 50.6 89" strokeWidth="1.8"/>
        <path d="M 50.6 89.2 L 44.6 89.8 M 50.6 89.2 L 46.6 90.8 M 50.6 89.2 L 54.4 90" strokeWidth="1.1"/>
      </g>
      {/* keeled tail: far vane rising inside the V, near vane dropping to the keel */}
      <g filter="url(#grkTex)">
        <path d={S_TFAR} fill="url(#grkTailIn)"/>
        <path d={S_TNEAR} fill="url(#grkTail)"/>
        <g clipPath="url(#grkTailClip)">
          <path d="M 78 66.6 C 88 68.6 98 70.6 108.6 72.8 M 77 65 C 88 66.6 99 67.8 110.4 69.6 M 76 63.8 C 87 64.8 98 65.4 107.4 66" stroke="#05040A" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M 80 67.4 C 90 69 100 70.4 108 71.6" stroke="#5A4A86" strokeWidth="1.8" fill="none" opacity={sheen * 0.45} filter="url(#grkGlow)"/>
        </g>
        <path d="M 76 61.8 C 85 60.2 95 59.2 103.4 59.8" stroke="#6A64A8" strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M 76 62.6 C 85 63.2 95 63.6 105 63.4" stroke="#000" strokeWidth="0.6" fill="none" opacity="0.5"/>
      </g>
      <g filter="url(#grkTex)">
        <path d={S_BODY} fill="url(#grkBodyS)"/>
        <g clipPath="url(#grkBodyClipS)">
          {/* bronze gloss on back and flanks */}
          <g filter="url(#grkGlow)">
            <path d="M 52 44 C 56 50 64 54 76 61" stroke="#9A7A3A" strokeWidth="3" fill="none" opacity={sheen * 0.9}/>
            <path d="M 44 70 C 50 75 58 76 66 73" stroke="#7A5E2C" strokeWidth="3" fill="none" opacity={sheen * 0.7}/>
          </g>
          {/* iridescent blue-purple hood, sharply set off from the bronze */}
          <path d={S_HOOD} fill="url(#grkHood)" filter="url(#grkEdge)"/>
          <g filter="url(#grkGlow)">
            <path d="M 35.4 38.6 C 38 35.6 42 35 45.6 35.6 C 48.4 36.2 50.4 38.4 51 41.6" stroke="#5C7AD8" strokeWidth="2.2" fill="none" opacity={Math.min(1, sheen * 1.4)}/>
            <path d="M 39.4 52 C 39.6 58 40.6 63 42.6 67" stroke="#7A4ABA" strokeWidth="2.4" fill="none" opacity={sheen * 0.9}/>
            <path d="M 45 46 C 47 44 49 44 50.6 46" stroke="#3A9AA8" strokeWidth="1.6" fill="none" opacity={sheen * 0.5}/>
          </g>
          <path d="M 48 80 C 58 81 68 78 78 70 L 80 82 L 44 84 Z" fill="#000" opacity="0.45" filter="url(#grkGlow)"/>
        </g>
        {/* short folded wing, tips reaching only the tail base */}
        <path d={S_WING} fill="url(#grkWing)"/>
        <g clipPath="url(#grkWingClipS)">
          <path d="M 52 47.6 C 59 45.6 66 48 72 53" stroke="#B08A44" strokeWidth="1.6" fill="none" opacity={sheen * 0.8} filter="url(#grkGlow)"/>
          <path d="M 56 54 C 64 53 71 56.6 79 63 C 71 61.6 63 60 57 59 Z" fill="#6A4E8E" opacity={sheen * 0.45} filter="url(#grkGlow)"/>
          <path d="M 68 66.6 L 83.4 67.4 M 70 64.6 L 83 66 M 72.6 62.6 L 82 64.4" stroke="#050408" strokeWidth="0.5" opacity="0.6"/>
        </g>
        <path d="M 50 47.4 C 52 57.4 58 64 66 66.4" stroke="#000" strokeWidth="1.2" fill="none" opacity="0.4" filter="url(#grkBlur)"/>
        <path d="M 52.4 72.6 C 53 76 54.4 78 56.4 78.4 C 57.4 76.4 57.2 74.2 56.2 72.4 Z" fill="#0E0B08"/>
      </g>
      {/* pale yellow eye — the grackle's stare */}
      {blink
        ? <path d="M 36.3 42.6 q 1.3 0.8 2.6 0" stroke="#4A4070" strokeWidth="0.7" fill="none"/>
        : <g>
            <circle cx="37.6" cy="42.6" r="1.55" fill="#F2E89A"/>
            <circle cx="37.6" cy="42.6" r="1.55" fill="none" stroke="#B8A04A" strokeWidth="0.25"/>
            <circle cx="37.7" cy="42.7" r="0.55" fill="#070606"/>
            <circle cx="37.1" cy="42.1" r="0.3" fill="#FFF" opacity="0.9"/>
          </g>}
      {/* long, pointed, slightly decurved bill */}
      <path d="M 34.6 40.6 C 29 41.4 23 43.6 17.4 46.8 C 16.9 47.1 16.9 47.5 17.4 47.6 L 34.2 46 Z" fill="url(#grkBill)"/>
      <path d="M 17.6 47.6 L 34.2 46 L 34.2 48.2 C 28 48.8 22 48.6 17.6 47.6 Z" fill="#0B0A0E"/>
      <path d="M 33.4 41.2 C 28 42 22.6 44 18.2 46.6" stroke="#8890AC" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M 18 47.6 L 33.6 46.1" stroke="#3A3E50" strokeWidth="0.35"/>
    </g>
  )
}

// ── "Bill-up" display on a cattail ───────────────────────────────────────────
const P_BODY = 'M 50.6 39.6 C 51.4 36.4 54.2 34.8 57 35.4 C 60 36 61.6 38.8 61.6 42.4 C 61.8 47.6 63 52.6 66.6 57.4 C 71 63 73.6 70 74.6 77.6 L 75.4 85.6 L 70.6 88.8 C 64.4 89.6 58.4 87.2 55.4 81.8 C 52.2 76 51.2 68 51.6 60 C 52 53 51.4 47.6 50.2 44.6 C 49.8 43 50 41.2 50.6 39.6 Z'
const P_HOOD = 'M 44 30 L 64 30 C 62.6 40 63 48 66 54 C 60 58 55.6 64 54 74 L 44 74 Z'
const P_WING = 'M 59.6 54 C 64.6 53.6 69.4 59.6 72.2 66.6 C 75 73.6 77 80 78.2 86.2 L 75.8 87.4 C 70.6 82 65 76 62 70 C 59 64 58.4 59 59.6 54 Z'
const P_TNEAR = 'M 74.6 83.6 C 80 93.6 85.4 104 91 115.4 C 90.6 118.8 88.2 120.8 84.8 121 C 80.2 112 74.8 100.6 69.8 89.4 Z'
const P_TFAR = 'M 75.4 83 C 81 92.6 87.4 102.6 94 112.6 L 91 115.4 C 85.4 104 80 93.6 74.6 83.6 Z'

function Display({ blink, sheen }) {
  return (
    <g>
      <g filter="url(#grkTex)">
        <path d={P_TFAR} fill="url(#grkTailIn)"/>
        <path d={P_TNEAR} fill="url(#grkTailP)"/>
        <g clipPath="url(#grkTailClipP)">
          <path d="M 72 86 C 78 98 82 108 85.6 120.6 M 73.4 85 C 79.6 96.4 84.6 106.6 88.4 118.6 M 74.4 84.4 C 80.6 95 86 105 90.4 116.4" stroke="#05040A" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M 73 88 C 78 98 82 106 86 116" stroke="#6A4E9A" strokeWidth="2.2" fill="none" opacity={sheen * 0.55} filter="url(#grkGlow)"/>
        </g>
        <path d="M 75.6 83.4 C 81.4 93 87.6 102.8 93.8 112.6" stroke="#5E5A9A" strokeWidth="0.6" fill="none" opacity="0.5"/>
      </g>
      {/* feet clasping the top of the cattail head */}
      <g stroke="#0A0A0C" strokeLinecap="round" fill="none">
        <path d="M 60.6 86.6 L 62.6 94.4 M 66 87.6 L 66.4 95.2" strokeWidth="1.6"/>
        <path d="M 62.6 94.6 L 59.4 96.6 M 62.6 94.6 L 66.8 95.6 M 66.4 95.4 L 63.2 97.2 M 66.4 95.4 L 70 96.6" strokeWidth="1.1"/>
      </g>
      <g filter="url(#grkTex)">
        <path d={P_BODY} fill="url(#grkBodyP)"/>
        <g clipPath="url(#grkBodyClipP)">
          <g filter="url(#grkGlow)">
            <path d="M 62.4 48 C 64 54 68 58 71.6 64 C 74 69 75 76 75.2 84" stroke="#9A7A3A" strokeWidth="3" fill="none" opacity={sheen * 0.9}/>
            <path d="M 54 72 C 55 79 58 84 64 87" stroke="#7A5E2C" strokeWidth="3" fill="none" opacity={sheen * 0.7}/>
          </g>
          <path d={P_HOOD} fill="url(#grkHoodP)" filter="url(#grkEdge)"/>
          <g filter="url(#grkGlow)">
            <path d="M 52.6 38 C 54.4 35.8 57.6 35.6 59.8 37.4 C 61.4 39 61.6 42 61.8 45.6 C 62 50 63 53 64.6 56" stroke="#5C7AD8" strokeWidth="2.2" fill="none" opacity={Math.min(1, sheen * 1.4)}/>
            <path d="M 52.4 50 C 52.4 57 52.6 63 53.8 68" stroke="#7A4ABA" strokeWidth="2.4" fill="none" opacity={sheen * 0.9}/>
          </g>
          <path d="M 54 84 C 60 90 68 90 76 84 L 78 94 L 50 94 Z" fill="#000" opacity="0.45" filter="url(#grkGlow)"/>
        </g>
        <path d={P_WING} fill="url(#grkWingP)"/>
        <g clipPath="url(#grkWingClipP)">
          <path d="M 60.4 55.6 C 64.6 55.4 68.4 60 71 66" stroke="#B08A44" strokeWidth="1.6" fill="none" opacity={sheen * 0.8} filter="url(#grkGlow)"/>
          <path d="M 63 62 C 67 66 71 72 74.6 80 C 70 75 66.4 70 63.4 66 Z" fill="#6A4E8E" opacity={sheen * 0.45} filter="url(#grkGlow)"/>
          <path d="M 70 78 L 77 86.6 M 71.6 75.6 L 77.4 84 M 72.6 72.6 L 76.6 80.6" stroke="#050408" strokeWidth="0.5" opacity="0.6"/>
        </g>
      </g>
      {blink
        ? <path d="M 54.2 41.6 q 1.3 0.8 2.6 0" stroke="#4A4070" strokeWidth="0.7" fill="none"/>
        : <g>
            <circle cx="55.6" cy="41.4" r="1.55" fill="#F2E89A"/>
            <circle cx="55.6" cy="41.4" r="1.55" fill="none" stroke="#B8A04A" strokeWidth="0.25"/>
            <circle cx="55.7" cy="41.5" r="0.55" fill="#070606"/>
            <circle cx="55.1" cy="40.9" r="0.3" fill="#FFF" opacity="0.9"/>
          </g>}
      {/* the long bill pointed at the sky */}
      <path d="M 54 38.4 C 52.6 33.6 51.2 29 50 24.4 C 49.8 23.8 50.2 23.6 50.4 24.2 L 51.4 41 Z" fill="url(#grkBillP)"/>
      <path d="M 50 24.4 L 51.4 41 L 49.4 42.6 C 48.8 36 48.9 30 50 24.4 Z" fill="#0B0A0E"/>
      <path d="M 53.2 37.8 C 52 33.4 50.9 29.4 50.2 25.4" stroke="#8890AC" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.75"/>
    </g>
  )
}

// ── Habitat ──────────────────────────────────────────────────────────────────
function Blades(x0, x1, y0, y1, n, seed, cols, h = 3.4, w = 0.5) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), hh = h * (0.6 + r() * 0.8) * (0.6 + (y - y0) / Math.max(1, y1 - y0) * 0.6), lean = (r() - 0.5) * 2.4
    return <path key={i} d={`M ${f2(x)} ${f2(y)} q ${f2(lean * 0.3)} ${f2(-hh * 0.5)} ${f2(lean)} ${f2(-hh)}`} stroke={cols[i % cols.length]} strokeWidth={w} fill="none" strokeLinecap="round" opacity={0.6 + r() * 0.4}/>
  })
}

// Long cattail / reed leaves: tapering curved blades.
function Leaves(x0, x1, yb, n, seed, cols, hmin, hmax, wid = 1.6) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + r() * (x1 - x0), h = hmin + r() * (hmax - hmin), bend = (r() - 0.5) * h * 0.5, w = wid * (0.7 + r() * 0.6)
    const tx = x + bend, ty = yb - h
    return <path key={i} d={`M ${f2(x - w)} ${yb} Q ${f2(x - w * 0.4 + bend * 0.2)} ${f2(yb - h * 0.6)} ${f2(tx)} ${f2(ty)} Q ${f2(x + w * 0.4 + bend * 0.3)} ${f2(yb - h * 0.6)} ${f2(x + w)} ${yb} Z`} fill={cols[i % cols.length]}/>
  })
}

function ParkLawn() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#grkSkyS)"/>
      {/* far trees across a pond, soft and hazy */}
      <g filter="url(#grkLeafy)">
        <path d="M -6 54 C -4 36 8 28 20 32 C 26 22 42 22 48 32 C 56 26 70 28 72 40 C 80 32 96 30 102 38 C 110 30 124 34 126 54 Z" fill="#7E8E66"/>
        <path d="M 30 54 C 34 42 46 38 54 44 C 62 38 74 42 74 54 Z" fill="#62744E"/>
      </g>
      <rect x="0" y="50" width="120" height="7" fill="url(#grkPond)"/>
      <path d="M 12 52.6 h 16 M 50 54.4 h 22 M 88 52 h 14" stroke="#F2F4F0" strokeWidth="0.45" opacity="0.6" strokeLinecap="round"/>
      <g filter="url(#grkGrass)">
        <path d="M 0 56.4 C 30 55.6 80 56.2 120 55.6 L 120 130 L 0 130 Z" fill="url(#grkLawn)"/>
      </g>
      {/* dappled light and shade across the lawn */}
      <g filter="url(#grkSoft)">
        <ellipse cx="24" cy="76" rx="26" ry="5" fill="#2E4220" opacity="0.4"/>
        <ellipse cx="96" cy="116" rx="30" ry="8" fill="#2E4220" opacity="0.45"/>
        <ellipse cx="70" cy="96" rx="34" ry="6" fill="#C8D48A" opacity="0.25"/>
      </g>
      <g opacity="0.7">{Blades(0, 120, 60, 98, 170, 3, ['#5A7836', '#7A9648', '#46602A'], 2.4, 0.4)}</g>
      <g>{Blades(0, 120, 100, 130, 140, 12, ['#4A6A2C', '#6A8A3E', '#3A5422'], 4.6, 0.6)}</g>
      <path d="M 86 108 c 1.2 -1 2.8 -1 3.4 0 c -1 1 -2.4 1 -3.4 0 Z M 14 118 c 1.2 -1 2.8 -1 3.4 0 c -1 1 -2.4 1 -3.4 0 Z" fill="#EDE6C8" opacity="0.8"/>
      <circle cx="87.7" cy="108" r="0.5" fill="#E6B83A"/>
      <circle cx="15.7" cy="118" r="0.5" fill="#E6B83A"/>
    </g>
  )
}

function Marsh() {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#grkSkyP)"/>
      <g filter="url(#grkSoftBig)" opacity="0.75">
        <ellipse cx="90" cy="22" rx="22" ry="5" fill="#FFF"/>
        <ellipse cx="20" cy="34" rx="16" ry="3.6" fill="#FBF6EE"/>
      </g>
      {/* distant tree line and open water */}
      <g filter="url(#grkLeafy)"><path d="M -6 72 C 0 62 12 60 22 64 C 30 56 46 58 52 64 C 62 58 78 60 84 66 C 94 58 110 60 126 66 L 126 76 L -6 76 Z" fill="#8A9478"/></g>
      <rect x="0" y="74" width="120" height="16" fill="url(#grkWater)"/>
      <path d="M 6 80 h 20 M 40 84 h 14 M 96 79 h 18 M 70 87 h 16" stroke="#F4F6F2" strokeWidth="0.45" opacity="0.6" strokeLinecap="round"/>
      {/* reed bed in three depths: hazy far, mid, crisp near */}
      <g filter="url(#grkBlurL)" opacity="0.7">{Leaves(0, 120, 92, 40, 4, ['#A6A070', '#B4AA78', '#8E9464'], 8, 18, 1.2)}</g>
      <rect x="0" y="89" width="120" height="41" fill="url(#grkReed)"/>
      <g filter="url(#grkBlurL)" opacity="0.8">{Leaves(-4, 124, 118, 50, 14, ['#8A8A5A', '#A09A6A', '#6E7848'], 14, 28, 1.4)}</g>
      <g filter="url(#grkBlur)">{Leaves(-4, 124, 132, 34, 9, ['#6E7A46', '#8A8E54', '#5A6A3A', '#9A9662'], 22, 40, 2)}</g>
      {/* the cattail the grackle has claimed */}
      <path d="M 66 96 C 66.4 110 66.2 120 66.6 132" stroke="#7A7A48" strokeWidth="1.8" fill="none"/>
      <path d="M 66 96 L 66.4 88" stroke="#8A7E58" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M 62.4 99.4 C 62 97 63.6 95.6 66 95.6 C 68.4 95.6 70 97 69.8 99.4 C 70.4 106 70.6 114 70.2 121 C 70 125.6 68.4 127.6 66 127.6 C 63.6 127.6 62 125.6 61.8 121 C 61.4 114 61.6 106 62.4 99.4 Z" fill="url(#grkCattail)" filter="url(#grkCattailTex)"/>
      <path d="M 63.6 100 C 63.1 107 63.1 115 63.6 122" stroke="#9A7454" strokeWidth="1.1" fill="none" opacity="0.4" filter="url(#grkBlur)"/>
      <g>{Leaves(40, 120, 132, 6, 21, ['#5E6E38', '#76844A', '#4C5C2E'], 34, 52, 2.6)}</g>
      <g>{Leaves(-2, 34, 132, 4, 33, ['#5E6E38', '#76844A'], 40, 62, 2.6)}</g>
    </g>
  )
}

export default function CommonGrackle({ size = 120, animated = false, style = {}, pose = 'strut', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 360); return () => clearInterval(id) }, [animated])
  const blink = animated && frame === 7
  const sheen = animated ? [0.55, 0.64, 0.74, 0.82, 0.74, 0.64, 0.55, 0.46, 0.4, 0.36, 0.4, 0.46][frame] : 0.62
  const step = animated ? (frame % 6 < 3 ? 1 : 0) : 1
  const perch = pose === 'perch'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Common Grackle">
      <defs>
        <linearGradient id="grkSkyS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A9C2D4"/><stop offset="100%" stopColor="#DCE2D6"/></linearGradient>
        <linearGradient id="grkSkyP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8EB0CE"/><stop offset="100%" stopColor="#E6E2D2"/></linearGradient>
        <linearGradient id="grkPond" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A8BCC4"/><stop offset="100%" stopColor="#8AA0A6"/></linearGradient>
        <linearGradient id="grkWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B6C6CC"/><stop offset="100%" stopColor="#8C9EA2"/></linearGradient>
        <linearGradient id="grkLawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8A9A5E"/><stop offset="35%" stopColor="#6E8A42"/><stop offset="100%" stopColor="#4C6A2A"/></linearGradient>
        <linearGradient id="grkCattail" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6E4A32"/><stop offset="45%" stopColor="#4E3222"/><stop offset="100%" stopColor="#2A1A10"/></linearGradient>
        <linearGradient id="grkBodyS" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#2E2618"/><stop offset="50%" stopColor="#1A150F"/><stop offset="100%" stopColor="#0A0806"/></linearGradient>
        <linearGradient id="grkBodyP" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0%" stopColor="#1E1810"/><stop offset="60%" stopColor="#2A2216"/><stop offset="100%" stopColor="#0C0A07"/></linearGradient>
        <linearGradient id="grkHood" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stopColor="#2C3A86"/><stop offset="50%" stopColor="#2A1F5C"/><stop offset="100%" stopColor="#1A1236"/></linearGradient>
        <linearGradient id="grkHoodP" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#2C3A86"/><stop offset="55%" stopColor="#2A1F5C"/><stop offset="100%" stopColor="#1A1236"/></linearGradient>
        <linearGradient id="grkWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2E2618"/><stop offset="55%" stopColor="#16120C"/><stop offset="100%" stopColor="#0A0808"/></linearGradient>
        <linearGradient id="grkWingP" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#2E2618"/><stop offset="55%" stopColor="#16120C"/><stop offset="100%" stopColor="#0A0808"/></linearGradient>
        <linearGradient id="grkTail" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#16121F"/><stop offset="100%" stopColor="#0B0910"/></linearGradient>
        <linearGradient id="grkTailIn" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#241C40"/><stop offset="100%" stopColor="#2E2650"/></linearGradient>
        <linearGradient id="grkReed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9A9468"/><stop offset="100%" stopColor="#4A5430"/></linearGradient>
        <linearGradient id="grkTailP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16121F"/><stop offset="100%" stopColor="#0B0910"/></linearGradient>
        <linearGradient id="grkBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3C4052"/><stop offset="100%" stopColor="#0C0D11"/></linearGradient>
        <linearGradient id="grkBillP" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#3C4052"/><stop offset="100%" stopColor="#0C0D11"/></linearGradient>
        <clipPath id="grkFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <clipPath id="grkBodyClipS"><path d={S_BODY}/></clipPath>
        <clipPath id="grkWingClipS"><path d={S_WING}/></clipPath>
        <clipPath id="grkTailClip"><path d={S_TNEAR}/></clipPath>
        <clipPath id="grkBodyClipP"><path d={P_BODY}/></clipPath>
        <clipPath id="grkWingClipP"><path d={P_WING}/></clipPath>
        <clipPath id="grkTailClipP"><path d={P_TNEAR}/></clipPath>
        <filter id="grkSoft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
        <filter id="grkSoftBig" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="grkBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.45"/></filter>
        <filter id="grkBlurL" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.9"/></filter>
        <filter id="grkGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter>
        <filter id="grkEdge" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="0.9"/></filter>
        <filter id="grkLeafy" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="2" seed="4" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feGaussianBlur in="d" stdDeviation="1.2"/>
        </filter>
        <filter id="grkHalo" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" result="b"/>
          <feFlood floodColor="#B0B4D8" floodOpacity="0.32"/>
          <feComposite in2="b" operator="in" result="h"/>
          <feMerge><feMergeNode in="h"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="grkTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2 0.55" numOctaves="2" seed="7" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0.02  1.3 0 0 0 -0.5" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="grkGrass" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.25" numOctaves="3" seed="5" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.22  0 0 0 0 0.08  1.4 0 0 0 -0.55" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="grkCattailTex" x="-10%" y="-5%" width="120%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4 0.6" numOctaves="2" seed="3" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0 0.06  1.2 0 0 0 -0.5" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#grkFrame)">
        {perch ? (
          <>
            {scene && <Marsh/>}
            <g filter={scene ? undefined : 'url(#grkHalo)'}><g transform="translate(0 0)"><Display blink={blink} sheen={sheen}/></g></g>
          </>
        ) : (
          <>
            {scene && <ParkLawn/>}
            <g filter={scene ? undefined : 'url(#grkHalo)'}><g transform="translate(2 12)"><Strut blink={blink} sheen={sheen} step={step}/></g></g>
          </>
        )}
      </g>
    </svg>
  )
}
