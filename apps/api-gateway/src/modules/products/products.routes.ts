import { Router } from "express";
import {
  handleGetProducts,
  handleGetProductById,
  handleGetCategories,
} from "./products.controller";

const router = Router();

router.get("/", handleGetProducts);
router.get("/categories", handleGetCategories);
router.get("/:id", handleGetProductById);

export { router as productRoutes };
