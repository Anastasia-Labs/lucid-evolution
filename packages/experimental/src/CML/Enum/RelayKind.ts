import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RelayKind = CML.RelayKind;

export const SingleHostAddr = CML.RelayKind.SingleHostAddr;
export const SingleHostName = CML.RelayKind.SingleHostName;
export const MultiHostName = CML.RelayKind.MultiHostName;


/**
 * Get all values of the RelayKind enum
 * 
 * @example
 * import { RelayKind } from "@lucid-evolution/experimental";
 * 
 * const allValues = RelayKind.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.RelayKind> => [
  CML.RelayKind.SingleHostAddr,
  CML.RelayKind.SingleHostName,
  CML.RelayKind.MultiHostName
];

/**
 * Convert RelayKind enum value to string
 * 
 * @example
 * import { RelayKind } from "@lucid-evolution/experimental";
 * 
 * const name = RelayKind.toString(CML.RelayKind.SingleHostAddr);
 * console.log(name); // "SingleHostAddr"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.RelayKind): string => {
  switch (value) {
    case CML.RelayKind.SingleHostAddr:
      return "SingleHostAddr";
    case CML.RelayKind.SingleHostName:
      return "SingleHostName";
    case CML.RelayKind.MultiHostName:
      return "MultiHostName";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to RelayKind enum value
 * 
 * @example
 * import { RelayKind } from "@lucid-evolution/experimental";
 * 
 * const value = RelayKind.fromString("SingleHostAddr");
 * console.log(value); // Some(CML.RelayKind.SingleHostAddr)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.RelayKind | undefined => {
  switch (str) {
    case "SingleHostAddr":
      return CML.RelayKind.SingleHostAddr;
    case "SingleHostName":
      return CML.RelayKind.SingleHostName;
    case "MultiHostName":
      return CML.RelayKind.MultiHostName;
    default:
      return undefined;
  }
};
