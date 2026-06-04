"use client";

import { buildTourBookingUrl } from "@/lib/whatsapp";

type TourStickyBookingBarProps = {
  title: string;
  slug: string;
};

export default function TourStickyBookingBar({ title, slug }: TourStickyBookingBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[90] border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
        <p className="min-w-0 truncate font-head text-sm font-bold text-cream">{title}</p>
        <a
          href={buildTourBookingUrl(title, slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="fleet-card-cta shrink-0 rounded-lg px-4 py-2.5 text-[0.7rem] font-semibold tracking-wide text-cream uppercase"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
