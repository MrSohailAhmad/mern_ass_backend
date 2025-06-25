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
router.post("/", bookAppointment);
router.get("/", getAppointments);

// Admin: update status
router.patch("/:id/status", roleMiddleware(Role.USER), updateAppointmentStatus);

export default router;
