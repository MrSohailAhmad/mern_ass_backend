import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
  userId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
}

const appointmentSchema = new Schema<IAppointment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  date: { type: String, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);
export default Appointment;
