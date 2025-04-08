import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryState,
  Category,
  SubCategoriesState,
  Todo,
} from "@/types/categoryTypes";
import axios from "axios";

const initialState: CategoryState = {
  categories: [],
  subCategories: [],
  todos: [],
};

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodosAsync",
  async (storageKey: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/todos?storageKey=${storageKey}`
    );
    return response.data;
  }
);

export const setTodosAsync = createAsyncThunk(
  "todos/setTodosAsync",
  async ({ todos, storageKey }: { todos: Todo[]; storageKey: string }) => {
    await axios.post(`http://localhost:8080/api/todos`, { todos, storageKey });
    return todos;
  }
);

export const updateTodosAsync = createAsyncThunk(
  "todos/updateTodosAsync",
  async ({ todos, storageKey }: { todos: Todo[]; storageKey: string }) => {
    await axios.put(`http://localhost:8080/api/todos`, { todos, storageKey });
    return todos;
  }
);

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
    setCategoriesFromStorage: (state) => {
      const storedCategories = localStorage.getItem("categories")
        ? JSON.parse(localStorage.getItem("categories") as string)
        : null;

      if (storedCategories && storedCategories.length !== 0) {
        state.categories = storedCategories;
      }
    },
    setSubCategoriesFromStorage: (
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
  setCategoriesFromStorage,
  setSubCategoriesFromStorage,
} = categorySlice.actions;

export default categorySlice.reducer;
