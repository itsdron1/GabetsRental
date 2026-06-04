"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import Reveal from "@/components/Reveal";
import {
  formatBookingWhatsAppMessage,
  parseBookingFormData,
  validateBookingFormData,
} from "@/lib/booking";
import { bikes, formatBikePriceFull, trustItems } from "@/lib/data";
import { WHATSAPP_DISPLAY } from "@/lib/constants";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function Booking() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = parseBookingFormData(new FormData(form));
    const validationError = validateBookingFormData(data);

    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    setErrorMessage(null);
    setStatus("sending");

    const whatsappUrl = buildWhatsAppMessageUrl(formatBookingWhatsAppMessage(data));

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        emailSent?: boolean;
      };

      if (!response.ok || !result.ok) {
        setErrorMessage(
          result.error ??
            "Email could not be sent. You can still complete your request in WhatsApp.",
        );
        setStatus("error");
      } else {
        setStatus("success");
      }

      window.open(whatsappUrl, "_blank");
      form.reset();
    } catch {
      setErrorMessage("Network error. Opening WhatsApp with your booking details.");
      setStatus("error");
      window.open(whatsappUrl, "_blank");
    }
  };

  const isSending = status === "sending";

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
            <form
              onSubmit={handleBooking}
              className="rounded-2xl border border-border bg-glass p-8 backdrop-blur-xl md:p-10"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-medium tracking-widest text-muted uppercase"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="John"
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-medium tracking-widest text-muted uppercase"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Doe"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="whatsapp"
                  className="text-xs font-medium tracking-widest text-muted uppercase"
                >
                  WhatsApp Number
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder={WHATSAPP_DISPLAY}
                  className="input-field"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="address"
                  className="text-xs font-medium tracking-widest text-muted uppercase"
                >
                  Delivery Address / Villa / Hotel
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Jl. Batu Bolong No. 99, Canggu"
                  className="input-field"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="pickupDate"
                    className="text-xs font-medium tracking-widest text-muted uppercase"
                  >
                    Pick-up Date
                  </label>
                  <input
                    id="pickupDate"
                    name="pickupDate"
                    type="date"
                    required
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="returnDate"
                    className="text-xs font-medium tracking-widest text-muted uppercase"
                  >
                    Return Date
                  </label>
                  <input id="returnDate" name="returnDate" type="date" className="input-field" />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="bike"
                  className="text-xs font-medium tracking-widest text-muted uppercase"
                >
                  Choose Bike
                </label>
                <select
                  id="bike"
                  name="bike"
                  required
                  className="input-field appearance-none"
                  defaultValue=""
                >
                  <option value="">— Select a model —</option>
                  {bikes.map((bike) => (
                    <option key={bike.id} value={bike.name}>
                      {bike.name} (IDR {formatBikePriceFull(bike.priceIdr)}/day)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="specialRequests"
                  className="text-xs font-medium tracking-widest text-muted uppercase"
                >
                  Special Requests (optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  placeholder="Airport pick-up, extra helmet, child seat, etc."
                  className="input-field min-h-[90px] resize-y"
                />
              </div>

              {errorMessage && (
                <p className="mt-4 text-sm text-amber" role="alert">
                  {errorMessage}
                </p>
              )}

              {status === "success" && (
                <p className="mt-4 text-sm text-cream/80" role="status">
                  Booking sent to our email. WhatsApp opened with your details — send the message
                  to confirm.
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={`form-submit mt-2 ${isSending ? "!bg-[#25D366] !text-white hover:!translate-y-0" : ""}`}
              >
                {isSending
                  ? "Sending…"
                  : status === "success"
                    ? "Send Another Request →"
                    : "Send Booking Request →"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
