import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { localizedPath } from "@/i18n/locale";
import { locales } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localized = (pathname: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, pathname)),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(pathname) },
    }));

  return [
    ...localized("/", "weekly", 1),
    ...localized("/tour-packages", "weekly", 0.9),
    ...tours.flatMap((tour) =>
      localized(`/tour-packages/${tour.slug}`, "monthly", 0.8),
    ),
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
