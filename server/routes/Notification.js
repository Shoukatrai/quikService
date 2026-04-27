import { Router } from "express";
import { getAllNotifications } from "../controllers/notification.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.get("/get-all-notifications", authMiddleware, getAllNotifications);

export default router;
