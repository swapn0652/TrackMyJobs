import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { jobsController } from "../controller/jobs.controller";

const router = Router();

router.use(authenticate); // all routes require login

router.get("/", jobsController.getAllJobs);
router.get("/:id", jobsController.getJobById);
router.post("/", jobsController.createJob);
router.put("/:id", jobsController.updateJob);
router.delete("/:id", jobsController.deleteJob);

export default router;
