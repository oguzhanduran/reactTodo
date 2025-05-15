import {
  Category,
  SubCategoriesState,
  Todo,
} from "@/types/categoryTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCategories, setSubCategories } from "@/store/slices/categorySlice";
import { fetchers } from "./fetchers";

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
  "todos/fetchTodos",
  async (storageKey: string) => {
    return await fetchers.todos.fetch({
      queryParams: { storageKey },
    });
  }
);

export const setTodosAsync = createAsyncThunk(
  "todos/setTodos",
  async ({ todos, storageKey }: { todos: Todo[]; storageKey: string }) => {
    return await fetchers.todos.set({
      payload: { todos, storageKey },
    });
  }
);

export const updateTodosAsync = createAsyncThunk(
  "todos/updateTodos",
  async ({ todos, storageKey }: { todos: Todo[]; storageKey: string }) => {
    return await fetchers.todos.update({
      payload: { todos, storageKey },
    });
  }
);