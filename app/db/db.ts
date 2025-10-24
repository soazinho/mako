import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

// biome-ignore lint/style/noNonNullAssertion: Drizzle
export const db = drizzle({ connection: process.env.DATABASE_URL!, schema });
