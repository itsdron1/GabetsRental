"use client";

import { scrollToId } from "@/lib/scroll";

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button type="button" onClick={() => scrollToId("fleet")} className="btn-primary">
        Browse Fleet
      </button>
      <button type="button" onClick={() => scrollToId("booking")} className="btn-ghost">
        Make a Booking
      </button>
    </div>
  );
}
