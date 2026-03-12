"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

function SuccessContent() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Card className="mx-auto max-w-md text-center border-border/40">
        <CardContent className="pt-10 pb-8 px-8">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-50 p-6 dark:bg-green-950/30">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Paiement réussi !
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Merci pour votre commande. Vous allez recevoir un email de
            confirmation très bientôt.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground/70 bg-muted rounded-lg py-2 px-3">
            <Package size={14} />
            <span>ID: {sessionId}</span>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground h-9 gap-1.5 px-4 text-sm font-medium transition-all hover:bg-primary/80"
            >
              Retour à la boutique
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
