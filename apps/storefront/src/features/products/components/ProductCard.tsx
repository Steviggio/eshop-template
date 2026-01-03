"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { Product } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean; 
}

export const ProductCard = ({
  product,
  className,
  priority = false,
}: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.thumbnail,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className={cn("group relative flex flex-col gap-4", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          // blurDataURL à ajouter pour le placeholder si nécessaire
        />

        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault(); 
              addItem(product);
              toast.success(`${product.name} ajouté au panier !`);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-base font-medium text-gray-900 leading-none">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">
            {product.description}
          </p>
        </div>
        <p className="text-base font-semibold text-gray-900">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
};
