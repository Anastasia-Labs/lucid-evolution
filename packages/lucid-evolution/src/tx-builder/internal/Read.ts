import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { UTxO } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { DatumOfError } from "../../Errors.js";
import { datumOf } from "../../lucid-evolution/utils.js";

export const readFrom = (config: TxBuilderConfig, utxos: UTxO[]) => {
  const program: Effect.Effect<void, DatumOfError> = Effect.gen(function* ($) {
    for (const utxo of utxos) {
      if (utxo.datumHash) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => datumOf(config.lucidConfig.provider)(utxo),
            catch: (_e) => new DatumOfError(),
          }),
        );
        utxo.datum = Data.to(data);
      }
      const coreUtxo = utxoToCore(utxo);
      config.txBuilder.add_reference_input(coreUtxo);
    }
  });
  return program;
};
