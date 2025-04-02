import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/store/store";
import { setTodos } from "@/store/slices/categorySlice";
import { Todo } from "@/types/categoryTypes";

type TaskListProp = {
  currentCategoryId: string;
};

const TaskList: React.FC<TaskListProp> = ({ currentCategoryId }) => {
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [showDone, setShowDone] = useState<boolean>(false);
  const todos = useSelector((state: RootState) => state.category.todos);
  const dispatch = useDispatch();

  const handleChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const addTodo = () => {
    if (textInputValue.trim() !== "") {
      const updatedTodos = [
        ...(todos ?? []),
        { name: textInputValue, id: uuidv4(), completed: false },
      ];
      dispatch(
        setTodos({
          todos: updatedTodos,
          storageKey: `todos_${currentCategoryId}`,
        })
      );
    }
    setTextInputValue("");
  };

  const updateTodoItem = (id: string) => {
    const updatedTodoItem = todos.map((todoItem) => {
      if (todoItem.id === id) {
        const updatedItem = prompt("Enter a new todo name", todoItem.name);
        const newName =
          updatedItem !== null && updatedItem.trim() !== ""
            ? updatedItem
            : todoItem.name;

        return { ...todoItem, name: newName };
      }
      return todoItem;
    });

    dispatch(
      setTodos({
        todos: updatedTodoItem,
        storageKey: `todos_${currentCategoryId}`,
      })
    );
  };

  const toggleComplete = (id: string) => {
    const toggleTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    dispatch(
      setTodos({ todos: toggleTodos, storageKey: `todos_${currentCategoryId}` })
    );
  };

  const filterTodos = (todos: Todo[]) => {
    const filteredTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(searchInputValue.toLowerCase())
    );

    return filteredTodos;
  };

  const filterTodosShowDone = (todos: Todo[]) => {
    return showDone ? todos : todos?.filter((todo) => !todo.completed);
  };

  const clearInput = () => setSearchInputValue("");

  return (
    <div className={styles.taskListContainer}>
      <input type="checkbox" onChange={() => setShowDone(!showDone)} />
      <span>Show done</span>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        value={searchInputValue}
        onChange={handleChangeSearchInput}
      />
      <button onClick={clearInput} className={styles.clearInputButton}>
        X
      </button>
      <input
        type="text"
        placeholder="Add todo"
        value={textInputValue}
        onChange={handleChangeTextInput}
      />
      <button onClick={addTodo}>Add</button>
      {(searchInputValue
        ? filterTodos(filterTodosShowDone(todos))
        : filterTodosShowDone(todos)
      ).map((todo) => (
        <div className={styles.todoItemContainer} key={todo.id}>
          <div className={styles.checkboxAndName}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.name}</span>
          </div>
          <FaRegEdit onClick={() => updateTodoItem(todo.id)} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
