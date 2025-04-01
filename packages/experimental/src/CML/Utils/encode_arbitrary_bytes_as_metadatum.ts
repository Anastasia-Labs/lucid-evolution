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
export class EncodeArbitraryBytesAsMetadatumError extends Data.TaggedError(
  "EncodeArbitraryBytesAsMetadatumError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the encode_arbitrary_bytes_as_metadatum function
 *
 * @example
 * import { encodeArbitraryBytesAsMetadatum } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* encodeArbitraryBytesAsMetadatum( appropriate value );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const encodeArbitraryBytesAsMetadatum = Effect.fn(function* (
  bytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.encode_arbitrary_bytes_as_metadatum(bytes),
    catch: () =>
      new EncodeArbitraryBytesAsMetadatumError({
        message: `encode_arbitrary_bytes_as_metadatum failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls encode_arbitrary_bytes_as_metadatum function without Effect wrapper
 *
 * @example
 * import { encodeArbitraryBytesAsMetadatumUnsafe } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = encodeArbitraryBytesAsMetadatumUnsafe( appropriate value );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`encodeArbitraryBytesAsMetadatumUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const encodeArbitraryBytesAsMetadatumUnsafe = (
  bytes: Uint8Array,
): CML.TransactionMetadatum =>
  Effect.runSync(encodeArbitraryBytesAsMetadatum(bytes));
