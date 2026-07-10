import { client } from "../db/postgres";

export async function findAll() {
	const result = await client.query(`
		SELECT *
		FROM todos
		ORDER BY id
	`);

	return result.rows;
}

export async function create(title: string) {
	const result = await client.query(
		`
		INSERT INTO todos(title)
		VALUES($1)
		RETURNING *
	`,
		[title],
	);

	return result.rows[0];
}

export async function deleteById(id: number) {
	await client.query(
		`
		DELETE FROM todos
		WHERE id = $1
	`,
		[id],
	);
}
