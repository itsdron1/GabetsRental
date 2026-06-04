import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  formatBookingEmailText,
  validateBookingFormData,
  type BookingFormData,
} from "@/lib/booking";
import { CONTACT_EMAIL } from "@/lib/whatsapp";

function isBookingPayload(body: unknown): body is BookingFormData {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    typeof b.lastName === "string" &&
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
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");

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

  const data: BookingFormData = {
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    whatsapp: body.whatsapp.trim(),
    address: body.address.trim(),
    pickupDate: body.pickupDate.trim(),
    returnDate: body.returnDate.trim(),
    bike: body.bike.trim(),
    specialRequests: body.specialRequests.trim(),
  };

  const validationError = validateBookingFormData(data);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
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
