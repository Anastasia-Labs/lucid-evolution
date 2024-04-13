import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { UTxO } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { datumOf } from "../../lucid-evolution/utils.js";
import {
  DatumError,
  EmptyUTXOArrayError,
  makeEmptyUTXOArrayError,
} from "../../Errors.js";

export const readFrom = (
  config: TxBuilderConfig,
  utxos: UTxO[],
): Effect.Effect<void, DatumError | EmptyUTXOArrayError> => {
  const program = Effect.gen(function* ($) {
    if (utxos.length === 0) yield* $(makeEmptyUTXOArrayError());
    for (const utxo of utxos) {
      if (utxo.datumHash) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => datumOf(config.lucidConfig.provider)(utxo),
            catch: (e) => new DatumError({ message: String(e) }),
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
