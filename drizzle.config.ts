import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./app/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: Drizzle
		url: process.env.DATABASE_URL!,
	},
});
