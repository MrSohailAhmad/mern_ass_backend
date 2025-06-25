import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * @desc    Get all users (Admin)
 * @route   GET /api/users
 * @access  Admin
 */

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user?.id;

    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
