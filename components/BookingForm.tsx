"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  formatBookingWhatsAppMessage,
  parseBookingFormData,
  validateBookingFormData,
} from "@/lib/booking";
import WhatsAppPhoneField from "@/components/WhatsAppPhoneField";
import { BOOKING_SUBMIT_DELAY_MS, wait } from "@/lib/booking-submit";
import { bikes, formatBikePriceFull } from "@/lib/data";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { trackBookingSubmit, trackWhatsAppClick } from "@/lib/analytics";

export type BookingFormLocation = "modal" | "page";

type SubmitStatus = "idle" | "sending" | "success" | "error";

type BookingFormProps = {
  idPrefix: string;
  formLocation: BookingFormLocation;
  defaultBike?: string;
};

export default function BookingForm({
  idPrefix,
  formLocation,
  defaultBike = "",
}: BookingFormProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

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

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setErrorMessage(null);
    setStatus("sending");

    const whatsappUrl = buildWhatsAppMessageUrl(formatBookingWhatsAppMessage(data));

    try {
      await wait(BOOKING_SUBMIT_DELAY_MS, controller.signal);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
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
        trackWhatsAppClick("booking_form");
        window.open(whatsappUrl, "_blank");
        return;
      }

      setStatus("success");
      trackBookingSubmit(data.bike || undefined, formLocation);
      trackWhatsAppClick("booking_form");
      window.open(whatsappUrl, "_blank");
      form.reset();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setErrorMessage("Network error. Opening WhatsApp with your booking details.");
      setStatus("error");
      trackWhatsAppClick("booking_form_error");
      window.open(whatsappUrl, "_blank");
    }
  };

  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleBooking}
      className={
        formLocation === "modal"
          ? "px-5 pb-2 md:px-6"
          : "rounded-2xl border border-border bg-glass p-8 backdrop-blur-xl md:p-10"
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={fieldId("firstName")}
            className="text-xs font-medium tracking-widest text-muted uppercase"
          >
            First Name
          </label>
          <input
            id={fieldId("firstName")}
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
            htmlFor={fieldId("lastName")}
            className="text-xs font-medium tracking-widest text-muted uppercase"
          >
            Last Name
          </label>
          <input
            id={fieldId("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Doe"
            className="input-field"
          />
        </div>
      </div>

      <div className="mt-4">
        <WhatsAppPhoneField id={fieldId("whatsapp")} name="whatsapp" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor={fieldId("address")}
          className="text-xs font-medium tracking-widest text-muted uppercase"
        >
          Delivery Address / Villa / Hotel
        </label>
        <input
          id={fieldId("address")}
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
            htmlFor={fieldId("pickupDate")}
            className="text-xs font-medium tracking-widest text-muted uppercase"
          >
            Pick-up Date
          </label>
          <input
            id={fieldId("pickupDate")}
            name="pickupDate"
            type="date"
            required
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={fieldId("returnDate")}
            className="text-xs font-medium tracking-widest text-muted uppercase"
          >
            Return Date
          </label>
          <input
            id={fieldId("returnDate")}
            name="returnDate"
            type="date"
            className="input-field"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor={fieldId("bike")}
          className="text-xs font-medium tracking-widest text-muted uppercase"
        >
          Choose Bike
        </label>
        <select
          id={fieldId("bike")}
          name="bike"
          required
          className="input-field appearance-none"
          defaultValue={defaultBike}
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
          htmlFor={fieldId("specialRequests")}
          className="text-xs font-medium tracking-widest text-muted uppercase"
        >
          Special Requests (optional)
        </label>
        <textarea
          id={fieldId("specialRequests")}
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
          Booking sent to our email. WhatsApp opened with your details — send the message to
          confirm.
        </p>
      )}

      <button
        type="submit"
        disabled={isSending}
        className={`form-submit mt-2 ${isSending ? "!bg-[#25D366] !text-white hover:!translate-y-0" : ""}`}
      >
        {isSending ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden
            />
            Sending...
          </span>
        ) : status === "success" ? (
          "Send Another Request →"
        ) : (
          "Send Booking Request →"
        )}
      </button>
    </form>
  );
}
