import { Router } from "express";
import { becomeSeller } from "../controllers/seller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/become_seller", authMiddleware, becomeSeller);

export default router;
