import { Router } from "express";
import { upload } from "../config/multer";
import { uploadResumeController } from "../controller/upload.controller";

const router = Router();

router.post(
  "/resume",
  upload.single("resume"),
  uploadResumeController
);

export default router;
