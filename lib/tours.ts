import { tours, type Tour } from "@/data/tours";

export function getAllTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getRelatedTours(slugs: string[]): Tour[] {
  return slugs
    .map((slug) => getTourBySlug(slug))
    .filter((t): t is Tour => Boolean(t));
}

export function parsePriceIdr(startingPrice: string): number {
  const digits = startingPrice.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function tourTypeLabel(type: Tour["type"]): string {
  switch (type) {
    case "half-day":
      return "Half Day";
    case "full-day":
      return "Full Day";
    case "custom":
      return "Custom";
  }
}

export function difficultyClass(difficulty: Tour["difficulty"]): string {
  switch (difficulty) {
    case "Easy":
      return "border-gold/40 bg-gold-soft text-gold";
    case "Moderate":
      return "border-amber/40 bg-amber/10 text-amber";
    case "Challenging":
      return "border-amber/70 bg-amber/20 text-amber";
    case "Flexible":
      return "border-border bg-glass text-muted";
  }
}

export function routePreviewStops(tour: Tour, max = 3): string[] {
  const route = tour.routes[0];
  if (!route) return [];
  return route.stops.slice(0, max).map((s) => s.name);
}

export function allItineraryStops(tour: Tour): string[] {
  return tour.routes.flatMap((r) => r.stops.map((s) => s.name));
}
