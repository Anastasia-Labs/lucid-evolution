import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class DecodePlutusDatumToJsonStrError extends Data.TaggedError(
  "DecodePlutusDatumToJsonStrError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the decode_plutus_datum_to_json_str function
 *
 * @example
 * import { decodePlutusDatumToJsonStr } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* decodePlutusDatumToJsonStr(PlutusData instance , CardanoNodePlutusDatumSchema instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const decodePlutusDatumToJsonStr = Effect.fn(function* (
  datum: CML.PlutusData,
  schema: CML.CardanoNodePlutusDatumSchema,
) {
  return yield* Effect.try({
    try: () => CML.decode_plutus_datum_to_json_str(datum, schema),
    catch: () =>
      new DecodePlutusDatumToJsonStrError({
        message: `decode_plutus_datum_to_json_str failed with parameters: datum (PlutusData instance), schema (CardanoNodePlutusDatumSchema instance). Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls decode_plutus_datum_to_json_str function without Effect wrapper
 *
 * @example
 * import { unsafeDecodePlutusDatumToJsonStr } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeDecodePlutusDatumToJsonStr(PlutusData instance , CardanoNodePlutusDatumSchema instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeDecodePlutusDatumToJsonStr failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeDecodePlutusDatumToJsonStr = (
  datum: CML.PlutusData,
  schema: CML.CardanoNodePlutusDatumSchema,
): string => Effect.runSync(decodePlutusDatumToJsonStr(datum, schema));
