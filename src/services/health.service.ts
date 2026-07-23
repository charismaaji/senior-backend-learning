import { pool } from "../db/postgres";

export async function checkReadiness() {
	await pool.query("SELECT 1");

	return {
		status: "ready" as const,
		dependencies: {
			postgres: "up" as const,
		},
	};
}
