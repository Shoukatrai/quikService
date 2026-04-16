import { Router } from "express";
import { authMe, googleAuth, login, signUp } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/me", authMiddleware,authMe);

export default router;
