const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json()); // middleware to parse JSON body

// Example structure of todosByCategory
let todosByCategory = {
  category_1: [
    { id: uuidv4(), name: "firstTodo", completed: false },
    { id: uuidv4(), name: "secondTodo", completed: false },
  ],
  category_2: [{ id: uuidv4(), name: "thirdTodo", completed: false }],
};

app.get("/api/todos", (req, res) => {
  const { storageKey } = req.query;
  const todos = todosByCategory[storageKey] || [];
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { storageKey, todos } = req.body;
  todosByCategory[storageKey] = todos;

  return res.json(todos);
});

app.patch("/api/todos", (req, res) => {
  const { storageKey, todos } = req.body;
  const currentTodos = todosByCategory[storageKey] || [];
  const updatedTodos = currentTodos.map(
    (todo) => todos.find((updatedTodo) => updatedTodo.id === todo.id) || todo
  );

  todosByCategory[storageKey] = updatedTodos;
  return res.json(updatedTodos);
});

// To run application
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
