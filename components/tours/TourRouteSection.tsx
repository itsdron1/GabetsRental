"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Tour, TourRoute } from "@/data/tours";

type TourRouteSectionProps = {
  tour: Tour;
};

function RouteTimeline({ route }: { route: TourRoute }) {
  const t = useTranslations("tours.ui");
  return (
    <ol className="relative border-l border-border pl-6">
      {route.stops.map((stop, index) => {
        const name =
          stop.name === "Return" || stop.name === "Возврат" || stop.name === "Kembali"
            ? t("returnStop")
            : stop.name;
        return (
          <li key={`${stop.name}-${index}`} className="relative pb-6 last:pb-0">
            <span className="absolute -left-[1.9rem] flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-brand-tint text-xs font-bold text-cream">
              {index + 1}
            </span>
            <p className="font-head text-base font-bold text-cream">{name}</p>
            {stop.note && <p className="mt-1 text-sm text-muted">{stop.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}

export default function TourRouteSection({ tour }: TourRouteSectionProps) {
  const t = useTranslations("tours.ui");
  const labeledRoutes = tour.routes.filter((r) => r.label);
  const hasTabs = tour.slug === "kintamani-highlands" && labeledRoutes.length > 1;
  const [activeTab, setActiveTab] = useState(0);
  const activeRoute = hasTabs ? labeledRoutes[activeTab] : tour.routes[0];

  return (
    <section className="bg-charcoal py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-8">{t("route")}</h2>

        {hasTabs && (
          <div className="mb-8 flex flex-wrap gap-2" role="tablist">
            {labeledRoutes.map((route, index) => (
              <button
                key={route.label}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                onClick={() => setActiveTab(index)}
                className={`filter-tab rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold tracking-widest uppercase transition-all ${
                  activeTab === index
                    ? "border-teal bg-teal/10 text-ivory"
                    : "border-border text-slate-text hover:border-teal/50 hover:text-ivory"
                }`}
              >
                {route.label}
              </button>
            ))}
          </div>
        )}

        {activeRoute && <RouteTimeline route={activeRoute} />}
      </div>
    </section>
  );
}
