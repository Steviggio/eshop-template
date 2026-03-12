import { Request, Response } from "express";
import { createCheckout, verifyPayment } from "./payments.service";

export async function handleCreateCheckout(
  req: Request,
  res: Response
): Promise<void> {
  const { items, customerEmail } = req.body as {
    items: Array<{ id: string; quantity: number }>;
    customerEmail?: string;
  };

  const result = await createCheckout({
    items,
    successUrl: "http://localhost:3000/success",
    cancelUrl: "http://localhost:3000/?canceled=true",
    customerEmail,
  });

  res.json(result);
}

export async function handleVerifyPayment(
  req: Request,
  res: Response
): Promise<void> {
  const sessionId = req.params["sessionId"] as string | undefined;
  if (!sessionId) {
    res.status(400).json({ error: "Session ID is required" });
    return;
  }
  const result = await verifyPayment(sessionId);
  res.json(result);
}
