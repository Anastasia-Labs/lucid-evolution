/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VoterKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type VoterKind = CML.VoterKind;

/**
 * ConstitutionalCommitteeHotKeyHash variant of the VoterKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const ConstitutionalCommitteeHotKeyHash =
  CML.VoterKind.ConstitutionalCommitteeHotKeyHash;

/**
 * ConstitutionalCommitteeHotScriptHash variant of the VoterKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const ConstitutionalCommitteeHotScriptHash =
  CML.VoterKind.ConstitutionalCommitteeHotScriptHash;

/**
 * DRepKeyHash variant of the VoterKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const DRepKeyHash = CML.VoterKind.DRepKeyHash;

/**
 * DRepScriptHash variant of the VoterKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const DRepScriptHash = CML.VoterKind.DRepScriptHash;

/**
 * StakingPoolKeyHash variant of the VoterKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const StakingPoolKeyHash = CML.VoterKind.StakingPoolKeyHash;

/**
 * Get all values of the VoterKind enum
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.VoterKind> => [
  CML.VoterKind.ConstitutionalCommitteeHotKeyHash,
  CML.VoterKind.ConstitutionalCommitteeHotScriptHash,
  CML.VoterKind.DRepKeyHash,
  CML.VoterKind.DRepScriptHash,
  CML.VoterKind.StakingPoolKeyHash,
];

/**
 * Convert VoterKind enum value to string
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.VoterKind): string => {
  switch (value) {
    case CML.VoterKind.ConstitutionalCommitteeHotKeyHash:
      return "ConstitutionalCommitteeHotKeyHash";
    case CML.VoterKind.ConstitutionalCommitteeHotScriptHash:
      return "ConstitutionalCommitteeHotScriptHash";
    case CML.VoterKind.DRepKeyHash:
      return "DRepKeyHash";
    case CML.VoterKind.DRepScriptHash:
      return "DRepScriptHash";
    case CML.VoterKind.StakingPoolKeyHash:
      return "StakingPoolKeyHash";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to VoterKind enum value
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.VoterKind | undefined => {
  switch (str) {
    case "ConstitutionalCommitteeHotKeyHash":
      return CML.VoterKind.ConstitutionalCommitteeHotKeyHash;
    case "ConstitutionalCommitteeHotScriptHash":
      return CML.VoterKind.ConstitutionalCommitteeHotScriptHash;
    case "DRepKeyHash":
      return CML.VoterKind.DRepKeyHash;
    case "DRepScriptHash":
      return CML.VoterKind.DRepScriptHash;
    case "StakingPoolKeyHash":
      return CML.VoterKind.StakingPoolKeyHash;
    default:
      return undefined;
  }
};
