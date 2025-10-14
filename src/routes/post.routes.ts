import { Router } from "express";
import { PostController } from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/posts", PostController.getPost);
router.post("/posts", authMiddleware, PostController.createPost);
router.delete("/posts", authMiddleware, PostController.deletePost);
router.put("/posts", authMiddleware, PostController.updatePost);

export default router;
