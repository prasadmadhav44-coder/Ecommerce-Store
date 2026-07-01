import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 ${className}`}
      aria-label="Ecommerce Store home"
    >
      <img src="/logo.svg" alt="" className="h-9 w-9" aria-hidden="true" />
      <span className="text-xl font-semibold text-gray-900">
        Ecommerce Store
      </span>
    </Link>
  );
}
