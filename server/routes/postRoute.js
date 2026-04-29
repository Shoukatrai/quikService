import { Router } from "express";
import {
    deletePost,
  editPost,
  getAllPosts,
  getSinglePost,
  getUserPosts,
  uploadPost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/auth.js";
import { sellerMiddleware } from "../middleware/seller.js";
const router = Router();
router.post("/upload-post", authMiddleware, uploadPost);
router.get("/get-all-posts", authMiddleware, getAllPosts);
router.get("/get-user-posts", getUserPosts);
router.get("/get-single-post/:id", getSinglePost);
router.patch("/edit-gig/:id", sellerMiddleware, editPost);
router.delete("/delete/:id", sellerMiddleware, deletePost);

export default router;
