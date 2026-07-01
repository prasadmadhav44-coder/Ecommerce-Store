import { Link } from "react-router-dom";
import { useContext } from "react";
import CartStore from "../store/CartStore";
import PageHeader from "./ui/PageHeader";
import EmptyState from "./ui/EmptyState";
import Button from "./ui/Button";
import { formatPrice } from "../utils/pricing";
import usePageTitle from "../hooks/usePageTitle";

const SHIPPING_FEE = 5.99;

const Cart = () => {
  usePageTitle("Cart");
  const { items, updateQuantity, removeProduct, deleteAllProducts, getCartTotal } =
    useContext(CartStore);

  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <PageHeader title="Shopping Cart" />
          <EmptyState
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Start browsing our catalog."
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
        <PageHeader title="Shopping Cart" />

        <div className="lg:flex lg:items-start lg:gap-10">
          <div className="flex-1 space-y-4">
            {items.map((item) => {
              const linePrice = (item.discountedPrice ?? item.price) * item.quantity;
              const unitPrice = item.discountedPrice ?? item.price;
              const hasDiscount = item.discountedPrice && item.discountedPrice < item.price;

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      className="h-24 w-24 shrink-0 rounded-lg border border-gray-100 object-contain p-2"
                      src={item.image || "/product-placeholder.svg"}
                      alt={item.title}
                    />

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/products/${item.id}`}
                        className="font-medium text-gray-900 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
                      >
                        {item.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <span className="font-semibold text-gray-900">{formatPrice(unitPrice)}</span>
                        {hasDiscount && (
                          <span className="text-gray-400 line-through">{formatPrice(item.price)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="inline-flex items-center rounded-lg border border-gray-300">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary-300"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] px-2 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="min-w-[5rem] text-right font-bold text-gray-900">
                        {formatPrice(linePrice)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeProduct(item.id)}
                    className="mt-3 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 rounded"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={deleteAllProducts}
                className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-200 rounded"
              >
                Clear cart
              </button>
            </div>
          </div>

          <div className="mt-8 w-full shrink-0 lg:mt-0 lg:max-w-sm">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Subtotal</dt>
                  <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Shipping</dt>
                  <dd className="font-medium text-gray-900">{formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-base">
                  <dt className="font-semibold text-gray-900">Total</dt>
                  <dd className="font-bold text-gray-900">{formatPrice(total)}</dd>
                </div>
              </dl>

              <Link to="/checkout" className="mt-6 block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>

              <Link
                to="/products"
                className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-primary-700 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
