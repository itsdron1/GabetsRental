import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for G-DRIVE Bike Rental Bali — how we collect and use booking and contact data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="relative z-[1] min-h-svh bg-bg px-5 py-24 md:px-8 md:py-28">
        <article className="mx-auto max-w-3xl">
          {/* TODO: DRAFT — replace with lawyer-reviewed Indonesian / English privacy policy before paid ads scale. */}
          <div className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            ЧЕРНОВИК — ТРЕБУЕТ ПРОВЕРКИ ЮРИСТОМ / DRAFT — REQUIRES LEGAL REVIEW
          </div>
          <p className="mb-2 text-sm text-muted">
            <Link href="/" className="text-gold hover:text-cream">
              ← Home
            </Link>
          </p>
          <h1 className="font-head text-3xl font-extrabold text-cream md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">
            Last updated: August 2026 · G-DRIVE Bike Rental Bali
          </p>

          <div className="mt-10 space-y-6 text-sm leading-relaxed text-cream/80">
            <p>
              This Privacy Policy describes how G-DRIVE Bike Rental Bali (also known as
              Gabet&apos;s Rental Bali), operating in Bali, Indonesia (&quot;we&quot;,
              &quot;us&quot;), collects and uses personal information when you use
              gdrivebikerentalbali.com or contact us to rent a motorcycle or book a tour.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Information we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Name and WhatsApp / phone number submitted via the booking form</li>
              <li>Optional delivery address, hotel, or villa details</li>
              <li>Pick-up / return dates and selected bike or tour</li>
              <li>Optional special requests and email correspondence</li>
              <li>
                Technical data such as browser type and pages visited (via analytics tools if
                enabled)
              </li>
            </ul>
            <h2 className="font-head text-xl font-bold text-cream">How we use your information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To confirm and manage motorcycle / car rentals and guided tours</li>
              <li>To communicate via WhatsApp, email, or phone about your booking</li>
              <li>To arrange delivery and pickup across Bali</li>
              <li>To improve our website and advertising performance (aggregated analytics)</li>
            </ul>
            <h2 className="font-head text-xl font-bold text-cream">Sharing</h2>
            <p>
              We do not sell your personal data. We may share information with service providers who
              process bookings or host our website (e.g. hosting, email delivery) only as needed to
              operate the service, or when required by Indonesian law.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">WhatsApp</h2>
            <p>
              Booking confirmations and support often happen on WhatsApp. Messages you send are also
              subject to WhatsApp&apos;s own privacy terms (Meta Platforms).
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Retention &amp; your rights</h2>
            <p>
              We keep booking records as long as needed for operations and legal compliance. You may
              request access, correction, or deletion of your personal data by contacting us via
              WhatsApp or email listed on the website.
            </p>
            <h2 className="font-head text-xl font-bold text-cream">Contact</h2>
            <p>
              G-DRIVE Bike Rental Bali · Bali, Indonesia · See the Contact section on our homepage
              for current WhatsApp and email.
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
