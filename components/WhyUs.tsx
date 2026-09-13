import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import { whyCards } from "@/lib/data";

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
              <article className="why-card relative h-full overflow-hidden rounded-2xl border border-border bg-glass p-8 backdrop-blur-md transition-[transform,border-color] duration-350 hover:-translate-y-0.5 hover:border-gold/20">
                <span className="mb-5 block text-[2.2rem]">{card.icon}</span>
                <h3 className="font-head text-lg font-bold text-cream">{t(`cards.${index}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t(`cards.${index}.text`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
