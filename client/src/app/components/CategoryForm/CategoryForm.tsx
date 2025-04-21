"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryForm.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setCategories,
  loadCategoriesFromStorage,
} from "@/store/slices/categorySlice";
import { Category, OpenCategories } from "@/types/categoryTypes";
import ProgressBar from "../ProgressBar/ProgressBar";

const CategoryForm = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [openCategories, setOpenCategories] = useState<OpenCategories>({});
  const [currentCategoryId, setCurrentCategoryId] = useState<null | string>(
    null
  );
  const currentCategory = useSelector((state: RootState) =>
    state.category.categories.find((cat) => cat.id === currentCategoryId)
  );

  const progress = useSelector((state: RootState) => state.category.progress);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  ) as Category[];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesFromStorage());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput(e.target.value);
  };

  const addCategoryItem = () => {
    if (categoryInput.trim() === "") return;

    const newCategory: Category = {
      id: uuidv4(),
      name: categoryInput,
      openCategories: false,
    };

    const updated = [newCategory, ...categories];
    dispatch(setCategories(updated));
    setCategoryInput("");
  };

  const deleteCategoryItem = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    dispatch(setCategories(updatedCategories));
  };

  const updateCategoryItem = (id: string, newName: string) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, name: newName } : cat
    );
    dispatch(setCategories(updated));
  };

  const toggleCategoryItem = (id: string) => {
    const openedCategories = { ...openCategories, [id]: !openCategories[id] };
    setOpenCategories(openedCategories);
  };

  return (
    <div className={styles.container}>
      <ProgressBar progress={progress} label={currentCategory?.name} />
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
          onUpdate={(newName) => updateCategoryItem(categoryItem.id, newName)}
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
