export interface RouteStop {
  name: string;
  note?: string;
}

export interface TourRoute {
  label?: string;
  stops: RouteStop[];
}

export interface TourFAQ {
  q: string;
  a: string;
}

export interface TourGalleryImage {
  src: string;
  alt: string;
}

export interface TourPlace {
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  type: "half-day" | "full-day" | "custom";
  tagline: string;
  description: string[];
  distance: string;
  duration: string;
  departureTime: string;
  startingPrice: string;
  priceNote?: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Flexible";
  routes: TourRoute[];
  included: string[];
  toBring: string[];
  notIncluded: string[];
  highlights: string[];
  safetyRequirements: string[];
  riderRequirements: string[];
  heroImage: string;
  cardImage: string;
  gallery: TourGalleryImage[];
  placesToVisit: TourPlace[];
  faq: TourFAQ[];
  relatedSlugs: string[];
}

function u(photoId: string, alt: string): TourGalleryImage {
  return {
    src: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`,
    alt,
  };
}

const denpasarGallery: TourGalleryImage[] = [
  {
    src: "/tours/denpasar-tanah-lot-nusa-dua/01-bajra-sandhi-monument.jpg",
    alt: "Bajra Sandhi Monument Denpasar aerial view with park and city skyline, Bali",
  },
  {
    src: "/tours/denpasar-tanah-lot-nusa-dua/02-denpasar-motorcycle-tour.jpg",
    alt: "Premium motorcycle tour through traditional Balinese streets in Denpasar",
  },
  {
    src: "/tours/denpasar-tanah-lot-nusa-dua/03-tanah-lot-temple-sunset.jpg",
    alt: "Tanah Lot Temple overlooking the Indian Ocean at sunset with beach reflection",
  },
  {
    src: "/tours/denpasar-tanah-lot-nusa-dua/04-coastal-cliffs-ocean.jpg",
    alt: "Ocean cliffs and temple on Bali coastline near Tanah Lot at golden hour",
  },
  {
    src: "/tours/denpasar-tanah-lot-nusa-dua/05-nusa-dua-beach.jpg",
    alt: "Nusa Dua white sand beach with palm trees and turquoise ocean, Bali",
  },
];

const tanahLotGallery: TourGalleryImage[] = [
  {
    src: "/tours/tanah-lot-bedugul-explorer/01-tanah-lot-temple-sunset.jpg",
    alt: "Tanah Lot Temple at sunset with golden light over the Indian Ocean, Bali",
  },
  {
    src: "/tours/tanah-lot-bedugul-explorer/02-jatiluwih-rice-terraces-sunrise.jpg",
    alt: "Jatiluwih Rice Terraces UNESCO landscape at sunrise with mountain backdrop",
  },
  {
    src: "/tours/tanah-lot-bedugul-explorer/03-jatiluwih-mount-agung-terraces.jpg",
    alt: "Scenic mountain roads and lush rice terraces near Jatiluwih with Mount Agung, Bali",
  },
  {
    src: "/tours/tanah-lot-bedugul-explorer/04-taman-ayun-temple-gateway.jpg",
    alt: "Taman Ayun Temple ornate red brick gateway and courtyard, Mengwi Bali",
  },
];

const bedugulGallery: TourGalleryImage[] = [
  {
    src: "/tours/bedugul-pupuan-lush-ride/01-taman-ayun-temple.jpg",
    alt: "Taman Ayun Temple Bali with traditional multi-tiered meru towers and moat gardens",
  },
  {
    src: "/tours/bedugul-pupuan-lush-ride/05-bedugul-botanical-garden.jpg",
    alt: "Kumbhakarna Laga statue at Bedugul Botanical Garden surrounded by rainforest",
  },
  {
    src: "/tours/bedugul-pupuan-lush-ride/04-ulun-danu-bratan-temple.jpg",
    alt: "Lake Bratan and Ulun Danu Beratan temple with mountain backdrop, Bedugul Bali",
  },
  {
    src: "/tours/bedugul-pupuan-lush-ride/03-lake-tamblingan-temple.jpg",
    alt: "Lake Tamblingan rainforest view with Pura Ulun Danu Tamblingan temple on the water",
  },
  {
    src: "/tours/bedugul-pupuan-lush-ride/02-pupuan-rice-terraces.jpg",
    alt: "Pupuan rice terraces panorama with misty mountains and lush green highland fields",
  },
  {
    src: "/tours/bedugul-pupuan-lush-ride/06-lempuyang-gates-reflection.jpg",
    alt: "Balinese temple gates reflection at sunrise — scenic highland Bali motorcycle tour",
  },
];

const kintamaniGallery: TourGalleryImage[] = [
  {
    src: "/tours/kintamani-highlands/01-ulun-danu-bratan-temple.jpg",
    alt: "Pura Ulun Danu Bratan water temple on Lake Bratan with misty mountains, Kintamani Highlands tour Bali",
  },
  {
    src: "/tours/kintamani-highlands/02-coffee-plantation-luwak.jpg",
    alt: "Balinese coffee plantation with ripe cherries and rice terraces in Kintamani highlands",
  },
  {
    src: "/tours/kintamani-highlands/03-premium-bikes-temple.jpg",
    alt: "Three premium cruiser motorcycles at an ornate Balinese temple with deity statue — G-DRIVE Kintamani Highlands tour",
  },
  {
    src: "/tours/kintamani-highlands/04-mount-batur-sunrise-clouds.jpg",
    alt: "Mount Batur sunrise above a sea of clouds, Kintamani volcano viewpoint Bali",
  },
  {
    src: "/tours/kintamani-highlands/05-kawasaki-kintamani-viewpoint.jpg",
    alt: "Kawasaki big bike at Kintamani viewpoint overlooking Lake Batur and Mount Batur",
  },
  {
    src: "/tours/kintamani-highlands/06-scooter-highland-road.jpg",
    alt: "Rider on premium scooter overlooking lush green terraces on a Kintamani highland road",
  },
  {
    src: "/tours/kintamani-highlands/07-tegalalang-rice-terraces.jpg",
    alt: "Lush green Tegalalang rice terraces with palm trees on the Kintamani Highlands route",
  },
];

export const tours: Tour[] = [
  {
    id: "1",
    slug: "kintamani-highlands",
    title: "Kintamani Highlands",
    type: "full-day",
    tagline: "Two volcanic loops through Bali's artistic and highland soul",
    description: [
      "Full Day Tour Bali: The Ultimate Big Bike Adventure. Embark on an unforgettable journey with our Full Day Tour Bali, designed for riders who crave a deeper adventure. As a key part of our Bali Motorcycle Tour Packages, this trip takes you beyond typical tourist spots — into the volcanic heartland where culture, scenery, and open mountain roads converge.",
      "This tour covers approximately 200 km over 8 hours, making it the ideal choice for those who want to experience the true spirit of Big Bike Rental Bali. The Kintamani Highlands route is available in two curated variations, each offering a distinct perspective on central Bali while sharing the same dramatic volcanic finale.",
      "Route A winds through Bali's artistic corridor — Sukawati's bustling market stalls, Ubud's royal palace and gallery lanes — before ascending to the rim of the Mount Batur caldera. The return drops through mist-draped terraced coffee farms and the iconic stepped rice terraces of Tegalalang.",
      "Route B takes the quieter coastal approach, stopping at Lebih black-sand beach before turning inland to the immaculately preserved traditional village of Penglipuran. The route then climbs to the same Kintamani viewpoint and traces back through coffee plantations and Tegalalang.",
      "Every tour is led by a professional guide riding their own big bike. We specialize in Bali Harley-Davidson Rental and premium touring motorcycles. Guests may ride solo, join a group ride, or participate as a pillion passenger.",
    ],
    distance: "±200 KM",
    duration: "±8 Hours",
    departureTime: "07:00 WITA",
    startingPrice: "From IDR 1,700,000",
    difficulty: "Moderate",
    routes: [
      {
        label: "Route A",
        stops: [
          { name: "Ngurah Rai Airport (Kuta)" },
          { name: "Sukawati Art Market" },
          { name: "Ubud Royal Palace" },
          { name: "Tegalalang Rice Terraces" },
          { name: "Kintamani Volcano Viewpoint" },
          { name: "Traditional Coffee Plantation" },
          { name: "Return" },
        ],
      },
      {
        label: "Route B",
        stops: [
          { name: "Ngurah Rai Airport (Kuta)" },
          { name: "Lebih Black Sand Beach" },
          { name: "Penglipuran Traditional Village" },
          { name: "Kintamani Volcano Viewpoint" },
          { name: "Traditional Coffee Plantation" },
          { name: "Tegalalang Rice Terraces" },
          { name: "Return" },
        ],
      },
    ],
    highlights: [
      "Mount Batur volcanic caldera rim viewpoint",
      "Tegalalang UNESCO-listed rice terraces",
      "Penglipuran — one of Bali's most traditional villages",
      "Sukawati art market and Ubud's cultural heart",
      "Traditional Balinese coffee and luwak plantation",
      "Choice of two fully guided route variations",
    ],
    included: [
      "Motorcycle",
      "Helmet",
      "Fuel",
      "Local guide",
      "Drinking water",
      "Basic insurance",
      "Parking fees",
    ],
    notIncluded: [
      "Temple entrance fees",
      "Food and beverages",
      "Personal insurance",
    ],
    toBring: [
      "Light jacket (highlands reach 18°C)",
      "Sunscreen",
      "Camera",
      "Cash for entrance fees (~IDR 50,000–100,000 per site)",
      "Comfortable closed-toe shoes",
    ],
    safetyRequirements: [
      "Valid motorcycle license",
      "Minimum age 18",
      "Sober riding",
    ],
    riderRequirements: [
      "Basic motorcycle riding experience for solo riders",
      "No license needed for pillion",
    ],
    heroImage: "/images/kintamani-hero.jpg",
    cardImage: "/images/kintamani-hero.jpg",
    gallery: kintamaniGallery,
    placesToVisit: [
      {
        title: "Kintamani Volcano Viewpoint",
        description:
          "Stand at the rim of the Mount Batur caldera with sweeping views over the crater lake, volcanic slopes, and morning clouds — the dramatic highland finale of both routes.",
      },
      {
        title: "Tegalalang Rice Terraces",
        description:
          "Walk the iconic stepped rice terraces, one of Bali's most photographed landscapes, with time to explore paths and capture panoramic photos.",
      },
      {
        title: "Ubud & Sukawati Cultural Corridor",
        description:
          "Route A passes Sukawati's art market and Ubud's royal palace and gallery lanes — the artistic heart of central Bali.",
      },
      {
        title: "Penglipuran Traditional Village",
        description:
          "Route B visits one of Bali's best-preserved traditional villages, with immaculate bamboo-lined lanes and a glimpse of highland village life.",
      },
      {
        title: "Traditional Coffee Plantation",
        description:
          "Stop at a working plantation for Balinese coffee, tropical scenery, and optional luwak tasting amid cool mountain air.",
      },
      {
        title: "Scenic Highland Roads",
        description:
          "Open mountain passes, misty ridges, and winding highland highways make this one of Bali's most rewarding full-day big bike experiences.",
      },
    ],
    faq: [
      {
        q: "Can we ride both Route A and Route B in one day?",
        a: "The two routes share the Kintamani viewpoint and coffee plantation segments. Combining both in one day would exceed comfortable riding time. We recommend choosing the route that matches your interests, or booking a Custom Tour for a blended itinerary.",
      },
      {
        q: "What is the temperature at Kintamani?",
        a: "The Kintamani plateau sits at around 1,500m elevation. Temperatures can drop to 17–20°C, especially in the morning. A light jacket or windbreaker is strongly recommended.",
      },
      {
        q: "Is the Tegalalang stop included or do we pass by?",
        a: "We stop for a proper visit with time to walk the terrace paths and take photos. The standard stop is 30–45 minutes.",
      },
      {
        q: "Are entrance fees covered in the tour price?",
        a: "Basic entrance fees to most sites are included. Some premium viewpoints and temples charge a small additional fee (typically IDR 20,000–50,000) paid on site.",
      },
      {
        q: "Can beginners ride this route solo?",
        a: "Route B is more suitable for riders with limited highland experience. Route A includes more urban traffic through Ubud. If you are new to Bali roads, we recommend riding pillion for the first tour.",
      },
    ],
    relatedSlugs: [
      "bedugul-pupuan-lush-ride",
      "tanah-lot-bedugul-explorer",
      "custom-tour",
    ],
  },
  {
    id: "2",
    slug: "bedugul-pupuan-lush-ride",
    title: "Bedugul – Pupuan Lush Ride",
    type: "full-day",
    tagline:
      "Bali's greenest corridor — botanical gardens, crater lakes, and a forgotten clove village",
    description: [
      "Full Day Tour Bali: The Ultimate Big Bike Adventure. This highland loop is Bali's most lush and atmospheric full-day ride. Designed as part of our premium Bali Motorcycle Tour Packages, the Bedugul–Pupuan route takes you through royal temple grounds, a world-class botanical garden, twin volcanic crater lakes, and the rarely visited clove-farming village of Pupuan.",
      "Covering approximately 200 km over 8 hours, this tour delivers a complete immersion in Bali's green highland interior — away from coastal crowds and tourist corridors. The roads are smooth, wide, and largely traffic-free once you leave the southern corridor.",
      "The journey opens at Taman Ayun, the grand moated royal temple of the Mengwi kingdom, before climbing into the Bedugul highlands. The botanical garden here spans over 150 hectares of orchids, ferns, and highland flora. Lake Bratan and its photogenic water temple follow — one of Bali's most iconic images.",
      "From Bedugul, the route continues north to the far quieter Lake Tamblingan, where jungle tracks skirt the crater's edge. The final destination, Pupuan, is a working clove and coffee village perched on terraced hillsides that see very few tourists.",
      "Guided by an experienced local rider on a premium big bike. We offer Bali Harley-Davidson Rental and can arrange pillion passengers, group rides, or solo riding.",
    ],
    distance: "±200 KM",
    duration: "±8 Hours",
    departureTime: "07:30 WITA",
    startingPrice: "From IDR 1,700,000",
    difficulty: "Easy",
    routes: [
      {
        stops: [
          { name: "Ngurah Rai Airport (Kuta)" },
          { name: "Taman Ayun Royal Temple" },
          { name: "Bedugul Botanical Garden" },
          { name: "Lake Bratan & Pura Ulun Danu" },
          { name: "Lake Tamblingan" },
          { name: "Pupuan Clove Village" },
          { name: "Return" },
        ],
      },
    ],
    highlights: [
      "Taman Ayun — Mengwi royal temple with moat gardens",
      "Bedugul Botanical Garden — 150+ hectares of highland flora",
      "Pura Ulun Danu Bratan — the iconic lake temple",
      "Lake Tamblingan — untouched volcanic crater lake",
      "Pupuan — traditional clove and coffee farming village",
      "Cool highland air throughout the entire route",
    ],
    included: [
      "Motorcycle",
      "Helmet",
      "Fuel",
      "Local guide",
      "Drinking water",
      "Basic insurance",
      "Parking fees",
    ],
    notIncluded: [
      "Botanical garden entrance",
      "Temple donations",
      "Food and beverages",
    ],
    toBring: [
      "Light rain jacket (Bedugul is frequently misty)",
      "Camera",
      "Cash for botanical garden entry (~IDR 30,000)",
      "Comfortable walking shoes",
    ],
    safetyRequirements: [
      "Valid motorcycle license",
      "Minimum age 18",
      "Sober riding",
    ],
    riderRequirements: [
      "Suitable for all skill levels; roads are well-maintained",
    ],
    heroImage: "/tours/bedugul-pupuan-lush-ride/hero-lempuyang-gates.jpg",
    cardImage: "/tours/bedugul-pupuan-lush-ride/hero-lempuyang-gates.jpg",
    gallery: bedugulGallery,
    placesToVisit: [
      {
        title: "Taman Ayun Temple",
        description:
          "One of Bali's most beautiful royal temples, surrounded by a moat and lush gardens. A UNESCO-listed cultural landmark showcasing traditional Balinese architecture.",
      },
      {
        title: "Bedugul Botanical Garden",
        description:
          "The largest botanical garden in Bali, featuring mountain forests, giant tropical plants, and scenic roads perfect for motorcycle touring.",
      },
      {
        title: "Lake Bratan & Ulun Danu Temple",
        description:
          "One of Bali's most iconic locations. The temple appears to float on the lake, surrounded by cool mountain air and stunning scenery.",
      },
      {
        title: "Lake Tamblingan",
        description:
          "A peaceful highland lake hidden among dense rainforest, offering panoramic views and some of the island's most tranquil landscapes.",
      },
      {
        title: "Pupuan Rice Terraces",
        description:
          "A hidden gem featuring endless green rice terraces and quiet countryside roads, ideal for riders seeking authentic Bali.",
      },
      {
        title: "Scenic Mountain Roads",
        description:
          "Twisting roads through forests, lakes, and mountain passes create one of Bali's most rewarding riding experiences.",
      },
    ],
    faq: [
      {
        q: "Is the Bedugul road safe to ride after rain?",
        a: "The main Bedugul highway is well-maintained and safe in most conditions. The optional jungle track around Lake Tamblingan can be slippery after heavy rain — our guide will assess on the day and suggest alternatives if needed.",
      },
      {
        q: "What is the weather like at Bedugul?",
        a: "Bedugul sits at approximately 1,200m elevation. It is cooler than the coast (20–24°C) and frequently misty in the afternoon. We depart early to maximize morning clarity at the lake.",
      },
      {
        q: "Is the botanical garden entrance included?",
        a: "The botanical garden entry fee (~IDR 30,000) is not included in the base price and is paid on site.",
      },
      {
        q: "Can we swim at Lake Tamblingan?",
        a: "Lake Tamblingan is a protected sacred lake — swimming is not permitted. The visit focuses on the scenic jungle trail and lake views.",
      },
      {
        q: "Is Pupuan worth the extra distance?",
        a: "Absolutely. Pupuan is one of the least-visited highland destinations in Bali. The clove and coffee terraces, cool air, and absence of tourist crowds make it a genuine highlight for riders who want an authentic experience.",
      },
    ],
    relatedSlugs: [
      "kintamani-highlands",
      "tanah-lot-bedugul-explorer",
      "custom-tour",
    ],
  },
  {
    id: "3",
    slug: "tanah-lot-bedugul-explorer",
    title: "Tanah Lot – Bedugul Explorer",
    type: "full-day",
    tagline:
      "Sea temples, UNESCO rice terraces, and crater lakes in one cinematic day",
    description: [
      "Full Day Tour Bali: The Ultimate Big Bike Adventure. The Tanah Lot–Bedugul Explorer is Bali's greatest-hits route — and riding it on a premium big bike elevates every landmark into something personal. This full-day tour is a cornerstone of our Bali Motorcycle Tour Packages, combining coastal drama, royal heritage, UNESCO landscapes, and highland serenity in a single 200 km loop.",
      "We begin at dawn at Tanah Lot, Bali's most famous sea temple, where the rock formation rises from the ocean as the light turns golden. From there the route turns inland to Puri Kerambitan — a working royal palace that receives very few visitors — before climbing to the Jatiluwih rice terraces, a UNESCO World Cultural Heritage site stretching across entire hillsides.",
      "The final highland section reaches Lake Bratan and its celebrated water temple, Pura Ulun Danu, before descending back through Taman Ayun royal temple and returning south. The combination of sea, palace, terrace, and lake in one day is unmatched on the island.",
      "As with all our tours, a professional guide leads on their own big bike. We offer Bali Harley-Davidson Rental for guests who want the iconic touring experience, and welcome solo riders, group riders, and pillion passengers.",
    ],
    distance: "±200 KM",
    duration: "±8 Hours",
    departureTime: "07:00 WITA",
    startingPrice: "From IDR 1,700,000",
    difficulty: "Easy",
    routes: [
      {
        stops: [
          { name: "Ngurah Rai Airport (Kuta)" },
          { name: "Tanah Lot Sea Temple" },
          { name: "Puri Kerambitan Royal Palace" },
          { name: "Jatiluwih UNESCO Rice Terraces" },
          { name: "Lake Bratan & Pura Ulun Danu" },
          { name: "Taman Ayun Temple" },
          { name: "Return" },
        ],
      },
    ],
    highlights: [
      "Tanah Lot — Bali's most iconic sea temple at golden hour",
      "Puri Kerambitan — active royal palace rarely visited by tourists",
      "Jatiluwih — UNESCO World Cultural Heritage rice terraces",
      "Lake Bratan and the floating Pura Ulun Danu temple",
      "Taman Ayun — grand royal temple with reflective moat",
      "A complete cross-section of Bali's landscape in one day",
    ],
    included: [
      "Motorcycle",
      "Helmet",
      "Fuel",
      "Local guide",
      "Sarong for temple entry",
      "Drinking water",
      "Basic insurance",
      "Parking fees",
    ],
    notIncluded: [
      "UNESCO Jatiluwih entrance fee",
      "Temple donations",
      "Food and beverages",
    ],
    toBring: [
      "Sunscreen",
      "Camera",
      "Cash for UNESCO entry (~IDR 40,000)",
      "Comfortable shoes for terrace walks",
    ],
    safetyRequirements: [
      "Valid motorcycle license",
      "Minimum age 18",
      "Sober riding",
    ],
    riderRequirements: ["Suitable for all skill levels"],
    heroImage: "/tours/tanah-lot-bedugul-explorer/hero-jatiluwih-terraces.jpg",
    cardImage: "/tours/tanah-lot-bedugul-explorer/hero-jatiluwih-terraces.jpg",
    gallery: tanahLotGallery,
    placesToVisit: [
      {
        title: "Tanah Lot Temple",
        description:
          "Bali's most famous sea temple, perched dramatically on a rock formation overlooking the Indian Ocean.",
      },
      {
        title: "Puri Kerambitan",
        description:
          "A historic royal palace showcasing traditional Balinese architecture and cultural heritage.",
      },
      {
        title: "Jatiluwih Rice Terraces",
        description:
          "A UNESCO World Heritage Site featuring vast terraced rice fields and breathtaking mountain scenery.",
      },
      {
        title: "Lake Bratan & Ulun Danu Temple",
        description:
          "One of the most photographed destinations in Bali, offering cool temperatures and spectacular lake views.",
      },
      {
        title: "Taman Ayun Temple",
        description:
          "A beautiful royal temple complex surrounded by gardens and water features.",
      },
      {
        title: "Scenic Highland Roads",
        description:
          "Ride through mountain roads, rural villages, and scenic countryside with panoramic viewpoints throughout the journey.",
      },
    ],
    faq: [
      {
        q: "Do we need to wear a sarong at Tanah Lot?",
        a: "Yes, a sarong is required to enter the temple grounds. We provide sarongs for all guests — you do not need to bring your own.",
      },
      {
        q: "Is the Jatiluwih entrance fee included?",
        a: "Jatiluwih is a UNESCO heritage site with a dedicated entrance fee (~IDR 40,000 per person). This is not included in the base price and is paid on arrival.",
      },
      {
        q: "Can we have breakfast at Tanah Lot?",
        a: "Yes, we schedule an early departure to arrive at Tanah Lot before crowds. There are excellent local warung cafés at the site for breakfast. Food is not included in the tour price.",
      },
      {
        q: "How long do we spend at Jatiluwih?",
        a: "The standard stop is 45–60 minutes, allowing time to walk the main terrace path and take photos. Extended stays can be arranged on a Custom Tour.",
      },
      {
        q: "Is this route suitable for beginner riders?",
        a: "Yes. The roads on this route are well-maintained and the route avoids the most congested urban roads. It is one of our most recommended routes for first-time Bali riders.",
      },
    ],
    relatedSlugs: [
      "kintamani-highlands",
      "bedugul-pupuan-lush-ride",
      "custom-tour",
    ],
  },
  {
    id: "4",
    slug: "denpasar-tanah-lot-nusa-dua",
    title: "Denpasar, Tanah Lot & Nusa Dua",
    type: "half-day",
    tagline:
      "Bali's capital, its most iconic temple, and its most refined coastline — in four hours",
    description: [
      "Half Day Tour Bali: Premium Big Bike Adventure. Experience the thrill of riding through the island with our Half Day Tour Bali — designed for riders who want to explore the essence of Bali in a limited time. This 4-hour guided ride delivers a perfect combination of scenic routes, cultural landmarks, and smooth open roads.",
      "As part of our comprehensive Bali Motorcycle Tour Packages, this tour covers approximately 100 km. It is the ideal choice for a quick yet memorable introduction to big bike touring — specifically curated for those seeking a premium Big Bike Rental Bali experience without committing to a full day.",
      "The journey begins in Denpasar, navigating the vibrant pulse of Bali's capital past the Bajra Sandhi Monument and Puputan Square. From there the route sweeps west to the coastal majesty of Tanah Lot, Bali's most photographed sea temple, before finishing at the upscale beachfront promenade of Nusa Dua.",
      "Every tour is led by a professional guide on a high-performance motorcycle, ensuring expert navigation. We specialize in Bali Harley-Davidson Rental, providing an iconic riding experience that perfectly complements the island's beauty. Guests may ride solo, join a group ride, or participate as a pillion passenger.",
      "For independent exploration, also see Self Ride Motorcycle Rental Bali. For more time and distance, upgrade to our Full Day Tour.",
    ],
    distance: "±100 KM",
    duration: "±4 Hours",
    departureTime: "08:00 WITA",
    startingPrice: "From IDR 1,400,000",
    priceNote: "Half Day Tour — ideal for guests with limited time",
    difficulty: "Easy",
    routes: [
      {
        stops: [
          { name: "Ngurah Rai Airport (Kuta)" },
          { name: "Denpasar City Center", note: "Bajra Sandhi Monument, Puputan Square" },
          { name: "Tanah Lot Sea Temple" },
          { name: "Nusa Dua Beach Promenade" },
          { name: "Return" },
        ],
      },
    ],
    highlights: [
      "Bajra Sandhi Monument — Bali's independence monument",
      "Puputan Square — the historic heart of Denpasar",
      "Tanah Lot — iconic sea temple at the ocean's edge",
      "Nusa Dua beachfront promenade — Bali's most refined coastal strip",
      "Smooth roads and minimal stops — perfect pacing for half-day riding",
      "Ideal introduction to Bali's big bike touring scene",
    ],
    included: [
      "Motorcycle",
      "Helmet",
      "Fuel",
      "Local guide",
      "Drinking water",
      "Basic insurance",
      "Parking fees",
    ],
    notIncluded: ["Temple donations", "Food and beverages"],
    toBring: [
      "Sunscreen",
      "Sarong (we provide)",
      "Camera",
      "Small amount of cash",
    ],
    safetyRequirements: [
      "Valid motorcycle license",
      "Minimum age 18",
      "Sober riding",
    ],
    riderRequirements: [
      "Suitable for all levels including complete beginners (pillion option available)",
    ],
    heroImage: "/tours/denpasar-tanah-lot-nusa-dua/hero-coastal-cliffs.jpg",
    cardImage: "/tours/denpasar-tanah-lot-nusa-dua/hero-coastal-cliffs.jpg",
    gallery: denpasarGallery,
    placesToVisit: [
      {
        title: "Denpasar City",
        description:
          "Experience the vibrant heart of Bali with traditional markets, local culture, and bustling city streets.",
      },
      {
        title: "Tanah Lot Temple",
        description:
          "An iconic oceanfront temple and one of Bali's most recognizable landmarks.",
      },
      {
        title: "Nusa Dua Coastline",
        description:
          "A luxury resort area known for pristine beaches, coastal roads, and spectacular ocean views.",
      },
      {
        title: "Coastal Scenic Roads",
        description:
          "Enjoy smooth riding along Bali's southern coastline with beautiful sea panoramas.",
      },
      {
        title: "Cultural Landmarks",
        description:
          "Discover a combination of modern Bali, traditional culture, and world-famous attractions in one compact tour.",
      },
    ],
    faq: [
      {
        q: "Is this suitable as a first motorcycle tour in Bali?",
        a: "Yes — this is one of our most popular introductory tours. The roads are well-maintained, the distance is manageable, and the guide sets a relaxed pace. It is perfect for first-time visitors and less experienced riders.",
      },
      {
        q: "Can we extend the half-day tour to a full day?",
        a: "Absolutely. Contact us to upgrade to our Full Day Tour or design a Custom Tour that adds destinations to this route.",
      },
      {
        q: "Is Tanah Lot included as a proper stop?",
        a: "Yes, we stop for a full visit at Tanah Lot with time to walk to the temple rock, explore the grounds, and take photos. The standard stop is 30–45 minutes.",
      },
      {
        q: "What is the best time of day for Tanah Lot?",
        a: "Early morning offers the best light and smallest crowds. Our 08:00 departure is timed to arrive at Tanah Lot mid-morning before the main tourist rush.",
      },
      {
        q: "Do I need to know how to ride a motorcycle?",
        a: "No license or experience needed for pillion passengers. Solo riders must hold a valid motorcycle license. All guests receive a safety briefing before departure.",
      },
    ],
    relatedSlugs: [
      "kintamani-highlands",
      "tanah-lot-bedugul-explorer",
      "custom-tour",
    ],
  },
  {
    id: "5",
    slug: "custom-tour",
    title: "Custom Tour",
    type: "custom",
    tagline: "Your route, your pace, your Bali",
    description: [
      "Custom Tour Bali: Your Personalized Big Bike Adventure. With our Custom Tour Bali, you have complete freedom to design your own journey. This personalized experience is the most flexible offering in our Bali Motorcycle Tour Packages — specifically designed for riders who want full control over destinations, routes, and riding pace.",
      "Whether you dream of coastal roads, hidden mountain passes, waterfalls, volcanoes, temples, or beaches, this tour adapts entirely to your preferences. Our professional guides help create the ideal route, allowing guests to discover both famous landmarks and hidden gems while enjoying a premium Big Bike Rental Bali experience.",
      "The Custom Tour can be as short as a 4-hour Half Day or as ambitious as a 12-hour multi-region loop covering up to 200 km. You choose the distance, the departure time, the stops, and the pace. We handle all the planning, logistics, and navigation.",
      "Every Custom Tour Bali is led by an experienced rider and professional guide riding their own motorcycle or a model from the Bali Harley-Davidson Rental fleet. This means expert navigation, local knowledge, maximum safety, and flexible route planning throughout.",
      "Guests can ride solo, join with friends, or ride as a tandem passenger. For inspiration, browse our Half Day Tour and Full Day Tour offerings — or simply tell us what you want to see and we will build the route around you.",
    ],
    distance: "Up to ±200 KM",
    duration: "Flexible (4–12 hours)",
    departureTime: "Your choice",
    startingPrice: "From IDR 1,700,000",
    difficulty: "Flexible",
    routes: [
      {
        label: "Example itinerary",
        stops: [
          { name: "Fully custom — built with you before departure" },
          { name: "Uluwatu cliffs" },
          { name: "Seminyak coastal road" },
          { name: "Canggu beach towns" },
          { name: "Sidemen valley" },
          { name: "Amed black-sand coast" },
          { name: "Munduk waterfalls" },
          { name: "Sekumpul falls" },
          { name: "Tirta Empul holy spring" },
          { name: "East Bali coastal highway" },
        ],
      },
    ],
    highlights: [
      "Complete freedom to choose your own destinations",
      "Scenic coastal or mountain routes — or both",
      "Set your preferred riding pace and stop duration",
      "Private and exclusive touring experience",
      "Explore up to 200 km of Bali in one day",
      "Fully customizable itinerary with expert local planning",
      "Suitable for all skill levels and group sizes",
      "Ideal for return visitors who have done the standard routes",
    ],
    included: [
      "Motorcycle",
      "Helmet",
      "Fuel",
      "Professional guide",
      "Drinking water",
      "Basic insurance",
      "Route planning consultation",
    ],
    notIncluded: [
      "Entrance fees (vary by destination)",
      "Food and beverages",
      "Personal insurance upgrade",
    ],
    toBring: [
      "Depends on chosen route — guide advises during planning call",
    ],
    safetyRequirements: [
      "Valid motorcycle license for solo riders",
      "Minimum age 18",
      "Sober riding",
    ],
    riderRequirements: [
      "All levels welcome; guide adjusts route to experience level",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    gallery: [
      u("1570789210967-2cac24afeb00", "Rider on coastal cliff road"),
      u("1506905925346-21bda4d32df4", "Group ride mountain highway"),
      u("1537996194471-e657df975ab4", "Hidden waterfall jungle track"),
      u("1555390038-63f5ba517a47", "Empty Bali back road"),
      u("1555400038-63f5ba517a47", "Sunset coastal highway"),
      u("1558618666-fcd25c85cd64", "Rice terrace custom stop"),
      u("1570789210967-2cac24afeb00", "Amed coastline"),
      u("1506905925346-21bda4d32df4", "Sidemen valley road"),
    ],
    placesToVisit: [
      {
        title: "Your Choice of Destinations",
        description:
          "Build your own itinerary and explore Bali exactly the way you want.",
      },
      {
        title: "Hidden Gems",
        description:
          "Visit lesser-known waterfalls, viewpoints, temples, mountain roads, villages, and beaches.",
      },
      {
        title: "Coastal Routes",
        description:
          "Cruise along Bali's stunning southern and western coastlines.",
      },
      {
        title: "Highland Adventures",
        description:
          "Explore volcanic regions, mountain passes, lakes, and cooler highland scenery.",
      },
      {
        title: "Cultural Experiences",
        description:
          "Visit temples, traditional villages, local markets, and historical landmarks.",
      },
      {
        title: "Personalized Riding Experience",
        description:
          "Every route is custom-built based on the rider's preferences, riding style, and desired destinations.",
      },
    ],
    faq: [
      {
        q: "How do I plan a Custom Tour?",
        a: "Contact us via WhatsApp with your preferred date, group size, riding experience level, and any destinations or themes you have in mind. We will suggest a route within 24 hours and refine it until you are happy.",
      },
      {
        q: "Is there a minimum distance or duration?",
        a: "Our minimum booking is a 4-hour / ~80 km ride. There is no upper limit — we have guided 12-hour rides covering 250 km for experienced touring groups.",
      },
      {
        q: "Can the route be changed on the day?",
        a: "Yes. Our guides are experienced with spontaneous route adjustments. If you want to extend a stop, skip a location, or add something new, just tell the guide and they will adapt.",
      },
      {
        q: "How far in advance do I need to book?",
        a: "We recommend at least 48 hours to allow proper route planning. For large groups (6+ riders) or multi-day itineraries, 5–7 days is ideal.",
      },
      {
        q: "Can we combine a Custom Tour with a motorcycle rental?",
        a: "Yes. We offer Self Ride Motorcycle Rental Bali for riders who prefer to follow the guide independently. The guide leads on their own bike and you ride at your own pace alongside them.",
      },
    ],
    relatedSlugs: [
      "denpasar-tanah-lot-nusa-dua",
      "kintamani-highlands",
      "tanah-lot-bedugul-explorer",
    ],
  },
];
