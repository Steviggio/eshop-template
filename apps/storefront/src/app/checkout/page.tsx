"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useMounted } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  address: z.string().min(5, "Adresse trop courte"),
  city: z.string().min(2, "Ville trop courte"),
  zipCode: z.string().min(4, "Code postal invalide"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const isMounted = useMounted();
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push(`/success?session_id=mock_session_${Date.now()}`);
  };

  if (!isMounted) return null;

  const totalPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(getTotalPrice());

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Votre panier est vide</h1>
        <Button onClick={() => router.push("/")}>
          Retour à la boutique
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-10">
          <Badge variant="default" className="gap-1.5">
            <ShieldCheck size={14} />
            Paiement Sécurisé
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <Truck size={14} />
            Livraison gratuite
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          {/* Form */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Informations de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        placeholder="Jean Dupont"
                        className={errors.fullName ? "border-destructive" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-destructive text-xs">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        {...register("email")}
                        type="email"
                        placeholder="jean@exemple.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="123 rue de la Paix"
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-destructive text-xs">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        placeholder="Paris"
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && (
                        <p className="text-destructive text-xs">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Code postal</Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        placeholder="75000"
                        className={errors.zipCode ? "border-destructive" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-xs">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full text-base font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Traitement en cours...
                      </>
                    ) : (
                      "Confirmer la commande"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 bg-muted rounded-lg overflow-hidden border border-border">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Qte: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-semibold text-primary">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          }).format(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <p>Sous-total</p>
                    <p>{totalPrice}</p>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <p>Livraison</p>
                    <p className="text-green-600 font-medium">Gratuite</p>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <p>Total</p>
                  <p className="text-primary">{totalPrice}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
