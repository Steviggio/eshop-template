import { findProductById } from "../products/products.repository";
import type {
  ValidateCartDto,
  CartValidationResult,
  ValidatedCartItem,
} from "./cart.dto";

export function validateCart(dto: ValidateCartDto): CartValidationResult {
  const errors: string[] = [];
  const validatedItems: ValidatedCartItem[] = [];
  let serverTotal = 0;

  for (const item of dto.items) {
    const product = findProductById(item.id);

    if (!product) {
      errors.push(`Product with ID "${item.id}" not found.`);
      continue;
    }

    if (product.stock < item.quantity) {
      errors.push(
        `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}.`
      );
      continue;
    }

    const lineTotal = product.price * item.quantity;
    serverTotal += lineTotal;

    validatedItems.push({
      id: item.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      lineTotal: Number(lineTotal.toFixed(2)),
    });
  }

  return {
    isValid: errors.length === 0,
    items: validatedItems,
    serverTotal: Number(serverTotal.toFixed(2)),
    currency: "EUR",
    errors,
  };
}
