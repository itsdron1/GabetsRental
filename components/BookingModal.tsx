"use client";

import { useEffect, useId, useRef } from "react";
import { useBooking } from "@/components/BookingContext";
import BookingForm from "@/components/BookingForm";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function BookingModal() {
  const { isOpen, selectedBike, closeBooking } = useBooking();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const firstField = dialogRef.current?.querySelector<HTMLElement>("#modal-firstName");
    firstField?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeBooking();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  return (
    <div className="booking-modal-root fixed inset-0 z-[220] flex items-stretch justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close booking form"
        className="booking-modal-backdrop absolute inset-0 bg-black/70"
        onClick={closeBooking}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="booking-modal-panel relative z-10 flex h-full w-full flex-col overflow-y-auto bg-surface sm:h-auto sm:max-h-[min(92vh,880px)] sm:max-w-[560px] sm:rounded-2xl sm:border sm:border-border"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-5 py-4 backdrop-blur-md md:px-6">
          <h2 id={titleId} className="font-head text-lg font-bold text-cream">
            Reserve Your Bike
          </h2>
          <button
            type="button"
            onClick={closeBooking}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-cream/70 transition-colors hover:bg-white/5 hover:text-cream"
            aria-label="Close"
          >
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <BookingForm
          key={selectedBike || "none"}
          idPrefix="modal"
          formLocation="modal"
          defaultBike={selectedBike}
        />
      </div>
    </div>
  );
}
