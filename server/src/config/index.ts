import "dotenv/config";

export const nodeEnv: string | undefined = process.env.NODE_ENV;
export const allowedOrigins: string[] = process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) || [];
export const port: number = Number(process.env.PORT) || 5000;

export const dbUri: string = process.env.DB_URI!;

export const smtpHost: string = process.env.SMTP_HOST || "smtp.example.com";
export const smtpPort: number = Number(process.env.SMTP_PORT) || 587;
export const smtpUser: string = process.env.SMTP_USER || "username";
export const smtpPass: string = process.env.SMTP_PASS || "password";

export const jwtSecret: string = process.env.JWT_SECRET!;