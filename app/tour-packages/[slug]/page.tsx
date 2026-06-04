import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourBreadcrumbs from "@/components/tours/TourBreadcrumbs";
import TourDetailHero from "@/components/tours/TourDetailHero";
import TourDetailBody from "@/components/tours/TourDetailBody";
import TourStickyBookingBar from "@/components/tours/TourStickyBookingBar";
import { tours } from "@/data/tours";
import {
  allItineraryStops,
  getTourBySlug,
  parsePriceIdr,
} from "@/lib/tours";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  touristAttractionJsonLd,
  touristTripJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };

  const title = `${tour.title} | Motorcycle Tour Bali`;
  const description = `${tour.tagline} Premium guided motorcycle tour in Bali with G-DRIVE — ${tour.description[0].slice(0, 120)}`;

  return buildPageMetadata({
    title,
    description: description.slice(0, 160),
    path: `/tour-packages/${tour.slug}`,
    image: tour.heroImage,
    imageAlt: `${tour.title} — Bali motorcycle tour`,
  });
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const stops = allItineraryStops(tour);
  const priceIdr = parsePriceIdr(tour.startingPrice);

  const structuredData = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tour Packages", path: "/tour-packages" },
      { name: tour.title, path: `/tour-packages/${tour.slug}` },
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
