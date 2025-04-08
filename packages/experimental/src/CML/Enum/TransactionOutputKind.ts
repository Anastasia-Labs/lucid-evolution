/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutputKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutputKind = CML.TransactionOutputKind;

/**
 * AlonzoFormatTxOut variant of the TransactionOutputKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const AlonzoFormatTxOut = CML.TransactionOutputKind.AlonzoFormatTxOut;

/**
 * ConwayFormatTxOut variant of the TransactionOutputKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const ConwayFormatTxOut = CML.TransactionOutputKind.ConwayFormatTxOut;

/**
 * Get all values of the TransactionOutputKind enum
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.TransactionOutputKind> => [
  CML.TransactionOutputKind.AlonzoFormatTxOut,
  CML.TransactionOutputKind.ConwayFormatTxOut,
];

/**
 * Convert TransactionOutputKind enum value to string
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
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (
  str: string,
): CML.TransactionOutputKind | undefined => {
  switch (str) {
    case "AlonzoFormatTxOut":
      return CML.TransactionOutputKind.AlonzoFormatTxOut;
    case "ConwayFormatTxOut":
      return CML.TransactionOutputKind.ConwayFormatTxOut;
    default:
      return undefined;
  }
};
