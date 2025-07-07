import { User } from "../models/user.models";
import { IUser } from "../types";

export const findUserByEmail = (email: string) => 
  User.findOne({ email });

export const createUser = (data: Partial<IUser>) => 
  User.create(data);

export const updateUserOTP = (email: string, otp: string, otpExpires: Date) => 
  User.findOneAndUpdate({ email }, { otp, otpExpires });

export const verifyUser = (email: string, dob?: Date, name?: string) => 
  User.findOneAndUpdate(
    { email },
    {
      isVerified: true,
      otp: null,
      otpExpires: null,
      dob: dob || undefined,
      name: name || undefined,
    },
    { new: true }
  );
