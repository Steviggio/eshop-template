"use client";


import { AnimatePresence, motion } from "motion/react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useMounted } from "@/lib/hooks";
import { CartItem } from "./CartItem";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export const CartDrawer = () => {
  const isMounted = useMounted();
  const { items, isOpen, setOpen, getTotalPrice } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };



  if (!isMounted) return null;

  const totalPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(getTotalPrice());

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col w-full max-w-md p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag size={20} />
            Mon Panier
            <Badge variant="secondary" className="ml-1">
              {items.length}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-muted p-6">
                <ShoppingBag size={48} className="text-muted-foreground/40" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  Votre panier est vide
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  On dirait que vous n&apos;avez pas encore trouvé votre
                  bonheur.
                </p>
              </div>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Continuer le shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t bg-muted/30 px-6 py-6 flex-col gap-4">
            <div className="flex justify-between text-base font-bold tracking-tight w-full">
              <p>Sous-total</p>
              <p>{totalPrice}</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Taxes et frais de livraison calculés à l&apos;étape suivante.
            </p>
            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-full gap-2 text-base font-semibold"
            >
              Procéder au paiement
              <ArrowRight size={18} />
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
