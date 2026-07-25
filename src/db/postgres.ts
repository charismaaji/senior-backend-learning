import { Pool } from "pg";

import { databaseConfig } from "../config";
import { logger } from "../utils/logger";

export const pool = new Pool(databaseConfig);

pool.on("error", (error) => {
	logger.error(
		{
			err: error,
			pool: {
				totalCount: pool.totalCount,
				idleCount: pool.idleCount,
				waitingCount: pool.waitingCount,
			},
		},
		"Unexpected PostgreSQL pool error",
	);
});
