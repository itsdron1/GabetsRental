import fleetFile from "@/data/fleet.json";
import type { Bike, BikeCategory, CatalogVehicle } from "@/lib/data";

export type BikeSpecs = {
  engineType: string;
  displacementCc: number;
  powerHp: number;
  powerRpm: number;
  torqueNm: number;
  torqueRpm: number;
  weightKg: number;
  seatHeightMm: number;
  transmission: string;
  fuelCapacityL: number;
  abs: boolean | null;
};

export type BikePricingTier = {
  minDays: number;
  maxDays: number | null;
  pricePerDay: number;
};

export type BikeMonthlyPerk = "helmetsRaincoat";

export type BikePricing = {
  day: number;
  tiers: BikePricingTier[];
  week: number | null;
  month: number | null;
  /** Refundable security deposit, IDR */
  deposit: number | null;
  /** Gift included with a 30-day rental */
  monthlyPerk: BikeMonthlyPerk | null;
};

export type BikeDifficulty = 1 | 2 | 3 | 4;

export type BikeAbsNote = "frontWheelOnly";
export type BikeEngineNote = "boredOut";

type FleetSpecs = {
  engineType: string;
  displacementCc: number;
  powerHp: number;
  powerRpm: number;
  torqueNm: number;
  torqueRpm: number;
  weightKg: number;
  seatHeightMm: number;
  transmission: string;
  fuelCapacityL: number;
  abs: boolean | null;
};

type FleetPricingTier = {
  minDays: number;
  maxDays: number | null;
  pricePerDay: number;
};

type FleetPricing = {
  day: number;
  tiers?: FleetPricingTier[];
  week?: number | null;
  month?: number | null;
  deposit?: number | null;
  monthlyPerk?: string | null;
};

type FleetBikeRecord = {
  id: string;
  name: string;
  category: BikeCategory;
  badge?: string;
  isNew?: boolean;
  image?: string;
  specs: FleetSpecs;
  difficulty: number;
  pricing: FleetPricing;
  needsVerification?: boolean;
  absNote?: string;
  engineNote?: string;
  highlights?: string[];
  riderNote?: string;
};

type FleetFile = {
  _meta?: { _pricingModel?: { legacyTierPricing?: string[] } };
  bikes: FleetBikeRecord[];
};

/**
 * Fleet JSON uses shorter ids than the live catalog (which matches image filenames).
 * Canonical site id stays on the left so `/bikes/{id}.webp` keeps working.
 */
const SITE_ID_BY_FLEET_ID: Record<string, string> = {
  "honda-cbr250rr-spqs": "honda-cbr250rr-abs-spqs",
  "kawasaki-w175-gloss-abs-fi": "kawasaki-w175-black-gloss",
  "qjmotor-srv-600": "qjmotor-srv-600-v-abs-v4",
  "qjmotor-tourino-250-dx": "qjmotor-tourino-250-dx-abs",
  "tvs-ronin-225": "tvs-ronin-triumph-style-225",
  "yamaha-r15m": "yamaha-r15m-abs-qs",
  "yamaha-r25-black-abs": "yamaha-r25-black",
  "yamaha-r3-320": "yamaha-r3-320-blue",
};

const INSERT_AFTER: Record<string, string> = {
  "harley-davidson-fat-boy": "harley-street-500",
  "kawasaki-ninja-250": "kawasaki-ninja-250-abs-custom",
  "ktm-250-duke": "kawasaki-ninja-250",
  "honda-pcx-160": "yamaha-nmax-155",
  "qj-motor-srv-250-at": "kawasaki-w175-black",
  "yamaha-nmax-155": "vespa-primavera-s",
};

/** dataIssuesFound: Byson is a street naked, not enduro. JSON still lists enduro. */
const CATEGORY_FIXES: Record<string, BikeCategory> = {
  "yamaha-byson-f1": "sport",
};

const NEW_BIKE_TAGLINES: Record<string, string> = {
  "harley-davidson-fat-boy": "Harley-Davidson Fat Boy",
  "kawasaki-ninja-250": "Twin-cylinder sportbike",
  "ktm-250-duke": "Agile street naked",
  "honda-pcx-160": "Premium comfort scooter",
  "qj-motor-srv-250-at": "QJ Motor SRV 250 AT",
  "yamaha-nmax-155": "Yamaha NMAX Turbo",
};

function asFleetFile(value: unknown): FleetFile {
  if (!value || typeof value !== "object" || !("bikes" in value)) {
    throw new Error("Invalid fleet.json");
  }
  const bikes = (value as { bikes: unknown }).bikes;
  if (!Array.isArray(bikes)) {
    throw new Error("Invalid fleet.json bikes");
  }
  return value as FleetFile;
}

function siteIdFromFleetId(fleetId: string): string {
  return SITE_ID_BY_FLEET_ID[fleetId] ?? fleetId;
}

function asDifficulty(value: number): BikeDifficulty {
  if (value === 1 || value === 2 || value === 3 || value === 4) return value;
  throw new Error(`Invalid difficulty: ${value}`);
}

function mapAbsNote(note: string | undefined): BikeAbsNote | undefined {
  if (!note) return undefined;
  if (/front wheel only/i.test(note)) return "frontWheelOnly";
  return undefined;
}

function mapEngineNote(note: string | undefined): BikeEngineNote | undefined {
  if (!note) return undefined;
  if (/bored out/i.test(note)) return "boredOut";
  return undefined;
}

function mapMonthlyPerk(value: string | null | undefined): BikeMonthlyPerk | null {
  return value === "helmetsRaincoat" ? value : null;
}

function mapPricing(pricing: FleetPricing): BikePricing {
  return {
    day: pricing.day,
    tiers: (pricing.tiers ?? []).map((tier) => ({
      minDays: tier.minDays,
      maxDays: tier.maxDays,
      pricePerDay: tier.pricePerDay,
    })),
    week: pricing.week ?? null,
    month: pricing.month ?? null,
    deposit: pricing.deposit ?? null,
    monthlyPerk: mapMonthlyPerk(pricing.monthlyPerk),
  };
}

function mapSpecs(specs: FleetSpecs): BikeSpecs {
  return {
    engineType: specs.engineType,
    displacementCc: specs.displacementCc,
    powerHp: specs.powerHp,
    powerRpm: specs.powerRpm,
    torqueNm: specs.torqueNm,
    torqueRpm: specs.torqueRpm,
    weightKg: specs.weightKg,
    seatHeightMm: specs.seatHeightMm,
    transmission: specs.transmission,
    fuelCapacityL: specs.fuelCapacityL,
    abs: specs.abs,
  };
}

function fleetFields(record: FleetBikeRecord): Pick<
  Bike,
  | "specs"
  | "difficulty"
  | "pricing"
  | "needsVerification"
  | "absNote"
  | "engineNote"
  | "highlights"
  | "hasRiderNote"
> {
  return {
    specs: mapSpecs(record.specs),
    difficulty: asDifficulty(record.difficulty),
    pricing: mapPricing(record.pricing),
    needsVerification: record.needsVerification === true,
    absNote: mapAbsNote(record.absNote),
    engineNote: mapEngineNote(record.engineNote),
    highlights: record.highlights && record.highlights.length > 0 ? record.highlights : undefined,
    hasRiderNote: Boolean(record.riderNote),
  };
}

function mapBadge(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value.toLowerCase() === "new") return "New";
  return value;
}

function newBikeFromFleet(record: FleetBikeRecord): Bike {
  const pricing = mapPricing(record.pricing);
  return {
    id: record.id,
    name: record.name,
    category: CATEGORY_FIXES[record.id] ?? record.category,
    priceIdr: pricing.day,
    image: record.image ?? `/bikes/${record.id}.webp`,
    badge: mapBadge(record.badge) ?? (record.isNew ? "New" : undefined),
    tagline: NEW_BIKE_TAGLINES[record.id] ?? record.name,
    ...fleetFields(record),
  };
}

function mergeCatalogBike(vehicle: CatalogVehicle, record: FleetBikeRecord | undefined): Bike {
  if (!record) return vehicle;
  const pricing = mapPricing(record.pricing);
  return {
    ...vehicle,
    name: record.name,
    category: CATEGORY_FIXES[vehicle.id] ?? record.category,
    priceIdr: pricing.day,
    ...fleetFields(record),
  };
}

function insertAfter(list: Bike[], bike: Bike, afterId: string): void {
  const index = list.findIndex((item) => item.id === afterId);
  if (index === -1) {
    list.push(bike);
    return;
  }
  list.splice(index + 1, 0, bike);
}

export function buildBikes(catalog: CatalogVehicle[]): Bike[] {
  const fleet = asFleetFile(fleetFile);
  const fleetBySiteId = new Map<string, FleetBikeRecord>();
  for (const record of fleet.bikes) {
    fleetBySiteId.set(siteIdFromFleetId(record.id), record);
  }

  const catalogIds = new Set(catalog.map((item) => item.id));
  const motorcycles: Bike[] = [];
  const cars: CatalogVehicle[] = [];

  for (const vehicle of catalog) {
    if (vehicle.category === "cars") {
      cars.push(vehicle);
      continue;
    }
    motorcycles.push(mergeCatalogBike(vehicle, fleetBySiteId.get(vehicle.id)));
  }

  for (const record of fleet.bikes) {
    const siteId = siteIdFromFleetId(record.id);
    if (catalogIds.has(siteId)) continue;
    const bike = newBikeFromFleet(record);
    const afterId = INSERT_AFTER[bike.id];
    if (afterId) insertAfter(motorcycles, bike, afterId);
    else motorcycles.push(bike);
  }

  return [...motorcycles, ...cars];
}

/** Standard grid: 1 day / 2–3 / 4–6 / 7–29 days per day + 30-day total, no flat week price. */
const STANDARD_TIER_RANGES: [number, number][] = [
  [2, 3],
  [4, 6],
  [7, 29],
];

export function isStandardTierGrid(pricing: BikePricing): boolean {
  return (
    pricing.month !== null &&
    pricing.week === null &&
    pricing.tiers.length === STANDARD_TIER_RANGES.length &&
    pricing.tiers.every(
      (tier, i) =>
        tier.minDays === STANDARD_TIER_RANGES[i][0] && tier.maxDays === STANDARD_TIER_RANGES[i][1],
    )
  );
}

/** Bikes that keep the old line-by-line price list (listed in fleet.json _meta). */
const LEGACY_PRICE_LIST = new Set(
  asFleetFile(fleetFile)._meta?._pricingModel?.legacyTierPricing ?? [],
);

/**
 * Price table (1 day / tiers / 30 days total) is used when the monthly total is known
 * and there is no flat weekly price; legacy bikes keep their old list.
 */
export function hasPriceTable(bikeId: string, pricing: BikePricing): boolean {
  return pricing.month !== null && pricing.week === null && !LEGACY_PRICE_LIST.has(bikeId);
}

export function isMotorcycle(bike: Bike): bike is Bike & {
  specs: BikeSpecs;
  difficulty: BikeDifficulty;
  pricing: BikePricing;
} {
  return bike.category !== "cars" && bike.specs !== undefined && bike.pricing !== undefined && bike.difficulty !== undefined;
}
