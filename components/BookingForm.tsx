"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { parseBookingFormData, validateBookingFormData } from "@/lib/booking";
import DatePickerField from "@/components/DatePickerField";
import WhatsAppPhoneField from "@/components/WhatsAppPhoneField";
import { BOOKING_SUBMIT_DELAY_MS, wait } from "@/lib/booking-submit";
import { bikes } from "@/lib/data";
import { formatIdrNumber } from "@/lib/format";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { trackBookingSubmit, trackWhatsAppClick } from "@/lib/analytics";
import type { AppLocale } from "@/i18n/routing";

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
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pickupIso, setPickupIso] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const bookingWhatsAppMessage = (data: ReturnType<typeof parseBookingFormData>) => {
    const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
    const lines = [
      tCommon("bookingWhatsappTitle"),
      "",
      tCommon("bookingWhatsappName", { name }),
      tCommon("bookingWhatsappPhone", { phone: data.whatsapp }),
      tCommon("bookingWhatsappAddress", { address: data.address || tCommon("emDash") }),
      tCommon("bookingWhatsappPickup", { date: data.pickupDate }),
      tCommon("bookingWhatsappReturn", { date: data.returnDate || tCommon("emDash") }),
      tCommon("bookingWhatsappBike", { bike: data.bike }),
    ];
    if (data.specialRequests) {
      lines.push(tCommon("bookingWhatsappNotes", { notes: data.specialRequests }));
    }
    lines.push("", tCommon("bookingWhatsappConfirm"));
    return lines.join("\n");
  };

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = parseBookingFormData(new FormData(form));
    const validationError = validateBookingFormData(data);

    if (validationError) {
      setErrorMessage(t(`errors.${validationError}`));
      setStatus("error");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setErrorMessage(null);
    setStatus("sending");

    const whatsappUrl = buildWhatsAppMessageUrl(bookingWhatsAppMessage(data));

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
        const known = result.error
          ? (["emailFailed", "network"] as const).includes(result.error as "emailFailed")
          : false;
        setErrorMessage(
          known ? t(`errors.${result.error}`) : (result.error ?? t("errors.emailFailed")),
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
      setErrorMessage(t("errors.network"));
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
            {t("firstName")}
          </label>
          <input
            id={fieldId("firstName")}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder={t("firstNamePlaceholder")}
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={fieldId("lastName")}
            className="text-xs font-medium tracking-widest text-muted uppercase"
          >
            {t("lastName")}
          </label>
          <input
            id={fieldId("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={t("lastNamePlaceholder")}
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
          {t("address")}
        </label>
        <input
          id={fieldId("address")}
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder={t("addressPlaceholder")}
          className="input-field"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DatePickerField
          id={fieldId("pickupDate")}
          name="pickupDate"
          label={t("pickupDate")}
          required
          onIsoChange={setPickupIso}
        />
        <DatePickerField
          id={fieldId("returnDate")}
          name="returnDate"
          label={t("returnDate")}
          minIso={pickupIso || undefined}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor={fieldId("bike")}
          className="text-xs font-medium tracking-widest text-muted uppercase"
        >
          {t("chooseBike")}
        </label>
        <select
          id={fieldId("bike")}
          name="bike"
          required
          className="input-field appearance-none"
          defaultValue={defaultBike}
        >
          <option value="">{t("selectModel")}</option>
          {bikes.map((bike) => (
            <option key={bike.id} value={bike.name}>
              {t("bikeOption", {
                name: bike.name,
                price: formatIdrNumber(bike.priceIdr, locale),
              })}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor={fieldId("specialRequests")}
          className="text-xs font-medium tracking-widest text-muted uppercase"
        >
          {t("specialRequests")}
        </label>
        <textarea
          id={fieldId("specialRequests")}
          name="specialRequests"
          placeholder={t("specialPlaceholder")}
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
          {t("success")}
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
            {t("sending")}
          </span>
        ) : status === "success" ? (
          t("submitAgain")
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}
