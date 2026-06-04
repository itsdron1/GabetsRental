export type BookingFormData = {
  firstName: string;
  lastName: string;
  whatsapp: string;
  address: string;
  pickupDate: string;
  returnDate: string;
  bike: string;
  specialRequests: string;
};

export function parseBookingFormData(formData: FormData): BookingFormData {
  return {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    whatsapp: String(formData.get("whatsapp") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    pickupDate: String(formData.get("pickupDate") ?? "").trim(),
    returnDate: String(formData.get("returnDate") ?? "").trim(),
    bike: String(formData.get("bike") ?? "").trim(),
    specialRequests: String(formData.get("specialRequests") ?? "").trim(),
  };
}

export function validateBookingFormData(data: BookingFormData): string | null {
  if (!data.firstName) return "First name is required.";
  if (!data.whatsapp) return "WhatsApp number is required.";
  if (!data.pickupDate) return "Pick-up date is required.";
  if (!data.bike) return "Please select a bike.";
  if (data.firstName.length > 80 || data.lastName.length > 80) return "Name is too long.";
  if (data.whatsapp.length > 40) return "WhatsApp number is too long.";
  if (data.address.length > 300) return "Address is too long.";
  if (data.specialRequests.length > 1000) return "Special requests are too long.";
  return null;
}

export function formatBookingWhatsAppMessage(data: BookingFormData): string {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
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
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
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
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}
