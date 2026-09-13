"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type OpenBookingOptions = {
  bikeName?: string;
  trigger?: HTMLElement | null;
};

type BookingContextValue = {
  isOpen: boolean;
  selectedBike: string;
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

function clearBookingHash() {
  if (typeof window === "undefined") return;
  if (window.location.hash !== "#booking") return;
  const url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", url);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState("");
  const triggerRef = useRef<HTMLElement | null>(null);

  const openBooking = useCallback((options?: OpenBookingOptions) => {
    triggerRef.current = options?.trigger ?? (document.activeElement as HTMLElement | null);
    setSelectedBike(options?.bikeName ?? "");
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    clearBookingHash();
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger && document.contains(trigger)) {
      trigger.focus();
    }
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#booking") {
        openBooking();
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openBooking]);

  const value = useMemo(
    () => ({ isOpen, selectedBike, openBooking, closeBooking }),
    [isOpen, selectedBike, openBooking, closeBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
