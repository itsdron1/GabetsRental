import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Tour } from "@/data/tours";
import { difficultyClass } from "@/lib/tours";
import { IconClock, IconDistance } from "@/components/tours/icons";
import { Link } from "@/i18n/navigation";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import { buildWhatsAppMessageUrl, publicUrl } from "@/lib/whatsapp";

type TourDetailHeroProps = {
  tour: Tour;
};

export default async function TourDetailHero({ tour }: TourDetailHeroProps) {
  const t = await getTranslations("tours.ui");
  const tCommon = await getTranslations("common");
  const localeValue = await getLocale();
  const locale = isAppLocale(localeValue) ? localeValue : "en";
  const bookingUrl = buildWhatsAppMessageUrl(
    tCommon("tourWhatsapp", {
      title: tour.title,
      url: publicUrl(localizedPath(locale, `/tour-packages/${tour.slug}`)),
    }),
  );
  const isKintamani = tour.slug === "kintamani-highlands";
  const heroAlt = ["kintamani-highlands", "tanah-lot-bedugul-explorer", "denpasar-tanah-lot-nusa-dua"].includes(
    tour.slug,
  )
    ? String(t.raw(`heroAlts.${tour.slug}` as never))
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
          isKintamani ? "tour-detail-hero-media-kintamani" : "object-cover object-center"
        }
      />
      <div
        className={`absolute inset-0 ${isKintamani ? "kintamani-detail-hero-overlay" : "hero-overlay"}`}
        aria-hidden
      />
      <div className="relative z-[2] flex min-h-[52vh] flex-col justify-end md:min-h-[58vh]">
        <div className="section-inner w-full pb-12 pt-28 md:pb-16 md:pt-32">
          <span className="mb-4 inline-flex rounded bg-brand-tint px-2.5 py-1 text-[0.62rem] font-bold tracking-widest text-cream uppercase">
            {t(`types.${tour.type}`)}
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
                {t(`difficulties.${tour.difficulty}`)}
              </span>
            )}
            <span className="font-head text-lg font-extrabold text-gold">{tour.startingPrice}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t("bookWhatsapp")}
            </a>
            <Link href="/tour-packages" className="btn-ghost">
              {t("viewAll")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
