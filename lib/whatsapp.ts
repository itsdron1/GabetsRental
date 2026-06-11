export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "628133737779";

export const WHATSAPP_DISPLAY = "+62 813 3737779";

export const CONTACT_EMAIL = "kaifotourbali@gmail.com";

export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabetsrentalbali.com";

export function buildWhatsAppMessageUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTourBookingUrl(tourTitle: string, slug: string): string {
  const msg = `🏍️ Tour Booking — G-DRIVE Bike Rental Bali\n\nTour: ${tourTitle}\nURL: ${SITE_URL}/tour-packages/${slug}\n\nI'd like to check availability and pricing.`;
  return buildWhatsAppMessageUrl(msg);
}
