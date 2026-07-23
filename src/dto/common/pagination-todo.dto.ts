import { z } from "zod";

export const paginationQuerySchema = z.object({
	page: z.coerce
		.number()
		.int("page must be an integer")
		.min(1, "page must be greater than or equal to 1")
		.default(1),

	limit: z.coerce
		.number()
		.int("limit must be an integer")
		.min(1, "limit must be greater than or equal to 1")
		.max(100, "limit must be less than or equal to 100")
		.default(20),
});

export type PaginationQueryDto = z.infer<typeof paginationQuerySchema>;
