"use client";

import { useTranslations } from "next-intl";
import BookingTrigger from "@/components/BookingTrigger";
import { scrollToId } from "@/lib/scroll";

export default function HeroActions() {
  const t = useTranslations("hero");

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button type="button" onClick={() => scrollToId("fleet")} className="btn-primary">
        {t("browseFleet")}
      </button>
      <BookingTrigger className="btn-ghost">{t("makeBooking")}</BookingTrigger>
    </div>
  );
}
