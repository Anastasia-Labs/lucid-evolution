import { defineConfig } from "tsup";
import { wasmLoader } from "esbuild-plugin-wasm";

export default defineConfig({
  esbuildPlugins: [wasmLoader()],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
});
