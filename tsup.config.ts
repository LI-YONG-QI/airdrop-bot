import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  clean: true,
  format: ["cjs"],
  platform: "node",
  tsconfig: "./tsconfig.json",
});
