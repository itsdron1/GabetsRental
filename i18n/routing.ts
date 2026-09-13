import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ru", "id"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  },
  alternateLinks: false,
});

export function isAppLocale(value: string | undefined | null): value is AppLocale {
  return value === "en" || value === "ru" || value === "id";
}
