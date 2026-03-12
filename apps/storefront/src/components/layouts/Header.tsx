"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, User, LogOut, LogIn } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const isMounted = useMounted();
  const setOpen = useCartStore((state) => state.setOpen);
  const { isAuthenticated, user, logout } = useAuthStore();

  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden -ml-2" aria-label="Menu principal">
            <Menu size={24} />
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-foreground">
              E<span className="text-primary">shop</span>.
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Auth Section */}
          {isMounted && (
            <>
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger aria-label="Menu utilisateur" className="inline-flex items-center justify-center rounded-full size-8 hover:bg-muted transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg px-2.5 h-7 text-sm font-medium hover:bg-muted transition-all"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Connexion</span>
                </Link>
              )}
            </>
          )}

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="relative"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={20} className="text-foreground/80" />
            {isMounted && totalItems > 0 && (
              <Badge
                variant="destructive"
                className={cn(
                  "absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold",
                  isAnimating ? "animate-bounce" : ""
                )}
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
