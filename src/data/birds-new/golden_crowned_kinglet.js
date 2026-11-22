// Golden-crowned Kinglet — tiny conifer gleaner; a classic Oct–Nov migrant and winterer in NYC / northern NJ.
export default {
  id: 'golden_crowned_kinglet',
  commonName: 'Golden-crowned Kinglet',
  scientificName: 'Regulus satrapa',
  family: 'Regulidae',
  order: 'Passeriformes',

  sizeCategory: 'tiny',
  length_cm: [8, 11],
  wingspan_cm: [14, 18],
  weight_g: [4, 8],

  appearance: {
    billShape: 'thin',
    billSizeRelative: 'tiny',
    billColor: { male: 'black', female: 'black' },
    crestPresent: true,
    crestColor: { male: '#FF8A00 (orange center, bordered yellow)', female: '#F5D000 (all yellow)' },
    primaryColor: { male: '#7C8A6E', female: '#7C8A6E' },
    uiColor: '#F5C400',
    secondaryColors: {
      male: ['#F5D000 (crown stripe)', '#FF8A00 (crown center)', '#1A1A1A (crown edges, eye-line)', '#FAFAFA (eyebrow, wing bars)', '#D8DCD0 (pale gray underparts)', '#E8D040 (yellow-edged flight feathers)'],
      female: ['Same as male, but the crown stripe is all yellow with no orange center'],
    },
    distinctiveMarkings: {
      male: ['Bold black-and-white striped face: white eyebrow over a black eye-line', 'Black crown edges framing a yellow crown stripe with a flame-orange center', 'Olive-gray back, pale gray below', 'Two whitish wing bars with a black bar behind the lower one', 'Yellow edges on wing and tail feathers', 'Tiny, round, short-tailed — smaller than a chickadee'],
      female: ['Crown stripe all yellow, no orange'],
      juvenile: ['Lacks the colored crown until fall; face stripes already present'],
    },
    plumageDescription: {
      male: 'A feathered ping-pong ball: olive-gray above and pale gray below, with a boldly striped face — a white eyebrow sandwiched between a black eye-line and the black edges of the crown. Down the middle of the crown runs a stripe of lemon yellow with a fiery orange center that the male flares when excited. Two pale wing bars and yellow-edged flight feathers complete the look.',
      female: 'Identical to the male except the crown stripe is pure yellow, without the hidden orange center.',
      juvenile: 'Brief summer plumage lacks the colored crown, but the striped face is already obvious.',
    },
  },

  primaryHabitat: ['coniferous_forest', 'spruce_fir_forest', 'mixed_forest', 'parks', 'cemeteries'],
  feedingLayer: 'canopy',
  flightStyle: 'fluttering',
  socialBehavior: {
    breeding: 'pairs',
    winter: 'mixed_flocks',
  },
  typicalGroupSize: { min: 2, max: 10 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'Extremely high, thin "tsee-tsee-tsee" in a quick series of three — so high-pitched that many adults can no longer hear it. Often the only clue a flock is overhead in the pines.',
    songDescription: 'A rising series of high "tsee" notes that tumbles into a quick, lower chatter at the end. Mostly heard on northern breeding grounds.',
    loudness: 3,
    callFrequency: 8,
    singingSeason: {
      spring: 'moderate',
      summer: 'frequent',
      fall: 'rare',
      winter: 'rare',
    },
    sounds: ['tsee-tsee-tsee', 'song'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'common' },
    summer: { presence: 'breeder_north', commonness: 'rare' },
    fall:   { presence: 'migrant', commonness: 'common' },
    winter: { presence: 'winter', commonness: 'uncommon' },
  },
  range: 'north_america',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 7,
    speed: 8,
    flightiness: 4,
    camouflage: 6,
    sizeScore: 1,
    movementPattern: 'rapid_gleaning',
    captureBackground: 'forest_canopy',
    flightPattern: 'fluttering',
    behaviorNotes: 'Never still: flicks its wings constantly, hops along spruce and pine twigs, and hovers for a split second at needle tips to pick off insects. Tame and often low in conifers, but so small and fast that keeping it in the frame is the whole challenge. Travels with chickadees and creepers in fall.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 190,
  verificationThreshold: 0.7,
  verificationMethods: 2,

  description: 'One of the smallest songbirds in North America — barely heavier than a hummingbird — yet tough enough to spend the winter in snowy northern forests. In October and November, flocks pour into city parks, cemeteries, and backyard evergreens, lisping their ultra-high "tsee-tsee-tsee" as they flutter and hover at the tips of conifer branches. Get a good look and that striped face and blazing gold crown are unforgettable.',
  funFacts: [
    'A Golden-crowned Kinglet weighs about as much as two pennies, yet it can survive winter nights of -40° — huddling together with other kinglets in a feathery ball to stay warm.',
    'Its nest is so deep that the 8 or 9 eggs are stacked in two layers, like a tiny egg sandwich, just to fit them all.',
    'Kinglets keep eating all winter by finding dormant caterpillars and insect eggs tucked among conifer needles — they have to eat almost constantly, because their tiny bodies burn through energy so fast.',
  ],
  eBirdCode: 'gockin',
  merlinId: 'Golden-crowned_Kinglet',
}
