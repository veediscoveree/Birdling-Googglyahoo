// Golden-crowned Kinglet (adult male) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template: meta + poses, viewBox 0 0 120 130, unique ids ("gck"),
// scene=true adds a spruce sprig, scene=false still reads alone (short twig stub).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'golden_crowned_kinglet', poses: ['perch', 'flare', 'hover', 'reach'] }

// Field marks: tiny round olive-gray ball, short notched tail; bold STRIPED face — black
// crown edges, WHITE eyebrow, black eye-line, pale-gray cheek; YELLOW crown stripe with an
// ORANGE center (male; raised in 'flare'); two whitish wing bars with a black bar behind the
// lower one; yellow-edged flight feathers; tiny black bill; dark legs with yellowish toes.
// Hover-gleans at spruce tips ('hover'); constantly flicks its wings (idle animation).

function Head({ flare = false, blink = false }) {
  return (
    <g>
      <circle cx="44" cy="54" r="16.5" fill="url(#gckHead)"/>
      <clipPath id="gckHeadClip"><circle cx="44" cy="54" r="16.5"/></clipPath>
      <g clipPath="url(#gckHeadClip)">
        {/* black crown edges */}
        <ellipse cx="45" cy="41.4" rx="15.5" ry="7.2" fill="#141414"/>
        {/* yellow crown stripe with orange center */}
        <ellipse cx="46" cy="39.4" rx={flare ? 12.5 : 11.5} ry={flare ? 4.8 : 4.1} fill="#FFD21A"/>
        <ellipse cx="47" cy="38.8" rx={flare ? 8 : 6} ry={flare ? 3.2 : 2.2} fill="#FF7A00"/>
        {/* white eyebrow, black eye-line */}
        <path d="M 29.5 50.8 Q 42 44.8 59.8 50" stroke="#FFFFFF" strokeWidth="3.3" fill="none" strokeLinecap="round"/>
        <path d="M 28 55.2 Q 38 53.4 58 57" stroke="#141414" strokeWidth="2.3" fill="none" strokeLinecap="round"/>
        {/* pale band under the eye-line, faint dusky whisker */}
        <path d="M 31 58.8 Q 38 57.8 46 59.4" stroke="#F0F1EA" strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.9"/>
        <path d="M 30.5 62.4 Q 35.5 62.8 40 61.8" stroke="#5A6058" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.55"/>
      </g>
      {/* raised crown feathers poke up above the head outline */}
      {flare && <path d="M 36.5 40 C 38 34 41.5 32.5 44 35.6 C 45.5 31.6 49.5 31.6 51 35.6 C 53.2 33.4 56.6 35 56 40 Z" fill="#FF7A00"/>}
      {flare && <path d="M 36.5 40 C 38.6 37.2 41.6 36.6 44 37.6 C 46 36.6 49 36.6 51 37.4 C 53 36.8 55 37.6 56 40" stroke="#FFD21A" strokeWidth="1.6" fill="none"/>}
      {blink
        ? <path d="M 34.2 54.8 Q 37.6 56.6 41 54.8" stroke="#141414" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="37.6" cy="54.6" r="3.6" fill="#120C08"/>
            <circle cx="36.3" cy="53.3" r="1.25" fill="#FFF"/>
            <circle cx="38.8" cy="56" r="0.45" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* tiny black bill */}
      <path d="M 28.8 53.5 L 23 55.2 L 28.8 56.8 Z" fill="#1A1A1A"/>
    </g>
  )
}

function Tail() {
  return (
    <g>
      <path d="M 82 76 C 90 80 96 84 102 89.5 L 100.4 91.6 L 98 90.2 L 98.6 93 C 92 91.4 86 88 80.5 84 Z" fill="#4C5246"/>
      <path d="M 83 79.4 C 90 83 95 87 99.6 91" stroke="#C8BC3A" strokeWidth="0.8" fill="none" opacity="0.9"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      <path d="M 40 66 C 40 56 52 52 64 54 C 78 56 88 64 88 74 C 88 84 78 90 64 90 C 50 90 40 80 40 66 Z" fill="url(#gckBody)"/>
      <path d="M 52 83 C 60 88 72 88.5 82 83.5 C 76 89.4 62 91 53 87 Z" fill="#B9B392" opacity="0.6"/>
    </g>
  )
}

function Wing({ lift = 0 }) {
  // Folded wing: olive coverts, two pale bars, black bar behind the lower one,
  // dark primaries edged yellow. `lift` = wing-flick angle.
  return (
    <g transform={`rotate(${-lift} 54 64)`}>
      <path d="M 52 61.5 C 62 57 76 60 85 68 C 90 73 93 79 92 84 C 82 85 66 83 57 79 C 51 75 50 67 52 61.5 Z" fill="url(#gckWing)"/>
      <path d="M 56.4 63.4 C 58.4 66.6 59.6 70 59.8 73.4" stroke="#EDEEE2" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.9"/>
      <path d="M 63.2 62 C 66 65.8 67.6 70.4 68 75.4" stroke="#F6F6EE" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M 67.4 62.4 C 70.8 66.4 72.4 71.4 72.6 77.4 L 76.4 78.6 C 76.4 71.6 74.2 66.4 70.4 62.8 Z" fill="#141414"/>
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M ${77.5 + i * 1.4} ${66 + i * 3} C ${83 + i} ${69.5 + i * 2.8} ${88 + i * 0.5} ${74.5 + i * 2.4} ${91 - i * 0.6} ${83 - i * 0.2}`} stroke="#D6C93C" strokeWidth="0.9" fill="none"/>
      ))}
      {/* pale-edged tertials */}
      <path d="M 60 79.5 C 66 81.6 72 82.4 78 82.6 M 62 76.6 C 67 78.6 72 79.6 77 79.8" stroke="#C9CDB4" strokeWidth="0.7" fill="none" opacity="0.8"/>
      <path d="M 52 61.5 C 62 57 76 60 85 68" stroke="#9AA37E" strokeWidth="0.8" fill="none" opacity="0.8"/>
    </g>
  )
}

function Legs() {
  return (
    <g stroke="#3A3028" strokeWidth="1.5" strokeLinecap="round" fill="none">
      <path d="M 60 88 L 58.5 96.4"/><path d="M 67 88 L 68 96"/>
      <path d="M 58.5 96.4 l -3.4 0.8 M 58.5 96.4 l 2.6 1.4 M 68 96 l -3.2 0.9 M 68 96 l 2.8 1.2" stroke="#C9A43A" strokeWidth="1.2"/>
    </g>
  )
}

function Needles({ x1, y1, x2, y2, n, len = 6 }) {
  // Short, stiff, four-sided spruce needles bristling all round the twig, paler toward the tip.
  const out = []
  const ang = Math.atan2(y2 - y1, x2 - x1)
  for (let i = 0; i <= n; i++) {
    const t = i / n, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t
    const L = len * (1 - 0.4 * t)
    ;[-1.25, -0.6, 0.6, 1.25].forEach((o, k) => {
      const a = ang + o + 0.25 + ((i + k) % 3 - 1) * 0.12
      const l = L * (k % 2 ? 1 : 0.82)
      out.push(<path key={`${i}-${k}`} d={`M ${x.toFixed(1)} ${y.toFixed(1)} l ${(Math.cos(a) * l).toFixed(1)} ${(Math.sin(a) * l).toFixed(1)}`}
        stroke={['#2F5E4C', '#467C64', '#3A6C56', '#5E957A'][(i + k) % 4]} strokeWidth="1.25" strokeLinecap="round"/>)
    })
  }
  return <g>{out}</g>
}

function Twig({ d, w = 2 }) {
  return <path d={d} stroke="#5E3F28" strokeWidth={w} fill="none" strokeLinecap="round"/>
}

function Spruce({ pose }) {
  if (pose === 'hover') {
    // A spruce bough with an upturned tip the kinglet hovers at (insect on the needles).
    return (
      <g>
        <Twig d="M 0 92 C 8 90 14 86 18 80" w={2.2}/>
        <Needles x1={0} y1={92} x2={18} y2={80} n={9} len={6.5}/>
        <Twig d="M 0 108 C 10 108 18 112 24 118" w={1.6}/>
        <Needles x1={0} y1={108} x2={24} y2={118} n={9} len={6}/>
        <ellipse cx="19" cy="78.2" rx="1.4" ry="0.9" fill="#B5D07A"/>
        <Twig d="M 120 116 C 108 116 98 120 90 126" w={2}/>
        <Needles x1={120} y1={116} x2={90} y2={126} n={10} len={6}/>
      </g>
    )
  }
  return (
    <g>
      <Twig d="M 0 113 C 30 110 70 107.6 120 102" w={3}/>
      <Twig d="M 24 111.4 C 18 103 12 99 4 97" w={1.5}/>
      <Twig d="M 96 104.6 C 102 112 108 116 117 118" w={1.5}/>
      <Needles x1={24} y1={111.4} x2={4} y2={97} n={8} len={5.5}/>
      <Needles x1={96} y1={104.6} x2={117} y2={118} n={8} len={5.5}/>
      <Needles x1={0} y1={113} x2={46} y2={109.4} n={12} len={6.5}/>
      <Needles x1={82} y1={105.8} x2={120} y2={102} n={10} len={6.5}/>
      <ellipse cx="104" cy="112" rx="2.6" ry="5" fill="#8A5A34" transform="rotate(-20 104 112)"/>
      <path d="M 102 109 l 4 1 M 101.6 112 l 4.4 1 M 102 115 l 3.6 0.8" stroke="#5E3A20" strokeWidth="0.6"/>
    </g>
  )
}

export default function GoldenCrownedKinglet({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 380); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.8, -0.5, 0, 0.3, 0.5, 0.3][frame] : 0
  const flick = animated && pose !== 'hover' ? [0, 0, 9, 0, 0, 0, 7, 0][frame] : 0
  const blink = animated && frame === 4
  const up = animated ? frame % 2 === 0 : true

  // Perched poses are drawn at 1.25× about the feet, which sit on the twig at y≈107.
  const big = 'translate(60,107) scale(1.25) translate(-60,-97)'
  let bird
  if (pose === 'flare') {
    // Excited: crown raised to flash the orange, wings flicked, leaning forward.
    bird = <g transform={big}><g transform="rotate(-6 63 96)"><Tail/><Body/><Wing lift={animated ? flick + 6 : 12}/><Legs/><Head flare blink={blink}/></g></g>
  } else if (pose === 'hover') {
    // Hover-gleaning at a spruce tip: body angled up, wings blurred mid-beat, tail spread,
    // feet dangling.
    const W = (o, rot) => (
      <g transform={`rotate(${rot} 60 62)`} opacity={o}>
        <path d="M 58 62 C 60 50 64 38 71 27 L 75 22 L 77.6 25.4 L 81 21.2 L 83 25.6 L 86.8 23 L 87.6 28 L 91 27.6 C 90 36 86 46 80 52 C 74 58 68 62 64 66 Z" fill="url(#gckWing)"/>
        <path d="M 62 54 C 66 46 70 40 76 34 M 66 56 C 71 48 76 42 81 37" stroke="#F6F6EE" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 74 46 C 79 40 83 34 86 29 M 76 50 C 81 45 85 40 88 34 M 72 42 C 76 36 79 30 81 25" stroke="#D6C93C" strokeWidth="0.9" fill="none"/>
      </g>
    )
    bird = (
      <g transform="translate(64,66) scale(1.12) rotate(-22) translate(-64,-72)">
        {W(up ? 0.22 : 0.95, up ? 75 : 0)}
        <path d="M 82 77 C 92 82 100 88 104 95 L 99 95.5 L 97 98.5 L 94 96 C 88 92 84 88 80 84 Z" fill="#4C5246"/>
        <path d="M 84 80 C 92 85 98 90 101.5 95" stroke="#C8BC3A" strokeWidth="0.8" fill="none"/>
        <Body/>
        <path d="M 61 88 l -1.2 5 l -2.6 1.4 M 59.8 93 l 1.6 1.8 M 67 88 l 0.6 5 l -2.4 1.6 M 67.6 93 l 2 1.4" stroke="#3A3028" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        {W(up ? 0.95 : 0.22, up ? 0 : 75)}
        <Head blink={blink}/>
      </g>
    )
  } else if (pose === 'reach') {
    // Leaning far forward and down from the twig to pick an insect off the needles.
    bird = <g transform={`translate(6,0) ${big}`}><g transform="rotate(-22 62 96)"><Tail/><Body/><Wing lift={flick}/><Legs/><Head blink={blink}/></g></g>
  } else {
    bird = <g transform={big}><Tail/><Body/><Wing lift={flick}/><Legs/><Head blink={blink}/></g>
  }

  // Without a scene, a short twig stub keeps the perched bird anchored; hover gets motion ticks.
  const alone = pose === 'hover'
    ? <path d="M 98 26 q 5 -1 8 2 M 102 33 q 5 -1 8 2 M 101 40 q 4 -0.5 7 1.5" stroke="#E2EAD8" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
    : <path d="M 34 109.8 C 55 108.4 75 107.2 96 105.6" stroke="#5E3F28" strokeWidth="2.6" fill="none" strokeLinecap="round"/>

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Golden-crowned Kinglet">
      <defs>
        <linearGradient id="gckHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A8668"/><stop offset="60%" stopColor="#8C9580"/><stop offset="100%" stopColor="#D2D5C8"/>
        </linearGradient>
        <linearGradient id="gckBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#76855F"/><stop offset="42%" stopColor="#87926E"/><stop offset="62%" stopColor="#C2C6B2"/><stop offset="100%" stopColor="#D6D7CA"/>
        </linearGradient>
        <linearGradient id="gckWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C7A58"/><stop offset="100%" stopColor="#3C4334"/>
        </linearGradient>
      </defs>
      {scene ? <Spruce pose={pose}/> : alone}
      <g transform={`translate(0,${bob})`}>{bird}</g>
      {scene && pose === 'hover' && <path d="M 98 26 q 5 -1 8 2 M 102 33 q 5 -1 8 2" stroke="#E2EAD8" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round"/>}
    </svg>
  )
}
