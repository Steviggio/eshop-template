"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { toast } from "sonner";
import { Product } from "@/features/products/types";

interface ClientAddToCartButtonProps {
  product: Product;
  isOutOfStock: boolean;
}

export function ClientAddToCartButton({ product, isOutOfStock }: ClientAddToCartButtonProps) {
  const { addItem, updateQuantity, removeItem } = useCartStore();
  const cartQuantity = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0
  );

  const availableStock = product.stock - cartQuantity;
  const isMaxStockReached = availableStock <= 0;
  const isDisabled = isOutOfStock || isMaxStockReached;

  const handleAddToCart = () => {
    if (isDisabled) return;
    addItem(product);
    toast.success(`${product.name} ajouté au panier !`, {
      description: "Vous pouvez continuer vos achats ou passer à la caisse.",
      icon: "🛒",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {cartQuantity > 0 ? (
        <div className="flex items-center h-14 w-full md:w-auto rounded-md border border-input bg-transparent overflow-hidden">
          <Button
            variant="ghost"
            className="h-full px-6 rounded-none text-foreground hover:bg-muted"
            onClick={() => cartQuantity === 1 ? removeItem(product.id) : updateQuantity(product.id, cartQuantity - 1)}
            aria-label="Réduire la quantité"
          >
            {cartQuantity === 1 ? <Trash2 className="w-5 h-5 text-destructive" /> : <Minus className="w-5 h-5" />}
          </Button>
          <div className="flex-1 text-center font-semibold min-w-[50px]">
            {cartQuantity}
          </div>
          <Button
            variant="ghost"
            className="h-full px-6 rounded-none text-foreground hover:bg-muted"
            onClick={() => updateQuantity(product.id, cartQuantity + 1)}
            disabled={isMaxStockReached}
            aria-label="Augmenter la quantité"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      ) : (
        <Button
          size="lg"
          className={`w-full md:w-auto h-14 px-8 text-base font-semibold transition-all duration-300 ${
            isDisabled
              ? "bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-100"
              : "bg-violet-700 hover:bg-violet-600 hover:-translate-y-1 hover:shadow-xl active:scale-95 text-white"
          }`}
          disabled={isDisabled}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          {isOutOfStock
            ? "Indisponible"
            : isMaxStockReached
            ? "Stock maximum atteint"
            : "Ajouter au panier"}
        </Button>
      )}

      {!isOutOfStock && availableStock > 0 && availableStock < 5 && (
        <div className="text-amber-600 text-sm font-medium flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Plus que {availableStock} {availableStock > 1 ? "exemplaires" : "exemplaire"} en stock - Commandez vite !
        </div>
      )}
    </div>
  );
}
