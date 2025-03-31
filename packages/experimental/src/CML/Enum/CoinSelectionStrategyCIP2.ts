/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CoinSelectionStrategyCIP2 enum
 *
 * @since 2.0.0
 * @category Types
 */
export type CoinSelectionStrategyCIP2 = CML.CoinSelectionStrategyCIP2;

/**
 * LargestFirst variant of the CoinSelectionStrategyCIP2 enum
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const kind = CoinSelectionStrategyCIP2.LargestFirst;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const LargestFirst = CML.CoinSelectionStrategyCIP2.LargestFirst;

/**
 * RandomImprove variant of the CoinSelectionStrategyCIP2 enum
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const kind = CoinSelectionStrategyCIP2.RandomImprove;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const RandomImprove = CML.CoinSelectionStrategyCIP2.RandomImprove;

/**
 * LargestFirstMultiAsset variant of the CoinSelectionStrategyCIP2 enum
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const kind = CoinSelectionStrategyCIP2.LargestFirstMultiAsset;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const LargestFirstMultiAsset = CML.CoinSelectionStrategyCIP2.LargestFirstMultiAsset;

/**
 * RandomImproveMultiAsset variant of the CoinSelectionStrategyCIP2 enum
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const kind = CoinSelectionStrategyCIP2.RandomImproveMultiAsset;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const RandomImproveMultiAsset = CML.CoinSelectionStrategyCIP2.RandomImproveMultiAsset;


/**
 * Get all values of the CoinSelectionStrategyCIP2 enum
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const allValues = CoinSelectionStrategyCIP2.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.CoinSelectionStrategyCIP2> => [
  CML.CoinSelectionStrategyCIP2.LargestFirst,
  CML.CoinSelectionStrategyCIP2.RandomImprove,
  CML.CoinSelectionStrategyCIP2.LargestFirstMultiAsset,
  CML.CoinSelectionStrategyCIP2.RandomImproveMultiAsset
];

/**
 * Convert CoinSelectionStrategyCIP2 enum value to string
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const name = CoinSelectionStrategyCIP2.toString(CML.CoinSelectionStrategyCIP2.LargestFirst);
 * console.log(name); // "LargestFirst"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.CoinSelectionStrategyCIP2): string => {
  switch (value) {
    case CML.CoinSelectionStrategyCIP2.LargestFirst:
      return "LargestFirst";
    case CML.CoinSelectionStrategyCIP2.RandomImprove:
      return "RandomImprove";
    case CML.CoinSelectionStrategyCIP2.LargestFirstMultiAsset:
      return "LargestFirstMultiAsset";
    case CML.CoinSelectionStrategyCIP2.RandomImproveMultiAsset:
      return "RandomImproveMultiAsset";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to CoinSelectionStrategyCIP2 enum value
 * 
 * @example
 * import { CoinSelectionStrategyCIP2 } from "@lucid-evolution/experimental";
 * 
 * const value = CoinSelectionStrategyCIP2.fromString("LargestFirst");
 * console.log(value); // Some(CML.CoinSelectionStrategyCIP2.LargestFirst)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.CoinSelectionStrategyCIP2 | undefined => {
  switch (str) {
    case "LargestFirst":
      return CML.CoinSelectionStrategyCIP2.LargestFirst;
    case "RandomImprove":
      return CML.CoinSelectionStrategyCIP2.RandomImprove;
    case "LargestFirstMultiAsset":
      return CML.CoinSelectionStrategyCIP2.LargestFirstMultiAsset;
    case "RandomImproveMultiAsset":
      return CML.CoinSelectionStrategyCIP2.RandomImproveMultiAsset;
    default:
      return undefined;
  }
};
