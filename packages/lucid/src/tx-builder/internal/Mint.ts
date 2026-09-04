import { Effect, pipe } from "effect";
import { withCMLScope } from "@lucid-evolution/core-utils";
import { Assets, Redeemer } from "@lucid-evolution/core-types";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2, toV3 } from "./TxUtils.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as TxBuilder from "../TxBuilder.js";
import { addAssets } from "@lucid-evolution/utils";
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
    for (const unit of units) {
      if (unit.slice(0, 56) !== policyId) {
        yield* mintError(ERROR_MESSAGE.MULTIPLE_POLICIES);
      }
    }
    const policy = yield* pipe(
      Effect.fromNullable(config.scripts.get(policyId)),
      Effect.orElseFail(() =>
        mintError(ERROR_MESSAGE.MISSING_POLICY(policyId)),
      ),
    );
    const red =
      policy.type === "Native"
        ? undefined
        : yield* pipe(
            Effect.fromNullable(redeemer),
            Effect.orElseFail(() => mintError(ERROR_MESSAGE.MISSING_REDEEMER)),
          );
    withCMLScope((own) => {
      const mintAssets = own(CML.MapAssetNameToNonZeroInt64.new());
      for (const unit of units) {
        mintAssets.insert(
          own(CML.AssetName.from_hex(unit.slice(56))),
          assets[unit],
        );
      }
      // `native_script` and `plutus_script` consume the mint builder itself;
      // their arguments and the result are ours to free.
      const mintBuilder = CML.SingleMintBuilder.new(mintAssets);
      const result = own(
        policy.type === "Native"
          ? mintBuilder.native_script(
              own(CML.NativeScript.from_cbor_hex(policy.script)),
              own(CML.NativeScriptWitnessInfo.assume_signature_count()),
            )
          : mintBuilder.plutus_script(
              own(
                toPartial(
                  own(
                    policy.type === "PlutusV1"
                      ? toV1(policy.script)
                      : policy.type === "PlutusV2"
                        ? toV2(policy.script)
                        : toV3(policy.script),
                  ),
                  red!,
                ),
              ),
              own(CML.Ed25519KeyHashList.new()),
            ),
      );
      config.txBuilder.add_mint(result);
    });
  });
