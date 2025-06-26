import { Router } from "express";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
} from "../controllers/doctorController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Role } from "../Interfaces/common";

const router = Router();

router.use(authMiddleware); // All routes below require authentication

/**
 * @swagger
 * /doctors/all:
 *   get:
 *     summary: Get all doctors with optional search and pagination
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search doctors by name, specialty, or location
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get("/all", getAllDoctors); // accessible to both user and admin
/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get a paginated list of doctors
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of doctors per page
 *     responses:
 *       200:
 *         description: A paginated list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 */

router.get("/", getDoctors);

router.use(roleMiddleware(Role.ADMIN)); // All routes require admin

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialty
 *               - availability
 *               - location
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor created successfully
 */
router.post("/", createDoctor);
/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update an existing doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 */

router.put("/:id", updateDoctor);
/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 */

router.delete("/:id", deleteDoctor);

export default router;
