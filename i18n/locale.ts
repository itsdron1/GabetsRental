import type { AppLocale } from "@/i18n/routing";

export const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "EN",
  ru: "RU",
  id: "ID",
};

export const BCP47: Record<AppLocale, string> = {
  en: "en-US",
  ru: "ru-RU",
  id: "id-ID",
};

export const OG_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  ru: "ru_RU",
  id: "id_ID",
};

export function localePrefix(locale: AppLocale): string {
  return locale === "en" ? "" : `/${locale}`;
}

export function localizedPath(locale: AppLocale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return localePrefix(locale) || "/";
  return `${localePrefix(locale)}${normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/ru" || pathname === "/id") return "/";
  if (pathname.startsWith("/ru/")) return pathname.slice(3);
  if (pathname.startsWith("/id/")) return pathname.slice(3);
  return pathname;
}

const BOT_UA =
  /bot|crawler|spider|google|bing|yandex|baidu|duckduck|slurp|facebookexternalhit|linkedinbot|twitterbot|embedly|preview|whatsapp|telegram|discordbot|applebot|semrush|ahrefs|mj12|dotbot|gptbot|claudebot|bytespider|petalbot/i;

export function isCrawlerUserAgent(userAgent: string | null): boolean {
  return BOT_UA.test(userAgent ?? "");
}

export function preferredLocaleFromAcceptLanguage(
  header: string | null,
): AppLocale {
  if (!header) return "en";

  const tags = header.split(",").map((part) => {
    const [tag, ...params] = part.trim().split(";");
    const q = params.find((param) => param.trim().startsWith("q="));
    return {
      tag: tag.trim().toLowerCase(),
      q: q ? Number.parseFloat(q.trim().slice(2)) : 1,
    };
  });

  tags.sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    if (tag === "ru" || tag.startsWith("ru-")) return "ru";
    if (tag === "id" || tag.startsWith("id-")) return "id";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return "en";
}
