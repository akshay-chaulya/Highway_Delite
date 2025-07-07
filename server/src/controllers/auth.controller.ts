import { Response, Request } from "express";
import * as AuthService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";

export const requestSignupOtp = catchAsync(
  async (req: Request, res: Response) => {
    const { name, email, dob } = req.body;
    await AuthService.signupService(name, new Date(dob), email);
    res.status(StatusCodes.OK).json({ message: "OTP sent to email" });
  }
);

export const verifySignupOtp = catchAsync(
  async (req: Request, res: Response) => {
    const { name, email, dob, otp } = req.body;
    const user = await AuthService.verifyUser(email, otp, new Date(dob), name);
    // once verified, issue JWT or session cookie here...
    res.status(StatusCodes.OK).json({ message: "Signup successful", user });
  }
);

export const requestLoginOtp = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.resendOTPService(email);
    res.status(StatusCodes.OK).json({ message: "OTP sent to email" });
  }
);

export const verifyLoginOtp = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const user = await AuthService.verifyUser(email, otp);
    // once verified, issue JWT or session cookie here...
    res.status(StatusCodes.OK).json({ message: "Login successful", user });
  }
);
