import { defineConfig } from "vitest/config";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [wasm()],
  test: {
    reporters: "verbose",
    include: ["./test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
