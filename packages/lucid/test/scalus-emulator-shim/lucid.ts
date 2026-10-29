// Lucid's entry point, with ScalusEmulator in place of its Emulator and a
// Lucid factory that evaluates with the emulator's own evaluator. The
// overrides come last, as in provider.ts.
export * from "../../src/index.js";
// @ts-ignore TS2308: the overrides are the point.
export * from "./lucid-overrides.js";
