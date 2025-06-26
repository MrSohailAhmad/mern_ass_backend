import { Router } from "express";
import {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Role } from "../Interfaces/common";

const router = Router();

router.use(authMiddleware);

// User: book & view own appointments

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book a new appointment (user only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - date
 *               - time
 *             properties:
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: "2025-07-01"
 *               time:
 *                 type: string
 *                 example: "10:30"
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       500:
 *         description: Failed to book appointment
 */

router.post("/", bookAppointment);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get appointments (user or admin)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   doctor:
 *                     $ref: '#/components/schemas/Doctor'
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [pending, confirmed, cancelled]
 *       401:
 *         description: Unauthorized
 */
router.use(authMiddleware);
router.get("/", getAppointments);

// Admin: update status
/**
 * @swagger
 * /appointments/{id}/status:
 *   patch:
 *     summary: Update appointment status (admin only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Appointment status updated
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Appointment not found
 *       403:
 *         description: Unauthorized or forbidden
 */

router.patch(
  "/:id/status",
  roleMiddleware(Role.ADMIN),
  updateAppointmentStatus
);

export default router;
