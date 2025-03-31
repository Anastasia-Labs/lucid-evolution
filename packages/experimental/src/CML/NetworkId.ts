/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NetworkId class
 *
 * @since 2.0.0
 * @category Types
 */
export type NetworkId = CML.NetworkId;

/**
 * Error class for NetworkId operations
 * 
 * This error is thrown when operations on NetworkId instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NetworkIdError extends Data.TaggedError("NetworkIdError")<{
  message?: string;
}> {}

/**
 * Method free of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<void, NetworkIdError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NetworkId): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<Uint8Array, NetworkIdError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCborBytes failed NetworkId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NetworkId): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<Uint8Array, NetworkIdError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCanonicalCborBytes failed NetworkId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.NetworkId): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NetworkId.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NetworkId.from_cbor_bytes(cborBytes),
    catch: () => new NetworkIdError({
      message: `NetworkId.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls NetworkId.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<string, NetworkIdError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCborHex failed NetworkId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NetworkId): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<string, NetworkIdError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCanonicalCborHex failed NetworkId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NetworkId): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NetworkId.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.NetworkId.from_cbor_hex(cborBytes),
    catch: () => new NetworkIdError({
      message: `NetworkId.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls NetworkId.fromCborHex without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<string, NetworkIdError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toJson failed NetworkId is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NetworkId): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<any, NetworkIdError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toJsValue failed NetworkId is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NetworkId): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NetworkId.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.NetworkId.from_json(json),
    catch: () => new NetworkIdError({
      message: `NetworkId.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls NetworkId.fromJson without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NetworkId._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (network: bigint) {
  return yield* Effect.try({
    try: () => CML.NetworkId.new(network),
    catch: () => new NetworkIdError({
      message: `NetworkId._new failed with parameters: ${network}. `,
    }),
  });
});

/**
 * Unsafely calls NetworkId._new without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (network: bigint) =>
  Effect.runSync(_new(network));

/**
 * Static method mainnet of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NetworkId.mainnet();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const mainnet = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkId.mainnet(),
    catch: () => new NetworkIdError({
      message: `NetworkId.mainnet failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkId.mainnet without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.mainnetUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.mainnetUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const mainnetUnsafe = () =>
  Effect.runSync(mainnet());

/**
 * Static method testnet of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NetworkId.testnet();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const testnet = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkId.testnet(),
    catch: () => new NetworkIdError({
      message: `NetworkId.testnet failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkId.testnet without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.testnetUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.testnetUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const testnetUnsafe = () =>
  Effect.runSync(testnet());

/**
 * Method network of NetworkId
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 *   const result = yield* NetworkId.network(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const network = Effect.fn(
  (instance: CML.NetworkId): Effect.Effect<bigint, NetworkIdError> =>
    Effect.try({
      try: () => instance.network(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.network failed `,
        }),
    })
);

/**
 * Unsafely calls instance.network without Effect wrapper
 * 
 * @example
 * import { NetworkId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NetworkId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkId.networkUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkId.networkUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkUnsafe = (instance: CML.NetworkId): bigint =>
  Effect.runSync(network(instance));
