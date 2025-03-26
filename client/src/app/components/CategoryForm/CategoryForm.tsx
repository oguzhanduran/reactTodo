"use client";
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { decrement, increment } from "@/store/TodoSlice";

const CategoryForm = () => {
  const [categoryInput, setCategoryInput] = useState("");

  const count = useSelector((state: RootState) => state.todo.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.formSide}>
        <input
          placeholder="Enter category title"
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button>Add</button>
      </div>

      <CategoryItem />
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
