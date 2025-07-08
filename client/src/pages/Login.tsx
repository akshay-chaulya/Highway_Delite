import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  requestLoginOtp,
  verifyLoginOtp,
} from "../app/features/auth/authThunk";

import { useForm } from "react-hook-form";
import type { AppDispatch } from "../app/store";
import { containerImg } from "../assets";
import Logo from "../components/Logo";

interface FormData {
  email: string;
  otp?: string;
}

export default function Login() {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpHide, setOtpHide] = useState(true);
  const [checkBox, setCheckBox] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const email = watch("email");

  const sendOtp = async (data: FormData) => {
    try {
      setLoading(true);
      await dispatch(requestLoginOtp(data.email)).unwrap();
      setIsOtpOpen(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResendLoading(true);
      await dispatch(requestLoginOtp(email)).unwrap();
    } catch (err) {
      console.error("Error resending OTP:", err);
    } finally {
      setResendLoading(false);
    }
  };

  const submitOtp = async (data: FormData) => {
    try {
      setLoading(true);
      await dispatch(verifyLoginOtp({ email: data.email, otp: data.otp! })).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Error verifying OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-full h-screen bg-white lg:flex">
        {/* Left side: Form */}
        <div className="w-full flex flex-col justify-center">
          <Logo />
          <div className="max-w-sm mx-auto w-full px-8">
            <div className="text-center mb-8 md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-500 text-sm">Sign in to your account</p>
            </div>

            <form
              onSubmit={handleSubmit(isOtpOpen ? submitOtp : sendOtp)}
              className="space-y-6"
            >
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  disabled={isOtpOpen}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Email
                </label>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* OTP Input */}
              {isOtpOpen && (
                <div className="relative">
                  <input
                    type={otpHide ? "password" : "text"}
                    id="otp"
                    placeholder="OTP"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    {...register("otp", { required: "OTP is required" })}
                  />
                  <button
                    type="button"
                    onClick={() => setOtpHide(!otpHide)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {otpHide ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </button>
                  {errors.otp && (
                    <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
                  )}
                </div>
              )}

              {isOtpOpen && (
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={resendLoading}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </button>
              )}

              {
                isOtpOpen && (
                  <div className="flex items-center">
                    <input checked={checkBox} onChange={(e) => setCheckBox(e.target.checked)} type="checkbox" id="remember" className="mr-2 h-4 w-4 " />
                    <label htmlFor="remember" className="text-sm font-medium text-[#232323]">Keep me logged in</label>
                  </div>
                )
              }

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (isOtpOpen && !checkBox)}
                className="w-full py-3 px-4 bg-[#367AFF] cursor-pointer hover:scale-[1.05] transition text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading
                  ? isOtpOpen
                    ? "Verifying..."
                    : "Sending..."
                  : isOtpOpen
                  ? "Sign In"
                  : "Send OTP"}
              </button>

              <p className="text-center text-sm text-[#6C6C6C] mt-4">
                Need an account?{' '}
                <Link
                  to="/signup"
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right side: Image (Desktop only) */}
        <div className="hidden lg:block h-[100%] w-full p-2">
          <img
            src={containerImg}
            alt="Login Visual"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}