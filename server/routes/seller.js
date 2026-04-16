import { Router } from "express";
import {
  becomeSeller,
  getAllSellers,
  getSeller,
} from "../controllers/seller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/become_seller", authMiddleware, becomeSeller);
router.get("/get_seller", authMiddleware, getSeller);
router.get("/get_all_sellers", authMiddleware, getAllSellers);

export default router;
