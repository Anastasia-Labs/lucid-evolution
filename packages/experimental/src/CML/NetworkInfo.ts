/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NetworkInfo class
 *
 * @since 2.0.0
 * @category Types
 */
export type NetworkInfo = CML.NetworkInfo;

/**
 * Error class for NetworkInfo operations
 *
 * This error is thrown when operations on NetworkInfo instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NetworkInfoError extends Data.TaggedError("NetworkInfoError")<{
  message?: string;
}> {}

/**
 * Method free of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkInfo instance
 * const instance = ... ;
 *   const result = yield* NetworkInfo.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NetworkInfo): Effect.Effect<void, NetworkInfoError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NetworkInfoError({
          message: `NetworkInfo.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NetworkInfo instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NetworkInfo): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NetworkInfo._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  networkId: number,
  protocolMagic: CML.ProtocolMagic,
) {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.new(networkId, protocolMagic),
    catch: () =>
      new NetworkInfoError({
        message: `NetworkInfo._new failed with parameters: ${networkId}, ${protocolMagic} (ProtocolMagic). `,
      }),
  });
});

/**
 * Unsafely calls NetworkInfo._new without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  networkId: number,
  protocolMagic: CML.ProtocolMagic,
) => Effect.runSync(_new(networkId, protocolMagic));

/**
 * Method networkId of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkInfo instance
 * const instance = ... ;
 *   const result = yield* NetworkInfo.networkId(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (instance: CML.NetworkInfo): Effect.Effect<number, NetworkInfoError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new NetworkInfoError({
          message: `NetworkInfo.networkId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NetworkInfo instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.networkIdUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.networkIdUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.NetworkInfo): number =>
  Effect.runSync(networkId(instance));

/**
 * Method protocolMagic of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NetworkInfo instance
 * const instance = ... ;
 *   const result = yield* NetworkInfo.protocolMagic(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const protocolMagic = Effect.fn(
  (
    instance: CML.NetworkInfo,
  ): Effect.Effect<CML.ProtocolMagic, NetworkInfoError> =>
    Effect.try({
      try: () => instance.protocol_magic(),
      catch: () =>
        new NetworkInfoError({
          message: `NetworkInfo.protocolMagic failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.protocolMagic without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NetworkInfo instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.protocolMagicUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.protocolMagicUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const protocolMagicUnsafe = (
  instance: CML.NetworkInfo,
): CML.ProtocolMagic => Effect.runSync(protocolMagic(instance));

/**
 * Static method testnet of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NetworkInfo.testnet();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const testnet = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.testnet(),
    catch: () =>
      new NetworkInfoError({
        message: `NetworkInfo.testnet failed `,
      }),
  });
});

/**
 * Unsafely calls NetworkInfo.testnet without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.testnetUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.testnetUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const testnetUnsafe = () => Effect.runSync(testnet());

/**
 * Static method mainnet of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NetworkInfo.mainnet();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const mainnet = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.mainnet(),
    catch: () =>
      new NetworkInfoError({
        message: `NetworkInfo.mainnet failed `,
      }),
  });
});

/**
 * Unsafely calls NetworkInfo.mainnet without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.mainnetUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.mainnetUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const mainnetUnsafe = () => Effect.runSync(mainnet());

/**
 * Static method preview of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NetworkInfo.preview();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const preview = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.preview(),
    catch: () =>
      new NetworkInfoError({
        message: `NetworkInfo.preview failed `,
      }),
  });
});

/**
 * Unsafely calls NetworkInfo.preview without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.previewUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.previewUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const previewUnsafe = () => Effect.runSync(preview());

/**
 * Static method preprod of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NetworkInfo.preprod();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const preprod = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.preprod(),
    catch: () =>
      new NetworkInfoError({
        message: `NetworkInfo.preprod failed `,
      }),
  });
});

/**
 * Unsafely calls NetworkInfo.preprod without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.preprodUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.preprodUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const preprodUnsafe = () => Effect.runSync(preprod());

/**
 * Static method sanchoTestnet of NetworkInfo
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NetworkInfo.sanchoTestnet();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const sanchoTestnet = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.sancho_testnet(),
    catch: () =>
      new NetworkInfoError({
        message: `NetworkInfo.sanchoTestnet failed `,
      }),
  });
});

/**
 * Unsafely calls NetworkInfo.sanchoTestnet without Effect wrapper
 *
 * @example
 * import { NetworkInfo } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NetworkInfo.sanchoTestnetUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NetworkInfo.sanchoTestnetUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const sanchoTestnetUnsafe = () => Effect.runSync(sanchoTestnet());
