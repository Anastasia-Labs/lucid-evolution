import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type DNSName = CML.DNSName;

export class DNSNameError extends Data.TaggedError("DNSNameError")<{
  message?: string;
}> {}

/**
 * Method free of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<void, DNSNameError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.DNSName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<Uint8Array, DNSNameError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toCborBytes failed DNSName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.DNSName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<Uint8Array, DNSNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toCanonicalCborBytes failed DNSName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.DNSName): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DNSName.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DNSName.from_cbor_bytes(cborBytes),
    catch: () => new DNSNameError({
      message: `DNSName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls DNSName.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<string, DNSNameError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toCborHex failed DNSName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.DNSName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<string, DNSNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toCanonicalCborHex failed DNSName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.DNSName): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DNSName.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.DNSName.from_cbor_hex(cborBytes),
    catch: () => new DNSNameError({
      message: `DNSName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls DNSName.fromCborHex without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<string, DNSNameError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toJson failed DNSName is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.DNSName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<any, DNSNameError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toJsValue failed DNSName is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.DNSName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DNSName.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.DNSName.from_json(json),
    catch: () => new DNSNameError({
      message: `DNSName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls DNSName.fromJson without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method get of DNSName
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DNSName instance
 * const instance = ... ;
 *   const result = yield* DNSName.get(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.DNSName): Effect.Effect<string, DNSNameError> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { DNSName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DNSName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DNSName.unsafeGet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DNSName.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.DNSName): string =>
  Effect.runSync(get(instance));
