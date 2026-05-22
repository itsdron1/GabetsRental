"use client";

import { type FormEvent, useState } from "react";
import Reveal from "@/components/Reveal";
import { bikes, formatBikePriceFull, trustItems } from "@/lib/data";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";

export default function Booking() {
  const [submitting, setSubmitting] = useState(false);

  const handleBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      window.open(WHATSAPP_BOOKING_URL, "_blank");
      setSubmitting(false);
    }, 1500);
  };

  return (
    <section id="booking" className="relative z-[1] bg-surface">
      <div className="section-inner">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="section-tag">Reservations</div>
            <h2 className="section-title mb-5">Reserve Your Bike</h2>
            <p className="mb-10 text-muted">
              Fill in the form and we&apos;ll confirm your booking via WhatsApp within 30 minutes.
              No payment upfront required.
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
            <form
              onSubmit={handleBooking}
              className="rounded-2xl border border-border bg-glass p-8 backdrop-blur-xl md:p-10"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-widest text-muted uppercase">
                    First Name
                  </label>
                  <input type="text" placeholder="John" className="input-field" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-widest text-muted uppercase">
                    Last Name
                  </label>
                  <input type="text" placeholder="Doe" className="input-field" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="text-xs font-medium tracking-widest text-muted uppercase">
                  WhatsApp Number
                </label>
                <input type="tel" placeholder="+62 812 3456 7890" className="input-field" />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="text-xs font-medium tracking-widest text-muted uppercase">
                  Delivery Address / Villa / Hotel
                </label>
                <input
                  type="text"
                  placeholder="Jl. Batu Bolong No. 99, Canggu"
                  className="input-field"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-widest text-muted uppercase">
                    Pick-up Date
                  </label>
                  <input type="date" className="input-field" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-widest text-muted uppercase">
                    Return Date
                  </label>
                  <input type="date" className="input-field" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="text-xs font-medium tracking-widest text-muted uppercase">
                  Choose Bike
                </label>
                <select className="input-field appearance-none" defaultValue="">
                  <option value="">— Select a model —</option>
                  {bikes.map((bike) => (
                    <option key={bike.id} value={bike.name}>
                      {bike.name} (IDR {formatBikePriceFull(bike.priceIdr)}/day)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="text-xs font-medium tracking-widest text-muted uppercase">
                  Special Requests (optional)
                </label>
                <textarea
                  placeholder="Airport pick-up, extra helmet, child seat, etc."
                  className="input-field min-h-[90px] resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`form-submit mt-2 ${submitting ? "!bg-[#25D366] !text-white hover:!translate-y-0" : ""}`}
              >
                {submitting
                  ? "✓ Request Sent! Redirecting to WhatsApp…"
                  : "Send Booking Request →"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
