import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type VoterKind = CML.VoterKind;

export const ConstitutionalCommitteeHotKeyHash = CML.VoterKind.ConstitutionalCommitteeHotKeyHash;
export const ConstitutionalCommitteeHotScriptHash = CML.VoterKind.ConstitutionalCommitteeHotScriptHash;
export const DRepKeyHash = CML.VoterKind.DRepKeyHash;
export const DRepScriptHash = CML.VoterKind.DRepScriptHash;
export const StakingPoolKeyHash = CML.VoterKind.StakingPoolKeyHash;


/**
 * Get all values of the VoterKind enum
 * 
 * @example
 * import { VoterKind } from "@lucid-evolution/experimental";
 * 
 * const allValues = VoterKind.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.VoterKind> => [
  CML.VoterKind.ConstitutionalCommitteeHotKeyHash,
  CML.VoterKind.ConstitutionalCommitteeHotScriptHash,
  CML.VoterKind.DRepKeyHash,
  CML.VoterKind.DRepScriptHash,
  CML.VoterKind.StakingPoolKeyHash
];

/**
 * Convert VoterKind enum value to string
 * 
 * @example
 * import { VoterKind } from "@lucid-evolution/experimental";
 * 
 * const name = VoterKind.toString(CML.VoterKind.ConstitutionalCommitteeHotKeyHash);
 * console.log(name); // "ConstitutionalCommitteeHotKeyHash"
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
 * @example
 * import { VoterKind } from "@lucid-evolution/experimental";
 * 
 * const value = VoterKind.fromString("ConstitutionalCommitteeHotKeyHash");
 * console.log(value); // Some(CML.VoterKind.ConstitutionalCommitteeHotKeyHash)
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
