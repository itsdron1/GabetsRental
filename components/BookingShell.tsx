"use client";

import { type ReactNode } from "react";
import { BookingProvider } from "@/components/BookingContext";
import BookingModal from "@/components/BookingModal";

export default function BookingShell({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      {children}
      <BookingModal />
    </BookingProvider>
  );
}
