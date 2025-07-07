import cors, { CorsOptions } from "cors";
import express, { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { allowedOrigins, nodeEnv, port } from "./config";
import globalErrorHandler from "./middleware/errorHandler";
import mainRouter from "./routes/index";
import AppError from "./utils/appError";
import { dbConnection } from "./db";
import cookieParser from "cookie-parser"

export const app = express();

// Conditional logging in development
if (nodeEnv === "development") app.use(morgan("dev"));

// Parse JSON bodies (limit size to prevent DOS via large payloads)
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true, // Allow cookies, auth headers, etc.
};

// Step 3: Use CORS with options
app.use(cors(corsOptions));

app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from backend!");
});

app.use("/api/v1", mainRouter);

// Catch-all for unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

dbConnection(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
