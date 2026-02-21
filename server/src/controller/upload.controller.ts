import { Request, Response } from "express";
import { uploadResumeService } from "../services/upload.service";
import { sendError, sendSuccess } from "../utils/apiResponse";

export const uploadResumeController = (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
       return sendError(res, 400, "NO_FILE", "No file uploaded");
    }

    const result = uploadResumeService(req.file);
    
    return sendSuccess(res, result, "Resume uploaded successfully");
  } catch (error: any) {

    return sendError(res, 500, "SERVER_ERROR", error.message || "Upload failed");
  }
};
