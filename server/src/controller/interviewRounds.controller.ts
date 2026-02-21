import { Response } from "express";
import { AuthRequest } from "../types/auth";
import { interviewRoundsService } from "../services/interviewRounds.service";
import { sendSuccess, sendError } from "../utils/apiResponse";

export const interviewRoundsController = {
  addRound: async (req: AuthRequest, res: Response) => {
    try {
      const round = await interviewRoundsService.addRound(req.userId!, req.body);
      return sendSuccess(res, round);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  updateRound: async (req: AuthRequest, res: Response) => {
    try {
      const roundId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await interviewRoundsService.updateRound(req.userId!, roundId, req.body);
      return sendSuccess(res, updated);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },

  deleteRound: async (req: AuthRequest, res: Response) => {
    try {
      const roundId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await interviewRoundsService.deleteRound(req.userId!, roundId);
      return sendSuccess(res, deleted);
    } catch (err: any) {
      return sendError(res, err.status || 500, err.code || "SERVER_ERROR", err.message || "Server error");
    }
  },
};

