import React from "react";
import TaskList from "../TaskList/TaskList";
import { FaRegTrashAlt, FaRegEdit, FaRegPlusSquare } from "react-icons/fa";
import styles from "./CategoryItem.module.css";

const TrashIcon: React.FC = FaRegTrashAlt as unknown as React.FC;
const EditIcon: React.FC = FaRegEdit as unknown as React.FC;
const PlusIcon: React.FC = FaRegPlusSquare as unknown as React.FC;

const CategoryItem = () => {
  return (
    <div>
      <div className={styles.categoryContainer}>
        <div>
          <span>⯈</span>
          <span>Category</span>
          <EditIcon />
        </div>
        <div className={styles.iconContainer}>
          <TrashIcon />
          <PlusIcon />
        </div>
      </div>
      <TaskList />
      <div className={styles.subCategoryContainer}>SubCategory</div>
    </div>
  );
};

export default CategoryItem;
