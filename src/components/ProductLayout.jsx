import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { ShimmerPostList } from "react-shimmer-effects";
import useProductFetch from "../hooks/useProductFetch";
import PageHeader from "./ui/PageHeader";
import EmptyState from "./ui/EmptyState";
import Button from "./ui/Button";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

const ProductLayout = ({ variant = "catalog" }) => {
  const { data, loading, error } = useProductFetch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const unique = [...new Set(data.map((item) => item.category))].sort();
    return unique;
  }, [data]);

  const filteredProducts = useMemo(() => {
    let result = data;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query)
      );
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    return sortProducts(result, sortBy);
  }, [data, search, category, sortBy]);

  const displayedProducts =
    variant === "featured"
      ? filteredProducts.slice(0, 8)
      : filteredProducts.slice(0, visibleCount);

  const hasMore =
    variant === "catalog" && visibleCount < filteredProducts.length;

  if (loading) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <EmptyState
            title="Unable to load products"
            description={error}
            actionLabel="Try again"
            onAction={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        {variant === "catalog" && (
          <>
            <PageHeader title="All Products" />
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <label htmlFor="search" className="sr-only">
                  Search products
                </label>
                <input
                  id="search"
                  type="search"
                  placeholder="Search by title or brand..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label htmlFor="category" className="sr-only">
                  Filter by category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="all">All categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {variant === "featured" && (
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-1 text-gray-500">Hand-picked deals from our catalog</p>
            </div>
          </div>
        )}

        {displayedProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try adjusting your search or filter criteria."
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setCategory("all");
              setSortBy("default");
              setVisibleCount(PAGE_SIZE);
            }}
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  productId={item.id}
                  productImage={item.thumbnail}
                  productOffer={item.discountPercentage}
                  productTitle={item.title}
                  rating={item.rating}
                  productRatingReview={item.stock}
                  productPrice={item.price}
                  brand={item.brand}
                  stock={item.stock}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="secondary"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  Load more products
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductLayout;
