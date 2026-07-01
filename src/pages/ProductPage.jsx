import ProductLayout from "../components/ProductLayout";
import usePageTitle from "../hooks/usePageTitle";

const ProductPage = () => {
  usePageTitle("Products");

  return <ProductLayout variant="catalog" />;
};

export default ProductPage;
