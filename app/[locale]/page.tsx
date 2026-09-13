import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Delivery from "@/components/Delivery";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import WhyUs from "@/components/WhyUs";
import WhatsAppButton from "@/components/WhatsAppButton";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import { buildPageMetadata, faqPageJsonLd, localBusinessJsonLd } from "@/lib/seo";

const Booking = dynamic(() => import("@/components/Booking"));

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
  const faqs = tFaq.raw("items") as { q: string; a: string }[];

  return (
    <>
      <JsonLd data={[localBusinessJsonLd(tSeo("localBusinessDescription")), faqPageJsonLd(faqs)]} />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <Fleet />
        <Delivery />
        <WhyUs />
        <Booking />
        <HomeFaq />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
