import { z } from "zod";

const portNumber = (name: string) =>
	z.coerce
		.number({ error: `${name} must be a number` })
		.int(`${name} must be an integer`)
		.min(1, `${name} must be >= 1`)
		.max(65535, `${name} must be <= 65535`);

const durationMs = (name: string, min: number, max: number) =>
	z.coerce
		.number({ error: `${name} must be a number` })
		.int(`${name} must be an integer (milliseconds)`)
		.min(min, `${name} must be >= ${min}`)
		.max(max, `${name} must be <= ${max}`);

const envSchema = z
	.object({
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),

		LOG_LEVEL: z
			.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
			.default("info"),

		DB_HOST: z.string().min(1, "DB_HOST is required"),
		DB_PORT: portNumber("DB_PORT"),
		DB_USER: z.string().min(1, "DB_USER is required"),
		DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
		DB_NAME: z.string().min(1, "DB_NAME is required"),

		DB_POOL_MAX: z.coerce
			.number({ error: "DB_POOL_MAX must be a number" })
			.int("DB_POOL_MAX must be an integer")
			.min(1, "DB_POOL_MAX must be >= 1")
			.max(100, "DB_POOL_MAX must be <= 100")
			.default(10),

		DB_IDLE_TIMEOUT_MS: durationMs("DB_IDLE_TIMEOUT_MS", 0, 600_000).default(
			30_000,
		),

		DB_CONNECTION_TIMEOUT_MS: durationMs(
			"DB_CONNECTION_TIMEOUT_MS",
			100,
			60_000,
		).default(5_000),
		DB_QUERY_TIMEOUT_MS: durationMs("DB_QUERY_TIMEOUT_MS", 0, 600_000).default(
			6_000,
		),

		DB_STATEMENT_TIMEOUT_MS: durationMs(
			"DB_STATEMENT_TIMEOUT_MS",
			0,
			600_000,
		).default(5_000),

		PORT: portNumber("PORT").default(3000),
	})
	.superRefine((cfg, ctx) => {
		if (
			cfg.DB_STATEMENT_TIMEOUT_MS > 0 &&
			cfg.DB_QUERY_TIMEOUT_MS > 0 &&
			cfg.DB_QUERY_TIMEOUT_MS <= cfg.DB_STATEMENT_TIMEOUT_MS
		) {
			ctx.addIssue({
				code: "custom",
				path: ["DB_QUERY_TIMEOUT_MS"],
				message:
					"DB_QUERY_TIMEOUT_MS must be greater than DB_STATEMENT_TIMEOUT so the server cancels the query before the client gives up",
			});
		}
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
