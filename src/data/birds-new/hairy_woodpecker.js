// Hairy Woodpecker — the Downy Woodpecker's bigger, longer-billed look-alike.
export default {
  id: 'hairy_woodpecker',
  commonName: 'Hairy Woodpecker',
  scientificName: 'Dryobates villosus',
  family: 'Picidae',
  order: 'Piciformes',

  sizeCategory: 'small',
  length_cm: [18, 26],
  wingspan_cm: [33, 41],
  weight_g: [40, 95],

  appearance: {
    billShape: 'chisel', billSizeRelative: 'large',
    billColor: { male: 'gray', female: 'gray' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#FAFAFA', female: '#FAFAFA' },
    uiColor: '#B71C1C',
    secondaryColors: {
      male: ['#17171B (crown, face stripes, wings, tail)', '#E1202C (nape patch)', '#FBFAF6 (underparts, back stripe, wing spots)'],
      female: ['Same but no red on the head'],
    },
    distinctiveMarkings: {
      male: ['Long chisel bill — nearly as long as the head', 'Red patch on the back of the head', 'Bold white stripe down the middle of the back', 'Black wings with rows of white spots', 'Clean white outer tail feathers with NO black spots', 'Black-and-white striped face', 'Black spur from the shoulder onto the breast side', 'Pure white, unmarked underparts'],
      female: ['Identical but no red on the head'],
      juvenile: ['Young birds can show a reddish or orange crown patch until their first fall'],
    },
    plumageDescription: {
      male: 'A crisp black-and-white woodpecker with a broad white back stripe, white-spotted black wings, and a red patch on the nape. The face is striped black and white. It looks almost exactly like a Downy Woodpecker — but bigger, with a long, strong, chisel-shaped bill nearly as long as its head and clean white outer tail feathers.',
      female: 'Same pattern as the male but with no red on the head.',
      juvenile: 'Like adults; young birds can have a reddish or orange-tinged crown for their first months.',
    },
  },

  primaryHabitat: ['mature_woodland', 'deciduous_forest', 'mixed_forest', 'parks', 'wooded_suburbs', 'feeders'],
  feedingLayer: 'bark',
  flightStyle: 'undulating',
  socialBehavior: { breeding: 'territorial_pairs', winter: 'solitary_or_mixed_flocks' },
  typicalGroupSize: { min: 1, max: 2 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A loud, sharp "PEEK!" — stronger and lower than the Downy\'s softer "pik."',
    songDescription: 'A fast rattle that stays on one pitch (the Downy\'s whinny slides downward). Drums in quick, steady bursts on dead branches.',
    loudness: 7, callFrequency: 6,
    singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'occasional', winter: 'occasional' },
    sounds: ['peek', 'rattle', 'drumming'],
  },

  seasons: {
    spring: { presence: 'resident', commonness: 'uncommon' },
    summer: { presence: 'resident', commonness: 'uncommon' },
    fall:   { presence: 'resident', commonness: 'uncommon' },
    winter: { presence: 'resident', commonness: 'uncommon' },
  },
  range: 'north_america_wide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 5, speed: 4, flightiness: 6, camouflage: 3, sizeScore: 3,
    movementPattern: 'climbing',
    flightPattern: 'undulating',
    captureBackground: 'forest_trunk',
    behaviorNotes: 'Hitches up big trunks and limbs, chiseling into bark for beetle larvae. Warier than a Downy — it often slips around to the far side of the trunk when watched. Listen for the loud "PEEK!" and check the bill length before you claim it.',
  },

  rarity: 'uncommon', rarityColor: '#2196f3', points: 140,
  verificationThreshold: 0.72, verificationMethods: 2,

  description: 'The Hairy Woodpecker is the Downy Woodpecker\'s look-alike big cousin — and telling them apart is a classic birding puzzle. Same black-and-white outfit, same red nape on the male, but the Hairy is bigger, louder and carries a serious chisel of a bill. It prefers bigger trees and deeper woods, drilling into bark for beetle larvae, and visits suet feeders in winter.',
  funFacts: [
    'Downy or Hairy? Look at the bill! A Hairy\'s bill is nearly as long as its head; a Downy\'s stubby bill is only about a third of its head length.',
    'Another clue: a Hairy\'s outer tail feathers are pure white, while a Downy\'s have little black spots or bars.',
    'Hairy Woodpeckers sometimes follow Pileated Woodpeckers around, picking up insects in the big holes the Pileated digs.',
    'Like other woodpeckers, Hairies have stiff tail feathers that work like a kickstand, bracing them against the trunk while they hammer.',
  ],
  eBirdCode: 'haiwoo',
  merlinId: 'Hairy_Woodpecker',
}
