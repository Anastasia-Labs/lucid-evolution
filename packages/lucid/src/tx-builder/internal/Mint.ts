import { Effect } from "effect";
import { toText } from "@lucid-evolution/core-utils";
import { Assets, Redeemer } from "@lucid-evolution/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2 } from "./Utils.js";
import {
  ERROR_MESSAGE,
  TxBuilderError,
  TxBuilderErrorCause,
} from "../../Errors.js";
import { TxBuilderConfig } from "../types.js";

export const mintError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Mint", message });

/**
 * All assets should be of the same policy id.
 * You can chain mintAssets functions together if you need to mint assets with different policy ids.
 * If the plutus script doesn't need a redeemer, you still need to specifiy the void redeemer.
 */
export const mintAssets = (
  config: TxBuilderConfig,
  assets: Assets,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> => {
  const program = Effect.gen(function* ($) {
    const units = Object.keys(assets);
    const policyId = units[0].slice(0, 56);
    const mintAssets = CML.MapAssetNameToNonZeroInt64.new();
    for (const unit of units) {
      if (unit.slice(0, 56) !== policyId) {
        yield* $(
          mintError("MultiplePolicies", ERROR_MESSAGE.MULTIPLE_POLICIES),
        );
      }
      mintAssets.insert(
        //NOTE: toText is used to maintain API compatibility
        CML.AssetName.from_str(toText(unit.slice(56))),
        assets[unit],
      );
    }
    const mintBuilder = CML.SingleMintBuilder.new(mintAssets);
    const policy = yield* $(
      Effect.fromNullable(config.scripts.get(policyId)),
      Effect.orElseFail(() =>
        mintError("MissingPolicy", `No policy found, policy id: ${policyId}`),
      ),
    );
    switch (policy.type) {
      case "Native":
        config.txBuilder.add_mint(
          mintBuilder.native_script(
            CML.NativeScript.from_cbor_hex(policy.script),
            CML.NativeScriptWitnessInfo.assume_signature_count(),
          ),
        );
        break;

      case "PlutusV1": {
        const red = yield* $(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            mintError("MissingRedeemer", ERROR_MESSAGE.MISSIG_REDEEMER),
          ),
        );
        config.txBuilder.add_mint(
          mintBuilder.plutus_script(
            toPartial(toV1(policy.script), red),
            CML.RequiredSigners.new(),
          ),
        );
        break;
      }
      case "PlutusV2": {
        const red = yield* $(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            mintError("MissingRedeemer", ERROR_MESSAGE.MISSIG_REDEEMER),
          ),
        );
        config.txBuilder.add_mint(
          mintBuilder.plutus_script(
            toPartial(toV2(policy.script), red),
            CML.RequiredSigners.new(),
          ),
        );
        break;
      }
    }
  });
  return program;
};
