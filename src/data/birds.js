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

  // ─────────────────────────────────────────────────────────────
  // MOURNING DOVE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'mourning_dove',
    commonName: 'Mourning Dove',
    scientificName: 'Zenaida macroura',
    family: 'Columbidae',
    order: 'Columbiformes',
    sizeCategory: 'small',
    length_cm: [22, 36], wingspan_cm: [37, 45], weight_g: [96, 170],
    appearance: {
      billShape: 'thin', billSizeRelative: 'small',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#C4A882', female: '#C4A882' },
      uiColor: '#C4A882',
      distinctiveMarkings: {
        male: ['Soft buffy-brown overall', 'Small black spot below ear', 'Long pointed tail with white edges', 'Rosy-pink wash on breast', 'Iridescent neck patch'],
        female: ['Nearly identical to male, slightly duller'],
        juvenile: ['Scaly-looking, spotted below'],
      },
      plumageDescription: {
        male: 'Soft warm brown above, pale below with a gentle rosy-pink wash. A small black spot sits below and behind the eye. The neck has a subtle iridescent green-and-pink sheen. The long, pointed tail fans out in flight to reveal white-tipped outer feathers.',
        female: 'Nearly identical to male but slightly duller, with less iridescence on the neck.',
        juvenile: 'Scaly appearance due to pale feather edges; spotted breast.',
      },
    },
    primaryHabitat: ['open_fields', 'gardens', 'farmland', 'woodland_edge', 'roadsides'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'flocks' },
    typicalGroupSize: { min: 1, max: 20 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'The familiar "coo-OO-oo-oo-oo" — a soft, mournful five-note call that gives the species its name.',
      songDescription: 'Repeated soft cooing, slightly descending: "cooOOoo-oo-oo".',
      loudness: 4, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'occasional', winter: 'occasional' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    captureStats: { difficulty: 2, speed: 3, flightiness: 3, camouflage: 4, sizeScore: 4, movementPattern: 'walking', flightPattern: 'direct', behaviorNotes: 'Walks slowly on ground picking up seeds. Flushes with a whistling wing noise when startled. Often perches on wires.' },
    rarity: 'common', rarityColor: '#4caf50', points: 80,
    verificationThreshold: 0.60, verificationMethods: 1,
    description: 'One of North America\'s most abundant birds, the Mourning Dove is a year-round fixture from suburban yards to open farmland. Its mournful cooing is one of the most recognizable sounds in the American soundscape. Despite its gentle look, it is a prolific breeder — pairs can raise up to six broods per year. It swallows seeds whole and stores them in its crop, returning to a perch to digest.',
    funFact: 'Mourning Doves can drink by sucking water like a straw, without lifting their heads — a trick shared by very few birds.',
    eBirdCode: 'moudov', merlinId: 'Mourning_Dove',
  },

  // ─────────────────────────────────────────────────────────────
  // AMERICAN CROW
  // ─────────────────────────────────────────────────────────────
  {
    id: 'american_crow',
    commonName: 'American Crow',
    scientificName: 'Corvus brachyrhynchos',
    family: 'Corvidae',
    order: 'Passeriformes',
    sizeCategory: 'medium',
    length_cm: [40, 53], wingspan_cm: [85, 100], weight_g: [316, 620],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'large',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A1A1A', female: '#1A1A1A' },
      uiColor: '#4A4A5A',
      distinctiveMarkings: {
        male: ['All black with glossy blue-violet iridescence', 'Fan-shaped tail', 'Heavy bill', 'Loud "caw caw" call'],
        female: ['Identical to male'],
        juvenile: ['Duller black, brighter blue mouth lining'],
      },
      plumageDescription: {
        male: 'Entirely black with a blue-violet gloss in good light. Heavy rounded bill, fan-shaped tail (distinguish from Fish Crow and Common Raven). Legs and feet black.',
        female: 'Identical to male.',
        juvenile: 'Dull black without gloss; gape (corner of bill) bright blue, fading by first winter.',
      },
    },
    primaryHabitat: ['woodland_edge', 'farmland', 'urban', 'parks', 'roadsides'],
    feedingLayer: 'multi', flightStyle: 'direct',
    socialBehavior: { breeding: 'cooperative_family_groups', winter: 'large_roosts' },
    typicalGroupSize: { min: 2, max: 500 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Loud, harsh "caw caw caw" — endlessly varied. Also rattles, clicks, and mimics other sounds.',
      songDescription: 'No true song; communicates with a complex vocabulary of caws, rattles, and coos.',
      loudness: 9, callFrequency: 9,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'frequent', winter: 'frequent' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'resident', commonness: 'very_common' },
      winter: { presence: 'resident', commonness: 'very_common' },
    },
    captureStats: { difficulty: 5, speed: 5, flightiness: 7, camouflage: 1, sizeScore: 7, movementPattern: 'walking', flightPattern: 'direct', behaviorNotes: 'Highly wary and intelligent. Will often post a "lookout" crow while others feed. Approaches cautiously and flushes at significant distance.' },
    rarity: 'common', rarityColor: '#4caf50', points: 100,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The American Crow is one of North America\'s most intelligent animals, period. They use tools, recognize individual human faces, hold grudges for years, and conduct what appear to be "funerals" for dead flockmates. Winter roosts can number in the millions. Their notorious wariness — shaped by centuries of persecution — makes them challenging to approach, despite being everywhere.',
    funFact: 'Crows remember and recognize individual human faces, and will "scold" a person who has previously threatened them — even training their young to do the same.',
    eBirdCode: 'amecro', merlinId: 'American_Crow',
  },

  // ─────────────────────────────────────────────────────────────
  // SONG SPARROW
  // ─────────────────────────────────────────────────────────────
  {
    id: 'song_sparrow',
    commonName: 'Song Sparrow',
    scientificName: 'Melospiza melodia',
    family: 'Passerellidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [11, 18], wingspan_cm: [18, 24], weight_g: [17, 49],
    appearance: {
      billShape: 'conical', billSizeRelative: 'small',
      billColor: { male: 'pinkish-gray', female: 'pinkish-gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#8B6F50', female: '#8B6F50' },
      uiColor: '#9E7B58',
      distinctiveMarkings: {
        male: ['Heavy brown streaking on white breast', 'Central breast spot', 'Brown-streaked crown with gray median stripe', 'Long rounded tail', 'Broad gray supercilium'],
        female: ['Identical to male'],
        juvenile: ['Finer streaking, buffier tones'],
      },
      plumageDescription: {
        male: 'Brown and streaky throughout. The white breast bears bold brown streaks that converge into a central spot — the single best field mark. A broad gray eyebrow contrasts with brown streaks on the head. Pumps its long rounded tail in flight.',
        female: 'Identical to male.',
        juvenile: 'Similar but buffer, with finer, less defined streaking.',
      },
    },
    primaryHabitat: ['shrubs', 'wetland_edge', 'gardens', 'thickets', 'woodland_edge'],
    feedingLayer: 'ground', flightStyle: 'bounding',
    socialBehavior: { breeding: 'territorial_pairs', winter: 'loose_flocks' },
    typicalGroupSize: { min: 1, max: 6 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp "chimp" or "tchep" contact call.',
      songDescription: 'Opens with 2–3 pure notes then a buzzy trill, then a varied mix of trills and notes. Each male has a repertoire of ~20 distinct song types.',
      loudness: 6, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'moderate', winter: 'occasional' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    captureStats: { difficulty: 4, speed: 4, flightiness: 5, camouflage: 6, sizeScore: 2, movementPattern: 'hopping', flightPattern: 'bounding', behaviorNotes: 'Skulks low in dense shrubs. Often pumps tail while perched. Will dart back into cover quickly if alarmed.' },
    rarity: 'common', rarityColor: '#4caf50', points: 90,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The Song Sparrow\'s voice fills wetland edges and shrubby yards across the continent. It is one of the most extensively studied birds in North America — researchers have tracked individual birds\' song dialects, territorial behavior, and evolution for decades. Despite its plain brown looks, the complexity of its song is extraordinary: a male sings dozens of distinct song types and improvises combinations constantly.',
    funFact: 'Song Sparrows have regional dialects — birds in different areas sing noticeably different versions of the song, similar to regional accents in human speech.',
    eBirdCode: 'sonspa', merlinId: 'Song_Sparrow',
  },

  // ─────────────────────────────────────────────────────────────
  // DOWNY WOODPECKER
  // ─────────────────────────────────────────────────────────────
  {
    id: 'downy_woodpecker',
    commonName: 'Downy Woodpecker',
    scientificName: 'Dryobates pubescens',
    family: 'Picidae',
    order: 'Piciformes',
    sizeCategory: 'small',
    length_cm: [14, 18], wingspan_cm: [25, 31], weight_g: [20, 33],
    appearance: {
      billShape: 'spear', billSizeRelative: 'small',
      billColor: { male: 'gray', female: 'gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#FAFAFA', female: '#FAFAFA' },
      uiColor: '#CC2222',
      distinctiveMarkings: {
        male: ['Black and white checkered pattern', 'Bold white back stripe', 'Red spot on back of head', 'Small stubby bill'],
        female: ['Identical but no red head spot'],
        juvenile: ['Red cap (both sexes), loses to adult pattern by fall'],
      },
      plumageDescription: {
        male: 'Boldly patterned in black and white. A broad white stripe runs down the center of the back. The head has bold black-and-white stripes, and males show a small red patch on the nape. Tiny bill — notably shorter than the Hairy Woodpecker, its near-identical larger cousin.',
        female: 'Same pattern as male but lacks the red nape patch.',
        juvenile: 'Both sexes have a red cap in juvenile plumage.',
      },
    },
    primaryHabitat: ['woodland', 'woodland_edge', 'gardens', 'orchards', 'parks'],
    feedingLayer: 'canopy', flightStyle: 'undulating',
    socialBehavior: { breeding: 'territorial_pairs', winter: 'solitary_or_mixed_flocks' },
    typicalGroupSize: { min: 1, max: 2 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp "pik!" — higher and softer than Hairy Woodpecker.',
      songDescription: 'Rapid whinny descending in pitch. Also drums on resonant wood.',
      loudness: 5, callFrequency: 6,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'occasional', winter: 'occasional' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    captureStats: { difficulty: 4, speed: 3, flightiness: 5, camouflage: 3, sizeScore: 2, movementPattern: 'climbing', flightPattern: 'undulating', behaviorNotes: 'Hitches up tree trunks in a spiral pattern. Will circle to the far side of a branch if observed. Often visits suet feeders.' },
    rarity: 'common', rarityColor: '#4caf50', points: 110,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Downy is North America\'s smallest woodpecker and its most familiar. Its small size lets it forage on slender weed stalks, sunflower heads, and tiny branches that larger woodpeckers ignore. In winter it commonly joins mixed-species flocks with chickadees and nuthatches, lending its sharp "pik!" call to the chorus. At suet feeders it is almost always present.',
    funFact: 'The Downy Woodpecker\'s tongue wraps around the back of its skull when retracted — a special skull anatomy that acts as a shock absorber when hammering.',
    eBirdCode: 'dowwoo', merlinId: 'Downy_Woodpecker',
  },

  // ─────────────────────────────────────────────────────────────
  // WHITE-BREASTED NUTHATCH
  // ─────────────────────────────────────────────────────────────
  {
    id: 'white_breasted_nuthatch',
    commonName: 'White-breasted Nuthatch',
    scientificName: 'Sitta carolinensis',
    family: 'Sittidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [13, 14], wingspan_cm: [20, 27], weight_g: [18, 30],
    appearance: {
      billShape: 'spear', billSizeRelative: 'medium',
      billColor: { male: 'blue-gray', female: 'blue-gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#FAFAFA', female: '#FAFAFA' },
      uiColor: '#5B7FA6',
      distinctiveMarkings: {
        male: ['Black cap and nape', 'Blue-gray back and wings', 'White face and underparts', 'Rusty flanks', 'Climbs headfirst down trees'],
        female: ['Gray cap instead of black'],
        juvenile: ['Similar to female'],
      },
      plumageDescription: {
        male: 'Unmistakable posture: blue-gray above, white below, jet black cap. Often seen clinging to bark headfirst — the only bird that routinely descends trees face-down.',
        female: 'Same pattern as male but with a duller gray cap instead of black.',
        juvenile: 'Similar to female.',
      },
    },
    primaryHabitat: ['woodland', 'woodland_edge', 'parks', 'gardens'],
    feedingLayer: 'canopy', flightStyle: 'undulating',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'pairs_or_mixed_flocks' },
    typicalGroupSize: { min: 1, max: 2 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Loud nasal "yank yank yank" — unmistakable.',
      songDescription: 'Rapid nasal series: "whi-whi-whi-whi-whi".',
      loudness: 6, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'moderate', winter: 'moderate' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    captureStats: { difficulty: 4, speed: 5, flightiness: 5, camouflage: 2, sizeScore: 2, movementPattern: 'climbing', flightPattern: 'undulating', behaviorNotes: 'Creeps headfirst down tree trunks, wedging large seeds into bark crevices to hammer open. Very active and alert.' },
    rarity: 'common', rarityColor: '#4caf50', points: 110,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The White-breasted Nuthatch is the only bird that routinely walks headfirst down tree trunks, giving it a unique vantage to spot insects that upward-climbing birds miss. Its nasal "yank yank" call is a staple of woodland soundscapes across the continent. It stuffs seeds and nuts into bark crevices, hammering them open — hence the name "nuthatch" from "nuthack."',
    funFact: 'White-breasted Nuthatches smear insects around the entrance of their nest hole — possibly to deter squirrels and other predators with the odor.',
    eBirdCode: 'wbnu', merlinId: 'White-breasted_Nuthatch',
  },

  // ─────────────────────────────────────────────────────────────
  // DARK-EYED JUNCO
  // ─────────────────────────────────────────────────────────────
  {
    id: 'dark_eyed_junco',
    commonName: 'Dark-eyed Junco',
    scientificName: 'Junco hyemalis',
    family: 'Passerellidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [13, 17], wingspan_cm: [18, 25], weight_g: [15, 30],
    appearance: {
      billShape: 'conical', billSizeRelative: 'small',
      billColor: { male: 'pale pink', female: 'pale pink' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#3A3A3A', female: '#6B5B4E' },
      uiColor: '#5A5A7A',
      distinctiveMarkings: {
        male: ['Slate-gray hood and upperparts', 'White belly', 'White outer tail feathers flash in flight', 'Pink bill', '"Snowbird" — arrives with cold weather'],
        female: ['Brown-gray rather than slate-gray hood'],
        juvenile: ['Streaked breast fading to adult pattern by fall'],
      },
      plumageDescription: {
        male: 'A round, neat bird with a solid slate-gray hood and back contrasting sharply with a clean white belly. The pink bill and white outer tail feathers (flashing in flight) are the key field marks.',
        female: 'Same pattern as male but brownish-gray rather than slate.',
        juvenile: 'Heavily streaked until the first fall molt.',
      },
    },
    primaryHabitat: ['woodland', 'woodland_edge', 'gardens', 'parks', 'brush_piles'],
    feedingLayer: 'ground', flightStyle: 'bounding',
    socialBehavior: { breeding: 'territorial_pairs', winter: 'flocks' },
    typicalGroupSize: { min: 1, max: 30 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp "tick" or "tsip" contact call.',
      songDescription: 'A musical trill on one pitch, slightly reminiscent of a chipping sparrow but more musical.',
      loudness: 5, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'rare', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'migrant_and_breeder', commonness: 'common' },
      summer: { presence: 'breeder_north', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'winter_visitor', commonness: 'very_common' },
    },
    captureStats: { difficulty: 3, speed: 4, flightiness: 5, camouflage: 3, sizeScore: 2, movementPattern: 'hopping', flightPattern: 'bounding', behaviorNotes: 'Scratches in leaf litter for seeds. Flocks scatter low into dense brush when startled. The white tail flashes are conspicuous in flight.' },
    rarity: 'common', rarityColor: '#4caf50', points: 90,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The Dark-eyed Junco is nicknamed "snowbird" — its arrival at feeders signals the start of winter. They breed in boreal forests and mountainsides, then flood south and downslope to spend winter in suburban yards. Flocks scratch methodically through leaf litter and beneath feeders, and the flash of white outer tail feathers as they flush is one of winter birding\'s most familiar sights.',
    funFact: 'The Dark-eyed Junco is actually not one species but a "superspecies" — the Slate-colored, Oregon, Pink-sided, Gray-headed, and White-winged forms were once considered separate species and still look strikingly different.',
    eBirdCode: 'daejun', merlinId: 'Dark-eyed_Junco',
  },

  // ─────────────────────────────────────────────────────────────
  // HOUSE FINCH
  // ─────────────────────────────────────────────────────────────
  {
    id: 'house_finch',
    commonName: 'House Finch',
    scientificName: 'Haemorhous mexicanus',
    family: 'Fringillidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [13, 14], wingspan_cm: [20, 25], weight_g: [16, 27],
    appearance: {
      billShape: 'conical', billSizeRelative: 'medium',
      billColor: { male: 'gray', female: 'gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#CC4422', female: '#8B7355' },
      uiColor: '#CC4422',
      distinctiveMarkings: {
        male: ['Rosy-red head, breast, and rump', 'Brown-streaked back and flanks', 'Curved culmen (curved upper bill edge)'],
        female: ['Plain brown with heavy streaking, no red', 'Blurry face pattern without sharp supercilium'],
        juvenile: ['Similar to female'],
      },
      plumageDescription: {
        male: 'The rosy-red of the head and breast varies enormously — birds eating more carotenoid-rich food are brighter red, yellow-orange birds ate less. The curved bill and streaked flanks distinguish males from Purple Finches.',
        female: 'Plain brown and heavily streaked, with an indistinct face pattern. Identified by the curved bill and stocky shape.',
        juvenile: 'Similar to female.',
      },
    },
    primaryHabitat: ['urban', 'suburban', 'gardens', 'farmland', 'woodland_edge'],
    feedingLayer: 'shrub', flightStyle: 'undulating',
    socialBehavior: { breeding: 'loosely_colonial', winter: 'large_flocks' },
    typicalGroupSize: { min: 2, max: 50 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'A rising "weet?" call.',
      songDescription: 'Long, rambling, cheerful warble ending in a buzzy "zree." Males sing constantly from exposed perches.',
      loudness: 6, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'moderate', winter: 'moderate' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    captureStats: { difficulty: 3, speed: 4, flightiness: 4, camouflage: 3, sizeScore: 2, movementPattern: 'perching', flightPattern: 'undulating', behaviorNotes: 'Active feeder visitor, comfortable near humans. Males sing persistently from prominent perches.' },
    rarity: 'common', rarityColor: '#4caf50', points: 90,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'Originally native to the western US, the House Finch was released in New York in the 1940s after a failed pet-trade scheme. The eastern population exploded and the two populations reconnected across the continent. Today it is one of the most abundant birds in North America and a fixture at feeders. Males famously vary in color from pale yellow to deep red depending on their diet during molt.',
    funFact: 'The redness of a male House Finch\'s plumage depends entirely on diet — birds with access to red berries and fruits become brilliantly red, while those eating less colorful food turn yellow-orange.',
    eBirdCode: 'houfin', merlinId: 'House_Finch',
  },

  // ─────────────────────────────────────────────────────────────
  // HOUSE SPARROW
  // ─────────────────────────────────────────────────────────────
  {
    id: 'house_sparrow',
    commonName: 'House Sparrow',
    scientificName: 'Passer domesticus',
    family: 'Passeridae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [14, 18], wingspan_cm: [19, 25], weight_g: [24, 40],
    appearance: {
      billShape: 'conical', billSizeRelative: 'large',
      billColor: { male: 'black (breeding) / yellow (nonbreeding)', female: 'yellow' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#7A6040', female: '#9A8060' },
      uiColor: '#8A7050',
      distinctiveMarkings: {
        male: ['Chestnut brown back streaked black', 'Gray crown', 'Black bib (size indicates dominance)', 'White cheek patch', 'Stout bill'],
        female: ['Plain buff-brown', 'Broad buffy eyebrow', 'Streaked back', 'No bib'],
        juvenile: ['Similar to female'],
      },
      plumageDescription: {
        male: 'The breeding male is handsomely marked: chestnut-and-black streaked back, gray crown flanked by chestnut, white cheeks, and a black bib whose size signals social rank.',
        female: 'Plain and streaky brown with a distinctive broad buffy supercilium.',
        juvenile: 'Resembles female.',
      },
    },
    primaryHabitat: ['urban', 'suburban', 'farmyards', 'buildings'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'colonial', winter: 'large_flocks' },
    typicalGroupSize: { min: 5, max: 100 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Cheerful, unceasing "cheep cheep cheep" — the quintessential urban sparrow.',
      songDescription: 'Series of repeated chirps and cheeps; not melodic.',
      loudness: 5, callFrequency: 9,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'frequent', winter: 'frequent' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'resident', commonness: 'very_common' },
      winter: { presence: 'resident', commonness: 'very_common' },
    },
    captureStats: { difficulty: 2, speed: 4, flightiness: 3, camouflage: 4, sizeScore: 2, movementPattern: 'hopping', captureBackground: 'urban_edge', flightPattern: 'direct', behaviorNotes: 'Highly adapted to humans; bold and confiding near buildings and cafes. Forages in noisy flocks.' },
    rarity: 'common', rarityColor: '#4caf50', points: -10,
    introduced: true,
    invasiveNote: 'Introduced to New York City in 1851, the House Sparrow now numbers over 500 million worldwide. It aggressively evicts native cavity-nesting birds — bluebirds, Tree Swallows, Carolina Wrens — from nest boxes and natural cavities. Releasing it back into the wild rather than logging it in your aviary is the right call.',
    verificationThreshold: 0.55, verificationMethods: 1,
    description: 'Introduced to New York in 1851, the House Sparrow has colonized every corner of North America where humans live. It\'s among the world\'s most abundant birds. Though often overlooked, its success is a study in adaptability — it has evolved measurably in the 170 years since introduction, with different US populations already diverging in body size and bill shape in response to local climates.',
    funFact: 'Male House Sparrows with larger black bibs are dominant and get first access to food and mates — female sparrows prefer males with bigger bibs.',
    eBirdCode: 'houspa', merlinId: 'House_Sparrow',
  },

  // ─────────────────────────────────────────────────────────────
  // EUROPEAN STARLING
  // ─────────────────────────────────────────────────────────────
  {
    id: 'european_starling',
    commonName: 'European Starling',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [19, 22], wingspan_cm: [31, 44], weight_g: [58, 101],
    appearance: {
      billShape: 'spear', billSizeRelative: 'medium',
      billColor: { male: 'yellow (breeding)', female: 'yellow (breeding)' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#2A2A2A', female: '#2A2A2A' },
      uiColor: '#556B55',
      distinctiveMarkings: {
        male: ['Iridescent green-purple gloss in breeding plumage', 'Spotted in winter (spots wear off by spring)', 'Short tail, triangular wing shape', 'Yellow bill in spring'],
        female: ['Similar to male; bill base pink in female vs. blue in male'],
        juvenile: ['Plain gray-brown, transitioning to adult spottedness'],
      },
      plumageDescription: {
        male: 'In summer a glossy, oil-slick mix of iridescent green and purple. In winter the feather tips show white spots that gradually wear away by spring. The short tail and triangular wing shape make it look like a "flying arrowhead" in flight.',
        female: 'Nearly identical to male; distinguished by the pinkish-tan base to the lower mandible (blue in males).',
        juvenile: 'Uniformly grayish-brown, molting into spotted adult plumage through the first winter.',
      },
    },
    primaryHabitat: ['urban', 'farmland', 'parks', 'woodland_edge'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'loosely_colonial', winter: 'massive_flocks' },
    typicalGroupSize: { min: 1, max: 100000 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Raspy, varied — whistles, rattles, clicks, and an extraordinary range of mimicry.',
      songDescription: 'A rambling medley of whistles and rattles, often including perfect mimicry of other birds\' calls.',
      loudness: 7, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'moderate', winter: 'moderate' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'resident', commonness: 'very_common' },
      winter: { presence: 'resident', commonness: 'very_common' },
    },
    captureStats: { difficulty: 3, speed: 5, flightiness: 4, camouflage: 3, sizeScore: 4, movementPattern: 'walking', captureBackground: 'urban_edge', flightPattern: 'direct', behaviorNotes: 'Walks briskly with head-bobbing gait. Often in large noisy flocks. Winter murmurations are spectacular.' },
    rarity: 'common', rarityColor: '#4caf50', points: -15,
    introduced: true,
    invasiveNote: 'Released in Central Park in 1890 by Eugene Schieffelin, who wanted to introduce every bird mentioned by Shakespeare. The result: 200 million starlings across North America. Starlings evict woodpeckers, Purple Martins, and bluebirds from nest cavities — sometimes killing the occupants. Spectacular murmurations cannot undo the ecological damage.',
    verificationThreshold: 0.60, verificationMethods: 1,
    description: 'Introduced from Europe in the 1890s when Shakespeare enthusiasts released 60 birds in Central Park, the European Starling has become one of North America\'s most abundant birds with over 200 million individuals. Their winter murmurations — swirling flocks of thousands moving in perfect synchrony — are among the most spectacular wildlife sights on earth.',
    funFact: 'A murmuration of starlings can contain a million birds and move as a single fluid organism. Each bird tracks its seven nearest neighbors, and the information wave travels through the flock faster than any individual can process.',
    eBirdCode: 'eursta', merlinId: 'European_Starling',
  },

  // ─────────────────────────────────────────────────────────────
  // RED-WINGED BLACKBIRD
  // ─────────────────────────────────────────────────────────────
  {
    id: 'red_winged_blackbird',
    commonName: 'Red-winged Blackbird',
    scientificName: 'Agelaius phoeniceus',
    family: 'Icteridae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [17, 23], wingspan_cm: [31, 40], weight_g: [32, 77],
    appearance: {
      billShape: 'spear', billSizeRelative: 'medium',
      billColor: { male: 'black', female: 'brown' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A1A1A', female: '#5A4030' },
      uiColor: '#CC3311',
      distinctiveMarkings: {
        male: ['All black with brilliant red-and-yellow epaulets', 'Epaulets hidden when at rest, flashed during display'],
        female: ['Heavily streaked brown — looks like a large sparrow', 'Slightly rusty eyebrow'],
        juvenile: ['Similar to female'],
      },
      plumageDescription: {
        male: 'Jet black with unmistakable red-and-yellow shoulder patches (epaulets). Males can conceal or display the red patch — a concealed bird looks plain black, a displaying male blazes.',
        female: 'Heavily streaked brown with a hint of rusty tones — so different from males that they were once described as a separate species.',
        juvenile: 'Similar to female.',
      },
    },
    primaryHabitat: ['wetlands', 'marshes', 'meadows', 'farmland', 'roadside'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'polygynous_territories', winter: 'huge_flocks' },
    typicalGroupSize: { min: 1, max: 1000 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Loud "chek" or "tseee" alarm.',
      songDescription: 'The iconic "conk-a-ree!" — a liquid gurgling trill, usually from a cattail perch.',
      loudness: 8, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'occasional', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'partial_migrant', commonness: 'uncommon' },
    },
    captureStats: { difficulty: 3, speed: 5, flightiness: 5, camouflage: 2, sizeScore: 4, movementPattern: 'perching', flightPattern: 'direct', behaviorNotes: 'Males perch conspicuously on cattails and sing constantly. Aggressively defends territory against much larger intruders including hawks.' },
    rarity: 'common', rarityColor: '#4caf50', points: 100,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The Red-winged Blackbird may be the most numerous bird in North America — population estimates approach 250 million. The male\'s "conk-a-ree" from a cattail perch is the defining sound of spring wetlands. Males are fiercely territorial and regularly dive-bomb hawks, crows, and humans who approach nests.',
    funFact: 'A male Red-winged Blackbird may have up to 15 females nesting in his territory simultaneously — one of the most polygynous birds in North America.',
    eBirdCode: 'rewbla', merlinId: 'Red-winged_Blackbird',
  },

  // ─────────────────────────────────────────────────────────────
  // CANADA GOOSE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'canada_goose',
    commonName: 'Canada Goose',
    scientificName: 'Branta canadensis',
    family: 'Anatidae',
    order: 'Anseriformes',
    sizeCategory: 'very_large',
    length_cm: [75, 110], wingspan_cm: [127, 185], weight_g: [2000, 9000],
    appearance: {
      billShape: 'spatulate', billSizeRelative: 'large',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#5A5040', female: '#5A5040' },
      uiColor: '#4A4030',
      distinctiveMarkings: {
        male: ['Black head and neck', 'White chinstrap patch', 'Brown body', 'White undertail', 'V-formations in flight'],
        female: ['Identical to male'],
        juvenile: ['Similar pattern, duller brown'],
      },
      plumageDescription: {
        male: 'The bold black-and-white head pattern is unmistakable: black head and neck, white cheek and throat patch. The body is warm brown above and buff below.',
        female: 'Identical to male in plumage.',
        juvenile: 'Similar to adult but duller and browner.',
      },
    },
    primaryHabitat: ['lakes', 'ponds', 'golf_courses', 'parks', 'farmland', 'lawns'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'large_flocks' },
    typicalGroupSize: { min: 2, max: 500 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Loud, resonant "honk-honk-honk." One of the most recognizable sounds of North American skies.',
      songDescription: 'No true song; communicates with honks, hisses, and cackling.',
      loudness: 9, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'occasional', fall: 'frequent', winter: 'moderate' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident_and_migrant', commonness: 'very_common' },
      winter: { presence: 'resident', commonness: 'common' },
    },
    captureStats: { difficulty: 4, speed: 5, flightiness: 6, camouflage: 3, sizeScore: 9, movementPattern: 'walking', flightPattern: 'direct', behaviorNotes: 'Grazes in large flocks on lawns and fields. Defensive near nests — will hiss, puff up, and charge. Hard to approach when in water.' },
    rarity: 'common', rarityColor: '#4caf50', points: 120,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Canada Goose\'s seasonal V-formations overhead are one of the iconic signals of autumn in North America. Once genuinely migratory, many urban populations have gone resident year-round, thriving on parks, golf courses, and manicured lawns. Mated pairs bond for life, and both parents vigorously defend chicks — triggering many a suburban standoff.',
    funFact: 'Geese fly in V-formation because each bird\'s wingtip vortex creates an uplift for the bird behind. The lead goose works hardest — so the formation rotates leadership to share the effort.',
    eBirdCode: 'cangoo', merlinId: 'Canada_Goose',
  },

  // ─────────────────────────────────────────────────────────────
  // OSPREY
  // ─────────────────────────────────────────────────────────────
  {
    id: 'osprey',
    commonName: 'Osprey',
    scientificName: 'Pandion haliaetus',
    family: 'Pandionidae',
    order: 'Accipitriformes',
    sizeCategory: 'large',
    length_cm: [52, 60], wingspan_cm: [150, 180], weight_g: [1200, 2050],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'large',
      billColor: { male: 'blue-gray/black', female: 'blue-gray/black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#3A3020', female: '#3A3020' },
      uiColor: '#5A8080',
      distinctiveMarkings: {
        male: ['Dark brown above, white below', 'White head with bold dark eye stripe', 'Distinctive wrist patches (dark carpal patches) in flight', 'Bowed wings in flight ("M" shape)'],
        female: ['Brown necklace across upper breast'],
        juvenile: ['Pale edges on back feathers give scaled appearance'],
      },
      plumageDescription: {
        male: 'Dark chocolate-brown above and bright white below. The white head sports a bold dark stripe through the eye. In flight the long, bowed wings with dark carpal patches are unmistakable — no other raptor looks quite like it.',
        female: 'Nearly identical to male but typically shows a brown necklace across the breast.',
        juvenile: 'Similar to adult but back feathers edged with pale buff, giving a scaled look.',
      },
    },
    primaryHabitat: ['coastlines', 'rivers', 'lakes', 'estuaries', 'reservoirs'],
    feedingLayer: 'aerial', flightStyle: 'soaring',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 2 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'High, whistled "cheep-cheep-cheep" or "kyew kyew kyew" — surprisingly small-sounding for such a large bird.',
      songDescription: 'No song; communicates with high whistled calls.',
      loudness: 6, callFrequency: 4,
      singingSeason: { spring: 'moderate', summer: 'moderate', fall: 'occasional', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'migrant_and_breeder', commonness: 'uncommon' },
      summer: { presence: 'breeder', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent_most_of_US', commonness: 'rare' },
    },
    captureStats: { difficulty: 7, speed: 7, flightiness: 6, camouflage: 2, sizeScore: 8, movementPattern: 'soaring', flightPattern: 'soaring', behaviorNotes: 'Hunts by hovering over water then plunge-diving feet-first. Perches conspicuously on dead snags near water. Usually detected by call.' },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 200,
    verificationThreshold: 0.75, verificationMethods: 1,
    description: 'The Osprey is a specialist fish hunter found on every continent except Antarctica. It is one of the great conservation success stories — DDT nearly wiped it out, but after the ban it has fully recovered across North America. Watching an Osprey stall in a hover, then fold its wings and plunge 30 feet into water feet-first to seize a fish is one of nature\'s great spectacles.',
    funFact: 'Ospreys have reversible outer toes and barbed pads on the feet specifically to grip slippery fish — and they always rotate their catch to face forward in flight for aerodynamics.',
    eBirdCode: 'osprey', merlinId: 'Osprey',
  },

  // ─────────────────────────────────────────────────────────────
  // EASTERN BLUEBIRD
  // ─────────────────────────────────────────────────────────────
  {
    id: 'eastern_bluebird',
    commonName: 'Eastern Bluebird',
    scientificName: 'Sialia sialis',
    family: 'Turdidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [16, 21], wingspan_cm: [25, 32], weight_g: [27, 34],
    appearance: {
      billShape: 'thin', billSizeRelative: 'small',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1E6DCC', female: '#5A80B0' },
      uiColor: '#1E6DCC',
      distinctiveMarkings: {
        male: ['Brilliant royal blue upperparts', 'Rusty-orange breast and flanks', 'White belly', 'Plump shape with thin bill'],
        female: ['Grayish-blue above, paler than male', 'Washed orange on breast, much paler than male'],
        juvenile: ['Spotted breast like a thrush, blue in wings and tail'],
      },
      plumageDescription: {
        male: 'One of North America\'s most beautiful birds: brilliant royal blue above, warm rusty-orange on the breast and flanks, and clean white below.',
        female: 'Grayish above with blue restricted to wings and tail. Washed orange on the breast — paler and less saturated than the male.',
        juvenile: 'Spotted breast typical of the thrush family, with blue in the wings.',
      },
    },
    primaryHabitat: ['open_woodland', 'orchards', 'farmland', 'parks', 'roadsides'],
    feedingLayer: 'multi', flightStyle: 'undulating',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'small_flocks' },
    typicalGroupSize: { min: 1, max: 15 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Soft, melodious "chur-lee" or "tur-a-wee."',
      songDescription: 'A series of mellow, warbled phrases: "tru-al-ly, tru-al-ly" — gentle and musical.',
      loudness: 4, callFrequency: 5,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'occasional', winter: 'occasional' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'uncommon' },
      summer: { presence: 'resident', commonness: 'uncommon' },
      fall:   { presence: 'resident', commonness: 'uncommon' },
      winter: { presence: 'resident', commonness: 'uncommon' },
    },
    captureStats: { difficulty: 5, speed: 5, flightiness: 6, camouflage: 1, sizeScore: 3, movementPattern: 'perching', flightPattern: 'undulating', behaviorNotes: 'Perches on low branches or fence posts, drops to the ground to take insects. Beautiful but skittish.' },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 180,
    verificationThreshold: 0.75, verificationMethods: 1,
    description: 'The Eastern Bluebird is a symbol of happiness and spring across the eastern US. It nearly vanished in the 20th century as competition with introduced House Sparrows and European Starlings for nest cavities sent populations plummeting. A massive citizen-science effort to install nest boxes reversed the decline — millions of boxes now line trails, roadsides, and farmland, and the species has fully recovered.',
    funFact: 'The Eastern Bluebird\'s color isn\'t from pigment — the feathers contain no blue dye. The blue is produced by the microscopic structure of the feather barbs scattering light, similar to how the sky is blue.',
    eBirdCode: 'easblu', merlinId: 'Eastern_Bluebird',
  },

  // ─────────────────────────────────────────────────────────────
  // RUBY-THROATED HUMMINGBIRD
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ruby_throated_hummingbird',
    commonName: 'Ruby-throated Hummingbird',
    scientificName: 'Archilochus colubris',
    family: 'Trochilidae',
    order: 'Apodiformes',
    sizeCategory: 'tiny',
    length_cm: [7, 9], wingspan_cm: [8, 11], weight_g: [2, 6],
    appearance: {
      billShape: 'thin', billSizeRelative: 'massive',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#2A5A20', female: '#2A5A20' },
      uiColor: '#CC1122',
      distinctiveMarkings: {
        male: ['Iridescent green upperparts', 'Brilliant ruby-red gorget (throat)', 'White chest and belly', 'Forked tail', 'Hovers at flowers'],
        female: ['Green above, white below', 'No red throat', 'Rounded tail with white tips'],
        juvenile: ['Similar to female'],
      },
      plumageDescription: {
        male: 'Glittering emerald-green above. The throat gorget blazes ruby-red in good light but looks black at the wrong angle. White chest and belly, notched tail.',
        female: 'Green above, white below with faint streaking on throat. White-tipped outer tail feathers.',
        juvenile: 'Resembles female.',
      },
    },
    primaryHabitat: ['gardens', 'woodland_edge', 'orchards', 'meadows'],
    feedingLayer: 'aerial', flightStyle: 'hovering',
    socialBehavior: { breeding: 'solitary_males', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Soft "tseep" or "chewp." Wing beats produce an audible hum.',
      songDescription: 'Series of rapid chipping notes; no true song.',
      loudness: 2, callFrequency: 4,
      singingSeason: { spring: 'moderate', summer: 'moderate', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'migrant_and_breeder', commonness: 'uncommon' },
      summer: { presence: 'breeder', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    captureStats: { difficulty: 9, speed: 10, flightiness: 8, camouflage: 2, sizeScore: 1, movementPattern: 'hovering', flightPattern: 'hovering', behaviorNotes: 'Extremely fast — can fly backwards, sideways, and hover perfectly. Defends feeders and flower patches aggressively. Blink and you miss it.' },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 250,
    verificationThreshold: 0.80, verificationMethods: 1,
    description: 'The only hummingbird that breeds in the eastern US, the Ruby-throated is a marvel of miniaturized engineering. Its heart beats over 1,200 times per minute in flight. It crosses the Gulf of Mexico non-stop — 800 miles over open water — twice a year on migration, fueled by fat reserves that double its body weight before departure. A single nest, the size of half a walnut, is made of plant fibers bound with spider silk.',
    funFact: 'A Ruby-throated Hummingbird in migration can double its body weight in fat reserves — then burn it all off crossing the Gulf of Mexico in an 18-20 hour non-stop flight.',
    eBirdCode: 'rthhum', merlinId: 'Ruby-throated_Hummingbird',
  },

  // ─────────────────────────────────────────────────────────────
  // CEDAR WAXWING
  // ─────────────────────────────────────────────────────────────
  {
    id: 'cedar_waxwing',
    commonName: 'Cedar Waxwing',
    scientificName: 'Bombycilla cedrorum',
    family: 'Bombycillidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [14, 17], wingspan_cm: [22, 30], weight_g: [30, 40],
    appearance: {
      billShape: 'thin', billSizeRelative: 'small',
      billColor: { male: 'black', female: 'black' },
      crestPresent: true, crestColor: { male: 'brown', female: 'brown' },
      primaryColor: { male: '#9B7B55', female: '#9B7B55' },
      uiColor: '#CC8822',
      distinctiveMarkings: {
        male: ['Silky warm-brown body', 'Sleek crest', 'Black mask', 'Yellow tail tip', 'Red waxy wing tips', 'Lemon-yellow belly'],
        female: ['Nearly identical to male'],
        juvenile: ['Streaky, lacks wax tips; face mask faint'],
      },
      plumageDescription: {
        male: 'One of the most elegantly-groomed birds in North America. Silky warm-brown with a sleek crest, black mask, lemon-yellow belly, yellow tail tip, and the namesake red waxy droplets on wing feather tips.',
        female: 'Nearly identical to male; slightly less red wax, slighter mask.',
        juvenile: 'Streaky brown, lacks wax tips until first winter.',
      },
    },
    primaryHabitat: ['woodland', 'orchards', 'gardens', 'fruiting_trees', 'streamsides'],
    feedingLayer: 'canopy', flightStyle: 'undulating',
    socialBehavior: { breeding: 'loose_colonies', winter: 'nomadic_flocks' },
    typicalGroupSize: { min: 5, max: 200 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'High, thin "seee" — a pure high-pitched whistle, often the first sign of a passing flock overhead.',
      songDescription: 'High trilled "sreeee"; thin whistle notes.',
      loudness: 4, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'moderate', winter: 'moderate' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'uncommon' },
      summer: { presence: 'resident', commonness: 'uncommon' },
      fall:   { presence: 'nomadic', commonness: 'common' },
      winter: { presence: 'nomadic', commonness: 'common' },
    },
    captureStats: { difficulty: 6, speed: 6, flightiness: 6, camouflage: 3, sizeScore: 3, movementPattern: 'perching', flightPattern: 'undulating', behaviorNotes: 'Appears suddenly in fruiting trees, strips them, and moves on. Listen for the high seee calls overhead. Flocks are compact and coordinated.' },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 200,
    verificationThreshold: 0.75, verificationMethods: 1,
    description: 'Cedar Waxwings are wandering nomads, following fruit crops across the continent rather than fixed territories. They are famous for their elegant appearance and for passing berries beak-to-beak down a perched line of birds — a social display of fruit-sharing. They have been observed getting drunk on fermented berries, stumbling around until they sober up.',
    funFact: 'Cedar Waxwings sometimes pass berries beak-to-beak down a row of perched birds — apparently a courtship or social bonding behavior. They also get intoxicated on fermented fruits and have been found unable to fly.',
    eBirdCode: 'cedwax', merlinId: 'Cedar_Waxwing',
  },

  // ─────────────────────────────────────────────────────────────
  // TURKEY VULTURE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'turkey_vulture',
    commonName: 'Turkey Vulture',
    scientificName: 'Cathartes aura',
    family: 'Cathartidae',
    order: 'Cathartiformes',
    sizeCategory: 'very_large',
    length_cm: [62, 81], wingspan_cm: [160, 183], weight_g: [854, 2260],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'large',
      billColor: { male: 'ivory-white', female: 'ivory-white' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#2A1A10', female: '#2A1A10' },
      uiColor: '#CC3311',
      distinctiveMarkings: {
        male: ['All dark body', 'Naked red head (adult)', 'Silvery wing lining from below', 'Soars in a "V" (dihedral) with much teetering'],
        female: ['Identical to male'],
        juvenile: ['Gray head instead of red'],
      },
      plumageDescription: {
        male: 'All dark brown-black body. The naked red head is the key adult field mark — a featherless head helps when feeding inside carcasses. From below, the flight feathers are silvery, contrasting with darker wing linings.',
        female: 'Identical to male.',
        juvenile: 'Gray-headed; bill dark-tipped.',
      },
    },
    primaryHabitat: ['open_country', 'roadsides', 'farmland', 'forest_edge', 'thermals'],
    feedingLayer: 'aerial', flightStyle: 'soaring',
    socialBehavior: { breeding: 'loose_colonies', winter: 'large_roosts' },
    typicalGroupSize: { min: 1, max: 50 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Essentially silent — only produces hisses and grunts. No vocal organ.',
      songDescription: 'No song; lacks a syrinx (voice organ).',
      loudness: 1, callFrequency: 1,
      singingSeason: { spring: 'rare', summer: 'rare', fall: 'rare', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'migrant_and_breeder', commonness: 'common' },
      summer: { presence: 'breeder', commonness: 'common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'partial_migrant', commonness: 'uncommon' },
    },
    captureStats: { difficulty: 5, speed: 6, flightiness: 5, camouflage: 2, sizeScore: 9, movementPattern: 'soaring', flightPattern: 'soaring', behaviorNotes: 'Soars in wide circles on thermals, rocking side to side in a "V." Locate by scanning the sky rather than the ground.' },
    rarity: 'common', rarityColor: '#4caf50', points: 130,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Turkey Vulture is nature\'s sanitation crew, and arguably one of the most important birds in the ecosystem. It locates carrion primarily by smell — extraordinarily rare among birds — using one of the most highly developed olfactory systems in the animal kingdom. Its stomach acid is powerful enough to destroy anthrax, botulism, and cholera, preventing these diseases from spreading through the environment.',
    funFact: 'Turkey Vultures are one of the only birds that find food primarily by smell. They have a greatly enlarged olfactory lobe in the brain and can detect a dead animal hidden under forest canopy from a mile away.',
    eBirdCode: 'turvul', merlinId: 'Turkey_Vulture',
  },

  // ─────────────────────────────────────────────────────────────
  // COMMON GRACKLE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'common_grackle',
    commonName: 'Common Grackle',
    scientificName: 'Quiscalus quiscula',
    family: 'Icteridae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [28, 34], wingspan_cm: [36, 46], weight_g: [74, 142],
    appearance: {
      billShape: 'spear', billSizeRelative: 'large',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A1A1A', female: '#3A3030' },
      uiColor: '#7744AA',
      distinctiveMarkings: {
        male: ['Iridescent blue-purple head', 'Bronze or purple gloss on body', 'Long keel-shaped tail', 'Pale yellow eye', 'Walks with tail cocked up'],
        female: ['Less iridescent, shorter tail, brown tones'],
        juvenile: ['Brown, dark eye'],
      },
      plumageDescription: {
        male: 'Large and long-tailed. The head and neck gloss iridescent blue-purple; the body shows bronze or purple iridescence. The pale yellow eye is striking. Males cock the long, keel-shaped tail in a distinctive V-shape when walking.',
        female: 'Less iridescent, shorter tail, brownish tones. Still shows some purple gloss.',
        juvenile: 'Brown overall with a dark eye.',
      },
    },
    primaryHabitat: ['urban', 'suburban', 'farmland', 'woodland_edge', 'parks'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'loose_colonies', winter: 'massive_flocks' },
    typicalGroupSize: { min: 1, max: 10000 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Loud, harsh "chak." Squeaky, creaky song like a rusty gate.',
      songDescription: '"Readle-eak" — a loud, squeaky, grinding note that sounds mechanical.',
      loudness: 7, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'moderate', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'very_common' },
      summer: { presence: 'resident', commonness: 'very_common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'partial_migrant', commonness: 'uncommon' },
    },
    captureStats: { difficulty: 4, speed: 5, flightiness: 5, camouflage: 2, sizeScore: 5, movementPattern: 'walking', flightPattern: 'direct', behaviorNotes: 'Struts with tail cocked. Often in mixed blackbird flocks. Noisy and bold in suburban areas.' },
    rarity: 'common', rarityColor: '#4caf50', points: 100,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The Common Grackle is a brash, iridescent opportunist — as comfortable raiding a trash can as hunting crayfish in a stream. The purple-blue gloss on the head and bronze body shimmer dramatically in sunlight. Winter flocks mixed with blackbirds and starlings can number in the millions, creating spectacular aerial displays at roost sites.',
    funFact: 'Grackles sometimes practice "anting" — allowing ants to crawl through their feathers and spray formic acid, which may kill feather parasites.',
    eBirdCode: 'comgra', merlinId: 'Common_Grackle',
  },

  // ─────────────────────────────────────────────────────────────
  // BARN SWALLOW
  // ─────────────────────────────────────────────────────────────
  {
    id: 'barn_swallow',
    commonName: 'Barn Swallow',
    scientificName: 'Hirundo rustica',
    family: 'Hirundinidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [14, 20], wingspan_cm: [28, 33], weight_g: [14, 20],
    appearance: {
      billShape: 'thin', billSizeRelative: 'tiny',
      billColor: { male: 'black', female: 'black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A2A6A', female: '#1A2A6A' },
      uiColor: '#2244AA',
      distinctiveMarkings: {
        male: ['Deep blue-black above', 'Rufous-orange forehead and throat', 'Creamy-orange underparts', 'Deeply forked tail with long streamers'],
        female: ['Similar but shorter tail streamers, paler underparts'],
        juvenile: ['Short tail fork, buff tones'],
      },
      plumageDescription: {
        male: 'Steely blue-black above with a rufous-orange forehead and throat. The underparts are buffy-cream. The deeply forked tail with elongated outer streamers is the defining field mark.',
        female: 'Similar pattern but with shorter tail streamers and paler underparts.',
        juvenile: 'Short tail fork, buffy tones overall.',
      },
    },
    primaryHabitat: ['open_fields', 'farms', 'over_water', 'meadows'],
    feedingLayer: 'aerial', flightStyle: 'soaring',
    socialBehavior: { breeding: 'loosely_colonial', winter: 'large_flocks' },
    typicalGroupSize: { min: 1, max: 500 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Liquid "witt-witt" and a sharp "vitt."',
      songDescription: 'Long, cheerful twitter of liquid notes and rattles, often given in continuous flight.',
      loudness: 5, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'moderate', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'migrant_and_breeder', commonness: 'common' },
      summer: { presence: 'breeder', commonness: 'common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    captureStats: { difficulty: 8, speed: 9, flightiness: 7, camouflage: 2, sizeScore: 2, movementPattern: 'soaring', flightPattern: 'soaring', behaviorNotes: 'Extremely fast and acrobatic in flight. Rarely lands except at nest. Snatches insects from the air in swooping dives.' },
    rarity: 'common', rarityColor: '#4caf50', points: 140,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Barn Swallow is the world\'s most widespread swallow, breeding on every continent except Antarctica. Its deeply forked tail (longer streamers signal genetic fitness) and acrobatic insect-catching flight over fields and water make it one of summer\'s most cheerful presences. It has co-evolved with humans for thousands of years, nesting on man-made structures almost exclusively.',
    funFact: 'Female Barn Swallows prefer males with longer, more symmetrical tail streamers — the streamers are an honest signal of parasite resistance and genetic health.',
    eBirdCode: 'barswa', merlinId: 'Barn_Swallow',
  },

  // ─────────────────────────────────────────────────────────────
  // AMERICAN KESTREL
  // ─────────────────────────────────────────────────────────────
  {
    id: 'american_kestrel',
    commonName: 'American Kestrel',
    scientificName: 'Falco sparverius',
    family: 'Falconidae',
    order: 'Falconiformes',
    sizeCategory: 'small',
    length_cm: [22, 31], wingspan_cm: [51, 61], weight_g: [80, 165],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'small',
      billColor: { male: 'yellow/gray', female: 'yellow/gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#D4703A', female: '#8B5030' },
      uiColor: '#D4703A',
      distinctiveMarkings: {
        male: ['Rufous back and tail', 'Blue-gray wings', 'Bold black facial marks (two "sideburns")', 'Spotted cream underparts', 'Hovers in place while hunting'],
        female: ['Rufous-brown all over, heavily streaked', 'Same bold face pattern'],
        juvenile: ['Similar to adults by sex'],
      },
      plumageDescription: {
        male: 'North America\'s most colorful raptor: rufous back, blue-gray wings, cream underparts spotted with black, and a rufous tail with a black band. Two black "sideburn" marks on the face are diagnostic.',
        female: 'Rufous-brown and heavily streaked, less colorful than male but same bold face marks.',
        juvenile: 'Similar to respective adult sex.',
      },
    },
    primaryHabitat: ['open_fields', 'farmland', 'roadsides', 'meadows', 'suburban'],
    feedingLayer: 'aerial', flightStyle: 'hovering',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 2 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Rapid, excited "killy killy killy killy" — unmistakable.',
      songDescription: 'Same rapid killy call used in most contexts.',
      loudness: 7, callFrequency: 5,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'moderate', winter: 'moderate' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'uncommon' },
      summer: { presence: 'resident', commonness: 'uncommon' },
      fall:   { presence: 'resident', commonness: 'uncommon' },
      winter: { presence: 'resident', commonness: 'uncommon' },
    },
    captureStats: { difficulty: 7, speed: 7, flightiness: 7, camouflage: 2, sizeScore: 3, movementPattern: 'hovering', captureBackground: 'open_field', flightPattern: 'hovering', behaviorNotes: 'Perches on wires and fence posts, kiting into the wind or hovering to spot prey below. Pumps tail when perched.' },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 220,
    verificationThreshold: 0.80, verificationMethods: 1,
    description: 'North America\'s smallest and most colorful falcon, the American Kestrel is a tiny powerhouse — roughly the size of a robin yet a fierce predator of insects, mice, and small birds. It hovers into the wind on rapid wingbeats scanning the ground below. Kestrels can see ultraviolet light, which lets them track vole urine trails invisible to human eyes.',
    funFact: 'American Kestrels can see ultraviolet light, which lets them track the urine trails of voles (which fluoresce in UV) like a glowing road map leading directly to prey.',
    eBirdCode: 'amekes', merlinId: 'American_Kestrel',
  },

  // ─────────────────────────────────────────────────────────────
  // NEOTROPICAL MIGRANTS — WARBLERS
  // ─────────────────────────────────────────────────────────────

  {
    id: 'prothonotary_warbler',
    commonName: 'Prothonotary Warbler',
    scientificName: 'Protonotaria citrea',
    family: 'Parulidae',
    order: 'Passeriformes',
    sizeCategory: 'tiny',
    length_cm: [13, 14], wingspan_cm: [19, 23], weight_g: [12, 15],
    appearance: {
      billShape: 'thin', billSizeRelative: 'medium',
      billColor: { male: 'dark gray-black', female: 'dark gray-black' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#F5C518', female: '#D4A816' },
      uiColor: '#F5C518',
      secondaryColors: { male: ['#7890A8 (wings, tail, back)', '#1A1A1A (bill)'], female: ['#7890A8 (wings)'] },
      distinctiveMarkings: {
        male: ['Brilliant golden-yellow head, breast, and belly', 'Contrasting blue-gray wings and back', 'Bold dark eye on all-yellow face', 'White undertail coverts', 'Heavy for a warbler'],
        female: ['Slightly duller yellow than male', 'Same blue-gray wings', 'No mask or other marking'],
        juvenile: ['Resembles female'],
      },
      plumageDescription: {
        male: 'Unmistakable: the head, breast, and belly glow intense golden-yellow, contrasting sharply with the solid blue-gray of the wings, back, and tail. The face is plain — no mask, no streaks — just that brilliant unmarked gold, divided by a dark bill and dark eye. Among warblers this is exceptional size and color saturation.',
        female: 'Similar but with slightly less saturated yellow and more olive tones on the crown and nape. Still one of the most striking female warblers.',
      },
    },
    primaryHabitat: ['forested_swamps', 'bottomland_hardwoods', 'cypress_tupelo', 'flooded_forest'],
    feedingLayer: 'shrub', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 2 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp metallic "tseet".',
      songDescription: 'Ringing, emphatic "zweet-zweet-zweet-zweet-zweet" — a series of identical loud notes on one pitch, unlike most warblers. Carries far through the swamp.',
      loudness: 8, callFrequency: 5,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'rare' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 6, speed: 6, flightiness: 6, camouflage: 2, sizeScore: 2,
      movementPattern: 'flit',
      captureBackground: 'wetland',
      behaviorNotes: 'Forages low in swampy vegetation, flying between branches near water. Nest in tree cavities over standing water. Flits actively but pauses on exposed branches.',
    },
    rarity: 'rare', rarityColor: '#9c27b0', points: 250,
    verificationThreshold: 0.75, verificationMethods: 1,
    description: 'A jewel of the swamp. The Prothonotary Warbler is named for the gold-robed papal secretaries (protonotaries) of the Catholic Church — its plumage really is that intense. Uniquely among eastern warblers, it nests in tree cavities over standing water: old woodpecker holes in stumps and snags rising from flooded bottomlands. Its song echoes across cypress swamps like ringing gold.',
    funFact: 'The Prothonotary Warbler will readily use nest boxes — one of the easiest warblers to attract to a man-made cavity. Alger Hiss\'s lawyers famously challenged whether a Prothonotary Warbler sighting was credible testimony in his 1948 espionage trial.',
    eBirdCode: 'prowat', merlinId: 'Prothonotary_Warbler',
  },

  {
    id: 'american_redstart',
    commonName: 'American Redstart',
    scientificName: 'Setophaga ruticilla',
    family: 'Parulidae',
    order: 'Passeriformes',
    sizeCategory: 'tiny',
    length_cm: [11, 14], wingspan_cm: [16, 23], weight_g: [6, 9],
    appearance: {
      billShape: 'thin', billSizeRelative: 'small',
      billColor: { male: 'black', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A1A1A', female: '#7A8A7A' },
      uiColor: '#FF7800',
      secondaryColors: { male: ['#FF7800 (wing patches, tail base, breast sides)', '#FFFFFF (belly)'], female: ['#FFD000 (yellow in wing/tail where male has orange)'] },
      distinctiveMarkings: {
        male: ['Jet black overall', 'Vivid orange patches: base of tail, wing stripe, breast sides', 'White belly', 'Constantly fans tail to flash orange', 'Droops wings in display'],
        female: ['Gray-olive overall', 'Yellow patches in exact same positions as male\'s orange', 'Clean white belly', 'Same tail-fanning behavior'],
        juvenile: ['Males in first year resemble females (yellow patches) — acquire black gradually'],
      },
      plumageDescription: {
        male: 'The male is a study in contrast: jet black from crown to tail, interrupted by blazing orange-flame patches on the wing edges, the sides of the breast, and the base of the tail. The white belly gleams below. The tail is constantly being fanned and spread, flashing the orange like a signal mirror in the forest.',
        female: 'Soft gray-olive above and white below, with clean lemon-yellow patches exactly where the male has orange. The tail-fanning behavior is the same, and equally revealing.',
      },
    },
    primaryHabitat: ['mixed_forest', 'forest_edge', 'second_growth', 'riparian_woods'],
    feedingLayer: 'shrub', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp "chip" — similar to many warblers.',
      songDescription: 'Variable; often "zee zee zee zee zwee" with the last note dropping or rising. Some males have multiple song types. High, thin, warbler-quality notes.',
      loudness: 6, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 7, speed: 8, flightiness: 7, camouflage: 1, sizeScore: 1,
      movementPattern: 'fanning',
      captureBackground: 'forest_canopy',
      behaviorNotes: 'Highly active; never sits still long. Constantly fans tail, droops wings, and makes rapid sallies to catch flying insects. Moves through mid-level vegetation with quick hops and sudden darts.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 170,
    verificationThreshold: 0.75, verificationMethods: 1,
    description: 'The American Redstart is a bird of perpetual motion — it rarely sits still for more than a second before fanning its tail, drooping its wings, or darting after an insect. This behavior isn\'t restless energy; it\'s a strategy. Fanning the tail flushes insects hidden in foliage that the redstart then snatches mid-air. The bird is running a trap.',
    funFact: 'In Central America, redstarts are called "candelita" — the little candle — for the way the orange tail patches flicker like a flame in the forest understory.',
    eBirdCode: 'amered', merlinId: 'American_Redstart',
  },

  {
    id: 'common_yellowthroat',
    commonName: 'Common Yellowthroat',
    scientificName: 'Geothlypis trichas',
    family: 'Parulidae',
    order: 'Passeriformes',
    sizeCategory: 'tiny',
    length_cm: [11, 13], wingspan_cm: [15, 19], weight_g: [9, 11],
    appearance: {
      billShape: 'thin', billSizeRelative: 'medium',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#7A9040', female: '#8A9050' },
      uiColor: '#F5E000',
      secondaryColors: { male: ['#1A1A1A (mask)', '#F5E000 (throat, breast)', '#FFFFFF (band above mask)'], female: ['#F5D800 (throat, less extensive)'] },
      distinctiveMarkings: {
        male: ['Bold black mask spanning forehead, eye, and cheek to neck', 'White-gray band above mask', 'Brilliant yellow throat and breast', 'Olive-yellow belly and undertail', 'Olive-green back and wings'],
        female: ['Plain olive above', 'Yellow throat (less bright than male)', 'Buffy flanks, no mask'],
        juvenile: ['Resembles female; duller'],
      },
      plumageDescription: {
        male: 'The male wears his identity in bold: a broad, velvety black mask sweeps from the forehead across the eye and cheeks, bordered above by a pale gray band. Below the mask, the throat blazes deep yellow and the breast glows butter-yellow. Olive-green above. Unmistakable, but a skulking bird that often makes you work to see it.',
        female: 'Olive above, yellow-washed below on the throat and breast, without the mask. Buffy flanks. Understated but identifiable.',
      },
    },
    primaryHabitat: ['wetland_edge', 'marsh', 'dense_shrubs', 'cattail', 'overgrown_fields'],
    feedingLayer: 'shrub', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Distinctive "tchet" — dry and emphatic.',
      songDescription: '"witchety-witchety-witchety" — three to five rapid repetitions. One of the most recognizable warbler songs, carrying well over marsh and brushy habitat.',
      loudness: 7, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'occasional', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'common' },
      summer: { presence: 'summer', commonness: 'common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'north_america',
    captureStats: {
      difficulty: 6, speed: 5, flightiness: 8, camouflage: 5, sizeScore: 2,
      movementPattern: 'skulking',
      captureBackground: 'marsh_edge',
      behaviorNotes: 'A master skulker in dense vegetation — the bird is often heard but rarely seen well. Males pop briefly to exposed stems to sing then dive back into cover. Patience required.',
    },
    rarity: 'common', rarityColor: '#4caf50', points: 130,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'One of the most widespread warblers in North America, the Common Yellowthroat inhabits any patch of rank vegetation with water nearby — cattail marshes, wet meadows, overgrown fields, roadside ditches. The "witchety-witchety" song is everywhere in spring. The bird itself is harder to pin down: it skulks through tangles and rarely perches in the open for long.',
    funFact: 'The Common Yellowthroat is one of the most polygynous warblers — males routinely maintain two breeding females simultaneously, sometimes three, each tending their own nest in adjacent territories.',
    eBirdCode: 'comyel', merlinId: 'Common_Yellowthroat',
  },

  {
    id: 'black_and_white_warbler',
    commonName: 'Black-and-white Warbler',
    scientificName: 'Mniotilta varia',
    family: 'Parulidae',
    order: 'Passeriformes',
    sizeCategory: 'tiny',
    length_cm: [11, 13], wingspan_cm: [18, 22], weight_g: [8, 11],
    appearance: {
      billShape: 'thin', billSizeRelative: 'small',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#F0F0F0', female: '#F0F0F0' },
      uiColor: '#A0A0A0',
      secondaryColors: { male: ['#1A1A1A (bold black stripes throughout)', '#FFFFFF (median crown stripe, supercilium)'], female: ['Same but black replaced by dark brown; throat white not black'] },
      distinctiveMarkings: {
        male: ['Crisp black-and-white stripes from crown to undertail', 'Bold white median crown stripe', 'White supercilium', 'Black throat and cheek', 'Streaked breast and flanks', 'Long hind claw — adapted to bark-climbing'],
        female: ['Pattern identical but black softened to brown-gray', 'White (not black) throat'],
        juvenile: ['Resembles female'],
      },
      plumageDescription: {
        male: 'A living barcode: crisp black-and-white stripes run from the crown all the way to the undertail coverts. The median crown stripe gleams white; the face shows a bold white supercilium above a black cheek and throat. Moves along bark with its strong legs and elongated hind claw — the only warbler that forages like a nuthatch.',
        female: 'Identical pattern, but the black areas are replaced by warm brown-gray, and the throat is white rather than black.',
      },
    },
    primaryHabitat: ['deciduous_forest', 'mixed_forest', 'forest_interior'],
    feedingLayer: 'canopy', flightStyle: 'bounding',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp, squeaky "tsit".',
      songDescription: '"Weesy-weesy-weesy-weesy" — a thin, wiry, high-pitched series, like a squeaky wheel. Repeating pairs of notes.',
      loudness: 5, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 5, speed: 4, flightiness: 5, camouflage: 3, sizeScore: 2,
      movementPattern: 'creeping',
      captureBackground: 'forest_trunk',
      behaviorNotes: 'Creeps along tree trunks and large branches, working up, sideways, and even downward in search of hidden insects in bark crevices. One of the first warblers to arrive in spring and last to depart in fall.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 155,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Black-and-white Warbler is a taxonomic outlier among warblers: it forages almost exclusively on tree bark rather than in foliage, working along trunks and major limbs like a nuthatch or creeper. Its long hind claw is an adaptation to bark-clinging. The crisp black-and-white pattern is unmistakable, and it arrives early — often in late March when few other warblers have returned.',
    funFact: 'The Black-and-white Warbler is the oldest known wild warbler ever recorded: a banded individual in Wisconsin was recaptured 11 years later, remarkable longevity for a tiny long-distance migrant.',
    eBirdCode: 'bawwar', merlinId: 'Black-and-white_Warbler',
  },

  {
    id: 'yellow_rumped_warbler',
    commonName: 'Yellow-rumped Warbler',
    scientificName: 'Setophaga coronata',
    family: 'Parulidae',
    order: 'Passeriformes',
    sizeCategory: 'tiny',
    length_cm: [12, 14], wingspan_cm: [19, 24], weight_g: [11, 14],
    appearance: {
      billShape: 'thin', billSizeRelative: 'small',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#6A7A8A', female: '#8A7A6A' },
      uiColor: '#F5D000',
      secondaryColors: { male: ['#F5D000 (crown patch, rump, sides)', '#FFFFFF (throat, wing bars)', '#1A1A1A (breast patch, mask)'], female: ['Duller, browner version of male'] },
      distinctiveMarkings: {
        male: ['Four yellow patches: crown, rump, and both sides of breast', 'Yellow rump flashes white in flight — the "butter butt"', 'White throat (Myrtle form)', 'Black breast band and mask', 'Two white wing bars', 'Gray back with dark streaks'],
        female: ['Browner than male; same yellow patches but duller', 'Less distinct breast band'],
        juvenile: ['Very brown and streaky; yellow rump still visible'],
      },
      plumageDescription: {
        male: 'Gray and boldly patterned: the white throat is flanked by a black breast patch, and four yellow patches — crown, rump, and both shoulder-sides — mark the bird at every angle. The yellow rump is visible whenever the bird moves or flies, earning the species its informal name "butter butt."',
        female: 'Brown where the male is gray, and the yellow patches are duller, but the same shape and position. The yellow rump remains the clinching field mark.',
      },
    },
    primaryHabitat: ['forest_edge', 'open_woodland', 'shrubby_fields', 'coastal_thickets', 'parks'],
    feedingLayer: 'multi', flightStyle: 'bounding',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'loose_flocks' },
    typicalGroupSize: { min: 1, max: 50 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Loud, sharp "check" — the most distinctive warbler call, easy to learn.',
      songDescription: 'Slow, rising or falling trill: "seee-seee-seee-seee" with a quality change at the end. Variable.',
      loudness: 6, callFrequency: 9,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'moderate', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'migrant', commonness: 'abundant' },
      summer: { presence: 'absent_most_areas', commonness: 'rare' },
      fall:   { presence: 'migrant', commonness: 'abundant' },
      winter: { presence: 'winter', commonness: 'common' },
    },
    range: 'north_america',
    captureStats: {
      difficulty: 4, speed: 6, flightiness: 5, camouflage: 3, sizeScore: 2,
      movementPattern: 'flit',
      captureBackground: 'forest_edge',
      behaviorNotes: 'Highly adaptable forager: flycatches, gleans foliage, picks berries from bayberry and wax myrtle. Often in loose flocks during migration. Can winter farther north than most warblers by eating waxy berries.',
    },
    rarity: 'common', rarityColor: '#4caf50', points: 120,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The Yellow-rumped Warbler is the warbler everyone encounters: the most abundant warbler in North America, a persistent migrant through backyards and parks in fall, and the one most likely to overwinter. It has a unique adaptation — the ability to digest the wax in bayberries and wax myrtle — that lets it survive in coastal areas long after other warblers have fled south.',
    funFacts: [
      'The Yellow-rumped Warbler can digest wax from bayberries — a feat no other warbler can manage — letting it winter 1,500 miles north of other species.',
      '"Butter butt" is the official-unofficial nickname, used even in scientific contexts. The yellow rump flashing as the bird flies away is the most reliable field mark.',
    ],
    eBirdCode: 'yerwar', merlinId: 'Yellow-rumped_Warbler',
  },

  // ─────────────────────────────────────────────────────────────
  // NEOTROPICAL MIGRANTS — VIREOS
  // ─────────────────────────────────────────────────────────────

  {
    id: 'red_eyed_vireo',
    commonName: 'Red-eyed Vireo',
    scientificName: 'Vireo olivaceus',
    family: 'Vireonidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [13, 14], wingspan_cm: [22, 25], weight_g: [12, 26],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'medium',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#6B8C3A', female: '#6B8C3A' },
      uiColor: '#6B8C3A',
      secondaryColors: { male: ['#7090A8 (gray cap)', '#F0F0F0 (white below)', '#1A1A1A (black eye-line)', '#8B2020 (red iris — hard to see)'] },
      distinctiveMarkings: {
        male: ['Olive-green above, white below', 'Blue-gray cap', 'Bold white supercilium', 'Black border above and below the supercilium', 'Red iris (best seen up close)', 'Hook-tipped bill', 'No wing bars'],
        female: ['Identical to male'],
        juvenile: ['Brown iris through first year'],
      },
      plumageDescription: {
        male: 'A clean, elegantly marked vireo: olive-green above and white below, with a contrasting blue-gray cap. The white eyebrow stripe is bordered by black above and below, giving it a spectacled expression. The namesake red eye requires a close look — often overlooked. Hook-tipped bill marks it as a vireo. No wing bars.',
        female: 'Identical to male in all plumage aspects.',
      },
    },
    primaryHabitat: ['deciduous_forest', 'forest_canopy', 'woodland_edge', 'parks'],
    feedingLayer: 'canopy', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Nasal, whining "veeah" — distinctive and useful for finding the bird.',
      songDescription: 'Endless series of short, burry phrases separated by brief pauses: "cheer-o-wit, cheree, sissy-a-wit, tee-oo..." — singing for hours without stopping, even at midday in summer when other birds are quiet. Has been recorded singing 22,197 times in a single day.',
      loudness: 6, callFrequency: 10,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'common' },
      summer: { presence: 'summer', commonness: 'common' },
      fall:   { presence: 'migrant', commonness: 'common' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 4, speed: 3, flightiness: 4, camouflage: 5, sizeScore: 4,
      movementPattern: 'vireo',
      captureBackground: 'forest_canopy',
      behaviorNotes: 'Slow, deliberate forager in the upper canopy. Hops methodically through leaves, pausing to inspect each leaf carefully before moving on. Stays well up in the canopy and blends remarkably well with the foliage despite being common.',
    },
    rarity: 'common', rarityColor: '#4caf50', points: 115,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The most abundant songbird in the eastern forests during summer. The Red-eyed Vireo sings tirelessly from the canopy — a string of burry two-note phrases, over and over, all day long, even at midday in August when every other bird has gone silent. One individual was recorded singing 22,197 times in a single day. Despite this constant singing, the bird is maddeningly hard to spot, hidden in the dense canopy foliage.',
    funFacts: [
      'A single Red-eyed Vireo male was recorded singing 22,197 times in one day — by far the highest count for any North American bird.',
      'Red-eyed Vireos make the longest overwater migration of any vireo, crossing the Gulf of Mexico in a single overnight flight to reach South America.',
    ],
    eBirdCode: 'reevir', merlinId: 'Red-eyed_Vireo',
  },

  {
    id: 'blue_headed_vireo',
    commonName: 'Blue-headed Vireo',
    scientificName: 'Vireo solitarius',
    family: 'Vireonidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [13, 15], wingspan_cm: [20, 24], weight_g: [13, 19],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'medium',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#6080A0', female: '#6080A0' },
      uiColor: '#6080A0',
      secondaryColors: { male: ['#6B8C3A (olive-green back)', '#F0F0F0 (white below, spectacles)', '#F5E850 (yellow-green sides)', '#FFFFFF (two bold wing bars)'] },
      distinctiveMarkings: {
        male: ['Bright blue-gray head and nape — the "blue" is real', 'Bold white spectacles (connected eye ring + supercilium)', 'Olive-green back', 'White below with yellow-green wash on sides', 'Two bold white wing bars', 'Hook-tipped bill'],
        female: ['Identical to male'],
        juvenile: ['Same as adults'],
      },
      plumageDescription: {
        male: 'The Blue-headed Vireo is the handsomest of the eastern vireos: a genuine blue-gray head (not just grayish) with bold white spectacles that look painted on — the eye ring and supercilium connect into one clean white loop. Olive-green back, white below with a citrine wash on the sides, and two crisp white wing bars. An alert, deliberate bird.',
        female: 'Identical to male in all plumage aspects.',
      },
    },
    primaryHabitat: ['mixed_forest', 'hemlock_forest', 'deciduous_forest', 'forest_edge'],
    feedingLayer: 'canopy', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Nasal "veeeah" — typical vireo call.',
      songDescription: 'Slower and richer than Red-eyed Vireo: deliberate, musical phrases separated by longer pauses. "Cheeio... cheewit... cheerio..." An early spring singer.',
      loudness: 6, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 5, speed: 3, flightiness: 4, camouflage: 4, sizeScore: 4,
      movementPattern: 'vireo',
      captureBackground: 'forest_canopy',
      behaviorNotes: 'One of the earliest vireos to return in spring. Forages deliberately through foliage, often in mixed-species flocks during migration. The blue head and bold spectacles make it identifiable when you get a clear look.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 155,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The most visually striking eastern vireo, with a genuine blue-gray head that earns its name. The bold white spectacles — connected eye ring and supercilium — make it look perpetually alert. It\'s an early spring migrant, often appearing in late April before the leaves have fully opened, and it favors hemlock and mixed forest. Its song is slower and more musical than the Red-eyed Vireo\'s.',
    funFact: 'The Blue-headed Vireo was once lumped with two western species (Cassin\'s Vireo and Plumbeous Vireo) as a single species called "Solitary Vireo." Careful analysis of song and genetics separated them again in 1997.',
    eBirdCode: 'blhvir', merlinId: 'Blue-headed_Vireo',
  },

  {
    id: 'yellow_throated_vireo',
    commonName: 'Yellow-throated Vireo',
    scientificName: 'Vireo flavifrons',
    family: 'Vireonidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [13, 15], wingspan_cm: [20, 25], weight_g: [14, 22],
    appearance: {
      billShape: 'hooked', billSizeRelative: 'large',
      billColor: { male: 'dark gray, heavy', female: 'dark gray, heavy' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#F5D020', female: '#F5D020' },
      uiColor: '#F5D020',
      secondaryColors: { male: ['#6B8C3A (olive-green head/back)', '#F5D020 (yellow spectacles — vivid)', '#FFFFFF (belly)', '#FFFFFF (two bold wing bars)'] },
      distinctiveMarkings: {
        male: ['Brilliant yellow throat and breast', 'Vivid yellow spectacles (eye ring + supercilium) on olive-green head', 'Olive-green head and back (brighter olive than other vireos)', 'White belly', 'Two bold white wing bars', 'Heavy hook-tipped bill'],
        female: ['Identical to male'],
        juvenile: ['Same as adults'],
      },
      plumageDescription: {
        male: 'The Yellow-throated Vireo is the most brilliantly colored vireo in eastern North America. The throat and breast glow deep cadmium yellow, and the spectacles — the connected eye ring and supercilium — are the same yellow, bold against the olive-green head. The white belly and two crisp wing bars complete a pattern that makes this the most recognizable vireo despite its canopy habits.',
        female: 'Identical to male in all plumage aspects.',
      },
    },
    primaryHabitat: ['open_deciduous_forest', 'forest_edge', 'riparian_woodland', 'shade_trees'],
    feedingLayer: 'canopy', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Raspy "chatter" call.',
      songDescription: 'Slow, burry phrases like Red-eyed Vireo but lower-pitched and with a distinctly hoarse, buzzy quality: "three-eight... look-at-me..." Sounds like it needs to clear its throat.',
      loudness: 6, callFrequency: 6,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'rare' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 6, speed: 3, flightiness: 4, camouflage: 3, sizeScore: 4,
      movementPattern: 'vireo',
      captureBackground: 'forest_canopy',
      behaviorNotes: 'Forages high in the canopy of open deciduous forest — often found in larger trees than other vireos. Slow and deliberate. The yellow spectacles and throat are brilliantly visible when the bird comes to a sunlit branch.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 165,
    verificationThreshold: 0.72, verificationMethods: 1,
    description: 'The Yellow-throated Vireo is the showiest vireo: the brilliant yellow throat, yellow spectacles, and bold white wing bars make it stand out even in dense canopy. It favors larger, more open deciduous forest than other vireos and is somewhat less common — a quality sighting on any spring morning. Its song has a distinctive low, burry quality that is slower and more forceful than other vireos.',
    funFact: 'Yellow-throated Vireos build one of the most architecturally elaborate nests of any North American bird — a deep cup woven with bark strips, plant fibers, and spider silk, decorated on the outside with lichens, hung from a branch fork.',
    eBirdCode: 'yetvir', merlinId: 'Yellow-throated_Vireo',
  },

  // ─────────────────────────────────────────────────────────────
  // NEOTROPICAL MIGRANTS — OTHERS
  // ─────────────────────────────────────────────────────────────

  {
    id: 'scarlet_tanager',
    commonName: 'Scarlet Tanager',
    scientificName: 'Piranga olivacea',
    family: 'Cardinalidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [16, 19], wingspan_cm: [25, 30], weight_g: [23, 38],
    appearance: {
      billShape: 'conical', billSizeRelative: 'medium',
      billColor: { male: 'pale gray', female: 'pale gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#DC2020', female: '#8AAA30' },
      uiColor: '#DC2020',
      secondaryColors: { male: ['#1A1A1A (wings and tail — jet black)', '#F0F0F0 (white belly)'], female: ['#1A1A1A (dark wings)', '#F5E840 (yellow-green)'] },
      distinctiveMarkings: {
        male: ['Brilliant scarlet-red body with jet-black wings and tail', 'The contrast is total and unmistakable', 'Pale heavy bill', 'White wing linings visible in flight', 'Molts to female-like plumage in fall — green-yellow with dark wings'],
        female: ['Olive-yellow above, yellow-green below', 'Darker olive wings (not black)', 'Best told from female Summer Tanager by wing color'],
        juvenile: ['Resembles female'],
      },
      plumageDescription: {
        male: 'The male Scarlet Tanager in breeding plumage is perhaps the most striking bird likely to appear in an eastern forest: the body is a brilliant, saturated scarlet-red — not orange, not pink, but fire-engine red — contrasted completely against jet-black wings and tail. Seeing one in dappled forest light is startling. In fall he molts to yellowish-green with black wings — still distinctive.',
        female: 'Olive-yellow and understated, with darker olive wings that help distinguish her from other tanagers.',
      },
    },
    primaryHabitat: ['deciduous_forest', 'forest_interior', 'oak_forest', 'large_woodlots'],
    feedingLayer: 'canopy', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'loose_flocks' },
    typicalGroupSize: { min: 1, max: 2 }, activeHours: 'diurnal',
    sound: {
      callDescription: '"Chip-burr" — distinctive two-note call, easy to learn.',
      songDescription: 'Robin-like phrases but hoarser, with a burry quality: "querit, queer, queerit, queer..." — like a robin with a sore throat. Sings from high in the canopy.',
      loudness: 7, callFrequency: 5,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 6, speed: 3, flightiness: 5, camouflage: 2, sizeScore: 5,
      movementPattern: 'perching',
      captureBackground: 'forest_canopy',
      behaviorNotes: 'Sits motionless in the high canopy for long periods, scanning for insects. Despite the brilliant plumage, can be hard to spot among dense leaves at height. The "chip-burr" call usually reveals it before you see it.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 220,
    verificationThreshold: 0.75, verificationMethods: 1,
    description: 'The Scarlet Tanager is a creature of superlatives: the reddest bird in the eastern forest, a traveler that winters in the Andes, and a reminder that something truly tropical passes through suburban parks every May. Despite the blazing color, it can be frustratingly hard to see in the high canopy. The "chip-burr" call — given repeatedly — is often the only clue to its presence overhead.',
    funFacts: [
      'The Scarlet Tanager winters in the foothill forests of the Andes in Colombia, Ecuador, and Peru — a round-trip journey of over 6,000 miles.',
      'In fall, the male molts into a female-like green-yellow plumage — but retains the black wings, making him look like a giant Yellow-rumped Warbler.',
    ],
    eBirdCode: 'scatan', merlinId: 'Scarlet_Tanager',
  },

  {
    id: 'baltimore_oriole',
    commonName: 'Baltimore Oriole',
    scientificName: 'Icterus galbula',
    family: 'Icteridae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [17, 22], wingspan_cm: [23, 30], weight_g: [22, 42],
    appearance: {
      billShape: 'thin', billSizeRelative: 'medium',
      billColor: { male: 'silver-gray', female: 'pale gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#FF8000', female: '#C87020' },
      uiColor: '#FF8000',
      secondaryColors: { male: ['#1A1A1A (head, back, wings, central tail)', '#FF8000 (breast, belly, rump, outer tail)', '#FFFFFF (wing bar)'], female: ['Yellow-orange below', 'Grayish-brown above with wing bars'] },
      distinctiveMarkings: {
        male: ['Brilliant orange breast, belly, and rump', 'Jet black head, back, and wings', 'Black central tail with orange outer feathers', 'Single bold white wing bar', 'Silver-gray pointed bill'],
        female: ['Yellow-orange below (duller than male)', 'Olive-brownish above', 'Two white wing bars', 'No black hood'],
        juvenile: ['Resembles female; males acquire black in second year'],
      },
      plumageDescription: {
        male: 'Baltimore Oriole males are all contrast: jet black above and blazing orange below. The black hood covers the entire head, throat, and back; the breast, belly, rump, and outer tail feathers are brilliant flame-orange. A single white wing bar cuts across the dark wing. The silver-gray pointed bill gives the face a clean, sleek look.',
        female: 'Yellow-orange below with olive-brownish upperparts and two white wing bars. Handsome but understated compared to the male.',
      },
    },
    primaryHabitat: ['tall_deciduous_trees', 'riparian_woodland', 'forest_edge', 'parks', 'suburbs'],
    feedingLayer: 'canopy', flightStyle: 'direct',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'loose_flocks' },
    typicalGroupSize: { min: 1, max: 4 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Chattering rattle; also a distinctive clear whistle.',
      songDescription: 'Rich, flute-like whistled phrases: clear, melodious, and carrying. Each male has a repertoire of several phrases. The female also sings.',
      loudness: 8, callFrequency: 6,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 6, speed: 5, flightiness: 6, camouflage: 1, sizeScore: 5,
      movementPattern: 'oriole',
      captureBackground: 'tall_trees',
      behaviorNotes: 'Forages in the upper canopy, hanging from branch tips to reach nectar, insects, and fruit. Pendulum-like movements along branches. Conspicuous in tall elms, cottonwoods, and sycamores along watercourses.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 195,
    verificationThreshold: 0.72, verificationMethods: 1,
    description: 'The Baltimore Oriole is spring in a bird: the moment one appears in a tall elm or cottonwood, orange against the fresh green leaves, the season has truly arrived. The female weaves one of the most intricate nests in North America — a hanging pouch of plant fibers and plant down suspended from a drooping branch tip, swinging in the wind. The male sings from a prominent branch, a rich whistled phrase that carries far.',
    funFacts: [
      'Female Baltimore Orioles weave their hanging basket nests entirely without using their feet — all with the bill alone, threading each fiber back and forth.',
      'Baltimore Orioles have a trick for getting nectar from tubular flowers: they cut straight through the base of the flower with their sharp bill, bypassing the bloom entirely.',
    ],
    eBirdCode: 'balori', merlinId: 'Baltimore_Oriole',
  },

  {
    id: 'rose_breasted_grosbeak',
    commonName: 'Rose-breasted Grosbeak',
    scientificName: 'Pheucticus ludovicianus',
    family: 'Cardinalidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [18, 21], wingspan_cm: [29, 33], weight_g: [35, 65],
    appearance: {
      billShape: 'conical', billSizeRelative: 'massive',
      billColor: { male: 'pale ivory-gray', female: 'pale gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A1A1A', female: '#7A6040' },
      uiColor: '#DC3060',
      secondaryColors: { male: ['#DC3060 (rose-red inverted triangle on breast)', '#FFFFFF (belly, wing patches)', '#1A1A1A (head, back, wings, tail)'], female: ['#F5F5C8 (buffy white below with streaks)', '#FFFFFF (supercilium, crown stripe)'] },
      distinctiveMarkings: {
        male: ['Black head, back, wings, and tail', 'Brilliant rose-red inverted triangular patch on the breast', 'White belly and undertail', 'Large white wing patches visible in flight', 'Massive pale ivory bill — unmistakably large'],
        female: ['Brown and heavily streaked', 'Broad white supercilium', 'White median crown stripe', 'Yellow wing linings (visible in flight)', 'Massive bill — same size as male'],
        juvenile: ['Males begin showing rose breast patches in first fall'],
      },
      plumageDescription: {
        male: 'One of the most striking birds at an eastern bird feeder or in a forest edge: the male is jet black from crown to tail except for a blazing rose-red triangle on the center of the breast, white belly, and large white wing patches. The massive pale ivory bill is almost comically large — built for cracking the toughest seeds and buds.',
        female: 'Brown and heavily streaked, with a bold white supercilium and crown stripe. The massive bill and yellow wing linings (visible when she stretches a wing) are the telltale signs.',
      },
    },
    primaryHabitat: ['forest_edge', 'second_growth', 'woodland', 'parks', 'suburban'],
    feedingLayer: 'multi', flightStyle: 'bounding',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'loose_flocks' },
    typicalGroupSize: { min: 1, max: 4 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp "peek" — distinctive, like a sneaker squeaking on a floor.',
      songDescription: 'Rich, robin-like caroling but faster and more melodic — with a sweeter, more liquid quality. Both sexes sing. Males sing from a conspicuous perch.',
      loudness: 7, callFrequency: 6,
      singingSeason: { spring: 'frequent', summer: 'moderate', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 4, speed: 3, flightiness: 4, camouflage: 2, sizeScore: 5,
      movementPattern: 'perching',
      captureBackground: 'forest_edge',
      behaviorNotes: 'Often conspicuous: the male perches openly in forest edge trees to sing. Visits feeders readily during migration. Chunky, robin-sized build with the telltale massive bill.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 185,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Rose-breasted Grosbeak is a showstopper at any bird feeder: the male\'s jet-black plumage and blazing rose-red breast patch are unmistakable, and the ivory bill is proportionately enormous — designed to crack seeds too hard for most birds. Both sexes sing, and the male even sings softly while incubating eggs on the nest. A forest-edge bird that readily visits sunflower feeders during spring migration.',
    funFacts: [
      'Male Rose-breasted Grosbeaks incubate eggs and brood young just as much as females do — and they sing quietly while on the nest.',
      'The call note — a sharp "peek" — is so distinctive that experienced birders can identify migrating grosbeaks flying overhead at night by this sound alone.',
    ],
    eBirdCode: 'robgro', merlinId: 'Rose-breasted_Grosbeak',
  },

  {
    id: 'indigo_bunting',
    commonName: 'Indigo Bunting',
    scientificName: 'Passerina cyanea',
    family: 'Cardinalidae',
    order: 'Passeriformes',
    sizeCategory: 'tiny',
    length_cm: [11, 13], wingspan_cm: [18, 23], weight_g: [11, 21],
    appearance: {
      billShape: 'conical', billSizeRelative: 'small',
      billColor: { male: 'silver-gray', female: 'pale gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#3060D0', female: '#9A7A50' },
      uiColor: '#3060D0',
      secondaryColors: { male: ['#3060D0 to #4080F0 (brilliant cobalt blue, uniform)', '#1A2050 (wing and tail slightly darker)'], female: ['#C8A870 (brown, streaky underparts)', '#9A7A50 (plain brown above)'] },
      distinctiveMarkings: {
        male: ['All-over brilliant cobalt blue — no other marking', 'In certain light appears black (iridescence)', 'Small conical bill', 'Compact sparrow-like body', 'No wing bars'],
        female: ['Plain buffy-brown overall', 'Faint streaks on breast', 'No wing bars', 'Easily overlooked'],
        juvenile: ['First-year males are blotchy brown and blue'],
      },
      plumageDescription: {
        male: 'A male Indigo Bunting in full breeding plumage is extraordinary: the entire bird — head, back, wings, tail, breast, belly — is brilliant cobalt blue without any other marking. The intensity varies dramatically with the angle of light; in shadow the bird can look almost black, but in direct sunlight it glows electric cobalt. There is nothing quite like it in the eastern avifauna.',
        female: 'Plain, streaky brown — one of the plainest-looking birds in North America, and almost impossible to recognize as related to the brilliant male.',
      },
    },
    primaryHabitat: ['shrubby_fields', 'forest_edge', 'roadsides', 'brushy_woodland_edge', 'weedy_fields'],
    feedingLayer: 'shrub', flightStyle: 'bounding',
    socialBehavior: { breeding: 'monogamous_pairs', winter: 'large_flocks' },
    typicalGroupSize: { min: 1, max: 100 }, activeHours: 'diurnal',
    sound: {
      callDescription: 'Sharp "spit" call.',
      songDescription: '"fire-fire, where-where, here-here, see-it-see-it" — sweet, high-pitched phrases in pairs, each pair on a slightly different pitch. Sings all day throughout summer, even at midday heat.',
      loudness: 6, callFrequency: 8,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 5, speed: 4, flightiness: 6, camouflage: 1, sizeScore: 2,
      movementPattern: 'perching',
      captureBackground: 'shrubby_field',
      behaviorNotes: 'Males sing tirelessly from exposed perches — weed tops, wire fences, power lines — making them easy to locate. But they flush readily when approached. Navigates by the stars during night migration.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 180,
    verificationThreshold: 0.72, verificationMethods: 1,
    description: 'Indigo Buntings are birds of edges — they thrive in that narrow zone where forest meets field, singing from exposed weed stalks and fence wires throughout the summer. The male\'s all-blue plumage has no structural blue pigment (rare in birds); the color is created entirely by microscopic feather structures that scatter light. Move your position, and the bird goes from electric cobalt to dark slate.',
    funFacts: [
      'Indigo Buntings navigate by the stars — specifically, they memorize the fixed point of the night sky around Polaris and orient their migration accordingly.',
      'The blue of an Indigo Bunting is not a pigment — there is no blue pigment in the feathers. The color comes from microscopic feather structures that refract light, the same principle as a soap bubble.',
    ],
    eBirdCode: 'indbun', merlinId: 'Indigo_Bunting',
  },

  {
    id: 'wood_thrush',
    commonName: 'Wood Thrush',
    scientificName: 'Hylocichla mustelina',
    family: 'Turdidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [18, 22], wingspan_cm: [30, 35], weight_g: [48, 72],
    appearance: {
      billShape: 'thin', billSizeRelative: 'medium',
      billColor: { male: 'pinkish-yellow base, dark tip', female: 'same' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#AA4020', female: '#AA4020' },
      uiColor: '#AA4020',
      secondaryColors: { male: ['#8A6030 (olive-brown back)', '#F5F5F5 (white breast)', '#1A1A1A (bold round spots on breast and flanks)', '#FFFFFF (eye ring)'] },
      distinctiveMarkings: {
        male: ['Rufous-brown head and nape — distinctly more rufous than back', 'Olive-brown back', 'White breast and flanks with bold round (not streaked) black spots', 'White eye ring', 'Thrush proportions: round body, strong legs'],
        female: ['Identical to male'],
        juvenile: ['Spotted back typical of thrush fledglings'],
      },
      plumageDescription: {
        male: 'The Wood Thrush is robustly built for a forest-floor bird: the head and nape are rich rufous-brown — deeper and redder than the olive-brown back — giving it a two-toned upper surface. The breast and flanks are clean white, heavily spotted with large, bold, round black spots that extend far down the flanks. The white eye ring gives the bird a clear-eyed, attentive expression. Classic thrush proportions — pot-bellied, upright, alert.',
        female: 'Identical to male in all aspects.',
      },
    },
    primaryHabitat: ['deciduous_forest', 'forest_interior', 'moist_woodland', 'ravines'],
    feedingLayer: 'ground', flightStyle: 'direct',
    socialBehavior: { breeding: 'territorial_pairs', winter: 'solitary' },
    typicalGroupSize: { min: 1, max: 1 }, activeHours: 'diurnal',
    sound: {
      callDescription: '"Pit-pit-pit" — rapid staccato alarm.',
      songDescription: 'The ethereal "ee-oh-lay" fluted phrases — some of the most beautiful singing of any North American bird. The bird sings two notes simultaneously using different parts of its syrinx, creating an internal harmony. Rich, organ-like quality in dim forest light.',
      loudness: 8, callFrequency: 6,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'rare', winter: 'absent' },
    },
    seasons: {
      spring: { presence: 'summer', commonness: 'uncommon' },
      summer: { presence: 'summer', commonness: 'uncommon' },
      fall:   { presence: 'migrant', commonness: 'uncommon' },
      winter: { presence: 'absent', commonness: 'absent' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 5, speed: 4, flightiness: 6, camouflage: 3, sizeScore: 6,
      movementPattern: 'hopping',
      captureBackground: 'forest_floor',
      behaviorNotes: 'Forages on the forest floor by hopping and tossing leaf litter, stopping to stand erect and watch. Less nervous than many thrushes but flushes readily if approached directly. Often seen in dappled light on shaded slopes.',
    },
    rarity: 'uncommon', rarityColor: '#2196f3', points: 195,
    verificationThreshold: 0.70, verificationMethods: 1,
    description: 'The Wood Thrush sings with two voices simultaneously. Its syrinx — the bird\'s vocal organ — is divided, and the Wood Thrush has mastered using both halves independently, creating internal harmonies with a single throat. Henry David Thoreau called it "the finest singer of the woods" and "the only bird with a hymn." Its population has declined steeply as forest fragments become too small to support breeding pairs.',
    funFacts: [
      'The Wood Thrush sings two notes at once using the two sides of its syrinx independently — producing internal harmonies from a single bird.',
      'Wood Thrush populations have declined by 60% since the 1960s. The cause: forest fragmentation creates edge habitat where Brown-headed Cowbirds parasitize nests, and deforestation in its Central American wintering grounds.',
    ],
    eBirdCode: 'woothr', merlinId: 'Wood_Thrush',
  },

  // ─────────────────────────────────────────────────────────────
  // RESIDENTS
  // ─────────────────────────────────────────────────────────────

  {
    id: 'eastern_towhee',
    commonName: 'Eastern Towhee',
    scientificName: 'Pipilo erythrophthalmus',
    family: 'Passerellidae',
    order: 'Passeriformes',
    sizeCategory: 'small',
    length_cm: [17, 21], wingspan_cm: [20, 30], weight_g: [33, 53],
    appearance: {
      billShape: 'conical', billSizeRelative: 'medium',
      billColor: { male: 'dark gray', female: 'dark gray' },
      crestPresent: false, crestColor: { male: null, female: null },
      primaryColor: { male: '#1A1A1A', female: '#7A5030' },
      uiColor: '#C04020',
      secondaryColors: { male: ['#C04020 (rich rufous sides)', '#F5F5F5 (white belly)', '#FFFFFF (white wing spots, white tail corners)', '#9B2020 (red eye)'], female: ['Warm brown replaces black; same rufous sides and white belly'] },
      distinctiveMarkings: {
        male: ['Jet black head, throat, back, wings, and tail', 'Rich rufous-orange sides and flanks', 'White belly and undertail', 'White spots in closed wing', 'White corners on long tail', 'Red eye', 'Chunky, large sparrow'],
        female: ['Rich warm brown where male is black', 'Same rufous sides, white belly, wing spots', 'Red eye present'],
        juvenile: ['Streaky brown; adult pattern acquired by first fall'],
      },
      plumageDescription: {
        male: 'The Eastern Towhee is large and boldly patterned for a sparrow: the male is jet black above (head, back, wings, tail) and white below, with rich rufous-orange sides that create a tricolor pattern. White spots in the closed wing and white outer tail corners add detail. The red eye is brilliant at close range. A large, handsome bird with a distinctive double-scratch foraging style.',
        female: 'Warm tawny-brown replaces the black of the male, but the pattern is identical: same rufous sides, same white belly, same white wing spots and tail corners, and the same red eye.',
      },
    },
    primaryHabitat: ['shrubby_woodland', 'forest_edge', 'thickets', 'overgrown_fields', 'undergrowth'],
    feedingLayer: 'ground', flightStyle: 'bounding',
    socialBehavior: { breeding: 'territorial_pairs', winter: 'small_groups' },
    typicalGroupSize: { min: 1, max: 6 }, activeHours: 'diurnal',
    sound: {
      callDescription: '"Chewink" or "towhee" — a rising, emphatic two-note call that gave the bird both its common names.',
      songDescription: '"Drink-your-teeeea" — an emphatic, buzzy phrase with a rising trill on the last note. Often the first thing you hear in brushy second growth.',
      loudness: 7, callFrequency: 7,
      singingSeason: { spring: 'frequent', summer: 'frequent', fall: 'occasional', winter: 'rare' },
    },
    seasons: {
      spring: { presence: 'resident', commonness: 'common' },
      summer: { presence: 'resident', commonness: 'common' },
      fall:   { presence: 'resident', commonness: 'common' },
      winter: { presence: 'resident', commonness: 'uncommon' },
    },
    range: 'eastern_north_america',
    captureStats: {
      difficulty: 4, speed: 4, flightiness: 5, camouflage: 3, sizeScore: 5,
      movementPattern: 'scratching',
      captureBackground: 'forest_undergrowth',
      behaviorNotes: 'Forages by kicking backward with both feet simultaneously — the "double-scratch" — sending leaf litter flying in search of hidden insects and seeds. Often heard more than seen; skulks in dense brush but males sing from exposed perches.',
    },
    rarity: 'common', rarityColor: '#4caf50', points: 130,
    verificationThreshold: 0.65, verificationMethods: 1,
    description: 'The Eastern Towhee is a bird with a technique: its famous double-scratch — kicking backward with both feet simultaneously to flip leaf litter — is one of the most distinctive foraging behaviors of any woodland bird, loud enough to sound like a small mammal in the undergrowth. The bird itself is boldly colored and unmistakable when seen: tricolored black, white, and rufous, with a red eye that glows in forest shade.',
    funFacts: [
      'The Eastern Towhee scratches with both feet simultaneously — a technique so loud that many birdwatchers first hear it and look for a squirrel. Very few songbirds use this two-footed kick.',
      'The towhee has two names from its call: "towhee" is one phonetic rendering and "chewink" is another — and birders spent decades arguing which was correct before both names became standard.',
    ],
    eBirdCode: 'eastem', merlinId: 'Eastern_Towhee',
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
