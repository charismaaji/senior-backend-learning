import type { CreateTodoDto } from "../dto/todo/create-todo.dto";
import { AppError } from "../errors/app-error";
import * as todoRepository from "../repositories/todo.repository";

export async function findAll() {
	return todoRepository.findAll();
}

export async function findById(id: number) {
	const todo = await todoRepository.findById(id);

	if (!todo) {
		throw new AppError("Todo not found", 404, "TODO_NOT_FOUND");
	}

	return {
		id: todo.id,
		title: todo.title,
		description: todo.description,
		completed: todo.completed,
	};
}

export async function create(dto: CreateTodoDto) {
	return todoRepository.create(dto);
}

export async function deleteById(id: number): Promise<void> {
	const deleted = await todoRepository.deleteById(id);

	if (!deleted) {
		throw new AppError("Todo not found", 404, "TODO_NOT_FOUND");
	}
}
