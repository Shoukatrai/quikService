import { Router } from "express";
import { authMe, googleAuth, login, signUp, update_password } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/me", authMiddleware,authMe);
router.patch("/update_password", authMiddleware,update_password);

export default router;
