"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AsYouType, type CountryCode } from "libphonenumber-js";
import {
  DEFAULT_PHONE_COUNTRY,
  getPhoneCountryOptions,
  normalizeToE164,
  validateWhatsAppNumber,
} from "@/lib/phone";

type WhatsAppPhoneFieldProps = {
  id: string;
  name?: string;
  defaultCountry?: CountryCode;
};

export default function WhatsAppPhoneField({
  id,
  name = "whatsapp",
  defaultCountry = DEFAULT_PHONE_COUNTRY,
}: WhatsAppPhoneFieldProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const countries = useMemo(() => getPhoneCountryOptions(locale), [locale]);
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const [display, setDisplay] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = countries.find((item) => item.code === country) ?? countries[0];
  const e164 = normalizeToE164(display, country) ?? display.trim();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.dial.includes(q.replace(/^\+/, "")),
    );
  }, [countries, query]);

  const errorText = (code: ReturnType<typeof validateWhatsAppNumber>) => {
    if (code === "required") return t("errors.phoneRequired");
    if (code === "invalid") return t("errors.phoneInvalid");
    return null;
  };

  const showError = () => {
    setError(errorText(validateWhatsAppNumber(display, country)));
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium tracking-widest text-muted uppercase">
        {t("whatsapp")}
      </label>
      <div className="relative flex gap-2">
        <div className="relative shrink-0">
          <button
            type="button"
            className="input-field flex min-w-[5.5rem] items-center justify-between gap-1 px-3"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={t("countryCode")}
            onClick={() => setOpen((value) => !value)}
          >
            <span>{selected.dial}</span>
            <span aria-hidden className="text-muted">
              ▾
            </span>
          </button>
          {open && (
            <div className="absolute top-[calc(100%+6px)] left-0 z-20 w-[min(280px,80vw)] overflow-hidden rounded-lg border border-border bg-surface-2 shadow-xl">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchCountry")}
                className="input-field rounded-none border-0 border-b border-border"
                autoComplete="off"
              />
              <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
                {filtered.map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={item.code === country}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-cream hover:bg-white/5"
                      onClick={() => {
                        setCountry(item.code);
                        setOpen(false);
                        setQuery("");
                        if (display) {
                          const next = new AsYouType(item.code).input(display.replace(/\D/g, ""));
                          setDisplay(next);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      <span className="text-muted">{item.dial}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={display}
          placeholder={t("phonePlaceholder")}
          className="input-field min-w-0 flex-1"
          onChange={(e) => {
            const formatted = new AsYouType(country).input(e.target.value);
            setDisplay(formatted);
            if (touched) setError(errorText(validateWhatsAppNumber(formatted, country)));
          }}
          onBlur={() => {
            setTouched(true);
            showError();
            setOpen(false);
          }}
        />
        <input type="hidden" name={name} value={e164} />
      </div>
      {error && (
        <p className="text-xs text-amber" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
