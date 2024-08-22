import { defineConfig } from "vitest/config";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  // @ts-ignore
  plugins: [wasm()],
  test: {
    pool: "forks",
    reporters: "verbose",
    include: ["./test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    testTimeout: 300_000,
    bail: 2,
  },
});
