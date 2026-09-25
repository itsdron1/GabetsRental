import { getTranslations } from "next-intl/server";
import type { Tour } from "@/data/tours";

type TourDescriptionSectionProps = {
  tour: Tour;
};

export default async function TourDescriptionSection({ tour }: TourDescriptionSectionProps) {
  const t = await getTranslations("tours.ui");

  return (
    <section className="bg-charcoal py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-6">{t("description")}</h2>
        <div className="max-w-[72ch] space-y-4 text-sm leading-[1.75] text-muted md:text-base">
          {tour.description.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
