import { createContext } from "react";

const initialCartState = {
  items: [],
  cartCount: 0,
  addProduct: () => {},
  updateQuantity: () => {},
  removeProduct: () => {},
  deleteAllProducts: () => {},
  getCartTotal: () => 0,
};

const CartStore = createContext(initialCartState);

export default CartStore;
