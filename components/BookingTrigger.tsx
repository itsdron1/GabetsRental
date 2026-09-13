"use client";

import { type MouseEvent, type ReactNode } from "react";
import { useBooking } from "@/components/BookingContext";

type BookingTriggerProps = {
  children: ReactNode;
  className?: string;
  bikeName?: string;
  as?: "button" | "a";
  href?: string;
};

export default function BookingTrigger({
  children,
  className,
  bikeName,
  as = "button",
  href = "#booking",
}: BookingTriggerProps) {
  const { openBooking } = useBooking();

  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
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
