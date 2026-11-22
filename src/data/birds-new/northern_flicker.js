// Northern Flicker — eastern "Yellow-shafted" form (the one NYC / northern NJ players see).
export default {
  id: 'northern_flicker',
  commonName: 'Northern Flicker',
  scientificName: 'Colaptes auratus',
  family: 'Picidae',
  order: 'Piciformes',

  sizeCategory: 'medium',
  length_cm: [28, 31],
  wingspan_cm: [42, 51],
  weight_g: [86, 167],

  appearance: {
    billShape: 'curved', billSizeRelative: 'medium',
    billColor: { male: 'dark gray', female: 'dark gray' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#9A7350', female: '#9A7350' },
    uiColor: '#C8962A',
    secondaryColors: {
      male: ['#8E9298 (gray crown & nape)', '#D8AE80 (tan face & throat)', '#D7232B (red nape crescent)', '#1C1714 (bib, mustache, spots, bars)', '#F2BE2A (underwing & tail shafts)', '#FFFFFF (rump)'],
      female: ['Same as male but no black mustache'],
    },
    distinctiveMarkings: {
      male: ['Black "mustache" stripe from the bill', 'Gray crown and nape with a red crescent on the back of the head', 'Tan face and throat', 'Black crescent bib on the upper breast', 'Creamy underparts covered in round black spots', 'Brown back and wings barred with black', 'Bright yellow underwings and yellow tail shafts', 'Big white rump patch that flashes in flight'],
      female: ['Same pattern but no black mustache (plain tan cheek)'],
      juvenile: ['Like adults but duller, with fuzzier spotting; young males show a mustache early'],
    },
    plumageDescription: {
      male: 'A big, ground-loving woodpecker dressed like a brown, polka-dotted field bird. Gray crown with a red crescent at the nape, tan face, and a bold black mustache. A black crescent bib sits above creamy, black-spotted underparts; the brown back is barred with black. In flight it explodes into color: golden-yellow wing linings and tail shafts, and a gleaming white rump.',
      female: 'Identical to the male except she lacks the black mustache.',
      juvenile: 'Similar to adults but slightly duller and fluffier; by fall they look like adults.',
    },
  },

  primaryHabitat: ['lawns', 'parks', 'open_woodland', 'woodland_edge', 'suburban', 'golf_courses'],
  feedingLayer: 'ground',
  flightStyle: 'undulating',
  socialBehavior: { breeding: 'territorial_pairs', winter: 'solitary_or_loose_groups' },
  typicalGroupSize: { min: 1, max: 6 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A loud, ringing "klee-yer!" or "kyeer," plus a soft "wicka-wicka-wicka" when two birds meet. Also drums on trees, poles and even metal chimney caps.',
    songDescription: 'A long, rolling "wik-wik-wik-wik-wik" that can go on for several seconds — loud enough to carry across a park.',
    loudness: 8, callFrequency: 6,
    singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'occasional', winter: 'rare' },
    sounds: ['klee-yer', 'wik-wik-wik', 'wicka-wicka', 'drumming'],
  },

  seasons: {
    spring: { presence: 'year_round', commonness: 'common' },
    summer: { presence: 'year_round', commonness: 'common' },
    fall:   { presence: 'year_round', commonness: 'common' },
    winter: { presence: 'year_round', commonness: 'uncommon' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 4, speed: 5, flightiness: 6, camouflage: 5, sizeScore: 4,
    movementPattern: 'walking',
    flightPattern: 'undulating',
    captureBackground: 'open_field',
    behaviorNotes: 'Usually found ON THE GROUND, hopping and probing lawns for ants — surprisingly well camouflaged in leaf litter. Flushes suddenly, showing a white rump and flashes of yellow, then lands on a nearby trunk or branch. Fall migration (September–October) brings lots of them through city parks.',
  },

  rarity: 'common', rarityColor: '#4caf50', points: 105,
  verificationThreshold: 0.65, verificationMethods: 2,

  description: 'The Northern Flicker is a woodpecker that would rather be on the lawn. It hops through grass and leaf litter, hammering into anthills with its slightly curved bill and slurping up ants with a long, sticky tongue. Brown and spotted on the ground, it turns into a flash of golden yellow and white the moment it takes off. The eastern "Yellow-shafted" form has bright yellow under the wings and tail.',
  funFacts: [
    'Flickers eat more ants than almost any other North American bird — ants can make up nearly half of their diet!',
    'A flicker can stick its tongue out about 5 cm (2 inches) past the tip of its bill to lick up ants and their larvae.',
    'Flickers sometimes "ant": they let ants crawl over their feathers, or rub them on, possibly to help keep pests like feather mites away.',
    'The Yellow-shafted Flicker is the state bird of Alabama, where it is nicknamed the "Yellowhammer."',
  ],
  eBirdCode: 'norfli',
  merlinId: 'Northern_Flicker',
}
