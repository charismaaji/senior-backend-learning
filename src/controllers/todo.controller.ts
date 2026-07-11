import type { Request, Response } from "express";

import type { CreateTodoDto } from "../dto/todo/create-todo.dto";
import * as todoService from "../services/todo.service";

export async function findAll(_req: Request, res: Response): Promise<void> {
	const todos = await todoService.findAll();

	res.json(todos);
}

export async function findById(
	req: Request<{ id: string }>,
	res: Response,
): Promise<void> {
	const id = Number(req.params.id);

	req.log.debug(
		{
			todoId: id,
		},
		"Finding Todo by ID",
	);

	const todo = await todoService.findById(id);

	req.log.info(
		{
			todoId: id,
		},
		"Todo retrieved",
	);

	res.json(todo);
}

export async function create(
	req: Request<Record<string, never>, unknown, CreateTodoDto>,
	res: Response,
): Promise<void> {
	const todo = await todoService.create(req.body);

	res.status(201).json(todo);
}

export async function deleteById(
	req: Request<{ id: string }>,
	res: Response,
): Promise<void> {
	const id = Number(req.params.id);

	await todoService.deleteById(id);

	res.sendStatus(204);
}
