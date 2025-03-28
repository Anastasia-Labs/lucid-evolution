import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Vote = CML.Vote;

export const No = CML.Vote.No;
export const Yes = CML.Vote.Yes;
export const Abstain = CML.Vote.Abstain;


/**
 * Get all values of the Vote enum
 * 
 * @example
 * import { Vote } from "@lucid-evolution/experimental";
 * 
 * const allValues = Vote.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.Vote> => [
  CML.Vote.No,
  CML.Vote.Yes,
  CML.Vote.Abstain
];

/**
 * Convert Vote enum value to string
 * 
 * @example
 * import { Vote } from "@lucid-evolution/experimental";
 * 
 * const name = Vote.toString(CML.Vote.No);
 * console.log(name); // "No"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.Vote): string => {
  switch (value) {
    case CML.Vote.No:
      return "No";
    case CML.Vote.Yes:
      return "Yes";
    case CML.Vote.Abstain:
      return "Abstain";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to Vote enum value
 * 
 * @example
 * import { Vote } from "@lucid-evolution/experimental";
 * 
 * const value = Vote.fromString("No");
 * console.log(value); // Some(CML.Vote.No)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.Vote | undefined => {
  switch (str) {
    case "No":
      return CML.Vote.No;
    case "Yes":
      return CML.Vote.Yes;
    case "Abstain":
      return CML.Vote.Abstain;
    default:
      return undefined;
  }
};
