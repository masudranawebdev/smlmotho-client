import { addToCart, removeFromCart, removeOne } from "./features/cartSlice";

const localstorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Store in local storage after the actions have been dispatched
  if (
    action.type === addToCart.type ||
    action.type === removeOne.type ||
    action.type === removeFromCart.type
  ) {
    localStorage.setItem("carts", JSON.stringify(store.getState()));
  }

  return result;
};

export default localstorageMiddleware;
