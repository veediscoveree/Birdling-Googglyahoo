// Mallard (adult drake, breeding) — naturalistic pass (technique of BaldEagle.jsx / AmericanBlackDuck.jsx).
//
// No outlined feathers: form from silhouette + gradient light + fine feTurbulence grain clipped to
// the plumage; feather detail only as soft, low-contrast tips and a faint vermiculation on the grey
// flanks. True Mallard shape: long low dabbler riding high, rounded head with sloping forehead and
// long flat yellow bill (black nail); glossy bottle-green head whose sheen comes from the light (a
// violet-blue cast where it turns away); narrow white neck ring, open at the nape; chestnut breast;
// pale grey flanks; grey-brown back; blue speculum framed in white; black stern, whitish tail and the
// black curled central tail feathers. Second pose: tipped up dabbling, orange feet paddling.
import { useEffect, useState } from 'react'

export const meta = { birdId: 'mallard', poses: ['swim', 'dabble'] }

function rng(seed) { let r = seed; return () => { r = (r * 9301 + 49297) % 233280; return r / 233280 } }

// ── Swimming drake, side view facing left; waterline y = 90 ───────────────────
const BODY = 'M 36.4 90 C 31.6 87.4 30.2 82 32.4 77.8 C 34.2 74.6 38 72 43 70.8 C 47 70 51 69.8 57 69.8 C 69 69.6 81 70 90 71.2 C 95 71.9 99 72.6 102.2 73.4 C 104.4 74.6 105 76.6 103.6 78.4 C 102 80.4 99.6 81.8 97.6 82.6 C 96.6 85.6 94.8 88.2 92.6 90 Z'
const HEAD = 'M 39.8 74.6 C 36.6 71.2 34.8 67.8 33.8 64.6 C 32.8 62.4 30.6 61.2 27.8 60.6 L 26.8 54.6 C 28 50.8 31.4 48 36 47.6 C 40.6 47.4 44.4 49.4 46 52.8 C 47.4 55.8 47 58.8 46.2 61.4 C 46.4 64.8 48.2 67.8 51.2 70.4 Z'
const BACK = 'M 49.6 71.2 C 62 68.6 80 68.8 93.6 71 C 97.6 71.7 100.4 72.6 101.8 73.6 C 96 76.4 86 77.4 74 77 C 64 76.6 56 74.8 49.6 71.2 Z'
const STERN = 'M 93.8 70.9 C 97.6 71.5 100.6 72.4 102.2 73.4 C 104.4 74.6 105 76.6 103.6 78.4 C 102 80.4 99.6 81.8 97.6 82.6 C 96.6 85.6 94.8 88.2 92.6 90 L 89.6 90 C 92.6 84 93 76.6 93.8 70.9 Z'

function Head({ blink }) {
  return (
    <g>
      <g filter="url(#malTexH)">
        <path d={HEAD} fill="url(#malGreen)"/>
        <g clipPath="url(#malHeadClip)">
          {/* sheen: light catches crown and cheek; a violet-blue cast where the head turns away */}
          <path d="M 30 52 C 33 48.6 39 47.8 43 50.4 C 40 50 35 50.4 30.4 53.6 Z" fill="#7CC890" opacity="0.55" filter="url(#malBlur)"/>
          <ellipse cx="37.6" cy="58" rx="4.4" ry="3" fill="#3E9A62" opacity="0.5" filter="url(#malBlur2)"/>
          <path d="M 44 52 C 47 56 47 62 46.6 66 L 49 66 L 49 50 Z" fill="#3A3C8E" opacity="0.5" filter="url(#malBlur2)"/>
          <path d="M 27 59.6 C 29 61 31.4 62.4 33.4 64.6 L 30 66 Z" fill="#071810" opacity="0.6" filter="url(#malBlur)"/>
          {/* below the ring: chestnut */}
          <path d="M 33.4 66.2 C 37 68.2 42 68 46.6 64.8 L 54 72 L 36 80 Z" fill="url(#malChest)"/>
        </g>
      </g>
      {/* narrow white neck ring, not closed at the nape */}
      <path d="M 33.8 65.6 C 37 67.6 41.6 67.6 45.8 64.6" stroke="#F4F2EC" strokeWidth="0.95" fill="none" strokeLinecap="round"/>
      <path d="M 34 66.4 C 37.4 68.2 41.6 68.2 45.6 65.4" stroke="#2A1408" strokeWidth="0.4" fill="none" opacity="0.4"/>
      {blink
        ? <path d="M 33.2 53.4 q 1.3 0.7 2.6 0" stroke="#0C1E14" strokeWidth="0.6" fill="none"/>
        : <g>
            <ellipse cx="34.5" cy="53.3" rx="1.25" ry="1.15" fill="#2E1A0E"/>
            <circle cx="34.6" cy="53.4" r="0.68" fill="#060403"/>
            <circle cx="34.15" cy="52.9" r="0.27" fill="#FFF"/>
          </g>}
      {/* long, flat, yellow bill with black nail */}
      <path d="M 27.2 54 C 22.8 54.8 17.6 56 13.4 57.4 C 11.2 58.1 9.8 58.9 9.6 60 C 9.6 60.9 10.6 61.3 11.8 61.2 C 17 60.8 22.2 60.4 27.6 59.8 Z" fill="url(#malBill)"/>
      <path d="M 11.8 61.2 C 17 60.8 22.2 60.4 27.6 59.8 L 27.8 60.8 C 22.4 62 16.6 62.4 12.6 62 Z" fill="#A98A1C"/>
      <path d="M 12.4 57.2 C 10.8 57.9 9.7 58.8 9.6 60 C 9.6 60.9 10.6 61.3 11.8 61.2 C 11.2 60 11.4 58.6 12.4 57.2 Z" fill="#1E1A10"/>
      <path d="M 26.6 54.8 C 22 55.8 17 57 13.8 58" stroke="#FBEFA0" strokeWidth="0.5" fill="none" opacity="0.75" strokeLinecap="round"/>
      <path d="M 11.8 61.2 C 17 60.8 22.2 60.4 27.6 59.8" stroke="#6E5A10" strokeWidth="0.35" fill="none"/>
      <ellipse cx="22.6" cy="56.4" rx="0.85" ry="0.33" fill="#6E5A10" transform="rotate(-14 22.6 56.4)"/>
    </g>
  )
}

function Body() {
  const r = rng(13)
  const verm = [], tips = []
  // fine grey vermiculation on the flanks (barely there)
  for (let i = 0; i < 120; i++) {
    const x = 46 + r() * 48, y = 74 + r() * 15, w = 1.2 + r() * 1.6
    verm.push(<path key={i} d={`M ${x} ${y} q ${w / 2} ${(r() - 0.5) * 0.8} ${w} 0`} stroke="#7A7A74" strokeWidth="0.2" fill="none" opacity={0.08 + r() * 0.1}/>)
  }
  // soft pale scaling on the chestnut breast
  for (let i = 0; i < 22; i++) {
    const x = 33 + r() * 14, y = 74 + r() * 14, w = 1.1 + r() * 0.6
    tips.push(<path key={i} d={`M ${x - w} ${y} q ${w} ${w * 0.8} ${w * 2} 0`} stroke="#B07A58" strokeWidth="0.35" fill="none" opacity={0.08 + r() * 0.08}/>)
  }
  return (
    <g>
      {/* whitish tail protruding behind the black stern */}
      <path d="M 100.6 73 C 104 72.2 108.4 72 112 72.8 C 110.6 74.4 107.6 75.4 104 75.8 Z" fill="url(#malTail)"/>
      <g filter="url(#malTex)">
        <path d={BODY} fill="url(#malFlank)"/>
        <g clipPath="url(#malBodyClip)">
          {verm}
          <path d="M 26 68 C 40 66 47.4 70.2 48.8 76.4 C 49.8 81.4 48 86.6 44.4 92 L 26 92 Z" fill="url(#malChest)" filter="url(#malSoft)"/>
          {tips}
          <path d="M 30 86 C 50 90 80 90 100 86 L 100 92 L 30 92 Z" fill="#2A2A28" opacity="0.4" filter="url(#malBlur2)"/>
        </g>
        <path d={STERN} fill="url(#malStern)"/>
        {/* grey-brown back and folded wing */}
        <path d={BACK} fill="url(#malBack)"/>
        <path d="M 56 71.6 C 66 69.6 80 69.8 92 71.6" stroke="#B4A690" strokeWidth="1" fill="none" opacity="0.45" filter="url(#malBlur)"/>
        <path d="M 62 73.6 C 72 72.2 84 72.4 95 73.6 M 70 75.4 C 78 74.6 88 74.6 98 74.6" stroke="#5A4E42" strokeWidth="0.45" fill="none" opacity="0.35"/>
        {/* speculum: blue band framed in white, peeking below the tertials */}
        <path d="M 89 76.8 C 92.4 76.7 95.4 76.3 98.2 75.6" stroke="#E8E8E4" strokeWidth="0.4" fill="none" opacity="0.9"/>
        <path d="M 89.4 77.5 C 92.8 77.4 95.8 77 98.4 76.3" stroke="url(#malSpec)" strokeWidth="0.85" fill="none"/>
        <path d="M 89.8 78.2 C 93 78.1 96 77.7 98.4 77" stroke="#E4E4E0" strokeWidth="0.35" fill="none" opacity="0.8"/>
      </g>
      {/* black curled central tail feathers */}
      <path d="M 98.2 71.8 C 97.8 68.6 99.4 66.2 101.8 66.4 C 103.6 66.6 103.8 68.6 102.4 69.3 C 101.6 69.6 101 69.1 101.2 68.5" stroke="#0E1012" strokeWidth="0.95" fill="none" strokeLinecap="round"/>
      <path d="M 96.6 71.6 C 96.4 69.4 97.6 67.8 99.4 67.8 C 100.6 67.9 100.8 69.2 100 69.6" stroke="#0E1012" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
    </g>
  )
}

function Swimmer({ blink }) {
  return <g><Body/><Head blink={blink}/></g>
}

// ── Park pond ─────────────────────────────────────────────────────────────────
function Pond({ shore }) {
  const r = rng(29)
  const trees = [], grass = []
  for (let i = 0; i < 80; i++) { const x = r() * 128 - 4, y = shore - 10 - r() * 16, rx = 3 + r() * 5; trees.push(<ellipse key={i} cx={x} cy={y} rx={rx} ry={rx * 0.85} fill={['#3E5A3A', '#4E6A42', '#2E4A32', '#5E7448', '#6E7A4C'][Math.floor(r() * 5)]}/>) }
  for (let i = 0; i < 140; i++) { const x = r() * 124 - 2, h = 1.2 + r() * 3; grass.push(<path key={i} d={`M ${x} ${shore} q ${(r() - 0.5)} ${-h / 2} ${(r() - 0.4) * 1.4} ${-h}`} stroke={['#7A8E48', '#5E7238', '#94A45C'][Math.floor(r() * 3)]} strokeWidth={0.3 + r() * 0.3} fill="none" opacity="0.8"/>) }
  const glints = Array.from({ length: 14 }, (_, i) => {
    const y = shore + 4 + i * ((128 - shore) / 14) + r() * 1.5, x = r() * 108, w = 5 + r() * 14 * (1 + i / 10)
    return <path key={i} d={`M ${x} ${y} h ${w}`} stroke="#E2ECE6" strokeWidth={0.25 + i * 0.025} opacity={0.1 + r() * 0.16} strokeLinecap="round"/>
  })
  return (
    <g>
      <rect x="0" y="0" width="120" height="130" fill="url(#malSky)"/>
      <g filter="url(#malDof)">{trees}<rect x="-2" y={shore - 7} width="124" height="7" fill="#5E7040"/>{grass}</g>
      <rect x="0" y={shore} width="120" height={130 - shore} fill="url(#malWater)"/>
      <g opacity="0.35" filter="url(#malSmear)"><g transform={`translate(0 ${2 * shore}) scale(1 -1)`}>{trees.slice(0, 50)}</g></g>
      {glints}
    </g>
  )
}

// ── Dabbling: tipped up, head and breast under water, stern and tail to the sky ─────────────
// Its own drawing (not the swim body rotated): only the rear half shows — a grey mound tapering to
// the black stern, whitish tail pointing at the sky, curls on the dorsal side, pale belly and orange
// feet kicking out on the belly side. Head down-left, under water.
const TIP = 'M 41.6 90 C 42.6 80 47 71 54.6 64 C 58.6 60.4 62 57.6 64.6 55.4 C 66.4 54 68.6 53.4 70.4 54.4 C 71.6 56.6 72 59.4 71.8 62 C 73.6 66.6 74.6 72 74.2 78 C 73.8 83 72.4 87 70.6 90 Z'
const TIPSTERN = 'M 56 62.6 C 59.4 59.8 62.2 57.4 64.6 55.4 C 66.4 54 68.6 53.4 70.4 54.4 C 71.6 56.6 72 59.4 71.8 62 C 72.8 64.6 73.6 67.4 74 70.4 C 70.4 72.6 65 71.4 61.2 67.8 C 59.2 66 57.6 64.4 56 62.6 Z'
const SUB = 'M 41.6 90 C 38 96 33 102 27 106 C 22 109 18 112 15.6 116 C 14 119 16 121.4 19.4 121 C 23 120.6 26 118 28.6 115.6 C 36 110 46 104 54 99 C 62 95 68 92.6 70.6 90 Z'

function Dabbler({ paddle }) {
  const r = rng(19)
  const verm = []
  for (let i = 0; i < 60; i++) {
    const x = 45 + r() * 27, y = 66 + r() * 23, w = 1 + r() * 1.4
    verm.push(<path key={i} d={`M ${x} ${y} q ${w / 2} ${(r() - 0.5) * 0.7} ${w} 0`} stroke="#7A7A74" strokeWidth="0.2" fill="none" opacity={0.08 + r() * 0.1}/>)
  }
  return (
    <g>
      {/* submerged forepart, glimpsed through the water: chestnut breast, green head */}
      <path d={SUB} fill="#8A8A82"/>
      <path d="M 41.6 90 C 38 96 33 102 27 106 L 40 104 C 46 100 52 96 58 92 Z" fill="#6A2E18"/>
      <ellipse cx="20" cy="115" rx="6.4" ry="4.6" fill="#1E5A38" transform="rotate(-40 20 115)"/>
      {/* far foot, paddling low by the surface */}
      <path d={`M 71.6 84 C 74 86 76.4 ${87.4 + paddle * 0.3} 78.6 ${88.2 + paddle * 0.3}`} stroke="#C8621F" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d={`M 78.6 ${88.2 + paddle * 0.3} c 1.2 -1.2 2.8 -1.6 4.2 -1.2 c -0.4 0.8 -1 1.2 -1.6 1.4 c 0.8 0.4 1.4 1 1.6 1.8 c -1.6 0.2 -3 -0.4 -4.2 -2 Z`} fill="#B8581C"/>
      <path d="M 64.8 55.6 C 65.4 51.6 67.2 47.8 69.8 45.6 C 71.6 48.4 72.2 51.8 70.8 54.8 C 68.8 54.2 66.6 54.6 64.8 55.6 Z" fill="url(#malTailUp)"/>
      <path d="M 67.4 54.6 C 67.8 51.6 68.6 49 69.8 46.6 M 69.2 54.4 C 69.8 51.6 70.2 49.4 70.4 47.4" stroke="#9A9A94" strokeWidth="0.25" fill="none" opacity="0.6"/>
      <g filter="url(#malTex)">
        <path d={TIP} fill="url(#malTipFlank)"/>
        <g clipPath="url(#malTipClip)">
          {verm}
          {/* grey-brown back along the dorsal edge, pale belly on the other side */}
          <path d="M 38 92 C 40 78 46 68 56 61 L 60 64 C 52 70 47 80 46 92 Z" fill="url(#malBack)" filter="url(#malBlur)"/>
          <path d="M 70 64 C 74 72 75 82 72 92 L 66 92 C 69 82 69 72 66 64 Z" fill="#E8E8E2" opacity="0.6" filter="url(#malBlur2)"/>
          <path d="M 40 88 C 50 90 62 90 74 88 L 74 92 L 40 92 Z" fill="#2A2A28" opacity="0.35" filter="url(#malBlur2)"/>
        </g>
        <path d={TIPSTERN} fill="url(#malStern)"/>
        {/* speculum glimpse on the folded wing */}
        <path d="M 51.6 70.4 C 53 68.6 54.6 67 56.2 65.8" stroke="#E8E8E4" strokeWidth="0.4" fill="none"/>
        <path d="M 52.4 71 C 53.8 69.2 55.4 67.6 57 66.4" stroke="url(#malSpec)" strokeWidth="0.9" fill="none"/>
      </g>
      {/* black curled central tail feathers on the dorsal side */}
      <path d="M 63.6 57.6 C 61 56.2 59.8 53.6 61.2 51.8 C 62.4 50.6 64.2 51.4 64 52.8 C 63.9 53.6 63.2 53.8 62.8 53.4" stroke="#0E1012" strokeWidth="0.95" fill="none" strokeLinecap="round"/>
      <path d="M 65.4 56.4 C 63.8 54.6 63.6 52.4 65 51.4 C 66 50.8 67 51.6 66.6 52.4" stroke="#0E1012" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
      {/* near foot: orange, webbed, kicking out from the belly */}
      <path d={`M 72.6 78 C 75.6 77.4 78 ${76 - paddle} 80.2 ${74 - paddle}`} stroke="#E57A2E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d={`M 80.2 ${74 - paddle} c 0.6 -1.8 2.2 -3 4 -3.2 c -0.2 1 -0.8 1.8 -1.6 2.2 c 1 0 2 0.4 2.6 1.2 c -1.4 0.8 -3.4 0.8 -5 -0.2 Z`} fill="#F08A36"/>
    </g>
  )
}

const WY = 90

export default function Mallard({ size = 120, animated = false, style = {}, pose = 'swim', scene = true }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 420); return () => clearInterval(id) }, [animated])
  const bob = animated ? [0, -0.3, -0.5, -0.3, 0, 0.3, 0.5, 0.3][frame] : 0
  const blink = animated && frame === 5
  const paddle = animated ? [0, 1, 2, 1, 0, 1, 2, 1][frame] : 1

  let content
  if (pose === 'dabble') {
    content = (
      <>
        {scene && <Pond shore={58}/>}
        {/* submerged half, seen dimly through the water */}
        <g clipPath="url(#malBelow)" opacity={scene ? 0.32 : 0.18} filter="url(#malMurk)"><g transform={`translate(0 ${bob})`}><g transform="translate(58 90) scale(1.25) translate(-58 -90)"><Dabbler paddle={paddle}/></g></g></g>
        <rect x="0" y={WY} width="120" height="40" fill={scene ? 'url(#malWater2)' : 'none'} opacity="0.5"/>
        {/* reflection of the upturned stern */}
        <g clipPath="url(#malBelow)" opacity={scene ? 0.34 : 0.14}>
          <g transform={`translate(0 ${2 * WY}) scale(1 -1)`} filter="url(#malSmear)"><g clipPath="url(#malAbove)"><g transform="translate(58 90) scale(1.25) translate(-58 -90)"><Dabbler paddle={paddle}/></g></g></g>
        </g>
        {/* rings spreading from the dabbling bird */}
        <ellipse cx="57" cy={WY + 0.4} rx="17" ry="1.6" fill="none" stroke="#E6EEEA" strokeWidth="0.45" opacity="0.45"/>
        <ellipse cx="57" cy={WY + 0.9} rx="26" ry="3" fill="none" stroke="#E6EEEA" strokeWidth="0.4" opacity="0.4" strokeDasharray="9 2 6 1.5"/>
        <ellipse cx="57" cy={WY + 1.6} rx="37" ry="4.8" fill="none" stroke="#E6EEEA" strokeWidth="0.3" opacity="0.25" strokeDasharray="12 3 7 2"/>
        <ellipse cx="57" cy={WY + 2.6} rx="50" ry="7" fill="none" stroke="#E6EEEA" strokeWidth="0.25" opacity="0.15" strokeDasharray="14 4 9 3"/>
        <g clipPath="url(#malAbove)"><g transform={`translate(0 ${bob})`}><g transform="translate(58 90) scale(1.25) translate(-58 -90)"><Dabbler paddle={paddle}/></g></g></g>
      </>
    )
  } else {
    content = (
      <>
        {scene && <Pond shore={60}/>}
        <g clipPath="url(#malBelow)" opacity={scene ? 0.42 : 0.16}>
          <g transform={`translate(0 ${2 * WY}) scale(1 -1)`} filter="url(#malSmear)"><Swimmer/></g>
        </g>
        <g transform={`translate(0 ${bob})`}><Swimmer blink={blink}/></g>
        <path d="M 35.2 90.3 C 50 91.2 80 91.2 92.6 90.3" stroke="#0E1410" strokeWidth="0.8" opacity="0.45" fill="none"/>
        <path d="M 30 91 C 27 91.5 24 91.9 20 92.1 M 97 90.9 C 102 91.3 106 91.5 111 91.5 M 25 94.2 C 35 95 45 95.4 53 95.5 M 63 95.6 C 77 95.6 92 95.2 105 94.2 M 17 98.4 C 27 99.4 37 99.9 45 100.1 M 71 100.3 C 87 100.2 100 99.6 113 98.4" stroke="#DCE6E2" strokeWidth="0.3" fill="none" opacity={scene ? 0.4 : 0.25} strokeLinecap="round"/>
      </>
    )
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Mallard">
      <defs>
        <linearGradient id="malSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8CAD4"/><stop offset="100%" stopColor="#E2E6DC"/></linearGradient>
        <linearGradient id="malWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7E9488"/><stop offset="30%" stopColor="#5E7870"/><stop offset="100%" stopColor="#2E4442"/></linearGradient>
        <linearGradient id="malWater2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5E7870"/><stop offset="100%" stopColor="#2E4442"/></linearGradient>
        <radialGradient id="malGreen" cx="0.36" cy="0.22" r="0.85"><stop offset="0%" stopColor="#3C9460"/><stop offset="35%" stopColor="#1E6440"/><stop offset="75%" stopColor="#103A26"/><stop offset="100%" stopColor="#0A2418"/></radialGradient>
        <linearGradient id="malChest" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#8A4426"/><stop offset="55%" stopColor="#6A2E18"/><stop offset="100%" stopColor="#3E1A0E"/></linearGradient>
        <linearGradient id="malFlank" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D8D8D2"/><stop offset="50%" stopColor="#BCBCB4"/><stop offset="100%" stopColor="#84847C"/></linearGradient>
        <linearGradient id="malBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9A8C78"/><stop offset="60%" stopColor="#7A6C5A"/><stop offset="100%" stopColor="#5E5244"/></linearGradient>
        <linearGradient id="malStern" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2A3438"/><stop offset="40%" stopColor="#121618"/><stop offset="100%" stopColor="#060808"/></linearGradient>
        <linearGradient id="malTailUp" x1="0" y1="1" x2="0.3" y2="0"><stop offset="0%" stopColor="#B4B4AE"/><stop offset="100%" stopColor="#F4F4F0"/></linearGradient>
        <linearGradient id="malTail" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#B8B8B2"/><stop offset="100%" stopColor="#F0F0EC"/></linearGradient>
        <linearGradient id="malBill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F2D650"/><stop offset="100%" stopColor="#C9A42A"/></linearGradient>
        <linearGradient id="malSpec" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2A3A9A"/><stop offset="60%" stopColor="#4A5ACC"/><stop offset="100%" stopColor="#5A3A9A"/></linearGradient>
        <clipPath id="malHeadClip"><path d={HEAD}/></clipPath>
        <clipPath id="malBodyClip"><path d={BODY}/></clipPath>
        <clipPath id="malTipClip"><path d={TIP}/></clipPath>
        <linearGradient id="malTipFlank" x1="0" y1="0" x2="1" y2="0.2"><stop offset="0%" stopColor="#A8A8A0"/><stop offset="45%" stopColor="#CACAC4"/><stop offset="100%" stopColor="#B6B6AE"/></linearGradient>
        <clipPath id="malBelow"><rect x="0" y={WY + 0.2} width="120" height="40"/></clipPath>
        <clipPath id="malAbove"><rect x="0" y="0" width="120" height={WY + 0.2}/></clipPath>
        <clipPath id="malFrame"><rect x="0" y="0" width="120" height="130"/></clipPath>
        <filter id="malBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.5"/></filter>
        <filter id="malSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.85"/></filter>
        <filter id="malBlur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="malDof" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter>
        <filter id="malMurk" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.2"/></filter>
        <filter id="malSmear" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6 0.5"/></filter>
        <filter id="malTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.4" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.08  0.6 0 0 0 -0.32" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
        <filter id="malTexH" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1 0.5" numOctaves="2" seed="7" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.02  0 0 0 0 0.1  0 0 0 0 0.05  0.7 0 0 0 -0.36" result="a"/>
          <feComposite in="a" in2="SourceGraphic" operator="in" result="grain"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grain"/></feMerge>
        </filter>
      </defs>
      <g clipPath="url(#malFrame)">{content}</g>
    </svg>
  )
}
