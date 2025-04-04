"use client";
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryForm.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { categorySlice, setCategories } from "@/store/slices/categorySlice";
import { Category, OpenCategories } from "@/types/categoryTypes";

const CategoryForm = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [openCategories, setOpenCategories] = useState<OpenCategories>({});
  const [currentCategoryId, setCurrentCategoryId] = useState<null | string>(
    null
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  ) as Category[];

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput(e.target.value);
  };

  const addCategoryItem = () => {
    if (categoryInput.trim() !== "") {
      const updatedCategories = [
        ...categories,
        { name: categoryInput, id: uuidv4(), openCategories: false },
      ];
      dispatch(setCategories(updatedCategories));
      setCategoryInput("");
    }
  };

  const deleteCategoryItem = (id: string) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    dispatch(setCategories(updatedCategories));
  };

  const updateCategoryItem = (id: string) => {
    const updatedCategoryItem = categories.map((categoryItem) => {
      if (categoryItem.id === id) {
        const updatedItem = prompt(
          "Enter the new category name",
          categoryItem.name
        );
        const newName =
          updatedItem?.trim() !== "" && updatedItem !== null
            ? updatedItem
            : categoryItem.name;
        return { ...categoryItem, name: newName };
      }
      return categoryItem;
    });
    dispatch(setCategories(updatedCategoryItem));
  };

  const toggleCategoryItem = (id: string) => {
    const openedCategories = { ...openCategories, [id]: !openCategories[id] };
    setOpenCategories(openedCategories);
  };

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
          onDelete={() => deleteCategoryItem(categoryItem.id)}
          onUpdate={() => updateCategoryItem(categoryItem.id)}
          onToggle={() => toggleCategoryItem(categoryItem.id)}
          openCategories={openCategories}
          currentCategoryId={currentCategoryId}
          setCurrentCategoryId={setCurrentCategoryId}
        />
      ))}
    </div>
  );
};

export default CategoryForm;
