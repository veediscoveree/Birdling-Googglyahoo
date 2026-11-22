// Common Raven — "accurate first, cute second, in habitat" (see WoodDuck.jsx for conventions).
// In NYC / northern NJ ravens nest on cliffs like the Palisades, quarries, bridges and towers.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'common_raven', poses: ['perch', 'croak', 'soar', 'strut'] }

// Field marks: entirely glossy black (blue-violet sheen); MASSIVE, deep, curved bill with long
// bristles over its base; SHAGGY THROAT HACKLES (flared when calling); flat crown + thick neck;
// long wings reaching near the tail tip; long, WEDGE-SHAPED (diamond-tipped) tail in flight;
// long "fingered" primaries; black legs; dark eye. Bigger and heavier-billed than a crow.

function Bill({ open = 0 }) {
  return (
    <g>
      {/* lower mandible pivots at the gape when calling */}
      <g transform={`rotate(${-open} 34 47)`}>
        <path d="M 34 46.5 C 26 46.2 18 46.4 11 46.6 C 16 49.6 24 51.6 34 52 Z" fill="#17181F"/>
      </g>
      {open > 0 && <path d="M 32 47 C 26 47 20 47.5 15 48 C 20 49.5 26 50 32 50 Z" fill="#7A2E3A" transform={`rotate(${-open * 0.5} 34 47)`}/>}
      <path d="M 35 34.5 C 26 34 17 37 9.5 43.2 C 8 44.8 8.6 46.4 10.6 46 C 17.5 45 25.5 45.4 34 46.6 Z" fill="url(#rvnBill)"/>
      <path d="M 34 35 C 26 34.6 17.6 37.4 10 43.4" stroke="#5A6074" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* bristles (nasal feathers) over the bill base */}
      <path d="M 38 35 C 34 35 30 36 25.5 38 C 30 39.5 34 40 38 40 Z" fill="#1E2029"/>
      <path d="M 37 36 l -6 1.2 M 37 37.6 l -8 1 M 36.5 39 l -6 0.4" stroke="#3C4152" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function Hackles({ flare = 1, ruffle = 0 }) {
  // Shaggy, lance-shaped throat feathers — the raven's "beard".
  return (
    <g transform={`translate(38 54) scale(${flare}) translate(-38 -54)`}>
      <path d={`M 33 50.5 L ${31.6 + ruffle} 58.4 L 35.4 55.6 L ${34.6 - ruffle * 0.5} 63.6 L 38.6 59.8 L ${38.8 + ruffle * 0.5} 67.6 L 42.2 62.8 L 44 69.6 L 46.4 63.8 L 50 68.4 L 54.5 58 L 45 50 Z`} fill="#15161D"/>
      <path d={`M 35 53.5 L ${31.6 + ruffle} 58.4 M 38.4 56 L ${34.6 - ruffle * 0.5} 63.6 M 41.6 59 L ${38.8 + ruffle * 0.5} 67.6 M 44.4 60.5 L 44 69.6 M 47.6 60 L 50 68.4`} stroke="#5A6078" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function Head({ blink, open = 0, flare = 1, ruffle = 0, sheen }) {
  return (
    <g>
      <path d="M 31 41 C 31.5 33 39 28.5 47.5 29 C 56 29.6 61 35.5 61 44 C 61 50 59 55 56 59 L 42 61 C 37 57 32.5 51 31 46 Z" fill="url(#rvnHead)"/>
      <path d="M 38 31.5 C 44 29.4 51 30 56 33.5" stroke="#7B80C0" strokeWidth="1.4" fill="none" opacity={sheen} strokeLinecap="round"/>
      <Hackles flare={flare} ruffle={ruffle}/>
      <Bill open={open}/>
      {/* dark eye, ringed so it reads against black feathers */}
      <circle cx="42" cy="39.5" r="3.6" fill="#3A3F52"/>
      {blink ? <path d="M 38.6 39.6 Q 42 41.2 45.4 39.6" stroke="#9AA0B8" strokeWidth="0.9" fill="none"/> : (
        <g>
          <circle cx="42" cy="39.5" r="2.8" fill="#2A170E"/>
          <circle cx="42" cy="39.5" r="1.6" fill="#050505"/>
          <circle cx="40.9" cy="38.4" r="1.05" fill="#FFF"/>
        </g>
      )}
    </g>
  )
}

function Body({ sheen }) {
  return (
    <g>
      {/* long tail, slightly graduated (wedge) tip */}
      <path d="M 92 83 C 100 89 108 95 114 100.5 L 118 106.5 L 111.5 106.6 C 104 101 96 95 88 90 Z" fill="#14151C"/>
      <path d="M 100 92 C 106 96 111 100 116 105.5" stroke="#3A3F52" strokeWidth="0.6" fill="none"/>
      <path d="M 44 58 C 54 50 72 52 86 62 C 96 69 102 77 104 84 C 98 92 84 96 68 93 C 54 90 44 80 42 68 Z" fill="url(#rvnBody)"/>
      {/* folded wing reaching nearly to the tail tip */}
      <path d="M 54 60 C 66 54 82 60 94 70 C 101 77 105 85 108 93 C 100 93 88 89 76 85 C 64 80 56 72 54 60 Z" fill="url(#rvnWing)"/>
      <path d="M 70 77 C 82 83 94 88 106 92.5 M 76 71 C 88 79 98 86 107 91.5 M 66 70 C 72 74 78 77 84 79" stroke="#3E4459" strokeWidth="0.7" fill="none"/>
      <path d="M 58 60 C 68 56.5 80 59.5 89 66" stroke="#7B80C0" strokeWidth="1.6" fill="none" opacity={sheen} strokeLinecap="round"/>
      <path d="M 47 72 C 50 80 56 86 64 89" stroke="#5E5A9A" strokeWidth="1.2" fill="none" opacity={sheen * 0.6} strokeLinecap="round"/>
    </g>
  )
}

function Legs({ step = 0 }) {
  return (
    <g stroke="#0D0E13" strokeLinecap="round" fill="none">
      <path d={`M 62 89 L ${60 - step} ${102 - step * 0.6}`} strokeWidth="3"/>
      <path d="M 72 90 L 72 102" strokeWidth="3"/>
      <path d={`M ${60 - step} ${102 - step * 0.6} l -6 0.6 M ${60 - step} ${102 - step * 0.6} l -4.6 -2.4 M ${60 - step} ${102 - step * 0.6} l 3.4 0.4`} strokeWidth="1.8"/>
      <path d="M 72 102 l -6 0.6 M 72 102 l -4.6 -2.4 M 72 102 l 3.4 0.4" strokeWidth="1.8"/>
    </g>
  )
}

function Soaring({ sheen }) {
  // Seen from below: long fingered wings, heavy bill out front, wedge-shaped tail.
  const wing = (
    <g>
      <path d="M 52 47 C 42 43 31 41 21 42.5 C 15 43.5 9.5 45.5 4.5 48.5 L 3.5 50.6 L 10 51 L 3.8 53.6 L 10.2 54.2 L 5 57 L 11.4 57 L 7.6 60.4 L 13.6 59.6 L 12 63 L 19 61.2 C 29 63.4 40 66 52 68.5 Z" fill="url(#rvnUnder)"/>
      <path d="M 19 61.2 C 18 56 18 50 21 43 M 30 63 C 29 56 29.5 49 31 42 M 41 65.4 C 40.5 58 41 51 42 44" stroke="#4A4F62" strokeWidth="0.6" fill="none"/>
    </g>
  )
  return (
    <g>
      {wing}
      <g transform="translate(120 0) scale(-1 1)">{wing}</g>
      {/* wedge tail: central feathers longest */}
      <path d="M 54 73 L 45 91 C 50 96 55 100 60 105 C 65 100 70 96 75 91 L 66 73 Z" fill="#1A1B23"/>
      <path d="M 60 76 L 60 104 M 56.5 76 L 50 95.5 M 63.5 76 L 70 95.5" stroke="#3E4356" strokeWidth="0.6" fill="none"/>
      <ellipse cx="60" cy="59" rx="9.5" ry="17" fill="url(#rvnBody)"/>
      <path d="M 54 50 C 56 56 56 64 55 70" stroke="#7B80C0" strokeWidth="1.2" fill="none" opacity={sheen} strokeLinecap="round"/>
      {/* shaggy throat */}
      <path d="M 50.5 40 L 52.5 47 L 55 44 L 57 49.5 L 60 45 L 63 49.5 L 65 44 L 67.5 47 L 69.5 40 Z" fill="#15161D"/>
      <circle cx="60" cy="38.5" r="9" fill="url(#rvnHead)"/>
      <path d="M 53.4 35.5 C 53.8 29 56.4 22.4 59.1 18.6 C 59.8 17.6 60.8 17.6 61.5 18.6 C 64.2 22.4 66.8 29 67.2 35.5 Z" fill="url(#rvnBill)"/>
      <path d="M 60.3 18.4 L 60.3 33" stroke="#4E5468" strokeWidth="0.7"/>
      <circle cx="54.6" cy="35.4" r="1.5" fill="#120C0A"/><circle cx="54.2" cy="35" r="0.55" fill="#FFF"/>
      <circle cx="65.4" cy="35.4" r="1.5" fill="#120C0A"/><circle cx="65" cy="35" r="0.55" fill="#FFF"/>
    </g>
  )
}

function Cliff() {
  // Palisades-style cliff top: columnar rock with lichen.
  return (
    <g>
      <path d="M 0 103 C 18 100.5 40 101.5 62 102.5 C 84 103.5 104 101 120 102 L 120 130 L 0 130 Z" fill="url(#rvnRock)"/>
      <path d="M 0 103 C 18 100.5 40 101.5 62 102.5 C 84 103.5 104 101 120 102" stroke="#9A948C" strokeWidth="1" fill="none"/>
      <path d="M 14 102 L 12 130 M 34 101.8 L 35 130 M 52 102.2 L 50 130 M 80 103.2 L 82 130 M 100 102 L 98 130" stroke="#3A3634" strokeWidth="1" fill="none" opacity="0.8"/>
      <circle cx="24" cy="107" r="1.6" fill="#B5C08A" opacity="0.8"/><circle cx="27" cy="109" r="1" fill="#B5C08A" opacity="0.7"/>
      <circle cx="90" cy="108" r="1.5" fill="#D9A24E" opacity="0.8"/><circle cx="66" cy="115" r="1.2" fill="#B5C08A" opacity="0.6"/>
    </g>
  )
}

function SkyCliff() {
  return (
    <g>
      <path d="M 0 104 L 22 102 L 30 106 L 33 130 L 0 130 Z" fill="url(#rvnRock)"/>
      <path d="M 0 104 L 22 102 L 30 106" stroke="#9A948C" strokeWidth="1" fill="none"/>
      <path d="M 8 103.4 L 7 130 M 18 102.4 L 19 130 M 27 104.6 L 28 130" stroke="#3A3634" strokeWidth="1" opacity="0.8"/>
      <path d="M 78 116 q 6 -5 12 0 q 5 -4 10 0 q 6 0 6 4 l -30 0 q 0 -4 2 -4 Z" fill="#DDE6EE" opacity="0.35"/>
      <path d="M 92 20 q 4 -3 8 0 q 4 -2 7 1 l -17 1 Z" fill="#DDE6EE" opacity="0.25"/>
    </g>
  )
}

export default function CommonRaven({ size = 120, animated = false, style = {}, pose = 'perch', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 420); return () => clearInterval(id) }, [animated])
  const sheen = animated ? [0.35, 0.5, 0.65, 0.5, 0.35, 0.25, 0.2, 0.25][frame] : 0.45
  const ruffle = animated ? [0, 0.4, 0.8, 0.4, 0, -0.4, -0.8, -0.4][frame] : 0
  const blink = animated && frame === 5
  const tilt = animated ? [0, 1, 2, 1, 0, -1, -2, -1][frame] : 0

  let bird, ground = <Cliff/>, shadowY = 102
  if (pose === 'croak') {
    // Bowing "gronk": head thrust forward and down, bill open, throat hackles flared.
    bird = (
      <g>
        <g transform="rotate(8 70 100)"><Body sheen={sheen}/></g>
        <g transform="translate(-2,7) rotate(-10 46 50)"><Head open={14} flare={1.35} ruffle={ruffle} sheen={sheen}/></g>
        <path d="M 6 36 q -3 4 0 8 M 2 32 q -5 8 0 16" stroke="#CFE3F0" strokeWidth="1.2" fill="none" opacity="0.7" strokeLinecap="round"/>
        <Legs/>
      </g>
    )
  } else if (pose === 'soar') {
    ground = <SkyCliff/>; shadowY = null
    bird = <g transform={`rotate(${-8 + tilt} 60 60)`}><Soaring sheen={sheen}/></g>
  } else if (pose === 'strut') {
    // Swaggering walk: body level, head pushed forward, a long stride.
    bird = (
      <g>
        <g stroke="#0D0E13" strokeLinecap="round" fill="none">
          <path d="M 70 82 L 79 95 L 84 96" strokeWidth="3"/>
          <path d="M 84 96 l 1 -0.4 M 84 96 l -1.6 4.4 M 84 96 l 1.4 4.6" strokeWidth="1.6"/>
        </g>
        <g transform="translate(0,-7)">
          <g transform="rotate(16 70 96)"><Body sheen={sheen}/></g>
          <g transform={`translate(4,${12 + tilt * 0.3}) rotate(4 46 50)`}><Head blink={blink} ruffle={ruffle} sheen={sheen}/></g>
        </g>
        <g stroke="#0D0E13" strokeLinecap="round" fill="none">
          <path d="M 59 82 L 52 101" strokeWidth="3"/>
          <path d="M 52 101 l -6 0.6 M 52 101 l -4.6 -2.4 M 52 101 l 3.4 0.4" strokeWidth="1.8"/>
        </g>
      </g>
    )
  } else {
    bird = (
      <g>
        <Body sheen={sheen}/>
        <Head blink={blink} ruffle={ruffle} sheen={sheen}/>
        <Legs/>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Common Raven">
      <defs>
        <linearGradient id="rvnHead" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#30344A"/><stop offset="100%" stopColor="#14151D"/>
        </linearGradient>
        <linearGradient id="rvnBody" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#2C3044"/><stop offset="100%" stopColor="#0F1017"/>
        </linearGradient>
        <linearGradient id="rvnWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A2E40"/><stop offset="100%" stopColor="#111219"/>
        </linearGradient>
        <linearGradient id="rvnUnder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15161D"/><stop offset="55%" stopColor="#23252F"/><stop offset="100%" stopColor="#3E4251"/>
        </linearGradient>
        <linearGradient id="rvnBill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E3140"/><stop offset="100%" stopColor="#101116"/>
        </linearGradient>
        <linearGradient id="rvnRock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#77716B"/><stop offset="100%" stopColor="#3D3936"/>
        </linearGradient>
      </defs>
      {scene ? ground : (shadowY && <ellipse cx="68" cy={shadowY + 1} rx="26" ry="2.6" fill="#000" opacity="0.25"/>)}
      {bird}
    </svg>
  )
}
