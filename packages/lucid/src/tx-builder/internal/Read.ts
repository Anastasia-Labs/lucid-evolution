import { Effect } from "effect";
import { utxoToCore } from "@evolution-sdk/utils";
import { UTxO } from "@evolution-sdk/core-types";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import { resolveDatum } from "./TxUtils.js";
import { TxConfig } from "./Service.js";

export const readError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Read : ${cause} }` });

export const readFrom = (utxos: UTxO[]) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    if (utxos.length === 0) yield* readError(ERROR_MESSAGE.EMPTY_UTXO);
    for (const utxo of utxos) {
      // fetch the datum when the datumHash is present
      const resolvedDatum = yield* resolveDatum(
        utxo.datumHash,
        utxo.datum,
        config.lucidConfig.provider,
      );

      const coreUtxo = utxoToCore({ ...utxo, datum: resolvedDatum });
      const exists = config.readInputs.some(
        (input) =>
          input.txHash === utxo.txHash &&
          input.outputIndex === utxo.outputIndex,
      );

      if (!exists) {
        config.txBuilder.add_reference_input(coreUtxo);
        // Store inputs for later use in the txBuilder
        config.readInputs.push(utxo);
      }
    }
  });
