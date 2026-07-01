import { createContext } from "react";

const ToastStore = createContext({
  showToast: () => {},
});

export default ToastStore;
