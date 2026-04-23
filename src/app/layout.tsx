import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrustBar } from "@/components/layout/TrustBar";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieBanner } from "@/components/analytics/CookieBanner";
import { UtmCapture } from "@/components/analytics/UtmCapture";
import { ListaDrawer } from "@/components/ui/ListaDrawer";
import { BRAND } from "@/lib/brand";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zahirparfums.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.fullName} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.fullName}`,
  },
  description: BRAND.manifesto,
  applicationName: BRAND.fullName,
  authors: BRAND.founders.map((f) => ({ name: f })),
  keywords: [
    "perfume árabe",
    "perfume masculino",
    "decants",
    "curadoria olfativa",
    "perfumaria brasil",
    "zahir parfums",
  ],
  openGraph: {
    title: `${BRAND.fullName} — ${BRAND.tagline}`,
    description: BRAND.manifesto,
    locale: "pt_BR",
    type: "website",
    siteName: BRAND.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.fullName,
    description: BRAND.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-ink text-cream antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="relative">{children}</main>
          <TrustBar />
          <Footer />
        </SmoothScroll>
        <GrainOverlay />
        <ListaDrawer />
        <CookieBanner />
        <UtmCapture />
        <Analytics />
      </body>
    </html>
  );
}
