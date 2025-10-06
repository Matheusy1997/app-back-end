import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/users", UserController.getAllUsers);
router.get("/users/:email", UserController.getUserByEmail);
router.post("/users", UserController.createUser);
router.delete("/users", authMiddleware, UserController.deleteUserById);
router.put("/users", UserController.updateUser);



export default router;
