import { getLocale, getTranslations } from "next-intl/server";
import type { Tour } from "@/data/tours";
import { formatTourFromPrice } from "@/lib/format";
import { isAppLocale } from "@/i18n/routing";

const KINTAMANI_SLUG = "kintamani-highlands";

type TourStatsSectionProps = {
  tour: Tour;
};

export default async function TourStatsSection({ tour }: TourStatsSectionProps) {
  const t = await getTranslations("tours.ui");
  const localeValue = await getLocale();
  const locale = isAppLocale(localeValue) ? localeValue : "en";
  const hideDifficulty = tour.slug === KINTAMANI_SLUG;

  const statValue = (field: "distance" | "duration" | "departure"): string => {
    if (tour.type === "custom" && (field === "distance" || field === "duration")) {
      return t("flexible");
    }
    if (field === "distance") return tour.distance;
    if (field === "duration") return tour.duration;
    return tour.departureTime;
  };

  const stats: [string, string][] = [
    [t("distance"), statValue("distance")],
    [t("duration"), statValue("duration")],
    [t("departure"), statValue("departure")],
    [t("price"), t("fromPrice", { price: formatTourFromPrice(tour.startingPrice, locale) })],
  ];
  if (!hideDifficulty) {
    stats.splice(3, 0, [t("difficulty"), t(`difficulties.${tour.difficulty}`)]);
  }

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-6">{t("info")}</h2>
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
        {tour.priceNote && <p className="mt-4 text-sm text-teal">{tour.priceNote}</p>}
      </div>
    </section>
  );
}
