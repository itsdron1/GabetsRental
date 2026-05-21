import type { Bike } from "@/lib/data";

const EXT = ".png";

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Tokens from bike id + name for partial filename matching */
function bikeTokens(bike: Bike): string[] {
  const fromId = normalizeSlug(bike.id).split("-").filter(Boolean);
  const fromName = normalizeSlug(bike.name).split("-").filter(Boolean);
  return [...new Set([...fromId, ...fromName])];
}

/**
 * Score how well a filename slug matches a bike (higher = better).
 * e.g. harley-heritage → Harley-Davidson Heritage Softail Classic
 */
export function matchBikeToFilenameSlug(bike: Bike, fileSlug: string): number {
  const normalizedFile = normalizeSlug(fileSlug);
  const bikeSlug = normalizeSlug(bike.id);
  if (normalizedFile === bikeSlug) return 1000;
  if (bikeSlug.includes(normalizedFile) || normalizedFile.includes(bikeSlug)) {
    return 500 + normalizedFile.length;
  }

  const tokens = bikeTokens(bike);
  let score = 0;
  for (const token of tokens) {
    if (token.length < 3) continue;
    if (normalizedFile.includes(token)) score += token.length;
  }
  return score;
}

/** Resolved path under /public/bikes — filename slug matches bike id by default */
export function getBikeImagePath(bike: Bike): string {
  return `/bikes/${bike.id}${EXT}`;
}
