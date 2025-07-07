import { Request, Response, NextFunction } from "express";
import { nodeEnv } from "../config/index";

interface AppErrorType extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const globalErrorHandler = (
  err: AppErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (nodeEnv === "production") {
    if (err.isOperational) {
      res
        .status(err.statusCode)
        .json({ status: err.status, message: err.message });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Something went very wrong!" });
    }
  } else {
    console.log("UNEXPECTED ERROR: ", err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};

export default globalErrorHandler;
