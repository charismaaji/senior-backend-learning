import { type Request, type Response } from "express";
import * as todoService from "../services/todo.service";

export async function findAll(_: Request, res: Response) {
	const result = await todoService.findAll();
	res.json(result);
	// throw new Error("Belajar Error Handling");
}

export async function create(req: Request, res: Response) {
	const result = await todoService.create(req.body.title);

	res.status(201).json(result);
}

export async function deleteById(req: Request, res: Response) {
	await todoService.deleteById(Number(req.params.id));

	res.sendStatus(204);
}
