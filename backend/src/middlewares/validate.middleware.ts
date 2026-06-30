import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";
import ApiResponse from "../utils/apiResponse.js";

export default function validate(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        ApiResponse.error(res, "Validation failed", 400);
        return;
      }
      next(error);
    }
  }
}
