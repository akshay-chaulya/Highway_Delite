import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../service";
import { toast } from "react-toastify";
import type { User } from "./authSlice";

export const requestSignupOtp = createAsyncThunk(
  "auth/requestSignupOtp",
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/signup", userData);
      toast.success(data.message || "OTP sent to email");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to signup";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const verifySignupOtp = createAsyncThunk(
  "auth/verifySignupOtp",
  async (userData: User & { otp: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/signup/verify", userData);
      toast.success(data.message || "Signup successful");
      localStorage.setItem("token", data.token);
      return data.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to verify OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const requestLoginOtp = createAsyncThunk(
  "auth/requestLoginOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", { email });
      toast.success(data.message || "OTP sent to email");
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Failed to request login OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const verifyLoginOtp = createAsyncThunk(
  "auth/verifyLoginOtp",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/auth/login/verify", { email, otp });
      toast.success(data.message || "Login successful");
      localStorage.setItem("token", data.token);
      return data.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to verify login OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);
