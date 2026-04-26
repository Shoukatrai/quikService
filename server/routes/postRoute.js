import { Router } from "express";
import { getAllPosts, getSinglePost, getUserPosts, uploadPost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/upload-post", authMiddleware, uploadPost);
router.get("/get-all-posts", authMiddleware, getAllPosts);
router.get("/get-user-posts", getUserPosts);
router.get("/get-single-post/:id", getSinglePost);

export default router;
