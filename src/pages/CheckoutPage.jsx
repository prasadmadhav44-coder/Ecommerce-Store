import { Link } from "react-router-dom";
import { useContext } from "react";
import CartStore from "../store/CartStore";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import { formatPrice } from "../utils/pricing";
import usePageTitle from "../hooks/usePageTitle";

const SHIPPING_FEE = 5.99;

const CheckoutPage = () => {
  usePageTitle("Checkout");
  const { items, getCartTotal } = useContext(CartStore);

  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <PageHeader title="Checkout" />
          <EmptyState
            title="Nothing to checkout"
            description="Your cart is empty. Add products before proceeding to checkout."
            actionLabel="Browse Products"
            actionTo="/products"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <PageHeader
          title="Checkout"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Cart", to: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Shipping details</h2>
            <p className="mt-2 text-sm text-gray-500">
              This is a demo checkout — no payment is processed. Review your order below.
            </p>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="mb-1 block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    id="first-name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="mb-1 block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Order review</h2>
            <ul className="mt-4 divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/product-placeholder.svg"}
                      alt=""
                      className="h-12 w-12 rounded border border-gray-100 object-contain p-1"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">
                    {formatPrice((item.discountedPrice ?? item.price) * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Shipping</dt>
                <dd>{formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <Button className="mt-6 w-full" disabled title="Demo only — no payment processed">
              Place Order (Demo)
            </Button>
            <Link to="/cart" className="mt-4 block text-center text-sm text-primary-700 hover:underline">
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
