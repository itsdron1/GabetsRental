import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/data/tours";
import { buildTourBookingUrl } from "@/lib/whatsapp";
import { difficultyClass, tourTypeLabel } from "@/lib/tours";
import { IconClock, IconDistance } from "@/components/tours/icons";

type TourDetailHeroProps = {
  tour: Tour;
};

export default function TourDetailHero({ tour }: TourDetailHeroProps) {
  const bookingUrl = buildTourBookingUrl(tour.title, tour.slug);
  const isKintamani = tour.slug === "kintamani-highlands";
  const heroAlt =
    tour.slug === "kintamani-highlands"
      ? "Balinese temple at sunrise on Lake Bratan — Kintamani Highlands motorcycle tour Bali"
      : tour.slug === "tanah-lot-bedugul-explorer"
        ? "Jatiluwih Rice Terraces UNESCO landscape at sunrise — Tanah Lot Bedugul Explorer Bali"
        : tour.slug === "denpasar-tanah-lot-nusa-dua"
          ? "Balinese temple on coastal cliffs overlooking the ocean — Denpasar Tanah Lot Nusa Dua tour"
          : tour.title;

  return (
    <section className="relative min-h-[52vh] overflow-hidden border-b border-border md:min-h-[58vh]">
      <Image
        src={tour.heroImage}
        alt={heroAlt}
        title={heroAlt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className={
          isKintamani
            ? "tour-detail-hero-media-kintamani"
            : "object-cover object-center"
        }
      />
      <div
        className={`absolute inset-0 ${isKintamani ? "kintamani-detail-hero-overlay" : "hero-overlay"}`}
        aria-hidden
      />
      <div className="relative z-[2] flex min-h-[52vh] flex-col justify-end md:min-h-[58vh]">
        <div className="section-inner w-full pb-12 pt-28 md:pb-16 md:pt-32">
          <span className="mb-4 inline-flex rounded bg-brand-tint px-2.5 py-1 text-[0.62rem] font-bold tracking-widest text-cream uppercase">
            {tourTypeLabel(tour.type)}
          </span>
          <h1 className="font-head text-[clamp(2rem,6vw,3.75rem)] font-extrabold tracking-tight text-cream">
            {tour.title}
          </h1>
          <p className="mt-3 max-w-[52ch] text-base text-cream/85 md:text-lg">{tour.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-cream/80">
              <IconDistance />
              {tour.distance}
            </span>
            <span className="inline-flex items-center gap-1.5 text-cream/80">
              <IconClock />
              {tour.duration}
            </span>
            {!isKintamani && (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide uppercase ${difficultyClass(tour.difficulty)}`}
              >
                {tour.difficulty}
              </span>
            )}
            <span className="font-head text-lg font-extrabold text-gold">{tour.startingPrice}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
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
