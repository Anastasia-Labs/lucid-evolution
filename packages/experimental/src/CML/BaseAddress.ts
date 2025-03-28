import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type BaseAddress = CML.BaseAddress;

export class BaseAddressError extends Data.TaggedError("BaseAddressError")<{
  message?: string;
}> {}

/**
 * Method free of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 *   const result = yield* BaseAddress.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.BaseAddress): Effect.Effect<void, BaseAddressError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.BaseAddress): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BaseAddress._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (network: number, payment: CML.Credential, stake: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.BaseAddress.new(network, payment, stake),
    catch: () => new BaseAddressError({
      message: `BaseAddress._new failed with parameters: ${network}, ${payment} (Credential), ${stake} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls BaseAddress._new without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (network: number, payment: CML.Credential, stake: CML.Credential) =>
  Effect.runSync(_new(network, payment, stake));

/**
 * Method toAddress of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 *   const result = yield* BaseAddress.toAddress(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress = Effect.fn(
  (instance: CML.BaseAddress): Effect.Effect<CML.Address, BaseAddressError> =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.toAddress failed BaseAddress is not valid for Address conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafeToAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafeToAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToAddress = (instance: CML.BaseAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BaseAddress.fromAddress( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress = Effect.fn(function* (address: CML.Address) {
  return yield* Effect.try({
    try: () => CML.BaseAddress.from_address(address),
    catch: () => new BaseAddressError({
      message: `BaseAddress.fromAddress failed with parameters: ${address} (Address). `,
    }),
  });
});

/**
 * Unsafely calls BaseAddress.fromAddress without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafeFromAddress( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafeFromAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromAddress = (address: CML.Address) =>
  Effect.runSync(fromAddress(address));

/**
 * Method networkId of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 *   const result = yield* BaseAddress.networkId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (instance: CML.BaseAddress): Effect.Effect<number, BaseAddressError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafeNetworkId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafeNetworkId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNetworkId = (instance: CML.BaseAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 *   const result = yield* BaseAddress.payment(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const payment = Effect.fn(
  (instance: CML.BaseAddress): Effect.Effect<CML.Credential, BaseAddressError> =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.payment failed `,
        }),
    })
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafePayment(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafePayment failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePayment = (instance: CML.BaseAddress): CML.Credential =>
  Effect.runSync(payment(instance));

/**
 * Method stake of BaseAddress
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 *   const result = yield* BaseAddress.stake(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stake = Effect.fn(
  (instance: CML.BaseAddress): Effect.Effect<CML.Credential, BaseAddressError> =>
    Effect.try({
      try: () => instance.stake(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.stake failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stake without Effect wrapper
 * 
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BaseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BaseAddress.unsafeStake(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.unsafeStake failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStake = (instance: CML.BaseAddress): CML.Credential =>
  Effect.runSync(stake(instance));
