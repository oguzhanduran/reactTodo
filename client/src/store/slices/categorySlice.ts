import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryState,
  Category,
  SubCategoriesState,
} from "@/types/categoryTypes";

const initialState: CategoryState = {
  categories: [],
  subCategories: [],
  todos: [],
};

export const categorySlice = createSlice({
  name: "categoryStore",
  initialState: initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action: PayloadAction<SubCategoriesState>) => {
      state.subCategories = action.payload.subCategories;
      console.log("subStorageKey", action.payload.subStorageKey);
    },
  },
});

export const { setCategories, setSubCategories } = categorySlice.actions;

export default categorySlice.reducer;
