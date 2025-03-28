import React from "react";
import TaskList from "../TaskList/TaskList";
import { FaRegTrashAlt, FaRegEdit, FaRegPlusSquare } from "react-icons/fa";
import styles from "./CategoryItem.module.css";
import { Category } from "@/types/categoryTypes";

type CategoryItemProps = {
  category: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({category}) => {
 console.log('category', category?.name)

  return (
    <div>
      <div className={styles.categoryContainer}>
        <div>
          <span>⯈</span>
          <span>{category.name}</span>
          <FaRegEdit />
        </div>
        <div className={styles.iconContainer}>
          <FaRegTrashAlt />
          <FaRegPlusSquare />
        </div>
      </div>
      <TaskList />
      <div className={styles.subCategoryContainer}>SubCategory</div>
    </div>
  );
};

export default CategoryItem;
