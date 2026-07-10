import { env } from "./env";

export const databaseConfig = {
	host: env.DB_HOST!,
	port: env.DB_PORT,
	user: env.DB_USER!,
	password: env.DB_PASSWORD!,
	database: env.DB_NAME!,
};
