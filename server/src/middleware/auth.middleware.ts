import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../utils/jwt";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.cookies.jwt || req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Unauthorized: No token" });
    return;
  }
  const token = authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token" });
    return;
  }

  const decoded = verifyJwtToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
  req.user = decoded;
  return next();
};

export default authMiddleware;
