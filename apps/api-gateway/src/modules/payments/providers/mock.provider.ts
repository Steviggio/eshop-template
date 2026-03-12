import type {
  PaymentProvider,
  CreateCheckoutRequest,
  CheckoutSession,
  PaymentVerification,
} from "../payments.types";

/**
 * MockPaymentProvider — Default provider for development and templates.
 *
 * Simulates a checkout flow without external dependencies.
 * In a fork, replace with a real provider (Stripe, PayPal, etc.)
 */
export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";

  private sessions: Map<
    string,
    { request: CreateCheckoutRequest; status: "pending" | "completed" | "cancelled" }
  > = new Map();

  async createCheckoutSession(
    request: CreateCheckoutRequest
  ): Promise<CheckoutSession> {
    const sessionId = `mock_session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    this.sessions.set(sessionId, { request, status: "pending" });

    // In mock mode, we redirect to the success URL with the session ID
    const url = `${request.successUrl}${request.successUrl.includes("?") ? "&" : "?"}session_id=${sessionId}`;

    return {
      sessionId,
      url,
      status: "pending",
    };
  }

  async verifyPayment(sessionId: string): Promise<PaymentVerification> {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return {
        sessionId,
        status: "failed",
        amountTotal: 0,
        currency: "EUR",
      };
    }

    // In mock mode, all payments are "paid" automatically
    const amountTotal = session.request.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Mark session as completed
    session.status = "completed";

    return {
      sessionId,
      status: "paid",
      amountTotal: Number(amountTotal.toFixed(2)),
      currency: "EUR",
    };
  }
}
