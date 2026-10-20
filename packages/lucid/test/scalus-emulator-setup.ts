// Setup of vitest.scalus-emulator.config.ts. It throws, and so fails every
// test file, when an alias of the config misses and a test would run on
// Lucid's own Emulator or Lucid factory.
import { ScalusEmulator } from "@lucid-evolution/scalus-uplc/emulator";
import { Emulator as ProviderEmulator } from "@lucid-evolution/provider";
import { Emulator, Lucid } from "../src/index.js";
import { Emulator as ProviderTestEmulator } from "../../provider/test/scalus-emulator-check.js";
import { Lucid as ShimLucid } from "./scalus-emulator-shim/lucid-overrides.js";

for (const [path, Shimmed] of Object.entries({
  "@lucid-evolution/provider": ProviderEmulator,
  "../src/index.js": Emulator,
  "../src/index.js, from packages/provider/test": ProviderTestEmulator,
}))
  if (!(new Shimmed([]) instanceof ScalusEmulator))
    throw new Error(`The Emulator of ${path} is not ScalusEmulator.`);
if (Lucid !== ShimLucid)
  throw new Error("The Lucid of ../src/index.js is not the shim's Lucid.");
