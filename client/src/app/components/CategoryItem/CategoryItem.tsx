import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import { FaRegTrashAlt, FaRegEdit, FaRegPlusSquare } from "react-icons/fa";
import styles from "./CategoryItem.module.css";
import { Category, SubCategory } from "@/types/categoryTypes";
import { OpenCategories } from "@/types/categoryTypes";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import {
  setSubCategories,
  loadSubCategoriesFromStorage,
} from "@/store/slices/categorySlice";

import { fetchTodosAsync } from "@/store/services";
import Modal from "../Modal/Modal";

type CategoryItemProps = {
  category: Category;
  onDelete: () => void;
  onUpdate: (newName: string) => void;
  onToggle: () => void;
  openCategories: OpenCategories;
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
  const [openSubCategories, setOpenSubCategories] = useState<OpenCategories>(
    {}
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(category.name);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);

  const subCategories = useSelector(
    (state: RootState) => state.category.subCategories
  ) as SubCategory[];
  const dispatch = useDispatch<AppDispatch>();

  const openSubCategoryModal = () => {
    setIsSubCategoryModalOpen(true);
  };

  const handleSaveNewSubCategory = (name: string) => {
    const newSubCategory = {
      name,
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

    openCategories[category.id] = true;
    setIsSubCategoryModalOpen(false);
  };

  const handleToggle = (categoryId: string) => {
    onToggle();
    if (!openCategories[categoryId]) {
      const subCategoryId = `subCategories-${category.id}`;
      dispatch(loadSubCategoriesFromStorage({ subCategoryId: subCategoryId }));
    }
  };

  const handleSave = () => {
    if (newName.trim() === "") return;
    onUpdate(newName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(category.name);
    setIsEditing(false);
  };

  const deleteSubCategoryItem = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (!confirmDelete) return;

    const updatedCategories = subCategories.filter(
      (subCategoryItem) => subCategoryItem.id !== id
    );
    const categoryObject = {
      subCategories: updatedCategories,
      subStorageKey: `subCategories-${category.id}`,
    };
    dispatch(setSubCategories(categoryObject));
  };

  const updateSubCategoryItem = (id: string, newName: string) => {
    const updated = subCategories.map((item) =>
      item.id === id ? { ...item, name: newName } : item
    );

    dispatch(
      setSubCategories({
        subCategories: updated,
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
    const storageKey = `todos_${category.id}`;
    dispatch(fetchTodosAsync(storageKey));
  };

  return (
    <div>
      <div
        className={`${styles.categoryContainer} ${
          category.id === currentCategoryId ? styles.selectedCategory : ""
        }`}
      >
        <div>
          <span onClick={() => handleToggle(category.id)}>
            {openCategories[category.id] ? "⯆" : "⯈"}
          </span>
          {!isEditing && <span onClick={openTaskList}>{category.name}</span>}

          {isEditing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <FaRegEdit onClick={() => setIsEditing(true)} />
            </>
          )}
        </div>
        {!isEditing && (
          <div className={styles.iconContainer}>
            <FaRegTrashAlt onClick={onDelete} />
            <FaRegPlusSquare onClick={openSubCategoryModal} />
          </div>
        )}
      </div>
      {category.id === currentCategoryId && (
        <TaskList currentCategoryId={currentCategoryId} />
      )}
      {openCategories[category.id] && (
        <div>
          {subCategories
            .filter((subCategory) => subCategory.parentId === category.id)
            .map((subCategory) => (
              <div className={styles.subCategoryContainer} key={subCategory.id}>
                <CategoryItem
                  category={subCategory}
                  onDelete={() => deleteSubCategoryItem(subCategory.id)}
                  onUpdate={(newName) =>
                    updateSubCategoryItem(subCategory.id, newName)
                  }
                  onToggle={() => toggleSubCategory(subCategory.id)}
                  openCategories={openSubCategories}
                  setCurrentCategoryId={setCurrentCategoryId}
                  currentCategoryId={currentCategoryId}
                />
              </div>
            ))}
        </div>
      )}
      <Modal
        isOpen={isSubCategoryModalOpen}
        onClose={() => setIsSubCategoryModalOpen(false)}
        onSave={handleSaveNewSubCategory}
        title="Add New SubCategory"
        placeholder="Enter SubCategory Name"
      />
    </div>
  );
};

export default CategoryItem;
