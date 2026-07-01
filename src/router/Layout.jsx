import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToastContainer from "../components/ui/Toast";
import { Outlet } from "react-router-dom";
import CartStore from "../store/CartStore";
import WishlistStore from "../store/WishlistStore";
import ToastStore from "../store/ToastStore";

const CART_STORAGE_KEY = "ecommerce-store-cart";
const WISHLIST_STORAGE_KEY = "ecommerce-store-wishlist";

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

const Layout = () => {
  const [cartItems, setCartItems] = useState(() =>
    loadFromStorage(CART_STORAGE_KEY, [])
  );
  const [wishlistItems, setWishlistItems] = useState(() =>
    loadFromStorage(WISHLIST_STORAGE_KEY, [])
  );
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const showToast = useCallback((message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addProduct = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeProduct = useCallback((productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const deleteAllProducts = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice ?? item.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  const isInWishlist = useCallback(
    (productId) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems]
  );

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      ];
    });
  }, []);

  const cartState = {
    items: cartItems,
    cartCount,
    addProduct,
    updateQuantity,
    removeProduct,
    deleteAllProducts,
    getCartTotal,
  };

  const wishlistState = {
    items: wishlistItems,
    isInWishlist,
    toggleWishlist,
  };

  const toastState = { showToast };

  return (
    <ToastStore.Provider value={toastState}>
      <WishlistStore.Provider value={wishlistState}>
        <CartStore.Provider value={cartState}>
          <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
          </div>
        </CartStore.Provider>
      </WishlistStore.Provider>
    </ToastStore.Provider>
  );
};

export default Layout;
