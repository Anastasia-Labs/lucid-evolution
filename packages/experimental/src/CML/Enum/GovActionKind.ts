/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML GovActionKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type GovActionKind = CML.GovActionKind;

/**
 * ParameterChangeAction variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const ParameterChangeAction = CML.GovActionKind.ParameterChangeAction;

/**
 * HardForkInitiationAction variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const HardForkInitiationAction = CML.GovActionKind.HardForkInitiationAction;

/**
 * TreasuryWithdrawalsAction variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const TreasuryWithdrawalsAction = CML.GovActionKind.TreasuryWithdrawalsAction;

/**
 * NoConfidence variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const NoConfidence = CML.GovActionKind.NoConfidence;

/**
 * UpdateCommittee variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const UpdateCommittee = CML.GovActionKind.UpdateCommittee;

/**
 * NewConstitution variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const NewConstitution = CML.GovActionKind.NewConstitution;

/**
 * InfoAction variant of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const InfoAction = CML.GovActionKind.InfoAction;


/**
 * Get all values of the GovActionKind enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.GovActionKind> => [
  CML.GovActionKind.ParameterChangeAction,
  CML.GovActionKind.HardForkInitiationAction,
  CML.GovActionKind.TreasuryWithdrawalsAction,
  CML.GovActionKind.NoConfidence,
  CML.GovActionKind.UpdateCommittee,
  CML.GovActionKind.NewConstitution,
  CML.GovActionKind.InfoAction
];

/**
 * Convert GovActionKind enum value to string
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.GovActionKind): string => {
  switch (value) {
    case CML.GovActionKind.ParameterChangeAction:
      return "ParameterChangeAction";
    case CML.GovActionKind.HardForkInitiationAction:
      return "HardForkInitiationAction";
    case CML.GovActionKind.TreasuryWithdrawalsAction:
      return "TreasuryWithdrawalsAction";
    case CML.GovActionKind.NoConfidence:
      return "NoConfidence";
    case CML.GovActionKind.UpdateCommittee:
      return "UpdateCommittee";
    case CML.GovActionKind.NewConstitution:
      return "NewConstitution";
    case CML.GovActionKind.InfoAction:
      return "InfoAction";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to GovActionKind enum value
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.GovActionKind | undefined => {
  switch (str) {
    case "ParameterChangeAction":
      return CML.GovActionKind.ParameterChangeAction;
    case "HardForkInitiationAction":
      return CML.GovActionKind.HardForkInitiationAction;
    case "TreasuryWithdrawalsAction":
      return CML.GovActionKind.TreasuryWithdrawalsAction;
    case "NoConfidence":
      return CML.GovActionKind.NoConfidence;
    case "UpdateCommittee":
      return CML.GovActionKind.UpdateCommittee;
    case "NewConstitution":
      return CML.GovActionKind.NewConstitution;
    case "InfoAction":
      return CML.GovActionKind.InfoAction;
    default:
      return undefined;
  }
};
