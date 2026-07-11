import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app-error";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
	if (err instanceof AppError) {
		req.log.warn(
			{
				err,
				code: err.code,
				statusCode: err.statusCode,
			},
			"Operational error",
		);

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

	req.log.error(
		{
			err,
		},
		"Unhandled application error",
	);

	res.status(500).json({
		success: false,
		error: {
			code: "INTERNAL_SERVER_ERROR",
			message: "Internal Server Error",
		},
	});
};
