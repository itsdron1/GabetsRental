import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Syne } from "next/font/google";
import GoogleTagManager from "@/components/GoogleTagManager";
import { BRAND_NAME, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/*
 * Favicon in Google Search: after deploy, open Google Search Console → URL Inspection
 * → enter your homepage URL → Request Indexing. Google may take days to weeks to refresh
 * the favicon in results. Verify direct URLs: /favicon.ico, /favicon-48x48.png,
 * /apple-touch-icon.png
 */
export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Premium motorcycle rental Bali — big bikes, sport bikes, touring motorcycles and guided tours with island-wide delivery.",
  keywords: [
    "bike rental bali",
    "motorcycle rental bali",
    "big bike rental bali",
    "sport bike rental bali",
    "motorbike rental bali",
    "bali motorcycle rental",
    "motorcycle hire bali",
    "harley davidson rental bali",
    "superbike rental bali",
    "bike rental canggu",
    "motorcycle rental seminyak",
  ],
  robots: { index: true, follow: true },
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/favicon.svg", color: "#0B3D2E" }],
  },
  appleWebApp: {
    capable: true,
    title: "G-DRIVE",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B3D2E" },
    { media: "(prefers-color-scheme: dark)", color: "#0B3D2E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <GoogleTagManager />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
