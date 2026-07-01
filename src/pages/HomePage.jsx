import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ProductLayout from "../components/ProductLayout";
import usePageTitle from "../hooks/usePageTitle";
import Button from "../components/ui/Button";

const HomePage = () => {
  usePageTitle("Home");

  return (
    <>
      <HeroSection />
      <ProductLayout variant="featured" />
      <section className="border-t border-gray-200 bg-primary-600 py-12">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to find your next favorite product?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-100">
            Browse our full catalog with search, filters, and sorting to find exactly what you need.
          </p>
          <Link to="/products" className="mt-6 inline-block">
            <Button variant="secondary" className="border-0 bg-white text-primary-700 hover:bg-primary-50">
              Browse All Products
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
