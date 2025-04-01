/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for decode_plutus_datum_to_json_str function
 *
 * This error is thrown when the decode_plutus_datum_to_json_str function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DecodePlutusDatumToJsonStrError extends Data.TaggedError(
  "DecodePlutusDatumToJsonStrError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the decode_plutus_datum_to_json_str function
 *
 * @since 2.0.0
 * @category Functions
 */
export const decodePlutusDatumToJsonStr: (
  datum: CML.PlutusData,
  schema: CML.CardanoNodePlutusDatumSchema,
) => Effect.Effect<string, DecodePlutusDatumToJsonStrError> = Effect.fn(
  function* (datum: CML.PlutusData, schema: CML.CardanoNodePlutusDatumSchema) {
    return yield* Effect.try({
      try: () => CML.decode_plutus_datum_to_json_str(datum, schema),
      catch: () =>
        new DecodePlutusDatumToJsonStrError({
          message: `decode_plutus_datum_to_json_str failed with parameters: datum (PlutusData instance), schema (CardanoNodePlutusDatumSchema instance). Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls decode_plutus_datum_to_json_str function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const decodePlutusDatumToJsonStrUnsafe = (
  datum: CML.PlutusData,
  schema: CML.CardanoNodePlutusDatumSchema,
): string => Effect.runSync(decodePlutusDatumToJsonStr(datum, schema));
