import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import HeroActions from "@/components/HeroActions";
import HeroParallaxMedia from "@/components/HeroParallaxMedia";

export default async function Hero() {
  const t = await getTranslations("hero");
  const stats = [
    { num: t("statValues.bikes"), label: t("stats.bikes") },
    { num: t("statValues.support"), label: t("stats.support") },
    { num: t("statValues.delivery"), label: t("stats.delivery") },
    { num: t("statValues.rating"), label: t("stats.rating") },
  ];

  return (
    <section
      id="hero"
      aria-label={t("ariaLabel")}
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden md:min-h-[680px] md:justify-center md:pt-24 lg:min-h-[760px] xl:min-h-[820px]"
    >
      <HeroParallaxMedia />

      <div className="hero-lines pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      <div className="relative z-10 flex w-full flex-1 flex-col justify-end">
        <Reveal
          className="hero-text-glow w-full max-w-[1200px] px-5 pt-28 pb-8 md:px-8 md:pt-4 md:pb-20"
          delay={1}
        >
          <div className="max-w-[720px]">
            <div className="hero-eyebrow">{t("eyebrow")}</div>
            <h1 className="mb-6 font-head text-[clamp(2.4rem,7.5vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight text-ivory">
              {t("titleLine1")}
              <br />
              <em className="block font-normal text-petrol not-italic">{t("titleLine2")}</em>
            </h1>
            <p className="mb-10 max-w-[520px] text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-ivory/80">
              {t("body")}
            </p>
            <HeroActions />
          </div>
        </Reveal>

        <Reveal className="w-full px-5 pb-10 md:absolute md:right-8 md:bottom-10 md:w-auto md:px-0 md:pb-0" delay={2}>
          <div className="ml-auto flex max-w-[1200px] items-stretch justify-end">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item relative flex flex-col items-center px-3 text-center first:pl-0 last:pr-0 sm:px-5"
              >
                <span className="font-head text-2xl leading-none font-extrabold text-petrol sm:text-3xl">
                  {stat.num}
                </span>
                <span className="mt-1.5 text-[0.62rem] tracking-[0.18em] text-slate-text uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
