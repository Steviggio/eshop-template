import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MOCK_PRODUCTS } from "@/features/products/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Shield, Truck, RefreshCw } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { toast } from "sonner";
import { ClientAddToCartButton } from "./ClientAddToCartButton";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params to pre-render pages at build time (SSG)
export async function generateStaticParams() {
  const slugs = MOCK_PRODUCTS.map((product) => ({ id: product.slug }));
  const ids = MOCK_PRODUCTS.map((product) => ({ id: product.id }));
  
  // Deduplicate in case any id is the same as the slug
  const uniqueParams = Array.from(
    new Map([...slugs, ...ids].map((item) => [item.id, item])).values()
  );

  return uniqueParams;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return {
      title: "Produit non trouvé | Eshop Template",
    };
  }

  return {
    title: `${product.name} | Eshop Template`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

  const isOutOfStock = product.stock === 0;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

          {/* Product Image Section */}
          <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <Badge variant="destructive" className="px-4 py-2 text-base font-semibold shadow-lg">
                  Rupture de stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-200">
                {product.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-violet-700">
                {formattedPrice}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <ul className="space-y-3 text-sm text-slate-600 pt-4 border-t border-slate-100">
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>En stock et prêt à être expédié ({product.stock} disponibles)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span>Livraison gratuite à partir de 50€</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span>Retours gratuits sous 30 jours</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>Garantie constructeur de 2 ans</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <ClientAddToCartButton product={product} isOutOfStock={isOutOfStock} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
