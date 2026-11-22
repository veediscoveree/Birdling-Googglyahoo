// ─────────────────────────────────────────────────────────────
// MERLIN
// ─────────────────────────────────────────────────────────────
export default {
  id: 'merlin',
  commonName: 'Merlin',
  scientificName: 'Falco columbarius',
  family: 'Falconidae',
  order: 'Falconiformes',

  sizeCategory: 'small',
  length_cm: [24, 30],
  wingspan_cm: [53, 68],
  weight_g: [160, 240],

  appearance: {
    billShape: 'hooked',
    billSizeRelative: 'small',
    billColor: { male: 'blue-gray with yellow cere', female: 'blue-gray with yellow cere' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#4E6280', female: '#6A4E36' },
    uiColor: '#4E6280',
    secondaryColors: {
      male: ['#4E6280 (slate blue-gray back)', '#E8B07A (buff-orange underparts)', '#4A2E1C (heavy dark streaks)', '#22242A (dark tail with narrow pale bands)', '#F2C230 (cere and feet)'],
      female: ['#6A4E36 (brown back)', '#F2E4CC (creamy underparts)', '#5A3A22 (heavy brown streaks)'],
    },
    distinctiveMarkings: {
      male: ['Small, stocky, dark falcon — chunkier than a kestrel', 'Slate blue-gray back and wings', 'Buff-to-orange underparts with heavy dark streaks', 'Faint, thin mustache mark (not a bold helmet like a Peregrine)', 'Dark tail crossed by a few narrow pale bands, white tip', 'Dark eye, yellow cere and feet', 'Fast, direct, powerful flight low over the ground — no hovering'],
      female: ['Brown above instead of blue-gray', 'Creamy underparts with bold brown streaks', 'Brown tail with narrow buff bands'],
      juvenile: ['Like the adult female: brown above, heavily streaked below'],
    },
    plumageDescription: {
      male: 'A compact, muscular little falcon. The adult male is slate blue-gray above, with a dark tail crossed by narrow pale bands. Underneath, he is warm buff-orange with heavy dark streaks. The face is plain, with only a faint mustache.',
      female: 'Brown above with creamy, heavily streaked underparts and a brown-banded tail. Same stocky shape and fast, direct flight.',
      juvenile: 'Resembles the adult female — brown and heavily streaked.',
    },
  },

  primaryHabitat: ['open_fields', 'coastlines', 'marshes', 'parks', 'cemeteries', 'boreal_forest_edge', 'urban'],
  feedingLayer: 'aerial',
  flightStyle: 'fast_direct',
  socialBehavior: {
    breeding: 'monogamous_pairs',
    winter: 'solitary',
  },
  typicalGroupSize: { min: 1, max: 1 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A fast, shrill, accelerating chatter: "ki-ki-ki-ki-kee" — higher and quicker than a Peregrine.',
    songDescription: 'No song. Calls mostly near the nest or when chasing intruders.',
    loudness: 6,
    callFrequency: 2,
    singingSeason: {
      spring: 'moderate',
      summer: 'occasional',
      fall: 'rare',
      winter: 'rare',
    },
    sounds: ['chatter'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'uncommon' },
    summer: { presence: 'local_breeder', commonness: 'rare' },
    fall:   { presence: 'migrant', commonness: 'uncommon' },
    winter: { presence: 'winter_visitor', commonness: 'uncommon' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 8,
    speed: 9,
    flightiness: 8,
    camouflage: 4,
    sizeScore: 3,
    movementPattern: 'aerial_dart',
    captureBackground: 'open_field',
    flightPattern: 'fast_direct',
    behaviorNotes: 'A small, dark bullet that races low and straight over fields, beaches and marshes, then surges up to snatch a songbird or dragonfly. Often sits on the very top of a dead snag or treetop between chases. Fall migrants pour down the coast in September and October; some stay the winter in parks and cemeteries.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 240,
  verificationThreshold: 0.75,
  verificationMethods: 2,

  description: 'A pocket-sized powerhouse. The Merlin is a stocky, dark little falcon that hunts by speed and surprise, chasing down sparrows, shorebirds and dragonflies in fast, low, direct flight. It does not hover like a kestrel or dive from the sky like a Peregrine — it just outflies its prey. Watch for them zipping along the coast during fall migration.',
  funFacts: [
    'Merlins catch dragonflies in mid-air and eat them right out of their feet while still flying — a migration snack on the go!',
    'Merlins used to be called "Pigeon Hawks" because their shape in flight looks a bit like a pigeon — that is why their scientific name, columbarius, means "of doves."',
    'In a famous medieval book about falconry (from 1486), the Merlin was listed as the proper hunting falcon for a lady.',
    'The popular Merlin Bird ID app from the Cornell Lab of Ornithology is named after this little falcon.',
  ],
  eBirdCode: 'merlin',
  merlinId: 'Merlin',
}
