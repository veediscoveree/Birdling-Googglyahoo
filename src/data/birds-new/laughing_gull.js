// Laughing Gull — the dark-backed summer-into-fall gull of NY/NJ bays. Same schema as src/data/birds.js.
export default {
  id: 'laughing_gull',
  commonName: 'Laughing Gull',
  scientificName: 'Leucophaeus atricilla',
  family: 'Laridae',
  order: 'Charadriiformes',

  sizeCategory: 'medium',
  length_cm: [39, 46], wingspan_cm: [98, 110], weight_g: [200, 370],

  appearance: {
    billShape: 'hooked', billSizeRelative: 'medium',
    billColor: { male: 'dark red in summer; blackish in fall and winter', female: 'dark red in summer; blackish in fall and winter' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#59626C', female: '#59626C' },
    uiColor: '#4A535D',
    secondaryColors: {
      male: ['#59626C (dark slate-gray back and wings)', '#FFFFFF (body, tail, wing trailing edge)', '#141416 (black wingtips)', '#2B2427 (dark bill and legs)', '#1A1A1A (summer black hood)'],
      female: ['Same as male — the sexes look alike'],
    },
    distinctiveMarkings: {
      male: [
        'Dark slate-gray back and wings — much darker than Ring-billed or Herring Gulls',
        'Black wingtips that blend into the gray, with tiny white tips and no big white mirrors',
        'Broad white trailing edge on the wing in flight',
        'Long, slightly drooping dark bill',
        'Dark legs',
        'Dark eye with white crescents above and below',
        'Summer: black hood. Fall and winter: white head with a smudgy gray "half-hood" behind the eye',
        'Slim, with long wings reaching well past the tail',
      ],
      female: ['Identical to male'],
      juvenile: ['Brown above with pale scaly edges, gray-brown breast, white rump and a black tail band', 'Molts into gray-backed first-winter plumage during its first fall'],
    },
    plumageDescription: {
      male: 'A slim, long-winged gull with a dark slate-gray back and black wingtips that melt into the gray. In summer the head is jet black with white eye crescents and the bill dark red. By September the hood is fading, and in fall the head is white with a gray smudge behind the eye like a half-hood, the bill and legs blackish.',
      female: 'Identical to male in plumage.',
      juvenile: 'Juveniles are brown and scaly above with a gray-brown chest, white rump, and black tail band; they turn gray-backed through their first fall.',
    },
  },

  primaryHabitat: ['beaches', 'bays', 'salt_marshes', 'harbors', 'piers', 'parking_lots', 'ball_fields'],
  feedingLayer: 'water_surface', flightStyle: 'gliding',
  socialBehavior: { breeding: 'colonial', winter: 'large_flocks' },
  typicalGroupSize: { min: 1, max: 300 }, activeHours: 'diurnal',

  sound: {
    callDescription: 'A high, nasal laugh: "ha-ha-ha-haah-haah-haah" — the long call that gives the bird its name. Also a single, sharp "kee-ow".',
    songDescription: 'No song. The laughing long call is given with the head thrown back, often by many birds at once around a colony.',
    loudness: 8, callFrequency: 8,
    singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'occasional', winter: 'silent' },
    sounds: ['ha-ha-ha laugh', 'kee-ow'],
  },

  seasons: {
    spring: { presence: 'migrant_and_breeder', commonness: 'common' },
    summer: { presence: 'breeder', commonness: 'abundant' },
    fall:   { presence: 'migrant', commonness: 'common' },
    winter: { presence: 'rare', commonness: 'rare' },
  },
  range: 'atlantic_flyway',
  regions: ['NE', 'SE'],

  captureStats: {
    difficulty: 4, speed: 6, flightiness: 5, camouflage: 3, sizeScore: 6,
    movementPattern: 'aerial_dart',
    captureBackground: 'open_water',
    behaviorNotes: 'Buoyant and acrobatic: swoops low over the waves to pluck food off the surface and twists through the air chasing flying ants on warm fall days. Faster and more agile than the big gulls — wait for it to hang in the wind. Look for the dark back and white trailing edge.',
  },

  rarity: 'common', rarityColor: '#4caf50', points: 110,
  verificationThreshold: 0.66, verificationMethods: 1,

  description: "The Laughing Gull is the dark-backed gull of New York and New Jersey summers, named for its loud \"ha-ha-ha\" call. Huge numbers nest in the salt marshes of Jamaica Bay and the Jersey shore, then linger into fall before heading south — most are gone by December. By fall the black summer hood has worn off, leaving a white head with a gray smudge behind the eye. Among other gulls, look for the much darker gray back, black wingtips with no big white spots, dark bill and legs, and slim, long-winged shape.",
  funFacts: [
    'Laughing Gulls are cheeky food thieves — in the South they sometimes stand right on a Brown Pelican\'s head and grab fish spilling from its pouch!',
    'Each spring, Laughing Gulls gather by the tens of thousands on Delaware Bay beaches in New Jersey to feast on the tiny green eggs of horseshoe crabs.',
    'In summer a Laughing Gull wears a black hood and a dark red bill. By fall the hood fades away — it is the same bird, just in its "winter clothes".',
  ],
  eBirdCode: 'laugul', merlinId: 'Laughing_Gull',
}
