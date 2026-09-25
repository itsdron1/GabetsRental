"use client";

import { useLocale, useTranslations } from "next-intl";
import { useDeferredValue, useMemo, useState } from "react";
import BookingTrigger from "@/components/BookingTrigger";
import FleetCard from "@/components/FleetCard";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import BrandIcon, { type BrandIconName } from "@/components/BrandIcon";
import { bikes, filterTabs, type FilterTabId } from "@/lib/data";

const FILTER_ICONS: Partial<Record<FilterTabId, BrandIconName>> = {
  cruiser: "cruiser",
  sport: "sport",
  adventure: "adventure",
  enduro: "enduro",
  scooter: "scooter",
};

export default function Fleet() {
  const t = useTranslations("fleet");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterTabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const visibleBikes = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return bikes.filter((bike) => {
      const matchesCategory =
        activeFilter === "all" || bike.category === activeFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const tagline = String(t.raw(`taglines.${bike.id}` as never) ?? bike.tagline).toLowerCase();
      return (
        bike.name.toLowerCase().includes(q) ||
        tagline.includes(q) ||
        bike.category.toLowerCase().includes(q)
      );
    });
  }, [activeFilter, deferredQuery, t]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: bikes.length };
    for (const bike of bikes) {
      map[bike.category] = (map[bike.category] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <section
      id="fleet"
      className="section-deferred relative z-[1] overflow-hidden bg-surface-1 before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent"
    >
      <div className="section-inner relative">
        <Reveal className="mb-14 max-w-2xl">
          <div className="section-tag">{t("tag")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitleBefore")}{" "}
            <BookingTrigger
              as="a"
              source="inline_link"
              className="text-teal transition-colors hover:underline"
            >
              {t("bookLink")}
            </BookingTrigger>{" "}
            {t("subtitleMid")}{" "}
            <Link href="/tour-packages" className="text-teal transition-colors hover:underline">
              {t("toursLink")}
            </Link>
            {t("subtitleAfter")}
          </p>
        </Reveal>

        <Reveal className="mb-6">
          <label className="relative block max-w-md">
            <span className="sr-only">{t("searchLabel")}</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              autoComplete="off"
              className="input-field pl-10"
            />
          </label>
        </Reveal>

        <Reveal className="mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("filterAria")}>
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = counts[tab.id] ?? 0;
              const icon = FILTER_ICONS[tab.id];
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`filter-tab inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold tracking-widest uppercase transition-[background,border-color,color,box-shadow] md:px-5 ${
                    isActive
                      ? "border-teal bg-teal/10 text-ivory"
                      : "border-border text-slate-text hover:border-teal/50 hover:text-ivory"
                  }`}
                >
                  {icon ? <BrandIcon name={icon} size={16} className={isActive ? "text-teal" : "text-slate-text"} /> : null}
                  {t(`filters.${tab.id}`)}
                  <span
                    className={`text-[0.65rem] ${isActive ? "text-ivory/70" : "text-slate-text"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" role="tabpanel">
          {visibleBikes.length === 0 ? (
            <p className="col-span-full py-16 text-center text-muted">
              {deferredQuery.trim()
                ? t("emptySearch", { query: deferredQuery.trim() })
                : t("emptyCategory")}
            </p>
          ) : (
            visibleBikes.map((bike) => <FleetCard key={bike.id} bike={bike} />)
          )}
        </div>
      </div>
      <span className="sr-only">{locale}</span>
    </section>
  );
}
