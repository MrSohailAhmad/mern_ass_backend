import { Request, Response } from "express";
import Appointment from "../models/Appointment";
import { AuthRequest } from "../middleware/authMiddleware";
import Doctor from "../models/Doctor";
import User from "../models/User";
import { Role } from "../Interfaces/common";

// POST /api/appointments — Book appointment (User)

export const bookAppointment = async (req: AuthRequest, res: Response) => {
  const { doctorId, date, time } = req.body;
  const userId = req.user?.id;

  try {
    const appointment = new Appointment({
      userId,
      doctorId,
      date,
      time,
      status: "pending",
    });

    await appointment.save();

    // Dummy Email Logic
    const user = await User.findById(userId);
    const doctor = await Doctor.findById(doctorId);

    console.log(`
    📧 Email Confirmation Sent (Dummy)

    To: ${user?.email}
    Subject: Appointment Booked

    Dear ${user?.name},

    Your appointment with Dr. ${doctor?.name} (${doctor?.specialty})
    is scheduled for ${date} at ${time}.

    Status: Pending

    Thank you!
    `);

    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

// GET /api/appointments — View appointments (User/Admin)
export const getAppointments = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  let appointments = [];

  if (user?.role === Role.ADMIN) {
    appointments = await Appointment.find()
      .populate({
        path: "doctorId",
        select: "name email specialty location contact",
      })
      .populate({ path: "userId", select: "name email" });
  } else {
    appointments = await Appointment.find({ userId: user?.id })
      .populate({
        path: "doctorId",
        select: "name email specialty location contact",
      })
      .populate({ path: "userId", select: "name email" });
  }

  // Rename in-memory
  const renamedAppointments = appointments.map((appt) => ({
    ...appt.toObject(),
    doctor: appt.doctorId,
    user: appt.userId,
  }));

  res.json(renamedAppointments);
};

// PATCH /api/appointments/:id/status — Update status (Admin only)
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  const updated = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updated) {
    res.status(404).json({ message: "Appointment not found" });
    return;
  }

  res.json({ message: "Appointment status updated", appointment: updated });
};
