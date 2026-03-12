import { Router } from "express";
import {
  handleCreateCheckout,
  handleVerifyPayment,
} from "./payments.controller";
import { validate } from "../../middleware/validate.middleware";
import { z } from "zod";

const createCheckoutDto = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Cart must have at least one item"),
  customerEmail: z.string().email().optional(),
});

const router = Router();

router.post(
  "/create-checkout-session",
  validate(createCheckoutDto),
  handleCreateCheckout
);
router.get("/verify/:sessionId", handleVerifyPayment);

export { router as paymentRoutes };
