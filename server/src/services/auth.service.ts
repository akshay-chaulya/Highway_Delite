import { StatusCodes } from "http-status-codes";
import * as UserRepo from "../repository/auth.repository";
import AppError from "../utils/appError";
import { generateOTP, generateOTPExpiry } from "../utils/generateOTP";
import { sendOTP } from "./mail.service";

export const signupService = async (name: string, dob: Date, email: string) => {
  const existingUser = await UserRepo.findUserByEmail(email);
  if (existingUser) throw new AppError("User already exists", StatusCodes.BAD_REQUEST);

  const otp = generateOTP();
  const otpExpires = generateOTPExpiry();

  await sendOTP(email, otp, name);
  await UserRepo.createUser({ name, dob, email, otp, otpExpires, isVerified: false });
};

export const resendOTPService = async (email: string) => {
  const user = await UserRepo.findUserByEmail(email);
  if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);

  const otp = generateOTP();
  const otpExpires = generateOTPExpiry();

  await UserRepo.updateUserOTP(email, otp, otpExpires);
  await sendOTP(email, otp, user.name);
};

export const verifyUser = async (email: string, otp: string, dob?: Date, name?: string) => {
  const user = await UserRepo.findUserByEmail(email);
  if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);

  if (!user.otp || !user.otpExpires) {
    throw new AppError("OTP not requested or already used", StatusCodes.BAD_REQUEST);
  }

  if (user.otp !== otp || user.otpExpires < new Date()) {
    throw new AppError("Invalid or expired OTP", StatusCodes.UNAUTHORIZED);
  }

  return await UserRepo.verifyUser(email, dob, name);
};
