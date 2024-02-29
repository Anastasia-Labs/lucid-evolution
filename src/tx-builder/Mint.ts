import { Effect } from "effect";
import { Assets, Redeemer } from "../mod.js";
import { Config } from "./types.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "./utils.js";
import { MintError } from "./Errors.js";
import { makeTx } from "./MakeTx.js";
import { NoSuchElementException } from "effect/Cause";

/**
 * All assets should be of the same policy id.
 * You can chain mintAssets functions together if you need to mint assets with different policy ids.
 * If the plutus script doesn't need a redeemer, you still need to specifiy the void redeemer.
 */
export const mintAssets =
  (config: Config) => (assets: Assets, redeemer?: Redeemer) => {
    const program: Effect.Effect<void, MintError | NoSuchElementException> =
      Effect.gen(function* ($) {
        const units = Object.keys(assets);
        const policyId = units[0].slice(0, 56);
        const mintAssets = CML.MapAssetNameToNonZeroInt64.new();
        for (const unit of units) {
          if (unit.slice(0, 56) !== policyId) {
            yield* $(new MintError());
          }
          mintAssets.insert(
            CML.AssetName.from_str(unit.slice(56)),
            assets[unit]
          );
        }
        const mintBuilder = CML.SingleMintBuilder.new(mintAssets);
        const policy = yield* $(
          Effect.fromNullable(config.scripts.get(policyId))
        );
        switch (policy.type) {
          case "Native":
            config.txBuilder.add_mint(
              mintBuilder.native_script(
                CML.NativeScript.from_cbor_hex(policy.script),
                CML.NativeScriptWitnessInfo.assume_signature_count()
              )
            );
            break;

          case "PlutusV1": {
            const red = yield* $(Effect.fromNullable(redeemer));
            config.txBuilder.add_mint(
              mintBuilder.plutus_script(
                toPartial(toV1(policy.script), red),
                CML.RequiredSigners.new()
              )
            );
            break;
          }
          case "PlutusV2": {
            const red = yield* $(Effect.fromNullable(redeemer));
            config.txBuilder.add_mint(
              mintBuilder.plutus_script(
                toPartial(toV2(policy.script), red),
                CML.RequiredSigners.new()
              )
            );
            break;
          }
        }
      });
    config.programs.push(program);
    return makeTx(config);
  };
