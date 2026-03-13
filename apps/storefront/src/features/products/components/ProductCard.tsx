"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { Product } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export const ProductCard = memo(({
  product,
  className,
  priority = false,
}: ProductCardProps) => {
  const { addItem, updateQuantity, removeItem } = useCartStore();
  const cartQuantity = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0
  );
  
  const isMaxStockReached = cartQuantity >= product.stock;

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

  const isOutOfStock = product.stock === 0;

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
      availability: isOutOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <Card
      className={cn(
        "group border-border/40 bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden",
        className
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href={`/products/${product.slug}`} className="block relative aspect-3/4 w-full overflow-hidden bg-muted">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority={priority}
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              Rupture de stock
            </Badge>
          </div>
        )}

        {!isOutOfStock && (
          <div className="absolute bottom-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20 flex" onClick={(e) => e.preventDefault()}>
            {cartQuantity > 0 ? (
              <div className="flex items-center h-10 rounded-full shadow-lg overflow-hidden bg-background/90 backdrop-blur-sm border border-border/50">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => cartQuantity === 1 ? removeItem(product.id) : updateQuantity(product.id, cartQuantity - 1)}
                  className="h-full w-9 rounded-none hover:bg-muted text-foreground transition-colors"
                  aria-label="Réduire la quantité"
                >
                  {cartQuantity === 1 ? <Trash2 size={16} className="text-destructive" /> : <Minus size={16} />}
                </Button>
                <div className="w-8 text-center text-sm font-semibold text-foreground pointer-events-none">
                  {cartQuantity}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                  disabled={isMaxStockReached}
                  className="h-full w-9 rounded-none hover:bg-muted text-foreground transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={16} />
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                onClick={() => {
                  addItem(product);
                  toast.success(`${product.name} ajouté au panier !`);
                }}
                className="h-10 w-10 rounded-full shadow-lg"
                aria-label="Ajouter au panier"
              >
                <ShoppingCart size={18} />
              </Button>
            )}
          </div>
        )}
      </Link>

      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1 min-w-0">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              <h3 className="text-sm font-semibold text-card-foreground leading-none tracking-tight truncate">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
              {product.description}
            </p>
          </div>
          <p className="text-sm font-bold text-primary shrink-0">
            {formattedPrice}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
ProductCard.displayName = "ProductCard";
