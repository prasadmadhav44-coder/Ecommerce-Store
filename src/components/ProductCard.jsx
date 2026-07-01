import { Link } from "react-router-dom";
import { useContext } from "react";
import CartStore from "../store/CartStore";
import ToastStore from "../store/ToastStore";
import { getDiscountedPrice, formatPrice } from "../utils/pricing";
import Button from "./ui/Button";

function ProductCard({
  productImage,
  productOffer,
  productTitle,
  rating,
  productRatingReview,
  productPrice,
  productId,
  brand,
  stock = 1,
}) {
  const { addProduct } = useContext(CartStore);
  const { showToast } = useContext(ToastStore);

  const discountedPrice = getDiscountedPrice(productPrice, productOffer);
  const hasDiscount = productOffer > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (stock === 0) return;

    addProduct({
      id: productId,
      title: productTitle,
      price: productPrice,
      discountedPrice,
      image: productImage || "/product-placeholder.svg",
    });
    showToast(`Added "${productTitle}" to cart`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/products/${productId}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        {brand && (
          <span className="absolute left-3 top-3 z-10 rounded bg-primary-600 px-2 py-1 text-xs font-medium text-white">
            {brand}
          </span>
        )}
        <img
          className="h-full w-full object-contain p-4 transition group-hover:scale-105"
          src={productImage || "/product-placeholder.svg"}
          alt={productTitle}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {hasDiscount && (
          <span className="mb-2 w-fit rounded bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
            Up to {Math.round(productOffer)}% off
          </span>
        )}

        <Link
          to={`/products/${productId}`}
          className="line-clamp-2 text-base font-semibold text-gray-900 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
        >
          {productTitle}
        </Link>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-yellow-500">★ {rating}</span>
          <span>({productRatingReview} in stock)</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-xl font-bold text-gray-900">{formatPrice(discountedPrice)}</p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">{formatPrice(productPrice)}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="ghost"
              className="px-3 py-2 text-xs"
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              Add
            </Button>
            <Link to={`/products/${productId}`}>
              <Button className="px-3 py-2 text-xs">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
