import type { Request } from "express";

export type ValidatedRequest<
	TBody = unknown,
	TParams = unknown,
	TQuery = unknown,
> = Request & {
	validated: {
		body?: TBody;
		params?: TParams;
		query?: TQuery;
	};
};
