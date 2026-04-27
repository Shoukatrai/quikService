import { Router } from "express";
import {
  bookService,
  getALLBookings,
  getUserBookings,
  updateStatus,
} from "../controllers/Booking.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/create", authMiddleware, bookService);
router.get("/getAllBookings", authMiddleware, getALLBookings);
router.get("/getUserBookings", authMiddleware, getUserBookings);
router.patch("/status_update/:bookingId", authMiddleware, updateStatus);

export default router;
