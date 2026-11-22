// Great Egret — NYC/northern NJ: breeds on harbor islands; common in marshes Apr–Oct,
// most gone by late November.
export default {
  id: 'great_egret',
  commonName: 'Great Egret',
  scientificName: 'Ardea alba',
  family: 'Ardeidae',
  order: 'Pelecaniformes',

  sizeCategory: 'very_large',
  length_cm: [94, 104],
  wingspan_cm: [131, 145],
  weight_g: [700, 1500],

  appearance: {
    billShape: 'spear',
    billSizeRelative: 'massive',
    billColor: { male: 'yellow', female: 'yellow' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#FAFAF6', female: '#FAFAF6' },
    uiColor: '#E8C020',
    secondaryColors: {
      male: ['#FAFAF6 (all-white plumage)', '#E8C020 (long yellow bill)', '#141414 (black legs and feet)', '#8CC83C (lime-green face skin, breeding)', '#F0D040 (yellow eye)'],
      female: ['Identical to male'],
    },
    distinctiveMarkings: {
      male: ['Pure white all over', 'Long, dagger-shaped yellow bill', 'Black legs AND black feet', 'Very long, thin S-curved neck', 'Yellow eye', 'Long lacy plumes (aigrettes) trailing from the back in breeding season', 'Lime-green skin in front of the eye when breeding', 'Flies with neck pulled into an S and legs trailing'],
      female: ['Identical to male in plumage'],
      juvenile: ['Like adults but without plumes'],
    },
    plumageDescription: {
      male: 'Tall, slender, and snow-white, with a long yellow bill and black legs and feet. The neck is very long and folds into an S-shape. In spring and summer, breeding adults grow long, lacy plumes from the back that drape past the tail, and the bare skin in front of the eye turns lime green.',
      female: 'Identical to male.',
      juvenile: 'Like a non-breeding adult: all white, yellow bill, black legs, no plumes.',
    },
  },

  primaryHabitat: ['salt_marshes', 'freshwater_marshes', 'ponds', 'tidal_flats', 'lake_edges', 'flooded_fields'],
  feedingLayer: 'water',
  flightStyle: 'direct',
  socialBehavior: {
    breeding: 'colonial_nesting',
    winter: 'loose_groups',
  },
  typicalGroupSize: { min: 1, max: 20 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A low, harsh croak — "kraaak" — when flushed or squabbling. Sounds surprisingly rough for such an elegant bird.',
    songDescription: 'No song. Colonies are full of croaks, cuk-cuk calls, and bill-clacking.',
    loudness: 6,
    callFrequency: 2,
    singingSeason: {
      spring: 'occasional',
      summer: 'occasional',
      fall: 'rare',
      winter: 'rare',
    },
    sounds: ['croak', 'kraak', 'clack'],
  },

  seasons: {
    spring: { presence: 'summer', commonness: 'common' },
    summer: { presence: 'breeder', commonness: 'common' },
    fall:   { presence: 'migrant', commonness: 'common' },
    winter: { presence: 'absent', commonness: 'rare' },
  },
  range: 'americas_and_worldwide',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 3,
    speed: 1,
    flightiness: 5,
    camouflage: 1,
    sizeScore: 9,
    movementPattern: 'stalking',
    captureBackground: 'wetland',
    flightPattern: 'direct',
    behaviorNotes: 'Wades slowly through shallow marsh water, neck stretched forward, then freezes — and stabs a fish with a lightning-fast strike. Bright white and huge, so it is easy to find; it barely moves, so steady hands win. Flushes with slow, deep wingbeats if you push too close.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 220,
  verificationThreshold: 0.80,
  verificationMethods: 1,

  description: 'A tall, snow-white heron with a long yellow bill and black legs, wading slowly through the marsh like it has all the time in the world. Great Egrets hunt by standing still or creeping forward, then spearing fish, frogs, and crabs with a strike too fast to follow. In NYC they nest on small islands in the harbor and feed in marshes from Jamaica Bay to the Meadowlands, staying into fall before most head south.',
  funFacts: [
    'Over 100 years ago, egret plumes were so popular on fancy hats that an ounce of them could cost more than an ounce of gold. People who were upset about egrets being killed helped start the bird-protection movement — and the Great Egret became the symbol of the National Audubon Society.',
    'Field-guide trick: a Great Egret has a YELLOW bill and BLACK feet. The smaller Snowy Egret is the opposite — a black bill and bright yellow "golden slippers."',
    'Herons and egrets fly with their necks folded into an S-shape, unlike cranes, which stretch their necks straight out.',
  ],
  eBirdCode: 'greegr',
  merlinId: 'Great_Egret',
}
