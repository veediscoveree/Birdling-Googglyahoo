// Palm Warbler — the tail-bobbing ground warbler of fall lawns and weedy edges. Modeled on the
// eastern "Yellow" Palm Warbler (S. p. hypochrysea), the late-fall (Oct–Nov) form in NYC / NJ.
export default {
  id: 'palm_warbler',
  commonName: 'Palm Warbler',
  scientificName: 'Setophaga palmarum',
  family: 'Parulidae',
  order: 'Passeriformes',

  sizeCategory: 'tiny',
  length_cm: [12, 14],
  wingspan_cm: [20, 21],
  weight_g: [7, 13],

  appearance: {
    billShape: 'thin',
    billSizeRelative: 'small',
    billColor: { male: 'dark gray', female: 'dark gray' },
    crestPresent: false,
    crestColor: { male: null, female: null },
    primaryColor: { male: '#8A7A4A', female: '#8A7A4A' },
    uiColor: '#E8C020',
    secondaryColors: {
      male: ['#B0482A (rufous cap)', '#F2D230 (eyebrow, throat, underparts)', '#F8DC20 (bright undertail)', '#B86A3A (rusty breast streaks)', '#8A7A4A (brownish-olive back)', '#9AA040 (olive rump)'],
      female: ['Sexes look alike; cap is a little duller'],
    },
    distinctiveMarkings: {
      male: ['Constantly bobs its tail up and down — the best field mark of all', 'Rufous (chestnut) cap', 'Yellow eyebrow and dark eye-line', 'Yellow throat and underparts with rusty streaks on breast and sides', 'Bright yellow under the tail', 'Brownish-olive back, olive-yellow rump', 'White spots near the tail corners'],
      female: ['Very like the male; rufous cap slightly duller'],
      juvenile: ['Fall immatures are browner with a faint cap, but still show the yellow undertail and tail-bobbing'],
    },
    plumageDescription: {
      male: 'A warm, earthy warbler that lives low: brownish-olive above with a rich rufous cap, a yellow eyebrow, and a dark line through the eye. The eastern "Yellow" Palm Warbler is yellow underneath from throat to tail, finely streaked with rusty chestnut on the breast and sides, and the undertail glows bright yellow every time it pumps its tail — which is all the time.',
      female: 'Nearly identical to the male, with a slightly duller cap.',
      juvenile: 'Duller and browner in first fall, the cap mostly hidden, but the yellow undertail and nonstop tail-bobbing give it away.',
    },
  },

  primaryHabitat: ['open_fields', 'lawns', 'weedy_edges', 'shrubby_fields', 'bogs', 'coastal_dunes'],
  feedingLayer: 'ground',
  flightStyle: 'bounding',
  socialBehavior: {
    breeding: 'monogamous_pairs',
    winter: 'loose_flocks',
  },
  typicalGroupSize: { min: 1, max: 15 },
  activeHours: 'diurnal',

  sound: {
    callDescription: 'A sharp, slightly husky "chik" or "tsip", given as it hops along the ground.',
    songDescription: 'A loose, buzzy trill on one pitch — "zhe-zhe-zhe-zhe-zhe" — rarely heard away from northern bogs.',
    loudness: 4,
    callFrequency: 6,
    singingSeason: {
      spring: 'moderate',
      summer: 'frequent',
      fall: 'rare',
      winter: 'rare',
    },
    sounds: ['chik', 'trill'],
  },

  seasons: {
    spring: { presence: 'migrant', commonness: 'common' },
    summer: { presence: 'absent', commonness: 'absent' },
    fall:   { presence: 'migrant', commonness: 'common' },
    winter: { presence: 'winter_south', commonness: 'rare' },
  },
  range: 'eastern_north_america',
  regions: ['NE', 'SE'],

  captureStats: {
    difficulty: 3,
    speed: 5,
    flightiness: 5,
    camouflage: 5,
    sizeScore: 2,
    movementPattern: 'hopping',
    captureBackground: 'shrubby_field',
    flightPattern: 'bounding',
    behaviorNotes: 'A warbler that acts like a sparrow: hops and runs on lawns, ball fields, and weedy edges, pumping its tail nonstop. Flushes to a low shrub or fence when approached, then drops right back down. Often in small loose groups with sparrows and juncos in late fall.',
  },

  rarity: 'uncommon',
  rarityColor: '#2196f3',
  points: 165,
  verificationThreshold: 0.65,
  verificationMethods: 1,

  description: 'Most warblers flit high in the treetops, but the Palm Warbler likes to keep its feet on the ground. In October and November it turns up on park lawns, dune edges, and weedy lots across the Northeast, hopping through the grass and bobbing its tail like it can\'t help it. It breeds in the remote spruce bogs of Canada and winters in the Southeast and Caribbean — so the bird hopping across your school field may be halfway on a 2,000-mile trip.',
  funFacts: [
    'Palm Warblers bob their tails up and down almost constantly — even while hopping, eating, or sitting still. Birders can recognize one from far away by that bob alone.',
    'Despite the name, Palm Warblers have little to do with palm trees. The first one described by scientists was collected on the island of Hispaniola, where palms grow — but the bird nests in cold Canadian bogs.',
    'The "Yellow" Palm Warbler of the East is one of the latest warblers to migrate in fall — it is often still around in November, after almost every other warbler has left.',
  ],
  eBirdCode: 'palwar',
  merlinId: 'Palm_Warbler',
}
