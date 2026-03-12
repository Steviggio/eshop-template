import { z } from "zod";

export const validateCartDto = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1, "Product ID is required"),
      quantity: z.number().int().positive("Quantity must be a positive integer"),
    })
  ).min(1, "Cart must have at least one item"),
});

export type ValidateCartDto = z.infer<typeof validateCartDto>;

export interface ValidatedCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface CartValidationResult {
  isValid: boolean;
  items: ValidatedCartItem[];
  serverTotal: number;
  currency: string;
  errors: string[];
}
