import React, { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  requestSignupOtp,
  verifySignupOtp,
} from "../app/features/auth/authThunk";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Header from "../components/Header";

export default function Signup() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [isOtpInputOpen, setIsOtpInputOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpHide, setOtpHide] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(requestSignupOtp({ name, dob, email }) as any).unwrap();
      setIsOtpInputOpen(true);
    } catch (error) {
      console.error("Error requesting OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const signupWithOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(
        verifySignupOtp({ name, dob, email, otp }) as any
      ).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden lg:flex mx-4">
        {/* Left side: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
              <p className="text-gray-500 text-sm">
                Sign up to enjoy the feature of HD
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={isOtpInputOpen ? signupWithOtp : getOtp}
              className="space-y-6"
            >
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Your Name
                </label>
              </div>

              {/* Date of Birth */}
              <div className="relative">
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
                <label
                  htmlFor="dob"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Date of Birth
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Email
                </label>
              </div>

              {/* OTP Input - no floating label */}
              {isOtpInputOpen && (
                <div className="relative">
                  <input
                    type={otpHide ? "password" : "text"}
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
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
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading
                  ? isOtpInputOpen
                    ? "Submitting..."
                    : "Loading..."
                  : isOtpInputOpen
                  ? "Sign up"
                  : "Get OTP"}
              </button>

              {/* Sign in link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right side: Image (Desktop only) */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/assets/container.png"
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
