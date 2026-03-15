// Bird. Here. Now. — Bird Database v0.1
// Schema designed for rich gameplay data, field guide accuracy, and
// future integration with eBird, Merlin, and Cornell Lab APIs.
// Each species entry drives: avatar rendering, encounter behavior,
// capture difficulty, unlockable field-guide content, and rarity scoring.

export const BIRDS = [
  // ─────────────────────────────────────────────────────────────
  // NORTHERN CARDINAL
  // ─────────────────────────────────────────────────────────────
  {
    id: 'northern_cardinal',
    commonName: 'Northern Cardinal',
    scientificName: 'Cardinalis cardinalis',
    family: 'Cardinalidae',
    order: 'Passeriformes',

    // ── Physical measurements ──────────────────────────────────
    sizeCategory: 'small',        // tiny | small | medium | large | very_large
    length_cm: [21, 23],
    wingspan_cm: [25, 31],
    weight_g: [42, 48],

    // ── Appearance database ────────────────────────────────────
    appearance: {
      billShape: 'conical',          // conical | hooked | thin | spatulate | serrated | spear
      billSizeRelative: 'large',     // tiny | small | medium | large | massive
      billColor: { male: 'orange-red', female: 'orange-red' },
      crestPresent: true,
      crestColor: { male: 'red', female: 'brownish-red' },
      primaryColor: { male: '#CC2233', female: '#A87050' },
      uiColor: '#CC2233',
      secondaryColors: {
        male: ['#1A1A1A (face mask)', '#E06020 (bill)'],
        female: ['#CC2233 (crest, wings, tail)', '#E06020 (bill)'],
      },
      distinctiveMarkings: {
        male: ['Full-body brilliant red', 'Black mask from face to throat', 'Prominent red crest', 'Heavy orange-red conical bill'],
        female: ['Pale warm brown overall', 'Red tints on crest, wings, and tail', 'Black mask (less distinct)', 'Same heavy orange-red bill as male'],
        juvenile: ['Similar to female; darker, dusky bill gradually becomes orange'],
      },
      plumageDescription: {
        male: 'Unmistakable: brilliant red from crown to tail. A bold black mask frames the face and throat. The crest — a pointed cluster of feathers — rises when alert or excited. Large orange-red conical bill built for cracking open hard seeds.',
        female: 'Elegant warm brown above, soft pinkish-buff below, with red washes on the pointed crest, wings, and tail. The black mask is present but subtler. She is often mistaken for a different species entirely.',
        juvenile: 'Resembles female but with a dusky bill that slowly brightens to orange over the first winter. Young males begin showing patchy red by late autumn.',
      },
    },

    // ── Behavior ───────────────────────────────────────────────
    primaryHabitat: ['woodland_edge', 'shrubs', 'gardens', 'feeders', 'hedgerows'],
    feedingLayer: 'ground',        // ground | shrub | canopy | aerial | water | multi
    flightStyle: 'bounding',       // bounding | direct | soaring | undulating | hovering
    socialBehavior: {
      breeding: 'territorial_pairs',
      winter: 'loose_flocks',
    },
    typicalGroupSize: { min: 1, max: 12 },
    activeHours: 'dawn_dusk',     // dawn_dusk | diurnal | nocturnal | crepuscular

    // ── Sound ──────────────────────────────────────────────────
    sound: {
      callDescription: 'Sharp, metallic "chip" — used as a contact call and alarm',
      songDescription: 'Rich, clear whistled phrases: "cheer-cheer-cheer", "birdy-birdy-birdy", "woit-woit-woit". Both sexes sing, rare among North American songbirds.',
      loudness: 7,               // 1–10
      callFrequency: 6,          // 1–10 how often calls
      singingSeason: {
        spring: 'frequent',
        summer: 'moderate',
        fall: 'occasional',
        winter: 'occasional',
      },
      sounds: ['chip', 'song'],
    },

    // ── Seasonality ────────────────────────────────────────────
    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    range: 'eastern_north_america',

    // ── Capture stats (all 1–10) ───────────────────────────────
    captureStats: {
      difficulty: 3,
      speed: 3,                  // movement speed in binoculars view
      flightiness: 4,            // how easily it flees when disturbed
      camouflage: 1,             // 1 = brilliant red male, very easy to see
      sizeScore: 5,
      movementPattern: 'hopping',// hopping | perching | soaring | swimming | stalking | darting
      flightPattern: 'bounding',
      behaviorNotes: 'Typically hops on or near the ground, or sits in dense shrubs. Males often perch prominently to sing. Moderately wary; will flush if approached quickly.',
    },

    // ── Rarity & scoring ──────────────────────────────────────
    rarity: 'common',            // common | uncommon | rare | very_rare
    rarityColor: '#4caf50',
    points: 100,
    verificationThreshold: 0.66,
    verificationMethods: 1,

    // ── Content ────────────────────────────────────────────────
    description: 'One of North America\'s most beloved birds and a year-round resident across the East. The male\'s blazing red plumage against winter snow has made him a cultural icon. Females are no less striking — warm brown with a red crest and a bill that can crack open the toughest sunflower seeds. Listen any morning for their ringing whistle from a shrubby perch.',
    funFact: 'Female cardinals also sing — a behavior rare among North American songbirds. A mated pair will sometimes exchange songs in a "duet" back and forth.',
    eBirdCode: 'norcar',
    merlinId: 'Northern_Cardinal',
  },

  // ─────────────────────────────────────────────────────────────
  // AMERICAN ROBIN
  // ─────────────────────────────────────────────────────────────
  {
    id: 'american_robin',
    commonName: 'American Robin',
    scientificName: 'Turdus migratorius',
    family: 'Turdidae',
    order: 'Passeriformes',

    sizeCategory: 'small',
    length_cm: [23, 28],
    wingspan_cm: [31, 41],
    weight_g: [72, 94],

    appearance: {
      billShape: 'thin',
      billSizeRelative: 'medium',
      billColor: { male: 'yellow', female: 'yellow' },
      crestPresent: false,
      crestColor: { male: null, female: null },
      primaryColor: { male: '#2B3A2B', female: '#4A5A4A' },
      uiColor: '#C85A1E',
      secondaryColors: {
        male: ['#C85A1E (breast)', '#FAFAFA (eye ring, belly)', '#F0C030 (bill)'],
        female: ['#C85A1E (paler breast)', '#FAFAFA (belly)', '#F0C030 (bill)'],
      },
      distinctiveMarkings: {
        male: ['Brick-orange breast and belly', 'Dark gray-black head and back', 'White eye ring (broken)', 'Yellow bill', 'White under-tail coverts'],
        female: ['Paler orange breast than male', 'Brownish-gray head (not black)', 'Same white belly and yellow bill'],
        juvenile: ['Spotted orange breast (thrush-family spotting)', 'Speckled back', 'This spotting disappears by late summer'],
      },
      plumageDescription: {
        male: 'Dark gray-black above with a rich brick-orange breast. A white belly patches below; broken white eye ring and white throat streaks frame a yellow bill. Classic thrush shape — round body, short tail, strong legs.',
        female: 'Similar but with a brownish-gray (not black) head and a slightly paler, peachier breast. Often told apart only by direct comparison.',
        juvenile: 'The spotted juvenile robins of late spring/summer reveal the robin\'s thrush ancestry — orange breast covered in dark spots, back sprinkled with pale dots.',
      },
    },

    primaryHabitat: ['lawns', 'parks', 'open_woodland', 'gardens', 'suburban'],
    feedingLayer: 'ground',
    flightStyle: 'direct',
    socialBehavior: {
      breeding: 'territorial_pairs',
      winter: 'large_roosts',
    },
    typicalGroupSize: { min: 1, max: 200 },
    activeHours: 'diurnal',

    sound: {
      callDescription: '"Tut-tut-tut" alarm call; high thin "seee" for aerial predators',
      songDescription: 'Cheerful caroling phrases: "cheerily, cheer up, cheer up, cheerily, cheer up". Arguably the most familiar bird song in North America. Begins singing before dawn.',
      loudness: 7,
      callFrequency: 8,
      singingSeason: {
        spring: 'frequent',
        summer: 'frequent',
        fall: 'occasional',
        winter: 'rare',
      },
      sounds: ['tut', 'song', 'seee'],
    },

    seasons: {
      spring: { presence: 'summer', commonness: 'abundant' },
      summer: { presence: 'summer', commonness: 'abundant' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'winter', commonness: 'uncommon' },
    },
    range: 'north_america',

    captureStats: {
      difficulty: 2,
      speed: 4,
      flightiness: 3,
      camouflage: 3,
      sizeScore: 6,
      movementPattern: 'hopping',
      flightPattern: 'direct',
      behaviorNotes: 'Runs across lawns in short bursts, stopping to cock its head and listen/watch for earthworms. Quite bold near humans. Flushes readily if approached quickly but returns soon.',
    },

    rarity: 'common',
    rarityColor: '#4caf50',
    points: 80,
    verificationThreshold: 0.66,
    verificationMethods: 1,

    description: 'The herald of spring across North America. Robins are among the first birds to sing before dawn and among the last to fall silent at dusk. Their earthworm-hunting technique — running, stopping, tilting the head — is one of the most familiar sights in any suburban yard. Despite their familiarity, robins in winter congregate in massive roosts that can number in the thousands.',
    funFact: 'A robin doesn\'t actually hear earthworms through the ground — it sees them. That sideways head-tilt is tilting one eye toward the soil to get a better look.',
    eBirdCode: 'amerob',
    merlinId: 'American_Robin',
  },

  // ─────────────────────────────────────────────────────────────
  // BLUE JAY
  // ─────────────────────────────────────────────────────────────
  {
    id: 'blue_jay',
    commonName: 'Blue Jay',
    scientificName: 'Cyanocitta cristata',
    family: 'Corvidae',
    order: 'Passeriformes',

    sizeCategory: 'small',
    length_cm: [22, 30],
    wingspan_cm: [34, 43],
    weight_g: [70, 100],

    appearance: {
      billShape: 'thin',
      billSizeRelative: 'medium',
      billColor: { male: 'black', female: 'black' },
      crestPresent: true,
      crestColor: { male: 'blue', female: 'blue' },
      primaryColor: { male: '#4A7FBD', female: '#4A7FBD' },
      uiColor: '#4A7FBD',
      secondaryColors: {
        male: ['#FAFAFA (face, belly)', '#1A1A1A (necklace, wing bars)', '#4A7FBD (crest, wings, tail)'],
        female: ['Same as male — sexes look alike'],
      },
      distinctiveMarkings: {
        male: ['Bright blue crest, wings, and tail', 'White face and underparts', 'Bold black necklace across throat/chest', 'White wing bars and tail corners', 'Black barring on wings and tail'],
        female: ['Identical to male in appearance'],
        juvenile: ['Duller blue than adults; crest shorter; gains adult plumage by first winter'],
      },
      plumageDescription: {
        male: 'Unmistakable in flight and at rest. A blue corvid with a pointed crest, white face, and bold black "necklace" connecting the crest, eye, and collar. Blue wings show white wing bars and dark barring. The tail is long, blue, and prominently barred. Underparts white.',
        female: 'Identical to male — one of the few songbirds where field separation of sexes is practically impossible without genetic testing.',
        juvenile: 'Slightly duller blue tones in the first year, with a shorter crest. Nearly identical to adults by autumn.',
      },
    },

    primaryHabitat: ['deciduous_woodland', 'parks', 'suburban', 'oak_savanna'],
    feedingLayer: 'multi',
    flightStyle: 'direct',
    socialBehavior: {
      breeding: 'pairs',
      winter: 'family_groups',
    },
    typicalGroupSize: { min: 1, max: 10 },
    activeHours: 'diurnal',

    sound: {
      callDescription: 'Loud, raucous "jay-jay-jay". Also mimics Red-tailed Hawk perfectly — used to alarm other birds or claim food.',
      songDescription: 'A softer, gurgling "whisper song" rarely heard; usually replaced by call repertoire. Also "bell" calls, whistled notes, and many mimicked sounds.',
      loudness: 9,
      callFrequency: 8,
      singingSeason: {
        spring: 'frequent',
        summer: 'moderate',
        fall: 'frequent',
        winter: 'moderate',
      },
      sounds: ['jay-call', 'hawk-mimic', 'bell', 'whisper-song'],
    },

    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    range: 'eastern_north_america',

    captureStats: {
      difficulty: 4,
      speed: 5,
      flightiness: 6,
      camouflage: 2,
      sizeScore: 6,
      movementPattern: 'perching',
      flightPattern: 'direct',
      behaviorNotes: 'Moves between canopy and ground. Very alert — the first to sound an alarm when a predator appears. Bold and often noisy, but spooks quickly when directly approached. Stashes acorns and has excellent spatial memory.',
    },

    rarity: 'common',
    rarityColor: '#4caf50',
    points: 110,
    verificationThreshold: 0.66,
    verificationMethods: 1,

    description: 'Bold, intelligent, and impossible to ignore — the Blue Jay is a corvid in every sense. They are accomplished mimics (their hawk imitation can clear a feeder), dedicated parents, and critical partners in oak forest expansion: they cache thousands of acorns each fall, many of which they never retrieve, planting the oaks of the future. Love them or hate them, a yard without Blue Jays is a quieter place.',
    funFact: 'A Blue Jay can carry multiple acorns at once — up to 5 in its throat pouch, bill, and esophagus. One study estimated a single jay moved 4,500 acorns in a single fall.',
    eBirdCode: 'blujay',
    merlinId: 'Blue_Jay',
  },

  // ─────────────────────────────────────────────────────────────
  // BLACK-CAPPED CHICKADEE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'black_capped_chickadee',
    commonName: 'Black-capped Chickadee',
    scientificName: 'Poecile atricapillus',
    family: 'Paridae',
    order: 'Passeriformes',

    sizeCategory: 'tiny',
    length_cm: [12, 15],
    wingspan_cm: [16, 21],
    weight_g: [9, 14],

    appearance: {
      billShape: 'thin',
      billSizeRelative: 'tiny',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false,
      crestColor: { male: null, female: null },
      primaryColor: { male: '#808080', female: '#808080' },
      uiColor: '#2B6CB0',
      secondaryColors: {
        male: ['#1A1A1A (cap, bib)', '#FAFAFA (cheeks)', '#F5E6C8 (flanks)', '#808080 (back, wings)'],
        female: ['Sexes look alike'],
      },
      distinctiveMarkings: {
        male: ['Bold black cap', 'Large white cheek patch', 'Black throat bib', 'Rusty-buff flanks', 'Gray back', 'White wing edges'],
        female: ['Identical to male in field conditions'],
        juvenile: ['Identical to adults; some have a slightly brownish tinge to the cap'],
      },
      plumageDescription: {
        male: 'A tiny, round bird with an oversized head. The black cap and black throat bib are separated by large, pillowy white cheek patches. Back and wings are gray; flanks are washed warm buff. White edges on wing feathers create a delicate "etched" look. Constantly in motion.',
        female: 'Identical to male — impossible to tell apart in the field.',
        juvenile: 'Adults by their first fall; the black and white pattern is clean and crisp from the start.',
      },
    },

    primaryHabitat: ['deciduous_woodland', 'mixed_forest', 'suburban', 'parks', 'feeders'],
    feedingLayer: 'canopy',
    flightStyle: 'undulating',
    socialBehavior: {
      breeding: 'pairs',
      winter: 'mixed_flocks',
    },
    typicalGroupSize: { min: 2, max: 12 },
    activeHours: 'diurnal',

    sound: {
      callDescription: '"Chick-a-dee-dee-dee" — the classic call that names the species. More "dee" notes = greater perceived threat. A perfect alarm system.',
      songDescription: 'Clear, whistled "fee-bee" or "fee-bee-ee" — two or three notes in descending pitch, like a tiny flute. Often heard in late winter before spring fully arrives.',
      loudness: 6,
      callFrequency: 9,
      singingSeason: {
        spring: 'frequent',
        summer: 'moderate',
        fall: 'frequent',
        winter: 'frequent',
      },
      sounds: ['chick-a-dee', 'fee-bee', 'gargle'],
    },

    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    range: 'northern_north_america',

    captureStats: {
      difficulty: 5,
      speed: 7,
      flightiness: 3,
      camouflage: 4,
      sizeScore: 2,
      movementPattern: 'darting',
      flightPattern: 'undulating',
      behaviorNotes: 'Tiny and hyperactive — never still for more than a few seconds. Hangs upside-down from branch tips to reach insects. Paradoxically bold around humans; will sometimes land on an outstretched hand at feeders. The challenge is their size and constant motion.',
    },

    rarity: 'common',
    rarityColor: '#4caf50',
    points: 120,
    verificationThreshold: 0.66,
    verificationMethods: 1,

    description: 'Possibly the most cheerful bird in North America. Chickadees stay through the harshest winters, traveling in small flocks through frozen forests, finding insects in bark crevices that no other bird can reach. They have a sophisticated social system and can lower their body temperature at night to conserve energy — a feat called "regulated hypothermia." Their alarm calls carry so much information about a predator\'s size, speed, and danger level that other species have learned to listen.',
    funFact: 'Every autumn, a chickadee\'s hippocampus (the memory center of the brain) actually grows larger to handle thousands of new food cache locations. It shrinks again in spring.',
    eBirdCode: 'bkcchi',
    merlinId: 'Black-capped_Chickadee',
  },

  // ─────────────────────────────────────────────────────────────
  // AMERICAN GOLDFINCH
  // ─────────────────────────────────────────────────────────────
  {
    id: 'american_goldfinch',
    commonName: 'American Goldfinch',
    scientificName: 'Spinus tristis',
    family: 'Fringillidae',
    order: 'Passeriformes',

    sizeCategory: 'tiny',
    length_cm: [11, 14],
    wingspan_cm: [19, 22],
    weight_g: [11, 20],

    appearance: {
      billShape: 'conical',
      billSizeRelative: 'small',
      billColor: { male: 'pink-orange', female: 'dull-pink' },
      crestPresent: false,
      crestColor: { male: null, female: null },
      primaryColor: { male: '#FFD700', female: '#B8A840' },
      uiColor: '#FFD700',
      secondaryColors: {
        male: ['#1A1A1A (forehead cap, wings, tail)', '#FAFAFA (wing bars, rump)', '#F0A040 (bill)'],
        female: ['#B8A840 (olive-yellow body)', '#1A1A1A (wings)', '#FAFAFA (wing bars)'],
      },
      distinctiveMarkings: {
        male: ['Brilliant lemon-yellow body (breeding)', 'Black forehead cap', 'Black wings with white wing bars', 'White rump', 'Stubby pink-orange bill', 'Winter: olive-yellow, no black cap'],
        female: ['Dull olive-yellow; no black cap', 'White wing bars on black-ish wings', 'Paler below than above', 'Year-round plumage similar to male winter'],
        juvenile: ['Similar to female; buffy wing bars instead of white'],
      },
      plumageDescription: {
        male: 'Summer male is electric: pure lemon-yellow with a small black cap on the forehead, jet-black wings with white wing bars, white rump. Winter male molts to olive-yellow, loses the black cap, and becomes almost unrecognizable until spring.',
        female: 'Olive-yellow throughout the year — brighter in summer, duller in winter. Black wings with white bars. Often overlooked despite being present at most nyjer seed feeders.',
        juvenile: 'Resembles female; buffy rather than white wing bars. Acquires adult plumage in first autumn.',
      },
    },

    primaryHabitat: ['fields', 'meadows', 'weedy_areas', 'feeders', 'open_woodland'],
    feedingLayer: 'shrub',
    flightStyle: 'undulating',
    socialBehavior: {
      breeding: 'loose_colonies',
      winter: 'flocks',
    },
    typicalGroupSize: { min: 2, max: 40 },
    activeHours: 'diurnal',

    sound: {
      callDescription: '"Per-chick-o-ree" or "po-ta-to-chip" call given in flight — this bouncy phrase perfectly matches the undulating flight pattern.',
      songDescription: 'Long, canary-like warble of rapid twitters, trills, and chips. Energetic and sustained.',
      loudness: 5,
      callFrequency: 8,
      singingSeason: {
        spring: 'moderate',
        summer: 'frequent',
        fall: 'occasional',
        winter: 'rare',
      },
      sounds: ['per-chick-o-ree', 'song-warble', 'contact-call'],
    },

    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'summer', commonness: 'common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'winter', commonness: 'uncommon' },
    },
    range: 'north_america',

    captureStats: {
      difficulty: 5,
      speed: 6,
      flightiness: 5,
      camouflage: 2,
      sizeScore: 2,
      movementPattern: 'darting',
      flightPattern: 'undulating',
      behaviorNotes: 'Feeds acrobatically on seed heads — hanging sideways, upside-down. In flocks, individuals are scattered and constantly moving. The undulating flight — rise on wingbeats, dip on wing-fold — makes tracking in binoculars tricky.',
    },

    rarity: 'common',
    rarityColor: '#4caf50',
    points: 115,
    verificationThreshold: 0.66,
    verificationMethods: 1,

    description: 'New Jersey\'s state bird and a frequent visitor to nyjer seed feeders. The male in breeding plumage is one of the most vivid birds in North America — a flying lemon with a black beret. Goldfinches are unusual songbirds in that they wait until July or August to nest, timing their breeding to peak thistle-seed abundance. They weave spider silk into their nests, which stretches as the nestlings grow.',
    funFact: 'Goldfinch nests are so tightly woven they can hold water. If it rains during an early cold snap, the young have been known to drown — one reason late breeding evolved.',
    eBirdCode: 'amegfi',
    merlinId: 'American_Goldfinch',
  },

  // ─────────────────────────────────────────────────────────────
  // MALLARD
  // ─────────────────────────────────────────────────────────────
  {
    id: 'mallard',
    commonName: 'Mallard',
    scientificName: 'Anas platyrhynchos',
    family: 'Anatidae',
    order: 'Anseriformes',

    sizeCategory: 'medium',
    length_cm: [50, 65],
    wingspan_cm: [81, 98],
    weight_g: [720, 1600],

    appearance: {
      billShape: 'spatulate',
      billSizeRelative: 'large',
      billColor: { male: 'yellow-orange', female: 'orange-black mottled' },
      crestPresent: false,
      crestColor: { male: null, female: null },
      primaryColor: { male: '#2D6B4A', female: '#8B6914' },
      uiColor: '#2D6B4A',
      secondaryColors: {
        male: ['#2D6B4A (iridescent green head)', '#FAFAFA (neck ring)', '#8B3A2A (chestnut breast)', '#C8C8C8 (gray flanks)', '#1A1A1A (black stern)', '#E8B830 (bill)'],
        female: ['#8B6914 (mottled brown overall)', '#FF8C00 (orange sides of bill)', '#5B7F9E (speculum)', '#FAFAFA (tail)'],
      },
      distinctiveMarkings: {
        male: ['Iridescent green head', 'Thin white neck ring', 'Chestnut-brown breast', 'Gray body', 'Black rear end with curled tail feathers', 'Yellow-orange bill', 'Blue-purple speculum (wing patch)'],
        female: ['Mottled brown streaky overall', 'Orange bill with black splotches', 'Dark eye stripe', 'Blue-purple speculum with white borders', 'Pale orange legs'],
        juvenile: ['Resembles female; gains adult plumage through first winter'],
      },
      plumageDescription: {
        male: 'Breeding male is a gallery piece: iridescent bottle-green head (that changes color angle to angle), separated by a crisp white neck ring from a chestnut breast. Gray flanks, black rump, and a distinctive curled black tail feather ("sex feather"). Bill bright yellow-orange.',
        female: 'Mottled brown — perfectly camouflaged for nesting. Her orange bill shows black blotching. The blue-purple speculum (wing patch) flashes in flight on both sexes.',
        juvenile: 'Resembles female initially. Males begin showing green head by November of their first year.',
      },
    },

    primaryHabitat: ['ponds', 'lakes', 'rivers', 'wetlands', 'parks', 'urban_water'],
    feedingLayer: 'water',
    flightStyle: 'direct',
    socialBehavior: {
      breeding: 'pairs',
      winter: 'large_flocks',
    },
    typicalGroupSize: { min: 2, max: 100 },
    activeHours: 'diurnal',

    sound: {
      callDescription: 'Iconic "quack" — actually a female call. Males make a softer, nasal "raeb-raeb". Both sexes grunt, whistle, and murmur.',
      songDescription: 'Not a songbird; uses calls for communication. The female\'s loud descending "quack-quack-quack" is the "duck sound" of cultural memory.',
      loudness: 7,
      callFrequency: 6,
      singingSeason: {
        spring: 'frequent',
        summer: 'moderate',
        fall: 'moderate',
        winter: 'moderate',
      },
      sounds: ['quack', 'raeb', 'grunt', 'whistle'],
    },

    seasons: {
      spring: { presence: 'resident', commonness: 'abundant' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'abundant' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    range: 'northern_hemisphere',

    captureStats: {
      difficulty: 2,
      speed: 2,
      flightiness: 3,
      camouflage: 4,
      sizeScore: 8,
      movementPattern: 'swimming',
      flightPattern: 'direct',
      behaviorNotes: 'Swims slowly on open water; dabbles with head submerged for aquatic vegetation. Accustomed to humans in urban parks — often approaches rather than flees. Large size makes centering easy; slow movement means patience is the only skill required.',
    },

    rarity: 'common',
    rarityColor: '#4caf50',
    points: 90,
    verificationThreshold: 0.66,
    verificationMethods: 1,

    description: 'The world\'s most familiar duck and the ancestor of almost every domestic duck breed. Mallards are found on every continent except Antarctica and have adapted perfectly to city parks, drainage ditches, and golf course ponds. Watch for the courtship displays in winter — groups of males circle females with elaborate head-pumping, wing-flap, and whistle sequences that look choreographed.',
    funFact: 'Mallards can sleep with one eye open and half their brain awake — a phenomenon called unihemispheric slow-wave sleep. Ducks at the edge of a flock keep the "outer eye" open, watching for predators.',
    eBirdCode: 'mallar3',
    merlinId: 'Mallard',
  },

  // ─────────────────────────────────────────────────────────────
  // RED-TAILED HAWK
  // ─────────────────────────────────────────────────────────────
  {
    id: 'red_tailed_hawk',
    commonName: 'Red-tailed Hawk',
    scientificName: 'Buteo jamaicensis',
    family: 'Accipitridae',
    order: 'Accipitriformes',

    sizeCategory: 'large',
    length_cm: [45, 65],
    wingspan_cm: [110, 145],
    weight_g: [690, 1460],

    appearance: {
      billShape: 'hooked',
      billSizeRelative: 'large',
      billColor: { male: 'gray-yellow', female: 'gray-yellow' },
      crestPresent: false,
      crestColor: { male: null, female: null },
      primaryColor: { male: '#8B6030', female: '#8B6030' },
      uiColor: '#C85020',
      secondaryColors: {
        male: ['#C85020 (rufous-red tail, adults only)', '#8B6030 (brown above)', '#F5E6C8 (pale below)', '#1A1A1A (belly band)', '#F0C030 (cere, feet)'],
        female: ['Same — sexes look identical; females are larger'],
      },
      distinctiveMarkings: {
        male: ['Brick-red upper tail (adults; visible from above in flight)', 'Dark brown above', 'Pale buffy below with dark "belly band" of streaking', 'Hooked yellow-cere bill', 'Yellow taloned feet', 'Short, broad wings; short tail in soaring silhouette'],
        female: ['Identical to male in plumage; notably larger in body size'],
        juvenile: ['No red tail — brown barred tail instead', 'Yellow iris (adults have dark brown)', 'Heavily streaked breast and belly'],
      },
      plumageDescription: {
        male: 'A large, bulky buteo with broad rounded wings and a short tail. The field mark that names it: the brick-red upper tail surface, visible as the bird banks in a soar. Below, pale body with a band of dark streaking across the belly. Brown above. Many color variants exist across its range.',
        female: 'Identical to male in pattern; females average 25% larger and heavier — female red-tails are powerfully built hunters.',
        juvenile: 'No red tail until the second year. Brown barred tail; heavily streaked underparts. Pale iris.',
      },
    },

    primaryHabitat: ['open_fields', 'roadsides', 'woodland_edge', 'deserts', 'mountains'],
    feedingLayer: 'aerial',
    flightStyle: 'soaring',
    socialBehavior: {
      breeding: 'pairs',
      winter: 'solitary',
    },
    typicalGroupSize: { min: 1, max: 2 },
    activeHours: 'diurnal',

    sound: {
      callDescription: 'The iconic raptor scream: a long, hoarse, descending "keeeeeer". This is the call overdubbed onto virtually every other bird of prey in Hollywood films.',
      songDescription: 'No true song. Calls used for territorial defense and pair communication.',
      loudness: 8,
      callFrequency: 3,
      singingSeason: {
        spring: 'moderate',
        summer: 'occasional',
        fall: 'occasional',
        winter: 'occasional',
      },
      sounds: ['scream', 'keer'],
    },

    seasons: {
      spring: { presence: 'resident', commonness: 'uncommon' },
      summer: { presence: 'resident', commonness: 'uncommon' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    range: 'north_america',

    captureStats: {
      difficulty: 6,
      speed: 4,
      flightiness: 7,
      camouflage: 5,
      sizeScore: 9,
      movementPattern: 'soaring',
      flightPattern: 'soaring',
      behaviorNotes: 'Often spotted on telephone poles or dead trees scanning for prey. In binoculars view, moves in slow thermal circles — easy to track but very alert. Will peel away from soar suddenly if disturbed. High in sky = small apparent target despite large wingspan.',
    },

    rarity: 'uncommon',
    rarityColor: '#2196f3',
    points: 250,
    verificationThreshold: 0.85,
    verificationMethods: 2,

    description: 'The most common large hawk in North America — and the one you\'ve probably heard in every action movie, even when the scene shows a Bald Eagle. Look for them perched on highway poles, soaring over open fields, or circling on thermals over suburban neighborhoods. Pairs return to the same territory year after year, adding sticks to an ever-growing nest that can eventually weigh hundreds of pounds.',
    funFact: 'Red-tailed Hawks can see ultraviolet light, which makes rodent urine trails glow — a built-in tracking system that leads them directly to vole runways.',
    eBirdCode: 'rethaw',
    merlinId: 'Red-tailed_Hawk',
  },

  // ─────────────────────────────────────────────────────────────
  // GREAT BLUE HERON
  // ─────────────────────────────────────────────────────────────
  {
    id: 'great_blue_heron',
    commonName: 'Great Blue Heron',
    scientificName: 'Ardea herodias',
    family: 'Ardeidae',
    order: 'Pelecaniformes',

    sizeCategory: 'very_large',
    length_cm: [91, 137],
    wingspan_cm: [167, 201],
    weight_g: [1820, 3630],

    appearance: {
      billShape: 'spear',
      billSizeRelative: 'massive',
      billColor: { male: 'yellow-orange', female: 'yellow-orange' },
      crestPresent: true,
      crestColor: { male: 'black-white', female: 'black-white' },
      primaryColor: { male: '#6080A0', female: '#6080A0' },
      uiColor: '#6080A0',
      secondaryColors: {
        male: ['#6080A0 (blue-gray body)', '#FAFAFA (white head)', '#1A1A1A (black eyestripe)', '#C8A060 (rusty thighs)', '#F5E6C8 (plumes)'],
        female: ['Identical to male'],
      },
      distinctiveMarkings: {
        male: ['White head with black eyestripe extending to black plume', 'Blue-gray body', 'Chestnut-rusty thighs', 'Long yellow-orange dagger bill', 'Long black plumes on back and breast', 'S-curved neck in flight (diagnostic for herons vs. cranes)', 'Stands 4 feet tall'],
        female: ['Identical to male in plumage'],
        juvenile: ['All gray-brown head (no white or plumes)', 'Dark cap solid black', 'Streaked neck', 'Duller overall'],
      },
      plumageDescription: {
        male: 'Prehistoric in scale — North America\'s largest heron. Blue-gray plumage, white face with a black stripe running from behind the eye to trailing black plumes, and a massive yellow-orange spear bill. The neck is folded into a tight S-curve at rest and in flight (a field mark separating herons from cranes, which fly with necks extended).',
        female: 'Identical to male. Females may average slightly smaller but are not reliably distinguished in the field.',
        juvenile: 'Lacks the white head and ornamental plumes of adults. Dark-capped, brownish, and streaked. Earns adult plumage over two years.',
      },
    },

    primaryHabitat: ['marshes', 'lakeshores', 'rivers', 'tidal_flats', 'ponds', 'flooded_fields'],
    feedingLayer: 'water',
    flightStyle: 'soaring',
    socialBehavior: {
      breeding: 'colonial_nesting',
      winter: 'solitary',
    },
    typicalGroupSize: { min: 1, max: 3 },
    activeHours: 'diurnal',

    sound: {
      callDescription: 'Harsh, prehistoric "FRAAAAHNK" — a loud, grating croak, especially when flushed from a feeding spot. Sounds like a pterodactyl.',
      songDescription: 'No true song. Nesting colonies produce a cacophony of bill-clacking, croaking, and grunting.',
      loudness: 8,
      callFrequency: 2,
      singingSeason: {
        spring: 'occasional',
        summer: 'occasional',
        fall: 'occasional',
        winter: 'rare',
      },
      sounds: ['frahnk', 'croak', 'clack'],
    },

    seasons: {
      spring: { presence: 'resident', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'winter', commonness: 'uncommon' },
    },
    range: 'north_america',

    captureStats: {
      difficulty: 5,
      speed: 1,
      flightiness: 6,
      camouflage: 6,
      sizeScore: 10,
      movementPattern: 'stalking',
      flightPattern: 'soaring',
      behaviorNotes: 'Stands motionless in shallow water for minutes — sometimes hours — before a lightning-fast strike. In binoculars view, barely moves; the challenge is its distance from shore and its wariness. Will take long, low flight away if alarmed. Reward for patience: one of the most spectacular birds on the continent.',
    },

    rarity: 'uncommon',
    rarityColor: '#2196f3',
    points: 280,
    verificationThreshold: 0.85,
    verificationMethods: 2,

    description: 'Standing four feet tall with a six-foot wingspan, the Great Blue Heron is a living dinosaur. They are consummate hunters — that statue-still pose in the shallows is pure predatory patience, followed by a strike too fast to see. They eat fish, frogs, voles, small birds, even snakes. Colonial nesters called "heronries" can host hundreds of pairs, their giant stick nests filling the tops of tall trees like a fairy-tale forest.',
    funFact: 'A heron\'s neck can strike with such speed and force that biologists call it a "biological spear gun." The S-curve of the neck stores elastic energy like a spring, releasing it in a strike faster than the eye can follow.',
    eBirdCode: 'greher',
    merlinId: 'Great_Blue_Heron',
  },
]

// ── Helper utilities ──────────────────────────────────────────────────────────

export const getBirdById = (id) => BIRDS.find(b => b.id === id)

export const getBirdsByRarity = (rarity) => BIRDS.filter(b => b.rarity === rarity)

export const getRarityLabel = (rarity) => ({
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  very_rare: 'Very Rare',
}[rarity] || rarity)

export const getSizeLabel = (size) => ({
  tiny: 'Tiny (sparrow-sized)',
  small: 'Small (robin-sized)',
  medium: 'Medium (pigeon-sized)',
  large: 'Large (crow-sized)',
  very_large: 'Very Large (heron-sized)',
}[size] || size)

// Season utility: given month (0-11) return season key
export const getCurrentSeason = (month = new Date().getMonth()) => {
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

// Pick a random bird weighted slightly toward 'common' species
export const getRandomBird = (preferCommon = true) => {
  if (preferCommon && Math.random() < 0.7) {
    const common = BIRDS.filter(b => b.rarity === 'common')
    return common[Math.floor(Math.random() * common.length)]
  }
  return BIRDS[Math.floor(Math.random() * BIRDS.length)]
}
