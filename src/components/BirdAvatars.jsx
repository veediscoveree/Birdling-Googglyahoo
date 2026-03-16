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

// ── Prothonotary Warbler ──────────────────────────────────────────────────────
export function ProthonotaryWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 380)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0
  const wingFlick = animated && frame === 2 ? 2 : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Prothonotary Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — blue-gray */}
        <path d="M 72 88 C 84 90 96 98 100 110 C 90 104 80 96 72 90" fill="#7890A8"/>
        <path d="M 69 90 C 76 100 76 112 72 118 C 68 110 66 100 68 92" fill="#7890A8"/>
        {/* Body gold */}
        <ellipse cx="60" cy="82" rx="22" ry="17" fill="#F5C518"/>
        {/* Blue-gray wings */}
        <path d={`M 50 70 C 62 64 78 66 84 76 C 78 88 60 90 50 84 Z`} fill={`#${wingFlick ? '6880A0' : '7890A8'}`}/>
        {/* Wing feather edge */}
        <path d="M 54 73 L 80 78" stroke="#608098" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        {/* Blue-gray back */}
        <ellipse cx="65" cy="76" rx="14" ry="8" fill="#7890A8" opacity="0.7"/>
        {/* Head — brilliant gold */}
        <circle cx="46" cy="58" r="17" fill="#F5C518"/>
        {/* Bill — thin, dark */}
        <path d="M 30 57 L 18 59 L 30 62 Z" fill="#2A2A2A"/>
        {/* Eye */}
        <circle cx="44" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="43" cy="53" r="1.5" fill="white" opacity="0.9"/>
        {/* White belly hint */}
        <ellipse cx="54" cy="93" rx="8" ry="5" fill="#F8F0C0" opacity="0.5"/>
        {/* Legs */}
        <path d="M 50 98 L 46 112" stroke="#8B6A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 98 L 66 112" stroke="#8B6A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 46 112 L 40 115 M 46 112 L 46 117 M 46 112 L 51 115" stroke="#8B6A30" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 112 L 60 115 M 66 112 L 66 117 M 66 112 L 71 115" stroke="#8B6A30" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── American Redstart ─────────────────────────────────────────────────────────
export function AmericanRedstartAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 300)
    return () => clearInterval(id)
  }, [animated])
  // Tail fan oscillates
  const fanSpread = animated ? [0, 3, 6, 8, 6, 3, 0, -2][frame] : 0
  const bobY = animated ? [0, -2, -4, -2, 0, 2, 2, 0][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Redstart">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — fanning, with orange base */}
        <path d={`M 68 88 C ${80 + fanSpread} 90 ${95 + fanSpread} 98 ${100 + fanSpread} 112 C 90 106 78 98 70 90`} fill="#FF7000"/>
        <path d={`M 68 90 C ${76 + fanSpread} 100 ${76 + fanSpread} 112 ${70 + fanSpread} 118 C 66 110 64 100 66 92`} fill="#FF7000"/>
        {/* Black tail center over orange */}
        <path d="M 68 88 C 76 90 80 96 80 108 C 76 102 72 94 68 90" fill="#1A1A1A"/>
        {/* Body — jet black */}
        <ellipse cx="58" cy="82" rx="20" ry="16" fill="#1A1A1A"/>
        {/* Orange breast side patches */}
        <path d="M 40 78 C 44 72 52 70 54 80 C 52 90 40 90 38 84 Z" fill="#FF7000"/>
        {/* Wing — black with orange stripe */}
        <path d="M 50 70 C 62 64 78 66 84 76 C 78 88 60 90 50 84 Z" fill="#1A1A1A"/>
        <path d="M 56 70 L 76 78" stroke="#FF7000" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        {/* White belly */}
        <ellipse cx="50" cy="91" rx="10" ry="6" fill="#F5F5F5"/>
        {/* Head — black */}
        <circle cx="44" cy="58" r="16" fill="#1A1A1A"/>
        {/* Bill */}
        <path d="M 29 57 L 19 59 L 29 62 Z" fill="#1A1A1A"/>
        {/* Eye — bright against black */}
        <circle cx="42" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="41" cy="53" r="1.8" fill="white" opacity="0.85"/>
        {/* Legs */}
        <path d="M 48 96 L 44 110" stroke="#5A3A10" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 60 96 L 64 110" stroke="#5A3A10" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 44 110 L 38 113 M 44 110 L 44 115 M 44 110 L 49 113" stroke="#5A3A10" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 64 110 L 58 113 M 64 110 L 64 115 M 64 110 L 69 113" stroke="#5A3A10" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Common Yellowthroat ────────────────────────────────────────────────────────
export function CommonYellowthroatAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 420)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -2, -4, -2, 0, 1][frame] : 0
  const headBob = animated && frame >= 3 ? 3 : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Common Yellowthroat">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — olive */}
        <path d="M 70 88 C 82 90 94 100 98 112 C 88 106 77 98 72 90" fill="#6B8040"/>
        <path d="M 67 90 C 74 102 74 114 70 120 C 66 112 63 102 65 92" fill="#6B8040"/>
        {/* Body — olive-yellow */}
        <ellipse cx="58" cy="82" rx="22" ry="17" fill="#8A9A40"/>
        {/* Wing — slightly darker olive */}
        <path d="M 48 72 C 60 66 76 68 82 78 C 76 90 58 92 48 86 Z" fill="#7A8A38"/>
        {/* Yellow throat/breast — bright */}
        <ellipse cx="46" cy="90" rx="14" ry="10" fill="#F5E000"/>
        {/* Head — olive, round */}
        <g transform={`translate(0, ${headBob})`}>
          <circle cx="44" cy="57" r="17" fill="#8A9A40"/>
          {/* Black mask — broad, bandit-style */}
          <path d="M 28 52 C 30 45 38 42 50 44 C 60 46 64 52 60 58 C 54 62 30 62 28 56 Z" fill="#1A1A1A"/>
          {/* White band above mask */}
          <path d="M 30 50 C 34 44 44 42 52 43 C 58 44 61 48 58 50 C 50 48 38 48 30 50 Z" fill="#D0D0D0" opacity="0.85"/>
          {/* Bill */}
          <path d="M 27 55 L 17 57 L 27 60 Z" fill="#2A2A2A"/>
          {/* Eye in mask */}
          <circle cx="42" cy="53" r="3.5" fill="#1A1A1A"/>
          <circle cx="41" cy="52" r="1.3" fill="white" opacity="0.8"/>
        </g>
        {/* Legs */}
        <path d="M 50 98 L 46 112" stroke="#7A5A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 98 L 66 112" stroke="#7A5A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 46 112 L 40 115 M 46 112 L 46 117 M 46 112 L 51 115" stroke="#7A5A30" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 112 L 60 115 M 66 112 L 66 117 M 66 112 L 71 115" stroke="#7A5A30" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Black-and-white Warbler ──────────────────────────────────────────────────
export function BlackAndWhiteWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 350)
    return () => clearInterval(id)
  }, [animated])
  // Creeping motion — subtle forward lean
  const creepX = animated ? [0, 2, 4, 5, 4, 2, 0, -1][frame] : 0
  const creepY = animated ? [0, -1, -2, -2, -1, 0, 1, 0][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Black-and-white Warbler">
      <g transform={`translate(${creepX}, ${creepY})`}>
        {/* Tail — black and white striped */}
        <path d="M 70 88 C 82 90 94 100 98 112 C 88 106 78 98 71 90" fill="#1A1A1A"/>
        <path d="M 74 88 C 84 92 92 102 93 114 C 86 108 79 100 72 91" fill="#F0F0F0"/>
        {/* Body — white base */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#F0F0F0"/>
        {/* Black back stripes */}
        <path d="M 44 68 C 56 62 74 64 80 74 C 74 80 54 80 44 74 Z" fill="#1A1A1A"/>
        <path d="M 47 66 L 77 72" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <path d="M 48 70 L 76 76" stroke="#F0F0F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* Breast streaks */}
        <path d="M 40 82 L 46 96 M 46 80 L 50 94 M 52 79 L 54 93 M 58 79 L 58 93" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Flank streaks */}
        <path d="M 36 86 L 42 98 M 34 92 L 40 104" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Head — striped */}
        <circle cx="44" cy="57" r="16" fill="#1A1A1A"/>
        {/* White median crown stripe */}
        <path d="M 36 48 C 40 42 48 40 52 46 C 48 44 42 44 36 48 Z" fill="#F0F0F0"/>
        <line x1="36" y1="48" x2="54" y2="44" stroke="#F0F0F0" strokeWidth="2.5"/>
        {/* White supercilium */}
        <path d="M 28 54 C 32 49 40 48 50 51 C 44 50 34 52 28 54 Z" fill="#F0F0F0"/>
        <line x1="28" y1="55" x2="50" y2="51" stroke="#F0F0F0" strokeWidth="2"/>
        {/* Black throat */}
        <path d="M 28 57 C 30 54 38 53 46 56 C 44 62 30 62 28 58 Z" fill="#1A1A1A"/>
        {/* Bill — thin, dark */}
        <path d="M 28 55 L 18 57 L 28 60 Z" fill="#2A2A2A"/>
        {/* Eye */}
        <circle cx="42" cy="53" r="3.5" fill="#1A1A1A"/>
        <circle cx="41" cy="52" r="1.3" fill="white" opacity="0.85"/>
        {/* Legs — long hind toe */}
        <path d="M 50 97 L 46 111" stroke="#7A6040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#7A6040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114 M 46 111 L 44 118" stroke="#7A6040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#7A6040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Yellow-rumped Warbler ─────────────────────────────────────────────────────
export function YellowRumpedWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Yellow-rumped Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — gray with yellow rump base */}
        <path d="M 70 88 C 82 90 94 100 98 112 C 88 106 77 98 71 90" fill="#6A7A8A"/>
        <path d="M 67 90 C 74 102 74 114 70 120 C 66 112 63 102 65 92" fill="#6A7A8A"/>
        {/* Yellow rump patch — key feature */}
        <ellipse cx="68" cy="87" rx="8" ry="6" fill="#F5D000"/>
        {/* Body — gray */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#7A8A9A"/>
        {/* Wing — slightly darker gray, with white bars */}
        <path d="M 48 72 C 60 66 76 68 82 78 C 76 90 58 92 48 86 Z" fill="#6A7A8A"/>
        {/* Two white wing bars */}
        <path d="M 53 73 L 78 77" stroke="#F0F0F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
        <path d="M 52 79 L 77 83" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
        {/* Black breast patch */}
        <path d="M 38 82 C 40 74 52 70 58 74 C 62 78 60 86 54 88 C 46 90 36 88 38 82 Z" fill="#1A1A1A"/>
        {/* White throat */}
        <path d="M 36 76 C 38 70 44 68 50 70 C 54 72 54 78 50 80 C 44 80 36 78 36 76 Z" fill="#F0F0F0"/>
        {/* Yellow side patches */}
        <path d="M 36 82 C 34 78 36 72 40 72 C 44 72 46 78 44 84 Z" fill="#F5D000"/>
        {/* Head — gray with yellow crown patch */}
        <circle cx="44" cy="57" r="16" fill="#6A7A8A"/>
        {/* Black mask area */}
        <path d="M 30 55 C 32 49 40 46 50 49 C 56 51 56 57 50 60 C 42 62 30 60 30 55 Z" fill="#1A1A1A" opacity="0.7"/>
        {/* Yellow crown patch */}
        <ellipse cx="46" cy="48" rx="7" ry="5" fill="#F5D000"/>
        {/* Bill */}
        <path d="M 28 56 L 18 58 L 28 61 Z" fill="#2A2A2A"/>
        {/* Eye */}
        <circle cx="42" cy="54" r="3.5" fill="#1A1A1A"/>
        <circle cx="41" cy="53" r="1.3" fill="white" opacity="0.85"/>
        {/* Legs */}
        <path d="M 50 97 L 46 111" stroke="#7A6040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#7A6040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#7A6040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#7A6040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Red-eyed Vireo ────────────────────────────────────────────────────────────
export function RedEyedVireoAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 600)
    return () => clearInterval(id)
  }, [animated])
  // Slow deliberate movement
  const stepX = animated ? [0, 1, 3, 4, 3, 1, 0, -1][frame] : 0
  const headTilt = animated && (frame === 3 || frame === 4) ? 'rotate(-5, 44, 57)' : 'rotate(0)'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Red-eyed Vireo">
      <g transform={`translate(${stepX}, 0)`}>
        {/* Tail — olive */}
        <path d="M 70 88 C 82 90 93 100 96 112 C 87 106 77 98 71 90" fill="#6B8040"/>
        <path d="M 67 90 C 74 102 74 114 70 120 C 66 112 63 102 65 92" fill="#6B8040"/>
        {/* Body — olive green */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#7A9045"/>
        {/* Wing */}
        <path d="M 48 72 C 60 66 76 68 82 78 C 76 90 58 92 48 86 Z" fill="#6B8040"/>
        {/* White underparts */}
        <ellipse cx="50" cy="88" rx="14" ry="10" fill="#F0F0F0"/>
        {/* Head */}
        <g transform={headTilt}>
          <circle cx="44" cy="57" r="16" fill="#6B8040"/>
          {/* Gray cap */}
          <path d="M 30 54 C 32 44 42 40 52 42 C 58 44 60 50 56 54 C 48 52 36 52 30 54 Z" fill="#7090A8"/>
          {/* White supercilium */}
          <path d="M 28 55 L 54 52" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round"/>
          {/* Black border above supercilium */}
          <path d="M 30 52 L 54 49" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Black eyeline below supercilium */}
          <path d="M 30 57 L 50 55" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Bill — hook-tipped */}
          <path d="M 28 57 L 17 59 L 28 62 Z" fill="#3A3A3A"/>
          <path d="M 17 59 L 20 57" stroke="#2A2A2A" strokeWidth="1" strokeLinecap="round"/>
          {/* Red eye */}
          <circle cx="42" cy="54" r="4" fill="#1A1A1A"/>
          <circle cx="42" cy="54" r="2.5" fill="#8B1A1A"/>
          <circle cx="41" cy="53" r="1" fill="white" opacity="0.7"/>
        </g>
        {/* Legs */}
        <path d="M 50 97 L 46 111" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Blue-headed Vireo ────────────────────────────────────────────────────────
export function BlueHeadedVireoAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 620)
    return () => clearInterval(id)
  }, [animated])
  const stepX = animated ? [0, 1, 3, 4, 3, 1, 0, -1][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Blue-headed Vireo">
      <g transform={`translate(${stepX}, 0)`}>
        {/* Tail — olive */}
        <path d="M 70 88 C 82 90 93 100 96 112 C 87 106 77 98 71 90" fill="#6B8040"/>
        <path d="M 67 90 C 74 102 74 114 70 120 C 66 112 63 102 65 92" fill="#6B8040"/>
        {/* Body — olive back */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#7A9045"/>
        {/* Wing — olive with white bars */}
        <path d="M 48 72 C 60 66 76 68 82 78 C 76 90 58 92 48 86 Z" fill="#6B8040"/>
        <path d="M 53 73 L 78 77" stroke="#F0F0F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
        <path d="M 52 79 L 77 83" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
        {/* White underparts with yellow sides */}
        <ellipse cx="50" cy="88" rx="14" ry="10" fill="#F0F0F0"/>
        <path d="M 38 84 C 36 80 38 74 42 74 C 46 74 48 80 46 86 Z" fill="#E8E870" opacity="0.7"/>
        {/* Head — blue-gray */}
        <circle cx="44" cy="57" r="16" fill="#6080A0"/>
        {/* Bold white spectacles */}
        <ellipse cx="42" cy="54" rx="10" ry="7" fill="none" stroke="#F0F0F0" strokeWidth="3"/>
        {/* Bill — hook-tipped, heavier */}
        <path d="M 28 57 L 17 59 L 28 62 Z" fill="#3A3A3A"/>
        <path d="M 17 59 L 20 57" stroke="#2A2A2A" strokeWidth="1.2"/>
        {/* Eye in spectacles */}
        <circle cx="42" cy="54" r="3.5" fill="#1A1A1A"/>
        <circle cx="41" cy="53" r="1.3" fill="white" opacity="0.85"/>
        {/* Legs */}
        <path d="M 50 97 L 46 111" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Yellow-throated Vireo ─────────────────────────────────────────────────────
export function YellowThroatedVireoAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 640)
    return () => clearInterval(id)
  }, [animated])
  const stepX = animated ? [0, 1, 3, 4, 3, 1, 0, -1][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Yellow-throated Vireo">
      <g transform={`translate(${stepX}, 0)`}>
        {/* Tail — olive */}
        <path d="M 70 88 C 82 90 93 100 96 112 C 87 106 77 98 71 90" fill="#6B8040"/>
        <path d="M 67 90 C 74 102 74 114 70 120 C 66 112 63 102 65 92" fill="#6B8040"/>
        {/* Body — olive back */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#7A9045"/>
        {/* Wing — olive with white bars */}
        <path d="M 48 72 C 60 66 76 68 82 78 C 76 90 58 92 48 86 Z" fill="#6B8040"/>
        <path d="M 53 73 L 78 77" stroke="#F0F0F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
        <path d="M 52 79 L 77 83" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
        {/* White belly */}
        <ellipse cx="50" cy="92" rx="13" ry="8" fill="#F0F0F0"/>
        {/* Yellow breast and throat */}
        <ellipse cx="46" cy="84" rx="14" ry="10" fill="#F5D020"/>
        {/* Head — olive-green */}
        <circle cx="44" cy="57" r="16" fill="#7A9045"/>
        {/* Bold yellow spectacles — vivid */}
        <ellipse cx="42" cy="54" rx="10" ry="7" fill="none" stroke="#F5D020" strokeWidth="3.5"/>
        {/* Yellow forehead/lore wash */}
        <path d="M 30 52 C 34 46 44 44 50 48 C 46 46 36 48 30 52 Z" fill="#F5D020" opacity="0.6"/>
        {/* Bill — heavy hook */}
        <path d="M 28 57 L 17 59 L 28 62 Z" fill="#3A3A3A"/>
        <path d="M 17 59 L 20 57" stroke="#2A2A2A" strokeWidth="1.2"/>
        {/* Eye */}
        <circle cx="42" cy="54" r="3.5" fill="#1A1A1A"/>
        <circle cx="41" cy="53" r="1.3" fill="white" opacity="0.85"/>
        {/* Legs */}
        <path d="M 50 97 L 46 111" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Scarlet Tanager ───────────────────────────────────────────────────────────
export function ScarletTanagerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 550)
    return () => clearInterval(id)
  }, [animated])
  const headTurn = animated && frame === 3 ? 'rotate(-6, 44, 57)' : 'rotate(0)'
  const bodyY = animated ? [0, -1, -2, -1, 0, 1][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Scarlet Tanager">
      <g transform={`translate(0, ${bodyY})`}>
        {/* Tail — jet black */}
        <path d="M 70 88 C 82 90 94 98 98 110 C 88 106 78 98 72 90" fill="#1A1A1A"/>
        <path d="M 68 90 C 75 102 75 114 71 120 C 67 112 64 102 66 92" fill="#1A1A1A"/>
        {/* Body — brilliant scarlet */}
        <ellipse cx="58" cy="82" rx="22" ry="17" fill="#DC2020"/>
        {/* Wings — jet black over scarlet body */}
        <path d="M 48 70 C 60 64 78 66 84 76 C 78 90 60 92 48 86 Z" fill="#1A1A1A"/>
        {/* Scarlet rump visible between wing and tail */}
        <ellipse cx="68" cy="87" rx="6" ry="5" fill="#DC2020"/>
        {/* Head — scarlet */}
        <g transform={headTurn}>
          <circle cx="44" cy="57" r="17" fill="#DC2020"/>
          {/* Bill — pale, fairly heavy */}
          <path d="M 28 57 L 17 59 L 28 62 Z" fill="#8A8A6A"/>
          <line x1="17" y1="59" x2="28" y2="59" stroke="#6A6A5A" strokeWidth="0.8"/>
          {/* Eye — dark on red */}
          <circle cx="42" cy="54" r="4.5" fill="#1A1A1A"/>
          <circle cx="41" cy="53" r="1.6" fill="white" opacity="0.7"/>
        </g>
        {/* Legs */}
        <path d="M 50 98 L 46 112" stroke="#6A5A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 98 L 66 112" stroke="#6A5A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 112 L 40 115 M 46 112 L 46 117 M 46 112 L 51 115" stroke="#6A5A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 112 L 60 115 M 66 112 L 66 117 M 66 112 L 71 115" stroke="#6A5A40" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Baltimore Oriole ──────────────────────────────────────────────────────────
export function BaltimoreOrioleAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 400)
    return () => clearInterval(id)
  }, [animated])
  // Pendulum swing — the oriole hangs from branches
  const swingAngle = animated ? [0, 4, 7, 8, 6, 2, -1, 0][frame] : 0
  const bobY = animated ? [0, -2, -4, -5, -3, -1, 0, 0][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Baltimore Oriole">
      <g transform={`translate(0, ${bobY}) rotate(${swingAngle}, 60, 60)`}>
        {/* Tail — black center, orange outer feathers */}
        <path d="M 70 88 C 82 90 94 98 98 110 C 88 106 78 98 72 90" fill="#1A1A1A"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 66 102 67 92" fill="#FF8000"/>
        <path d="M 72 90 C 80 100 82 112 79 120 C 76 112 73 102 70 92" fill="#1A1A1A"/>
        {/* Body — brilliant orange */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#FF8000"/>
        {/* Black back/scapulars */}
        <path d="M 50 70 C 62 64 76 66 80 74 C 74 80 58 80 50 74 Z" fill="#1A1A1A"/>
        {/* Wings — black with white wing bar */}
        <path d="M 48 70 C 60 64 78 66 84 76 C 78 90 60 92 48 86 Z" fill="#1A1A1A"/>
        <path d="M 54 72 L 80 78" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
        {/* Orange rump */}
        <ellipse cx="68" cy="85" rx="7" ry="6" fill="#FF8000"/>
        {/* Head — black hood */}
        <circle cx="44" cy="57" r="17" fill="#1A1A1A"/>
        {/* Bill — silver-gray pointed */}
        <path d="M 28 57 L 16 59 L 28 62 Z" fill="#C0C0B0"/>
        <line x1="16" y1="59" x2="28" y2="59" stroke="#A0A090" strokeWidth="0.8"/>
        {/* Eye — bright against black */}
        <circle cx="42" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="41" cy="53" r="1.6" fill="white" opacity="0.85"/>
        {/* Legs */}
        <path d="M 50 97 L 46 111" stroke="#6A5030" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#6A5030" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#6A5030" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#6A5030" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Rose-breasted Grosbeak ────────────────────────────────────────────────────
export function RoseBreastedGrosbeakAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 500)
    return () => clearInterval(id)
  }, [animated])
  const headTurn = animated && frame === 2 ? 'rotate(-7, 44, 57)' : 'rotate(0)'
  const bodyY = animated ? [0, -1, -2, -1, 0, 1][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Rose-breasted Grosbeak">
      <g transform={`translate(0, ${bodyY})`}>
        {/* Tail — black */}
        <path d="M 70 88 C 82 90 94 98 98 110 C 88 106 78 98 72 90" fill="#1A1A1A"/>
        <path d="M 68 90 C 75 102 75 114 71 120 C 67 112 64 102 66 92" fill="#1A1A1A"/>
        {/* Body — black back */}
        <ellipse cx="58" cy="82" rx="22" ry="17" fill="#F0F0F0"/>
        {/* Black back */}
        <path d="M 50 68 C 62 62 78 64 82 74 C 76 82 58 82 50 76 Z" fill="#1A1A1A"/>
        {/* Wings — black with large white patches */}
        <path d="M 48 70 C 60 64 78 66 84 76 C 78 90 60 92 48 86 Z" fill="#1A1A1A"/>
        <path d="M 55 68 C 64 64 76 66 80 72 C 72 72 60 70 55 68 Z" fill="#F0F0F0" opacity="0.85"/>
        <path d="M 53 73 L 79 78" stroke="#F0F0F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        {/* Rose-red breast triangle — the key feature */}
        <path d="M 36 76 C 38 68 46 64 54 68 C 60 72 60 82 54 88 C 46 92 34 86 36 76 Z" fill="#DC3060"/>
        {/* White belly */}
        <ellipse cx="50" cy="94" rx="13" ry="8" fill="#F5F5F5"/>
        {/* Head — black */}
        <g transform={headTurn}>
          <circle cx="44" cy="57" r="18" fill="#1A1A1A"/>
          {/* MASSIVE pale ivory bill — the defining feature */}
          <path d="M 26 54 L 12 58 L 26 64 Z" fill="#D8D8C0"/>
          <line x1="12" y1="58" x2="26" y2="58" stroke="#B8B8A0" strokeWidth="1.2"/>
          {/* Eye */}
          <circle cx="42" cy="53" r="4.5" fill="#1A1A1A"/>
          <circle cx="41" cy="52" r="1.8" fill="white" opacity="0.8"/>
        </g>
        {/* Legs */}
        <path d="M 50 100 L 46 114" stroke="#6A5030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 63 100 L 67 114" stroke="#6A5030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 46 114 L 40 117 M 46 114 L 46 119 M 46 114 L 51 117" stroke="#6A5030" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 67 114 L 61 117 M 67 114 L 67 119 M 67 114 L 72 117" stroke="#6A5030" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Indigo Bunting ────────────────────────────────────────────────────────────
export function IndigoBuntingAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 450)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -2, -4, -2, 0, 2][frame] : 0
  // Slight color shift to simulate iridescence — deeper blue on certain frames
  const blueShift = animated && (frame === 1 || frame === 5) ? '#2050C0' : '#3060D0'

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Indigo Bunting">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — deep blue */}
        <path d="M 70 88 C 82 90 94 98 98 110 C 88 106 78 98 72 90" fill={blueShift}/>
        <path d="M 68 90 C 75 102 75 114 71 120 C 67 112 64 102 66 92" fill={blueShift}/>
        {/* Wing — slightly darker blue (feather edges) */}
        <path d="M 48 70 C 60 64 78 66 84 76 C 78 90 60 92 48 86 Z" fill="#2050C0"/>
        {/* Feather detail on wing */}
        <path d="M 52 72 L 80 78 M 52 77 L 78 83" stroke="#1840A8" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        {/* Body — ALL blue (no breaks) */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill={blueShift}/>
        {/* Head — brilliant cobalt */}
        <circle cx="44" cy="57" r="16" fill={blueShift}/>
        {/* Slight lighter blue highlight on crown */}
        <ellipse cx="44" cy="50" rx="8" ry="5" fill="#4880F8" opacity="0.4"/>
        {/* Bill — small conical, slightly dark */}
        <path d="M 29 57 L 19 59 L 29 62 Z" fill="#2A3060"/>
        <line x1="19" y1="59" x2="29" y2="59" stroke="#1A2050" strokeWidth="0.8"/>
        {/* Eye */}
        <circle cx="42" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="41" cy="53" r="1.5" fill="white" opacity="0.85"/>
        {/* Legs */}
        <path d="M 50 97 L 46 111" stroke="#5A4A80" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#5A4A80" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#5A4A80" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#5A4A80" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Wood Thrush ───────────────────────────────────────────────────────────────
export function WoodThrushAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 460)
    return () => clearInterval(id)
  }, [animated])
  const hopY = animated ? [0, -4, 0, 2, 0, -2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Wood Thrush">
      <g transform={`translate(0, ${hopY})`}>
        {/* Tail — olive-brown */}
        <path d="M 72 88 C 84 90 96 98 100 110 C 90 106 80 98 73 90" fill="#8A7040"/>
        <path d="M 69 90 C 76 102 76 114 72 120 C 68 112 65 102 67 92" fill="#8A7040"/>
        {/* Body — olive-brown back, robust thrush shape */}
        <ellipse cx="60" cy="82" rx="23" ry="18" fill="#8A7040"/>
        {/* Wing */}
        <path d="M 48 72 C 60 66 78 68 84 78 C 78 90 60 92 48 86 Z" fill="#7A6038"/>
        {/* White breast — prominent */}
        <ellipse cx="50" cy="86" rx="17" ry="14" fill="#F5F5F5"/>
        {/* Bold round black spots — the key feature, larger and rounder than streaks */}
        <circle cx="42" cy="80" r="4.5" fill="#1A1A1A"/>
        <circle cx="50" cy="78" r="4" fill="#1A1A1A"/>
        <circle cx="58" cy="80" r="4" fill="#1A1A1A"/>
        <circle cx="44" cy="88" r="3.5" fill="#1A1A1A"/>
        <circle cx="52" cy="87" r="3.5" fill="#1A1A1A"/>
        <circle cx="38" cy="88" r="3" fill="#1A1A1A"/>
        <circle cx="58" cy="88" r="3" fill="#1A1A1A"/>
        {/* Flank spots extending lower */}
        <circle cx="36" cy="96" r="2.8" fill="#1A1A1A" opacity="0.8"/>
        <circle cx="40" cy="96" r="2.5" fill="#1A1A1A" opacity="0.7"/>
        {/* Head — rich rufous-brown (noticeably more rufous than back) */}
        <circle cx="46" cy="57" r="17" fill="#AA4020"/>
        {/* White eye ring */}
        <circle cx="44" cy="54" r="6" fill="none" stroke="#F5F5F5" strokeWidth="2.5"/>
        {/* Eye */}
        <circle cx="44" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="43" cy="53" r="1.5" fill="white" opacity="0.85"/>
        {/* Bill — thrush, pinkish at base */}
        <path d="M 29 57 L 18 60 L 29 63 Z" fill="#C07040"/>
        <line x1="18" y1="60" x2="29" y2="60" stroke="#A06030" strokeWidth="0.8"/>
        {/* Legs — strong, pinkish */}
        <path d="M 50 99 L 46 113" stroke="#C08060" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 64 99 L 68 113" stroke="#C08060" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 46 113 L 40 116 M 46 113 L 46 118 M 46 113 L 51 116" stroke="#C08060" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 68 113 L 62 116 M 68 113 L 68 118 M 68 113 L 73 116" stroke="#C08060" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Eastern Towhee ────────────────────────────────────────────────────────────
export function EasternTowheeAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 380)
    return () => clearInterval(id)
  }, [animated])
  // Scratch motion — backward kick, then hop forward
  const scratchX = animated ? [0, -3, -6, -8, -6, -2, 2, 0][frame] : 0
  const scratchY = animated ? [0, 2, 4, 3, 1, 0, -3, 0][frame] : 0
  const legKick = animated && frame >= 1 && frame <= 3

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Eastern Towhee">
      <g transform={`translate(${scratchX}, ${scratchY})`}>
        {/* Tail — long, black with white corners */}
        <path d="M 72 88 C 86 90 102 96 108 108 C 96 106 82 100 74 92" fill="#1A1A1A"/>
        <path d="M 70 90 C 80 102 82 116 78 124 C 74 116 70 104 68 94" fill="#1A1A1A"/>
        {/* White tail corners */}
        <path d="M 104 108 C 100 114 96 118 94 122 C 98 118 102 114 104 108 Z" fill="#F5F5F5" opacity="0.8"/>
        {/* Body — white belly base */}
        <ellipse cx="60" cy="84" rx="23" ry="18" fill="#F5F5F5"/>
        {/* Black back */}
        <ellipse cx="62" cy="78" rx="20" ry="13" fill="#1A1A1A"/>
        {/* Rich rufous sides — the key tricolor feature */}
        <path d="M 36 82 C 34 76 38 70 44 70 C 50 70 54 78 52 88 C 48 94 34 92 36 82 Z" fill="#C04020"/>
        <path d="M 72 82 C 74 76 72 70 66 70 C 62 72 60 80 62 88 C 66 94 74 90 72 82 Z" fill="#C04020"/>
        {/* Wings — black with white spots */}
        <path d="M 48 70 C 62 64 80 66 86 76 C 80 90 62 92 48 86 Z" fill="#1A1A1A"/>
        {/* White wing spots */}
        <circle cx="60" cy="72" r="3" fill="#F5F5F5" opacity="0.85"/>
        <circle cx="68" cy="72" r="2.5" fill="#F5F5F5" opacity="0.85"/>
        <circle cx="76" cy="74" r="2" fill="#F5F5F5" opacity="0.75"/>
        {/* Head — black */}
        <circle cx="44" cy="57" r="18" fill="#1A1A1A"/>
        {/* Bill — conical, dark */}
        <path d="M 27 57 L 17 60 L 27 63 Z" fill="#2A2A2A"/>
        <line x1="17" y1="60" x2="27" y2="60" stroke="#1A1A1A" strokeWidth="0.8"/>
        {/* Red eye — bright and vivid */}
        <circle cx="42" cy="54" r="5" fill="#1A1A1A"/>
        <circle cx="42" cy="54" r="3.5" fill="#CC1010"/>
        <circle cx="41" cy="53" r="1.3" fill="white" opacity="0.7"/>
        {/* Legs — scratching posture */}
        {legKick ? (
          <>
            <path d="M 50 100 L 38 118" stroke="#8B5A30" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M 65 100 L 53 118" stroke="#8B5A30" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M 38 118 L 30 122 M 38 118 L 36 124 M 38 118 L 44 122" stroke="#8B5A30" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M 53 118 L 45 122 M 53 118 L 51 124 M 53 118 L 59 122" stroke="#8B5A30" strokeWidth="1.8" strokeLinecap="round"/>
          </>
        ) : (
          <>
            <path d="M 50 100 L 46 114" stroke="#8B5A30" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M 65 100 L 69 114" stroke="#8B5A30" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M 46 114 L 40 117 M 46 114 L 46 119 M 46 114 L 51 117" stroke="#8B5A30" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M 69 114 L 63 117 M 69 114 L 69 119 M 69 114 L 74 117" stroke="#8B5A30" strokeWidth="1.8" strokeLinecap="round"/>
          </>
        )}
      </g>
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
    // ── Warblers ──────────────────────────────────────────
    case 'prothonotary_warbler':   return <ProthonotaryWarblerAvatar {...props} />
    case 'american_redstart':      return <AmericanRedstartAvatar {...props} />
    case 'common_yellowthroat':    return <CommonYellowthroatAvatar {...props} />
    case 'black_and_white_warbler':return <BlackAndWhiteWarblerAvatar {...props} />
    case 'yellow_rumped_warbler':  return <YellowRumpedWarblerAvatar {...props} />
    // ── Vireos ────────────────────────────────────────────
    case 'red_eyed_vireo':         return <RedEyedVireoAvatar {...props} />
    case 'blue_headed_vireo':      return <BlueHeadedVireoAvatar {...props} />
    case 'yellow_throated_vireo':  return <YellowThroatedVireoAvatar {...props} />
    // ── Neotropical migrants ──────────────────────────────
    case 'scarlet_tanager':        return <ScarletTanagerAvatar {...props} />
    case 'baltimore_oriole':       return <BaltimoreOrioleAvatar {...props} />
    case 'rose_breasted_grosbeak': return <RoseBreastedGrosbeakAvatar {...props} />
    case 'indigo_bunting':         return <IndigoBuntingAvatar {...props} />
    case 'wood_thrush':            return <WoodThrushAvatar {...props} />
    // ── Residents ─────────────────────────────────────────
    case 'eastern_towhee':         return <EasternTowheeAvatar {...props} />
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
