import { env } from "./env";

export const loggerConfig = {
	level: env.LOG_LEVEL,
	isPretty: env.NODE_ENV === "development",
};
