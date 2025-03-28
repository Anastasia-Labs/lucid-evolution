import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Redeemers = CML.Redeemers;

export class RedeemersError extends Data.TaggedError("RedeemersError")<{
  message?: string;
}> {}

/**
 * Method free of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<void, RedeemersError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Redeemers): void =>
  Effect.runSync(free(instance));

/**
 * Method toFlatFormat of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toFlatFormat(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toFlatFormat = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<CML.LegacyRedeemerList, RedeemersError> =>
    Effect.try({
      try: () => instance.to_flat_format(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toFlatFormat failed Redeemers is not valid for LegacyRedeemerList conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toFlatFormat without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToFlatFormat(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToFlatFormat failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToFlatFormat = (instance: CML.Redeemers): CML.LegacyRedeemerList =>
  Effect.runSync(toFlatFormat(instance));

/**
 * Method toCborBytes of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<Uint8Array, RedeemersError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCborBytes failed Redeemers is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Redeemers): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<Uint8Array, RedeemersError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCanonicalCborBytes failed Redeemers is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Redeemers): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Redeemers.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Redeemers.from_cbor_bytes(cborBytes),
    catch: () => new RedeemersError({
      message: `Redeemers.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Redeemers.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<string, RedeemersError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCborHex failed Redeemers is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Redeemers): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<string, RedeemersError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toCanonicalCborHex failed Redeemers is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Redeemers): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Redeemers.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Redeemers.from_cbor_hex(cborBytes),
    catch: () => new RedeemersError({
      message: `Redeemers.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Redeemers.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<string, RedeemersError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toJson failed Redeemers is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Redeemers): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<any, RedeemersError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.toJsValue failed Redeemers is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Redeemers): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Redeemers.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Redeemers.from_json(json),
    catch: () => new RedeemersError({
      message: `Redeemers.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Redeemers.fromJson without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newArrLegacyRedeemer of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Redeemers.newArrLegacyRedeemer( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newArrLegacyRedeemer = Effect.fn(function* (arrLegacyRedeemer: CML.LegacyRedeemerList) {
  return yield* Effect.try({
    try: () => CML.Redeemers.new_arr_legacy_redeemer(arrLegacyRedeemer),
    catch: () => new RedeemersError({
      message: `Redeemers.newArrLegacyRedeemer failed with parameters: ${arrLegacyRedeemer} (LegacyRedeemerList). `,
    }),
  });
});

/**
 * Unsafely calls Redeemers.newArrLegacyRedeemer without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeNewArrLegacyRedeemer( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeNewArrLegacyRedeemer failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewArrLegacyRedeemer = (arrLegacyRedeemer: CML.LegacyRedeemerList) =>
  Effect.runSync(newArrLegacyRedeemer(arrLegacyRedeemer));

/**
 * Static method newMapRedeemerKeyToRedeemerVal of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Redeemers.newMapRedeemerKeyToRedeemerVal( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newMapRedeemerKeyToRedeemerVal = Effect.fn(function* (mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal) {
  return yield* Effect.try({
    try: () => CML.Redeemers.new_map_redeemer_key_to_redeemer_val(mapRedeemerKeyToRedeemerVal),
    catch: () => new RedeemersError({
      message: `Redeemers.newMapRedeemerKeyToRedeemerVal failed with parameters: ${mapRedeemerKeyToRedeemerVal} (MapRedeemerKeyToRedeemerVal). `,
    }),
  });
});

/**
 * Unsafely calls Redeemers.newMapRedeemerKeyToRedeemerVal without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeNewMapRedeemerKeyToRedeemerVal( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeNewMapRedeemerKeyToRedeemerVal failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewMapRedeemerKeyToRedeemerVal = (mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal) =>
  Effect.runSync(newMapRedeemerKeyToRedeemerVal(mapRedeemerKeyToRedeemerVal));

/**
 * Method kind of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<CML.RedeemersKind, RedeemersError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.Redeemers): CML.RedeemersKind =>
  Effect.runSync(kind(instance));

/**
 * Method asArrLegacyRedeemer of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.asArrLegacyRedeemer(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asArrLegacyRedeemer = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<CML.LegacyRedeemerList | undefined, RedeemersError> =>
    Effect.try({
      try: () => instance.as_arr_legacy_redeemer(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.asArrLegacyRedeemer failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asArrLegacyRedeemer without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeAsArrLegacyRedeemer(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeAsArrLegacyRedeemer failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsArrLegacyRedeemer = (instance: CML.Redeemers): CML.LegacyRedeemerList | undefined =>
  Effect.runSync(asArrLegacyRedeemer(instance));

/**
 * Method asMapRedeemerKeyToRedeemerVal of Redeemers
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 *   const result = yield* Redeemers.asMapRedeemerKeyToRedeemerVal(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asMapRedeemerKeyToRedeemerVal = Effect.fn(
  (instance: CML.Redeemers): Effect.Effect<CML.MapRedeemerKeyToRedeemerVal | undefined, RedeemersError> =>
    Effect.try({
      try: () => instance.as_map_redeemer_key_to_redeemer_val(),
      catch: () =>
        new RedeemersError({
          message: `Redeemers.asMapRedeemerKeyToRedeemerVal failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asMapRedeemerKeyToRedeemerVal without Effect wrapper
 * 
 * @example
 * import { Redeemers } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Redeemers instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Redeemers.unsafeAsMapRedeemerKeyToRedeemerVal(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Redeemers.unsafeAsMapRedeemerKeyToRedeemerVal failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsMapRedeemerKeyToRedeemerVal = (instance: CML.Redeemers): CML.MapRedeemerKeyToRedeemerVal | undefined =>
  Effect.runSync(asMapRedeemerKeyToRedeemerVal(instance));
