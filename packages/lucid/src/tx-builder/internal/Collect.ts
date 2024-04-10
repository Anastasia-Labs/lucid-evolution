import { Effect } from "effect";
import { Data } from "@lucid-evolution/plutus";
import { utxoToCore } from "@lucid-evolution/utils";
import { Redeemer, ScriptType, UTxO } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { DatumOfError, EmptyList } from "../../Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "../utils.js";
import { paymentCredentialOf } from "@lucid-evolution/utils";
import { datumOf } from "../../lucid-evolution/utils.js";

export const collectFromUTxO = (
  config: TxBuilderConfig,
  utxos: UTxO[],
  redeemer?: Redeemer,
) => {
  const program = Effect.gen(function* ($) {
    if (utxos.length == 0)
      yield* $(
        new EmptyList({
          message:
            "You're trying to consume an empty list of utxos -> " +
            collectFromUTxO.name,
        }),
      );
    for (const utxo of utxos) {
      if (utxo.datumHash && !utxo.datum) {
        const data = yield* $(
          Effect.tryPromise({
            try: () => datumOf(config.lucidConfig.provider)(utxo),
            catch: (_e) => new DatumOfError(),
          }),
        );
        utxo.datum = Data.to(data);
      }
      const coreUtxo = utxoToCore(utxo);
      config.inputUTxOs?.push(utxo);
      const input =
        CML.SingleInputBuilder.from_transaction_unspent_output(coreUtxo);
      const credential = paymentCredentialOf(utxo.address);

      if (redeemer && credential.type == "Script") {
        const script = yield* $(
          Effect.fromNullable(config.scripts.get(credential.hash)),
        );
        // console.log("script", script);
        const inputResult = (script: { type: ScriptType; script: string }) => {
          switch (script.type) {
            case "Native":
              return input.native_script(
                CML.NativeScript.from_cbor_hex(script.script),
                CML.NativeScriptWitnessInfo.assume_signature_count(),
              );
            case "PlutusV1":
              return input.plutus_script(
                toPartial(toV1(script.script), redeemer),
                CML.RequiredSigners.new(),
                CML.PlutusData.from_cbor_hex(utxo.datum!),
              );
            case "PlutusV2": {
              const v2 = toV2(script.script);
              // console.log("after v2");
              const partial = toPartial(v2, redeemer);

              return input.plutus_script_inline_datum(
                partial,
                CML.RequiredSigners.new(),
              );
              // return input.plutus_script(
              //   toPartial(toV2(script.script), redeemer),
              //   CML.RequiredSigners.new(),
              //   CML.PlutusData.from_cbor_hex(utxo.datum!),
              // );
            }
          }
        };
        const r = inputResult(script);
        // console.log("test fail");
        config.txBuilder.add_input(r);
      } else {
        config.txBuilder.add_input(input.payment_key());
      }
    }
  });
  return program;
};
