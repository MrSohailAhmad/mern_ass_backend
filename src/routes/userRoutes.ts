import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Role } from "../Interfaces/common";

const router = Router();

// Admin-only route
router.get("/", authMiddleware, roleMiddleware(Role.USER), getAllUsers);

export default router;
