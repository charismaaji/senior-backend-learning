import { pool } from "../db/postgres";
import type { UpdateTodoDto } from "../dto";
import type { CreateTodoDto } from "../dto/todo/create-todo.dto";
import type { Todo } from "../models/todo";

type FindAllTodosOptions = {
	limit: number;
	offset: number;
};

export async function create(dto: CreateTodoDto): Promise<Todo> {
	const result = await pool.query<Todo>(
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

export async function findAll({ limit, offset }: FindAllTodosOptions) {
	const result = await pool.query<Todo>(
		`
			SELECT
				id,
				title,
				description,
				completed
			FROM todos
			ORDER BY id ASC
			LIMIT $1
			OFFSET $2
		`,
		[limit, offset],
	);

	return result.rows;
}

export async function countAll(): Promise<number> {
	const result = await pool.query<{ count: string }>(
		`
			SELECT COUNT(*) AS count
			FROM todos
		`,
	);

	const count = result.rows[0]?.count;

	if (count === undefined) {
		throw new Error("Failed to count todos");
	}

	return Number(count);
}

export async function findById(id: number): Promise<Todo | null> {
	const result = await pool.query<Todo>(
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

export async function updateById(
	id: number,
	input: UpdateTodoDto,
): Promise<Todo | null> {
	const result = await pool.query<Todo>(
		`
			UPDATE todos
			SET
				title = COALESCE($1, title),
				description = COALESCE($2, description),
				completed = COALESCE($3, completed)
			WHERE id = $4
			RETURNING
				id,
				title,
				description,
				completed
		`,
		[input.title ?? null, input.description ?? null, input.completed ?? null, id],
	);

	return result.rows[0] ?? null;
}

export async function deleteById(id: number): Promise<boolean> {
	const result = await pool.query(
		`
			DELETE FROM todos
			WHERE id = $1
		`,
		[id],
	);

	return result.rowCount === 1;
}
