import Image from "next/image";
import type { Bike } from "@/lib/data";
import { formatBikePrice, formatBikePriceFull } from "@/lib/data";
import { getBikeImagePath } from "@/lib/bike-images";
import { scrollToId } from "@/lib/scroll";

type FleetCardProps = {
  bike: Bike;
};

const categoryLabels: Record<Bike["category"], string> = {
  cruiser: "Cruiser",
  sport: "Sport",
  adventure: "Adventure / Touring",
  enduro: "Enduro",
  scooter: "Scooter",
};

export default function FleetCard({ bike }: FleetCardProps) {
  return (
    <article className="fleet-card group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="fleet-card-media relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-2xl bg-[#0f1419]">
        <Image
          src={getBikeImagePath(bike)}
          alt={bike.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          loading="lazy"
          className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />
        {bike.badge && (
          <span className="absolute top-3.5 left-3.5 z-10 rounded bg-brand-tint px-2.5 py-1 text-[0.62rem] font-bold tracking-widest text-cream uppercase shadow-[0_4px_20px_rgba(11,61,46,0.5)]">
            {bike.badge}
          </span>
        )}
        <span className="absolute top-3.5 right-3.5 z-10 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[0.62rem] font-medium tracking-widest text-cream/80 uppercase backdrop-blur-md">
          {categoryLabels[bike.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 md:px-6 md:pb-6">
        <h3 className="font-head text-[1.05rem] leading-snug font-bold text-cream md:text-lg">
          {bike.name}
        </h3>
        <p className="mt-1.5 text-xs text-muted">{bike.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/80 pt-4">
          <div className="min-w-0">
            <span className="font-head text-xl leading-none font-extrabold text-gold md:text-2xl">
              {formatBikePrice(bike.priceIdr)}
            </span>
            <span className="mt-0.5 block text-[0.68rem] tracking-wide text-muted">
              IDR {formatBikePriceFull(bike.priceIdr)} / day
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollToId("booking")}
            className="fleet-card-cta shrink-0 rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold tracking-wide text-cream uppercase"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}
