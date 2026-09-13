import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { isAppLocale, routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  let locale = isAppLocale(requested) ? requested : null;
  if (!locale) {
    const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
    locale = isAppLocale(cookieLocale) ? cookieLocale : routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
