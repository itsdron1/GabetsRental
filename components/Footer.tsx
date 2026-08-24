import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { LOCAL_AREAS } from "@/lib/seo";

const fleetLinks = [
  { label: "Harley-Davidson Heritage Softail", href: "#fleet" },
  { label: "BMW F800GS Adventure", href: "#fleet" },
  { label: "Yamaha YZF-R6 Sport", href: "#fleet" },
  { label: "Kawasaki Z900", href: "#fleet" },
  { label: "Ducati Monster 795", href: "#fleet" },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-border bg-footer px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-4 block font-head text-[1.4rem] font-extrabold tracking-[0.06em] text-cream">
              G-DRIVE <span className="text-gold">Bike Rental</span> Bali
            </span>
            <p className="max-w-[300px] text-sm leading-relaxed text-muted">
              Premium motorcycle rental Bali — big bike rental, sport bike rental, and motorbike
              hire with delivery. Trusted by travellers and expats since 2018.
            </p>
            <p className="mt-4 max-w-[300px] text-xs leading-relaxed text-cream/35">
              Also known as Gabet&apos;s Rental Bali · Motorcycle rental service · Bali,
              Indonesia
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-head text-[0.72rem] font-bold tracking-[0.18em] text-gold uppercase">
              Fleet
            </h4>
            <ul className="flex flex-col gap-2.5">
              {fleetLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/#fleet"
                  className="text-sm font-medium text-gold transition-colors hover:text-cream"
                >
                  View full fleet →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-head text-[0.72rem] font-bold tracking-[0.18em] text-gold uppercase">
              Delivery Zones
            </h4>
            <ul className="flex flex-col gap-2.5">
              {LOCAL_AREAS.map((zone) => (
                <li key={zone}>
                  <a
                    href="#delivery"
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    Bike rental {zone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#delivery"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  Airport / Ngurah Rai
                </a>
              </li>
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  Facebook
                </a>
              </li>
              <li>
                <Link
                  href="/tour-packages"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  Motorcycle Tours Bali
                </Link>
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
                  href={CONTACT_EMAIL_URL}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-7 text-center text-[0.78rem] text-cream/25 sm:flex-row sm:text-left">
          <span>
            © {new Date().getFullYear()} G-DRIVE Bike Rental Bali. All rights reserved.
          </span>
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/privacy-policy" className="transition-colors hover:text-cream/50">
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="transition-colors hover:text-cream/50">
              Terms
            </Link>
            <span aria-hidden>·</span>
            <span>Motorbike rental Bali · Indonesia</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
