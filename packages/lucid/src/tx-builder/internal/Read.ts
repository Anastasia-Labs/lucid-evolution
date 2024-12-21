import { Effect, pipe } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { UTxO } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";

export const readError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Read : ${cause} }` });

export const readFrom = (config: TxBuilder.TxBuilderConfig, utxos: UTxO[]) =>
  Effect.gen(function* () {
    if (utxos.length === 0) yield* readError(ERROR_MESSAGE.EMPTY_UTXO);
    for (const { datumHash, datum, ...rest } of utxos) {
      // This UTXO value is intended solely for internal use.
      // When the UTXO contains a datumHash but no datum, the datum must be fetched and included.
      // This ensures the txBuilder can later add the datum into the Plutus data transaction witness field.
      // Additionally, when evaluating a transaction, the datum field must be removed if the datumHash has a value.
      const resolvedDatum =
        datumHash && !datum
          ? yield* pipe(
              Effect.promise(() =>
                config.lucidConfig.provider.getDatum(datumHash),
              ),
              Effect.map(Data.to),
            )
          : datum;

      const utxo: UTxO = { ...rest, datumHash, datum: resolvedDatum };

      const coreUtxo = utxoToCore(utxo);

      // An array of unspent transaction outputs to be used as inputs when running uplc eval.
      config.readInputs.push(utxo);
      config.txBuilder.add_reference_input(coreUtxo);
    }
  });
