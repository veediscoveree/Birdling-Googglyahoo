// Peregrine Falcon (adult) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'peregrine_falcon', poses: ['perch', 'stoop'] }

// Field marks: compact, deep-chested falcon; BLACKISH HOOD over crown and nape with a THICK
// BLACK "HELMET" MALAR (sideburn) dropping below the eye; BRIGHT WHITE CHEEK PATCH behind the
// malar and WHITE THROAT; big DARK eye with a YELLOW EYE-RING; short hooked blue-gray bill
// (dark tip) with YELLOW CERE; SLATE BLUE-GRAY back and wings barred darker; pale upper breast,
// lower breast/belly/flanks FINELY BARRED dark gray; barred "trousers"; YELLOW FEET; gray tail
// with dark bars and pale tip. In flight: long POINTED wings, finely barred underneath; in a
// stoop the wings tuck into a TEARDROP.

const BLK = '#1C1F25'
const SLATE = '#5C6B80'
const YEL = '#F2C230'

function Head({ blink = false }) {
  // Profile facing left; centre ≈ (47,36).
  return (
    <g>
      <path d="M 32 38 C 31 27 38 21 47 21 C 56 21 63 27 63 36 C 63 43 60 48 55 51 C 50 53.4 43 53 38 49.6 C 34.6 46.6 32 42.6 32 38 Z" fill="#FBF8F2"/>
      {/* hood: crown, nape and the back of the head */}
      <path d="M 32.4 37 C 32.4 26.6 39 21 47 21 C 56 21 63 27 63 36 C 63 43 61 47.6 57.4 50.8 C 56.4 46.4 56.6 42 57.8 38.4 C 54 36.2 49.4 36.6 46.6 39.4 C 42 38.8 37 39.4 33 41 Z" fill="url(#pefHood)"/>
      {/* thick black helmet malar below the eye */}
      <path d="M 37.4 39.4 C 37.4 44 38.8 48.6 41.4 52 L 46.4 52.6 C 45.6 48 45.6 43.6 47 39.2 Z" fill={BLK}/>
      {/* (the white cheek patch is the head base showing between malar and nape) */}
      {/* big dark eye with yellow eye-ring */}
      {blink
        ? <path d="M 37.4 34.6 C 39.8 36.4 44.2 36.4 46.6 34.6" stroke={YEL} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="42" cy="34" r="6" fill="#F6CC3A"/>
            <circle cx="42" cy="34" r="4.6" fill="#2A160A"/>
            <circle cx="42" cy="34.1" r="2.7" fill="#0A0604"/>
            <circle cx="40.4" cy="32.4" r="1.5" fill="#FFF"/>
            <circle cx="43.8" cy="35.8" r="0.6" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* short hooked bill: blue-gray, dark tip, yellow cere */}
      <path d="M 34 33.8 C 30.2 33.8 27.8 36 27.4 39.2 C 27.2 40.8 27.9 42 28.8 42.5 C 29 40.9 30 39.8 31.6 39.4 L 34.6 39 Z" fill="#6A7890"/>
      <path d="M 29.2 37.4 C 28 38.8 27.6 40.8 28.8 42.5 C 29 40.9 29.6 40 30.4 39.5 Z" fill={BLK}/>
      <path d="M 31.6 39.6 L 34.4 39.4 C 33.8 41 32.4 41.8 30.8 41.6 Z" fill="#8A96A8"/>
      <path d="M 35.8 33.2 C 34 33.2 33 34.4 33 36 L 33 38.6 C 34.2 39 35.4 39 36.6 38.6 Z" fill={YEL}/>
    </g>
  )
}

function Bars({ x0, x1, y0, y1, step = 2.9, color = '#5E6676', w = 0.75 }) {
  // Fine horizontal barring (drawn inside a clip path).
  const rows = []
  for (let y = y0, i = 0; y <= y1; y += step, i++) {
    rows.push(<path key={i} d={`M ${x0 + (i % 2) * 1.6} ${y} L ${x1} ${y}`} stroke={color} strokeWidth={w} strokeDasharray="2.2 1.4" strokeLinecap="round"/>)
  }
  return rows
}

function Tail({ d, bars, tip }) {
  return (
    <g>
      <path d={d} fill="url(#pefWing)"/>
      {bars.map((b, i) => <path key={i} d={b} stroke="#2E3440" strokeWidth="1.5" fill="none"/>)}
      <path d={tip} stroke="#F2EEE6" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function PerchedBody() {
  return (
    <g>
      <Tail d="M 60 84 C 62.6 96 64.4 106 65.4 116 C 69 118.6 75.4 118.6 79 116 C 78 104 74.6 92 70 82 Z"
        bars={['M 62.6 96 C 66 98 71 98 75 96', 'M 63.8 103 C 67.4 105 72.4 105 76.6 103', 'M 64.8 110 C 68.4 112 73.6 112 78 110']}
        tip="M 65.4 116 C 69 118.6 75.4 118.6 79 116"/>
      {/* deep chest: pale above, finely barred below */}
      <path d="M 37 47 C 30 57 30 74 36 85 C 41 92 50 95 57 93 C 63 90 67 83 67 74 L 65 54 C 59 48 48 45 37 47 Z" fill="url(#pefBreast)"/>
      <clipPath id="pefBodyClip"><path d="M 37 47 C 30 57 30 74 36 85 C 41 92 50 95 57 93 C 63 90 67 83 67 74 L 65 54 C 59 48 48 45 37 47 Z"/></clipPath>
      <g clipPath="url(#pefBodyClip)"><Bars x0={30} x1={68} y0={66} y1={96}/></g>
      {[[39, 58], [43, 61], [38, 63], [46, 64]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="0.7" ry="1" fill="#4E5666" opacity="0.7"/>)}
      {/* barred trousers */}
      <path d="M 44 84 C 42 89 44 93 48 94 L 58 93.4 C 60.6 90 60 86 57 83 Z" fill="#E8E2DA"/>
      <path d="M 44.6 87 L 58.6 87 M 44.6 90 L 59.4 90" stroke="#4E5666" strokeWidth="0.8" strokeDasharray="2 1.2"/>
      {/* slate back and long folded wing reaching near the tail tip */}
      <path d="M 52 47 C 60 45 67 49 69 57 L 66 66 C 62 60 58 55 53 53 Z" fill="#4E5C70"/>
      <path d="M 53 52 C 63 49 70 56 72 67 C 74 80 75 94 77 108 C 71 102 65 92 61 82 C 57 72 54.6 62 53 52 Z" fill="url(#pefWing)"/>
      {[[60, 58], [65, 61], [62, 66], [67, 68], [64, 73], [69, 75]].map(([x, y], i) => (
        <path key={i} d={`M ${x - 2.6} ${y} q 2.6 1.8 5.2 0`} stroke="#3A4456" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      ))}
      <path d="M 65 80 C 69 90 72.6 99 77 108 C 71.6 104 67 96 63.6 87 Z" fill="#262A32"/>
      <path d="M 66.4 84 l 6 17" stroke="#4A5262" strokeWidth="0.6"/>
    </g>
  )
}

function Feet({ y = 94 }) {
  return (
    <g>
      <path d={`M 45 ${y} c 0 -2.8 2.4 -3.6 4.6 -3.6 l 2.6 0 c 1.6 0 2.6 1 3 3`} fill={YEL} stroke="#B87A10" strokeWidth="0.6"/>
      <path d={`M 53 ${y + 0.2} c 0 -2.8 2.4 -3.6 4.6 -3.6 l 2.6 0 c 1.6 0 2.6 1 3 3`} fill={YEL} stroke="#B87A10" strokeWidth="0.6"/>
      <path d={`M 45.4 ${y} l -0.8 1.8 M 53.4 ${y + 0.2} l -0.8 1.8 M 55.2 ${y - 0.6} l 0.4 2 M 63.2 ${y - 0.4} l 0.4 2`} stroke={BLK} strokeWidth="1.1" strokeLinecap="round"/>
    </g>
  )
}

function Perched({ blink, tilt }) {
  return (
    <g>
      <PerchedBody/>
      <Feet/>
      <g transform={`rotate(${tilt} 48 50)`}><Head blink={blink}/></g>
    </g>
  )
}

function Stoop() {
  // Teardrop dive: wings folded tight along the body, wingtips past the tail, head-first.
  return (
    <g transform="rotate(-48 62 62)">
      <path d="M 80 57 C 92 57.6 100 59 107 60.6 C 98 61 88 60.6 80 59.6 Z" fill="#262A32"/>
      <Tail d="M 90 60 L 111 60.4 C 112.6 62 112.6 63.8 111 65.4 L 90 65 Z"
        bars={['M 98 60.2 C 98.8 62 98.8 63.6 98 65.2', 'M 104 60.4 C 104.8 62 104.8 63.6 104 65.2']}
        tip="M 111.2 60.6 C 112.6 62 112.6 63.8 111.2 65.2"/>
      <path d="M 36 62 C 36 54 46 50 58 51 C 72 52 86 57 96 62 C 86 67 72 72 58 73 C 46 74 36 70 36 62 Z" fill="url(#pefBreast)"/>
      <clipPath id="pefStoopClip"><path d="M 36 62 C 36 54 46 50 58 51 C 72 52 86 57 96 62 C 86 67 72 72 58 73 C 46 74 36 70 36 62 Z"/></clipPath>
      <g clipPath="url(#pefStoopClip)">{[50, 54, 58, 62, 66, 70, 74, 78, 82].map(x => <path key={x} d={`M ${x} 63 L ${x + 1} 75`} stroke="#5E6676" strokeWidth="0.75" strokeDasharray="2.2 1.4"/>)}</g>
      <path d="M 40 57 C 48 51.6 62 50.4 74 53 C 84 55.4 92 58.6 96 62 C 80 61.4 60 60.6 40 60 Z" fill="#4E5C70"/>
      <path d="M 48 60.4 C 60 57.4 80 58.4 108 62.6 C 92 66 74 68 60 67.6 C 52 67.2 48 64.4 48 60.4 Z" fill="url(#pefWing)"/>
      <path d="M 84 61 C 92 61.6 100 62 108 62.6 C 100 64.6 92 65.8 84 66.4 Z" fill="#262A32"/>
      {[[58, 61], [64, 60.8], [70, 61], [76, 61.4], [62, 64.4], [68, 64.6]].map(([x, y], i) => <path key={i} d={`M ${x - 2} ${y} q 2 1.4 4 0`} stroke="#3A4456" strokeWidth="0.9" fill="none"/>)}
      <g transform="translate(40,59) rotate(-2) scale(0.8) translate(-47,-38)"><Head/></g>
    </g>
  )
}

function FlightWing() {
  // Left wing from below: long and POINTED, finely barred gray, slightly swept.
  const d = 'M 55 50 C 45 46 32 42.4 20 41.6 C 13 41.4 8 42 3.6 43.6 C 14 47.6 26 53.6 36 59.4 C 42 62.6 48 64.6 55 65 Z'
  return (
    <g>
      <path d={d} fill="#D8D6D2"/>
      <clipPath id="pefUwClip"><path d={d}/></clipPath>
      <g clipPath="url(#pefUwClip)">
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${8 + i * 5.4} 38 L ${14 + i * 5.4} 68`} stroke="#5A6272" strokeWidth="0.9" strokeDasharray="2 1.4"/>)}
        <path d="M 0 40 L 20 40 L 30 70 L 0 70 Z" fill="#6A7282" opacity="0.45"/>
      </g>
      <path d="M 55 50 C 45 46 32 42.4 20 41.6 C 13 41.4 8 42 3.6 43.6" stroke="#4E5C70" strokeWidth="1.4" fill="none"/>
    </g>
  )
}

function Flight({ flap }) {
  return (
    <g>
      <g transform={`translate(0,${flap}) rotate(${-flap * 1.4} 55 56)`}><FlightWing/></g>
      <g transform={`translate(120,${flap}) scale(-1,1) rotate(${-flap * 1.4} 55 56)`}><FlightWing/></g>
      <Tail d="M 55 70 L 65 70 C 68 80 69.6 88 69.6 94 C 63.6 96.6 56.4 96.6 50.4 94 C 50.4 88 52 80 55 70 Z"
        bars={['M 52.2 82 L 67.8 82', 'M 51.2 88 L 68.8 88']} tip="M 50.4 94 C 56.4 96.6 63.6 96.6 69.6 94"/>
      <ellipse cx="60" cy="58" rx="9.4" ry="14.6" fill="url(#pefBreast)"/>
      <clipPath id="pefFlClip"><ellipse cx="60" cy="58" rx="9.4" ry="14.6"/></clipPath>
      <g clipPath="url(#pefFlClip)"><Bars x0={48} x1={72} y0={58} y1={74} step={2.8}/></g>
      <path d="M 56 70.6 c 0 2.4 1.6 3.4 2.8 3.4 M 64 70.6 c 0 2.4 -1.6 3.4 -2.8 3.4" stroke={YEL} strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <g transform="translate(59,37) scale(0.72) translate(-47,-38)"><Head/></g>
    </g>
  )
}

function Mantle({ blink }) {
  // Hunched over a captured pigeon with wings spread and drooped like a cape, tail fanned.
  return (
    <g>
      {/* far wing drooped to the left */}
      <path d="M 50 54 C 40 50 28 54 18 66 C 13 72 10 80 8 90 C 16 86 24 86 32 88 C 40 80 46 70 52 62 Z" fill="#4A576A"/>
      <path d="M 8 90 C 16 86 24 86 32 88 C 28 84 22 82 14 82 Z" fill="#262A32"/>
      {/* the pigeon (prey), mostly hidden */}
      <path d="M 30 96 C 34 86 50 84 62 88 C 70 91 74 95 74 98 L 30 98 Z" fill="#8E96A4"/>
      <path d="M 42 89 l 8 0.6 M 44 92 l 9 0.6" stroke="#3E4450" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M 62 88 C 66 89 69 91 70 93 C 67 92.4 64 91.4 62 90 Z" fill="#6E9A84" opacity="0.8"/>
      {/* hunched body */}
      <path d="M 40 58 C 44 50 56 48 66 52 C 74 56 78 64 76 72 C 72 80 60 84 50 82 C 42 80 37 70 40 58 Z" fill="url(#pefBreast)"/>
      <clipPath id="pefMaClip"><path d="M 40 58 C 44 50 56 48 66 52 C 74 56 78 64 76 72 C 72 80 60 84 50 82 C 42 80 37 70 40 58 Z"/></clipPath>
      <g clipPath="url(#pefMaClip)"><Bars x0={36} x1={78} y0={64} y1={84}/></g>
      <path d="M 50 82 L 48 90 M 58 82 L 58 90" stroke={YEL} strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M 44 90.6 q 4 -2 7 0 M 55 90.6 q 4 -2 7 0" stroke={YEL} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* near wing arched up and drooped forward-right */}
      <path d="M 54 54 C 62 44 76 42 88 50 C 96 56 102 68 106 84 C 100 82 92 82 86 84 C 82 74 76 66 66 62 Z" fill="url(#pefWing)"/>
      {[[66, 50], [74, 50], [82, 54], [70, 56], [78, 58], [86, 62]].map(([x, y], i) => <path key={i} d={`M ${x - 2.4} ${y} q 2.4 1.8 4.8 0`} stroke="#3A4456" strokeWidth="1" fill="none"/>)}
      <path d="M 92 64 C 98 70 103 77 106 84 C 100 82 92 82 86 84 C 86 76 88 70 92 64 Z" fill="#262A32"/>
      <path d="M 94 70 l 6 12 M 90 72 l 2 10" stroke="#4A5262" strokeWidth="0.6"/>
      <g transform="translate(42,48) rotate(-10) scale(0.92) translate(-47,-38)"><Head blink={blink}/></g>
    </g>
  )
}

function Scene({ ledge, high }) {
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" rx="10" fill="url(#pefSky)"/>
      <path d="M 70 18 q 6 -4 12 0 q 5 -3 9 1 Z" fill="#FFF" opacity="0.6"/>
      {/* distant skyline + suspension-bridge tower and cables */}
      <g transform={high ? 'translate(0,22)' : ''} opacity="0.9">
        <path d="M 0 96 L 0 78 L 8 78 L 8 70 L 15 70 L 15 82 L 22 82 L 22 64 L 26 60 L 30 64 L 30 84 L 38 84 L 38 74 L 46 74 L 46 96 Z" fill="#9AA8BC"/>
        <path d="M 82 96 L 82 76 L 90 76 L 90 66 L 96 66 L 96 80 L 104 80 L 104 70 L 112 70 L 112 84 L 120 84 L 120 96 Z" fill="#9AA8BC"/>
        <path d="M 58 96 L 58 52 L 61 52 L 61 96 M 67 96 L 67 52 L 70 52 L 70 96" stroke="#8494AA" strokeWidth="2.4"/>
        <path d="M 56.6 54 L 71.4 54 M 56.6 66 L 71.4 66" stroke="#8494AA" strokeWidth="1.8"/>
        <path d="M 0 74 Q 32 94 59 53 M 69 53 Q 96 94 120 74" stroke="#8494AA" strokeWidth="1" fill="none"/>
        <path d="M 0 90 L 120 90" stroke="#8494AA" strokeWidth="2"/>
        {high && <path d="M 0 96 L 120 96 L 120 108 L 0 108 Z" fill="#7E92A8"/>}
      </g>
      {ledge && (
        <g>
          {/* stone cornice ledge on a high-rise, facade with windows below */}
          <path d="M 0 104 L 120 104 L 120 120 C 120 125.5 115.5 130 110 130 L 10 130 C 4.5 130 0 125.5 0 120 Z" fill="#B4A894"/>
          {[8, 34, 60, 86].map(x => <rect key={x} x={x} y="110" width="16" height="20" rx="1" fill="#6E7E92"/>)}
          {[8, 34, 60, 86].map(x => <path key={x} d={`M ${x + 2} 128 L ${x + 12} 112`} stroke="#A8BCD0" strokeWidth="1.2" opacity="0.5"/>)}
          <path d="M 0 94 L 120 94 L 120 100 L 116 104 L 4 104 L 0 100 Z" fill="#D2C6B2"/>
          <path d="M 0 94 L 120 94" stroke="#E6DCCA" strokeWidth="1.2"/>
          <path d="M 4 104 L 116 104" stroke="#8A7E6C" strokeWidth="1.4"/>
          {[18, 48, 78, 108].map(x => <path key={x} d={`M ${x} 94.6 L ${x} 103.4`} stroke="#B0A490" strokeWidth="0.8"/>)}
        </g>
      )}
    </g>
  )
}

export default function PeregrineFalcon({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'flight' ? 140 : 440); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.5, -0.9, -0.5, 0, 0.4, 0.7, 0.4][frame] : 0
  const blink = animated && frame === 6
  const tilt = animated ? [0, 0, 0, -4, -4, -4, 0, 0][frame] : 0
  const onLedge = pose === 'perch' || pose === 'mantle'

  let bird
  if (pose === 'stoop') {
    bird = <g transform={`translate(${bob * 0.6},${-bob})`}><Stoop/></g>
  } else if (pose === 'flight') {
    bird = <Flight flap={animated ? [0, 1.4, 2.6, 1.4, 0, -1.4, -2.6, -1.4][frame] : 0}/>
  } else if (pose === 'mantle') {
    bird = <g transform={`translate(0,${4 + bob * 0.3})`}><Mantle blink={blink}/></g>
  } else {
    bird = <g transform={`translate(0,${bob * 0.4})`}><Perched blink={blink} tilt={tilt}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Peregrine Falcon">
      <defs>
        <linearGradient id="pefHood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3C4452"/><stop offset="100%" stopColor="#1E2228"/>
        </linearGradient>
        <linearGradient id="pefWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7888A0"/><stop offset="100%" stopColor={SLATE}/>
        </linearGradient>
        <linearGradient id="pefBreast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF7F0"/><stop offset="100%" stopColor="#E6DED2"/>
        </linearGradient>
        <linearGradient id="pefSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8EBCE0"/><stop offset="100%" stopColor="#EADFD0"/>
        </linearGradient>
      </defs>
      {scene && <Scene ledge={onLedge} high={!onLedge}/>}
      {!scene && onLedge && <path d="M 14 96.4 L 104 96.4" stroke="#B4A894" strokeWidth="6" strokeLinecap="round"/>}
      {bird}
      {pose === 'stoop' && <path d="M 86 20 l 12 -12 M 96 30 l 14 -14 M 78 14 l 8 -8" stroke="#FFF" strokeWidth="1.3" opacity={animated && frame % 2 ? 0.4 : 0.75} strokeLinecap="round"/>}
    </svg>
  )
}
