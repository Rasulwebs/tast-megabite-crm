import { CategoryTypes } from "@/types/category";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

const initialState: CategoryTypes.InitialData = {
  isOpenCategoryCreateModal: false,
  categoryName: "",
  id: "",
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setIsOpenCategoryCreateModal(state, payload: PayloadAction<boolean>) {
      state.isOpenCategoryCreateModal = payload.payload;
    },
    setCategoryName(state, payload: PayloadAction<string>) {
      state.categoryName = payload.payload;
    },

    setId(state, payload: PayloadAction<string>) {
      state.id = payload.payload;
    },
  },
});

export const { setIsOpenCategoryCreateModal, setCategoryName, setId } =
  CategorySlice.actions;

export default CategorySlice.reducer;
