import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { interviewRoundsController } from "../controller/interviewRounds.controller";

const router = Router();
router.use(authenticate);

router.post("/", interviewRoundsController.addRound);
router.put("/:id", interviewRoundsController.updateRound);
router.delete("/:id", interviewRoundsController.deleteRound);

export default router;
