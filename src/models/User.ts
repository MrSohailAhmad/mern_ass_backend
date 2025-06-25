import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../Interfaces/common";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role.ADMIN | Role.USER;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [Role.ADMIN, Role.USER], default: Role.USER },
  createdAt: { type: Date, default: Date.now },
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
