import {
  Category,
  SubCategoriesState,
  TodoParams,
} from "@/types/categoryTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCategories, setSubCategories } from "./slices/categorySlice";

export const saveCategoriesToStorage = createAsyncThunk(
  "category/saveCategoriesToStorage",
  async (categories: Category[], { dispatch }) => {
    localStorage.setItem("categories", JSON.stringify(categories));
    dispatch(setCategories(categories));
  }
);

export const saveSubCategoriesToStorage = createAsyncThunk(
  "category/saveSubCategoriesToStorage",
  async (
    payload: SubCategoriesState & { subStorageKey: string },
    { dispatch }
  ) => {
    localStorage.setItem(
      payload.subStorageKey,
      JSON.stringify(payload.subCategories)
    );
    dispatch(setSubCategories(payload));
  }
);

export const loadCategoriesFromStorageAsync = createAsyncThunk(
  "categories/loadFromStorage",
  async () => {
    const data = localStorage.getItem("categories");
    return data ? JSON.parse(data) : [];
  }
);

export const loadSubCategoriesFromStorageAsync = createAsyncThunk(
  "subCategories/loadFromStorage",
  async ({ subCategoryId }: { subCategoryId: string }) => {
    const data = localStorage.getItem(subCategoryId);
    return data ? JSON.parse(data) : [];
  }
);

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodosAsync",
  async (storageKey: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/todos?storageKey=${storageKey}`
    );
    return response.data;
  }
);

export const setTodosAsync = createAsyncThunk(
  "todos/setTodosAsync",
  async ({ todos, storageKey }: TodoParams) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/todos`, {
      todos,
      storageKey,
    });
    return todos;
  }
);

export const updateTodosAsync = createAsyncThunk(
  "todos/updateTodosAsync",
  async ({ todos, storageKey }: TodoParams) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/todos`,
      {
        todos,
        storageKey,
      }
    );
    return todos;
  }
);
