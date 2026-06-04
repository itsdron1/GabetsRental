import { IconCheck, IconX } from "@/components/tours/icons";

const INCLUDED_LABELS: Record<string, string> = {
  Motorcycle: "Premium Motorcycle",
  Helmet: "Helmet & Safety Gear",
  Fuel: "Fuel Included",
  "Local guide": "Professional Tour Guide",
  "Drinking water": "Refreshments",
  "Basic insurance": "Insurance Coverage",
  "Parking fees": "Parking Fees",
  "Professional guide": "Professional Tour Guide",
  Sarong: "Temple Sarong",
};

function displayLabel(item: string): string {
  return INCLUDED_LABELS[item] ?? item;
}

type TourInformationSectionProps = {
  included: string[];
  notIncluded: string[];
};

export default function TourInformationSection({
  included,
  notIncluded,
}: TourInformationSectionProps) {
  return (
    <section className="bg-surface py-12 md:py-14">
      <div className="section-inner">
        <h2 className="section-title mb-5 text-[clamp(1.5rem,4vw,2.25rem)]">
          Included &amp; Not Included
        </h2>
        <div className="rounded-2xl border border-border bg-glass p-5 md:p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-7">
            <div className="min-w-0 md:pr-2">
              <h3 className="font-head text-sm font-bold tracking-wide text-gold uppercase">
                Included
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconCheck className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span className="min-w-0 flex-1 text-sm leading-[1.7] text-cream/90">
                      {displayLabel(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 border-t border-border pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-7">
              <h3 className="font-head text-sm font-bold tracking-wide text-amber uppercase">
                Not Included
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconX className="mt-1 h-4 w-4 shrink-0 text-amber" />
                    <span className="min-w-0 flex-1 text-sm leading-[1.7] text-cream/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
