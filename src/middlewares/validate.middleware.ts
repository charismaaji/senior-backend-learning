import type { RequestHandler } from "express";
import type { ZodType } from "zod";

import { AppError } from "../errors/app-error";
import type { ValidationTarget } from "../models";

export function validate(
	schema: ZodType,
	target: ValidationTarget,
): RequestHandler {
	return (req, _res, next) => {
		const result = schema.safeParse(req[target]);

		if (!result.success) {
			next(
				new AppError(
					"Request validation failed",
					400,
					"VALIDATION_ERROR",
					result.error.issues,
				),
			);

			return;
		}

		if (target === "body") {
			req.body = result.data;
		}

		next();
	};
}
