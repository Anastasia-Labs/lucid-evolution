import { defineConfig } from "tsup";
import { wasmLoader } from "esbuild-plugin-wasm";
import copy from "esbuild-copy-files-plugin";
import brode from "@geut/esbuild-plugin-brode";

export default defineConfig([
  {
    entry: ["src/uplc_tx.js"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    platform: "node",
    outDir: "dist/node",
    esbuildPlugins: [
      wasmLoader(),
      copy({
        source: "./src/uplc_tx_bg.wasm",
        target: "./dist/node",
        copyWithFolder: true,
      }),
    ],
  },
  {
    entry: ["src/uplc_tx.js"],
    format: ["esm"],
    dts: true,
    clean: true,
    platform: "browser",
    outDir: "dist/browser",
    esbuildPlugins: [
      wasmLoader(),
      brode(),
      copy({
        source: "./src/uplc_tx_bg.wasm",
        target: "./dist/browser",
        copyWithFolder: true,
      }),
    ],
  },
]);
