import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type GovActionKind = CML.GovActionKind;

export const ParameterChangeAction = CML.GovActionKind.ParameterChangeAction;
export const HardForkInitiationAction =
  CML.GovActionKind.HardForkInitiationAction;
export const TreasuryWithdrawalsAction =
  CML.GovActionKind.TreasuryWithdrawalsAction;
export const NoConfidence = CML.GovActionKind.NoConfidence;
export const UpdateCommittee = CML.GovActionKind.UpdateCommittee;
export const NewConstitution = CML.GovActionKind.NewConstitution;
export const InfoAction = CML.GovActionKind.InfoAction;

/**
 * Get all values of the GovActionKind enum
 *
 * @example
 * import { GovActionKind } from "@lucid-evolution/experimental";
 *
 * const allValues = GovActionKind.values();
 * console.log(allValues);
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
  CML.GovActionKind.InfoAction,
];

/**
 * Convert GovActionKind enum value to string
 *
 * @example
 * import { GovActionKind } from "@lucid-evolution/experimental";
 *
 * const name = GovActionKind.toString(CML.GovActionKind.ParameterChangeAction);
 * console.log(name); // "ParameterChangeAction"
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
 * @example
 * import { GovActionKind } from "@lucid-evolution/experimental";
 *
 * const value = GovActionKind.fromString("ParameterChangeAction");
 * console.log(value); // Some(CML.GovActionKind.ParameterChangeAction)
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
