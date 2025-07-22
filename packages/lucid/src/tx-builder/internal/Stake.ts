import { Lovelace, Redeemer, RewardAddress } from "@evolution-sdk/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { Effect, pipe } from "effect";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import {
  toPartial,
  toV1,
  toV2,
  toV3,
  validateAddressDetails,
} from "./TxUtils.js";
import { TxConfig } from "./Service.js";

export const stakeError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Stake: ${cause} }` });

export const registerStake = (rewardAddress: RewardAddress) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? stakeError(ERROR_MESSAGE.MISSING_REWARD_TYPE)
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* pipe(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() =>
        stakeError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
      ),
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
  rewardAddress: RewardAddress,
  redeemer?: Redeemer,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? stakeError(ERROR_MESSAGE.MISSING_REWARD_TYPE)
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* pipe(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() =>
        stakeError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
      ),
    );

    const createCertBuilder = (
      credential: CML.Credential,
      config: TxBuilder.TxBuilderConfig,
    ): CML.SingleCertificateBuilder => {
      return CML.SingleCertificateBuilder.new(
        CML.Certificate.new_unreg_cert(
          credential,
          config.lucidConfig.protocolParameters.keyDeposit,
        ),
      );
    };

    switch (stakeCredential.type) {
      case "Key": {
        const credential = CML.Credential.new_pub_key(
          CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = createCertBuilder(credential, config);
        config.txBuilder.add_cert(certBuilder.payment_key());
        break;
      }

      case "Script": {
        const credential = CML.Credential.new_script(
          CML.ScriptHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = createCertBuilder(credential, config);
        const script = yield* pipe(
          Effect.fromNullable(config.scripts.get(stakeCredential.hash)),
          Effect.orElseFail(() =>
            stakeError(ERROR_MESSAGE.MISSING_SCRIPT(stakeCredential.hash)),
          ),
        );
        const handleRedeemer = () =>
          pipe(
            Effect.fromNullable(redeemer),
            Effect.orElseFail(() => stakeError(ERROR_MESSAGE.MISSING_REDEEMER)),
          );
        switch (script.type) {
          case "PlutusV1": {
            const red = yield* handleRedeemer();
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV1(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }

          case "PlutusV2": {
            const red = yield* handleRedeemer();
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV2(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }
          case "PlutusV3": {
            const red = yield* handleRedeemer();
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV3(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }
          case "Native": {
            config.txBuilder.add_cert(
              certBuilder.native_script(
                CML.NativeScript.from_cbor_hex(script.script),
                CML.NativeScriptWitnessInfo.assume_signature_count(),
              ),
            );
            break;
          }
        }
      }
    }
  });

export const withdraw =
  (rewardAddress: RewardAddress, amount: Lovelace) => (redeemer?: Redeemer) =>
    Effect.gen(function* () {
      const { config } = yield* TxConfig;
      const addressDetails = yield* pipe(
        validateAddressDetails(rewardAddress, config.lucidConfig),
        Effect.andThen((address) =>
          address.type !== "Reward"
            ? stakeError(ERROR_MESSAGE.MISSING_REWARD_TYPE)
            : Effect.succeed(address),
        ),
      );

      const withdrawBuilder = yield* pipe(
        Effect.fromNullable(
          CML.RewardAddress.from_address(
            CML.Address.from_bech32(rewardAddress),
          ),
        ),
        Effect.orElseFail(() =>
          stakeError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
        ),
        Effect.andThen((address) =>
          CML.SingleWithdrawalBuilder.new(address, amount),
        ),
      );

      const stakeCredential = yield* pipe(
        Effect.fromNullable(addressDetails.stakeCredential),
        Effect.orElseFail(() =>
          stakeError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
        ),
      );

      const handleRedeemer = () =>
        pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() => stakeError(ERROR_MESSAGE.MISSING_REDEEMER)),
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
              stakeError(ERROR_MESSAGE.MISSING_SCRIPT(stakeCredential.hash)),
            ),
          );

          switch (script.type) {
            case "PlutusV1": {
              const red = yield* handleRedeemer();
              config.txBuilder.add_withdrawal(
                withdrawBuilder.plutus_script(
                  toPartial(toV1(script.script), red),
                  CML.Ed25519KeyHashList.new(),
                ),
              );
              break;
            }

            case "PlutusV2": {
              const red = yield* handleRedeemer();
              config.txBuilder.add_withdrawal(
                withdrawBuilder.plutus_script(
                  toPartial(toV2(script.script), red),
                  CML.Ed25519KeyHashList.new(),
                ),
              );
              break;
            }

            case "PlutusV3": {
              const red = yield* handleRedeemer();
              config.txBuilder.add_withdrawal(
                withdrawBuilder.plutus_script(
                  toPartial(toV3(script.script), red),
                  CML.Ed25519KeyHashList.new(),
                ),
              );
              break;
            }
            case "Native": {
              config.txBuilder.add_withdrawal(
                withdrawBuilder.native_script(
                  CML.NativeScript.from_cbor_hex(script.script),
                  CML.NativeScriptWitnessInfo.assume_signature_count(),
                ),
              );
              break;
            }
          }
        }
      }
    });
