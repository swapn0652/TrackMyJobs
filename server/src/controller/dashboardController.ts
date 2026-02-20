import { Response } from "express";
import { AuthRequest } from "../types/auth";
import { dashboardService } from "../services/dashboardService";
import { sendSuccess, sendError } from "../utils/apiResponse";

export const dashboardController = {
  summary: async (req: AuthRequest, res: Response) => {
    try {
      const data = await dashboardService.getSummary(req.userId!);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  bySource: async (req: AuthRequest, res: Response) => {
    try {
      const data = await dashboardService.getBySource(req.userId!);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  byStatus: async (req: AuthRequest, res: Response) => {
    try {
      const data = await dashboardService.getByStatus(req.userId!);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  monthly: async (req: AuthRequest, res: Response) => {
    try {
      const data = await dashboardService.getMonthly(req.userId!);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  funnel: async (req: AuthRequest, res: Response) => {
    try {
      const data = await dashboardService.getFunnel(req.userId!);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  recentActivity: async (req: AuthRequest, res: Response) => {
    try {
      const data = await dashboardService.getRecentActivity(req.userId!);
      return sendSuccess(res, data);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },
};
