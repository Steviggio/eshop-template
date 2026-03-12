import Stripe from "stripe";
import type {
  PaymentProvider,
  CreateCheckoutRequest,
  CheckoutSession,
  PaymentVerification,
} from "../payments.types";

/**
 * StripePaymentProvider — Production-ready Stripe Checkout integration.
 *
 * Requires STRIPE_SECRET_KEY env variable.
 * Uses Stripe Checkout Sessions for a hosted payment page.
 */
export class StripePaymentProvider implements PaymentProvider {
  readonly name = "stripe";
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
  }

  async createCheckoutSession(
    request: CreateCheckoutRequest
  ): Promise<CheckoutSession> {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      request.items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.successUrl}${request.successUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: request.cancelUrl,
      customer_email: request.customerEmail,
    });

    return {
      sessionId: session.id,
      url: session.url,
      status: "pending",
    };
  }

  async verifyPayment(sessionId: string): Promise<PaymentVerification> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      return {
        sessionId: session.id,
        status: session.payment_status === "paid" ? "paid" : "unpaid",
        amountTotal: (session.amount_total ?? 0) / 100,
        currency: session.currency ?? "eur",
      };
    } catch {
      return {
        sessionId,
        status: "failed",
        amountTotal: 0,
        currency: "eur",
      };
    }
  }
}
