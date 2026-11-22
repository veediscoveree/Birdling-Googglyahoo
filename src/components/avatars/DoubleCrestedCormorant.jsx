// Double-crested Cormorant (adult) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template conventions (meta, props, viewBox 0 0 120 130, scene).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'double_crested_cormorant', poses: ['swim', 'wingspread'] }

// Field marks: blackish body with green-bronze gloss; coppery back feathers scalloped with black;
// bare ORANGE-YELLOW face skin and throat pouch; long thin gray bill with a HOOKED tip;
// TURQUOISE eye; sits LOW in the water with bill tilted up; long neck; wings-spread drying pose
// on a piling; flies with a slight kink in the neck; black webbed feet.

// Head drawn around (0,0), facing left. Bill tip ≈ (-29, 0).
function Head({ blink = false }) {
  return (
    <g>
      <path d="M 9 3 C 10 -5 4 -10.5 -2 -10.5 C -8 -10.5 -11 -6 -10.5 -1 C -10 4 -6 7.5 0 8 C 5 8 8.5 6.5 9 3 Z" fill="url(#dccHead)"/>
      {/* bare orange-yellow lores + throat pouch */}
      <path d="M -6 -4 C -3 -4.6 -0.5 -3 -0.6 0 C -0.2 3 1.2 6 1.8 9.5 C -2.5 10.5 -7 8.5 -9.5 5 C -11 2.5 -9.5 -2.6 -6 -4 Z" fill="url(#dccSkin)"/>
      {/* bill: long, slim, dark upper mandible ending in a hooked tip; grayer lower */}
      <path d="M -8.5 0.6 L -27.5 0.2 C -22 1.4 -15 2.3 -8.5 3.2 Z" fill="#6E726E"/>
      <path d="M -8 -2.8 C -16 -2.9 -23 -2.6 -28 -1.9 C -30.8 -1.5 -31.8 0.6 -30.6 2.6 C -30.2 1.2 -29.6 0.6 -28.4 0.4 L -8.4 0.8 Z" fill="#33383A"/>
      <path d="M -9 -2 C -16 -2.1 -22 -1.9 -27 -1.3" stroke="#5C6264" strokeWidth="0.5" fill="none"/>
      {/* turquoise eye with catch-light */}
      {blink
        ? <path d="M -4.4 -3.6 q 2.4 1.6 4.8 0" stroke="#0A0C0C" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="-2" cy="-3.6" r="3.5" fill="#1A1E1E"/>
            <circle cx="-2" cy="-3.6" r="2.9" fill="#2FC0B0"/>
            <circle cx="-2" cy="-3.6" r="1.45" fill="#061010"/>
            <circle cx="-3" cy="-4.6" r="0.95" fill="#FFF"/>
          </g>}
      {/* gloss */}
      <path d="M 1 -9 C 5 -8 7.5 -5 8 -1" stroke="#4E6A58" strokeWidth="1.2" fill="none" opacity="0.7" strokeLinecap="round"/>
    </g>
  )
}

// Scalloped bronze back feathers inside a rough box.
function Scallops({ x0, y0, cols, rows, dx = 5, dy = 3.6 }) {
  const out = []
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * dx + (r % 2) * dx / 2, y = y0 + r * dy
    out.push(<path key={`${r}-${c}`} d={`M ${x - 2.4} ${y} q 2.4 3 4.8 0 q -2.4 -1.2 -4.8 0 Z`} fill="#7A6644" stroke="#141614" strokeWidth="0.5"/>)
  }
  return <g>{out}</g>
}

function Water({ bob = 0, y = 94 }) {
  return (
    <g>
      <path d={`M 0 ${y + bob * 0.3} Q 15 ${y - 2 + bob * 0.3} 30 ${y} T 60 ${y} T 90 ${y} T 120 ${y} L 120 130 L 0 130 Z`} fill="url(#dccWater)"/>
      <path d={`M 8 ${y + 6} q 7 -2 14 0 M 70 ${y + 9} q 10 -2 20 0 M 30 ${y + 17} q 8 -1.5 16 0 M 92 ${y + 22} q 7 -2 14 0`} stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
    </g>
  )
}

function Piling() {
  return (
    <g>
      <path d="M 0 112 Q 15 110 30 112 T 60 112 T 90 112 T 120 112 L 120 130 L 0 130 Z" fill="url(#dccWater)"/>
      <rect x="47" y="99" width="26" height="31" fill="url(#dccWood)"/>
      <ellipse cx="60" cy="99.5" rx="13" ry="3.2" fill="#A88A64"/>
      <ellipse cx="60" cy="99.5" rx="8" ry="1.8" fill="none" stroke="#7E6444" strokeWidth="0.6"/>
      <path d="M 52 104 L 52 128 M 66 103 L 66 126" stroke="#5A4630" strokeWidth="0.7" opacity="0.7"/>
      <path d="M 44 113 q 16 4 32 0" stroke="#D8F0FA" strokeWidth="1.2" fill="none" opacity="0.8"/>
      <path d="M 14 118 q 8 -2 16 0 M 88 121 q 9 -2 18 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.6"/>
    </g>
  )
}

// Spread wing seen from the front (left side). Mirrored for the right.
function SpreadWing() {
  return (
    <g>
      <path d="M 52 62 C 42 52 28 46 14 47 C 9 47.5 5.5 51 6 55 C 6 60 8 64 10 67 C 11 64 12 63 13.5 63 C 13.5 67 15 71 17.5 72.5 C 18.5 69.5 19.5 68 21.5 67.5 C 22.5 71 24.5 73.5 27.5 74.5 C 28.5 71.5 29.5 70 31.5 69.5 C 32.5 72.5 35 74.5 38.5 74.5 C 39.5 72.5 40.5 71 42.5 70.5 C 45.5 71.5 49.5 69.5 53 68 Z" fill="url(#dccWing)"/>
      {/* bronze coverts, scalloped */}
      <path d="M 51 62 C 43 55 32 51 18 51 C 14 51 12 53 12 56 C 22 57 34 60 50 67 Z" fill="#6A5A3E"/>
      {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M ${16 + i * 6} ${54.5 + i * 1.3} q 3 3 6 0.6`} stroke="#141614" strokeWidth="0.6" fill="none"/>)}
      {[0, 1, 2, 3, 4].map(i => <path key={'b' + i} d={`M ${21 + i * 6} ${58.5 + i * 1.6} q 3 3 6 0.6`} stroke="#141614" strokeWidth="0.6" fill="none"/>)}
      {/* separations between the long flight feathers */}
      {[[13.5, 63, 16, 57], [21.5, 67.5, 22, 60], [31.5, 69.5, 31, 62], [42.5, 70.5, 41, 64]].map(([a, b, c, d], i) => <path key={'s' + i} d={`M ${a} ${b} L ${c} ${d}`} stroke="#3A4642" strokeWidth="0.6" opacity="0.9"/>)}
    </g>
  )
}

export default function DoubleCrestedCormorant({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 380); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.6, -1.1, -0.6, 0, 0.5, 0.9, 0.5, 0, -0.6, -1.1, -0.6][frame] : 0
  const blink = animated && frame === 7
  const flap = animated ? [0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1][frame] : 0

  let bird, backdrop, ground
  if (pose === 'wingspread') {
    // Iconic: standing on a piling, wings held open to dry.
    const lift = animated ? [0, 0.6, 1, 0.6, 0, -0.4, -0.6, -0.4, 0, 0.6, 1, 0.6][frame] : 0
    backdrop = scene ? <Piling/> : null
    ground = null
    bird = (
      <g>
        <g transform={`rotate(${-lift} 52 62)`}><SpreadWing/></g>
        <g transform={`translate(120,0) scale(-1,1) rotate(${-lift} 52 62)`}><SpreadWing/></g>
        {/* body (front view) */}
        <path d="M 60 50 C 72 50 77 60 76 72 C 75 84 70 93 60 95 C 50 93 45 84 44 72 C 43 60 48 50 60 50 Z" fill="url(#dccBody)"/>
        <path d="M 66 56 C 71 62 72 72 70 82" stroke="#44584A" strokeWidth="1.6" fill="none" opacity="0.55" strokeLinecap="round"/>
        <path d="M 54 58 C 52 66 52 78 55 88" stroke="#3E5246" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round"/>
        {/* tail tip below */}
        <path d="M 55.5 93 C 57 98 58.5 101 60 103 C 61.5 101 63 98 64.5 93 Z" fill="#141814"/>
        <path d="M 54 93 L 53 97 M 66 93 L 67 97" stroke="#0E1010" strokeWidth="2.4" strokeLinecap="round"/>
        {/* black webbed feet on the piling */}
        <path d="M 53 96 L 48.5 99.8 L 52.5 99.2 L 54.5 100.4 L 56.5 99.2 L 57.5 96.5 Z M 67 96 L 71.5 99.8 L 67.5 99.2 L 65.5 100.4 L 63.5 99.2 L 62.5 96.5 Z" fill="#0E1010"/>
        {/* neck curving up to a head in profile */}
        <path d="M 54 54 C 52 46 48 40 47 34 L 57 33 C 58 40 63 46 66 53 Z" fill="url(#dccBody)"/>
        <g transform="translate(52,30) rotate(-6) scale(1.12)"><Head blink={blink}/></g>
      </g>
    )
  } else if (pose === 'fish') {
    // Just surfaced with a fish, tossing it to swallow head-first.
    backdrop = scene ? <Water bob={bob}/> : null
    ground = scene ? null : <path d="M 30 95 C 55 98 90 98 112 94" stroke="#A8D8EC" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
    bird = (
      <g>
        <path d="M 46 95 C 45 86 54 80 68 80 C 82 80 96 84 106 90 L 116 92 L 112 96 Z" fill="url(#dccBody)"/>
        <path d="M 60 81.5 C 76 79.5 94 83 106 89" stroke="#5E7A66" strokeWidth="1.1" fill="none" opacity="0.8" strokeLinecap="round"/>
        <Scallops x0={62} y0={84} cols={7} rows={2}/>
        <path d="M 40 50 C 40 62 43 78 47 95 L 74 82 C 61 81 53 66 52 46 Z" fill="url(#dccBody)"/>
        <g transform="translate(46,40) rotate(-38) scale(1.1)">
          <Head blink={blink}/>
          {/* silver fish crosswise in the hooked bill */}
          <g transform="translate(-25,1) rotate(72)">
            <path d="M -9 0 C -6 -3 4 -3.4 8 0 C 4 3.4 -6 3 -9 0 Z" fill="url(#dccFish)"/>
            <path d="M 8 0 L 12.5 -3 L 11.5 0 L 12.5 3 Z" fill="#8FA8B4"/>
            <circle cx="-6.2" cy="-0.6" r="0.8" fill="#123"/>
            <path d="M -2 -2.6 q 4 2.2 8 0.4" stroke="#6C8A98" strokeWidth="0.5" fill="none"/>
          </g>
        </g>
        {/* droplets */}
        <circle cx="18" cy="38" r="1.1" fill="#CFEFFA"/><circle cx="24" cy="30" r="0.8" fill="#CFEFFA"/><circle cx="14" cy="48" r="0.9" fill="#CFEFFA"/>
      </g>
    )
  } else if (pose === 'fly') {
    // Flying low over the water: neck stretched with a slight kink, feet trailing.
    backdrop = scene ? <Water bob={0} y={104}/> : null
    ground = null
    // One wing drawn up; the flap animation squashes it about the shoulder line.
    const sy = [1, 0.55, 0.1][flap]
    const wing = (
      <g>
        <path d="M 58 62 C 60 48 66 34 77 22 L 82 15 C 84 13 87 14 86 17 L 83 22 L 89.5 14 C 91.5 12.5 94 14 92.5 16.5 L 88 23.5 L 96 17.5 C 98 16.5 100 18.5 98.5 20.5 L 92 29 L 99.5 25.5 C 101.5 25 102.5 27.5 100.5 29 L 90 38 C 86 46 83 54 81 62 Z" fill="url(#dccWing)"/>
        <path d="M 60 61 C 62 53 65 46 70 40 C 76 41 81 43 86 45 C 84 50 82 56 81 61 Z" fill="#5E503A"/>
        {[[66, 55], [74, 55], [70, 49], [78, 49]].map(([x, y], i) => <path key={i} d={`M ${x - 3} ${y} q 3 3.2 6 0`} stroke="#141614" strokeWidth="0.6" fill="none"/>)}
        <path d="M 83 22 L 79 31 M 88 23.5 L 84 32 M 92 29 L 87 35" stroke="#3A4642" strokeWidth="0.6"/>
      </g>
    )
    bird = (
      <g>
        <g transform={`translate(-7,-2) translate(0,62) scale(1,${sy}) translate(0,-62)`} opacity="0.55">{wing}</g>
        <path d="M 44 60 C 54 55 80 55 96 59 C 104 61 110 64 116 66 L 113 71 C 104 73 92 75 80 75 C 64 75 50 71 44 66 Z" fill="url(#dccBody)"/>
        <path d="M 52 61 C 66 58 84 58 98 61" stroke="#44584A" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round"/>
        <path d="M 103 69 L 115 76 L 111 71.5 Z M 105 68 L 118 72 L 113 69 Z" fill="#0E1010"/>
        <path d="M 33 55 C 38 56.5 41 57 47 59.5 L 47.5 67 C 42 66 37 65.5 33.5 63.5 Z" fill="url(#dccBody)"/>
        <g transform="translate(32,57) rotate(8)"><Head blink={blink}/></g>
        <g transform={`translate(0,62) scale(1,${sy}) translate(0,-62)`}>{wing}</g>
      </g>
    )
  } else {
    // swim: rides low, back nearly awash, bill tilted up.
    backdrop = scene ? <Water bob={bob}/> : null
    ground = scene ? null : <path d="M 32 95 C 55 98 92 98 114 94" stroke="#A8D8EC" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
    bird = (
      <g>
        <path d="M 44 96 C 43 87 52 81 66 80 C 82 79 96 84 106 90 L 117 92 L 112 96 Z" fill="url(#dccBody)"/>
        <path d="M 58 81.5 C 74 79.5 92 82 106 89" stroke="#5E7A66" strokeWidth="1.1" fill="none" opacity="0.8" strokeLinecap="round"/>
        <Scallops x0={60} y0={84} cols={8} rows={2}/>
        <path d="M 36 56 C 35 68 39 82 45 96 L 72 82 C 59 81 50 69 48 52 Z" fill="url(#dccBody)"/>
        <path d="M 46 58 C 47 68 51 76 58 81" stroke="#5E7A66" strokeWidth="1.2" fill="none" opacity="0.7" strokeLinecap="round"/>
        <g transform="translate(43,48) rotate(-16) scale(1.12)"><Head blink={blink}/></g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Double-crested Cormorant">
      <defs>
        <linearGradient id="dccHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#44564A"/><stop offset="100%" stopColor="#141A16"/>
        </linearGradient>
        <linearGradient id="dccBody" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#3E5244"/><stop offset="55%" stopColor="#1E2822"/><stop offset="100%" stopColor="#0E1210"/>
        </linearGradient>
        <linearGradient id="dccWing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E3A32"/><stop offset="100%" stopColor="#101412"/>
        </linearGradient>
        <linearGradient id="dccSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6B640"/><stop offset="100%" stopColor="#E07E1E"/>
        </linearGradient>
        <linearGradient id="dccFish" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A98A6"/><stop offset="55%" stopColor="#D6E4EA"/><stop offset="100%" stopColor="#F4F8FA"/>
        </linearGradient>
        <linearGradient id="dccWood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6A5236"/><stop offset="50%" stopColor="#8C6E4A"/><stop offset="100%" stopColor="#5A4430"/>
        </linearGradient>
        <linearGradient id="dccWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {backdrop}
      <g transform={`translate(0,${pose === 'wingspread' ? 0 : bob})`}>{bird}</g>
      {ground}
    </svg>
  )
}
