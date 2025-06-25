import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../Interfaces/common";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

export interface AuthRequest extends Request {
  user?: { id: string; role: Role.ADMIN | Role.USER };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as {
      id: string;
      role: Role.ADMIN | Role.USER;
    };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
