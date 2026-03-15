// Bird. Here. Now. — SVG Bird Avatars
// Cute-but-accurate cartoon birds, designed to be identifiable
// and to convey the species' key field marks at a glance.
// All avatars are pure SVG — no external images required.

import { useState, useEffect, useRef } from 'react'

// ── Northern Cardinal (male) ──────────────────────────────────────────────────
export function CardinalAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 400)
    return () => clearInterval(id)
  }, [animated])

  const hopY = animated ? [0, -4, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Northern Cardinal">
      <g transform={`translate(0, ${hopY})`}>
        {/* Tail feathers */}
        <path d="M 72 88 C 84 90 96 100 100 114 C 90 106 79 97 72 90" fill="#9B1526"/>
        <path d="M 68 90 C 76 100 76 112 72 120 C 68 112 65 102 66 92" fill="#9B1526"/>

        {/* Main body */}
        <ellipse cx="60" cy="82" rx="23" ry="18" fill="#CC2233"/>

        {/* Wing overlay – darker shading */}
        <path d="M 42 76 C 52 68 72 68 82 78 C 78 90 58 92 42 84 Z" fill="#AA1A28"/>
        {/* Wing feather detail */}
        <path d="M 45 82 C 56 86 68 86 78 81" stroke="#881520" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        {/* Head */}
        <circle cx="48" cy="58" r="18" fill="#CC2233"/>

        {/* Crest – prominent upward spike */}
        <path d="M 43 44 C 46 30 55 23 57 36 C 53 29 48 34 44 44" fill="#CC2233"/>
        <path d="M 46 42 C 49 32 55 26 55 36" stroke="#AA1A28" strokeWidth="1" fill="none"/>

        {/* Black face mask */}
        <path d="M 30 58 C 32 50 40 46 52 47 C 60 48 62 56 58 62 C 52 66 40 65 32 62 Z" fill="#1C1C1C"/>

        {/* Bill – large conical */}
        <path d="M 30 57 L 18 60 L 30 63 Z" fill="#E06020"/>
        <line x1="18" y1="60" x2="30" y2="60" stroke="#C04010" strokeWidth="0.8"/>

        {/* Eye – bright against mask */}
        <circle cx="46" cy="54" r="4" fill="#1C1C1C"/>
        <circle cx="44.5" cy="52.5" r="1.6" fill="white" opacity="0.92"/>

        {/* Legs */}
        <path d="M 50 100 L 46 114" stroke="#8B5A30" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 64 100 L 68 114" stroke="#8B5A30" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Toes */}
        <path d="M 46 114 L 40 117 M 46 114 L 46 119 M 46 114 L 51 117" stroke="#8B5A30" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 68 114 L 62 117 M 68 114 L 68 119 M 68 114 L 73 117" stroke="#8B5A30" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── American Robin ────────────────────────────────────────────────────────────
export function RobinAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 380)
    return () => clearInterval(id)
  }, [animated])

  const hopY = animated ? [0, -5, 0, 3][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Robin">
      <g transform={`translate(0, ${hopY})`}>
        {/* Tail */}
        <path d="M 70 90 C 84 92 98 102 102 116 C 90 108 78 100 72 92" fill="#2B3A2B"/>
        <path d="M 67 92 C 76 103 76 115 70 122 C 66 114 64 104 66 94" fill="#2B3A2B"/>

        {/* Body – dark back */}
        <ellipse cx="60" cy="82" rx="23" ry="18" fill="#2B3A2B"/>

        {/* Orange breast – prominent patch */}
        <ellipse cx="52" cy="85" rx="16" ry="14" fill="#C85A1E"/>

        {/* White lower belly */}
        <ellipse cx="51" cy="94" rx="9" ry="6" fill="#F5F5F5"/>

        {/* Wing detail */}
        <path d="M 55 72 C 65 68 78 70 84 80 C 78 88 62 88 55 82 Z" fill="#22302A"/>

        {/* Head – dark */}
        <circle cx="46" cy="57" r="17" fill="#1E2A1E"/>

        {/* White broken eye ring */}
        <circle cx="44" cy="54" r="6" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 5"/>

        {/* Eye */}
        <circle cx="44" cy="54" r="3.5" fill="#1C1C1C"/>
        <circle cx="42.8" cy="52.8" r="1.3" fill="white" opacity="0.9"/>

        {/* Bill – yellow */}
        <path d="M 29 57 L 20 60 L 29 63 Z" fill="#F0C030"/>
        <line x1="20" y1="60" x2="29" y2="60" stroke="#C8A020" strokeWidth="1"/>

        {/* White throat streaks */}
        <path d="M 33 62 L 30 68 M 36 63 L 34 70" stroke="#F5F5F5" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Legs */}
        <path d="M 50 99 L 46 113" stroke="#8B5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 63 99 L 67 113" stroke="#8B5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 113 L 40 116 M 46 113 L 46 118 M 46 113 L 51 116" stroke="#8B5A30" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 67 113 L 61 116 M 67 113 L 67 118 M 67 113 L 72 116" stroke="#8B5A30" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Blue Jay ──────────────────────────────────────────────────────────────────
export function BlueJayAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 350)
    return () => clearInterval(id)
  }, [animated])

  const headTilt = animated && frame === 2 ? 'rotate(-8, 48, 57)' : 'rotate(0)'
  const hopY = animated ? [0, -3, -6, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Blue Jay">
      <g transform={`translate(0, ${hopY})`}>
        {/* Tail – long, barred */}
        <path d="M 70 88 C 88 90 102 98 108 112 C 94 106 80 98 72 90" fill="#3A6FA8"/>
        <path d="M 66 90 C 80 100 82 115 76 124 C 72 116 68 104 66 92" fill="#3A6FA8"/>
        {/* Tail barring */}
        <path d="M 78 94 L 96 104 M 74 98 L 90 110 M 70 103 L 82 114" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.5"/>

        {/* Body */}
        <ellipse cx="60" cy="82" rx="22" ry="17" fill="#4A7FBD"/>

        {/* Wing – blue with barring */}
        <path d="M 52 72 C 64 66 80 68 86 78 C 80 88 62 90 52 84 Z" fill="#3A6FA8"/>
        {/* Wing bars */}
        <path d="M 57 74 L 82 78" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"/>
        <path d="M 56 80 L 82 84" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        {/* Wing barring */}
        <path d="M 60 70 L 76 75 M 63 66 L 78 72" stroke="#1A1A1A" strokeWidth="1" opacity="0.4"/>

        {/* White belly / underparts */}
        <ellipse cx="50" cy="88" rx="14" ry="9" fill="#F0F0F0"/>

        {/* Head */}
        <g transform={headTilt}>
          <circle cx="48" cy="57" r="17" fill="#4A7FBD"/>

          {/* Crest */}
          <path d="M 44 42 C 46 28 56 22 58 36 C 53 28 48 34 44 42" fill="#4A7FBD"/>
          <path d="M 46 40 C 50 30 57 25 57 36" stroke="#3A6FA8" strokeWidth="1.2" fill="none"/>

          {/* White face */}
          <ellipse cx="42" cy="60" rx="13" ry="10" fill="#F2F2F2"/>

          {/* Black necklace */}
          <path d="M 28 54 C 30 46 40 42 52 44 C 62 45 66 50 62 56 C 56 58 30 62 28 54 Z" fill="#1A1A1A"/>

          {/* Eye */}
          <circle cx="42" cy="55" r="4" fill="#1A1A1A"/>
          <circle cx="40.5" cy="53.5" r="1.5" fill="white" opacity="0.9"/>

          {/* Bill – strong, black */}
          <path d="M 28 58 L 18 61 L 28 65 Z" fill="#1A1A1A"/>
          <path d="M 28 58 L 18 61" stroke="#333" strokeWidth="0.8"/>
        </g>

        {/* Legs */}
        <path d="M 50 99 L 46 113" stroke="#5A3A10" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 63 99 L 67 113" stroke="#5A3A10" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 113 L 40 116 M 46 113 L 46 118 M 46 113 L 51 116" stroke="#5A3A10" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 67 113 L 61 116 M 67 113 L 67 118 M 67 113 L 72 116" stroke="#5A3A10" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Black-capped Chickadee ────────────────────────────────────────────────────
export function ChickadeeAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 280)
    return () => clearInterval(id)
  }, [animated])

  const bobY = animated ? [0, -3, -6, -8, -6, -3, 0, 2][frame] : 0
  const tilt = animated && frame > 3 ? 'rotate(15, 50, 62)' : 'rotate(0)'

  return (
    <svg viewBox="0 0 100 110" width={size} height={size} style={style} aria-label="Black-capped Chickadee">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail */}
        <path d="M 66 82 C 78 83 88 90 92 102 C 82 96 72 89 67 84" fill="#7A7A7A"/>
        <path d="M 63 84 C 70 93 70 103 65 110 C 62 103 60 94 60 86" fill="#7A7A7A"/>

        {/* Body – round and plump */}
        <ellipse cx="55" cy="78" rx="19" ry="15" fill="#909090"/>

        {/* Buff flanks */}
        <ellipse cx="48" cy="82" rx="10" ry="8" fill="#F0DEB8"/>
        {/* White belly */}
        <ellipse cx="47" cy="84" rx="7" ry="5" fill="#F8F8F8"/>

        {/* Wing – gray with white edges */}
        <path d="M 48 70 C 58 65 72 66 76 76 C 70 84 54 84 48 78 Z" fill="#7A7A7A"/>
        <path d="M 52 70 C 62 65 73 66 76 74" stroke="#D0D0D0" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Head – round, oversized */}
        <g transform={tilt}>
          <circle cx="47" cy="60" r="15" fill="#2B2B2B"/>

          {/* White cheek patch – large and puffy */}
          <ellipse cx="40" cy="62" rx="10" ry="8" fill="#F8F8F8"/>

          {/* Black bib */}
          <ellipse cx="43" cy="71" rx="7" ry="5" fill="#1A1A1A"/>

          {/* Eye */}
          <circle cx="43" cy="57" r="3.5" fill="#1A1A1A"/>
          <circle cx="41.5" cy="55.5" r="1.3" fill="white" opacity="0.9"/>

          {/* Tiny stub bill */}
          <path d="M 31 60 L 25 62 L 31 64 Z" fill="#1A1A1A"/>
        </g>

        {/* Legs – short */}
        <path d="M 48 93 L 45 104" stroke="#6A4A20" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 58 93 L 61 104" stroke="#6A4A20" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 45 104 L 40 107 M 45 104 L 45 109 M 45 104 L 49 107" stroke="#6A4A20" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 61 104 L 56 107 M 61 104 L 61 109 M 61 104 L 65 107" stroke="#6A4A20" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── American Goldfinch (male, breeding) ──────────────────────────────────────
export function GoldfinchAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 320)
    return () => clearInterval(id)
  }, [animated])

  // Goldfinch bobs up and down while clinging (undulating energy)
  const hopY = animated ? [0, -4, -8, -4, 0, 3][frame] : 0

  return (
    <svg viewBox="0 0 100 110" width={size} height={size} style={style} aria-label="American Goldfinch">
      <g transform={`translate(0, ${hopY})`}>
        {/* Tail – black with white corners */}
        <path d="M 64 80 C 76 80 88 86 92 98 C 81 92 70 86 65 82" fill="#1A1A1A"/>
        <path d="M 60 82 C 67 91 65 102 59 108 C 56 101 56 92 58 84" fill="#1A1A1A"/>
        {/* White tail corners */}
        <path d="M 88 98 C 90 100 92 102 91 105 C 89 102 88 100 88 98" fill="white"/>

        {/* Body – brilliant yellow */}
        <ellipse cx="54" cy="76" rx="19" ry="14" fill="#FFD700"/>

        {/* Black wings */}
        <path d="M 48 68 C 58 62 74 64 78 74 C 72 82 54 82 48 76 Z" fill="#1A1A1A"/>
        {/* White wing bars – prominent */}
        <path d="M 52 68 L 75 72" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 51 74 L 75 78" stroke="white" strokeWidth="2" strokeLinecap="round"/>

        {/* Head – yellow */}
        <circle cx="45" cy="59" r="14" fill="#FFD700"/>

        {/* Black forehead cap */}
        <path d="M 34 55 C 36 47 44 43 52 46 C 58 48 58 54 54 56 C 48 57 38 58 34 55 Z" fill="#1A1A1A"/>

        {/* Eye */}
        <circle cx="42" cy="56" r="3.5" fill="#1A1A1A"/>
        <circle cx="40.5" cy="54.5" r="1.3" fill="white" opacity="0.9"/>

        {/* Bill – stubby, pink-orange */}
        <path d="M 30 59 L 22 62 L 30 65 Z" fill="#F0A040"/>
        <line x1="22" y1="62" x2="30" y2="62" stroke="#C87020" strokeWidth="0.8"/>

        {/* Legs */}
        <path d="M 46 90 L 42 102" stroke="#8B5A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 58 90 L 62 102" stroke="#8B5A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 42 102 L 37 105 M 42 102 L 42 107 M 42 102 L 46 105" stroke="#8B5A30" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 62 102 L 57 105 M 62 102 L 62 107 M 62 102 L 66 105" stroke="#8B5A30" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Mallard (male) ────────────────────────────────────────────────────────────
export function MallardAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 600)
    return () => clearInterval(id)
  }, [animated])

  const sway = animated ? [0, 2, 0, -2][frame] : 0

  return (
    <svg viewBox="0 0 140 120" width={size} height={size} style={style} aria-label="Mallard">
      <g transform={`translate(${sway}, 0)`}>
        {/* Water ripple */}
        <ellipse cx="72" cy="106" rx="42" ry="6" fill="#1A3A5C" opacity="0.4"/>
        <ellipse cx="72" cy="108" rx="48" ry="4" fill="#1A3A5C" opacity="0.25"/>

        {/* Tail with curled feather */}
        <path d="M 92 72 C 108 72 118 66 116 58 C 112 64 102 68 92 70" fill="#1A1A1A"/>
        {/* Curled tail feather */}
        <path d="M 116 58 C 124 52 126 44 120 42 C 114 46 116 54 116 58" fill="#1A1A1A"/>

        {/* Body – gray flanks */}
        <ellipse cx="72" cy="82" rx="34" ry="22" fill="#C8C8C8"/>

        {/* Chestnut breast */}
        <ellipse cx="48" cy="80" rx="18" ry="17" fill="#7A3220"/>

        {/* Wing speculum (blue-purple) */}
        <path d="M 60 72 L 88 70 L 90 78 L 62 80 Z" fill="#4A3AAA"/>
        <path d="M 60 72 L 88 70" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 80 L 90 78" stroke="white" strokeWidth="2" strokeLinecap="round"/>

        {/* Neck – white ring separator */}
        <ellipse cx="44" cy="64" rx="10" ry="7" fill="white"/>

        {/* Head – iridescent green */}
        <circle cx="40" cy="52" r="18" fill="#2D6B4A"/>
        {/* Iridescent sheen */}
        <circle cx="36" cy="46" r="8" fill="#3A8860" opacity="0.5"/>
        <circle cx="38" cy="48" r="4" fill="#5AC090" opacity="0.3"/>

        {/* Eye */}
        <circle cx="36" cy="50" r="4.5" fill="#1A1A1A"/>
        <circle cx="34.5" cy="48.5" r="1.8" fill="white" opacity="0.9"/>

        {/* Bill – flat spatulate, yellow-orange */}
        <path d="M 22 53 C 18 53 14 55 16 59 C 18 63 26 64 30 62 L 30 54 Z" fill="#E8B830"/>
        <path d="M 22 53 L 30 54 L 30 62" stroke="#B88820" strokeWidth="1"/>
        {/* Nostril */}
        <ellipse cx="22" cy="57" rx="2" ry="1.2" fill="#C89820"/>

        {/* Feet – orange, showing in water */}
        <path d="M 58 100 C 48 100 44 106 46 108 C 52 104 58 104 60 102" fill="#E88030" opacity="0.7"/>
        <path d="M 86 100 C 96 100 100 106 98 108 C 92 104 86 104 84 102" fill="#E88030" opacity="0.7"/>
      </g>
    </svg>
  )
}

// ── Red-tailed Hawk ───────────────────────────────────────────────────────────
export function RedTailedHawkAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 500)
    return () => clearInterval(id)
  }, [animated])

  // Slow soaring circle simulation – wings sway
  const wingDip = animated ? Math.sin(frame * Math.PI / 4) * 5 : 0

  return (
    <svg viewBox="0 0 140 120" width={size} height={size} style={style} aria-label="Red-tailed Hawk">
      {/* Wings spread in soar – signature silhouette */}
      <g>
        {/* Left wing */}
        <path
          d={`M 70 62 C 50 ${58 + wingDip} 24 ${56 + wingDip} 10 ${64 + wingDip} C 20 ${54 + wingDip} 46 ${52 + wingDip} 70 60`}
          fill="#8B6030"
        />
        {/* Left wing tip feathers */}
        <path d={`M 10 ${64 + wingDip} L 6 ${72 + wingDip} M 14 ${68 + wingDip} L 10 ${76 + wingDip} M 18 ${70 + wingDip} L 14 ${78 + wingDip}`}
          stroke="#5A3A10" strokeWidth="2" strokeLinecap="round"/>

        {/* Right wing */}
        <path
          d={`M 70 62 C 90 ${58 + wingDip} 116 ${56 + wingDip} 130 ${64 + wingDip} C 120 ${54 + wingDip} 94 ${52 + wingDip} 70 60`}
          fill="#8B6030"
        />
        {/* Right wing tip feathers */}
        <path d={`M 130 ${64 + wingDip} L 134 ${72 + wingDip} M 126 ${68 + wingDip} L 130 ${76 + wingDip} M 122 ${70 + wingDip} L 126 ${78 + wingDip}`}
          stroke="#5A3A10" strokeWidth="2" strokeLinecap="round"/>

        {/* Wing pale lining – inner wing */}
        <path d={`M 70 64 C 54 ${60 + wingDip} 36 ${60 + wingDip} 24 ${66 + wingDip}`} stroke="#F5E6C8" strokeWidth="8" strokeLinecap="round" opacity="0.6"/>
        <path d={`M 70 64 C 86 ${60 + wingDip} 104 ${60 + wingDip} 116 ${66 + wingDip}`} stroke="#F5E6C8" strokeWidth="8" strokeLinecap="round" opacity="0.6"/>

        {/* Body – pale with belly band */}
        <ellipse cx="70" cy="68" rx="16" ry="24" fill="#F5E6C8"/>

        {/* Belly band – dark streaking */}
        <path d="M 56 78 C 60 82 66 84 70 84 C 74 84 80 82 84 78 C 78 90 62 90 56 78 Z" fill="#5A3A10" opacity="0.7"/>

        {/* Red tail – THE field mark */}
        <path d="M 58 88 C 62 96 68 102 70 106 C 72 102 78 96 82 88 C 76 94 70 96 64 92 Z" fill="#C85020"/>
        {/* Tail barring */}
        <path d="M 60 90 C 65 92 75 92 80 90" stroke="#8B2810" strokeWidth="1.5" opacity="0.6"/>

        {/* Head – brown */}
        <circle cx="70" cy="50" r="14" fill="#7A5020"/>

        {/* White throat */}
        <ellipse cx="70" cy="58" rx="8" ry="5" fill="#F5E6C8"/>

        {/* Hooked bill */}
        <path d="M 58 50 C 52 50 46 53 48 58 C 50 56 55 55 60 54 Z" fill="#C8A030"/>
        <path d="M 46 56 C 44 60 46 64 50 62" stroke="#8B6020" strokeWidth="1.2" fill="none"/>

        {/* Eye – fierce yellow */}
        <circle cx="62" cy="48" r="5" fill="#F0C030"/>
        <circle cx="62" cy="48" r="3" fill="#1A1A1A"/>
        <circle cx="60.5" cy="46.5" r="1.2" fill="white" opacity="0.9"/>
        {/* Eyebrow ridge – gives stern look */}
        <path d="M 56 44 C 60 42 66 43 68 45" stroke="#5A3A10" strokeWidth="2" strokeLinecap="round"/>

        {/* Feet / talons */}
        <path d="M 62 92 L 58 104" stroke="#C8A030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 78 92 L 82 104" stroke="#C8A030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 58 104 L 52 108 M 58 104 L 57 110 M 58 104 L 63 108" stroke="#C8A030" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 82 104 L 76 108 M 82 104 L 82 110 M 82 104 L 87 108" stroke="#C8A030" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Great Blue Heron ──────────────────────────────────────────────────────────
export function GreatBlueHeronAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 12), 700)
    return () => clearInterval(id)
  }, [animated])

  // Heron stalks very slowly – occasional neck adjustment
  const neckOffset = animated && frame > 8 ? -3 : 0

  return (
    <svg viewBox="0 0 100 150" width={size} height={size} style={style} aria-label="Great Blue Heron">
      {/* Water surface */}
      <path d="M 8 134 C 25 130 60 132 92 130 C 70 135 30 136 8 134" fill="#1A3A5C" opacity="0.4"/>

      {/* Legs – long, in water */}
      <path d="M 44 118 L 40 142" stroke="#8B9080" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 60 118 L 64 142" stroke="#8B9080" strokeWidth="3" strokeLinecap="round"/>
      {/* Toes */}
      <path d="M 40 142 L 32 145 M 40 142 L 40 148 M 40 142 L 46 145 M 40 142 L 38 148" stroke="#8B9080" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 64 142 L 56 145 M 64 142 L 64 148 M 64 142 L 70 145 M 64 142 L 62 148" stroke="#8B9080" strokeWidth="2" strokeLinecap="round"/>

      {/* Body – large, slate blue-gray */}
      <ellipse cx="52" cy="102" rx="26" ry="20" fill="#6080A0"/>

      {/* Wing folded */}
      <path d="M 38 90 C 50 84 72 86 78 98 C 68 108 44 108 38 100 Z" fill="#5070908A"/>
      {/* Wing plumes */}
      <path d="M 72 90 C 80 94 84 100 82 108" stroke="#C8C8D8" strokeWidth="2" fill="none"/>
      <path d="M 75 92 C 84 96 88 104 86 112" stroke="#C8C8D8" strokeWidth="1.5" fill="none"/>

      {/* Breast plumes */}
      <path d="M 36 100 C 30 108 28 116 32 122" stroke="#C8C8D8" strokeWidth="2" fill="none"/>
      <path d="M 34 103 C 27 112 26 120 30 125" stroke="#C8C8D8" strokeWidth="1.5" fill="none"/>

      {/* Neck – S-curved, long */}
      <path
        d={`M 48 84 C 44 72 40 ${60 + neckOffset} 44 ${50 + neckOffset}`}
        stroke="#C8C8D8" strokeWidth="14" strokeLinecap="round" fill="none"
      />
      <path
        d={`M 48 84 C 44 72 40 ${60 + neckOffset} 44 ${50 + neckOffset}`}
        stroke="#6080A0" strokeWidth="10" strokeLinecap="round" fill="none"
      />
      {/* Neck streaking */}
      <path
        d={`M 46 80 C 42 70 40 ${62 + neckOffset} 43 ${54 + neckOffset}`}
        stroke="#3A5070" strokeWidth="1.5" fill="none" strokeDasharray="3 4"
      />

      {/* Head – white */}
      <circle cx={44} cy={46 + neckOffset} r="13" fill="#F0F0F0"/>

      {/* Black eyestripe extending to plume */}
      <path d={`M 32 ${42 + neckOffset} C 34 ${38 + neckOffset} 42 ${34 + neckOffset} 52 ${36 + neckOffset} C 58 ${38 + neckOffset} 60 ${40 + neckOffset} 56 ${43 + neckOffset}`}
        fill="#1A1A1A"/>
      {/* Black trailing plume */}
      <path d={`M 56 ${43 + neckOffset} C 62 ${46 + neckOffset} 68 ${50 + neckOffset} 66 ${58 + neckOffset}`}
        stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none"/>

      {/* Eye */}
      <circle cx={44} cy={46 + neckOffset} r="4.5" fill="#F0C030"/>
      <circle cx={44} cy={46 + neckOffset} r="2.5" fill="#1A1A1A"/>
      <circle cx={43} cy={45 + neckOffset} r="1" fill="white" opacity="0.9"/>

      {/* Bill – massive yellow-orange spear */}
      <path d={`M 30 ${47 + neckOffset} L 8 ${50 + neckOffset} L 30 ${53 + neckOffset} Z`} fill="#E8A820"/>
      <line x1="8" y1={50 + neckOffset} x2="30" y2={50 + neckOffset} stroke="#C88010" strokeWidth="1"/>
    </svg>
  )
}

// ── Avatar router ─────────────────────────────────────────────────────────────
export function BirdAvatar({ birdId, size = 120, animated = false, style = {} }) {
  const props = { size, animated, style }
  switch (birdId) {
    case 'northern_cardinal':      return <CardinalAvatar {...props} />
    case 'american_robin':         return <RobinAvatar {...props} />
    case 'blue_jay':               return <BlueJayAvatar {...props} />
    case 'black_capped_chickadee': return <ChickadeeAvatar {...props} />
    case 'american_goldfinch':     return <GoldfinchAvatar {...props} />
    case 'mallard':                return <MallardAvatar {...props} />
    case 'red_tailed_hawk':        return <RedTailedHawkAvatar {...props} />
    case 'great_blue_heron':       return <GreatBlueHeronAvatar {...props} />
    default:
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} style={style}>
          <circle cx="50" cy="50" r="40" fill="#333" opacity="0.6"/>
          <text x="50" y="55" textAnchor="middle" fill="#aaa" fontSize="28">?</text>
        </svg>
      )
  }
}

// Silhouette version for locked/undiscovered birds
export function BirdSilhouette({ birdId, size = 80, style = {} }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style}>
      <circle cx="50" cy="40" r="18" fill="#2a3a2a"/>
      <ellipse cx="50" cy="68" rx="24" ry="18" fill="#2a3a2a"/>
      <path d="M 50 55 L 46 80 L 54 80 Z" fill="#2a3a2a"/>
      <text x="50" y="98" textAnchor="middle" fill="#3a5a3a" fontSize="10" fontFamily="sans-serif">???</text>
    </svg>
  )
}
