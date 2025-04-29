import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "@/store/store";
import { SubCategory, Todo } from "@/types/categoryTypes";
import { setTodosAsync, updateTodosAsync } from "@/store/services";
import { setProgress } from "@/store/slices/categorySlice";
import EditTodoForm from "../EditTodoForm/EditTodoForm";
import { setIsEditingTodo } from "@/store/slices/categorySlice";
import { useRouter } from "next/navigation";

type TaskListProp = {
  currentCategoryId: string;
};

const TaskList: React.FC<TaskListProp> = ({ currentCategoryId }) => {
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [showDone, setShowDone] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.category.todos);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);

  const currentCategory = useSelector((state: RootState) =>
    state.category.categories.find((cat) => cat.id === currentCategoryId)
  );

  const subCategories = useSelector(
    (state: RootState) => state.category.subCategories
  ) as SubCategory[];

  const currentSubCategoryName = subCategories.find(
    (sub) => sub.id === currentCategoryId
  )?.name;

  useEffect(() => {
    const calculateProgress = (todos: Todo[]) => {
      const totalTasks = todos.length;
      const completedTasks = todos.filter((todo) => todo.completed).length;

      if (totalTasks === 0) return 100;

      return Math.floor((completedTasks / totalTasks) * 100);
    };

    const progress = calculateProgress(todos);
    const progressInfo = { progress, currentSubCategoryName };
    dispatch(setProgress(progressInfo));
  }, [todos, subCategories, dispatch, currentCategoryId]);

  useEffect(() => {
    const currentTodo = todos.find((t) => t.id === editTodoId);

    const params = new URLSearchParams(searchParams);

    params.set(
      "category",
      currentCategory?.name || currentSubCategoryName || ""
    );

    searchInputValue
      ? params.set("filter", searchInputValue)
      : params.delete("filter");

    currentTodo ? params.set("todo", currentTodo.name) : params.delete("todo");

    router.push(`?${params.toString()}`);
  }, [currentCategoryId, searchInputValue, editTodoId]);

  const handleChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const addTodo = () => {
    if (textInputValue.trim() !== "") {
      const updatedTodos = [
        { name: textInputValue, id: uuidv4(), completed: false },
        ...(todos ?? []),
      ];
      dispatch(
        setTodosAsync({
          todos: updatedTodos,
          storageKey: `todos_${currentCategoryId}`,
        })
      );
    }
    setTextInputValue("");
  };

  const toggleComplete = (id: string) => {
    const toggleTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    dispatch(
      updateTodosAsync({
        todos: toggleTodos,
        storageKey: `todos_${currentCategoryId}`,
      })
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

  const startEditing = (todo: Todo) => {
    dispatch(setIsEditingTodo(true));
    setEditTodoId(todo.id);
  };

  const cancelEditing = () => {
    dispatch(setIsEditingTodo(false));
    setEditTodoId(null);
    setShowDone(false);
  };

  const saveChanges = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );

    dispatch(
      updateTodosAsync({
        todos: updatedTodos,
        storageKey: `todos_${currentCategoryId}`,
      })
    );

    cancelEditing();
  };

  return (
    <div className={styles.taskListContainer}>
      {editTodoId ? (
        <EditTodoForm
          todo={todos.find((t) => t.id === editTodoId)!}
          onSave={saveChanges}
          onCancel={cancelEditing}
        />
      ) : (
        <div>
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
              <FaRegEdit onClick={() => startEditing(todo)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
