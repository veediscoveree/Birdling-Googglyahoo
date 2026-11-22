// ─────────────────────────────────────────────────────────────
// TUFTED TITMOUSE
// ─────────────────────────────────────────────────────────────
export default {
  id: 'tufted_titmouse',
  commonName: 'Tufted Titmouse',
  scientificName: 'Baeolophus bicolor',
  family: 'Paridae',
  order: 'Passeriformes',
  sizeCategory: 'small',
  length_cm: [14, 16], wingspan_cm: [20, 26], weight_g: [18, 26],
  appearance: {
    billShape: 'conical', billSizeRelative: 'small',
    billColor: { male: 'dark gray', female: 'dark gray' },
    crestPresent: true, crestColor: { male: '#8B929F', female: '#8B929F' },
    primaryColor: { male: '#959CA8', female: '#959CA8' },
    uiColor: '#7A8496',
    secondaryColors: {
      male: ['#F4F1EC (underparts)', '#E59E70 (flanks)', '#17181C (forehead)'],
      female: ['Sexes look alike'],
    },
    distinctiveMarkings: {
      male: ['Pointed gray crest', 'Small black patch on the forehead above the bill', 'Big black eye on a plain gray face', 'Soft gray back and wings', 'Whitish underparts', 'Peach-rust flanks'],
      female: ['Identical to male'],
      juvenile: ['Forehead patch gray, not black; crest a little shorter'],
    },
    plumageDescription: {
      male: 'A small, soft-gray songbird with a pointed crest, whitish front and warm peach-rust sides. The big black eye stands out on a plain gray face, and a little black patch sits on the forehead just above the stubby bill. Unlike its cousin the chickadee, it has no black cap or bib.',
      female: 'Identical to male.',
      juvenile: 'Like adults but the forehead patch is gray rather than black.',
    },
  },
  primaryHabitat: ['deciduous_woodland', 'mixed_forest', 'suburban', 'parks', 'feeders'],
  feedingLayer: 'canopy', flightStyle: 'undulating',
  socialBehavior: { breeding: 'pairs', winter: 'mixed_flocks' },
  typicalGroupSize: { min: 1, max: 6 }, activeHours: 'diurnal',
  sound: {
    callDescription: 'A raspy, scolding "tsee-day-day-day," harsher and lower than a chickadee\'s call.',
    songDescription: 'A loud, clear whistled "peter-peter-peter" — one of the commonest backyard songs in the East, heard even on mild winter days.',
    loudness: 7, callFrequency: 8,
    singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'occasional', winter: 'moderate' },
    sounds: ['peter_peter', 'scold'],
  },
  seasons: {
    spring: { presence: 'resident', commonness: 'common' },
    summer: { presence: 'resident', commonness: 'common' },
    fall:   { presence: 'resident', commonness: 'common' },
    winter: { presence: 'resident', commonness: 'common' },
  },
  range: 'eastern_north_america',
  regions: ['NE', 'SE'],
  captureStats: {
    difficulty: 4, speed: 6, flightiness: 3, camouflage: 4, sizeScore: 2,
    movementPattern: 'active_gleaning', captureBackground: 'forest_edge', flightPattern: 'undulating',
    behaviorNotes: 'Busy and bold. Darts to the feeder, grabs one seed, flies to a branch, then holds it under its feet and hammers it open. Often travels with chickadees in fall and winter flocks.',
  },
  rarity: 'common', rarityColor: '#4caf50', points: 115,
  verificationThreshold: 0.65, verificationMethods: 1,
  description: 'The Tufted Titmouse is the little gray bird with the punk-rock crest that zips in and out of eastern feeders all year. It\'s a close cousin of the chickadee and often travels with them, scolding loudly at owls and cats. In fall it stashes seeds in bark cracks to eat later, and its whistled "peter-peter-peter" rings through yards and parks from late winter on.',
  funFacts: [
    'Titmice line their nests with hair — and some have been seen plucking it straight from living raccoons, dogs, squirrels, and even people!',
    'In fall and winter, titmice hide seeds one at a time in bark and crevices, usually close to the feeder, then come back for them later.',
    'The name has nothing to do with mice: "titmouse" comes from old English words meaning "small bird."',
    'A hundred years ago titmice were rare in New York and New England — bird feeders and milder winters helped them spread north.',
  ],
  eBirdCode: 'tuftit', merlinId: 'Tufted_Titmouse',
}
