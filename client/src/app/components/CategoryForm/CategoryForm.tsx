"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryForm.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCategories, fetchCategories } from "@/store/slices/categorySlice";
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

  useEffect(() => {
    dispatch(fetchCategories());
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

    const updated = [...categories, newCategory];
    dispatch(setCategories(updated));
    setCategoryInput("");
  };

  const deleteCategoryItem = (id: string) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    dispatch(setCategories(updatedCategories));
  };

  const askForNewName = (oldName: string): string | null => {
    const input = prompt("Enter the new category name", oldName);
    if (!input || input.trim() === "") return null;
    return input.trim();
  };

  const updateCategoryItem = (id: string) => {
    const categoryToUpdate = categories.find((cat) => cat.id === id);
    if (!categoryToUpdate) return;

    const newName = askForNewName(categoryToUpdate.name);
    if (!newName) return;

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
