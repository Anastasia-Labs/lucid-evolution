import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CertificateKind = CML.CertificateKind;

export const StakeRegistration = CML.CertificateKind.StakeRegistration;
export const StakeDeregistration = CML.CertificateKind.StakeDeregistration;
export const StakeDelegation = CML.CertificateKind.StakeDelegation;
export const PoolRegistration = CML.CertificateKind.PoolRegistration;
export const PoolRetirement = CML.CertificateKind.PoolRetirement;
export const RegCert = CML.CertificateKind.RegCert;
export const UnregCert = CML.CertificateKind.UnregCert;
export const VoteDelegCert = CML.CertificateKind.VoteDelegCert;
export const StakeVoteDelegCert = CML.CertificateKind.StakeVoteDelegCert;
export const StakeRegDelegCert = CML.CertificateKind.StakeRegDelegCert;
export const VoteRegDelegCert = CML.CertificateKind.VoteRegDelegCert;
export const StakeVoteRegDelegCert = CML.CertificateKind.StakeVoteRegDelegCert;
export const AuthCommitteeHotCert = CML.CertificateKind.AuthCommitteeHotCert;
export const ResignCommitteeColdCert =
  CML.CertificateKind.ResignCommitteeColdCert;
export const RegDrepCert = CML.CertificateKind.RegDrepCert;
export const UnregDrepCert = CML.CertificateKind.UnregDrepCert;
export const UpdateDrepCert = CML.CertificateKind.UpdateDrepCert;

/**
 * Get all values of the CertificateKind enum
 *
 * @example
 * import { CertificateKind } from "@lucid-evolution/experimental";
 *
 * const allValues = CertificateKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.CertificateKind> => [
  CML.CertificateKind.StakeRegistration,
  CML.CertificateKind.StakeDeregistration,
  CML.CertificateKind.StakeDelegation,
  CML.CertificateKind.PoolRegistration,
  CML.CertificateKind.PoolRetirement,
  CML.CertificateKind.RegCert,
  CML.CertificateKind.UnregCert,
  CML.CertificateKind.VoteDelegCert,
  CML.CertificateKind.StakeVoteDelegCert,
  CML.CertificateKind.StakeRegDelegCert,
  CML.CertificateKind.VoteRegDelegCert,
  CML.CertificateKind.StakeVoteRegDelegCert,
  CML.CertificateKind.AuthCommitteeHotCert,
  CML.CertificateKind.ResignCommitteeColdCert,
  CML.CertificateKind.RegDrepCert,
  CML.CertificateKind.UnregDrepCert,
  CML.CertificateKind.UpdateDrepCert,
];

/**
 * Convert CertificateKind enum value to string
 *
 * @example
 * import { CertificateKind } from "@lucid-evolution/experimental";
 *
 * const name = CertificateKind.toString(CML.CertificateKind.StakeRegistration);
 * console.log(name); // "StakeRegistration"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.CertificateKind): string => {
  switch (value) {
    case CML.CertificateKind.StakeRegistration:
      return "StakeRegistration";
    case CML.CertificateKind.StakeDeregistration:
      return "StakeDeregistration";
    case CML.CertificateKind.StakeDelegation:
      return "StakeDelegation";
    case CML.CertificateKind.PoolRegistration:
      return "PoolRegistration";
    case CML.CertificateKind.PoolRetirement:
      return "PoolRetirement";
    case CML.CertificateKind.RegCert:
      return "RegCert";
    case CML.CertificateKind.UnregCert:
      return "UnregCert";
    case CML.CertificateKind.VoteDelegCert:
      return "VoteDelegCert";
    case CML.CertificateKind.StakeVoteDelegCert:
      return "StakeVoteDelegCert";
    case CML.CertificateKind.StakeRegDelegCert:
      return "StakeRegDelegCert";
    case CML.CertificateKind.VoteRegDelegCert:
      return "VoteRegDelegCert";
    case CML.CertificateKind.StakeVoteRegDelegCert:
      return "StakeVoteRegDelegCert";
    case CML.CertificateKind.AuthCommitteeHotCert:
      return "AuthCommitteeHotCert";
    case CML.CertificateKind.ResignCommitteeColdCert:
      return "ResignCommitteeColdCert";
    case CML.CertificateKind.RegDrepCert:
      return "RegDrepCert";
    case CML.CertificateKind.UnregDrepCert:
      return "UnregDrepCert";
    case CML.CertificateKind.UpdateDrepCert:
      return "UpdateDrepCert";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to CertificateKind enum value
 *
 * @example
 * import { CertificateKind } from "@lucid-evolution/experimental";
 *
 * const value = CertificateKind.fromString("StakeRegistration");
 * console.log(value); // Some(CML.CertificateKind.StakeRegistration)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.CertificateKind | undefined => {
  switch (str) {
    case "StakeRegistration":
      return CML.CertificateKind.StakeRegistration;
    case "StakeDeregistration":
      return CML.CertificateKind.StakeDeregistration;
    case "StakeDelegation":
      return CML.CertificateKind.StakeDelegation;
    case "PoolRegistration":
      return CML.CertificateKind.PoolRegistration;
    case "PoolRetirement":
      return CML.CertificateKind.PoolRetirement;
    case "RegCert":
      return CML.CertificateKind.RegCert;
    case "UnregCert":
      return CML.CertificateKind.UnregCert;
    case "VoteDelegCert":
      return CML.CertificateKind.VoteDelegCert;
    case "StakeVoteDelegCert":
      return CML.CertificateKind.StakeVoteDelegCert;
    case "StakeRegDelegCert":
      return CML.CertificateKind.StakeRegDelegCert;
    case "VoteRegDelegCert":
      return CML.CertificateKind.VoteRegDelegCert;
    case "StakeVoteRegDelegCert":
      return CML.CertificateKind.StakeVoteRegDelegCert;
    case "AuthCommitteeHotCert":
      return CML.CertificateKind.AuthCommitteeHotCert;
    case "ResignCommitteeColdCert":
      return CML.CertificateKind.ResignCommitteeColdCert;
    case "RegDrepCert":
      return CML.CertificateKind.RegDrepCert;
    case "UnregDrepCert":
      return CML.CertificateKind.UnregDrepCert;
    case "UpdateDrepCert":
      return CML.CertificateKind.UpdateDrepCert;
    default:
      return undefined;
  }
};
