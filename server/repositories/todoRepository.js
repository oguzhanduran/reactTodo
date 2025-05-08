import { v4 as uuidv4 } from "uuid";

// Initial Data
let todosByCategory = {
  category_1: [
    { id: uuidv4(), name: "firstTodo", completed: false },
    { id: uuidv4(), name: "secondTodo", completed: false },
  ],
  category_2: [{ id: uuidv4(), name: "thirdTodo", completed: false }],
};

// Data operations
const fetchTodosByCategory = async (storageKey) => {
  return todosByCategory[storageKey] || [];
};

const addTodos = async (storageKey, todos) => {
  todosByCategory[storageKey] = todos;
  return todos;
};

const updateTodos = (storageKey, todos) => {
  const currentTodos = todosByCategory[storageKey] || [];
  const updatedTodos = currentTodos.map(
    (todo) => todos.find((updatedTodo) => updatedTodo.id === todo.id) || todo
  );
  todosByCategory[storageKey] = updatedTodos;
  return updatedTodos;
};

export default {
  fetchTodosByCategory,
  addTodos,
  updateTodos,
};

//todoReporsitory.js -> data layer -> It will manage todosByCategory data and todo data will be stored here.
