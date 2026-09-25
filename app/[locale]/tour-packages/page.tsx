import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/tours/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "@/i18n/navigation";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import { localizeTours } from "@/lib/localized-tour";
import { getAllTours } from "@/lib/tours";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { breadcrumbJsonLd, buildPageMetadata, faqPageJsonLd } from "@/lib/seo";

const TourPackagesHeroImage = dynamic(
  () => import("@/components/TourPackagesHeroImage"),
  {
    loading: () => (
      <div
        className="tour-hero-frame aspect-[4/3] rounded-2xl border border-border bg-surface-1 md:aspect-[16/11]"
        aria-hidden
      />
    ),
  },
);

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  const t = await getTranslations({ locale: safeLocale, namespace: "seo" });

  return {
    ...buildPageMetadata({
      title: t("toursTitle"),
      description: t("toursDescription"),
      path: localizedPath(safeLocale, "/tour-packages"),
      pathname: "/tour-packages",
      locale: safeLocale,
      image: "/tour-packages/bali-tours-map.png",
      imageAlt: t("toursOgAlt"),
    }),
    title: { absolute: t("toursTitle") },
  };
}

export default async function TourPackagesPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  setRequestLocale(safeLocale);

  const t = await getTranslations("tours.index");
  const tTours = await getTranslations("tours");
  const tSeo = await getTranslations("seo");
  const tCommon = await getTranslations("common");
  const tours = localizeTours(getAllTours(), tTours);
  const faqs = t.raw("faqs") as { q: string; a: string }[];
  const whatsappUrl = buildWhatsAppMessageUrl(tCommon("whatsappPrefill"));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: tSeo("breadcrumbHome"), path: localizedPath(safeLocale, "/") },
            { name: tSeo("breadcrumbTours"), path: localizedPath(safeLocale, "/tour-packages") },
          ]),
          faqPageJsonLd(faqs),
        ]}
      />
      <Nav />
      <main className="relative z-[1] bg-surface pt-28 md:pt-32">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-1 to-surface">
          <div className="section-inner relative grid items-center gap-12 py-18 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <div className="section-tag">{t("tag")}</div>
              <h1 className="section-title max-w-[15ch]">{t("title")}</h1>
              <p className="section-subtitle mt-6 max-w-[58ch]">
                {t("subtitleBefore")}{" "}
                <Link href="/#fleet" className="text-teal transition-colors hover:underline">
                  {t("fleetLink")}
                </Link>{" "}
                {t("subtitleAfter")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {t("bookWhatsapp")}
                </a>
                <Link href="/#fleet" className="btn-ghost">
                  {t("viewFleet")}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <TourPackagesHeroImage />
            </Reveal>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="section-inner">
            <Reveal className="mb-10">
              <h2 className="section-title">{t("featuredTitle")}</h2>
              <p className="section-subtitle">{t("featuredSubtitle")}</p>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {tours.map((tour, index) => (
                <TourCard key={tour.slug} tour={tour} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal py-20">
          <div className="section-inner grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="why-card rounded-2xl border border-border bg-glass p-6">
                <h3 className="font-head text-lg font-bold text-cream">{t("includedTitle")}</h3>
                <p className="mt-2 text-sm text-muted">{t("includedText")}</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="why-card rounded-2xl border border-border bg-glass p-6">
                <h3 className="font-head text-lg font-bold text-cream">{t("whyTitle")}</h3>
                <p className="mt-2 text-sm text-muted">{t("whyText")}</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="why-card rounded-2xl border border-border bg-glass p-6">
                <h3 className="font-head text-lg font-bold text-cream">{t("flexibleTitle")}</h3>
                <p className="mt-2 text-sm text-muted">{t("flexibleText")}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="section-inner">
            <Reveal className="mb-8">
              <h2 className="section-title">{t("faqTitle")}</h2>
            </Reveal>
            <div className="flex flex-col gap-3">
              {faqs.map((item, index) => (
                <Reveal key={item.q} delay={((index % 3) + 1) as 1 | 2 | 3}>
                  <details className="faq-item rounded-xl border border-border bg-surface-1 px-5 py-4">
                    <summary className="cursor-pointer list-none font-head text-base font-bold text-cream">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
            <Reveal delay={2} className="mt-10">
              <div className="rounded-2xl border border-teal/40 bg-forest/20 p-6 text-center">
                <p className="text-sm text-ivory/85">{t("customCta")}</p>
                <Link
                  href="/tour-packages/custom-tour"
                  className="fleet-card-cta mt-4 inline-flex rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide uppercase"
                >
                  {t("exploreCustom")}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
