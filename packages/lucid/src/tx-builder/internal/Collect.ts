import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { Redeemer, RedeemerBuilder, UTxO } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "./TxUtils.js";
import { paymentCredentialOf } from "@lucid-evolution/utils";
import { datumOf } from "../../lucid-evolution/utils.js";

export const collectError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Collect: ${cause} }` });

export const collectFromUTxO =
  (
    config: TxBuilder.TxBuilderConfig,
    utxos: UTxO[],
    collectInputs: Boolean = true,
  ) =>
  (redeemer?: Redeemer): Effect.Effect<void, TxBuilderError> =>
    Effect.gen(function* ($) {
      if (utxos.length === 0) yield* $(collectError(ERROR_MESSAGE.EMPTY_UTXO));
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
        // To prevent same utxos being insert twice, the ones whose redeemers need to be built
        if (collectInputs) config.collectedInputs.push(utxo);
        //TODO: Add config.collectedAssets
        const input =
          CML.SingleInputBuilder.from_transaction_unspent_output(coreUtxo);
        const credential = paymentCredentialOf(utxo.address);

        if (credential.type == "Script") {
          const script = yield* $(
            Effect.fromNullable(config.scripts.get(credential.hash)),
            Effect.orElseFail(() =>
              collectError(
                collectError(ERROR_MESSAGE.MISSING_SCRIPT(credential.hash)),
              ),
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
                utxo.datum && utxo.datumHash
                  ? input.plutus_script(
                      partial,
                      CML.Ed25519KeyHashList.new(),
                      CML.PlutusData.from_cbor_hex(utxo.datum),
                    )
                  : input.plutus_script_inline_datum(
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

/* "collectFrom" for RedeemerBuilder needs similar utxo validations as done for Redeemer.
  These should happen before coin selection; so the effect this function returns is added
  to the "programs".
*/
export const collectFromUTxOPartial = (
  config: TxBuilder.TxBuilderConfig,
  utxos: UTxO[],
  redeemerBuilder: RedeemerBuilder,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* ($) {
    if (utxos.length === 0) yield* collectError(ERROR_MESSAGE.EMPTY_UTXO);
    if (redeemerBuilder.kind === "self") redeemerBuilder.inputs = utxos;
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
      // An array of unspent transaction outputs to be used as inputs when running uplc eval.
      config.collectedInputs.push(utxo);
      //TODO: Add config.collectedAssets
    }
    // NOTE: If RedeemerBuilder is of kind "self" the partial program will be incorrect
    // however it won't matter as it won't be used if that's the case. But we still need
    // that RedeemerBuilder in partialPrograms to construct it later during "complete"
    const partialProgram = collectFromUTxO(config, utxos, false);
    config.partialPrograms.set(redeemerBuilder, partialProgram);
  });
