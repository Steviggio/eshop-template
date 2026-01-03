import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { Header } from "@/components/layouts/Header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-shop Starter",
  description: "Basic e-shop template built with Next.js, Tailwind CSS and Stripe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartDrawer />
        <Header />
        <Toaster position="bottom-right" richColors closeButton />
        {children}
      </body>
    </html>
  );
}
