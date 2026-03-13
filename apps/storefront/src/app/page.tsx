import { Metadata } from "next";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS } from "@/features/products/data/mockProducts";

export const metadata: Metadata = {
  title: "Accueil | Eshop Template",
  description: "Découvrez notre sélection pointue de produits conçus pour allier esthétique, performance et durabilité.",
  openGraph: {
    title: "Accueil | Eshop Template",
    description: "L'excellence du lifestyle moderne. Découvrez notre nouvelle collection.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10 opacity-80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <Badge
            variant="secondary"
            className="mb-8 gap-2 px-4 py-1.5 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Nouvelle collection disponible
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            L&apos;excellence du <br className="hidden sm:block" />
            <span className="text-primary">lifestyle moderne.</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Découvrez notre sélection pointue de produits conçus pour allier
            esthétique, performance et durabilité.
          </p>
        </div>
      </section>

      {/* Products Section (Interactive Client Component) */}
      <ProductGrid initialProducts={MOCK_PRODUCTS} />
    </main>
  );
}
