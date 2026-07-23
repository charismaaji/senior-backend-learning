import type { Request, Response } from "express";

import * as healthService from "../services/health.service";

export function live(_req: Request, res: Response): void {
	res.status(200).json({
		status: "ok",
	});
}

export async function ready(_req: Request, res: Response): Promise<void> {
	try {
		const health = await healthService.checkReadiness();

		res.status(200).json(health);
	} catch {
		res.status(503).json({
			status: "not_ready",
			dependencies: {
				postgres: "down",
			},
		});
	}
}
