import { Router } from "express";
import { authController } from "../controller/authController";

const router = Router();

router.post("/signup", authController.signup);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);

export default router;
