// Easter Egg Personages — rare, special encounters beyond the birds themselves
// Each has a discovery screen, a mini-game, and an educational payoff.
// Trigger probability: ~4% per encounter check, weighted by egg config.

export const EASTER_EGGS = [
  {
    id: 'audubon',
    name: 'John James Audubon',
    subtitle: 'The Original American Birder',
    tagline: '1785–1851  ·  Naturalist · Artist · Paradox',
    badge: 'HISTORICAL FIGURE',
    badgeStyle: 'sepia',
    description: `Long before field guides or binoculars, one man transformed how
Americans saw birds. John James Audubon trekked thousands of miles through
wilderness, painting every North American bird life-size for his monumental
"Birds of America." He lived for years in upper Manhattan — the very
neighborhood now called Washington Heights — where he died in 1851.

The great irony: he shot his subjects to paint them. He is believed to have
contributed to the decline of the Carolina Parakeet, the only parrot native
to eastern North America. The last known individual, "Incas," died at
Cincinnati Zoo on February 21, 1918 — just over a century ago.`,
    gameTitle: 'Save the Last Flock',
    gameInstructions: 'Tap each Carolina Parakeet to shoo it to safety before Audubon raises his rifle! Save 5 of 8 to win.',
    winMessage: `The flock escaped into the trees!\n\nHistory was not so merciful. The last Carolina Parakeet — "Incas" — died February 21, 1918 at Cincinnati Zoo. Audubon's breathtaking paintings are among the few records of this brilliant, vanished bird.`,
    loseMessage: `The last flock is gone.\n\n"Incas," the last known Carolina Parakeet, died February 21, 1918 at Cincinnati Zoo. Audubon's magnificent paintings remain the best record of a bird that once filled the skies from Florida to New York.`,
    winPoints: 150,
    losePoints: 25,
    triggerMinBirds: 5,
    triggerWeight: 0.6,
    theme: '#c8a417',
    glowColor: '#d4b020',
    bgColor: '#1a1205',
    textColor: '#f0dfa0',
    accentColor: '#8b6914',
  },
  {
    id: 'gitler',
    name: 'Avi Gitler',
    subtitle: 'Harlem\'s Bird Mural Master',
    tagline: 'Gitler & _____  ·  ~300 Murals  ·  Harlem, NYC',
    badge: 'URBAN ARTIST',
    badgeStyle: 'mural',
    description: `In the very Harlem neighborhood where Audubon lived — and died —
artist Avi Gitler of the gallery Gitler & _____ created nearly 300 stunning
bird murals, in collaboration with Audubon Society magazine.

His mission: honor the birds most likely to be displaced or lost to global
warming, as foretold in Audubon Magazine's sobering climate research.
Gitler's work brought the shocking beauty of nature to an urban landscape,
transformed city walls into a living field guide, and elevated local Harlem
artists into broader recognition.

It is one of the most powerful environmental art projects in New York City's
recent history — and it happened on the same streets where Audubon once walked.`,
    gameTitle: 'Paint the Block',
    gameInstructions: 'Help Avi finish the mural! Select a color from the palette, then tap sections to fill them. Complete all birds before time runs out!',
    winMessage: `The mural is complete!\n\nAvi Gitler's real ~300 murals in Harlem honor birds threatened by climate change — transforming city walls into a living field guide, and honoring the legacy of Audubon in the very neighborhood he called home.`,
    loseMessage: `Time ran out!\n\nThe walls of Harlem still hold Gitler's actual murals — nearly 300 birds painted in honor of a vanishing world. Look for them in Washington Heights and beyond.`,
    winPoints: 100,
    losePoints: 25,
    triggerMinBirds: 3,
    triggerWeight: 0.8,
    theme: '#e85a1e',
    glowColor: '#ff8c42',
    bgColor: '#120800',
    textColor: '#ffe0c0',
    accentColor: '#cc4400',
  },
  {
    id: 'birding_bob',
    name: '"Birding Bob"',
    subtitle: 'Loudest Birder in the Five Boroughs',
    tagline: 'Central Park · Every Spring Migration · Unapologetic',
    badge: 'LOCAL LEGEND',
    badgeStyle: 'field',
    description: `Every serious birder in Central Park knows him. He materializes
before dawn, Bluetooth speaker in hand, filling the Ramble with recorded
calls and enthusiastic pishing that can be heard from Turtle Pond to
Strawberry Fields.

Rules? He's heard of them. NYC Birding Etiquette clearly states: no playback,
no pishing near other birders. Bob disagrees. While veteran observers stand
motionless scanning the sweetgum canopy, Bob is calling Ovenbirds from thirty
feet away with his phone at full volume.

The groups he leads adore him. The birders he startles... less so.

But — wait. Is that a Summer Tanager in the tree he just cleared out?`,
    gameTitle: 'SHHHH the Bob!',
    gameInstructions: 'Tap the speaker to lower the volume! But careful — tap Bob himself and he turns it UP. Silence him completely, then spot the Summer Tanager!',
    winMessage: `The Summer Tanager! A brilliant scarlet male, perched right there in the sweetgum.\n\nBob will never understand the glares. NYC Birding Rule #1: No playback. No pishing near others. The birds — and your fellow birders — thank you.`,
    loseMessage: `The birds have scattered. Bob is still pishing. The Summer Tanager was RIGHT THERE...\n\nMaybe next migration season. And remember: no playback in Central Park, please.`,
    winPoints: 75,
    losePoints: 25,
    triggerMinBirds: 1,
    triggerWeight: 1.2,
    theme: '#4ade80',
    glowColor: '#22c55e',
    bgColor: '#030f03',
    textColor: '#c0ffd0',
    accentColor: '#15803d',
  },
  {
    id: 'mighty_birders',
    name: 'The Mighty Birders',
    subtitle: 'NYC\'s Most Dedicated Big Day Team',
    tagline: '~25 Years  ·  Central Park to Jamaica Bay  ·  No Hanging Chads',
    badge: 'LEGENDARY TEAM',
    badgeStyle: 'team',
    description: `Five remarkable friends — with ties to theater, finance, and
Columbia University — found each other in Central Park and forged a bond
over binoculars that has lasted nearly 25 years.

Each year in early May, from dawn in Central Park to dusk at Jamaica Bay
Wildlife Refuge, the Mighty Birders run their annual Big Day. Their records
are kept with the rigor of quants — including, infamously, the hanging and
dimpled chads.

The team: General (Brown) Thrasher leads with authority. The elegant
Black-necked Stilt brings grace. Least, the tiny powerhouse, spots
everything. Cedar Waxwings brings the style. And Horned Lark — bless
him — brings the walking sticks and often walks the wrong way.

May the Mighty Birders keep celebrating life, nature, and birds together
for many happy years to come!`,
    gameTitle: 'The Yellow Chat Caper',
    gameInstructions: 'The Yellow-breasted Chat just appeared! But HL is wandering away again. Tap HL to redirect him before the Chat disappears — no hanging chads allowed!',
    winMessage: `ALL FIVE Mighty Birders tick the Yellow-breasted Chat!\n\nNo hanging chads today! The Big Day list grows — and the annual records reflect a clean, confirmed sighting by all members. From Central Park to Jamaica Bay, the MB's reign supreme. 🎉`,
    loseMessage: `HL wandered off and the Chat vanished.\n\nAnother year, another hanging chad in the official MB records. But there's always Jamaica Bay at dusk — and next year's Big Day. The Mighty Birders endure!`,
    winPoints: 200,
    losePoints: 25,
    triggerMinBirds: 10,
    triggerWeight: 0.4,
    theme: '#60a5fa',
    glowColor: '#3b82f6',
    bgColor: '#030810',
    textColor: '#c0d8ff',
    accentColor: '#1d4ed8',
  },
]

export const EASTER_EGG_MAP = Object.fromEntries(EASTER_EGGS.map(e => [e.id, e]))

// Weighted random selection from eligible eggs
export function pickRandomEasterEgg(capturedCount, seenIds = []) {
  const eligible = EASTER_EGGS.filter(e =>
    capturedCount >= e.triggerMinBirds
  )
  if (eligible.length === 0) return null
  // Boost unseen eggs 3x to encourage discovery
  const weighted = eligible.map(e => ({
    ...e,
    weight: seenIds.includes(e.id) ? e.triggerWeight * 0.3 : e.triggerWeight * 3,
  }))
  const total = weighted.reduce((s, e) => s + e.weight, 0)
  let rand = Math.random() * total
  for (const egg of weighted) {
    rand -= egg.weight
    if (rand <= 0) return egg
  }
  return weighted[weighted.length - 1]
}
