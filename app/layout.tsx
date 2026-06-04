import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
    { media: "(prefers-color-scheme: dark)", color: "#080b0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * Google Analytics 4: set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX in .env.local,
   * then add @next/third-parties GoogleAnalytics or gtag script here when ready.
   */
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
