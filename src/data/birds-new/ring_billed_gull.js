// Ring-billed Gull — the medium-sized "parking-lot gull". Same schema as src/data/birds.js.
export default {
  id: 'ring_billed_gull',
  commonName: 'Ring-billed Gull',
  scientificName: 'Larus delawarensis',
  family: 'Laridae',
  order: 'Charadriiformes',

  sizeCategory: 'medium',
  length_cm: [43, 54], wingspan_cm: [112, 127], weight_g: [300, 700],

  appearance: {
    billShape: 'hooked', billSizeRelative: 'medium',
    billColor: { male: 'yellow with a complete black ring near the tip', female: 'yellow with a complete black ring near the tip' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#B9C5CF', female: '#B9C5CF' },
    uiColor: '#8FA3B5',
    secondaryColors: {
      male: ['#B9C5CF (pale silver-gray back and wings)', '#FFFFFF (head, body, tail)', '#16171A (black wingtips)', '#EECB43 (yellow bill and legs)', '#D23A2E (red eye-ring)'],
      female: ['Same as male — the sexes look alike'],
    },
    distinctiveMarkings: {
      male: [
        'Yellow bill with a complete black RING near the tip — the namesake mark',
        'Yellow legs (Herring Gull has pink legs, Laughing Gull dark legs)',
        'Pale silver-gray back, a shade paler than a Herring Gull',
        'Black wingtips with white spots; white "mirrors" show in flight',
        'Pale yellow eye with a thin red eye-ring',
        'Fall and winter: white head finely freckled with brown on the nape',
        'Medium size with a rounded head and a fairly short, slim bill',
      ],
      female: ['Identical to male'],
      juvenile: ['Mottled brown-and-gray first winter, with a pink bill tipped black and pink legs', 'Takes three years to reach adult plumage — first-winter birds already show a gray back'],
    },
    plumageDescription: {
      male: 'A clean, medium-sized gull: snow-white head, body, and tail with a pale silver-gray back and wings and black wingtips spotted white. The yellow bill is crossed by a crisp black ring near the tip, the legs are yellow, and the pale eye has a thin red ring. From September through winter the head is freckled with fine brown spots, heaviest on the nape; by spring it is pure white again.',
      female: 'Identical to male in plumage; females average slightly smaller.',
      juvenile: 'First-fall birds are a checkerboard of brown and gray with a pink bill tipped black and pink legs. Over three years they turn grayer and whiter, gaining the yellow bill ring and yellow legs of the adult.',
    },
  },

  primaryHabitat: ['parking_lots', 'parks', 'ball_fields', 'beaches', 'reservoirs', 'harbors', 'landfills', 'farm_fields'],
  feedingLayer: 'ground', flightStyle: 'direct',
  socialBehavior: { breeding: 'colonial', winter: 'large_flocks' },
  typicalGroupSize: { min: 1, max: 300 }, activeHours: 'diurnal',

  sound: {
    callDescription: 'A high, squealing "kee-yah" and laughing "kyow-kyow-kyow" — higher and thinner than a Herring Gull. Flocks keep up a mewing, squabbling chatter.',
    songDescription: 'No song. The "long call" is a series of shrill, laughing notes given with the head thrown back.',
    loudness: 7, callFrequency: 8,
    singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'frequent', winter: 'frequent' },
    sounds: ['kee-yah', 'kyow', 'mew'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'common' },
    summer: { presence: 'summer', commonness: 'uncommon' },
    fall:   { presence: 'migrant', commonness: 'abundant' },
    winter: { presence: 'winter', commonness: 'abundant' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 2, speed: 3, flightiness: 3, camouflage: 2, sizeScore: 7,
    movementPattern: 'walking',
    captureBackground: 'urban_edge',
    behaviorNotes: 'Walks confidently across parking lots, lawns, and ball fields, pausing to stare at anything that might be food. Bold around people — often the easiest gull to get close to. Check the bill for the black ring and the legs for yellow.',
  },

  rarity: 'common', rarityColor: '#4caf50', points: 90,
  verificationThreshold: 0.66, verificationMethods: 1,

  description: "The Ring-billed Gull is the gull of shopping-center parking lots, school fields, and city parks — the one waiting for your dropped french fry. It is medium-sized and tidy, with a pale gray back, yellow legs, and a yellow bill wrapped in a neat black ring. Around NYC they pour in from inland nesting colonies from late summer on and stay all winter. Next to a Herring Gull, look for the smaller size, rounder head, slimmer bill with a ring (not a red spot), and yellow (not pink) legs.",
  funFacts: [
    'Around 1900, hunting and egg collecting made Ring-billed Gulls scarce on the Great Lakes. Once they were protected they bounced back so well that there are now millions of them.',
    'It takes a Ring-billed Gull three years to grow its grown-up gray-and-white feathers. Until then, young birds wear scruffy brown patterns that change every year.',
    'Ring-billed Gulls follow farmers\' plows to snap up the worms and grubs turned up in the soil — and they have learned that fast-food restaurants are just as good.',
  ],
  eBirdCode: 'ribgul', merlinId: 'Ring-billed_Gull',
}
