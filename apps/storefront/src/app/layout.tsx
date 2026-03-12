import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { Header } from "@/components/layouts/Header";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Eshop Template",
  description:
    "Modern e-shop integration funnel template — Next.js, Express, shadcn/ui",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <CartDrawer />
        <Header />
        <Toaster position="bottom-right" richColors closeButton />
        {children}
      </body>
    </html>
  );
}
