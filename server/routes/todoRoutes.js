import express from "express";
import todoController from "../controllers/todoController.js";
import { todoSchema } from "../validations/todoValidation.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/", todoController.getTodos); //When a GET /api/todos is called, it goes to the getTodos controller.
router.post("/", validateRequest(todoSchema), todoController.addTodos); //"POST /api/todos requests are first validated with addTodoSchema, then the addTodos controller is executed."
router.patch("/", validateRequest(todoSchema), todoController.updateTodos);

export default router;

// Presentation Layer:  It handles HTTP requests and routes them to the controller functions.
