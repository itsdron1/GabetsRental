import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import TourCard from "@/components/tours/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllTours } from "@/lib/tours";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";
import {
  TOURS_INDEX_DESCRIPTION,
  TOURS_INDEX_TITLE,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqPageJsonLd,
} from "@/lib/seo";

const TourPackagesHeroImage = dynamic(
  () => import("@/components/TourPackagesHeroImage"),
  {
    loading: () => (
      <div
        className="tour-hero-frame aspect-[4/3] rounded-2xl border border-border bg-[#0a0f14] md:aspect-[16/11]"
        aria-hidden
      />
    ),
  },
);

const faqs = [
  {
    q: "Do I need a motorcycle license to join a tour?",
    a: "Yes, a valid motorcycle license is required for solo riders. International Driving Permit (IDP) is strongly recommended for international guests. Pillion passengers do not need a license.",
  },
  {
    q: "What is included in the tour package?",
    a: "Motorcycle rental, helmet, fuel for route, local guide, drinking water, and basic insurance are included by default. See each tour page for full details.",
  },
  {
    q: "Can I request a private or custom route?",
    a: "Yes. Our Custom Tour lets you tailor routes for beaches, volcano roads, jungle trails, and cultural destinations based on your riding level.",
  },
];

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: TOURS_INDEX_TITLE,
    description: TOURS_INDEX_DESCRIPTION,
    path: "/tour-packages",
    image: "/tour-packages/bali-tours-map.png",
    imageAlt: "Bali motorcycle tour routes map — guided big bike adventures",
  }),
  title: { absolute: TOURS_INDEX_TITLE },
};

export default function TourPackagesPage() {
  const tours = getAllTours();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tour Packages", path: "/tour-packages" },
          ]),
          faqPageJsonLd(faqs),
        ]}
      />
      <Nav />
      <main className="relative z-[1] bg-surface pt-28 md:pt-32">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#0a0f14] to-surface">
          <div className="section-inner relative grid items-center gap-12 py-18 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <div className="section-tag">Tour Packages</div>
              <h1 className="section-title max-w-[15ch]">Motorcycle Tours Bali</h1>
              <p className="section-subtitle mt-6 max-w-[58ch]">
                Explore Bali with premium motorcycle tours — volcano roads, rice terraces, temples,
                and coastal adventures on big bikes and sport machines. Pair your tour with{" "}
                <Link href="/#fleet" className="text-gold transition-colors hover:text-cream">
                  motorcycle rental Bali
                </Link>{" "}
                from our fleet.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={WHATSAPP_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Book Tour via WhatsApp
                </a>
                <Link href="/#fleet" className="btn-ghost">
                  View Rental Fleet
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
              <h2 className="section-title">Featured Tour Routes</h2>
              <p className="section-subtitle">
                Full-day highland loops, coastal explorers, half-day highlights, and fully custom
                Bali motorcycle tour itineraries.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {tours.map((tour, index) => (
                <TourCard key={tour.slug} tour={tour} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#070b10] py-20">
          <div className="section-inner grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="why-card rounded-2xl border border-border bg-glass p-6">
                <h3 className="font-head text-lg font-bold text-cream">What&apos;s Included</h3>
                <p className="mt-2 text-sm text-muted">
                  Premium bike, fuel, certified helmet, route briefing, and local guide support.
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="why-card rounded-2xl border border-border bg-glass p-6">
                <h3 className="font-head text-lg font-bold text-cream">Why Ride With Us</h3>
                <p className="mt-2 text-sm text-muted">
                  Premium fleet, responsive support, and curated Bali routes with cinematic stops.
                </p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="why-card rounded-2xl border border-border bg-glass p-6">
                <h3 className="font-head text-lg font-bold text-cream">Flexible Booking</h3>
                <p className="mt-2 text-sm text-muted">
                  Private and group tours available. Fast confirmation via WhatsApp.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="section-inner">
            <Reveal className="mb-8">
              <h2 className="section-title">Tour FAQ</h2>
            </Reveal>
            <div className="flex flex-col gap-3">
              {faqs.map((item, index) => (
                <Reveal key={item.q} delay={((index % 3) + 1) as 1 | 2 | 3}>
                  <details className="rounded-xl border border-border bg-glass px-5 py-4">
                    <summary className="cursor-pointer list-none font-head text-base font-bold text-cream">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
            <Reveal delay={2} className="mt-10">
              <div className="rounded-2xl border border-brand-tint/40 bg-[rgba(11,61,46,0.2)] p-6 text-center">
                <p className="text-sm text-cream/85">Need a custom route? We&apos;ll build it for you.</p>
                <Link
                  href="/tour-packages/custom-tour"
                  className="fleet-card-cta mt-4 inline-flex rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide text-cream uppercase"
                >
                  Explore Custom Tour
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
