import express from "express";
import todoRoutes from "./routes/todo.routes";
import healthRoutes from "./routes/health.routes";
import { pool } from "./db/postgres";
import { errorMiddleware } from "./middlewares";
import { appConfig } from "./config";
import { logger } from "./utils/logger";
import { httpLogger } from "./middlewares/http-logger.middleware";

const app = express();

app.use(httpLogger);

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/todos", todoRoutes);

app.get("/", (_, res) => {
	res.json({
		message: "Hello from Docker Compose",
	});
});

app.use(errorMiddleware);

await pool.query("SELECT 1");

logger.info("Connected to PostgreSQL");

const server = app.listen(appConfig.port, () => {
	logger.info(
		{
			port: appConfig.port,
			environment: appConfig.environment,
		},
		"Server started",
	);
});

let isShuttingDown = false;

async function shutdown(signal: string): Promise<void> {
	if (isShuttingDown) {
		return;
	}

	isShuttingDown = true;

	logger.info(
		{
			signal,
		},
		"Graceful shutdown started",
	);

	server.close(async (serverError) => {
		if (serverError) {
			logger.error(
				{
					err: serverError,
				},
				"Failed to close HTTP server",
			);

			process.exitCode = 1;
			return;
		}

		logger.info("HTTP server closed");

		try {
			await pool.end();

			logger.info("PostgreSQL connection closed");

			process.exitCode = 0;
		} catch (error) {
			logger.error(
				{
					err: error,
				},
				"Failed to close PostgreSQL connection",
			);

			process.exitCode = 1;
		}
	});
}

process.on("SIGTERM", () => {
	void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
	void shutdown("SIGINT");
});
