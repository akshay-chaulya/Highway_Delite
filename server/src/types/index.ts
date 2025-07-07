export interface IUser {
  name: string;
  dob: Date;
  email: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
}

export interface INote {
  title: string;
  content: string;
}

export interface JWTUser {
    id: string;
    email: string;
    name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser;
    }
  }
}