import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app-error";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			success: false,
			error: {
				code: err.code,
				message: err.message,
				details: err.details,
			},
		});

		return;
	}

	console.error(err);

	res.status(500).json({
		success: false,
		error: {
			code: "INTERNAL_SERVER_ERROR",
			message: "Internal Server Error",
		},
	});
};
