import express from "express";
import todoRoutes from "./routes/todo.routes";
import { client } from "./db/postgres";
import { errorMiddleware } from "./middlewares";
import { appConfig } from "./config";
import { logger } from "./utils/logger";
import { httpLogger } from "./middlewares/http-logger.middleware";

const app = express();

app.use(httpLogger);

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (_, res) => {
	res.json({
		message: "Hello from Docker Compose",
	});
});

app.use(errorMiddleware);

await client.connect();

logger.info("Connected to PostgreSQL");

app.listen(appConfig.port, () => {
	logger.info(
		{
			port: appConfig.port,
			environment: appConfig.environment,
		},
		"Server started",
	);
});
