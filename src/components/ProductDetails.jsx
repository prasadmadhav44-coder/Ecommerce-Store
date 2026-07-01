import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import useProductDetailsFetch from "../hooks/useProductDetailsFetch";
import CartStore from "../store/CartStore";
import WishlistStore from "../store/WishlistStore";
import ToastStore from "../store/ToastStore";
import PageHeader from "./ui/PageHeader";
import Button from "./ui/Button";
import { getDiscountedPrice, formatPrice } from "../utils/pricing";
import usePageTitle from "../hooks/usePageTitle";

const PLACEHOLDER_IMAGE = "/product-placeholder.svg";

const ShimmerEffect = () => (
  <div className="animate-pulse lg:grid lg:grid-cols-2 lg:gap-12">
    <div className="aspect-square rounded-xl bg-gray-200" />
    <div className="mt-8 space-y-4 lg:mt-0">
      <div className="h-8 w-3/4 rounded bg-gray-200" />
      <div className="h-10 w-1/3 rounded bg-gray-200" />
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-2/3 rounded bg-gray-200" />
        ))}
      </div>
      <div className="flex gap-4 pt-4">
        <div className="h-10 w-40 rounded bg-gray-200" />
        <div className="h-10 w-40 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { product_id = 1 } = useParams();
  const { addProduct } = useContext(CartStore);
  const { isInWishlist, toggleWishlist } = useContext(WishlistStore);
  const { showToast } = useContext(ToastStore);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useProductDetailsFetch(product_id);

  usePageTitle(product?.title || "Product");

  if (loading) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <ShimmerEffect />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
      </section>
    );
  }

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail || PLACEHOLDER_IMAGE];
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (outOfStock) return;

    addProduct(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice,
        image: images[0] || PLACEHOLDER_IMAGE,
      },
      quantity
    );
    showToast(`Added ${quantity} × "${product.title}" to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image: images[0] || PLACEHOLDER_IMAGE,
    });
    showToast(
      inWishlist ? `Removed "${product.title}" from wishlist` : `Added "${product.title}" to wishlist`
    );
  };

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: product.title },
          ]}
        />

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <img
                className="h-full w-full object-contain p-6"
                src={images[selectedImage] || PLACEHOLDER_IMAGE}
                alt={product.title}
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      selectedImage === index ? "border-primary-600" : "border-gray-200"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 lg:mt-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-3xl font-extrabold text-gray-900">{formatPrice(discountedPrice)}</p>
              {product.discountPercentage > 0 && (
                <>
                  <p className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</p>
                  <span className="rounded bg-primary-50 px-2 py-1 text-sm font-medium text-primary-700">
                    {Math.round(product.discountPercentage)}% off
                  </span>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-yellow-500">★ {product.rating.toFixed(1)}</span>
              {product.reviews && (
                <span className="text-gray-500">({product.reviews.length} reviews)</span>
              )}
            </div>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-medium text-gray-900">Brand:</dt>
                <dd className="text-gray-600">{product.brand}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-gray-900">Category:</dt>
                <dd className="text-gray-600 capitalize">{product.category}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-gray-900">Availability:</dt>
                <dd className={outOfStock ? "font-medium text-red-600" : "font-medium text-green-600"}>
                  {outOfStock ? "Out of stock" : `${product.stock} in stock`}
                </dd>
              </div>
            </dl>

            {!outOfStock && (
              <div className="mt-6">
                <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-900">
                  Quantity
                </label>
                <div className="inline-flex items-center rounded-lg border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span id="quantity" className="min-w-[3rem] px-3 py-2 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={handleToggleWishlist}
                aria-pressed={inWishlist}
              >
                {inWishlist ? "♥ In wishlist" : "♡ Add to favorites"}
              </Button>
              <Button onClick={handleAddToCart} disabled={outOfStock}>
                {outOfStock ? "Out of stock" : "Add to cart"}
              </Button>
            </div>

            <hr className="my-8 border-gray-200" />

            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.shippingInformation && (
              <p className="mt-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">Shipping: </span>
                {product.shippingInformation}
              </p>
            )}
            {product.warrantyInformation && (
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-gray-900">Warranty: </span>
                {product.warrantyInformation}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
