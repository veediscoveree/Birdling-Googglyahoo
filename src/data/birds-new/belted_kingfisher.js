// Belted Kingfisher — NYC/northern NJ: on ponds, streams and harbor edges all year where
// water stays open; most numerous during fall migration (Sep–Oct).
export default {
  id: 'belted_kingfisher',
  commonName: 'Belted Kingfisher',
  scientificName: 'Megaceryle alcyon',
  family: 'Alcedinidae',
  order: 'Coraciiformes',

  sizeCategory: 'medium',
  length_cm: [28, 35],
  wingspan_cm: [48, 58],
  weight_g: [113, 178],

  appearance: {
    billShape: 'spear',
    billSizeRelative: 'large',
    billColor: { male: 'black with gray base', female: 'black with gray base' },
    crestPresent: true,
    crestColor: { male: 'slate-blue', female: 'slate-blue' },
    primaryColor: { male: '#4A6E96', female: '#4A6E96' },
    uiColor: '#4A6E96',
    secondaryColors: {
      male: ['#4A6E96 (slate-blue head, crest, back, breast band)', '#FFFFFF (white collar, throat, belly)', '#FFFFFF (small spot in front of eye)', '#1A1A1A (dagger bill)'],
      female: ['#4A6E96 (same slate-blue upperparts and breast band)', '#B85A2A (rusty belly band and flanks)', '#FFFFFF (white collar and throat)'],
    },
    distinctiveMarkings: {
      male: ['Slate-blue head, back, and wings', 'Big, shaggy, ragged crest', 'Wide white collar around the neck', 'One slate-blue band across the white breast', 'Long, heavy, dagger-shaped bill', 'Small white spot in front of the eye', 'Large head, short legs, small feet'],
      female: ['Same as male PLUS a second, rusty-orange band across the belly that runs down the flanks', 'One of the few North American birds where the female is more colorful than the male'],
      juvenile: ['Like adults but the blue breast band is mixed with rusty brown', 'Young males can show some rust on the sides'],
    },
    plumageDescription: {
      male: 'A big-headed, stocky bird with a shaggy slate-blue crest that looks like a bad hair day, a heavy black dagger of a bill, and a bright white collar ringing the neck. Below it is white with a single slate-blue band across the chest. White spots dot the dark wings and tail.',
      female: 'Like the male but with an extra rusty-orange "belt" across the belly that extends down the flanks — so the female wears two belts, one blue and one rust.',
      juvenile: 'Similar to adults, with rusty mottling in the blue breast band.',
    },
  },

  primaryHabitat: ['streams', 'rivers', 'ponds', 'lakes', 'estuaries', 'harbor_edges'],
  feedingLayer: 'water',
  flightStyle: 'direct',
  socialBehavior: {
    breeding: 'territorial_pairs',
    winter: 'solitary',
  },
  typicalGroupSize: { min: 1, max: 2 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A loud, dry, wooden rattle — like a fishing reel spinning or a stick dragged along a fence — often given in flight as the bird patrols the shoreline.',
    songDescription: 'No true song; the rattle does the job of a song, announcing its stretch of water.',
    loudness: 8,
    callFrequency: 7,
    singingSeason: {
      spring: 'frequent',
      summer: 'frequent',
      fall: 'frequent',
      winter: 'moderate',
    },
    sounds: ['rattle'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'uncommon' },
    summer: { presence: 'breeder', commonness: 'uncommon' },
    fall:   { presence: 'migrant', commonness: 'uncommon' },
    winter: { presence: 'winter', commonness: 'rare' },
  },
  range: 'north_america',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 7,
    speed: 7,
    flightiness: 8,
    camouflage: 3,
    sizeScore: 5,
    movementPattern: 'hovering',
    captureBackground: 'wetland',
    flightPattern: 'direct',
    behaviorNotes: 'Watches the water from a branch or piling, or hovers on fast-beating wings over open water — then folds up and plunges headfirst after a fish. Hears you coming: flies off rattling along the shoreline. Lock on during the hover, before the dive.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 240,
  verificationThreshold: 0.80,
  verificationMethods: 1,

  description: 'Listen for a loud, dry rattle along a pond or stream — that is a Belted Kingfisher announcing its territory. This big-headed, shaggy-crested fisher sits on a branch over the water or hovers in mid-air, then plunges headfirst to grab a small fish in its dagger bill. Back on its perch it whacks the fish against the branch and swallows it headfirst. Kingfishers nest in tunnels they dig into sandy or muddy banks.',
  funFacts: [
    'The female Belted Kingfisher is more colorful than the male — she wears an extra rusty-orange belt across her belly. That is backwards from most birds!',
    'Kingfishers dig their own nest tunnels into dirt banks, usually 3 to 6 feet long, using their bills to dig and their small feet to kick the dirt out.',
    'After catching a fish, a kingfisher often smacks it against a branch, flips it, and swallows it headfirst so the fins and scales go down smoothly.',
  ],
  eBirdCode: 'belkin1',
  merlinId: 'Belted_Kingfisher',
}
