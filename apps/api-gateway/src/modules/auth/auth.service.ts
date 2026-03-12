import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { AppError } from "../../middleware/error.middleware";
import type { RegisterDto, LoginDto } from "./auth.dto";
import type { UserRecord, AuthResponse, AuthTokenPayload } from "./auth.types";

// In-memory user store (mock) — replace with PostgreSQL repository in production
const users: Map<string, UserRecord> = new Map();
let userIdCounter = 1;

function generateToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as string,
  } as jwt.SignOptions);
}

function sanitizeUser(user: UserRecord): AuthResponse["user"] {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
}

export async function registerUser(dto: RegisterDto): Promise<AuthResponse> {
  // Check if user already exists
  const existingUser = Array.from(users.values()).find(
    (u) => u.email === dto.email
  );

  if (existingUser) {
    throw new AppError(409, "An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(dto.password, 12);
  const id = String(userIdCounter++);

  const newUser: UserRecord = {
    id,
    email: dto.email,
    fullName: dto.fullName,
    passwordHash,
    createdAt: new Date(),
  };

  users.set(id, newUser);

  const token = generateToken({ userId: id, email: dto.email });

  return {
    user: sanitizeUser(newUser),
    token,
  };
}

export async function loginUser(dto: LoginDto): Promise<AuthResponse> {
  const user = Array.from(users.values()).find((u) => u.email === dto.email);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = generateToken({ userId: user.id, email: user.email });

  return {
    user: sanitizeUser(user),
    token,
  };
}

export function getUserById(userId: string): AuthResponse["user"] | null {
  const user = users.get(userId);
  if (!user) return null;
  return sanitizeUser(user);
}
