import { env } from "../../config/env";
import type { PaymentProvider } from "./payments.types";
import { MockPaymentProvider } from "./providers/mock.provider";
import { StripePaymentProvider } from "./providers/stripe.provider";

/**
 * Payment provider factory — reads PAYMENT_PROVIDER env variable
 * and instantiates the correct provider implementation.
 *
 * To add a new PSP:
 * 1. Create a new class implementing PaymentProvider in providers/
 * 2. Add the provider name to the env.ts Zod enum
 * 3. Add a case in the switch below
 */
let providerInstance: PaymentProvider | null = null;

export function getPaymentProvider(): PaymentProvider {
  if (providerInstance) {
    return providerInstance;
  }

  switch (env.PAYMENT_PROVIDER) {
    case "stripe": {
      if (!env.STRIPE_SECRET_KEY) {
        throw new Error(
          "STRIPE_SECRET_KEY is required when PAYMENT_PROVIDER=stripe"
        );
      }
      providerInstance = new StripePaymentProvider(env.STRIPE_SECRET_KEY);
      break;
    }
    case "mock":
    default: {
      providerInstance = new MockPaymentProvider();
      break;
    }
  }

  console.log(`💳 Payment provider: ${providerInstance.name}`);
  return providerInstance;
}
