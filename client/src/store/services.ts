import { TodoParams } from "@/types/categoryTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
