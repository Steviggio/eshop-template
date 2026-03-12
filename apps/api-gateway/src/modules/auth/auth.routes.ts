import { Router } from "express";
import { handleRegister, handleLogin, handleMe } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";
import { registerDto, loginDto } from "./auth.dto";

const router = Router();

router.post("/register", validate(registerDto), handleRegister);
router.post("/login", validate(loginDto), handleLogin);
router.get("/me", authMiddleware, handleMe);

export { router as authRoutes };
