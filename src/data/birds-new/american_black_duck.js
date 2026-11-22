// American Black Duck — eastern salt-marsh dabbler; the Mallard's dark, wary cousin.
export default {
  id: 'american_black_duck',
  commonName: 'American Black Duck',
  scientificName: 'Anas rubripes',
  family: 'Anatidae',
  order: 'Anseriformes',

  sizeCategory: 'large',
  length_cm: [54, 59],
  wingspan_cm: [88, 95],
  weight_g: [720, 1640],

  appearance: {
    billShape: 'spatulate',
    billSizeRelative: 'large',
    billColor: { male: 'olive-yellow to bright yellow', female: 'dull olive-green, often mottled dark' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#3A2A1E', female: '#40301F' },
    uiColor: '#4A3626',
    secondaryColors: {
      male: ['#3A2A1E (sooty dark-brown body)', '#B8AC94 (pale buffy-gray head and neck)', '#3A2E28 (dark crown and eye-line)', '#5A3FA0 (violet-blue speculum)', '#C9C24A (olive-yellow bill)', '#E8782A (orange legs)', '#FFFFFF (underwings)'],
      female: ['#40301F (dark brown body, slightly paler and more scalloped)', '#B4A68C (pale gray-buff head)', '#6E7A3A (dull olive bill)', '#5A3FA0 (violet-blue speculum)', '#C8743A (dull orange legs)'],
    },
    distinctiveMarkings: {
      male: ['Sooty, blackish-brown body much darker than the head', 'Pale buffy-gray face and neck with fine dark streaks', 'Dark crown and thin dark line through the eye', 'Olive-yellow to bright yellow bill', 'Violet-blue speculum with little or no white border', 'Bright orange legs and feet', 'Flashing white underwings in flight', 'Dark tail — no white tail sides like a Mallard'],
      female: ['Nearly identical to male', 'Bill dull olive-green, often with dark smudges', 'Legs duller orange-brown', 'Body feathers show slightly paler buff edges'],
      juvenile: ['Like adults but browner, with more streaked breast and duller bill', 'Sexes are alike all year, so there is no colorful drake plumage — and almost no eclipse change'],
    },
    plumageDescription: {
      male: 'Looks like a very dark female Mallard drawn in charcoal: a sooty, almost black-brown body with neat buff scallops, set off by a much paler buffy-gray head and neck with a dark cap and eye-line. The bill is olive-yellow (brightening in winter), the legs bright orange. In flight the violet-blue speculum shows little or no white edging, and the white underwings flash brilliantly against the dark body. Drakes barely change through the year, so fall birds in NYC and New Jersey look much the same as spring ones.',
      female: 'Very like the male but with a duller olive-green bill, often mottled with black, and slightly browner, more scalloped body feathers. Same pale head, dark body, and violet-blue speculum.',
      juvenile: 'Similar to adults; breast more streaked than scalloped, and bill duller. Best told from female Mallard by the much darker body, pale head contrast, and speculum without wide white borders.',
    },
  },

  primaryHabitat: ['salt_marsh', 'estuaries', 'tidal_creeks', 'beaver_ponds', 'wooded_wetlands', 'bays'],
  feedingLayer: 'water',
  flightStyle: 'direct',
  socialBehavior: {
    breeding: 'pairs',
    winter: 'flocks',
  },
  typicalGroupSize: { min: 2, max: 60 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'Female gives a loud, Mallard-like descending "QUACK-quack-quack-quack"; males give a lower, reedy "raeb".',
    songDescription: 'Not a songbird; communicates with quacks, grunts, and soft chatter. Voice is nearly identical to the Mallard\'s.',
    loudness: 7,
    callFrequency: 5,
    singingSeason: {
      spring: 'frequent',
      summer: 'occasional',
      fall: 'moderate',
      winter: 'moderate',
    },
    sounds: ['quack', 'raeb', 'grunt'],
  },

  seasons: {
    spring: { presence: 'resident', commonness: 'uncommon' },
    summer: { presence: 'resident', commonness: 'uncommon' },
    fall:   { presence: 'resident_and_migrant', commonness: 'common' },
    winter: { presence: 'resident', commonness: 'common' },
  },
  range: 'eastern_north_america',
  regions: ['NE', 'SE'],

  captureStats: {
    difficulty: 4,
    speed: 5,
    flightiness: 7,
    camouflage: 5,
    sizeScore: 8,
    movementPattern: 'swimming',
    captureBackground: 'marsh_edge',
    flightPattern: 'direct',
    behaviorNotes: 'Far warier than a park Mallard — keeps to tidal creeks and marsh edges and springs straight up off the water at the first sign of people. Look for a dark duck with a pale head among the Mallards; when it flushes, the white underwings flash. Sexes look alike, so there are no "eclipse" drakes to confuse you in early fall.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 140,
  verificationThreshold: 0.68,
  verificationMethods: 2,

  description: 'The American Black Duck is the dark, wild cousin of the Mallard — a bird of salt marshes, tidal creeks, and wooded swamps of the East. Up close it is not black at all but a rich sooty brown with a pale, grayish face. Around New York City and the Meadowlands, flocks swell each fall as northern birds arrive to winter in the marshes. It was once the most common duck in eastern North America, but Mallards spreading east now share its habitat and often interbreed with it.',
  funFacts: [
    'When a Black Duck takes off, its white underwings flash against its dark body like someone flipping on a light switch — a great way to spot one in flight.',
    'Black Ducks and Mallards are such close relatives that they often pair up, and their hybrid ducklings can look like a mix of both parents.',
    'In the coldest winter months Black Ducks feast on tiny snails and mussels in salt marshes, often feeding at night when the tide is right.',
  ],
  eBirdCode: 'ambduc',
  merlinId: 'American_Black_Duck',
}
