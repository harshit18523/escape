import type { Response } from "express";

export class ApiResponse {
  static success(res: Response, message: string, data: {} | null = null, meta: {} = {}, status: number = 200) {
    const defaultMeta = {
      timestamp: new Date().toISOString()
    };

    return res.status(status).json({
      success: true,
      message,
      data,
      meta: { ...defaultMeta, ...meta }
    });
  }

  static error(res: Response, message: string, status: number = 500) {
    return res.status(status).json({
      success: false,
      message
    });
  }
}

export default ApiResponse;
