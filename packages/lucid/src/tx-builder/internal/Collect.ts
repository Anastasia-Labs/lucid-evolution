import { Effect, pipe } from "effect";
import { Data } from "@evolution-sdk/plutus";
import { utxoToCore } from "@evolution-sdk/utils";
import { Redeemer, RedeemerBuilder, UTxO } from "@evolution-sdk/core-types";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { resolveDatum, toPartial, toV1, toV2, toV3 } from "./TxUtils.js";
import { paymentCredentialOf } from "@evolution-sdk/utils";
import { datumOf } from "../../evolution-sdk/utils.js";
import { TxConfig } from "./Service.js";

export const collectError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Collect: ${cause} }` });

export const collectFromUTxO =
  (utxos: UTxO[], collectInputs: Boolean = true) =>
  (redeemer?: Redeemer) =>
    Effect.gen(function* () {
      const { config } = yield* TxConfig;
      if (utxos.length === 0) yield* collectError(ERROR_MESSAGE.EMPTY_UTXO);
      for (const utxo of utxos) {
        // fetch the datum when the datumHash is present
        const resolvedDatum = yield* resolveDatum(
          utxo.datumHash,
          utxo.datum,
          config.lucidConfig.provider,
        );
        utxo.datum = resolvedDatum;
        // Skip adding UTxO to collectedInputs when building redeemers to prevent duplicate inputs
        // Store inputs for later use in the txBuilder
        if (collectInputs) config.collectedInputs.push(utxo);
        //TODO: Add config.collectedAssets
        const input = CML.SingleInputBuilder.from_transaction_unspent_output(
          utxoToCore({ ...utxo, datum: resolvedDatum }),
        );
        const credential = paymentCredentialOf(utxo.address);

        if (credential.type == "Script") {
          const script = yield* pipe(
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
              const red = yield* pipe(
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
              const red = yield* pipe(
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
            case "PlutusV3": {
              const v3 = toV3(script.script);
              const red = yield* pipe(
                Effect.fromNullable(redeemer),
                Effect.orElseFail(() =>
                  collectError(ERROR_MESSAGE.MISSING_REDEEMER),
                ),
              );
              const partial = toPartial(v3, red);
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
  utxos: UTxO[],
  redeemerBuilder: RedeemerBuilder,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    if (utxos.length === 0) yield* collectError(ERROR_MESSAGE.EMPTY_UTXO);
    if (redeemerBuilder.kind === "self") redeemerBuilder.inputs = utxos;
    for (const utxo of utxos) {
      if (utxo.datumHash && !utxo.datum) {
        const data = yield* Effect.tryPromise({
          try: () => datumOf(config.lucidConfig.provider, utxo),
          catch: (cause) => collectError({ cause }),
        });
        utxo.datum = Data.to(data);
      }
      // An array of unspent transaction outputs to be used as inputs when running uplc eval.
      config.collectedInputs.push(utxo);
      //TODO: Add config.collectedAssets
    }
    // NOTE: If RedeemerBuilder is of kind "self" the partial program will be incorrect
    // however it won't matter as it won't be used if that's the case. But we still need
    // that RedeemerBuilder in partialPrograms to construct it later during "complete"
    const partialProgram = collectFromUTxO(utxos, false);
    config.partialPrograms.set(redeemerBuilder, partialProgram);
  });
