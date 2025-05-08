import Joi from "joi";

const todoItemSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).required(),
  completed: Joi.boolean().required(),
  description: Joi.string().allow("").optional(),
});

export const todoSchema = Joi.object({
  storageKey: Joi.string().required(),
  todos: Joi.array().items(todoItemSchema).required(),
});
