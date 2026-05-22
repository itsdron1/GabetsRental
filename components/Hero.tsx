"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import { scrollToId } from "@/lib/scroll";

const HERO_IMAGE = "/hero-cinematic-ultra.png";

const stats = [
  { num: "20+", label: "Bikes in Fleet" },
  { num: "24h", label: "Support" },
  { num: "All Bali", label: "Delivery Coverage" },
  { num: "5★", label: "Avg Rating" },
];

export default function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const media = mediaRef.current;
      if (!media) return;
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        media.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0)`;
      } else {
        media.style.transform = "";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate flex min-h-svh w-full flex-col justify-end overflow-hidden"
    >
      {/* Cinematic background */}
      <div
        ref={mediaRef}
        className="absolute inset-0 -z-20 will-change-transform"
        aria-hidden
      >
        <Image
          src={HERO_IMAGE}
          alt="Motorcyclist on a winding jungle road in Bali at golden hour"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="hero-media"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette pointer-events-none absolute inset-0" />
      </div>

      <div className="hero-lines pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-end">
        <Reveal className="w-full px-5 md:px-8" delay={1}>
          <div className="hero-stats-glass mx-auto flex max-w-[1200px] flex-wrap rounded-t-2xl border-b-0 px-5 py-5 md:px-10 md:py-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item relative flex min-w-[50%] flex-1 flex-col items-center text-center md:min-w-0"
              >
                <span className="font-head text-3xl leading-none font-extrabold text-gold">
                  {stat.num}
                </span>
                <span className="mt-1 text-[0.72rem] tracking-[0.1em] text-muted uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          className="hero-text-glow w-full max-w-[1200px] px-5 pb-14 pt-2 md:px-8 md:pb-20 md:pt-4"
          delay={2}
        >
          <div className="max-w-[720px]">
            <div className="hero-eyebrow">Premium Big Bike Rental — Bali</div>
            <h1 className="mb-6 font-head text-[clamp(2.4rem,7.5vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight text-cream">
              Ride Bali
              <br />
              <em className="block font-normal text-gold not-italic">Your Way.</em>
            </h1>
            <p className="mb-10 max-w-[480px] text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-cream/80">
              Top-condition big bikes, island-wide delivery, no hidden fees. Freedom starts at
              your doorstep.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => scrollToId("fleet")} className="btn-primary">
                Browse Fleet
              </button>
              <button type="button" onClick={() => scrollToId("booking")} className="btn-ghost">
                Make a Booking
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
