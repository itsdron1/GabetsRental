import dynamic from "next/dynamic";
import type { Tour } from "@/data/tours";
import { getRelatedTours } from "@/lib/tours";
import TourBookingSection from "@/components/tours/TourBookingSection";
import TourCard from "@/components/tours/TourCard";
import TourDescriptionSection from "@/components/tours/TourDescriptionSection";

const TourGallerySection = dynamic(
  () => import("@/components/tours/TourGallerySection"),
  { loading: () => <div className="section-deferred min-h-[320px] bg-surface" aria-hidden /> },
);
import TourInformationSection from "@/components/tours/TourInformationSection";
import TourPlacesSection from "@/components/tours/TourPlacesSection";
import TourRequirementsSection from "@/components/tours/TourRequirementsSection";
import TourRouteSection from "@/components/tours/TourRouteSection";
import TourStatsSection from "@/components/tours/TourStatsSection";

type TourDetailBodyProps = {
  tour: Tour;
};

export default function TourDetailBody({ tour }: TourDetailBodyProps) {
  const related = getRelatedTours(tour.relatedSlugs).slice(0, 3);

  return (
    <>
      <TourStatsSection tour={tour} />
      <TourRouteSection tour={tour} />
      <TourDescriptionSection tour={tour} />
      <TourPlacesSection places={tour.placesToVisit} />
      <TourInformationSection included={tour.included} notIncluded={tour.notIncluded} />
      <TourRequirementsSection
        safetyRequirements={tour.safetyRequirements}
        riderRequirements={tour.riderRequirements}
      />
      <section className="bg-surface py-16 md:py-20">
        <div className="section-inner">
          <h2 className="section-title mb-8">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {tour.faq.map((item) => (
              <details key={item.q} className="rounded-xl border border-border bg-glass px-5 py-4">
                <summary className="cursor-pointer list-none font-head text-base font-bold text-cream">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-[#070b10] py-16 md:py-20">
          <div className="section-inner">
            <h2 className="section-title mb-8">Related Tours</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedTour, index) => (
                <TourCard key={relatedTour.slug} tour={relatedTour} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
      {tour.slug !== "custom-tour" && <TourGallerySection images={tour.gallery} />}
      <TourBookingSection title={tour.title} slug={tour.slug} />
    </>
  );
}
