/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Vote enum
 *
 * @since 2.0.0
 * @category Types
 */
export type Vote = CML.Vote;

/**
 * No variant of the Vote enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const No = CML.Vote.No;

/**
 * Yes variant of the Vote enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Yes = CML.Vote.Yes;

/**
 * Abstain variant of the Vote enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Abstain = CML.Vote.Abstain;


/**
 * Get all values of the Vote enum
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
