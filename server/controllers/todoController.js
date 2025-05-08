import todoService from "../services/todoService.js";

const getTodos = async (req, res) => {
  const { storageKey } = req.query;
  try {
    const todos = await todoService.getTodosByCategory(storageKey);
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred on the server" });
  }
};

const addTodos = async (req, res) => {
  const { storageKey, todos } = req.body;
  try {
    const updatedTodos = await todoService.addTodos(storageKey, todos);
    res.json(updatedTodos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred on the server" });
  }
};

const updateTodos = async (req, res) => {
  const { storageKey, todos } = req.body;
  try {
    const updatedTodos = await todoService.updateTodos(storageKey, todos);
    res.json(updatedTodos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred on the server" });
  }
};

export default {
  updateTodos,
  addTodos,
  getTodos,
};

// Controller Layer: It is the bridge between the Presentation Layer (routes) and the Business Logic Layer (services).
// status(500): 500: Indicates that there is an unexpected error or issue on the server side.
// Error Target: In the main 'HTTP API' section of the application, terminating the error by sending the code and message to the user or front-end
