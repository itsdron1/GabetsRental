"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname as useNextPathname } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type AppLocale } from "@/i18n/routing";

type LanguageSwitcherProps = {
  className?: string;
};

const LEGAL_PATHS = new Set(["/privacy-policy", "/terms"]);

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const rawPath = useNextPathname();
  const isLegalPage = LEGAL_PATHS.has(rawPath);

  const switchTo = (next: AppLocale) => {
    if (next === locale) return;
    if (isLegalPage) {
      document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
      window.location.reload();
      return;
    }
    router.replace(pathname, { locale: next });
  };

  return (
    <nav aria-label={t("label")} className={`flex items-center gap-1 ${className}`}>
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden className="text-slate">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={locale === code ? "true" : undefined}
            className={`text-[0.68rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
              locale === code ? "text-teal" : "text-slate-text hover:text-ivory"
            }`}
          >
            {t(code)}
          </button>
        </span>
      ))}
    </nav>
  );
}
