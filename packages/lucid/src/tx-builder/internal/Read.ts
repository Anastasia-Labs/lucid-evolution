import { Effect, pipe } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { UTxO } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { datumOf } from "../../lucid-evolution/utils.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";

export const readError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Read : ${cause} }` });

export const readFrom = (
  config: TxBuilder.TxBuilderConfig,
  utxos: UTxO[],
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    if (utxos.length === 0) yield* readError(ERROR_MESSAGE.EMPTY_UTXO);
    for (const utxo of utxos) {
      if (utxo.datumHash) {
        const data = yield* Effect.tryPromise({
          try: () => datumOf(config.lucidConfig.provider, utxo),
          catch: (cause) => readError(cause),
        });

        utxo.datum = Data.to(data);
      }
      const coreUtxo = utxoToCore(utxo);
      // An array of unspent transaction outputs to be used as inputs when running uplc eval.
      config.readInputs.push(utxo);
      config.txBuilder.add_reference_input(coreUtxo);
    }
  });
