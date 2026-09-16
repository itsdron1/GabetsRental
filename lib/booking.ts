import { isAppLocale, type AppLocale } from "@/i18n/routing";
import { isIsoDateBefore, isIsoDateInPast } from "@/lib/dates";
import { normalizeToE164, validateWhatsAppNumber } from "@/lib/phone";

export type BookingFormData = {
  firstName: string;
  whatsapp: string;
  address: string;
  pickupDate: string;
  returnDate: string;
  bike: string;
  specialRequests: string;
  locale?: AppLocale;
};

export function parseBookingLocale(value: unknown): AppLocale {
  return typeof value === "string" && isAppLocale(value) ? value : "en";
}

export function parseBookingFormData(formData: FormData): BookingFormData {
  const rawWhatsapp = String(formData.get("whatsapp") ?? "").trim();
  return {
    firstName: String(formData.get("firstName") ?? "").trim(),
    whatsapp: normalizeToE164(rawWhatsapp) ?? rawWhatsapp,
    address: String(formData.get("address") ?? "").trim(),
    pickupDate: String(formData.get("pickupDate") ?? "").trim(),
    returnDate: String(formData.get("returnDate") ?? "").trim(),
    bike: String(formData.get("bike") ?? "").trim(),
    specialRequests: String(formData.get("specialRequests") ?? "").trim(),
  };
}

export type BookingFieldError =
  | "firstName"
  | "phoneRequired"
  | "phoneInvalid"
  | "pickupDate"
  | "pickupPast"
  | "returnBeforePickup"
  | "bike"
  | "nameTooLong"
  | "addressTooLong"
  | "requestsTooLong";

export function validateBookingFormData(data: BookingFormData): BookingFieldError | null {
  if (!data.firstName) return "firstName";
  const phoneError = validateWhatsAppNumber(data.whatsapp);
  if (phoneError === "required") return "phoneRequired";
  if (phoneError) return "phoneInvalid";
  if (!data.pickupDate) return "pickupDate";
  if (isIsoDateInPast(data.pickupDate)) return "pickupPast";
  if (data.returnDate && isIsoDateBefore(data.returnDate, data.pickupDate)) {
    return "returnBeforePickup";
  }
  if (!data.bike) return "bike";
  if (data.firstName.length > 80) return "nameTooLong";
  if (data.address.length > 300) return "addressTooLong";
  if (data.specialRequests.length > 1000) return "requestsTooLong";
  return null;
}

export function formatBookingWhatsAppMessage(data: BookingFormData): string {
  const name = data.firstName;
  const lines = [
    "🏍️ Booking Request — G-DRIVE Bike Rental Bali",
    "",
    `Name: ${name}`,
    `WhatsApp: ${data.whatsapp}`,
    `Delivery address: ${data.address || "—"}`,
    `Pick-up: ${data.pickupDate}`,
    `Return: ${data.returnDate || "—"}`,
    `Bike: ${data.bike}`,
  ];

  if (data.specialRequests) {
    lines.push(`Notes: ${data.specialRequests}`);
  }

  lines.push("", "Please confirm my reservation. Thank you!");
  return lines.join("\n");
}

export function formatBookingEmailText(data: BookingFormData): string {
  const name = data.firstName;
  return [
    "New booking request — G-DRIVE Bike Rental Bali",
    "",
    `Name: ${name}`,
    `WhatsApp: ${data.whatsapp}`,
    `Delivery address: ${data.address || "—"}`,
    `Pick-up date: ${data.pickupDate}`,
    `Return date: ${data.returnDate || "—"}`,
    `Bike: ${data.bike}`,
    `Special requests: ${data.specialRequests || "—"}`,
    `Locale: ${data.locale ?? "en"}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}
