import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/data/tours";
import {
  difficultyClass,
  routePreviewStops,
  tourTypeLabel,
} from "@/lib/tours";
import { IconClock, IconDistance } from "@/components/tours/icons";

type TourCardProps = {
  tour: Tour;
  index: number;
};

export default function TourCard({ tour, index }: TourCardProps) {
  const stops = routePreviewStops(tour, 3);
  const routePreview =
    stops.length > 0 ? `${stops.join(" → ")}${tour.routes[0]?.stops.length > 3 ? " → …" : ""}` : "";
  const multiRoute = tour.routes.length > 1 && tour.routes.some((r) => r.label);
  const isKintamani = tour.slug === "kintamani-highlands";
  const cardAlt = `${tour.title} — motorcycle tour Bali, guided big bike adventure`;

  return (
    <article
      className="fleet-card group flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0f1419]">
        <Image
          src={tour.cardImage}
          alt={cardAlt}
          title={cardAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            isKintamani
              ? "tour-detail-hero-media-kintamani"
              : "object-center"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />
        <span className="absolute top-3.5 left-3.5 z-10 rounded bg-brand-tint px-2.5 py-1 text-[0.62rem] font-bold tracking-widest text-cream uppercase">
          {tourTypeLabel(tour.type)}
        </span>
        {multiRoute && (
          <span className="absolute top-3.5 right-3.5 z-10 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[0.62rem] font-medium tracking-widest text-cream/80 uppercase">
            2 routes
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 md:px-6 md:pb-6">
        <h3 className="font-head text-xl font-bold text-cream">{tour.title}</h3>
        <p className="mt-2 text-sm text-muted">{tour.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-black/30 px-2.5 py-1 text-[0.68rem] text-cream/75">
            <IconDistance />
            {tour.distance}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-black/30 px-2.5 py-1 text-[0.68rem] text-cream/75">
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
        </div>

        {routePreview && (
          <p className="mt-3 text-xs leading-relaxed text-cream/60">{routePreview}</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/80 pt-4">
          <div className="min-w-0">
            <span className="font-head text-lg font-extrabold text-gold">{tour.startingPrice}</span>
            {tour.priceNote && (
              <span className="mt-0.5 block text-[0.65rem] text-muted">{tour.priceNote}</span>
            )}
          </div>
          <Link
            href={`/tour-packages/${tour.slug}`}
            className="fleet-card-cta shrink-0 rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold tracking-wide text-cream uppercase"
          >
            Explore Tour
          </Link>
        </div>
      </div>
    </article>
  );
}
