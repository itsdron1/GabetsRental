type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/** Push a custom event for GTM / ads pixels. No-ops on the server. */
export function pushDataLayer(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

export function trackWhatsAppClick(source?: string): void {
  pushDataLayer("whatsapp_click", source ? { source } : {});
}

export function trackBookingSubmit(bikeName?: string): void {
  pushDataLayer("booking_submit", bikeName ? { bike_model: bikeName } : {});
}

export function trackBookClick(bikeModel: string): void {
  pushDataLayer("book_click", { bike_model: bikeModel });
}
