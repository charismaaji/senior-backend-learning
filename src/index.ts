import express from "express";
import todoRoutes from "./routes/todo.routes";
import { client } from "./db/postgres";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

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

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT} from Docker`);
});
