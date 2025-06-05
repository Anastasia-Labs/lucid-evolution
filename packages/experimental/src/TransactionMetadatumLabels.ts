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
const labelDescriptions = new Map<number, string>([
  [94, "CIP-0094 - On-chain governance polls"],
  [674, "CIP-0020 - Transaction message/comment metadata"],
  [721, "CIP-0025 - NFT Token Standard"],
  [777, "CIP-0027 - Royalties Standard"],
  [867, "CIP-0088 - Token Policy Registration Standard"],
  [1667, "CIP-72: dApp registration & Discovery"],
  [3692, "CIP-0149 - Optional DRep compensation"],
  [61284, "CIP-0015 - Catalyst registration"],
  [61285, "CIP-0015 - Catalyst witness"],
  [61286, "CIP-0015 - Catalyst deregistration"],
]);

export const describe =
  (label: TransactionMetadatumLabel): string | undefined => {
    return labelDescriptions.get(label);
  };
