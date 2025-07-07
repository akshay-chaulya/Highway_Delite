import z from "zod";

const EmailField = z
  .string()
  .email("Invalid email format")
  .nonempty("Email is required");

const NameField = z
  .string()
  .min(3, "Name must be at least 3 characters")
  .nonempty("Name is required");

const DobField = z
  .string()
  .nonempty("Date of birth is required")
  .refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date <= new Date();
  }, {
    message: "Date of birth cannot be in the future",
  });

const OtpField = z
  .string()
  .length(6, "OTP must be 6 digits")
  .regex(/^\d+$/, "OTP must be numeric");

export const SignupOtpRequestSchema = z.object({
  name: NameField,
  email: EmailField,
  dob: DobField,
});
export type SignupOtpRequestDTO = z.infer<typeof SignupOtpRequestSchema>;

export const SignupOtpVerifySchema = z.object({
  name: NameField,
  email: EmailField,
  dob: DobField,
  otp: OtpField,
});
export type SignupOtpVerifyDTO = z.infer<typeof SignupOtpVerifySchema>;

export const LoginOtpRequestSchema = z.object({
  email: EmailField,
});
export type LoginOtpRequestDTO = z.infer<typeof LoginOtpRequestSchema>;

export const LoginOtpVerifySchema = z.object({
  email: EmailField,
  otp: OtpField,
});
export type LoginOtpVerifyDTO = z.infer<typeof LoginOtpVerifySchema>;
