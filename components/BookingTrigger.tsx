"use client";

import { type MouseEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { trackBookClick, trackWhatsAppClick, type BookClickSource } from "@/lib/analytics";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";

type BookingTriggerProps = {
  children: ReactNode;
  className?: string;
  bikeName?: string;
  source: BookClickSource;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/** "Book" link: opens a WhatsApp chat with a prefilled message (no booking form). */
export default function BookingTrigger({
  children,
  className,
  bikeName,
  source,
  onClick,
}: BookingTriggerProps) {
  const t = useTranslations("common");

  const message = bikeName ? t("whatsappBikePrefill", { bike: bikeName }) : t("whatsappPrefill");
  const href = buildWhatsAppMessageUrl(message);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackBookClick({ source, ...(bikeName ? { bikeModel: bikeName } : {}) });
    trackWhatsAppClick(`book_${source}`);
    onClick?.(e);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
