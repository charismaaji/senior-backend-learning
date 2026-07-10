import { type NextFunction, type Request, type Response } from "express";

export function errorMiddleware(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.error(err);

	res.status(500).json({
		message: "Internal Server Error",
	});
}
