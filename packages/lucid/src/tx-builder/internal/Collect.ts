import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { Redeemer, UTxO } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import {
  ERROR_MESSAGE,
  TxBuilderError,
  TxBuilderErrorCause,
} from "../../Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "./TxUtils.js";
import { paymentCredentialOf } from "@lucid-evolution/utils";
import { datumOf } from "../../lucid-evolution/utils.js";

export const collectError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Collect", message });

export const collectFromUTxO = (
  config: TxBuilderConfig,
  utxos: UTxO[],
  redeemer?: Redeemer
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* ($) {
    if (utxos.length === 0)
      yield* $(collectError("EmptyUTXO", ERROR_MESSAGE.EMPTY_UTXO));
    for (const utxo of utxos) {
      if (utxo.datumHash && !utxo.datum) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => datumOf(config.lucidConfig.provider)(utxo),
            catch: (error) => collectError("Datum", String(error)),
          })
        );
        utxo.datum = Data.to(data);
      }
      const coreUtxo = utxoToCore(utxo);
      config.inputUTxOs?.push(utxo);
      const input =
        CML.SingleInputBuilder.from_transaction_unspent_output(coreUtxo);
      const credential = paymentCredentialOf(utxo.address);

      if (credential.type == "Script") {
        const script = yield* $(
          Effect.fromNullable(config.scripts.get(credential.hash)),
          Effect.orElseFail(() =>
            collectError(
              "MissingScript",
              `No script found, script hash: ${credential.hash}, consider using attach modules`
            )
          )
        );
        switch (script.type) {
          case "Native":
            config.txBuilder.add_input(
              input.native_script(
                CML.NativeScript.from_cbor_hex(script.script),
                CML.NativeScriptWitnessInfo.assume_signature_count()
              )
            );
          case "PlutusV1": {
            const red = yield* $(
              Effect.fromNullable(redeemer),
              Effect.orElseFail(() =>
                collectError("MissingRedeemer", ERROR_MESSAGE.MISSIG_REDEEMER)
              )
            );
            config.txBuilder.add_input(
              input.plutus_script(
                toPartial(toV1(script.script), red),
                CML.RequiredSigners.new(),
                CML.PlutusData.from_cbor_hex(utxo.datum!)
              )
            );
          }
          case "PlutusV2": {
            const v2 = toV2(script.script);
            const red = yield* $(
              Effect.fromNullable(redeemer),
              Effect.orElseFail(() =>
                collectError("MissingRedeemer", ERROR_MESSAGE.MISSIG_REDEEMER)
              )
            );
            const partial = toPartial(v2, red);
            config.txBuilder.add_input(
              //TODO: Test with DatumHash
              input.plutus_script_inline_datum(
                partial,
                CML.RequiredSigners.new()
              )
            );
          }
        }
      } else {
        config.txBuilder.add_input(input.payment_key());
      }
    }
  });
