import { defineConfig } from "tsup";
import { wasmLoader } from "esbuild-plugin-wasm";

export default defineConfig({
  esbuildPlugins: [wasmLoader()],
  format: ["esm"],
  dts: true,
  clean: true,
});
