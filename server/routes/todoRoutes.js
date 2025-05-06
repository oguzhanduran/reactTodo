const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { todoSchema } = require("../validations/todoValidation");
const validateRequest = require("../middlewares/validateRequest");

router.get("/", todoController.getTodos); //When a GET /api/todos is called, it goes to the getTodos controller.
router.post("/", validateRequest(todoSchema), todoController.addTodos); //"POST /api/todos requests are first validated with addTodoSchema, then the addTodos controller is executed."
router.patch("/", validateRequest(todoSchema), todoController.updateTodos);

module.exports = router;

// Presentation Layer:  It handles HTTP requests and routes them to the controller functions.
