import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const DEFAULT_PHONE_COUNTRY: CountryCode = "ID";

export const PHONE_ERROR_MESSAGE =
  "Enter a valid WhatsApp number, e.g. +62 812 3456 7890";

export type PhoneValidationError = "required" | "invalid";

const BUSINESS_E164 = `+${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

const SEQUENCES = ["0123456789", "1234567890", "9876543210", "0987654321"];

export type PhoneCountryOption = {
  code: CountryCode;
  name: string;
  dial: string;
};

export function getPhoneCountryOptions(locale = "en"): PhoneCountryOption[] {
  const display = new Intl.DisplayNames([locale], { type: "region" });
  return getCountries()
    .map((code) => ({
      code,
      name: display.of(code) ?? code,
      dial: `+${getCountryCallingCode(code)}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}

export function normalizeToE164(
  input: string,
  defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY,
): string | null {
  const parsed = parsePhoneNumberFromString(input.trim(), defaultCountry);
  return parsed?.number ?? null;
}

function isRepeatedDigits(digits: string): boolean {
  return digits.length >= 8 && /^(\d)\1+$/.test(digits);
}

function isSequentialDigits(digits: string): boolean {
  return SEQUENCES.some((seq) => digits.includes(seq) || seq.includes(digits));
}

export function isFakePhoneNumber(e164: string): boolean {
  if (e164 === BUSINESS_E164) return true;
  const digits = e164.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  const last8 = digits.slice(-8);
  if (isRepeatedDigits(last10) || isRepeatedDigits(last8) || isRepeatedDigits(digits)) {
    return true;
  }
  if (isSequentialDigits(last10) || isSequentialDigits(digits)) {
    return true;
  }
  return false;
}

export function validateWhatsAppNumber(
  input: string,
  defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY,
): PhoneValidationError | null {
  if (!input.trim()) return "required";
  const parsed = parsePhoneNumberFromString(input.trim(), defaultCountry);
  if (!parsed || !isValidPhoneNumber(parsed.number)) {
    return "invalid";
  }
  if (isFakePhoneNumber(parsed.number)) {
    return "invalid";
  }
  return null;
}
