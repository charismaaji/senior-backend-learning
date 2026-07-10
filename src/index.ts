import express from "express";
import todoRoutes from "./routes/todo.routes";
import { client } from "./db/postgres";
import { errorMiddleware } from "./middlewares";
import { appConfig } from "./config";

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (_, res) => {
	res.json({
		message: "Hello from Docker Compose",
	});
});

app.use(errorMiddleware);

await client.connect();
console.log("✅ Connected to PostgreSQL");

app.listen(appConfig.port, () => {
	console.log(
		`🚀 Server running at http://localhost:${appConfig.port} from Docker`,
	);
});
