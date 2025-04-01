/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SingleHostName class
 *
 * @since 2.0.0
 * @category Types
 */
export type SingleHostName = CML.SingleHostName;

/**
 * Error class for SingleHostName operations
 *
 * This error is thrown when operations on SingleHostName instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SingleHostNameError extends Data.TaggedError(
  "SingleHostNameError",
)<{
  message?: string;
}> {}

/**
 * Method free of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SingleHostName): Effect.Effect<void, SingleHostNameError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleHostName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.SingleHostName,
  ): Effect.Effect<Uint8Array, SingleHostNameError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.toCborBytes failed SingleHostName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.SingleHostName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.SingleHostName,
  ): Effect.Effect<Uint8Array, SingleHostNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.toCanonicalCborBytes failed SingleHostName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.SingleHostName,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleHostName.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.SingleHostName.from_cbor_bytes(cborBytes),
    catch: () =>
      new SingleHostNameError({
        message: `SingleHostName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls SingleHostName.fromCborBytes without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.SingleHostName): Effect.Effect<string, SingleHostNameError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.toCborHex failed SingleHostName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.SingleHostName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.SingleHostName): Effect.Effect<string, SingleHostNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.toCanonicalCborHex failed SingleHostName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.SingleHostName,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleHostName.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.SingleHostName.from_cbor_hex(cborBytes),
    catch: () =>
      new SingleHostNameError({
        message: `SingleHostName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls SingleHostName.fromCborHex without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.SingleHostName): Effect.Effect<string, SingleHostNameError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.toJson failed SingleHostName is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.SingleHostName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.SingleHostName): Effect.Effect<any, SingleHostNameError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.toJsValue failed SingleHostName is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.SingleHostName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleHostName.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.SingleHostName.from_json(json),
    catch: () =>
      new SingleHostNameError({
        message: `SingleHostName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls SingleHostName.fromJson without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method port of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.port(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const port = Effect.fn(
  (
    instance: CML.SingleHostName,
  ): Effect.Effect<number | undefined, SingleHostNameError> =>
    Effect.try({
      try: () => instance.port(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.port failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.port without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.portUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.portUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const portUnsafe = (instance: CML.SingleHostName): number | undefined =>
  Effect.runSync(port(instance));

/**
 * Method dnsName of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *   const result = yield* SingleHostName.dnsName(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const dnsName = Effect.fn(
  (
    instance: CML.SingleHostName,
  ): Effect.Effect<CML.DNSName, SingleHostNameError> =>
    Effect.try({
      try: () => instance.dns_name(),
      catch: () =>
        new SingleHostNameError({
          message: `SingleHostName.dnsName failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dnsName without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleHostName instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName.dnsNameUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName.dnsNameUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dnsNameUnsafe = (instance: CML.SingleHostName): CML.DNSName =>
  Effect.runSync(dnsName(instance));

/**
 * Static method _new of SingleHostName
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleHostName._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  port: number | undefined,
  dnsName: CML.DNSName,
) {
  return yield* Effect.try({
    try: () => CML.SingleHostName.new(port, dnsName),
    catch: () =>
      new SingleHostNameError({
        message: `SingleHostName._new failed with parameters: ${port}, ${dnsName} (DNSName). `,
      }),
  });
});

/**
 * Unsafely calls SingleHostName._new without Effect wrapper
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleHostName._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleHostName._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (port: number | undefined, dnsName: CML.DNSName) =>
  Effect.runSync(_new(port, dnsName));
