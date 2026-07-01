const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-100",
  ghost: "bg-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary-200",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
