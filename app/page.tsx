import Booking from "@/components/Booking";
import Delivery from "@/components/Delivery";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import WhyUs from "@/components/WhyUs";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <Fleet />
        <Delivery />
        <WhyUs />
        <Booking />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
