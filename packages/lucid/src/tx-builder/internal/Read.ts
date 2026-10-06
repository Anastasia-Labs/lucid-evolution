import { Effect } from "effect";
import { utxoToCore } from "@lucid-evolution/utils";
import { withCMLScope } from "@lucid-evolution/core-utils";
import { UTxO } from "@lucid-evolution/core-types";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import { resolveDatum } from "./TxUtils.js";
import { TxConfig } from "./Service.js";
import { outRefKey } from "./RedeemerContext.js";

export const readError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Read : ${cause} }` });

export const readFrom = (utxos: UTxO[]) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    if (utxos.length === 0) yield* readError(ERROR_MESSAGE.EMPTY_UTXO);
    const read = new Set(config.readInputs.map(outRefKey));
    for (const utxo of utxos) {
      // fetch the datum when the datumHash is present
      const resolvedDatum = yield* resolveDatum(
        utxo.datumHash,
        utxo.datum,
        config.lucidConfig.provider,
      );

      if (!read.has(outRefKey(utxo))) {
        withCMLScope((own) =>
          config.txBuilder.add_reference_input(
            own(utxoToCore({ ...utxo, datum: resolvedDatum })),
          ),
        );
        // Store inputs for later use in the txBuilder
        config.readInputs.push(utxo);
        read.add(outRefKey(utxo));
      }
    }
  });
