import { env } from "./env";

export const appConfig = {
	port: env.PORT,
	environment: env.NODE_ENV,
	isDevelopment: env.NODE_ENV === "development",
	isProduction: env.NODE_ENV === "production",
	isTest: env.NODE_ENV === "test",
};
