import Reveal from "@/components/Reveal";
import { WHATSAPP_DELIVERY_NORTH_URL } from "@/lib/constants";
import { deliveryPerks, deliveryZones } from "@/lib/data";

export default function Delivery() {
  return (
    <section
      id="delivery"
      className="relative z-[1] bg-gradient-to-b from-bg to-[#070a0e]"
    >
      <div className="section-inner">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="section-tag">Delivery</div>
            <h2 className="section-title">We Bring the Bike to You</h2>
            <p className="section-subtitle mb-10">
              No need to come to us — tell us where you&apos;re staying and your bike will be
              ready at your door.
            </p>

            <div className="flex flex-col gap-7">
              {deliveryPerks.map((perk, index) => (
                <Reveal key={perk.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold-soft text-xl">
                      {perk.icon}
                    </div>
                    <div>
                      <h4 className="font-head text-base font-bold text-cream">{perk.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{perk.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="delivery-visual relative overflow-hidden rounded-2xl border border-border bg-glass p-8 backdrop-blur-md md:p-10">
              <div className="mb-7 flex aspect-[4/3] flex-col items-center justify-center gap-2.5 rounded-[10px] border border-border bg-gradient-to-br from-[#0c1018] to-[#111820] text-xs tracking-widest text-gold/30 uppercase">
                <span className="text-[2.5rem]">🗺️</span>
                Add delivery zones map here
              </div>
              <div className="flex flex-col gap-2.5">
                {deliveryZones.map((zone) => (
                  <div
                    key={zone.name}
                    className="delivery-zone-row flex flex-col gap-2 rounded-lg border-l-2 border-gold bg-black/30 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="min-w-0 font-medium leading-snug text-cream">
                      {zone.name}
                    </span>
                    {zone.free ? (
                      <span className="delivery-price-free shrink-0 self-start sm:self-center">
                        {zone.price}
                      </span>
                    ) : zone.contact ? (
                      <a
                        href={WHATSAPP_DELIVERY_NORTH_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="delivery-price-contact shrink-0 self-start sm:self-center"
                      >
                        {zone.price}
                      </a>
                    ) : (
                      <span className="shrink-0 self-start font-semibold tabular-nums text-gold sm:self-center">
                        {zone.price}
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
