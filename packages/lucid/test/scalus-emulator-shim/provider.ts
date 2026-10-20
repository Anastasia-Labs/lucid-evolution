// Lucid's provider package, with ScalusEmulator in place of its Emulator.
// vite-node hoists named exports above every `export *` and defines star
// exports in order, the last one winning; so the override is a star export
// too, and comes last.
export * from "@lucid-evolution/provider";
// @ts-ignore TS2308: the override is the point.
export * from "./emulator.js";
