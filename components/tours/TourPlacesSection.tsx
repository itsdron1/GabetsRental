import type { TourPlace } from "@/data/tours";

type TourPlacesSectionProps = {
  places: TourPlace[];
};

export default function TourPlacesSection({ places }: TourPlacesSectionProps) {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-8">Places You&apos;ll Visit</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {places.map((place) => (
            <li
              key={place.title}
              className="rounded-xl border border-border bg-glass p-5 md:p-6"
            >
              <h3 className="font-head text-base font-bold text-cream md:text-lg">
                {place.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.7] text-cream/80">{place.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
