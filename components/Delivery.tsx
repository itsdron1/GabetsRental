import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import {
  GOOGLE_BUSINESS_URL,
  GOOGLE_MAPS_EMBED_URL,
} from "@/lib/constants";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { deliveryPerks, deliveryZones } from "@/lib/data";

export default async function Delivery() {
  const t = await getTranslations("delivery");
  const tCommon = await getTranslations("common");
  const northUrl = buildWhatsAppMessageUrl(tCommon("whatsappDeliveryPrefill"));

  return (
    <section
      id="delivery"
      className="section-deferred relative z-[1] bg-charcoal"
    >
      <div className="section-inner">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="section-tag">{t("tag")}</div>
            <h2 className="section-title">{t("title")}</h2>
            <p className="section-subtitle mb-6">{t("subtitle")}</p>
            <p className="mb-10 max-w-[520px] text-sm leading-relaxed text-muted">
              {t("body", { price: t("southPrice") })}
            </p>

            <div className="flex flex-col gap-7">
              {deliveryPerks.map((perk, index) => (
                <Reveal key={perk.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold-soft text-xl">
                      {perk.icon}
                    </div>
                    <div>
                      <h4 className="font-head text-base font-bold text-cream">
                        {t(`perks.${index}.title`)}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {t(`perks.${index}.text`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="delivery-visual relative overflow-hidden rounded-2xl border border-border bg-glass p-8 md:p-10">
              <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-[10px] border border-border bg-surface-2">
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  title={t("mapTitle")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-0.5 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-4 pt-10 pb-3 transition-colors hover:from-black hover:via-black/80"
                >
                  <span className="font-head text-sm font-bold text-cream">
                    G-DRIVE Bike Rental Bali
                  </span>
                  <span className="text-[0.65rem] tracking-widest text-gold uppercase">
                    {t("viewOnGoogle")}
                  </span>
                </a>
              </div>
              <div className="flex flex-col gap-2.5">
                {deliveryZones.map((zone, index) => (
                  <div
                    key={zone.name}
                    className="delivery-zone-row flex flex-col gap-2 rounded-lg border-l-2 border-gold bg-black/30 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="min-w-0 font-medium leading-snug text-cream">
                      {t(`zones.${index}.name`)}
                    </span>
                    {zone.free ? (
                      <span className="delivery-price-free shrink-0 self-start sm:self-center">
                        {t(`zones.${index}.price`)}
                      </span>
                    ) : zone.contact ? (
                      <a
                        href={northUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="delivery-price-contact shrink-0 self-start sm:self-center"
                      >
                        {t(`zones.${index}.price`)}
                      </a>
                    ) : (
                      <span className="shrink-0 self-start font-semibold tabular-nums text-gold sm:self-center">
                        {t(`zones.${index}.price`)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
