import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

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
      include: ["app/**/*"],
      exclude: ["app/*.{ts,tsx}", "app/lib/**", "app/types/**"],
    },
  },
});
