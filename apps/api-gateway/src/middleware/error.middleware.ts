import { Request, Response, NextFunction } from "express";

interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export class AppError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    const body: ApiError = {
      status: err.status,
      message: err.message,
    };

    if (err.details) {
      body.details = err.details;
    }

    res.status(err.status).json(body);
    return;
  }

  // Log unexpected errors in development
  if (process.env["NODE_ENV"] !== "production") {
    console.error("🔥 Unhandled error:", err);
  }

  res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
}
