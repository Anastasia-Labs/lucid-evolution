import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class DecodeArbitraryBytesFromMetadatumError extends Data.TaggedError("DecodeArbitraryBytesFromMetadatumError")<{
  message?: string;
}> {}

/**
 * Wrapper for the decode_arbitrary_bytes_from_metadatum function
 * 
 * @example
 * import { decodeArbitraryBytesFromMetadatum } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* decodeArbitraryBytesFromMetadatum(TransactionMetadatum instance );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const decodeArbitraryBytesFromMetadatum = Effect.fn(function* (metadata: CML.TransactionMetadatum) {
  return yield* Effect.try({
    try: () => CML.decode_arbitrary_bytes_from_metadatum(metadata),
    catch: () => new DecodeArbitraryBytesFromMetadatumError({
      message: `decode_arbitrary_bytes_from_metadatum failed with parameters: metadata (TransactionMetadatum instance). Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls decode_arbitrary_bytes_from_metadatum function without Effect wrapper
 * 
 * @example
 * import { unsafeDecodeArbitraryBytesFromMetadatum } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeDecodeArbitraryBytesFromMetadatum(TransactionMetadatum instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeDecodeArbitraryBytesFromMetadatum failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeDecodeArbitraryBytesFromMetadatum = (metadata: CML.TransactionMetadatum): Uint8Array | undefined =>
  Effect.runSync(decodeArbitraryBytesFromMetadatum(metadata));
