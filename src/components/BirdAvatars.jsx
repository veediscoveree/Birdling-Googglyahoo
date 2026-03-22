// Bird. Here. Now. — SVG Bird Avatars
// Cute-but-accurate cartoon birds, designed to be identifiable
// and to convey the species' key field marks at a glance.
// All avatars are pure SVG — no external images required.

import { useState, useEffect, useRef, Component } from 'react'

// ── ErrorBoundary — catches runtime render errors in individual avatar SVGs ───
class AvatarErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) {
    console.error('[BirdAvatar] render error for birdId=' + this.props.birdId, error, info)
  }
  render() {
    if (this.state.error) {
      const { size = 120, style = {}, birdId } = this.props
      return (
        <svg viewBox="0 0 120 120" width={size} height={size} style={style} aria-label="Bird">
          <circle cx="60" cy="60" r="50" fill="#1a2a1a" opacity="0.7"/>
          <text x="60" y="52" textAnchor="middle" fill="#6dbf67" fontSize="26">🐦</text>
          <text x="60" y="72" textAnchor="middle" fill="#4a7a48" fontSize="9">{birdId?.replace(/_/g,' ')}</text>
        </svg>
      )
    }
    return this.props.children
  }
}

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
          <path d="M 28 58 L 18 61 L 28 65 Z" fill="#C8B878"/>
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
          <path d="M 31 60 L 25 62 L 31 64 Z" fill="#C8B878"/>
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

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Prothonotary Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — blue-gray, two feather groups */}
        <path d="M 74 87 C 86 88 98 96 102 108 C 92 102 80 95 73 89" fill="#6A88A8"/>
        <path d="M 70 90 C 77 101 77 114 73 120 C 69 111 67 100 68 92" fill="#6A88A8"/>
        {/* Blue-gray tail center dark edge */}
        <path d="M 72 88 C 77 96 78 106 75 114" stroke="#556A88" strokeWidth="2" fill="none" opacity="0.5"/>

        {/* Body — large golden-orange ellipse (unstreaked — clean) */}
        <ellipse cx="60" cy="82" rx="23" ry="18" fill="#F0A020"/>
        {/* White lower belly blending in */}
        <ellipse cx="58" cy="94" rx="14" ry="7" fill="#F5EFD0" opacity="0.55"/>

        {/* Blue-gray wings — clean cool slate color, sits over body */}
        <path d="M 48 70 C 62 62 80 64 86 75 C 80 89 62 91 48 85 Z" fill="#6A88A8"/>
        {/* Wing feather sheen — two subtle lines */}
        <path d="M 54 72 C 68 66 80 68 84 74" stroke="#80A0C0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M 52 80 C 66 74 80 76 84 82" stroke="#80A0C0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35"/>

        {/* Blue-gray back/scapulars — joins wings */}
        <ellipse cx="67" cy="75" rx="15" ry="8" fill="#6A88A8" opacity="0.8"/>

        {/* Head — same blazing gold-orange as body, flows into breast */}
        <circle cx="46" cy="57" r="18" fill="#F0A020"/>
        {/* Forehead slightly richer/deeper gold */}
        <path d="M 36 45 C 40 38 52 36 58 42 C 56 49 48 52 40 50 Z" fill="#E89010" opacity="0.6"/>

        {/* Bill — stout, pointed, dark — larger than typical warbler */}
        <path d="M 29 56 L 15 58.5 L 29 62 Z" fill="#1E1E1E"/>
        <line x1="15" y1="58.5" x2="29" y2="58.5" stroke="#333" strokeWidth="0.7"/>

        {/* Eye — dark, set in golden face */}
        <circle cx="44" cy="53" r="4.5" fill="#1A1A1A"/>
        <circle cx="43" cy="52" r="1.6" fill="white" opacity="0.9"/>

        {/* Legs */}
        <path d="M 50 100 L 46 114" stroke="#8B6A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 63 100 L 67 114" stroke="#8B6A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 114 L 39 117 M 46 114 L 46 119 M 46 114 L 52 117" stroke="#8B6A30" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 67 114 L 60 117 M 67 114 L 67 119 M 67 114 L 73 117" stroke="#8B6A30" strokeWidth="1.5" strokeLinecap="round"/>
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
        <path d="M 29 57 L 19 59 L 29 62 Z" fill="#C8B878"/>
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

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Common Yellowthroat">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — warm olive, cocked upward */}
        <path d="M 70 86 C 84 84 96 90 98 104 C 87 98 75 90 70 88" fill="#6B8038"/>
        <path d="M 67 89 C 74 102 73 115 69 121 C 65 112 62 100 65 90" fill="#6B8038"/>

        {/* Body — olive-green back */}
        <ellipse cx="59" cy="82" rx="22" ry="17" fill="#7A8A38"/>
        {/* Wing panel — slightly darker olive */}
        <path d="M 47 70 C 61 64 78 66 84 76 C 78 90 60 92 47 86 Z" fill="#6A7A30"/>

        {/* Bright yellow breast and belly — flows up into throat */}
        <path d="M 37 82 C 36 75 40 68 46 66 C 52 64 57 68 58 76 C 62 90 58 102 50 104 C 40 104 36 96 37 86 Z" fill="#ECD800"/>

        {/* Head — olive-green round */}
        <circle cx="44" cy="57" r="18" fill="#7A8A38"/>

        {/* White border band above the mask — the "headband" */}
        <path d="M 26 50 C 29 42 40 38 52 40 C 60 42 63 46 62 50 C 55 47 40 46 26 51 Z" fill="#D8D8C0"/>

        {/* Black bandit mask — bold, from forehead across eyes to cheek/ear */}
        {/* Runs from just below bill tip, across both eyes, to the ear region */}
        <path d="M 26 53 C 27 45 38 42 52 44 C 62 46 66 54 62 62 C 55 67 38 67 27 62 C 25 59 25 56 26 53 Z" fill="#111111"/>

        {/* Yellow throat emerging from below the mask, connected to breast */}
        <ellipse cx="44" cy="70" rx="10" ry="6" fill="#ECD800"/>

        {/* Bill — thin, pointed — emerges from below/edge of mask */}
        <path d="M 26 56 L 14 58 L 26 61 Z" fill="#C8B878"/>

        {/* Eye in the mask — small white highlight to find it */}
        <circle cx="41" cy="53" r="3.5" fill="#111111"/>
        <circle cx="40" cy="52" r="1.4" fill="white" opacity="0.7"/>

        {/* Legs */}
        <path d="M 50 100 L 46 114" stroke="#7A5A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#7A5A30" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 46 114 L 40 117 M 46 114 L 46 119 M 46 114 L 51 117" stroke="#7A5A30" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#7A5A30" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Black-and-white Warbler ──────────────────────────────────────────────────
export function BlackAndWhiteWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 8), 340)
    return () => clearInterval(id)
  }, [animated])
  const creepX = animated ? [0,1,3,4,3,1,0,-1][frame] : 0
  const creepY = animated ? [0,-2,-3,-2,0,2,2,0][frame] : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Black-and-white Warbler">
      <defs>
        <clipPath id="bwBodyClip3"><ellipse cx="61" cy="84" rx="23" ry="18"/></clipPath>
        <clipPath id="bwHeadClip3"><circle cx="44" cy="58" r="18"/></clipPath>
        <clipPath id="bwWingClip3"><path d="M 42 66 C 57 58 82 60 88 73 C 82 81 58 83 42 77 Z"/></clipPath>
      </defs>
      <g transform={`translate(${creepX}, ${creepY})`}>
        {/* Tail — black with crisp white outer edges */}
        <path d="M 73 91 C 84 97 95 110 93 119 C 84 110 74 100 71 93" fill="#111"/>
        <path d="M 71 93 C 80 104 82 116 79 121 C 76 116 74 104 72 95" fill="#111"/>
        <path d="M 75 92 C 83 100 88 112 86 120" stroke="#E8E8E8" strokeWidth="2.5" fill="none" opacity="0.7"/>

        {/* Body — white underparts base */}
        <ellipse cx="61" cy="84" rx="23" ry="18" fill="#E8E8E8"/>

        {/* Bold black breast-side streaks — the "creeper" look */}
        <g clipPath="url(#bwBodyClip3)">
          <path d="M 39 84 L 42 100" stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 46 82 L 49 99" stroke="#111" strokeWidth="3.2" strokeLinecap="round"/>
          <path d="M 53 81 L 55 97" stroke="#111" strokeWidth="2.8" strokeLinecap="round"/>
          <path d="M 60 81 L 61 96" stroke="#111" strokeWidth="2.4" strokeLinecap="round"/>
          <path d="M 67 82 L 68 95" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 77 83 L 78 95" stroke="#111" strokeWidth="1.8" strokeLinecap="round"/>
        </g>

        {/* Black back and wings */}
        <path d="M 42 66 C 57 58 82 60 88 73 C 82 81 58 83 42 77 Z" fill="#111"/>
        {/* Two bold WHITE wing bars on black wing */}
        <g clipPath="url(#bwWingClip3)">
          <path d="M 48 65 C 62 59 80 61 86 68" stroke="#E8E8E8" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 46 74 C 60 68 80 70 86 76" stroke="#E8E8E8" strokeWidth="3" fill="none" strokeLinecap="round"/>
          {/* White-edged tertials */}
          <path d="M 53 61 C 57 64 57 74 53 76" stroke="#E8E8E8" strokeWidth="1.5" fill="none" opacity="0.6"/>
          <path d="M 62 59 C 66 63 66 73 62 75" stroke="#E8E8E8" strokeWidth="1.5" fill="none" opacity="0.6"/>
          <path d="M 71 60 C 75 64 75 73 71 75" stroke="#E8E8E8" strokeWidth="1.2" fill="none" opacity="0.5"/>
        </g>

        {/* HEAD — black, then white stripes painted over */}
        <circle cx="44" cy="58" r="18" fill="#111"/>
        <g clipPath="url(#bwHeadClip3)">
          {/* BOLD white median crown stripe — the #1 ID mark */}
          <path d="M 26 54 C 32 46 44 42 54 44 C 56 47 56 52 52 55 C 46 57 34 57 26 55 Z" fill="#E8E8E8"/>
          {/* Bold white supercilium */}
          <path d="M 26 58 C 32 55 43 54 52 56 C 54 58 53 62 50 62 C 42 63 30 61 26 59 Z" fill="#E8E8E8"/>
          {/* White submoustachial */}
          <path d="M 26 65 C 31 62 40 62 46 64 C 46 68 40 70 30 68 Z" fill="#E8E8E8"/>
          {/* Black auricular / cheek patch between supercilium and submoustachial */}
          <path d="M 42 60 C 47 57 54 57 56 61 C 56 66 51 68 46 67 C 42 65 40 63 42 60 Z" fill="#111"/>
          {/* Black throat bib (male) */}
          <path d="M 26 68 C 29 65 38 65 45 68 C 45 77 36 78 27 75 Z" fill="#111"/>
        </g>

        {/* Bill — thin, pale horn, very visible on striped head */}
        <path d="M 26 59 L 11 61 L 26 64 Z" fill="#D0C898"/>
        <line x1="11" y1="61" x2="26" y2="61" stroke="#9A9068" strokeWidth="0.8"/>

        {/* Eye — dark, on the white supercilium band */}
        <circle cx="42" cy="57" r="3.8" fill="#111"/>
        <circle cx="41" cy="56" r="1.5" fill="white" opacity="0.85"/>

        {/* Feet — strong for trunk clinging */}
        <path d="M 50 102 L 46 116" stroke="#7A6040" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 64 102 L 68 116" stroke="#7A6040" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 46 116 L 39 119 M 46 116 L 46 121 M 46 116 L 52 119" stroke="#7A6040" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 68 116 L 61 119 M 68 116 L 68 121 M 68 116 L 74 119" stroke="#7A6040" strokeWidth="1.6" strokeLinecap="round"/>
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
        <path d="M 28 56 L 18 58 L 28 61 Z" fill="#C8B878"/>
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
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 520)
    return () => clearInterval(id)
  }, [animated])
  const bodyY = animated ? [0, -1, -2, -1, 0, 1][frame] : 0
  const headTilt = animated && frame === 3 ? -5 : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Scarlet Tanager">
      <g transform={`translate(0, ${bodyY})`}>
        {/* Tail — jet black, two lobes */}
        <path d="M 70 88 C 84 90 96 100 99 113 C 88 107 77 99 71 91" fill="#111111"/>
        <path d="M 67 91 C 74 103 74 116 70 122 C 66 113 63 102 65 92" fill="#111111"/>

        {/* Body — PURE SCARLET (vivid red, not orange) */}
        <ellipse cx="59" cy="83" rx="24" ry="19" fill="#CC1515"/>
        {/* Richer red sheen on breast */}
        <ellipse cx="54" cy="86" rx="15" ry="11" fill="#D81A1A" opacity="0.5"/>

        {/* Wings — jet black, full panel, clean edge — the contrast is everything */}
        <path d="M 46 69 C 60 62 80 64 87 75 C 81 91 62 93 46 87 Z" fill="#0E0E0E"/>
        {/* Wing feather detail — subtle dark gray lines within black */}
        <path d="M 52 70 C 68 64 81 67 86 73" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M 50 78 C 66 72 81 75 86 81" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>

        {/* Scarlet rump patch peeking between wing and tail */}
        <ellipse cx="69" cy="88" rx="7" ry="5" fill="#CC1515"/>

        {/* Head — scarlet, round and plump */}
        <g transform={`rotate(${headTilt}, 44, 58)`}>
          <circle cx="44" cy="58" r="18" fill="#CC1515"/>
          {/* Crown highlight — slightly richer */}
          <ellipse cx="44" cy="48" rx="10" ry="6" fill="#B81010" opacity="0.4"/>

          {/* Bill — medium-heavy, pale/horn colored — distinctive tanager bill */}
          <path d="M 27 57 L 14 59.5 L 27 63 Z" fill="#A8A880"/>
          <line x1="14" y1="59.5" x2="27" y2="59.5" stroke="#888870" strokeWidth="1"/>

          {/* Eye — dark on scarlet, needs visible highlight */}
          <circle cx="42" cy="54" r="4.8" fill="#0E0E0E"/>
          <circle cx="41" cy="53" r="1.8" fill="white" opacity="0.75"/>
        </g>

        {/* Legs */}
        <path d="M 51 100 L 47 114" stroke="#6A5A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 63 100 L 67 114" stroke="#6A5A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 47 114 L 41 117 M 47 114 L 47 119 M 47 114 L 52 117" stroke="#6A5A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 67 114 L 61 117 M 67 114 L 67 119 M 67 114 L 72 117" stroke="#6A5A40" strokeWidth="1.5" strokeLinecap="round"/>
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
        <path d="M 27 57 L 17 60 L 27 63 Z" fill="#C8B878"/>
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
        <path d="M 28 56 L 19 57 L 28 60 Z" fill="#C8B878"/>
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
          <path d="M 26 55 L 13 58 L 26 63 Z" fill="#C8B878"/>
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
        <path d="M 26 56 L 15 58 L 22 60 Z" fill="#C8B878"/>
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
        <path d="M 28 56 L 17 58 L 28 62 Z" fill="#C8B878"/>
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
        <path d="M 25 38 L 14 40 L 25 43 Z" fill="#C8B878"/>
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
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 520); return () => clearInterval(id) }, [animated])
  const wflap = animated ? [0,-4,-7,-4,0,4,7,4][frame] : 0
  return (
    <svg viewBox="0 0 170 130" width={size} height={size} style={style} aria-label="Osprey">
      {/* === WINGS — the kinked M-shape is the diagnostic osprey silhouette === */}
      {/* Left wing: inner panel + bent-wrist outer panel */}
      <g transform={`rotate(${-wflap * 0.6}, 72, 62)`}>
        <path d="M 72 62 C 60 54 44 50 28 54 C 22 56 14 62 8 68 C 16 62 30 58 44 58 C 56 58 66 60 72 64 Z"
          fill="#7A5A30"/>
        {/* Primary feathers — dark tips */}
        <path d="M 8 68 C 14 66 22 66 28 70" stroke="#3A2810" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 28 70 C 32 68 40 68 44 72" stroke="#3A2810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Dark carpal patch — the wrist spot that ids Osprey */}
        <ellipse cx="56" cy="60" rx="10" ry="6" fill="#1A1010" transform="rotate(-10, 56, 60)"/>
        {/* Pale wing bar stripe */}
        <path d="M 20 62 C 36 58 54 58 66 62" stroke="#D0B888" strokeWidth="2" fill="none" opacity="0.55"/>
      </g>
      {/* Right wing: mirror with opposite flap */}
      <g transform={`rotate(${wflap * 0.6}, 98, 62)`}>
        <path d="M 98 62 C 110 54 126 50 142 54 C 148 56 156 62 162 68 C 154 62 140 58 126 58 C 114 58 104 60 98 64 Z"
          fill="#7A5A30"/>
        <path d="M 162 68 C 156 66 148 66 142 70" stroke="#3A2810" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 142 70 C 138 68 130 68 126 72" stroke="#3A2810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="114" cy="60" rx="10" ry="6" fill="#1A1010" transform="rotate(10, 114, 60)"/>
        <path d="M 150 62 C 134 58 116 58 104 62" stroke="#D0B888" strokeWidth="2" fill="none" opacity="0.55"/>
      </g>
      {/* Tail — slightly fanned, barred */}
      <path d="M 78 78 C 74 90 72 104 74 112 C 78 108 82 106 86 112 C 88 104 88 90 82 78 Z" fill="#7A5A30"/>
      <path d="M 74 96 C 78 98 82 98 86 96" stroke="#D0B888" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M 74 104 C 78 106 82 106 86 104" stroke="#D0B888" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Body — white below, brown back */}
      <ellipse cx="85" cy="68" rx="16" ry="12" fill="#F5F2E8"/>
      <ellipse cx="85" cy="60" rx="14" ry="9" fill="#7A5A30"/>
      {/* Brown breast band / necklace — the "bib" marking */}
      <path d="M 71 66 C 74 61 82 59 90 61 C 95 63 96 70 93 73 C 89 75 74 73 71 68 Z"
        fill="#8A6038" opacity="0.75"/>
      {/* Head — brilliant white */}
      <circle cx="85" cy="46" r="14" fill="#F5F2E8"/>
      {/* Brown crown streaking */}
      <path d="M 72 44 C 74 34 82 29 90 31 C 96 34 97 40 93 44 C 88 42 78 42 72 44 Z" fill="#7A5A30"/>
      {/* BOLD dark eye stripe — from bill base back past eye, drops at back */}
      <path d="M 71 46 C 74 41 81 39 88 41 C 93 43 93 49 90 52 C 86 52 78 50 71 48 Z" fill="#1A0808"/>
      {/* Eye stripe continues back */}
      <path d="M 90 43 C 95 41 99 42 100 46 C 98 49 94 50 90 48 Z" fill="#1A0808"/>
      {/* Hooked raptor bill */}
      <path d="M 71 47 C 66 46 60 47 59 50 C 62 53 68 53 71 51 Z" fill="#404040"/>
      <path d="M 59 50 C 61 53 66 54 70 52" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
      {/* Golden eye — osprey's defining gaze */}
      <circle cx="80" cy="44" r="4.5" fill="#E8B820"/>
      <circle cx="80" cy="44" r="3" fill="#1A1010"/>
      <circle cx="79" cy="43" r="1.1" fill="white" opacity="0.85"/>
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
        <path d="M 28 54 L 18 56 L 28 59 Z" fill="#C8B878"/>
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
        <path d="M 27 56 L 15 58 L 27 62 Z" fill="#C8B878"/>
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
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f+1)%8), 200); return () => clearInterval(id) }, [animated])
  // Wing beat cycle — the body rises/falls with wingbeat
  const wbd = animated ? [0, 5, 9, 11, 9, 5, 0, -3][frame] : 0
  const bodyY = animated ? [0, -2, -4, -3, 0, 2, 1, 0][frame] : 0
  return (
    <svg viewBox="0 0 150 110" width={size} height={size} style={style} aria-label="Barn Swallow">
      {/* Mirror horizontally so bird faces RIGHT — natural forward-motion direction */}
      <g transform={`translate(150, ${bodyY}) scale(-1, 1)`}>
        {/* DEEPLY FORKED TAIL — the whole point, very long outer streamers */}
        {/* Outer tail streamers (longest, steel-blue) */}
        <path d="M 67 72 C 62 82 54 96 44 108 C 52 104 62 90 66 76" fill="#1C2E7A"/>
        <path d="M 82 72 C 87 82 95 96 105 108 C 97 104 87 90 83 76" fill="#1C2E7A"/>
        {/* Inner tail feathers (shorter, rufous-buff) */}
        <path d="M 68 73 C 67 80 67 88 66 94 C 70 90 72 82 72 76" fill="#C87848"/>
        <path d="M 81 73 C 82 80 82 88 83 94 C 79 90 77 82 77 76" fill="#C87848"/>
        {/* Tail base */}
        <path d="M 66 70 C 68 74 71 76 75 77 C 79 76 81 74 83 70" fill="#1C2E7A"/>

        {/* Wings — long, pointed, swept — steel blue/iridescent */}
        {/* Left wing — tip sweeps up then down with wingbeat */}
        <path d={`M 15 ${46 - wbd*0.4} C 35 ${40 - wbd*0.6} 55 46 70 58`}
          stroke="#1C2E7A" strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d={`M 15 ${46 - wbd*0.4} C 35 ${42 - wbd*0.6} 55 48 70 58`}
          stroke="#2A3E96" strokeWidth="12" strokeLinecap="round" fill="none"/>
        {/* Right wing */}
        <path d={`M 135 ${46 - wbd*0.4} C 115 ${40 - wbd*0.6} 95 46 80 58`}
          stroke="#1C2E7A" strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d={`M 135 ${46 - wbd*0.4} C 115 ${42 - wbd*0.6} 95 48 80 58`}
          stroke="#2A3E96" strokeWidth="12" strokeLinecap="round" fill="none"/>

        {/* Body — sleek, tapered — steel blue above, rufous-cinnamon below */}
        <ellipse cx="75" cy="62" rx="16" ry="9" fill="#C87848"/>
        {/* Steel-blue back panel over body */}
        <ellipse cx="75" cy="58" rx="14" ry="7" fill="#1C2E7A"/>

        {/* Head — round, steel-blue */}
        <circle cx="63" cy="50" r="13" fill="#1C2E7A"/>

        {/* RUFOUS FOREHEAD — chestnut-red forehead patch, a bold mark */}
        <path d="M 52 46 C 54 38 62 34 68 36 C 70 38 68 44 64 46 C 60 46 55 47 52 47 Z" fill="#B05030"/>

        {/* RUFOUS THROAT — cinnamon-orange chin and throat */}
        <ellipse cx="58" cy="56" rx="9" ry="7" fill="#C87848"/>

        {/* Creamy-buff belly/breast hint */}
        <ellipse cx="72" cy="65" rx="8" ry="5" fill="#E8C8A0" opacity="0.5"/>

        {/* Bill — tiny flat wide gape, faces FORWARD (right, toward nose) */}
        <path d="M 52 49 L 62 50.5 L 59 53 Z" fill="#C8B878"/>

        {/* Eye — small, dark */}
        <circle cx="59" cy="47" r="3" fill="#0E0E0E"/>
        <circle cx="58.5" cy="46.5" r="1.1" fill="white" opacity="0.75"/>

        {/* No legs shown — in flight */}
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
        <path d="M 53 47 L 42 49 L 46 52 Z" fill="#C8B878"/>
        <circle cx="58" cy="44" r="3.5" fill="#1A1A1A"/>
        <circle cx="57" cy="43" r="1.3" fill="white" opacity="0.8"/>
      </g>
    </svg>
  )
}

// ── Atlantic Flyway Warbler Avatars ───────────────────────────────────────────
// Compact but field-mark-accurate SVG warblers.
// All share a 120×120 viewBox and the same posture template.

export function BlackthroatedGreenWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 370)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Black-throated Green Warbler">
      <defs>
        <clipPath id="btgHeadClip3"><circle cx="44" cy="57" r="18"/></clipPath>
        <clipPath id="btgBodyClip3"><ellipse cx="60" cy="84" rx="22" ry="17"/></clipPath>
      </defs>
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — olive */}
        <path d="M 72 90 C 83 95 92 108 90 117 C 82 108 73 98 71 92" fill="#3A5A18"/>
        <path d="M 70 92 C 76 102 77 114 73 120 C 69 112 67 100 68 94" fill="#3A5A18"/>

        {/* Body — white underparts, olive back */}
        <ellipse cx="59" cy="85" rx="22" ry="17" fill="#F2F2EC"/>

        {/* Bold BLACK FLANK STREAKS — one of the top ID marks */}
        <g clipPath="url(#btgBodyClip3)">
          <path d="M 38 78 C 36 87 36 100 42 106 C 47 104 50 91 48 78 Z" fill="#111"/>
          <path d="M 80 80 C 83 89 82 99 76 105 C 72 103 72 90 73 80 Z" fill="#111"/>
          {/* Extra breast streaks */}
          <path d="M 50 82 L 52 94" stroke="#333" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          <path d="M 57 81 L 58 92" stroke="#333" strokeWidth="1.8" strokeLinecap="round" opacity="0.4"/>
        </g>

        {/* Olive-green back and wings */}
        <path d="M 43 72 C 58 65 79 66 85 75 C 79 82 59 84 43 80 Z" fill="#4A7028"/>
        {/* Two clean white wingbars */}
        <path d="M 47 71 C 62 65 78 66 84 73" stroke="#F0F0E8" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
        <path d="M 45 79 C 61 73 78 74 84 80" stroke="#F0F0E8" strokeWidth="2.8" fill="none" strokeLinecap="round"/>

        {/* HEAD — VIVID YELLOW. This is what makes BTG unmistakable. */}
        <circle cx="44" cy="57" r="18" fill="#FFE030"/>
        <g clipPath="url(#btgHeadClip3)">
          {/* Olive-green CAP — sharp-edged, ends well above eye */}
          <path d="M 28 51 C 30 37 45 30 57 35 C 61 39 60 49 54 52 C 46 53 34 53 28 52 Z" fill="#4A7028"/>
          {/* Olive NAPE behind cap */}
          <path d="M 54 51 C 63 51 70 57 71 65 C 63 62 55 57 54 52 Z" fill="#4A7028"/>
          {/* Olive ear patch — SMALL, sits BELOW and BEHIND the eye only */}
          <ellipse cx="54" cy="66" rx="7" ry="6" fill="#4A7028" opacity="0.85"/>
          {/* BLACK THROAT BIB — the star of the show: bold jet black triangle */}
          <path d="M 28 62 C 30 56 40 52 52 54 C 56 58 55 74 46 77 C 35 77 26 71 28 63 Z" fill="#111"/>
        </g>

        {/* Bill — olive-dark, short, visible on yellow */}
        <path d="M 26 58 L 12 60 L 26 63 Z" fill="#7A8050"/>
        <line x1="12" y1="60" x2="26" y2="60" stroke="#505830" strokeWidth="0.8"/>

        {/* Eye — dark on yellow, ABOVE the black bib */}
        <circle cx="42" cy="53" r="4" fill="#111"/>
        <circle cx="41" cy="52" r="1.5" fill="white" opacity="0.9"/>

        {/* Legs */}
        <path d="M 50 101 L 47 115" stroke="#8B7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 63 101 L 66 115" stroke="#8B7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 47 115 L 40 118 M 47 115 L 47 120 M 47 115 L 52 118" stroke="#8B7040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 115 L 59 118 M 66 115 L 66 120 M 66 115 L 71 118" stroke="#8B7040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function BlackburnianWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 370)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Blackburnian Warbler">
      <defs>
        <clipPath id="bblHeadClip3"><circle cx="44" cy="57" r="18"/></clipPath>
        <clipPath id="bblBodyClip3"><ellipse cx="60" cy="84" rx="22" ry="17"/></clipPath>
        <clipPath id="bblWingClip3"><path d="M 40 70 C 57 62 82 63 88 74 C 82 82 58 84 40 79 Z"/></clipPath>
      </defs>
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — jet black */}
        <path d="M 72 91 C 83 96 91 109 89 117 C 81 108 74 98 71 93" fill="#0A0A0A"/>
        <path d="M 70 93 C 76 103 77 115 73 121 C 69 113 67 101 68 95" fill="#0A0A0A"/>

        {/* Body — JET BLACK (this species is one of darkest warblers) */}
        <ellipse cx="60" cy="84" rx="22" ry="17" fill="#0A0A0A"/>

        {/* MASSIVE WHITE WING PATCH — biggest of any warbler, unmistakable */}
        <path d="M 40 70 C 57 62 82 63 88 74 C 82 82 58 84 40 79 Z" fill="#F0EEE8"/>
        <g clipPath="url(#bblWingClip3)">
          <path d="M 55 68 L 56 81" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 64 66 L 65 81" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 73 67 L 74 80" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* White belly + bold black flank streaks */}
        <g clipPath="url(#bblBodyClip3)">
          <ellipse cx="54" cy="92" rx="15" ry="11" fill="#F0EEE8"/>
          <path d="M 40 83 L 43 97" stroke="#0A0A0A" strokeWidth="2.8" strokeLinecap="round"/>
          <path d="M 47 81 L 50 95" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Orange-buff breast wash at sides */}
          <path d="M 38 82 C 37 90 38 100 43 105 C 47 103 49 93 49 82 Z" fill="#FF7020" opacity="0.45"/>
        </g>

        {/* HEAD — jet black. Orange blazes painted over it. */}
        <circle cx="44" cy="57" r="18" fill="#0A0A0A"/>
        <g clipPath="url(#bblHeadClip3)">
          {/* BLAZING ORANGE SUPERCILIUM — the #1 field mark. Wide, fiery. */}
          <path d="M 27 51 C 31 43 42 39 55 42 C 58 46 57 54 52 56 C 43 57 32 55 27 52 Z" fill="#FF5E00"/>
          {/* Hot amber center highlights */}
          <path d="M 29 50 C 37 45 50 43 56 45" stroke="#FFB000" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9"/>

          {/* BLAZING ORANGE THROAT — equal billing with supercilium. Pure fire. */}
          <path d="M 27 58 C 29 52 40 49 51 52 C 55 56 54 72 44 77 C 33 76 25 68 27 59 Z" fill="#FF5E00"/>
          <path d="M 30 58 C 33 54 40 52 49 54 C 52 58 51 70 44 74 C 36 73 29 67 30 60 Z" fill="#FFA000" opacity="0.7"/>

          {/* Black cheek PATCH between supercilium and throat orange */}
          <path d="M 46 57 C 50 53 57 54 59 58 C 59 65 55 68 50 67 C 45 65 44 62 46 57 Z" fill="#0A0A0A"/>
        </g>

        {/* Bill — pale, outlined so it reads against orange */}
        <path d="M 26 56 L 12 58 L 26 62 Z" fill="#C0A870"/>
        <line x1="12" y1="58" x2="26" y2="58" stroke="#806840" strokeWidth="0.8"/>

        {/* Eye — dark, in the orange glow, white highlight pops it */}
        <circle cx="42" cy="53" r="3.8" fill="#0A0A0A"/>
        <circle cx="41" cy="52" r="1.5" fill="white" opacity="0.9"/>

        {/* Legs */}
        <path d="M 50 101 L 47 115" stroke="#8B7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 63 101 L 66 115" stroke="#8B7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 47 115 L 40 118 M 47 115 L 47 120 M 47 115 L 52 118" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 115 L 60 118 M 66 115 L 66 120 M 66 115 L 71 118" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function MagnoliaWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Magnolia Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — black with diagnostic white band across middle */}
        <path d="M 55 90 C 50 100 48 110 50 118 C 56 112 60 102 60 92" fill="#1A1A1A"/>
        <path d="M 65 90 C 70 100 72 110 70 118 C 64 112 60 102 60 92" fill="#1A1A1A"/>
        <rect x="46" y="90" width="28" height="5" rx="2" fill="white" opacity="0.9"/>
        {/* Body — yellow with heavy black streaks on breast */}
        <ellipse cx="60" cy="80" rx="20" ry="16" fill="#FFD700"/>
        <path d="M 46 74 L 44 90 M 52 72 L 50 90 M 58 71 L 58 90 M 64 71 L 66 90 M 70 74 L 72 90"
          stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
        {/* Large white wing patch — very distinctive */}
        <path d="M 44 72 C 54 67 72 67 78 74 C 72 79 54 79 44 77 Z" fill="white" opacity="0.9"/>
        {/* Head — blue-gray cap */}
        <circle cx="48" cy="56" r="16" fill="#5A6A78"/>
        {/* Yellow throat/chin */}
        <ellipse cx="44" cy="64" rx="10" ry="7" fill="#FFD700"/>
        {/* Black mask — broad, wraps from bill around eye */}
        <path d="M 32 54 C 34 47 44 44 53 47 C 56 51 52 59 43 60 C 36 60 30 58 32 54 Z" fill="#1A1A1A"/>
        {/* Bill */}
        <path d="M 32 55 L 22 57 L 32 60 Z" fill="#C8B878"/>
        {/* Eye — bright white highlight against mask */}
        <circle cx="46" cy="52" r="3.2" fill="#1A1A1A"/>
        <circle cx="45" cy="51" r="1.3" fill="white" opacity="0.95"/>
        {/* Legs with toes */}
        <path d="M 50 96 L 47 110" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 96 L 65 110" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 47 110 L 41 113 M 47 110 L 47 115 M 47 110 L 52 113" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 65 110 L 59 113 M 65 110 L 65 115 M 65 110 L 70 113" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function ChestnutsideWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 370)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Chestnut-sided Warbler">
      <defs>
        <clipPath id="cswHeadClip3"><circle cx="44" cy="57" r="18"/></clipPath>
        <clipPath id="cswBodyClip3"><ellipse cx="59" cy="84" rx="22" ry="17"/></clipPath>
      </defs>
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — olive-yellow */}
        <path d="M 72 90 C 81 94 89 105 88 113 C 80 106 73 98 71 92" fill="#6A7830"/>
        <path d="M 70 92 C 75 102 76 114 72 120 C 68 112 66 100 67 94" fill="#6A7830"/>

        {/* Body — CLEAN WHITE underparts (the white really contrasts with chestnut) */}
        <ellipse cx="59" cy="84" rx="22" ry="17" fill="#F8F8F4"/>

        {/* CHESTNUT FLANKS — BOLD and WIDE. This IS the bird. Make them BIG. */}
        <g clipPath="url(#cswBodyClip3)">
          {/* Left chestnut stripe — starts from shoulder and runs full length */}
          <path d="M 38 68 C 35 76 34 92 39 102 C 45 101 48 87 47 70 Z" fill="#7A2C0E"/>
          {/* Right chestnut stripe */}
          <path d="M 81 68 C 84 76 85 92 80 102 C 74 101 71 87 72 70 Z" fill="#7A2C0E"/>
          {/* Richer rufous center of each stripe */}
          <path d="M 39 70 C 37 78 37 94 42 101 C 44 100 46 88 45 72 Z" fill="#A03A18" opacity="0.7"/>
          <path d="M 80 70 C 82 78 82 94 77 101 C 75 100 73 88 74 72 Z" fill="#A03A18" opacity="0.7"/>
        </g>

        {/* Olive-green back and wings */}
        <path d="M 43 70 C 58 63 78 65 84 74 C 78 81 58 83 43 79 Z" fill="#7A8C38"/>
        {/* Two crisp white wingbars */}
        <path d="M 47 70 C 62 64 78 65 84 72" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M 46 78 C 61 72 78 73 84 79" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round"/>

        {/* HEAD — brilliantly WHITE face (snow-white, this species really is that clean) */}
        <circle cx="44" cy="57" r="18" fill="#F8F8F4"/>
        <g clipPath="url(#cswHeadClip3)">
          {/* YELLOW CROWN — vivid lemon-yellow cap */}
          <path d="M 27 51 C 29 36 45 29 57 34 C 61 38 59 48 51 51 C 42 53 30 52 27 52 Z" fill="#FFE500"/>
          {/* Black lateral crown stripe — narrow, bordering the yellow cap */}
          <path d="M 47 32 C 54 31 61 36 62 42 C 61 47 56 50 50 50 C 56 45 60 39 55 34 Z" fill="#111"/>
          {/* Black loral mask — from bill through eye */}
          <path d="M 27 53 C 33 51 40 51 44 53 C 45 57 42 59 35 58 C 29 57 27 55 27 54 Z" fill="#111"/>
          {/* BLACK MALAR STREAK — wide, the most visible head mark after the yellow crown */}
          <path d="M 36 60 C 39 57 47 57 52 61 C 55 65 53 73 47 75 C 39 74 35 68 36 62 Z" fill="#111"/>
        </g>

        {/* Bill — olive-horn, clearly visible on bright white face */}
        <path d="M 26 57 L 13 59 L 26 62 Z" fill="#9A9868"/>
        <line x1="13" y1="59" x2="26" y2="59" stroke="#6A6840" strokeWidth="0.8"/>

        {/* Eye — on the white face above the malar */}
        <circle cx="42" cy="53" r="3.8" fill="#111"/>
        <circle cx="41" cy="52" r="1.5" fill="white" opacity="0.9"/>

        {/* Legs */}
        <path d="M 49 101 L 46 115" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 63 101 L 66 115" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 46 115 L 39 118 M 46 115 L 46 120 M 46 115 L 51 118" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 66 115 L 60 118 M 66 115 L 66 120 M 66 115 L 71 118" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function BlackthroatedBlueWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Black-throated Blue Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — deep navy */}
        <path d="M 72 88 C 80 94 86 106 86 114 C 78 106 72 96 72 90" fill="#1a2a6a"/>
        {/* Body — rich deep navy-blue back */}
        <ellipse cx="60" cy="82" rx="20" ry="16" fill="#1a3a8a"/>
        {/* Clean white belly — contrasts sharply with black throat */}
        <ellipse cx="59" cy="88" rx="13" ry="10" fill="white"/>
        {/* The "handkerchief" — small but unmistakable white wing spot */}
        <ellipse cx="67" cy="75" rx="6" ry="4.5" fill="white" opacity="0.95"/>
        {/* Head — matching deep navy */}
        <circle cx="48" cy="56" r="16" fill="#1a3a8a"/>
        {/* Black face and throat — whole lores/chin/cheek jet black */}
        <path d="M 30 54 C 32 46 40 42 50 44 C 55 47 56 58 50 66 C 40 70 28 64 30 56 Z" fill="#0a0820"/>
        {/* Bill */}
        <path d="M 30 54 L 19 56 L 30 59 Z" fill="#C8B878"/>
        {/* Eye — dark, just visible in the black face */}
        <circle cx="44" cy="52" r="3.2" fill="#0a0820"/>
        <circle cx="43" cy="51" r="1.2" fill="white" opacity="0.9"/>
        {/* Legs with toes */}
        <path d="M 50 98 L 47 112" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 98 L 65 112" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 47 112 L 41 115 M 47 112 L 47 117 M 47 112 L 52 115" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 65 112 L 59 115 M 65 112 L 65 117 M 65 112 L 70 115" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function CanadaWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Canada Warbler">
      <defs>
        <clipPath id="canHeadClip"><circle cx="47" cy="56" r="17"/></clipPath>
        <clipPath id="canBodyClip"><ellipse cx="60" cy="82" rx="21" ry="17"/></clipPath>
      </defs>
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — blue-gray, short and square-tipped */}
        <path d="M 72 88 C 81 92 87 105 86 113 C 78 105 72 96 71 90" fill="#5A6A82"/>

        {/* Body — all bright yellow below */}
        <ellipse cx="60" cy="82" rx="21" ry="17" fill="#FFD500"/>

        {/* Blue-gray back and wing panel */}
        <path d="M 42 70 C 56 63 76 63 82 73 C 76 80 56 82 42 78 Z" fill="#5A6A82"/>

        {/* THE NECKLACE — bold black streaks across the yellow breast, perfectly placed */}
        <g clipPath="url(#canBodyClip)">
          {/* Left side necklace dot/dash */}
          <path d="M 41 79 C 43 75 46 73 49 75 C 49 78 47 80 44 81 Z" fill="#111111"/>
          {/* Center streaks — 3 bold dashes */}
          <path d="M 53 73 L 54 82" stroke="#111111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 59 72 L 60 81" stroke="#111111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 65 73 L 65 82" stroke="#111111" strokeWidth="2.8" strokeLinecap="round"/>
          {/* Right side necklace bracket */}
          <path d="M 68 76 C 71 73 74 75 73 79 C 71 81 68 81 68 79 Z" fill="#111111"/>
          {/* White undertail coverts */}
          <ellipse cx="57" cy="97" rx="10" ry="5" fill="#F0F0E8" opacity="0.55"/>
        </g>

        {/* Head — slate blue-gray, round */}
        <circle cx="47" cy="56" r="17" fill="#5A6A82"/>

        <g clipPath="url(#canHeadClip)">
          {/* Black lores/forehead — dark from bill base to above eye */}
          <path d="M 30 53 C 33 46 42 43 48 46 C 47 51 40 54 30 55 Z" fill="#111111"/>
          {/* Black cap/crown — continues over top of head */}
          <path d="M 33 50 C 35 40 46 33 56 37 C 59 42 57 51 52 53 C 46 54 37 52 33 51 Z" fill="#111111"/>

          {/* YELLOW SPECTACLE — bold eye ring, the key field mark */}
          <circle cx="45" cy="52" r="6" fill="none" stroke="#FFD500" strokeWidth="3"/>

          {/* Yellow throat — strong gold chin below black lores */}
          <ellipse cx="42" cy="65" rx="10" ry="7" fill="#FFD500"/>
        </g>

        {/* Bill — thin, pointed */}
        <path d="M 30 56 L 18 58 L 30 61 Z" fill="#C8B878"/>

        {/* Eye inside the spectacle ring */}
        <circle cx="45" cy="52" r="3.2" fill="#111111"/>
        <circle cx="44" cy="51" r="1.3" fill="white" opacity="0.9"/>

        {/* Legs */}
        <path d="M 50 99 L 47 113" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 99 L 65 113" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 47 113 L 41 116 M 47 113 L 47 118 M 47 113 L 52 116" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 65 113 L 59 116 M 65 113 L 65 118 M 65 113 L 70 116" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function NashvilleWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Nashville Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — olive-green, often pumped up */}
        <path d="M 70 86 C 80 84 90 90 92 100 C 82 96 74 90 70 88" fill="#5a6a3a"/>
        {/* Body — olive-green back */}
        <ellipse cx="60" cy="82" rx="20" ry="16" fill="#a0b838"/>
        {/* Bright yellow underparts — no streaking, clean */}
        <ellipse cx="59" cy="88" rx="16" ry="10" fill="#FFE400"/>
        {/* No wing bars — Nashville is notably plain-winged */}
        {/* Head — clean gray, no cap markings */}
        <circle cx="48" cy="56" r="16" fill="#7a8a7a"/>
        {/* White eye ring — bold, one of the most prominent in warblers */}
        <circle cx="46" cy="53" r="6.5" fill="none" stroke="white" strokeWidth="2.5"/>
        {/* Yellow throat/chin — bright, continuous with belly */}
        <ellipse cx="44" cy="64" rx="9.5" ry="6.5" fill="#FFE400"/>
        {/* Rufous crown patch — usually concealed but present, add as subtle hint */}
        <ellipse cx="47" cy="47" rx="5" ry="3" fill="#8B5030" opacity="0.5"/>
        {/* Dark lores */}
        <path d="M 32 53 C 34 49 38 47 42 50 C 40 53 34 55 32 55 Z" fill="#3a3a2a"/>
        {/* Bill — thin, pointed */}
        <path d="M 32 55 L 21 57 L 32 60 Z" fill="#2A2A2A"/>
        {/* Eye */}
        <circle cx="46" cy="53" r="3" fill="#1A1A1A"/>
        <circle cx="45" cy="52" r="1.2" fill="white" opacity="0.9"/>
        {/* Legs with toes */}
        <path d="M 50 98 L 47 112" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 98 L 65 112" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 47 112 L 41 115 M 47 112 L 47 117 M 47 112 L 52 115" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 65 112 L 59 115 M 65 112 L 65 117 M 65 112 L 70 115" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function WilsonsWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 340)
    return () => clearInterval(id)
  }, [animated])
  // Active, flicky animation — Wilson's is a hyperactive forager
  const bobY = animated ? [0, -4, -6, -4, 0, 2][frame] : 0
  const tailCock = animated ? [0, 2, 4, 5, 3, 1][frame] : 0  // tail tip pumped up

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Wilson's Warbler">
      <defs>
        <clipPath id="wilsHeadClip"><circle cx="46" cy="56" r="17"/></clipPath>
      </defs>
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — olive, cocked and flicked upward — behavioral field mark */}
        <path d={`M 72 ${86 - tailCock} C 85 ${82 - tailCock} 97 ${86 - tailCock} 99 ${97 - tailCock} C 88 ${91 - tailCock} 75 ${88 - tailCock} 71 ${88 - tailCock}`} fill="#5A7A28"/>

        {/* Body — olive-green back, round and compact (tiny bird) */}
        <ellipse cx="59" cy="82" rx="21" ry="16" fill="#6A8A30"/>

        {/* BRILLIANT BUTTER YELLOW underparts — all the way up, no dullness */}
        <ellipse cx="56" cy="88" rx="17" ry="11" fill="#FFEA00"/>
        {/* Yellow breast also visible at front/sides */}
        <path d="M 38 82 C 36 88 38 98 43 102 C 47 100 48 90 47 80 Z" fill="#D4C820" opacity="0.45"/>

        {/* Head — yellow face, perfectly round (small round head) */}
        <circle cx="46" cy="56" r="17" fill="#FFEA00"/>

        {/* THE BLACK BERET CAP — flat, low on forehead, the whole identity */}
        <g clipPath="url(#wilsHeadClip)">
          {/* Cap is solid jet black, crisp lower edge, domed top */}
          <path d="M 29 52 C 31 37 44 28 57 32 C 65 36 65 46 58 51 C 50 53 37 52 29 52 Z" fill="#111111"/>
          {/* Faint gloss highlight on cap dome */}
          <path d="M 35 40 C 42 34 52 32 58 36" stroke="#282828" strokeWidth="2" fill="none" opacity="0.5"/>
        </g>

        {/* Yellow lores — small wedge of yellow between cap edge and bill */}
        <path d="M 29 53 C 31 49 35 48 38 50 C 36 53 31 55 29 54 Z" fill="#FFEA00"/>

        {/* Olive nape — transitions cap to back smoothly */}
        <path d="M 57 51 C 65 51 71 55 73 63 C 65 61 58 57 57 53 Z" fill="#5A7A28"/>

        {/* Bill — fine, delicate, dark */}
        <path d="M 29 55 L 16 57 L 29 60 Z" fill="#C8B878"/>

        {/* Eye — dark, just at lower edge of cap, large-looking in small face */}
        <circle cx="44" cy="54" r="3.8" fill="#111111"/>
        <circle cx="43" cy="53" r="1.4" fill="white" opacity="0.88"/>

        {/* Legs — proportionally long for such a tiny bird */}
        <path d="M 49 100 L 46 114" stroke="#8B7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 65 114" stroke="#8B7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 46 114 L 39 117 M 46 114 L 46 119 M 46 114 L 51 117" stroke="#8B7040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 65 114 L 58 117 M 65 114 L 65 119 M 65 114 L 70 117" stroke="#8B7040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function BaybreastedWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Bay-breasted Warbler">
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — dark, black-streaked */}
        <path d="M 72 88 C 80 92 88 104 88 112 C 80 104 74 96 72 90" fill="#1a1a1a"/>
        {/* Body — buff/cream belly with rich chestnut flanks */}
        <ellipse cx="60" cy="82" rx="20" ry="16" fill="#F0EAD6"/>
        {/* Chestnut sides and breast — rich bay, extends from throat to flanks */}
        <path d="M 42 70 C 39 80 39 94 44 100 C 49 98 51 86 50 74 Z" fill="#7B3018" opacity="0.95"/>
        <path d="M 78 70 C 81 80 81 94 76 100 C 71 98 69 86 70 74 Z" fill="#7B3018" opacity="0.95"/>
        <path d="M 44 70 C 52 66 70 66 76 72 C 70 77 52 77 44 75 Z" fill="#7B3018" opacity="0.95"/>
        {/* Wing — dark with two clean white wing bars */}
        <path d="M 46 76 C 58 72 72 72 78 78 C 72 83 58 83 46 81 Z" fill="#2A2A2A" opacity="0.5"/>
        <path d="M 48 76 L 76 81" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.9"/>
        <path d="M 50 82 L 76 87" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"/>
        {/* Head — black mask, chestnut crown */}
        <circle cx="48" cy="56" r="16" fill="#1A1A1A"/>
        {/* Rich chestnut crown — the "bay" crown matches the breast */}
        <path d="M 33 49 C 35 37 52 33 61 39 C 61 48 55 52 43 52 Z" fill="#7B3018"/>
        {/* Buffy neck patch — pale buff sides of neck, distinctive */}
        <ellipse cx="55" cy="57" rx="7" ry="5.5" fill="#F0D090"/>
        {/* Bill */}
        <path d="M 32 54 L 22 56 L 32 59 Z" fill="#C8B878"/>
        {/* Eye */}
        <circle cx="46" cy="51" r="3.2" fill="#1A1A1A"/>
        <circle cx="45" cy="50" r="1.2" fill="white" opacity="0.9"/>
        {/* Legs with toes */}
        <path d="M 50 100 L 47 114" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 62 100 L 65 114" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 47 114 L 41 117 M 47 114 L 47 119 M 47 114 L 52 117" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 65 114 L 59 117 M 65 114 L 65 119 M 65 114 L 70 117" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function PrairieWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => setFrame(f => (f + 1) % 6), 360)
    return () => clearInterval(id)
  }, [animated])
  const bobY = animated ? [0, -3, -5, -3, 0, 2][frame] : 0

  return (
    <svg viewBox="0 0 120 132" width={size} height={size} style={style} aria-label="Prairie Warbler">
      <defs>
        <clipPath id="prwHeadClip"><circle cx="44" cy="54" r="17"/></clipPath>
        <clipPath id="prwBodyClip"><ellipse cx="56" cy="82" rx="22" ry="17"/></clipPath>
      </defs>
      <g transform={`translate(0, ${bobY})`}>
        {/* Tail — pumped upward constantly — key behavioral mark */}
        {/* Tilted up relative to body */}
        <path d="M 66 82 C 76 74 92 70 97 78 C 86 78 74 80 67 84" fill="#7A8A30"/>
        <path d="M 67 86 C 78 78 92 74 96 80 C 85 82 73 84 68 88" fill="#5A6A20" opacity="0.55"/>

        {/* Body — olive-green back */}
        <ellipse cx="56" cy="82" rx="22" ry="17" fill="#8A9A38"/>
        {/* Bright yellow underparts */}
        <ellipse cx="53" cy="89" rx="17" ry="11" fill="#FFE200"/>

        {/* RUFOUS BACK STREAKS — diagnostic, rusty-chestnut streaks on olive back */}
        <g clipPath="url(#prwBodyClip)">
          <path d="M 47 68 L 47 86" stroke="#8B3A08" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
          <path d="M 53 66 L 53 85" stroke="#8B3A08" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
          <path d="M 59 66 L 59 85" stroke="#8B3A08" strokeWidth="2.8" strokeLinecap="round" opacity="0.65"/>
          {/* Black flank streaks on yellow belly — distinct bold lines */}
          <path d="M 38 83 L 40 99" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"/>
          <path d="M 43 81 L 45 98" stroke="#111111" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
          <path d="M 70 83 L 68 97" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"/>
          <path d="M 74 81 L 72 97" stroke="#111111" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
        </g>

        {/* Head — rich golden yellow */}
        <circle cx="44" cy="54" r="17" fill="#FFE000"/>

        <g clipPath="url(#prwHeadClip)">
          {/* BLACK LORE STRIPE — runs from bill to eye */}
          <path d="M 27 52 C 29 47 36 45 42 48 C 38 51 31 52 27 54 Z" fill="#111111"/>

          {/* CURVED BLACK CHEEK CRESCENT — the unmistakable field mark */}
          {/* Runs from below eye in a C-curve down the cheek */}
          <path d="M 30 58 C 31 51 38 48 44 51 C 47 56 45 65 38 68 C 31 66 28 63 30 58 Z" fill="#111111"/>
          {/* Yellow area inside the crescent (pale center) */}
          <path d="M 34 58 C 35 54 39 52 43 54 C 45 58 43 64 39 66 C 35 64 33 62 34 58 Z" fill="#FFE000" opacity="0.3"/>

          {/* Yellow supercilium above lore/eye */}
          <path d="M 27 50 C 31 46 38 44 46 46 C 44 49 36 49 27 52 Z" fill="#FFF000"/>
        </g>

        {/* Bill — slender, pointed */}
        <path d="M 27 53 L 14 55.5 L 27 58 Z" fill="#C8B878"/>

        {/* Eye */}
        <circle cx="41" cy="51" r="3.8" fill="#111111"/>
        <circle cx="40" cy="50" r="1.4" fill="white" opacity="0.9"/>

        {/* Legs */}
        <path d="M 46 100 L 43 114" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 59 100 L 62 114" stroke="#8B7040" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 43 114 L 37 117 M 43 114 L 43 119 M 43 114 L 48 117" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 62 114 L 56 117 M 62 114 L 62 119 M 62 114 L 67 117" stroke="#8B7040" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Wrens ─────────────────────────────────────────────────────────────────────
export function CarolinaWrenAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 350); return () => clearInterval(id) }, [animated])
  const tailY = animated ? [-8,-12,-14,-12,-8,-6][frame] : -8
  const bodyY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Carolina Wren">
      <g transform={`translate(0,${bodyY})`}>
        <path d={`M 72 82 C 82 ${72+tailY} 96 ${68+tailY} 100 ${62+tailY} C 92 ${66+tailY} 80 ${74+tailY} 70 84`} fill="#8B4A1A"/>
        <line x1="75" y1="80" x2="95" y2={66+tailY} stroke="#5A2A08" strokeWidth="1.2" opacity="0.5"/>
        <line x1="78" y1="78" x2="96" y2={64+tailY} stroke="#5A2A08" strokeWidth="1" opacity="0.4"/>
        <ellipse cx="58" cy="86" rx="20" ry="14" fill="#F0D090"/>
        <ellipse cx="62" cy="80" rx="18" ry="11" fill="#8B4A1A"/>
        <path d="M 50 74 C 64 68 80 70 84 78 C 78 88 62 90 50 86 Z" fill="#7A3A12"/>
        <line x1="54" y1="73" x2="82" y2="76" stroke="#5A2A08" strokeWidth="1.2" opacity="0.5"/>
        <line x1="54" y1="77" x2="82" y2="80" stroke="#5A2A08" strokeWidth="1" opacity="0.4"/>
        <circle cx="42" cy="62" r="15" fill="#8B4A1A"/>
        <path d="M 28 57 C 34 54 42 53 52 55" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M 28 59 C 34 58 42 58 50 60" stroke="#3A1A04" strokeWidth="2" fill="none"/>
        <path d="M 27 62 L 13 64 L 27 67 Z" fill="#6A4020"/>
        <line x1="13" y1="64" x2="27" y2="64" stroke="#3A1A04" strokeWidth="0.8"/>
        <circle cx="40" cy="60" r="3.5" fill="#1A0A00"/>
        <circle cx="39" cy="59" r="1.2" fill="white" opacity="0.8"/>
        <path d="M 48 98 L 44 112" stroke="#6A4020" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 60 98 L 64 112" stroke="#6A4020" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 112 L 38 115 M 44 112 L 44 117 M 44 112 L 49 115" stroke="#6A4020" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 64 112 L 58 115 M 64 112 L 64 117 M 64 112 L 69 115" stroke="#6A4020" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function HouseWrenAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 380); return () => clearInterval(id) }, [animated])
  const tailY = animated ? [-6,-10,-12,-10,-6,-4][frame] : -6
  const bodyY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="House Wren">
      <g transform={`translate(0,${bodyY})`}>
        <path d={`M 72 84 C 82 ${74+tailY} 96 ${70+tailY} 100 ${64+tailY} C 92 ${68+tailY} 80 ${76+tailY} 70 86`} fill="#7A5A30"/>
        <line x1="76" y1="82" x2="97" y2={67+tailY} stroke="#4A3010" strokeWidth="1" opacity="0.4"/>
        <ellipse cx="58" cy="88" rx="19" ry="13" fill="#C8A870"/>
        <ellipse cx="62" cy="82" rx="17" ry="10" fill="#7A5A30"/>
        <path d="M 50 76 C 64 70 80 72 84 80 C 78 90 62 92 50 88 Z" fill="#6A4A20"/>
        <line x1="54" y1="75" x2="82" y2="78" stroke="#4A3010" strokeWidth="1" opacity="0.4"/>
        <line x1="54" y1="79" x2="82" y2="82" stroke="#4A3010" strokeWidth="0.9" opacity="0.35"/>
        <circle cx="42" cy="64" r="14" fill="#7A5A30"/>
        <path d="M 29 59 C 35 57 42 57 50 59" stroke="#C8A870" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M 28 64 L 14 66 L 28 69 Z" fill="#5A3A18"/>
        <line x1="14" y1="66" x2="28" y2="66" stroke="#3A2008" strokeWidth="0.8"/>
        <circle cx="40" cy="62" r="3.2" fill="#1A0800"/>
        <circle cx="39" cy="61" r="1.1" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#5A3A18" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 60 100 L 64 114" stroke="#5A3A18" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#5A3A18" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 64 114 L 58 117 M 64 114 L 64 119 M 64 114 L 69 117" stroke="#5A3A18" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Flycatchers ───────────────────────────────────────────────────────────────
export function EasternPhoebeAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 400); return () => clearInterval(id) }, [animated])
  const tailY = animated ? [0,4,8,10,6,2][frame] : 0
  const bodyY = animated ? [0,1,2,1,0,-1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Eastern Phoebe">
      <g transform={`translate(0,${bodyY})`}>
        <path d={`M 70 88 C 82 ${90+tailY} 96 ${96+tailY} 100 ${104+tailY} C 90 ${98+tailY} 78 ${92+tailY} 68 90`} fill="#3A3A3A"/>
        <path d={`M 68 90 C 76 ${102+tailY} 76 ${114+tailY} 72 ${120+tailY} C 68 ${112+tailY} 65 ${102+tailY} 66 92`} fill="#3A3A3A"/>
        <ellipse cx="58" cy="86" rx="21" ry="15" fill="#F0EEE8"/>
        <ellipse cx="62" cy="80" rx="19" ry="11" fill="#4A4A3A"/>
        <path d="M 50 74 C 64 68 82 70 86 80 C 80 90 62 92 50 88 Z" fill="#3A3A2A"/>
        <ellipse cx="42" cy="61" rx="16" ry="15" fill="#2A2A2A"/>
        <ellipse cx="42" cy="70" rx="9" ry="5" fill="#F0EEE8" opacity="0.9"/>
        <path d="M 26 61 L 12 63 L 26 67 Z" fill="#2A2A2A"/>
        <line x1="12" y1="63" x2="26" y2="63" stroke="#111" strokeWidth="1"/>
        <circle cx="40" cy="58" r="3.8" fill="#111"/>
        <circle cx="39" cy="57" r="1.3" fill="white" opacity="0.7"/>
        <path d="M 48 100 L 44 114" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function EasternWoodPeweeAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 500); return () => clearInterval(id) }, [animated])
  const lunge = animated ? [0,2,5,8,5,2,0,-2][frame] : 0
  const bodyY = animated ? [0,-1,-2,-2,-1,0,1,0][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Eastern Wood-Pewee">
      <g transform={`translate(${-lunge},${bodyY})`}>
        <path d="M 70 88 C 84 90 98 96 102 108 C 90 104 78 96 68 90" fill="#3A3A2A"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#3A3A2A"/>
        <ellipse cx="58" cy="86" rx="21" ry="15" fill="#E8E4D8"/>
        <ellipse cx="62" cy="80" rx="19" ry="11" fill="#5A5A40"/>
        <path d="M 50 74 C 64 68 82 70 86 80 C 80 90 62 92 50 88 Z" fill="#4A4A30"/>
        <path d="M 54 73 L 84 76" stroke="#C8C4A8" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 53 78 L 83 81" stroke="#C8C4A8" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="42" cy="61" rx="16" ry="14" fill="#5A5A40"/>
        <path d="M 26 61 L 11 63 L 26 67 Z" fill="#2A2A1A"/>
        <line x1="11" y1="63" x2="26" y2="63" stroke="#111" strokeWidth="0.9"/>
        <circle cx="40" cy="58" r="3.5" fill="#111"/>
        <circle cx="39" cy="57" r="1.2" fill="white" opacity="0.7"/>
        <path d="M 48 100 L 44 114" stroke="#4A4030" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#4A4030" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#4A4030" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#4A4030" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function GreatCrestedFlycatcherAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 450); return () => clearInterval(id) }, [animated])
  const crestH = animated ? [8,12,14,12,8,6][frame] : 8
  const bodyY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Great Crested Flycatcher">
      <g transform={`translate(0,${bodyY})`}>
        <path d="M 70 88 C 84 90 98 96 102 108 C 90 104 78 96 68 90" fill="#B05820"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#B05820"/>
        <ellipse cx="57" cy="88" rx="21" ry="16" fill="#E8C020"/>
        <ellipse cx="52" cy="78" rx="14" ry="10" fill="#8A8878"/>
        <ellipse cx="62" cy="78" rx="20" ry="12" fill="#5A6830"/>
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#4A5828"/>
        <path d="M 54 71 L 84 74" stroke="#B05820" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <path d="M 53 76 L 83 79" stroke="#B05820" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        <circle cx="43" cy="62" r="16" fill="#6A6858"/>
        <path d={`M 44 46 C 48 ${46-crestH} 56 ${44-crestH} 58 ${48-crestH} C 54 ${46-crestH/2} 48 50 44 52`} fill="#6A6858"/>
        <path d={`M 46 47 C 50 ${47-crestH+2} 56 ${46-crestH+2} 57 ${50-crestH+2}`} stroke="#4A4838" strokeWidth="1.5" fill="none"/>
        <path d="M 27 62 L 12 65 L 27 69 Z" fill="#2A2A1A"/>
        <line x1="12" y1="65" x2="27" y2="65" stroke="#111" strokeWidth="1"/>
        <circle cx="41" cy="59" r="4" fill="#111"/>
        <circle cx="40" cy="58" r="1.4" fill="white" opacity="0.75"/>
        <path d="M 48 102 L 44 116" stroke="#4A3820" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 102 L 66 116" stroke="#4A3820" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 116 L 38 119 M 44 116 L 44 121 M 44 116 L 49 119" stroke="#4A3820" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 116 L 60 119 M 66 116 L 66 121 M 66 116 L 71 119" stroke="#4A3820" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function EasternKingbirdAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 600); return () => clearInterval(id) }, [animated])
  const lean = animated ? [0,2,4,2,0,-2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Eastern Kingbird">
      <g transform={`rotate(${lean}, 58, 80)`}>
        <path d="M 70 88 C 84 90 100 94 104 104 C 92 102 80 96 68 90" fill="#1A1A1A"/>
        <path d="M 68 90 C 76 102 76 116 72 122 C 68 114 65 102 66 92" fill="#1A1A1A"/>
        <path d="M 76 110 C 86 112 100 114 104 118 C 96 116 84 112 74 108 Z" fill="#F5F5F5"/>
        <path d="M 73 114 C 73 118 72 122 70 124 C 69 120 69 116 70 112 Z" fill="#F5F5F5"/>
        <ellipse cx="56" cy="88" rx="21" ry="16" fill="#F5F5F5"/>
        <ellipse cx="62" cy="78" rx="19" ry="12" fill="#1A1A1A"/>
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#111111"/>
        <circle cx="43" cy="60" r="16" fill="#111111"/>
        <ellipse cx="46" cy="50" rx="5" ry="2" fill="#E07000" opacity="0.5"/>
        <path d="M 27 60 L 12 62 L 27 66 Z" fill="#1A1A1A"/>
        <line x1="12" y1="62" x2="27" y2="62" stroke="#000" strokeWidth="1"/>
        <circle cx="41" cy="57" r="3.8" fill="#111"/>
        <circle cx="40" cy="56" r="1.3" fill="white" opacity="0.7"/>
        <path d="M 48 102 L 44 116" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 102 L 66 116" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 116 L 38 119 M 44 116 L 44 121 M 44 116 L 49 119" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 116 L 60 119 M 66 116 L 66 121 M 66 116 L 71 119" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Owls ──────────────────────────────────────────────────────────────────────
export function BarredOwlAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 700); return () => clearInterval(id) }, [animated])
  const headRot = animated ? [0,5,10,15,10,5,0,-5][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Barred Owl">
      <ellipse cx="60" cy="88" rx="28" ry="30" fill="#7A5A30"/>
      {[72,76,80,84].map(y => <line key={y} x1="36" y1={y} x2="82" y2={y} stroke="#3A2808" strokeWidth="2.5" opacity="0.5"/>)}
      {[44,50,56,62,68,74].map(x => <line key={x} x1={x} y1="86" x2={x-2} y2="114" stroke="#3A2808" strokeWidth="1.5" opacity="0.4"/>)}
      <path d="M 34 78 C 28 90 26 104 30 116 C 38 108 44 96 44 82 Z" fill="#6A4A20"/>
      <path d="M 82 78 C 88 90 90 104 86 116 C 78 108 74 96 74 82 Z" fill="#6A4A20"/>
      <g transform={`rotate(${headRot}, 60, 58)`}>
        <ellipse cx="60" cy="60" rx="26" ry="24" fill="#D8C090"/>
        <ellipse cx="60" cy="60" rx="22" ry="20" fill="none" stroke="#7A5A30" strokeWidth="2"/>
        <ellipse cx="60" cy="60" rx="16" ry="14" fill="#C8A870"/>
        <circle cx="50" cy="57" r="7" fill="#1A0A00"/>
        <circle cx="70" cy="57" r="7" fill="#1A0A00"/>
        <circle cx="50" cy="57" r="4.5" fill="#2A1000"/>
        <circle cx="70" cy="57" r="4.5" fill="#2A1000"/>
        <circle cx="49" cy="55" r="1.8" fill="white" opacity="0.6"/>
        <circle cx="69" cy="55" r="1.8" fill="white" opacity="0.6"/>
        <path d="M 55 65 C 57 70 63 70 65 65 C 63 68 57 68 55 65 Z" fill="#C8A020"/>
      </g>
      <path d="M 46 116 L 40 126 M 46 116 L 46 127 M 46 116 L 52 126" stroke="#8B6030" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 72 116 L 66 126 M 72 116 L 72 127 M 72 116 L 78 126" stroke="#8B6030" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

export function GreatHornedOwlAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 800); return () => clearInterval(id) }, [animated])
  const headRot = animated ? [0,8,15,20,15,8,0,-8][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Great Horned Owl">
      <ellipse cx="60" cy="90" rx="30" ry="32" fill="#8B6030"/>
      {[74,78,82,86,90,94,98].map(y => <line key={y} x1="34" y1={y} x2="86" y2={y} stroke="#5A3A10" strokeWidth="1.8" opacity="0.45"/>)}
      <path d="M 32 80 C 26 92 24 108 28 120 C 36 112 42 98 42 84 Z" fill="#7A5020"/>
      <path d="M 86 80 C 92 92 94 108 90 120 C 82 112 76 98 76 84 Z" fill="#7A5020"/>
      <ellipse cx="60" cy="76" rx="14" ry="8" fill="#F0EEE0"/>
      <g transform={`rotate(${headRot}, 60, 55)`}>
        <ellipse cx="60" cy="56" rx="25" ry="23" fill="#C87830"/>
        <ellipse cx="60" cy="56" rx="19" ry="17" fill="#E09040"/>
        <path d="M 44 34 C 42 24 44 16 48 12 C 48 20 46 28 46 34 Z" fill="#5A3A10"/>
        <path d="M 76 34 C 78 24 76 16 72 12 C 72 20 74 28 74 34 Z" fill="#5A3A10"/>
        <circle cx="50" cy="54" r="8" fill="#E8A000"/>
        <circle cx="70" cy="54" r="8" fill="#E8A000"/>
        <circle cx="50" cy="54" r="5" fill="#1A0A00"/>
        <circle cx="70" cy="54" r="5" fill="#1A0A00"/>
        <circle cx="48" cy="52" r="2" fill="white" opacity="0.7"/>
        <circle cx="68" cy="52" r="2" fill="white" opacity="0.7"/>
        <path d="M 55 64 C 57 70 63 70 65 64 C 63 68 57 68 55 64 Z" fill="#D4A020"/>
      </g>
      <path d="M 46 120 L 38 128 M 46 120 L 46 129 M 46 120 L 54 128" stroke="#8B6030" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 74 120 L 66 128 M 74 120 L 74 129 M 74 120 L 82 128" stroke="#8B6030" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

// ── Waterfowl ─────────────────────────────────────────────────────────────────
export function WoodDuckAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 500); return () => clearInterval(id) }, [animated])
  // Iridescent head color shifts
  const iridColor = animated ? ['#1A7040','#205A80','#1A7040','#30208A','#1A7040','#205A80','#30208A','#1A7040'][frame] : '#1A7040'
  const bodyY = animated ? [0,-1,-2,-1,0,1,2,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Wood Duck">
      <g transform={`translate(0,${bodyY})`}>
        {/* Long tail */}
        <path d="M 72 88 C 86 90 102 96 106 108 C 94 104 80 96 70 90" fill="#3A2A1A"/>
        {/* Body — iridescent flanks */}
        <ellipse cx="58" cy="88" rx="24" ry="16" fill="#C8A050"/>
        {/* Chestnut breast with white spots */}
        <path d="M 36 78 C 38 68 46 64 54 68 C 60 72 60 84 54 90 C 46 94 34 88 36 78 Z" fill="#7A2808"/>
        <circle cx="42" cy="74" r="2.5" fill="white" opacity="0.7"/>
        <circle cx="46" cy="80" r="2" fill="white" opacity="0.6"/>
        <circle cx="40" cy="80" r="1.8" fill="white" opacity="0.6"/>
        {/* White belly */}
        <ellipse cx="52" cy="94" rx="12" ry="7" fill="#F0EEE0"/>
        {/* Wings — iridescent blue-green */}
        <path d="M 50 72 C 64 66 84 68 88 78 C 82 92 64 94 50 90 Z" fill="#1A5040"/>
        {/* Head — spectacular iridescent green-purple */}
        <circle cx="42" cy="60" r="18" fill={iridColor}/>
        {/* White facial stripe from bill back */}
        <path d="M 24 58 C 30 54 38 52 50 54 C 52 58 50 62 48 62 C 38 60 28 62 24 58 Z" fill="white" opacity="0.9"/>
        {/* White stripe from eye back */}
        <path d="M 38 50 C 44 46 54 44 58 46" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9"/>
        {/* Red eye */}
        <circle cx="38" cy="55" r="4.5" fill="#CC2000"/>
        <circle cx="37" cy="54" r="1.6" fill="white" opacity="0.6"/>
        {/* Red bill with yellow base */}
        <path d="M 24 60 L 10 61 L 24 66 Z" fill="#CC3000"/>
        <path d="M 24 60 L 26 61 L 24 66 Z" fill="#E8A000"/>
        <line x1="10" y1="61" x2="24" y2="61" stroke="#AA2000" strokeWidth="0.8"/>
        {/* Crest flowing back */}
        <path d="M 44 46 C 54 40 66 38 68 42 C 60 42 52 46 46 50" fill={iridColor}/>
        {/* Legs */}
        <path d="M 48 102 L 44 116" stroke="#8B6030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 64 102 L 68 116" stroke="#8B6030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 44 116 L 38 119 M 44 116 L 44 121 M 44 116 L 50 119" stroke="#8B6030" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 68 116 L 62 119 M 68 116 L 68 121 M 68 116 L 74 119" stroke="#8B6030" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Hawks ─────────────────────────────────────────────────────────────────────
export function CoopersHawkAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 600); return () => clearInterval(id) }, [animated])
  const headTilt = animated ? [0,4,8,4,0,-4][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Cooper's Hawk">
      <g>
        {/* Rounded tail with dark bands */}
        <path d="M 70 86 C 84 88 102 92 108 104 C 96 102 80 96 68 90" fill="#7A7A7A"/>
        <path d="M 68 90 C 78 102 80 116 76 124 C 70 116 66 102 66 92" fill="#7A7A7A"/>
        <line x1="70" y1="104" x2="108" y2="108" stroke="#2A2A2A" strokeWidth="2" opacity="0.5"/>
        <line x1="70" y1="112" x2="104" y2="116" stroke="#2A2A2A" strokeWidth="2" opacity="0.5"/>
        {/* Body */}
        <ellipse cx="58" cy="86" rx="22" ry="16" fill="#F0E8D8"/>
        {/* Orange barring on white breast */}
        {[76,80,84,88,92].map(y => <path key={y} d={`M 38 ${y} C 48 ${y-2} 58 ${y-1} 70 ${y}`} stroke="#C07030" strokeWidth="2.5" fill="none" opacity="0.7"/>)}
        {/* Blue-gray back */}
        <ellipse cx="62" cy="78" rx="20" ry="12" fill="#6A7A8A"/>
        {/* Wings */}
        <path d="M 50 72 C 64 66 84 68 88 78 C 82 90 64 92 50 88 Z" fill="#5A6A7A"/>
        {/* Head — dark cap, paler nape */}
        <g transform={`rotate(${headTilt}, 42, 60)`}>
          <circle cx="42" cy="60" r="17" fill="#8A9AAA"/>
          {/* Dark cap */}
          <ellipse cx="42" cy="52" rx="15" ry="10" fill="#2A3040"/>
          {/* Red eye — adult */}
          <circle cx="40" cy="58" r="4.5" fill="#CC4000"/>
          <circle cx="39" cy="57" r="1.6" fill="white" opacity="0.6"/>
          {/* Hooked bill */}
          <path d="M 26 60 L 12 58 C 14 64 20 66 26 65 Z" fill="#D0C080"/>
          <path d="M 26 60 L 12 58 L 13 62 L 26 63" fill="#B0A060" opacity="0.5"/>
        </g>
        <path d="M 48 100 L 44 114" stroke="#D0B060" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#D0B060" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#D0B060" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#D0B060" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function SharpShinnedHawkAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 550); return () => clearInterval(id) }, [animated])
  const headTilt = animated ? [0,5,8,5,0,-3][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Sharp-shinned Hawk">
      <g>
        {/* Square-tipped tail — key difference from Cooper's */}
        <path d="M 68 88 C 82 88 100 90 106 100 C 94 100 78 96 66 90" fill="#7A7A7A"/>
        <path d="M 66 90 C 74 102 74 114 70 120 C 66 112 64 100 64 92" fill="#7A7A7A"/>
        {/* Square tip (flat end) */}
        <line x1="66" y1="120" x2="106" y2="120" stroke="#7A7A7A" strokeWidth="3"/>
        <line x1="70" y1="104" x2="106" y2="108" stroke="#2A2A2A" strokeWidth="2" opacity="0.5"/>
        <line x1="70" y1="112" x2="104" y2="116" stroke="#2A2A2A" strokeWidth="2" opacity="0.5"/>
        <ellipse cx="56" cy="86" rx="20" ry="15" fill="#F0E8D8"/>
        {[76,80,84,88,92].map(y => <path key={y} d={`M 38 ${y} C 48 ${y-2} 56 ${y-1} 68 ${y}`} stroke="#C07030" strokeWidth="2" fill="none" opacity="0.7"/>)}
        <ellipse cx="60" cy="78" rx="18" ry="11" fill="#6A7A8A"/>
        <path d="M 48 72 C 62 66 82 68 86 78 C 80 90 62 92 48 88 Z" fill="#5A6A7A"/>
        <g transform={`rotate(${headTilt}, 40, 60)`}>
          <circle cx="40" cy="60" r="15" fill="#8A9AAA"/>
          <ellipse cx="40" cy="52" rx="13" ry="9" fill="#2A3040"/>
          <circle cx="38" cy="58" r="4" fill="#CC4000"/>
          <circle cx="37" cy="57" r="1.4" fill="white" opacity="0.6"/>
          <path d="M 25 60 L 11 58 C 13 64 18 65 25 64 Z" fill="#D0C080"/>
        </g>
        <path d="M 46 100 L 42 114" stroke="#D0B060" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 60 100 L 64 114" stroke="#D0B060" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 42 114 L 36 117 M 42 114 L 42 119 M 42 114 L 47 117" stroke="#D0B060" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 64 114 L 58 117 M 64 114 L 64 119 M 64 114 L 69 117" stroke="#D0B060" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Woodpeckers ───────────────────────────────────────────────────────────────
export function RedBelliedWoodpeckerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 300); return () => clearInterval(id) }, [animated])
  const peckX = animated ? [0,-2,-5,-8,-5,-2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Red-bellied Woodpecker">
      <g>
        {/* Stiff tail bracing against tree */}
        <path d="M 68 92 C 74 100 76 112 74 120 C 70 112 66 102 66 94" fill="#3A3020"/>
        {/* Body */}
        <ellipse cx="58" cy="86" rx="20" ry="18" fill="#F0EEE0"/>
        {/* Ladder-back — black and white barring, the zebra back */}
        <ellipse cx="64" cy="80" rx="18" ry="12" fill="#F0F0E8"/>
        {[68,72,76,80,84].map((y,i) => <line key={i} x1="50" y1={y} x2="82" y2={y} stroke="#1A1A1A" strokeWidth="2.5" opacity="0.8"/>)}
        {/* Wings */}
        <path d="M 52 72 C 66 66 82 68 86 78 C 80 92 62 94 52 90 Z" fill="#2A2A2A"/>
        {[73,77,81,85].map((y,i) => <line key={i} x1="54" y1={y} x2="84" y2={y} stroke="#F0F0E8" strokeWidth="2" opacity="0.7"/>)}
        {/* Faint red belly wash */}
        <ellipse cx="50" cy="94" rx="10" ry="7" fill="#E07878" opacity="0.3"/>
        {/* Head — pale with RED cap all the way down nape */}
        <g transform={`translate(${peckX}, 0)`}>
          <circle cx="42" cy="60" r="16" fill="#D0C8B0"/>
          {/* Red cap */}
          <path d="M 30 54 C 32 44 40 40 50 42 C 56 44 58 50 56 56 C 50 52 40 50 30 54 Z" fill="#CC1010"/>
          <path d="M 42 60 C 50 56 58 56 58 60" fill="#CC1010"/>
          {/* Bill — long, chisel */}
          <path d="M 26 61 L 8 60 L 26 65 Z" fill="#4A4030"/>
          <line x1="8" y1="60" x2="26" y2="60" stroke="#1A1A1A" strokeWidth="1"/>
          {/* Eye */}
          <circle cx="40" cy="58" r="3.8" fill="#7A1A00"/>
          <circle cx="39" cy="57" r="1.3" fill="white" opacity="0.7"/>
        </g>
        <path d="M 48 104 L 44 118" stroke="#6A5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 104 L 66 118" stroke="#6A5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 118 L 38 121 M 44 118 L 44 123 M 44 118 L 49 121" stroke="#6A5A30" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 118 L 60 121 M 66 118 L 66 123 M 66 118 L 71 121" stroke="#6A5A30" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function PileatedWoodpeckerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 250); return () => clearInterval(id) }, [animated])
  const peckX = animated ? [0,-3,-7,-10,-7,-3][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Pileated Woodpecker">
      <g>
        <path d="M 68 94 C 74 102 76 116 74 124 C 70 116 66 104 66 96" fill="#1A1A1A"/>
        {/* Large black body */}
        <ellipse cx="58" cy="88" rx="22" ry="20" fill="#1A1A1A"/>
        {/* White wing linings / neck stripe */}
        <path d="M 42 72 C 36 76 32 84 32 94 C 36 90 40 82 46 78 Z" fill="#F5F5F5" opacity="0.85"/>
        <path d="M 76 72 C 82 76 86 84 86 94 C 82 90 78 82 72 78 Z" fill="#F5F5F5" opacity="0.5"/>
        {/* Wings */}
        <path d="M 50 72 C 64 66 84 68 88 80 C 82 94 64 96 50 92 Z" fill="#111"/>
        {/* Head — large with FLAMING red triangular crest */}
        <g transform={`translate(${peckX}, 0)`}>
          <circle cx="44" cy="60" r="17" fill="#1A1A1A"/>
          {/* White face stripe */}
          <path d="M 28 62 C 32 56 40 52 50 54 C 52 58 50 62 48 64 C 40 62 30 66 28 62 Z" fill="#F5F5F5"/>
          {/* Red malar stripe (male) */}
          <path d="M 28 66 C 30 70 36 72 40 70" stroke="#CC1010" strokeWidth="2.5" fill="none"/>
          {/* HUGE red crest — triangular */}
          <path d="M 36 44 C 40 30 50 18 56 14 C 56 24 52 34 48 42 C 46 46 42 48 36 44 Z" fill="#CC1010"/>
          {/* Bill — massive chisel */}
          <path d="M 27 62 L 6 60 L 27 67 Z" fill="#5A5030"/>
          <line x1="6" y1="60" x2="27" y2="60" stroke="#1A1A1A" strokeWidth="1.2"/>
          {/* Eye */}
          <circle cx="42" cy="58" r="4" fill="#E8C000"/>
          <circle cx="41" cy="57" r="1.5" fill="#1A1A1A"/>
          <circle cx="40" cy="56" r="0.8" fill="white" opacity="0.7"/>
        </g>
        <path d="M 48 106 L 44 120" stroke="#5A5030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 64 106 L 68 120" stroke="#5A5030" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M 44 120 L 38 123 M 44 120 L 44 125 M 44 120 L 49 123" stroke="#5A5030" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 68 120 L 62 123 M 68 120 L 68 125 M 68 120 L 73 123" stroke="#5A5030" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function YellowBelliedSapsuckerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 400); return () => clearInterval(id) }, [animated])
  const peckX = animated ? [0,-2,-4,-6,-4,-2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Yellow-bellied Sapsucker">
      <g>
        <path d="M 68 92 C 74 100 76 112 74 118 C 70 112 66 102 66 94" fill="#3A3020"/>
        <ellipse cx="58" cy="86" rx="20" ry="17" fill="#E8E800"/>
        {/* Black back with white scapular stripe */}
        <ellipse cx="62" cy="80" rx="18" ry="11" fill="#1A1A1A"/>
        {/* Long white wing stripe — diagnostic */}
        <path d="M 52 68 C 56 66 70 66 82 70 C 80 76 66 78 52 76 Z" fill="#F5F5F5"/>
        {/* Wings — black */}
        <path d="M 50 72 C 64 66 84 68 88 78 C 82 92 64 94 50 90 Z" fill="#1A1A1A"/>
        {/* Yellow belly */}
        <ellipse cx="50" cy="92" rx="14" ry="9" fill="#E8D020"/>
        {/* Head */}
        <g transform={`translate(${peckX}, 0)`}>
          <circle cx="42" cy="60" r="16" fill="#1A1A1A"/>
          {/* White face stripes */}
          <path d="M 30 54 C 36 50 46 50 54 54" stroke="white" strokeWidth="2.5" fill="none"/>
          <path d="M 30 68 C 36 70 44 70 52 68" stroke="white" strokeWidth="2.5" fill="none"/>
          {/* Red forehead */}
          <path d="M 32 48 C 34 42 42 40 50 42 C 52 46 48 50 42 50 C 36 50 32 50 32 48 Z" fill="#CC1010"/>
          {/* Red throat (male) */}
          <path d="M 30 64 C 32 68 38 70 44 68 C 44 64 38 62 30 64 Z" fill="#CC1010"/>
          {/* Bill */}
          <path d="M 26 60 L 10 59 L 26 64 Z" fill="#4A4030"/>
          <line x1="10" y1="59" x2="26" y2="59" stroke="#1A1A1A" strokeWidth="0.9"/>
          {/* Eye */}
          <circle cx="40" cy="57" r="3.5" fill="#1A0800"/>
          <circle cx="39" cy="56" r="1.2" fill="white" opacity="0.7"/>
        </g>
        <path d="M 48 102 L 44 116" stroke="#5A4A20" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 102 L 66 116" stroke="#5A4A20" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 116 L 38 119 M 44 116 L 44 121 M 44 116 L 49 119" stroke="#5A4A20" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 116 L 60 119 M 66 116 L 66 121 M 66 116 L 71 119" stroke="#5A4A20" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Thrushes ──────────────────────────────────────────────────────────────────
export function HermitThrushAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 8), 600); return () => clearInterval(id) }, [animated])
  // Slowly raises then lowers tail — the hermit thrush signature move
  const tailRaise = animated ? [0,-4,-8,-12,-10,-6,-2,0][frame] : 0
  const bodyY = animated ? [0,0,-1,-1,-1,0,0,0][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Hermit Thrush">
      <g transform={`translate(0,${bodyY})`}>
        {/* RUFOUS tail — contrasts strongly with olive back */}
        <path d={`M 70 86 C 84 ${82+tailRaise} 100 ${80+tailRaise} 106 ${78+tailRaise} C 98 ${82+tailRaise} 84 ${86+tailRaise} 68 90`} fill="#B05020"/>
        <path d={`M 68 90 C 78 ${96+tailRaise} 78 ${108+tailRaise} 74 ${114+tailRaise} C 70 ${108+tailRaise} 66 ${96+tailRaise} 66 92`} fill="#B05020"/>
        {/* Body — olive-brown back, spotted breast */}
        <ellipse cx="58" cy="86" rx="21" ry="15" fill="#E8E0C8"/>
        {/* Bold breast spots */}
        {[[40,78],[46,74],[52,72],[38,84],[44,82],[50,80],[42,90],[48,88]].map(([x,y],i) =>
          <ellipse key={i} cx={x} cy={y} rx="3" ry="3.5" fill="#6A4020" opacity="0.75"/>
        )}
        {/* Olive-brown back */}
        <ellipse cx="62" cy="78" rx="19" ry="11" fill="#7A6A40"/>
        {/* Wings — olive, slightly darker */}
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#6A5A30"/>
        {/* Head — olive-brown */}
        <circle cx="42" cy="62" r="16" fill="#7A6A40"/>
        {/* Eye ring */}
        <circle cx="40" cy="59" r="5.5" fill="none" stroke="#E8E0C8" strokeWidth="2"/>
        {/* Bill — thin thrush bill */}
        <path d="M 26 62 L 12 64 L 26 67 Z" fill="#5A4A28"/>
        <line x1="12" y1="64" x2="26" y2="64" stroke="#2A1A08" strokeWidth="0.9"/>
        {/* Eye */}
        <circle cx="40" cy="59" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="58" r="1.2" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#8B6A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#8B6A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#8B6A30" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#8B6A30" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function VeeryAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 550); return () => clearInterval(id) }, [animated])
  const bodyY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Veery">
      <g transform={`translate(0,${bodyY})`}>
        {/* Tail — uniform tawny, no rufous contrast */}
        <path d="M 70 88 C 84 90 100 96 104 108 C 92 104 78 96 68 90" fill="#B08050"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#B08050"/>
        {/* Body — warm buffy wash on breast */}
        <ellipse cx="58" cy="86" rx="21" ry="15" fill="#ECD8B0"/>
        {/* Very faint, indistinct spots — much less than Hermit */}
        {[[42,76],[48,74],[38,82],[44,80],[50,78]].map(([x,y],i) =>
          <ellipse key={i} cx={x} cy={y} rx="2.5" ry="3" fill="#8A6030" opacity="0.35"/>
        )}
        {/* Warm tawny-cinnamon back — uniform color, key ID */}
        <ellipse cx="62" cy="78" rx="19" ry="11" fill="#B08050"/>
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#A07040"/>
        {/* Head — same warm tawny color */}
        <circle cx="42" cy="62" r="16" fill="#B08050"/>
        {/* Faint eye ring */}
        <circle cx="40" cy="59" r="5" fill="none" stroke="#ECD8B0" strokeWidth="1.5" opacity="0.5"/>
        <path d="M 26 62 L 12 64 L 26 67 Z" fill="#6A5030"/>
        <line x1="12" y1="64" x2="26" y2="64" stroke="#3A2010" strokeWidth="0.9"/>
        <circle cx="40" cy="59" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="58" r="1.2" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#9A7040" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#9A7040" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function VariedThrushAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 500); return () => clearInterval(id) }, [animated])
  const bodyY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Varied Thrush">
      <g transform={`translate(0,${bodyY})`}>
        <path d="M 70 88 C 84 90 100 96 104 108 C 92 104 78 96 68 90" fill="#4A5878"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#4A5878"/>
        {/* Orange breast */}
        <ellipse cx="57" cy="86" rx="21" ry="16" fill="#E07030"/>
        {/* BLACK breast band — key feature */}
        <path d="M 36 78 C 40 74 50 72 60 74 C 66 76 70 80 68 84 C 60 80 46 80 36 84 Z" fill="#1A1A1A"/>
        {/* Blue-gray back */}
        <ellipse cx="62" cy="78" rx="20" ry="12" fill="#4A5878"/>
        {/* Wings — gray with ORANGE wing bars */}
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#4A5878"/>
        <path d="M 54 71 L 84 74" stroke="#E07030" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 53 76 L 83 79" stroke="#E07030" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Head — blue-gray */}
        <circle cx="42" cy="61" r="16" fill="#4A5878"/>
        {/* ORANGE supercilium — key feature */}
        <path d="M 28 55 C 34 51 42 50 52 52" stroke="#E07030" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* Bill */}
        <path d="M 26 62 L 12 64 L 26 67 Z" fill="#4A4030"/>
        <line x1="12" y1="64" x2="26" y2="64" stroke="#1A1A1A" strokeWidth="0.9"/>
        {/* Eye */}
        <circle cx="40" cy="59" r="3.8" fill="#1A0800"/>
        <circle cx="39" cy="58" r="1.3" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#6A6880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#6A6880" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#6A6880" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#6A6880" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Sparrows & Ground Warblers ─────────────────────────────────────────────────
export function WhiteThroatedSparrowAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 400); return () => clearInterval(id) }, [animated])
  const hopX = animated ? [0,2,4,2,0,-2][frame] : 0
  const bodyY = animated ? [0,-2,-4,-2,0,2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="White-throated Sparrow">
      <g transform={`translate(${hopX},${bodyY})`}>
        <path d="M 70 88 C 84 90 100 96 104 108 C 92 104 78 96 68 90" fill="#7A5A30"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#7A5A30"/>
        {/* Body — gray breast, streaked flanks */}
        <ellipse cx="58" cy="86" rx="21" ry="15" fill="#C8C0B0"/>
        {/* Brown streaked back */}
        <ellipse cx="62" cy="78" rx="19" ry="11" fill="#9A7040"/>
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#8A6030"/>
        {[68,72,76].map((y,i) => <path key={i} d={`M 52 ${y} C 64 ${y-1} 76 ${y-1} 84 ${y}`} stroke="#5A3810" strokeWidth="1.5" fill="none" opacity="0.5"/>)}
        {/* Head — bold black and white crown stripes */}
        <circle cx="42" cy="62" r="16" fill="#9A7040"/>
        {/* White median crown stripe */}
        <path d="M 30 56 C 36 52 44 50 52 52" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* Black lateral crown stripes */}
        <path d="M 30 53 C 36 49 44 48 52 50" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
        <path d="M 30 59 C 36 57 44 56 52 57" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
        {/* YELLOW lores — distinctive */}
        <circle cx="36" cy="61" r="3" fill="#E8D020"/>
        {/* White throat patch */}
        <path d="M 28 66 C 32 62 38 62 44 64 C 44 68 38 70 28 68 Z" fill="white"/>
        {/* Bill — conical sparrow */}
        <path d="M 26 62 L 12 64 L 26 68 Z" fill="#8A7050"/>
        <line x1="12" y1="64" x2="26" y2="64" stroke="#3A2808" strokeWidth="0.9"/>
        {/* Eye */}
        <circle cx="40" cy="60" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="59" r="1.2" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#7A5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#7A5A30" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#7A5A30" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#7A5A30" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function OvenbirdAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 450); return () => clearInterval(id) }, [animated])
  const stepX = animated ? [0,3,6,3,0,-3][frame] : 0
  const bodyY = animated ? [0,-1,-2,-1,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Ovenbird">
      <g transform={`translate(${stepX},${bodyY})`}>
        <path d="M 70 88 C 84 90 100 96 104 108 C 92 104 78 96 68 90" fill="#7A6A30"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#7A6A30"/>
        {/* Body — white with bold black streaks */}
        <ellipse cx="58" cy="86" rx="21" ry="15" fill="#F0EEE0"/>
        {[76,80,84,88].map((y,i) => <path key={i} d={`M 38 ${y} C 50 ${y-1} 64 ${y-1} 72 ${y}`} stroke="#3A2808" strokeWidth="2.5" fill="none" opacity="0.7"/>)}
        {/* Olive-green back */}
        <ellipse cx="62" cy="78" rx="19" ry="11" fill="#6A7030"/>
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#5A6020"/>
        {/* Head — olive with ORANGE crown stripe bordered by black */}
        <circle cx="42" cy="62" r="16" fill="#6A7030"/>
        {/* Black lateral crown stripes */}
        <path d="M 30 56 C 36 52 44 50 52 52" stroke="#1A1A1A" strokeWidth="3" fill="none"/>
        <path d="M 30 60 C 36 58 44 57 52 58" stroke="#1A1A1A" strokeWidth="2.5" fill="none"/>
        {/* Orange crown stripe */}
        <path d="M 31 58 C 37 55 44 54 51 55" stroke="#E06000" strokeWidth="2.5" fill="none"/>
        {/* Bold white eye ring */}
        <circle cx="40" cy="59" r="6" fill="none" stroke="white" strokeWidth="2.5"/>
        <path d="M 26 63 L 12 65 L 26 68 Z" fill="#8A7050"/>
        <line x1="12" y1="65" x2="26" y2="65" stroke="#3A2808" strokeWidth="0.9"/>
        <circle cx="40" cy="59" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="58" r="1.2" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#7A6A40" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#7A6A40" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function LouisianaWaterthrushAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 380); return () => clearInterval(id) }, [animated])
  // Bobs the rear end UP — distinctive behavior
  const rearY = animated ? [0,-3,-6,-8,-5,-2][frame] : 0
  const stepX = animated ? [0,2,3,2,0,-2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Louisiana Waterthrush">
      <g transform={`translate(${stepX},0)`}>
        {/* Rear and tail bob UP */}
        <g transform={`translate(0,${rearY})`}>
          <path d="M 70 86 C 84 84 100 88 104 98 C 92 96 78 90 68 88" fill="#7A5A30"/>
          <path d="M 68 88 C 76 98 76 110 72 116 C 68 108 65 96 66 90" fill="#7A5A30"/>
        </g>
        {/* Body — streaked below */}
        <ellipse cx="58" cy="88" rx="21" ry="14" fill="#F0EEE0"/>
        {[80,84,88].map((y,i) => <path key={i} d={`M 38 ${y} C 50 ${y-1} 62 ${y-1} 70 ${y}`} stroke="#7A5A30" strokeWidth="2" fill="none" opacity="0.6"/>)}
        {/* Brown back */}
        <ellipse cx="62" cy="80" rx="19" ry="11" fill="#7A5A30"/>
        <path d="M 50 74 C 64 68 82 70 86 80 C 80 90 62 92 50 88 Z" fill="#6A4A20"/>
        {/* Head */}
        <circle cx="42" cy="63" r="15" fill="#7A5A30"/>
        {/* Bold white supercilium — wider behind eye */}
        <path d="M 28 58 C 34 54 42 53 52 55 C 56 57 58 61 56 63 C 50 59 40 58 28 60 Z" fill="white"/>
        <path d="M 26 62 L 12 64 L 26 67 Z" fill="#6A5030"/>
        <line x1="12" y1="64" x2="26" y2="64" stroke="#2A1A08" strokeWidth="0.9"/>
        <circle cx="40" cy="61" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="60" r="1.2" fill="white" opacity="0.75"/>
        {/* Pinkish legs */}
        <path d="M 48 100 L 44 114" stroke="#D0A080" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#D0A080" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#D0A080" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#D0A080" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── More Warblers ─────────────────────────────────────────────────────────────
export function BlueWingedWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 400); return () => clearInterval(id) }, [animated])
  const bobY = animated ? [0,-2,-4,-2,0,2][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Blue-winged Warbler">
      <g transform={`translate(0,${bobY})`}>
        <path d="M 70 88 C 84 90 100 96 104 108 C 92 104 78 96 68 90" fill="#7A8898"/>
        <path d="M 68 90 C 76 102 76 114 72 120 C 68 112 65 100 66 92" fill="#7A8898"/>
        {/* Bright yellow body */}
        <ellipse cx="57" cy="86" rx="21" ry="15" fill="#E8C820"/>
        {/* Blue-gray wings with two white wingbars */}
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#6A7888"/>
        <path d="M 54 71 L 84 74" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 53 76 L 83 79" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        {/* Yellow-olive back */}
        <ellipse cx="62" cy="78" rx="19" ry="11" fill="#9AA830"/>
        {/* Head — yellow */}
        <circle cx="42" cy="62" r="16" fill="#E8C820"/>
        {/* Black eye line — thin and sharp */}
        <path d="M 26 62 C 32 60 40 59 50 61" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Bill — thin */}
        <path d="M 26 63 L 11 64 L 26 67 Z" fill="#4A4020"/>
        <line x1="11" y1="64" x2="26" y2="64" stroke="#1A1A1A" strokeWidth="0.9"/>
        {/* Eye */}
        <circle cx="40" cy="60" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="59" r="1.2" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#8A8060" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#8A8060" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#8A8060" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#8A8060" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

export function KirtlandsWarblerAvatar({ size = 120, animated = false, style = {} }) {
  const [frame, setFrame] = useState(0)
  useEffect(() => { if (!animated) return; const id = setInterval(() => setFrame(f => (f + 1) % 6), 350); return () => clearInterval(id) }, [animated])
  // Wags tail up and down — very distinctive
  const tailY = animated ? [0,-3,-6,-3,0,3][frame] : 0
  const bodyY = animated ? [0,0,-1,0,0,1][frame] : 0
  return (
    <svg viewBox="0 0 120 130" width={size} height={size} style={style} aria-label="Kirtland's Warbler">
      <g transform={`translate(0,${bodyY})`}>
        <path d={`M 70 ${86+tailY} C 84 ${88+tailY} 100 ${94+tailY} 104 ${106+tailY} C 92 ${102+tailY} 78 ${94+tailY} 68 ${90+tailY}`} fill="#4A5868"/>
        <path d={`M 68 ${90+tailY} C 76 ${102+tailY} 76 ${114+tailY} 72 ${120+tailY} C 68 ${112+tailY} 65 ${100+tailY} 66 ${92+tailY}`} fill="#4A5868"/>
        {/* Bright yellow underparts */}
        <ellipse cx="57" cy="86" rx="21" ry="15" fill="#E8D020"/>
        {/* Black streaks on sides */}
        {[78,82,86].map((y,i) => <line key={i} x1="36" y1={y} x2="48" y2={y+2} stroke="#2A3848" strokeWidth="2" opacity="0.7"/>)}
        {[78,82,86].map((y,i) => <line key={i} x1="64" y1={y} x2="74" y2={y+2} stroke="#2A3848" strokeWidth="2" opacity="0.7"/>)}
        {/* Blue-gray back */}
        <ellipse cx="62" cy="78" rx="19" ry="11" fill="#4A5868"/>
        <path d="M 50 72 C 64 66 82 68 86 78 C 80 90 62 92 50 88 Z" fill="#3A4858"/>
        {/* Head — blue-gray */}
        <circle cx="42" cy="62" r="16" fill="#4A5868"/>
        {/* Broken eye ring */}
        <path d="M 34 55 C 38 52 44 52 50 55" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M 34 64 C 38 67 44 67 50 64" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
        {/* Bill */}
        <path d="M 26 62 L 11 64 L 26 67 Z" fill="#4A4838"/>
        <line x1="11" y1="64" x2="26" y2="64" stroke="#1A1A1A" strokeWidth="0.9"/>
        <circle cx="40" cy="60" r="3.5" fill="#1A0800"/>
        <circle cx="39" cy="59" r="1.2" fill="white" opacity="0.75"/>
        <path d="M 48 100 L 44 114" stroke="#6A7888" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 62 100 L 66 114" stroke="#6A7888" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 44 114 L 38 117 M 44 114 L 44 119 M 44 114 L 49 117" stroke="#6A7888" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 66 114 L 60 117 M 66 114 L 66 119 M 66 114 L 71 117" stroke="#6A7888" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

// ── Avatar router ─────────────────────────────────────────────────────────────
export function BirdAvatar({ birdId, size = 120, animated = false, style = {} }) {
  const props = { size, animated, style }
  const avatar = (() => { switch (birdId) {
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
    case 'eastern_towhee':              return <EasternTowheeAvatar {...props} />
    // ── Atlantic Flyway Warblers ──────────────────────────────
    case 'blackthroated_green_warbler': return <BlackthroatedGreenWarblerAvatar {...props} />
    case 'blackburnian_warbler':        return <BlackburnianWarblerAvatar {...props} />
    case 'magnolia_warbler':            return <MagnoliaWarblerAvatar {...props} />
    case 'chestnuside_warbler':         return <ChestnutsideWarblerAvatar {...props} />
    case 'blackthroated_blue_warbler':  return <BlackthroatedBlueWarblerAvatar {...props} />
    case 'canada_warbler':              return <CanadaWarblerAvatar {...props} />
    case 'nashville_warbler':           return <NashvilleWarblerAvatar {...props} />
    case 'wilsons_warbler':             return <WilsonsWarblerAvatar {...props} />
    case 'baybreasted_warbler':         return <BaybreastedWarblerAvatar {...props} />
    case 'prairie_warbler':             return <PrairieWarblerAvatar {...props} />
    // ── Wrens ────────────────────────────────────────────────────────────────
    case 'carolina_wren':               return <CarolinaWrenAvatar {...props} />
    case 'house_wren':                  return <HouseWrenAvatar {...props} />
    // ── Flycatchers ──────────────────────────────────────────────────────────
    case 'eastern_phoebe':              return <EasternPhoebeAvatar {...props} />
    case 'eastern_wood_pewee':          return <EasternWoodPeweeAvatar {...props} />
    case 'great_crested_flycatcher':    return <GreatCrestedFlycatcherAvatar {...props} />
    case 'eastern_kingbird':            return <EasternKingbirdAvatar {...props} />
    // ── Owls ─────────────────────────────────────────────────────────────────
    case 'barred_owl':                  return <BarredOwlAvatar {...props} />
    case 'great_horned_owl':            return <GreatHornedOwlAvatar {...props} />
    // ── Waterfowl ─────────────────────────────────────────────────────────────
    case 'wood_duck':                   return <WoodDuckAvatar {...props} />
    // ── Hawks ─────────────────────────────────────────────────────────────────
    case 'coopers_hawk':                return <CoopersHawkAvatar {...props} />
    case 'sharp_shinned_hawk':          return <SharpShinnedHawkAvatar {...props} />
    // ── Woodpeckers ───────────────────────────────────────────────────────────
    case 'red_bellied_woodpecker':      return <RedBelliedWoodpeckerAvatar {...props} />
    case 'pileated_woodpecker':         return <PileatedWoodpeckerAvatar {...props} />
    case 'yellow_bellied_sapsucker':    return <YellowBelliedSapsuckerAvatar {...props} />
    // ── Thrushes ──────────────────────────────────────────────────────────────
    case 'hermit_thrush':               return <HermitThrushAvatar {...props} />
    case 'veery':                       return <VeeryAvatar {...props} />
    case 'varied_thrush':               return <VariedThrushAvatar {...props} />
    // ── Sparrows & Ground Warblers ────────────────────────────────────────────
    case 'white_throated_sparrow':      return <WhiteThroatedSparrowAvatar {...props} />
    case 'ovenbird':                    return <OvenbirdAvatar {...props} />
    case 'louisiana_waterthrush':       return <LouisianaWaterthrushAvatar {...props} />
    // ── More Warblers ─────────────────────────────────────────────────────────
    case 'blue_winged_warbler':         return <BlueWingedWarblerAvatar {...props} />
    case 'kirtlands_warbler':           return <KirtlandsWarblerAvatar {...props} />
    default:
      console.error('[BirdAvatar] no avatar for birdId:', birdId)
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} style={style}>
          <circle cx="50" cy="50" r="40" fill="#333" opacity="0.6"/>
          <text x="50" y="55" textAnchor="middle" fill="#aaa" fontSize="28">?</text>
        </svg>
      )
  }})()
  return <AvatarErrorBoundary birdId={birdId} size={size} style={style}>{avatar}</AvatarErrorBoundary>
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
