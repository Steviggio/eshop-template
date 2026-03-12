import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRoutes } from "./modules/auth/auth.routes";
import { productRoutes } from "./modules/products/products.routes";
import { cartRoutes } from "./modules/cart/cart.routes";
import { paymentRoutes } from "./modules/payments/payments.routes";

export function createApp(): express.Application {
  const app = express();

  // ─── Global Middleware ────────────────────────────────────
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(","),
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  app.use(express.json({ limit: "10kb" }));

  // ─── Health Check ─────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      provider: env.PAYMENT_PROVIDER,
    });
  });

  // ─── API Routes ───────────────────────────────────────────
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/payments", paymentRoutes);

  // ─── Error Handling (must be last) ────────────────────────
  app.use(errorMiddleware);

  return app;
}
