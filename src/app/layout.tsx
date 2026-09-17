import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "ZARYASH — Wear Your Presence.",
    template: "%s — ZARYASH",
  },
  description:
    "ZARYASH is a contemporary menswear house. Modern essentials, defined by precision.",
  openGraph: {
    title: "ZARYASH — Wear Your Presence.",
    description:
      "ZARYASH is a contemporary menswear house. Modern essentials, defined by precision.",
    siteName: "ZARYASH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZARYASH — Wear Your Presence.",
    description:
      "ZARYASH is a contemporary menswear house. Modern essentials, defined by precision.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* next/font/google needs build-time network access this environment
            doesn't have (see globals.css note) — this <link> is the standard
            fallback and is fine in a root layout despite the pages-router-era
            lint rule below, which doesn't apply to the app router. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col bg-z-black text-z-ivory antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-z-ivory focus:px-4 focus:py-2 focus:text-z-black"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
