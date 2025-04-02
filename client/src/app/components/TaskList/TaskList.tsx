import React from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "./TaskList.module.css";

const EditIcon: React.FC = FaRegEdit as unknown as React.FC;

const TaskList = ({ currentCategoryId }) => {
  return (
    <div className={styles.taskListContainer}>
      <input type="checkbox" />
      <span>Show done</span>
      <input className={styles.searchInput} type="text" placeholder="Search" />
      <button className={styles.clearInputButton}>X</button>
      <input type="text" placeholder="Text input with button" />
      <button>Add</button>
      <div className={styles.todoItemContainer}>
        <div className={styles.checkboxAndName}>
          <input type="checkbox" />
          <span>TodoName</span>
        </div>
        <EditIcon />
      </div>
    </div>
  );
};

export default TaskList;
