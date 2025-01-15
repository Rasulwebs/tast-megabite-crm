import { ProductTypes } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

const initialState: ProductTypes.InitialDataProduct = {
  isOpenProductCreateModal: false,
  product: null,
};

const ProductSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setIsOpenProductCreateModal(state, payload: PayloadAction<boolean>) {
      state.isOpenProductCreateModal = payload.payload;
    },
    setProduct(state, payload: PayloadAction<ProductTypes.Product | null>) {
      state.product = payload.payload;
    },
  },
});

export const { setIsOpenProductCreateModal, setProduct } =
  ProductSlice.actions;

export default ProductSlice.reducer;
