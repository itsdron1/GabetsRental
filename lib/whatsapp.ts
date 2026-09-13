export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "628133737779";

export const WHATSAPP_DISPLAY = "+62 813 373 7779";

export const CONTACT_EMAIL = "kaifotourbali@gmail.com";

export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdrivebikerentalbali.com";

export function buildWhatsAppMessageUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTourBookingUrl(message: string): string {
  return buildWhatsAppMessageUrl(message);
}

export function publicUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
