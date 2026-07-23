import { Router } from "express";

import * as todoController from "../controllers/todo.controller";
import * as dto from "../dto";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.get(
	"/",
	validate(dto.paginationQuerySchema, "query"),
	todoController.findAll,
);

router.get(
	"/:id",
	validate(dto.todoIdSchema, "params"),
	todoController.findById,
);

router.post("/", validate(dto.createTodoSchema, "body"), todoController.create);

router.delete(
	"/:id",
	validate(dto.todoIdSchema, "params"),
	todoController.deleteById,
);

export default router;
