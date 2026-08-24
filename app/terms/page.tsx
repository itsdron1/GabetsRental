import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for motorcycle and car rental with G-DRIVE Bike Rental Bali.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="relative z-[1] min-h-svh bg-bg px-5 py-24 md:px-8 md:py-28">
        <article className="mx-auto max-w-3xl">
          {/* TODO: DRAFT — replace with lawyer-reviewed rental terms (Indonesia) before paid ads scale. */}
          <div className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            ЧЕРНОВИК — ТРЕБУЕТ ПРОВЕРКИ ЮРИСТОМ / DRAFT — REQUIRES LEGAL REVIEW
          </div>
          <p className="mb-2 text-sm text-muted">
            <Link href="/" className="text-gold hover:text-cream">
              ← Home
            </Link>
          </p>
          <h1 className="font-head text-3xl font-extrabold text-cream md:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted">
            Last updated: August 2026 · G-DRIVE Bike Rental Bali
          </p>

          <div className="mt-10 space-y-6 text-sm leading-relaxed text-cream/80">
            <p>
              These Terms govern motorcycle, scooter, and car rentals and guided tours offered by
              G-DRIVE Bike Rental Bali in Bali, Indonesia. By submitting a booking request or
              renting a vehicle, you agree to these Terms.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Eligibility</h2>
            <p>
              You must hold a valid driving licence appropriate for the vehicle class (including an
              International Driving Permit where required by Indonesian law) and be fit to ride or
              drive safely.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Bookings &amp; payment</h2>
            <p>
              Online forms and WhatsApp messages are requests, not guaranteed reservations until we
              confirm availability. Prices are shown in Indonesian Rupiah (IDR) per day unless stated
              otherwise. Payment terms (including deposits) are confirmed before handover.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Your responsibilities</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the vehicle carefully and only for lawful purposes on Bali</li>
              <li>Wear a helmet when riding a motorcycle or scooter</li>
              <li>Do not ride under the influence of alcohol or drugs</li>
              <li>Report accidents or damage to us immediately via WhatsApp</li>
              <li>Return the vehicle on time in the agreed condition</li>
            </ul>
            <h2 className="font-head text-xl font-bold text-cream">Insurance &amp; liability</h2>
            <p>
              Coverage details (including third-party liability where included) are explained at
              booking. You may be responsible for damage, loss, or fines arising from misuse,
              neglect, or violation of traffic laws. Nothing in these Terms limits liability that
              cannot be limited under Indonesian law.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Cancellations</h2>
            <p>
              Free cancellation windows (if any) are stated at confirmation. No-shows or late returns
              may incur fees as communicated when you book.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Governing law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Indonesia. Disputes should
              first be resolved amicably via WhatsApp or email.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Contact</h2>
            <p>
              Questions about these Terms: use the contact details on gdrivebikerentalbali.com
              (WhatsApp / email).
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
