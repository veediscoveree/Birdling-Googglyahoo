// Red-shouldered Hawk — the boldly patterned buteo of wet woodlands; resident and a fall migrant
// (peak late Oct–Nov at hawk watches) in NYC / northern NJ.
export default {
  id: 'red_shouldered_hawk',
  commonName: 'Red-shouldered Hawk',
  scientificName: 'Buteo lineatus',
  family: 'Accipitridae',
  order: 'Accipitriformes',

  sizeCategory: 'large',
  length_cm: [43, 61],
  wingspan_cm: [94, 111],
  weight_g: [486, 774],

  appearance: {
    billShape: 'hooked',
    billSizeRelative: 'medium',
    billColor: { male: 'dark gray, yellow cere', female: 'dark gray, yellow cere' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#C0612E', female: '#C0612E' },
    uiColor: '#C0612E',
    secondaryColors: {
      male: ['#C0612E (rusty-orange barred breast)', '#A84A22 (rufous shoulders)', '#1E1A18 (checkered wings, tail)', '#F4F0E6 (white wing spots, tail bands)', '#F0C030 (cere, legs)', '#7A5A44 (brown head and back)'],
      female: ['Same — sexes look alike; females are larger'],
    },
    distinctiveMarkings: {
      male: ['Rusty-orange breast finely barred with white', 'Rufous "shoulder" patches on the upper wing', 'Wings boldly checkered black and white', 'Black tail with several narrow white bands', 'Translucent pale crescents ("windows") near the wingtips in flight', 'Yellow legs and cere', 'Slimmer, longer-tailed and longer-legged than a Red-tailed Hawk'],
      female: ['Identical to male in plumage; about 10–20% larger'],
      juvenile: ['Brown above, buffy below with dark streaks; still shows the pale wingtip crescents in flight and a narrowly banded tail'],
    },
    plumageDescription: {
      male: 'One of the most colorful hawks in North America. The breast and belly are warm rusty-orange, finely barred with white, and the "red shoulders" show as a rufous patch at the bend of the wing. The wings and back are checkered with crisp black-and-white spots, and the long black tail is crossed by narrow white bands. Overhead, a pale translucent crescent glows near each wingtip as the hawk flies.',
      female: 'Identical to the male; females average larger and heavier.',
      juvenile: 'Brown and streaky like many young hawks — look for the long banded tail, wingtip crescents, and the wet-woods habitat.',
    },
  },

  primaryHabitat: ['wet_woodlands', 'swamps', 'river_bottoms', 'woodland_edge', 'suburban'],
  feedingLayer: 'aerial',
  flightStyle: 'flap_and_glide',
  socialBehavior: {
    breeding: 'pairs',
    winter: 'solitary',
  },
  typicalGroupSize: { min: 1, max: 2 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A loud, ringing, repeated "kee-ah, kee-ah, kee-ah" — one of the noisiest hawks in the woods. Blue Jays imitate it so well they fool birders.',
    songDescription: 'No true song; the "kee-ah" series is used for territory and courtship, especially in late winter and spring.',
    loudness: 8,
    callFrequency: 6,
    singingSeason: {
      spring: 'frequent',
      summer: 'moderate',
      fall: 'occasional',
      winter: 'occasional',
    },
    sounds: ['kee-ah'],
  },

  seasons: {
    spring: { presence: 'resident', commonness: 'uncommon' },
    summer: { presence: 'resident', commonness: 'uncommon' },
    fall:   { presence: 'migrant', commonness: 'uncommon' },
    winter: { presence: 'resident', commonness: 'uncommon' },
  },
  range: 'eastern_north_america_and_california',
  regions: ['NE', 'SE', 'SW'],

  captureStats: {
    difficulty: 6,
    speed: 4,
    flightiness: 6,
    camouflage: 5,
    sizeScore: 8,
    movementPattern: 'soaring',
    captureBackground: 'forest_edge',
    flightPattern: 'flap_and_glide',
    behaviorNotes: 'Hunts from a perch below the canopy at the edge of swamps and wet woods, dropping onto frogs, snakes, and crayfish. Soars on flat, slightly forward-pressed wings with a few quick, stiff flaps — watch for the banded tail and glowing wingtip crescents. Calls loudly, which often gives it away before you see it.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 240,
  verificationThreshold: 0.8,
  verificationMethods: 2,

  description: 'The Red-shouldered Hawk is the Red-tailed Hawk\'s more colorful, more vocal woodland cousin. Instead of open highways and fields, it haunts swampy forests and creek-side woods, sitting quietly on a low branch before swooping down on a frog or snake. In fall, migrants stream past northern New Jersey hawk watches, and its loud "kee-ah!" call rings out from wooded parks year-round.',
  funFacts: [
    'Blue Jays are expert impressionists of the Red-shouldered Hawk — their copy of its "kee-ah" call is so good that even experienced birders get fooled.',
    'Red-shouldered Hawks eat a lot of frogs, snakes, and even crayfish — a menu that matches the wet, swampy woods they love.',
    'Pairs often reuse the same nest for years. Some fill the nest with fresh green leaves and sprigs of evergreen as they fix it up each spring.',
  ],
  eBirdCode: 'reshaw',
  merlinId: 'Red-shouldered_Hawk',
}
