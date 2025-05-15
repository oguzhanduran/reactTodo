import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryState,
  Category,
  SubCategoriesState,
} from "@/types/categoryTypes";
import {
  fetchTodosAsync,
  setTodosAsync,
  updateTodosAsync,
  loadSubCategoriesFromStorageAsync,
  loadCategoriesFromStorageAsync,
} from "../../services/todoService";

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
    },
    setSubCategories: (state, action: PayloadAction<SubCategoriesState>) => {
      state.subCategories = action.payload.subCategories;
    },
    setProgress: (state, action) => {
      state.progressInfo = action.payload;
    },
    setIsEditingTodo: (state, action) => {
      state.isEditingTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadCategoriesFromStorageAsync.fulfilled,
      (state, action) => {
        state.categories = action.payload;
      }
    );

    builder.addCase(
      loadSubCategoriesFromStorageAsync.fulfilled,
      (state, action) => {
        if (action.payload && action.payload.length > 0) {
          state.subCategories = action.payload;
        }
      }
    );

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
  setProgress,
  setIsEditingTodo,
} = categorySlice.actions;

export default categorySlice.reducer;
