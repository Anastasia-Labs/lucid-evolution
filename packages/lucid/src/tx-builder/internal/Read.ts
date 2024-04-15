import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { UTxO } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { datumOf } from "../../lucid-evolution/utils.js";
import {
  ERROR_MESSAGE,
  TxBuilderError,
  TxBuilderErrorCause,
} from "../../Errors.js";

export const readError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Read", message });

export const readFrom = (
  config: TxBuilderConfig,
  utxos: UTxO[],
): Effect.Effect<void, TxBuilderError> => {
  const program = Effect.gen(function* ($) {
    if (utxos.length === 0)
      yield* $(readError("EmptyUTXO", ERROR_MESSAGE.EMPTY_UTXO));
    for (const utxo of utxos) {
      if (utxo.datumHash) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => datumOf(config.lucidConfig.provider)(utxo),
            catch: (error) => readError("Datum", String(error)),
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
