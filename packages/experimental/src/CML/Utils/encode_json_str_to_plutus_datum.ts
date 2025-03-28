import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class EncodeJsonStrToPlutusDatumError extends Data.TaggedError(
  "EncodeJsonStrToPlutusDatumError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the encode_json_str_to_plutus_datum function
 *
 * @example
 * import { encodeJsonStrToPlutusDatum } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* encodeJsonStrToPlutusDatum("example", CardanoNodePlutusDatumSchema instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const encodeJsonStrToPlutusDatum = Effect.fn(function* (
  json: string,
  schema: CML.CardanoNodePlutusDatumSchema,
) {
  return yield* Effect.try({
    try: () => CML.encode_json_str_to_plutus_datum(json, schema),
    catch: () =>
      new EncodeJsonStrToPlutusDatumError({
        message: `encode_json_str_to_plutus_datum failed with parameters: ${json}, schema (CardanoNodePlutusDatumSchema instance). Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls encode_json_str_to_plutus_datum function without Effect wrapper
 *
 * @example
 * import { unsafeEncodeJsonStrToPlutusDatum } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeEncodeJsonStrToPlutusDatum("example", CardanoNodePlutusDatumSchema instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeEncodeJsonStrToPlutusDatum failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeEncodeJsonStrToPlutusDatum = (
  json: string,
  schema: CML.CardanoNodePlutusDatumSchema,
): CML.PlutusData => Effect.runSync(encodeJsonStrToPlutusDatum(json, schema));
