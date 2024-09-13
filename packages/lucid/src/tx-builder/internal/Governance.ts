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
    const credential =
      stakeCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(stakeCredential.hash),
          );
    const certBuilder = CML.SingleCertificateBuilder.new(
      CML.Certificate.new_reg_drep_cert(
        credential,
        config.lucidConfig.protocolParameters.drepDeposit,
        cmlAnchor,
      ),
    );
    config.txBuilder.add_cert(certBuilder.skip_witness());
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
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const coldCred = yield* validateAndGetStakeCredential(coldAddress, config);
    const hotCred = yield* validateAndGetStakeCredential(hotAddress, config);
    if (coldCred.type === "Script" || hotCred.type === "Script") {
      yield* governanceError(ERROR_MESSAGE.EXPECTED_KEY_HASH);
    }
    const coldCredential = CML.Credential.new_pub_key(
      CML.Ed25519KeyHash.from_hex(coldCred.hash),
    );
    const hotCredential = CML.Credential.new_pub_key(
      CML.Ed25519KeyHash.from_hex(hotCred.hash),
    );
    const certBuilder = CML.SingleCertificateBuilder.new(
      CML.Certificate.new_auth_committee_hot_cert(
        coldCredential,
        hotCredential,
      ),
    );
    config.txBuilder.add_cert(certBuilder.payment_key());
  });

export const resignCommitteeHot = (
  config: TxBuilder.TxBuilderConfig,
  coldAddress: RewardAddress,
  anchor?: Anchor,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const coldCred = yield* validateAndGetStakeCredential(coldAddress, config);
    if (coldCred.type === "Script") {
      yield* governanceError(ERROR_MESSAGE.EXPECTED_KEY_HASH);
    }
    const coldCredential = CML.Credential.new_pub_key(
      CML.Ed25519KeyHash.from_hex(coldCred.hash),
    );
    const cmlAnchor = anchor
      ? CML.Anchor.new(
          CML.Url.from_json(anchor.url),
          CML.AnchorDocHash.from_hex(anchor.dataHash),
        )
      : undefined;
    const certBuilder = CML.SingleCertificateBuilder.new(
      CML.Certificate.new_resign_committee_cold_cert(coldCredential, cmlAnchor),
    );
    config.txBuilder.add_cert(certBuilder.payment_key());
  });
