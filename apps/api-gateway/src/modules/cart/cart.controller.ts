import { Request, Response } from "express";
import { validateCart } from "./cart.service";
import type { ValidateCartDto } from "./cart.dto";

export function handleValidateCart(req: Request, res: Response): void {
  const dto = req.body as ValidateCartDto;
  const result = validateCart(dto);
  res.json(result);
}
