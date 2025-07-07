import nodemailer from "nodemailer";
import { smtpHost, smtpPort, smtpUser, smtpPass } from ".";

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: { user: smtpUser, pass: smtpPass },
//   logger: true,
//   debug: true,
});

transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP verification failed:", err);
    process.exit(1);
  }
  console.log("✅ SMTP server is ready");
});
