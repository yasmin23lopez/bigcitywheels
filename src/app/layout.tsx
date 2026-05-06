import type { Metadata } from "next";
import "./globals.css";
import GridLines from "@/components/GridLines";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingQuotePopup from "@/components/FloatingQuotePopup";
import { QuoteCartProvider } from "@/components/QuoteCartContext";
import QuoteCartSidebar from "@/components/QuoteCartSidebar";

export const metadata: Metadata = {
  title: "Big City Wheels & Tires | Crosby, TX — Tires, Rims, Lift Kits & More",
  description:
    "Big City Wheels and Tires in Crosby, Texas. New tires, custom rims, suspensions, lift kits, and wheel alignment for trucks, SUVs, and cars. Call 713-561-5519 for a free quote.",
  keywords:
    "tires, rims, lift kits, suspension, wheel alignment, Crosby TX, Houston tires, truck tires, custom wheels",
  openGraph: {
    title: "Big City Wheels & Tires | Crosby, TX",
    description:
      "New tires, custom rims, lift kits & alignment. Serving Crosby, TX and the greater Houston area.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="noise-overlay min-h-full flex flex-col">
        <QuoteCartProvider>
          <GridLines />
          <Preloader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingQuotePopup />
          <QuoteCartSidebar />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
