import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "./auth.service";
import type { RegisterDto, LoginDto } from "./auth.dto";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

export async function handleRegister(
  req: Request,
  res: Response
): Promise<void> {
  const dto = req.body as RegisterDto;
  const result = await registerUser(dto);
  res.status(201).json(result);
}

export async function handleLogin(
  req: Request,
  res: Response
): Promise<void> {
  const dto = req.body as LoginDto;
  const result = await loginUser(dto);
  res.json(result);
}

export async function handleMe(
  req: Request,
  res: Response
): Promise<void> {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.userId;

  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const user = getUserById(userId);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({ user });
}
