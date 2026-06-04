import Reveal from "@/components/Reveal";
import HeroActions from "@/components/HeroActions";
import HeroParallaxMedia from "@/components/HeroParallaxMedia";

const stats = [
  { num: "20+", label: "Bikes in Fleet" },
  { num: "24h", label: "Support" },
  { num: "All Bali", label: "Delivery Coverage" },
  { num: "5★", label: "Avg Rating" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate flex min-h-svh w-full flex-col justify-end overflow-hidden"
    >
      <HeroParallaxMedia />

      <div className="hero-lines pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      <div className="relative z-10 flex w-full flex-col justify-end">
        <Reveal className="w-full px-5 md:px-8" delay={1}>
          <div className="hero-stats-glass mx-auto flex max-w-[1200px] flex-wrap rounded-t-2xl border-b-0 px-5 py-5 md:px-10 md:py-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item relative flex min-w-[50%] flex-1 flex-col items-center text-center md:min-w-0"
              >
                <span className="font-head text-3xl leading-none font-extrabold text-gold">
                  {stat.num}
                </span>
                <span className="mt-1 text-[0.72rem] tracking-[0.1em] text-muted uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          className="hero-text-glow w-full max-w-[1200px] px-5 pb-14 pt-2 md:px-8 md:pb-20 md:pt-4"
          delay={2}
        >
          <div className="max-w-[720px]">
            <div className="hero-eyebrow">Premium Motorcycle Rental Bali</div>
            <h1 className="mb-6 font-head text-[clamp(2.4rem,7.5vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight text-cream">
              Ride Bali
              <br />
              <em className="block font-normal text-gold not-italic">Your Way.</em>
            </h1>
            <p className="mb-10 max-w-[520px] text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-cream/80">
              Premium motorcycle rental Bali for riders who want more — big bike rental Bali,
              sport bike rental Bali, superbike rental Bali, and touring machines from
              Harley-Davidson, Kawasaki, Yamaha, BMW, and Ducati. Rent bike Bali with transparent
              pricing, island-wide delivery, and no hidden fees.
            </p>
            <HeroActions />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
