import { Router } from "express";
import { handleValidateCart } from "./cart.controller";
import { validate } from "../../middleware/validate.middleware";
import { validateCartDto } from "./cart.dto";

const router = Router();

router.post("/validate", validate(validateCartDto), handleValidateCart);

export { router as cartRoutes };
