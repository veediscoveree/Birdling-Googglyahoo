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

// ── Mourning Dove ─────────────────────────────────────────────────────────────
export function MourningDoveAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 500); return () => clearInterval(id) }, [animated])
  const bobY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Mourning Dove">
      <g transform={`translate(0,${bobY})`}>
        {/* Long pointed tail */}
        <path d="M 66 88 C 82 88 100 94 108 106 C 94 102 80 96 68 90" fill="#B8A888"/>
        <path d="M 70 89 C 82 96 88 110 82 120 C 78 112 72 100 68 92" fill="#C8B898"/>
        <path d="M 68 88 C 76 96 78 110 74 120 C 70 110 66 98 66 90" fill="#B8A888"/>
        {/* Body — gray-brown, plump */}
        <ellipse cx="58" cy="82" rx="22" ry="17" fill="#C8B898"/>
        {/* Wing — darker with black spots */}
        <path d="M 46 72 C 58 66 76 68 82 78 C 76 90 58 90 46 84 Z" fill="#B0A080"/>
        <circle cx="58" cy="74" r="3" fill="#1A1A1A" opacity="0.7"/>
        <circle cx="66" cy="72" r="2.5" fill="#1A1A1A" opacity="0.6"/>
        <circle cx="72" cy="76" r="2.5" fill="#1A1A1A" opacity="0.6"/>
        {/* Rosy breast */}
        <ellipse cx="48" cy="86" rx="14" ry="10" fill="#D8B8A0"/>
        {/* Head — small, round */}
        <circle cx="42" cy="57" r="14" fill="#C8B898"/>
        {/* Blue eye ring */}
        <circle cx="40" cy="54" r="5.5" fill="none" stroke="#7098B0" strokeWidth="2.5"/>
        {/* Eye */}
        <circle cx="40" cy="54" r="3.5" fill="#1A1A1A"/>
        <circle cx="39" cy="53" r="1.2" fill="white" opacity="0.8"/>
        {/* Black spot below eye */}
        <circle cx="36" cy="58" r="2.5" fill="#2A2A2A"/>
        {/* Bill — small, thin */}
        <path d="M 28 56 L 19 57 L 28 60 Z" fill="#7A7070"/>
        {/* Pink legs */}
        <path d="M 48 98 L 44 112" stroke="#D08070" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 60 98 L 64 112" stroke="#D08070" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 112 L 38 115 M 44 112 L 44 117 M 44 112 L 49 115" stroke="#D08070" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 64 112 L 58 115 M 64 112 L 64 117 M 64 112 L 69 115" stroke="#D08070" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── American Crow ──────────────────────────────────────────────────────────────
export function AmericanCrowAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 480); return () => clearInterval(id) }, [animated])
  const hopY = animated ? [0,-4,0,2,0,-2][frame] : 0
  const headTilt = animated && frame===2 ? 'rotate(-8,44,57)' : 'rotate(0)'
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="American Crow">
      <g transform={`translate(0,${hopY})`}>
        <path d="M 68 88 C 84 90 98 98 102 110 C 90 106 78 98 70 90" fill="#1A1A1A"/>
        <path d="M 66 90 C 74 102 74 114 70 120 C 66 112 62 102 64 92" fill="#222"/>
        <ellipse cx="58" cy="82" rx="23" ry="18" fill="#1A1A1A"/>
        {/* Blue-purple gloss on wing */}
        <path d="M 48 70 C 60 64 78 66 84 76 C 78 90 58 92 48 86 Z" fill="#1A1A2A"/>
        <path d="M 52 72 L 80 78" stroke="#2A2A4A" strokeWidth="2" opacity="0.5"/>
        <g transform={headTilt}>
          <circle cx="44" cy="57" r="18" fill="#1A1A1A"/>
          {/* Heavy black bill */}
          <path d="M 26 55 L 13 58 L 26 63 Z" fill="#1A1A1A"/>
          <path d="M 13 58 L 26 58" stroke="#333" strokeWidth="1"/>
          <circle cx="40" cy="53" r="4.5" fill="#1A1A1A"/>
          <circle cx="39" cy="52" r="1.8" fill="white" opacity="0.7"/>
        </g>
        <path d="M 50 99 L 46 113" stroke="#3A3A3A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 64 99 L 68 113" stroke="#3A3A3A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 46 113 L 40 116 M 46 113 L 46 118 M 46 113 L 51 116" stroke="#3A3A3A" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 68 113 L 62 116 M 68 113 L 68 118 M 68 113 L 73 116" stroke="#3A3A3A" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Song Sparrow ──────────────────────────────────────────────────────────────
export function SongSparrowAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 360); return () => clearInterval(id) }, [animated])
  const hopY = animated ? [0,-3,0,2,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Song Sparrow">
      <g transform={`translate(0,${hopY})`}>
        <path d="M 68 88 C 80 90 92 98 96 110 C 86 106 76 98 70 90" fill="#8A6840"/>
        <path d="M 66 90 C 72 102 72 114 68 120 C 64 112 62 102 64 92" fill="#9A7848"/>
        <ellipse cx="58" cy="82" rx="21" ry="17" fill="#C8A870"/>
        <path d="M 48 70 C 60 64 76 66 82 76 C 76 88 58 90 48 84 Z" fill="#8A6840"/>
        {/* Streaks on back */}
        <path d="M 52 70 L 58 84 M 58 68 L 62 82 M 65 70 L 68 82" stroke="#5A4020" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* White/buff breast with streaks and central spot */}
        <ellipse cx="48" cy="86" rx="15" ry="11" fill="#F0E0C0"/>
        <circle cx="48" cy="82" r="5" fill="#5A4020" opacity="0.8"/>
        <path d="M 40 87 L 44 96 M 46 86 L 48 95 M 52 86 L 52 95 M 56 87 L 54 96" stroke="#5A4020" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="44" cy="57" r="15" fill="#C8A870"/>
        {/* Rufous crown stripe */}
        <path d="M 36 50 C 38 44 44 42 50 44 C 46 43 40 44 36 50" fill="#8B4A20"/>
        <line x1="36" y1="50" x2="50" y2="44" stroke="#8B4A20" strokeWidth="2.5"/>
        {/* Gray supercilium */}
        <path d="M 30 53 L 48 51" stroke="#C0B090" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Dark eyeline */}
        <path d="M 30 55 L 46 54" stroke="#5A4020" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="40" cy="54" r="3.5" fill="#1A1A1A"/>
        <circle cx="39" cy="53" r="1.2" fill="white" opacity="0.8"/>
        <path d="M 28 56 L 19 58 L 28 61 Z" fill="#8A7060"/>
        <path d="M 48 97 L 44 111" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 60 97 L 64 111" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 111 L 38 114 M 44 111 L 44 116 M 44 111 L 49 114" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 64 111 L 58 114 M 64 111 L 64 116 M 64 111 L 69 114" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Downy Woodpecker ──────────────────────────────────────────────────────────
export function DownyWoodpeckerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 300); return () => clearInterval(id) }, [animated])
  // Pecking motion
  const peckX = animated ? [0,2,4,5,4,2,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Downy Woodpecker">
      <g transform={`translate(${peckX},0)`}>
        {/* Short tail — stiff, used for support */}
        <path d="M 68 88 C 76 88 84 92 88 100 C 80 98 72 94 68 90" fill="#1A1A1A"/>
        <path d="M 66 88 C 72 96 72 106 68 112 C 66 106 64 96 64 90" fill="#F0F0F0"/>
        {/* Body — white below, black above */}
        <ellipse cx="56" cy="82" rx="20" ry="16" fill="#F0F0F0"/>
        {/* Black back with white stripe down center */}
        <path d="M 46 68 C 56 62 72 64 78 74 C 72 82 54 82 46 76 Z" fill="#1A1A1A"/>
        <line x1="56" y1="64" x2="60" y2="80" stroke="#F0F0F0" strokeWidth="3"/>
        {/* Wing bars */}
        <path d="M 48 70 C 60 64 76 66 82 76 C 76 88 56 90 48 84 Z" fill="#1A1A1A"/>
        {/* White wing spots */}
        {[70,74,78].map((y,i)=><circle key={i} cx={56+i*3} cy={y} r={3} fill="#F0F0F0" opacity="0.8"/>)}
        {/* Head — white cheek, black crown */}
        <circle cx="42" cy="57" r="16" fill="#F0F0F0"/>
        {/* Black crown */}
        <path d="M 28 52 C 30 44 38 40 50 42 C 56 44 58 50 54 54 C 46 50 34 50 28 52 Z" fill="#1A1A1A"/>
        {/* Red nape patch (male) */}
        <ellipse cx="52" cy="52" rx="5" ry="4" fill="#CC1010"/>
        {/* Black eyeline */}
        <path d="M 28 56 L 48 54" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Black malar stripe */}
        <path d="M 28 60 C 30 64 36 66 42 64" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="40" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="39" cy="53" r="1.5" fill="white" opacity="0.8"/>
        {/* Short chisel bill */}
        <path d="M 26 56 L 15 58 L 22 60 Z" fill="#2A2A2A"/>
        {/* Feet gripping bark */}
        <path d="M 48 97 L 44 111" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 60 97 L 64 111" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 111 L 38 114 M 44 111 L 44 116 M 44 111 L 49 114 M 44 111 L 42 118" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 64 111 L 58 114 M 64 111 L 64 116 M 64 111 L 69 114" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── White-breasted Nuthatch ───────────────────────────────────────────────────
export function WhiteBreastedNuthatchAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 480); return () => clearInterval(id) }, [animated])
  const creepY = animated ? [0,2,4,5,3,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="White-breasted Nuthatch">
      {/* Shown heading downward on bark */}
      <g transform={`translate(0,${creepY}) rotate(20,60,75)`}>
        {/* Short tail */}
        <path d="M 70 86 C 80 84 90 88 94 96 C 84 94 74 90 70 88" fill="#1A1A1A"/>
        <path d="M 68 88 C 74 96 72 108 68 114 C 66 106 64 96 66 90" fill="#6080A0"/>
        {/* Body — blue-gray back */}
        <ellipse cx="58" cy="80" rx="20" ry="16" fill="#7090A8"/>
        {/* Wing — blue-gray, darker */}
        <path d="M 46 68 C 58 62 74 64 80 74 C 74 86 56 88 46 82 Z" fill="#5A7890"/>
        {/* White underparts */}
        <ellipse cx="46" cy="84" rx="14" ry="11" fill="#F5F5F5"/>
        {/* Rufous flank patch */}
        <path d="M 36 88 C 34 84 36 78 40 78 C 44 78 46 84 44 90 Z" fill="#C07840" opacity="0.7"/>
        {/* Head — white face, black crown */}
        <circle cx="42" cy="57" r="16" fill="#F5F5F5"/>
        {/* Black cap */}
        <path d="M 28 54 C 30 44 40 40 52 42 C 58 44 60 50 56 54 C 48 50 34 50 28 54 Z" fill="#1A1A1A"/>
        {/* Long upturned bill */}
        <path d="M 26 56 L 12 53 L 26 58 Z" fill="#4A4A4A"/>
        <circle cx="40" cy="53" r="3.5" fill="#1A1A1A"/>
        <circle cx="39" cy="52" r="1.3" fill="white" opacity="0.8"/>
        {/* Feet — zygodactyl, gripping */}
        <path d="M 50 95 L 42 109" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 95 L 70 109" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 42 109 L 34 112 M 42 109 L 40 115 M 42 109 L 46 113" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 70 109 L 64 112 M 70 109 L 70 115 M 70 109 L 75 112" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Dark-eyed Junco ──────────────────────────────────────────────────────────
export function DarkEyedJuncoAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 350); return () => clearInterval(id) }, [animated])
  const hopY = animated ? [0,-3,0,2,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Dark-eyed Junco">
      <g transform={`translate(0,${hopY})`}>
        {/* Tail — dark with white outer feathers */}
        <path d="M 68 88 C 80 90 92 98 96 110 C 86 106 76 98 70 90" fill="#1A1A1A"/>
        <path d="M 66 90 C 72 102 72 114 68 120 C 64 112 62 102 64 92" fill="#F0F0F0"/>
        <path d="M 74 90 C 80 100 82 112 79 120" stroke="#F0F0F0" strokeWidth="3" fill="none"/>
        {/* Body */}
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#F0F0F0"/>
        {/* Dark hood/back */}
        <path d="M 46 68 C 58 62 74 64 80 74 C 74 80 54 80 46 76 Z" fill="#3A3A4A"/>
        <path d="M 46 70 C 58 64 74 66 80 76 C 76 88 56 90 46 84 Z" fill="#3A3A4A" opacity="0.7"/>
        {/* Head — slate dark hood */}
        <circle cx="44" cy="57" r="16" fill="#3A3A4A"/>
        {/* Pink bill */}
        <path d="M 28 57 L 18 59 L 28 62 Z" fill="#E8C0B0"/>
        <line x1="18" y1="59" x2="28" y2="59" stroke="#C8A090" strokeWidth="0.8"/>
        <circle cx="42" cy="53" r="3.5" fill="#1A1A1A"/>
        <circle cx="41" cy="52" r="1.3" fill="white" opacity="0.7"/>
        <path d="M 50 97 L 46 111" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 97 L 66 111" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 111 L 40 114 M 46 111 L 46 116 M 46 111 L 51 114" stroke="#8A8A8A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 111 L 60 114 M 66 111 L 66 116 M 66 111 L 71 114" stroke="#8A8A8A" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── House Finch ───────────────────────────────────────────────────────────────
export function HouseFinchAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 420); return () => clearInterval(id) }, [animated])
  const bobY = animated ? [0,-2,-4,-2,0,2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="House Finch">
      <g transform={`translate(0,${bobY})`}>
        <path d="M 68 88 C 80 90 92 98 96 110 C 86 106 76 98 70 90" fill="#8A6040"/>
        <path d="M 66 90 C 72 102 72 114 68 120 C 64 112 62 102 64 92" fill="#8A6040"/>
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#A07848"/>
        <path d="M 48 70 C 60 64 76 66 82 76 C 76 88 58 90 48 84 Z" fill="#8A6840"/>
        <path d="M 52 72 L 78 78 M 52 78 L 76 83" stroke="#C0A060" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* Streaked belly */}
        <ellipse cx="48" cy="88" rx="13" ry="10" fill="#E8D8B8"/>
        <path d="M 40 84 L 44 96 M 46 83 L 48 95 M 52 83 L 52 95 M 56 84 L 54 95" stroke="#7A5030" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
        {/* Head — red crown and face */}
        <circle cx="44" cy="57" r="16" fill="#A07848"/>
        <path d="M 30 54 C 32 46 40 42 50 44 C 56 46 56 52 50 56 C 44 52 34 52 30 54 Z" fill="#CC2020"/>
        <ellipse cx="40" cy="60" rx="10" ry="7" fill="#CC2020" opacity="0.8"/>
        {/* Conical bill */}
        <path d="M 28 56 L 17 59 L 28 63 Z" fill="#8A7060"/>
        <line x1="17" y1="59" x2="28" y2="59" stroke="#6A5040" strokeWidth="0.8"/>
        <circle cx="41" cy="53" r="3.5" fill="#1A1A1A"/>
        <circle cx="40" cy="52" r="1.3" fill="white" opacity="0.8"/>
        <path d="M 48 97 L 44 111" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 61 97 L 65 111" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 111 L 38 114 M 44 111 L 44 116 M 44 111 L 49 114" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 65 111 L 59 114 M 65 111 L 65 116 M 65 111 L 70 114" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── House Sparrow ─────────────────────────────────────────────────────────────
export function HouseSparrowAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 380); return () => clearInterval(id) }, [animated])
  const hopY = animated ? [0,-3,0,2,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="House Sparrow">
      <g transform={`translate(0,${hopY})`}>
        <path d="M 68 88 C 80 90 90 96 94 108 C 84 104 74 96 70 90" fill="#9A7840"/>
        <path d="M 66 90 C 72 100 72 112 68 118 C 64 110 62 100 64 92" fill="#9A7840"/>
        <ellipse cx="58" cy="82" rx="20" ry="16" fill="#B89060"/>
        <path d="M 48 70 C 60 64 76 66 82 76 C 76 88 58 90 48 84 Z" fill="#8A6030"/>
        <path d="M 52 72 L 78 78 M 52 78 L 76 83" stroke="#C8A060" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        {/* Buff breast */}
        <ellipse cx="47" cy="88" rx="13" ry="10" fill="#E0C898"/>
        {/* Head — gray crown, chestnut back of head */}
        <circle cx="44" cy="57" r="15" fill="#B89060"/>
        {/* Gray crown */}
        <path d="M 30 52 C 32 44 40 42 50 44 C 56 46 56 52 50 56 C 44 50 34 50 30 52 Z" fill="#909090"/>
        {/* Chestnut nape */}
        <path d="M 50 44 C 56 44 60 50 58 56 C 54 52 50 46 50 44 Z" fill="#8A4820"/>
        {/* Black bib */}
        <path d="M 34 60 C 36 54 42 52 50 54 C 54 56 54 62 50 66 C 44 68 34 66 34 60 Z" fill="#1A1A1A"/>
        {/* White cheek */}
        <ellipse cx="36" cy="60" rx="7" ry="5" fill="#E8E0D0"/>
        <path d="M 28 56 L 17 58 L 28 62 Z" fill="#8A7060"/>
        <circle cx="40" cy="53" r="3.5" fill="#1A1A1A"/>
        <circle cx="39" cy="52" r="1.3" fill="white" opacity="0.8"/>
        <path d="M 48 97 L 44 111" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 60 97 L 64 111" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 111 L 38 114 M 44 111 L 44 116 M 44 111 L 49 114" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 64 111 L 58 114 M 64 111 L 64 116 M 64 111 L 69 114" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── European Starling ─────────────────────────────────────────────────────────
export function EuropeanStarlingAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 400); return () => clearInterval(id) }, [animated])
  const walkX = animated ? [0,2,4,5,4,2,0,-1][frame] : 0
  const walkY = animated ? [0,1,0,-1,0,1,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="European Starling">
      <g transform={`translate(${walkX},${walkY})`}>
        {/* Short square tail */}
        <path d="M 66 88 C 76 88 86 94 90 104 C 80 100 70 94 68 90" fill="#1A1A2A"/>
        <path d="M 64 90 C 68 100 68 112 64 118 C 62 110 60 100 62 92" fill="#1A1A2A"/>
        {/* Body — iridescent dark */}
        <ellipse cx="56" cy="82" rx="21" ry="16" fill="#1A1A2A"/>
        {/* Iridescent green-purple gloss */}
        <path d="M 44 70 C 56 64 72 66 78 76 C 72 88 54 90 44 84 Z" fill="#2A3A1A"/>
        <path d="M 48 72 L 74 78" stroke="#4A6A2A" strokeWidth="2" opacity="0.5"/>
        {/* White spots (winter plumage) */}
        {[[54,74],[60,72],[66,74],[50,80],[58,78],[66,80],[52,86],[60,85]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={2.5} fill="#E8E8E0" opacity="0.6"/>
        ))}
        {/* Head — dark iridescent */}
        <circle cx="42" cy="57" r="16" fill="#1A1A2A"/>
        {/* Pointed yellow bill */}
        <path d="M 26 55 L 14 58 L 26 62 Z" fill="#E8D020"/>
        <line x1="14" y1="58" x2="26" y2="58" stroke="#C8B010" strokeWidth="0.8"/>
        <circle cx="40" cy="53" r="4" fill="#1A1A2A"/>
        <circle cx="39" cy="52" r="1.6" fill="white" opacity="0.7"/>
        <path d="M 48 98 L 44 112" stroke="#E8A020" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 61 98 L 65 112" stroke="#E8A020" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 44 112 L 38 115 M 44 112 L 44 117 M 44 112 L 49 115" stroke="#E8A020" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 65 112 L 59 115 M 65 112 L 65 117 M 65 112 L 70 115" stroke="#E8A020" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Red-winged Blackbird ──────────────────────────────────────────────────────
export function RedWingedBlackbirdAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 420); return () => clearInterval(id) }, [animated])
  const bobY = animated ? [0,-2,-4,-3,-1,0,1,0][frame] : 0
  // Wing flare showing epaulet on certain frames
  const epauletVisible = animated && (frame === 2 || frame === 3)
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Red-winged Blackbird">
      <g transform={`translate(0,${bobY})`}>
        <path d="M 68 88 C 80 90 92 98 96 110 C 86 106 76 98 70 90" fill="#1A1A1A"/>
        <path d="M 66 90 C 72 102 72 114 68 120 C 64 112 62 102 64 92" fill="#1A1A1A"/>
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#1A1A1A"/>
        {/* Wing */}
        <path d="M 46 68 C 58 62 76 64 82 74 C 76 88 56 90 46 84 Z" fill="#1A1A1A"/>
        {/* Red epaulet — the key field mark */}
        <path d={`M 50 70 C 54 67 62 67 66 70 C 62 72 54 72 50 70 Z`} fill="#CC2020"/>
        {/* Yellow border below red */}
        <path d={`M 50 72 C 54 70 62 70 66 72 C 62 73 54 73 50 72 Z`} fill="#F8D020" opacity="0.8"/>
        {epauletVisible && (
          <>
            <path d="M 48 66 C 52 62 64 62 70 66 C 64 68 52 68 48 66 Z" fill="#CC2020"/>
            <path d="M 48 68 C 52 66 64 66 70 68" stroke="#F8D020" strokeWidth="2" fill="none"/>
          </>
        )}
        <circle cx="44" cy="57" r="16" fill="#1A1A1A"/>
        <path d="M 28 56 L 17 58 L 28 62 Z" fill="#1A1A1A"/>
        <line x1="17" y1="58" x2="28" y2="58" stroke="#333" strokeWidth="0.8"/>
        <circle cx="40" cy="53" r="4" fill="#1A1A1A"/>
        <circle cx="39" cy="52" r="1.6" fill="white" opacity="0.75"/>
        <path d="M 48 98 L 44 112" stroke="#4A4A4A" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 62 98 L 66 112" stroke="#4A4A4A" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 44 112 L 38 115 M 44 112 L 44 117 M 44 112 L 49 115" stroke="#4A4A4A" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 66 112 L 60 115 M 66 112 L 66 117 M 66 112 L 71 115" stroke="#4A4A4A" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Canada Goose ──────────────────────────────────────────────────────────────
export function CanadaGooseAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 600); return () => clearInterval(id) }, [animated])
  const swayX = animated ? [0,2,3,2,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 130 130" width={size} height={size} style={style} aria-label="Canada Goose">
      <g transform={`translate(${swayX},0)`}>
        {/* Tail */}
        <path d="M 90 84 C 106 84 118 88 122 100 C 110 98 96 90 92 86" fill="#3A3A2A"/>
        {/* Body — large, brown */}
        <ellipse cx="72" cy="86" rx="34" ry="22" fill="#7A6840"/>
        {/* Wing detail */}
        <path d="M 54 76 C 72 68 96 70 104 82 C 94 94 66 96 54 88 Z" fill="#6A5830"/>
        <path d="M 58 76 L 100 84 M 56 82 L 96 90" stroke="#8A7848" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* White rump patch */}
        <ellipse cx="88" cy="88" rx="10" ry="7" fill="#F0F0F0" opacity="0.7"/>
        {/* Neck — long, black */}
        <path d="M 46 78 C 42 62 38 50 40 40" stroke="#1A1A1A" strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M 46 78 C 42 62 38 50 40 40" stroke="#2A2A2A" strokeWidth="12" strokeLinecap="round" fill="none"/>
        {/* White chin strap — the key mark */}
        <path d="M 34 56 C 36 50 40 48 48 50 C 52 52 50 58 46 58 C 40 58 34 58 34 56 Z" fill="#F0F0F0"/>
        {/* Head — black */}
        <circle cx="40" cy="38" r="15" fill="#1A1A1A"/>
        {/* Black bill */}
        <path d="M 25 38 L 14 40 L 25 43 Z" fill="#1A1A1A"/>
        <line x1="14" y1="40" x2="25" y2="40" stroke="#333" strokeWidth="0.8"/>
        <circle cx="36" cy="35" r="4" fill="#1A1A1A"/>
        <circle cx="35" cy="34" r="1.5" fill="white" opacity="0.7"/>
        {/* Legs */}
        <path d="M 62 106 L 58 120" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 80 106 L 84 120" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 58 120 L 48 122 M 58 120 L 56 126 M 58 120 L 64 123" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 84 120 L 74 122 M 84 120 L 82 126 M 84 120 L 90 123 M 84 120 L 92 120" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Osprey ────────────────────────────────────────────────────────────────────
export function OspreyAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 500); return () => clearInterval(id) }, [animated])
  const angle = animated ? [0,2,4,5,4,2,0,-2][frame] : 0
  return (
    <svg viewBox="0 0 140 120" width={size} height={size} style={style} aria-label="Osprey">
      <g transform={`rotate(${angle},70,60)`}>
        {/* Wings — long, bent at wrist (characteristic osprey shape) */}
        <path d="M 10 52 C 30 42 50 44 60 56 C 50 48 30 46 10 52 Z" fill="#6A5030"/>
        <path d="M 10 52 C 30 58 50 62 60 56" stroke="#4A3018" strokeWidth="3" fill="none"/>
        <path d="M 130 52 C 110 42 90 44 80 56 C 90 48 110 46 130 52 Z" fill="#6A5030"/>
        <path d="M 130 52 C 110 58 90 62 80 56" stroke="#4A3018" strokeWidth="3" fill="none"/>
        {/* Carpal patches (dark wrist patches — diagnostic) */}
        <ellipse cx="52" cy="54" rx="9" ry="6" fill="#1A1A1A" opacity="0.7"/>
        <ellipse cx="88" cy="54" rx="9" ry="6" fill="#1A1A1A" opacity="0.7"/>
        {/* Body — white below */}
        <ellipse cx="70" cy="62" rx="16" ry="12" fill="#F0F0F0"/>
        {/* Brown back */}
        <ellipse cx="70" cy="56" rx="14" ry="9" fill="#6A5030"/>
        {/* Tail */}
        <path d="M 60 70 C 64 80 76 80 80 70" stroke="#6A5030" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Head — white with dark crown/eyestripe */}
        <circle cx="70" cy="44" r="13" fill="#F0F0F0"/>
        {/* Dark brown crown */}
        <path d="M 58 42 C 60 34 66 30 74 32 C 80 34 80 40 76 44 C 70 40 62 40 58 42 Z" fill="#6A5030"/>
        {/* Bold dark eye stripe — key mark */}
        <path d="M 58 44 C 60 40 66 38 72 40 C 76 42 76 46 72 48" stroke="#1A1A1A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M 58 44 C 56 46 56 50 58 52" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Hooked bill */}
        <path d="M 57 44 L 46 46 L 52 50 Z" fill="#2A2A2A"/>
        <circle cx="66" cy="42" r="3.5" fill="#F5C030"/>
        <circle cx="66" cy="42" r="2" fill="#1A1A1A"/>
        <circle cx="65" cy="41" r="0.8" fill="white" opacity="0.8"/>
      </g>
    </svg>
  )
}

// ── Eastern Bluebird ──────────────────────────────────────────────────────────
export function EasternBluebirdAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 450); return () => clearInterval(id) }, [animated])
  const bobY = animated ? [0,-2,-4,-2,0,2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Eastern Bluebird">
      <g transform={`translate(0,${bobY})`}>
        <path d="M 68 88 C 80 90 92 98 96 110 C 86 106 76 98 70 90" fill="#2A5FAA"/>
        <path d="M 66 90 C 72 102 72 114 68 120 C 64 112 62 102 64 92" fill="#2A5FAA"/>
        <ellipse cx="58" cy="82" rx="21" ry="16" fill="#D87040"/>
        {/* Blue back */}
        <path d="M 48 70 C 60 64 76 66 82 76 C 76 88 58 90 48 84 Z" fill="#2A5FAA"/>
        {/* White belly */}
        <ellipse cx="50" cy="92" rx="13" ry="8" fill="#F5F5F5"/>
        {/* Rufous breast/sides */}
        <ellipse cx="48" cy="84" rx="14" ry="10" fill="#D87040"/>
        {/* Head — brilliant blue */}
        <circle cx="44" cy="57" r="16" fill="#3A70BB"/>
        {/* Bill — thin */}
        <path d="M 28 57 L 18 59 L 28 62 Z" fill="#2A2A2A"/>
        <circle cx="41" cy="54" r="4" fill="#1A1A1A"/>
        <circle cx="40" cy="53" r="1.5" fill="white" opacity="0.85"/>
        <path d="M 48 98 L 44 112" stroke="#7A5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 61 98 L 65 112" stroke="#7A5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 112 L 38 115 M 44 112 L 44 117 M 44 112 L 49 115" stroke="#7A5A30" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 65 112 L 59 115 M 65 112 L 65 117 M 65 112 L 70 115" stroke="#7A5A30" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Ruby-throated Hummingbird ──────────────────────────────────────────────────
export function RubyThroatedHummingbirdAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%4), 80); return () => clearInterval(id) }, [animated])
  const wingY = animated ? [0,4,-4,0][frame] : 0
  const hoverX = animated ? [0,1,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Ruby-throated Hummingbird">
      <g transform={`translate(${hoverX},0)`}>
        {/* Forked tail */}
        <path d="M 62 88 C 70 92 78 102 76 112 C 70 106 64 96 62 90" fill="#1A3A1A"/>
        <path d="M 66 88 C 72 92 76 100 72 110 C 68 104 64 96 65 90" fill="#2A5A2A"/>
        {/* Body — iridescent green */}
        <ellipse cx="56" cy="80" rx="17" ry="12" fill="#2A7A30"/>
        {/* Wings — rapid, blurred */}
        <ellipse cx="52" cy={70+wingY} rx="22" ry="8" fill="#4A8A40" opacity="0.6"/>
        <ellipse cx="64" cy={70+wingY} rx="18" ry="7" fill="#6AAA60" opacity="0.4"/>
        {/* Ruby throat gorget — the key mark */}
        <ellipse cx="44" cy="72" rx="9" ry="7" fill="#CC1010"/>
        <ellipse cx="44" cy="72" rx="7" ry="5" fill="#EE2020" opacity="0.8"/>
        {/* White breast below throat */}
        <ellipse cx="46" cy="80" rx="10" ry="8" fill="#F0F0F0" opacity="0.7"/>
        {/* Head — metallic green */}
        <circle cx="42" cy="60" r="13" fill="#2A7A30"/>
        {/* Long needle bill */}
        <path d="M 28 59 L 6 60 L 28 62 Z" fill="#1A1A1A"/>
        <circle cx="36" cy="57" r="3" fill="#1A1A1A"/>
        <circle cx="35" cy="56" r="1.2" fill="white" opacity="0.8"/>
        {/* Tiny feet */}
        <path d="M 50 91 L 46 100" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 58 91 L 62 100" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 46 100 L 42 102 M 46 100 L 46 104 M 46 100 L 50 102" stroke="#2A2A2A" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M 62 100 L 58 102 M 62 100 L 62 104 M 62 100 L 66 102" stroke="#2A2A2A" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Cedar Waxwing ─────────────────────────────────────────────────────────────
export function CedarWaxwingAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%6), 500); return () => clearInterval(id) }, [animated])
  const bobY = animated ? [0,-2,-3,-2,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Cedar Waxwing">
      <g transform={`translate(0,${bobY})`}>
        <path d="M 68 88 C 80 88 92 94 96 106 C 86 104 76 96 70 90" fill="#7A6840"/>
        {/* Yellow tail tip band — key mark */}
        <path d="M 68 86 C 80 86 92 90 95 96 C 86 96 74 92 68 88 Z" fill="#F0D020"/>
        <path d="M 66 90 C 72 100 72 112 68 118 C 64 110 62 100 64 92" fill="#7A6840"/>
        <path d="M 66 110 C 68 113 70 115 68 118 C 66 115 64 112 64 110 Z" fill="#F0D020"/>
        {/* Body — silky warm brown */}
        <ellipse cx="58" cy="82" rx="22" ry="16" fill="#C09060"/>
        {/* Wing — sleek gray, red waxy tips */}
        <path d="M 46 70 C 58 64 76 66 82 76 C 76 88 56 90 46 84 Z" fill="#8A8888"/>
        {/* Red wax tips on secondary feathers */}
        {[72,76,80].map((x,i)=><circle key={i} cx={x} cy={70+i*2} r={3} fill="#CC2020"/>)}
        {/* Yellow wash on belly */}
        <ellipse cx="50" cy="90" rx="13" ry="9" fill="#E0C070" opacity="0.6"/>
        {/* Crest */}
        <path d="M 40 46 C 42 36 48 28 52 36 C 48 32 44 36 40 46" fill="#C09060"/>
        <path d="M 42 44 C 44 34 48 28 50 34" stroke="#A07848" strokeWidth="1.2" fill="none"/>
        {/* Head — sleek with bold black mask */}
        <circle cx="44" cy="57" r="16" fill="#C09060"/>
        {/* Bold black mask through eye */}
        <path d="M 28 52 C 30 46 40 44 52 46 C 58 48 58 54 52 58 C 44 56 30 58 28 52 Z" fill="#1A1A1A"/>
        {/* White border above mask */}
        <path d="M 30 50 C 34 44 44 42 52 44" stroke="#F0F0F0" strokeWidth="1.5" fill="none"/>
        {/* Bill — small */}
        <path d="M 28 54 L 18 56 L 28 59 Z" fill="#2A2A2A"/>
        <circle cx="40" cy="52" r="3.5" fill="#1A1A1A"/>
        <circle cx="39" cy="51" r="1.3" fill="white" opacity="0.8"/>
        <path d="M 48 97 L 44 111" stroke="#8A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 61 97 L 65 111" stroke="#8A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 111 L 38 114 M 44 111 L 44 116 M 44 111 L 49 114" stroke="#8A6A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 65 111 L 59 114 M 65 111 L 65 116 M 65 111 L 70 114" stroke="#8A6A40" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Turkey Vulture ────────────────────────────────────────────────────────────
export function TurkeyVultureAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 600); return () => clearInterval(id) }, [animated])
  const dihedral = animated ? [0,1,2,3,2,1,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 160 110" width={size} height={size} style={style} aria-label="Turkey Vulture">
      {/* Wings held in V-dihedral — distinctive soaring shape */}
      <g transform={`rotate(${dihedral},80,55)`}>
        <path d="M 8 58 C 28 48 54 50 66 62" stroke="#3A2A18" strokeWidth="28" strokeLinecap="round" fill="none"/>
        <path d="M 8 58 C 28 50 54 52 66 62" stroke="#4A3A20" strokeWidth="18" strokeLinecap="round" fill="none"/>
        {/* Silver flight feathers on left wing */}
        <path d="M 12 62 C 30 54 52 56 64 64" stroke="#8A8070" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M 152 58 C 132 48 106 50 94 62" stroke="#3A2A18" strokeWidth="28" strokeLinecap="round" fill="none"/>
        <path d="M 152 58 C 132 50 106 52 94 62" stroke="#4A3A20" strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M 148 62 C 130 54 108 56 96 64" stroke="#8A8070" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.6"/>
        {/* Body */}
        <ellipse cx="80" cy="62" rx="16" ry="10" fill="#3A2A18"/>
        {/* Tail */}
        <path d="M 72 68 C 76 76 84 76 88 68" stroke="#3A2A18" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Small bare red head — the key mark */}
        <circle cx="80" cy="48" r="9" fill="#CC2010"/>
        {/* Small hooked bill */}
        <path d="M 72 48 L 63 50 L 68 53 Z" fill="#E8D020"/>
        <circle cx="76" cy="46" r="2.5" fill="#1A1A1A"/>
        <circle cx="75.5" cy="45.5" r="0.9" fill="white" opacity="0.7"/>
      </g>
    </svg>
  )
}

// ── Common Grackle ─────────────────────────────────────────────────────────────
export function CommonGrackleAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 420); return () => clearInterval(id) }, [animated])
  const walkX = animated ? [0,2,4,5,4,2,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Common Grackle">
      <g transform={`translate(${walkX},0)`}>
        {/* Long keel-shaped tail — key feature */}
        <path d="M 66 86 C 82 84 98 88 106 98 C 92 98 78 92 68 88" fill="#1A1A2A"/>
        <path d="M 64 90 C 72 100 74 114 70 122 C 66 114 62 102 62 92" fill="#1A1A2A"/>
        <path d="M 68 88 C 76 96 78 110 76 120 C 72 112 68 100 66 90" fill="#2A2A3A"/>
        {/* Body — iridescent blue-purple */}
        <ellipse cx="58" cy="82" rx="22" ry="17" fill="#1A1A3A"/>
        {/* Wing — iridescent */}
        <path d="M 46 70 C 58 64 76 66 82 76 C 76 90 56 92 46 86 Z" fill="#1A1A2A"/>
        <path d="M 50 72 L 78 78" stroke="#3A3A6A" strokeWidth="2" opacity="0.6"/>
        {/* Iridescent purple-green gloss on back */}
        <path d="M 50 70 C 62 64 76 66 80 74" stroke="#4A3A7A" strokeWidth="3" opacity="0.5"/>
        <circle cx="44" cy="57" r="17" fill="#1A1A3A"/>
        {/* Iridescent head gloss */}
        <ellipse cx="44" cy="52" rx="14" ry="10" fill="#3A2A6A" opacity="0.6"/>
        {/* Long bill */}
        <path d="M 27 56 L 15 58 L 27 62 Z" fill="#1A1A1A"/>
        {/* Yellow eye — distinctive */}
        <circle cx="40" cy="53" r="5" fill="#1A1A1A"/>
        <circle cx="40" cy="53" r="3.5" fill="#F5D020"/>
        <circle cx="40" cy="53" r="1.8" fill="#1A1A1A"/>
        <circle cx="39" cy="52" r="0.7" fill="white" opacity="0.6"/>
        <path d="M 48 99 L 44 113" stroke="#3A3A3A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 62 99 L 66 113" stroke="#3A3A3A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 44 113 L 38 116 M 44 113 L 44 118 M 44 113 L 49 116" stroke="#3A3A3A" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 66 113 L 60 116 M 66 113 L 66 118 M 66 113 L 71 116" stroke="#3A3A3A" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Barn Swallow ──────────────────────────────────────────────────────────────
export function BarnSwallowAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 220); return () => clearInterval(id) }, [animated])
  const sweep = animated ? [0,4,8,10,8,4,0,-3][frame] : 0
  const wingDip = animated ? [0,3,6,4,0,-2,-3,-1][frame] : 0
  return (
    <svg viewBox="0 0 140 100" width={size} height={size} style={style} aria-label="Barn Swallow">
      <g transform={`translate(0,${wingDip * 0.3})`}>
        {/* Deep forked tail — the key mark */}
        <path d="M 60 72 C 56 80 50 92 44 98 C 50 96 58 86 62 76" fill="#1A2A6A"/>
        <path d="M 80 72 C 84 80 90 92 96 98 C 90 96 82 86 78 76" fill="#1A2A6A"/>
        <path d="M 62 72 C 64 78 66 82 68 84 C 72 82 74 78 78 72" fill="#C07040"/>
        {/* Wings swept back */}
        <path d={`M 20 50 C 40 ${44+sweep*0.3} 58 50 70 60`} stroke="#1A2A6A" strokeWidth="22" strokeLinecap="round" fill="none"/>
        <path d={`M 20 50 C 40 ${46+sweep*0.3} 58 52 70 60`} stroke="#2A3A8A" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <path d={`M 120 50 C 100 ${44+sweep*0.3} 82 50 70 60`} stroke="#1A2A6A" strokeWidth="22" strokeLinecap="round" fill="none"/>
        <path d={`M 120 50 C 100 ${46+sweep*0.3} 82 52 70 60`} stroke="#2A3A8A" strokeWidth="14" strokeLinecap="round" fill="none"/>
        {/* Body */}
        <ellipse cx="70" cy="60" rx="14" ry="9" fill="#C07040"/>
        <ellipse cx="64" cy="58" rx="12" ry="7" fill="#1A2A6A"/>
        {/* Head — blue */}
        <circle cx="58" cy="50" r="12" fill="#1A2A6A"/>
        {/* Rufous forehead and throat */}
        <path d="M 48 48 C 50 42 56 40 62 42 C 60 41 54 42 48 48 Z" fill="#C07040"/>
        <ellipse cx="52" cy="53" rx="7" ry="5" fill="#C07040"/>
        {/* Bill — tiny, flat */}
        <path d="M 46 50 L 38 51 L 42 53 Z" fill="#1A1A1A"/>
        <circle cx="54" cy="47" r="2.5" fill="#1A1A1A"/>
        <circle cx="53.5" cy="46.5" r="1" fill="white" opacity="0.7"/>
      </g>
    </svg>
  )
}

// ── American Kestrel ──────────────────────────────────────────────────────────
export function AmericanKestrelAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 280); return () => clearInterval(id) }, [animated])
  // Hover with tail pump
  const tailPump = animated ? [0,3,6,8,6,3,0,-2][frame] : 0
  const hoverX = animated ? [0,1,2,1,0,-1,-2,-1][frame] : 0
  return (
    <svg viewBox="0 0 130 120" width={size} height={size} style={style} aria-label="American Kestrel">
      <g transform={`translate(${hoverX},0)`}>
        {/* Wings spread in hover */}
        <path d="M 10 52 C 32 44 52 48 64 60" stroke="#7A5030" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M 10 52 C 32 46 52 50 64 60" stroke="#D4703A" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <path d="M 120 52 C 98 44 78 48 66 60" stroke="#7A5030" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M 120 52 C 98 46 78 50 66 60" stroke="#D4703A" strokeWidth="10" strokeLinecap="round" fill="none"/>
        {/* Blue-gray wing panel (male) */}
        <path d="M 20 52 C 36 46 52 50 62 58" stroke="#7090B0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d="M 110 52 C 94 46 78 50 68 58" stroke="#7090B0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7"/>
        {/* Body — rufous back */}
        <ellipse cx="65" cy="62" rx="14" ry="9" fill="#D4703A"/>
        {/* Spotted cream underparts */}
        <ellipse cx="65" cy="66" rx="11" ry="7" fill="#F0DEB8"/>
        <path d="M 58 64 L 60 70 M 63 63 L 64 70 M 68 63 L 67 70 M 72 64 L 70 70" stroke="#5A3018" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        {/* Rufous tail with black band — pumping */}
        <path d={`M 58 70 C 60 ${76+tailPump} 70 ${76+tailPump} 72 70`} stroke="#D4703A" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d={`M 58 ${68+tailPump*0.7} C 60 ${74+tailPump} 70 ${74+tailPump} 72 ${68+tailPump*0.7}`} stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
        {/* Head — two black "sideburn" marks — diagnostic */}
        <circle cx="65" cy="46" r="12" fill="#C8B080"/>
        {/* Blue-gray cap (male) */}
        <path d="M 54 44 C 56 36 62 34 70 36 C 74 38 74 44 70 46 C 64 42 56 42 54 44 Z" fill="#7090B0"/>
        {/* Two sideburn marks */}
        <path d="M 56 50 C 54 54 54 58 56 60" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 60 50 C 58 54 58 58 60 60" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Hooked bill */}
        <path d="M 53 47 L 42 49 L 46 52 Z" fill="#2A2A2A"/>
        <circle cx="58" cy="44" r="3.5" fill="#1A1A1A"/>
        <circle cx="57" cy="43" r="1.3" fill="white" opacity="0.8"/>
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
    // ── Original birds ────────────────────────────────────
    case 'mourning_dove':          return <MourningDoveAvatar {...props} />
    case 'american_crow':          return <AmericanCrowAvatar {...props} />
    case 'song_sparrow':           return <SongSparrowAvatar {...props} />
    case 'downy_woodpecker':       return <DownyWoodpeckerAvatar {...props} />
    case 'white_breasted_nuthatch':return <WhiteBreastedNuthatchAvatar {...props} />
    case 'dark_eyed_junco':        return <DarkEyedJuncoAvatar {...props} />
    case 'house_finch':            return <HouseFinchAvatar {...props} />
    case 'house_sparrow':          return <HouseSparrowAvatar {...props} />
    case 'european_starling':      return <EuropeanStarlingAvatar {...props} />
    case 'red_winged_blackbird':   return <RedWingedBlackbirdAvatar {...props} />
    case 'canada_goose':           return <CanadaGooseAvatar {...props} />
    case 'osprey':                 return <OspreyAvatar {...props} />
    case 'eastern_bluebird':       return <EasternBluebirdAvatar {...props} />
    case 'ruby_throated_hummingbird': return <RubyThroatedHummingbirdAvatar {...props} />
    case 'cedar_waxwing':          return <CedarWaxwingAvatar {...props} />
    case 'turkey_vulture':         return <TurkeyVultureAvatar {...props} />
    case 'common_grackle':         return <CommonGrackleAvatar {...props} />
    case 'barn_swallow':           return <BarnSwallowAvatar {...props} />
    case 'american_kestrel':       return <AmericanKestrelAvatar {...props} />
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
