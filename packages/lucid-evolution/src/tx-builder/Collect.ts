import { Effect } from "effect";
import { Data, Redeemer, ScriptType, UTxO, utxoToCore } from "../mod.js";
import { Config } from "./types.js";
import { DatumOfError } from "./Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { makeTx } from "./MakeTx.js";
import { toPartial, toV1, toV2 } from "./utils.js";

export const collectFrom =
  (config: Config) => (utxos: UTxO[], redeemer?: Redeemer) => {
    const program = Effect.gen(function* ($) {
      for (const utxo of utxos) {
        if (utxo.datumHash && !utxo.datum) {
          const data = yield* $(
            Effect.tryPromise({
              try: () => config.lucid.datumOf(utxo),
              catch: (_e) => new DatumOfError(),
            }),
          );
          utxo.datum = Data.to(data);
        }
        const coreUtxo = utxoToCore(utxo);
        const input =
          CML.SingleInputBuilder.from_transaction_unspent_output(coreUtxo);
        const credential = config.lucid.utils.paymentCredentialOf(utxo.address);

        if (redeemer && credential.type == "Script") {
          const script = yield* $(
            Effect.fromNullable(config.scripts.get(credential.hash)),
          );
          const inputResult = (script: {
            type: ScriptType;
            script: string;
          }) => {
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
    config.programs.push(program);
    return makeTx(config);
  };
