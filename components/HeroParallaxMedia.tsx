"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const HERO_IMAGE = "/hero-cinematic-ultra.webp";

export default function HeroParallaxMedia() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const media = mediaRef.current;
      if (media) {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          media.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0)`;
        } else {
          media.style.transform = "";
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={mediaRef}
      className="absolute inset-0 -z-20 will-change-transform"
      aria-hidden
    >
      <Image
        src={HERO_IMAGE}
        alt="Premium motorcycle rental Bali — sport bike on a scenic Bali road at golden hour"
        title="Big bike and sport bike rental Bali — G-DRIVE"
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="hero-media"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
    </div>
  );
}
