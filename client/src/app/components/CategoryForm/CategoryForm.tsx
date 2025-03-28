"use client";
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryForm.module.css";
import {v4 as uuidv4} from "uuid"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCategories } from "@/store/slices/categorySlice";
import { Category } from "@/types/categoryTypes";

const CategoryForm = () => {
  const [categoryInput, setCategoryInput] = useState("");

  const categories = useSelector((state: RootState) => state.category.categories) as Category[];
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    setCategoryInput(e.target.value)
  }

  const addCategoryItem = () => {
     if(categoryInput.trim() !== "") {
      const updatedCategories = [
        ...categories, {name: categoryInput, id: uuidv4(), open: false}
      ]
      dispatch(setCategories(updatedCategories));
      setCategoryInput("")
     }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formSide}>
        <input
          placeholder="Enter category title"
          type="text"
          value={categoryInput}
          onChange={handleChange}
        />
        <button onClick={addCategoryItem}>Add</button>
      </div>
      {categories.map((categoryItem) => (
           <CategoryItem
           key={categoryItem.id}
           category={categoryItem}
         />  
      ))}
    </div>
  );
};

export default CategoryForm;
