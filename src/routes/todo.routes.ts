import { Router } from "express";
import * as todoController from "../controllers/todo.controller";

const router = Router();

router.get("/", todoController.findAll);

router.post("/", todoController.create);

router.delete("/:id", todoController.deleteById);

export default router;
