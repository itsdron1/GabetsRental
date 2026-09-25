import { getTranslations } from "next-intl/server";
import BrandIcon, { type BrandIconName } from "@/components/BrandIcon";
import Reveal from "@/components/Reveal";
import { whyCards } from "@/lib/data";

const WHY_ICONS: BrandIconName[] = [
  "service",
  "shield",
  "chat",
  "license",
  "card",
  "calendar",
];

export default async function WhyUs() {
  const t = await getTranslations("whyUs");

  return (
    <section id="why" className="section-deferred relative z-[1] bg-bg">
      <div className="section-inner">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <div className="section-tag mx-auto">{t("tag")}</div>
          <h2 className="section-title">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
          <p className="section-subtitle mx-auto mt-4">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card, index) => (
            <Reveal key={card.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <article className="why-card relative h-full overflow-hidden rounded-2xl border border-border bg-surface-1 p-8 transition-[transform,border-color] duration-350 hover:-translate-y-0.5 hover:border-teal/40">
                <BrandIcon name={WHY_ICONS[index] ?? "clients"} size={40} framed className="mb-5" />
                <h3 className="font-head text-lg font-bold text-ivory">{t(`cards.${index}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-text">{t(`cards.${index}.text`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
