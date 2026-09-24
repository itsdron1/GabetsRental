"use client";

import { type MouseEvent, type ReactNode } from "react";
import { useBooking } from "@/components/BookingContext";
import { trackBookClick, type BookClickSource } from "@/lib/analytics";

type BookingTriggerProps = {
  children: ReactNode;
  className?: string;
  bikeName?: string;
  source: BookClickSource;
  as?: "button" | "a";
  href?: string;
};

export default function BookingTrigger({
  children,
  className,
  bikeName,
  source,
  as = "button",
  href = "#booking",
}: BookingTriggerProps) {
  const { openBooking } = useBooking();

  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    trackBookClick({
      source,
      ...(bikeName ? { bikeModel: bikeName } : {}),
    });
    openBooking({
      bikeName,
      trigger: e.currentTarget,
    });
  };

  if (as === "a") {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
