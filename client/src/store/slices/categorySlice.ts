import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryState,
  Category,
  SubCategoriesState,
} from "@/types/categoryTypes";
import { fetchTodosAsync, setTodosAsync, updateTodosAsync } from "../services";

const initialState: CategoryState = {
  categories: [],
  subCategories: [],
  todos: [],
  progressInfo: {
    progress: 0,
    currentSubCategoryName: "",
  },
  isEditingTodo: false,
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
    loadCategoriesFromStorage: (state) => {
      const storedCategories = localStorage.getItem("categories")
        ? JSON.parse(localStorage.getItem("categories") as string)
        : null;

      if (storedCategories && storedCategories.length !== 0) {
        state.categories = storedCategories;
      }
    },
    loadSubCategoriesFromStorage: (
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
    setProgress: (state, action) => {
      state.progressInfo = action.payload;
    },
    setIsEditingTodo: (state, action) => {
      state.isEditingTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(setTodosAsync.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(updateTodosAsync.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const {
  setCategories,
  setSubCategories,
  loadCategoriesFromStorage,
  loadSubCategoriesFromStorage,
  setProgress,
  setIsEditingTodo,
} = categorySlice.actions;

export default categorySlice.reducer;
