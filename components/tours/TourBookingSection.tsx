import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import { buildWhatsAppMessageUrl, publicUrl } from "@/lib/whatsapp";

type TourBookingSectionProps = {
  title: string;
  slug: string;
};

export default async function TourBookingSection({ title, slug }: TourBookingSectionProps) {
  const t = await getTranslations("tours.ui");
  const tCommon = await getTranslations("common");
  const localeValue = await getLocale();
  const locale = isAppLocale(localeValue) ? localeValue : "en";
  const bookingUrl = buildWhatsAppMessageUrl(
    tCommon("tourWhatsapp", {
      title,
      url: publicUrl(localizedPath(locale, `/tour-packages/${slug}`)),
    }),
  );

  return (
    <section className="bg-charcoal py-16 pb-28 md:py-20 md:pb-20">
      <div className="section-inner">
        <div className="rounded-2xl border border-brand-tint/40 bg-forest/20 p-8 text-center md:p-10">
          <h2 className="font-head text-2xl font-extrabold text-cream md:text-3xl">
            {t("readyTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-cream/80 md:text-base">
            {t("readyBody", { title })}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
