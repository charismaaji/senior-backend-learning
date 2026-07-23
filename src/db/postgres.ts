// import { Client } from "pg";
// import { databaseConfig } from "../config";
// import { logger } from "../utils/logger";

// export const client = new Client(databaseConfig);

// client.on("error", (error) => {
// 	logger.error(
// 		{
// 			err: error,
// 		},
// 		"Unexpected PostgreSQL client error",
// 	);
// });

import { Pool } from "pg";

import { databaseConfig } from "../config";
import { logger } from "../utils/logger";

export const pool = new Pool({
	...databaseConfig,
	max: 10,
	idleTimeoutMillis: 30_000,
	connectionTimeoutMillis: 5_000,
});

pool.on("error", (error) => {
	logger.error(
		{
			err: error,
		},
		"Unexpected PostgreSQL pool error",
	);
});
