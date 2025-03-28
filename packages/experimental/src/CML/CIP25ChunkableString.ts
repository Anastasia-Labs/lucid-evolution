import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP25ChunkableString = CML.CIP25ChunkableString;

export class CIP25ChunkableStringError extends Data.TaggedError(
  "CIP25ChunkableStringError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<void, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP25ChunkableString): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<Uint8Array, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toCborBytes failed CIP25ChunkableString is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.CIP25ChunkableString,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25ChunkableString.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP25ChunkableStringError({
        message: `CIP25ChunkableString.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<string, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toCborHex failed CIP25ChunkableString is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP25ChunkableString): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25ChunkableString.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP25ChunkableStringError({
        message: `CIP25ChunkableString.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromCborHex without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<string, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toJson failed CIP25ChunkableString is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP25ChunkableString): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<any, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toJsValue failed CIP25ChunkableString is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP25ChunkableString): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25ChunkableString.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_json(json),
    catch: () =>
      new CIP25ChunkableStringError({
        message: `CIP25ChunkableString.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromJson without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newSingle of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25ChunkableString.newSingle( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingle = Effect.fn(function* (single: CML.CIP25String64) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.new_single(single),
    catch: () =>
      new CIP25ChunkableStringError({
        message: `CIP25ChunkableString.newSingle failed with parameters: ${single} (CIP25String64). `,
      }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.newSingle without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeNewSingle( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeNewSingle failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSingle = (single: CML.CIP25String64) =>
  Effect.runSync(newSingle(single));

/**
 * Static method newChunked of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25ChunkableString.newChunked( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newChunked = Effect.fn(function* (chunked: CML.CIP25String64List) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.new_chunked(chunked),
    catch: () =>
      new CIP25ChunkableStringError({
        message: `CIP25ChunkableString.newChunked failed with parameters: ${chunked} (CIP25String64List). `,
      }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.newChunked without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeNewChunked( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeNewChunked failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewChunked = (chunked: CML.CIP25String64List) =>
  Effect.runSync(newChunked(chunked));

/**
 * Method kind of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<CML.ChunkableStringKind, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (
  instance: CML.CIP25ChunkableString,
): CML.ChunkableStringKind => Effect.runSync(kind(instance));

/**
 * Method asSingle of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.asSingle(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSingle = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<CML.CIP25String64 | undefined, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.as_single(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.asSingle failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSingle without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeAsSingle(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeAsSingle failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSingle = (
  instance: CML.CIP25ChunkableString,
): CML.CIP25String64 | undefined => Effect.runSync(asSingle(instance));

/**
 * Method asChunked of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.asChunked(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asChunked = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<
    CML.CIP25String64List | undefined,
    CIP25ChunkableStringError
  > =>
    Effect.try({
      try: () => instance.as_chunked(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.asChunked failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asChunked without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeAsChunked(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeAsChunked failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsChunked = (
  instance: CML.CIP25ChunkableString,
): CML.CIP25String64List | undefined => Effect.runSync(asChunked(instance));

/**
 * Static method fromString of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25ChunkableString.fromString( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromString = Effect.fn(function* (str: string) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_string(str),
    catch: () =>
      new CIP25ChunkableStringError({
        message: `CIP25ChunkableString.fromString failed with parameters: ${str}. Hint: Not all CIP25ChunkableString instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromString without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeFromString( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeFromString failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromString = (str: string) =>
  Effect.runSync(fromString(str));

/**
 * Method toString of CIP25ChunkableString
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *   const result = yield* CIP25ChunkableString.toString(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toString = Effect.fn(
  (
    instance: CML.CIP25ChunkableString,
  ): Effect.Effect<string, CIP25ChunkableStringError> =>
    Effect.try({
      try: () => instance.to_string(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toString failed CIP25ChunkableString is not valid for string conversion. Hint: Not all CIP25ChunkableString instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toString without Effect wrapper
 *
 * @example
 * import { CIP25ChunkableString } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25ChunkableString instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25ChunkableString.unsafeToString(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25ChunkableString.unsafeToString failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToString = (instance: CML.CIP25ChunkableString): string =>
  Effect.runSync(toString(instance));
