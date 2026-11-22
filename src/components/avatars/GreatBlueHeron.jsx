// Great Blue Heron (adult) — "accurate first, cute second, in habitat".
// Follows the WoodDuck.jsx template conventions (meta, props, viewBox 0 0 120 130, "gbh" ids).
import { useEffect, useState } from 'react'

export const meta = { birdId: 'great_blue_heron', poses: ['stand', 'stalk', 'fish', 'fly', 'hunch'] }

// Field marks: very tall blue-gray wader; WHITE face and crown with a broad BLACK stripe
// above the eye that runs back into long black head PLUMES; long dagger YELLOW-ORANGE bill;
// yellow eye; long S-curved neck, gray with a black-and-white streaked foreneck; shaggy pale
// gray breast plumes; black shoulder patch; chestnut "thighs"; long dark legs. In flight the
// neck is tucked into an S, legs trail past the tail, wings broad and two-toned (blue-gray
// coverts, blackish flight feathers).

const NECK = '#9DA8B9'

// Head centred on (0,0), facing left. Neck joins at about (3,5).
function Head({ sway = 0, blink = false }) {
  return (
    <g>
      <g transform={`rotate(${sway} 5 -2)`}>
        <path d="M 4 -4.5 C 12 -6 21 -4.5 29 0.5 C 20 -2 12 -2.5 4 -1.5 Z" fill="#141418"/>
        <path d="M 5 -2.5 C 12 -2.5 18 -1 24 3 C 17 1 11 0.5 5 0.5 Z" fill="#141418"/>
      </g>
      <ellipse cx="0" cy="0" rx="8" ry="6.4" fill="#F7F7F2"/>
      <path d="M -6 -3.2 C -2 -6.2 4.5 -6.2 8.2 -1.6 C 4 -2.4 -1 -2.2 -6 -1.2 Z" fill="#141418"/>
      <path d="M 1 5.5 C 3 3.5 6 2.6 8 2.6 C 7.5 5 5 6.5 2 6.6 Z" fill={NECK}/>
      {/* dagger bill */}
      <path d="M -6.5 -2.4 C -13 -1.8 -22 -0.2 -29 1.4 C -22 2.2 -13 3.4 -6.5 3.6 Z" fill="url(#gbhBill)"/>
      <path d="M -6.5 -2.4 C -13 -1.8 -22 -0.2 -29 1.4" stroke="#7A5418" strokeWidth="0.6" fill="none"/>
      <path d="M -7 1 L -22 1.6" stroke="#8A5E18" strokeWidth="0.5" opacity="0.8"/>
      <path d="M -6.6 -1.8 L -3.6 -0.6 L -6.6 1 Z" fill="#7FA8A0"/>
      {blink
        ? <path d="M -4.6 -0.2 q 2.6 1.4 5.2 0" stroke="#4A4020" strokeWidth="1" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="-2" cy="-0.2" r="2.7" fill="#F2D21C" stroke="#9A8418" strokeWidth="0.4"/>
            <circle cx="-2" cy="-0.2" r="1.45" fill="#111"/>
            <circle cx="-2.7" cy="-0.9" r="0.75" fill="#FFF"/>
          </g>}
    </g>
  )
}

// Neck: soft gray stroke, with a pale foreneck band set INSIDE the front half of the neck
// (blended part-way from the centre line toward `front`) and a column of short black streaks
// down the middle of that band.
function mix(d, front, t) {
  const a = d.match(/-?\d*\.?\d+/g), b = front.match(/-?\d*\.?\d+/g)
  if (!a || !b || a.length !== b.length) return front
  let i = 0
  return d.replace(/-?\d*\.?\d+/g, () => { const v = +a[i] + (+b[i] - +a[i]) * t; i++; return v.toFixed(2) })
}

function Neck({ d, front, w = 8 }) {
  const band = mix(d, front, 0.58)
  const streak = mix(d, front, 0.6)
  return (
    <g>
      <path d={d} stroke={NECK} strokeWidth={w} fill="none" strokeLinecap="round"/>
      <path d={band} stroke="#EEEEE8" strokeWidth={w * 0.42} fill="none" strokeLinecap="round"/>
      <path d={streak} stroke="#2E2E36" strokeWidth="0.75" fill="none" strokeDasharray="0.9 3.6" strokeLinecap="round" pathLength="36" opacity="0.8"/>
    </g>
  )
}

function Body() {
  // Upright-ish wading body, tail end down to the right.
  return (
    <g>
      <path d="M 40 62 C 44 52 62 50 76 56 C 88 62 96 74 100 88 C 92 91 80 89 70 87 C 56 85 42 78 40 62 Z" fill="url(#gbhBody)"/>
      <path d="M 50 60 C 62 56 78 62 88 74 C 94 82 98 88 100 90 C 90 88 78 84 68 80 C 58 76 52 70 50 60 Z" fill="#4F6686" opacity="0.65"/>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M ${70 + i * 4} ${66 + i * 2} C ${82 + i * 3} ${74 + i * 2} ${92 + i * 2} ${84 + i} ${101 + i} ${93 + i}`} stroke="#C9D3DE" strokeWidth="0.8" fill="none" opacity="0.75"/>)}
      <path d="M 48 62 C 50 58 55 57 58 59.5 C 57 64.5 54 67.5 50.5 68.5 Z" fill="#17171C"/>
    </g>
  )
}

function BreastPlumes({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M 38 58 C 35 64 35 74 37 84 L 39.5 79 L 41 86 L 43 79 L 45.5 85 L 46.5 77 L 49 81 C 49 72 47 64 44 58 Z" fill="#C3CCD6"/>
      <path d="M 39 64 L 39.5 78 M 42 63 L 42.5 80 M 45 64 L 46 76" stroke="#8D98A8" strokeWidth="0.6"/>
    </g>
  )
}

function Legs({ lift = false, feet = false }) {
  return (
    <g stroke="#3A332C" strokeLinecap="round" fill="none">
      {lift
        ? <path d="M 72 88 L 80 100 L 72 108 M 72 108 l -3 1.5 M 72 108 l -2 3" strokeWidth="2.2"/>
        : <path d="M 72 88 L 76 106 L 75 124" strokeWidth="2.4"/>}
      <path d="M 64 88 L 62 106 L 63 124" strokeWidth="2.4"/>
      {feet && <path d="M 63 124 l -6 1 M 63 124 l -3 2.5 M 63 124 l 4 0.6" strokeWidth="1.4"/>}
      {feet && !lift && <path d="M 75 124 l -6 1 M 75 124 l -3 2.5 M 75 124 l 4 0.6" strokeWidth="1.4"/>}
      <path d="M 62 84 C 63 88.5 66 90.5 69.5 90 C 72.5 89.5 74.5 86.5 74 83.5 Z" fill="#9A5A34" stroke="none"/>
    </g>
  )
}

function Reeds({ sway = 0 }) {
  return (
    <g stroke="#5E7A3A" strokeWidth="1.4" strokeLinecap="round" fill="none">
      <path d={`M 108 120 Q 107 96 ${110 + sway} 72`}/>
      <path d={`M 114 120 Q 116 100 ${117 + sway} 82`}/>
      <path d={`M 103 120 Q 101 104 ${100 + sway} 92`}/>
      <path d={`M 8 120 Q 9 104 ${6 + sway} 92`}/>
      <ellipse cx={110 + sway} cy="77" rx="1.8" ry="5" fill="#6A4628" stroke="none"/>
    </g>
  )
}

function Water({ shimmer = 0.7 }) {
  return (
    <g>
      <path d="M 0 112 Q 15 110 30 112 T 60 112 T 90 112 T 120 112 L 120 130 L 0 130 Z" fill="url(#gbhWater)"/>
      <path d="M 10 118 q 7 -2 14 0 M 84 121 q 9 -2 18 0 M 40 125 q 6 -1.5 12 0" stroke="#A8D8EC" strokeWidth="1" fill="none" opacity={shimmer} strokeLinecap="round"/>
    </g>
  )
}

export default function GreatBlueHeron({ size = 120, animated = false, style = {}, pose = 'stand', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 500); return () => clearInterval(id) }, [animated])
  const sway = animated ? [0, 2, 3.5, 2, 0, -1.5, -2.5, -1.5][frame] : 0
  const flap = animated ? [0, 2, 4, 2, 0, -2, -3, -2][frame] : 0
  const blink = animated && frame === 6
  const shimmer = animated ? [0.5, 0.7, 0.85, 0.7, 0.5, 0.4, 0.35, 0.4][frame] : 0.7

  let bird
  if (pose === 'stalk') {
    // Leaning forward, neck extended low over the water, one foot lifted mid-step.
    bird = (
      <g>
        <Legs lift feet={!scene}/>
        <g transform="rotate(-12 70 80) translate(12,5)"><Body/></g>
        <g transform="rotate(-12 70 80) translate(12,5)"><BreastPlumes/></g>
        <Neck d="M 58 64 C 48 57 38 60 32 69" front="M 56 68.5 C 47 62 39 65 35 72"/>
        <g transform="translate(28,70) rotate(-40) scale(1.12)"><Head sway={sway} blink={blink}/></g>
      </g>
    )
  } else if (pose === 'fish') {
    // Just caught a fish: head raised, the fish held crosswise in the bill tip.
    bird = (
      <g>
        <Legs feet={!scene}/>
        <Body/>
        <BreastPlumes/>
        <Neck d="M 38 34 C 44 40 45 46 41 52 C 37 58 40 62 48 64" front="M 34.5 36 C 40 41 41 46 37.5 52 C 34 57 35 62 42 65"/>
        <g transform="translate(36,30) rotate(-10) scale(1.2)">
          <Head sway={sway} blink={blink}/>
          <g transform="translate(-24.5,1.4) rotate(84)">
            <path d="M -9 0 C -5 -3.6 4 -3.6 8 0 C 4 3.6 -5 3.6 -9 0 Z" fill="url(#gbhFish)"/>
            <path d="M 8 0 L 13 -3.5 L 12 0 L 13 3.5 Z" fill="#8FA2A8"/>
            <path d="M -2 -3 L 2 -5 L 4 -2.6 Z" fill="#8FA2A8"/>
            <circle cx="-6" cy="-0.6" r="0.8" fill="#111"/>
          </g>
          <path d="M -20 0 C -24 0.5 -26.5 0.9 -29 1.4 C -26.5 1.9 -24 2.3 -20 2.7 Z" fill="url(#gbhBill)"/>
        </g>
      </g>
    )
  } else if (pose === 'fly') {
    // Neck pulled back into a tight S so the head rides against the shoulders, legs trailing
    // straight out past the tail, broad rounded wing raised mid-beat.
    bird = (
      <g transform="translate(0,2)">
        {/* far wing, dipping below the body */}
        <path d={`M 62 62 C 64 72 70 ${80 - flap * 0.5} 78 ${86 - flap * 0.5} C 84 80 86 70 82 62 Z`} fill="#3A4252"/>
        {/* legs trailing straight behind, past the tail */}
        <path d="M 86 61 L 118 63.5" stroke="#3A332C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 86 63 L 117 67" stroke="#3A332C" strokeWidth="2" strokeLinecap="round"/>
        {/* body */}
        <path d="M 44 58 C 52 50 76 50 92 56 C 94 60 90 64 84 66 C 70 68 52 66 44 58 Z" fill="url(#gbhBody)"/>
        {[0, 1, 2].map(i => <path key={i} d={`M ${72 + i * 4} ${58 + i} C ${76 + i * 2} ${59 + i} ${81 + i} ${60.5 + i} ${86} ${61 + i * 0.6}`} stroke="#C9D3DE" strokeWidth="0.7" fill="none" opacity="0.7"/>)}
        <path d="M 82 62.5 C 85 64 88 64.5 91 64" stroke="#9A5A34" strokeWidth="2.4" strokeLinecap="round"/>
        {/* tucked S-neck: a short bulge hanging under the head */}
        <path d="M 35 54 C 33 62 39 68.5 49 67 C 54 66 57 62 57 58 L 47 53 Z" fill={NECK}/>
        <path d="M 35.4 55.5 C 34 62 40 68 49 66.8 C 52 66.4 54 65 55 63 C 50 63.6 44 62.6 40.5 60 C 38.5 58.6 37 57 35.4 55.5 Z" fill="#EEEEE8"/>
        <path d="M 37 58.2 C 38 62.6 42.5 65.4 49 65.2" stroke="#2E2E36" strokeWidth="0.75" fill="none" strokeDasharray="0.9 3.2" strokeLinecap="round" opacity="0.8"/>
        {/* near wing: broad, rounded, gray coverts with darker flight feathers */}
        <path d={`M 50 57 C 49 42 55 ${28 + flap * 0.6} ${66 - flap * 0.4} ${17 + flap} C 74 ${9 + flap} 86 ${7 + flap} 95 ${11 + flap} C 96 22 92 38 86 58 Z`} fill="#3A4252"/>
        <path d={`M 50 57 C 49 44 54 ${32 + flap * 0.5} ${63 - flap * 0.3} ${22 + flap * 0.8} C 70 ${17 + flap * 0.8} 77 ${16 + flap * 0.8} 82 ${19 + flap * 0.8} C 82 32 80 46 76 58 Z`} fill="url(#gbhWing)"/>
        <path d={`M 84 ${12 + flap} C 85 18 85 24 84 30 M 89 ${11 + flap} C 90 18 89 26 88 34 M 79 ${12 + flap} C 80 16 80.5 20 80.5 24`} stroke="#252A34" strokeWidth="0.8" fill="none"/>
        <path d="M 58 34 C 64 38 70 44 74 52 M 54 44 C 60 46 65 50 68 56" stroke="#5E7290" strokeWidth="0.7" fill="none"/>
        <path d="M 50 57 C 49.6 53 50 50 51 47" stroke="#17171C" strokeWidth="2" strokeLinecap="round"/>
        <g transform="translate(40,50) rotate(-2) scale(1.15)"><Head sway={sway} blink={blink}/></g>
      </g>
    )
  } else if (pose === 'hunch') {
    // Resting on one leg, neck pulled down into the shoulders, plumes fluffed.
    bird = (
      <g transform="translate(0,4)">
        <Legs lift feet={!scene}/>
        <path d="M 36 54 C 40 40 64 38 78 48 C 90 56 98 72 100 88 C 90 90 78 88 68 86 C 52 84 38 74 36 54 Z" fill="url(#gbhBody)"/>
        {[0, 1, 2, 3].map(i => <path key={i} d={`M ${66 + i * 4} ${56 + i * 3} C ${80 + i * 3} ${66 + i * 2} ${92 + i * 2} ${80 + i} ${100 + i} ${92 + i}`} stroke="#C9D3DE" strokeWidth="0.8" fill="none" opacity="0.75"/>)}
        <BreastPlumes x={-2} y={-2}/>
        <path d="M 40 56 C 42 52 46 51 49 53 C 48 58 45 61 42 62 Z" fill="#17171C"/>
        <Neck d="M 42 40 C 40 46 42 50 46 52" front="M 38.5 41 C 37 46 38 51 42 55" w={9}/>
        <g transform="translate(40,34) rotate(8) scale(1.2)"><Head sway={sway} blink={blink}/></g>
      </g>
    )
  } else {
    // Standing tall, neck in a relaxed S.
    bird = (
      <g>
        <Legs feet={!scene}/>
        <Body/>
        <BreastPlumes/>
        <Neck d="M 38 22 C 46 30 46 40 40 46 C 34 52 37 60 48 64" front="M 34.5 24.5 C 42 31 42 40 36.5 46 C 31.5 51 33 60 42 65"/>
        <g transform="translate(36,18) scale(1.2)"><Head sway={sway} blink={blink}/></g>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Great Blue Heron">
      <defs>
        <linearGradient id="gbhBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8197B2"/><stop offset="100%" stopColor="#55698A"/>
        </linearGradient>
        <linearGradient id="gbhWing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8EA2BC"/><stop offset="100%" stopColor="#6A7E9C"/>
        </linearGradient>
        <linearGradient id="gbhBill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8A62A"/><stop offset="100%" stopColor="#F6CE4A"/>
        </linearGradient>
        <linearGradient id="gbhFish" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C929A"/><stop offset="100%" stopColor="#E4ECEE"/>
        </linearGradient>
        <linearGradient id="gbhWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C93B8" stopOpacity="0.8"/><stop offset="100%" stopColor="#1E4E6E" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      {scene && pose !== 'fly' && <Reeds sway={sway * 0.4}/>}
      {bird}
      {scene && <Water shimmer={shimmer}/>}
      {scene && pose === 'fly' && <path d="M 30 116 q 24 3 56 0" stroke="#9FC8DC" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/>}
      {!scene && pose !== 'fly' && <path d="M 44 126 C 60 128.5 80 128.5 94 126" stroke="#A8D8EC" strokeWidth="1.3" fill="none" opacity="0.5" strokeLinecap="round"/>}
    </svg>
  )
}
