import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		!process.env.VITEST && reactRouter(),
		tailwindcss(),
		tsconfigPaths(),
	],
	test: {
		globals: true,
		environment: "happy-dom",
		include: ["app/**/*.test.{ts,tsx}"],
		setupFiles: ["./vitest.setup.ts"],

		coverage: {
			include: ["app/**/*.{ts,tsx}"],
			exclude: [
				"app/*.{css,ts,tsx}",
				"app/db/**",
				"app/types/**",
				"app/locales/**",
			],
		},
	},
});
