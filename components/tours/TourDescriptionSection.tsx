import type { Tour } from "@/data/tours";

type TourDescriptionSectionProps = {
  tour: Tour;
};

export default function TourDescriptionSection({ tour }: TourDescriptionSectionProps) {
  return (
    <section className="bg-[#070b10] py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-6">Detailed Tour Description</h2>
        <div className="max-w-[72ch] space-y-4 text-sm leading-[1.75] text-muted md:text-base">
          {tour.description.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
