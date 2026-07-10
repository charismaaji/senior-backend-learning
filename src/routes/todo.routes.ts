import { Router } from "express";

import * as todoController from "../controllers/todo.controller";
import { createTodoSchema, todoIdSchema } from "../dto/todo";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", todoController.findAll);

router.get("/:id", validate(todoIdSchema, "params"), todoController.findById);

router.post("/", validate(createTodoSchema, "body"), todoController.create);

router.delete(
	"/:id",
	validate(todoIdSchema, "params"),
	todoController.deleteById,
);

export default router;
