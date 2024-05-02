import { Lovelace, Redeemer, RewardAddress } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { Effect, pipe } from "effect";
import {
  ERROR_MESSAGE,
  TxBuilderError,
  TxBuilderErrorCause,
} from "../../Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { toPartial, toV1, toV2, validateAddressDetails } from "./TxUtils.js";

export const stakeError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Stake", message });

export const registerStake = (
  config: TxBuilderConfig,
  rewardAddress: RewardAddress,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* ($) {
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? stakeError("InvalidCredential", "Address type must be Reward type.")
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* $(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() => stakeError("MissingStakeCredential")),
    );

    const credential =
      stakeCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(stakeCredential.hash),
          );
    const certBuilder = CML.SingleCertificateBuilder.new(
      CML.Certificate.new_stake_registration(credential),
    );
    config.txBuilder.add_cert(certBuilder.skip_witness());
  });

export const deRegisterStake = (
  config: TxBuilderConfig,
  rewardAddress: RewardAddress,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* ($) {
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? stakeError("InvalidCredential", "Address type must be Reward type.")
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* $(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() => stakeError("MissingStakeCredential")),
    );

    switch (stakeCredential.type) {
      case "Key": {
        const credential = CML.Credential.new_pub_key(
          CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = CML.SingleCertificateBuilder.new(
          CML.Certificate.new_stake_deregistration(credential),
        );
        config.txBuilder.add_cert(certBuilder.payment_key());
        break;
      }

      case "Script": {
        const credential = CML.Credential.new_script(
          CML.ScriptHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = CML.SingleCertificateBuilder.new(
          CML.Certificate.new_stake_deregistration(credential),
        );
        const script = yield* $(
          Effect.fromNullable(config.scripts.get(stakeCredential.hash)),
          Effect.orElseFail(() =>
            stakeError(
              "MissingScript",
              `No script found, script hash: ${stakeCredential.hash}, consider using attach modules`,
            ),
          ),
        );
        const red = yield* $(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            stakeError("MissingRedeemer", ERROR_MESSAGE.MISSIG_REDEEMER),
          ),
        );
        switch (script.type) {
          case "PlutusV1": {
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV1(script.script), red),
                CML.RequiredSigners.new(),
              ),
            );
            break;
          }

          case "PlutusV2": {
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV2(script.script), red),
                CML.RequiredSigners.new(),
              ),
            );
            break;
          }
          case "Native": {
            yield* stakeError("NotFound");
            break;
          }
        }
      }
    }
  });

export const withdraw = (
  config: TxBuilderConfig,
  rewardAddress: RewardAddress,
  amount: Lovelace,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* ($) {
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? stakeError("InvalidCredential", "Address type must be Reward type.")
          : Effect.succeed(address),
      ),
    );

    const withdrawBuilder = yield* pipe(
      Effect.fromNullable(
        CML.RewardAddress.from_address(CML.Address.from_bech32(rewardAddress)),
      ),
      Effect.orElseFail(() => stakeError("MissingStakeCredential")),
      Effect.andThen((address) =>
        CML.SingleWithdrawalBuilder.new(address, amount),
      ),
    );

    const stakeCredential = yield* pipe(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() => stakeError("MissingStakeCredential")),
    );

    switch (stakeCredential.type) {
      case "Key": {
        config.txBuilder.add_withdrawal(withdrawBuilder.payment_key());
        break;
      }

      case "Script": {
        const script = yield* pipe(
          Effect.fromNullable(config.scripts.get(stakeCredential.hash)),
          Effect.orElseFail(() =>
            stakeError(
              "MissingScript",
              `No script found, script hash: ${stakeCredential.hash}, consider using attach modules`,
            ),
          ),
        );
        const red = yield* $(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            stakeError("MissingRedeemer", ERROR_MESSAGE.MISSIG_REDEEMER),
          ),
        );
        switch (script.type) {
          case "PlutusV1": {
            config.txBuilder.add_withdrawal(
              withdrawBuilder.plutus_script(
                toPartial(toV1(script.script), red),
                CML.RequiredSigners.new(),
              ),
            );
            break;
          }

          case "PlutusV2": {
            config.txBuilder.add_withdrawal(
              withdrawBuilder.plutus_script(
                toPartial(toV2(script.script), red),
                CML.RequiredSigners.new(),
              ),
            );
            break;
          }
          case "Native": {
            yield* stakeError("NotFound");
            break;
          }
        }
      }
    }
  });
