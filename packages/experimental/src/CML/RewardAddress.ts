import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RewardAddress = CML.RewardAddress;

export class RewardAddressError extends Data.TaggedError("RewardAddressError")<{
  message?: string;
}> {}

/**
 * Method free of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 *   const result = yield* RewardAddress.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RewardAddress): Effect.Effect<void, RewardAddressError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.RewardAddress): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 *   const result = yield* RewardAddress.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.RewardAddress): Effect.Effect<string, RewardAddressError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.toJson failed RewardAddress is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.RewardAddress): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 *   const result = yield* RewardAddress.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.RewardAddress): Effect.Effect<any, RewardAddressError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.toJsValue failed RewardAddress is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.RewardAddress): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RewardAddress.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.RewardAddress.from_json(json),
    catch: () => new RewardAddressError({
      message: `RewardAddress.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls RewardAddress.fromJson without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RewardAddress._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (network: number, payment: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.RewardAddress.new(network, payment),
    catch: () => new RewardAddressError({
      message: `RewardAddress._new failed with parameters: ${network}, ${payment} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls RewardAddress._new without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (network: number, payment: CML.Credential) =>
  Effect.runSync(_new(network, payment));

/**
 * Method toAddress of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 *   const result = yield* RewardAddress.toAddress(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress = Effect.fn(
  (instance: CML.RewardAddress): Effect.Effect<CML.Address, RewardAddressError> =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.toAddress failed RewardAddress is not valid for Address conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeToAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeToAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToAddress = (instance: CML.RewardAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RewardAddress.fromAddress( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress = Effect.fn(function* (address: CML.Address) {
  return yield* Effect.try({
    try: () => CML.RewardAddress.from_address(address),
    catch: () => new RewardAddressError({
      message: `RewardAddress.fromAddress failed with parameters: ${address} (Address). `,
    }),
  });
});

/**
 * Unsafely calls RewardAddress.fromAddress without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeFromAddress( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeFromAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromAddress = (address: CML.Address) =>
  Effect.runSync(fromAddress(address));

/**
 * Method networkId of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 *   const result = yield* RewardAddress.networkId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (instance: CML.RewardAddress): Effect.Effect<number, RewardAddressError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafeNetworkId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafeNetworkId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNetworkId = (instance: CML.RewardAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of RewardAddress
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 *   const result = yield* RewardAddress.payment(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const payment = Effect.fn(
  (instance: CML.RewardAddress): Effect.Effect<CML.Credential, RewardAddressError> =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.payment failed `,
        }),
    })
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 * 
 * @example
 * import { RewardAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RewardAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAddress.unsafePayment(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAddress.unsafePayment failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePayment = (instance: CML.RewardAddress): CML.Credential =>
  Effect.runSync(payment(instance));
