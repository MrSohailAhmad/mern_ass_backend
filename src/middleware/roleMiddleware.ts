import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { Role } from "../Interfaces/common";

export const roleMiddleware = (role: Role.ADMIN | Role.USER) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: "Access denied: Insufficient role" });
      return;
    }
    next();
  };
};
