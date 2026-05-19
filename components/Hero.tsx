"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import { scrollToId } from "@/lib/scroll";

const stats = [
  { num: "50+", label: "Bikes in Fleet" },
  { num: "24h", label: "Support" },
  { num: "All Bali", label: "Delivery Coverage" },
  { num: "5★", label: "Avg Rating" },
];

export default function Hero() {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroBg = heroBgRef.current;
      if (!heroBg) return;
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative z-[1] flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <div ref={heroBgRef} className="absolute inset-0 z-0">
        <Image
          src="/hero-moto-v2.png"
          alt="Motorcyclist riding through tropical Bali landscape"
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(22,99,75,0.12)_0%,transparent_70%),radial-gradient(ellipse_100%_100%_at_80%_80%,rgba(22,99,75,0.08)_0%,transparent_60%),linear-gradient(135deg,rgba(8,11,15,0)_0%,rgba(8,11,15,0.35)_50%,rgba(8,11,15,0.88)_100%)]" />
      </div>
      <div className="hero-lines absolute inset-0 z-[1] overflow-hidden" />

      <Reveal className="relative z-[2] px-5 md:px-8" delay={1}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap rounded-t-2xl border border-b-0 border-border bg-glass px-5 py-6 backdrop-blur-xl md:px-10">
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

      <Reveal className="relative z-[2] max-w-[900px] px-5 pb-16 md:px-8 md:pb-20" delay={2}>
        <div className="hero-eyebrow">Premium Scooter Rental — Bali</div>
        <h1 className="mb-6 font-head text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight text-cream">
          Ride Bali
          <br />
          <em className="block font-normal text-gold not-italic">Your Way.</em>
        </h1>
        <p className="mb-10 max-w-[480px] text-[clamp(0.95rem,2vw,1.15rem)] text-muted">
          Top-condition scooters, island-wide delivery, no hidden fees. Freedom starts at your
          doorstep.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => scrollToId("fleet")} className="btn-primary">
            Browse Fleet
          </button>
          <button type="button" onClick={() => scrollToId("booking")} className="btn-ghost">
            Make a Booking
          </button>
        </div>
      </Reveal>
    </section>
  );
}
