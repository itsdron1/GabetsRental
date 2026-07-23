export type BikeCategory =
  | "cruiser"
  | "sport"
  | "adventure"
  | "enduro"
  | "scooter";

export type Bike = {
  id: string;
  name: string;
  category: BikeCategory;
  priceIdr: number;
  image: string;
  badge?: string;
  tagline: string;
};

export function formatBikePrice(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1).replace(/\.0$/, "")}M`;
  }
  return `${Math.round(amount / 1000)}K`;
}

export function formatBikePriceFull(amount: number): string {
  return amount.toLocaleString("en-US");
}

export const filterTabs = [
  { id: "all", label: "All Bikes" },
  { id: "cruiser", label: "Cruiser" },
  { id: "sport", label: "Sport" },
  { id: "adventure", label: "Adventure / Touring" },
  { id: "enduro", label: "Enduro" },
  { id: "scooter", label: "Scooter" },
] as const;

export type FilterTabId = (typeof filterTabs)[number]["id"];

export const bikes: Bike[] = [
  {
    id: "harley-heritage-softail-classic",
    name: "Harley-Davidson Heritage Softail Classic",
    category: "cruiser",
    priceIdr: 2_500_000,
    image: "/bikes/harley-heritage-softail-classic.png",
    badge: "Flagship",
    tagline: "American classic touring",
  },
  {
    id: "harley-forty-eight",
    name: "Harley-Davidson Forty-Eight",
    category: "cruiser",
    priceIdr: 2_200_000,
    image: "/bikes/harley-forty-eight.png",
    tagline: "Bold urban cruiser",
  },
  {
    id: "harley-sportster-iron-883",
    name: "Harley-Davidson Sportster Iron 883",
    category: "cruiser",
    priceIdr: 2_000_000,
    image: "/bikes/harley-sportster-iron-883.png",
    tagline: "Raw Harley attitude",
  },
  {
    id: "harley-street-500",
    name: "Harley-Davidson Street 500",
    category: "cruiser",
    priceIdr: 1_400_000,
    image: "/bikes/harley-street-500.png",
    tagline: "Lightweight Harley entry",
  },
  {
    id: "honda-rebel-500",
    name: "Honda Rebel 500",
    category: "cruiser",
    priceIdr: 1_200_000,
    image: "/bikes/honda-rebel-500.png",
    badge: "Popular",
    tagline: "Neo-retro cruiser",
  },
  {
    id: "yamaha-yzf-r6",
    name: "Yamaha YZF-R6",
    category: "sport",
    priceIdr: 2_000_000,
    image: "/bikes/yamaha-yzf-r6.png",
    badge: "Track Ready",
    tagline: "Supersport precision",
  },
  {
    id: "ducati-monster-795",
    name: "Ducati Monster 795",
    category: "sport",
    priceIdr: 1_500_000,
    image: "/bikes/ducati-monster-795.png",
    tagline: "Italian naked sport",
  },
  {
    id: "kawasaki-z800",
    name: "Kawasaki Z800",
    category: "sport",
    priceIdr: 1_500_000,
    image: "/bikes/kawasaki-z800.png",
    tagline: "Streetfighter torque",
  },
  {
    id: "kawasaki-z900",
    name: "Kawasaki Z900",
    category: "sport",
    priceIdr: 1_900_000,
    image: "/bikes/kawasaki-z900.png",
    badge: "New",
    tagline: "Supernaked performance",
  },
  {
    id: "kawasaki-zx-25r",
    name: "Kawasaki ZX-25R",
    category: "sport",
    priceIdr: 800_000,
    image: "/bikes/kawasaki-zx-25r.png",
    tagline: "Compact sport four",
  },
  {
    id: "bmw-f800gs",
    name: "BMW F800GS",
    category: "adventure",
    priceIdr: 2_000_000,
    image: "/bikes/bmw-f800gs.png",
    badge: "Adventure",
    tagline: "Premium dual-sport",
  },
  {
    id: "kawasaki-versys-650",
    name: "Kawasaki Versys 650",
    category: "adventure",
    priceIdr: 1_000_000,
    image: "/bikes/kawasaki-versys-650.png",
    tagline: "Versatile tourer",
  },
  {
    id: "royal-enfield-himalayan-410",
    name: "Royal Enfield Himalayan 410",
    category: "adventure",
    priceIdr: 900_000,
    image: "/bikes/royal-enfield-himalayan-410.png",
    tagline: "Go-anywhere explorer",
  },
  {
    id: "royal-enfield-scram-411",
    name: "Royal Enfield Scram 411",
    category: "adventure",
    priceIdr: 900_000,
    image: "/bikes/royal-enfield-scram-411.png",
    tagline: "Scrambler spirit",
  },
  {
    id: "royal-enfield-classic-500",
    name: "Royal Enfield Classic 500",
    category: "adventure",
    priceIdr: 800_000,
    image: "/bikes/royal-enfield-classic-500.png",
    tagline: "Heritage touring",
  },
  {
    id: "honda-crf150",
    name: "Honda CRF150",
    category: "enduro",
    priceIdr: 300_000,
    image: "/bikes/honda-crf150.png",
    tagline: "Lightweight trail ready",
  },
  {
    id: "yamaha-wr155",
    name: "Yamaha WR155",
    category: "enduro",
    priceIdr: 300_000,
    image: "/bikes/yamaha-wr155.png",
    tagline: "Agile off-road fun",
  },
  {
    id: "kawasaki-klx230",
    name: "Kawasaki KLX230",
    category: "enduro",
    priceIdr: 500_000,
    image: "/bikes/kawasaki-klx230.png",
    badge: "Trail Pro",
    tagline: "Confident dirt explorer",
  },
  {
    id: "yamaha-xmax-250",
    name: "Yamaha XMAX 250",
    category: "scooter",
    priceIdr: 300_000,
    image: "/bikes/yamaha-xmax-250.png",
    badge: "City Pick",
    tagline: "Premium maxi-scooter",
  },
  {
    id: "vespa-sprint",
    name: "Vespa Sprint",
    category: "scooter",
    priceIdr: 170_000,
    image: "/bikes/vespa-sprint.png",
    tagline: "Iconic Italian style",
  },
  {
    id: "vespa-primavera-s",
    name: "Vespa Primavera S",
    category: "scooter",
    priceIdr: 170_000,
    image: "/bikes/vespa-primavera-s.png",
    tagline: "Elegant city classic",
  },
  {
    id: "honda-cbr250rr-abs-spqs",
    name: "Honda CBR250RR ABS SPQS",
    category: "sport",
    priceIdr: 550_000,
    image: "/bikes/honda-cbr250rr-abs-spqs.webp",
    badge: "Premium",
    tagline: "Flagship twin-cylinder sport",
  },
  {
    id: "honda-cbr250rr-sp-abs",
    name: "Honda CBR250RR SP ABS",
    category: "sport",
    priceIdr: 500_000,
    image: "/bikes/honda-cbr250rr-sp-abs.webp",
    tagline: "Track-bred twin performance",
  },
  {
    id: "kawasaki-ninja-250-abs-custom",
    name: "Kawasaki Ninja 250 ABS Custom",
    category: "sport",
    priceIdr: 500_000,
    image: "/bikes/kawasaki-ninja-250-abs-custom.webp",
    tagline: "Custom livery sport twin",
  },
  {
    id: "kawasaki-w175-black-gloss",
    name: "Kawasaki W175 Black Gloss ABS FI",
    category: "cruiser",
    priceIdr: 250_000,
    image: "/bikes/kawasaki-w175-black-gloss.webp",
    tagline: "Gloss-finish retro single",
  },
  {
    id: "kawasaki-w175-black",
    name: "Kawasaki W175 Black",
    category: "cruiser",
    priceIdr: 250_000,
    image: "/bikes/kawasaki-w175-black.webp",
    tagline: "Classic W-series cruiser",
  },
  {
    id: "kawasaki-z250sl-custom-black",
    name: "Kawasaki Z250SL Custom Black",
    category: "sport",
    priceIdr: 400_000,
    image: "/bikes/kawasaki-z250sl-custom-black.webp",
    tagline: "Lightweight naked sport",
  },
  {
    id: "kawasaki-zx250r",
    name: "Kawasaki ZX250R",
    category: "sport",
    priceIdr: 450_000,
    image: "/bikes/kawasaki-zx250r.webp",
    tagline: "Entry supersport agility",
  },
  {
    id: "qjmotor-srv-200-mt",
    name: "QJMotor SRV 200 MT",
    category: "adventure",
    priceIdr: 350_000,
    image: "/bikes/qjmotor-srv-200-mt.webp",
    tagline: "Compact adventure tourer",
  },
  {
    id: "qjmotor-srv-600-v-abs-v4",
    name: "QJMotor SRV 600 V ABS V4",
    category: "sport",
    priceIdr: 800_000,
    image: "/bikes/qjmotor-srv-600-v-abs-v4.webp",
    tagline: "V4 sport touring power",
  },
  {
    id: "qjmotor-tourino-250-dx-abs",
    name: "QJMotor Tourino 250 Dx ABS",
    category: "adventure",
    priceIdr: 400_000,
    image: "/bikes/qjmotor-tourino-250-dx-abs.webp",
    tagline: "DX adventure comfort",
  },
  {
    id: "royal-enfield-500-blue",
    name: "Royal Enfield 500 Blue",
    category: "adventure",
    priceIdr: 800_000,
    image: "/bikes/royal-enfield-500-blue.webp",
    tagline: "Heritage single-cylinder blue",
  },
  {
    id: "royal-enfield-350-army-green",
    name: "Royal Enfield 350 ABS Army Green",
    category: "cruiser",
    priceIdr: 600_000,
    image: "/bikes/royal-enfield-350-army-green.webp",
    tagline: "Military-inspired classic",
  },
  {
    id: "royal-enfield-super-meteor-650",
    name: "Royal Enfield Super Meteor 650 ABS",
    category: "cruiser",
    priceIdr: 1_200_000,
    image: "/bikes/royal-enfield-super-meteor-650.webp",
    badge: "Cruiser",
    tagline: "650cc highway cruiser",
  },
  {
    id: "sm-sport-v16",
    name: "SM Sport V16",
    category: "cruiser",
    priceIdr: 450_000,
    image: "/bikes/sm-sport-v16.webp",
    tagline: "Custom V-twin attitude",
  },
  {
    id: "sm-sport-v16-custom-bobber",
    name: "SM Sport V16 Custom Bobber",
    category: "cruiser",
    priceIdr: 500_000,
    image: "/bikes/sm-sport-v16-custom-bobber.webp",
    tagline: "Hand-built bobber style",
  },
  {
    id: "sm-sport-v16-rusty",
    name: "SM Sport V16 Rusty",
    category: "cruiser",
    priceIdr: 450_000,
    image: "/bikes/sm-sport-v16-rusty.webp",
    tagline: "Rat-rod custom character",
  },
  {
    id: "suzuki-thunder-150-tracker",
    name: "Suzuki Thunder 150 Tracker",
    category: "enduro",
    priceIdr: 300_000,
    image: "/bikes/suzuki-thunder-150-tracker.webp",
    tagline: "Tracker-style street build",
  },
  {
    id: "suzuki-thunder-anarchy",
    name: "Suzuki Thunder Anarchy",
    category: "enduro",
    priceIdr: 200_000,
    image: "/bikes/suzuki-thunder-anarchy.webp",
    tagline: "Raw custom street machine",
  },
  {
    id: "tvs-ronin-triumph-style-225",
    name: "TVS Ronin Custom Triumph Style 225 ABS",
    category: "cruiser",
    priceIdr: 450_000,
    image: "/bikes/tvs-ronin-triumph-style-225.webp",
    tagline: "Neo-retro scrambler vibe",
  },
  {
    id: "yamaha-byson-f1",
    name: "Yamaha Byson F1",
    category: "enduro",
    priceIdr: 185_000,
    image: "/bikes/yamaha-byson-f1.webp",
    tagline: "Budget daily commuter",
  },
  {
    id: "yamaha-mt25",
    name: "Yamaha MT25",
    category: "sport",
    priceIdr: 400_000,
    image: "/bikes/yamaha-mt25.webp",
    tagline: "Naked twin street fun",
  },
  {
    id: "yamaha-r15m-abs-qs",
    name: "Yamaha R15M ABS QS Connected",
    category: "sport",
    priceIdr: 400_000,
    image: "/bikes/yamaha-r15m-abs-qs.webp",
    tagline: "Connected supersport tech",
  },
  {
    id: "yamaha-r25-black",
    name: "Yamaha R25 Black ABS",
    category: "sport",
    priceIdr: 400_000,
    image: "/bikes/yamaha-r25-black.webp",
    tagline: "Twin-cylinder sport entry",
  },
  {
    id: "yamaha-r3-320-blue",
    name: "Yamaha R3 320cc Blue ABS",
    category: "sport",
    priceIdr: 500_000,
    image: "/bikes/yamaha-r3-320-blue.webp",
    tagline: "Blue ABS sport triple",
  },
  {
    id: "yamaha-scorpio-cafe-racer",
    name: "Yamaha Scorpio Café Racer",
    category: "cruiser",
    priceIdr: 300_000,
    image: "/bikes/yamaha-scorpio-cafe-racer.webp",
    tagline: "Café racer custom build",
  },
  {
    id: "yamaha-scorpio-tracker-black",
    name: "Yamaha Scorpio Tracker Black",
    category: "cruiser",
    priceIdr: 300_000,
    image: "/bikes/yamaha-scorpio-tracker-black.webp",
    tagline: "Black tracker street style",
  },
  {
    id: "yamaha-scorpio-tracker-brown",
    name: "Yamaha Scorpio Tracker Brown",
    category: "cruiser",
    priceIdr: 300_000,
    image: "/bikes/yamaha-scorpio-tracker-brown.webp",
    tagline: "Brown tracker custom look",
  },
  {
    id: "yamaha-xabre",
    name: "Yamaha Xabre",
    category: "sport",
    priceIdr: 250_000,
    image: "/bikes/yamaha-xabre.webp",
    tagline: "Aggressive naked street",
  },
  {
    id: "yamaha-xsr155",
    name: "Yamaha XSR155",
    category: "cruiser",
    priceIdr: 300_000,
    image: "/bikes/yamaha-xsr155.webp",
    tagline: "Modern retro roadster",
  },
];

export type DeliveryZone = {
  name: string;
  price: string;
  free?: boolean;
  contact?: boolean;
};

export const deliveryZones: DeliveryZone[] = [
  { name: "Canggu / Seminyak / Kuta", price: "Free", free: true },
  { name: "Ubud / Tegallalang", price: "200,000 IDR" },
  { name: "Uluwatu / Bukit", price: "200,000 IDR" },
  { name: "Sanur / Nusa Dua", price: "100,000 IDR" },
  { name: "Airport / Ngurah Rai", price: "100,000 IDR" },
  { name: "North Bali / Singaraja", price: "Contact Us", contact: true },
];

export const whyCards = [
  {
    icon: "🔧",
    title: "Freshly Serviced Fleet",
    text: "Every bike goes through a full mechanical check between rentals. Oil, tires, brakes — always in perfect condition before it reaches you.",
  },
  {
    icon: "📄",
    title: "Full Insurance Coverage",
    text: "All rentals include third-party liability insurance. Ride with peace of mind knowing you're protected across the island.",
  },
  {
    icon: "💬",
    title: "24/7 WhatsApp Support",
    text: "Flat tire at midnight? Got lost near Kintamani? Message us anytime — our team responds within minutes, any time of day.",
  },
  {
    icon: "🪪",
    title: "Driver License",
    text: "We assist guests with an International Driving License navigate Bali safely and legally. Ask us about local regulations.",
  },
  {
    icon: "💳",
    title: "Transparent Pricing",
    text: "The price you see is the price you pay. No surprise fees, no fuel surcharges, no hidden deposits beyond our standard policy.",
  },
  {
    icon: "🗓️",
    title: "Flexible Duration",
    text: "Rent for 1 day or 3 months. Long-term discounts kick in automatically — the longer you ride, the more you save.",
  },
];

export const deliveryPerks = [
  {
    icon: "⚡",
    title: "Same-Day Delivery",
    text: "Order before 12:00 and your bike arrives the same day — anywhere in South & Central Bali.",
  },
  {
    icon: "🛡️",
    title: "Helmet & Safety Gear Included",
    text: "Every rental comes with a certified helmet, lock, and 24/7 roadside WhatsApp support.",
  },
  {
    icon: "📍",
    title: "Airport Pick-Up Available",
    text: "Land at Ngurah Rai and find your bike waiting. Seamless handover, zero waiting time.",
  },
];

export const trustItems = [
  "Confirmed within 30 minutes",
  "Free cancellation up to 24h before",
  "Pay on delivery — no card required",
  "Helmet & lock included in every rental",
  "Island-wide delivery available",
];
