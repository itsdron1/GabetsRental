import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Delivery from "@/components/Delivery";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import Hero from "@/components/Hero";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import WhyUs from "@/components/WhyUs";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import { bikes } from "@/lib/data";
import { isMotorcycle } from "@/lib/fleet";
import { getGoogleReviews } from "@/lib/google-reviews";
import { bikeProductJsonLd, buildPageMetadata, faqPageJsonLd, localBusinessJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  const t = await getTranslations({ locale: safeLocale, namespace: "seo" });

  return {
    ...buildPageMetadata({
      title: t("homeTitle"),
      description: t("homeDescription"),
      path: localizedPath(safeLocale, "/"),
      pathname: "/",
      locale: safeLocale,
      imageAlt: t("homeOgAlt"),
    }),
    title: { absolute: t("homeTitle") },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const tFaq = await getTranslations("faq");
  const tSeo = await getTranslations("seo");
  const tFleet = await getTranslations("fleet");
  const googleReviews = await getGoogleReviews();
  const faqs = tFaq.raw("items") as { q: string; a: string }[];
  const safeLocale = isAppLocale(locale) ? locale : "en";
  const productJsonLd = bikes.filter(isMotorcycle).map((bike) => {
    const tagline = String(tFleet.raw(`taglines.${bike.id}` as never) ?? bike.tagline);
    return bikeProductJsonLd(bike, safeLocale, {
      tagline,
      engine: tFleet("specEngine"),
      displacement: tFleet("specDisplacement"),
      power: tFleet("specPower"),
      torque: tFleet("specTorque"),
      weight: tFleet("specWeight"),
      seatHeight: tFleet("specSeatHeight"),
      transmission: tFleet("specTransmission"),
      fuelTank: tFleet("specFuelTank"),
      abs: tFleet("specAbs"),
      yes: tFleet("yes"),
      no: tFleet("no"),
    });
  });

  return (
    <>
      <JsonLd data={[localBusinessJsonLd(tSeo("localBusinessDescription"), googleReviews), faqPageJsonLd(faqs)]} />
      <JsonLd data={productJsonLd} />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <Fleet />
        <Delivery />
        <WhyUs />
        <GoogleReviews />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
