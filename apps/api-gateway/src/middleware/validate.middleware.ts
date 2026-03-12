import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "./error.middleware";

type RequestField = "body" | "query" | "params";

export function validate(schema: ZodSchema, field: RequestField = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[field]);
      // Replace the raw field with parsed/validated data
      (req as unknown as Record<string, unknown>)[field] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new AppError(400, "Validation failed", err.flatten().fieldErrors);
      }
      throw err;
    }
  };
}
