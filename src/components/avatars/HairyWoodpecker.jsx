// Hairy Woodpecker (adult male) — "accurate first, cute second, in habitat".
// See WoodDuck.jsx for the template conventions.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'hairy_woodpecker', poses: ['cling', 'drum'] }

// Field marks (the Downy look-alike test): LONG CHISEL BILL nearly as long as the head
// (Downy's is a stubby third); pale nasal tufts at the bill base; black crown; bold white
// stripe over the eye and white cheek stripe, black ear/eye band between them; black malar
// stripe running down to a BLACK SHOULDER SPUR on the breast side; RED NAPE PATCH (male);
// clean white unmarked underparts; black wings with rows of WHITE SPOTS; broad WHITE BACK
// STRIPE; stiff black tail propped on the bark with CLEAN WHITE OUTER TAIL FEATHERS — no
// black spots (Downy's have bars); gray zygodactyl feet gripping the trunk.

const BLK = '#17171B'
const WHT = '#FBFAF6'

function Tail({ lift = 0 }) {
  return (
    <g transform={`rotate(${lift} 62 100)`}>
      <path d="M 57 98 L 71 101 C 68 110 60 119 50 125 C 50 116 53.4 106 57 98 Z" fill={BLK}/>
      {/* clean white outer tail feathers — no spots */}
      <path d="M 57 98 C 53.4 106 50 116 50 125 L 54 122 C 55 113 57.6 106 60.6 99 Z" fill={WHT}/>
      <path d="M 60.6 99 C 58 106 56 113 55.4 121.6" stroke="#C9CCD2" strokeWidth="0.5" fill="none"/>
    </g>
  )
}

function Body() {
  return (
    <g>
      {/* white underparts */}
      <path d="M 53 58 C 58 52 70 50 77 54 C 83 66 83 84 75 100 L 58 102 C 50.5 92 48.6 72 53 58 Z" fill="url(#hwoBelly)"/>
      {/* black back edge with white back stripe */}
      <path d="M 70 52 C 78 52 83 60 84.5 70 C 85.5 80 83 90 78 98 L 74 96 C 78 86 79 76 78 68 C 77 61 74 56 70 54 Z" fill={BLK}/>
      <path d="M 73 55 C 78 58 81 64 81.8 72 C 82.4 79 81 85 78.6 90 L 76.4 89 C 78 83 79 77 78.6 71 C 78 64 76 59 72 56.4 Z" fill={WHT}/>
    </g>
  )
}

function Wing({ open = 0 }) {
  // Folded black wing with rows of white spots; `open` swings it out from the shoulder.
  const spots = []
  const rows = [[69, 63, 2], [68.4, 71, 3], [68.6, 79, 3], [69.4, 87, 3], [70.6, 95, 2]]
  rows.forEach(([x, y, n], r) => { for (let i = 0; i < n; i++) spots.push(<ellipse key={`${r}${i}`} cx={x + i * 3.6} cy={y + i * 1.1} rx="1.35" ry="1" fill={WHT} transform={`rotate(25 ${x + i * 3.6} ${y + i * 1.1})`}/>) })
  return (
    <g transform={`rotate(${open} 66 58)`}>
      <path d="M 67 57 C 74 55 78.6 61 79.4 72 C 80.2 84 77.4 96 71.4 107 C 67.4 98 65.4 86 65.6 74 C 65.8 66 66 60.4 67 57 Z" fill="url(#hwoWing)"/>
      {spots}
      <path d="M 70 108 C 72 100 74 92 75 84" stroke="#33333A" strokeWidth="0.6" fill="none"/>
    </g>
  )
}

function Head({ blink = false, open = false }) {
  // Profile facing left; centre ≈ (62,42).
  return (
    <g>
      <circle cx="62" cy="42" r="13.5" fill={WHT}/>
      {/* black crown */}
      <path d="M 48.6 40.6 C 48.6 32 55 28 62 28.4 C 69.5 28.8 75.4 33.6 75.6 41 C 71 37.4 65 36.2 58 36.6 C 54 37 51 38.4 48.6 40.6 Z" fill={BLK}/>
      {/* red nape patch (male), split by a thin black line as in many Hairies */}
      <path d="M 69.6 35.6 C 73.4 36.4 75.8 39 76.2 43.4 L 70.6 41.8 C 70.6 39.8 70.2 37.6 69.6 35.6 Z" fill="#E1202C"/>
      <path d="M 70.4 38.6 L 75.6 40.2" stroke={BLK} strokeWidth="0.6"/>
      {/* black band through the eye to the nape */}
      <path d="M 54 41.4 C 60 41 68 42 76 44.6 C 76 47 75.4 49 74.4 50.4 C 68 47.6 61 46.4 55 46.2 Z" fill={BLK}/>
      {/* black malar stripe to the shoulder */}
      <path d="M 49.6 46.4 C 54 48.4 59 51.6 63.4 55.6 L 61 57.4 C 56.6 53.6 52.6 51 49 49 Z" fill={BLK}/>
      {/* eye */}
      {blink
        ? <path d="M 52.4 42 Q 56 44.6 59.6 42" stroke="#0A0A0C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        : <g>
            <circle cx="56" cy="42.2" r="3.9" fill="#2A1E18"/>
            <circle cx="56" cy="42.2" r="2.6" fill="#0A0A0C"/>
            <circle cx="54.6" cy="40.8" r="1.35" fill="#FFF"/>
            <circle cx="57.2" cy="43.6" r="0.55" fill="#FFF" opacity="0.7"/>
          </g>}
      {/* long chisel bill, nearly head-length */}
      {open
        ? <g>
            <path d="M 50 39.6 L 29.4 36.4 L 49.8 43 Z" fill="#4A4E58"/>
            <path d="M 49.8 44.4 L 31 42.4 L 50.2 46.6 Z" fill="#3E424B"/>
          </g>
        : <g>
            <path d="M 50.2 39.4 L 28.6 37.6 L 50.2 46 Z" fill="#4A4E58"/>
            <path d="M 50.2 39.4 L 28.6 37.6" stroke="#2C2F36" strokeWidth="0.9"/>
            <path d="M 50.2 42.8 L 30 38.4" stroke="#2C2F36" strokeWidth="0.5" opacity="0.7"/>
          </g>}
      {/* pale nasal tufts */}
      <ellipse cx="50.2" cy="40.4" rx="1.9" ry="1.4" fill="#EDE4CE"/>
    </g>
  )
}

function Feet({ off = 0 }) {
  return (
    <g stroke="#6E7380" strokeWidth="1.5" strokeLinecap="round" fill="none" transform={`translate(${off},0)`}>
      <path d="M 56 86 L 50.6 85 M 50.6 85 L 48.4 81.4 M 50.6 85 L 48 86.6"/>
      <path d="M 56.6 92 L 51 92.6 M 51 92.6 L 48.6 89.6 M 51 92.6 L 48.8 95"/>
    </g>
  )
}

function Shoulder() {
  // Black shoulder spur reaching onto the breast side (joins the malar).
  return <path d="M 64 57 C 60 59 57.4 62 56 66.6 C 59 66 62.4 63.6 66.4 61 Z" fill={BLK}/>
}

function Clinging({ headTilt = 0, headShift = 0, mirror = false, blink, open, wingOpen = 0, tailLift = 0, feetOff = 0 }) {
  const headT = mirror
    ? `translate(124,0) scale(-1,1) rotate(${headTilt} 64 52)`
    : `translate(${headShift},0) rotate(${headTilt} 64 52)`
  return (
    <g transform="rotate(-4 60 100)">
      <Tail lift={tailLift}/>
      <Body/>
      <Feet off={feetOff}/>
      <Wing open={wingOpen}/>
      <Shoulder/>
      <g transform={headT}><g transform="translate(62,46) scale(1.08) translate(-62,-46)"><Head blink={blink} open={open}/></g></g>
    </g>
  )
}

function Trunk({ full }) {
  if (!full) {
    return <path d="M 43 66 C 45 84 46 104 45 128 L 51 128 C 52 104 51 84 49 66 Z" fill="#6E5A48" opacity="0.55"/>
  }
  return (
    <g>
      <path d="M -2 -2 L 48 -2 C 51 40 52 90 50 132 L -2 132 Z" fill="url(#hwoBark)"/>
      <path d="M 8 4 C 10 30 9 56 11 80 C 12 98 10 114 12 132 M 22 -2 C 24 22 22 44 25 66 C 27 86 24 108 26 132 M 36 -2 C 37 28 39 50 37 76 C 36 96 39 114 38 132" stroke="#4A3A2E" strokeWidth="1.4" fill="none" opacity="0.75"/>
      <path d="M 15 20 q 3 6 0 12 M 30 46 q 3 5 0 10 M 16 92 q 3 6 0 12 M 42 100 q 2 5 0 9" stroke="#3A2C22" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M 46 -2 C 49 40 50 90 48 132" stroke="#9C8670" strokeWidth="1.6" fill="none" opacity="0.7"/>
      {/* a little lichen + a side twig with autumn leaves */}
      <ellipse cx="18" cy="60" rx="4" ry="2.6" fill="#9FB49A" opacity="0.8"/>
      <ellipse cx="31" cy="112" rx="3" ry="2" fill="#9FB49A" opacity="0.7"/>
      <path d="M 50 18 C 70 16 90 12 110 4" stroke="#5C4838" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path d="M 96 9 C 94 16 96 22 101 26 C 104 20 102 13 96 9 Z" fill="#E1A23A"/>
      <path d="M 82 13 C 84 20 89 24 95 24 C 94 18 89 14 82 13 Z" fill="#C8642A"/>
      <path d="M 108 5 C 112 10 113 16 110 22 C 106 17 106 10 108 5 Z" fill="#D88A30"/>
    </g>
  )
}

export default function HairyWoodpecker({ size = 120, animated = false, style = {}, pose = 'cling', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), pose === 'drum' ? 90 : 420); return () => clearInterval(id) }, [animated, pose])
  const bob = animated ? [0, -0.4, -0.8, -0.4, 0, 0.3, 0.6, 0.3][frame] : 0
  const blink = animated && frame === 6

  let bird
  if (pose === 'drum') {
    // Rapid-fire drumming: head snaps forward so the bill strikes the bark.
    const hit = !animated || frame % 2 === 0
    bird = (
      <g>
        <Clinging headTilt={-16} headShift={hit ? -3 : 0}/>
        {hit && (
          <g>
            <path d="M 24 30 l -5 -4 M 23 37 l -6 0 M 25 44 l -5 4" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.85"/>
            <path d="M 30 26 l 3 -2 l 1 3 Z M 20 50 l 3 -1 l 0 3 Z M 32 48 l 2 1 l -1 2 Z" fill="#C8A47A"/>
          </g>
        )}
      </g>
    )
  } else if (pose === 'hitch') {
    // Hitching up the trunk: tail and feet lifted off the bark, wings half-open.
    bird = (
      <g transform="translate(0,-4)">
        <Clinging headTilt={6} wingOpen={14} tailLift={10} feetOff={2}/>
        <path d="M 72 120 l 0 6 M 78 116 l 0 7 M 66 122 l 0 5" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      </g>
    )
  } else if (pose === 'lookout') {
    // Pauses and peers away from the trunk — shows off the red nape.
    bird = <g transform={`translate(0,${bob * 0.5})`}><Clinging mirror headTilt={4} blink={blink}/></g>
  } else {
    bird = <g transform={`translate(0,${bob * 0.5})`}><Clinging blink={blink} open={animated && frame === 3}/></g>
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Hairy Woodpecker">
      <defs>
        <linearGradient id="hwoBelly" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E4E2DC"/><stop offset="45%" stopColor="#FBFAF6"/><stop offset="100%" stopColor="#F2F0EA"/>
        </linearGradient>
        <linearGradient id="hwoWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A2A30"/><stop offset="100%" stopColor="#111114"/>
        </linearGradient>
        <linearGradient id="hwoBark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5A4636"/><stop offset="70%" stopColor="#7A6450"/><stop offset="100%" stopColor="#8C7660"/>
        </linearGradient>
      </defs>
      <Trunk full={scene}/>
      {bird}
    </svg>
  )
}
