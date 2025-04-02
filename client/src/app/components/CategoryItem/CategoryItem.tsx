import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import { FaRegTrashAlt, FaRegEdit, FaRegPlusSquare } from "react-icons/fa";
import styles from "./CategoryItem.module.css";
import { Category, SubCategory } from "@/types/categoryTypes";
import { OpenCategories } from "@/types/categoryTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import { setSubCategories } from "@/store/slices/categorySlice";

type CategoryItemProps = {
  category: Category;
  onDelete: () => void;
  onUpdate: () => void;
  onToggle?: () => void;
  openCategories?: OpenCategories;
  currentCategoryId: string | null;
  setCurrentCategoryId: (id: string) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onDelete,
  onUpdate,
  onToggle,
  openCategories,
  currentCategoryId,
  setCurrentCategoryId,
}) => {
  const [subCategoryVersion, setSubCategoryVersion] = useState<number>(1.1);
  const [openSubCategories, setOpenSubCategories] = useState<OpenCategories>(
    {}
  );
  const subCategories = useSelector(
    (state: RootState) => state.category.subCategories
  ) as SubCategory[];
  const dispatch = useDispatch();

  const handleToggle = () => {
    onToggle?.();
  };

  const addSubCategoryItem = () => {
    const newSubCategory = {
      name: `${category.name} ${subCategoryVersion.toFixed(1)}`,
      id: `${category.id}-sub-${uuidv4()}`,
      parentId: category.id,
      openCategories: true,
    };

    const updatedSubCategories = [...subCategories, newSubCategory];

    dispatch(
      setSubCategories({
        subCategories: updatedSubCategories,
        subStorageKey: `subCategories-${category.id}`,
      })
    );
    setSubCategoryVersion(subCategoryVersion + 0.1);
    (openCategories ?? {})[category.id] = true;
  };

  const deleteSubCategoryItem = (id: string) => {
    const updatedCategories = subCategories.filter(
      (subCategoryItem) => subCategoryItem.id !== id
    );
    const categoryObject = {
      subCategories: updatedCategories,
      subStorageKey: `subCategories-${category.id}`,
    };
    dispatch(setSubCategories(categoryObject));
  };

  const updateSubCategoryItem = (id: string) => {
    const updatedSubCategoryItems = subCategories.map((subCategoryItem) => {
      if (subCategoryItem.id === id) {
        const updatedItem = prompt(
          "Enter the new subCategory name",
          subCategoryItem.name
        );
        const newName =
          updatedItem !== null && updatedItem.trim() !== ""
            ? updatedItem
            : subCategoryItem.name;
        return { ...subCategoryItem, name: newName };
      }
      return { ...subCategoryItem };
    });

    dispatch(
      setSubCategories({
        subCategories: updatedSubCategoryItems,
        subStorageKey: `subCategories-${category.id}`,
      })
    );
  };

  const toggleSubCategory = (categoryId: string) => {
    setOpenSubCategories({
      ...openSubCategories,
      [categoryId]: !openSubCategories[categoryId],
    });
  };

  const openTaskList = () => {
    setCurrentCategoryId(category.id);
  };

  return (
    <div>
      <div className={styles.categoryContainer}>
        <div>
          <span onClick={() => handleToggle()}>
            {(openCategories ?? {})[category.id] ? "⯆" : "⯈"}
          </span>
          <span onClick={openTaskList}>{category.name}</span>
          <FaRegEdit onClick={onUpdate} />
        </div>
        <div className={styles.iconContainer}>
          <FaRegTrashAlt onClick={onDelete} />
          <FaRegPlusSquare onClick={() => addSubCategoryItem()} />
        </div>
      </div>
      {category.id === currentCategoryId && (
        <TaskList currentCategoryId={currentCategoryId} />
      )}
      {(openCategories ?? {})[category.id] && (
        <div>
          {subCategories
            .filter((subCategory) => subCategory.parentId === category.id)
            .map((subCategory) => (
              <div className={styles.subCategoryContainer} key={subCategory.id}>
                <CategoryItem
                  category={subCategory}
                  onDelete={() => deleteSubCategoryItem(subCategory.id)}
                  onUpdate={() => updateSubCategoryItem(subCategory.id)}
                  onToggle={() => toggleSubCategory(subCategory.id)}
                  openCategories={openSubCategories}
                  setCurrentCategoryId={setCurrentCategoryId}
                  currentCategoryId={currentCategoryId}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
