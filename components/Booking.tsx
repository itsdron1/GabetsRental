"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { Link } from "@/i18n/navigation";
import { trustItems } from "@/lib/data";

export default function Booking() {
  const t = useTranslations("booking");

  return (
    <section id="booking" className="section-deferred relative z-[1] bg-surface">
      <div className="section-inner">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="section-tag">{t("tag")}</div>
            <h2 className="section-title mb-5">{t("title")}</h2>
            <p className="mb-10 text-muted">
              {t("introBefore")}{" "}
              <Link href="#fleet" className="text-gold transition-colors hover:text-cream">
                {t("fleetLink")}
              </Link>
              {t("introMid")}{" "}
              <Link href="/tour-packages" className="text-gold transition-colors hover:text-cream">
                {t("toursLink")}
              </Link>
              {t("introAfter")}
            </p>
            <ul className="flex flex-col gap-4">
              {trustItems.map((item, index) => (
                <li key={item} className="flex items-center gap-3.5 text-sm text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {t(`trust.${index}`)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2}>
            <BookingForm idPrefix="page" formLocation="page" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
