import mongoose, { Document, Schema } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  availability: string[];
  location: string;
  contact: string;
}

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availability: [{ type: String, required: true }], // e.g. ["Monday 9AM-12PM"]
  location: { type: String, required: true },
  contact: { type: String, required: true },
});

const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
export default Doctor;
