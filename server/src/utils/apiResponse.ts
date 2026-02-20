import { Response } from "express";

export const sendError = (
  res: Response,
  status: number,
  code: string,
  message: string
) => {
  return res.status(status).json({
    success: false,
    code,
    message,
  });
};

export const sendSuccess = (
  res: Response,
  data: Record<string, any>,
  message?: string
) => {
  return res.json({
    success: true,
    message: message || null,
    data,
  });
};
