import { getPaymentProvider } from "./payments.factory";
import { findProductById } from "../products/products.repository";
import type { CheckoutItem, CheckoutSession, PaymentVerification } from "./payments.types";
import { AppError } from "../../middleware/error.middleware";

interface CheckoutRequest {
  items: Array<{ id: string; quantity: number }>;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export async function createCheckout(
  request: CheckoutRequest
): Promise<CheckoutSession> {
  const provider = getPaymentProvider();
  const checkoutItems: CheckoutItem[] = [];

  for (const item of request.items) {
    const product = findProductById(item.id);
    if (!product) {
      throw new AppError(400, `Product with ID "${item.id}" not found`);
    }

    if (product.stock < item.quantity) {
      throw new AppError(
        400,
        `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}.`
      );
    }

    checkoutItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  if (checkoutItems.length === 0) {
    throw new AppError(400, "Cart is empty or all products are invalid");
  }

  return provider.createCheckoutSession({
    items: checkoutItems,
    successUrl: request.successUrl,
    cancelUrl: request.cancelUrl,
    customerEmail: request.customerEmail,
  });
}

export async function verifyPayment(
  sessionId: string
): Promise<PaymentVerification> {
  const provider = getPaymentProvider();
  return provider.verifyPayment(sessionId);
}
