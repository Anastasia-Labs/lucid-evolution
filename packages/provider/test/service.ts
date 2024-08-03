import { Config, Effect } from "effect";
import { Emulator, generateEmulatorAccount, Kupmios } from "../src/index.js";

export const kupmios = await Effect.gen(function* () {
  const kupo = yield* Config.string("VITE_KUPO_KEY");
  const ogmios = yield* Config.string("VITE_OGMIOS_KEY");
  return new Kupmios(kupo, ogmios);
}).pipe(Effect.runPromise);

export const EMULATOR_ACCOUNT = generateEmulatorAccount({
  lovelace: 80000000000n,
});

export const emulator = await Effect.gen(function* () {
  return new Emulator([EMULATOR_ACCOUNT]);
}).pipe(Effect.runPromise);
