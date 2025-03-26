"use client";
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryForm.module.css";

const CategoryForm = () => {
  const [categoryInput, setCategoryInput] = useState("");

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
    </div>
  );
};

export default CategoryForm;
