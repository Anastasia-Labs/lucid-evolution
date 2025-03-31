/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BaseAddress class
 *
 * @since 2.0.0
 * @category Types
 */
export type BaseAddress = CML.BaseAddress;

/**
 * Error class for BaseAddress operations
 * 
 * This error is thrown when operations on BaseAddress instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
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
 *   const result = BaseAddress.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BaseAddress): void =>
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
 *   const result = BaseAddress._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (network: number, payment: CML.Credential, stake: CML.Credential) =>
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
 *   const result = BaseAddress.toAddressUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.toAddressUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.BaseAddress): CML.Address =>
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
 *   const result = BaseAddress.fromAddressUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.fromAddressUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressUnsafe = (address: CML.Address) =>
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
 *   const result = BaseAddress.networkIdUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.networkIdUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.BaseAddress): number =>
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
 *   const result = BaseAddress.paymentUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.paymentUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentUnsafe = (instance: CML.BaseAddress): CML.Credential =>
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
 *   const result = BaseAddress.stakeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BaseAddress.stakeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeUnsafe = (instance: CML.BaseAddress): CML.Credential =>
  Effect.runSync(stake(instance));
