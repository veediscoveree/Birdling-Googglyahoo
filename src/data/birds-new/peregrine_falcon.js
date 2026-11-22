// ─────────────────────────────────────────────────────────────
// PEREGRINE FALCON
// ─────────────────────────────────────────────────────────────
export default {
  id: 'peregrine_falcon',
  commonName: 'Peregrine Falcon',
  scientificName: 'Falco peregrinus',
  family: 'Falconidae',
  order: 'Falconiformes',

  sizeCategory: 'medium',
  length_cm: [36, 49],
  wingspan_cm: [100, 110],
  weight_g: [530, 1600],

  appearance: {
    billShape: 'hooked',
    billSizeRelative: 'medium',
    billColor: { male: 'blue-gray with yellow cere', female: 'blue-gray with yellow cere' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#5C6B80', female: '#5C6B80' },
    uiColor: '#3E5068',
    secondaryColors: {
      male: ['#5C6B80 (slate blue-gray back)', '#1E2228 (black hood and helmet-like malar)', '#FFFFFF (white cheek and throat)', '#F4EBDD (pale, finely barred underparts)', '#F2C230 (eye-ring, cere, feet)'],
      female: ['Same pattern — the female is about one-third larger and often warmer buff below'],
    },
    distinctiveMarkings: {
      male: ['Dark hood with a thick black "helmet" sideburn (malar) below the eye', 'Bright white cheek patch and throat', 'Slate blue-gray back and wings', 'Pale underparts finely barred with dark gray', 'Dark eye ringed with yellow; yellow cere and feet', 'Long pointed wings and a medium tail; tucks into a teardrop when diving'],
      female: ['Same plumage; noticeably larger and bulkier — falconers call the smaller male a "tiercel"'],
      juvenile: ['Brown above instead of blue-gray', 'Heavily streaked (not barred) underparts', 'Bluish-gray cere and feet that turn yellow with age', 'Same bold helmet face pattern'],
    },
    plumageDescription: {
      male: 'A powerful, compact falcon in a sharp gray suit: slate blue-gray back, a black hood with a thick black sideburn that looks like a motorcycle helmet, a bright white cheek and throat, and pale underparts covered in fine dark bars. Big dark eyes with yellow rings. In flight: long pointed wings, a deep chest and quick, stiff wingbeats.',
      female: 'Same as the male but about a third larger — in falcons the female is the bigger, more powerful hunter.',
      juvenile: 'Brown-backed and heavily streaked below, with the same helmeted face. Juveniles are the ones most often seen streaking south along the coast in fall.',
    },
  },

  primaryHabitat: ['cliffs', 'coastlines', 'bridges', 'skyscrapers', 'urban', 'marshes', 'barrier_beaches'],
  feedingLayer: 'aerial',
  flightStyle: 'powerful_direct_and_stoop',
  socialBehavior: {
    breeding: 'monogamous_pairs',
    winter: 'solitary',
  },
  typicalGroupSize: { min: 1, max: 2 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A harsh, scolding "kak-kak-kak-kak" or "rehk-rehk-rehk" near the nest ledge; also a whining "ee-chip" between mates.',
    songDescription: 'No song. Mostly silent away from the nest.',
    loudness: 7,
    callFrequency: 2,
    singingSeason: {
      spring: 'moderate',
      summer: 'occasional',
      fall: 'rare',
      winter: 'rare',
    },
    sounds: ['kak_kak', 'wail'],
  },

  seasons: {
    spring: { presence: 'resident', commonness: 'uncommon' },
    summer: { presence: 'resident', commonness: 'uncommon' },
    fall:   { presence: 'migrant_and_resident', commonness: 'uncommon' },
    winter: { presence: 'resident', commonness: 'uncommon' },
  },
  range: 'worldwide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 8,
    speed: 10,
    flightiness: 6,
    camouflage: 3,
    sizeScore: 6,
    movementPattern: 'fast_low_ambush',
    captureBackground: 'urban_edge',
    flightPattern: 'stoop',
    behaviorNotes: 'Can sit motionless on a high ledge or bridge tower for an hour — then launch and vanish in seconds. In binoculars, it cuts through the frame in a straight, blistering line; lock on during the brief direct pass. Fall migrants race south along the barrier beaches and coastline, hunting shorebirds and ducks.',
  },

  rarity: 'rare',
  rarityColor: '#9c27b0',
  points: 320,
  verificationThreshold: 0.80,
  verificationMethods: 2,

  description: 'The fastest animal on Earth. A Peregrine climbs high, folds its wings into a teardrop and drops onto flying prey in a dive called a stoop. Peregrines vanished as nesting birds from the eastern United States by the mid-1960s because of DDT, then came back through captive breeding and release. Now they nest on New York City bridges and skyscrapers — tall, cliff-like perches with an endless supply of pigeons.',
  funFacts: [
    'In a hunting dive called a "stoop," a Peregrine can top 200 miles per hour — faster than any other animal on the planet!',
    'Special cones inside a Peregrine\'s nostrils help slow down rushing air so it can keep breathing during its super-fast dives.',
    'Peregrines nest on New York City bridges and skyscrapers, which they use just like seaside cliffs. NYC has one of the biggest city Peregrine populations in the world — and they eat a lot of pigeons.',
    '"Peregrine" means "wanderer." Arctic-nesting Peregrines can migrate all the way to South America, zooming down the Atlantic coast in fall.',
  ],
  eBirdCode: 'perfal',
  merlinId: 'Peregrine_Falcon',
}
