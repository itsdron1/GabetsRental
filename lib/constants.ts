import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  buildWhatsAppMessageUrl,
} from "@/lib/whatsapp";

export { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, CONTACT_EMAIL, CONTACT_EMAIL_URL };

export const WHATSAPP_BOOKING_URL = buildWhatsAppMessageUrl(
  "Hi! I just filled in the booking form on G-DRIVE Bike Rental Bali. Can you confirm my reservation?",
);

export const WHATSAPP_CHAT_URL = buildWhatsAppMessageUrl(
  "Hi G-DRIVE Bike Rental Bali! I'd like to book a bike.",
);

export const WHATSAPP_DELIVERY_NORTH_URL = buildWhatsAppMessageUrl(
  "Hi G-DRIVE Bike Rental Bali! I'd like to inquire about delivery to North Bali / Singaraja.",
);

/** Google Business / reviews & location share link (G-Drive Bike Rental) */
export const GOOGLE_BUSINESS_URL = "https://share.google/aGjk4xFdmVkUwqLcj";

/** Alias kept for existing imports */
export const GOOGLE_MAPS_GABETS_PUB_URL = GOOGLE_BUSINESS_URL;

/** Embedded map preview — G-Drive Bike Rental Bali */
export const GOOGLE_MAPS_GABETS_PUB_EMBED_URL =
  "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sG-Drive%20Bike%20Rental!6i16!3m1!1sen!5m1!1sen";

export const INSTAGRAM_URL =
  "https://www.instagram.com/g.drive.bali?igsi=bnljb2w0MHpreTZ5";

export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61590888897472";
