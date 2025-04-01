/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for decode_arbitrary_bytes_from_metadatum function
 * 
 * This error is thrown when the decode_arbitrary_bytes_from_metadatum function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DecodeArbitraryBytesFromMetadatumError extends Data.TaggedError("DecodeArbitraryBytesFromMetadatumError")<{
  message?: string;
}> {}

/**
 * Wrapper for the decode_arbitrary_bytes_from_metadatum function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const decodeArbitraryBytesFromMetadatum: (metadata: CML.TransactionMetadatum) => Effect.Effect<Uint8Array | undefined, DecodeArbitraryBytesFromMetadatumError> = Effect.fn(function* (metadata: CML.TransactionMetadatum) {
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
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const decodeArbitraryBytesFromMetadatumUnsafe = (metadata: CML.TransactionMetadatum): Uint8Array | undefined =>
  Effect.runSync(decodeArbitraryBytesFromMetadatum(metadata));
