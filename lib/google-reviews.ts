/**
 * Google Business reviews shown in the home page "Reviews" section.
 *
 * Data is read through `getGoogleReviews()` only, so the source can later be
 * swapped (e.g. a server-side Google Places API fetch with `revalidate`, using
 * GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID from env) without touching the UI.
 *
 * Anything marked `isPlaceholder: true` is NOT rendered into JSON-LD, so fake
 * data never ends up in structured data. Set it to false (or remove it) once
 * the values are copied from the real Google Business profile.
 */

export type GoogleReview = {
  id: string;
  authorName: string;
  /** Optional profile photo URL; falls back to an initial avatar. */
  authorPhotoUrl?: string;
  /** 1–5 */
  rating: number;
  /** ISO date, e.g. "2026-09-21" */
  date: string;
  /** Original review text — shown as written, not translated. */
  text: string;
  isPlaceholder?: boolean;
};

export type GoogleReviewsData = {
  /** Average rating, e.g. 4.9 */
  rating: number;
  /** Total number of reviews on the Google profile */
  totalCount: number;
  reviews: GoogleReview[];
  isPlaceholder?: boolean;
};

// TODO: replace with real Google rating and review count from the Google Business profile
export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = 0;
const SUMMARY_IS_PLACEHOLDER = true;

// TODO: replace with real Google reviews (copy author name, rating, date and text as-is)
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "placeholder-1",
    authorName: "Placeholder Reviewer A",
    rating: 5,
    date: "2026-09-01",
    text: "Placeholder review text. Replace with a real review copied from the Google Business profile.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    authorName: "Placeholder Reviewer B",
    rating: 5,
    date: "2026-08-15",
    text: "Placeholder review text. Replace with a real review copied from the Google Business profile. This one is intentionally longer to preview how the card behaves with a long review: the text is clamped to a few lines and a “Read more” button expands it in place.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    authorName: "Placeholder Reviewer C",
    rating: 5,
    date: "2026-07-30",
    text: "Placeholder review text. Replace with a real review copied from the Google Business profile.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-4",
    authorName: "Placeholder Reviewer D",
    rating: 5,
    date: "2026-07-12",
    text: "Placeholder review text. Replace with a real review copied from the Google Business profile.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-5",
    authorName: "Placeholder Reviewer E",
    rating: 5,
    date: "2026-06-20",
    text: "Placeholder review text. Replace with a real review copied from the Google Business profile.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-6",
    authorName: "Placeholder Reviewer F",
    rating: 5,
    date: "2026-06-02",
    text: "Placeholder review text. Replace with a real review copied from the Google Business profile.",
    isPlaceholder: true,
  },
];

/** Single entry point for review data — replace the body to switch the source. */
export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  return {
    rating: GOOGLE_RATING,
    totalCount: GOOGLE_REVIEW_COUNT,
    reviews: GOOGLE_REVIEWS,
    isPlaceholder: SUMMARY_IS_PLACEHOLDER,
  };
}
