"use client";

import { useMemo, useState } from "react";
import FleetCard from "@/components/FleetCard";
import Reveal from "@/components/Reveal";
import { bikes, filterTabs, type FilterTabId } from "@/lib/data";

export default function Fleet() {
  const [activeFilter, setActiveFilter] = useState<FilterTabId>("all");

  const visibleBikes = useMemo(
    () =>
      bikes.filter(
        (bike) => activeFilter === "all" || bike.category === activeFilter,
      ),
    [activeFilter],
  );

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
      className="relative z-[1] overflow-hidden bg-surface before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent after:pointer-events-none after:absolute after:top-1/4 after:left-1/2 after:h-[420px] after:w-[420px] after:-translate-x-1/2 after:rounded-full after:bg-[radial-gradient(circle,rgba(11,61,46,0.12)_0%,transparent_70%)]"
    >
      <div className="section-inner relative">
        <Reveal className="mb-14 max-w-2xl">
          <div className="section-tag">Our Fleet</div>
          <h2 className="section-title">Premium Motorcycle Catalog</h2>
          <p className="section-subtitle">
            Cruisers, sport bikes, adventure tourers, and scooters — curated for the
            ultimate Bali riding experience.
          </p>
        </Reveal>

        <Reveal className="mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter fleet by category">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = counts[tab.id] ?? 0;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`filter-tab rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold tracking-widest uppercase transition-all md:px-5 ${
                    isActive
                      ? "border-brand-tint bg-[rgba(11,61,46,0.35)] text-cream shadow-[0_0_24px_rgba(11,61,46,0.35)]"
                      : "border-border text-muted hover:border-brand-tint/50 hover:bg-[rgba(11,61,46,0.15)] hover:text-cream"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 text-[0.65rem] ${isActive ? "text-cream/70" : "text-muted"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={activeFilter}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          role="tabpanel"
        >
          {visibleBikes.length === 0 ? (
            <p className="col-span-full py-16 text-center text-muted">
              No bikes in this category.
            </p>
          ) : (
            visibleBikes.map((bike, index) => (
              <Reveal
                key={bike.id}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="h-full animate-fade-in"
              >
                <FleetCard bike={bike} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
