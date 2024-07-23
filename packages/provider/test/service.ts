import { Config, Effect } from "effect";
import { Kupmios } from "../src/index.js";

export const kupmios = await Effect.gen(function* () {
  const kupo = yield* Config.string("VITE_KUPO_KEY");
  const ogmios = yield* Config.string("VITE_OGMIOS_KEY");
  return new Kupmios(kupo, ogmios);
}).pipe(Effect.runPromise);
