import type { Response } from "express";
import { AuthRequest } from "../types/auth";
import { sendError, sendSuccess } from "../utils/apiResponse";
import { jobsService } from "../services/jobs.service";

export const jobsController = {
  getAllJobs: async (req: AuthRequest, res: Response) => {
    try {
      const jobs = await jobsService.getAllJobs(req.userId!, req.query);

      return sendSuccess(res, jobs);
    } catch (err) {
      console.error("GET JOBS ERROR:", err);
      return sendError(res, 500, "SERVER_ERROR", "Failed to fetch jobs");
    }
  },

  getJobById: async (req: AuthRequest, res: Response) => {
    try {
      const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const job = await jobsService.getJobById(req.userId!, jobId);
      if (!job) return sendError(res, 404, "JOB_NOT_FOUND", "Job not found");
      return sendSuccess(res, job);
    } catch (err) {
      return sendError(res, 500, "SERVER_ERROR", "Failed to fetch job");
    }
  },

  createJob: async (req: AuthRequest, res: Response) => {
    try {
      const job = await jobsService.createJob(req.userId!, req.body);
      return sendSuccess(res, job, "Job created successfully");
    } catch (err) {
      return sendError(res, 500, "SERVER_ERROR", "Failed to create job");
    }
  },

  updateJob: async (req: AuthRequest, res: Response) => {
    try {
      const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedJob = await jobsService.updateJob(req.userId!, jobId, req.body);
      if (!updatedJob) return sendError(res, 404, "JOB_NOT_FOUND", "Job not found");
      return sendSuccess(res, updatedJob, "Job updated successfully");
    } catch (err) {
      console.log(err);
      return sendError(res, 500, "SERVER_ERROR", "Failed to update job");
    }
  },

  deleteJob: async (req: AuthRequest, res: Response) => {
    try {
      const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await jobsService.deleteJob(req.userId!, jobId);
      if (!deleted) return sendError(res, 404, "JOB_NOT_FOUND", "Job not found");
      return sendSuccess(res, { id: jobId }, "Job deleted successfully");
    } catch (err) {
      return sendError(res, 500, "SERVER_ERROR", "Failed to delete job");
    }
  },
};
