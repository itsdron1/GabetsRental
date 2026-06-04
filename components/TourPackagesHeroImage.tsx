"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const TOUR_HERO_IMAGE = "/tour-packages/bali-tours-map.png";
const TOUR_HERO_ALT =
  "Bali motorcycle tour routes map — guided motorcycle tours Bali and big bike adventures";

export default function TourPackagesHeroImage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const openLightbox = useCallback(() => setLightboxOpen(true), []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, closeLightbox]);

  return (
    <>
      <div className="tour-hero-frame relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[#0a0f14] md:aspect-[16/11]">
        <button
          type="button"
          onClick={openLightbox}
          className="tour-hero-trigger group absolute inset-0 block h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
          aria-label="View Bali tour map full size"
        >
          <Image
            src={TOUR_HERO_IMAGE}
            alt={TOUR_HERO_ALT}
            title={TOUR_HERO_ALT}
            fill
            priority
            quality={85}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="tour-hero-media object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </button>
        <div className="tour-hero-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="tour-hero-vignette pointer-events-none absolute inset-0" aria-hidden />
        <span className="pointer-events-none absolute right-3 bottom-3 z-[2] rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[0.6rem] font-medium tracking-widest text-cream/75 uppercase backdrop-blur-sm">
          Tap to enlarge
        </span>
      </div>

      {lightboxOpen && (
        <div
          className="hero-lightbox fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Full size Bali tour map"
        >
          <button
            type="button"
            className="hero-lightbox-backdrop absolute inset-0 border-0 bg-black/75 backdrop-blur-md"
            onClick={closeLightbox}
            aria-label="Close full size view"
          />
          <button
            type="button"
            onClick={closeLightbox}
            className="hero-lightbox-close absolute top-4 right-4 z-[210] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl leading-none text-cream backdrop-blur-md transition-colors hover:border-brand-tint hover:bg-brand-tint"
            aria-label="Close"
          >
            ×
          </button>
          <figure
            className="hero-lightbox-figure relative z-[205] flex max-h-[min(90dvh,900px)] max-w-[min(95vw,1400px)] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={TOUR_HERO_IMAGE}
              alt={TOUR_HERO_ALT}
              width={1600}
              height={1200}
              quality={85}
              sizes="95vw"
              className="hero-lightbox-image h-auto max-h-[min(90dvh,900px)] w-auto max-w-[min(95vw,1400px)] object-contain"
            />
          </figure>
        </div>
      )}
    </>
  );
}
