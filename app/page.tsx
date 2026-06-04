import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Delivery from "@/components/Delivery";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import WhyUs from "@/components/WhyUs";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  HOME_DESCRIPTION,
  HOME_FAQS,
  HOME_TITLE,
  buildPageMetadata,
  faqPageJsonLd,
  localBusinessJsonLd,
} from "@/lib/seo";

const Booking = dynamic(() => import("@/components/Booking"));

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
    imageAlt: "Premium big bike and sport bike rental Bali — G-DRIVE fleet",
  }),
  title: { absolute: HOME_TITLE },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), faqPageJsonLd([...HOME_FAQS])]} />
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
