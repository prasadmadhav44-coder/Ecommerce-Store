import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

const values = [
  {
    title: "Quality First",
    description: "Every product is selected for durability, value, and customer satisfaction.",
  },
  {
    title: "Fair Pricing",
    description: "Transparent discounts and competitive prices — no hidden fees at checkout.",
  },
  {
    title: "Customer Care",
    description: "Responsive support and hassle-free returns so you can shop with confidence.",
  },
];

const AboutPage = () => {
  usePageTitle("About");

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <PageHeader title="About Ecommerce Store" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our mission</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Ecommerce Store was built to make online shopping simple, trustworthy, and enjoyable.
              We curate products across categories — from everyday essentials to premium picks —
              and deliver them with the service you deserve.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you are upgrading your tech, refreshing your wardrobe, or finding the perfect
              gift, our catalog is designed to help you discover great products at fair prices.
            </p>
            <Link to="/products" className="mt-6 inline-block">
              <Button>Explore Products</Button>
            </Link>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-primary-50 p-8">
            <h3 className="text-lg font-semibold text-primary-800">Why shop with us?</h3>
            <ul className="mt-4 space-y-3 text-primary-900">
              <li>✓ Curated catalog from trusted brands</li>
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ Secure checkout experience</li>
              <li>✓ 30-day easy returns</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Our values</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
