import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class EncodeArbitraryBytesAsMetadatumError extends Data.TaggedError("EncodeArbitraryBytesAsMetadatumError")<{
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
export const encodeArbitraryBytesAsMetadatum = Effect.fn(function* (bytes: Uint8Array) {
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
 * @example
 * import { unsafeEncodeArbitraryBytesAsMetadatum } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeEncodeArbitraryBytesAsMetadatum( appropriate value );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeEncodeArbitraryBytesAsMetadatum failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeEncodeArbitraryBytesAsMetadatum = (bytes: Uint8Array): CML.TransactionMetadatum =>
  Effect.runSync(encodeArbitraryBytesAsMetadatum(bytes));
