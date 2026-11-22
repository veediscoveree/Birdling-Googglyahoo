// Double-crested Cormorant — NYC/northern NJ: breeds on harbor islands, passes in huge
// flocks Sep–Nov, a few linger in winter.
export default {
  id: 'double_crested_cormorant',
  commonName: 'Double-crested Cormorant',
  scientificName: 'Nannopterum auritum',
  family: 'Phalacrocoracidae',
  order: 'Suliformes',

  sizeCategory: 'large',
  length_cm: [70, 90],
  wingspan_cm: [114, 123],
  weight_g: [1200, 2500],

  appearance: {
    billShape: 'hooked',
    billSizeRelative: 'large',
    billColor: { male: 'dark gray with hooked tip', female: 'dark gray with hooked tip' },
    crestPresent: true,
    crestColor: { male: 'black (breeding only)', female: 'black (breeding only)' },
    primaryColor: { male: '#1E2220', female: '#1E2220' },
    uiColor: '#E8962A',
    secondaryColors: {
      male: ['#1E2220 (glossy blackish body)', '#E8962A (orange-yellow bare throat pouch and face skin)', '#2FB8A8 (turquoise eye)', '#6A5A3E (bronzy, black-edged back feathers)', '#3A7CC8 (blue mouth lining, breeding)'],
      female: ['Identical to male'],
    },
    distinctiveMarkings: {
      male: ['Blackish all over with a faint green-bronze gloss', 'Bare orange-yellow throat pouch and face skin', 'Long, thin bill with a hooked tip', 'Brilliant turquoise-green eye', 'Sits low in the water with bill tilted upward', 'Often perches with wings spread out to dry', 'Small curly "double crests" on the head in spring only', 'Flies with a slight kink in the neck, often in lines or V\'s'],
      female: ['Identical to male in plumage'],
      juvenile: ['Brown rather than black', 'Pale whitish-buff neck and breast, darker belly', 'Duller yellow-orange face skin'],
    },
    plumageDescription: {
      male: 'A long-necked, goose-sized diving bird that looks black from a distance but glows oily green-bronze up close, with coppery back feathers edged in black like scales. The bare skin of the face and throat pouch is orange-yellow, the eye is a startling turquoise, and the thin gray bill ends in a sharp hook. In spring, breeding adults grow two small curly black tufts behind the eyes — the "double crest" in the name — and the inside of the mouth turns bright blue.',
      female: 'Identical to male. Sexes cannot be told apart in the field.',
      juvenile: 'Brown above with a pale, whitish-buff neck and breast that fades into a darker belly. Young birds can look surprisingly pale-chested in fall.',
    },
  },

  primaryHabitat: ['harbors', 'rivers', 'lakes', 'reservoirs', 'coastal_bays', 'pilings_and_jetties'],
  feedingLayer: 'water',
  flightStyle: 'direct',
  socialBehavior: {
    breeding: 'colonial_nesting',
    winter: 'flocks',
  },
  typicalGroupSize: { min: 1, max: 500 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'Usually silent away from the nest. At colonies gives deep, pig-like grunts and croaks.',
    songDescription: 'No song. Nesting colonies are noisy with grunting, gargling, and bill-snapping.',
    loudness: 4,
    callFrequency: 2,
    singingSeason: {
      spring: 'occasional',
      summer: 'occasional',
      fall: 'rare',
      winter: 'rare',
    },
    sounds: ['grunt', 'croak'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'common' },
    summer: { presence: 'breeder', commonness: 'common' },
    fall:   { presence: 'migrant', commonness: 'abundant' },
    winter: { presence: 'winter', commonness: 'uncommon' },
  },
  range: 'north_america',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 3,
    speed: 3,
    flightiness: 4,
    camouflage: 3,
    sizeScore: 8,
    movementPattern: 'swimming',
    captureBackground: 'open_water',
    flightPattern: 'direct',
    behaviorNotes: 'Rides low on the water like a half-sunk log, bill tipped up, then vanishes in a smooth forward dive and pops up somewhere else. Between fishing trips it stands on pilings, rocks, and buoys with wings spread wide to dry. Big and slow on the surface — the trick is catching it before it dives.',
  },

  rarity: 'common',
  rarityColor: '#4caf50',
  points: 130,
  verificationThreshold: 0.70,
  verificationMethods: 1,

  description: 'The dark, snaky-necked bird standing on a piling with its wings held open like a cape is a Double-crested Cormorant. It is an underwater hunter: it dives from the surface and chases fish by kicking with big webbed feet. Its feathers soak up some water, which makes it less floaty and better at diving — so afterwards it has to hang its wings out to dry. In fall, long wavering lines and V\'s of cormorants stream down the Hudson and the coast, and people often mistake them for geese.',
  funFacts: [
    'Cormorant feathers are not fully waterproof. That makes them less floaty so they can dive easily — and is why you see them standing with wings spread out to dry in the sun.',
    'The name "cormorant" comes from Latin words meaning "sea raven" — a good name for a big black bird that fishes.',
    'All four of a cormorant\'s toes are joined by webbing, making each foot a powerful paddle for chasing fish underwater.',
    'The "double crest" is two little curly feather tufts on the head that adults grow only in spring — most people who see a cormorant never notice them.',
  ],
  eBirdCode: 'doccor',
  merlinId: 'Double-crested_Cormorant',
}
