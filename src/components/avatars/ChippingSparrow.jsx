// Chipping Sparrow (adult, breeding-style "classic" look) — new-style avatar.
// Follows the WoodDuck.jsx template: meta export, viewBox 0 0 120 130, unique "chs" ids,
// scene backdrop optional, gentle idle (blink + breathing bob), field marks listed below.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'chipping_sparrow', poses: ['perch', 'sing', 'forage', 'fly'] }

// Field marks (the acceptance test — each must be visible):
//  • bright RUFOUS CAP (solid, unstreaked chestnut crown)
//  • crisp WHITE EYEBROW (supercilium) below the cap
//  • BLACK EYE-LINE running from the bill, through the eye, back to the nape
//  • plain, unstreaked pale-GRAY face, collar and breast (no streaks, no spot — vs Song Sparrow)
//  • small slim sparrow; small dark bill; brown back streaked black; two thin white wing bars
//  • fairly long, slightly notched dark tail
// (Fall nonbreeders are duller — buffy streaked crown, pale bill — see data entry.)

const C = {
  cap: '#B2451C', capHi: '#CF6232', brow: '#F7F4EC', line: '#1C1714',
  face: '#A9ADA9', throat: '#ECEDE8', breast: '#B9BDB8', belly: '#EDEDE8',
  back: '#8C6640', backDk: '#2C2016', edge: '#D2AE7C', wing: '#7A5534', tail: '#4E4136',
  bill: '#26221F', leg: '#D6A48A',
}

function Tail() {
  // long, slightly notched
  return (
    <g>
      <path d="M 80 80 C 90 86 100 93 111 101 L 108.5 102.6 L 110 105.6 L 105 106.4 C 96 99 86 93 77 88 Z" fill={C.tail}/>
      <path d="M 82 83 C 91 89 99 95 107 102" stroke="#6B5A4A" strokeWidth="0.7" fill="none"/>
    </g>
  )
}

function Body({ breath = 0 }) {
  return (
    <g>
      {/* underparts: plain gray breast fading to whitish belly — NO streaks */}
      <path d={`M 31 63 C 35 56 46 55 56 57 C 72 60 86 68 88 78 C 89 88 78 ${95 + breath} 63 ${95 + breath} C 47 ${95 + breath} 34 88 31 77 C 30 72 29 67 31 63 Z`} fill="url(#chsBelly)"/>
      {/* mantle (streaked brown back) */}
      <path d="M 44 58 C 56 52 74 55 86 67 C 88 70 88 73 87 75 C 76 66 62 61 50 62 Z" fill={C.back}/>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M ${54 + i * 7} ${57.5 + i * 1.6} q 4 2 6 5`} stroke={C.backDk} strokeWidth="1.4" fill="none" strokeLinecap="round"/>)}
      <Wing/>
    </g>
  )
}

function Wing() {
  // folded wing: rusty-brown coverts edged buff, two thin white wing bars, dark primaries
  return (
    <g>
      <path d="M 50 63 C 60 59 74 62 84 70 C 91 76 95 82 98 89 C 88 91 74 89 63 84 C 54 80 49 72 50 63 Z" fill={C.wing}/>
      {/* tertials: dark centres with buff edges */}
      <path d="M 66 72 C 74 74 82 79 88 86 C 80 87 72 85 66 82 Z" fill={C.backDk}/>
      <path d="M 66 72 C 74 74 82 79 88 86" stroke={C.edge} strokeWidth="1.2" fill="none"/>
      <path d="M 70 77 C 77 79 83 83 90 88" stroke={C.edge} strokeWidth="0.9" fill="none"/>
      {/* primaries */}
      <path d="M 84 80 C 89 83 94 86 98 89 C 93 90 88 89 84 87 Z" fill="#3A2E24"/>
      {/* two thin white wing bars */}
      <path d="M 53 66 C 59 64 65 65 70 67" stroke="#F4F0E6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 55 71.5 C 61 70 67 71 72 73.5" stroke="#F4F0E6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function Head({ blink = false, open = false }) {
  return (
    <g>
      {/* head base — pale gray face */}
      <path d="M 24 50 C 23 38 33 32 42 33 C 52 34 58 42 57 52 C 56 60 49 65 41 65 C 31 65 25 58 24 50 Z" fill={C.face}/>
      {/* whitish throat / chin */}
      <path d="M 25 54 C 28 60 34 65 42 65 C 46 65 49 64 51 62 C 44 61 38 59 33 56 C 30 55 27 54 25 54 Z" fill={C.throat}/>
      {/* RUFOUS CAP */}
      <path d="M 25 45 C 26 36 34 31.5 42 32 C 51 32.5 57 39 58 46.5 C 51 42 43 40.5 36 41.2 C 31 41.8 27.5 43.4 25 45 Z" fill="url(#chsCap)"/>
      {/* crisp WHITE EYEBROW */}
      <path d="M 24.6 46.6 C 30 42.6 40 41.4 48 42.6 C 52.5 43.4 56 45 58.2 47 L 57.6 49.8 C 52 46.8 44 45.4 37 45.8 C 31.5 46.2 27.6 47.8 25 49.2 Z" fill={C.brow}/>
      {/* BLACK EYE-LINE: lores to bill + behind eye to nape */}
      <path d="M 24.8 49.8 C 29 49 33.5 48.6 38 48.7 C 45 48.9 51.5 50.3 57 52.6 L 56.3 54.6 C 50.5 52.8 44.5 51.8 38 51.7 C 33.5 51.7 29 52.1 25.2 52.6 Z" fill={C.line}/>
      {/* EYE — big, bright, catch-light */}
      {blink
        ? <path d="M 33 50 Q 36.5 52 40 50" stroke="#151110" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="36.5" cy="50" r="3.8" fill="#120E0C"/>
            <circle cx="35.2" cy="48.7" r="1.35" fill="#FFF"/>
            <circle cx="37.6" cy="51.4" r="0.55" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* small conical bill — dark in breeding adults */}
      {open
        ? <g>
            <path d="M 26 46.6 C 23 46.8 20 47.2 17.4 47.8 L 26 50.6 Z" fill={C.bill}/>
            <path d="M 26 51.6 L 19 55.4 C 21.5 55.4 24 55 26.2 54.4 Z" fill="#3A332E"/>
            <path d="M 26 50.4 L 19.5 50.6 L 26 51.8 Z" fill="#E7A6A0"/>
          </g>
        : <g>
            <path d="M 26 46.6 C 22.5 47.4 19.6 49 17.6 51 C 20 52.8 23 53.9 26.2 54.4 Z" fill={C.bill}/>
            <path d="M 26 51.1 L 18.4 51.2" stroke="#55504A" strokeWidth="0.6"/>
            <path d="M 24.5 48 C 22.5 48.6 21 49.4 19.6 50.4" stroke="#5A5550" strokeWidth="0.6" fill="none" opacity="0.8"/>
          </g>}
    </g>
  )
}

function Legs({ ground = false }) {
  const y = ground ? 104 : 101
  return (
    <g stroke={C.leg} strokeWidth="1.8" strokeLinecap="round" fill="none">
      <path d={`M 54 91 L 52 ${y}`}/><path d={`M 62 92 L 62 ${y}`}/>
      <path d={`M 52 ${y} l -5 1.5 M 52 ${y} l 1 2.6 M 52 ${y} l 4 1.2 M 62 ${y} l -5 1.5 M 62 ${y} l 1 2.6 M 62 ${y} l 4 1.2`} strokeWidth="1.3"/>
    </g>
  )
}

function FlyWings({ up }) {
  // Near wing in flight: rounded sparrow wing with fanned dark primaries, brown coverts
  // and the two white wing bars. up = top of the wingbeat, else the down-stroke.
  if (up) return (
    <g>
      <path d="M 50 66 C 50 52 54 40 61 30 C 66 22 72 14 80 8 C 82 10 84 12 85 14 C 87 15 89 18 90 21 C 92 23 93 26 93 30 C 94 33 94 36 92 39 C 90 44 88 48 86 52 C 84 56 82 60 78 64 C 74 67 70 69 66 70 Z" fill="#3A2E24"/>
      <path d="M 50 66 C 50 54 54 44 60 35 C 66 36 74 40 80 46 C 78 54 74 62 66 70 Z" fill={C.wing}/>
      <path d="M 52 60 C 54 52 57 45 61 39" stroke="#F4F0E6" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 58 64 C 61 56 65 49 70 43" stroke="#F4F0E6" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 66 36 L 82 11 M 70 39 L 88 18 M 74 42 L 92 28 M 78 45 L 92 38 M 80 50 L 87 51 M 77 57 L 82 60" stroke="#6E5A48" strokeWidth="0.8" fill="none"/>
      <path d="M 61 30 C 66 22 72 14 80 8" stroke="#8E745C" strokeWidth="0.9" fill="none"/>
    </g>
  )
  return (
    <g>
      <path d="M 52 66 C 58 70 66 74 76 76 C 82 80 86 86 88 94 C 85 96 82 96 80 95 C 79 98 76 100 73 100 C 72 102 69 103 66 102 C 62 94 58 84 52 74 Z" fill="#3A2E24"/>
      <path d="M 52 66 C 58 70 66 74 74 76 C 72 82 68 86 62 88 C 58 82 54 76 52 70 Z" fill={C.wing}/>
      <path d="M 56 70 C 60 73 64 75 69 76 M 57 76 C 61 79 65 80 69 80" stroke="#F4F0E6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 70 84 L 84 94 M 68 88 L 78 98 M 65 90 L 70 100" stroke="#6E5A48" strokeWidth="0.8"/>
    </g>
  )
}

function Scene({ pose }) {
  if (pose === 'forage') {
    // mown lawn with a few clover leaves and seeds
    return (
      <g>
        <path d="M 0 104 C 30 101 80 101 120 104 L 120 130 L 0 130 Z" fill="url(#chsLawn)"/>
        {[6, 14, 22, 34, 46, 70, 84, 96, 108, 116].map((x, i) => <path key={i} d={`M ${x} 105 l ${i % 2 ? 1.5 : -1.5} -5 M ${x + 3} 105 l 0.5 -4`} stroke="#4E8A3A" strokeWidth="1.1" strokeLinecap="round"/>)}
        <g fill="#5C9A48"><circle cx="92" cy="112" r="2.2"/><circle cx="95.5" cy="111" r="2.2"/><circle cx="93.8" cy="114.6" r="2.2"/></g>
        <g fill="#E4D2A0"><ellipse cx="16" cy="108" rx="1.2" ry="0.8"/><ellipse cx="20" cy="110" rx="1.2" ry="0.8"/><ellipse cx="11" cy="111" rx="1.2" ry="0.8"/></g>
      </g>
    )
  }
  if (pose === 'fly') {
    return (
      <g opacity="0.9">
        <path d="M 0 118 C 30 114 80 114 120 118 L 120 130 L 0 130 Z" fill="url(#chsLawn)"/>
        <path d="M 100 130 C 101 116 104 106 112 96 M 105 112 C 110 110 114 106 116 100" stroke="#6B4E36" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx="116" cy="98" rx="4" ry="2.2" fill="#6FA858" transform="rotate(-40 116 98)"/>
      </g>
    )
  }
  // perch & sing: a slim pine/oak twig with a couple of leaves
  return (
    <g>
      <path d="M 2 104 C 30 101 70 102 118 98" stroke="#6B4E36" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
      <path d="M 92 100 C 98 94 104 92 110 90 M 22 103 C 18 110 14 114 8 116" stroke="#6B4E36" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="111" cy="88.5" rx="5" ry="2.4" fill="#6FA858" transform="rotate(-20 111 88.5)"/>
      <ellipse cx="7" cy="117" rx="4.6" ry="2.2" fill="#5C9A48" transform="rotate(30 7 117)"/>
      <path d="M 111 88.5 L 106.5 90.2 M 7 117 L 11 114.8" stroke="#3E7030" strokeWidth="0.6"/>
    </g>
  )
}

export default function ChippingSparrow({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 10), 380); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.6, 0.4, 0, 0][frame] : 0
  const blink = animated && frame === 7
  const flapUp = !animated || frame % 2 === 0

  let bird
  if (pose === 'sing') {
    // head thrown back, bill open — the dry, even "chip-chip-chip" trill
    bird = (
      <g>
        <Tail/><Body breath={bob}/><Legs/>
        <g transform="rotate(-30 46 60)"><Head blink={blink} open/></g>
        {[0, 1, 2].map(i => <path key={i} d={`M ${18 - i * 3} ${30 - i * 5} q 3 -2 6 0`} stroke="#F4F0E6" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity={animated ? (frame + i) % 3 === 0 ? 0.95 : 0.4 : 0.75}/>)}
      </g>
    )
  } else if (pose === 'forage') {
    // crouched low on the lawn, tail cocked, bill down picking up a seed
    const peck = animated && frame % 5 === 2 ? 3 : 0
    bird = (
      <g>
        <g transform="translate(0,7) rotate(-14 62 95)"><Tail/><Body breath={bob}/></g>
        <g stroke={C.leg} strokeWidth="1.8" strokeLinecap="round" fill="none">
          <path d="M 56 98 L 55 104 M 64 98 L 65 104"/>
          <path d="M 55 104 l -5 1 M 55 104 l 1 2.4 M 55 104 l 4 1 M 65 104 l -5 1 M 65 104 l 1 2.4 M 65 104 l 4 1" strokeWidth="1.3"/>
        </g>
        <g transform={`translate(4,${20 + peck}) rotate(${-38 - peck * 2} 46 64)`}><Head blink={blink}/></g>
      </g>
    )
  } else if (pose === 'fly') {
    // bounding flight: far wing peeks behind, tail slightly spread, feet tucked
    bird = (
      <g transform="rotate(-4 60 70) translate(0,-6)">
        <g transform="translate(-9,4) rotate(-10 52 66)" opacity="0.9"><path d="M 50 66 C 50 52 54 40 61 30 C 66 22 72 14 80 8 C 86 14 92 24 93 32 C 92 44 86 56 78 64 Z" fill="#2A2019"/></g>
        <path d="M 80 82 C 92 86 104 90 114 92 L 113 97 C 104 99 92 96 79 89 Z" fill="#40352C"/>
        <Tail/><Body breath={0}/>
        <path d="M 54 92 L 60 96 M 60 93 L 66 96" stroke={C.leg} strokeWidth="1.6" strokeLinecap="round"/>
        <Head blink={blink}/>
        <FlyWings up={flapUp}/>
        <path d="M 104 70 h 10 M 100 76 h 12 M 106 82 h 8" stroke="#CFE3E8" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      </g>
    )
  } else {
    bird = <g><Tail/><Body breath={bob}/><Legs/><Head blink={blink}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Chipping Sparrow">
      <defs>
        <linearGradient id="chsCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.capHi}/><stop offset="100%" stopColor={C.cap}/>
        </linearGradient>
        <linearGradient id="chsBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.breast}/><stop offset="45%" stopColor={C.breast}/><stop offset="85%" stopColor={C.belly}/><stop offset="100%" stopColor="#DCDBD4"/>
        </linearGradient>
        <linearGradient id="chsLawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FAE56"/><stop offset="100%" stopColor="#3E7A36"/>
        </linearGradient>
      </defs>
      {scene && <Scene pose={pose}/>}
      {!scene && pose !== 'fly' && <ellipse cx="58" cy={pose === 'forage' ? 106 : 103} rx="22" ry="2.4" fill="#000" opacity="0.18"/>}
      <g transform={`translate(0,${pose === 'fly' ? bob * 2 : 0})`}>{bird}</g>
    </svg>
  )
}
