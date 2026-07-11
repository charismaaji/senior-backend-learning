import { randomUUID } from "node:crypto";

import pinoHttp from "pino-http";

import { logger } from "../utils/logger";

export const httpLogger = pinoHttp({
	logger,

	genReqId(req, res) {
		const incomingRequestId = req.headers["x-request-id"];

		const requestId =
			typeof incomingRequestId === "string" && incomingRequestId.trim() !== ""
				? incomingRequestId
				: randomUUID();

		res.setHeader("x-request-id", requestId);

		return requestId;
	},

	customLogLevel(_req, res, err) {
		if (err || res.statusCode >= 500) {
			return "error";
		}

		if (res.statusCode >= 400) {
			return "warn";
		}

		return "info";
	},

	customSuccessMessage(req, res) {
		return `${req.method} ${req.url} completed with ${res.statusCode}`;
	},

	customErrorMessage(req, res) {
		return `${req.method} ${req.url} failed with ${res.statusCode}`;
	},

	quietReqLogger: true,
});
