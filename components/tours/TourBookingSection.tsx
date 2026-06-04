import Link from "next/link";
import { buildTourBookingUrl } from "@/lib/whatsapp";

type TourBookingSectionProps = {
  title: string;
  slug: string;
};

export default function TourBookingSection({ title, slug }: TourBookingSectionProps) {
  const bookingUrl = buildTourBookingUrl(title, slug);

  return (
    <section className="bg-[#070b10] py-16 pb-28 md:py-20 md:pb-20">
      <div className="section-inner">
        <div className="rounded-2xl border border-brand-tint/40 bg-[rgba(11,61,46,0.2)] p-8 text-center md:p-10">
          <h2 className="font-head text-2xl font-extrabold text-cream md:text-3xl">
            Ready to Ride?
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-cream/80 md:text-base">
            Book {title} via WhatsApp — fast confirmation, flexible dates, and premium big bikes
            with a local guide.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book Now via WhatsApp
            </a>
            <Link href="/tour-packages" className="btn-ghost">
              View All Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
