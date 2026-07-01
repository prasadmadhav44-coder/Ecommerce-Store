import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import CartStore from "../store/CartStore";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import AuthModal from "./AuthModal";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function NavLink({ to, label, isActive, onClick }) {
  const base =
    "block rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-300";
  const active = "bg-primary-50 text-primary-700";
  const inactive = "text-gray-700 hover:bg-gray-50 hover:text-primary-700";

  return (
    <Link to={to} className={`${base} ${isActive ? active : inactive}`} onClick={onClick}>
      {label}
    </Link>
  );
}

const Header = () => {
  const { cartCount } = useContext(CartStore);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 lg:px-6">
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                isActive={isActive(link.to)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300 sm:inline-block"
            >
              Log in
            </button>
            <Button
              variant="primary"
              className="hidden sm:inline-flex px-4 py-2"
              onClick={() => setAuthOpen(true)}
            >
              Get started
            </Button>

            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-300 lg:hidden"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-gray-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  isActive={isActive(link.to)}
                  onClick={closeMobile}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  setAuthOpen(true);
                }}
                className="mt-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Log in / Get started
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;
