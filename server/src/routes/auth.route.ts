import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import validate from "../middleware/validate";
import { LoginOtpRequestSchema, LoginOtpVerifySchema, SignupOtpRequestSchema, SignupOtpVerifySchema } from "../validators/user.zod";

const router = Router();

router.post("/signup", validate(SignupOtpRequestSchema), AuthController.requestSignupOtp);
router.post("/signup/verify", validate(SignupOtpVerifySchema), AuthController.verifySignupOtp);
router.post("/login", validate(LoginOtpRequestSchema), AuthController.requestLoginOtp);
router.post("/login/verify", validate(LoginOtpVerifySchema), AuthController.verifyLoginOtp);
router.post("/logout", AuthController.logout);

export default router;
