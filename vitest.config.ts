import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    coverage: {
      exclude: [
        ".next/**",
        "src/app/**",
        "next.config.ts",
        "vitest.config.ts",
      ],
      provider: "v8",
      reporter: ["text", "html"],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
