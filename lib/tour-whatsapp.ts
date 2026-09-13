import type { AppLocale } from "@/i18n/routing";
import { localizedPath } from "@/i18n/locale";
import { buildWhatsAppMessageUrl, publicUrl } from "@/lib/whatsapp";

export function tourBookingUrl(
  title: string,
  slug: string,
  locale: AppLocale,
  template: string,
): string {
  const url = publicUrl(localizedPath(locale, `/tour-packages/${slug}`));
  return buildWhatsAppMessageUrl(
    template.replaceAll("{title}", title).replaceAll("{url}", url),
  );
}
