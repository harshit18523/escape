import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import auth from "../lib/auth.js";
import ApiResponse from "../utils/apiResponse.js";
import logger from "../utils/logger.js";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session || !session.user) {
      ApiResponse.error(res, "Unauthorized. Please Log in.", 401);
      return;
    }
    
    req.user = session.user;
    next();
  } catch (error) {
    logger.error("Auth middleware error:", error);
    ApiResponse.error(res, "Internal Server Error during authentication.", 500);
  }
}
