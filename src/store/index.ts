import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./categorySlice";
import ProductReducer from "./productSlice";
import CartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    product: ProductReducer,
    cart: CartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
