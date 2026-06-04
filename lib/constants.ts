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

export const GOOGLE_MAPS_GABETS_PUB_URL =
  "https://www.google.com/maps/place/gabets+pub/data=!4m2!3m1!1s0x2dd24517e12dccfb:0x7c44e299fe7904ca?sa=X&ved=1t:242&ictx=111";

/** Embedded map preview for Delivery section (Gabets Pub, Uluwatu). */
export const GOOGLE_MAPS_GABETS_PUB_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2!2d115.0889!3d-8.8221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24517e12dccfb%3A0x7c44e299fe7904ca!2sGabets%20Pub!5e0!3m2!1sen!2sid!4v1748880000!5m2!1sen!2sid";
