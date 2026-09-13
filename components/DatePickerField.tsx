"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useLocale, useTranslations } from "next-intl";
import {
  dateFnsLocale,
  formatDisplayDate,
  parseIsoDate,
  toIsoDate,
  todayIso,
  weekStartsOn,
} from "@/lib/dates";
import type { AppLocale } from "@/i18n/routing";
import "react-day-picker/style.css";

type DatePickerFieldProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  minIso?: string;
  onIsoChange?: (iso: string) => void;
};

export default function DatePickerField({
  id,
  name,
  label,
  required = false,
  minIso,
  onIsoChange,
}: DatePickerFieldProps) {
  const t = useTranslations("booking");
  const locale = useLocale() as AppLocale;
  const [open, setOpen] = useState(false);
  const [iso, setIso] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const min = minIso || todayIso();
  const selected = parseIsoDate(iso);
  const disabledBefore = parseIsoDate(min);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium tracking-widest text-muted uppercase">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen((value) => !value)}
        className="input-field flex w-full items-center justify-between text-left"
      >
        <span className={iso ? "text-cream" : "text-muted"}>
          {iso ? formatDisplayDate(iso, locale) : t("datePlaceholder")}
        </span>
      </button>
      <input type="hidden" name={name} value={iso} required={required} />
      {open && (
        <div
          id={dialogId}
          role="dialog"
          className="date-picker-popover absolute top-[calc(100%+6px)] left-0 z-30 w-[min(100%,20.5rem)] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-[#0c1018] p-3 shadow-xl"
        >
          <DayPicker
            mode="single"
            locale={dateFnsLocale(locale)}
            weekStartsOn={weekStartsOn(locale)}
            selected={selected}
            defaultMonth={selected ?? disabledBefore}
            disabled={disabledBefore ? { before: disabledBefore } : undefined}
            onSelect={(date) => {
              if (!date) return;
              const next = toIsoDate(date);
              setIso(next);
              onIsoChange?.(next);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
