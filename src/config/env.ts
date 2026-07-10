import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

	DB_HOST: z.string().min(1, "DB_HOST is required"),

	DB_PORT: z.coerce
		.number({
			error: "DB_PORT must be a number",
		})
		.int("DB_PORT must be an integer")
		.positive("DB_PORT must be greater than 0"),

	DB_USER: z.string().min(1, "DB_USER is required"),

	DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),

	DB_NAME: z.string().min(1, "DB_NAME is required"),

	PORT: z.coerce
		.number({
			error: "PORT must be a number",
		})
		.int("PORT must be an integer")
		.positive("PORT must be greater than 0")
		.default(3000),
});

function loadEnvironment() {
	const result = envSchema.safeParse(process.env);

	if (!result.success) {
		console.error("\n❌ Environment validation failed\n");

		for (const issue of result.error.issues) {
			const field = issue.path.join(".") || "environment";

			console.error(`- ${field}: ${issue.message}`);
		}

		console.error(
			"\nApplication startup aborted because the environment configuration is invalid.\n",
		);

		process.exit(1);
	}

	return result.data;
}

export const env = loadEnvironment();

export type Environment = z.infer<typeof envSchema>;
