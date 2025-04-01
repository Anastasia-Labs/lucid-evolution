/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for decode_metadatum_to_json_str function
 * 
 * This error is thrown when the decode_metadatum_to_json_str function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DecodeMetadatumToJsonStrError extends Data.TaggedError("DecodeMetadatumToJsonStrError")<{
  message?: string;
}> {}

/**
 * Wrapper for the decode_metadatum_to_json_str function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const decodeMetadatumToJsonStr: (metadatum: CML.TransactionMetadatum, schema: CML.MetadataJsonSchema) => Effect.Effect<string, DecodeMetadatumToJsonStrError> = Effect.fn(function* (metadatum: CML.TransactionMetadatum, schema: CML.MetadataJsonSchema) {
  return yield* Effect.try({
    try: () => CML.decode_metadatum_to_json_str(metadatum, schema),
    catch: () => new DecodeMetadatumToJsonStrError({
      message: `decode_metadatum_to_json_str failed with parameters: metadatum (TransactionMetadatum instance), schema (MetadataJsonSchema instance). Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls decode_metadatum_to_json_str function without Effect wrapper
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const decodeMetadatumToJsonStrUnsafe = (metadatum: CML.TransactionMetadatum, schema: CML.MetadataJsonSchema): string =>
  Effect.runSync(decodeMetadatumToJsonStr(metadatum, schema));
