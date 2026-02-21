import { Request, Response } from "express";
import { authService } from "../services/auth.service"; 
import { sendSuccess, sendError } from "../utils/apiResponse";

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const data = await authService.signupUser(name, email, password);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(
        res,
        err.status || 500,
        err.code || "SERVER_ERROR",
        err.message || "Server error"
      );
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;
      const data = await authService.verifyOtp(email, otp);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(
        res,
        err.status || 500,
        err.code || "SERVER_ERROR",
        err.message || "Server error"
      );
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const data = await authService.loginUser(email, password);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(
        res,
        err.status || 500,
        err.code || "SERVER_ERROR",
        err.message || "Server error"
      );
    }
  },
};
