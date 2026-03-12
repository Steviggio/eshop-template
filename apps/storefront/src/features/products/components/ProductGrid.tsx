"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Tous",
  "Vêtements",
  "Chaussures",
  "Accessoires",
  "High-Tech",
  "Sport",
  "Maison",
];

interface ProductGridProps {
  initialProducts: Product[];
}

export const ProductGrid = ({ initialProducts }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchQuery, selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-card/80 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-border/40 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Nouveautés
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={16}
            />
            <Input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-9"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 pb-2 sm:pb-0">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Aucun produit ne correspond à votre recherche.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Tous");
            }}
            className="mt-4"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
};
