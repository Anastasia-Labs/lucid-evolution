/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MultiHostName class
 *
 * @since 2.0.0
 * @category Types
 */
export type MultiHostName = CML.MultiHostName;

/**
 * Error class for MultiHostName operations
 * 
 * This error is thrown when operations on MultiHostName instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MultiHostNameError extends Data.TaggedError("MultiHostNameError")<{
  message?: string;
}> {}

/**
 * Method free of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<void, MultiHostNameError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MultiHostName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<Uint8Array, MultiHostNameError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCborBytes failed MultiHostName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.MultiHostName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<Uint8Array, MultiHostNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCanonicalCborBytes failed MultiHostName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.MultiHostName): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MultiHostName.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.MultiHostName.from_cbor_bytes(cborBytes),
    catch: () => new MultiHostNameError({
      message: `MultiHostName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls MultiHostName.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<string, MultiHostNameError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCborHex failed MultiHostName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.MultiHostName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<string, MultiHostNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCanonicalCborHex failed MultiHostName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.MultiHostName): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MultiHostName.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.MultiHostName.from_cbor_hex(cborBytes),
    catch: () => new MultiHostNameError({
      message: `MultiHostName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls MultiHostName.fromCborHex without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<string, MultiHostNameError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toJson failed MultiHostName is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.MultiHostName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<any, MultiHostNameError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toJsValue failed MultiHostName is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.MultiHostName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MultiHostName.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.MultiHostName.from_json(json),
    catch: () => new MultiHostNameError({
      message: `MultiHostName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls MultiHostName.fromJson without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method dnsName of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 *   const result = yield* MultiHostName.dnsName(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dnsName = Effect.fn(
  (instance: CML.MultiHostName): Effect.Effect<CML.DNSName, MultiHostNameError> =>
    Effect.try({
      try: () => instance.dns_name(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.dnsName failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dnsName without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiHostName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName.dnsNameUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName.dnsNameUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dnsNameUnsafe = (instance: CML.MultiHostName): CML.DNSName =>
  Effect.runSync(dnsName(instance));

/**
 * Static method _new of MultiHostName
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MultiHostName._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (dnsName: CML.DNSName) {
  return yield* Effect.try({
    try: () => CML.MultiHostName.new(dnsName),
    catch: () => new MultiHostNameError({
      message: `MultiHostName._new failed with parameters: ${dnsName} (DNSName). `,
    }),
  });
});

/**
 * Unsafely calls MultiHostName._new without Effect wrapper
 * 
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiHostName._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiHostName._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (dnsName: CML.DNSName) =>
  Effect.runSync(_new(dnsName));
