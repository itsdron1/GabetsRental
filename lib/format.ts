import type { AppLocale } from "@/i18n/routing";
import { BCP47 } from "@/i18n/locale";

export function formatIdrNumber(amount: number, locale: AppLocale): string {
  return new Intl.NumberFormat(BCP47[locale], {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatBikePriceCompact(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return millions % 1 === 0
      ? `${millions}M`
      : `${millions.toFixed(1).replace(/\.0$/, "")}M`;
  }
  return `${Math.round(amount / 1000)}K`;
}
