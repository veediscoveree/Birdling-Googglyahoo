// Ruby-crowned Kinglet — a tiny, hyperactive fall migrant through NYC / northern NJ.
export default {
  id: 'ruby_crowned_kinglet',
  commonName: 'Ruby-crowned Kinglet',
  scientificName: 'Corthylio calendula',
  family: 'Regulidae',
  order: 'Passeriformes',

  sizeCategory: 'tiny',
  length_cm: [9, 11],
  wingspan_cm: [16, 18],
  weight_g: [5, 10],

  appearance: {
    billShape: 'thin', billSizeRelative: 'tiny',
    billColor: { male: 'black', female: 'black' },
    crestPresent: true, crestColor: { male: 'ruby red (usually hidden)', female: null },
    primaryColor: { male: '#7A8A3E', female: '#7A8A3E' },
    uiColor: '#C2185B',
    secondaryColors: {
      male: ['#D8152B (crown patch, usually hidden)', '#FFFFFF (broken eye-ring, wing bar)', '#2A2E1A (bar behind the wing bar)', '#DAD6AA (pale olive-buff underparts)'],
      female: ['Same but no red crown patch'],
    },
    distinctiveMarkings: {
      male: ['Tiny, round and olive-green', 'Bold white eye-ring broken at the top and bottom', 'White wing bar with a black bar right behind it', 'Ruby-red crown patch — usually hidden, raised when excited', 'Constant nervous wing-flicking', 'Tiny thin bill; dark legs with yellowish feet'],
      female: ['Same but no red crown patch'],
      juvenile: ['Like the female; young males gain the crown patch in their first fall or later'],
    },
    plumageDescription: {
      male: 'A tiny olive-green ball of energy with a big head, a big dark eye in a broken white eye-ring, and a white wing bar backed by a black bar. The male hides a brilliant ruby crown patch in his olive crown — you usually only see it when he gets excited and flares it up like a little flame.',
      female: 'Same as the male, minus the red crown patch.',
      juvenile: 'Like the female in fall.',
    },
  },

  primaryHabitat: ['mixed_forest', 'conifers', 'woodland_edge', 'thickets', 'parks', 'suburban_gardens'],
  feedingLayer: 'shrub',
  flightStyle: 'direct',
  socialBehavior: { breeding: 'territorial_pairs', winter: 'mixed_flocks' },
  typicalGroupSize: { min: 1, max: 4 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A husky, scolding "ji-dit" or "jih-dit" — often the first clue one is nearby.',
    songDescription: 'Amazingly loud for such a tiny bird: a few thin "tee tee tee" notes, then lower "tew tew tew," ending in a bubbly "teedadidee-teedadidee." Sometimes heard in fall and often in spring migration.',
    loudness: 6, callFrequency: 8,
    singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'occasional', winter: 'rare' },
    sounds: ['ji-dit', 'song', 'scold'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'common' },
    summer: { presence: 'absent', commonness: 'absent' },
    fall:   { presence: 'migrant', commonness: 'common' },
    winter: { presence: 'winter', commonness: 'rare' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 7, speed: 9, flightiness: 4, camouflage: 6, sizeScore: 1,
    movementPattern: 'rapid_gleaning',
    flightPattern: 'direct',
    captureBackground: 'forest_edge',
    behaviorNotes: 'Never still: hops branch to branch, flicking its wings every second or two, and often HOVERS to pick a bug off the underside of a leaf. Not shy — it may come very close — but it is tiny and green against green leaves. Common in parks from late September through early November.',
  },

  rarity: 'common', rarityColor: '#4caf50', points: 135,
  verificationThreshold: 0.70, verificationMethods: 2,

  description: 'The Ruby-crowned Kinglet is one of North America\'s tiniest songbirds — a hyperactive olive puffball that flicks its wings nonstop as it searches twigs and leaves for tiny insects. Kinglets pour through New York and New Jersey parks every fall on their way south from the northern forests where they nest. The male keeps a secret: a blazing red crown patch he flashes only when excited.',
  funFacts: [
    'The male\'s ruby crown is usually hidden — he raises it like a little flame when he is excited, scolding, or showing off to a rival.',
    'A kinglet weighs less than two nickels, yet its song is so loud you can hear it from far across a park.',
    'Kinglets flick their wings almost constantly — a great clue for spotting one, even before you see its face.',
    'A female can lay up to 12 eggs in one nest — together they can weigh about as much as she does!',
  ],
  eBirdCode: 'ruckin',
  merlinId: 'Ruby-crowned_Kinglet',
}
