import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodSchema, ZodTypeAny } from "zod";

const validate = (schema: ZodSchema | ZodTypeAny): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => {
        const field = e.path?.[0]?.toString() || "unknown";
        return {
          field,
          message: e.message,
        };
      });

      res.status(StatusCodes.BAD_REQUEST).json({
        status: "fail",
        message: "Invalid Credentials",
        errors,
      });

      return; // ✅ prevent further execution, but don't return a Response object
    }

    req.body = result.data;
    next(); // ✅ continue to controller
  };
};

export default validate;
