import {
  findAllProducts,
  findProductById,
  findProductsByCategory,
  getCategories,
} from "./products.repository";
import type { Product, ProductListResponse } from "./products.types";
import { AppError } from "../../middleware/error.middleware";

export function getAllProducts(category?: string): ProductListResponse {
  const products = category
    ? findProductsByCategory(category)
    : findAllProducts();

  return {
    products,
    total: products.length,
  };
}

export function getProductById(id: string): Product {
  const product = findProductById(id);

  if (!product) {
    throw new AppError(404, `Product with ID "${id}" not found`);
  }

  return product;
}

export function getAllCategories(): string[] {
  return getCategories();
}
