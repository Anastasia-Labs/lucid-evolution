import { Schema, Data } from "effect";
import * as Credential from "./Credential.js";
import * as PoolKeyHash from "./PoolKeyHash.js";
import * as Coin from "./Coin.js";
import * as EpochNo from "./EpochNo.js";
import * as DRep from "./DRep.js";

/**
 * Error class for Certificate related operations.
 *
 * @example
 * import { Certificate } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Certificate.CertificateError({ message: "Invalid certificate" });
 * assert(error.message === "Invalid certificate");
 *
 * @since 2.0.0
 * @category errors
 */
export class CertificateError extends Data.TaggedError("CertificateError")<{
  message?: string;
  reason?: "InvalidType" | "UnsupportedCertificate";
}> {}

/**
 * Certificate union schema based on Conway CDDL specification
 *
 * CDDL: certificate =
 *   [
 *   stake_registration
 *   // stake_deregistration
 *   // stake_delegation
 *   // pool_registration
 *   // pool_retirement
 *   // reg_cert
 *   // unreg_cert
 *   // vote_deleg_cert
 *   // stake_vote_deleg_cert
 *   // stake_reg_deleg_cert
 *   // vote_reg_deleg_cert
 *   // stake_vote_reg_deleg_cert
 *   // auth_committee_hot_cert
 *   // resign_committee_cold_cert
 *   // reg_drep_cert
 *   // unreg_drep_cert
 *   // update_drep_cert
 *   ]
 *
 * stake_registration = (0, stake_credential)
 * stake_deregistration = (1, stake_credential)
 * stake_delegation = (2, stake_credential, pool_keyhash)
 * pool_registration = (3, pool_params)
 * pool_retirement = (4, pool_keyhash, epoch_no)
 * reg_cert = (7, stake_credential, coin)
 * unreg_cert = (8, stake_credential, coin)
 * vote_deleg_cert = (9, stake_credential, drep)
 * stake_vote_deleg_cert = (10, stake_credential, pool_keyhash, drep)
 *
 * @since 2.0.0
 * @category schemas
 */
export const Certificate = Schema.Union(
  Schema.TaggedStruct("StakeRegistration", {
    stakeCredential: Credential.Credential,
  }),
  Schema.TaggedStruct("StakeDeregistration", {
    stakeCredential: Credential.Credential,
  }),
  Schema.TaggedStruct("StakeDelegation", {
    stakeCredential: Credential.Credential,
    poolKeyHash: PoolKeyHash.PoolKeyHash,
  }),
  Schema.TaggedStruct("PoolRegistration", {
    // poolParams: PoolParams.PoolParams, // TODO: Implement when PoolParams is available
  }),
  Schema.TaggedStruct("PoolRetirement", {
    poolKeyHash: PoolKeyHash.PoolKeyHash,
    epoch: EpochNo.EpochNoSchema,
  }),
  Schema.TaggedStruct("RegCert", {
    stakeCredential: Credential.Credential,
    coin: Coin.CoinSchema,
  }),
  Schema.TaggedStruct("UnregCert", {
    stakeCredential: Credential.Credential,
    coin: Coin.CoinSchema,
  }),
  Schema.TaggedStruct("VoteDelegCert", {
    stakeCredential: Credential.Credential,
    drep: DRep.DRep,
  }),
  Schema.TaggedStruct("StakeVoteDelegCert", {
    stakeCredential: Credential.Credential,
    poolKeyHash: PoolKeyHash.PoolKeyHash,
    drep: DRep.DRep,
  }),
);

/**
 * Type alias for Certificate.
 *
 * @since 2.0.0
 * @category model
 */
export type Certificate = typeof Certificate.Type;
