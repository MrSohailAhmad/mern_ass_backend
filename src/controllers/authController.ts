import { Request, Response } from "express";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import type { AuthRequest } from "../middleware/authMiddleware";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const payload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({ accessToken, refreshToken, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  // `user` is injected by authMiddleware
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const user = await User.findById(userId).select("-password");
  res.json(user);
};
