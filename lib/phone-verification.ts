export type PhoneVerificationResult =
  | { status: "valid" }
  | { status: "invalid" }
  | { status: "skipped"; reason: string };

const NUMVERIFY_URL = "https://apilayer.net/api/validate";
const TIMEOUT_MS = 3000;

/**
 * External phone-reality check. Swap the provider here without touching the API route.
 * Fail-open: only reject when the provider explicitly says the number is invalid.
 */
export async function verifyPhone(e164: string): Promise<PhoneVerificationResult> {
  const apiKey = process.env.PHONE_VERIFY_API_KEY?.trim();
  if (!apiKey) {
    return { status: "skipped", reason: "PHONE_VERIFY_API_KEY is not set" };
  }

  const url = `${NUMVERIFY_URL}?access_key=${encodeURIComponent(apiKey)}&number=${encodeURIComponent(e164)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      return { status: "skipped", reason: `NumVerify HTTP ${response.status}` };
    }

    const payload = (await response.json()) as {
      valid?: boolean;
      success?: boolean;
      error?: { info?: string; code?: number };
    };

    if (payload.error) {
      return {
        status: "skipped",
        reason: payload.error.info ?? `NumVerify error ${payload.error.code ?? ""}`.trim(),
      };
    }

    if (payload.valid === false) {
      return { status: "invalid" };
    }

    if (payload.valid === true) {
      return { status: "valid" };
    }

    return { status: "skipped", reason: "NumVerify returned no validity flag" };
  } catch (error) {
    const reason =
      error instanceof DOMException && error.name === "AbortError"
        ? "NumVerify timed out"
        : error instanceof Error
          ? error.message
          : "NumVerify request failed";
    return { status: "skipped", reason };
  } finally {
    clearTimeout(timer);
  }
}
