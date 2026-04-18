import { Router } from "express";
import { bookService } from "../controllers/Booking.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/create", authMiddleware, bookService);

export default router;
