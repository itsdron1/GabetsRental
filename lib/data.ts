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
