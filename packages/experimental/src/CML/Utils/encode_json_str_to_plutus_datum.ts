/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for encode_json_str_to_plutus_datum function
 * 
 * This error is thrown when the encode_json_str_to_plutus_datum function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class EncodeJsonStrToPlutusDatumError extends Data.TaggedError("EncodeJsonStrToPlutusDatumError")<{
  message?: string;
}> {}

/**
 * Wrapper for the encode_json_str_to_plutus_datum function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const encodeJsonStrToPlutusDatum: (json: string, schema: CML.CardanoNodePlutusDatumSchema) => Effect.Effect<CML.PlutusData, EncodeJsonStrToPlutusDatumError> = Effect.fn(function* (json: string, schema: CML.CardanoNodePlutusDatumSchema) {
  return yield* Effect.try({
    try: () => CML.encode_json_str_to_plutus_datum(json, schema),
    catch: () => new EncodeJsonStrToPlutusDatumError({
      message: `encode_json_str_to_plutus_datum failed with parameters: ${json}, schema (CardanoNodePlutusDatumSchema instance). Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls encode_json_str_to_plutus_datum function without Effect wrapper
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const encodeJsonStrToPlutusDatumUnsafe = (json: string, schema: CML.CardanoNodePlutusDatumSchema): CML.PlutusData =>
  Effect.runSync(encodeJsonStrToPlutusDatum(json, schema));
