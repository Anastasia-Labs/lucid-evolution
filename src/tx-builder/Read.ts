import { Effect } from "effect";
import { Data, UTxO, utxoToCore } from "../mod.js";
import { Config } from "./types.js";
import { makeTx } from "./MakeTx.js";
import { DatumOfError } from "./Errors.js";

export const readFrom = (config: Config) => (utxos: UTxO[]) => {
  const program: Effect.Effect<void, DatumOfError> = Effect.gen(function* ($) {
    for (const utxo of utxos) {
      if (utxo.datumHash) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => config.lucid.datumOf(utxo),
            catch: (_e) => new DatumOfError(),
          })
        );
        utxo.datum = Data.to(data);
      }
      const coreUtxo = utxoToCore(utxo);
      config.txBuilder.add_reference_input(coreUtxo);
    }
  });
  config.programs.push(program);
  return makeTx(config);
};
