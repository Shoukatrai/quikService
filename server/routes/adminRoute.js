import { Router } from "express";
import { getUnVerifiedSellers, verifySeller } from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = Router();
router.get("/get_unverified_sellers",adminMiddleware, getUnVerifiedSellers);
router.post("/verify_seller",adminMiddleware, verifySeller);

export default router;
