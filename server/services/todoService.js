const todoRepository = require("../repositories/todoRepository");

async function getTodosByCategory(storageKey) {
  try {
    return await todoRepository.fetchTodosByCategory(storageKey);
  } catch (error) {
    throw new Error("An error occurred while retrieving todo data");
  }
}

async function addTodos(storageKey, todos) {
  try {
    return await todoRepository.addTodos(storageKey, todos);
  } catch (error) {
    throw new Error("An error occurred while adding todo data");
  }
}

async function updateTodos(storageKey, todos) {
  try {
    return await todoRepository.updateTodos(storageKey, todos);
  } catch (error) {
    throw new Error("An error occurred while updating todo data");
  }
}

module.exports = {
  getTodosByCategory,
  addTodos,
  updateTodos,
};

// Sevice Layer (Business Logic Layer) It is the bridge between the Controller and the Repository (Data Access).
// Error target: To communicate low-level or technical errors that arise in the business logic layer to higher layers (such as the controller) in a meaningful way.
