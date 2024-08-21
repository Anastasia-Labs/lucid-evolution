import { PoolId, Redeemer, RewardAddress } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { TxBuilderError } from "../../Errors.js";
import { Effect } from "effect";
import {
  validateAndFetchStakeCredential,
  processStakeCredential,
} from "./TxUtils.js";

export const governanceError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Governance : ${cause} }` });

export const delegateVoteToDrep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  drep: CML.DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndFetchStakeCredential(
      rewardAddress,
      config,
    );

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_vote_deleg_cert(credential, drep),
      );

    yield* processStakeCredential(stakeCredential, config, buildCert, redeemer);
  });

export const delegateVoteToPoolAndDrep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  poolId: PoolId,
  drep: CML.DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndFetchStakeCredential(
      rewardAddress,
      config,
    );

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_stake_vote_deleg_cert(
          credential,
          CML.Ed25519KeyHash.from_bech32(poolId),
          drep,
        ),
      );

    yield* processStakeCredential(stakeCredential, config, buildCert, redeemer);
  });

export const registerAndDelegateToPool = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  poolId: PoolId,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndFetchStakeCredential(
      rewardAddress,
      config,
    );

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_stake_reg_deleg_cert(
          credential,
          CML.Ed25519KeyHash.from_bech32(poolId),
          config.lucidConfig.protocolParameters.keyDeposit,
        ),
      );

    yield* processStakeCredential(stakeCredential, config, buildCert, redeemer);
  });

export const registerAndDelegateToDrep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  drep: CML.DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndFetchStakeCredential(
      rewardAddress,
      config,
    );

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_vote_reg_deleg_cert(
          credential,
          drep,
          config.lucidConfig.protocolParameters.keyDeposit,
        ),
      );

    yield* processStakeCredential(stakeCredential, config, buildCert, redeemer);
  });

export const deregisterDrep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndFetchStakeCredential(
      rewardAddress,
      config,
    );

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_unreg_drep_cert(
          credential,
          config.lucidConfig.protocolParameters.keyDeposit,
        ),
      );

    yield* processStakeCredential(stakeCredential, config, buildCert, redeemer);
  });
