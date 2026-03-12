import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  getAllCategories,
} from "./products.service";

export function handleGetProducts(req: Request, res: Response): void {
  const category = req.query["category"] as string | undefined;
  const result = getAllProducts(category);
  res.json(result);
}

export function handleGetProductById(req: Request, res: Response): void {
  const id = req.params["id"] as string | undefined;
  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }
  const product = getProductById(id);
  res.json(product);
}

export function handleGetCategories(_req: Request, res: Response): void {
  const categories = getAllCategories();
  res.json({ categories });
}
