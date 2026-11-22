// American Herring Gull — the big "seagull" of NYC beaches and harbors. Same schema as src/data/birds.js.
export default {
  id: 'american_herring_gull',
  commonName: 'American Herring Gull',
  scientificName: 'Larus smithsonianus',
  family: 'Laridae',
  order: 'Charadriiformes',

  sizeCategory: 'large',
  length_cm: [56, 66], wingspan_cm: [135, 150], weight_g: [800, 1300],

  appearance: {
    billShape: 'hooked', billSizeRelative: 'large',
    billColor: { male: 'yellow with a red spot near the tip of the lower bill', female: 'yellow with a red spot near the tip of the lower bill' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#AEBAC5', female: '#AEBAC5' },
    uiColor: '#7E93A6',
    secondaryColors: {
      male: ['#AEBAC5 (pale silver-gray back and wings)', '#FFFFFF (body and tail)', '#16171A (black wingtips)', '#F1D04C (heavy yellow bill)', '#D8352A (red bill spot)', '#EDB0A8 (pink legs)'],
      female: ['Same as male — the sexes look alike'],
    },
    distinctiveMarkings: {
      male: [
        'Big and bulky with a flat-topped head',
        'Long, heavy yellow bill with a RED SPOT near the tip of the lower bill (no black ring)',
        'Pink legs',
        'Pale silver-gray back, a shade darker than a Ring-billed Gull',
        'Black wingtips with large white tips and white "mirrors"',
        'Pale yellow eye with a yellow-orange eye-ring',
        'Fall and winter: head and neck heavily smudged and streaked brown',
      ],
      female: ['Identical to male; females average smaller with slimmer bills'],
      juvenile: ['Dusky brown all over with an all-dark bill and pink legs', 'Takes four years to reach adult plumage, getting grayer each year'],
    },
    plumageDescription: {
      male: 'A big, powerful gull: white body and tail, pale silver-gray back and wings, and black wingtips with bold white spots. The long, heavy yellow bill has a bulge near the tip of the lower edge marked with a red spot. Legs are pink and the pale eye stares out from a yellow-orange ring. From fall through winter the head and neck are heavily streaked and smudged with brown; in spring and summer they are clean white.',
      female: 'Identical to male in plumage; females are a little smaller with a less massive bill.',
      juvenile: 'Young birds are dusky brown, checkered and mottled, with a blackish bill and pink legs — the big brown gulls on every beach. They take four years to become gray-and-white adults.',
    },
  },

  primaryHabitat: ['beaches', 'harbors', 'piers', 'jetties', 'bays', 'landfills', 'rooftops', 'reservoirs'],
  feedingLayer: 'multi', flightStyle: 'soaring',
  socialBehavior: { breeding: 'colonial', winter: 'large_flocks' },
  typicalGroupSize: { min: 1, max: 150 }, activeHours: 'diurnal',

  sound: {
    callDescription: 'Loud, ringing "heyah-heyah-ha-ha-ha-ha" long call — THE sound of the seashore. Also a deep "ga-ga-ga" alarm and a plaintive "mew".',
    songDescription: 'No song. The long call starts with the head bowed, then the bird throws its head back and bugles with bill wide open.',
    loudness: 9, callFrequency: 7,
    singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'moderate', winter: 'moderate' },
    sounds: ['long call', 'ga-ga-ga', 'mew'],
  },

  seasons: {
    spring: { presence: 'year_round', commonness: 'common' },
    summer: { presence: 'year_round', commonness: 'common' },
    fall:   { presence: 'year_round', commonness: 'very_common' },
    winter: { presence: 'year_round', commonness: 'very_common' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 3, speed: 4, flightiness: 4, camouflage: 2, sizeScore: 8,
    movementPattern: 'soaring',
    captureBackground: 'open_water',
    behaviorNotes: 'Glides and wheels on long wings over harbors and beaches, riding the sea breeze with hardly a flap, then drops onto a jetty or piling. Big and slow-moving — but on a windy day it can slide out of view fast. Check for pink legs and a red bill spot.',
  },

  rarity: 'common', rarityColor: '#4caf50', points: 100,
  verificationThreshold: 0.66, verificationMethods: 1,

  description: 'The American Herring Gull is the big gull most people mean when they say "seagull" — loud, bold, and clever, patrolling NYC beaches, piers, and harbors all year. Adults are white and silver-gray with black wingtips, pink legs, and a hefty yellow bill with a red spot. Young ones are brown and take four years to grow up, so a beach flock is a puzzle of ages. Compared with a Ring-billed Gull it is bigger and fiercer-looking, with pink (not yellow) legs and a red spot instead of a black ring. Until 2025 it was lumped with the Herring Gulls of Europe as one species.',
  funFacts: [
    'Herring Gulls crack clams and mussels by flying up high and dropping them onto rocks, jetties, or parking lots — then swooping down to eat the insides.',
    'The red spot on the bill is a dinner bell: chicks peck at it to make their parent cough up food. A scientist named Niko Tinbergen studied this and later won a Nobel Prize.',
    'Gulls can drink seawater! Special salt glands above their eyes pull extra salt out of their blood, and it drips out of their nostrils.',
  ],
  eBirdCode: 'amhgul1', merlinId: 'Herring_Gull',
}
