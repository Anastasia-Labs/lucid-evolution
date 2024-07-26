import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { Redeemer, UTxO } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "./TxUtils.js";
import { paymentCredentialOf } from "@lucid-evolution/utils";
import { datumOf } from "../../lucid-evolution/utils.js";

export const collectError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Collect: ${cause} }` });

export const collectFromUTxO = (
  config: TxBuilder.TxBuilderConfig,
  utxos: UTxO[],
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* ($) {
    if (utxos.length === 0) yield* collectError(ERROR_MESSAGE.EMPTY_UTXO);
    for (const utxo of utxos) {
      if (utxo.datumHash && !utxo.datum) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => datumOf(config.lucidConfig.provider, utxo),
            catch: (cause) => collectError({ cause }),
          }),
        );
        utxo.datum = Data.to(data);
      }
      const coreUtxo = utxoToCore(utxo);

      // An array of unspent transaction outputs to be used as inputs when running uplc eval.
      config.collectedInputs.push(utxo);
      //TODO: Add config.collectedAssets
      const input =
        CML.SingleInputBuilder.from_transaction_unspent_output(coreUtxo);
      const credential = paymentCredentialOf(utxo.address);

      if (credential.type == "Script") {
        const script = yield* $(
          Effect.fromNullable(config.scripts.get(credential.hash)),
          Effect.orElseFail(() =>
            collectError(ERROR_MESSAGE.MISSING_SCRIPT(credential.hash)),
          ),
        );
        switch (script.type) {
          case "Native":
            config.txBuilder.add_input(
              input.native_script(
                CML.NativeScript.from_cbor_hex(script.script),
                CML.NativeScriptWitnessInfo.assume_signature_count(),
              ),
            );
            break;
          case "PlutusV1": {
            const red = yield* $(
              Effect.fromNullable(redeemer),
              Effect.orElseFail(() =>
                collectError(ERROR_MESSAGE.MISSING_REDEEMER),
              ),
            );
            config.txBuilder.add_input(
              input.plutus_script(
                toPartial(toV1(script.script), red),
                CML.Ed25519KeyHashList.new(),
                CML.PlutusData.from_cbor_hex(utxo.datum!),
              ),
            );
            break;
          }
          case "PlutusV2": {
            const v2 = toV2(script.script);
            const red = yield* $(
              Effect.fromNullable(redeemer),
              Effect.orElseFail(() =>
                collectError(ERROR_MESSAGE.MISSING_REDEEMER),
              ),
            );
            const partial = toPartial(v2, red);
            config.txBuilder.add_input(
              //TODO: Test with DatumHash
              input.plutus_script_inline_datum(
                partial,
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }
        }
      } else {
        config.txBuilder.add_input(input.payment_key());
      }
    }
  });
