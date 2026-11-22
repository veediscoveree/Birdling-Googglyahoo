// ─────────────────────────────────────────────────────────────
// ROCK PIGEON (introduced)
// ─────────────────────────────────────────────────────────────
export default {
  id: 'rock_pigeon',
  commonName: 'Rock Pigeon',
  scientificName: 'Columba livia',
  family: 'Columbidae',
  order: 'Columbiformes',
  sizeCategory: 'medium',
  length_cm: [29, 37], wingspan_cm: [50, 67], weight_g: [265, 380],
  appearance: {
    billShape: 'thin', billSizeRelative: 'small',
    billColor: { male: 'dark gray with white cere', female: 'dark gray with white cere' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#9AA1B2', female: '#9AA1B2' },
    uiColor: '#6E7894',
    secondaryColors: {
      male: ['#5C6377 (head)', '#3E9C6A (neck gloss)', '#8A4AA0 (neck gloss)', '#16181D (wing bars, tail band)', '#FFFFFF (rump)'],
      female: ['Sexes look alike; male\'s neck gloss slightly brighter'],
    },
    distinctiveMarkings: {
      male: ['Blue-gray body with darker slate head', 'Iridescent green-and-purple neck', 'Two bold black wing bars', 'White rump (flashes in flight)', 'Black band at the tail tip', 'Red-orange eye', 'White cere at the base of the bill', 'Pink-red feet'],
      female: ['Same pattern; neck iridescence a little duller'],
      juvenile: ['Duller and browner-gray, little neck gloss, dark eye'],
    },
    plumageDescription: {
      male: 'The "wild-type" pigeon: pale blue-gray wings crossed by two black bars, a darker slate head, and a neck that shimmers green and purple in the light. White rump, gray tail with a black tip, red-orange eye and pink feet. City flocks also include "checkered," rusty, white, and patchy birds — all the same species, descended from domestic pigeons.',
      female: 'Like the male, with slightly less neck iridescence.',
      juvenile: 'Duller and browner with little gloss and a dark eye.',
    },
  },
  primaryHabitat: ['urban', 'city_parks', 'bridges', 'farmland', 'sea_cliffs'],
  feedingLayer: 'ground', flightStyle: 'direct',
  socialBehavior: { breeding: 'loosely_colonial', winter: 'large_flocks' },
  typicalGroupSize: { min: 2, max: 200 }, activeHours: 'diurnal',
  sound: {
    callDescription: 'Soft, throaty "coo-roo-c\'too-coo." On take-off the wings clap together with a loud slap.',
    songDescription: 'Males coo while bowing and turning in circles with the neck puffed out.',
    loudness: 4, callFrequency: 7,
    singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'frequent', winter: 'moderate' },
    sounds: ['coo', 'wing_clap'],
  },
  seasons: {
    spring: { presence: 'resident', commonness: 'very_common' },
    summer: { presence: 'resident', commonness: 'very_common' },
    fall:   { presence: 'resident', commonness: 'very_common' },
    winter: { presence: 'resident', commonness: 'very_common' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],
  captureStats: {
    difficulty: 1, speed: 3, flightiness: 2, camouflage: 2, sizeScore: 5,
    movementPattern: 'walking', captureBackground: 'urban_edge', flightPattern: 'direct',
    behaviorNotes: 'Walks the sidewalk with a nodding head-bob, pecking at crumbs. Very used to people; flocks burst up with clapping wings, circle a block, and land again nearby.',
  },
  rarity: 'common', rarityColor: '#4caf50', points: -10,
  introduced: true,
  invasiveNote: 'Brought to North America by European settlers in the early 1600s as a domestic bird, the Rock Pigeon escaped and now lives in nearly every city on the continent. It competes less with native birds than starlings or House Sparrows do, but it is not a native species — so it scores like the other introduced birds, and releasing it is the right call.',
  verificationThreshold: 0.55, verificationMethods: 1,
  description: 'The Rock Pigeon\'s wild ancestors nested on sea cliffs in Europe, North Africa and Asia — and to a pigeon, a city is just a giant cliff with excellent ledges. Domesticated thousands of years ago for food, messages and racing, pigeons escaped wherever people took them. Look closely and the "ordinary" city pigeon is a handsome bird: soft blue-gray, two black wing bars, and a neck that flashes green and purple in the sun.',
  funFacts: [
    'The pigeon\'s famous head-bob isn\'t really bobbing: the head thrusts forward and then holds perfectly still while the body walks underneath it, so the pigeon gets a steady, non-blurry view with every step.',
    'In World War I a homing pigeon named Cher Ami carried a message that helped rescue nearly 200 trapped American soldiers — even though she had been shot on the way. She was awarded a French medal for bravery.',
    'Pigeon parents — both mom and dad — feed their babies "crop milk," a rich, cheesy-looking food made in their throats. Very few birds can do this.',
    'In lab experiments, pigeons have learned to tell paintings by Monet from paintings by Picasso!',
  ],
  eBirdCode: 'rocpig', merlinId: 'Rock_Pigeon',
}
