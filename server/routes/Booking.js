import { Router } from "express";
import {
  bookService,
  getALLBookings,
  getUserBookings,
} from "../controllers/Booking.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/create", authMiddleware, bookService);
router.get("/getAllBookings", authMiddleware, getALLBookings);
router.get("/getUserBookings", authMiddleware, getUserBookings);

export default router;
