import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionOutputKind = CML.TransactionOutputKind;

export const AlonzoFormatTxOut = CML.TransactionOutputKind.AlonzoFormatTxOut;
export const ConwayFormatTxOut = CML.TransactionOutputKind.ConwayFormatTxOut;


/**
 * Get all values of the TransactionOutputKind enum
 * 
 * @example
 * import { TransactionOutputKind } from "@lucid-evolution/experimental";
 * 
 * const allValues = TransactionOutputKind.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.TransactionOutputKind> => [
  CML.TransactionOutputKind.AlonzoFormatTxOut,
  CML.TransactionOutputKind.ConwayFormatTxOut
];

/**
 * Convert TransactionOutputKind enum value to string
 * 
 * @example
 * import { TransactionOutputKind } from "@lucid-evolution/experimental";
 * 
 * const name = TransactionOutputKind.toString(CML.TransactionOutputKind.AlonzoFormatTxOut);
 * console.log(name); // "AlonzoFormatTxOut"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.TransactionOutputKind): string => {
  switch (value) {
    case CML.TransactionOutputKind.AlonzoFormatTxOut:
      return "AlonzoFormatTxOut";
    case CML.TransactionOutputKind.ConwayFormatTxOut:
      return "ConwayFormatTxOut";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to TransactionOutputKind enum value
 * 
 * @example
 * import { TransactionOutputKind } from "@lucid-evolution/experimental";
 * 
 * const value = TransactionOutputKind.fromString("AlonzoFormatTxOut");
 * console.log(value); // Some(CML.TransactionOutputKind.AlonzoFormatTxOut)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.TransactionOutputKind | undefined => {
  switch (str) {
    case "AlonzoFormatTxOut":
      return CML.TransactionOutputKind.AlonzoFormatTxOut;
    case "ConwayFormatTxOut":
      return CML.TransactionOutputKind.ConwayFormatTxOut;
    default:
      return undefined;
  }
};
