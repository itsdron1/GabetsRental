import type { Tour } from "@/data/tours";

const KINTAMANI_SLUG = "kintamani-highlands";

function statValue(tour: Tour, field: "distance" | "duration" | "departure"): string {
  if (tour.type === "custom" && (field === "distance" || field === "duration")) {
    return "Flexible";
  }
  if (field === "distance") return tour.distance;
  if (field === "duration") return tour.duration;
  return tour.departureTime;
}

type TourStatsSectionProps = {
  tour: Tour;
};

export default function TourStatsSection({ tour }: TourStatsSectionProps) {
  const hideDifficulty = tour.slug === KINTAMANI_SLUG;

  const stats: [string, string][] = [
    ["Distance", statValue(tour, "distance")],
    ["Duration", statValue(tour, "duration")],
    ["Departure", statValue(tour, "departure")],
    ["Price", tour.startingPrice],
  ];
  if (!hideDifficulty) {
    stats.splice(3, 0, ["Difficulty", tour.difficulty]);
  }

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-6">Tour Information</h2>
        <dl
          className={`grid grid-cols-2 gap-4 rounded-2xl border border-border bg-glass p-5 md:p-6 ${
            hideDifficulty ? "md:grid-cols-4" : "md:grid-cols-5"
          }`}
        >
          {stats.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.65rem] font-semibold tracking-widest text-muted uppercase">
                {label}
              </dt>
              <dd className="mt-1 font-head text-sm font-bold text-cream md:text-base">{value}</dd>
            </div>
          ))}
        </dl>
        {tour.priceNote && <p className="mt-4 text-sm text-gold">{tour.priceNote}</p>}
      </div>
    </section>
  );
}
