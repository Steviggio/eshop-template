"use client";

import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export const Header = () => {
  const isMounted = useMounted();
  const setOpen = useCartStore((state) => state.setOpen);

  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 -ml-2 text-gray-600">
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-gray-900">
              Turbo<span className="text-blue-600">Commerce</span>.
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Nouveautés
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              Hommes
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              Femmes
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="group relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag
              size={22}
              className="text-gray-700 group-hover:text-black transition-colors"
            />

            {isMounted && totalItems > 0 && (
              <span
                className={cn(
                  "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full",
                  "bg-black text-[10px] font-bold text-white ring-2 ring-white",
                  "animate-in zoom-in-50 duration-300"
                )}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
