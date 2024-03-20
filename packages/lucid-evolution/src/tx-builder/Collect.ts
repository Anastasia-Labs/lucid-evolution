import { Effect } from "effect";
import { Data } from "@anastasia-labs/plutus";
import { utxoToCore } from "@anastasia-labs/utils";
import { Redeemer, ScriptType, UTxO } from "@anastasia-labs/core-types";
import { TxBuilderConfig } from "./types.js";
import { DatumOfError } from "./Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "./utils.js";
import { paymentCredentialOf } from "@anastasia-labs/utils";
import { datumOf } from "../lucid-evolution/utils.js";

export const collectFromUTxO = (
  config: TxBuilderConfig,
  utxos: UTxO[],
  redeemer?: Redeemer,
) => {
  const program = Effect.gen(function* ($) {
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
      const input =
        CML.SingleInputBuilder.from_transaction_unspent_output(coreUtxo);
      const credential = paymentCredentialOf(utxo.address);

      if (redeemer && credential.type == "Script") {
        const script = yield* $(
          Effect.fromNullable(config.scripts.get(credential.hash)),
        );
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
            case "PlutusV2":
              return input.plutus_script(
                toPartial(toV2(script.script), redeemer),
                CML.RequiredSigners.new(),
                CML.PlutusData.from_cbor_hex(utxo.datum!),
              );
          }
        };
        config.txBuilder.add_input(inputResult(script));
      } else {
        config.txBuilder.add_input(input.payment_key());
      }
    }
  });
  return program;
};
