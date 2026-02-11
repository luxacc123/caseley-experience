import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Caseley Experience — Wegtransport door heel Europa",
    template: "%s | Caseley Experience",
  },
  description:
    "Transport over de weg, snel en betrouwbaar. 24/7 bereikbaar, offerte binnen 30 minuten. 20+ jaar ervaring.",
  metadataBase: new URL("https://caseleyexperience.nl"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Caseley Experience",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={inter.className}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
