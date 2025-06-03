import { Data, Inspectable, Schema } from "effect";

/**
 * CDDL spec:
 * ```
 * transaction_metadatum_label = uint .size 8
 * ```
 * 
 * @since 2.0.0
 * @category model
 */
export const TransactionMetadatumLabel = Schema.Uint8;

/**
 * Type representing a transaction metadatum label.
 *
 * @since 2.0.0
 * @category model
 */
export type TransactionMetadatumLabel = typeof TransactionMetadatumLabel.Type;


/**
 * Error thrown when transaction metadatum labels operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class TransactionMetadatumLabelsError extends Data.TaggedError("TransactionMetadatumLabelsError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Transaction metadatum labels from an array of `TransactionMetadatumLabel`
 *
 * @since 2.0.0
 * @category schemas
 */
export class TransactionMetadatumLabels extends Schema.TaggedClass<TransactionMetadatumLabels>("TransactionMetadatumLabels")(
  "TransactionMetadatumLabels",
  {
    fromLabels: Schema.mutable(Schema.Array(TransactionMetadatumLabel)),
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "TransactionMetadatumLabels",
      fromLabels: this.fromLabels,
    };
  }

  len() {
    return this.fromLabels.length;
  }

  get(index: number) {
    return this.fromLabels.at(index);
  }

  add(elem: TransactionMetadatumLabel) {
    return this.fromLabels.push(elem);
  }
}

/**
 * Describe transaction metadatum label as per
 * [CIP-10](https://github.com/cardano-foundation/CIPs/blob/master/CIP-0010/registry.json) standard.
 * 
 * **NOTE**: Only labels associated with CIPs will be described.
 * 
 * @since 2.0.0 
 * @category utils
 */
export const describe =
  (label: TransactionMetadatumLabel): string | undefined => {
    switch (label) {
      case 94:
        return "CIP-0094 - On-chain governance polls";

      case 674:
        return "CIP-0020 - Transaction message/comment metadata";

      case 721:
        return "CIP-0025 - NFT Token Standard";

      case 777:
        return "CIP-0027 - Royalties Standard";

      case 867:
        return "CIP-0088 - Token Policy Registration Standard";

      case 1667:
        return "CIP-72: dApp registration & Discovery";

      case 3692:
        return "CIP-0149 - Optional DRep compensation";

      case 61284:
        return "CIP-0015 - Catalyst registration";

      case 61285:
        return "CIP-0015 - Catalyst witness";

      case 61286:
        return "CIP-0015 - Catalyst deregistration";

      default:
        return undefined;
    }
  };
