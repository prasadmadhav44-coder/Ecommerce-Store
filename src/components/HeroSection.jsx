import { Link } from "react-router-dom";

const trustBadges = [
  {
    title: "Free Shipping",
    description: "On orders over $50",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0a2 2 0 01-2 2H5a2 2 0 01-2-2m14 0V9a1 1 0 00-1-1h-4"
      />
    ),
  },
  {
    title: "Secure Payment",
    description: "256-bit SSL encryption",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
  },
];

const HeroSection = () => {
  return (
    <section className="border-b border-gray-200 bg-white py-10 md:py-16">
      <div className="mx-auto grid max-w-screen-xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-600">
            Welcome to Ecommerce Store
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
            Discover quality products at unbeatable prices
          </h1>
          <p className="mb-8 max-w-xl text-lg text-gray-600">
            Shop curated deals across electronics, fashion, home, and more — with fast delivery and easy returns.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3.5 text-center font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            Shop Now
          </Link>
        </div>
        <div className="hidden justify-center lg:flex">
          <img
            src="/hero-shopping.svg"
            alt="Online shopping illustration"
            className="max-h-80 w-full max-w-md object-contain"
          />
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-screen-xl gap-6 px-4 sm:grid-cols-3">
        {trustBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {badge.icon}
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{badge.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
