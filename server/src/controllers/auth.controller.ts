import { Response, Request } from "express";
import * as AuthService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { getJwtToken } from "../utils/jwt";
import { nodeEnv } from "../config";

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
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid OTP" });
    }
    const token = getJwtToken({
      id: user._id as string,
      email: user.email,
      name: user.name,
    });

    res.cookie("jwt", `Bearer ${token}`, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: nodeEnv === "production" ? "strict" : "lax",
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "Signup successful", data: user, token });
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
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid OTP" });
    }
    console.log("User logged in:", user);
    const token = getJwtToken({
      id: user._id as string,
      email: user.email,
      name: user.name,
    });
    res.cookie("jwt", `Bearer ${token}`, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: nodeEnv === "production" ? "strict" : "lax",
    });
    res.status(StatusCodes.OK).json({ message: "Login successful", data: user, token });
  }
);
