"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { bikes, filterTabs } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";

export default function Fleet() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const visibleBikes = bikes.filter(
    (bike) =>
      activeFilter === "all" ||
      bike.categories.some((cat) => cat === activeFilter),
  );

  return (
    <section
      id="fleet"
      className="relative z-[1] bg-surface before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent"
    >
      <div className="section-inner">
        <Reveal className="mb-[60px]">
          <div className="section-tag">Our Fleet</div>
          <h2 className="section-title">Find Your Ride</h2>
          <p className="section-subtitle">
            Every bike is serviced, insured, and ready for Bali&apos;s roads — from Canggu to Ubud.
          </p>
        </Reveal>

        <Reveal className="mb-12 flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`filter-tab rounded-full border px-5 py-2 text-[0.78rem] font-medium tracking-widest uppercase ${
                activeFilter === tab.id
                  ? "border-gold bg-gold-soft text-gold"
                  : "border-border text-muted hover:border-gold hover:bg-gold-soft hover:text-gold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div
          key={activeFilter}
          className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
        >
          {visibleBikes.map((bike, index) => (
            <Reveal key={bike.name} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <article className="bike-card animate-fade-in cursor-pointer overflow-hidden rounded-2xl border border-border bg-glass backdrop-blur-md hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="bike-img relative flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0f1419] to-[#161c24]">
                  {bike.badge && (
                    <span className="absolute top-3.5 left-3.5 rounded bg-gold px-2.5 py-1 text-[0.62rem] font-bold tracking-widest text-black uppercase">
                      {bike.badge}
                    </span>
                  )}
                  <span className="text-[3.5rem] drop-shadow-[0_0_20px_rgba(22,99,75,0.2)]">
                    {bike.icon}
                  </span>
                  <span className="rounded border border-dashed border-gold/20 px-3 py-1 text-[0.68rem] tracking-widest text-gold-faint uppercase">
                    Add your photo here
                  </span>
                </div>
                <div className="px-6 pt-5 pb-6">
                  <h3 className="mb-1.5 font-head text-lg font-bold text-cream">{bike.name}</h3>
                  <div className="mb-4 flex flex-wrap gap-3.5">
                    <span className="text-xs text-muted">{bike.cc}</span>
                    {bike.specs.map((spec) => (
                      <span key={spec} className="text-xs text-muted">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <span className="font-head text-2xl leading-none font-extrabold text-gold">
                        {bike.price}
                      </span>
                      <span className="mt-0.5 block text-[0.7rem] text-muted">IDR / day</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToId("booking")}
                      className="rounded-lg border border-gold/30 bg-gold-soft px-4 py-2.5 text-[0.78rem] font-semibold tracking-wide text-gold transition-all hover:border-gold hover:bg-gold hover:text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
