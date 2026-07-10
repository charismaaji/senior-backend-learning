import { client } from "../db/postgres";
import type { CreateTodoDto } from "../dto/todo/create-todo.dto";
import type { Todo, TodoListItem } from "../models/todo";

export async function findAll(): Promise<TodoListItem[]> {
	const result = await client.query<TodoListItem>(`
		SELECT
			id,
			title,
			completed
		FROM todos
		ORDER BY id
	`);

	return result.rows;
}

export async function findById(id: number): Promise<Todo | null> {
	const result = await client.query<Todo>(
		`
			SELECT
				id,
				title,
				description,
				completed
			FROM todos
			WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
}

export async function create(dto: CreateTodoDto): Promise<Todo> {
	const result = await client.query<Todo>(
		`
			INSERT INTO todos (
				title,
				description
			)
			VALUES ($1, $2)
			RETURNING
				id,
				title,
				description,
				completed
		`,
		[dto.title, dto.description],
	);

	const todo = result.rows[0];

	if (!todo) {
		throw new Error("Failed to create Todo");
	}

	return todo;
}

export async function deleteById(id: number): Promise<boolean> {
	const result = await client.query(
		`
			DELETE FROM todos
			WHERE id = $1
		`,
		[id],
	);

	return result.rowCount === 1;
}
