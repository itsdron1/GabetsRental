export const GA4_MEASUREMENT_ID = "G-H40SZBCH80";

type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

type GtagFunction = {
  (command: "js", date: Date): void;
  (command: "config", targetId: string, config?: Record<string, unknown>): void;
  (command: "event", eventName: string, params?: Record<string, unknown>): void;
  (command: "set", params: Record<string, unknown>): void;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: GtagFunction;
  }
}

function currentLanguage(): "en" | "ru" | "id" {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.lang;
  return lang === "ru" || lang === "id" ? lang : "en";
}

/**
 * Sends a custom event to both GTM (dataLayer) and GA4 (gtag).
 * Reuses the existing dataLayer array — never replaces it.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const payload = { language: currentLanguage(), ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
}

export function trackWhatsAppClick(source?: string): void {
  trackEvent("whatsapp_click", source ? { source } : {});
}

export function trackBookingSubmit(
  bikeName?: string,
  formLocation?: "modal" | "page",
): void {
  trackEvent("booking_submit", {
    ...(bikeName ? { bike_model: bikeName } : {}),
    ...(formLocation ? { form_location: formLocation } : {}),
  });
}

export type BookClickSource =
  | "bike_card"
  | "header"
  | "hero"
  | "nav"
  | "footer"
  | "inline_link"
  | "anchor";

export function trackBookClick(options: {
  source: BookClickSource;
  bikeModel?: string;
}): void {
  trackEvent("book_click", {
    source: options.source,
    ...(options.bikeModel ? { bike_model: options.bikeModel } : {}),
  });
}

export function trackSpecsExpand(bikeModel: string): void {
  trackEvent("specs_expand", { bike_model: bikeModel });
}
