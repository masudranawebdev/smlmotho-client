import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import { baseApi } from "./api/baseApi";
import localstorageMiddleware from "./localstorageMiddleware";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('carts');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
export const store = configureStore({
  reducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, localstorageMiddleware),
});
