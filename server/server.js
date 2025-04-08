const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json()); // middleware to parse JSON body

let todosByCategory = {};

app.get("/api/todos", (req, res) => {
  const { storageKey } = req.query;
  const todos = todosByCategory[storageKey] || [];
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { storageKey, todos } = req.body;
  todosByCategory[storageKey] = todos;

  return res.send(todos);
});

app.put("/api/todos", (req, res) => {
  const { storageKey, todos } = req.body;
  todosByCategory[storageKey] = todos;

  return res.send(todos);
});

// To run application
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
