import { z } from "zod";

export const createTodoSchema = z
	.object({
		title: z
			.string({
				error: "Title must be a string",
			})
			.trim()
			.min(1, "Title is required")
			.max(100, "Title must not exceed 100 characters"),

		description: z
			.string({
				error: "Description must be a string",
			})
			.trim()
			.min(1, "Description is required")
			.max(1000, "Description must not exceed 1000 characters"),
	})
	.strict();

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
