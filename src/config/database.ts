import type { PoolConfig } from "pg";
import { env } from "./env";

export const databaseConfig = {
	host: env.DB_HOST,
	port: env.DB_PORT,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,

	max: env.DB_POOL_MAX,
	idleTimeoutMillis: env.DB_IDLE_TIMEOUT_MS,
	connectionTimeoutMillis: env.DB_CONNECTION_TIMEOUT_MS,
	query_timeout: env.DB_QUERY_TIMEOUT_MS,
	statement_timeout: env.DB_STATEMENT_TIMEOUT_MS,
	application_name: `todo-api:${env.NODE_ENV}`,

	allowExitOnIdle: env.NODE_ENV === "test",
} satisfies PoolConfig;
