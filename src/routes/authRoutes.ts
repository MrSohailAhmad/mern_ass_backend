import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { loginRateLimiter } from "../middleware/rateLimit";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use
 */
router.post("/register", register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginRateLimiter, login);
router.get("/me", authMiddleware, getMe);

/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: Test route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful test
 */
router.get("/test", (_req, res) => {
  res.send("Swagger test works");
});

export default router;
