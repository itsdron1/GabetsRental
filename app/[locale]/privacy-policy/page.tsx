import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localizedPath } from "@/i18n/locale";
import { isAppLocale } from "@/i18n/routing";
import BookingShell from "@/components/BookingShell";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type PolicyLink = { text: string; url?: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  const t = await getTranslations({ locale: safeLocale, namespace: "privacy" });

  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: localizedPath(safeLocale, "/privacy-policy"),
    pathname: "/privacy-policy",
    locale: safeLocale,
  });
}

function ExternalLink({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="break-words text-teal hover:underline">
      {url}
    </a>
  );
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = isAppLocale(locale) ? locale : "en";
  setRequestLocale(safeLocale);

  const t = await getTranslations("common");
  const tp = await getTranslations("privacy");
  const collectItems = tp.raw("collect.items") as string[];
  const useItems = tp.raw("use.items") as string[];
  const cookieParagraphs = tp.raw("cookies.paragraphs") as string[];
  const cookieControls = tp.raw("cookies.controls") as PolicyLink[];
  const learnMore = tp.raw("cookies.learnMore") as Required<PolicyLink>;

  return (
    <BookingShell>
      <Nav />
      <main className="relative z-[1] min-h-svh bg-bg px-5 py-24 md:px-8 md:py-28">
        <article className="mx-auto max-w-3xl">
          {/* TODO: DRAFT — replace with lawyer-reviewed Indonesian / English privacy policy before paid ads scale. */}
          <div className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            ЧЕРНОВИК — ТРЕБУЕТ ПРОВЕРКИ ЮРИСТОМ / DRAFT — REQUIRES LEGAL REVIEW
          </div>
          <p className="mb-2 text-sm text-muted">
            <Link href="/" className="text-teal hover:underline">
              {t("backHome")}
            </Link>
          </p>
          <h1 className="font-head text-3xl font-extrabold text-cream md:text-4xl">
            {tp("title")}
          </h1>
          <p className="mt-3 text-sm text-muted">{tp("lastUpdated")}</p>

          <div className="mt-10 space-y-6 text-sm leading-relaxed text-cream/80">
            <p>{tp("intro")}</p>
            <h2 className="font-head text-xl font-bold text-cream">{tp("collect.title")}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {collectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2 className="font-head text-xl font-bold text-cream">{tp("use.title")}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {useItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2 id="cookies" className="font-head text-xl font-bold text-cream">
              {tp("cookies.title")}
            </h2>
            {cookieParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>{tp("cookies.controlsIntro")}</p>
            <ul className="list-disc space-y-2 pl-5">
              {cookieControls.map((item) => (
                <li key={item.text}>
                  {item.url ? (
                    <>
                      {item.text}: <ExternalLink url={item.url} />
                    </>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
            <p>
              {learnMore.text}: <ExternalLink url={learnMore.url} />
            </p>
            <h2 className="font-head text-xl font-bold text-cream">{tp("sharing.title")}</h2>
            <p>{tp("sharing.text")}</p>
            <h2 className="font-head text-xl font-bold text-cream">{tp("whatsapp.title")}</h2>
            <p>{tp("whatsapp.text")}</p>
            <h2 className="font-head text-xl font-bold text-cream">{tp("retention.title")}</h2>
            <p>{tp("retention.text")}</p>
            <h2 className="font-head text-xl font-bold text-cream">{tp("contact.title")}</h2>
            <p>{tp("contact.text")}</p>
          </div>
        </article>
      </main>
      <Footer />
    </BookingShell>
  );
}
