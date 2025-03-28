import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type EnterpriseAddress = CML.EnterpriseAddress;

export class EnterpriseAddressError extends Data.TaggedError("EnterpriseAddressError")<{
  message?: string;
}> {}

/**
 * Method free of EnterpriseAddress
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 *   const result = yield* EnterpriseAddress.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.EnterpriseAddress): Effect.Effect<void, EnterpriseAddressError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = EnterpriseAddress.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`EnterpriseAddress.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.EnterpriseAddress): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of EnterpriseAddress
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* EnterpriseAddress._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (network: number, payment: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.EnterpriseAddress.new(network, payment),
    catch: () => new EnterpriseAddressError({
      message: `EnterpriseAddress._new failed with parameters: ${network}, ${payment} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls EnterpriseAddress._new without Effect wrapper
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = EnterpriseAddress.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`EnterpriseAddress.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (network: number, payment: CML.Credential) =>
  Effect.runSync(_new(network, payment));

/**
 * Method toAddress of EnterpriseAddress
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 *   const result = yield* EnterpriseAddress.toAddress(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress = Effect.fn(
  (instance: CML.EnterpriseAddress): Effect.Effect<CML.Address, EnterpriseAddressError> =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.toAddress failed EnterpriseAddress is not valid for Address conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = EnterpriseAddress.unsafeToAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`EnterpriseAddress.unsafeToAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToAddress = (instance: CML.EnterpriseAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of EnterpriseAddress
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* EnterpriseAddress.fromAddress( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress = Effect.fn(function* (address: CML.Address) {
  return yield* Effect.try({
    try: () => CML.EnterpriseAddress.from_address(address),
    catch: () => new EnterpriseAddressError({
      message: `EnterpriseAddress.fromAddress failed with parameters: ${address} (Address). `,
    }),
  });
});

/**
 * Unsafely calls EnterpriseAddress.fromAddress without Effect wrapper
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = EnterpriseAddress.unsafeFromAddress( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`EnterpriseAddress.unsafeFromAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromAddress = (address: CML.Address) =>
  Effect.runSync(fromAddress(address));

/**
 * Method networkId of EnterpriseAddress
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 *   const result = yield* EnterpriseAddress.networkId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (instance: CML.EnterpriseAddress): Effect.Effect<number, EnterpriseAddressError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = EnterpriseAddress.unsafeNetworkId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`EnterpriseAddress.unsafeNetworkId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNetworkId = (instance: CML.EnterpriseAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of EnterpriseAddress
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 *   const result = yield* EnterpriseAddress.payment(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const payment = Effect.fn(
  (instance: CML.EnterpriseAddress): Effect.Effect<CML.Credential, EnterpriseAddressError> =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.payment failed `,
        }),
    })
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 * 
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a EnterpriseAddress instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = EnterpriseAddress.unsafePayment(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`EnterpriseAddress.unsafePayment failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePayment = (instance: CML.EnterpriseAddress): CML.Credential =>
  Effect.runSync(payment(instance));
