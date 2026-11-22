// ─────────────────────────────────────────────────────────────
// BALD EAGLE
// ─────────────────────────────────────────────────────────────
export default {
  id: 'bald_eagle',
  commonName: 'Bald Eagle',
  scientificName: 'Haliaeetus leucocephalus',
  family: 'Accipitridae',
  order: 'Accipitriformes',

  sizeCategory: 'very_large',
  length_cm: [70, 102],
  wingspan_cm: [180, 230],
  weight_g: [3000, 6300],

  appearance: {
    billShape: 'hooked',
    billSizeRelative: 'massive',
    billColor: { male: 'yellow', female: 'yellow' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#4A3020', female: '#4A3020' },
    uiColor: '#6B4A2A',
    secondaryColors: {
      male: ['#FFFFFF (white head and tail)', '#4A3020 (dark chocolate-brown body)', '#F2C230 (bill, eye, feet)'],
      female: ['Same — sexes look identical; females are about 25% larger'],
    },
    distinctiveMarkings: {
      male: ['Snow-white head and tail (adults, 5+ years old)', 'Dark chocolate-brown body and wings', 'Massive hooked yellow bill', 'Pale yellow eye under a heavy brow', 'Bright yellow feet with black talons', 'Soars on long, flat, plank-like wings with "fingered" tips — barely any dihedral'],
      female: ['Identical in plumage; noticeably larger and heavier with a deeper bill'],
      juvenile: ['All dark brown, blotched with white underneath and on the wing linings', 'Dark bill and dark eye; head and tail turn white gradually over about 5 years', 'Often mistaken for a Golden Eagle or Turkey Vulture'],
    },
    plumageDescription: {
      male: 'The unmistakable American icon: a dark chocolate-brown body set off by a gleaming white head and white tail, a huge hooked yellow bill and yellow feet. In flight the wings look like long flat planks, held level with the outer feathers spread like fingers.',
      female: 'Same pattern as the male. Females are bigger — as with most raptors, the female is the larger, heavier partner.',
      juvenile: 'Young eagles are dark brown with messy white blotches on the belly and underwings, a dark bill and dark eye. It takes about five years for the white head and tail to come in fully.',
    },
  },

  primaryHabitat: ['rivers', 'lakes', 'reservoirs', 'coastlines', 'estuaries', 'tall_shoreline_trees'],
  feedingLayer: 'aerial',
  flightStyle: 'soaring',
  socialBehavior: {
    breeding: 'monogamous_pairs',
    winter: 'loose_communal_roosts',
  },
  typicalGroupSize: { min: 1, max: 6 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'Surprisingly weak and squeaky for such a big bird: a high, chittering, whistled giggle — "kleek-kik-ik-ik-ik". Movies usually dub in a Red-tailed Hawk scream instead.',
    songDescription: 'No true song. Pairs call to each other with the chittering giggle, often throwing the head back.',
    loudness: 5,
    callFrequency: 3,
    singingSeason: {
      spring: 'occasional',
      summer: 'occasional',
      fall: 'rare',
      winter: 'occasional',
    },
    sounds: ['chitter', 'giggle_call'],
  },

  seasons: {
    spring: { presence: 'resident', commonness: 'uncommon' },
    summer: { presence: 'resident', commonness: 'uncommon' },
    fall:   { presence: 'migrant_and_resident', commonness: 'uncommon' },
    winter: { presence: 'resident_and_winter_visitor', commonness: 'uncommon' },
  },
  range: 'north_america',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 6,
    speed: 4,
    flightiness: 5,
    camouflage: 2,
    sizeScore: 10,
    movementPattern: 'soaring',
    captureBackground: 'open_water',
    flightPattern: 'soaring',
    behaviorNotes: 'Huge and slow, but often high and far away. Sits for long stretches on a big snag or ice floe beside open water, then glides out on flat wings to snatch a fish from the surface. In fall, migrants ride ridge updrafts and the Hudson River corridor; in winter, look along the Hudson and big reservoirs where the water stays open.',
  },

  rarity: 'rare',
  rarityColor: '#9c27b0',
  points: 300,
  verificationThreshold: 0.80,
  verificationMethods: 1,

  description: 'America\'s national bird — and one of the greatest comeback stories in wildlife history. DDT poisoning and hunting dropped the Bald Eagle to only about 400 nesting pairs in the lower 48 states by the early 1960s. After DDT was banned in 1972 and the eagle was protected, it bounced back so well that it was taken off the Endangered Species list in 2007. Today you can watch them riding fall winds past hawk watches and fishing along the Hudson River in winter.',
  funFacts: [
    'Bald Eagles were down to about 400 nesting pairs in the lower 48 states in the 1960s because the pesticide DDT made their eggshells too thin to survive. After DDT was banned, they recovered to more than 300,000 birds!',
    'Bald Eagles build the biggest nests of any North American bird — one record nest in Florida was about 9.5 feet wide, 20 feet deep, and weighed nearly 2 tons.',
    'Benjamin Franklin grumbled that the Bald Eagle was a bird of "bad moral character" because it often steals fish from Ospreys instead of catching its own.',
    '"Bald" comes from an old word, "balde," meaning white — not hairless. Their heads are covered in white feathers.',
  ],
  eBirdCode: 'baleag',
  merlinId: 'Bald_Eagle',
}
