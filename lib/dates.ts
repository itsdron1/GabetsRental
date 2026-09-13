import { format, parse, startOfDay } from "date-fns";
import { enUS, id, ru } from "date-fns/locale";
import type { Locale } from "date-fns";
import type { AppLocale } from "@/i18n/routing";

const DATE_FNS_LOCALE: Record<AppLocale, Locale> = {
  en: enUS,
  ru,
  id,
};

const DISPLAY_FORMAT: Record<AppLocale, string> = {
  en: "MMM d, yyyy",
  ru: "dd.MM.yyyy",
  id: "d MMM yyyy",
};

export function dateFnsLocale(locale: AppLocale): Locale {
  return DATE_FNS_LOCALE[locale];
}

export function weekStartsOn(locale: AppLocale): 0 | 1 {
  return locale === "en" ? 0 : 1;
}

export function todayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = parse(value, "yyyy-MM-dd", new Date());
  return Number.isNaN(parsed.getTime()) ? undefined : startOfDay(parsed);
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(iso: string, locale: AppLocale): string {
  const date = parseIsoDate(iso);
  if (!date) return "";
  return format(date, DISPLAY_FORMAT[locale], { locale: DATE_FNS_LOCALE[locale] });
}

export function isIsoDateInPast(iso: string): boolean {
  return iso < todayIso();
}

export function isIsoDateBefore(a: string, b: string): boolean {
  return a < b;
}
