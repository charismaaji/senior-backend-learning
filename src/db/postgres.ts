import { Client } from "pg";
import { databaseConfig } from "../config";

export const client = new Client(databaseConfig);
