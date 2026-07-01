import { createContext } from "react";

const WishlistStore = createContext({
  items: [],
  isInWishlist: () => false,
  toggleWishlist: () => {},
});

export default WishlistStore;
