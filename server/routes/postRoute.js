import { Router } from "express";
import { uploadPost } from "../controllers/postController.js";
const router = Router();
router.post("/upload-post", uploadPost)

export default router