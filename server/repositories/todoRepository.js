const { v4: uuidv4 } = require("uuid");

// Initial Data
let todosByCategory = {
  category_1: [
    { id: uuidv4(), name: "firstTodo", completed: false },
    { id: uuidv4(), name: "secondTodo", completed: false },
  ],
  category_2: [{ id: uuidv4(), name: "thirdTodo", completed: false }],
};

// Data operations
async function fetchTodosByCategory(storageKey) {
  return todosByCategory[storageKey] || [];
}

async function addTodos(storageKey, todos) {
  todosByCategory[storageKey] = todos;
  return todos;
}

async function updateTodos(storageKey, todos) {
  const currentTodos = todosByCategory[storageKey] || [];
  const updatedTodos = currentTodos.map(
    (todo) => todos.find((updatedTodo) => updatedTodo.id === todo.id) || todo
  );
  todosByCategory[storageKey] = updatedTodos;
  return updatedTodos;
}

module.exports = {
  fetchTodosByCategory,
  addTodos,
  updateTodos,
};

//todoReporsitory.js -> data layer -> It will manage todosByCategory data and todo data will be stored here.
