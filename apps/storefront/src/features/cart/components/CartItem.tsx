"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/features/cart/types";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: item.currency,
  }).format(item.price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex gap-4 py-4"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={item.thumbnail}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 pr-4 tracking-tight">
            {item.name}
          </h3>
          <p className="text-sm font-bold text-primary">
            {formattedPrice}
          </p>
        </div>

        <div className="flex items-end justify-between text-sm">
          <div className="flex items-center rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-r-none"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Réduire la quantité"
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center font-semibold text-foreground text-xs">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-l-none"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Augmenter la quantité"
            >
              <Plus size={14} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 h-7 px-2"
          >
            <Trash2 size={14} />
            <span className="sr-only sm:not-sr-only text-xs">Retirer</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
