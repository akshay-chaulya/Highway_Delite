import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  requestSignupOtp,
  verifySignupOtp,
} from "../app/features/auth/authThunk";

import { containerImg } from "../assets";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { FaRegCalendarAlt } from "react-icons/fa";
import type { AppDispatch } from "../app/store";
import Logo from "../components/Logo";

interface SignupData {
  name: string;
  dob: Date | null;
  email: string;
  otp?: string;
}

export default function Signup() {
  const [isOtpInputOpen, setIsOtpInputOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpHide, setOtpHide] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    defaultValues: { name: "", dob: null, email: "", otp: "" },
  });

  const getOtp = async (data: SignupData) => {
    try {
      setLoading(true);
      await dispatch(
        requestSignupOtp({ name: data.name, dob: data.dob, email: data.email })
      ).unwrap();
      setIsOtpInputOpen(true);
    } catch (error) {
      console.error("Error requesting OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const signupWithOtp = async (data: SignupData) => {
    try {
      setLoading(true);
      await dispatch(
        verifySignupOtp({
          name: data.name,
          dob: data.dob,
          email: data.email,
          otp: data.otp!,
        })
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
      <div className="w-full max-w-full h-screen bg-white lg:flex">
        <div className="w-full flex flex-col justify-center">
          <Logo />
          <div className="max-w-sm mx-auto w-full px-8">
            <div className="text-center mb-8 md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
              <p className="text-gray-500 text-sm">
                Sign up to enjoy the feature of HD
              </p>
            </div>

            <form
              onSubmit={handleSubmit(isOtpInputOpen ? signupWithOtp : getOtp)}
              className="space-y-6"
            >
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  {...register("name", { required: "Name is required" })}
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  Your Name
                </label>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="relative w-full">
                <label
                  htmlFor="dob"
                  className={`absolute left-4 bg-white px-1 transition-all ${
                    isFocused || !!control._formValues.dob
                      ? "-top-2.5 text-sm text-blue-600"
                      : "top-3 text-base text-gray-400"
                  }`}
                >
                  Select Date
                </label>

                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <div
                      className={`flex items-center px-4 py-3 rounded-lg bg-white text-gray-900 border transition-all ${
                        isFocused
                          ? "border-blue-500 ring-2 ring-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <FaRegCalendarAlt className="text-xl text-gray-600 ml-5" />
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd MMMM yyyy"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="outline-none px-2 bg-transparent md:w-[300px] lg:w-[350px]"
                        id="dob"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                      />
                    </div>
                  )}
                />

                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dob.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* OTP Input */}
              {isOtpInputOpen && (
                <div className="relative">
                  <input
                    type={otpHide ? "password" : "text"}
                    id="otp"
                    placeholder="OTP"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    {...register("otp", { required: "OTP is required" })}
                  />
                  <button
                    type="button"
                    onClick={() => setOtpHide(!otpHide)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {otpHide ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </button>
                  {errors.otp && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otp.message}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#367AFF] cursor-pointer hover:scale-[1.05] transition text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              <p className="text-center text-sm text-[#6C6C6C] mt-4">
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

        <div className="hidden lg:block h-full w-full p-2">
          <img
            src={containerImg}
            alt="Signup Visual"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
