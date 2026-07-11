import pino from "pino";

import { loggerConfig } from "../config";

const transport = loggerConfig.isPretty
	? pino.transport({
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "SYS:standard",
				ignore: "pid,hostname",
			},
		})
	: undefined;

export const logger = pino(
	{
		level: loggerConfig.level,

		base: {
			service: "todo-api",
		},

		redact: {
			paths: [
				"req.headers.authorization",
				"req.headers.cookie",
				"headers.authorization",
				"headers.cookie",
				"password",
				"*.password",
				"body.password",
				"token",
				"*.token",
				"accessToken",
				"refreshToken",
			],
			censor: "[REDACTED]",
		},
	},
	transport,
);
