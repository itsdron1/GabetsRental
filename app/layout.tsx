import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "G-BIKE Rental Bali — Premium Big Bike Rental",
  description:
    "Premium big bike rental with island-wide delivery across Bali. Top-condition motorcycles, transparent pricing — freedom starts at your doorstep.",
  openGraph: {
    title: "G-BIKE Rental Bali — Premium Big Bike Rental",
    description:
      "Premium big bike rental with island-wide delivery across Bali. Top-condition motorcycles, transparent pricing — freedom starts at your doorstep.",
    type: "website",
    locale: "en_US",
    siteName: "G-BIKE Rental Bali",
  },
  twitter: {
    card: "summary_large_image",
    title: "G-BIKE Rental Bali — Premium Big Bike Rental",
    description:
      "Premium big bike rental with island-wide delivery across Bali. Top-condition motorcycles, transparent pricing — freedom starts at your doorstep.",
  },
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
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#0B3D2E" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "G-BIKE",
    statusBarStyle: "black-translucent",
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
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
