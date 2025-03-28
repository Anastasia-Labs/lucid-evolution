import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type LegacyRedeemer = CML.LegacyRedeemer;

export class LegacyRedeemerError extends Data.TaggedError("LegacyRedeemerError")<{
  message?: string;
}> {}

/**
 * Method free of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<void, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.LegacyRedeemer): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<Uint8Array, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCborBytes failed LegacyRedeemer is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.LegacyRedeemer): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<Uint8Array, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCanonicalCborBytes failed LegacyRedeemer is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.LegacyRedeemer): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* LegacyRedeemer.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.from_cbor_bytes(cborBytes),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<string, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCborHex failed LegacyRedeemer is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.LegacyRedeemer): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<string, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toCanonicalCborHex failed LegacyRedeemer is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.LegacyRedeemer): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* LegacyRedeemer.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.from_cbor_hex(cborBytes),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer.fromCborHex without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<string, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toJson failed LegacyRedeemer is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.LegacyRedeemer): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<any, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.toJsValue failed LegacyRedeemer is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.LegacyRedeemer): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* LegacyRedeemer.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.from_json(json),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer.fromJson without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method tag of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.tag(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const tag = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<CML.RedeemerTag, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.tag(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.tag failed `,
        }),
    })
);

/**
 * Unsafely calls instance.tag without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeTag(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeTag failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTag = (instance: CML.LegacyRedeemer): CML.RedeemerTag =>
  Effect.runSync(tag(instance));

/**
 * Method index of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.index(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const index = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<bigint, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.index(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.index failed `,
        }),
    })
);

/**
 * Unsafely calls instance.index without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeIndex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeIndex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIndex = (instance: CML.LegacyRedeemer): bigint =>
  Effect.runSync(index(instance));

/**
 * Method data of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.data(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const data = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<CML.PlutusData, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.data(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.data failed `,
        }),
    })
);

/**
 * Unsafely calls instance.data without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeData(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeData failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeData = (instance: CML.LegacyRedeemer): CML.PlutusData =>
  Effect.runSync(data(instance));

/**
 * Method exUnits of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemer.exUnits(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const exUnits = Effect.fn(
  (instance: CML.LegacyRedeemer): Effect.Effect<CML.ExUnits, LegacyRedeemerError> =>
    Effect.try({
      try: () => instance.ex_units(),
      catch: () =>
        new LegacyRedeemerError({
          message: `LegacyRedeemer.exUnits failed `,
        }),
    })
);

/**
 * Unsafely calls instance.exUnits without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafeExUnits(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafeExUnits failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeExUnits = (instance: CML.LegacyRedeemer): CML.ExUnits =>
  Effect.runSync(exUnits(instance));

/**
 * Static method _new of LegacyRedeemer
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* LegacyRedeemer._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (tag: CML.RedeemerTag, index: bigint, data: CML.PlutusData, exUnits: CML.ExUnits) {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemer.new(tag, index, data, exUnits),
    catch: () => new LegacyRedeemerError({
      message: `LegacyRedeemer._new failed with parameters: ${tag} (RedeemerTag), ${index}, ${data} (PlutusData), ${exUnits} (ExUnits). `,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemer._new without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemer } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemer.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemer.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (tag: CML.RedeemerTag, index: bigint, data: CML.PlutusData, exUnits: CML.ExUnits) =>
  Effect.runSync(_new(tag, index, data, exUnits));
