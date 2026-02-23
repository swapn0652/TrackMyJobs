import { Router } from "express";
import { upload } from "../config/multer";
import { uploadResumeController } from "../controller/upload.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.post(
  "/resume",
  upload.single("resume"),
  uploadResumeController
);

export default router;
