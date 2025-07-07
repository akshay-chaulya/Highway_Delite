import { StatusCodes } from "http-status-codes";
import { smtpUser } from "../config";
import { transporter } from "../config/mailer";
import { generateOTPEmail } from "../templates/otpEmailTemplate";
import AppError from "../utils/appError";

export const sendOTP = async (to: string, otp: string, userName: string) => {
  const html = generateOTPEmail(otp, userName);

  try {
    const info = await transporter.sendMail({
      from: `"Note High" <${smtpUser}>`,
      to,
      subject: "Your One‑Time Password (OTP)",
      html,
    });
    console.log(`[SUCCESS] ${new Date().toISOString()} | Email to: ${to} | MessageID: ${info.messageId}`);
  } catch (err: any) {
    console.error("❌ Failed to send OTP:", err);
    throw new AppError("Failed to send OTP email. Please try again.", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
