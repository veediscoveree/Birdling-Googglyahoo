// Green-winged Teal — North America's smallest dabbling duck.
export default {
  id: 'green_winged_teal',
  commonName: 'Green-winged Teal',
  scientificName: 'Anas crecca',
  family: 'Anatidae',
  order: 'Anseriformes',

  sizeCategory: 'small',
  length_cm: [31, 39],
  wingspan_cm: [52, 59],
  weight_g: [140, 500],

  appearance: {
    billShape: 'spatulate',
    billSizeRelative: 'small',
    billColor: { male: 'black', female: 'dark gray, sometimes with orange-yellow edges at base' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#8A3A1E', female: '#7E6248' },
    uiColor: '#8A3A1E',
    secondaryColors: {
      male: ['#8A3A1E (chestnut head)', '#1E7A4A (green eye-patch swoosh)', '#E8D49A (thin buff outline)', '#FFFFFF (vertical white shoulder bar)', '#9A9A98 (gray vermiculated flanks)', '#F0D878 (buffy-yellow undertail triangle)', '#E8D8C0 (speckled pinkish-buff breast)', '#1E9A5A (green speculum)'],
      female: ['#7E6248 (mottled brown)', '#4A3A2E (dark eye-line)', '#1E9A5A (green speculum)', '#E8D49A (pale buff streak by the tail)'],
    },
    distinctiveMarkings: {
      male: ['Tiny — the smallest North American dabbling duck', 'Rich chestnut head', 'Glossy green patch sweeping from the eye to the nape, outlined in thin buff', 'Bold vertical white bar on the side of the breast', 'Finely vermiculated gray flanks', 'Buffy-yellow triangle under the tail, edged black', 'Speckled pinkish-buff breast', 'Bright green speculum'],
      female: ['Small, mottled brown duck with a short dark bill', 'Dark line through the eye', 'Green speculum', 'Pale buffy streak along the side of the tail'],
      juvenile: ['Like female; young males color up during the first fall', 'Early-fall (September) drakes may still be in brown eclipse plumage, but most are bright again by late October–November'],
    },
    plumageDescription: {
      male: 'A little jewel of a duck. The breeding (alternate) drake has a chestnut head with a glossy green swoosh running back from the eye, outlined by a thin buff line; a pinkish-buff, black-spotted breast; a crisp vertical white bar at the shoulder; finely penciled gray flanks; and a creamy-yellow triangle under the tail. The speculum is bright emerald green. In September some drakes around NYC are still in brown eclipse plumage; most look sharp again by late October.',
      female: 'Small and mottled brown, with a dark eye-line, a short dark bill, and a pale buff streak beside the tail. The green speculum flashes in flight.',
      juvenile: 'Like the female but more evenly streaked below. Young males gain their colors through the first fall.',
    },
  },

  primaryHabitat: ['mudflats', 'shallow_marshes', 'salt_marsh', 'ponds', 'flooded_fields', 'tidal_creeks'],
  feedingLayer: 'water_surface',
  flightStyle: 'direct_fast',
  socialBehavior: {
    breeding: 'pairs',
    winter: 'flocks',
  },
  typicalGroupSize: { min: 2, max: 150 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'Drakes give a clear, high, ringing "preep" or "crick-et" whistle, a lot like a spring peeper frog; females give a thin, high quack.',
    songDescription: 'Not a songbird; flocks keep up a pleasant chorus of piping whistles, especially during courtship.',
    loudness: 5,
    callFrequency: 6,
    singingSeason: {
      spring: 'frequent',
      summer: 'rare',
      fall: 'moderate',
      winter: 'moderate',
    },
    sounds: ['preep whistle', 'quack', 'wing whir'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'common' },
    summer: { presence: 'absent', commonness: 'rare' },
    fall:   { presence: 'migrant', commonness: 'common' },
    winter: { presence: 'winter', commonness: 'uncommon' },
  },
  range: 'northern_hemisphere',
  regions: ['NE', 'SE', 'NW', 'SW'],

  captureStats: {
    difficulty: 6,
    speed: 8,
    flightiness: 7,
    camouflage: 5,
    sizeScore: 4,
    movementPattern: 'swimming',
    captureBackground: 'wetland',
    flightPattern: 'direct',
    behaviorNotes: 'Small, quick, and easily spooked. Tips up or dabbles in very shallow water and along muddy edges, often tucked against marsh grass where it is easy to overlook. Flocks explode off the water and twist through the air like shorebirds. Look for the white shoulder bar — it shows even at a distance.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 175,
  verificationThreshold: 0.70,
  verificationMethods: 2,

  description: 'The Green-winged Teal is North America\'s smallest dabbling duck — a fast, nimble little bird of mudflats and shallow marshes. Each fall big flocks stop at places like Jamaica Bay and the Meadowlands, picking tiny seeds and snails off the mud. The drake\'s chestnut-and-green head and bold white shoulder stripe make it a gem in a scope, and the speedy, twisting flight of a flock is a thrill to watch.',
  funFacts: [
    'A Green-winged Teal drake weighs about as much as a full can of soda — less than half the weight of a Mallard.',
    'Teal flocks fly in tight, twisting groups that turn all at once, more like a flock of sandpipers than a flock of ducks.',
    'The drake\'s whistle sounds so much like a spring peeper frog that birders on a marsh sometimes can\'t tell which is calling.',
  ],
  eBirdCode: 'gnwtea',
  merlinId: 'Green-winged_Teal',
}
