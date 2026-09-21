import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  formatBookingEmailText,
  parseBookingLocale,
  validateBookingFormData,
  type BookingFormData,
} from "@/lib/booking";
import { normalizeToE164, validateWhatsAppNumber } from "@/lib/phone";
import { verifyPhone } from "@/lib/phone-verification";
import { CONTACT_EMAIL } from "@/lib/whatsapp";

function isBookingPayload(body: unknown): body is BookingFormData {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    typeof b.whatsapp === "string" &&
    typeof b.address === "string" &&
    typeof b.pickupDate === "string" &&
    typeof b.returnDate === "string" &&
    typeof b.bike === "string" &&
    typeof b.specialRequests === "string"
  );
}

async function sendBookingEmail(data: BookingFormData): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  const to = process.env.BOOKING_NOTIFY_EMAIL ?? CONTACT_EMAIL;
  const from = process.env.SMTP_FROM ?? user;
  const name = data.firstName;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: undefined,
    subject: `New bike booking — ${name} — ${data.bike}`,
    text: formatBookingEmailText(data),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isBookingPayload(body)) {
    return NextResponse.json({ ok: false, error: "Invalid booking payload." }, { status: 400 });
  }

  const rawWhatsapp = body.whatsapp.trim();
  const e164 = normalizeToE164(rawWhatsapp) ?? rawWhatsapp;
  const phoneError = validateWhatsAppNumber(e164);
  if (phoneError) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid WhatsApp number, e.g. +62 812 3456 7890" },
      { status: 400 },
    );
  }

  const verification = await verifyPhone(e164);
  if (verification.status === "invalid") {
    return NextResponse.json(
      { ok: false, error: "Enter a valid WhatsApp number, e.g. +62 812 3456 7890" },
      { status: 400 },
    );
  }
  if (verification.status === "skipped") {
    console.warn("[booking] phone verification skipped:", verification.reason);
  }

  const data: BookingFormData = {
    firstName: body.firstName.trim(),
    whatsapp: e164,
    address: body.address.trim(),
    pickupDate: body.pickupDate.trim(),
    returnDate: body.returnDate.trim(),
    bike: body.bike.trim(),
    specialRequests: body.specialRequests.trim(),
    locale: parseBookingLocale((body as { locale?: unknown }).locale),
  };

  const validationError = validateBookingFormData(data);
  if (validationError) {
    const errorMap: Record<string, string> = {
      firstName: "First name is required.",
      phoneRequired: "WhatsApp number is required.",
      phoneInvalid: "Enter a valid WhatsApp number, e.g. +62 812 3456 7890",
      pickupDate: "Pick-up date is required.",
      pickupPast: "Pick-up date cannot be in the past.",
      returnBeforePickup: "Return date cannot be earlier than pick-up date.",
      bike: "Please select a bike.",
      nameTooLong: "Name is too long.",
      addressTooLong: "Address is too long.",
      requestsTooLong: "Special requests are too long.",
    };
    return NextResponse.json(
      { ok: false, error: errorMap[validationError] ?? validationError },
      { status: 400 },
    );
  }

  try {
    await sendBookingEmail(data);
    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email send failed";
    console.error("[booking]", message);
    return NextResponse.json(
      {
        ok: false,
        emailSent: false,
        error:
          message === "SMTP is not configured"
            ? "Email is not configured on the server. Contact support via WhatsApp."
            : "Could not send email. Please continue via WhatsApp.",
      },
      { status: 503 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
