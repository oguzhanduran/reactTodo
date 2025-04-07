import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryState,
  Category,
  SubCategoriesState,
  TodosState,
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
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    setSubCategories: (state, action: PayloadAction<SubCategoriesState>) => {
      state.subCategories = action.payload.subCategories;
      localStorage.setItem(
        action.payload.subStorageKey,
        JSON.stringify(state.subCategories)
      );
    },
    setTodos: (state, action: PayloadAction<TodosState>) => {
      state.todos = action.payload.todos;
      localStorage.setItem(
        action.payload.storageKey,
        JSON.stringify(state.todos)
      );
    },

    fetchTodos: (state, action: PayloadAction<string>) => {
      const storageKey = action.payload;
      const storedTodos = localStorage.getItem(storageKey);
      state.todos = storedTodos ? JSON.parse(storedTodos) : [];
    },

    fetchCategories: (state) => {
      const storedCategories = localStorage.getItem("categories")
        ? JSON.parse(localStorage.getItem("categories") as string)
        : null;

      if (storedCategories && storedCategories.length !== 0) {
        state.categories = storedCategories;
      }
    },
    fetchSubCategories: (
      state,
      action: PayloadAction<{ subCategoryId: string }>
    ) => {
      const { subCategoryId } = action.payload;

      const storedSubCategories = localStorage.getItem(subCategoryId)
        ? JSON.parse(localStorage.getItem(subCategoryId) as string)
        : null;
      if (storedSubCategories && storedSubCategories.length !== 0) {
        state.subCategories = storedSubCategories;
      }
    },
  },
});

export const {
  setCategories,
  setSubCategories,
  setTodos,
  fetchTodos,
  fetchCategories,
  fetchSubCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
