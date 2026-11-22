// ─────────────────────────────────────────────────────────────
// COMMON RAVEN
// ─────────────────────────────────────────────────────────────
export default {
  id: 'common_raven',
  commonName: 'Common Raven',
  scientificName: 'Corvus corax',
  family: 'Corvidae',
  order: 'Passeriformes',
  sizeCategory: 'large',
  length_cm: [56, 67], wingspan_cm: [116, 118], weight_g: [689, 1625],
  appearance: {
    billShape: 'hooked', billSizeRelative: 'large',
    billColor: { male: 'black', female: 'black' },
    crestPresent: false, crestColor: { male: null, female: null },
    primaryColor: { male: '#15161D', female: '#15161D' },
    uiColor: '#3A3550',
    secondaryColors: {
      male: ['#5A5A9A (blue-violet gloss)', '#2A170E (eye)'],
      female: ['Sexes look alike'],
    },
    distinctiveMarkings: {
      male: ['All glossy black', 'Massive, deep, curved bill with bristly base', 'Shaggy throat feathers ("hackles")', 'Long wedge-shaped tail in flight', 'Long, pointed, "fingered" wings', 'Much bigger than a crow — about hawk-sized'],
      female: ['Identical to male'],
      juvenile: ['Duller black with less gloss; throat less shaggy'],
    },
    plumageDescription: {
      male: 'Entirely black with a blue-violet sheen. The bill is huge and heavy with a curved top edge, and the throat feathers are long and pointed, puffing into a shaggy beard when the bird calls. In flight: long, narrow-tipped wings and a long tail shaped like a wedge or diamond.',
      female: 'Identical to male.',
      juvenile: 'Duller, browner black; throat hackles shorter.',
    },
  },
  primaryHabitat: ['cliffs', 'mountain_forest', 'quarries', 'bridges', 'urban', 'open_country'],
  feedingLayer: 'multi', flightStyle: 'soaring',
  socialBehavior: { breeding: 'territorial_pairs', winter: 'pairs_or_roosts' },
  typicalGroupSize: { min: 1, max: 6 }, activeHours: 'diurnal',
  sound: {
    callDescription: 'Deep, rolling croak — "gronk" or "prruk" — much lower and hoarser than a crow\'s "caw." Also knocks, gurgles and bell-like "tok" notes.',
    songDescription: 'No true song; pairs keep up a quiet conversation of croaks, clicks and soft warbles, and can mimic other sounds.',
    loudness: 8, callFrequency: 6,
    singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'moderate', winter: 'frequent' },
    sounds: ['croak', 'knock', 'bell_tok'],
  },
  seasons: {
    spring: { presence: 'resident', commonness: 'uncommon' },
    summer: { presence: 'resident', commonness: 'uncommon' },
    fall:   { presence: 'resident', commonness: 'uncommon' },
    winter: { presence: 'resident', commonness: 'uncommon' },
  },
  range: 'northern_hemisphere',
  regions: ['NE', 'SE', 'NW', 'SW'],
  captureStats: {
    difficulty: 6, speed: 6, flightiness: 7, camouflage: 2, sizeScore: 8,
    movementPattern: 'soaring', captureBackground: 'open_sky', flightPattern: 'soaring',
    behaviorNotes: 'Usually seen in pairs, soaring along cliffs and ridgelines on flat wings, often tumbling or rolling in play. Wary on the ground. Listen for the deep "gronk" first, then look for the wedge-shaped tail.',
  },
  rarity: 'uncommon', rarityColor: '#2196f3', points: 190,
  verificationThreshold: 0.70, verificationMethods: 2,
  description: 'Ravens disappeared from most of the New York and New Jersey lowlands a century ago, but they are back: pairs now nest on the Palisades cliffs, in quarries, and even on bridges, towers and buildings in the city. As heavy as a Red-tailed Hawk and one of the smartest animals on Earth, the Common Raven is a problem-solver, a talker and a show-off flier. If a big black bird croaks instead of caws — look up!',
  funFacts: [
    'Raven or crow? Listen and look: a crow says "caw," a raven says a deep "gronk." When it flies, a crow\'s tail is shaped like a fan, but a raven\'s tail is shaped like a wedge or a diamond. A raven is also much bigger, with a giant bill and a shaggy "beard."',
    'Ravens do barrel rolls and somersaults in the air just for fun — one was seen flying upside down for more than half a mile!',
    'Crows usually hang out in noisy family groups and flocks; ravens are usually seen alone or as a pair.',
    'Ravens can copy sounds, including other birds, car engines and even human words.',
  ],
  eBirdCode: 'comrav', merlinId: 'Common_Raven',
}
