"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Bike } from "@/lib/data";
import { useBooking } from "@/components/BookingContext";
import FleetSpecs from "@/components/FleetSpecs";
import { getBikeImagePath } from "@/lib/bike-images";
import { formatBikePriceCompact, formatIdrNumber } from "@/lib/format";
import { trackBookClick } from "@/lib/analytics";
import type { AppLocale } from "@/i18n/routing";

type FleetCardProps = {
  bike: Bike;
};

function bikeImageAlt(bike: Bike, t: ReturnType<typeof useTranslations<"seo">>) {
  const name = bike.name;
  if (bike.category === "cars") return t("bikeAltCar", { name });
  if (name.includes("Harley")) return t("bikeAltHarley", { name });
  if (name.includes("Yamaha YZF-R6")) return t("bikeAltR6");
  if (name.includes("Kawasaki Z900")) return t("bikeAltZ900");
  if (name.includes("ZX-25R") || name.includes("Zx25")) return t("bikeAltZx25");
  if (name.includes("Ducati")) return t("bikeAltDucati");
  if (name.includes("BMW")) return t("bikeAltBmw", { name });
  if (bike.category === "sport") return t("bikeAltSport", { name });
  if (bike.category === "adventure") return t("bikeAltAdventure", { name });
  if (bike.category === "cruiser") return t("bikeAltCruiser", { name });
  return t("bikeAltDefault", { name });
}

export default function FleetCard({ bike }: FleetCardProps) {
  const t = useTranslations("fleet");
  const tSeo = useTranslations("seo");
  const locale = useLocale() as AppLocale;
  const imageAlt = bikeImageAlt(bike, tSeo);
  const { openBooking } = useBooking();
  const tagline = String(t.raw(`taglines.${bike.id}` as never) ?? bike.tagline);
  const badge = bike.badge ? String(t.raw(`badges.${bike.badge}` as never) ?? bike.badge) : null;
  const showTagline = Boolean(tagline) && tagline !== bike.name;

  return (
    <article className="fleet-card group flex h-full flex-col rounded-2xl">
      <div className="fleet-card-media relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-2xl bg-[#0f1419]">
        <Image
          src={getBikeImagePath(bike)}
          alt={imageAlt}
          title={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
          loading="lazy"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />
        {badge && (
          <span className="absolute top-3.5 left-3.5 z-10 rounded bg-brand-tint px-2.5 py-1 text-[0.62rem] font-bold tracking-widest text-cream uppercase shadow-[0_4px_20px_rgba(11,61,46,0.5)]">
            {badge}
          </span>
        )}
        <span className="absolute top-3.5 right-3.5 z-10 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[0.62rem] font-medium tracking-widest text-cream/80 uppercase">
          {String(t.raw(`filters.${bike.category}` as never))}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 md:px-6 md:pb-6">
        <h3 className="font-head text-[1.05rem] leading-snug font-bold text-cream md:text-lg">
          {bike.name}
        </h3>
        {showTagline ? <p className="mt-1.5 text-xs text-muted">{tagline}</p> : null}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/80 pt-4">
          <div className="min-w-0">
            <span className="font-head text-xl leading-none font-extrabold text-gold md:text-2xl">
              {formatBikePriceCompact(bike.priceIdr)}
            </span>
            <span className="mt-0.5 block text-[0.68rem] tracking-wide text-muted">
              {t("perDay", { price: formatIdrNumber(bike.priceIdr, locale) })}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              trackBookClick(bike.name);
              openBooking({ bikeName: bike.name, trigger: e.currentTarget });
            }}
            className="fleet-card-cta shrink-0 rounded-lg px-4 py-2.5 text-[0.75rem] font-semibold tracking-wide text-cream uppercase"
          >
            {t("book")}
          </button>
        </div>
        <FleetSpecs bike={bike} />
      </div>
    </article>
  );
}
