/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for encode_arbitrary_bytes_as_metadatum function
 * 
 * This error is thrown when the encode_arbitrary_bytes_as_metadatum function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class EncodeArbitraryBytesAsMetadatumError extends Data.TaggedError("EncodeArbitraryBytesAsMetadatumError")<{
  message?: string;
}> {}

/**
 * Wrapper for the encode_arbitrary_bytes_as_metadatum function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const encodeArbitraryBytesAsMetadatum: (bytes: Uint8Array) => Effect.Effect<CML.TransactionMetadatum, EncodeArbitraryBytesAsMetadatumError> = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.encode_arbitrary_bytes_as_metadatum(bytes),
    catch: () => new EncodeArbitraryBytesAsMetadatumError({
      message: `encode_arbitrary_bytes_as_metadatum failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls encode_arbitrary_bytes_as_metadatum function without Effect wrapper
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const encodeArbitraryBytesAsMetadatumUnsafe = (bytes: Uint8Array): CML.TransactionMetadatum =>
  Effect.runSync(encodeArbitraryBytesAsMetadatum(bytes));
