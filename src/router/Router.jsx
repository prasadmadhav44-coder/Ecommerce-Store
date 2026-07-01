import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ErrorPage from "../pages/ErrorPage";
import { lazy, Suspense } from "react";

const ContactPage = lazy(() => import("../pages/ContactPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:product_id", element: <ProductDetailsPage /> },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div className="py-16 text-center text-gray-500">Loading...</div>}>
            <ContactPage />
          </Suspense>
        ),
      },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
