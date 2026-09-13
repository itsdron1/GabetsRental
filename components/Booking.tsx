"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { trustItems } from "@/lib/data";

export default function Booking() {
  return (
    <section id="booking" className="section-deferred relative z-[1] bg-surface">
      <div className="section-inner">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="section-tag">Reservations</div>
            <h2 className="section-title mb-5">Reserve Your Bike</h2>
            <p className="mb-10 text-muted">
              Reserve your Bali motorcycle rental — choose a bike from our{" "}
              <Link href="#fleet" className="text-gold transition-colors hover:text-cream">
                fleet
              </Link>
              , or pair your hire with{" "}
              <Link href="/tour-packages" className="text-gold transition-colors hover:text-cream">
                guided motorcycle tours
              </Link>
              . We confirm via WhatsApp within 30 minutes. No payment upfront required.
            </p>
            <ul className="flex flex-col gap-4">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-3.5 text-sm text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2}>
            <BookingForm idPrefix="page" formLocation="page" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
