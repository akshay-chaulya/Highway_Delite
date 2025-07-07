
export interface IUser {
  name: string;
  dob: Date;
  email: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
}