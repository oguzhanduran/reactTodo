import todoRepository from "../repositories/todoRepository.js";

const getTodosByCategory = async (storageKey) => {
  try {
    return await todoRepository.fetchTodosByCategory(storageKey);
  } catch (error) {
    throw new Error("An error occurred while retrieving todo data");
  }
};

const addTodos = async (storageKey, todos) => {
  try {
    return await todoRepository.addTodos(storageKey, todos);
  } catch (error) {
    throw new Error("An error occurred while adding todo data");
  }
};

const updateTodos = async (storageKey, todos) => {
  try {
    return await todoRepository.updateTodos(storageKey, todos);
  } catch (error) {
    throw new Error("An error occurred while updating todo data");
  }
};

export default {
  updateTodos,
  addTodos,
  getTodosByCategory,
};

// Sevice Layer (Business Logic Layer) It is the bridge between the Controller and the Repository (Data Access).
// Error target: To communicate low-level or technical errors that arise in the business logic layer to higher layers (such as the controller) in a meaningful way.
