"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { CartItem as CartItemType } from "@/features/cart/types";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { motion } from "motion/react";

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
      className="flex gap-4 py-4 border-b border-gray-100"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
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
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 pr-4">
            {item.name}
          </h3>
          <p className="text-sm font-semibold text-gray-900">
            {formattedPrice}
          </p>
        </div>

        <div className="flex items-end justify-between text-sm">
          <div className="flex items-center rounded-md border border-gray-200 shadow-sm">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
              aria-label="Réduire la quantité"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-medium text-gray-900 text-xs">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-gray-50 text-gray-600"
              aria-label="Augmenter la quantité"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} />
            <span className="sr-only sm:not-sr-only">Retirer</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
