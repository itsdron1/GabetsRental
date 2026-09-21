type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function currentLanguage(): "en" | "ru" | "id" {
  if (typeof document === "undefined") return "en";
  const lang = document.documentElement.lang;
  return lang === "ru" || lang === "id" ? lang : "en";
}

/** Push a custom event for GTM / ads pixels. No-ops on the server. */
export function pushDataLayer(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, language: currentLanguage(), ...params });
}

export function trackWhatsAppClick(source?: string): void {
  pushDataLayer("whatsapp_click", source ? { source } : {});
}

export function trackBookingSubmit(
  bikeName?: string,
  formLocation?: "modal" | "page",
): void {
  pushDataLayer("booking_submit", {
    ...(bikeName ? { bike_model: bikeName } : {}),
    ...(formLocation ? { form_location: formLocation } : {}),
  });
}

export function trackBookClick(bikeModel: string): void {
  pushDataLayer("book_click", { bike_model: bikeModel });
}

export function trackSpecsExpand(bikeModel: string): void {
  pushDataLayer("specs_expand", { bike_model: bikeModel });
}
