/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Redeemers class
 *
 * @since 2.0.0
 * @category Types
 */
export type Redeemers = CML.Redeemers;

/**
 * Error class for Redeemers operations
 *
 * This error is thrown when operations on Redeemers instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RedeemersError extends Data.TaggedError("RedeemersError")<{
  message?: string;
}> {}

/**
 * Method free of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.Redeemers,
) => Effect.Effect<void, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Redeemers): void =>
  Effect.runSync(free(instance));

/**
 * Method toFlatFormat of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toFlatFormat: (
  instance: CML.Redeemers,
) => Effect.Effect<CML.LegacyRedeemerList, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.to_flat_format(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toFlatFormat failed Redeemers is not valid for LegacyRedeemerList conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toFlatFormat without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toFlatFormatUnsafe = (
  instance: CML.Redeemers,
): CML.LegacyRedeemerList => Effect.runSync(toFlatFormat(instance));

/**
 * Method toCborBytes of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Redeemers,
) => Effect.Effect<Uint8Array, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCborBytes failed Redeemers is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Redeemers): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Redeemers,
) => Effect.Effect<Uint8Array, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCanonicalCborBytes failed Redeemers is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.Redeemers,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Redeemers
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Redeemers, RedeemersError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Redeemers.from_cbor_bytes(cborBytes),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Redeemers.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Redeemers =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Redeemers,
) => Effect.Effect<string, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCborHex failed Redeemers is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Redeemers): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Redeemers,
) => Effect.Effect<string, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCanonicalCborHex failed Redeemers is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Redeemers): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Redeemers
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Redeemers, RedeemersError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Redeemers.from_cbor_hex(cborBytes),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Redeemers.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Redeemers =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Redeemers,
) => Effect.Effect<string, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toJson failed Redeemers is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Redeemers): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Redeemers,
) => Effect.Effect<any, RedeemersError> = Effect.fn((instance: CML.Redeemers) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.toJsValue failed Redeemers is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Redeemers): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Redeemers
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Redeemers, RedeemersError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Redeemers.from_json(json),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Redeemers.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Redeemers =>
  Effect.runSync(fromJson(json));

/**
 * Static method newArrLegacyRedeemer of Redeemers
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newArrLegacyRedeemer: (
  arrLegacyRedeemer: CML.LegacyRedeemerList,
) => Effect.Effect<CML.Redeemers, RedeemersError> = Effect.fn(function* (
  arrLegacyRedeemer: CML.LegacyRedeemerList,
) {
  return yield* Effect.try({
    try: () => CML.Redeemers.new_arr_legacy_redeemer(arrLegacyRedeemer),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.newArrLegacyRedeemer failed with parameters: ${arrLegacyRedeemer} (LegacyRedeemerList). `,
      }),
  });
});

/**
 * Unsafely calls Redeemers.newArrLegacyRedeemer without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newArrLegacyRedeemerUnsafe = (
  arrLegacyRedeemer: CML.LegacyRedeemerList,
): CML.Redeemers => Effect.runSync(newArrLegacyRedeemer(arrLegacyRedeemer));

/**
 * Static method newMapRedeemerKeyToRedeemerVal of Redeemers
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newMapRedeemerKeyToRedeemerVal: (
  mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<CML.Redeemers, RedeemersError> = Effect.fn(function* (
  mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal,
) {
  return yield* Effect.try({
    try: () =>
      CML.Redeemers.new_map_redeemer_key_to_redeemer_val(
        mapRedeemerKeyToRedeemerVal,
      ),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.newMapRedeemerKeyToRedeemerVal failed with parameters: ${mapRedeemerKeyToRedeemerVal} (MapRedeemerKeyToRedeemerVal). `,
      }),
  });
});

/**
 * Unsafely calls Redeemers.newMapRedeemerKeyToRedeemerVal without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newMapRedeemerKeyToRedeemerValUnsafe = (
  mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal,
): CML.Redeemers =>
  Effect.runSync(newMapRedeemerKeyToRedeemerVal(mapRedeemerKeyToRedeemerVal));

/**
 * Method kind of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.Redeemers,
) => Effect.Effect<CML.RedeemersKind, RedeemersError> = Effect.fn(
  (instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Redeemers): CML.RedeemersKind =>
  Effect.runSync(kind(instance));

/**
 * Method asArrLegacyRedeemer of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const asArrLegacyRedeemer: (
  instance: CML.Redeemers,
) => Effect.Effect<CML.LegacyRedeemerList | undefined, RedeemersError> =
  Effect.fn((instance: CML.Redeemers) =>
    Effect.try({
      try: () => instance.as_arr_legacy_redeemer(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.asArrLegacyRedeemer failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asArrLegacyRedeemer without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asArrLegacyRedeemerUnsafe = (
  instance: CML.Redeemers,
): CML.LegacyRedeemerList | undefined =>
  Effect.runSync(asArrLegacyRedeemer(instance));

/**
 * Method asMapRedeemerKeyToRedeemerVal of Redeemers
 *
 * @since 2.0.0
 * @category Methods
 */
export const asMapRedeemerKeyToRedeemerVal: (
  instance: CML.Redeemers,
) => Effect.Effect<
  CML.MapRedeemerKeyToRedeemerVal | undefined,
  RedeemersError
> = Effect.fn((instance: CML.Redeemers) =>
  Effect.try({
    try: () => instance.as_map_redeemer_key_to_redeemer_val(),
    catch: () =>
      new RedeemersError({
        message: `Redeemers.asMapRedeemerKeyToRedeemerVal failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.asMapRedeemerKeyToRedeemerVal without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asMapRedeemerKeyToRedeemerValUnsafe = (
  instance: CML.Redeemers,
): CML.MapRedeemerKeyToRedeemerVal | undefined =>
  Effect.runSync(asMapRedeemerKeyToRedeemerVal(instance));
