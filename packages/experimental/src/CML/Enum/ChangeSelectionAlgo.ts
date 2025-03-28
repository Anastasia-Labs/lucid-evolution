import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ChangeSelectionAlgo = CML.ChangeSelectionAlgo;

export const Default = CML.ChangeSelectionAlgo.Default;


/**
 * Get all values of the ChangeSelectionAlgo enum
 * 
 * @example
 * import { ChangeSelectionAlgo } from "@lucid-evolution/experimental";
 * 
 * const allValues = ChangeSelectionAlgo.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.ChangeSelectionAlgo> => [
  CML.ChangeSelectionAlgo.Default
];

/**
 * Convert ChangeSelectionAlgo enum value to string
 * 
 * @example
 * import { ChangeSelectionAlgo } from "@lucid-evolution/experimental";
 * 
 * const name = ChangeSelectionAlgo.toString(CML.ChangeSelectionAlgo.Default);
 * console.log(name); // "Default"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.ChangeSelectionAlgo): string => {
  switch (value) {
    case CML.ChangeSelectionAlgo.Default:
      return "Default";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to ChangeSelectionAlgo enum value
 * 
 * @example
 * import { ChangeSelectionAlgo } from "@lucid-evolution/experimental";
 * 
 * const value = ChangeSelectionAlgo.fromString("Default");
 * console.log(value); // Some(CML.ChangeSelectionAlgo.Default)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.ChangeSelectionAlgo | undefined => {
  switch (str) {
    case "Default":
      return CML.ChangeSelectionAlgo.Default;
    default:
      return undefined;
  }
};
