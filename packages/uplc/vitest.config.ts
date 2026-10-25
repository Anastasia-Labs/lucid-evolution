import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: "verbose",
    include: ["./test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    bail: 1,
    // recover-from-trap.test.ts collects garbage to run finalizers.
    pool: "forks",
    poolOptions: { forks: { execArgv: ["--expose-gc"] } },
  },
});
