import {
  Anchor,
  DRep,
  PoolId,
  Redeemer,
  RewardAddress,
  toCMLDRep,
} from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import { Effect } from "effect";
import {
  processCertificate,
  validateAndGetStakeCredential,
} from "./TxUtils.js";

export const governanceError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Governance: ${cause} }` });

export const delegateVoteToDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  drep: DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );
    const cmlDRep = toCMLDRep(drep);
    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_vote_deleg_cert(credential, cmlDRep),
      );

    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const delegateVoteToPoolAndDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  poolId: PoolId,
  drep: DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );
    const cmlDRep = toCMLDRep(drep);
    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_stake_vote_deleg_cert(
          credential,
          CML.Ed25519KeyHash.from_bech32(poolId),
          cmlDRep,
        ),
      );

    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const registerAndDelegateToPool = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  poolId: PoolId,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
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

    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const registerAndDelegateToDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  drep: DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );
    const cmlDRep = toCMLDRep(drep);
    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_vote_reg_deleg_cert(
          credential,
          cmlDRep,
          config.lucidConfig.protocolParameters.keyDeposit,
        ),
      );

    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const registerAndDelegateToPoolAndDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  poolId: PoolId,
  drep: DRep,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );
    const cmlDRep = toCMLDRep(drep);
    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_stake_vote_reg_deleg_cert(
          credential,
          CML.Ed25519KeyHash.from_bech32(poolId),
          cmlDRep,
          config.lucidConfig.protocolParameters.keyDeposit,
        ),
      );

    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const registerDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  anchor?: Anchor,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );
    const cmlAnchor = anchor
      ? CML.Anchor.new(
          CML.Url.from_json(anchor.url),
          CML.AnchorDocHash.from_hex(anchor.dataHash),
        )
      : undefined;

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_reg_drep_cert(
          credential,
          config.lucidConfig.protocolParameters.drepDeposit,
          cmlAnchor,
        ),
      );
    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const deregisterDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_unreg_drep_cert(
          credential,
          config.lucidConfig.protocolParameters.drepDeposit,
        ),
      );

    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const updateDRep = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  anchor?: Anchor,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const stakeCredential = yield* validateAndGetStakeCredential(
      rewardAddress,
      config,
    );
    const cmlAnchor = anchor
      ? CML.Anchor.new(
          CML.Url.from_json(anchor.url),
          CML.AnchorDocHash.from_hex(anchor.dataHash),
        )
      : undefined;
    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_update_drep_cert(credential, cmlAnchor),
      );
    yield* processCertificate(stakeCredential, config, buildCert, redeemer);
  });

export const authCommitteeHot = (
  config: TxBuilder.TxBuilderConfig,
  coldAddress: RewardAddress,
  hotAddress: RewardAddress,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const coldCred = yield* validateAndGetStakeCredential(coldAddress, config);
    const hotCred = yield* validateAndGetStakeCredential(hotAddress, config);
    const hotCredential: CML.Credential =
      hotCred.type === "Key"
        ? CML.Credential.new_pub_key(CML.Ed25519KeyHash.from_hex(hotCred.hash))
        : CML.Credential.new_script(CML.ScriptHash.from_hex(hotCred.hash));
    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_auth_committee_hot_cert(credential, hotCredential),
      );

    yield* processCertificate(coldCred, config, buildCert, redeemer);
  });

export const resignCommitteeHot = (
  config: TxBuilder.TxBuilderConfig,
  coldAddress: RewardAddress,
  anchor?: Anchor,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const coldCred = yield* validateAndGetStakeCredential(coldAddress, config);
    const cmlAnchor = anchor
      ? CML.Anchor.new(
          CML.Url.from_json(anchor.url),
          CML.AnchorDocHash.from_hex(anchor.dataHash),
        )
      : undefined;

    const buildCert = (credential: CML.Credential) =>
      CML.SingleCertificateBuilder.new(
        CML.Certificate.new_resign_committee_cold_cert(credential, cmlAnchor),
      );

    yield* processCertificate(coldCred, config, buildCert, redeemer);
  });
