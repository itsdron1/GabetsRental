import type { Metadata } from "next";
import type { Bike } from "@/lib/data";
import type { Tour } from "@/data/tours";
import { CONTACT_EMAIL, FACEBOOK_URL, GOOGLE_BUSINESS_URL, INSTAGRAM_URL } from "@/lib/constants";
import { SITE_URL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/whatsapp";

/**
 * Google Search Console: add property for SITE_URL, then set in .env.local:
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
 * Enable in root layout metadata.verification.google
 *
 * Google Analytics 4: create property, then add to .env.local:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * Load gtag in app/layout.tsx when the variable is set (see Analytics comment there).
 *
 * Google Business Profile: claim G-DRIVE Bike Rental Bali, match NAP to schema below,
 * link website to SITE_URL, add WhatsApp + hours + service area (Bali).
 */

export const BRAND_NAME = "G-DRIVE Bike Rental Bali";
export const BUSINESS_NAME = "G-DRIVE Bike Rental Bali";
export const DEFAULT_OG_IMAGE = "/hero-cinematic-ultra.webp";

export const HOME_TITLE =
  "Big Bike Rental Bali | Sport Bikes, Superbikes & Touring Motorcycles";

export const HOME_DESCRIPTION =
  "Premium motorcycle rental in Bali. Harley-Davidson, Kawasaki Z900, Yamaha R6, BMW GS, Ducati and more. Delivery across Bali. Book your bike today.";

export const TOURS_INDEX_TITLE = "Motorcycle Tours Bali | Guided Big Bike Adventures";

export const TOURS_INDEX_DESCRIPTION =
  "Explore Bali with premium motorcycle tours. Scenic routes, volcano rides, waterfalls and coastal adventures.";

export const LOCAL_AREAS = [
  "Canggu",
  "Seminyak",
  "Kuta",
  "Ubud",
  "Uluwatu",
  "Sanur",
  "Nusa Dua",
] as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Premium motorcycle rental Bali — G-DRIVE Bike Rental",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function getBikeImageAlt(bike: Bike): string {
  const name = bike.name;
  if (bike.category === "cars") return `${name} rental Bali — car rental Bali`;
  if (name.includes("Harley")) return `${name} rental Bali — Harley-Davidson rental Bali`;
  if (name.includes("Yamaha YZF-R6")) return "Yamaha R6 rental Bali — sport bike rental Bali";
  if (name.includes("Kawasaki Z900")) return "Kawasaki Z900 rental Bali — superbike rental Bali";
  if (name.includes("ZX-25R") || name.includes("Zx25")) return "Kawasaki ZX-25R rental Bali";
  if (name.includes("Ducati")) return "Ducati rental Bali — sport bike rental Bali";
  if (name.includes("BMW")) return `${name} rental Bali — BMW motorcycle rental Bali`;
  if (bike.category === "sport") return `${name} rental in Bali — sport bike rental Bali`;
  if (bike.category === "adventure") return `${name} rental in Bali — adventure bike rental Bali`;
  if (bike.category === "cruiser") return `${name} rental in Bali — big bike rental Bali`;
  return `${name} rental in Bali — premium motorcycle rental Bali`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS_NAME,
    alternateName: "G-DRIVE",
    description:
      "Premium motorcycle rental Bali — big bike rental, sport bike rental, superbike and touring motorcycle hire with island-wide delivery.",
    url: SITE_URL,
    telephone: `+${WHATSAPP_NUMBER}`,
    email: CONTACT_EMAIL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    priceRange: "$$",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: LOCAL_AREAS.map((area) => ({
      "@type": "Place",
      name: `${area}, Bali, Indonesia`,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pecatu",
      addressRegion: "Bali",
      addressCountry: "ID",
      streetAddress: "Jl. Labuansait",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.8221,
      longitude: 115.0889,
    },
    hasMap: GOOGLE_BUSINESS_URL,
    sameAs: [GOOGLE_BUSINESS_URL, INSTAGRAM_URL, FACEBOOK_URL],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${WHATSAPP_NUMBER}`,
      contactType: "customer service",
      availableLanguage: ["English", "Indonesian"],
      areaServed: "Bali",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Motorcycle Rental Service",
        serviceType: "Motorcycle rental and guided tours",
      },
    },
  };
}

export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function touristAttractionJsonLd(tour: Tour) {
  const image = tour.heroImage.startsWith("http")
    ? tour.heroImage
    : absoluteUrl(tour.heroImage);

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.tagline,
    image,
    url: absoluteUrl(`/tour-packages/${tour.slug}`),
    touristType: "Motorcycle tour",
    isAccessibleForFree: false,
    containedInPlace: {
      "@type": "Place",
      name: "Bali, Indonesia",
    },
  };
}

export function touristTripJsonLd(tour: Tour, stops: string[], priceIdr: number) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description[0],
    touristType: "Adventure",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: priceIdr,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/tour-packages/${tour.slug}`),
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: stops.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
  };
}

export const HOME_FAQS = [
  {
    q: "Do you offer motorcycle rental in Bali for tourists?",
    a: "Yes. We provide premium motorcycle rental Bali-wide, including big bike rental Bali, sport bike rental Bali, and scooter options with delivery to Canggu, Seminyak, Kuta, Ubud, Uluwatu, Sanur, and Nusa Dua.",
  },
  {
    q: "What sport bikes can I rent in Bali?",
    a: "Our fleet includes Yamaha R6, Kawasaki Z900, Kawasaki ZX-25R, Ducati Monster, and other superbike rental Bali options — all maintained to premium standards.",
  },
  {
    q: "Can I rent a Harley-Davidson in Bali?",
    a: "Yes. Harley-Davidson rental Bali is available with Heritage Softail, Sportster, and Street models — ideal for cruising and big bike rental Bali experiences.",
  },
  {
    q: "Is delivery available for bike rental in Canggu and Seminyak?",
    a: "Free delivery is included for Canggu, Seminyak, and Kuta. We also deliver to Ubud, Uluwatu, Sanur, Nusa Dua, and the airport.",
  },
  {
    q: "Do you offer Bali motorcycle tours?",
    a: "Yes. Explore guided Bali motorcycle tours including volcano routes, rice terraces, temples, and coastal roads — book via our Tour Packages page.",
  },
] as const;

export const SEO_KEYWORDS =
  "bike rental bali, motorcycle rental bali, big bike rental bali, sport bike rental bali, superbike rental bali, motorbike rental bali";
