"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useMounted } from "@/lib/hooks";
import { CartItem } from "./CartItem";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createCheckoutSession } from "../services/cart.service";
import { Loader2 } from "lucide-react";

export const CartDrawer = () => {
  const isMounted = useMounted();
  const { items, isOpen, setOpen, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(items);

      if (checkoutUrl) {
        toast.success("Redirection vers le paiement...");
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      toast.error("Erreur lors de l'initialisation du paiement");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const totalPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(getTotalPrice());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl sm:border-l"
          >
            <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <ShoppingBag size={20} />
                Mon Panier
                <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                  {items.length}
                </span>
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="rounded-full bg-gray-50 p-6">
                    <ShoppingBag size={48} className="text-gray-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Votre panier est vide
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      On dirait que vous n&apos;avez pas encore trouvé votre
                      bonheur.
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Continuer le shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Sous-total</p>
                  <p>{totalPrice}</p>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 mb-6">
                  Taxes et frais de livraison calculés à l&apos;étape suivante.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition-all active:scale-[0.98]",
                    "disabled:opacity-70 disabled:cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Validation...
                    </>
                  ) : (
                    <>
                      Procéder au paiement
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
