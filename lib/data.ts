export type Bike = {
  name: string;
  categories: string[];
  cc: string;
  specs: string[];
  price: string;
  badge?: string;
  icon: string;
};

export const bikes: Bike[] = [
  {
    name: "Honda Vario 125",
    categories: ["scooter", "automatic"],
    cc: "125cc",
    specs: ["Automatic", "Fuel Efficient"],
    price: "80K",
    icon: "🛵",
  },
  {
    name: "Honda PCX 160",
    categories: ["automatic", "premium"],
    cc: "160cc",
    specs: ["Automatic", "Storage Box"],
    price: "120K",
    badge: "Popular",
    icon: "🛵",
  },
  {
    name: "Yamaha NMAX 155",
    categories: ["automatic", "premium"],
    cc: "155cc",
    specs: ["ABS Brakes", "Keyless"],
    price: "130K",
    badge: "Best Value",
    icon: "🏍️",
  },
  {
    name: "Honda ADV 160",
    categories: ["adventure", "premium"],
    cc: "160cc",
    specs: ["Adventure", "Smart Key"],
    price: "150K",
    icon: "🏍️",
  },
  {
    name: "Yamaha Aerox 155",
    categories: ["scooter", "automatic"],
    cc: "155cc",
    specs: ["Sporty", "Lightweight"],
    price: "120K",
    icon: "🛵",
  },
  {
    name: "Honda Scoopy",
    categories: ["scooter"],
    cc: "110cc",
    specs: ["Retro Style", "Easy Ride"],
    price: "75K",
    badge: "Beginner Friendly",
    icon: "🛵",
  },
];

export const filterTabs = [
  { id: "all", label: "All Bikes" },
  { id: "scooter", label: "Scooters" },
  { id: "automatic", label: "Automatic" },
  { id: "premium", label: "Premium" },
  { id: "adventure", label: "Adventure" },
] as const;

export const deliveryZones = [
  { name: "Canggu / Seminyak / Kuta", price: "Free", free: true },
  { name: "Ubud / Tegallalang", price: "50,000 IDR" },
  { name: "Uluwatu / Bukit", price: "40,000 IDR" },
  { name: "Sanur / Nusa Dua", price: "30,000 IDR" },
  { name: "Airport / Ngurah Rai", price: "60,000 IDR" },
  { name: "North Bali / Singaraja", price: "Contact Us" },
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
    title: "No License? No Problem",
    text: "We assist guests without an International Driving License navigate Bali safely and legally. Ask us about local regulations.",
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
    text: "Land at Ngurah Rai and find your scooter waiting. Seamless handover, zero waiting time.",
  },
];

export const trustItems = [
  "Confirmed within 30 minutes",
  "Free cancellation up to 24h before",
  "Pay on delivery — no card required",
  "Helmet & lock included in every rental",
  "Island-wide delivery available",
];
