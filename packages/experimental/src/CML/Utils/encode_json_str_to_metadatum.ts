/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for encode_json_str_to_metadatum function
 *
 * This error is thrown when the encode_json_str_to_metadatum function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class EncodeJsonStrToMetadatumError extends Data.TaggedError(
  "EncodeJsonStrToMetadatumError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the encode_json_str_to_metadatum function
 *
 * @example
 * import { encodeJsonStrToMetadatum } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* encodeJsonStrToMetadatum("example", MetadataJsonSchema instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const encodeJsonStrToMetadatum = Effect.fn(function* (
  json: string,
  schema: CML.MetadataJsonSchema,
) {
  return yield* Effect.try({
    try: () => CML.encode_json_str_to_metadatum(json, schema),
    catch: () =>
      new EncodeJsonStrToMetadatumError({
        message: `encode_json_str_to_metadatum failed with parameters: ${json}, schema (MetadataJsonSchema instance). Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls encode_json_str_to_metadatum function without Effect wrapper
 *
 * @example
 * import { encodeJsonStrToMetadatumUnsafe } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = encodeJsonStrToMetadatumUnsafe("example", MetadataJsonSchema instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`encodeJsonStrToMetadatumUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const encodeJsonStrToMetadatumUnsafe = (
  json: string,
  schema: CML.MetadataJsonSchema,
): CML.TransactionMetadatum =>
  Effect.runSync(encodeJsonStrToMetadatum(json, schema));
