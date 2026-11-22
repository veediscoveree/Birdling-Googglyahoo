// Great Egret (adult, non-breeding — the look NYC players meet Sep–Nov) — "accurate first,
// cute second, in habitat". Follows the WoodDuck.jsx template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'great_egret', poses: ['stand', 'stalk', 'catch', 'fly'] }

// Field marks: ALL WHITE; long dagger YELLOW bill; yellow eye and yellowish lores; very long
// thin S-curved neck; long BLACK legs and BLACK feet (Snowy Egret has yellow feet — not this);
// in flight the neck folds into an S and the black legs trail past the tail. No back plumes
// (those are spring/summer breeding only).

const WHITE = 'url(#gegWhite)'
const EDGE = { stroke: '#8FA2AC', strokeWidth: 0.7, strokeLinejoin: 'round' }

// Head drawn around (0,0) facing left; bill tip ≈ (-32, 2.4).
function Head({ blink = false }) {
  return (
    <g>
      <path d="M 8 1 C 8 -5 3 -8.2 -2 -7.8 C -6.5 -7.4 -9 -4.2 -9 -0.6 C -9 3 -5.5 5.6 0 5.6 C 4.5 5.6 8 4.4 8 1 Z" fill={WHITE}/>
      <path d="M -8.6 -2.8 C -6.4 -3.6 -4.2 -3 -3.2 -1.6 L -8.8 1.2 Z" fill="#C8CE48"/>
      <path d="M -8 1.5 C -14 2.4 -24 2.7 -32.2 2.4 C -24 3.8 -14 4.6 -8.2 3.8 Z" fill="#D9A410"/>
      <path d="M -7.8 -3 C -14 -2.2 -24 0.2 -32.2 2.4 C -24 2.6 -14 2.4 -8 1.5 Z" fill="#F4C820"/>
      <path d="M -8 1.6 C -14 2.4 -24 2.6 -31 2.4" stroke="#A87C0C" strokeWidth="0.5" fill="none"/>
      {blink
        ? <path d="M -5.6 -2.2 q 2.6 1.6 5.2 0" stroke="#3A3010" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="-3" cy="-2.2" r="2.9" fill="#F2D232" stroke="#B89810" strokeWidth="0.4"/>
            <circle cx="-3" cy="-2.2" r="1.55" fill="#0E0E0C"/>
            <circle cx="-3.8" cy="-3" r="0.85" fill="#FFF"/>
          </g>}
    </g>
  )
}

// Several shapes merged into one white silhouette: outline pass underneath, fill pass on top,
// so the neck flows into the body without a seam.
function Sil({ ds }) {
  return (
    <g>
      {ds.map((d, i) => <path key={'o' + i} d={d} fill="#8FA2AC" stroke="#8FA2AC" strokeWidth="1.4" strokeLinejoin="round"/>)}
      {ds.map((d, i) => <path key={'f' + i} d={d} fill={WHITE}/>)}
    </g>
  )
}

function Foot({ x, y, flip = 1 }) {
  // Black foot: three long forward toes, one hind toe.
  return (
    <g stroke="#141414" strokeWidth="1.3" strokeLinecap="round" fill="none">
      <path d={`M ${x} ${y} L ${x - 8 * flip} ${y + 1.6}`}/>
      <path d={`M ${x} ${y} L ${x - 4.5 * flip} ${y + 3}`}/>
      <path d={`M ${x} ${y} L ${x + 3 * flip} ${y + 2.4}`}/>
      <path d={`M ${x} ${y} L ${x + 4 * flip} ${y - 0.6}`}/>
    </g>
  )
}

function Leg({ pts, w = 2.2 }) {
  return <path d={`M ${pts.map(p => p.join(' ')).join(' L ')}`} stroke="#141414" strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
}

function Marsh({ bank = true }) {
  return (
    <g>
      <path d="M 0 106 Q 15 104 30 106 T 60 106 T 90 106 T 120 106 L 120 130 L 0 130 Z" fill="url(#gegWater)"/>
      {/* reeds and a cattail behind the bird */}
      <g stroke="#6E8A3C" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M 104 108 C 103 90 104 72 107 56"/><path d="M 110 108 C 110 92 112 80 116 68"/>
        <path d="M 98 108 C 98 96 96 86 92 78"/><path d="M 114 108 C 115 98 117 92 119 88"/>
        <path d="M 8 108 C 8 98 6 90 3 84"/><path d="M 13 108 C 14 100 16 94 19 90"/>
      </g>
      <rect x="105" y="56" width="4" height="13" rx="2" fill="#6A4424"/>
      <path d="M 107 56 L 107.6 50" stroke="#6E8A3C" strokeWidth="1"/>
      {bank && <path d="M 30 130 C 34 118 52 114 76 114 C 98 114 112 120 116 130 Z" fill="url(#gegMud)"/>}
      <path d="M 6 114 q 8 -2 16 0 M 18 124 q 7 -1.5 14 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
    </g>
  )
}

function Water({ y = 108 }) {
  return (
    <g>
      <path d={`M 0 ${y} Q 15 ${y - 2} 30 ${y} T 60 ${y} T 90 ${y} T 120 ${y} L 120 130 L 0 130 Z`} fill="url(#gegWater)"/>
      <g stroke="#6E8A3C" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d={`M 108 ${y + 2} C 108 ${y - 14} 110 ${y - 26} 114 ${y - 36}`}/><path d={`M 114 ${y + 2} C 115 ${y - 10} 117 ${y - 18} 119 ${y - 24}`}/>
        <path d={`M 6 ${y + 2} C 6 ${y - 10} 4 ${y - 18} 1 ${y - 24}`}/>
      </g>
      <path d={`M 20 ${y + 8} q 8 -2 16 0 M 80 ${y + 14} q 10 -2 20 0 M 40 ${y + 18} q 7 -1.5 14 0`} stroke="#A8D8EC" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
    </g>
  )
}

export default function GreatEgret({ size = 120, animated = false, style = {}, pose = 'stand', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 12), 400); return () => clearInterval(id) }, [animated])
  // Herons hold still — the idle is a slow neck sway (head moves, feet stay planted).
  const sway = animated ? [0, 0.5, 1, 1.2, 1, 0.5, 0, -0.5, -1, -1.2, -1, -0.5][frame] : 0
  const blink = animated && frame === 9
  const flap = animated ? [0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1][frame] : 0

  let bird, backdrop, ground = null
  if (pose === 'stalk') {
    // Creeping forward, neck stretched, one black foot lifted mid-step.
    backdrop = scene ? <Water y={110}/> : null
    ground = scene ? <path d="M 66 113 q 8 -2.5 16 0" stroke="#D8F0FA" strokeWidth="1.2" fill="none" opacity="0.9"/> : <ellipse cx="72" cy="118" rx="14" ry="2" fill="#000" opacity="0.18"/>
    bird = (
      <g>
        <Leg pts={[[73, 84], [74, 101], [74, 117]]}/>
        <Foot x={74} y={117}/>
        <Leg pts={[[66, 83], [62, 95], [55, 99]]}/>
        <g stroke="#141414" strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M 55 99 C 52 100 50 102 49 104"/><path d="M 55 99 C 53 101 52.5 103 52.5 105"/><path d="M 55 99 C 55 101 55.5 103 56.5 104.5"/>
        </g>
        <g transform={`rotate(${sway} 52 72)`}>
          <Sil ds={['M 44 72 C 47 62 62 59 76 63 C 89 66 99 74 106 86 C 97 88 85 87 73 85 C 59 83 45 80 44 72 Z',
                    'M 47 75 C 39 71 33 64 30 54 L 36 51.5 C 38 59 44 65 54 67 Z',
                    'M 33 48 m -8.6 0 a 8.4 6.6 0 1 0 16.8 0 a 8.4 6.6 0 1 0 -16.8 0 Z']}/>
          <path d="M 58 65 C 72 66 88 72 100 82" stroke="#AFC0C8" strokeWidth="0.9" fill="none"/>
          <path d="M 94 82 l 8 2 M 92 84 l 9 1.6" stroke="#AFC0C8" strokeWidth="0.7"/>
          <g transform="translate(33,48) rotate(-40)"><Head blink={blink}/></g>
        </g>
      </g>
    )
  } else if (pose === 'catch') {
    // Head up, a small fish crosswise in the yellow bill.
    backdrop = scene ? <Water y={108}/> : null
    ground = scene ? <path d="M 60 110 q 9 -2.5 18 0 q 6 2 12 0" stroke="#D8F0FA" strokeWidth="1.2" fill="none" opacity="0.9"/> : <ellipse cx="74" cy="118" rx="14" ry="2" fill="#000" opacity="0.18"/>
    bird = (
      <g>
        <Leg pts={[[70, 80], [68, 99], [67, 116]]}/>
        <Leg pts={[[78, 80], [80, 99], [82, 116]]}/>
        <Foot x={67} y={116}/><Foot x={82} y={116}/>
        <g transform={`rotate(${sway * 0.6} 60 66)`}>
          <Sil ds={['M 52 66 C 54 56 68 54 82 59 C 94 63 102 72 107 84 C 99 85 87 84 77 82 C 63 79 52 74 52 66 Z',
                    'M 54 66 C 48.5 58 47 49 50.5 41 C 53 35 53 29 50.5 23 L 56 19.5 C 59.5 27 59.5 34 57 41.5 C 54.5 48 56.5 56 61.5 62 Z',
                    'M 52 18 m -8.6 0 a 8.4 6.6 0 1 0 16.8 0 a 8.4 6.6 0 1 0 -16.8 0 Z']}/>
          <path d="M 64 60 C 78 62 92 70 101 80" stroke="#AFC0C8" strokeWidth="0.9" fill="none"/>
          <g transform="translate(52,18) rotate(16)">
            <Head blink={blink}/>
            <g transform="translate(-24,2.6) rotate(-74)">
              <path d="M -8 0 C -5 -2.8 4 -3.2 7.5 0 C 4 3.2 -5 2.8 -8 0 Z" fill="url(#gegFish)" stroke="#5E7684" strokeWidth="0.4"/>
              <path d="M 7.5 0 L 11.5 -2.8 L 10.5 0 L 11.5 2.8 Z" fill="#8FA8B4"/>
              <circle cx="-5.5" cy="-0.5" r="0.75" fill="#123"/>
            </g>
          </g>
        </g>
        <circle cx="14" cy="30" r="1" fill="#CFEFFA"/><circle cx="20" cy="40" r="0.8" fill="#CFEFFA"/><circle cx="12" cy="20" r="0.8" fill="#CFEFFA"/>
      </g>
    )
  } else if (pose === 'fly') {
    // Slow deep wingbeats; neck folded into an S, black legs trailing well past the tail.
    backdrop = scene ? <Water y={114}/> : null
    const sy = [1, 0.5, -0.15][flap]
    const wing = (
      <g>
        <path d="M 52 57 C 52 40 60 24 74 13 C 79 9.5 86 8.5 91 10 C 93 11 93 13.5 91 14.5 C 94 15.5 95.5 18 94 20 C 96 21.5 96.5 24.5 94 26 C 95 28.5 94 31.5 91 32 C 90 35 87 37 83 36.5 C 81 44 79.5 51 79 58 Z" fill={WHITE} {...EDGE}/>
        <path d="M 91 14.5 C 86 16 82 18 79 20 M 94 20 C 89 21 85 23 82 25 M 94 26 C 89 27 86 28.5 83 30.5 M 91 32 C 88 32.5 85 34 83 36" stroke="#C4D2D8" strokeWidth="0.7" fill="none"/>
        <path d="M 58 52 C 60 42 64 33 72 25" stroke="#C4D2D8" strokeWidth="0.8" fill="none"/>
      </g>
    )
    bird = (
      <g>
        <g transform={`translate(-8,-1) translate(0,58) scale(1,${sy}) translate(0,-58)`} opacity="0.7">{wing}</g>
        <Leg pts={[[86, 64], [100, 66], [117, 67]]} w={2}/>
        <g stroke="#141414" strokeWidth="1.1" strokeLinecap="round"><path d="M 117 67 l 1.6 -2.4 M 117 67 l 2 0.4 M 117 67 l 1.4 2.4"/></g>
        {/* body + folded S-neck: a deep bulge hangs under the head */}
        <Sil ds={['M 40 58 C 44 52 58 50 72 53 C 84 55 94 58 102 62 C 94 66 80 67 68 66 C 54 65 42 64 40 58 Z',
                  'M 44 54 C 36 52 31 58 33 65 C 35 71 43 71 48 65 L 47 58 Z',
                  'M 37 53 m -8.6 0 a 8.4 6.6 0 1 0 16.8 0 a 8.4 6.6 0 1 0 -16.8 0 Z']}/>
        <g transform="translate(37,53) rotate(8)"><Head blink={blink}/></g>
        <g transform={`translate(0,58) scale(1,${sy}) translate(0,-58)`}>{wing}</g>
      </g>
    )
  } else {
    // stand: at rest on a mudbank, neck in a relaxed S.
    backdrop = scene ? <Marsh/> : null
    ground = scene ? null : <ellipse cx="74" cy="118" rx="16" ry="2.2" fill="#000" opacity="0.18"/>
    bird = (
      <g>
        <Leg pts={[[70, 80], [68, 99], [67, 117]]}/>
        <Leg pts={[[78, 80], [80, 99], [82, 117]]}/>
        <Foot x={67} y={117}/><Foot x={82} y={117}/>
        <g transform={`rotate(${sway} 58 66)`}>
          <Sil ds={['M 50 66 C 52 56 66 53 80 58 C 92 62 101 71 106 83 C 98 84 86 83 76 81 C 62 78 50 74 50 66 Z',
                    'M 52 66 C 56 60 56.5 54 52.5 48.5 C 47 42.5 46 35 49.5 27.5 L 55.5 25 C 52.5 32 53.5 38 58 43 C 62.5 48.5 62 57 59 64 Z',
                    'M 53 23 m -8.8 0 a 8.4 6.6 0 1 0 16.8 0 a 8.4 6.6 0 1 0 -16.8 0 Z']}/>
          <path d="M 62 59 C 76 61 90 69 100 79" stroke="#AFC0C8" strokeWidth="0.9" fill="none"/>
          <path d="M 96 79 l 8 3 M 94 81 l 9 2.2" stroke="#AFC0C8" strokeWidth="0.7"/>
          <g transform="translate(53,23) rotate(2)"><Head blink={blink}/></g>
        </g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Great Egret">
      <defs>
        <linearGradient id="gegWhite" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="70%" stopColor="#F4F7F8"/><stop offset="100%" stopColor="#D8E2E6"/>
        </linearGradient>
        <linearGradient id="gegFish" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A98A6"/><stop offset="55%" stopColor="#D6E4EA"/><stop offset="100%" stopColor="#F4F8FA"/>
        </linearGradient>
        <linearGradient id="gegMud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A7A52"/><stop offset="100%" stopColor="#5A4C30"/>
        </linearGradient>
        <linearGradient id="gegWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.85"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {backdrop}
      {bird}
      {ground}
    </svg>
  )
}
