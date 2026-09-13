import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourBreadcrumbs from "@/components/tours/TourBreadcrumbs";
import TourDetailHero from "@/components/tours/TourDetailHero";
import TourDetailBody from "@/components/tours/TourDetailBody";
import TourStickyBookingBar from "@/components/tours/TourStickyBookingBar";
import { tours } from "@/data/tours";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import { localizeTour } from "@/lib/localized-tour";
import { allItineraryStops, getTourBySlug, parsePriceIdr } from "@/lib/tours";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  touristAttractionJsonLd,
  touristTripJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  const raw = getTourBySlug(slug);
  const t = await getTranslations({ locale: safeLocale, namespace: "seo" });
  const tTours = await getTranslations({ locale: safeLocale, namespace: "tours" });
  if (!raw) return { title: t("tourNotFound") };

  const tour = localizeTour(raw, tTours);
  const title = t("tourMetaTitle", { title: tour.title });
  const description = t("tourMetaDescription", {
    tagline: tour.tagline,
    excerpt: tour.description[0].slice(0, 120),
  }).slice(0, 160);

  return buildPageMetadata({
    title,
    description,
    path: localizedPath(safeLocale, `/tour-packages/${tour.slug}`),
    locale: safeLocale,
    image: tour.heroImage,
    imageAlt: t("tourOgAlt", { title: tour.title }),
  });
}

export default async function TourDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  setRequestLocale(safeLocale);

  const raw = getTourBySlug(slug);
  if (!raw) notFound();

  const tTours = await getTranslations("tours");
  const tSeo = await getTranslations("seo");
  const tour = localizeTour(raw, tTours);
  const stops = allItineraryStops(tour);
  const priceIdr = parsePriceIdr(tour.startingPrice);

  const structuredData = [
    breadcrumbJsonLd([
      { name: tSeo("breadcrumbHome"), path: localizedPath(safeLocale, "/") },
      { name: tSeo("breadcrumbTours"), path: localizedPath(safeLocale, "/tour-packages") },
      { name: tour.title, path: localizedPath(safeLocale, `/tour-packages/${tour.slug}`) },
    ]),
    touristAttractionJsonLd(tour),
    touristTripJsonLd(tour, stops, priceIdr),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Nav />
      <main className="tour-detail-enter relative z-[1] bg-surface">
        <div className="section-inner pt-28 md:pt-32">
          <TourBreadcrumbs tourTitle={tour.title} />
        </div>
        <TourDetailHero tour={tour} />
        <TourDetailBody tour={tour} />
      </main>
      <TourStickyBookingBar title={tour.title} slug={tour.slug} />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
