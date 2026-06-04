"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { TourGalleryImage } from "@/data/tours";

type TourGalleryProps = {
  images: TourGalleryImage[];
  premium?: boolean;
};

export default function TourGallery({ images, premium = false }: TourGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl border border-border bg-[#0f1419]"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-transform duration-500 ease-out ${
                premium ? "group-hover:scale-[1.04]" : "group-hover:scale-105"
              }`}
              loading="lazy"
            />
            {premium && (
              <>
                <span
                  className="pointer-events-none absolute inset-0 bg-[#080b0f]/20"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1117]/75 via-[#0d1117]/10 to-transparent"
                  aria-hidden
                />
              </>
            )}
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="hero-lightbox fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="hero-lightbox-backdrop absolute inset-0 border-0 bg-black/85"
            onClick={close}
            aria-label="Close gallery"
          />
          <button
            type="button"
            onClick={close}
            className="hero-lightbox-close absolute top-4 right-4 z-[210] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-cream"
            aria-label="Close"
          >
            ×
          </button>
          <figure
            className="hero-lightbox-figure relative z-[205] max-h-[90dvh] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={1400}
              height={1050}
              quality={90}
              className="hero-lightbox-image max-h-[90dvh] w-auto max-w-[95vw] object-contain"
            />
          </figure>
        </div>
      )}
    </>
  );
}
