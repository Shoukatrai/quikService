import { Router } from "express";
import { googleAuth, login, signUp } from "../controllers/authController.js";
const router = Router();
router.post("/signup", signUp)
router.post("/login", login)
router.post("/google", googleAuth)

export default router