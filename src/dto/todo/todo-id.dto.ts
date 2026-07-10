import { z } from "zod";

export const todoIdSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export type TodoIdDto = z.infer<typeof todoIdSchema>;
