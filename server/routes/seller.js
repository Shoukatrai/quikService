import { Router } from "express";
import {
  applyForVerification,
  becomeSeller,
  deleteSellerSkills,
  getAllSellers,
  getSeller,
  updateProfilePicture,
  updateSellerDetails,
  updateSellerSkills,
} from "../controllers/seller.js";
import { authMiddleware } from "../middleware/auth.js";
import { sellerMiddleware } from "../middleware/seller.js";
const router = Router();
router.post("/become_seller", authMiddleware, becomeSeller);
router.get("/get_seller", authMiddleware, getSeller);
router.post("/apply_for_verification", authMiddleware, applyForVerification);
router.put("/update_profile_picture", sellerMiddleware, updateProfilePicture);
router.patch("/update_seller_details", sellerMiddleware, updateSellerDetails);
router.patch("/update_seller_skills", sellerMiddleware, updateSellerSkills);
router.patch("/delete_seller_skill", sellerMiddleware, deleteSellerSkills);
// router.get("/get_seller", authMiddleware, getSeller  );
// router.get("/get_all_sellers", authMiddleware, getAllSellers);

export default router;
