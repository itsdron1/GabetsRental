import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-border bg-footer px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-4 block font-head text-[1.4rem] font-extrabold tracking-[0.06em] text-cream">
              Gabet&apos;s <span className="text-gold">Rental</span> Bali
            </span>
            <p className="max-w-[280px] text-sm leading-relaxed text-muted">
              Premium scooter rental with island-wide delivery. Trusted by travelers, digital
              nomads, and expats across Bali since 2018.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-head text-[0.72rem] font-bold tracking-[0.18em] text-gold uppercase">
              Fleet
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "Honda Vario 125",
                "Honda PCX 160",
                "Yamaha NMAX 155",
                "Honda ADV 160",
                "Yamaha Aerox",
              ].map((name) => (
                <li key={name}>
                  <a
                    href="#fleet"
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-head text-[0.72rem] font-bold tracking-[0.18em] text-gold uppercase">
              Zones
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["Canggu", "Seminyak", "Ubud", "Uluwatu", "Airport"].map((zone) => (
                <li key={zone}>
                  <a
                    href="#delivery"
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {zone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-head text-[0.72rem] font-bold tracking-[0.18em] text-gold uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-sm text-muted transition-colors hover:text-cream"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  Booking Form
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@gabetsrentalbali.com"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-7 text-center text-[0.78rem] text-cream/25 sm:flex-row sm:text-left">
          <span>© 2024 Gabet&apos;s Rental Bali. All rights reserved.</span>
          <span>Built for adventurers. 🌴 Bali, Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
