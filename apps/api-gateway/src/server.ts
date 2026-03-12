import { env } from "./config/env";
import { createApp } from "./app";

const app = createApp();

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │                                         │
  │   🚀 API Gateway running               │
  │   📍 http://localhost:${env.PORT}            │
  │   🌍 Environment: ${env.NODE_ENV.padEnd(13)}│
  │   💳 Payment: ${env.PAYMENT_PROVIDER.padEnd(17)}│
  │                                         │
  └─────────────────────────────────────────┘
  `);
});
