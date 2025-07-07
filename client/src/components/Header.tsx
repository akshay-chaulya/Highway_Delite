import React from "react";
import { Link } from "react-router-dom";

//
// --- Logo Component ---
//
const Logo: React.FC = () => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    {/* Outer rays */}
    <path
      d="M14 2V8
         M14 20V26
         M2 14H8
         M20 14H26
         M5 5L9 9
         M19 19L23 23
         M5 23L9 19
         M19 9L23 5"
      stroke="#367AFF"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Inner circle */}
    <circle cx="14" cy="14" r="6" fill="white" stroke="#367AFF" strokeWidth="4" />
  </svg>
);

//
// --- Header Component ---
//
export default function Header() {
  return (
    <nav className="w-full py-6 px-4 md:px-10 flex items-center justify-between bg-white shadow-sm">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-2xl font-bold text-[#232323] tracking-wide">
          Dashboard
        </span>
      </div>

      {/* Right: Sign Out */}
      <Link
        to="/login"
        className="text-blue-600 font-medium hover:underline transition-colors"
      >
        Sign Out
      </Link>
    </nav>
  );
}
