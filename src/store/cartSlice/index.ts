import { CartTypes } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

const initialState: CartTypes.InitialDataCart = {
  cartProucts: [],
};

const CartSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCartproducts(state, payload: PayloadAction<CartTypes.CartProduct[]>) {
      state.cartProucts = payload.payload;
    },
  },
});

export const { setCartproducts } = CartSlice.actions;

export default CartSlice.reducer;
