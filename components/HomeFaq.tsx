import Link from "next/link";
import Reveal from "@/components/Reveal";
import { HOME_FAQS } from "@/lib/seo";

export default function HomeFaq() {
  return (
    <section id="faq" className="section-deferred relative z-[1] bg-bg">
      <div className="section-inner">
        <Reveal className="mb-8 max-w-2xl">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">Motorcycle Rental Bali — Questions</h2>
          <p className="section-subtitle">
            Answers about premium motorcycle rental, delivery zones, and{" "}
            <Link href="/tour-packages" className="text-gold transition-colors hover:text-cream">
              Bali motorcycle tours
            </Link>
            .
          </p>
        </Reveal>
        <div className="flex max-w-3xl flex-col gap-3">
          {HOME_FAQS.map((item, index) => (
            <Reveal key={item.q} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <details className="rounded-xl border border-border bg-glass px-5 py-4">
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
