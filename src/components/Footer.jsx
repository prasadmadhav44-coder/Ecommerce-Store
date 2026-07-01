import { Link } from "react-router-dom";
import Logo from "./ui/Logo";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
  { to: "/cart", label: "Cart" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-10 text-center lg:px-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mx-auto mt-4 max-w-lg text-sm text-gray-500">
          Your trusted destination for quality products, fair prices, and a smooth shopping experience.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
          {footerLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-gray-500">
          © {year}{" "}
          <span className="font-medium text-gray-700">Ecommerce Store</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
