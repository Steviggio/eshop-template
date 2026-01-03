"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Paiement réussi !
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Merci pour votre commande. Vous allez recevoir un email de
          confirmation très bientôt.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          ID de session : {sessionId}
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="rounded-md bg-black px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
