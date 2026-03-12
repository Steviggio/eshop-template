/**
 * PaymentProvider interface — Strategy pattern for payment processing.
 *
 * Implement this interface to add support for any PSP (Stripe, PayPal, Mollie, etc.)
 * The active provider is selected via the PAYMENT_PROVIDER environment variable.
 */
export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateCheckoutRequest {
  items: CheckoutItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string | null;
  status: "pending" | "completed" | "cancelled";
}

export interface PaymentVerification {
  sessionId: string;
  status: "paid" | "unpaid" | "failed";
  amountTotal: number;
  currency: string;
}

export interface PaymentProvider {
  readonly name: string;

  createCheckoutSession(
    request: CreateCheckoutRequest
  ): Promise<CheckoutSession>;

  verifyPayment(sessionId: string): Promise<PaymentVerification>;
}
