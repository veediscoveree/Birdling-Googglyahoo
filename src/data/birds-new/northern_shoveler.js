// Northern Shoveler — the big-billed filter-feeder of ponds and marshes.
export default {
  id: 'northern_shoveler',
  commonName: 'Northern Shoveler',
  scientificName: 'Spatula clypeata',
  family: 'Anatidae',
  order: 'Anseriformes',

  sizeCategory: 'medium',
  length_cm: [44, 51],
  wingspan_cm: [69, 84],
  weight_g: [410, 1100],

  appearance: {
    billShape: 'spatulate',
    billSizeRelative: 'very_large',
    billColor: { male: 'black', female: 'orange with dark gray center' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#1E5E3A', female: '#8A6A48' },
    uiColor: '#1E5E3A',
    secondaryColors: {
      male: ['#1E5E3A (glossy green head)', '#FFD21E (yellow eye)', '#FAFAF6 (white breast)', '#A8461E (chestnut flanks and belly)', '#9CC0E0 (powder-blue forewing)', '#2E8A4E (green speculum)', '#141414 (huge black bill)', '#E87A28 (orange legs)'],
      female: ['#8A6A48 (mottled brown overall)', '#E08A3A (orange bill edges)', '#A8B8C8 (gray-blue forewing)', '#2E8A4E (green speculum)'],
    },
    distinctiveMarkings: {
      male: ['Enormous spoon-shaped (spatulate) black bill, longer than the head', 'Glossy dark-green head', 'Bright yellow eye', 'Clean white breast', 'Rich chestnut flanks and belly', 'White patch in front of the black tail', 'Powder-blue forewing patch and green speculum in flight'],
      female: ['Mottled brown, Mallard-like body', 'Same huge spoon bill, orange along the edges', 'Brownish eye', 'Grayish-blue forewing in flight'],
      juvenile: ['Like female; young males gain color through late fall', 'Fall drakes are often still in dull, mottled eclipse or transitional plumage — some show a pale crescent in front of the eye into December'],
    },
    plumageDescription: {
      male: 'Breeding (alternate) drake: glossy bottle-green head with a staring yellow eye, gleaming white breast, chestnut flanks, and an enormous black spoon of a bill. In flight a powder-blue panel on the forewing flashes ahead of a green speculum. Shoveler drakes molt very late: around NYC in September–November many still look mottled brown (eclipse) or patchy, sometimes with a white crescent on the face, before reaching full color in early winter.',
      female: 'Mottled warm brown like a hen Mallard, but the giant spoon bill — orange along the edges — gives her away instantly. Shows a grayish-blue forewing in flight.',
      juvenile: 'Resembles female, with a duller bill. First-year males brighten gradually through late fall and winter.',
    },
  },

  primaryHabitat: ['ponds', 'lakes', 'marshes', 'park_lakes', 'reservoirs', 'sewage_lagoons'],
  feedingLayer: 'water_surface',
  flightStyle: 'direct_fast',
  socialBehavior: {
    breeding: 'pairs',
    winter: 'flocks',
  },
  typicalGroupSize: { min: 2, max: 200 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'Males give a hollow, knocking "took-took" or "thup-thup"; females a soft, descending Mallard-like quack.',
    songDescription: 'Not a songbird; a fairly quiet duck outside courtship, when drakes repeat their low "took-took" calls.',
    loudness: 4,
    callFrequency: 3,
    singingSeason: {
      spring: 'moderate',
      summer: 'rare',
      fall: 'occasional',
      winter: 'occasional',
    },
    sounds: ['took-took', 'quack', 'wing whir'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'uncommon' },
    summer: { presence: 'absent', commonness: 'rare' },
    fall:   { presence: 'migrant', commonness: 'uncommon' },
    winter: { presence: 'winter', commonness: 'common' },
  },
  range: 'northern_hemisphere',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 3,
    speed: 4,
    flightiness: 4,
    camouflage: 3,
    sizeScore: 7,
    movementPattern: 'swimming',
    captureBackground: 'open_water',
    flightPattern: 'direct',
    behaviorNotes: 'Swims low with its huge bill skimming the surface, sweeping side to side to strain food. Flocks often spin in tight circles to stir up the water — a slow, predictable target. Fairly tolerant on park lakes, but early-fall drakes may still be in drab eclipse, so look for the bill first.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 150,
  verificationThreshold: 0.68,
  verificationMethods: 2,

  description: 'You can name a Northern Shoveler from across a pond by its bill alone — a huge black spoon that looks borrowed from a much bigger bird. Shovelers sweep that bill through the surface water, straining out tiny seeds, snails, and plankton through comb-like edges. In fall and winter they gather on city lakes such as those in Prospect Park and Central Park and on the marshes of Jamaica Bay, often swirling together in feeding circles.',
  funFacts: [
    'A shoveler\'s bill is lined with about 110 tiny comb-like teeth called lamellae that strain food from the water — a little like the baleen of a whale.',
    'Groups of shovelers sometimes swim in tight circles, spinning like a living whirlpool to pull food up from below so everyone can scoop it.',
    'Shoveler drakes are some of the slowest ducks to get their fancy feathers back in fall — many still look brown and patchy until almost Christmas.',
  ],
  eBirdCode: 'norsho',
  merlinId: 'Northern_Shoveler',
}
