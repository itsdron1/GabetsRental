import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

export default async function HomeFaq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="section-deferred relative z-[1] bg-bg">
      <div className="section-inner">
        <Reveal className="mb-8 max-w-2xl">
          <div className="section-tag">{t("tag")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitleBefore")}{" "}
            <Link href="/tour-packages" className="text-teal transition-colors hover:underline">
              {t("toursLink")}
            </Link>
            {t("subtitleAfter")}
          </p>
        </Reveal>
        <div className="flex max-w-3xl flex-col gap-3">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <details className="faq-item rounded-xl border border-border bg-surface-1 px-5 py-4">
                <summary className="cursor-pointer list-none font-head text-base font-bold text-cream">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
