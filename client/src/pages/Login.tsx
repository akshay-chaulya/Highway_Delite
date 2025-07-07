import { useState, type FormEvent } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  requestLoginOtp,
  verifyLoginOtp,
} from "../app/features/auth/authThunk";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpHide, setOtpHide] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(requestLoginOtp(email) as any).unwrap();
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
      await dispatch(requestLoginOtp(email) as any).unwrap();
    } catch (err) {
      console.error("Error resending OTP:", err);
    } finally {
      setResendLoading(false);
    }
  };

  const submitOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(verifyLoginOtp({ email, otp }) as any).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Error verifying OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Sign In
        </h1>
        <form
          onSubmit={isOtpOpen ? submitOtp : sendOtp}
          className="space-y-6"
        >
          {/* Email */}
          <div className="group">
            <label
              htmlFor="email"
              className="block mb-1 text-gray-600 group-focus-within:text-blue-600 transition-colors"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              disabled={isOtpOpen}
            />
          </div>

          {/* OTP */}
          {isOtpOpen && (
            <>
              <div className="relative group">
                <label
                  htmlFor="otp"
                  className="block mb-1 text-gray-600 group-focus-within:text-blue-600 transition-colors"
                >
                  OTP
                </label>
                <input
                  type={otpHide ? "password" : "text"}
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

              <button
                type="button"
                onClick={resendOtp}
                disabled={resendLoading}
                className="text-sm text-blue-600 hover:underline"
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading
              ? isOtpOpen
                ? "Verifying..."
                : "Sending..."
              : isOtpOpen
              ? "Sign In"
              : "Send OTP"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
