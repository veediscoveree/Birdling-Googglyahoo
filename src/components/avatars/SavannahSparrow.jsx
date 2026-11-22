// Savannah Sparrow (adult) — new-style avatar, in a fall grassy field.
// Follows the WoodDuck.jsx template: meta export, viewBox 0 0 120 130, unique "svs" ids,
// scene backdrop optional, gentle idle (blink + breathing bob), field marks listed below.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'savannah_sparrow', poses: ['fence', 'sing', 'forage', 'fly'] }

// Field marks (the acceptance test — each must be visible):
//  • YELLOW eyebrow IN FRONT OF the eye (lores/supercilium), fading to whitish behind it
//  • pale central crown stripe on a brown, streaky crown
//  • FINE, thin dark streaks on a white breast and flanks, often a small central spot
//    (finer and crisper than Song Sparrow's thick blurry streaks)
//  • dark whisker (malar) and thin dark line behind the eye; brown ear patch
//  • SHORT, NOTCHED tail (Song Sparrow's is long and rounded)
//  • pinkish bill and legs; brown back boldly streaked dark with pale edges
//  • habitat: open grassy fields, fence posts, weedy stalks

const C = {
  crown: '#6E5034', crownDk: '#2E2018', median: '#E9E0C8', face: '#EDE7D6', yellow: '#F2CF3A',
  ear: '#A88A66', line: '#3E2C20', throat: '#FBFAF5', belly: '#FAF8F2', streak: '#4A3424',
  back: '#8A6A48', backDk: '#2E2018', edge: '#E2D1A8', wing: '#7C5E40', tail: '#5A4532',
  bill: '#D9A898', billDk: '#8E7268', leg: '#E2AE98',
}

function Tail() {
  // SHORT and NOTCHED
  return (
    <g>
      <path d="M 80 80 C 86 84 93 89 100 94 L 97.5 95.6 L 99 98.8 L 94 99 C 89 95 84 92 77 88 Z" fill={C.tail}/>
      <path d="M 82 83 C 87 86 92 90 97 94" stroke="#7A624C" strokeWidth="0.7" fill="none"/>
    </g>
  )
}

function Streaks({ breath = 0 }) {
  // fine pencil streaks across breast and down the flanks + a small central spot
  const s = []
  const rows = [[36, 66, 5], [35, 72, 6], [37, 78, 6], [42, 84, 5], [50, 89, 4]]
  rows.forEach(([x0, y, n], r) => {
    for (let i = 0; i < n; i++) {
      const x = x0 + i * 6 + (r % 2) * 2.5
      if (x > 82) continue
      s.push(<path key={`${r}-${i}`} d={`M ${x} ${y + (r > 3 ? breath : 0)} l 1.4 3.6`} stroke={C.streak} strokeWidth="1" strokeLinecap="round"/>)
    }
  })
  return <g opacity="0.9">{s}<ellipse cx="40.5" cy="70.5" rx="3" ry="2.6" fill={C.streak}/></g>
}

function Body({ breath = 0 }) {
  return (
    <g>
      <path d={`M 31 63 C 35 56 46 55 56 57 C 72 60 86 68 88 78 C 89 88 78 ${95 + breath} 63 ${95 + breath} C 47 ${95 + breath} 34 88 31 77 C 30 72 29 67 31 63 Z`} fill="url(#svsBelly)"/>
      <Streaks breath={breath}/>
      {/* back: brown, boldly streaked dark with pale braces */}
      <path d="M 44 58 C 56 52 74 55 86 67 C 88 70 88 73 87 75 C 76 66 62 61 50 62 Z" fill={C.back}/>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M ${53 + i * 7} ${57.5 + i * 1.6} q 4 2 6 5`} stroke={C.backDk} strokeWidth="1.7" fill="none" strokeLinecap="round"/>)}
      {[0, 1, 2].map(i => <path key={'p' + i} d={`M ${57 + i * 7} ${57 + i * 1.6} q 4 2 6 5`} stroke={C.edge} strokeWidth="0.8" fill="none" strokeLinecap="round"/>)}
      <Wing/>
    </g>
  )
}

function Wing() {
  return (
    <g>
      <path d="M 50 63 C 60 59 74 62 84 70 C 90 75 93 80 95 86 C 86 89 74 88 63 84 C 54 80 49 72 50 63 Z" fill={C.wing}/>
      {/* coverts with pale tips (faint, not bold wing bars) */}
      <path d="M 53 66 C 59 64 65 65 70 67 M 55 71.5 C 61 70 67 71 72 73.5" stroke={C.edge} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* dark tertials edged pale buff */}
      <path d="M 64 72 C 72 74 80 78 86 85 C 78 86 70 84 64 81 Z" fill={C.backDk}/>
      <path d="M 64 72 C 72 74 80 78 86 85" stroke={C.edge} strokeWidth="1.3" fill="none"/>
      <path d="M 68 76.5 C 75 78.5 81 82 88 86.5" stroke={C.edge} strokeWidth="1" fill="none"/>
      <path d="M 84 80 C 88 82 92 84 95 86 C 91 87.5 87 87.5 84 86.5 Z" fill="#3A2C22"/>
    </g>
  )
}

function Head({ blink = false, open = false }) {
  return (
    <g>
      <path d="M 24 50 C 23 38 33 32 42 33 C 52 34 58 42 57 52 C 56 60 49 65 41 65 C 31 65 25 58 24 50 Z" fill={C.face}/>
      {/* brown ear patch, outlined dark below */}
      <path d="M 41 54.6 C 45 54.2 50 55 54 56.6 C 52.5 59.6 49 61.2 45.5 61 C 43 59.6 41.5 57.4 41 54.6 Z" fill={C.ear} opacity="0.75"/>
      <path d="M 45.5 61 C 49 61.2 52.5 59.6 54 56.6" stroke="#7A5E44" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* white throat + dark whisker (malar) */}
      <path d="M 25.5 54.5 C 28 60 34 65 42 65 C 44 65 46 64.6 47.5 64 C 41 62.5 35 59.5 30.5 56 Z" fill={C.throat}/>
      <path d="M 29 57.5 C 33 60.5 38 63.2 43.5 64.6" stroke={C.line} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* streaky brown crown with a pale central stripe */}
      <path d="M 25 45 C 26 36 34 31.5 42 32 C 51 32.5 57 39 58 46.5 C 51 42 43 40.5 36 41.2 C 31 41.8 27.5 43.4 25 45 Z" fill={C.crown}/>
      {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M ${29 + i * 4.6} ${40.5 - Math.sin((i + 0.5) / 6 * Math.PI) * 5} l 2.2 1.6`} stroke={C.crownDk} strokeWidth="1.1" strokeLinecap="round"/>)}
      <path d="M 28 40 C 33 35 40 33.2 47 34 C 51 34.8 54 36.6 56 39" stroke={C.median} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* eyebrow: YELLOW in front of / above the eye, whitish behind */}
      <path d="M 25 46.4 C 31 42.8 41 41.6 48 42.8 C 52.5 43.6 56 45.2 58.2 47 L 57.6 49.6 C 52 47 44 45.8 37 46 C 32 46.2 28 47.4 25.2 48.8 Z" fill="url(#svsBrow)"/>
      {/* thin dark line behind the eye */}
      <path d="M 39.5 50.3 C 45 50.3 51 51.2 56.5 53.2 L 56 54.6 C 50.5 52.9 45 52.1 39.5 52 Z" fill={C.line}/>
      {blink
        ? <path d="M 33 50 Q 36.5 52 40 50" stroke="#151110" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="36.5" cy="50" r="3.8" fill="#120E0C"/>
            <circle cx="35.2" cy="48.7" r="1.35" fill="#FFF"/>
            <circle cx="37.6" cy="51.4" r="0.55" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* pinkish bill with darker culmen */}
      {open
        ? <g>
            <path d="M 26 46.6 C 23 46.8 20 47.2 17.4 47.8 L 26 50.6 Z" fill={C.bill}/>
            <path d="M 26 46.6 C 23 46.8 20 47.2 17.4 47.8" stroke={C.billDk} strokeWidth="0.8" fill="none"/>
            <path d="M 26 51.6 L 19 55.4 C 21.5 55.4 24 55 26.2 54.4 Z" fill={C.bill}/>
            <path d="M 26 50.4 L 19.5 50.6 L 26 51.8 Z" fill="#C46A68"/>
          </g>
        : <g>
            <path d="M 26 46.6 C 22.5 47.4 19.4 49 17.4 51 C 20 52.8 23 53.9 26.2 54.4 Z" fill={C.bill}/>
            <path d="M 26 46.6 C 22.5 47.4 19.4 49 17.4 51" stroke={C.billDk} strokeWidth="0.9" fill="none"/>
            <path d="M 26 51.1 L 18.2 51.2" stroke={C.billDk} strokeWidth="0.6"/>
          </g>}
    </g>
  )
}

function Legs({ y = 101 }) {
  return (
    <g stroke={C.leg} strokeWidth="1.8" strokeLinecap="round" fill="none">
      <path d={`M 54 91 L 52 ${y}`}/><path d={`M 62 92 L 62 ${y}`}/>
      <path d={`M 52 ${y} l -5 1.5 M 52 ${y} l 1 2.6 M 52 ${y} l 4 1.2 M 62 ${y} l -5 1.5 M 62 ${y} l 1 2.6 M 62 ${y} l 4 1.2`} strokeWidth="1.3"/>
    </g>
  )
}

function FlyWings({ up }) {
  if (up) return (
    <g>
      <path d="M 50 66 C 50 52 54 40 61 30 C 66 22 72 14 80 8 C 82 10 84 12 85 14 C 87 15 89 18 90 21 C 92 23 93 26 93 30 C 94 33 94 36 92 39 C 90 44 88 48 86 52 C 84 56 82 60 78 64 C 74 67 70 69 66 70 Z" fill="#3A2C22"/>
      <path d="M 66 36 L 82 11 M 70 39 L 88 18 M 74 42 L 92 28 M 78 45 L 92 38 M 80 50 L 87 51 M 77 57 L 82 60" stroke="#9C8468" strokeWidth="0.9" fill="none"/>
      <path d="M 50 66 C 50 54 54 44 60 35 C 66 36 74 40 80 46 C 78 54 74 62 66 70 Z" fill={C.wing}/>
      <path d="M 54 60 C 56 53 59 47 63 41 M 60 64 C 63 57 67 51 72 45" stroke={C.edge} strokeWidth="1" fill="none" opacity="0.8"/>
    </g>
  )
  return (
    <g>
      <path d="M 52 66 C 58 70 66 74 76 76 C 82 80 86 86 88 94 C 85 96 82 96 80 95 C 79 98 76 100 73 100 C 72 102 69 103 66 102 C 62 94 58 84 52 74 Z" fill="#3A2C22"/>
      <path d="M 70 84 L 84 94 M 68 88 L 78 98 M 65 90 L 70 100" stroke="#9C8468" strokeWidth="0.9"/>
      <path d="M 52 66 C 58 70 66 74 74 76 C 72 82 68 86 62 88 C 58 82 54 76 52 70 Z" fill={C.wing}/>
    </g>
  )
}

function Grass({ y0 = 108 }) {
  const blades = [[4, -2], [9, 3], [15, -1], [22, 2], [30, -3], [38, 1], [78, 2], [86, -2], [93, 3], [101, -1], [108, 2], [115, -3]]
  return (
    <g>
      <path d={`M 0 ${y0} C 30 ${y0 - 3} 80 ${y0 - 3} 120 ${y0} L 120 130 L 0 130 Z`} fill="url(#svsField)"/>
      {blades.map(([x, l], i) => <path key={i} d={`M ${x} ${y0 + 4} q ${l} -8 ${l * 2} -${12 + (i % 3) * 4}`} stroke={i % 2 ? '#C9A85A' : '#A88E48'} strokeWidth="1.3" fill="none" strokeLinecap="round"/>)}
    </g>
  )
}

function Scene({ pose }) {
  if (pose === 'forage') {
    return (
      <g>
        <Grass y0={104}/>
        <path d="M 98 104 C 98 90 100 80 104 70 M 104 70 l -3 -4 M 104 70 l 3 -4 M 104 70 l 0 -5" stroke="#B89A58" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <g fill="#5A4636"><ellipse cx="20" cy="108" rx="1.1" ry="0.7"/><ellipse cx="14" cy="110" rx="1.1" ry="0.7"/></g>
      </g>
    )
  }
  if (pose === 'fly') {
    return (
      <g>
        <Grass y0={118}/>
        <rect x="98" y="96" width="8" height="34" rx="1" fill="#8A7056"/>
        <path d="M 0 104 L 98 100 M 106 100 L 120 99.6" stroke="#6E5A46" strokeWidth="0.8"/>
      </g>
    )
  }
  // fence & sing: weathered wooden fence post with a wire, fall grasses
  return (
    <g>
      <path d="M 0 112 L 120 110" stroke="#6E5A46" strokeWidth="0.8"/>
      <Grass y0={114}/>
      <path d="M 44 101 L 72 101 L 71 130 L 45 130 Z" fill="url(#svsPost)"/>
      <path d="M 44 101 L 72 101 L 72 103.5 L 44 103.5 Z" fill="#B49A7A"/>
      <path d="M 50 108 C 51 116 50 122 51 128 M 62 106 C 63 112 62 120 64 128" stroke="#6E5844" strokeWidth="0.7" fill="none"/>
    </g>
  )
}

export default function SavannahSparrow({ size = 120, animated = false, style = {}, pose = 'fence', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 10), 400); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.6, 0.4, 0, 0][frame] : 0
  const blink = animated && frame === 8
  const flapUp = !animated || frame % 2 === 0

  let bird
  if (pose === 'sing') {
    // sings a thin, buzzy "tsit-tsit-tsit-tseeee-tsay" from the top of a post
    bird = (
      <g>
        <Tail/><Body breath={bob}/><Legs/>
        <g transform="rotate(-30 46 60)"><Head blink={blink} open/></g>
        {[0, 1, 2].map(i => <path key={i} d={`M ${18 - i * 3} ${30 - i * 5} q 1.5 -2 3 0 q 1.5 2 3 0`} stroke="#F4F0E6" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity={animated ? (frame + i) % 3 === 0 ? 0.95 : 0.4 : 0.75}/>)}
      </g>
    )
  } else if (pose === 'forage') {
    // runs mouse-like through the grass, stopping to pick at seeds
    const peck = animated && frame % 5 === 2 ? 3 : 0
    bird = (
      <g>
        <g transform="translate(0,7) rotate(-14 62 95)"><Tail/><Body breath={bob}/></g>
        <g stroke={C.leg} strokeWidth="1.8" strokeLinecap="round" fill="none">
          <path d="M 56 98 L 53 104 M 64 98 L 66 104"/>
          <path d="M 53 104 l -5 1 M 53 104 l 1 2.4 M 53 104 l 4 1 M 66 104 l -5 1 M 66 104 l 1 2.4 M 66 104 l 4 1" strokeWidth="1.3"/>
        </g>
        <g transform={`translate(4,${20 + peck}) rotate(${-38 - peck * 2} 46 64)`}><Head blink={blink}/></g>
      </g>
    )
  } else if (pose === 'fly') {
    bird = (
      <g transform="rotate(-4 60 70) translate(0,-8)">
        <g transform="translate(-9,4) rotate(-10 52 66)"><path d="M 50 66 C 50 52 54 40 61 30 C 66 22 72 14 80 8 C 86 14 92 24 93 32 C 92 44 86 56 78 64 Z" fill="#2A2019"/></g>
        <Tail/><Body breath={0}/>
        <path d="M 54 92 L 60 96 M 60 93 L 66 96" stroke={C.leg} strokeWidth="1.6" strokeLinecap="round"/>
        <Head blink={blink}/>
        <FlyWings up={flapUp}/>
      </g>
    )
  } else {
    bird = <g><Tail/><Body breath={bob}/><Legs/><Head blink={blink}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Savannah Sparrow">
      <defs>
        <linearGradient id="svsBrow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.yellow}/><stop offset="42%" stopColor={C.yellow}/><stop offset="70%" stopColor="#F3EDD8"/><stop offset="100%" stopColor="#E9E2CE"/>
        </linearGradient>
        <linearGradient id="svsBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.throat}/><stop offset="70%" stopColor={C.belly}/><stop offset="100%" stopColor="#E6E0D0"/>
        </linearGradient>
        <linearGradient id="svsField" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8A060"/><stop offset="100%" stopColor="#7C7040"/>
        </linearGradient>
        <linearGradient id="svsPost" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C8264"/><stop offset="100%" stopColor="#6E5A46"/>
        </linearGradient>
      </defs>
      {scene && <Scene pose={pose}/>}
      {!scene && pose !== 'fly' && <ellipse cx="58" cy={pose === 'forage' ? 106 : 103} rx="22" ry="2.4" fill="#000" opacity="0.18"/>}
      <g transform={`translate(0,${pose === 'fly' ? bob * 2 : 0})`}>{bird}</g>
    </svg>
  )
}
