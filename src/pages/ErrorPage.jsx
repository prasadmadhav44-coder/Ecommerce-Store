import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Page not found
          </p>
          <p className="mb-8 text-lg font-light text-gray-500">
            Sorry, we couldn&apos;t find that page. Head back to the homepage to keep shopping.
          </p>
          <Link
            to="/"
            className="inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
