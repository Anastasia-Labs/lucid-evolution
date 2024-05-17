import { defineConfig } from "tsup";
import { wasmLoader } from "esbuild-plugin-wasm";
import copy from "esbuild-copy-files-plugin";
import brode from "@geut/esbuild-plugin-brode";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import realpath from "esbuild-plugin-realpath";

export default defineConfig([
  {
    entry: ["src/node/uplc_tx.js"],
    format: ["cjs"],
    dts: true,
    clean: true,
    platform: "node",
    outDir: "dist/node",
    esbuildPlugins: [
      copy({
        source: "./src/node/uplc_tx_bg.wasm",
        target: "./dist/node",
        copyWithFolder: true,
      }),
      wasmLoader(),
    ],
  },
  {
    entry: ["src/browser/uplc_tx.js"],
    format: ["esm"],
    dts: true,
    clean: true,
    platform: "browser",
    outDir: "dist/browser",
    esbuildPlugins: [
      wasmLoader(),
      polyfillNode({
        polyfills: {
          fs: true,
        },
      }),
      // copy({
      //   source: "./src/browser/uplc_tx_bg.wasm",
      //   target: "./dist/browser",
      //   copyWithFolder: true,
      // }),
    ],
  },
]);
