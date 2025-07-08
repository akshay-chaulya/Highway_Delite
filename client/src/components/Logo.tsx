import { logo } from "../assets";

export default function Logo({ className }: { className?: string }) {
  return <img src={logo} alt="Logo" className={`w-20 h-9 mx-auto mb-4 ${className}`} />;
}
