import type { Request, Response } from "express";

import * as dto from "../dto";
import * as todoService from "../services/todo.service";

type UpdateTodoRequest = Request<{ id: string }, unknown, dto.UpdateTodoDto>;

export async function findAll(req: Request, res: Response): Promise<void> {
	const { page, limit } = req.query as unknown as dto.PaginationQueryDto;

	const result = await todoService.findAll({
		page,
		limit,
	});

	res.json(result);
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
	req: Request<Record<string, never>, unknown, dto.CreateTodoDto>,
	res: Response,
): Promise<void> {
	const todo = await todoService.create(req.body);

	res.status(201).json(todo);
}

export async function updateById(
	req: UpdateTodoRequest,
	res: Response,
): Promise<void> {
	const id = Number(req.params.id);

	const todo = await todoService.updateById(id, req.body);

	res.json(todo);
}

export async function deleteById(
	req: Request<{ id: string }>,
	res: Response,
): Promise<void> {
	const id = Number(req.params.id);

	await todoService.deleteById(id);

	res.sendStatus(204);
}
