import { Effect, pipe } from "effect";
import { fromHex } from "@evolution-sdk/core-utils";
import { Assets, Redeemer } from "@evolution-sdk/core-types";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2, toV3 } from "./TxUtils.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as TxBuilder from "../TxBuilder.js";
import { addAssets } from "@evolution-sdk/utils";
import { TxConfig } from "./Service.js";

export const mintError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Mint: ${cause} }` });

/**
 * All assets should be of the same policy id.
 * You can chain mintAssets functions together if you need to mint assets with different policy ids.
 * If the plutus script doesn't need a redeemer, you still need to specifiy the void redeemer.
 */
export const mintAssets = (assets: Assets) => (redeemer?: Redeemer) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const units = Object.keys(assets);
    const policyId = units[0].slice(0, 56);
    const mintAssets = CML.MapAssetNameToNonZeroInt64.new();
    for (const unit of units) {
      if (unit.slice(0, 56) !== policyId) {
        yield* mintError(ERROR_MESSAGE.MULTIPLE_POLICIES);
      }
      mintAssets.insert(CML.AssetName.from_hex(unit.slice(56)), assets[unit]);
    }
    const mintBuilder = CML.SingleMintBuilder.new(mintAssets);
    const policy = yield* pipe(
      Effect.fromNullable(config.scripts.get(policyId)),
      Effect.orElseFail(() =>
        mintError(ERROR_MESSAGE.MISSING_POLICY(policyId)),
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
        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() => mintError(ERROR_MESSAGE.MISSING_REDEEMER)),
        );
        config.txBuilder.add_mint(
          mintBuilder.plutus_script(
            toPartial(toV1(policy.script), red),
            CML.Ed25519KeyHashList.new(),
          ),
        );
        break;
      }
      case "PlutusV2": {
        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() => mintError(ERROR_MESSAGE.MISSING_REDEEMER)),
        );
        config.txBuilder.add_mint(
          mintBuilder.plutus_script(
            toPartial(toV2(policy.script), red),
            CML.Ed25519KeyHashList.new(),
          ),
        );
        break;
      }
      case "PlutusV3": {
        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() => mintError(ERROR_MESSAGE.MISSING_REDEEMER)),
        );
        config.txBuilder.add_mint(
          mintBuilder.plutus_script(
            toPartial(toV3(policy.script), red),
            CML.Ed25519KeyHashList.new(),
          ),
        );
        break;
      }
    }
  });
