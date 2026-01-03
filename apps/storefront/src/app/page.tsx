import { ProductCard } from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "veste-performance-noir",
    name: "Veste Performance",
    description: "Tissu technique respirant pour les sessions intenses.",
    price: 149.0,
    currency: "EUR",
    stock: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    images: [],
  },
  {
    id: "2",
    slug: "sneakers-ultra-boost",
    name: "Urban Runners",
    description: "Amorti dynamique et style urbain minimaliste.",
    price: 189.99,
    currency: "EUR",
    stock: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    images: [],
  },
  {
    id: "3",
    slug: "sac-voyage-cuir",
    name: "Sac Weekender",
    description: "Cuir véritable, parfait pour les escapades de 48h.",
    price: 299.0,
    currency: "EUR",
    stock: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    images: [],
  },
  {
    id: "4",
    slug: "montre-connectee",
    name: "Watch Series X",
    description: "Suivi de santé avancé et autonomie de 7 jours.",
    price: 399.0,
    currency: "EUR",
    stock: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    images: [],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Eshop
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Bienvenue sur le template e-commerce Next.js prêt à l&apos;emploi.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nouveautés
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {MOCK_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
