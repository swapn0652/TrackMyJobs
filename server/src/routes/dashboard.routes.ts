import { Router } from "express";
import { dashboardController } from "../controller/dashboard.controller";

const router = Router();

router.get("/summary", dashboardController.summary);
router.get("/by-source", dashboardController.bySource);
router.get("/by-status", dashboardController.byStatus);
router.get("/monthly", dashboardController.monthly);
router.get("/funnel", dashboardController.funnel);
router.get("/recent-activity", dashboardController.recentActivity);

export default router;