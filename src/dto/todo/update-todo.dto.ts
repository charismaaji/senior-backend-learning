import { z } from "zod";

import { createTodoSchema } from "./create-todo.dto";

export const updateTodoSchema = createTodoSchema
	.extend({
		completed: z.boolean({
			error: "Completed must be a boolean",
		}),
	})
	.partial()
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided",
	});

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
