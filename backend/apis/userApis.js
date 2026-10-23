import express from "express";
import { registerUser, verifyotp } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post('/register-user', registerUser)
userRouter.post("/verify-otp", verifyotp);
// userRouter.post("/resend-otp", resendOTP);