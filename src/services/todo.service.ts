import type { CreateTodoDto } from "../dto/todo/create-todo.dto";
import { AppError } from "../errors/app-error";
import * as todoRepository from "../repositories/todo.repository";

import * as dto from "../dto";

export async function findAll({ page, limit }: dto.PaginationQueryDto) {
	const offset = (page - 1) * limit;

	const [todos, totalItems] = await Promise.all([
		todoRepository.findAll({
			limit,
			offset,
		}),
		todoRepository.countAll(),
	]);

	const totalPages = Math.ceil(totalItems / limit);

	return {
		data: todos,
		pagination: {
			page,
			limit,
			totalItems,
			totalPages,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
		},
	};
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
